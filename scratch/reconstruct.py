import json
import os
import zipfile
import re
from datetime import datetime, timezone, timedelta

zip_path = "/home/suario/projects/xprinta-pro/xprinta-pro.zip"
log_file_path = "/mnt/c/Users/Usuario/.gemini/antigravity-ide/brain/6bca1d0f-6190-438e-8446-3fe02de05a5e/.system_generated/logs/transcript.jsonl"
base_dir = "/home/suario/projects/xprinta-pro/scratch/base"
reconstructed_dir = "/home/suario/projects/xprinta-pro/scratch/reconstructed"

def clean_val(val):
    if isinstance(val, str):
        if val.startswith('"') and val.endswith('"'):
            val = val[1:-1]
        val = val.replace('\\"', '"').replace('\\n', '\n').replace('\\\\', '\\')
    return val

def extract_base_files():
    print("Extracting base files from zip...")
    os.makedirs(base_dir, exist_ok=True)
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        for file_info in zip_ref.infolist():
            if file_info.filename in ["src/main.js", "src/style.css", "src/data/content.json", "index.html"]:
                zip_ref.extract(file_info, base_dir)
                print(f"  Extracted: {file_info.filename}")

def reconstruct():
    extract_base_files()
    
    file_contents = {}
    for filename in ["src/main.js", "src/style.css", "src/data/content.json", "index.html"]:
        path = os.path.join(base_dir, filename)
        if os.path.exists(path):
            with open(path, "r", encoding="utf-8") as f:
                file_contents[filename] = f.read()
        else:
            file_contents[filename] = ""
            
    file_contents["src/template-proyecto.js"] = ""
    file_contents["proyecto-redeia.html"] = ""

    with open(log_file_path, "r", encoding="utf-8") as f:
        steps_data = []
        for line in f:
            try:
                data = json.loads(line)
                steps_data.append(data)
            except:
                continue
                
    steps_data.sort(key=lambda x: x.get("step_index", 0))
    
    # We apply edits where 664 < step_index <= 2598
    min_step = 664
    max_step = 2598
    print(f"Applying edits where {min_step} < step_index <= {max_step}...")
    
    applied_count = 0
    warnings = 0
    
    for data in steps_data:
        step_idx = data.get("step_index", 0)
        if not (min_step < step_idx <= max_step):
            continue
            
        tool_calls = data.get("tool_calls", [])
        for tc in tool_calls:
            name = tc.get("name")
            args = tc.get("args", {})
            if not args:
                continue
                
            if name in ["write_to_file", "replace_file_content", "multi_replace_file_content"]:
                target_file = clean_val(args.get("TargetFile", ""))
                if not target_file:
                    continue
                
                norm_file = target_file.replace("\\\\wsl$\\Ubuntu", "").replace("\\\\wsl.localhost\\Ubuntu", "").replace("//wsl.localhost/Ubuntu", "")
                norm_file = norm_file.replace("//wsl$/Ubuntu", "")
                norm_file = norm_file.replace("/home/suario/projects/xprinta-pro/", "")
                norm_file = norm_file.replace("home/suario/projects/xprinta-pro/", "")
                norm_file = norm_file.lstrip("/")
                
                if norm_file not in file_contents:
                    file_contents[norm_file] = ""
                
                print(f"Step {step_idx}: Tool {name} on {norm_file}")
                
                if name == "write_to_file":
                    code_content = clean_val(args.get("CodeContent", ""))
                    file_contents[norm_file] = code_content
                    applied_count += 1
                elif name == "replace_file_content":
                    target_content = clean_val(args.get("TargetContent", ""))
                    replacement_content = clean_val(args.get("ReplacementContent", ""))
                    
                    current_content = file_contents[norm_file]
                    if target_content in current_content:
                        file_contents[norm_file] = current_content.replace(target_content, replacement_content, 1)
                        applied_count += 1
                        print("  Applied single replacement")
                    else:
                        print(f"  WARNING: TargetContent not found in {norm_file}!")
                        warnings += 1
                elif name == "multi_replace_file_content":
                    chunks = args.get("ReplacementChunks", [])
                    if isinstance(chunks, str):
                        # Clean up control characters and load
                        cleaned_chunks_str = clean_val(chunks)
                        # Remove actual control characters that JSON cannot load
                        cleaned_chunks_str = re.sub(r'[\x00-\x1f]', lambda m: '\\x{:02x}'.format(ord(m.group(0))), cleaned_chunks_str)
                        try:
                            chunks = json.loads(cleaned_chunks_str)
                        except Exception as e:
                            # Let's try parsing manually or regex if JSON loads fails
                            print(f"  JSON decode failed for chunks: {e}. Trying raw string eval/literal parse...")
                            # A simple fallback parser for list of dicts in string format
                            # chunk patterns: {"AllowMultiple": ..., "EndLine": ..., "ReplacementContent": ..., "StartLine": ..., "TargetContent": ...}
                            chunks = []
                            pattern = r'\{"AllowMultiple":\s*(?P<am>true|false),\s*"EndLine":\s*(?P<el>\d+),\s*"ReplacementContent":\s*"(?P<rc>.*?)",\s*"StartLine":\s*(?P<sl>\d+),\s*"TargetContent":\s*"(?P<tc>.*?)"\}'
                            for m in re.finditer(pattern, cleaned_chunks_str, re.DOTALL):
                                chunks.append({
                                    "AllowMultiple": m.group("am") == "true",
                                    "EndLine": int(m.group("el")),
                                    "ReplacementContent": m.group("rc"),
                                    "StartLine": int(m.group("sl")),
                                    "TargetContent": m.group("tc")
                                })
                            print(f"  Extracted {len(chunks)} chunks via regex fallback")
                            
                    current_content = file_contents[norm_file]
                    success = True
                    for chunk_idx, chunk in enumerate(chunks):
                        tc_chunk = clean_val(chunk.get("TargetContent", ""))
                        rc_chunk = clean_val(chunk.get("ReplacementContent", ""))
                        if tc_chunk in current_content:
                            current_content = current_content.replace(tc_chunk, rc_chunk, 1)
                            print(f"  Applied chunk {chunk_idx}")
                        else:
                            print(f"  WARNING: Chunk {chunk_idx} TargetContent not found in {norm_file}!")
                            success = False
                            warnings += 1
                    if success:
                        file_contents[norm_file] = current_content
                        applied_count += 1
                        
    # Write reconstructed files
    print(f"\nWriting reconstructed files to {reconstructed_dir}...")
    for filename, content in file_contents.items():
        if not content:
            continue
        # skip saving specs, walkthroughs, upload_temp, force_upload.py, parse_logs.py, reconstruct.py
        if any(x in filename for x in ["specs/", "walkthrough.md", "upload_temp", "force_upload", "parse_logs", "reconstruct", "task.md", "implementation_plan.md"]):
            continue
        out_path = os.path.join(reconstructed_dir, filename)
        os.makedirs(os.path.dirname(out_path), exist_ok=True)
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  Saved: {filename} ({len(content)} bytes)")
        
    print(f"\nReconstruction finished. Applied {applied_count} operations with {warnings} warnings.")

if __name__ == "__main__":
    reconstruct()
