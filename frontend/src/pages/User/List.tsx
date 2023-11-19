import useAxiosNew from '../../hooks/useAxiosNew';
import { Table } from '../../components/Admin/Table/Table';
import { USERS_URL, UsersResponseProps, ListResponseProps } from '../../api/config';

const UserList = () => {
    const { response, loading } = useAxiosNew<ListResponseProps<UsersResponseProps>>(
        {
            method: "get",
            url: USERS_URL,
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
                hasSort={true}
                sortTypes={['asc', 'desc']}
                isLoading={loading}
                subUrl='/user'
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
                        width: '10%',
                        // onCell: (record) => ({ onClick: () => { console.log(record) }}),
                        // render: (text: st
                        //     ring, record: any) => { text.toString()},
                        // // scopedSlots: { customRender: 'imageView' },
                    },
                    {
                        title: 'Email',
                        dataIndex: 'email',
                        key: 'email',
                        width: '10%'
                    },
                    {
                        title: 'First Name',
                        dataIndex: 'first_name',
                        key: 'first_name',
                        width: '10%'
                    },
                    {
                        title: 'Last Name',
                        dataIndex: 'last_name',
                        key: 'last_name',
                        width: '10%'
                    },
                    {
                        title: 'Is Active',
                        dataIndex: 'is_active',
                        key: 'is_active',
                        width: '10%',
                        // render(value, record, index) {
                        render(value) {
                            return <>{value.toString()}</>
                        },
                    },
                    {
                        title: 'Is Superuser',
                        dataIndex: 'is_superuser',
                        key: 'is_superuser',
                        width: '10%',
                        render(value) {
                            return <>{value.toString()}</>
                        },
                    }
                ]}
            />
        </>)
}

export default UserList