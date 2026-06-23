import os
import ftplib
import sys

def upload_dir(ftp, source_dir):
    for item in os.listdir(source_dir):
        local_path = os.path.join(source_dir, item)
        if os.path.isfile(local_path):
            with open(local_path, 'rb') as f:
                print(f"Uploading {local_path} -> {item}")
                ftp.storbinary(f"STOR {item}", f)
        elif os.path.isdir(local_path):
            try:
                ftp.mkd(item)
            except ftplib.error_perm as e:
                # 550 usually means directory exists
                pass
            print(f"Entering directory: {item}")
            ftp.cwd(item)
            upload_dir(ftp, local_path)
            ftp.cwd("..")

def main():
    host = "ftp.xprintapro.com"
    port = 21
    user = "antigravity@xprintapro.com"
    password = "genesis2023G+"
    
    print(f"Connecting to {host}...")
    try:
        ftp = ftplib.FTP()
        ftp.connect(host, port)
        ftp.login(user, password)
        print("Login successful!")
        
        # Determine base directory
        # The user mentioned new.xprinta.pro, maybe the root is already the correct public_html?
        # If we need to clear or overwrite, STOR replaces files.
        
        dist_dir = "dist"
        if not os.path.isdir(dist_dir):
            print("dist/ not found!")
            sys.exit(1)
            
        print("Starting upload...")
        upload_dir(ftp, dist_dir)
        
        ftp.quit()
        print("Upload complete!")
    except Exception as e:
        print(f"Error during FTP upload: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
