import { getStock, getStoreOptions, getTransportStatusOptions } from "@/api/store"
import { formatOptions } from "@/utils"
export default {
    namespaced: true,
    state: {
        materialStock: [],
        productStock: [],
        productStoreOptions: [],
        materialStoreOptions: [],
        storeOptions: [],
        transportStatusOptions: []
    },
    actions: {
        async getMaterialStock({ commit }, payload) {
            let res = await getStock(payload)
            if (res.data.status == 200) {
                commit("upDataMaterialStock", res.data)
            }
            return res
        },
        async getProductStock({ commit }, payload) {
            let res = await getStock(payload)
            if (res.data.status == 200) {
                commit("upDataProductStock", res.data)
            }
            return res
        },



        async getStoreOptions({ commit }, payload) {
            let res = await getStoreOptions(payload)
            if (res.data.status == 200) {
                commit("upDataStoreOptions", res.data.data)
            }
            return res
        },
        async getTransportStatusOptions({ commit }, payload) {
            let res = await getTransportStatusOptions(payload)
            if (res.data.status == 200) {
                commit("upDataTransportStatusOptions", res.data.data)
            }
            return res
        }
    },
    mutations: {
        upDataStock(state, data) {
            state.stock = data
        },
        upDataMaterialStock(state, data) {
            state.materialStock = data
        },
        upDataProductStock(state, data) {
            for (const item of data.data) {
                item.materialRecipe = JSON.parse(item.materialRecipe)
            }
            state.productStock = data
        },
        upDataStoreOptions(state, data) {
            for (const optionsType in data) {
                switch (optionsType) {
                    case "1": {
                        state.materialStoreOptions = formatOptions(data[optionsType])
                        break
                    }
                    case "2": {
                        state.productStoreOptions = formatOptions(data[optionsType])
                        break
                    }
                }
            }
        },
        upDataTransportStatusOptions(state, data) {
            state.transportStatusOptions = data
        }
    },
    getters: {}
}