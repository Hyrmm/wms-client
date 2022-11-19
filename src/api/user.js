import request from "@/api"


export const login = (data) => {
    return request(
        {
            url: "/user/login",
            method: "post",
            data: data
        }
    )
}
