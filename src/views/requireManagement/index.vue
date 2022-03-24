<template>
  <div class="pie-container">
    <div class="left-menu">
      <Menu :active-name="activeName" :open-names="openNames" accordion>
        <MenuItem name="advancedUser" to="advancedUser" replace>
          <div class="menu-title-container">
            <span class="iconfont icon-yonghuxinxi-"></span>
            <span>高级用户</span>
          </div>
        </MenuItem>
        <MenuItem name="redirectUser" to="redirectUser" replace>
          <div class="menu-title-container">
            <span class="iconfont icon-yonghu1"></span>
            <span>定向用户</span>
          </div>
        </MenuItem>
        <!-- <Submenu name="trackService" to="trackService">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-kongjian"></span>
              <span>信息产品对外服务</span>
            </div>
          </template>
          <MenuItem name="trackService" to="trackService">轨道产品 </MenuItem>
          <MenuItem name="catalogService" to="catalogService"
            >编目产品
          </MenuItem>
          <Submenu name="spaceIntersection">
            <template slot="title">
              <div class="menu-item-class">空间态势报告</div>
            </template>
            <MenuItem name="spaceIntersection" to="spaceIntersection"
              >空间态势报告（交会）
            </MenuItem>
            <MenuItem name="spaceBreakup" to="spaceBreakup"
              >空间态势报告（解体）
            </MenuItem>
            <MenuItem name="spaceDownfall" to="spaceDownfall"
              >空间态势报告（陨落）
            </MenuItem>
          </Submenu>
        </Submenu>
        <Submenu name="InorbitColWarn" to="InorbitColWarn">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-kongjian"></span>
              <span> 分析产品对外服务</span>
            </div>
          </template>
          <MenuItem name="launchForeign" to="launchForeign"
            >发射碰撞预警对外服务
          </MenuItem>
          <MenuItem name="InorbitColWarn" to="InorbitColWarn"
            >在轨碰撞预警对外服务
          </MenuItem>
          <MenuItem name="disintegrateAnalyse" to="disintegrateAnalyse"
            >解体产品对外服务
          </MenuItem>
          <MenuItem name="reentryFall" to="reentryFall">
            陨落产品对外服务
          </MenuItem>
          <MenuItem name="safetyAvoidance" to="safetyAvoidance"
            >空间规避产品对外服务
          </MenuItem>
          <MenuItem class="icon-submenus" name="spaceReport" to="spaceReport"
            >空间事件报告对外服务
          </MenuItem>
        </Submenu>
        <Submenu name="workMonthly">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-kongjian"></span>
              <span>集成产品对外服务</span>
            </div>
          </template>
          <MenuItem name="workMonthly" to="workMonthly">工作月报 </MenuItem>
          <MenuItem name="workBrief" to="workBrief">工作简报 </MenuItem>
          <Submenu name="dangerIntersection" class="ivu-title">
            <template slot="title">
              <div class="menu-item-class">工作专报</div>
            </template>
            <MenuItem name="dangerIntersection" to="dangerIntersection"
              >危险交会分析
            </MenuItem>
            <MenuItem name="downfallReport" to="downfallReport"
              >解体事件分析
            </MenuItem>
            <MenuItem name="emergency" to="emergency">再入陨落分析</MenuItem>
          </Submenu>
          <MenuItem name="systemCapability" to="systemCapability"
            >系统能力信息产品
          </MenuItem>
          <MenuItem name="systemStatus" to="systemStatus"
            >系统状态信息产品
          </MenuItem>
        </Submenu> -->
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
// /deep/.ivu-title{
//   padding-left: 20px !important;
// }
// /deep/.icon-submenus {
//   padding-left: 0 !important ;
// }
.menu-item-class {
  margin-left: 18px !important;
}
</style>
