<template>
  <div class="pie-tb-content">
    <div class="tb-header-content">
      <div class="tb-header-item">
        <template v-for="(item,index) in dataList" class="video-box">
            <video-box :videoBox="item" @look="look" @issue="issue" :title="item.title" :key="index"></video-box>
        </template>
      </div>
    </div>
    <!-- 预览弹出框 -->
    <my-dialog @confirm="confirmDelete" @cancel="cancelDelete" :isModal="isLook" content="确定要预览吗?"></my-dialog>
    <!-- 发布弹出框 -->
    <my-dialog @confirm="confirmDelete" @cancel="cancelDelete" :isModal="isIssue" content="确定要发布吗?"></my-dialog>
  </div>
</template>
<script>

import VideoBox from '@/components/video-box/video-box.vue';
import MyDialog from '@/components/dialog/dialog.vue';
export default {
    components: {
      VideoBox,
      MyDialog
    },
    data(){
      return{
        title:"",
        dataList:[
          {
            id: 1,
            title: "在轨预警"
          },
          {
            id: 2,
            title: "发射预警"
          },
          {
            id: 3,
            title: "解体事件"
          },
           {
            id: 4,
            title: "陨落事件"
          },
          {
            id: 5,
            title: "安全规避"
          },
        ],
        isIssue: false,
        isLook:false
      }
    },
    methods:{
       //预览操作
      look() {
        this.isLook = true;
      },
       //发布操作
      issue() {
        this.isIssue = true;
      },
      //取消(发布)
      cancelDelete() {
        this.isLook = false;
        this.isIssue = false;
      },
      //确认（发布）
      confirmDelete() {
        this.isLook = false;
        this.isIssue = false;
      },
    }
}
</script>
<style lang="less" scoped>
.pie-tb-content{
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 300px);

  .tb-header-content{
    display: flex;
    flex-direction: column;
    justify-content: center;

    .tb-header-item{
      display: flex;
      flex-wrap: wrap;
      width: 80%;
      justify-content: flex-start;
      text-align: center;
      margin: auto;

      .tb-header-item-title{
        font-size: 24px;
        color: #fff;
        height: 30px;                                                                                          
        margin-left: 40px;
      }
    }
  }
}
</style>