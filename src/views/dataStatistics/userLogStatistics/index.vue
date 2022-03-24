<template>
  <div class="user-log-container">
    <pie-card :slotFooter="false">
      <div slot="header">
        <div class="header-search-left">
          <ul class="date-time">
            <li>
              <p>图形：</p>
              <Select
                v-model="graphType"
                class="input-style"
                style="width: 200px"
              >
                <Option
                  v-for="(item, index) in graphTypeList"
                  :key="index"
                  :value="item.value"
                >
                  {{ item.label }}
                </Option>
              </Select>
              <div style="width: 100px"></div>
              <p>时间范围：</p>
              <DatePicker
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                placeholder="开始时间"
                style="width: 200px"
              />
              <span>~</span>
              <DatePicker
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                placeholder="结束时间"
                style="width: 200px"
              />
            </li>
            <li>
              <p>数据类型</p>
              <Checkbox v-model="loginStatus">登录日志</Checkbox>
              <Checkbox v-model="reqisterStatus">注册日志</Checkbox>
              <Checkbox v-model="updataStatus">修改日志</Checkbox>
              <Checkbox v-model="deleteStatus">删除日志</Checkbox>
              <Checkbox v-model="downloadStatus">下载日志</Checkbox>
            </li>
            <li>
              <p></p>
              <share-btn
                title="检索"
                callBackName="on-search-event"
                @on-search-event="onSearchEvent"
                class="btn-item"
              />
            </li>
          </ul>
        </div>
      </div>
      <div slot="iscontent">
        <div class="subassembly-left">
          <bar-my-cherts v-show="graphType == 'bar'" :obj="obj" />
          <line-my-cherts v-show="graphType == 'line'" :obj="obj" />
          <pie-my-cherts v-show="graphType == 'pie'" :obj="obj" />
        </div>
      </div>
    </pie-card>
    <div style="width: 15px"></div>
    <div class="subassembly-right">
      <ul>
        <li>
          <p>登 录 日 志</p>
          <div class="log-content">
            <div class="log-manage">
              <span>登录成功</span>
              <Progress
                :percent="100"
                :stroke-width="15"
                hide-info
                status="active"
                :stroke-color="['#AAB4FC', '#6B7CFB']"
              />
              <Tooltip :content="content" placement="top">
                <template slot="content">59322（条）</template>
                <dl>
                  <dt>59322</dt>
                  <dd>(条)</dd>
                </dl>
              </Tooltip>
            </div>
            <div class="log-manage">
              <span>登录警告</span>
              <Progress
                :percent="100"
                :stroke-width="15"
                hide-info
                status="active"
                :stroke-color="['#AAB4FC', '#FF6F6F']"
              />
              <Tooltip :content="content" placement="top">
                <template slot="content">10274（条）</template>
                <dl>
                  <dt>10274</dt>
                  <dd>(条)</dd>
                </dl>
              </Tooltip>
            </div>
          </div>
        </li>
        <li>
          <p>注 册 日 志</p>
          <div class="log-content">
            <div class="log-manage">
              <span>注册成功</span>
              <Progress
                :percent="100"
                :stroke-width="15"
                hide-info
                status="active"
                :stroke-color="['#386EA7', '#006CDD']"
              />
              <Tooltip :content="content" placement="top">
                <template slot="content">62（条）</template>
                <dl>
                  <dt>62</dt>
                  <dd>(条)</dd>
                </dl>
              </Tooltip>
            </div>
            <div class="log-manage">
              <span>注册警告</span>
              <Progress
                :percent="100"
                :stroke-width="15"
                hide-info
                status="active"
                :stroke-color="['#386EA7', '#FF6F6F']"
              />
              <Tooltip :content="content" placement="top">
                <template slot="content">103（条）</template>
                <dl>
                  <dt>103</dt>
                  <dd>(条)</dd>
                </dl>
              </Tooltip>
            </div>
          </div>
        </li>
        <li>
          <p>下 载 日 志</p>
          <div class="log-content">
            <div class="log-manage">
              <span>下载数据</span>
              <Progress
                :percent="100"
                :stroke-width="15"
                hide-info
                status="active"
                :stroke-color="['#99A5FF', '#64FEB0']"
              />
              <Tooltip :content="content" placement="top">
                <template slot="content">6322（条）</template>
                <dl>
                  <dt>6322</dt>
                  <dd>(条)</dd>
                </dl>
              </Tooltip>
            </div>
          </div>
        </li>
        <li>
          <p>修 改 日 志</p>
          <div class="log-content">
            <div class="log-manage">
              <span>修改资料</span>
              <Progress
                :percent="100"
                :stroke-width="15"
                hide-info
                status="active"
                :stroke-color="['#0B5DB4', '#EDAF53']"
              />
              <Tooltip :content="content" placement="top">
                <template slot="content">382（条）</template>
                <dl>
                  <dt>382</dt>
                  <dd>(条)</dd>
                </dl>
              </Tooltip>
            </div>
            <div class="log-manage">
              <span>修改密码</span>
              <Progress
                :percent="100"
                :stroke-width="15"
                hide-info
                status="active"
                :stroke-color="['#0B5DB4', '#FFB3B3']"
              />
              <Tooltip :content="content" placement="top">
                <template slot="content">482（条）</template>
                <dl>
                  <dt>482</dt>
                  <dd>(条)</dd>
                </dl>
              </Tooltip>
            </div>
            <div class="log-manage">
              <span>修改密保</span>
              <Progress
                :percent="100"
                :stroke-width="15"
                hide-info
                status="active"
                :stroke-color="['#0B5DB4', '#72FEF1']"
              />
              <Tooltip :content="content" placement="top">
                <template slot="content">832（条）</template>
                <dl>
                  <dt>832</dt>
                  <dd>(条)</dd>
                </dl>
              </Tooltip>
            </div>
            <div class="log-manage">
              <span>修改数据</span>
              <Progress
                :percent="100"
                :stroke-width="15"
                hide-info
                status="active"
                :stroke-color="['#0B5DB4', '#FFBC60']"
              />
              <Tooltip :content="content" placement="top">
                <template slot="content">10374（条）</template>
                <dl>
                  <dt>10374</dt>
                  <dd>(条)</dd>
                </dl>
              </Tooltip>
            </div>
          </div>
        </li>
        <li>
          <p>删 除 日 志</p>
          <div class="log-content">
            <div class="log-manage">
              <span>删除密保</span>
              <Progress
                :percent="100"
                :stroke-width="15"
                hide-info
                status="active"
                :stroke-color="['#FE6F6F', '#EE3607']"
              />
              <Tooltip :content="content" placement="top">
                <template slot="content">204（条）</template>
                <dl>
                  <dt>204</dt>
                  <dd>(条)</dd>
                </dl>
              </Tooltip>
            </div>
            <div class="log-manage">
              <span>删除数据</span>
              <Progress
                :percent="100"
                :stroke-width="15"
                hide-info
                status="active"
                :stroke-color="['#FE6F6F', '#F8078C']"
              />
              <Tooltip :content="content" placement="top">
                <template slot="content">8213（条）</template>
                <dl>
                  <dt>8213</dt>
                  <dd>(条)</dd>
                </dl>
              </Tooltip>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import barMyCherts from "./barMyCherts.vue";
