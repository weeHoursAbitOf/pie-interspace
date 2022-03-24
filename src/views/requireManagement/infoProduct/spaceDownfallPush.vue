<template>
  <!-- 推送配置 -->
  <div class="pie-tb-content">
    <pie-card :slotIsContent="false" :slotFooter="false">
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-content">
            <div class="tb-header-item">
              <span>生成方式</span>
              <Select v-model="triggerMode" class="input-style">
                <Option
                  v-for="item in triggerModeList"
                  :value="item.label"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
              <Select v-model="time" v-if="this.triggerMode == '定时'" class="input-style">
                <Option
                  v-for="item in timeList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </div>
            <!-- <div class="tb-header-item" v-if="this.triggerMode == '立即'">
              <span>目标编号</span>
              <Input v-model="targetNumber" class="input-style" />
              <new-btn
                title="添加"
                class="btn-item"
                @click="addTargetSet"
              ></new-btn>
            </div>-->
            <div class="tb-header-item">
              <span>生成模板</span>
              <Select v-model="productTmplate" class="input-style">
                <Option
                  v-for="item in productTmplateList"
                  :value="item.id"
                  :key="item.id"
                >{{ item.name }}</Option>
              </Select>
            </div>
            <div class="tb-header-item">
              <span>产品格式</span>
              <CheckboxGroup v-model="productFormat" class="checkbox-style">
                <Checkbox label="TXT"></Checkbox>
                <Checkbox label="CSV"></Checkbox>
                <Checkbox label="HTML"></Checkbox>
              </CheckboxGroup>
            </div>
          </div>
        </div>
        <div class="pie-tb-footer">
          <div class="tb-header-button">
            <reset-btn class="btn-item"></reset-btn>
            <create-report-btn class="btn-item" @click="createReport"></create-report-btn>
          </div>
        </div>
      </div>
    </pie-card>
    <!-- 添加目标编号弹出框 -->
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
              <RadioGroup v-model="targetSetGroup">
                <Radio
                  v-for="item in targetSetGroupList"
                  :label="item.label"
                  :key="item.value"
                >{{ item.label }}</Radio>
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
export default {
  components: {
    pieCard,
  },
  data() {
    return {
      pageTotal: 10, //数据总数
      pageNum: 1, //初始页
      pageSize: 10, //每页条数
      triggerMode: "立即", //触发方式
      targetNumber: "", //目标编号

      triggerModeList: [
        {
          value: "1",
          label: "立即",
        },
        {
          value: "2",
          label: "定时",
        },
      ],
      targetSetGroupList: [
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
          label: "目标0011号",
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
      isModal: false,
      title: "",
      targetSetGroup: "", //选中目标集
      productFormat: [], //产品格式
      productTmplate: "", //产品模板
      productTmplateList: [
        {
          id: "1",
          name: "2020年模板",
        },
      ],
      time: "", //定时日期选择
      timeList: [
        {
          value: "1",
          label: "每周一",
        },
        {
          value: "2",
          label: "每周二",
        },
        {
          value: "3",
          label: "每周三",
        },
        {
          value: "4",
          label: "每周四",
        },
        {
          value: "5",
          label: "每周五",
        },
        {
          value: "6",
          label: "每周六",
        },
        {
          value: "7",
          label: "每周日",
        },
      ],
    };
  },
  created() {
    this.getRenTemAll();
  },
  methods: {
    //添加目标编号
    addTargetSet() {
      this.isModal = true;
      this.title = "目标编号";
    },
    //确认添加
    confirmAdd() {
      this.isModal = false;
      this.targetNumber = this.targetSetGroup;
    },
    cancel() {
      this.isModal = false;
    },
    // 用于获取生成模板数据列表
    getRenTemAll() {
      this.$api.rendezvous.getRenTemAll().then((res) => {
        if (res.success == true) {
          this.productTmplateList = res.data;
        }
      });
    },
    // 配置按钮
    createReport() {
      let params = {
        fileType: this.productFormat,
        openTaskTime: this.time,
        temid: this.productTmplate,
      };
      // 请求配置接口
      this.$api.rendezvous.creTask(params).then((res) => {
        if (res.success == true) {
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });

        }
      });
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
        align-items: center;
        width: 100%;
        margin-left: 30%;
        .input-style {
          margin: auto @table-lable-space;
          width: 300px;
        }
        .checkbox-style {
          margin: auto @table-lable-space;
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
  .ivu-checkbox-wrapper {
    margin-right: 50px !important;
  }
}
</style>
