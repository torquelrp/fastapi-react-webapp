from pydantic import BaseModel
from pydantic.generics import GenericModel
from typing import List, Optional
from .user import User
from .blog_category import BlogCategory

class BlogBase(BaseModel):
    title : str
    description : str
    content : str
    preview_image_url : Optional[str] = None
    # blog_category: Optional[BlogCategory] = None
    # author: Optional[User] = None
    # creation_time : Optional[str] = None


class BlogOut(BlogBase):
    pass


class BlogCreate(BlogBase):
    blog_category_id: int
    user_id: Optional[int] = None

    class Config:
        orm_mode = True


class BlogEdit(BlogBase):
    blog_category_id: int
    user_id: Optional[int] = None

    class Config:
        orm_mode = True


class Blog(BlogBase):
    id: int
    blog_category: BlogCategory
    author: User
    class Config:
        orm_mode = True
