import request from '@/utils/request'
import base from "./baseUrl"
let BASEROOT = base + "/api/v1/product"
if (process.env.NODE_ENV == "production") {
    BASEROOT = process.env.VUE_APP_URL + "/api/v1/product"
}
const systemAppoint = {
    // 获取系统能力
    systemCapacity(data) {
        return request({
            url: BASEROOT + "/appoint/systemAbilityInfo/list",
            method: 'get',
            params: data
        })
    },
    // 获取系统能力删除
    DeleteCapacity(id) {
        return request({
            url: BASEROOT + `/appoint/systemAbilityInfo/${id}`,
            method: 'delete',
        })
    },
    // 获取系统能力生成
    productReport(data) {
        return request({
            url: BASEROOT + "/appoint/systemAbilityInfo/report",
            method: 'get',
            params: data
        })
    },
    // 获取系统状态
    systemStatus(data) {
        return request({
            url: BASEROOT + "/appoint/systemStatusInfo/list",
            method: 'get',
            params: data
        })
    },
    // 获取系统状态删除
    DeleteStatus(id) {
        return request({
            url: BASEROOT + `/appoint/systemStatusInfo/${id}`,
            method: 'delete',
        })
    },
    // 获取系统状态生成
    generateReport(data) {
        return request({
            url: BASEROOT + "/appoint/systemStatusInfo/generateReport",
            method: 'get',
            params: data
        })
    },
}

export default systemAppoint;

