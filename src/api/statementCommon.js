import request from '@/utils/request'
import base from "./baseUrl"
let BASEROOT = base + "/api/v1/usv"
if (process.env.NODE_ENV == "production") {
    BASEROOT = process.env.VUE_APP_URL + "/api/v1/usv"
}
const statementCommon = {
    // 公共获取报表数据列表   月报，简报，专报，空间事件报告等
    commonVersion(data) {
        return request({
            url: BASEROOT + "/common/version",
            method: 'get',
            params: data
        })
    },
    // 版本提交审核
    commonVersionExamine(data) {
        return request({
            url: BASEROOT + "/common/audit/Examine",
            method: 'get',
            params: data
        })
    },
    // 删除指定产品的版本
    DeletetByProduct(data) {
        return request({
            url: BASEROOT + "/common/version/byProduct",
            method: 'delete',
            params: data
        })
    },
    // 版本管理新增
    productVersionAdd(data) {
        return request({
            url: BASEROOT + "/common/version/add",
            method: 'post',
            data: data
        })
    },
    // 版本管理更新
    productVersionUpadte(id, data) {
        return request({
            url: BASEROOT + `/common/version/${id}`,
            method: 'put',
            data: data
        })
    },
    // 删除指定版本
    DeletetVersion(id) {
        return request({
            url: BASEROOT + `/common/version/${id}`,
            method: 'delete',
        })
    },
    // 发布产品
    productVersionRelease(id) {
        return request({
            url: BASEROOT + `/common/product/release/${id}`,
            method: 'put'
        })
    },
    // 对外服务对象
    publishOutAdd(data) {
        return request({
            url: BASEROOT + "/common/product/publish/out/add",
            method: 'post',
            data: data
        })
    },
}

export default statementCommon;

