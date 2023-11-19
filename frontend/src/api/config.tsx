export type ListResponseProps<T> = {
    data_list: T[]
    total: number
    page: number
    pages: number
}

export const SIGNUP_URL = '/api/signup'
export type SignupResponseProps = {
    username: string
    password: string
}

export const LOGIN_URL = '/api/token'
export type LoginResponseRrops = {
    id: number
    avatar_url: string
    nickname: string
    email: string
    provider_name: string
    permissions: string
    access_token: string
    // refresh_token: string //TODO
    token_type: string
}

export const PROFILE_URL = '/api/v1/users/me'
export type ProfileResponseProps = {
    id: number
    avatar_url: string
    nickname: string
    email: string
    provider_name: string
    permissions: string
}

export const USERS_URL = '/api/v1/users'
export type UsersResponseProps = {
    avatar_url: string
    nickname: string
    email: string
    provider_name: string
    is_active: boolean
    is_superuser: boolean
    first_name: string
    last_name: string
    id: number
}

export const PART_OF_SPEECH_URL = '/api/v1/part_of_speech'
export type PartOfSpeechResponseProps = {
    id: number
    name: string
}


export const BLOG_URL = '/api/v1/blogs'
export const BLOG_MANAGER_URL = '/api/v1/manager/blogs'
export type BlogResponseProps = {
    id: number
    preview_image_url: string
    title: string
    content: string
    description: string
    image_ur: 'https://picsum.photos/200/300'
    author: {
        id: number
        email: string
        nickname: string
        avatar_url: string
    }
    blog_category: BlogCategoryResponseProps
}


export const BLOG_CATEGORY_URL = '/api/v1/blog_categories'
export type BlogCategoryResponseProps = {
    id: number
    name: string
}

export const IMAGE_UPLOADER = '/api/v1/upload'
export type ImageUploaderResponseProps  = {
    uri: string
}