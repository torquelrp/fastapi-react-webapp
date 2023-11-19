import { Layout, Space, Typography } from 'antd';
import { BLOG_URL, BlogResponseProps } from '../../api/config';
import useAxiosNew from '../../hooks/useAxiosNew';
import { useParams } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    height: '100%',
    background: '#fff',
    // paddingInline: 50,
    // lineHeight: '64px',
};

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    background: '#fff',
    lineHeight: '120px',
};


const { Header, Content, Footer } = Layout;


const BlogDetail = () => {
    let { id } = useParams();
    const { response: blogResp, loading: blogIsLoading } = useAxiosNew<BlogResponseProps>(
        {
            method: "get",
            url: BLOG_URL + '/' + id,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        }
    );
    if (blogIsLoading) {
        return <div>Loading...</div>
    }
    return (
        <>
            {blogResp &&
                <Space
                    direction="vertical" style={{ width: '100%' }} size={[0, 48]}
                >
                    <Layout>
                        <Header
                            style={headerStyle}
                        >

                                <Typography.Title level={1}>{blogResp?.title}</Typography.Title>
                                <Typography.Paragraph>{blogResp?.description}</Typography.Paragraph>
                        </Header>
                        <Content
                            style={contentStyle}
                        >
                                <img
                                alt={blogResp?.title}
                                style={{
                                    maxWidth: "640px"
                                }}
                                    src={blogResp.preview_image_url} 
                                />
                                <div dangerouslySetInnerHTML={{ __html: blogResp?.content }} />
                        </Content>
                        <Footer>
                            <TextArea disabled={true}/>
                        </Footer>
                        {/* Footer */}
                    </Layout>
                </Space>
            }
        </>
    )
}

export default BlogDetail