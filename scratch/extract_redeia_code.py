file_path = "/home/suario/projects/xprinta-pro/scratch/main-CQ4Ck9yA.js"

def extract_code():
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    start = 291450
    # Save 45000 characters
    snippet = content[start:start + 45000]
    
    out_path = "/home/suario/projects/xprinta-pro/scratch/redeia_extracted.txt"
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(snippet)
    print(f"Saved 45000 chars snippet of redeia to {out_path}")

if __name__ == "__main__":
    extract_code()
