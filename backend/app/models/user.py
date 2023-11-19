from sqlalchemy import Boolean, Column, Integer, String, ForeignKey

from sqlalchemy.orm import relationship
from app.db.base_class import Base

class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    first_name = Column(String)
    last_name = Column(String)
    password = Column(String, nullable=True)
    
    provider_name = Column(String)
    provider_id = Column(String)
    nickname = Column(String)
    avatar_url = Column(String)

    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)

    blogs = relationship("Blog", back_populates="author")