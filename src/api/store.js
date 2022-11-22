import request from "@/api"

export const getStock = (query) => {

    console.log(query)


    return request(
        {
            url: "/store/getStock",
            method: "get",
            query: query
        }
    )
}


export const getStockRecording = (query) => {
    return request(
        {
            url: "/store/getStock",
            method: "get",
            query: query
        }
    )
}
export const getStoreOptions = (query) => {
    return request(
        {
            url: "/store/getStoreOptions",
            method: "get",
            query: query
        }
    )
}


