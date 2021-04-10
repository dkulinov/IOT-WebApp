import camera
from lightsensor import lightsensor
import serialnum
import os
import requests
import config
from subprocess import call


class device:

    def __init__(self, camera, fridge_lightsensor, freezer_lightsensor):
        self.camera = camera
        self.fridge_lightsensor = fridge_lightsensor
        self.freezer_lightsensor = freezer_lightsensor
        self.light_threshold = 550
        self.light_max_val = 1023

    def run(self):
        prev_fridge_level = self.light_max_val
        prev_freezer_level = self.light_max_val
        fridge_threshold = self.light_threshold
        freezer_threshold = self.light_threshold
        while True:
            fridge_light_level = self.fridge_lightsensor.ReadChannel()
            freezer_light_level = self.freezer_lightsensor.ReadChannel()
            # if fridge or freezer are open
            if (fridge_light_level < fridge_threshold and prev_fridge_level >= fridge_threshold) or (freezer_light_level < freezer_threshold and prev_freezer_level >= freezer_threshold):
                # take recording and upload it
                file_data = self.camera.create_file_name()
                file_name = file_data[0]
                file_path = file_data[1]
                self.camera.lens.start_recording(file_path)
                # keep recording until both doors and freezer close
                while True:
                    fridge_light_level = self.fridge_lightsensor.ReadChannel()
                    freezer_light_level = self.freezer_lightsensor.ReadChannel()
                    if fridge_light_level >= fridge_threshold and freezer_light_level >= freezer_threshold:
                        break
                self.camera.lens.stop_recording()
                mp4_file = file_path.split('.')[0]+'.mp4'
                mp4_name = file_name.split('.')[0]+'.mp4'
                print('mp4: ', mp4_file)
                command = "MP4Box -add " + file_path + " " + mp4_file
                call([command], shell=True)
                os.remove(file_path)
                video = open(mp4_file, 'rb')
                success1 = False
                try:
                    response = self.camera.my_bucket.put_object(
                        Key=mp4_name, Body=video, ACL='public-read', ContentType='video/mp4')
                    success1 = True
                except:
                    print("S3 Request failed")

                # put this in db so we know whose video it is
                uri = config.getApiUrl() + '/recording'
                link = config.getS3Link + mp4_name
                obj = {
                    'link': link,
                    'device_id': serialnum.getserial()
                }
                success2 = False
                try:
                    res = requests.post(uri, data=obj)
                    success2 = True
                except:
                    print("API Request failed")

                if success1 and success2:
                    os.remove(mp4_file)
            prev_fridge_level = fridge_light_level
            prev_freezer_level = freezer_light_level
