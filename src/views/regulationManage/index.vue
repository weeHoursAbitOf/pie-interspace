<template>
  <div class="pie-container">
    <div class="left-menu">
      <Menu :active-name="activeName" accordion :open-names="openNames">
        <MenuItem name="law" :to="{ path: '/law', query: { typeName: 'law' } }">
          <div class="menu-title-container">
            <span class="iconfont icon-falvfagui"></span>
            <span>法律 </span>
          </div>
        </MenuItem>
        <Submenu name="admissionRegulation">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-kongjian"></span>
              <span>法规</span>
            </div>
          </template>
          <MenuItem
            name="admissionRegulation"
            :to="{ path: '/law', query: { typeName: 'admissionRegulation' } }"
            >行政法规
          </MenuItem>
          <MenuItem
            name="localRegulation"
            :to="{ path: '/law', query: { typeName: 'localRegulation' } }"
            >地方性法规
          </MenuItem>
        </Submenu>
        <Submenu name="stateDepartmentRules">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-early-warn"></span>
              <span>规章 </span>
            </div>
          </template>
          <MenuItem
            name="stateDepartmentRules"
            :to="{ path: '/law', query: { typeName: 'stateDepartmentRules' } }"
            >国务院部门规章
          </MenuItem>
          <MenuItem
            name="localGovernmentAct"
            :to="{ path: '/law', query: { typeName: 'localGovernmentAct' } }"
            >地方政府规章
          </MenuItem>virus
        </Submenu>
        <MenuItem
          name="internationalPact"
          :to="{ path: '/law', query: { typeName: 'internationalPact' } }"
        >
          <div class="menu-title-container">
            <span class="iconfont icon-gongwen1"></span>
            <span>国际公约 </span>
          </div>
        </MenuItem>
      </Menu>
      <!-- <Menu :active-name="activeName" accordion :open-names="openNames">
        <MenuItem name="law" to="law">
          <div class="menu-title-container">
            <span class="iconfont icon-falvfagui"></span>
            <span>法律 </span>
          </div>
        </MenuItem>
        <Submenu name="admissionRegulation">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-kongjian"></span>
              <span>法规</span>
            </div>
          </template>
          <MenuItem name="admissionRegulation" to="admissionRegulation"
            >行政法规
          </MenuItem>
          <MenuItem name="localRegulation" to="localRegulation"
            >地方性法规
          </MenuItem>
        </Submenu>
        <Submenu name="stateDepartmentRules">
          <template slot="title">
            <div class="menu-title-container">
              <span class="iconfont icon-early-warn"></span>
              <span>规章 </span>
            </div>
          </template>
          <MenuItem name="stateDepartmentRules" to="stateDepartmentRules"
            >国务院部门规章
          </MenuItem>
          <MenuItem name="localGovernmentAct" to="localGovernmentAct"
            >地方政府规章
          </MenuItem>
        </Submenu>
        <MenuItem name="internationalPact" to="internationalPact">
          <div class="menu-title-container">
            <span class="iconfont icon-gongwen1"></span>
            <span>国际公约 </span>
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
      openNames: [],
    };
  },
  created() {
    this.activeName = this.$route.query.typeName;
    this.openNames[0] = this.$route.query.typeName;
  },
};
</script>
<style lang="less" scoped></style>
