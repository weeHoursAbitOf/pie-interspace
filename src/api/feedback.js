import request from '@/utils/request'
import base from "./baseUrl"
let BASEROOT = base + "/api/v1"
if (process.env.NODE_ENV == "production") {
    BASEROOT = process.env.VUE_APP_URL + "/api/v1"
}
const feedback = {
    // 值班端查询留言
    feedbackList(data) {
        return request({
            url: BASEROOT + "/usv/common/feedback/list",
            method: 'get',
            params: data
        })
    },
    // 获取留言类型
    feedbackType(data) {
        return request({
            url: BASEROOT + "/usv/common/feedback/type",
            method: 'get',
            params: data
        })
    },
    // 删除留言
    feedbackDelete(data) {
        return request({
            url: BASEROOT + "/usv/common/feedback",
            method: 'delete',
            params: data
        })
    },
    // 批量删除留言
    batchDelete(data) {
        return request({
            url: BASEROOT + "/usv/common/feedback/batch",
            method: 'delete',
            params: data
        })
    },
    // 查询留言回复
    inquireFeedbackReply(data) {
        return request({
            url: BASEROOT + "/usv/common/feedback/reply",
            method: 'get',
            params: data
        })
    },
    // 回复反馈留言
    feedbackReply(data) {
        return request({
            url: BASEROOT + "/usv/common/feedback/reply",
            method: 'post',
            data: data
        })
    },
    // 删除回复
    DeleteReply(data) {
        return request({
            url: BASEROOT + "/usv/common/feedback/reply",
            method: 'delete',
            params: data
        })
    },
}

export default feedback;

