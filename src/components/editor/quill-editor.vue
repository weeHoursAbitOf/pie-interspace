<template>
  <div>
    <quill-editor
      ref="myTextEditor"
      v-model="content"
      :options="quillOption"
      class="editor"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
    >
    </quill-editor>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor, Quill } from "vue-quill-editor";
import quillConfig from "./quill-config.js";
import ImageResize from "quill-image-resize-module";
Quill.register("modules/imageResize", ImageResize);
import { container, addQuillTitle } from "quill-video-image-module";
import { ImageExtend, QuillWatch } from "quill-video-image-module";
import { VideoExtend, QuillVideoWatch } from "quill-video-image-module";

// import ImageResize from 'quill-image-resize-module'
import video from "quill-video-image-module/video";
Quill.register(video, true);
// Quill.register('modules/ImageResize', ImageResize)
Quill.register("modules/ImageExtend", ImageExtend);
Quill.register("modules/VideoExtend", VideoExtend);
export default {
  components: {
    quillEditor,
  },
  data() {
    return {
      content: "",
      quillOption: quillConfig,
    };
  },
  methods: {
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", this.content);
    },
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    },
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      this.content = html;
    },
  },
};
</script>
<style>
.editor {
  line-height: normal !important;
  height: 500px !important;
  color: #ffffff;
}
.ql-toolbar.ql-snow .ql-picker-label {
  color: rgba(255, 255, 255, 0.8);
}
.ql-snow .ql-formats .ql-stroke {
  stroke: rgba(255, 255, 255, 0.8);
}
.ql-snow .ql-fill,
.ql-snow .ql-stroke.ql-fill {
  fill: rgba(255, 255, 255, 0.8);
}
.ql-editor.ql-blank::before {
  color: rgba(255, 255, 255, 0.8) !important;
}

.ql-toolbar.ql-snow {
  background-image: linear-gradient(
    rgba(20, 1, 54, 0.6) 0%,
    rgba(17, 44, 80, 0.4) 50%,
    rgba(20, 1, 54, 0.6) 100%
  );
  border-color: rgba(29, 83, 153, 0.5);
}
.ql-container.ql-snow {
  background-image: linear-gradient(
    rgba(20, 1, 54, 0.6) 0%,
    rgba(17, 44, 80, 0.4) 35%,
    rgba(20, 1, 54, 0.6) 50%,
    rgba(29, 83, 153, 0.4) 100%
  );
  border-color: rgba(29, 83, 153, 0.5);
}

.ql-snow .ql-picker.ql-expanded .ql-picker-options {
  background-color: rgba(29, 83, 153, 0.4);
}
/* .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='45px']::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='45px']::before {
    content: '45px';
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='60px']::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='60px']::before {
    content: '60px';
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='90px']::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='90px']::before {
    content: '90px';
  }

  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='45px']::before {
    font-size: 10px;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='60px']::before {
    font-size: 18px;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='90px']::before {
    font-size: 32px;
  } */
</style>
