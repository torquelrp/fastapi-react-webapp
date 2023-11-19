import { TableProps as AntdTableProps } from "antd";


export interface TableProps extends AntdTableProps<any> {
    isPagination?: boolean

    totalPages: string | number
    pageSize: string | number
    currentPage: string | number
    totalCount: string | number

    isLoading: boolean
    hasCustomRow?: boolean

    dataSource: any

    subUrl: string

    hasNew?: boolean
    hasEdit?: boolean

    hasSort?: boolean
    sortTypes?: string[]

    hasChangeOrder?: boolean
    sortOrder?: string

    hasSearch?: boolean
    searchPlaceholder?: string

    hasDownload?: boolean
    downloadLoading?: boolean
    downloadTitle?: string
    
}
