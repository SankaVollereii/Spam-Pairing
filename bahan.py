import os
import sys
import time 

os.system("clear")
print("Mohon Tunggu Bahan Akan Segera Di Install")
time.sleep(2)
os.system("apt update -y && apt upgrade -y && apt install nodejs && npm install")
print("Selesai Menginstal Bahan")
time.sleep(2)