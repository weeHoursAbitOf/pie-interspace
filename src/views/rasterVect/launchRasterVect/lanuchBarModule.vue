<template>
  <div class="lanuch-bar-content">
    <div class="lanuch-bar-top">
      <ul class="lanuch-bar-searching">
        <li>
          <p>发射窗口</p>
          <span>
            <Input
              v-model="launchWindosId"
              class="input-style"
              style="width: 200px"
              placeholder="请输入发射窗口ID"
            />
          </span>
        </li>
        <li>
          <p>碰撞概率最大值</p>
          <span>
            <InputNumber
              :formatter="(value) => `1E${value}`"
              v-model="probMax"
              :min="-7"
              :max="0"
              class="input-style"
              style="width: 80px"
            />
          </span>
        </li>
        <li>
          <p>碰撞概率最小值</p>
          <span>
            <InputNumber
              :formatter="(value) => `1E${value}`"
              v-model="probMin"
              :min="-8"
              :max="probMin_MAX"
              class="input-style"
              style="width: 80px"
            />
          </span>
        </li>
        <li>
          <p></p>
          <span>
            <share-btn
              class="share-btn"
              title="搜索"
              callBackName="on-searching-event"
              @on-searching-event="onSearchingEvent"
            />
          </span>
        </li>
      </ul>
    </div>
    <div class="lanuch-bar-echarts">
      <echartsUnits
        :probData="probData"
        :launchTimeData="launchTimeData"
        :probMax="probMax"
        :probMin="probMin"
      />
    </div>
  </div>
</template>

<script>
import echartsUnits from "./echartsUnits";
export default {
  components: {
    echartsUnits,
  },
  data() {
    return {
      probMax: -4, //最大值
      probMin: -7, //最小值
      probMin_MAX: -5, //
      launchWindosId: "", //发射窗口id
      probData: [], //碰撞概率
      launchTimeData: [], //发射时间
    };
  },
  watch: {
    probMax(val) {
      this.probMin = Number(val + -1);
      this.probMin_MAX = Number(val + -1);
    },
  },
  methods: {
    onSearchingEvent() {
      if (this.launchWindosId != "") {
        this.getData();
      } else {
        this.$Notice.error({
          title: "发射窗口不能为空。。。",
          top: 50,
          duration: 5,
        });
      }
    },
    getData() {
      let params = {
        launchWindosId: this.launchWindosId,
        maxValue: "1e" + this.probMax,
        minValue: "1e" + this.probMin,
      };
      this.$api.advanced.getDrawingToolsController(params).then((res) => {
        if (res.success) {
          let probData = [];
          let launchTimeData = [];
          res.data.forEach((item) => {
            probData.push(item.proBability);
            launchTimeData.push(this.$utils.formatDate(item.launchTime, 0));
          });
          this.probData = probData;
          this.launchTimeData = launchTimeData;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.lanuch-bar-content {
  width: 100%;
  height: 100%;
  font-size: @lable-font-size;
  color: @lable-font-color;
  display: flex;
  flex-direction: column;
  .lanuch-bar-top {
    display: flex;
    align-items: center;
    .lanuch-bar-searching {
      width: 70%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      li {
        display: flex;
        align-items: center;
        p {
          margin: 0 10px;
        }
      }
    }
  }
}

.lanuch-bar-echarts {
  width: 100%;
  height: 100%;
  padding: 10px 0;
}
.share-btn {
  margin: 0 10px;
}
</style>
