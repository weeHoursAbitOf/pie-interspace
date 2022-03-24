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
                  >{{ item.label }}</Option
                >
              </Select>
              <TimePicker
                type="time"
                placeholder="请选择时间"
                v-if="this.triggerMode == '定时'"
                class="input-style"
              ></TimePicker>
            </div>
            <div class="tb-header-item" v-if="this.triggerMode == '立即'">
              <span>目标编号</span>
              <Input v-model="targetNumber" class="input-style" />
              <share-btn
                title="上传文件"
                class="btn-item"
                @click="addTargetSet"
              ></share-btn>
              <!-- <Upload action="//jsonplaceholder.typicode.com/posts/">
                <share-btn :title="上传文件"></share-btn>
              </Upload> -->
            </div>
            <div class="tb-header-item">
              <!-- <span>产品格式</span>
              <CheckboxGroup v-model="productFormat" class="input-style">
                <Checkbox label="TLE"></Checkbox>
                <Checkbox label="ELE"></Checkbox>
              </CheckboxGroup> -->
            </div>
          </div>
        </div>

        <!-- <div class="pie-tb-footer"> -->
        <!-- <page :total="pageTotal" :pageSize="pageSize" :current="pageNum"></page> -->
        <div class="tb-header-button">
          <cancel-btn
            class="btn-item"
            onclick="window.history.back()"
          ></cancel-btn>
          <reset-btn class="btn-item"></reset-btn>
          <create-report-btn class="btn-item"></create-report-btn>
        </div>
        <!-- </div> -->
      </div>
      <div slot="content">></div>
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
import shareBtn from "@/components/button/share-btn.vue";


export default {
  components: {
    pieCard,
    page,
    switchBtn,
    shareBtn
  },
  data() {
    return {
      pageTotal: 10, //数据总数
      pageNum: 1, //初始页
      pageSize: 10, //每页条数
      triggerMode: "", //触发方式
      targetNumber: "", //目标编号
      productFormat: [], //产品格式
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
    };
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
  },
};
</script>
<style lang="less" scoped>
.pie-tb-content {
  height: 100%;
  .public-bg{
    height: 100%;
    /deep/ .pie-card-header{
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
    width: 100%;
    justify-content: center;
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
