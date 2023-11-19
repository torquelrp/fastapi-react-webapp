#!/usr/bin/env python3

from app.db.session import SessionLocal
from app.crud import crud_user
from app.schemas.user import UserCreate

def init() -> None:
    db = SessionLocal()

    crud_user.create_user(
        db=db,
        obj_in=UserCreate(
            email="zkdltid.chan@gmail.com",
            password="123456",
            is_active=True,
            is_superuser=True,
        )
    )


if __name__ == "__main__":
    print("Creating superuser zkdltid.chan@gmail.com")
    init()
    print("Superuser created")
