<template>
  <div class="pie-editor">
    <div class="pie-editor-title">
      <Input v-model="titleName" clearable placeholder="请输入标题名称" class="input-style" />
    </div>

    <div id="wangEditor"></div>
    <!-- <button type="button" class="btn" @click="getEditorData">
      获取当前内容
    </button>-->
    <!-- <textarea name="" id="" cols="170" rows="20" readonly v-model="editorData"></textarea>
    <div name="" id="" cols="170" rows="20" readonly v-html="editorData"></div>-->
  </div>
</template>

<script>

// 引入 wangEditor
import wangEditor from 'wangeditor'
import hljs from 'highlight.js'
// import 'highlight.js/styles/monokai_sublime.css'



export default {
  props: {
    textType: {
      type: Number,
      default: ""
    }
  },
  data() {
    return {
      editor: null,
      editorData: '',
      searchGroupName: "",
      titleName: ""
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const editor = new wangEditor(`#wangEditor`)
      editor.highlight = hljs
      // 配置 onchange 回调函数，将数据同步到 vue 中
      editor.config.onchange = (newHtml) => {
        this.editorData = newHtml
      }
      editor.config.pasteFilterStyle = false;
      // 配置菜单栏，设置不需要的菜单
      editor.config.excludeMenus = [
        // 'video',
        'code'
      ]
      editor.config.colors = [
        '#000000',
        '#eeece0',
        '#1c487f',
        '#4d80bf',
        "#f0f0f0"
      ]
      editor.config.uploadImgServer = '/upload-img'

      // 创建编辑器
      editor.create()

      this.editor = editor
    },
    getEditorData() {
      // 通过代码获取编辑器内容
      let data = this.editor.txt.html()
      alert(data)

    },
    insertTextMessage() {
      let editorTxt = this.editor.txt.html();
      let param = {

        "menuId": "",
        "messageContent": editorTxt,
        "organization": "",
        "publisher": "",
        "status": 0,
        "textType": this.textType,
        "topic": this.titleName

      }
      this.$api.officialManage.insertTextMessage(param).then((res) => {
        if (res.code == 0) {
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
          // this.dataList = res.data.groupList;
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      }

      )

    }
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy()
    this.editor = null
  },

}
</script>

<style lang="less" scoped>
.pie-editor {
  margin: auto;
  position: relative;
}

.pie-editor-title {
  margin: 20px 0;
}

#wangEditor {
  /deep/ .w-e-toolbar .w-e-menu i {
    color: #fff;
  }
}

#wangEditor {
  /deep/ .w-e-toolbar {
    background: transparent !important;
    border: 1px solid @content-border-color !important;
  }
}

#wangEditor {
  /deep/ .w-e-text-container {
    background: transparent !important;
    border: 1px solid @content-border-color !important;
  }
}

#wangEditor {
  /deep/ .w-e-menu-panel {
    background: transparent !important;
    border: 1px solid @content-border-color !important;
  }
}

.btn {
  /* position: absolute;
    right: 0;
    top: 0; */
  padding: 5px 10px;
  cursor: pointer;
}

.toolbar {
  border: 1px solid red;
  background-color: red;
}
</style>