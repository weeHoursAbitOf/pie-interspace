<template>
  <div class="mpage">
    <Page
      :total="total"
      :show-sizer="showSizer"
      show-total
      show-elevator
      :current="managePageInner ? chiPaging : current"
      :page-size="managePageInner ? chiPagSize : pageSize"
      :page-size-opts="showSize"
      @on-change="pageChange"
      @on-page-size-change="pageSizeChange"
    >
      <!-- <span v-if="showSizer">共{{ total }}条，每页显示：</span>
      <span v-else>共{{ total }}条&nbsp;&nbsp;&nbsp;</span>-->
    </Page>
  </div>
</template>
<script>
export default {
  name: "page",
  props: {
    total: {
      type: Number,
      default: 10,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    current: {
      type: Number,
      default: 1,
    },
    showSizer: {
      type: Boolean,
      default: true,
    },
    managePageInner: {
      // 是否内部管理page
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showSize: [1, 10, 30, 50, 100, 500],
      chiPaging: 1,
      chiPagSize: 10,
    };
  },
  methods: {
    pageChange(current) {
      this.chiPaging = current;
      this.$emit("pageChange", current);
      this.$emit("pageChangeNew", {
        paging: current,
        pageSize: this.chiPagSize,
      });
    },
    pageSizeChange(pageSize) {
      this.chiPagSize = pageSize;
      this.chiPaging = 1;
      this.$emit("pageSizeChange", pageSize);
      this.$emit("pageSizeChangeNew", {
        paging: 1,
        pageSize: this.chiPagSize,
      });
    },
  },
};
</script>
<style lang="less">
.mpage {
  display: flex;
  justify-content: flex-end;
  height: 55px;
  line-height: 55px;
  color: @page-font-color;
  margin-right: 20px;

  .ivu-page {
    .ivu-page-item-active {
      // border: 1px solid @page-border-color;
      border: none;
      border-radius: 0;
      background: @page-bg-color-ac;
      color: @page-active-color;

      a {
        // color: @page-active-color  !important;
        color: @page-font-color-ac;
      }
    }

    .ivu-page-item {
      // border: 1px solid @page-border-color;
      border: none;
      border-radius: 0;
      background: @page-bg-color-ac;

      a {
        color: @page-font-color-ac;
      }
    }

    .ivu-page-item:hover {
      border: 1px solid @page-border-color;
      background: @page-bg-color-ac;
      color: @page-active-color;

      a {
        color: @page-active-color;
      }
    }

    .ivu-page-total {
      float: left;
      margin-right: 20px;
      line-height: 55px;

      span {
        font-size: @main-font-size;
        color: #ffffff;
      }
    }

    /* .ivu-page-options {
        float: left;
        margin-left: 4px;
      } */
  }

  .ivu-page-next,
  .ivu-page-prev {
    background-color: @page-bg-color;
    border: none;
    border-radius: 0;

    // border: 1px solid @page-border-color;
    a {
      color: @page-font-color;
    }
  }

  .ivu-select-dropdown {
    background-color: @page-bg-color;
    border: 1px solid @page-border-color;
  }

  .ivu-select-item-selected,
  .ivu-select-item-selected:hover {
    color: #fff;
  }
}
</style>
<style lang="less" scoped>
.mpage {
  /deep/ .ivu-page-options-elevator input {
    background-color: #cecfd0;
    color: @page-font-color;
    text-align: center;
    border: 1px solid #3d6699;
  }

  /deep/ .ivu-page-next:hover,
  .ivu-page-prev:hover {
    border-color: @page-bg-color;
  }

  /deep/ .ivu-select-item-focus {
    background: @page-bg-color;
  }

  /deep/ .ivu-select-single .ivu-select-selection {
    // border: 1px solid @page-border-color;
    background: @page-bg-color;
    border: none;
    border-radius: 0;
    color: @page-font-color;
  }
}
/deep/.ivu-page-item-active {
  background-color: @content-border-color !important;
}
</style>