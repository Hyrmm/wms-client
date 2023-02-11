/*
 * @Author: Hyrm 1358188945@qq.com
 * @Date: 2022-11-19 15:32:16
 * @LastEditors: Hyrm 1358188945@qq.com
 * @LastEditTime: 2023-02-05 21:08:22
 * @FilePath: \wms-client\src\api\store.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
//查询出入库记录
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

//修改库存




//变更出库订单状态
export const modifyOutStoreStatus = (data) => {
    return request(
        {
            url: "/store/modifyOutStoreStatus",
            method: "post",
            data: data
        }
    )
}




