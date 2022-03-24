<template>
  <div class="template-item">
    <div class="header">
      <div class="header-title">{{ title }}</div>
      <div class="operate-item">
        <slot name="operateItem"></slot>
      </div>
      <div
        @click="switchTable"
        class="iconfont icon-tongji"
        v-if="this.title == '待发布'"
      ></div>
    </div>
    <div class="issue-content">
      <template v-for="(item, index) in dataList">
        <div class="issue-content-item" :key="index">
          <input
            type="radio"
            :value="item"
            class="check-box"
            name="radio"
            @click="checked(item)"
          />
          <img :src="item.imgUrl" class="img" />
        </div>
      </template>
    </div>
    <div class="footer-content">
      <div class="pie-tb-footer">
        <page
          :total="unPageTotal"
          :pageSize="unPageSize"
          :current="unPageNum"
          @pageChange="unPageChange"
          @pageSizeChange="unPageSizeChange"
        ></page>
      </div>
      <div class="operate-btn">
        <version-btn
          :disabled="dataList[0].status == status ? false : true"
          class="operate-btn-item"
          v-if="versionBtn"
          @click="controlvs"
        ></version-btn>
        <look-btn
          :disabled="dataList[0].status == status ? false : true"
          class="operate-btn-item"
          v-if="lookBtn"
          @click="lookOver"
        ></look-btn>
        <external-service-btn
          :disabled="dataList[0].status == status ? false : true"
          class="operate-btn-item"
          v-if="externalServiceBtn"
          @click="edit"
        ></external-service-btn>
        <del-btn
          :disabled="dataList[0].status == status ? false : true"
          class="operate-btn-item"
          v-if="delBtn"
          @click="deleteOperation"
        ></del-btn>
        <issue-btn
          :disabled="dataList[0].status == status ? false : true"
          class="operate-btn-item"
          v-if="issueBtn"
          @click="issue"
        ></issue-btn>
      </div>
    </div>
  </div>
</template>
<script>
import versionBtn from "@/components/button/version-btn.vue";
import lookBtn from "@/components/button/look-btn.vue";
import externalServiceBtn from "@/components/button/external-service-btn.vue";
import delBtn from "@/components/button/del-btn.vue";
import issueBtn from "@/components/button/issue-btn.vue";
import page from "@/components/page/page.vue";
export default {
  components: {
    versionBtn,
    lookBtn,
    externalServiceBtn,
    delBtn,
    issueBtn,
    page,
  },
  data() {
    return {};
  },
  props: {
    title: {
      //控制查看按钮是否显示
      type: String,
      default: "待发布",
    },
    dataList: {
      type: Array,
    },
    lookBtn: {
      //控制查看按钮是否显示
      type: Boolean,
      default: true,
    },
    externalServiceBtn: {
      //控制修改按钮是否显示
      type: Boolean,
      default: true,
    },
    delBtn: {
      //控制删除按钮是否显示
      type: Boolean,
      default: true,
    },
    versionBtn: {
      //版本按钮是否显示
      type: Boolean,
      default: true,
    },
    issueBtn: {
      //发布按钮是否显示
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Number || String,
    },
  },
  methods: {
    // 查看
    lookOver() {
      this.$emit("lookOver");
    },
    // 更新
    update() {
      this.$emit("update");
    },
    // 删除
    deleteOperation() {
      this.$emit("deleteOperation");
    },
    // 版本管理
    controlvs() {
      this.$emit("controlvs");
    },
    edit() {
      this.$emit("edit");
    },
    // 发布
    issue() {
      this.$emit("issue");
    },
    // 单选
    checked(item) {
      this.$emit("checked", item);
    },
    switchTable() {
      this.$emit("switchTable");
    },
  },
};
</script>
<style lang="less" scoped>
.template-item {
  display: flex;
  height: 50%;
  flex-direction: column;
  border: 1px solid @main-border-color;
  position: relative;
  min-height: 0;
  overflow: hidden;

  .header {
    width: 100%;
    flex: 1;
    background: @menu-item-bg;
    background-size: 100%;
    background-repeat: no-repeat;
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    font-size: @template-font-size;
    font-weight: 400;
    color: #fff;
    min-height: 0;
    display: flex;
    position: relative;
    .iconfont {
      position: absolute;
      top: 0;
      right: 10px;
      z-index: 1;
    }
  }
  .header-title {
    border-right: 1px solid #ccc;
    padding-right: 10px;
  }
  .issue-content {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    height: 250px;
    width: 100%;

    .issue-content-item {
      margin: 20px;
      position: relative;
      .check-box {
        width: 18px;
        height: 18px;
        position: absolute;
        right: 5px;
        top: 5px;
        z-index: 1;
      }
      .img {
        width: 170px;
        height: 230px;
        vertical-align: middle;
      }
    }
  }
  .footer-content {
    position: relative;
    .operate-btn {
      display: flex;
      position: absolute;
      bottom: 10px;
      right: 10px;
      z-index: 1;
      cursor: pointer;

      .operate-btn-item {
        margin-left: 20px;
      }
    }
  }
}
</style>
