

    console.log(window)
export const getToken = () => {
    return global.localStorage.getItem("authorization")
}
export const setToken = (token) => {

    return global.localStorage.setItem("authorization", token)
}
