<template>
  <div class="pie-container">
    <div class="left-menu">
      <Menu
        :active-name="activeName"
        accordion
        :open-names="openNames"
        ref="menu"
      >
        <Submenu name="capabilityProduct">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-kongjian"></span>
              <span>定向产品列表</span>
            </div>
          </template>
          <MenuItem name="capabilityProduct" to="capabilityProduct"
            >系统（能力）产品</MenuItem
          >
          <MenuItem name="stateProduct" to="stateProduct"
            >系统（状态）产品</MenuItem
          >
        </Submenu>
        <Submenu name="systemAbility">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-kongjian"></span>
              <span>定向产品模板</span>
            </div>
          </template>
          <MenuItem name="systemAbility" to="systemAbility"
            >系统（能力）产品模板</MenuItem
          >
          <MenuItem name="systemState" to="systemState"
            >系统（状态）产品模板</MenuItem
          >
        </Submenu>
        <Submenu name="systemCapability">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-kongjian"></span>
              <span>定向产品配置</span>
            </div>
          </template>
          <MenuItem name="systemCapability" to="systemCapability"
            >系统（能力）产品配置</MenuItem
          >
          <MenuItem name="systemStatus" to="systemStatus"
            >系统（状态）产品配置</MenuItem
          >
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
