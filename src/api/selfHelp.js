import request from '@/utils/request'
import base from "./baseUrl"
let BASEROOT = base + "/api/v1"
if (process.env.NODE_ENV == "production") {
    BASEROOT = process.env.VUE_APP_URL + "/api/v1"
}
const selfHelp = {
    // 值班端查询
    selfHelpList(data) {
        return request({
            url: BASEROOT + "/usv/common/selfHelp/list",
            method: 'get',
            params: data
        })
    },
    // 删除
    selfHelpDelete(id) {
        return request({
            url: BASEROOT + `/usv/common/selfHelp?id=${id}`,
            method: 'delete',
        })
    },
    // 删除
    selfHelpBatchDelete(id) {
        return request({
            url: BASEROOT + `/usv/common/selfHelp/batch?ids=${id}`,
            method: 'delete',
        })
    },
    //编辑
    updateSelfHelp(data) {
        return request({
            url: BASEROOT + "/usv/common/selfHelp",
            method: 'put',
            data: data
        })
    },
    //新增
    addSelfHelp(data) {
        return request({
            url: BASEROOT + "/usv/common/selfHelp",
            method: 'post',
            data: data
        })
    },
}

export default selfHelp;

