from fastapi import FastAPI, Depends, UploadFile, File
from typing import List
from starlette.requests import Request
import uvicorn

from app.api.api_v1.routers.users import users_router
from app.api.api_v1.routers.auth import auth_router
from app.api.api_v1.routers.blog import blogs_router
from app.api.api_v1.routers.blog_category import blog_categories_router
from app.core import config
from app.db.session import SessionLocal
from app.core.auth import get_current_active_user
from app.core.celery_app import celery_app
from app.core.image_uploader import upload_file

app = FastAPI(
    title=config.PROJECT_NAME, docs_url="/api/docs", openapi_url="/api"
)


@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    request.state.db = SessionLocal()
    response = await call_next(request)
    request.state.db.close()
    return response


@app.get("/api/v1")
async def root():
    return {"message": "Hello World"}


@app.get("/api/v1/task")
async def example_task():
    celery_app.send_task("app.tasks.example_task", args=["Hello World"])

    return {"message": "success"}

@app.post('/api/v1/upload')
async def upload_image(file: UploadFile= File(...)):
    if file is None:
        return 'No file uploaded.'
    s3_folder_path = 'defaultFolder'
    uri, error = upload_file(file, s3_folder_path)
    if error:
        return error
    if not uri:
        return 'Upload failed.'
    return uri


# Routers
app.include_router(
    users_router,
    prefix="/api/v1",
    tags=["users"],
    dependencies=[Depends(get_current_active_user)],
)

app.include_router(
    blogs_router,
    prefix="/api/v1",
    tags=["blogs"],
    # dependencies=[Depends(get_current_active_user)],
)

app.include_router(
    blog_categories_router,
    prefix="/api/v1",
    tags=["blog_categories"],
    # dependencies=[Depends(get_current_active_user)],
)


app.include_router(auth_router, prefix="/api", tags=["auth"])

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=8888)
