import request from '@/utils/request'
import base from "./baseUrl"
let BASEROOT = base + "/api/v1/document"
if (process.env.NODE_ENV == "production") {
    BASEROOT = process.env.VUE_APP_URL + "/api/v1/document"
}

const regulationManage = {
    //查询文档列表
    getDocumentList(data) {
        return request({
            url: BASEROOT + "/resources/document",
            method: 'post',
            data: data
        })
    },

    //新建信息
    createInfo(data) {
        return request({
            url: BASEROOT + "/resources/document",
            method: 'put',
            data: data
        })
    },

    //更新文档信息
    updateInfo(indexName, data) {
        console.log(indexName, data)
        return request({
            url: BASEROOT + `/resources/document/${indexName}`,
            method: 'put',
            data: data
        })
    },

    //删除信息
    deleteInfo(data) {
        return request({
            url: BASEROOT + "/resources/document/status",
            method: 'delete',
            params: data
        })
    },

    //立即置顶
    topInfo(data) {
        return request({
            url: BASEROOT + "/resources/document/top",
            method: 'put',
            params: data
        })
    },
    // 取消置顶
    offTopInfo(data) {
        return request({
            url: BASEROOT + "/resources/document/offTop",
            method: 'put',
            params: data
        })
    },

    //文档移动
    moveInfo(data) {
        return request({
            url: BASEROOT + "/resources/document/location",
            method: 'put',
            params: data
        })
    },

    //更新文档状态（发布）
    issueInfo(data) {
        return request({
            url: BASEROOT + "/resources/textStatus",
            method: 'put',
            data: data
        })
    },
}



export default regulationManage