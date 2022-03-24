<template>
  <div class="InorbitColWarn-container">
    <div class="InorbitColWarn-content">
      <div class="InorbitColWarn-section">
        <ul>
          <li>
            <p>产品模板:</p>
            <span>
              <Select v-model="productTemplate" style="width: 200px">
                <Option
                  v-for="item in productTemplateList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </span>
          </li>
          <li>
            <p>定时任务:</p>
            <span>
              <Select v-model="timingTask" style="width: 200px">
                <Option
                  v-for="item in timingTaskList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </span>
          </li>
          <li>
            <p>卫星名称替换文件:</p>
            <span>
              <Input
                disabled
                v-model="satelliteFile"
                placeholder
                style="width: 300px"
              />
            </span>
            <span>
              <Upload
                :action="action"
                :headers="Authorization"
                :data="upload"
                :before-upload="beforeUpload"
                :on-success="handleSuccess"
              >
                <share-btn title="导入" />
              </Upload>
            </span>
          </li>
          <li>
            <p></p>
            <span>目标集及服务对象:</span>
            <span>
              <share-btn
                title="添加"
                callBackName="add-event"
                @add-event="addEvent(data.length)"
              />
            </span>
          </li>
          <li>
            <p></p>
            <span>
              <share-btn
                title="重置"
                callBackName="reset-event"
                @reset-event="resetevent"
              />
              <div style="width: 20px"></div>
              <share-btn
                title="配置"
                callBackName="configuration-event"
                @configuration-event="configurationevent"
              />
            </span>
          </li>
        </ul>
        <my-table
          border
          ref="selection"
          width="1560"
          height="500"
          :columns="columns"
          :data="data"
          disabled-hover
        />
        <div class="pie-tb-footer">
          <page
            :total="total"
            :pageSize="pageSize"
            :current="pageNum"
            @pageChange="changePage"
            @pageSizeChange="handlePageSizeChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import baseUrl from "@/config/base-url";
