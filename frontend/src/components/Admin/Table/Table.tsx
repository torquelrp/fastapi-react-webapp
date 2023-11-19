import { TableProps } from "./types"
import {
    Button,
    Row,
    Select,
    Table as AntdTable,
    // Typography,
    Space,
    message,
} from "antd";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../hooks/auth";
import { useContext } from "react";

export const Table: React.FC<TableProps> = (props) => {
    const {
        // isPagination = true,
        // totalPages = 0,
        // pageSize = 30,
        // currentPage = 1,
        // totalCount = 0,
        isLoading = false,
        // title = '',
        columns = [],
        // hasCustomRow = false,
        dataSource = '',
        subUrl = '',
        hasNew = false,
        hasEdit = false,
        hasSort = false,
        sortTypes = [],
        // sortOrder = '오름차순',

        // hasChangeOrder = false,

        hasSearch = false,
        // searchPlaceholder = '검색어를 입력하세요.',
        // hasDownload = false,
        // downloadLoading = false,
        // downloadTitle = '',
    } = props;
    const { user } = useContext(UserContext);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const onNew = () => {
        if (!user?.id) {
            messageApi.open({
                type: 'warning',
                content:
                    'Please login first',
                duration: 3,
            });
        }
        else {
            navigate(subUrl + '/new')
        }
    }
    return (
        <>
            {/* {title && (<Typography.Title>{title}</Typography.Title>)} */}
            <br />
            {contextHolder}
            <Row justify='center'>
                <Space align="center" >
                    {
                        hasSort && sortTypes && (
                            <Select
                                style={{ width: '100px' }}
                                defaultValue={sortTypes[0]}
                            >
                                {
                                    sortTypes.map((sortType, index) => {
                                        return (
                                            <option key={index} value={sortType}>{sortType}</option>
                                        )
                                    })}
                            </Select>
                        )
                    }
                    {
                        hasSearch && (
                            <Button>
                                검색
                            </Button>
                        )
                    }
                    {
                        hasNew && (
                            <Button onClick={onNew}>
                                NEW
                            </Button>
                        )
                    }
                </Space>
            </Row>
            <br />
            <AntdTable
                onRow={(record) => {
                    return {
                        onClick: (event) => {
                            if(hasEdit){
                                navigate(subUrl + '/edit/' + record.id)
                            }
                         },
                    };
                }}
                columns={columns}
                dataSource={dataSource}
                loading={isLoading}
            // pagination={isPagination}

            />
        </>
    )
}