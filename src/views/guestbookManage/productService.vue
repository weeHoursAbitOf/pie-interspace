<template>
  <!-- 产品服务 -->
  <div class="pie-tb-content">
    <pie-card>
      <!-- 筛选条件 -->
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-content">
            <div class="tb-header-item">
              <span>站内搜索</span>
              <Input v-model="selectType" class="input">
                <Select v-model="select" slot="prepend">
                  <Option
                    v-for="item in selectList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </Input>
              <search-btn class="search-btn"></search-btn>
            </div>
            <div class="btn-content">
              <export-btn title="导出" @click="exportExcel()" class="right-btn-item"></export-btn>
              <batch-delete-btn class="right-btn-item"></batch-delete-btn>
              <new-btn title="加入" class="right-btn-item"></new-btn>
            </div>
          </div>
        </div>
      </div>
      <!-- 表体 -->
      <div slot="iscontent">
        <div class="pie-tb-iscontent">
          <my-table
            border
            ref="selection"
            :columns="list"
            :data="data"
            @on-selection-change="multiSelect"
            :lookItem="lookItem"
            :lookIObject="lookData"
            disabled-hover
            max-height="500"
            :lookBtn="true"
            :updateBtn="true"
            :delBtn="true"
            :issueBtn="true"
            @look="look"
            @update="update"
            @confirmDelete="confirmDelete"
            @confirmIssue="confirmIssue"
          ></my-table>
        </div>
      </div>
      <!-- 分页 -->
      <div slot="footer">
        <div class="pie-tb-footer">
          <page :total="pageTotal" :pageSize="pageSize" :current="pageNum"></page>
        </div>
      </div>
    </pie-card>
    <!-- 修改弹出框 -->
    <my-modal
      width="30"
      height="60"
      v-model="isModal"
      @cancel="cancel"
      title="修改"
      :resetBtn="false"
      @confirm="confirm"
    >
      <div slot="operateItem">
        <div class="modal-content-items">
          <div slot="iscontent">
            <div class="tb-header-content">
              <div class="tb-header-item">
                <span class="text">标题</span>
                <Input v-model="title" class="input-style" clearable />
              </div>
              <div class="tb-header-item">
                <span class="text">内容</span>
                <Input v-model="content" type="textarea" :rows="4" class="input-style" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </my-modal>
  </div>
