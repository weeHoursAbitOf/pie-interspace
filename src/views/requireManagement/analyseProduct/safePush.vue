<template>
  <!-- 推送配置 -->
  <div class="pie-tb-content">
    <pie-card :slotIsContent="false" :slotFooter="false">
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-content">
            <div class="tb-header-item">
              <span>产品选择</span>
              <Input v-model="productSelect" class="input-style" />
              <new-btn
                title="添加"
                class="btn-item"
                @click="addProduct"
              ></new-btn>
            </div>
            <div class="tb-header-item">
              <span>对外服务对象</span>
              <Input v-model="externalServiceTarget" class="input-style" />
              <new-btn
                title="添加"
                class="btn-item"
                @click="addServiceTarget"
              ></new-btn>
            </div>
          </div>
        </div>

        <div class="pie-tb-footer">
          <!-- <page :total="pageTotal" :pageSize="pageSize" :current="pageNum"></page> -->
          <div class="tb-header-button">
            <cancel-btn
              class="btn-item"
              onclick="window.history.back()"
            ></cancel-btn>
            <reset-btn class="btn-item"></reset-btn>
            <create-report-btn class="btn-item"></create-report-btn>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <div slot="footer">
        <div class="pie-tb-footer">
          <!-- <page :total="pageTotal" :pageSize="pageSize" :current="pageNum"></page> -->
          <div class="tb-header-button">
            <cancel-btn
              class="btn-item"
              onclick="window.history.back()"
            ></cancel-btn>
            <reset-btn class="btn-item"></reset-btn>
            <create-report-btn class="btn-item"></create-report-btn>
          </div>
        </div>
      </div>
    </pie-card>
    <!-- 添加产品弹出框 -->
    <my-modal
      width="30"
      height="60"
      v-model="isModal"
      @cancel="cancel"
      :title="title"
      :resetBtn="false"
      @confirm="confirmAdd"
    >
      <div slot="operateItem">
        <div class="modal-content-items">
          <div slot="iscontent">
            <div class="tb-header-content">
              <RadioGroup v-model="productGroup">
                <Radio
                  v-for="item in productGroupList"
                  :label="item.label"
                  :key="item.value"
                  >{{ item.label }}</Radio
                >
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </my-modal>
    <!-- 添加对外服务对象弹出框 -->
    <my-modal
      width="30"
      height="60"
      v-model="serviceModal"
      @cancel="cancel"
      :title="title"
      :resetBtn="false"
      @confirm="confirmAdd"
    >
      <div slot="operateItem">
        <div class="modal-content-items">
          <div slot="iscontent">
            <div class="tb-header-content">
              <RadioGroup v-model="externalServiceTargetGroup">
                <Radio
                  v-for="item in externalServiceTargetList"
                  :label="item.label"
                  :key="item.value"
                  >{{ item.label }}</Radio
                >
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </my-modal>
  </div>
</template>
<script>
import pieCard from "@/components/pie-card/pie-card.vue";
import page from "@/components/page/page.vue";
import switchBtn from "@/components/button/switch-btn.vue";

export default {
  components: {
    pieCard,
    page,
    switchBtn,
  },
  data() {
    return {
      pageTotal: 10, //数据总数
      pageNum: 1, //初始页
      pageSize: 10, //每页条数
      productSelect: "", //产品选择
      externalServiceTarget: "", //对外服务对象
      productGroupList: [
        {
          value: "1",
          label: "轨道产品",
        },
        {
          value: "2",
          label: "编目产品",
        },
        {
          value: "3",
          label: "预警产品",
        },
        {
          value: "4",
          label: "系统能力产品",
        },
        {
          value: "5",
          label: "系统状态产品",
        },
        {
          value: "6",
          label: "在轨预警产品",
        },
        {
          value: "7",
          label: "发射预警产品",
        },
        {
          value: "8",
          label: "解体事件分析产品",
        },
        {
          value: "9",
          label: "再入陨落分析产品",
        },
        {
          value: "10",
          label: "安全规避分析产品",
        },
        {
          value: "11",
          label: "项目产品",
        },
        {
          value: "12",
          label: "企业产品",
        },
      ],
      externalServiceTargetList: [
        {
          value: "1",
          label: "高级用户",
        },
        {
          value: "2",
          label: "普通用户",
        },
        {
          value: "3",
          label: "政府人员",
        },
        {
          value: "4",
          label: "管理员",
        },
      ],
      isModal: false,
      serviceModal: false,
      title: "",
      productGroup: "", //选中产品
      externalServiceTargetGroup: "", //选中对外服务对象
    };
  },
  methods: {
    //添加关注目标集
    addProduct() {
      this.isModal = true;
      this.title = "关注目标集";
    },
    //添加对外服务对象
    addServiceTarget() {
      this.serviceModal = true;
      this.title = "对外服务对象";
    },
    //确认添加
    confirmAdd() {
      this.isModal = false;
      this.serviceModal = false;
      this.productSelect = this.productGroup;
      this.externalServiceTarget = this.externalServiceTargetGroup;
    },
    cancel() {
      this.isModal = false;
      this.serviceModal = false;
    },
  },
};
</script>
<style lang="less" scoped>
.pie-tb-content {
  height: 100%;
  .public-bg {
    height: 100%;
    /deep/ .pie-card-header {
      height: 100%;
      padding-top: 150px;
      // width: 100%;
      // display: flex;
      // align-items: center;
    }
  }
  .pie-tb-header {
    display: flex;
    justify-content: space-between;
    padding: 0 @table-padding @table-padding @table-padding;
    font-size: @lable-font-size;
    flex-wrap: wrap;

    .tb-header-content {
      display: flex;
      align-items: center;
      flex-direction: row;
      flex-wrap: wrap;
      margin: @table-input-space;
      color: @lable-font-color;
      width: 100%;
      .tb-header-item {
        display: flex;
        margin-bottom: @table-lable-space;
        width: 100%;
        margin-left: 30%;
        .input-style {
          margin: auto @table-lable-space;
          width: 300px;
        }
        .short-input-style {
          width: 80px;
          margin: auto @table-lable-space;
        }
        span {
          width: 120px;
          text-align: right;
        }
        .text {
          width: 60px;
          text-align: right;
        }
      }
    }
  }
  .btn-item {
    margin-right: @table-button-space;
  }
  .tb-header-button {
    display: flex;
    justify-content: flex-end;
    // margin-top: @table-lable-space;
    margin: 10px 0;
  }
  .switch {
    margin-left: @table-lable-space;
  }
  //弹出框样式
  .modal-content-items {
    display: flex;
    padding: 0 @table-padding @table-padding @table-padding;
    font-size: @lable-font-size;
    flex-wrap: wrap;
    color: @lable-font-color;
    .ivu-radio-wrapper {
      display: flex;
      align-items: center;
      font-size: @lable-font-size;
      margin-bottom: @table-lable-space;
    }
    .ivu-radio-group {
      width: 500px;
      height: 480px;
      overflow: scroll;
    }
  }
}
</style>