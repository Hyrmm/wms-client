
import request from "@/api"


export const getClientOptions = (query) => {
    return request(
        {
            url: "/client/getClientOptions",
            method: "get",
        }
    )
}

export const getClient = (query) => {
    return request(
        {
            url: "/client/getClient",
            method: "get",
            params: query
        }
    )
}

export const modifyClient = (data) => {
    return request(
        {
            url: "/client/modifyClient",
            method: "post",
            data: data
        }
    )
}
export const addClient = (data) => {
    return request(
        {
            url: "/client/addClient",
            method: "post",
            data: data
        }
    )
}

export const delClient = (data) => {
    return request(
        {
            url: "/client/delClient",
            method: "post",
            data: data
        }
    )
}

