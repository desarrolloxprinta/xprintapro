import json

log_file_path = "/mnt/c/Users/Usuario/.gemini/antigravity-ide/brain/6bca1d0f-6190-438e-8446-3fe02de05a5e/.system_generated/logs/transcript.jsonl"

with open(log_file_path, "r", encoding="utf-8") as f:
    for line in f:
        try:
            data = json.loads(line)
            idx = data.get("step_index")
            if 2580 <= idx <= 2610:
                print(f"Step {idx}: type={data.get('type')}")
                if data.get("type") == "USER_INPUT":
                    print(f"  User input: {data.get('content')[:100]}")
                # Print timestamp if available
                metadata = data.get("content", "")
                if "local time" in metadata or "current local time" in metadata:
                    print(f"  Metadata contains: {metadata}")
        except Exception as e:
            continue
