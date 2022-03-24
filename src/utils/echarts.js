export function initChart(data, domId, vue) {
  let option = {
    color: ["#6074A7"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    grid: {
      top: 20,
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: {
      name: "万元", // 给X轴加单位
      type: "value",
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: "category",
      data: data.label
    },
    dataZoom: [
      {
        show: true,
        yAxisIndex: 0,
        filterMode: "empty",
        width: 30,
        height: "90%",
        showDataShadow: false,
        top: "5%",
        left: 0,
        start: "100",
        end: "0"
      }
    ],
    series: [
      {
        label: {
          normal: {
            show: true,
            color: "#000",
            position: "right"
          }
        },
        name: "2012年",
        type: "bar",
        barMaxWidth: 50, //最大宽度
        data: data.value
      }
    ]
  };
  if (data.callback) {
    option.tooltip.formatter = data.callback;
  }
  if (data.end) {
    option.dataZoom[0].end = data.end + "";
  }
  if (data.chartLabelIndex == 1) {
    option.xAxis.name = "人";
  }
  vue.barchart = vue.$echarts.init(document.getElementById(domId));
  vue.barchart.setOption(option);
}
