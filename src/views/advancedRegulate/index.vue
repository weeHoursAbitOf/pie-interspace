<template>
  <div class="pie-container">
    <div class="left-menu">
      <Menu
        :active-name="activeName"
        accordion
        :open-names="openNames"
        ref="menu"
      >
        <Submenu name="collisionWarningSpecialReport">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-kongjian"></span>
              <span>专项任务报告</span>
            </div>
          </template>
          <MenuItem
            name="collisionWarningSpecialReport"
            to="collisionWarningSpecialReport"
            >碰撞预警专项报告</MenuItem
          >
          <MenuItem name="breakUpSpecialReport" to="breakUpSpecialReport"
            >解体专项报告</MenuItem
          >
          <MenuItem name="fallSpecialReport" to="fallSpecialReport"
            >陨落专项报告</MenuItem
          >
          <MenuItem name="drawNearSpecialReport" to="drawNearSpecialReport"
            >接近专项报告</MenuItem
          >
          <MenuItem
            name="engineDrivenSpecialReport"
            to="engineDrivenSpecialReport"
            >机动专项报告</MenuItem
          >
        </Submenu>
        <Submenu name="spaceEventReport">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-kongjian"></span>
              <span>高级产品列表</span>
            </div>
          </template>
          <MenuItem name="spaceEventReport" to="spaceEventReport"
            >空间事件报告</MenuItem
          >
          <MenuItem name="collisionAvoidance" to="collisionAvoidance"
            >在轨碰撞预警产品</MenuItem
          >
          <MenuItem name="breakupAnalysis" to="breakupAnalysis"
            >解体事件分析预警产品</MenuItem
          >
          <MenuItem name="downfallAnalysis" to="downfallAnalysis"
            >陨落事件分析预警产品</MenuItem
          >
          <MenuItem name="launchCollisionWarning" to="launchCollisionWarning"
            >发射碰撞预警产品</MenuItem
          >
          <MenuItem name="safetyAvoidanceAnalysis" to="safetyAvoidanceAnalysis"
            >安全规避碰撞预警产品</MenuItem
          >
          <!-- <MenuItem name="targetCloseTo" to="targetCloseTo">目标接近预警产品</MenuItem> -->
          <MenuItem name="specialReport" to="specialReport"
            >危险交会（专报）产品</MenuItem
          >
          <MenuItem
            name="specialDisassemblyReport"
            to="specialDisassemblyReport"
            >解体事件（专报）产品</MenuItem
          >
          <MenuItem name="specialFallReport" to="specialFallReport"
            >再入陨落（专报）产品</MenuItem
          >
          <MenuItem name="monthlyReport" to="monthlyReport"
            >工作（月报）产品</MenuItem
          >
          <MenuItem name="briefReport" to="briefReport"
            >工作（简报）产品</MenuItem
          >
        </Submenu>
        <Submenu name="spaceEventTemplate">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-kongjian"></span>
              <span>高级产品模板</span>
            </div>
          </template>
          <MenuItem name="spaceEventTemplate" to="spaceEventTemplate"
            >空间事件报告模板</MenuItem
          >
          <MenuItem name="warningTrackTemplate" to="warningTrackTemplate"
            >在轨碰撞预警模板</MenuItem
          >
          <MenuItem
            name="warningDissolutionTemplate"
            to="warningDissolutionTemplate"
            >解体事件分析预警模板</MenuItem
          >
          <MenuItem name="warningFallTemplate" to="warningFallTemplate"
            >陨落事件分析预警模板</MenuItem
          >
          <MenuItem name="warningLaunchTemplate" to="warningLaunchTemplate"
            >发射碰撞预警模板</MenuItem
          >
          <MenuItem name="warningSafetyTemplate" to="warningSafetyTemplate"
            >安全规避碰撞预警模板</MenuItem
          >
          <MenuItem
            name="specialReportsRiskTemplate"
            to="specialReportsRiskTemplate"
            >危险交会（专报）模板</MenuItem
          >
          <MenuItem
            name="specialReportsBreakTemplate"
            to="specialReportsBreakTemplate"
            >解体事件（专报）模板</MenuItem
          >
          <MenuItem
            name="specialReportsFallTemplate"
            to="specialReportsFallTemplate"
            >再入陨落（专报）模板</MenuItem
          >
          <MenuItem name="monthReportTemplate" to="monthReportTemplate"
            >工作（月报）模板</MenuItem
          >
          <MenuItem name="briefReportsTemplate" to="briefReportsTemplate"
            >工作（简报）模板</MenuItem
          >
        </Submenu>
        <Submenu name="safetyAvoidance">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-kongjian"></span>
              <span>高级产品配置</span>
            </div>
          </template>
          <MenuItem name="safetyAvoidance" to="safetyAvoidance"
            >空间安全规避产品配置</MenuItem
          >
          <MenuItem name="spaceReport" to="spaceReport"
            >空间碎片事件产品配置</MenuItem
          >
          <MenuItem name="disintegrateAnalyse" to="disintegrateAnalyse"
            >空间碎片解体产品配置</MenuItem
          >
          <MenuItem name="reentryFall" to="reentryFall"
            >空间碎片陨落产品配置</MenuItem
          >
          <MenuItem name="launchForeign" to="launchForeign"
            >发射碰撞预警产品配置</MenuItem
          >
          <MenuItem name="InorbitColWarn" to="InorbitColWarn"
            >在轨碰撞预警产品配置</MenuItem
          >
          <MenuItem name="dangerIntersection" to="dangerIntersection"
            >交会（专报）产品配置</MenuItem
          >
          <MenuItem name="downfallReport" to="downfallReport"
            >解体（专报）产品配置</MenuItem
          >
          <MenuItem name="emergency" to="emergency"
            >陨落（专报）产品配置</MenuItem
          >
          <MenuItem name="workMonthly" to="workMonthly"
            >工作（月报）产品配置</MenuItem
          >
          <MenuItem name="workBrief" to="workBrief"
            >工作（简报）产品配置</MenuItem
          >
        </Submenu>

        <Submenu name="rasterVect">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-kongjian"></span>
              <span>绘图工具栏</span>
            </div>
          </template>
          <MenuItem name="launchRasterVect" to="launchRasterVect"
            >发射编辑工具</MenuItem
          >
          <MenuItem name="fallRasterVect" to="fallRasterVect"
            >陨落编辑工具</MenuItem
          >
          <Submenu name="trackGabbardGraph">
            <template slot="title">
              <div class="menu-title-container">
                <span>解体编辑工具</span>
              </div>
            </template>
            <MenuItem name="trackGabbardGraph" to="trackGabbardGraph">碎片轨道gabbard图</MenuItem>
            <MenuItem name="trackDistributionMap" to="trackDistributionMap">轨道面分布图</MenuItem>
            <MenuItem name="relativeDistanceChangeMap" to="relativeDistanceChangeMap">碎片相对距离变化图</MenuItem>
            <MenuItem name="intersectionDistanceChangeMap" to="intersectionDistanceChangeMap">碎片交互距离变化图</MenuItem>
            <MenuItem name="semiMajorAxisChangeMap" to="semiMajorAxisChangeMap">轨道半长轴变化图</MenuItem>
            <MenuItem name="continuityChangeMap" to="continuityChangeMap">空间碎片环境变化图</MenuItem>
          </Submenu>
        </Submenu>
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
      menuList: [],
    };
  },
  created() {
    this.activeName = this.$route.name;
    this.openNames[0] = this.$route.name;
    this.$nextTick(() => {
      this.$refs.menu.updateOpened;
      this.$refs.menu.updateActiveName;
    });
  },
};
</script>
<style lang="less" scoped></style>
