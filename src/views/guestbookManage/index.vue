<template>
  <div class="pie-container">
    <div class="left-menu">
      <!-- <div class="left-menu-title">
        <span class="title">用户留言管理</span>
      </div> -->
      <Menu :active-name="activeName" accordion :open-names="openNames">
        <Submenu name="accountApply">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-kongjian"></span>
              <span>自助咨询管理</span>
            </div>
          </template>

          <MenuItem name="accountApply" to="accountApply">账号申请 </MenuItem>
          <MenuItem name="productApply" to="productApply">产品申请 </MenuItem>
          <MenuItem name="productService" to="productService"
            >产品服务
          </MenuItem>
          <!-- <MenuItem name="messageBack" to="messageBack">留言反馈 </MenuItem> -->
        </Submenu>
        <MenuItem name="messageProcessing" to="messageProcessing">
          <div class="menu-title-container">
            <span class="iconfont icon-jigou"></span>
            <span>留言处理</span>
          </div>
        </MenuItem>
        <Submenu name="messageStatistics">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-yonghuxinxi-"></span>
              <span>留言统计</span>
            </div>
          </template>

          <MenuItem name="messageStatistics" to="messageStatistics"
            >留言统计
          </MenuItem>
          <MenuItem name="messageBackStatistics" to="messageBackStatistics"
            >留言反馈统计
          </MenuItem>
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