from fastapi import APIRouter, Request, Depends, Response, encoders
import typing as t

from app.db.session import get_db
from app.crud import crud_blog
from app.crud import crud_blog_category

from app.schemas import BlogCreate, BlogEdit, Blog, BlogOut, ResponseDataList
from app.core.auth import get_current_active_user

sub_url = "/blogs"
blogs_router = r = APIRouter()


@r.get(
    "/blogs",
    response_model=ResponseDataList[Blog],
    response_model_exclude_none=True,
)
async def blog_list(
    response: Response,
    db=Depends(get_db),
    # current_user=Depends(get_current_active_user),
):
    blogs = crud_blog.get_multi(db)
    response_data = ResponseDataList[Blog](data_list=blogs)
    return response_data

@r.get(
    "/manager/blogs",
    response_model=ResponseDataList[Blog],
    response_model_exclude_none=True,
)
async def blog_list(
    response: Response,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    blogs = crud_blog.get_multi(db, user_id=current_user.id)
    response_data = ResponseDataList[Blog](data_list=blogs)
    return response_data



@r.get(
    sub_url+"/{blog_id}",
    response_model=Blog,
    response_model_exclude_none=True,
)
async def blog_details(
    request: Request,
    blog_id: int,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    blog = crud_blog.get(db, blog_id)
    return blog


@r.post(sub_url, response_model=Blog, response_model_exclude_none=True)
async def blog_create(
    request: Request,
    blog: BlogCreate,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    """
    Create a new blog
    """
    blog.user_id = current_user.id
    return crud_blog.create(db, blog)

@r.put(
    "/blogs/{blog_id}", response_model=Blog, response_model_exclude_none=True
)
async def user_edit(
    request: Request,
    blog_id: int,
    blog: BlogEdit,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    get_blog = crud_blog.get(db, blog_id)
    return crud_blog.update(db=db, db_obj=get_blog, obj_in=blog)


@r.delete(
    "/blogs/{blog_id}", response_model=Blog, response_model_exclude_none=True
)
async def user_delete(
    request: Request,
    blog_id: int,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    return crud_blog.remove(db, blog_id)
