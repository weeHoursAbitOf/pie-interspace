import request from '@/utils/request'
import base from "./baseUrl"
let BASEROOT = base + "/api/v1/usv/common"
if (process.env.NODE_ENV == "production") {
    BASEROOT = process.env.VUE_APP_URL + "/api/v1/usv/common"
}

const common = {
    // 发射窗口
    getLaunchWindows(data) {
        return request({
            url: BASEROOT + "/mpp/retrievalLaunchWindows",
            method: 'post',
            data: data
        })
    },
    //   校验是否存在图片数据源 
    getJudgeMsg(data) {
        return request({
            url: BASEROOT + "/mpp/judgeMsg",
            method: 'get',
            params: data
        })
    },
    // 红绿图
    getMkRedGreen(data) {
        return request({
            url: BASEROOT + "/mpp/MkRedGreen",
            method: 'post',
            data: data,
        })
    },
    // 下载红绿图
    getMkRedGreenDownPath(data) {
        return request({
            url: BASEROOT + "/mpp/MkRedGreen",
            method: 'get',
            params: data,
            responseType: "blob"
        })
    },


    // 用户意见统计
    opinionList(data) {
        return request({
            url: BASEROOT + "/messageStatistics/opinionList",
            method: 'get',
            params: data,
        })
    },
    // 留言回复统计
    replyList(data) {
        return request({
            url: BASEROOT + "/messageStatistics/replyList",
            method: 'get',
            params: data,
        })
    },
}

export default common