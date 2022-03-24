import request from '@/utils/request'
import base from "./baseUrl"
let BASEROOT = base + "/api/v1/product"
if (process.env.NODE_ENV == "production") {
    BASEROOT = process.env.VUE_APP_URL + "/api/v1/product"
}
const statement = {
    // 获取月报数据列表
    monthlyReport(data) {
        return request({
            url: BASEROOT + "/advanced/monthlyReport/list",
            method: 'get',
            params: data
        })
    },
    // 删除月报数据列表
    DeleteMonthlyReport(data) {
        return request({
            url: BASEROOT + "/advanced/monthlyReport/batchDelete",
            method: 'delete',
            params: data
        })
    },
    // 月报下载
    downloadMonthlyReport(id, data) {
        return request({
            url: BASEROOT + `/advanced/monthlyReport/download/${id}`,
            method: 'get',
            params: data,
            responseType: "blob"
        })
    },
    // 获取简报数据列表
    briefReport(data) {
        return request({
            url: BASEROOT + "/advanced/briefReport",
            method: 'post',
            data: data
        })
    },
    // 简报生成产品
    briefReportBrief(data) {
        return request({
            url: BASEROOT + "/advanced/briefReport/Brief",
            method: 'post',
            data: data
        })
    },
    // 删除简报数据列表
    DeleteBriefReport(data) {
        return request({
            url: BASEROOT + "/advanced/briefReport",
            method: 'delete',
            params: data
        })
    },
    // 获取空间事件报告数据列表
    spaceDebris(data) {
        return request({
            url: BASEROOT + "/advanced/spaceDebris/list",
            method: 'get',
            params: data
        })
    },
    // 删除空间事件报告数据列表
    DeleteSpaceDebris(data, id) {
        return request({
            url: BASEROOT + `/advanced/spaceDebris/${id}`,
            method: 'delete',
            params: data
        })
    },
    // 获取安全规避分析数据列表
    security(data) {
        return request({
            url: BASEROOT + "/advanced/security",
            method: 'post',
            data: data
        })
    },
    // 删除安全规避分析数据列表
    DeleteSecurity(data) {
        return request({
            url: BASEROOT + "/advanced/security",
            method: 'delete',
            params: data
        })
    },
    // 获取发射碰撞预警数据列表
    launch(data) {
        return request({
            url: BASEROOT + "/advanced/launch",
            method: 'post',
            data: data
        })
    },
    // 删除发射碰撞预警数据列表
    DeleteLaunch(data) {
        return request({
            url: BASEROOT + "/advanced/launch",
            method: 'delete',
            params: data
        })
    },
    // 获取工作专报危险交会数据列表
    specialReport(data) {
        return request({
            url: BASEROOT + "/advanced/specialReport",
            method: 'post',
            data: data
        })
    },
    // 删除工作专报危险交会数据列表
    DeleteSpecialReport(data) {
        return request({
            url: BASEROOT + "/advanced/specialReport",
            method: 'delete',
            params: data
        })
    },
    // 获取工作专报解体数据列表
    breakUp(data) {
        return request({
            url: BASEROOT + "/advanced/breakUp",
            method: 'post',
            data: data
        })
    },
    // 删除工作专报解体数据列表
    DeleteBreakUp(data) {
        return request({
            url: BASEROOT + "/advanced/breakUp",
            method: 'delete',
            params: data
        })
    },
    // 获取工作专报陨落数据列表
    advancedFall(data) {
        return request({
            url: BASEROOT + "/advanced/fall",
            method: 'post',
            data: data
        })
    },
    // 专报陨落产品生成
    advancedFallProduce(data) {
        return request({
            url: BASEROOT + "/advanced/fall/fall",
            method: 'post',
            data: data
        })
    },
    // 删除工作专报陨数据列表
    DeleteFall(data) {
        return request({
            url: BASEROOT + "/advanced/fall",
            method: 'delete',
            params: data
        })
    },
    // 批量删除工作专报陨数据列表
    DeleteDelallFall(data) {
        return request({
            url: BASEROOT + "/advanced/fall/delall",
            method: 'post',
            data: data
        })
    },
    // 专报陨落下载
    downloadFallReport(data) {
        return request({
            url: BASEROOT + "/advanced/fall/download",
            method: 'get',
            params: data,
            responseType: "blob"
        })
    },
    // 专项任务报告
    // 接近专项报告-获取数据列表接口
    getApproachList(data) {
        return request({
            url: BASEROOT + "/advanced/approach/list",
            method: "get",
            params: data
        })
    },
    // 接近专项报告-批量删除
    getBatchDelete(data) {
        return request({
            url: BASEROOT + "/advanced/approach/batchDelete",
            method: "delete",
            params: data
        })
    },
    // 接近专项报告-下载
    getApproachDownload(id, data) {
        return request({
            url: BASEROOT + `/advanced/approach/download/${id}`,
            method: 'get',
            params: data,
            responseType: "blob"
        })
    },
    // 碰撞预警专报报告-获取数据列表接口
    getCollisionWarningList(data) {
        return request({
            url: BASEROOT + "/advanced/inOrbitCollisionWarning/list",
            method: "get",
            params: data
        })
    },
    // 碰撞预警专报报告-批量删除
    getCollisionWarningDelete(data) {
        return request({
            url: BASEROOT + "/advanced/inOrbitCollisionWarning/batchDelete",
            method: "delete",
            params: data
        })
    },
    // 碰撞预警专报报告-下载
    getCollisionWarningDownload(id, data) {
        return request({
            url: BASEROOT + `/advanced/inOrbitCollisionWarning/download/${id}`,
            method: 'get',
            params: data,
            responseType: "blob"
        })
    },
}

export default statement;