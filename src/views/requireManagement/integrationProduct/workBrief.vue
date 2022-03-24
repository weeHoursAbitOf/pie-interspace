<template>
  <div class="launchForeign-container">
    <div class="launchForeign-content">
      <div class="launchForeign-section">
        <ul>
          <li>
            <p>头版头条编写人：</p>
            <span>
              <Input v-model="headlineWriters" placeholder style="width: 300px" />
            </span>
          </li>
          <li>
            <p>近地轨道：</p>
            <span>
              <Input v-model="low" placeholder style="width: 300px" />
            </span>
            <span>(条)</span>
          </li>
          <li>
            <p>文献导读编写人：</p>
            <span>
              <Input v-model="documentGuideWriter" placeholder style="width: 300px" />
            </span>
          </li>
          <li>
            <p>地球同步轨道：</p>
            <span>
              <Input v-model="high" placeholder style="width: 300px" />
            </span>
            <span>(条)</span>
          </li>
          <li>
            <p>常规内容编写人：</p>
            <span>
              <Input v-model="regularContentWriter" placeholder style="width: 300px" />
            </span>
          </li>
          <li>
            <p>中地球轨道：</p>
            <span>
              <Input v-model="middle" placeholder style="width: 300px" />
            </span>
            <span>(条)</span>
          </li>
          <li>
            <p>创建日期：</p>
            <span>
              <DatePicker
                :value="produceTime"
                type="date"
                style="width: 300px"
                @on-change="onProduceTimeChange"
              ></DatePicker>
            </span>
          </li>
          <li>
            <p>碰撞预警版面：</p>
            <span>
              <CheckboxGroup v-model="selectSections" class="checked-content" size="large">
                <Checkbox label="1">
                  <span>我国卫星与空间碎片危险交会统计</span>
                </Checkbox>
                <Checkbox label="2">
                  <span>FY碎片与危险最近的十次交会</span>
                </Checkbox>
                <Checkbox label="3">
                  <span>碎片概况</span>
                </Checkbox>
                <Checkbox label="4">
                  <span>过去1个月陨落情况</span>
                </Checkbox>
                <Checkbox label="5">
                  <span>未来2个月卫星陨落预报</span>
                </Checkbox>
                <Checkbox label="6">
                  <span>卫星轨道变化</span>
                </Checkbox>
              </CheckboxGroup>
            </span>
          </li>
        </ul>
      </div>
      <div class="launchForeign-footer">
        <share-btn title="重置" callBackName="reset-event" @reset-event="resetevent" />
        <div style="width: 20px"></div>
        <share-btn
          title="配置"
          callBackName="configuration-event"
          @configuration-event="configurationevent"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headlineWriters: "", //头版头条编写人
      documentGuideWriter: "", //文献导读编写人
      regularContentWriter: "", //常规内容编写人
      produceTime: "", //生成时间
      selectSections: [], //碰撞预警面板
      low: "", //近地点
      middle: "", //中地球轨道
      high: "", //地球同步轨道
    };
  },
  methods: {
    //生成时间
    onProduceTimeChange(time) {
      this.produceTime = time;
    },
    // 配置
    configurationevent() {
      if (!this.checkoutData()) {
        return false;
      }
      let params = {
        documentGuideWriter: this.documentGuideWriter,
        regularContentWriter: this.regularContentWriter,
        time: this.produceTime,
        headlineWriters: this.headlineWriters,
        selectedSections: this.selectSections.filter((item) => item).join(),
        low: this.low,
        middle: this.middle,
        high: this.high,
      };
      this.$api.advanced.briefReport(params).then((res) => {
        if (res.success == true) {
          this.resetevent();
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    checkoutData() {
      if (!this.headlineWriters) {
        this.$Notice.warning({
          title: "请输入头版头条编写人。。。",
          top: 50,
          duration: 5,
        });
        return;
      } else if (!this.documentGuideWriter) {
        this.$Notice.warning({
          title: "请输入文献导读编写人。。。",
          top: 50,
          duration: 5,
        });
        return;
      } else if (!this.regularContentWriter) {
        this.$Notice.warning({
          title: "请输入常规内容编写人。。。",
          top: 50,
          duration: 5,
        });
        return;
      } else if (!this.produceTime) {
        this.$Notice.warning({
          title: "请选择日期。。。",
          top: 50,
          duration: 5,
        });
        return;
      } else if (!this.low) {
        this.$Notice.warning({
          title: "请输入近地轨道（条）。。。",
          top: 50,
          duration: 5,
        });
        return;
      } else if (!this.middle) {
        this.$Notice.warning({
          title: "请输入中地球轨道（条）。。。",
          top: 50,
          duration: 5,
        });
        return;
      } else if (!this.high) {
        this.$Notice.warning({
          title: "请输入地球同步轨道（条）。。。",
          top: 50,
          duration: 5,
        });
        return;
      } else {
        return true;
      }
    },
    // 重置
    resetevent() {
      this.headlineWriters = "";
      this.documentGuideWriter = "";
      this.regularContentWriter = "";
      this.produceTime = "";
      this.selectSections = [];
      this.low = "";
      this.middle = "";
      this.high = "";
    },
  },
};
</script>

<style lang="less" scoped>
.launchForeign-content {
  padding: @table-padding;
  font-size: @lable-font-size;
  color: @main-font-color;
  .launchForeign-section {
    display: flex;
    ul {
      padding: 80px 150px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-around;

      li {
        width: 45%;
        display: flex;
        align-items: center;
        margin: 10px 0;
        p {
          width: 140px;
          text-align: right;
        }
        span {
          margin-right: @table-padding;
        }
      }
    }
  }
  .launchForeign-footer {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.checked-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;
}
/deep/.ivu-checkbox {
  margin: 0 10px;
  margin-top: 2px;
}
// .group-drag-modal {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   top: 0;
//   left: 0;
//   position: fixed;
//   z-index: 1001;
//   width: 100vw;
//   height: 100vh;
//   background-color: rgba(0, 0, 0, 0.6);
// }
</style>