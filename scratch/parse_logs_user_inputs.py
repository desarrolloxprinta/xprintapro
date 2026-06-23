import json

log_file_path = "/mnt/c/Users/Usuario/.gemini/antigravity-ide/brain/6bca1d0f-6190-438e-8446-3fe02de05a5e/.system_generated/logs/transcript.jsonl"

with open(log_file_path, "r", encoding="utf-8") as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get("type") == "USER_INPUT":
                print(f"Step {data.get('step_index')}:")
                print(data.get("content"))
                print("-" * 50)
        except Exception as e:
            continue
