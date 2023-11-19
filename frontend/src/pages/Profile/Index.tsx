import { PROFILE_URL, ProfileResponseProps } from '../../api/config';
import { Form } from '../../components/Admin/Form/Form';
import { UserContext } from '../../hooks/auth';
import useAxiosNew from '../../hooks/useAxiosNew';
import { useContext, useEffect } from 'react';
const Profile = () => {
    // use auth context
    const { user } = useContext(UserContext);
    const { fetchData, response, loading } = useAxiosNew<ProfileResponseProps>({
        headers: {
            Authorization: `Bearer ${user?.token}`,
            url: PROFILE_URL,
        }
    });
    useEffect(() => {
        fetchData({
            method: "get",
            url: PROFILE_URL,
        })
    }, [fetchData]);
    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <Form
            // headers={}
            callbackUrl='/profile'
            api={`${PROFILE_URL}`}
            hasUpdate={true}
            title="Profile"
            rules={
                { name: { required: true, message: 'Please insert', trigger: 'onSubmit' }, }
            }
            formType={[
                {
                    label: 'Nickname',
                    key: 'nickname',
                    type: 'text',
                },
                {
                    label: 'Email',
                    key: 'email',
                    type: 'text',
                },
                {
                    label: 'Avatar',
                    key: 'avatar_url',
                    type: 'image',
                },
                // {
                //     label: 'Provider Name',
                //     key: 'provider_name',
                //     type: 'text',
                // },
                // {
                //     label: 'Permissions',
                //     key: 'permissions',
                //     type: 'text',
                // },
            ]}
            formData={{
                id: response?.id,
                nickname: response?.nickname,
                email: response?.email,
                avatar_url: response?.avatar_url,
                // provider_name: response?.provider_name || user?.provider_name,
                // permissions: response?.permissions || user?.permissions,
            }}
        />
    )

}

export default Profile