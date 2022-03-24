<template>
  <!-- 视频管理组件 -->
  <div class="template-item">
    <!-- <Checkbox v-model="single"></Checkbox> -->
    <div class="template-item-left">
      <div class="template-item-img">
        <img src="../../assets/public/video1.png" />
      </div>
      <div class="template-item-btn">
        <look-btn
          class="preview-btn"
          v-if="lookBtn"
          @click="look"
          title="镜头选择"
        ></look-btn>
        <issue-btn
          class="issue-btn"
          v-if="issueBtn"
          @click="issue"
          title="镜头取消"
        ></issue-btn>
      </div>
    </div>
    <span class="template-item-text">{{ title }} </span>
  </div>
</template>

<script>
import lookBtn from "@/components/button/look-btn.vue";
import issueBtn from "@/components/button/issue-btn.vue";
export default {
  components: {
    lookBtn,
    issueBtn,
  },
  props: {
    title: {
      type: String,
      default: "1.2米口径望远镜",
    },
    lookBtn: {
      //控制查看按钮是否显示
      type: Boolean,
      default: true,
    },
    issueBtn: {
      //发布按钮是否显示
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    look() {
      this.$emit("look");
    },
    issue() {
      this.$emit("issue");
    },
  },
};
</script>
<style lang="less" scoped>
.template-item {
  display: flex;
  flex-direction: column;
  color: @table-text-color;
  padding: 20px 40px;
  .template-item-text {
    display: flex;
    font-size: 18px;
    margin-top: 10px;
    width: 206px;
    justify-content: center;
  }
  .template-item-left {
    display: flex;

    .template-item-img {
      width: 206px;
      height: 124px;
      // background-color: rgba(44, 156, 146, 0.2);
      background-color: @not-allowed-bg;
      border-radius: 12px;
      text-align: center;
      padding-top: 30px;
    }
  }
  .template-item-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .preview-btn {
      margin-bottom: 20px;
      cursor: pointer;
      margin-left: 20px;
    }

    .issue-btn {
      margin-left: 20px;
    }
  }
}
</style>