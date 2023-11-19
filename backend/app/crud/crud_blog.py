from typing import Any, List

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models import Blog
from app.schemas import BlogCreate, BlogEdit, BlogOut

class CRUDBlog(CRUDBase[Blog, BlogCreate, BlogEdit]):
    pass

crud_blog = CRUDBlog(Blog)