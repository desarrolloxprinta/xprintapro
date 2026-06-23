import ftplib
import os

host = "ftp.xprintapro.com"
user = "antigravity@xprintapro.com"
password = "genesis2023G+"

ftp = ftplib.FTP()
ftp.connect(host, 21)
ftp.login(user, password)
print("Connected!")

# Force delete and re-upload index.html
try:
    ftp.delete("index.html")
    print("Deleted old index.html")
except Exception as e:
    print(f"Delete index.html failed: {e}")

with open("dist/index.html", "rb") as f:
    ftp.storbinary("STOR index.html", f)
    print("Uploaded new index.html")

# Force delete and re-upload proyecto-redeia.html
try:
    ftp.delete("proyecto-redeia.html")
    print("Deleted old proyecto-redeia.html")
except Exception as e:
    print(f"Delete proyecto-redeia.html failed: {e}")

with open("dist/proyecto-redeia.html", "rb") as f:
    ftp.storbinary("STOR proyecto-redeia.html", f)
    print("Uploaded new proyecto-redeia.html")

# Upload assets
ftp.cwd("assets")
asset_files = ftp.nlst()
print(f"Assets on server: {asset_files}")

for fname in os.listdir("dist/assets"):
    filepath = os.path.join("dist/assets", fname)
    with open(filepath, "rb") as f:
        ftp.storbinary(f"STOR {fname}", f)
        print(f"Uploaded asset: {fname}")

# Upload map
ftp.cwd("..")
try:
    ftp.cwd("mapa")
except:
    ftp.mkd("mapa")
    ftp.cwd("mapa")

with open("dist/mapa/mapa-fondo.png", "rb") as f:
    ftp.storbinary("STOR mapa-fondo.png", f)
    print("Uploaded mapa-fondo.png")

ftp.quit()
print("Force upload complete!")
