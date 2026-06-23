import ftplib
from datetime import datetime

host = "ftp.xprintapro.com"
user = "antigravity@xprintapro.com"
password = "genesis2023G+"

def list_ftp_root():
    ftp = ftplib.FTP()
    ftp.connect(host, 21)
    ftp.login(user, password)
    
    print("Listing files on FTP server in root directory:")
    files = []
    try:
        for name, facts in ftp.mlsd():
            modify_time = facts.get('modify', '')
            size = facts.get('size', '0')
            type_ = facts.get('type', '')
            files.append((name, size, modify_time, type_))
    except Exception as e:
        print(f"MLSD failed: {e}. Trying NLST...")
        file_list = ftp.nlst()
        for name in file_list:
            try:
                mdtm = ftp.sendcmd(f"MDTM {name}")
                modify_time = mdtm.split()[1] if len(mdtm.split()) > 1 else ''
            except:
                modify_time = ''
            try:
                size = ftp.size(name)
            except:
                size = '0'
            files.append((name, str(size), modify_time, 'file'))
            
    # Sort files by modification time
    files.sort(key=lambda x: x[2], reverse=True)
    
    for name, size, mtime, type_ in files:
        try:
            dt = datetime.strptime(mtime[:14], "%Y%m%d%H%M%S")
            time_str = dt.strftime("%Y-%m-%d %H:%M:%S") + " UTC"
        except:
            time_str = mtime
        print(f"  [{type_}] {name} | Size: {size} bytes | Modified: {time_str}")
        
    ftp.quit()

if __name__ == "__main__":
    list_ftp_root()
