from fastapi import APIRouter, Request, Depends, Response, encoders
import typing as t

from app.db.session import get_db
from app.crud import crud_blog_category

from app.schemas import BlogCategoryCreate, BlogCategoryEdit, BlogCategory, BlogCategoryOut, ResponseDataList
from app.core.auth import get_current_active_user, get_current_active_superuser

sub_url = "/blog_categories"

blog_categories_router = r = APIRouter()


@r.get(
    sub_url,
    response_model=ResponseDataList[BlogCategory],
    response_model_exclude_none=True,
)
async def blog_category_list(
    response: Response,
    db=Depends(get_db),
    # current_user=Depends(get_current_active_user),
):
    """
    Get all category
    """
    users = crud_blog_category.get_multi(db)
    # This is necessary for react-admin to work
    response_data = ResponseDataList[BlogCategory](data_list=users)
    return response_data


@r.post(sub_url, response_model=BlogCategory, response_model_exclude_none=True)
async def user_create(
    request: Request,
    blog_category: BlogCategoryCreate,
    db=Depends(get_db),
    current_user=Depends(get_current_active_superuser),
):
    """
    Create a new blog category
    """
    return crud_blog_category.create(db, blog_category)

