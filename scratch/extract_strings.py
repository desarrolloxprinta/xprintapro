import re

file_path = "/home/suario/projects/xprinta-pro/scratch/main-CQ4Ck9yA.js"

def search_strings():
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    print(f"File size: {len(content)} characters")
    
    keyword = "rebranding"
    idx = content.find(keyword)
    if idx != -1:
        print(f"Found '{keyword}' at index {idx}")
        # Print context
        print("Context:")
        print(content[max(0, idx - 100):min(len(content), idx + 2000)])
    else:
        print(f"'{keyword}' not found in bundle.")
        # Let's search for case-insensitive
        match = re.search(r"rebranding", content, re.IGNORECASE)
        if match:
            idx = match.start()
            print(f"Found case-insensitive match at {idx}:")
            print(content[max(0, idx - 100):min(len(content), idx + 2000)])
        else:
            print("No case-insensitive match found either.")

if __name__ == "__main__":
    search_strings()
