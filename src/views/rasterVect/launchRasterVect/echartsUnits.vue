<template>
  <div ref="test" id="myCharts"></div>
</template>
<script>
export default {
  props: {
    probData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    launchTimeData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    probMax: {
      type: Number,
      default: 1e-4,
    },
    probMin: {
      type: Number,
      default: 1e-7,
    },
  },
  data() {
    return {
      option: {
        title: {
          text: "发射时刻（北京时间）",
          x: "center",
          bottom: 0,
          textStyle: {
            color: "#000",
            fontSize: 20,
            fontWeight: "normal",
          },
        },
        toolbox: {
          feature: {
            saveAsImage: {
              type: "jpg",
              name: "图形",
              show: true,
            },
          },
        },
        legend: {
          show: false,
          selected: { conceal: false },
        },
        xAxis: {
          type: "category",
          show: true,
          z: 3,
          nameLocation: "middle",
          axisLine: {
            show: true,
            lineStyle: {
              color: "#000",
              width: "2",
            },
          },
          boundaryGap: true,
          data: [],
        },
        yAxis: {
          type: "log",
          name: "各\n个\n发\n射\n时\n刻\n对\n应\n的\n碰\n撞\n概\n率",
          nameLocation: "left",
          z: 3,
          min: 1e-7,
          max: 1e-4,
          nameTextStyle: {
            color: "#000",
            fontSize: 20,
            padding: [0, 150, -130, 0],
          },
          baundaryGap: false,
          axisLine: {
            show: true,
            lineStyle: {
              color: "#000",
              width: "2",
            },
          },
          axisLabel: {
            show: true,
            inside: false,
            rotate: 15,
            formatter: function (value) {
              var res = value.toString();
              var numN1 = 0;
              var numN2 = 1;
              var num1 = 0;
              var num2 = 0;
              var t1 = 1;
              for (var k = 0; k < res.length; k++) {
                if (res[k] == ".") {
                  t1 = 0;
                }
                if (t1) {
                  num1++;
                } else {
                  num2++;
                }
                if (Math.abs(value) < 1 && res.length > 4) {
                  for (var i = 2; i < res.length; i++) {
                    if (res[i] == "0") {
                      numN2++;
                    } else if (res[i] == ".") {
                      continue;
                    } else {
                      break;
                    }
                  }
                  var v = parseFloat(value);
                  v = v * Math.pow(10, numN2);
                  return v.toString() + "e-" + numN2;
                } else if (num1 > 4) {
                  if (res[0] == "-") {
                    numN1 = num1 - 2;
                  } else {
                    numN1 = num1 - 1;
                  }
                  var v = parseFloat(value);
                  v = v / Math.pow(10, numN1);
                  if (num2 > 4) {
                    v = v.toFixed(4);
                    return v.toString() + "e" + numN1;
                  }
                } else {
                  if (value != 0) {
                    return parseFloat(value);
                  }
                }
              }
            },
          },
        },
        series: {
          type: "bar",
          barCategoryGap: "1%",
          showBackground: true,
          backgroundStyle: {
            color: "#2B44FE",
          },
          itemStyle: {
            color: "#fff",
            barderColor: "#fff",
          },
          data: [1e-4, 1e-5, 1e-6, 1e-7],
        },
      },
    };
  },
  watch: {
    probMax(value) {
      this.option.yAxis.max = Number("1e" + value);
    },
    probMin(value) {
      this.option.yAxis.min = Number("1e" + value);
    },
    probData: {
      handler: {
        handler(newName) {
          this.option.series.data = newName;
          this.getMyCharts();
        },
        immediate: true,
        deep: true,
      },
    },
    launchTimeData: {
      handler: {
        handler(newName) {
          this.option.xAxis.data = newName;
          this.getMyCharts();
        },
        immediate: true,
        deep: true,
      },
    },
  },
  // created() {
  //   this.getMyCharts();
  // },
  methods: {
    getMyCharts() {
      this.$nextTick(function () {
        let myChart = this.$echarts.init(document.getElementById("myCharts"));
        myChart.setOption(this.option);
      });
    },
  },
};
</script>
<style lang="less" scoped>
#myCharts {
  width: 1200px;
  height: 550px;
  padding: 10px 0;
  background-color: #fff;
}
</style>
