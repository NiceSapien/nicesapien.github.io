import sys
from subprocess import call
from glob import glob

path = sys.argv[1]
quality = sys.argv[2]

if int(quality) < 0 or int(quality) > 100:
    print("Image quality out of range [0-100]")
    sys.exit(0)

for img_name in glob(path + "/*"):
    if img_name.endswith(".jpg") or img_name.endswith(".png") or img_name.endswith(".jpeg"):
        cmd = f'cwebp "{path}/{img_name.split("/")[-1]}" -q {quality} -o "{path}/{img_name.split("/")[-1].split(".")[0]}.webp"'
        call(cmd, shell=True)   