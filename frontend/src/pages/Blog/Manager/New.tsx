import { BLOG_URL } from '../../../api/config';
import { Form } from '../../../components/Admin/Form/Form';
import useAxiosNew from '../../../hooks/useAxiosNew';
import { BlogCategoryResponseProps, BLOG_CATEGORY_URL, ListResponseProps } from '../../../api/config';

const BlogNew = () => {
    const {  response: categoryResponse, loading: categoryLoading  } = useAxiosNew<ListResponseProps<BlogCategoryResponseProps>>(
        {
            method: "get",
            url: BLOG_CATEGORY_URL,

        }
    );
    if (categoryLoading) {
        return <div>Loading...</div>
    }
    return (
        <Form
            // headers={}
            callbackUrl='/'
            api={BLOG_URL}
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
            formData={{}}
        />
    )

}

export default BlogNew