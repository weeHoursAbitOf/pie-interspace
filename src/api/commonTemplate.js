import request from '@/utils/request'
import base from "./baseUrl"
let BASEROOT = base + "/api/v1/usv/common"
if (process.env.NODE_ENV == "production") {
    BASEROOT = process.env.VUE_APP_URL + "/api/v1/usv/common"
}

const commonTemplate = {
    // 模板下载
    downloadTemplate(data) {
        return request({
            url: BASEROOT + "/template/downloadTemplate",
            method: 'get',
            params: data,
            responseType: "blob"
        })
    },
    // 获取模板
    getTemplateList(data) {
        return request({
            url: BASEROOT + "/template/list",
            method: 'get',
            params: data
        })
    },
    // 添加模板
    getTemplateAdd(data) {
        return request({
            url: BASEROOT + "/template",
            method: 'post',
            data: data
        })
    },
    // 删除模板
    getTemplateDelete(id) {
        return request({
            url: BASEROOT + `/template/${id}`,
            method: 'delete',
            data: ""
        })
    },
    // 更新模板
    getTemplateUpdate(id, data) {
        return request({
            url: BASEROOT + `/template/${id}`,
            method: 'put',
            data: data
        })
    },
}

export default commonTemplate