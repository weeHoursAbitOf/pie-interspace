<template>
  <div>
    <Drawer
      title="工具栏"
      placement="left"
      width="16"
      height="100"
      :mask-closable="false"
      :mask="false"
      :closable="true"
      v-model="isShowWorkBox"
      @on-close="onClose"
    >
      <div class="work-box-content">
        <ul>
          <li>
            <p></p>
            <span></span>
          </li>
        </ul>
      </div>
    </Drawer>
  </div>
</template>

<script>
export default {
  props: {
    isShowWorkBox: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },

  methods: {
    // 取消工具箱
    onClose() {
      this.$emit("on-close", false);
    },
  },
};
</script>

<style lang="less" scoped>
.work-box-content {
  width: 100%;
  height: 100%;

  ul {
    display: flex;
    flex-wrap: wrap;

    li {
      display: flex;
      align-items: center;
      margin: 10px;
      p {
        width: 80px;
        text-align: right;
        padding: 0 10px;
      }
    }
  }
}
/deep/.ivu-drawer-header-inner {
  font-size: @lable-font-size;
  color: @lable-font-color;
}
/deep/.ivu-drawer-content {
  background-color: #042057;
  font-size: @lable-font-size;
  color: @lable-font-color;
}
/deep/.ivu-drawer-header {
  border-bottom: 0.005208rem solid @content-border-color !important;
}
/deep/.ivu-icon-ios-close:before {
  color: @lable-font-color;
}
/deep/.ivu-icon-ios-close {
  font-size: 35px;
  font-weight: 600;
}
/deep/.ivu-color-picker,
/deep/.ivu-select-dropdown {
  padding: 5px;
}
</style>
