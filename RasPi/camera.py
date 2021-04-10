import boto3
from datetime import datetime
import os
import serialnum
from picamera import PiCamera
import config


class camera:

    def __init__(self):
        aws_info = config.getAWSinfo()
        self.region = aws_info["region"]
        self.s3 = boto3.resource(
            service_name='s3',
            region_name=self.region,
            aws_access_key_id=aws_info["access_key_id"],
            aws_secret_access_key=aws_info["secret_access_key"]
        )
        self.bucket_name = aws_info["bucket_name"]
        self.my_bucket = self.s3.Bucket(self.bucket_name)
        self.lens = PiCamera()

    def create_file_name(self):
        file = serialnum.getserial() + '_' + str(datetime.now()
                                                 ).split('.')[0].replace(' ', '_').replace(':', '-', 3) + '.h264'
        fileDir = os.path.dirname(os.path.realpath('__file__'))
        file_name = os.path.join(fileDir, file)
        return [file, file_name]
