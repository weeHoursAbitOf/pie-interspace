<template>
  <div>
    <Drawer
      title="工具箱"
      placement="left"
      width="16"
      height="100"
      :mask-closable="false"
      :mask="false"
      :closable="true"
      v-model="isShowDrawer"
      @on-close="onClose"
    >
      <div class="drawer-content">
        <ul>
          <li>
            <p>图形</p>
            <span>
              <Select v-model="graphType" style="width: 150px">
                <Option
                  v-for="(item, index) in graphTypeList"
                  :value="item.value"
                  :key="index"
                  >{{ item.label }}</Option
                >
              </Select>
            </span>
          </li>
          <li v-show="graphType == 'line'">
            <p>路线类型</p>
            <span>
              <Select v-model="lineType" style="width: 150px">
                <Option
                  v-for="(item, index) in lineTypeList"
                  :value="item.value"
                  :key="index"
                  >{{ item.label }}</Option
                >
              </Select>
            </span>
          </li>
          <li v-show="graphType == 'line'">
            <p>路线粗细</p>
            <span>
              <InputNumber :max="100" :min="1" v-model="lineSize"></InputNumber>
            </span>
          </li>
          <li v-show="graphType == 'line'">
            <p>路线颜色</p>
            <span>
              <ColorPicker v-model="lineColor" recommend />
            </span>
          </li>
          <li v-show="graphType == 'line'">
            <p>平滑曲线</p>
            <span>
              <Select v-model="smooth" style="width: 150px">
                <Option
                  v-for="item in smoothList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </span>
          </li>
          <li v-show="graphType == 'line'">
            <p>图元</p>
            <span>
              <Select v-model="symbolType" style="width: 150px">
                <Option
                  v-for="item in symbolTypeList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </span>
          </li>
          <li v-show="graphType == 'line'">
            <p>图元大小</p>
            <span>
              <InputNumber
                :max="100"
                :min="1"
                v-model="symbolSize"
              ></InputNumber>
            </span>
          </li>
          <li v-show="graphType == 'line'">
            <p>图元颜色</p>
            <span>
              <ColorPicker v-model="symbolColor" recommend />
            </span>
          </li>
          <li>
            <p>标记类型</p>
            <span>
              <Select v-model="signType" style="width: 150px">
                <Option
                  v-for="item in signTypeList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </span>
          </li>
          <li>
            <p>标记大小</p>
            <span>
              <InputNumber :max="100" :min="1" v-model="signSize"></InputNumber>
            </span>
          </li>
          <li>
            <p>标记颜色</p>
            <span>
              <ColorPicker v-model="signColor" recommend />
            </span>
          </li>

          <li>
            <p>标线类型</p>
            <span>
              <Select v-model="markingType" style="width: 150px">
                <Option
                  v-for="item in markingTypeList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </span>
          </li>
          <li>
            <p>标线宽度</p>
            <span>
              <InputNumber
                :max="100"
                :min="1"
                v-model="markingSize"
              ></InputNumber>
            </span>
          </li>
          <li>
            <p>标线颜色</p>
            <span>
              <ColorPicker v-model="markingColor" recommend />
            </span>
          </li>
          <li>
            <p>背景渐变</p>
            <span>
              <ColorPicker v-model="backColor1" recommend />
            </span>
            <span>
              <ColorPicker v-model="backColor2" recommend />
            </span>
          </li>
        </ul>
      </div>
    </Drawer>
  </div>
</template>

<script>
export default {
  props: {
    isShowDrawer: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      graphTypeList: [
        {
          value: "line",
          label: "折线图",
        },
        {
          value: "bar",
          label: "柱状图",
        },
        // {
        //   value: "pie",
        //   label: "饼图",
        // },
      ],
      graphType: "line", //图形
      lineTypeList: [
        {
          value: "solid",
          label: "solid",
        },
        {
          value: "dashed",
          label: "dashed",
        },
        {
          value: "dotted",
          label: "dotted",
        },
      ],
      lineType: "solid", //路线类型
      lineSize: 3, //路线粗细
      lineColor: "#A2ABEE", //路线颜色
      smoothList: [
        {
          value: "0",
          label: "否",
        },
        {
          value: "1",
          label: "是",
        },
      ],
      smooth: "0", //平滑曲线
      symbolTypeList: [
        {
          value: "circle",
          label: "circle",
        },
        {
          value: "rect",
          label: "rect",
        },
        {
          value: "roundRect",
          label: "roundRect",
        },
        {
          value: "triangle",
          label: "triangle",
        },
        {
          value: "diamond",
          label: "diamond",
        },
        {
          value: "pin",
          label: "pin",
        },
        {
          value: "arrow",
          label: "arrow",
        },
        {
          value: "none",
          label: "none",
        },
      ],
      symbolType: "circle", //图元的图形
      symbolSize: 10, //图元的大小
      symbolColor: "#DADEDE", //图元的颜色
      signTypeList: [
        {
          value: "circle",
          label: "circle",
        },
        {
          value: "rect",
          label: "rect",
        },
        {
          value: "roundRect",
          label: "roundRect",
        },
        {
          value: "triangle",
          label: "triangle",
        },
        {
          value: "diamond",
          label: "diamond",
        },
        {
          value: "pin",
          label: "pin",
        },
        {
          value: "arrow",
          label: "arrow",
        },
        {
          value: "none",
          label: "none",
        },
      ],
      signType: "pin", // 标记类型
      signSize: 20, //标记大小
      signColor: "#A2ABEE", //标记颜色
      markingTypeList: [
        {
          value: "solid",
          label: "solid",
        },
        {
          value: "dashed",
          label: "dashed",
        },
        {
          value: "dotted",
          label: "dotted",
        },
      ],
      markingType: "dotted", // 标线类型
      markingSize: 1, //标线宽度
      markingColor: "#A2ABEE", //标线颜色
      backColor1: "#0D79ED", //背景渐变
      backColor2: "#DACC4D", //背景渐变
    };
  },
  watch: {
    // 图形
    graphType(val) {
      this.$emit("on-graph-event", val);
    },
    // 路线类型
    lineType(val) {
      this.$emit("on-line-event", val);
    },
    //路线粗细
    lineSize(size) {
      this.$emit("on-line-size-event", size);
    },
    //路线颜色
    lineColor(color) {
      this.$emit("on-line-color-event", color);
    },
    //平滑曲线
    smooth(val) {
      this.$emit("on-smooth-type-event", val);
    },
    //图元的图形
    symbolType(type) {
      this.$emit("on-symbol-type-event", type);
    },
    //图元的大小
    symbolSize(size) {
      this.$emit("on-symbol-size-event", size);
    },
    //图元的颜色
    symbolColor(color) {
      this.$emit("on-symbol-color-event", color);
    },
    // 标记类型
    signType(type) {
      this.$emit("on-mark-point-type-event", type);
    },
    // 标记大小
    signSize(size) {
      this.$emit("on-mark-point-size-event", size);
    },
    //标记颜色
    signColor(color) {
      this.$emit("on-mark-point-color-event", color);
    },
    // 标线类型
    markingType(type) {
      this.$emit("on-marking-type-event", type);
    },
    // 标线宽度
    markingSize(size) {
      this.$emit("on-marking-size-event", size);
    },
    //标线颜色
    markingColor(color) {
      this.$emit("on-marking-color-event", color);
    },
    //背景渐变
    backColor1(color) {
      this.$emit("on-back-color1", color);
    },
    //背景渐变
    backColor2(color) {
      this.$emit("on-back-color2", color);
    },
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
.drawer-content {
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
