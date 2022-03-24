<template>
  <div class="pie-tb-content">
    <pie-card>
      <div class="create-template" slot="header">
        <span class="create-btn" @click="additionTemplate"></span>
          <span class="iconfont icon-jia"></span> 创建模板
        </span>
      </div>
      <div slot="iscontent">
        <template v-for="item in dataList">
          <list-item
            @lookOver="lookOver"
            @update="update"
            @deleteOperation="deleteOperation"
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
    <my-dialog @confirm="confirmDelete" @cancel="cancelDelete" :isModal="isDelete"></my-dialog>
    <!-- 增加、修改模板弹出框 -->
    <my-modal
      width="30"
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
                <span class="text-width">版本号</span>
                <Input v-model="version" placeholder="请输入版本号" class="input-style" />
              </div>
              <div class="tb-header-item">
                <span class="text-width">模板名称</span>
                <Input v-model="templateName" placeholder="请输入模板名称" class="input-style" />
              </div>
              <div class="tb-header-item">
                <span class="text-width">模板格式</span>
                <Input v-model="format" placeholder="请输入模板格式" class="input-style" />
              </div>
              <div class="tb-header-item">
                <span class="text-width">适用范围</span>
                <Input v-model="applyRange" placeholder="请输入适用范围" class="input-style" />
              </div>
              <div class="tb-header-item">
                <span>上传缩略图</span>
                <div class="tb-header-item-content">
                  <Input
                    v-model="imagePath"
                    placeholder="//jsonplaceholder.typicode.com/posts/"
                    class="input-style"
                    clearable
                  />
                  <Upload
                    :action="action"
                    :headers="Authorization"
                    :data="upload"
                    :before-upload="beforeUpload"
                    :on-success="handleSuccess"
                  >
                    <Button icon="ios-cloud-upload-outline">选择文件</Button>
                  </Upload>
                </div>
              </div>
              <div class="tb-header-item">
                <span class="text-width">上传文件</span>
                <div class="tb-header-item-content">
                  <Input
                    v-model="filePath"
                    placeholder="//jsonplaceholder.typicode.com/posts/"
                    class="input-style"
                    clearable
                  />
                  <Upload
                    :action="actionElse"
                    :headers="Authorization"
                    :data="uploadElse"
                    :before-upload="beforeUploadElse"
                    :on-success="handleSuccessElse"
                  >
                    <Button icon="ios-cloud-upload-outline">选择文件</Button>
                  </Upload>
                </div>
              </div>
              <div class="tb-header-item">
                <span class="text-width">模板介绍</span>
                <Input
                  v-model="templateIntroduce"
                  type="textarea"
                  :autosize="{ minRows: 10, maxRows: 10 }"
                  placeholder="请输入模板介绍"
                  class="input-style"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </my-modal>
  </div>
