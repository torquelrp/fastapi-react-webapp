import boto3
import os
import uuid
import json
from fastapi import UploadFile

# Load AWS S3 configuration from environment variables
AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
AWS_REGION = os.environ.get('AWS_REGION')
S3_BUCKET = os.environ.get('S3_BUCKET')

s3 = boto3.client(
    's3',
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION
)


def upload_file(file: UploadFile, s3_folder_path):
    contents = file.file.read()
    file.file.seek(0)

    error = ""
    s3_url = ""
    random_str = str(uuid.uuid4()).replace('-', '')
    s3_file_path = f"{s3_folder_path}/{random_str}"
    try:
        contents = file.read()
        s3.upload_fileobj(
            file.file,
            S3_BUCKET,
            s3_file_path,
        #     Callback=lambda bytes_sent: print(json.dumps({
        #     'uploaded': bytes_sent,
        #     'total': contents.size
        # })),
            ExtraArgs={
                'ContentType': file.content_type
            }
            )
        print("Upload Successful")
    except Exception as e:
        print("AWS credentials not available.")
        error = str(e)
    s3_url = f"https://{S3_BUCKET}.s3.{AWS_REGION}.amazonaws.com/{s3_file_path}"

    return s3_url, error
