<template>
  <div class="drag-modal">
    <div class="drag-modal-content">
      <div class="drag-box-card" :style="{ width: width + 'vw', height: height + 'vh' }">

        <!-- 切记设置list1和list2属性时，一定要添加.sync修饰符 -->
        <drag-list :list1.sync="list1" :list2.sync="list2" :dropConClass="dropConClass" @on-change="handleChange">
          <div slot="left-title" class="drag-title">
            <template v-for="item in titleList">
              <div :class="{ dragTitle: selectedId == item.value }" :key="item.value" @click="changeType(item)">
                <span class="list-title">{{ item.lable }}</span>
              </div>
            </template>
          </div>
          <div slot="right-title" class="drag-title">
            <span class="list-title">{{ targetTitle }}</span>
          </div>

          <div class="drag-item" slot="left" slot-scope="left">
            <span class="iconfont icon-yonghu"></span>
            <span>{{ left.itemLeft[titleKey] }}</span>
          </div>

          <div class="drag-item" slot="right" slot-scope="right">
            <span class="iconfont icon-yonghu"></span>
            <span>{{ right.itemRight[titleKey] }}</span>

          </div>
        </drag-list>
      </div>
      <!-- <div class="handle-log-box">
        <h3>操作记录</h3>
        <div class="handle-inner-box">
          <p v-for="(item, index) in handleList" :key="`handle_item_${index}`">{{ item }}</p>
        </div>
      </div>
      <div class="res-show-box">
        <pre>{{ list1 }}</pre>
      </div>
      <div class="res-show-box">
        <pre>{{ list2 }}</pre>
      </div> -->
      <div class="drag-affirm" @click="affirm">确定</div>
    </div>
  </div>
</template>

<script>
  import DragList from '@/components/drag-list/drag-list'

  export default {
    components: {
      DragList
    },
    props: {
      //标题列表，可以多个或者一个
      titleList: {
        type: Array,
        default: () => {
          return [{ lable: '机构', value: 3 }, { lable: '用户', value: 1 }]
        }
      },
      //源数据
      selectList: {
        type: Array,
        default: () => {
          return []
        }
      },
      targetList: {
        type: Array,
        default: () => {
          return []
        }
      },
      //右侧目标标题
      targetTitle: {
        type: String,
        default: "已选"
      },
      width: {
        type: String,
        default: 50,
      },
      height: {
        type: String,
        default: 80,
      },
      //key值 用于不同类型列表显示
      titleKey: {
        type: String,
        default: "username",
      }


    },
    data() {
      return {
        list1: [],
        list2: [],
        dropConClass: {
          left: ['drop-box', 'left-drop-box'],
          right: ['drop-box', 'right-drop-box']
        },
        handleList: [],
        selectedId: this.titleList[0].value


      };
    },
    mounted() {
      this.list1 = this.selectList;
    },
    watch: {
      selectList(newVal) {
        console.log(newVal);
        this.list1 = newVal;
        deep: true
      },

      targetList(newVal) {
        console.log(newVal);
        this.list2 = newVal;
        deep: true
      }
    },
    methods: {
      handleChange({ src, target, oldIndex, newIndex }) {
        console.log(src, target, oldIndex, newIndex);
        this.handleList.push(`${src} => ${target}, ${oldIndex} => ${newIndex}`)
      },
      //切换类型
      changeType(item) {
        this.selectedId = item.value;
        this.$emit("changeType", item);

      },
      affirm() {
        this.$emit('affirm', { list1: this.list1, list2: this.list2 });
      }
    },
  };
</script>
<style lang="less">
  .drag-modal {


    .drag-modal-content {
      position: relative;
      background: @modals-bg-color;
      color: #ffffff;

      .drag-affirm {
        background: #1077f5;
        position: absolute;
        font-size: 18px;
        padding: 6px 12px;
        border-radius: 6px;
        color: #ffffff;
        bottom: 20px;
        right: 20px;
      }
    }

    .drag-modal-content::-webkit-scrollbar {
      display: none;
    }

    .drag-box-card {
      display: inline-block;

      .drag-title {
        display: flex;
        padding: 10px 0;
        flex: 1;

        .dragTitle {
          color: #1077f5;
          font-size: 20px;
        }

        span {
          margin-left: 10px;
        }
      }

      .drag-title:nth-child(2) {
        margin-left: 20px;
      }

      .drag-item {
        padding: 5px 20px;
        border: 1px solid @modals-border-color;
        font-size: 18px;

        .iconfont {
          margin-right: 14px;
        }
      }

      .list-title {
        font-size: 20px;
        margin-right: 20px;
      }



      .drop-box {
        border: 1px solid @modals-border-color;
        height: -webkit-fill-available;
        border-radius: 5px;
        min-height: 500px;
      }
    }
  }
</style>