from typing import Any, List
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models import User
from app.schemas import UserCreate, UserEdit, UserOut, UserOauthCreate
from app.core.security import get_password_hash


class CRUDUser(CRUDBase[User, UserCreate, UserEdit]):
    def get_user_by_oauth(
            self, db: Session, 
            provider_name: str,
            provider_id: str
    ) -> User:
        return db.query(User).filter(User.provider_name == provider_name, User.provider_id == provider_id).first()

    def get_user_by_email(
            self, db: Session, email: str
    ) -> User:
        return db.query(User).filter(User.email == email).first()

    def create_user(
        self, db: Session, *, obj_in = UserCreate
    ) -> User:
        obj_in_data = jsonable_encoder(obj_in)
        obj_in_data["password"] = get_password_hash(obj_in_data["password"])
        db_obj = self.model(**obj_in_data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj
    
    def create_oauth_user(
        self, db: Session, *, obj_in = UserOauthCreate
    ) -> User:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


crud_user = CRUDUser(User)