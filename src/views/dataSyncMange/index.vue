<template>
  <div class="pie-container">
    <div class="left-menu">
      <Menu :active-name="activeName" :open-names="openNames" accordion>
        <Submenu name="syncTasks" to="syncTasks">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-early-warn"></span>
              <span>数据同步任务管理</span>
            </div>
          </template>
          <Submenu name="1-1">
            <template slot="title">产品同步管理</template>
            <MenuItem name="syncTasks" to="">在轨预警产品</MenuItem>
            <MenuItem name="1-1-2" to="">发射预警产品</MenuItem>
            <MenuItem name="1-1-3" to="">解体事件分析产品</MenuItem>
            <MenuItem name="1-1-4" to="">再入陨落分析产品</MenuItem>
            <MenuItem name="1-1-5" to="">空间事件报告</MenuItem>
            <MenuItem name="1-1-6" to="syncTasks?dataType=monthlyProduct"
              >工作月报</MenuItem
            >
            <MenuItem name="1-1-7" to="">工作简报</MenuItem>
            <MenuItem name="1-1-8" to="">工作专报</MenuItem>
            <MenuItem name="1-1-9" to="">系统能力信息产品</MenuItem>
            <MenuItem name="1-1-10" to="">系统状态信息产品</MenuItem>
          </Submenu>
          <Submenu name="1-2">
            <template slot="title">数据同步管理</template>
            <MenuItem name="1-2-1" to="">实时视频数据</MenuItem>
            <MenuItem name="1-2-2" to="">经典视频数据</MenuItem>
            <MenuItem name="1-2-3" to="">视频展示指令</MenuItem>
            <MenuItem name="1-2-4" to="">预警分析结果表</MenuItem>
            <MenuItem name="1-2-5" to="">用户需求响应消息</MenuItem>
            <MenuItem name="1-2-6" to="">用户信息管理指令</MenuItem>
            <MenuItem name="1-2-7" to="">用户留言反馈</MenuItem>
          </Submenu>
        </Submenu>
        <MenuItem name="syncConfigur" to="syncConfigur">
          <div class="menu-title-container">
            <span class="iconfont icon-qunzu1"></span>
            <span>数据同步配置</span>
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
      openNames: ["syncTasks", "1-1"],
    };
  },
  created() {
    this.activeName = this.$route.name;
    this.openNames[0] = this.$route.name;
  },
};
</script>
<style lang="less" scoped>
</style>