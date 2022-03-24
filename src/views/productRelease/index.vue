<template>
  <div class="pie-container">
    <div class="left-menu">
      <Menu :active-name="activeName" accordion :open-names="openNames" ref="menu">
        <MenuItem name="trackProducts" to="trackProducts">
          <div class="menu-title-container">
            <span class="iconfont icon-guidaoxiaoguo"></span>
            <span>轨道产品</span>
          </div>
        </MenuItem>
        <MenuItem name="catalogProduct" to="catalogProduct" replace>
          <div class="menu-title-container">
            <span class="iconfont icon-fenzu23"></span>
            <span>编目产品</span>
          </div>
        </MenuItem>
        <Submenu name="dangerousIntersection">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-kongjian"></span>
              <span>空间态势报告</span>
            </div>
          </template>
          <MenuItem name="dangerousIntersection" to="dangerousIntersection">危险交会</MenuItem>
          <MenuItem name="downfall" to="downfall">陨落</MenuItem>
          <MenuItem name="breakUp" to="breakUp">解体</MenuItem>
          <MenuItem name="outburst" to="outburst">突发</MenuItem>
        </Submenu>
        <Submenu name="launchCollisionWarning">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-early-warn"></span>
              <span>预警产品</span>
            </div>
          </template>
          <MenuItem name="launchCollisionWarning" to="launchCollisionWarning">发射碰撞预警</MenuItem>
          <MenuItem name="collisionAvoidance" to="collisionAvoidance">在轨碰撞预警</MenuItem>
          <MenuItem name="breakupAnalysis" to="breakupAnalysis">解体事件分析</MenuItem>
          <MenuItem name="downfallAnalysis" to="downfallAnalysis">陨落事件分析</MenuItem>
          <MenuItem name="safetyAvoidanceAnalysis" to="safetyAvoidanceAnalysis">安全规避分析</MenuItem>
        </Submenu>
        <MenuItem name="spaceEventReport" to="spaceEventReport">
          <div class="menu-title-container">
            <span class="iconfont icon-kongjian"></span>
            <span>空间事件报告</span>
          </div>
        </MenuItem>
        <MenuItem name="monthlyReport" to="monthlyReport">
          <div class="menu-title-container">
            <span class="iconfont icon-yuebao"></span>
            <span>工作月报</span>
          </div>
        </MenuItem>
        <MenuItem name="briefReport" to="briefReport">
          <div class="menu-title-container">
            <span class="iconfont icon-bijizhangben"></span>
            <span>工作简报</span>
          </div>
        </MenuItem>
        <Submenu name="specialReport">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-early-warn"></span>
              <span>工作专报</span>
            </div>
          </template>
          <MenuItem name="specialReport" to="specialReport">危险交会</MenuItem>
          <MenuItem name="specialDisassemblyReport" to="specialDisassemblyReport">解体</MenuItem>
          <MenuItem name="specialFallReport" to="specialFallReport">陨落</MenuItem>
        </Submenu>
        <MenuItem name="capabilityProduct" to="capabilityProduct">
          <div class="menu-title-container">
            <span class="iconfont icon-ziyuan"></span>
            <span>系统能力产品</span>
          </div>
        </MenuItem>
        <MenuItem name="stateProduct" to="stateProduct">
          <div class="menu-title-container">
            <span class="iconfont icon-zhuangtai1"></span>
            <span>系统状态产品</span>
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
      menuList: [],
    };
  },
  created() {
    this.activeName = this.$route.name;
    this.openNames[0] = this.$route.name;
    console.log(this.openNames);
    this.$nextTick(() => {
      this.$refs.menu.updateOpened;
      this.$refs.menu.updateActiveName;
    });
  },
};
</script>
<style lang="less" scoped>
</style>
