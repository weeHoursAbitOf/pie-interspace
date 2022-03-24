<template>
  <div ref="test" id="myCharts"></div>
</template>
<script>
export default {
  data() {
    return {
      option: {
        // title: {
        //   text: "时间",
        //   x: "center",
        //   bottom: 0,
        //   textStyle: {
        //     color: "#c9e1ff",
        //     fontSize: 15,
        //     // fontWeight: "normal",
        //   },
        // },
        toolbox: {
          feature: {
            saveAsImage: {
              type: "jpg",
              name: "图形",
              show: true,
            },
          },
        },
        xAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              color: "#c9e1ff",
              width: "1",
            },
          },
        },
        yAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              color: "#c9e1ff",
              width: "1",
            },
          },
        },
        series: [
          {
            name: "line",
            type: "line",
            datasetIndex: 1,
            sybolSize: 0.1,
            symbol: "circle",
            label: {
              show: true,
              fontSize: 16,
            },
            labelLayout: {
              dx: -20,
            },
            encode: {
              label: 2,
              tooltip: 1,
            },
          },
          {
            name: "",
            type: "scatter",
            itemStyle: {
              color: "rgb(255, 41, 41)",
              borderWinth: 0,
              borderColor: "rgb(255, 41, 41)",
            },
            data: [],
          },
          {
            name: "",
            type: "scatter",
            itemStyle: {
              color: "rgb(0, 129, 129)",
              borderWinth: 0,
              borderColor: "rgb(0, 129, 129)",
            },
            data: [],
          },
        ],
      },
    };
  },

  created() {
    this.getMyCharts();
    let data = [
      {
        data1: 1100.054123,
        data2: 2000.982312,
      },
      {
        data1: 1200.054123,
        data2: 3000.982312,
      },
      {
        data1: 1400.054123,
        data2: 4000.282312,
      },
      {
        data1: 1500.054123,
        data2: 6000.382312,
      },
      {
        data1: 2000.054123,
        data2: 3000.682312,
      },
      {
        data1: 1000.054123,
        data2: 1000.782312,
      },
    ];
    data.forEach((item) => {
      this.option.series[1].data.push(item.data1);
      this.option.series[2].data.push(item.data2);
    });
  },
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
  width: 100%;
  height: 650px;
}
</style>
