import request from "@/api"

export const getStock = (query) => {
    return request(
        {
            url: "/store/getStock",
            method: "get",
            query: query
        }
    )
}