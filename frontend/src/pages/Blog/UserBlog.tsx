import { Col, Row, Typography, Tag, Divider, Card, Avatar, Image, Carousel, } from 'antd';
import useAxiosNew from '../../hooks/useAxiosNew';
import { BLOG_URL, BlogResponseProps, ListResponseProps } from '../../api/config';
import './editorStyle.css'
import { useNavigate } from 'react-router-dom';

// import { EditOutlined, LikeOutlined } from '@ant-design/icons';
const { Meta } = Card;


const UserBlogCard = (item: BlogResponseProps) => {
    const navigate = useNavigate()
    return (
        <Card
            hoverable
            onClick={() => navigate(`/blogs/${item.id}`)}
            cover={
                <Image
                    fallback="https://breeze-test-2.s3.ap-northeast-2.amazonaws.com/defaultFolder/104e20d65ac74cacb32c112add4d8d39"
                    alt={item.title} src={item.preview_image_url}
                    style={{
                        objectFit: "cover",
                        objectPosition: "center",
                        maxHeight: "180px",

                    }}
                />}
        >
            <Meta
                style={{
                    width: "100%",
                }}
                title={item.title}
                description={
                    <>
                        <Row>

                            <Typography.Text
                                ellipsis
                            >{item.description}
                            </Typography.Text>
                        </Row>
                        <Row justify="space-between" align="middle" >
                            <Divider />
                            <Col>
                                <Avatar src={item.author.avatar_url} />
                                {" "} by {" "}
                                <Typography.Text >{item.author.nickname}</Typography.Text>
                            </Col>
                            <Divider type="vertical" />
                            <Col>
                                <Tag color="cyan">{item.blog_category.name}</Tag>
                            </Col>
                        </Row>
                    </>
                }
            />
        </Card>
    )
}

const contentStyle: React.CSSProperties = {
    height: '300',
    color: '#000000',
    lineHeight: '300',
    // textAlign: 'center',
    background: '#364d79',
    // 填滿
    objectFit: "fill",
    objectPosition: "center",
  };

const UserBlogList = () => {
    const { response } = useAxiosNew<ListResponseProps<BlogResponseProps>>(
        {
            method: "get",
            url: BLOG_URL,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        }
    )

    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
      };
    return (
        <>
        <Card>
            <Carousel effect="fade" autoplay afterChange={onChange}>
            {
                        // loop data, and max index = 5
                        response?.data_list?.slice(0, 5).map(
                            (item =>
                                <div>
                                    <img style={contentStyle} src={item.preview_image_url}/>
                                </div>)
                        ) || <></>
                    }
            </Carousel>
            </Card>
            <Divider dashed orientation="left">
                Blog List
            </Divider>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    overflowX: "auto",
                    width: "100%",
                    paddingLeft: "10px",
                }}
            >
                {
                    response?.data_list?.map(
                        (item =>
                            <div
                                style={{
                                    padding: "20px",
                                    flex: "0 0 250px",
                                }}><UserBlogCard {...item} />
                            </div>) || []
                    )

                }

            </div>
            <Divider dashed orientation="left">
                New
            </Divider>
            <div
            >
                <Row>
                    {
                        // loop data, and max index = 5
                        response?.data_list?.slice(0, 4).map(
                            (item =>
                                <Col xxl={4} lg={6} md={6} sm={8} xs={24} >
                                    <div
                                        style={{
                                            padding: 20,
                                        }}
                                    >
                                        <UserBlogCard {...item} />
                                    </div>
                                </Col>) || []
                        )
                    }
                </Row>
            </div>
        </>)
}

export default UserBlogList