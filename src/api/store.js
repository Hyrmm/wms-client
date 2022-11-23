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
export const getStoreOptions = (query) => {
    return request(
        {
            url: "/store/getStoreOptions",
            method: "get",
            params: query
        }
    )
}


