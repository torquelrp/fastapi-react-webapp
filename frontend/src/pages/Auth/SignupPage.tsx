import { Layout, Card, Row } from "antd"
import { Form } from "../../components/Admin/Form/Form"
import { SIGNUP_URL } from "../../api/config"

const SignupPage = () => {
    const headers = {
        'content-type': 'application/x-www-form-urlencoded'
    }
    return (
        <Layout>
            <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
                <Card>
                    <Form
                        hasUpdate={true}
                        submitButtonTitle="Signup"
                        headers={headers}
                        title="Signup"
                        rules={[]}
                        formData={[
                            { username: { required: true, message: 'Please insert', trigger: 'onSubmit' }, },
                            { password: { required: true, message: 'Please insert', trigger: 'onSubmit' }, },
                        ]}
                        formType={[
                            {
                                label: 'Username',
                                key: 'username',
                                type: 'text',
                                placeholder: 'Enter your username',
                            },
                            {
                                label: 'Password',
                                key: 'password',
                                type: 'text',
                                placeholder: 'Enter your password',
                            },
                        ]}
                        api={SIGNUP_URL}
                        callbackUrl="/"
                    />
                </Card>
            </Row>
        </Layout>
    )
}

export default SignupPage