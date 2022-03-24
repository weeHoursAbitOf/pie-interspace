<template>
  <div class="pbw-editor">
    <div class="pbw-editor-top">
      <Icon
        type="ios-undo"
        class="pdw-editor-icon"
        @click="onIosUndoEvent"
      ></Icon>
      <div class="pbw-editor-message">
        <p class="pbw-editor-name">{{ name }}</p>
        <p class="pbw-editor-time">{{ createTime }}</p>
      </div>
    </div>
    <editor ref="pieEditor" v-model="content" :textType="1"></editor>
  </div>
</template>

<script>
import editor from "@/components/editor/quill-editor";
export default {
  components: {
    editor,
  },
  data() {
    return {
      name: "",
      createTime: "",
    };
  },
  mounted() {
    this.createTime = this.$utils.formatDate(new Date(), 0);
    this.name = this.$route.query.publisher;
    this.$refs.pieEditor.content = this.$route.query.messageContent;
  },
  methods: {
    onIosUndoEvent() {
      window.history.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.pbw-editor {
  padding: 20px;
  font-size: @lable-font-size;
  color: @lable-font-color;
  .pbw-editor-top {
    background-image: linear-gradient(
      rgba(20, 1, 54, 0.6) 0%,
      rgba(17, 44, 80, 0.4) 50%,
      rgba(20, 1, 54, 0.6) 100%
    );
    border: 0.005208rem solid rgba(29, 83, 153, 0.5);
    box-sizing: border-box;
    font-family: "Helvetica Neue", "Helvetca", "Arial", sans-serif;
    padding: 0.041667rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    position: relative;

    .pdw-editor-icon {
      position: absolute;
      left: 20px;
      z-index: 1;
      font-size: 25px;
      &:hover {
        cursor: pointer;
      }
    }
    .pbw-editor-message {
      display: flex;
      align-items: center;
      flex-direction: column;
      .pbw-editor-time {
        font-size: 10px;
      }
    }
  }
}
/deep/.editor {
  height: 880px !important;
}
.share-btn {
  margin: 0 10px;
}
/deep/.ql-toolbar.ql-snow {
  display: none !important;
}
</style>
