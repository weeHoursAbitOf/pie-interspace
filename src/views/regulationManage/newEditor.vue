<template>
  <div class="new-editor">
    <pie-card :slotFooter="false" :slotIsContent="true">
      <div slot="header">
        <div class="editor-message">
          <div class="editor-ipt">
            <ol>
              <li v-show="obj.type != 0">
                <p>
                  <Icon
                    type="ios-undo"
                    class="pdw-editor-icon"
                    @click="onIosUndoEvent"
                  ></Icon>
                </p>
              </li>
              <li>
                <p>法律名称</p>
                <span>
                  <Input v-model="topic" placeholder=""></Input>
                </span>
              </li>
              <li>
                <p>制定机构</p>
                <span>
                  <Input v-model="organization" placeholder=""></Input>
                </span>
              </li>
            </ol>
          </div>
          <div class="editor-btn">
            <share-btn
              class="share-btn"
              title="预览"
              callBackName="on-pbw-event"
              @on-pbw-event="onPbwEvent"
            ></share-btn>
            <share-btn
              class="share-btn"
              title="确定"
              callBackName="on-new-conform-event"
              @on-new-conform-event="onNewConformEvent"
            ></share-btn>
          </div>
        </div>
      </div>
      <div slot="iscontent">
        <div class="pie-editor-content">
          <editor ref="pieEditor" v-model="content" :textType="1"></editor>
        </div>
      </div>
      <div slot="footer"></div>
    </pie-card>
  </div>
</template>

<script>
import editor from "@/components/editor/quill-editor";
import storage from "store";
import { USER_NAME_SYSTEM } from "@/store/mutations";
export default {
  components: {
    editor,
  },
  data() {
    return {
      topic: "", //法律名称
      organization: "", //制定机构
      content: "", //富文本
      obj: {},
    };
  },
  mounted() {
    this.setParams();
  },
  methods: {
    //   参数赋值
    setParams() {
      // 修改router路由赋值
      this.obj = this.$route.query;
      if (this.obj.type == 1) {
        this.topic = this.obj.topic;
        this.organization = this.obj.organization;
        this.$refs.pieEditor.content = this.obj.messageContent;
      }
      //   vuex预览赋值
      let editor = this.$store.state.editor.editor;
      if (editor != undefined) {
        this.topic = editor.topic;
        this.organization = editor.organization;
        this.$refs.pieEditor.content = editor.messageContent;
      }
    },
    // 预览
    onPbwEvent() {
      this.content = this.$refs.pieEditor.content;
      let obj = {
        topic: this.topic,
        organization: this.organization,
        textType: this.$route.query.type,
        publisher: storage.get(USER_NAME_SYSTEM),
        messageContent: this.content,
        status: 1,
      };
      this.$router.push({
        name: "pbwEditor",
        path: "/pbwEditor",
        query: obj,
      });
      this.$store.dispatch("editor", obj);
    },
    // 确定添加或者修改富文本
    onNewConformEvent() {
      this.content = this.$refs.pieEditor.content;
      if (this.obj.type == 0) {
        let params = {
          messageContent: this.content,
          organization: this.organization,
          publisher: "管理员",
          status: 1,
          textType: this.obj.textType,
          topic: this.topic,
        };
        this.$api.regulationManage.createInfo(params).then((res) => {
          if (res.code == 0) {
            this.$Notice.success({
              title: res.message,
              top: 50,
              duration: 5,
            });
            this.$router.push({
              name: this.obj.routeName,
              path: this.obj.routePath,
              query: {
                typeName: this.obj.textType,
              },
            });
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
          topic: this.topic,
          organization: this.organization,
          messageContent: this.content,
          indexId: this.obj.indexId,
          orderNum: this.obj.orderNum,
          top: this.obj.top,
          publisher: "管理员",
          status: 1,
        };
        this.$api.regulationManage
          .updateInfo(this.obj.textType, params)
          .then((res) => {
            if (res.code == 0) {
              this.$Notice.success({
                title: res.message,
                top: 50,
                duration: 5,
              });
              window.history.go(-1);
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
    // 返回上一级
    onIosUndoEvent() {
      this.$store.dispatch("editor", undefined);
      window.history.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.new-editor {
  padding: 20px;
  font-size: @lable-font-size;
  color: @lable-font-color;
}
.editor-message {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .editor-ipt {
    ol {
      display: flex;
      align-items: center;
      li {
        display: flex;
        align-items: center;
        margin-right: 10px;
        p {
          margin-right: 10px;
        }
      }
    }
  }
  .editor-btn {
    display: flex;
    align-items: center;
  }
}

.pie-editor-content {
  height: 840px !important;
}
/deep/.editor {
  height: 800px !important;
}
.share-btn {
  margin: 0 10px;
}

.pbw-editor-icon {
  font-size: 25px;
  &:hover {
    cursor: pointer;
  }
}
</style>
