<template>
  <div class="pie-container">
    <div class="left-menu">
      <Menu
        :active-name="activeName"
        accordion
        :open-names="openNames"
        ref="menu"
      >
        <Submenu name="basicsProduct" :replace="true">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-kongjian"></span>
              <span>基础产品列表</span>
            </div>
          </template>
          <MenuItem
            name="basicsProduct"
            :to="{ path: '/basicsProduct', query: { productId: 0 } }"
            >轨道产品</MenuItem
          >
          <MenuItem
            name="basicsProduct3"
            :to="{ path: '/basicsProduct', query: { productId: 3 } }"
            >编目产品</MenuItem
          >
          <MenuItem
            name="basicsProduct21"
            :to="{ path: '/basicsProduct', query: { productId: 21 } }"
            >空间（态势）危险交会</MenuItem
          >
          <MenuItem
            name="basicsProduct20"
            :to="{ path: '/basicsProduct', query: { productId: 20 } }"
            >空间（态势）陨落</MenuItem
          >
          <MenuItem
            name="basicsProduct19"
            :to="{ path: '/basicsProduct', query: { productId: 19 } }"
            >空间（态势）解体</MenuItem
          >
          <MenuItem name="outburst" to="outburst">空间（态势）突发</MenuItem>
        </Submenu>
        <Submenu name="trackTemplate">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-kongjian"></span>
              <span>基础产品模板</span>
            </div>
          </template>
          <MenuItem name="trackTemplate" to="trackTemplate"
            >轨道产品模板</MenuItem
          >
          <MenuItem name="catalogTemplate" to="catalogTemplate"
            >编目产品模板</MenuItem
          >
          <MenuItem name="dangerousTemplate" to="dangerousTemplate"
            >空间（态势）危险交会</MenuItem
          >
          <MenuItem name="downfallTemplate" to="downfallTemplate"
            >空间（态势）陨落</MenuItem
          >
          <MenuItem name="breakUpTemplate" to="breakUpTemplate"
            >空间（态势）解体</MenuItem
          >
          <MenuItem name="outburstTemplate" to="outburstTemplate"
            >空间（态势）突发</MenuItem
          >
        </Submenu>
        <!-- <Submenu name="basicsProductConfigure" :replace="true">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-kongjian"></span>
              <span>基础产品配置</span>
            </div>
          </template>
          <MenuItem name="basicsProductConfigure" :to="{path:'/basicsProductConfigure',query:{productId:0}}">轨道产品配置</MenuItem>
          <MenuItem name="basicsProductConfigure3" :to="{path:'/basicsProductConfigure',query:{productId:3}}">编目产品配置</MenuItem>
          <MenuItem name="basicsProductConfigure21" :to="{path:'/basicsProductConfigure',query:{productId:21}}">空间（态势）危险交会</MenuItem>
          <MenuItem name="basicsProductConfigure20" :to="{path:'/basicsProductConfigure',query:{productId:20}}">空间（态势）陨落</MenuItem>
          <MenuItem name="basicsProductConfigure19" :to="{path:'/basicsProductConfigure',query:{productId:19}}">空间（态势）解体</MenuItem>
        </Submenu> -->
        <Submenu name="timedTaskManage" :replace="true">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-kongjian"></span>
              <span>定时任务配置</span>
            </div>
          </template>
          <MenuItem name="timedTaskManage" to="timedTaskManage"
            >定时任务管理</MenuItem
          >
          <MenuItem name="trackTaskStrategy" to="trackTaskStrategy"
            >轨道产品定时策略</MenuItem
          >
          <MenuItem name="catalogTaskStrategy" to="catalogTaskStrategy"
            >编目产品定时策略</MenuItem
          >
          <MenuItem
            name="intersectionTaskStrategy"
            to="intersectionTaskStrategy"
            >空间（态势）危险交会</MenuItem
          >
          <MenuItem name="downfallTaskStrategy" to="downfallTaskStrategy"
            >空间（态势）陨落</MenuItem
          >
          <MenuItem name="breakupTaskStrategy" to="breakupTaskStrategy"
            >空间（态势）解体任务</MenuItem
          >
        </Submenu>
        <Submenu name="trackService" :replace="true">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-kongjian"></span>
              <span>基础产品配置</span>
            </div>
          </template>
          <MenuItem name="trackService" to="trackService"
            >轨道人工任务配置</MenuItem
          >
          <MenuItem name="catalogService" to="catalogService"
            >编目人工任务配置</MenuItem
          >
          <MenuItem name="spaceIntersection" to="spaceIntersection"
            >危险交会人工任务配置</MenuItem
          >
          <MenuItem name="spaceDownfall" to="spaceDownfall"
            >陨落人工任务配置</MenuItem
          >
          <MenuItem name="spaceBreakup" to="spaceBreakup"
            >解体人工任务配置</MenuItem
          >
          <MenuItem name="outburstTaskAllocation" to="outburstTaskAllocation"
            >突发人工任务配置</MenuItem
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
<style lang="less" scoped></style>
