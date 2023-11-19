from pydantic import BaseModel
from pydantic.generics import GenericModel
from typing import List, Optional


class BlogCategoryBase(BaseModel):
    name : str


class BlogCategoryOut(BlogCategoryBase):
    pass


class BlogCategoryCreate(BlogCategoryBase):
    pass

    class Config:
        orm_mode = True


class BlogCategoryEdit(BlogCategoryBase):
    pass

    class Config:
        orm_mode = True


class BlogCategory(BlogCategoryBase):
    id: int

    class Config:
        orm_mode = True

