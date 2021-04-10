# IOT-WebApp
This device records a video of a fridge when its doors are open and uploads it an S3 bucket in order to prevent food theft from fridges. There's also a web application which allows the user to see all of the videos.

## This project has 3 parts:
# 1. Raspberry Pi code which is responsible for recording videos, uploading them to S3, and calling an API endpoint to record the video metadata in a DB.
# 2. UI code which is responsible for fetching a user's videos and displaying them.
# 3. API code which is responsible for receiving requests from the Raspberry Pi to store meta data in the DB and receiving requests from the UI and returning links to a user's videos.
