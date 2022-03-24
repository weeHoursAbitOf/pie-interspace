<template>
  <div class="modal-content-items">
    <div>
      <div class="modal1-items">
        <div class="item-title">计算开始时间（北京）：</div>
        <DatePicker
          :value="startTime"
          type="datetime"
          split-panels
          placeholder="开始时间"
          @on-change="onStartChange"
        >
        </DatePicker>
      </div>
      <div class="modal1-items">
        <div class="item-title">计算结束时间（北京）：</div>
        <DatePicker
          :value="endTime"
          type="datetime"
          split-panels
          placeholder="结束时间"
          @on-change="onEndChange"
        >
        </DatePicker>
        <search-btn class="search-btn" @click="computeSearch"></search-btn>
      </div>
      <div class="modal1-items">
        <div class="modal-title">请选择弹道（轨道）</div>
      </div>
      <div class="item-table">
        <my-table
          border
          ref="selection"
          height="350"
          :data="launchData"
          :columns="launchColumns"
        ></my-table>
      </div>
      <div class="item-table pie-tb-footer">
        <page
          :total="pageTotal"
          :pageSize="pageSize"
          :current="pageNum"
          @pageChange="pageChange"
          @pageSizeChange="pageSizeChange"
        ></page>
      </div>
    </div>
  </div>
</template>

<script>
import myTable from "@/components/table/my-table.vue";
import page from "@/components/page/page.vue";
export default {
  props: {
    resetStatus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      pageTotal: 10,
      pageSize: 10,
      pageNum: 1,
      currentid: 0,
      startTime: "", //开始时间
      endTime: "", //结束时间
      // 人工处理-发射  碰撞概率以及概率列表
      launchColumns: [
        {
          title: "选择",
          width: 80,
          align: "center",
          render: (h, params) => {
            let id = params.row.launch_windows_id;
            let flag = false;
            if (this.currentid === id) {
              flag = true;
            } else {
              flag = false;
            }
            let self = this;
            return h("div", [
              h("Radio", {
                props: {
                  value: flag,
                },
                on: {
                  "on-change": () => {
                    self.currentid = id;
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "序号",
          width: 80,
          type: "index",
          align: "center",
        },
        {
          title: "弹道（轨道）名称",
          key: "name",
          align: "center",
        },
        {
          title: "窗口起始时刻（北京）",
          key: "begin_time",
          align: "center",
        },
        {
          title: "窗口结束时刻（北京)",
          key: "end_time",
          align: "center",
        },
        {
          title: "时间步长",
          key: "step",
          align: "center",
        },
        {
          title: "计算时间",
          key: "in_time",
          align: "center",
        },
      ],
      launchData: [
        {
          launch_windows_id: 0,
          task_id: 0,
          span: 0,
          step: 0,
          forcast_length: 0,
          name: "launch_windows",
          begin_time: "2021-02-30 00:00:00",
          end_time: "2021-02-31 00:00:00",
          in_time: "2021-02-30 00:00:00",
        },
      ],
    };
  },
  watch: {
    // 监听id发生变化
    currentid(val) {
      this.$emit("on-currentid-change", val);
    },
    // 重置状态
    resetStatus() {
      this.setResetParameter();
    },
  },
  components: {
    myTable,
    page,
  },
  methods: {
    // 发射计算搜索接口
    computeSearch() {
      let params = {
        beginTime: this.startTime,
        endTime: this.endTime,
        page: this.pageNum,
        size: this.pageSize,
      };
      // 用于请求发射预警接口
      this.$api.advanced.selRenRentrieval1(params).then((res) => {
        if (res.success == true) {
          this.pageTotal = res.data.total;
          this.launchData = res.data.data;
        }
      });
    },
    // 开始时间
    onStartChange(time) {
      this.startTime = time;
    },
    // 结束时间
    onEndChange(time) {
      this.endTime = time;
    },
    // 页数
    pageChange(num) {
      this.pageNum = num;
      this.computeSearch();
    },
    // 条数
    pageSizeChange(size) {
      this.pageSize = size;
      this.computeSearch();
    },
    // 重置参数
    setResetParameter() {
      this.startTime = "";
      this.endTime = "";
      this.currentid = 0;
      this.launchData = [];
      this.pageTotal = 0;
    },
  },
};
</script>

<style lang="less" scoped>
.artificial-processing {
  .modal-content-items {
    margin: 0 20px;
  }

  .modal1-items {
    display: flex;
    align-items: center;
    margin-bottom: @artificial-bottom;
    .to-date {
      font-size: @artificial-font-size;
      color: @product-title-color;
      padding: 0 10px;
    }
    .item-title {
      margin-left: 120px;
      font-size: @artificial-font-size;
      color: @product-title-color;
      .crashProbabilityList-style {
        width: 500px;
      }
    }
    .search-btn {
      margin-left: 30px;
    }
    /deep/.ivu-select {
      width: 20%;
    }
  }
  .item-table {
    // margin-bottom: 30px;
  }
  .model-first-line {
    // display: flex;
    // justify-content: space-between;
  }

  .modal-title {
    width: 200px;
    display: flex;
    // width: @artificial-title-width;
    align-items: center;
    margin-right: @artificial-margin;
    font-size: 18px;
    color: @product-title-color;
  }

  .modal-title1 {
    display: flex;
    width: @artificial-title-width;
    margin-right: @artificial-margin;
    font-size: @artificial-font-size;
    color: @product-title-color;
    justify-content: flex-end;
    padding-right: @artificial-title-padding;
  }

  .modal-input {
    width: @artificial-input-width;
  }

  .modal-user-require {
    /deep/.ivu-input {
      height: @artificial-user-height;
    }
  }

  /deep/.ivu-input-wrapper {
    display: flex;
    flex: 1;
  }

  .modal-product-require {
    display: flex;
    flex: 1;
    margin-left: 2px;
    height: @artificial-product-height;
    background: @product-background;
    border: @product-border;
    color: @product-color;

    .product-require-items {
      margin: 20px 0px;
    }

    .product-require-item {
      display: flex;
      margin-bottom: 20px;

      .product-require-style {
        width: 230px;

        /deep/ .ivu-select-selection {
          border-color: @checked-color;
        }
      }

      .product-require-title {
        margin: 0 10px;
        width: 100px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }

      .ivu-date-picker {
        width: 230px;
      }
    }
  }

  /*
人工处理弹出框
产品受理情况、产品需求解释盒子颜色
*/
  .modal-product-require:hover {
    border-color: @product-border-color;
  }

  .modal-footer-twoline:hover {
    border-color: @product-border-color;
  }

  .modal-footer-twoline {
    display: flex;
    flex: 1;
    margin-left: 2px;
    height: 50px;
    background: @product-background;
    border: @product-border;
    color: @product-color;
    padding: 13px;

    /deep/ .ivu-radio-wrapper {
      margin: 0px 100px;
    }
  }
}
</style>