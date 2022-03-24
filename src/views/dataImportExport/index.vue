<template>
  <div class="pie-container">
    <div class="left-menu">
      <Menu :active-name="activeName" accordion>
        <Submenu name="dataImportManagement" to="dataImportManagement">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-kongjian"></span>
              <span>数据导入管理</span>
            </div>
          </template>
          <MenuItem name="importInterProcess" to="importInterProcess">
            内部网-内部处理区
          </MenuItem>
          <MenuItem name="importProcess" to="importProcess">
            内部网-对外服务区
          </MenuItem>
          <!-- <Submenu name="1-1">
            <template slot="title">内部网-内部处理区</template>
            <MenuItem name="importUserInformation" to="importUserInformation"
              >用户信息</MenuItem
            >
            <MenuItem name="importOrdinaryUser" to="importOrdinaryUser"
              >一般用户需求</MenuItem
            >
            <MenuItem name="importSeniorUser" to="importSeniorUser"
              >高级用户需求</MenuItem
            >
            <MenuItem name="importGovernmentUser" to="importGovernmentUser"
              >政府用户需求</MenuItem
            >
            <MenuItem name="importdigitalData" to="importdigitalData"
              >数传星务数据
            </MenuItem>
            <MenuItem name="importRocketData" to="importRocketData"
              >火箭发射弹道数据
            </MenuItem>
            <MenuItem name="importUserLog" to="importUserLog"
              >用户日志信息</MenuItem
            >
            <MenuItem name="importUsermessage" to="importUsermessage"
              >用户留言</MenuItem
            >
          </Submenu> -->

          <!-- <Submenu name="1-2">
            <template slot="title">内部网-对外服务区</template> -->
          <!-- <Submenu name="productProcess">
              <template slot="title">产品处理</template>
              <MenuItem name="importTrackProduct" to="importTrackProduct"
                >轨道产品</MenuItem
              >
              <MenuItem name="importCatalogProduct" to="importCatalogProduct"
                >编目产品</MenuItem
              >
              <MenuItem name="importSpaceReport" to="importSpaceReport"
                >空间态势报告</MenuItem
              >
              <MenuItem name="importWarningProduct" to="importWarningProduct"
                >在轨预警产品</MenuItem
              >
              <MenuItem name="importLaunchWarning" to="importLaunchWarning"
                >发射预警产品</MenuItem
              >
              <MenuItem
                name="importDisintegrationProduct"
                to="importDisintegrationProduct"
                >解体事件分析产品</MenuItem
              >
              <MenuItem name="importFallProduct" to="importFallProduct"
                >再入陨落分析产品</MenuItem
              >
              <MenuItem
                name="importSecurityAvoidanceProduct"
                to="importSecurityAvoidanceProduct"
                >安全规避分析产品</MenuItem
              >
              <MenuItem name="importSpaceEvent" to="importSpaceEvent"
                >空间事件报告</MenuItem
              >
              <MenuItem name="importMonthReport" to="importMonthReport"
                >工作月报</MenuItem
              >
              <MenuItem name="importBriefReport" to="importBriefReport"
                >工作简报</MenuItem
              >
              <MenuItem name="importSpecialReport" to="importSpecialReport"
                >工作专报</MenuItem
              >
            </Submenu> -->
          <!-- <Submenu name="dataProcess">
              <template slot="title">数据处理</template>
              <MenuItem name="importTable" to="importTable"
                >预警分析结果表</MenuItem
              >
              <MenuItem name="importUserDemand" to="importUserDemand"
                >用户需求响应消息</MenuItem
              >
              <MenuItem name="importUserMessages" to="importUserMessages"
                >用户信息管理消息</MenuItem
              >
              <MenuItem name="importUserFeedback" to="importUserFeedback"
                >用户留言反馈</MenuItem
              >
            </Submenu> -->
          <!-- <MenuItem name="importProcess" to="importProcess"
            >内部网-对外服务区</MenuItem
          > -->
          <!-- </Submenu> -->
        </Submenu>
        <Submenu name="dataExportManagement" to="dataExportManagement">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-kongjian"></span>
              <span>数据导出管理</span>
            </div>
          </template>
          <MenuItem name="serviceNetwork" to="serviceNetwork">业务网</MenuItem>
          <MenuItem name="exportInterProcess" to="exportInterProcess">
            内部网-对外服务区
          </MenuItem>
          <MenuItem name="exportProcess" to="exportProcess">
            内部网-内部处理区
          </MenuItem>
          <!-- <Submenu name="2-1">
            <template slot="title">内部网-对外服务区</template>
            <MenuItem name="exportUserInformation" to="exportUserInformation"
              >用户信息</MenuItem
            >
            <MenuItem name="exportSeniorUser" to="exportSeniorUser"
              >高级用户需求</MenuItem
            >
            <MenuItem name="exportdigitalData" to="exportdigitalData"
              >数传星务数据</MenuItem
            >
            <MenuItem name="2-1-4">火箭发射弹道数据</MenuItem>
            <MenuItem name="2-1-5">用户日志信息</MenuItem>
            <MenuItem name="2-1-6">用户留言</MenuItem>
          </Submenu> -->

          <!-- <Submenu name="2-2">
            <template slot="title">内部网-内部处理区</template>
            <Submenu name="2-2-1">
              <template slot="title">产品处理</template>
              <MenuItem name="2-2-1-1">轨道产品</MenuItem>
              <MenuItem name="2-2-1-2">编目产品</MenuItem>
              <MenuItem name="2-2-1-3">空间态势报告</MenuItem>
              <MenuItem name="2-2-1-4">在轨预警产品</MenuItem>
              <MenuItem name="2-2-1-5">发射预警产品</MenuItem>
              <MenuItem name="2-2-1-6">解体事件分析产品</MenuItem>
              <MenuItem name="2-2-1-7">再入陨落分析产品</MenuItem>
              <MenuItem name="2-2-1-8">安全规避分析产品</MenuItem>
              <MenuItem name="2-2-1-9">空间事件报告</MenuItem>
              <MenuItem name="2-2-1-10">工作月报</MenuItem>
              <MenuItem name="2-2-1-11">工作简报</MenuItem>
              <MenuItem name="2-2-1-12">工作专报</MenuItem>
            </Submenu>
            <Submenu name="2-2-2">
              <template slot="title">数据处理</template>
              <MenuItem name="2-2-2-1">预警分析结果表</MenuItem>
              <MenuItem name="2-2-2-2">用户需求响应消息</MenuItem>
              <MenuItem name="2-2-2-3">用户信息管理消息</MenuItem>
              <MenuItem name="2-2-2-4">用户留言反馈</MenuItem>
            </Submenu>
          </Submenu> -->
          <!-- <MenuItem name="exportProcess" to="exportProcess"
            >内部网-内部处理区</MenuItem
          > -->
        </Submenu>
        <MenuItem name="importConfiguration" to="importConfiguration">
          <div class="menu-title-container">
            <span class="iconfont icon-jiaosequanxian"></span>
            <span>数据导入配置</span>
          </div>
        </MenuItem>
        <MenuItem name="exportConfiguration" to="exportConfiguration">
          <div class="menu-title-container">
            <span class="iconfont icon-qunzu1"></span>
            <span>数据导出配置</span>
          </div>
        </MenuItem>
      </Menu>
    </div>
    <div class="right-content">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "",
    };
  },
  created() {
    this.activeName = this.$route.name;
  },
};
</script>
<style lang="less" scoped></style>
