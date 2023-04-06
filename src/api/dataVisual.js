/*
 * @Author: Hyrm 1358188945@qq.com
 * @Date: 2022-12-06 19:26:24
 * @LastEditors: Hyrm 1358188945@qq.com
 * @LastEditTime: 2022-12-23 19:20:10
 * @FilePath: \wms-client\src\api\dataVisual.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "@/api"


export const getCommonInfo = () => {
    return request(
        {
            url: "/dataVisual/getCommonInfo",
            method: "get",
        }
    )
}

export const getYearFinishOrder = (query) => {
    return request(
        {
            url: "/dataVisual/getYearFinishOrder",
            method: "get",
            params: query
        }
    )
}


export const getStoreInfo = (query) => {
    return request(
        {
            url: "/dataVisual/getStoreInfo",
            method: "get",
        }
    )
}
export const getSalesInfo = (query) => {
    return request(
        {
            url: "/dataVisual/getSalesInfo",
            method: "get",
            params: query
        }
    )
}

