<template>
  <div class="pie-tb-content">
    <pie-card :slotFooter="false">
      <!-- 筛选条件 -->
      <div slot="header">
        <div class="pie-tb-header">
            <div class="filter-condition">
            <div class="filter-item">
              <label>单位</label>
              <Select v-model="unit" class="filter-item-select">
                <Option
                  v-for="item in unitList"
                  :value="item.value"
                  :key="item.value"
                >
                  {{ item.label }}
                </Option>
              </Select>
            </div>
          </div>
          <div class="filter-condition">
            <div class="filter-item">
              <label>统计时间</label>
              <Select v-model="statisticalTime" class="filter-item-select">
                <Option
                  v-for="item in timeList"
                  :value="item.value"
                  :key="item.value"
                >
                  {{ item.label }}
                </Option>
              </Select>
            </div>
          </div>
          <div class="filter-condition">
            <div class="filter-item">
              <label>统计间隔</label>
              <Select v-model="statisticalInterval" class="filter-item-select">
                <Option
                  v-for="item in intervalList"
                  :value="item.value"
                  :key="item.value"
                >
                  {{ item.label }}
                </Option>
              </Select>
            </div>
          </div>
        </div>
      </div>
      <!-- 表体 -->
      <div slot="iscontent">
        <div class="pie-table"> 
          <div
            ref="test"
            id="myChartsLine"
          ></div>
        </div>
      </div>
    </pie-card>
  </div>
</template>
<script>
import pieCard from "@/components/pie-card/pie-card.vue";
import searchBtn from "@/components/button/search-btn.vue";
import editor from "@/components/editor/wang-editor";
export default {
  components: {
    pieCard,
    searchBtn,
    editor
  },
  data () {
    return {
        statisticalTime:"",  //统计时间
        statisticalInterval:"",  //统计间隔
        unit:"", //单位
        unitList:[
            {
                label:"行政单位",
                value:"1"
            },
            {
                label:"事业单位",
                value:"2"
            },
            {
                label:"其他单位",
                value:"3"
            }
        ],
        timeList:[
            {
                label:"本月",
                value:"1"
            },
            {
                label:"本季度",
                value:"2"
            },
            {
                label:"本年度",
                value:"3"
            }
        ],
        intervalList:[
            {
                label:"天",
                value:"1"
            },
            {
                label:"周",
                value:"2"
            },
            {
                label:"月",
                value:"3"
            }
        ],
        option: {
            title: {
                left: "center",
                text: "外来需求单位统计",
                textStyle: {
                    color: "#c9e1ff",
                    fontSize: 15,
                },
            },
            tooltip: {
                trigger: 'axis',
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: {show: true}
                }
            },
            legend: {
                show: true,
                data: ["单位", "平均值"],
                top: "bottom",
                textStyle: {
                    color: "#c9e1ff",
                },
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['机关单位', '事业单位', '行政单位', '国家单位', '创新单位', '其他单位'],
                    axisLabel: {
                        textStyle: {
                            color: "#c9e1ff",
                        },
                    },
                    axisLine: {
                        lineStyle: {
                            type: "solid",
                            color: "#1d3870", //左边线的颜色
                            width: "1", //坐标线的宽度
                        },
                    },
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    min: 0,
                    max: 250,
                    interval: 50,
                    axisLabel: {
                        textStyle: {
                            color: '#c9e1ff'
                        }
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
                {
                    type: 'value',
                    min: 0,
                    max: 25,
                    interval: 5,
                    axisLabel: {
                        // formatter: '{value} °C',
                        textStyle: {
                            color: '#c9e1ff'
                        }
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
                }
            ],
            series: [
                {
                    name: '单位',
                    type: 'bar',
                    barCategoryGap:"70%",
                    // barGap:"50%",
                    itemStyle: {
                        emphasis: {
                            barBorderRadius: 8,
                        },
                        normal: {
                            // barBorderRadius: [20, 20, 20, 20],
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
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
                    data:  [72.6, 85.9, 99.0, 116.4, 138.7, 160.7]
                },
                {
                    name: '平均值',
                    type: 'line',
                    itemStyle : {
                    normal : {
                        color:'#8cd5c2', //改变折线点的颜色
                        lineStyle:{
                            color:'#1077f5' //改变折线颜色
                        }
                    }
                },
                    yAxisIndex: 1,
                    data: [11.0, 12.2, 13.3, 14.5, 16.3, 20.2]
                }
            ]
        },
    }
  },
  methods: {
  },
  mounted () {

    this.$nextTick(function () {
      // let test = (this.$refs.test);
      let myChart = this.$echarts.init(document.getElementById('myChartsLine'));

      // let chart = echarts.init(test);
      myChart.setOption(this.option);
    })



  },
};
</script>
<style lang="less" scoped>
.pie-tb-header {
    display: flex;
    max-width: 100%;
    font-size: @lable-font-size;
    flex-wrap: wrap;

    .filter-condition{
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: @lable-font-color;
        margin-right: 80px;

        .filter-item-select{
            width: 280px;
            margin-left: @search-lable-space;
        }
    } 
}
.pie-table{
    display: flex;
    justify-content: center;
}
#myChartsLine{
    width: 1200px;
    height: 500px;
    margin-top: @table-top-space;
}

</style>