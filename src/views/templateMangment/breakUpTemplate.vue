<template>
  <div class="pie-tb-content">
    <pie-card>
      <div class="create-template" slot="header">
        <share-btn
          title="创建模板"
          :iconShow="true"
          iconType="ios-add"
          callBackName="additionTemplate"
          @additionTemplate="additionTemplate"
        />
      </div>
      <div slot="iscontent">
        <template v-for="item in dataList">
          <list-item
            @lookOver="lookOver"
            @update="update"
            @deleteOperation="deleteOperation"
            :columns="columns"
            :listItem="item"
            :key="item.id"
          ></list-item>
        </template>
      </div>
      <div slot="footer">
        <div class="pie-tb-footer">
          <page
            :total="total"
            :pageSize="pageSize"
            :current="pageNum"
            @pageChange="changePage"
            @pageSizeChange="handlePageSizeChange"
          ></page>
        </div>
      </div>
    </pie-card>
    <my-dialog
      @confirm="confirmDelete"
      @cancel="cancelDelete"
      :isModal="isDelete"
    ></my-dialog>
    <!-- 增加、修改模板弹出框 -->
    <my-modal
      width="40"
      height="60"
      v-model="isModal"
      @cancel="cancel"
      :title="modalTitle"
      :resetBtn="false"
      @confirm="addTemplate"
    >
      <div slot="operateItem">
        <div class="modal-content-items">
          <div slot="iscontent">
            <div class="tb-header-content">
              <div class="tb-header-item">
                <span class="text-width">模板名称</span>
                <Input
                  v-model="templateName"
                  placeholder="请输入模板名称"
                  class="input-style"
                  style="width: 300px"
                />
              </div>
              <!-- <div class="tb-header-item">
                <span class="text-width">创建时间</span>
                <DatePicker
                  type="date"
                  v-model="createTime"
                  placeholder="请选择创建时间"
                  class="input-style"
                  style="width: 300px"
                  @on-change="onCreateChange"
                ></DatePicker>
              </div>-->
              <div class="tb-header-item">
                <span>上传图标</span>
                <div class="tb-header-item-content">
                  <Upload
                    :action="action"
                    :headers="Authorization"
                    :data="upload"
                    :before-upload="beforeUpload"
                    :on-success="handleSuccess"
                  >
                    <img class="image" v-if="imagePath" :src="imagePath" alt />
                    <span v-else class="plus">+</span>
                  </Upload>
                </div>
              </div>
              <div class="tb-header-item">
                <span class="text-width">适用范围</span>
                <Input
                  v-model="applyRange"
                  type="textarea"
                  :rows="3"
                  placeholder="请输入适用范围"
                  class="input-style"
                />
              </div>
              <div class="tb-header-item">
                <span class="text-width">模板介绍</span>
                <Input
                  v-model="templateIntroduce"
                  class="input-style"
                  type="textarea"
                  :rows="5"
                  placeholder="请输入模板介绍"
                />
              </div>
              <div class="table-content">
                <span class="table-text">选择生成字段</span>
                <Table
                  border
                  ref="selection"
                  max-height="300"
                  :disabled-hover="true"
                  :highlight-row="true"
                  :columns="columns"
                  :data="fieldDataList"
                  :row-class-name="rowClassName"
                  @on-selection-change="multiSelect"
                ></Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </my-modal>
  </div>
