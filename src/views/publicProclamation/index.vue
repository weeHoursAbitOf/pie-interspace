<template>
  <div class="pie-container">
    <div class="left-menu">
      <Menu :active-name="activeName" accordion>
        <MenuItem
          name="noticeManagement"
          :to="{
            path: '/noticeManagement',
            query: { typeName: 'noticeManagement' },
          }"
        >
          <div class="menu-title-container">
            <span class="iconfont icon-jingshi"></span>
            <span>公告管理</span>
          </div>
        </MenuItem>
        <MenuItem
          name="publicManagement"
          :to="{
            path: '/noticeManagement',
            query: { typeName: 'publicManagement' },
          }"
        >
          <div class="menu-title-container">
            <span class="iconfont icon-gongwen1"></span>
            <span>公示管理 </span>
          </div>
        </MenuItem>
        <MenuItem
          name="informManagement"
          :to="{
            path: '/noticeManagement',
            query: { typeName: 'informManagement' },
          }"
        >
          <div class="menu-title-container">
            <span class="iconfont icon-zhuangtai1"></span>
            <span>通知管理 </span>
          </div>
        </MenuItem>
      </Menu>
      <!-- <Menu :active-name="activeName" accordion>
        <MenuItem name="noticeManagement" to="noticeManagement">
          <div class="menu-title-container">
            <span class="iconfont icon-jingshi"></span>
            <span>公告管理</span>
          </div>
        </MenuItem>
        <MenuItem name="publicManagement" to="publicManagement">
          <div class="menu-title-container">
            <span class="iconfont icon-gongwen1"></span>
            <span>公示管理 </span>
          </div>
        </MenuItem>
        <MenuItem name="informManagement" to="informManagement">
          <div class="menu-title-container">
            <span class="iconfont icon-zhuangtai1"></span>
            <span>通知管理 </span>
          </div>
        </MenuItem>
      </Menu> -->
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
    this.activeName = this.$route.query.typeName;
  },
};
</script>
<style lang="less" scoped></style>