import lineMyCherts from "./lineMyCherts.vue";
import pieMyCherts from "./pieMyCherts.vue";
export default {
  components: {
    barMyCherts,
    lineMyCherts,
    pieMyCherts,
  },
  data() {
    return {
      graphType: "bar", //图形类型
      graphTypeList: [
        {
          value: "bar",
          label: "柱状图",
        },
        {
          value: "line",
          label: "折线图",
        },
        {
          value: "pie",
          label: "饼图",
        },
      ],
      loginStatus: true,
      reqisterStatus: true,
      updataStatus: true,
      deleteStatus: true,
      downloadStatus: true,
      obj: {},
    };
  },
  mounted() {
    this.obj = {
      data: [
        "2021/01",
        "2021/02",
        "2021/03",
        "2021/04",
        "2021/05",
        "2021/06",
        "2021/07",
        "2021/08",
        "2021/09",
        "2021/10",
        "2021/11",
        "2021/12",
      ],
      login: [
        3124, 3212, 2455, 3245, 4212, 5324, 3212, 5321, 7423, 2334, 4523, 5323,
      ],
      reqister: [
        4332, 4324, 3244, 4324, 4324, 4324, 5434, 5424, 5435, 4324, 5435, 4324,
      ],
      updata: [
        3245, 3432, 3244, 2345, 5435, 4365, 4325, 3255, 3235, 3543, 3355, 2453,
      ],
      delete: [
        3432, 4364, 2344, 2433, 5435, 4324, 2345, 2432, 5465, 3244, 3252, 3254,
      ],
      download: [
        3432, 4364, 5453, 4354, 2356, 4654, 2343, 5453, 3453, 2323, 4363, 4234,
      ],
    };
  },
  methods: {
    onSearchEvent() {
      this.obj.data = [
        "2021/01",
        "2021/02",
        "2021/03",
        "2021/04",
        "2021/05",
        "2021/06",
        "2021/07",
        "2021/08",
        "2021/09",
        "2021/10",
        "2021/11",
        "2021/12",
      ];
      if (this.loginStatus) {
        this.obj.login = [
          3124, 3212, 2455, 3245, 4212, 5324, 3212, 5321, 7423, 2334, 4523,
          5323,
        ];
      } else {
        this.obj.login = [];
      }
      if (this.reqisterStatus) {
        this.obj.reqister = [
          4332, 4324, 3244, 4324, 4324, 4324, 5434, 5424, 5435, 4324, 5435,
          4324,
        ];
      } else {
        this.obj.reqister = [];
      }
      if (this.updataStatus) {
        this.obj.updata = [
          3245, 3432, 3244, 2345, 5435, 4365, 4325, 3255, 3235, 3543, 3355,
          2453,
        ];
      } else {
        this.obj.updata = [];
      }
      if (this.deleteStatus) {
        this.obj.delete = [
          3432, 4364, 2344, 2433, 5435, 4324, 2345, 2432, 5465, 3244, 3252,
          3254,
        ];
      } else {
        this.obj.delete = [];
      }
      if (this.downloadStatus) {
        this.obj.download = [
          3432, 4364, 5453, 4354, 2356, 4654, 2343, 5453, 3453, 2323, 4363,
          4234,
        ];
      } else {
        this.obj.download = [];
      }
    },
  },
};
</script>
<style lang="less" scoped>
.user-log-container {
  width: 1565px;
  height: 100%;
  display: flex;
  color: @main-font-color;
  .header-search-left {
    font-size: 15px;
    ul {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      li {
        display: flex;
        align-items: center;
        margin: 5px 0;
        span {
          margin: 0 10px;
        }
      }
    }
  }
  .subassembly-left {
    width: 1200px;
    height: 600px;
    // padding: 20px 20px 20px 20px;
    position: relative;
    color: @main-font-color;
    font-size: 20px;
    .date-time {
      position: absolute;
      top: 20px;
      left: 20px;
      z-index: 10;
      li {
        display: flex;
      }
    }
  }
  .subassembly-right {
    width: 345px;
    height: 742px;
    padding: 10px;
    box-shadow: inset 0px 0px 5px 3px rgba(3, 53, 182, 0.4);
    border: 1px solid @content-border-color;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      li {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 5px 0;
        p {
          font-size: 20px;
          font-weight: 600;
          padding-top: 10px;
        }
        .log-content {
          width: 100%;
          height: 100%;
          .log-manage {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px 0;
            span {
              display: block;
              width: 100px;
              text-align: right;
              margin-right: 10px;
            }
            dl {
              display: flex;
              align-items: center;
              padding: 0 5px;
              dt {
                width: 40px;
                text-align: right;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-right: 5px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
