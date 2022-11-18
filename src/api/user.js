import request from "@/api"


export const login = (data) => {
    return request(
        {
            url: "/list",
            method: "post",
            data: data
        }
    )
}
