/*
 * @Author: Hyrm 1358188945@qq.com
 * @Date: 2022-12-06 19:38:54
 * @LastEditors: Hyrm 1358188945@qq.com
 * @LastEditTime: 2022-12-29 21:55:46
 * @FilePath: \wms-client\src\store\modules\dataVisual.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getCommonInfo, getStoreInfo, getYearFinishOrder, getSalesInfo } from "@/api/dataVisual"
export default {
    namespaced: true,
    state: {
        commonInfo: {},
        yearFinishOrder: {},
        storeInfo: [],
        salesInfo: {}
    },
    actions: {
        async getCommonInfo({ commit }) {
            let res = await getCommonInfo()
            if (res.data.status == 200) {
                commit('updataCommonInfo', res.data.data)
            }
        },
        async getYearFinishOrder({ commit }, payload) {
            let res = await getYearFinishOrder(payload)
            if (res.data.status == 200) {
                commit('updataYearFinishOrder', res.data.data)
            }
        },
        async getStoreInfo({ commit }) {
            let res = await getStoreInfo()
            if (res.data.status == 200) {
                commit('updataStoreInfo', res.data.data)
            }
        },
        async getSalesInfo({ commit }, payload) {
            let res = await getSalesInfo(payload)
            if (res.data.status == 200) {
                commit('updataSalesInfo', res.data.data)
            }
        }
    },
    mutations: {
        updataCommonInfo: function (state, payload) {
            state.commonInfo = payload
        },
        updataYearFinishOrder: function (state, payload) {
            state.yearFinishOrder = payload
        },
        updataStoreInfo: function (state, payload) {
            state.storeInfo = payload
        },
        updataSalesInfo: function (state, payload) {
            state.salesInfo = payload
        }
    },
    getters: {}
}