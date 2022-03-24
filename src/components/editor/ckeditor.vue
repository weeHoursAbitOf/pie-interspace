<template>
  <div>
    <CKEditor :editor="editor" @ready="onReady" ...></CKEditor>
  </div>
</template>

<script>
  import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

  export default {
    name: 'ckeditor',
    data() {
      return {
        editor: DecoupledEditor,

        // ...
      };
    },
    methods: {
      onReady(editor) {
        // Insert the toolbar before the editable area.
        editor.ui.getEditableElement().parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
        );
      }
    }
  }
</script>