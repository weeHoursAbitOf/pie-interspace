<template>
  <div ref="test" id="myCharts"></div>
</template>
<script>
export default {
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
        xAxis: {
          name: "轨道根数时间",
          nameLocation: "middle",
          nameGap: 40,
          nameTextStyle: {
            color: "#c9e1ff",
            fontSize: 15,
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: "#c9e1ff",
              width: "1",
            },
          },
          data: [
            "2010-01-01",
            "2011-01-01",
            "2012-01-01",
            "2013-01-01",
            "2014-01-01",
            "2015-01-01",
            "2016-01-01",
            "2017-01-01",
            "2018-01-01",
            "2019-01-01",
            "2020-01-01",
            "2021-01-01",
            "2022-01-01",
            "2023-01-01",
          ],
        },
        yAxis: {
          name: "轨道半长轴（km）",
          nameLocation: "middle",
          nameGap: 60,
          nameTextStyle: {
            color: "#c9e1ff",
            fontSize: 15,
          },
          axisLine: {
            show: true,
            onZero: false,
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
            data: [
              [1, 3000],
              [2, 2000],
              [3, 6000],
              [4, 7000],
              [5, 3000],
              [6, 4000],
              [7, 1000],
              [8, 2000],
              [9, 5000],
              [10, 2000],
              [11, 6000],
              [12, 4000],
              [13, 2000],
            ],
          },
        ],
      },
    };
  },

  created() {
    this.getMyCharts();
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
