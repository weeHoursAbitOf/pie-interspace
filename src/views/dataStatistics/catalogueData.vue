<template>
  <div>
    <div class="content">
      <div id="histogram"></div>
      <div id="linechart"></div>
      <div id="pie"></div>
    </div>
  </div>
</template>
<script>
import editor from "@/components/editor/wang-editor";
import echarts from "echarts";

export default {
  components: {
    editor,
    echarts,
  },
  data() {
    return {
      option1: {
        color: ["#3EBB81", "#DD7866", "#A91270", "#05AFC9"],
        title: {
          left: "center",
          text: "自主编目来源渠道信息量统计",
          textStyle: {
            color: "#fff",
          },
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          show: true,
          data: ["上报", "待处置", "处置中", "已完结"],
          top: "bottom",
          textStyle: {
            color: "#fff",
          },
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: { show: true },
          },
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: [1, 2, 3, 4, 5, 6, 7],
            axisLabel: {
              textStyle: {
                color: "#fff",
              },
            },
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#1d3870", //左边线的颜色
                width: "1", //坐标线的宽度
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            data: [0, 10, 20, 30, 40, 50, 60],
            axisLabel: {
              textStyle: {
                color: "#fff",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "#1d3870",
                width: "1",
              },
            }, //去除网格线
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#1d3870",
                width: "1",
              },
            },
          },
        ],
        series: [
          {
            name: "上报",
            type: "bar",
            roundCap: true,
            itemStyle: {
              emphasis: {
                barBorderRadius: 8,
              },
              normal: {
                barBorderRadius: [20, 20, 20, 20],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#2996B6",
                  },
                  {
                    offset: 1,
                    color: "#372fd0",
                  },
                ]),
              },
            },
            data: [20, 30, 50, 60, 30, 50, 60],
          },
          {
            name: "待处置",
            type: "bar",
            roundCap: true,
            itemStyle: {
              emphasis: {
                barBorderRadius: 5,
              },
              normal: {
                barBorderRadius: [20, 20, 20, 20],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#7ea8ee",
                  },
                  {
                    offset: 1,
                    color: "#1209C3",
                  },
                ]),
              },
            },
            data: [10, 20, 30, 40, 20, 22, 11],
          },
          {
            name: "处置中",
            type: "bar",
            roundCap: true,
            itemStyle: {
              emphasis: {
                barBorderRadius: 5,
              },
              normal: {
                barBorderRadius: [20, 20, 20, 20],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#735dfa",
                  },
                  {
                    offset: 1,
                    color: "#1c05ae",
                  },
                ]),
              },
            },
            data: [5, 15, 20, 20, 15, 33, 42],
          },
          {
            name: "已完结",
            type: "bar",
            roundCap: true,
            itemStyle: {
              emphasis: {
                barBorderRadius: 5,
              },
              normal: {
                barBorderRadius: [20, 20, 20, 20],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#1077f5",
                  },
                  {
                    offset: 1,
                    color: "#042667",
                  },
                ]),
              },
            },
            data: [25, 5, 10, 5, 3, 13, 26],
          },
        ],
      },
      option2: {
        title: {
          left: "center",
          text: "编目信息量统计",
          textStyle: {
            color: "#fff",
          },
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: ["1", "3", "5", "7", "9", "11", "13", "15", "17", "19"],
          axisLabel: {
            textStyle: {
              color: "#fff",
            },
          },
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#1d3870", //左边线的颜色
              width: "1", //坐标线的宽度
            },
          },
        },
        yAxis: {
          type: "value",
          data: ["10", "20", "30", "40", "50", "60"],
          axisLabel: {
            textStyle: {
              color: "#fff",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "#1d3870",
              width: "1",
            },
          }, //去除网格线
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#1d3870",
              width: "1",
            },
          },
        },
        series: [
          {
            data: [3, 10, 24, 20, 30, 24, 20, 25, 40, 20],
            type: "line",
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#1c05ae'
                        }, {
                            offset: 1,
                            color: 'transparent'
                        }
                    ]),
                }
            },
            itemStyle: {
              normal: {
                color: "#8cd5c2", //改变折线点的颜色
                lineStyle: {
                  color: "#1077f5", //改变折线颜色
                },
              },
            },
          },
        ],
      },
      option3: {
        title: {
          left: "center",
          text: "编目信息各渠道占比统计",
          textStyle: {
            color: "#fff",
          },
        },
        backgroundColor: "transparent", // 画布背景色
        tooltip: {
          // 提示框
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
          textStyle: {
            color: "#fff",
          },
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "60%"], //内 外圆半径
            center: ["50%", "50%"],
            color: ["#5f98ff", "#0083FE", "#1C55BE", "#06368F", "#4F17E8"], // 色块填充颜色
            avoidLabelOverlap: false,
            label: {
              normal: {
                formatter: "{b|{b}} \n {hr|} \n  {c|{c}条} {d|{d}%}",
                rich: {
                  b: {
                    fontSize: 16,
                    align: "center",
                  },
                  hr: {
                    // 分割线
                    borderColor: "#1d3870",
                    width: "100%",
                    borderWidth: 1,
                    height: 0,
                  },
                  c: {
                    fontSize: 16,
                    align: "center",
                    padding: 2,
                  },
                  d: {
                    fontSize: 16,
                    align: "center",
                    padding: 2,
                  },
                },
                textStyle: {
                  fontWeight: "normal",
                  fontSize: 15,
                },
              },
            },
            itemStyle: {
              borderWidth: 5,
              borderColor: "#010814",
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 548, name: "搜索引擎" },
            ],
          },
        ],
      },
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let myChart = this.$echarts.init(document.getElementById("histogram"));

      // let chart = echarts.init(test);
      myChart.setOption(this.option1);
      let myChart1 = this.$echarts.init(document.getElementById("linechart"));
      myChart1.setOption(this.option2);
      let myChart2 = this.$echarts.init(document.getElementById("pie"));
      myChart2.setOption(this.option3);
    },
  },
};
</script>
<style lang="less" scoped>
.content {
  display: flex;
  padding: @table-top-space;
  flex-wrap: wrap;
}
#histogram,
#linechart,
#pie {
  height: 300px;
  width: 500px;
  margin-bottom: @table-top-space;
}
#pie {
  margin-top: 30px;
  height: 400px;
  width: 600px;
  margin-bottom: @table-top-space;
}
</style>