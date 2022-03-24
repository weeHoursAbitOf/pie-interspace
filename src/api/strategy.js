import request from '@/utils/request'
import base from "./baseUrl"
let BASEROOT = base + '/api/v1'

if (process.env.NODE_ENV == "production") {
    BASEROOT = process.env.VUE_APP_URL + "/api/v1"
}

// 策略的API接口
const strategyService = {

    //策略数据查询
    selectAllStrategy(data) {
        return request({
            url: BASEROOT + "/usv/common/strategy",
            method: 'get',
            params: data
        })
    },
    // 删除
    deleteStrategy(id) {
        return request({
            url: BASEROOT + `/usv/common/strategy/${id}`,
            method: 'delete'
        })
    },

    //批量删除
    deleteBatchStrategy(params) {
        return request({
            url: BASEROOT + `/usv/common/strategy/batch?ids=${params}`,
            method: 'delete'
        })
    },
    // 获取策略数据类型
    selectStrategyType() {
        return request({
            url: BASEROOT + "/usv/common/strategy/type",
            method: 'get'
        })
    },
    // 获取策略数据时间
    selectStrategyTime() {
        return request({
            url: BASEROOT + "/usv/common/strategy/time",
            method: 'get'
        })
    },
    // 新增
    createStrategy(data) {
        return request({
            url: BASEROOT + "/usv/common/strategy",
            method: 'post',
            data: data
        })
    },
    // 修改
    updateStrategy(id, data) {
        return request({
            url: BASEROOT + `/usv/common/strategy/${id}`,
            method: 'put',
            data: data
        })
    },
    queryStrategyHis(params) {
        return request({
            url: BASEROOT + "/usv/common/strategy/his",
            method: 'get',
            params: params
        })
    },
    batchDeleteStrategyHis(params) {
        return request({
            url: BASEROOT + "/usv/common/strategy/his",
            method: 'delete',
            params: params
        })
    }
}
export default strategyService

