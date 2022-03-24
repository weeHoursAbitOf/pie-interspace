import request from '@/utils/request'
import base from "./baseUrl"
let BASEROOT = base + '/api/v1/product'
if (process.env.NODE_ENV == "production") {
    BASEROOT = process.env.VUE_APP_URL + "/api/v1/product"
}
const user = {
    // 获取模板
    getTemplatesByTemplateType(data) {
        return request({
            url: BASEROOT + "/basic/template/getTemplatesByTemplateType",
            method: 'get',
            params: data
        })
    },
    // 获取模板
    getTemplatesByTemplateTypes(data) {
        return request({
            url: BASEROOT + "/basic/template/getTemplatesByTemplateTypes",
            method: 'get',
            params: data
        })
    },
    // TLE立即生成文件
    tleProduct(id, data) {
        return request({
            url: BASEROOT + `/basic/orbitProduct/tleProduct?taskType=${id}`,
            method: 'post',
            data: data
        })
    },
    // ELE立即生成文件
    expoductOrbitProduct(id, data) {
        return request({
            url: BASEROOT + `/basic/orbitProduct/exportOrbitProduct?taskType=${id}`,
            method: 'post',
            data: data
        })
    },
    // 定时任务创建
    creTask(data) {
        return request({
            url: BASEROOT + "/basic/rendezvous/creTask",
            method: 'post',
            data: data
        })
    },
    // 编目立即生成文件
    exportCatalogProduct(id, data) {
        return request({
            url: BASEROOT + `/basic/catalogProduct/exportCatalogProduct?taskType=${id}`,
            method: 'post',
            data: data
        })
    },
    getExportCatalogProduct(id, data) {
        return request({
            url: BASEROOT + `/basic/orbitProduct/getExportCatalogProduct?taskType=${id}`,
            method: 'post',
            data: data
        })
    },
    // ---------------------------------------------------
    getRenTemAll(data) {
        return request({
            url: BASEROOT + "/basic/rendezvous/getRenTemAll",
            method: 'post',
            data: data
        })
    },

    getFallTemAll(data) {
        return request({
            url: BASEROOT + "/basic/spaceSituationFall/getFallTemAll",
            method: 'post',
            data: data
        })
    },
    // exportCatalogProduct(data) {
    //     return request({
    //         url: BASEROOT + "/basic/rendezvous/exportCatalogProduct",
    //         method: 'post',
    //         data: data
    //     })
    // },
}

export default user