</template>
<script>
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
      templateName: "", //模板名称
      applyRange: "", //适用范围
      templateIntroduce: "", //模板介绍
      version: "", //版本号
      format: "", //版本格式
      dataList: [
        // {
        //   id: 1,
        //   name: "模板1",
        //   productType: 1,
        //   scope: "似懂非懂fdsfdsfdsfds",
        //   createTime: "2021-05-27T12:56:10.231Z",
        //   description: "sdfd第三方sfdsfdsffdsf",
        //   thumbnail:
        //     "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fd.ifengimg.com%2Fq100%2Fimg1.ugc.ifeng.com%2Fnewugc%2F20200224%2F15%2Fwemedia%2F2513ec617b462970e6fad0708b2f5219d8cdbf82_size34_w1185_h675.jpg&refer=http%3A%2F%2Fd.ifengimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625213029&t=95ffbb476907cfb274d0f02d61b48e22",
        //   templateFieldList: [
        //     {
        //       name: "parterl",
        //       type: "INTEGER",
        //       selected: true,
        //     },
        //     {
        //       name: "init_callback",
        //       type: "CHASD_SADHG",
        //       selected: true,
        //     },
        //   ],
        // },
        // {
        //   id: 2,
        //   name: "模板2",
        //   productType: 1,
        //   scope: "啊实打实大大撒旦",
        //   createTime: "2021-12-12T19:23:01.231Z",
        //   description: "sdfdsfd撒旦发射点fdsffdsf",
        //   thumbnail:
        //     "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fd.ifengimg.com%2Fq100%2Fimg1.ugc.ifeng.com%2Fnewugc%2F20200224%2F15%2Fwemedia%2F2513ec617b462970e6fad0708b2f5219d8cdbf82_size34_w1185_h675.jpg&refer=http%3A%2F%2Fd.ifengimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625213029&t=95ffbb476907cfb274d0f02d61b48e22",
        //   templateFieldList: [
        //     {
        //       name: "parterl",
        //       type: "INTEGER",
        //     },
        //   ],
        // },
        // {
        //   id: 3,
        //   name: "模板3",
        //   productType: 1,
        //   scope: "fds大师傅大师傅fdsf",
        //   createTime: "2021-11-03T10:10:02.231Z",
        //   description: "sdfdsfd定时定时sfdsffdsf",
        //   thumbnail:
        //     "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fd.ifengimg.com%2Fq100%2Fimg1.ugc.ifeng.com%2Fnewugc%2F20200224%2F15%2Fwemedia%2F2513ec617b462970e6fad0708b2f5219d8cdbf82_size34_w1185_h675.jpg&refer=http%3A%2F%2Fd.ifengimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625213029&t=95ffbb476907cfb274d0f02d61b48e22",
        //   templateFieldList: [
        //     {
        //       name: "auto",
        //       type: "DSFSABH SADDF",
        //       selected: true,
        //     },
        //   ],
        // },
      ],
      isModal: false,
      isDelete: false,
      modalTitle: "新建",
      addOrUpdate: 0,
      fkProductItemId: "warning",
      Authorization: {
        Authorization: "",
      },
      upload: { upLoadImg: "" },
      uploadElse: { multipartFile: "" },
      filePath: "",
      imagePath: "",
      pk_id: "",
      action: baseUrl.upload,
      actionElse: baseUrl.uploadFile,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    //图片上传之前
    beforeUpload(file) {
      this.upload.upLoadImg = file;
    },
    //图片上传成功之后
    handleSuccess(res, file) {
      this.imagePath = res.data;
    },
    //文件上传之前
    beforeUploadElse(file) {
      this.uploadElse.multipartFile = file;
    },
    //文件上传成功之后
    handleSuccessElse(res, file) {
      this.filePath = res.data;
    },
    //查看弹出框
    lookOver() { },
    //修改弹出框
    update(item) {
      this.pk_id = item.pk_id;
      this.templateName = item.name;
      this.version = item.version;
      this.format = item.format;
      this.applyRange = item.use_scope;
      this.filePath = item.store_path;
      this.imagePath = item.image_path;
      this.templateIntroduce = item.description;
      this.isModal = true;
      this.modalTitle = "修改模板";
      this.addOrUpdate = 1;
    },
    cancel() {
      this.isModal = false;
    },
    //获取模板数据
    getData() {
      let params = {
        fkProductItemId: this.fkProductItemId,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api.templateManage.getTemplate(params).then((res) => {
        if (res.code == 0) {
          this.dataList = res.data.data;
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
    //创建模板
    additionTemplate() {
      this.templateName = "";
      this.version = "";
      this.format = "";
      this.applyRange = "";
      this.templateIntroduce = "";
      this.filePath = "";
      this.imagePath = "";
      this.isModal = true;
      this.modalTitle = "创建模板";
      this.addOrUpdate = 0;
    },
    //添加模板
    addTemplate() {
      if (this.addOrUpdate == 0) {
        let params = {
          creatorId: "",
          description: "",
          fkProductItemId: this.fkProductItemId,
          format: this.format,
          imagePath: this.imagePath,
          isUse: "",
          name: this.templateName,
          storePath: this.filePath,
          useScope: this.applyRange,
          version: this.version,
        };
        this.$api.templateManage.addTemplate(params).then((res) => {
          if (res.code == 0) {
            this.isModal = false;
            this.$Notice.success({
              title: res.message,
              top: 50,
              duration: 5,
            });
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
        let params = {
          pkId: this.pk_id,
          fkProductItemId: this.fkProductItemId,
          version: this.version,
          isUse: "",
          creatorId: "",
          description: this.templateIntroduce,
          name: this.templateName,
          format: this.format,
          useScope: this.applyRange,
          file: this.filePath,
          image: this.imagePath,
        };
        this.$api.templateManage.updateTemplate(params).then((res) => {
          if (res.code == 0) {
            this.isModal = false;
            this.$Notice.success({
              title: res.message,
              top: 50,
              duration: 5,
            });
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
    //取消删除
    cancelDelete() {
      this.isDelete = false;
    },
    //删除操作
    deleteOperation(item) {
      this.isDelete = true;
      this.pk_id = item.pk_id;
    },
    //确认删除
    confirmDelete() {
      let params = {
        fkId: this.fkProductItemId,
      };
      this.$api.templateManage
        .deleteTemplate(this.pk_id, params)
        .then((res) => {
          if (res.code == 0) {
            this.isDelete = false;
            this.$Notice.success({
              title: res.message,
              top: 50,
              duration: 5,
            });
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
      width: 80px;
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
  display: flex;
}
/deep/ .ivu-upload-list-file {
  display: none;
}
</style>