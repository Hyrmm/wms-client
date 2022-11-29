import request from "@/api"

export const getStock = (params) => {
    return request(
        {
            url: "/store/getStock",
            method: "get",
            params: params
        }
    )
}
export const getStoreOptions = (query) => {
    return request(
        {
            url: "/store/getStoreOptions",
            method: "get",
            params: query
        }
    )
}
export const getTransportStatusOptions = (query) => {
    return request(
        {
            url: "/store/getTransportStatusOptions",
            method: "get",
            params: query
        }
    )
}
//查询出入口记录
export const getStockRecording = (query) => {
    return request(
        {
            url: "/store/getStockRecording",
            method: "get",
            params: query
        }
    )
}


//入库

export const inStore = (data) => {
    return request(
        {
            url: "/store/inStore",
            method: "post",
            data: data
        }
    )
}
//出库
export const outStore = (data) => {
    return request(
        {
            url: "/store/outStore",
            method: "post",
            data: data
        }
    )
}

//新增库存
export const addStore = (data) => {
    return request(
        {
            url: "/store/addStore",
            method: "post",
            data: data
        }
    )
}





