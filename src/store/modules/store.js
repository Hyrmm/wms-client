import { getStock, getAllStock, getStoreOptions } from "@/api/store"
import { formatOptions } from "@/utils"
export default {
    namespaced: true,
    state: {
        materialStock: [],
        productStock: [],
        productStoreOptions: [],
        materialStoreOptions: [],
        allMaterialStock: [],
        allProductStock: []
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
        async getAllMaterialStock({ commit }, payload) {
            let res = await getAllStock(payload)
            if (res.data.status == 200) {
                commit("upDataAllMaterialStock", res.data)
            }
            return res
        },
        async getAllProductStock({ commit }, payload) {
            let res = await getAllStock(payload)
            if (res.data.status == 200) {
                commit("upDataAllProductStock", res.data)
            }
            return res
        }
    },
    mutations: {
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
        upDataAllMaterialStock(state, data) {
            state.allMaterialStock = data
        },
        upDataAllProductStock(state, data) {
            state.allProductStock = data
        }
    },
    getters: {}
}