</template>
<script>
import storage from "store";
import { ACCESS_TOKEN_SYSTEM } from "@/store/mutations.js";
import listItem from "@/components/templateMangment/list-item.vue";
import myModal from "@/components/modals/modal.vue";
import page from "@/components/page/page.vue";
import baseUrl from "@/config/base-url";
export default {
  components: {
    listItem,
    myModal,
    page,
  },
  data() {
    return {
      total: 10, //数据总数
      pageNum: 1, //初始页
      pageSize: 10, //每页条数
      version: "", //版本号
      format: "", //版本格式
      dataList: [
        {
          id: 1,
          name: "解体事件分析",
          productType: 1,
          scope: "解体事件分析",
          createTime: "2021-05-27T12:56:10.231Z",
          description: "解体事件分析",
          thumbnail: require("../../assets/home/breakup.svg"),
          templateFieldList: [
            {
              name: "ID",
              type: "NUMBER(12)",
              content: "唯一标识",
              comment: "主键",
              selected: false,
            },
            {
              name: "CAT_ID",
              type: "NUMBER(10)",
              content: "TIE编号",
              comment: "",
              selected: true,
            },
            {
              name: "NORM_ID",
              type: "NUMBER(11)",
              content: "自主编号",
              comment: "",
              selected: false,
            },
          ],
        },
        {
          id: 2,
          name: "发射碰撞预警",
          productType: 1,
          scope: "发射碰撞预警",
          createTime: "2021-12-12T19:23:01.231Z",
          description: "发射碰撞预警",
          thumbnail: require("../../assets/home/breakup.svg"),
          templateFieldList: [
            {
              name: "NORM_ID",
              type: "NUMBER(11)",
              content: "自主编号",
              comment: "",
              selected: false,
            },
          ],
        },
        {
          id: 3,
          name: "陨落事件分析",
          productType: 1,
          scope: "陨落事件分析",
          createTime: "2021-11-03T10:10:02.231Z",
          description: "陨落事件分析",
          thumbnail: require("../../assets/home/breakup.svg"),
          templateFieldList: [
            {
              name: "ID",
              type: "NUMBER(12)",
              content: "唯一标识",
              comment: "主键",
              selected: false,
            },
          ],
        },
      ],
      isModal: false,
      isDelete: false,
      modalTitle: "新建",
      addOrUpdate: 0,
      fkProductItemId: "track",
      filePath: "",
      imagePath: "",
      pk_id: "",
      uploadElse: { multipartFile: "" },
      actionElse: baseUrl.uploadFile,
      columns: [
        {
          title: "序号",
          type: "index",
          width: "80",
          align: "center",
        },
        {
          title: "字段名称",
          key: "name",
          align: "center",
        },
        {
          title: "字段类型",
          width: "200",
          key: "type",
          align: "center",
        },
        {
          title: "字段含义",
          key: "content",
          align: "center",
        },
        {
          title: "描述",
          key: "comment",
          align: "center",
        },
        {
          type: "selection",
          align: "center",
          width: "80",
        },
      ],
      fieldDataList: [
        {
          name: "ID",
          type: "NUMBER(12)",
          content: "唯一标识",
          comment: "主键",
          selected: false,
        },
        {
          name: "CAT_ID",
          type: "NUMBER(10)",
          content: "TIE编号",
          comment: "",
          selected: true,
        },
        {
          name: "NORM_ID",
          type: "NUMBER(11)",
          content: "自主编号",
          comment: "",
          selected: false,
        },
        {
          name: "IBJECT_ID",
          type: "NUMBER(03)",
          content: "TLE名称",
          comment: "",
          selected: true,
        },
      ],
      selectDataList: [],
      productDataList: [
        {
          label: "2",
          value: "TLE",
        },
        {
          label: "3",
          value: "ELE",
        },
      ],
      //-----------------------------
      hour: "", //时
      minute: "", //分
      createTime: "", //创建时间
      templateName: "", //模板名称
      applyRange: "", //适用范围
      templateIntroduce: "", //模板介绍
      Authorization: {
        Authorization: storage.get(ACCESS_TOKEN_SYSTEM),
      },
      upload: { upLoadImg: "" },
      action: baseUrl.upload,
      templateType: 6,
      type: "1", //基础产品（1），高级产品（2）
      productType: "",
      isShowTableField: 0,
      iconType: "ios-add",
      templateFieldList: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    //获取模板数据
    getData() {
      // let params = {
      //   type: this.type,
      //   pageIndex: this.pageNum,
      //   pageSize: this.pageSize,
      //   templateType: this.templateType,
      // };
      // this.$api.templateManage.getTemplate(params).then((res) => {
      //   if (res.success == true) {
      //     this.dataList = res.data.rows;
      //     this.total = res.data.total;
      //   } else {
      //
      //   }
      // });
      let params = {
        productId: 19,
        isUse: true,
        pageIndex: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api.commonTemplate.getTemplateList(params).then((res) => {
        if (res.success == true) {
          this.dataList = res.data.templateInfoList;
          this.total = res.data.total;
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    // 默认选中
    rowClassName(row) {
      if (row.selected == true) {
        this.selectDataList = this.$refs.selection.getSelection(row);
      }
    },
    // 请求新建字段数据列表
    getCommonQueryAccess() {
      // 备注：解体目前字段没有
      this.$api.templateManage.breakup().then((res) => {
        if (res.success == true) {
          this.fieldDataList = res.data;
          if (this.addOrUpdate == 0) {
            // 新增如果 字段selected为true的时候，让table默认选中
            this.fieldDataList.forEach((item, index) => {
              if (item.selected) {
                this.$nextTick(() => {
                  // 设置默认选中状态
                  this.$refs.selection.$refs.tbody.objData[
                    index
                  ]._isChecked = true;
                });
              }
            });
          } else {
            // 如果修改的时候，字段存在的默认选中
            for (let i = 0; i < this.fieldDataList.length; i++) {
              this.fieldDataList.forEach((item) => {
                // 判断是否相对
                if (this.templateFieldList[i].number == item.number) {
                  // 如果字段相对就设置选中状态
                  this.$nextTick(() => {
                    this.$refs.selection.$refs.tbody.objData[
                      i
                    ]._isChecked = true;
                  });
                }
              });
            }
          }
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    // 获取table数据
    multiSelect(row) {
      // this.selectDataList = row.map((item) => item.column_name).join();
      this.selectDataList = row;
    },
    // 创建时间
    onCreateChange(date) {
      this.createTime = date;
    },
    //图片上传之前
    beforeUpload(file) {
      // let files = this.$utils.fileImgType(file, 800);
      // this.upload.upLoadImg = this.$utils.checkImageWH(files, 374, 200);
      this.upload.upLoadImg = file;
    },
    //图片上传成功之后
    handleSuccess(res, file) {
      this.imagePath = res.data;
    },
    //创建模板
    additionTemplate() {
      this.isModal = true;
      this.addOrUpdate = 0;
      this.setResetData();
      this.getCommonQueryAccess();
      this.modalTitle = "创建模板";
    },
    //修改弹出框
    update(item) {
      this.isModal = true;
      this.modalTitle = "修改模板";
      this.addOrUpdate = 1;
      this.pk_id = item.id;
      this.templateName = item.name;
      this.createTime = item.createTime;
      this.applyRange = item.scope;
      this.templateIntroduce = item.description;
      this.imagePath = item.thumbnail;
      this.templateFieldList = item.templateFieldList;
      this.getCommonQueryAccess();
    },
    //添加模板//修改模板
    addTemplate() {
      if (!this.checkoutData()) {
        return false;
      }
      // let params = {
      //   id: this.pk_id,
      //   type: this.type,
      //   templateType: this.templateType,
      //   productType: this.productType,
      //   name: this.templateName,
      //   createTime: this.createTime,
      //   description: this.templateIntroduce,
      //   scope: this.applyRange,
      //   thumbnail: this.imagePath,
      //   templateFieldList: this.selectDataList,
      // };
      // if (this.addOrUpdate == 0) {
      //   this.$api.templateManage.addTemplate(params).then((res) => {
      //     if (res.success == true) {
      //
      //       this.isModal = false;
      //       this.setResetData();
      //       this.getData();
      //     } else {
      //
      //     }
      //   });
      // } else {
      //   this.$api.templateManage.updateTemplate(params).then((res) => {
      //     if (res.success == true) {
      //
      //       this.isModal = false;
      //       this.setResetData();
      //       this.getData();
      //     } else {
      //
      //     }
      //   });
      // }
      let params = {
        type: 1,
        productId: 19,
        isUse: true,
        name: this.templateName,
        description: this.templateIntroduce,
        scope: this.applyRange,
        thumbnail: this.imagePath,
        templatePath: this.templatePath, //文件路径
        templateFieldList: this.selectDataList,
      };
      if (this.addOrUpdate == 0) {
        this.$api.commonTemplate.getTemplateAdd(params).then((res) => {
          if (res.success == true) {
            this.$Notice.success({
              title: res.message,
              top: 50,
              duration: 5,
            });
            this.isModal = false;
            this.setResetData();
            this.getData();
          } else {
            this.$Notice.error({
              title: res.message,
              top: 50,
              duration: 5,
            });
          }
        });
      } else {
        this.$api.commonTemplate
          .getTemplateUpdate(this.pk_id, params)
          .then((res) => {
            if (res.success == true) {
              this.$Notice.success({
                title: res.message,
                top: 50,
                duration: 5,
              });
              this.isModal = false;
              this.setResetData();
              this.getData();
            } else {
              this.$Notice.error({
                title: res.message,
                top: 50,
                duration: 5,
              });
            }
          });
      }
    },

    //查看弹出框
    lookOver() {
      this.isShowTableField = this.templateType;
    },
    cancel() {
      this.isModal = false;
      this.setResetData();
    },
    //取消删除
    cancelDelete() {
      this.isDelete = false;
      this.setResetData();
    },
    //删除操作
    deleteOperation(item) {
      this.isDelete = true;
      this.pk_id = item.id;
    },
    //确认删除
    confirmDelete() {
      // let params = {
      //   // fkId: this.fkProductItemId,
      //   id: this.pk_id,
      // };
      // this.$api.templateManage.deleteTemplate(params).then((res) => {
      //   if (res.success == true) {
      //     this.pageNum = 1;
      //
      //     this.isDelete = false;
      //     this.setResetData();
      //     this.getData();
      //   } else {
      //
      //   }
      // });
      this.$api.commonTemplate.getTemplateDelete(this.pk_id).then((res) => {
        if (res.success == true) {
          this.pageNum = 1;
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
          this.isDelete = false;
          this.setResetData();
          this.getData();
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    addModal() {
      this.isModal = false;
      this.setResetData();
    },
    //分页-选择页数
    changePage(e) {
      this.pageNum = e;
      this.getData();
    },
    //分页-改变pageSize
    handlePageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getData();
    },
    checkoutData() {
      if (!this.templateName) {
        this.$Notice.warning({
          title: "请输入模板名称。。。",
          top: 50,
          duration: 5,
        });

        return;
      } else if (!this.imagePath) {
        this.$Notice.warning({
          title: "请上传图标。。。",
          top: 50,
          duration: 5,
        });

        return;
      } else if (!this.applyRange) {
        this.$Notice.warning({
          title: "请输入适用范围。。。",
          top: 50,
          duration: 5,
        });

        return;
      } else if (!this.templateIntroduce) {
        this.$Notice.warning({
          title: "请输入模板介绍。。。",
          top: 50,
          duration: 5,
        });

        return;
      } else if (this.selectDataList.length == 0) {
        this.$Notice.warning({
          title: "请选择导出字段。。。",
          top: 50,
          duration: 5,
        });

        return;
      } else {
        return true;
      }
    },
    setResetData() {
      this.createTime = "";
      this.templateName = "";
      this.applyRange = "";
      this.templateIntroduce = "";
      // this.fieldDataList = [];
      this.imagePath = "";
    },
  },
};
</script>
<style lang="less" scoped>
@import url("template.less");
.tb-header-content {
  font-size: @lable-font-size;

  .tb-header-item {
    display: flex;
    align-items: center;
    white-space: nowrap;
    flex-direction: row;
    flex-wrap: nowrap;
    margin-right: @table-input-space;
    color: @lable-font-color;
    margin-bottom: 20px;

    .input-style {
      margin-left: @table-lable-space;
      // width: 280px;
    }

    .ivu-btn {
      border: 1px solid #1d3870;
      height: 0.1875rem;
      margin-left: 31px;
      color: #98dcff;
    }
    .text-width {
      // width: 80px;
      text-align: end;
    }
    .ivu-input-wrapper {
      width: 77%;
    }
  }
}

.tb-header-item:last-child {
  align-items: end;
}
/deep/.pie-card-content {
  height: 595px;
  max-height: 595px;
  overflow: auto;
}
.pie-tb-footer {
  border-top: 1px solid @th-border-color;
  padding-top: @table-padding;
}
.tb-header-item-content {
  width: 150px;
  height: 150px;
  position: relative;
  border: 2px solid #03347a;
  margin-left: 30px;
  .image {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .plus {
    width: 100%;
    height: 100%;
    display: block;
    font-size: 30px;
    text-align: center;
    line-height: 150px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
}
/deep/ .ivu-upload-list-file {
  display: none;
}
.table-content {
  padding-bottom: 20px;
  .table-text {
    margin-bottom: 10px;
  }
}
.table-text {
  display: block;
  color: @lable-font-color;
}
.icon-ios-redo {
  margin: 0 10px;
  font-size: 20px;
}
.select-content {
  margin-left: 20px;
  display: flex;
  align-items: center;
  p {
    margin: 0 10px;
  }
}
/deep/.ivu-time-picker-cells {
  min-width: 0rem !important;
}
.select-left {
  width: 80px;
  /deep/.ivu-time-picker-cells {
    div:nth-child(2) {
      display: none !important;
    }
  }
}
.select-right {
  width: 80px;
  /deep/.ivu-time-picker-cells {
    div:nth-child(1) {
      display: none !important;
    }
    div:nth-child(2) {
      border: none !important;
    }
  }
}
.create-template {
  padding-bottom: 0 !important;
}
</style>
