<template>
  <div class="pie-container">
    <div class="left-menu">
      <Menu :active-name="activeName" accordion :open-names="openNames" ref="menu">
        <MenuItem name="monitorData" to="monitorData">
          <div class="menu-title-container">
            <span class="iconfont icon-kongjian"></span>
            <span>监测数据统计</span>
          </div>
        </MenuItem>
        <MenuItem name="catalogInfo" to="catalogInfo">
          <div class="menu-title-container">
            <span class="iconfont icon-kongjian"></span>
            <span>编目信息统计</span>
          </div>
        </MenuItem>
                <Submenu name="foreignDemand">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-kongjian"></span>
              <span>预警计算结果统计</span>
            </div>
          </template>
          <MenuItem name="dangerCartogram" to="dangerCartogram">空间碎片危险交会统计</MenuItem>
          <MenuItem name="launchWindowCartogram" to="launchWindowCartogram">卫星发射窗口统计</MenuItem>
          <MenuItem name="decayCartogram" to="decayCartogram">空间物体陨落统计</MenuItem>
        </Submenu>
        <Submenu name="foreignDemand">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-kongjian"></span>
              <span>外来需求统计</span>
            </div>
          </template>
          <MenuItem name="foreignDemand" to="foreignDemand">外来需求统计</MenuItem>
          <MenuItem name="roleStatistics" to="roleStatistics">外来需求角色统计</MenuItem>
          <MenuItem name="unitStatistics" to="unitStatistics">外来需求单位统计</MenuItem>
        </Submenu>
        <Submenu name="externalService">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-kongjian"></span>
              <span>对外服务统计</span>
            </div>
          </template>
          <MenuItem name="externalService" to="externalService">对外服务统计</MenuItem>
          <MenuItem name="productExternal" to="productExternal">对外服务产品类型统计</MenuItem>
          <MenuItem name="unitExternal" to="unitExternal">对外服务单位统计</MenuItem>
        </Submenu>
        <MenuItem name="userLogStatistics" to="userLogStatistics">
          <div class="menu-title-container">
            <span class="iconfont icon-bianzu"></span>
            <span>用户日志统计</span>
          </div>
        </MenuItem>
        <MenuItem name="userSuggestion" to="userSuggestion">
          <div class="menu-title-container">
            <span class="iconfont icon-yonghuxinxi"></span>
            <span>用户意见统计</span>
          </div>
        </MenuItem>
        <MenuItem name="answering" to="answering">
          <div class="menu-title-container">
            <span class="iconfont icon-yonghuxinxi-"></span>
            <span>留言回复统计</span>
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
  },
};
</script>
<style lang="less" scoped>
</style>