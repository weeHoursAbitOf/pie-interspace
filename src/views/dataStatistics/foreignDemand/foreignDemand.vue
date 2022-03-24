<template>
  <div class="pie-tb-content">
    <pie-card :slotFooter="false">
      <!-- 筛选条件 -->
      <div slot="header">
        <div class="pie-tb-header">
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
        <div class="table">
        <div class="pie-table"> 
          <div
            ref="test"
            id="myCharts"
          ></div>
        </div>
        <div class="pie-table"> 
          <p>外来需求完成率统计</p>
          <div class="echart-style">
            <div
              ref="test"
              id="myChartsBar"
            ></div>
            <div
              ref="test"
              id="myChartsBarElse"
            ></div>
          </div>
        </div>
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
            left: 'center',
            text: '外来需求量统计',
            textStyle: {
                color: '#c9e1ff',
                fontSize: 15,
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          toolbox: {
            show: true,
            feature: {
              saveAsImage: { show: true },
            }
          },
          xAxis: {
            type: 'category',
            data: ['1', '3', '5', '7', '9', '11',  '13', '15', '17', '19'],
            axisLabel: {
                textStyle: {
                    color: '#c9e1ff'
                }
              },
            axisLine: {
            lineStyle: {
                type: 'solid',
                color: '#1d3870',//左边线的颜色
                width:'1'//坐标线的宽度
            }
            },
          },
          yAxis: {
            type: 'value',
            data: ['10', '20', '30', '40', '50', '60'],
            axisLabel: {
            textStyle: {
                color: '#c9e1ff'
            }
            },
            splitLine:{
            show: true,
            lineStyle:{
                type:'dashed' ,
                color:'#1d3870',
                width:'1' 
            },
            },//去除网格线
            axisLine: {
            lineStyle: {
                type: 'solid',
                color:'#1d3870',
                width:'1'
            }
            },
          },
          series: [{
            data: [3,10, 24, 20, 30, 24, 20,25,40,20],
            type: 'line',
            areaStyle: {
                normal: {
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#1c05ae'
                        }, {
                            offset: 1,
                            color: 'transparent'
                        }
                    ]),
                }
            },
            itemStyle : {
                normal : {
                    color:'#8cd5c2', //改变折线点的颜色
                    lineStyle:{
                        color:'#1077f5' //改变折线颜色
                    }
                }
            },
          }],
        },
        option1: {
            title: {
                text: '',
                top:'3%',
                left:'0',
                textStyle:{
                    color: '#c9e1ff',
                    fontFamily: 'sans-serif',
                    fontSize: 16,
                }
            },
        series: [{
            name: '来源',
            type: 'pie',
            radius: ['60%', '75%'],
            color: ["#1C55BE", "rgba(28,85,190,0.2)"], // 色块填充颜色
            avoidLabelOverlap: false,
            hoverAnimation:false,
            label: {
                normal: {
                    show: false,
                    position: 'center',
                    textStyle: {
                        fontSize:16,
                        fontWeight: 'bold',
                        color: '#c9e1ff',
                    },
                    formatter:'{b}\n\n{c}%',

                }
            },
            data: [{
                    value: '38',
                    name:'设备需求',
                    label:{
                        normal:{
                            show:true,
                        }
                    },
                 },
                 {
                    value: 62,
                    name: '总量'
                }
            ]
        }]
        },
        option2: {
            title: {
                text: '',
                top:'3%',
                left:'0',
                textStyle:{
                    color: '#c9e1ff',
                    fontFamily: 'sans-serif',
                    fontSize: 16,
                }
            },
        series: [{
            name: '来源',
            type: 'pie',
            radius: ['60%', '75%'],
            color: ["#5f98ff", "rgba(95,152,255,0.2)"], // 色块填充颜色
            avoidLabelOverlap: false,
            hoverAnimation:false,
            label: {
                normal: {
                    show: false,
                    position: 'center',
                    textStyle: {
                        fontSize:16,
                        fontWeight: 'bold',
                        color: '#c9e1ff',
                    },
                    formatter:'{b}\n\n{c}%',

                }
            },
            data: [{
                    value: '70',
                    name:'数据需求',
                    label:{
                        normal:{
                            show:true,
                        }
                    },
                 },
                 {
                    value: 30,
                    name: '总量'
                }
            ]
        }]
        },
    }

  },
  methods: {
  },
  mounted () {

    this.$nextTick(function () {
      // let test = (this.$refs.test);
      let myChart = this.$echarts.init(document.getElementById('myCharts'));

      // let chart = echarts.init(test);
      myChart.setOption(this.option);
      let myChart1 = this.$echarts.init(document.getElementById('myChartsBar'));

      // let chart = echarts.init(test);
      myChart1.setOption(this.option1);
      let myChart2 = this.$echarts.init(document.getElementById('myChartsBarElse'));

      // let chart = echarts.init(test);
      myChart2.setOption(this.option2)
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
    width: 50%;
    height: 100%;
    margin-top: @search-lable-space;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
.echart-style{
        display: flex;
        justify-content: center;
    }
.table{
        display: flex;
    }
#myCharts{
    width: 700px;
    height: 500px;
    margin-bottom: @search-lable-space;
}
#myChartsBar,
#myChartsBarElse{
    width: 300px;
    height: 450px;
    margin-bottom: @search-lable-space;
}
p{
    text-align: center;
    font-size: 15px;
    font-weight: 600;
    color: #c9e1ff;
}

</style>