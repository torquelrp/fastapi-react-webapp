import requests
from app.core import config

class KakaoOauth():
    def __init__(self):
        self.auth_server = "https://kauth.kakao.com%s"
        self.api_server = "https://kapi.kakao.com%s"
        self.default_header = {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cache-Control": "no-cache",
        }

    def get_userinfo(self, bearer_token):
        res = requests.post(
            self.api_server % "/v2/user/me",
            headers={
                **self.default_header,
                **{"Authorization": bearer_token}
            },
            # "property_keys":'["kakao_account.profile_image_url"]'
            data={}
        ).json()
        return res

    def auth(self, code):
        res = requests.post(
            url=self.auth_server % "/oauth/token",
            headers={
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control": "no-cache",
            },
            data={
                "grant_type": "authorization_code",
                "client_id": config.KAKAO_CLIENT_ID,
                "client_secret": config.KAKAO_REST_API_KEY,
                "redirect_uri": config.KAKAO_REDIRECT_URI,
                "code": code,
            },
        ).json()
        return res

