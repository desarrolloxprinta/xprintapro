import difflib
import os

files_to_compare = [
    ("src/main.js", "scratch/reconstructed/src/main.js"),
    ("src/style.css", "scratch/reconstructed/src/style.css"),
    ("src/data/content.json", "scratch/reconstructed/src/data/content.json"),
    ("index.html", "scratch/reconstructed/index.html")
]

base_path = "/home/suario/projects/xprinta-pro"

for active_rel, recon_rel in files_to_compare:
    active_path = os.path.join(base_path, active_rel)
    recon_path = os.path.join(base_path, recon_rel)
    
    print("=" * 60)
    print(f"Comparing {active_rel} vs {recon_rel}")
    print("=" * 60)
    
    if not os.path.exists(active_path):
        print(f"Active file {active_rel} does not exist!")
        continue
    if not os.path.exists(recon_path):
        print(f"Reconstructed file {recon_rel} does not exist!")
        continue
        
    with open(active_path, "r", encoding="utf-8") as f:
        active_lines = f.readlines()
    with open(recon_path, "r", encoding="utf-8") as f:
        recon_lines = f.readlines()
        
    diff = list(difflib.unified_diff(
        active_lines, recon_lines,
        fromfile=f"active/{active_rel}",
        tofile=f"reconstructed/{recon_rel}",
        n=2
    ))
    
    if not diff:
        print("Files are identical.")
    else:
        # limit diff output to first 40 lines
        for line in diff[:40]:
            print(line, end="")
        if len(diff) > 40:
            print(f"\n... (truncated {len(diff) - 40} lines)")
