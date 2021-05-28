import pyvips
import numpy as np
import cv2
import os
import sys

format_to_dtype = {
    'uchar': np.uint8,
    'char': np.int8,
    'ushort': np.uint16,
    'short': np.int16,
    'uint': np.uint32,
    'int': np.int32,
    'float': np.float32,
    'double': np.float64,
    'complex': np.complex64,
    'dpcomplex': np.complex128,
}

# home=input()
# imgpath=input()
# patch_size = int(input())
# blank=int(input().replace("%",''))/100
# savepath=input()

home=sys.argv[1]
imgpath=sys.argv[2]
patch_size = int(sys.argv[3])
blank=1-int(sys.argv[4].replace("%",''))/100
savepath=sys.argv[5]
if imgpath[-4:]==".svs":
    img=pyvips.Image.new_from_file(home+"/"+imgpath)
    imgid=imgpath.split("/")[-1][:-4]
else:
    img=pyvips.Image.new_from_file(home+"/"+imgpath,page=0)    
    imgid=imgpath.split("/")[-1][:-5]
n_across = img.width // patch_size #leaving lastpart
n_down = img.height // patch_size   #leaving lastpart
n_patches = 0
b_patches = 0
blank=patch_size*patch_size*3*blank
for y in range(0, n_down):
    for x in range(0, n_across):
        imgp = img.crop(x * patch_size, y * patch_size,patch_size, patch_size)
        imgp=np.ndarray(buffer=imgp.write_to_memory(),
                      dtype=format_to_dtype[imgp.format],
                      shape=[imgp.height, imgp.width, imgp.bands])
        unique, counts = np.unique(imgp, return_counts=True)
        m=dict(zip(unique, counts))	
        xi=0
        for oi in range(250,256):
            if oi in m.keys():
                xi+=m[oi]            
        if xi<blank:
            i=str(x)+"_"+str(y)
            if not os.path.exists(savepath+"/"+imgid+"/patch"):
                    os.makedirs(savepath+"/"+imgid+"/patch")
            cv2.imwrite(savepath+"/"+imgid+"/patch/"+i+".png",imgp)
        else:
            if not os.path.exists(savepath+"/"+imgid+"/empty_patch"):
                    os.makedirs(savepath+"/"+imgid+"/empty_patch")
            i=str(x)+"_"+str(y)
            cv2.imwrite(savepath+"/"+imgid+"/empty_patch/"+i+".png",imgp)