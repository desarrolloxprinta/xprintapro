import json

log_file_path = "/mnt/c/Users/Usuario/.gemini/antigravity-ide/brain/6bca1d0f-6190-438e-8446-3fe02de05a5e/.system_generated/logs/transcript.jsonl"

modified_files = set()
with open(log_file_path, "r", encoding="utf-8") as f:
    for line in f:
        try:
            data = json.loads(line)
            idx = data.get("step_index", 0)
            if idx > 2598:
                tool_calls = data.get("tool_calls", [])
                for tc in tool_calls:
                    name = tc.get("name")
                    if name in ["write_to_file", "replace_file_content", "multi_replace_file_content"]:
                        args = tc.get("args", {})
                        tf = args.get("TargetFile", "")
                        if tf:
                            modified_files.add((idx, name, tf))
        except Exception as e:
            continue

for idx, name, tf in sorted(modified_files):
    print(f"Step {idx}: {name} on {tf}")
