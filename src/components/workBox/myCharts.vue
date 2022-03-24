<template>
  <div ref="test" id="myCharts"></div>
</template>
<script>
export default {
  props: {
    // 数据
    dataList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 图形
    graphType: {
      type: String,
      default: "line",
    },
    // 路线类型
    lineType: {
      type: String,
      default: "solid",
    },
    // 路线粗细
    lineSize: {
      type: Number,
      default: 3,
    },
    //路线颜色
    lineColor: {
      type: String,
      default: "#A2ABEE",
    },
    //平滑曲线
    smoothType: {
      type: String,
      default: "0",
    },
    //图元的图形
    symbolType: {
      type: String,
      default: "circle",
    },
    //图元的大小
    symbolSize: {
      type: Number,
      default: 10,
    },
    //图元的颜色
    symbolColor: {
      type: String,
      default: "#DADEDE",
    },
    // 标记类型
    signType: {
      type: String,
      default: "pin",
    },
    // 标记大小
    signSize: {
      type: Number,
      default: 20,
    },
    // 标记颜色
    signColor: {
      type: String,
      default: "#A2ABEE",
    },
    // 标线类型
    markingType: {
      type: String,
      default: "dotted",
    },
    // 标线宽度
    markingSize: {
      type: Number,
      default: 1,
    },
    // 标线颜色
    markingColor: {
      type: String,
      default: "#A2ABEE",
    },
    //背景渐变
    backColor1: {
      type: String,
      default: "#0D79ED",
    },
    //背景渐变
    backColor2: {
      type: String,
      default: "#DACC4D",
    },
  },
  data() {
    return {
      option: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
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
        // legend: {},
        grid: {
          // top: 70,
          bottom: 80,
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 0,
            end: 100,
          },
          {
            type: "inside",
            realtime: true,
            start: 0,
            end: 100,
          },
        ],
        xAxis: {
          type: "category",
          show: true,
          nameLocation: "middle",
          axisLine: {
            onZero: false,
            lineStyle: {
              color: "#5470C6",
            },
          },
          boundaryGap: true,
          data: [
            "01:01",
            "01:02",
            "01:03",
            "01:04",
            "01:05",
            "01:06",
            "01:07",
            "01:08",
            "01:09",
            "01:10",
            "01:11",
            "01:12",
            "01:13",
            "01:14",
            "01:15",
            "01:16",
            "01:17",
            "01:18",
            "01:19",
            "01:20",
            "01:21",
            "01:22",
            "01:23",
            "01:24",
            "01:25",
            "01:26",
            "01:27",
            "01:28",
            "01:29",
            "01:30",
            "01:31",
            "01:32",
            "01:33",
            "01:34",
            "01:35",
            "01:36",
            "01:37",
            "01:38",
            "01:39",
            "01:40",
            "01:41",
            "01:42",
            "01:43",
            "01:44",
            "01:45",
            "01:46",
            "01:47",
            "01:48",
            "01:49",
            "01:50",
            "01:51",
            "01:52",
            "01:53",
            "01:54",
            "01:55",
            "01:56",
            "01:57",
            "01:58",
            "01:59",
            "01:60",
          ],
        },
        yAxis: {
          type: "category",
          show: true,
          nameLocation: "middle",
          axisLine: {
            onZero: false,
            lineStyle: {
              color: "#5470C6",
            },
          },
          boundaryGap: false,
          // data:["-6","-4","-2"]
          // axisLabel: {
          //   formatter: "{value}",
          //   // formatter: function(value) {
          //   //   if (value == 0) {
          //   //     return "0";
          //   //   } else if ((value + "").indexOf("e") > 0) {
          //   //     return (value + "").replace(/e/, "E");
          //   //   } else {
          //   //     var res = value.toString();
          //   //     var numN1 = 0;
          //   //     var numN2 = 1;
          //   //     var num1 = 0;
          //   //     var num2 = 0;
          //   //     var t1 = 1;
          //   //     for (var k = 0; k < res.length; k++) {
          //   //       if (res[k] == ".") {
          //   //         t1 = 0;
          //   //       }
          //   //       if (t1) {
          //   //         num1++;
          //   //       } else {
          //   //         num2++;
          //   //       }
          //   //     }
          //   //   }
          //   //   if (Math.abs(value) < 1) {
          //   //     for (var i = 2; i < res.length; i++) {
          //   //       if (res[i] == "0") {
          //   //         numN2++;
          //   //       } else if (res[i] == ".") {
          //   //         continue;
          //   //       } else {
          //   //         break;
          //   //       }
          //   //     }
          //   //     var v = parseFloat(value);
          //   //     v = v * Math.pow(10, numN2);
          //   //     v = v.toFixed(1);
          //   //     return v.toString() + "E-" + numN2;
          //   //   } else if (num1 > 1) {
          //   //     numN1 = num1 - 1;
          //   //     var s = parseFloat(value);
          //   //     s = s / Math.pow(10, numN1);
          //   //     if (num2 > 1) {
          //   //       s = s.toFixed(1);
          //   //     }
          //   //     return s.toString() + "E" + numN1;
          //   //   }
          //   // },
          // },
        },
        series: {
          // name: "绘图工具",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 10,
          radius: "50%",
          color: "#DADEDE",
          showBackground: true,
          // 柱状图填充背景色
          itemStyle: {
            // 填充渐变
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#0D79ED",
              },
              {
                offset: 1,
                color: "#DACC4D",
              },
            ]),
          },
          // 曲线图填充背景色
          areaStyle: {
            // 填充渐变
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#0D79ED",
              },
              {
                offset: 1,
                color: "#DACC4D",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          markPoint: {
            show: false, // 是否显示
            symbol: "pin", //标记类型 ：'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
            symbolSize: 20, //标记大小
            itemStyle: {
              color: "#A2ABEE", //标记颜色
            },
            data: [
              { type: "max", name: "Max" },
              { type: "min", name: "Min" },
            ],
          },
          markLine: {
            lineStyle: {
              color: "#A2ABEE", //标线颜色
              width: 2,
              type: "dotted", //标线类型 ： solid ， dashed ，dotted
            },
            data: [
              { type: "average", name: "平均线" },
              [
                {
                  symbol: "none",
                  x: "90%",
                  yAxis: "max",
                },
                {
                  symbol: "circle",
                  label: {
                    position: "start",
                    formatter: "Max",
                  },
                  type: "max",
                  name: "最高点",
                },
              ],
            ],
          },
          lineStyle: {
            color: "#A2ABEE",
            width: 3,
            type: "solid",
          },
          data: [
            { value: 0.83, name: "SA" },
            { value: 0.73, name: "DiDSrect" },
            { value: 0.54, name: "GJHDFGGF" },
            { value: 0.39, name: "fsdAS" },
            { value: 0.53, name: "FDGDFDG" },
            { value: 0.75, name: "DirSect" },
            { value: 0.46, name: "GJGHFGGF" },
            { value: 0.49, name: "fHsd" },
            { value: 0.33, name: "FKDGFDG" },
            { value: 0.35, name: "DLirect" },
            { value: 0.45, name: "GLJHFGGF" },
            { value: 0.43, name: "fs';d" },
            { value: 0.42, name: "FD'GFDG" },
            { value: 0.25, name: "DiDRrect" },
            { value: 0.54, name: "GJHFFGGF" },
            { value: 0.45, name: "fsdDS" },
            { value: 0.34, name: "FDGFFDG" },
            { value: 0.54, name: "DirFect" },
            { value: 0.64, name: "GJHDSGFFGGF" },
            { value: 0.93, name: "fsdGDFG" },
            { value: 0.32, name: "FDGFHGFDG" },
            { value: 0.56, name: "DirectH" },
            { value: 0.62, name: "GJHFGHFGGF" },
            { value: 0.94, name: "fsdHFG" },
            { value: 0.35, name: "FDGFGFHDG" },
            { value: 0.66, name: "DirecDFGt" },
            { value: 0.64, name: "GJHFGGGFDF" },
            { value: 0.94, name: "fsREWd" },
            { value: 0.32, name: "FDGFREWDG" },
            { value: 0.55, name: "DirecREWt" },
            { value: 0.63, name: "GJHFGGREWF" },
            { value: 0.92, name: "fsdREWR" },
            { value: 0.35, name: "FDGFDREWRG" },
            { value: 0.57, name: "DireREWRct" },
            { value: 0.66, name: "GJHFGGREWF" },
            { value: 0.94, name: "fUYTUsd" },
            { value: 0.33, name: "FDGFUDG" },
            { value: 0.56, name: "DireUYTct" },
            { value: 0.64, name: "GJHUYTFGGF" },
            { value: 0.65, name: "fsUTYd" },
            { value: 0.33, name: "FDGFUDG" },
            { value: 0.55, name: "Direct" },
            { value: 0.67, name: "GJHTYFGGF" },
            { value: 0.99, name: "f6655TYUsd" },
            { value: 0.33, name: "FDGFDUYTG" },
            { value: 0.32, name: "DireYTUct" },
            { value: 0.56, name: "GJHFIYUIGGF" },
            { value: 0.96, name: "fsYUIUYId" },
            { value: 0.53, name: "FDGFDIUYG" },
            { value: 0.54, name: "DireOIPct" },
            { value: 0.63, name: "GJHFGDFGF" },
            { value: 0.95, name: "fsSFREFGDFd" },
            { value: 0.32, name: "FDGREWFDG" },
            { value: 0.52, name: "DireREWRct" },
            { value: 0.62, name: "GJHFGREWGF" },
            { value: 0.94, name: "fsREWRd" },
            { value: 0.35, name: "FDGREWRFDG" },
            { value: 0.52, name: "DireREWRct" },
            { value: 0.63, name: "GJHFGGF" },
            { value: 0.93, name: "fsREWRd" },
          ],
        },
      },
    };
  },
  watch: {
    // 监听数据的变化
    dataList(list) {
      this.option.series.data = list;
      this.getMyCharts();
    },
    // 图形
    graphType(val) {
      this.option.series.type = val;
      if (val == "pie") {
        this.option.xAxis.show = false;
        this.option.yAxis.show = false;
        this.option.dataZoom[0].show = false;
      } else {
        this.option.xAxis.show = true;
        this.option.yAxis.show = true;
        this.option.dataZoom[0].show = true;
      }
      this.getMyCharts();
    },
    // 路线类型
    lineType(val) {
      this.option.series.lineStyle.type = val;
      this.getMyCharts();
    },
    // 路线粗细
    lineSize(size) {
      this.option.series.lineStyle.width = size;
      this.getMyCharts();
    },
    //路线颜色
    lineColor(color) {
      this.option.series.lineStyle.color = color;
      this.getMyCharts();
    },
    //平滑曲线
    smoothType(type) {
      this.option.series.smooth = Number(type);
      this.getMyCharts();
    },
    //图元的图形
    symbolType(type) {
      this.option.series.symbol = type;
      this.getMyCharts();
    },
    //图元的大小
    symbolSize(size) {
      this.option.series.symbolSize = size;
      this.getMyCharts();
    },
    //图元的颜色
    symbolColor(color) {
      this.option.series.color = color;
      this.getMyCharts();
    },
    // 标记类型
    signType(type) {
      this.option.series.markPoint.symbol = type;
      this.getMyCharts();
    },
    // 标记大小
    signSize(size) {
      this.option.series.markPoint.symbolSize = size;
      this.getMyCharts();
    },
    // 标记颜色
    signColor(color) {
      this.option.series.markPoint.itemStyle.color = color;
      this.getMyCharts();
    },
    // 标线类型
    markingType(type) {
      this.option.series.markLine.lineStyle.type = type;
      this.getMyCharts();
    },
    // 标线宽度
    markingSize(size) {
      this.option.series.markLine.lineStyle.width = size;
      this.getMyCharts();
    },
    // 标线颜色
    markingColor(color) {
      this.option.series.markLine.lineStyle.color = color;
      this.getMyCharts();
    },
    //背景渐变
    backColor1(color) {
      // 柱状图背景渐变
      this.option.series.itemStyle.color =
        new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: color,
          },
          {
            offset: 1,
            color: this.backColor2,
          },
        ]);
      // 曲线背景渐变
      this.option.series.areaStyle.color =
        new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: color,
          },
          {
            offset: 1,
            color: this.backColor2,
          },
        ]);
      this.getMyCharts();
    },
    //背景渐变
    backColor2(color) {
      // 柱状图背景渐变
      this.option.series.itemStyle.color =
        new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: this.backColor1,
          },
          {
            offset: 1,
            color: color,
          },
        ]);
      // 曲线背景渐变
      this.option.series.areaStyle.color =
        new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: this.backColor1,
          },
          {
            offset: 1,
            color: color,
          },
        ]);
      this.getMyCharts();
    },
  },
  mounted() {
    this.getMyCharts();
  },
  methods: {
    getMyCharts() {
      this.$nextTick(function () {
        let myChart = this.$echarts.init(document.getElementById("myCharts"));
        myChart.setOption(this.option);
        const zoomSize = 10;
        myChart.on("click", function (params) {
          myChart.dispatchAction({
            type: "dataZoom",
            startValue: Math.max(params.dataIndex - zoomSize),
            endValue: Math.min(params.dataIndex + zoomSize),
          });
        });
      });
    },
  },
};
</script>
<style lang="less" scoped>
#myCharts {
  width: 100%;
  height: 100%;
  padding: 10px 0;
}
</style>
