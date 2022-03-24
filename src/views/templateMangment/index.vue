<template>
  <div class="pie-container">
    <div class="left-menu">
      <Menu :active-name="activeName" :open-names="openNames" accordion>
        <MenuItem name="trackTemplate" to="trackTemplate">
          <div class="menu-title-container">
            <span class="iconfont icon-guidaoxiaoguo"></span>
            <span>轨道产品模板</span>
          </div>
        </MenuItem>
        <MenuItem name="catalogTemplate" to="catalogTemplate" replace>
          <div class="menu-title-container">
            <span class="iconfont icon-fenzu23"></span>
            <span>编目产品模板</span>
          </div>
        </MenuItem>
        <Submenu name="dangerousTemplate">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-kongjian"></span>
              <span>空间态势报告模板</span>
            </div>
          </template>
          <MenuItem name="dangerousTemplate" to="dangerousTemplate?menuId=1"
            >危险交会模板</MenuItem
          >
          <MenuItem name="downfallTemplate" to="downfallTemplate"
            >陨落模板</MenuItem
          >
          <MenuItem name="breakUpTemplate" to="breakUpTemplate"
            >解体模板</MenuItem
          >
          <MenuItem name="outburstTemplate" to="outburstTemplate"
            >突发模板</MenuItem
          >
        </Submenu>
        <Submenu name="warningTrackTemplate">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-kongjian"></span>
              <span>预警产品模板</span>
            </div>
          </template>
          <MenuItem name="warningTrackTemplate" to="warningTrackTemplate"
            >在轨碰撞模板</MenuItem
          >
          <MenuItem
            name="warningDissolutionTemplate"
            to="warningDissolutionTemplate"
            >解体事件模板</MenuItem
          >
          <MenuItem name="warningFallTemplate" to="warningFallTemplate"
            >陨落事件模板</MenuItem
          >
          <MenuItem name="warningLaunchTemplate" to="warningLaunchTemplate"
            >发射碰撞模板</MenuItem
          >
          <MenuItem name="warningSafetyTemplate" to="warningSafetyTemplate"
            >安全规避模板</MenuItem
          >
        </Submenu>
        <MenuItem name="monthReportTemplate" to="monthReportTemplate">
          <div class="menu-title-container">
            <span class="iconfont icon-yuebao"></span>
            <span>工作月报模板</span>
          </div>
        </MenuItem>
        <MenuItem name="briefReportsTemplate" to="briefReportsTemplate">
          <div class="menu-title-container">
            <span class="iconfont icon-bijizhangben"></span>
            <span>工作简报模板</span>
          </div>
        </MenuItem>
        <Submenu name="specialReportsRiskTemplate">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-kongjian"></span>
              <span>工作专报模板</span>
            </div>
          </template>
          <MenuItem
            name="specialReportsRiskTemplate"
            to="specialReportsRiskTemplate"
            >危险交会模板</MenuItem
          >
          <MenuItem
            name="specialReportsBreakTemplate"
            to="specialReportsBreakTemplate"
            >解体事件模板</MenuItem
          >
          <MenuItem
            name="specialReportsFallTemplate"
            to="specialReportsFallTemplate"
            >再入陨落模板</MenuItem
          >
        </Submenu>
        <MenuItem name="systemAbility" to="systemAbility">
          <div class="menu-title-container">
            <span class="iconfont icon-ziyuan"></span>
            <span>系统能力产品模板</span>
          </div>
        </MenuItem>
        <MenuItem name="systemState" to="systemState">
          <div class="menu-title-container">
            <span class="iconfont icon-zhuangtai1"></span>
            <span>系统状态产品模板</span>
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
      openNames: [],
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