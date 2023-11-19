import decodeJwt from 'jwt-decode';
import useAxios
 from '../../hooks/useAxios';
import { LOGIN_URL, LoginResponseRrops } from '../../api/config';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../components/Admin/Form/Form';

const Login = () => {
    const headers = {
        'content-type': 'application/x-www-form-urlencoded' 
    }
    const navigate = useNavigate()
    const { fetchData, response } = useAxios<LoginResponseRrops>()
    const onFinish = (values: any) => {
        fetchData('POST', LOGIN_URL, values, headers)
        console.log('Received values of form: ', values);
    };
    useEffect(() => {
        if (response?.access_token) {
            const decodedToken: any = decodeJwt(response.access_token);
            localStorage.setItem('token', response.access_token);
            localStorage.setItem('permissions', decodedToken.permissions);
            navigate('/')
          }

    }, [response])

    return (
        <Form
            headers={headers}
            callbackUrl='/home'
            api={LOGIN_URL}
            hasUpdate={true}
            title="Login"
            rules={
                { name: { required: true, message: 'Please insert', trigger: 'onSubmit' }, }
            }
            formType={[
                {
                    label: 'Username',
                    key: 'username',
                    type: 'text',
                },
                {
                    label: 'Password',
                    key: 'password',
                    type: 'text',
                },
            ]}
            formData={{}}
            />
    )
}

export default Login