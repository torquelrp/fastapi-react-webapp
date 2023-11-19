import { Form as AntdForm, Input, Layout, Row, Card, Button, Divider, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { UserContext } from '../../hooks/auth';
import { OAuth } from '../../components/Buttons';
import useAxiosNew from '../../hooks/useAxiosNew';
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

const Login = () => {
    const location = useLocation();
    const { user, login, isLoading, setLoginInfo } = useContext(UserContext);
    const { fetchData: kakaoFeatchData, response: kakaoResp, loading: kakaoLoading } = useAxiosNew<any>({})
    const oAuthHandler = (): void => {
        window.location.assign(KAKAO_AUTH_URL)
    };
    const navigate = useNavigate()
    const onFinish = (values: any) => {
        login(values.username, values.password)
        console.log(user)
    };

    useEffect(() => {
        if (location.search) {
            const code = new URL(window.location.href).searchParams.get("code");
            if (code) {
                console.log("code!")
                kakaoFeatchData({
                    method: "get",
                    url: '/api/oauth/token' + window.location.search,
                })
            }
        }
    }, [location.search, kakaoFeatchData])

    useEffect(() => {
        if (kakaoResp) {
            console.log(kakaoResp)
            navigate('/')
            setLoginInfo(kakaoResp)
        }
    }, [kakaoResp, navigate, setLoginInfo])

    useEffect(() => {
        console.log(user)
        if (user?.id) {
            navigate('/')
        }
    }, [user, navigate])

    return (
        <Layout>
            <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
                <Card>
                    <AntdForm
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: false,
                        }}
                        onFinish={onFinish}
                    >
                        <AntdForm.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </AntdForm.Item>
                        <AntdForm.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </AntdForm.Item>
                        <AntdForm.Item>
                            <Button
                                loading={isLoading} type="primary"
                                htmlType="submit"
                                style={{ width: '100%' }}
                            // className="login-form-button"
                            >
                                Log in
                            </Button>
                        </AntdForm.Item>
                        <AntdForm.Item>
                            <Space>
                                Don't have an account?
                                <a href="/signup">register now!</a>
                            </Space>
                            <Divider dashed>OR</Divider>
                            <OAuth.KakaoButton
                                loading={kakaoLoading}
                                onClick={oAuthHandler}
                            />
                        </AntdForm.Item>
                    </AntdForm>
                </Card>
            </Row>
        </Layout>
    )
}

export default Login