import json

log_file_path = "/mnt/c/Users/Usuario/.gemini/antigravity-ide/brain/6bca1d0f-6190-438e-8446-3fe02de05a5e/.system_generated/logs/transcript.jsonl"

with open(log_file_path, "r", encoding="utf-8") as f:
    for line in f:
        try:
            data = json.loads(line)
            tool_calls = data.get("tool_calls", [])
            for tc in tool_calls:
                args = tc.get("args", {})
                tf = args.get("TargetFile", "")
                if "proceso-lottie" in tf:
                    print(f"Step {data.get('step_index')}: tool={tc.get('name')} file={tf}")
        except Exception as e:
            continue
