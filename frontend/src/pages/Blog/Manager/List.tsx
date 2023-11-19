import { Typography } from 'antd';
import useAxiosNew from '../../../hooks/useAxiosNew';
import { Table } from '../../../components/Admin/Table/Table';
import { BLOG_MANAGER_URL, BlogResponseProps, ListResponseProps } from '../../../api/config';

const BlogList = () => {
    const { response, loading } = useAxiosNew<ListResponseProps<BlogResponseProps>>(
        {
            method: "get",
            url: BLOG_MANAGER_URL,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        }
    )

    return (
        <>
            <Table
                hasNew={true}
                hasEdit={true}
                hasSort={true}
                sortTypes={['asc', 'desc']}
                isLoading={loading}
                subUrl='/manager/blogs'
                totalPages={0}
                pageSize={0}
                currentPage={0}
                totalCount={0}

                scroll={{ x: 500 }}
                dataSource={response?.data_list || []}
                columns={[
                    {
                        title: 'ID',
                        dataIndex: 'id',
                        key: 'id',
                    },
                    {
                        title: 'Title',
                        dataIndex: 'title',
                        key: 'title',
                    },
                    {
                        title: 'Description',
                        dataIndex: 'description',
                        key: 'description',
                        render: (text: string) => {
                            return <Typography.Paragraph
                                ellipsis={{
                                    rows: 3,
                                }}
                            >{text}</Typography.Paragraph>
                        }
                    },
                    {
                        title: 'Content',
                        dataIndex: 'content',
                        key: 'content',
                        ellipsis: true,
                        render: (text: string) => {
                            return <Typography.Paragraph
                                ellipsis={{
                                    rows: 3,
                                }}
                            ><div dangerouslySetInnerHTML={{ __html: text }} /></Typography.Paragraph>
                        }
                    },
                    {
                        title: 'Image',
                        dataIndex: 'preview_image_url',
                        key: 'preview_image_url',
                        render: (text: string) => {
                            return <img
                                width={"80px"}
                                height={"60px"}
                                src={text}
                                alt={text}
                            />
                        }
                    },
                ]}
            />
        </>)
}

export default BlogList