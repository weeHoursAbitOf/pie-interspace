import Vue from 'vue'

import dialog from './dialog.vue';
// 这里是重点
const myDialog = {
    install: function (Vue) {
        Vue.component('myDialog', dialog)
    }
}

// 导出组件
export default myDialog