import camera
import lightsensor
import serialnum
import device

def main():
    ls1_channel = 0
    ls2_channel = 1
    cam = camera.camera()
    ls1 = lightsensor.lightsensor(ls1_channel)
    ls2 = lightsensor.lightsensor(ls2_channel)
    dv = device.device(cam, ls1, ls2)
    dv.run()


main()
