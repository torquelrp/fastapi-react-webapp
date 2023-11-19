from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, DateTime

from sqlalchemy.orm import relationship
from app.db.base_class import Base
from datetime import datetime

class Blog(Base):
    __tablename__ = "blogs"
    id = Column(Integer, primary_key=True, index=True)
    preview_image_url = Column(String, nullable=True)
    title = Column(String, index=True)
    description = Column(String)
    content = Column(String)
    blog_category_id = Column(Integer, ForeignKey("blog_categories.id"))
    user_id = Column(Integer, ForeignKey("user.id"))
    creation_time = Column(DateTime, default=datetime.now)

    blog_category = relationship("BlogCategory", back_populates="blogs")
    author = relationship("User", back_populates="blogs")