</template>
<script>
import pieCard from "@/components/pie-card/pie-card.vue";
import batchDeleteBtn from "@/components/button/batch-delete-btn.vue";
import exportBtn from "@/components/button/export-btn.vue";
import searchBtn from "@/components/button/search-btn.vue";
import newBtn from "@/components/button/new-btn.vue";
//import deleteBtn from '@/components/button/delete-btn.vue';
import page from "@/components/page/page.vue";
import myTable from "@/components/table/my-table.vue";
export default {
  components: {
    pieCard,
    batchDeleteBtn,
    exportBtn,
    searchBtn,
    newBtn,
    //deleteBtn,
    page,
    myTable
  },
  data() {
    return {
      pageTotal: 10, //数据总数
      pageNum: 1, //初始页
      pageSize: 10, //每页条数
      selectType: "",
      select: "",
      title: "",
      publishTime: "",
      content: "",
      selectList: [
        {
          label: "标题",
          value: "title"
        },
        {
          label: "内容",
          value: "content"
        },
        {
          label: "发布时间",
          value: "publishTime"
        },
      ],
      list: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "序号",
          width: 70,
          key: "number",
          align: "center",
        },
        {
          title: "标题",
          key: "title",
          align: "center",
        },
        {
          title: "发布时间",
          key: "publishTime",
          align: "center",
          ellipsis: true,
          sortable: true,
        },
        {
          title: "内容",
          key: "content",
          align: "center",
          ellipsis: true,
        },
        {
          title: '操作',
          slot: 'action',
          width: 300,
          align: 'center'
        },
      ],
      data: [
        {
          number: 1,
          title: "xxx问题",
          publishTime: "2016-10-03",
          content: "这是关于xxx问题的内容",
        },
        {
          number: 2,
          title: "xxx问题",
          publishTime: "2016-10-03",
          content: "这是关于xxx问题的内容",
        },
        {
          number: 3,
          title: "xxx问题",
          publishTime: "2016-10-03",
          content: "这是关于xxx问题的内容",
        },
        {
          number: 4,
          title: "xxx问题",
          publishTime: "2016-10-03",
          content: "这是关于xxx问题的内容",
        },
        {
          number: 5,
          title: "xxx问题",
          publishTime: "2016-10-03",
          content: "这是关于xxx问题的内容",
        },
        {
          number: 6,
          title: "xxx问题",
          publishTime: "2016-10-03",
          content: "这是关于xxx问题的内容",
        },
        {
          number: 7,
          title: "xxx问题",
          publishTime: "2016-10-03",
          content: "这是关于xxx问题的内容",
        },
      ],
      lookItem: [ //查看表单
        { title: "标题", key: "title" },
        { title: "发布时间", key: "publishTime" },
        { title: "内容", key: "content" },
      ],
      lookData: {},
      isModal: false,
      title: "", //标题
      content: "", //内容
    };
  },
  methods: {
    // 导出按钮方法
    exportExcel() {
      if (this.selectRow.length == 0) {
        this.$Notice.warning({
          title: "导出数据不能为空",
          top: 50,
          duration: 5,
        });
        return;
      }
      this.selectRow.map(item => {
        return item;
      })
      this.$refs.selection.$refs.tables.exportCsv({
        filename: "群组数据导出",
        separator: ",",
        columns:
          this.list.filter((col, index) => index > 0 && index < 7),
        data: this.selectRow
      });
    },
    //多选
    multiSelect(selection) {
      this.selectRow = selection;
    },
    //查看
    look(row) {
      this.lookData = row;
      this.$refs.selection.lookOver()
    },
    //修改
    update(row) {
      this.isModal = true;
      this.title = row.title;
      this.content = row.content;
    },
    //弹出框 确定
    confirm() {
      this.isModal = false
    },
    //弹出框 取消
    cancel() {
      this.isModal = false
    },
    //删除
    confirmDelete(row) {
      console.log(row);
    },
    //发布
    confirmIssue(row) {
    }
  },
};
</script>
<style lang="less" scoped>
.pie-tb-header {
  display: flex;
  justify-content: space-between;
  font-size: @lable-font-size;
  flex-wrap: wrap;

  .tb-header-content {
    display: flex;
    width: 100%;
    justify-content: inherit;
  }
  .tb-header-item {
    display: flex;
    align-items: center;
    white-space: nowrap;
    flex-direction: row;
    flex-wrap: nowrap;
    margin-right: @table-input-space;
    color: @lable-font-color;

    .search-btn {
      margin-left: @search-lable-space;
    }

    .input {
      width: 400px;
    }

    span {
      margin-right: @table-lable-space;
    }
  }

  .btn-content {
    display: flex;

    .right-btn-item {
      margin-left: @table-btn-space;
    }
  }
}

.pie-tb-iscontent {
  max-width: 100%;

  .tb-style {
    max-width: 100%;
  }
}
//弹出框样式
.modal-content-items {
  .tb-header-content {
    display: flex;
    font-size: @lable-font-size;
    flex-wrap: wrap;
    justify-content: center;

    .tb-header-item {
      display: flex;
      align-items: center;
      white-space: nowrap;
      flex-direction: row;
      flex-wrap: nowrap;
      color: @lable-font-color;
      margin-bottom: 20px;

      .input-style {
        margin-left: @table-lable-space;
        width: 315px;
        position: relative;
      }

      span {
        width: 80px;
        text-align: right;
      }
    }
  }
}
</style>