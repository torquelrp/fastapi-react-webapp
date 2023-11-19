from sqlalchemy import Boolean, Column, Integer, String, ForeignKey

from sqlalchemy.orm import relationship
from app.db.base_class import Base

class BlogCategory(Base):
    __tablename__ = "blog_categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)

    blogs = relationship("Blog", back_populates="blog_category")

