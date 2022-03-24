<template>
  <!-- 推送配置 -->
  <div class="pie-tb-content">
    <pie-card :slotIsContent="false" :slotFooter="false">
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-content">
            <div class="tb-header-item">
              <span>目标编号</span>
              <Input v-model="targetSelect" class="input-style" />
              <new-btn
                title="添加"
                class="btn-item"
                @click="addTarget"
              ></new-btn>
            </div>
            <div class="tb-header-item">
              <span>预报时间</span>
              <Select v-model="forecastTime" class="input-style">
                <Option
                  v-for="item in forecastTimeList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </div>
            <div class="tb-header-item">
              <span>卫星名称替换文件</span>
              <Input v-model="targetSelect" class="input-style" />
              <new-btn
                title="导入"
                class="btn-item"
                @click="addTarget"
              ></new-btn>
            </div>
            <div class="tb-header-item">
              <span>国别名称替换文件</span>
              <Input v-model="targetSelect" class="input-style" />
              <new-btn
                title="导入"
                class="btn-item"
                @click="addTarget"
              ></new-btn>
            </div>
            <div class="tb-header-item">
              <span>产品模板</span>
              <Select v-model="productTemplate" class="input-style">
                <Option
                  v-for="item in productTemplateList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
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
            <create-report-btn
              class="btn-item"
              title="报告生成"
            ></create-report-btn>
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
            <create-report-btn
              class="btn-item"
              title="报告生成"
            ></create-report-btn>
          </div>
        </div>
      </div>
    </pie-card>
    <!-- 添加目标弹出框 -->
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
              <RadioGroup v-model="targetGroup">
                <Radio
                  v-for="item in targetGroupList"
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
      targetSelect: "", //目标选择
      productTemplate: "", //产品模板
      externalServiceTarget: "", //对外服务对象
      forecastTime: "", //预报时间
      productTemplateList: [
        {
          value: "1",
          label: "2020年模板",
        },
        {
          value: "2",
          label: "2021年模板",
        },
      ],
      forecastTimeList: [
        {
          value: "1",
          label: "2个月",
        },
        {
          value: "2",
          label: "3个月",
        },
        {
          value: "3",
          label: "5个月",
        },
        {
          value: "4",
          label: "12个月",
        },
        {
          value: "5",
          label: "1年",
        },
        {
          value: "6",
          label: "3年",
        },
        {
          value: "7",
          label: "5年",
        },
        {
          value: "8",
          label: "10年",
        },
        {
          value: "9",
          label: "20年",
        },
        {
          value: "10",
          label: "25年",
        },
      ],
      targetGroupList: [
        {
          value: "1",
          label: "目标001号",
        },
        {
          value: "2",
          label: "目标002号",
        },
        {
          value: "3",
          label: "目标003号",
        },
        {
          value: "4",
          label: "目标004号",
        },
        {
          value: "5",
          label: "目标005号",
        },
        {
          value: "6",
          label: "目标006号",
        },
        {
          value: "7",
          label: "目标007号",
        },
        {
          value: "8",
          label: "目标008号",
        },
        {
          value: "9",
          label: "目标009号",
        },
        {
          value: "10",
          label: "目标0010号",
        },
        {
          value: "11",
          label: "目标0013号",
        },
        {
          value: "12",
          label: "目标0012号",
        },
        {
          value: "13",
          label: "目标0013号",
        },
        {
          value: "14",
          label: "目标0014号",
        },
        {
          value: "15",
          label: "目标0015号",
        },
        {
          value: "16",
          label: "目标0016号",
        },
        {
          value: "17",
          label: "目标0017号",
        },
        {
          value: "18",
          label: "目标0018号",
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
      typeOne: true,
      typeElse: false,
      isModal: false,
      serviceModal: false,
      title: "",
      targetGroup: "", //选中目标
      externalServiceTargetGroup: "", //选中对外服务对象
    };
  },
  methods: {
    //添加关注目标集
    addTarget() {
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
      this.targetSelect = this.targetGroup;
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
      padding-top: 100px;
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
        margin-left: 25%;
        .input-style {
          margin: auto @table-lable-space;
          width: 300px;
        }
        .short-input-style {
          width: 80px;
          margin: auto @table-lable-space;
        }
        span {
          width: 200px;
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
    margin-top: @table-lable-space;
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