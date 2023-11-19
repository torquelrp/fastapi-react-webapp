import { BLOG_URL, BlogResponseProps } from '../../../api/config';
import { Form } from '../../../components/Admin/Form/Form';
import useAxiosNew from '../../../hooks/useAxiosNew';
import { BlogCategoryResponseProps, BLOG_CATEGORY_URL, ListResponseProps } from '../../../api/config';
import { useParams } from 'react-router-dom';
const BlogEdit = () => {
    let { id } = useParams();
    const {  response: categoryResponse, loading: categoryLoading  } = useAxiosNew<ListResponseProps<BlogCategoryResponseProps>>(
        {
            method: "get",
            url: BLOG_CATEGORY_URL,
        }
    );
    const {  response: blogResponse, loading: blogLoading  } = useAxiosNew<BlogResponseProps>(
        {
            method: "get",
            url: BLOG_URL+'/'+id,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              }
        }
    );
    if (categoryLoading) {
        return <div>Loading...</div>
    } else if (blogLoading) {
        return <div>Loading...</div>
    }

    return (
        <Form
            // headers={}
            callbackUrl='/manager/blogs'
            api={`${BLOG_URL}/${id}`}
            hasUpdate={true}
            title="Blog"
            rules={
                { name: { required: true, message: 'Please insert', trigger: 'onSubmit' }, }
            }
            formType={[
                {
                    label: 'Title',
                    key: 'title',
                    type: 'text',
                },
                {
                    label: 'Preview Image',
                    key: 'preview_image_url',
                    type: 'image',
                },
                {
                    label: 'Category',
                    key: 'blog_category_id',
                    type: 'options',
                    values: categoryResponse?.data_list?.map((item) => ({
                        text: item.name,
                        value: item.id,})),
                    // defaultValue: { label: categoryResponse?.data_list?.[0].name, value: categoryResponse?.data_list?.[0].id },
                },
                {
                    label: 'Description',
                    key: 'description',
                    type: 'textarea',
                },
                {
                    label: 'Content',
                    key: 'content',
                    type: 'editor',
                },

            ]}
            formData={{
                id: id,
                title: blogResponse?.title,
                preview_image_url: blogResponse?.preview_image_url,
                blog_category_id: blogResponse?.blog_category.id,
                description: blogResponse?.description,
                content: blogResponse?.content,
            }}
        />
    )

}

export default BlogEdit