import storage from "store";
import { ACCESS_TOKEN_SYSTEM } from "@/store/mutations.js";
import myTable from "@/components/table/my-table.vue";
import page from "@/components/page/page.vue";
export default {
  components: {
    myTable,
    page,
  },
  data() {
    return {
      total: 0,
      pageSize: 10,
      pageNum: 1,
      productTemplate: "", //产品模板
      productTemplateList: [
        {
          id: 0,
          name: "模板1",
        },
      ],
      forecastPeriodList: [
        {
          id: 3,
          name: "三天以内",
        },
        {
          id: 4,
          name: "四天以内",
        },
        {
          id: 5,
          name: "五天以内",
        },
        {
          id: 6,
          name: "六天以内",
        },
        {
          id: 7,
          name: "七天以内",
        },
      ],
      columns: [
        {
          title: "序号",
          type: "index",
          width: 65,
          align: "center",
        },
        {
          title: "服务对象",
          key: "subTime",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h(
              "Select",
              {
                props: {
                  value: params.row.enterpriseId,
                  // 如果不是新建窗口就禁用
                  disabled: params.row.id != undefined ? true : false,
                },
                style: {},
                on: {
                  "on-change": (event) => {
                    this.data[params.index].enterpriseId = event;
                  },
                },
              },
              this.organDataList.map((item) => {
                return h("Option", {
                  props: {
                    value: item.id,
                    label: item.name,
                  },
                });
              })
            );
          },
        },
        {
          title: "低轨交会距离阈值",
          key: "lowOrbitIntersectionDisatance",
          width: 150,
          align: "center",
          render: (h, params) => {
            return [
              h("InputNumber", {
                props: {
                  min: "0",
                },
                style: {
                  width: "63px",
                },
                on: {
                  // "on-change": (event) => {
                  //   this.data[params.index].enterpriseId = event;
                  // },
                },
              }),
              h("div", (params.row.lowOrbitIntersectionDisatance = "（KM）")),
            ];
          },
        },
        {
          title: "高轨交会距离阈值",
          key: "higherOrbitIntersectionDisatance",
          width: 150,
          align: "center",
          render: (h, params) => {
            return [
              h("InputNumber", {
                props: {
                  min: "0",
                },
                style: {
                  width: "63px",
                },
                on: {
                  // "on-change": (event) => {
                  //   this.data[params.index].enterpriseId = event;
                  // },
                },
              }),
              h(
                "div",
                (params.row.higherOrbitIntersectionDisatance = "（KM）")
              ),
            ];
          },
        },

        {
          title: "低轨碰撞概率阈值",
          key: "lowOrbitImpactProbability",
          width: 150,
          align: "center",
          render: (h, params) => {
            return [
              h(
                "div",
                {
                  style: {
                    paddingRight: "5px",
                  },
                },
                (params.row.higherOrbitImpactProbability = "1E -")
              ),
              h("InputNumber", {
                props: {
                  min: "0",
                },
                style: {
                  width: "63px",
                },
                on: {
                  // "on-change": (event) => {
                  //   this.data[params.index].enterpriseId = event;
                  // },
                },
              }),
            ];
          },
        },

        {
          title: "高轨碰撞概率阈值",
          key: "higherOrbitImpactProbability",
          width: 150,
          align: "center",
          render: (h, params) => {
            return [
              h(
                "div",
                {
                  style: {
                    paddingRight: "5px",
                  },
                },
                (params.row.higherOrbitImpactProbability = "1E -")
              ),
              h("InputNumber", {
                props: {
                  min: "0",
                },
                style: {
                  width: "63px",
                },
                on: {
                  // "on-change": (event) => {
                  //   this.data[params.index].enterpriseId = event;
                  // },
                },
              }),
            ];
          },
        },

        {
          title: "低轨预报期",
          key: "lowOrbitForecastPeriod",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h(
              "Select",
              {
                props: {
                  // value: params.row.enterpriseId,
                  // // 如果不是新建窗口就禁用
                  // disabled: params.row.id != undefined ? true : false,
                },
                style: {},
                on: {
                  // "on-change": (event) => {
                  //   this.data[params.index].enterpriseId = event;
                  // },
                },
              },
              this.forecastPeriodList.map((item) => {
                return h("Option", {
                  props: {
                    value: item.id,
                    label: item.name,
                  },
                });
              })
            );
          },
        },

        {
          title: "高轨预报期",
          key: "higherOrbitForecastPeriod",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h(
              "Select",
              {
                props: {
                  // value: params.row.enterpriseId,
                  // // 如果不是新建窗口就禁用
                  // disabled: params.row.id != undefined ? true : false,
                },
                style: {},
                on: {
                  // "on-change": (event) => {
                  //   this.data[params.index].enterpriseId = event;
                  // },
                },
              },
              this.forecastPeriodList.map((item) => {
                return h("Option", {
                  props: {
                    value: item.id,
                    label: item.name,
                  },
                });
              })
            );
          },
        },

        {
          title: "目标编号",
          key: "sId",
          tooltip: true,
          ellipsis: true,
          align: "center",
        },
        {
          title: "操作",
          width: 200,
          key: "operation",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                },
              },
              [
                h(
                  "Upload",
                  {
                    props: {
                      action: this.action, //上传地址
                      data: this.upload,
                      headers: {
                        Authorization: storage.get(ACCESS_TOKEN_SYSTEM),
                      },
                      "before-upload": (file) => {
                        this.upload.multipartFile = file;
                      }, //上传之前
                      "on-success": (res, file) => {
                        this.data[params.index].sId = res.data;
                        this.data[params.index].sIdStatus = true;
                      }, //上传成功之后
                    },
                  },
                  [
                    h(
                      "Button",
                      {
                        // props: {},
                        style: {
                          color: "rgb(52, 140, 241)",
                        },
                        // on: {
                        //   click: () => {},
                        // },
                      },
                      "上传文件"
                    ),
                  ]
                ),
                h(
                  "Button",
                  {
                    props: {},
                    style: {
                      color: "rgb(241, 10, 10)",
                    },
                    on: {
                      click: () => {
                        if (params.row.id != undefined) {
                          this.dataId = params.row.id;
                          this.getDeleteConfigure();
                        } else {
                          console.log(params.index);
                        }
                      },
                    },
                  },
                  "删除"
                ),
              ]
            );
          },
        },
      ],
      data: [],
      organDataList: [],
      dataId: "", //id
      timingTaskList: [],
      timingTask: "", //定时任务
      timingTaskStatus: false,
      satelliteFile: "", //卫星文件
      satelliteFileStatus: false,
      action: baseUrl.uploadFile, //上传地址
      upload: {
        multipartFile: {},
      }, //请求头传参
      Authorization: {
        Authorization: storage.get(ACCESS_TOKEN_SYSTEM),
      }, //设置token
    };
  },
  created() {
    this.getTimingTask();
    this.getConfigure();
    this.getQuerySelective();
  },
  methods: {
    // 页数
    changePage(num) {
      this.pageNum = num;
    },
    // 条数
    handlePageSizeChange(size) {
      this.pageSize = size;
    },
    // 定时任务数据列表
    getTimingTask() {
      for (let i = 0; i <= 23; i++) {
        let obj = {
          value: i,
          label: i + ":00 (点)",
        };
        this.timingTaskList.push(obj);
      }
    },
    // 添加
    addEvent(len) {
      let obj = {
        id: undefined,
        sId: undefined,
        sIdList: undefined,
        sIdStatus: false,
        enterpriseId: undefined,
        enterpriseName: undefined,
        startNameFilePath: undefined,
        subTime: undefined,
      };
      if (this.data.length == 0) {
        this.data.push(obj);
      } else {
        if (this.data[0].sId != undefined) {
          this.data.unshift(obj);
        } else {
          this.$Notice.warning({
            title: "添加项以存在。。。",
            top: 50,
            duration: 5,
          });
        }
      }
    },
    // 获取机构数据列表
    getQuerySelective() {
      this.$api.userManage.querySelective().then((res) => {
        if (res.success == true) {
          this.organDataList = res.data.dataList;
        }
      });
    },
    // 获取数据列表
    getConfigure() {
      this.$api.advanced.Configure().then((res) => {
        if (res.success == true) {
          this.data = res.data;
          this.timingTask = this.data[0].subTime;
          this.satelliteFile = this.data[0].startNameFilePath;
        }
      });
    },
    // 删除数据列表
    getDeleteConfigure() {
      let params = {
        id: this.dataId,
      };
      this.$api.advanced.deleteConfigure(params).then((res) => {
        if (res.success == true) {
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
          this.resetevent();
        }
      });
    },
    // 上传之前
    beforeUpload(file) {
      this.upload.multipartFile = file;
    },
    // 上传成功之后
    handleSuccess(res, file) {
      this.satelliteFile = res.data;
      if (this.data[0].startNameFilePath == this.satelliteFile) {
        this.satelliteFileStatus = false;
      } else {
        this.satelliteFileStatus = true;
      }
    },
    // 配置事件
    configurationevent() {
      if (this.data[0].subTime == this.timingTask) {
        this.timingTaskStatus = false;
      } else {
        this.timingTaskStatus = true;
      }
      let params = {
        orbitInfoList: this.data,
        startNameFilePath: this.satelliteFile,
        startNameFilePathStatus: this.satelliteFileStatus,
        subTime: this.timingTask,
        subTimeStatus: this.timingTaskStatus,
      };
      this.$api.advanced.OrbitcCollision(params).then((res) => {
        this.$Notice.success({
          title: res.message,
          top: 50,
          duration: 5,
        });
        this.resetevent();
      });
    },
    // 重置事件
    resetevent() {
      this.getConfigure();
      this.satelliteFileStatus = false;
      this.timingTaskStatus = false;
    },
  },
};
</script>

<style lang="less" scoped>
.InorbitColWarn-content {
  padding: @table-padding;
  font-size: @lable-font-size;
  color: @main-font-color;
  .InorbitColWarn-section {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 10px 0;
      li {
        display: flex;
        align-items: center;
        padding: 10px 30px;
        span {
          display: flex;
          margin-left: @table-padding;
        }
      }
    }
  }
}
.group-drag-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 1001;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
}
/deep/.ivu-upload-list {
  display: none !important;
}
/deep/.ivu-table-cell {
  display: flex !important;
  align-items: center;
}
</style>
