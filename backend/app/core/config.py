import os

KAKAO_CLIENT_ID = os.getenv("KAKAO_CLIENT_ID")
KAKAO_REST_API_KEY = os.getenv("KAKAO_REST_API_KEY")
KAKAO_REDIRECT_URI = os.getenv("KAKAO_REDIRECT_URI")

PROJECT_NAME = "fastapi-react-project"

SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")

API_V1_STR = "/api/v1"
