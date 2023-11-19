from typing import Any, List

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models import BlogCategory
from app.schemas import BlogCategoryCreate, BlogCategoryEdit, BlogCategoryOut

class CRUDBlogCategory(CRUDBase[BlogCategory, BlogCategoryCreate, BlogCategoryEdit]):
    pass

crud_blog_category = CRUDBlogCategory(BlogCategory)