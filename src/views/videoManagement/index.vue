<template>
  <div class="pie-container">
    <div class="left-menu">
      <Menu active-name="1-1-1" :open-names="['1', '1-1']" accordion>
        <Submenu name="1">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-jigou"></span>
              <span>望远镜设备</span>
            </div>
          </template>
          <Submenu name="1-1">
            <template slot="title">威海</template>
            <MenuItem name="1-1-1" to="weihai-1">1.2米口径望远镜</MenuItem>
            <MenuItem name="1-1-2" to="weihai-2">2.5米口径望远镜</MenuItem>
          </Submenu>
          <Submenu name="1-2">
            <template slot="title">阿里</template>
            <MenuItem name="1-2-1" to="ali">1.2米口径望远镜</MenuItem>
          </Submenu>
          <Submenu name="1-3">
            <template slot="title">智利</template>
            <MenuItem name="1-3-1" to="zhili-1">1.2米口径望远镜</MenuItem>
            <MenuItem name="1-3-2" to="zhili-2">2.5米口径望远镜</MenuItem>
            <MenuItem name="1-3-3" to="zhili-3">新一代超大视场阵列</MenuItem>
          </Submenu>
        </Submenu>
        <Submenu name="2">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-jigou"></span>
              <span>安防视频</span>
            </div>
          </template>
          <Submenu name="2-1">
            <template slot="title">台站</template>
            <MenuItem name="2-1-1" to="weihaiObserve">威海观测站</MenuItem>
            <MenuItem name="2-1-2" to="jilinObserve">吉林观测站</MenuItem>
            <MenuItem name="2-1-3" to="xinjiangObserve">新疆观测站</MenuItem>
            <MenuItem name="2-1-4" to="aliObserve">阿里观测站</MenuItem>
            <MenuItem name="2-1-5" to="africaObserve">非洲埃及观测站</MenuItem>
            <MenuItem name="2-1-6" to="zhiliObserve">南美智利观测站</MenuItem>
          </Submenu>
          <Submenu name="2-2">
            <template slot="title">信息中心</template>
            <MenuItem name="2-2-1" to="spaceDebris"
              >空间碎片监测中心(北京)</MenuItem
            >
            <MenuItem name="2-2-2" to="backup">灾备中心（库尔勒）</MenuItem>
          </Submenu>
        </Submenu>
        <!-- <MenuItem name="1" to="videoEquipment">
                <div class="menu-title-container">
                    <span class="iconfont icon-jigou"></span>
                    <span>望远镜设备</span>
                </div>
                </MenuItem> -->
        <!-- <MenuItem name="2" to="securityVideo">
                <div class="menu-title-container">
                    <span class="iconfont icon-yonghuxinxi-"></span>
                    <span>安防视频</span>
                </div>
                </MenuItem> -->
        <!-- <MenuItem name="3" to="earlyWarningVisualization">
                <div class="menu-title-container">
                    <span class="iconfont icon-jiaosequanxian"></span>
                    <span>预警可视化</span>
                </div>
                </MenuItem> -->
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
      activeName: "1-1-1",
      openNames: [],
    };
  },
  created() {
    this.activeName = this.$route.name;
    this.openNames[0] = this.$route.name;
  },
};
</script>
<style lang="less" scoped></style>
