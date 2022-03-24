<template>
  <div class="pie-container">
    <div class="left-menu">
      <Menu :active-name="activeName" accordion>
        <MenuItem name="organization" to="organization">
          <div class="menu-title-container">
            <span class="iconfont icon-jigou"></span>
            <span>机构管理</span>
          </div>
        </MenuItem>
        <MenuItem name="userInformation" to="userInformation">
          <div class="menu-title-container">
            <span class="iconfont icon-yonghuxinxi-"></span>
            <span>用户信息管理</span>
          </div>
        </MenuItem>
        <MenuItem name="rolePermission" to="rolePermission">
          <div class="menu-title-container">
            <span class="iconfont icon-jiaosequanxian"></span>
            <span>角色权限管理</span>
          </div>
        </MenuItem>
        <MenuItem name="groupInfo" to="groupInfo">
          <div class="menu-title-container">
            <span class="iconfont icon-jiaosequanxian"></span>
            <span>群组管理</span>
          </div>
        </MenuItem>
        <MenuItem name="logManagement" to="logManagement">
          <div class="menu-title-container">
            <span class="iconfont icon-bianzu"></span>
            <span>日志管理</span>
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
<style lang="less" scoped>
</style>