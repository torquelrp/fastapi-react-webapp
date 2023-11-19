from app.core.oauth2 import KakaoOauth
from app.schemas.user import UserOauthCreate
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import APIRouter, Depends, HTTPException, status
from datetime import timedelta
from fastapi.responses import RedirectResponse
from app.db.session import get_db
from app.core import security
from app.core.auth import authenticate_user, sign_up_new_user, check_user_is_exit
from app.crud import crud_user
auth_router = r = APIRouter()


@r.post("/token")
async def login(
    db=Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()
):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(
        minutes=security.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    if user.is_superuser:
        permissions = "admin"
    else:
        permissions = "user"
    access_token = security.create_access_token(
        data={
            "sub": user.id,
            "permissions": permissions,
        },
        expires_delta=access_token_expires,
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "id": user.id,
        "nickname": user.nickname,
        "avatar_url": user.avatar_url,
        "provider_name": user.provider_name,
        "email": user.email,
        "permissions": permissions,
    }


@r.post("/signup")
async def signup(
    db=Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()
):
    user = sign_up_new_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Account already exists",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(
        minutes=security.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    if user.is_superuser:
        permissions = "admin"
    else:
        permissions = "user"
    access_token = security.create_access_token(
        data={"sub": user.id, "permissions": permissions},
        expires_delta=access_token_expires,
    )

    return {"access_token": access_token, "token_type": "bearer"}


@r.get('/oauth/token')
async def token(code: str, db=Depends(get_db)):
    oauth = KakaoOauth()
    auth_info = oauth.auth(code)
    user = oauth.get_userinfo("Bearer " + auth_info['access_token'])
    kakao_account = user["kakao_account"]
    u = UserOauthCreate(
        provider_name="kakao",
        provider_id=str(user["id"]),
        nickname=kakao_account["profile"]["nickname"],
        avatar_url=kakao_account["profile"]["profile_image_url"],
        email=kakao_account.get("email", ""),)

    # create user or other logic
    user = crud_user.get_user_by_oauth(
        db=db,
        provider_name=u.provider_name,
        provider_id=u.provider_id,
    )
    if not user:
        user = crud_user.create_oauth_user(db=db, obj_in=u)

    access_token_expires = timedelta(
        minutes=security.ACCESS_TOKEN_EXPIRE_MINUTES
    )

    if user.is_superuser:
        permissions = "admin"
    else:
        permissions = "user"

    access_token = security.create_access_token(
        data={
            "sub": user.id,
            "permissions": permissions,
        },
        expires_delta=access_token_expires,
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "id": user.id,
        "nickname": user.nickname,
        "avatar_url": user.avatar_url,
        "provider_name": user.provider_name,
        "email": user.email,
        "permissions": permissions,
    }
