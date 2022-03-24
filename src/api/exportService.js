import request from '@/utils/request'
import base from "./baseUrl"
let BASEROOT = base + '/api/v1'

if (process.env.NODE_ENV == "production") {
    BASEROOT = process.env.VUE_APP_URL + "/api/v1"
}

const exportService = {
    // 导出策略
    selectAllOutPortStrategy(data) {
        return request({
            url: BASEROOT + "/exportService/job/selectAllOutPortStrategy",
            method: 'post',
            params: data
        })
    },
    // 删除
    deleteStrategy(data) {
        return request({
            url: BASEROOT + "/exportService/job/deleteStrategy",
            method: 'delete',
            data: data
        })
    },
    // 获取导出导入类型
    selStrategyJobMsg(data) {
        return request({
            url: BASEROOT + "/exportService/job/selStrategyJobMsg",
            method: 'post',
            data: data
        })
    },
    // 新增
    createOutPortStrategy(data) {
        return request({
            url: BASEROOT + "/exportService/job/createOutPortStrategy",
            method: 'post',
            data: data
        })
    },
    // 获取导出策略
    selectAlllnPortStrategy(data) {
        return request({
            url: BASEROOT + "/exportService/job/selectAlllnPortStrategy",
            method: 'post',
            data: data
        })
    },
    // 获取导入策略数据列表
    selectAllInPortStrategy(data) {
        return request({
            url: BASEROOT + "/exportService/job/selectAllInPortStrategy",
            method: 'post',
            data: data
        })
    },
    // 导入策略新增
    createInPortStrategy(data) {
        return request({
            url: BASEROOT + "/exportService/job/createInPortStrategy",
            method: 'post',
            data: data
        })
    },

    // 导出修改
    upOutStrategy(data) {
        return request({
            url: BASEROOT + "/exportService/job/upOutStrategy",
            method: 'post',
            params: data
        })
    },
    // 导入修改
    upInStrategy(data) {
        return request({
            url: BASEROOT + "/exportService/job/upInStrategy",
            method: 'post',
            params: data
        })
    },
    // 导入导出策略信息列表
    queryOutInMsg(data) {
        return request({
            url: BASEROOT + "/exportService/job/queryOutInMsg",
            method: 'post',
            params: data
        })
    },
    selOutPutFileMsg(data) {
        return request({
            url: BASEROOT + "/exportService/job/selOutPutFileMsg",
            method: 'post',
            data: data
        })
    },
    selInPutFileMsg(data) {
        return request({
            url: BASEROOT + "/exportService/job/selInPutFileMsg",
            method: 'post',
            data: data
        })
    },
}
export default exportService

