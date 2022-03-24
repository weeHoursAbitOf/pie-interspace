import request from '@/utils/request'
import base from "./baseUrl"
let BASEROOT = base + '/api/v1/product'

if (process.env.NODE_ENV == "production") {
    BASEROOT = process.env.VUE_APP_URL + "/api/v1/product"
}

const advanced = {
    // 高级用户-需要处理
    seniorSelSafeApply(data) {
        return request({
            url: BASEROOT + "/advanced/apply/seniorSelSafeApply",
            method: 'post',
            data: data
        })
    },
    // 危险交汇信息检索
    RenRetrieval(data) {
        return request({
            url: BASEROOT + "/advanced/apply/RenRetrieval",
            method: 'post',
            data: data
        })
    },
    // 人工处理-发射
    selRenRentrieval1(data) {
        return request({
            url: BASEROOT + "/advanced/apply/selRenRetrieval1",
            method: 'post',
            data: data
        })
    },
    // 人工处理-安全规避
    selRenRetrieval2(data) {
        return request({
            url: BASEROOT + "/advanced/apply/selRenRetrieval2",
            method: 'post',
            data: data
        })
    },
    // 人工处理 确定按钮
    safeApplyEnd(data) {
        return request({
            url: BASEROOT + "/advanced/apply/safeApplyEnd",
            method: 'post',
            data: data
        })
    },
    // 人工处理 确定按钮
    launchApplyEnd(data) {
        return request({
            url: BASEROOT + "/advanced/apply/launchApplyEnd",
            method: 'post',
            data: data
        })
    },
    // 定向用户
    directionalSelSafeApply(data) {
        return request({
            url: BASEROOT + "/advanced/apply/directionalSelSafeApply",
            method: 'post',
            data: data
        })
    },
    tleProduct(data) {
        return request({
            url: BASEROOT + "/advanced/apply/tleProduct",
            method: 'post',
            data: data
        })
    },
    expoductOrbitProduct(data) {
        return request({
            url: BASEROOT + "/advanced/apply/expoductOrbitProduct",
            method: 'post',
            data: data
        })
    },
    // 批量删除
    DeApply(data) {
        return request({
            url: BASEROOT + "/advanced/apply/DeApply",
            method: 'post',
            data: data
        })
    },

    // 审核状态
    examineApproveApply(data) {
        return request({
            url: BASEROOT + "/advanced/apply/examineApproveApply",
            method: 'post',
            data: data
        })
    },
    // 产品申请完成
    applyEnd(data) {
        return request({
            url: BASEROOT + "/advanced/apply/applyEnd",
            method: 'post',
            data: data
        })
    },
    // 获取进度 以及 受理状态列表里
    selApplyStatusMsg(data) {
        return request({
            url: BASEROOT + "/advanced/apply/selApplyStatusMsg",
            method: 'get',
            params: data
        })
    },
    // --------------------------------------------------------------
    //高级产品 获取模板
    getDataTemplate(data) {
        return request({
            url: BASEROOT + "/advanced/template",
            method: 'get',
            params: data
        })
    },
    //高级产品 新增模板
    addTemplate(data) {
        return request({
            url: BASEROOT + "/advanced/template",
            method: 'post',
            data: data
        })
    },
    //高级产品 修改模板
    modifyTemplate(data) {
        return request({
            url: BASEROOT + "/advanced/template",
            method: 'put',
            data: data
        })
    },
    //高级产品 删除模板
    deleteTemplate(data) {
        return request({
            url: BASEROOT + "/advanced/template",
            method: 'delete',
            data: data
        })
    },

    // 获取高级产品 解体模板列表
    getTemplatesByTemplateTypes(data) {
        return request({
            url: BASEROOT + "/advanced/template/getTemplatesByTemplateTypes",
            method: 'get',
            data: data
        })
    },
    // 工作专报-解体报-生成初步报
    initialBreakUpReport(data) {
        return request({
            url: BASEROOT + "/advanced/breakUp/initialBreakUpReport",
            method: 'post',
            data: data
        })
    },
    // 工作专报-解体报-生成详细报
    detailedBreakUpReport(data) {
        return request({
            url: BASEROOT + "/advanced/breakUp/detailedBreakUpReport",
            method: 'post',
            data: data
        })
    },

    // 需求处理-分析产品在轨碰撞预警对外服务  数据列表
    Configure(data) {
        return request({
            url: BASEROOT + "/advanced/OrbitCollisionWarning/Configure",
            method: 'post',
            params: data
        })
    },
    // 需求处理-分析产品在轨碰撞预警对外服务数据  删除
    deleteConfigure(data) {
        return request({
            url: BASEROOT + "/advanced/OrbitCollisionWarning/ConfigureD",
            method: 'delete',
            params: data
        })
    },
    // 需求处理-分析产品在轨碰撞预警对外服务  配置
    OrbitcCollision(data) {
        return request({
            url: BASEROOT + "/advanced/OrbitCollisionWarning/OrbitCollision",
            method: 'post',
            data: data
        })
    },
    // 获取在轨碰撞预警数据列表
    OrbitCollisionWarning(data) {
        return request({
            url: BASEROOT + "/advanced/OrbitCollisionWarning",
            method: 'post',
            data: data
        })
    },
    // 删除在轨碰撞预警数据列表
    DeleteOrbitCollisionWarning(data) {
        return request({
            url: BASEROOT + "/advanced/OrbitCollisionWarning/delete",
            method: 'post',
            data: data
        })
    },
    // 在轨碰撞预警数据列表发布
    getOrbitCollisionPushOrClose(data) {
        return request({
            url: BASEROOT + "/advanced/OrbitCollisionWarning/PushOrClose",
            method: 'put',
            data: data
        })
    },
    // 在轨碰撞预警检索入库记录
    getUsvEwTimeById(data) {
        return request({
            url: BASEROOT + "/advanced/OrbitCollisionWarning/UsvEwTimeById",
            method: 'get',
            params: data
        })
    },
    // ------------------------------------------

    // 产品发布管理-预警产品-陨落事件分析获取所有数据列表
    selUsvEwFallTime(data) {
        return request({
            url: BASEROOT + "/advanced/EWFall/selUsvEwFallTime",
            method: 'get',
            params: data
        })
    },
    // 产品发布管理-预警产品-陨落事件分析删除
    closeDelete(data) {
        return request({
            url: BASEROOT + "/advanced/EWFall/close",
            method: 'post',
            data: data
        })
    },
    // 产品发布管理-预警产品-陨落事件分析详情查看
    UsvEwFallTimeById(data) {
        return request({
            url: BASEROOT + "/advanced/EWFall/UsvEwFallTimeById",
            method: 'get',
            params: data
        })
    },
    // 产品发布管理-预警产品-陨落事件发布或许下线
    PushOrClose(data) {
        return request({
            url: BASEROOT + "/advanced/EWFall/PushOrClose",
            method: 'put',
            data: data
        })
    },
    // 产品发布管理-预警产品-陨落事件产品生成配置
    getFallUpCreateTask(data) {
        return request({
            url: BASEROOT + "/advanced/EWFall/createTask",
            method: 'post',
            data: data
        })
    },


    // 产品发布管理-预警产品-解体事件分析获取所有数据列表
    selUsvEwBreakTime(data) {
        return request({
            url: BASEROOT + "/advanced/EWBreakUp/selUsvEwBreakTime",
            method: 'get',
            params: data
        })
    },
    // 产品发布管理-预警产品-解体事件分析删除
    breakUpDelete(data) {
        return request({
            url: BASEROOT + "/advanced/EWBreakUp/close",
            method: 'post',
            data: data
        })
    },
    // 产品发布管理-预警产品-解体事件分析详情查看
    UsvEwBreakTimeById(data) {
        return request({
            url: BASEROOT + "/advanced/EWBreakUp/UsvEwBreakTimeById",
            method: 'get',
            params: data
        })
    },
    // 产品发布管理-预警产品-解体事件分析详情查看
    breakUpPushOrClose(data) {
        return request({
            url: BASEROOT + "/advanced/EWBreakUp/PushOrClose",
            method: 'put',
            data: data
        })
    },
    // 产品发布管理-预警产品-解体事件分析产品生成配置
    getBreakUpCreateTask(data) {
        return request({
            url: BASEROOT + "/advanced/EWBreakUp/createTask",
            method: 'post',
            data: data
        })
    },
    //需求处理-集成产品-专报-配置陨落产品-立即
    getFallPeport(data) {
        return request({
            url: BASEROOT + "/advanced/fall/fallReport",
            method: 'post',
            data: data
        })
    },
    //需求处理-集成产品-专报-配置陨落产品-定时
    getFallCreateFallJob(data) {
        return request({
            url: BASEROOT + "/advanced/fall/createFallJob",
            method: 'post',
            data: data
        })
    },
    // 基础产品-轨道-编目-解体-陨落-危险交会定时任务
    basicCommonCreate(data) {
        return request({
            url: BASEROOT + "/basic/basicCommon/create",
            method: 'post',
            data: data
        })
    },
    // 基础产品-轨道-编目-解体-陨落-危险交会获取数据列表
    basicServiceList(data) {
        return request({
            url: BASEROOT + "/basic/basicService/getList",
            method: 'get',
            params: data
        })
    },
    // 基础产品-轨道-编目-解体-陨落-危险交会批量删除
    batchDelete(data) {
        return request({
            url: BASEROOT + "/basic/basicService/batchDelete",
            method: 'delete',
            params: data
        })
    },
    // 基础产品-轨道-编目-解体-陨落-危险交会产品下载
    basicCommonDownload(data) {
        return request({
            url: BASEROOT + "/basic/basicCommon/export",
            method: 'get',
            params: data,
            responseType: "blob"
        })
    },

    // 基础产品-轨道-编目-解体-陨落-危险交会获取上次生成时间段
    basicCommonCron(data) {
        return request({
            url: BASEROOT + "/basic/basicCommon/getCron",
            method: 'get',
            params: data,
        })
    },

    // 高级产品-简报生成
    briefReport(data) {
        return request({
            url: BASEROOT + "/advanced/briefReport",
            method: 'get',
            params: data
        })
    },
    // 高级产品-工作专报-危险交会产品生成
    getgenerator(data) {
        return request({
            url: BASEROOT + "/advanced/specialReport/generator",
            method: 'post',
            data: data
        })
    },
    // 高级产品-月报产品生成配置
    getMonthlyReportr(data) {
        return request({
            url: BASEROOT + "/advanced/monthlyReport",
            method: 'get',
            params: data
        })
    },
    // 空间碎片产品生成
    getGenerateReport(data) {
        return request({
            url: BASEROOT + "/advanced/spaceDebris/generateReport",
            method: 'post',
            data: data
        })
    },
    // 发射窗口-生成碰撞概率设置
    getDrawingToolsController(data) {
        return request({
            url: BASEROOT + "/advanced/drawingToolsController/search",
            method: 'get',
            params: data
        })
    },
    // 基础产品配置生成接口
    getBasicCommonCreate(data) {
        return request({
            url: BASEROOT + "/basic/basicCommon/create",
            method: 'post',
            data: data
        })
    },
    // 回显定时任务时间
    getTimeByGroupName(data) {
        return request({
            url: BASEROOT + "/basic/basicCommon/getTimeByGroupName",
            method: 'get',
            params: data
        })
    }
}


export default advanced