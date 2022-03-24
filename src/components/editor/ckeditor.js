// 第一步：引入 CKEditor5
import CKEditor from "@ckeditor/ckeditor5-build-decoupled-document";
// 第二步：自定义工具栏内容
CKEditor.defaultConfig = {
  language: "zh-cn",
  toolbar: [
    "bold",
    "italic",
    "strikethrough",
    "underline",
    "|",
    "fontFamily",
    "fontSize",
    "fontColor",
    "fontBackgroundColor",
    "|",
    "numberedList",
    "bulletedList",
    "alignment",
    "|",
    "codeblock",
    "blockQuote",
    "link",
    "imageUpload",
    "|",
    "undo",
    "redo",
  ],
  // 配置可用的字体大小
  fontSize: {
    options: [12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38],
  },
  // 配置图片功能栏
  image: {
    toolbar: [
      "imageTextAlternative",
      "imageStyle:full",
      "imageStyle:side",
      "imageStyle:alignLeft",
      "imageStyle:alignCenter",
      "imageStyle:alignRight",
    ],
    styles: ["full", "side", "alignLeft", "alignCenter", "alignRight"],
  },
}

// 第三步：声明上传图片的构造函数
class UploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload () {
    return new Promise(resolve => {
      let file = this.loader.file;
      let url = URL.createObjectURL(file)

      resolve({
        default: url,
      });
    });
  }
}
// 第四步：导出 CKEditor 和 UploadAdapter
export { CKEditor, UploadAdapter }
