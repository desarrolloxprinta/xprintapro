import ftplib

host = "ftp.xprintapro.com"
user = "antigravity@xprintapro.com"
password = "genesis2023G+"
filename = "main-CQ4Ck9yA.js"
local_path = "/home/suario/projects/xprinta-pro/scratch/main-CQ4Ck9yA.js"

def download_asset():
    ftp = ftplib.FTP()
    ftp.connect(host, 21)
    ftp.login(user, password)
    ftp.cwd("assets")
    
    print(f"Downloading {filename} from FTP...")
    with open(local_path, "wb") as f:
        ftp.retrbinary(f"RETR {filename}", f.write)
        
    print(f"Downloaded to {local_path}")
    ftp.quit()

if __name__ == "__main__":
    download_asset()
