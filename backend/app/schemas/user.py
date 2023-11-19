from pydantic import BaseModel
from pydantic.generics import GenericModel
from typing import TypeVar, Optional

T = TypeVar("T")

class UserBase(BaseModel):
    email: str
    is_active: bool = True
    is_superuser: bool = False
    first_name: str = None
    last_name: str = None
    nickname: str = None
    avatar_url: str = None


class UserOut(UserBase):
    pass


class UserCreate(UserBase):
    password: str

    class Config:
        orm_mode = True

class UserOauthCreate(UserBase):
    provider_name: str = None
    provider_id: str = None

    class Config:
        orm_mode = True


class UserEdit(UserBase):
    password: Optional[str] = None

    class Config:
        orm_mode = True


class User(UserBase):
    id: int

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    id: int = None
    permissions: str = "user"
