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
            method: "post",
            data: query
        }
    )
}
//查询原料出入库记录
export const getMaterialStockRecording = (query) => {
    return request(
        {
            url: "/store/getMaterialStockRecording",
            method: "get",
            params: query
        }
    )
}
//查询成品出入库记录
export const getProductStockRecording = (query) => {
    return request(
        {
            url: "/store/getProductStockRecording",
            method: "get",
            params: query
        }
    )
}
//材料入库
export const inStoreMaterial = (data) => {
    return request(
        {
            url: "/store/inStoreMaterial",
            method: "post",
            data: data
        }
    )
}
//成品入库
export const inStoreProduct = (data) => {

    return request(
        {
            url: "/store/inStoreProduct",
            method: "post",
            data: data
        }
    )
}



//材料出库
export const outStoreMaterial = (data) => {
    return request(
        {
            url: "/store/outStoreMaterial",
            method: "post",
            data: data
        }
    )
}
//成品出库
export const outStoreProduct = (data) => {
    return request(
        {
            url: "/store/outStoreProduct",
            method: "post",
            data: data
        }
    )
}

//新增材料库存
export const addMaterialStore = (data) => {
    return request(
        {
            url: "/store/addMaterialStore",
            method: "post",
            data: data
        }
    )
}
//新增成品库存
export const addProductStore = (data) => {
    return request(
        {
            url: "/store/addProductStore",
            method: "post",
            data: data
        }
    )
}


//修改材料库存
export const editMaterialStore = (data) => {
    return request({
        url: "/store/editMaterialStore",
        method: "post",
        data: data
    })
}
//修改材料库存
export const editProductStore = (data) => {
    return request({
        url: "/store/editProductStore",
        method: "post",
        data: data
    })
}





//删除材料库存
export const delMaterialStore = (data) => {
    return request({
        url: "/store/delMaterialStore",
        method: "post",
        data: data
    })
}


//删除材料库存
export const delProductStore = (data) => {
    return request({
        url: "/store/delProductStore",
        method: "post",
        data: data
    })
}


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




