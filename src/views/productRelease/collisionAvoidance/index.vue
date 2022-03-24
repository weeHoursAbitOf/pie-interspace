<template>
    <div class="pie-tb-content">
        <pie-card>
            <div slot="header">
                <div class="publish-module-content">
                    <div class="publish-module-message">
                        <div>
                            <span>产品名称</span>
                            <Input v-model="productName" style="width: 250px" />
                        </div>
                        <div>
                            <span>开始时间</span>
                            <DatePicker
                                type="date"
                                :value="createTime"
                                placeholder="开始时间"
                                @on-change="createTimeChange"
                                style="width: 250px"
                            ></DatePicker>
                            <span>至</span>
                            <DatePicker
                                type="date"
                                :value="endTime"
                                placeholder="结束时间"
                                @on-change="endTimeChange"
                                style="width: 250px"
                            ></DatePicker>
                        </div>
                        <div class="publish-module-btn">
                            <search-btn class="btn-right" @click="solSearch"></search-btn>
                            <batch-delete-btn class="btn-right" @click="solDelete"></batch-delete-btn>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 表体 -->
            <div slot="iscontent">
                <div>
                    <my-table
                        border
                        ref="selection"
                        :columns="columns"
                        :data="data"
                        disabled-hover
                        max-height="500"
                        :lookBtn="true"
                        :delBtn="true"
                        :popUpOnline="true"
                        :tapeOut="true"
                        @look="moversSolLook"
                        @confirmDelete="moversConfirmDelete"
                        @popUpOnlineEvent="popUpOnlineEvent"
                        @tapeOutEvent="tapeOutEvent"
                        @on-selection-change="multiSelect"
                    ></my-table>
                </div>
            </div>
            <!-- 分页 -->
            <div slot="footer">
                <div class="pie-tb-footer">
                    <page
                        :total="pageTotal"
                        :pageSize="pageSize"
                        :current="pageNum"
                        @pageChange="pageChange"
                        @pageSizeChange="pageSizeChange"
                    ></page>
                </div>
            </div>
        </pie-card>
        <!-- 删除弹出框 -->
        <my-dialog @confirm="confirmDelete" @cancel="cancel" :isModal="isDelete"></my-dialog>
        <!-- 查看 -->
        <my-modal
            width="80"
            height="70"
            v-model="isShowDetails"
            title="详情"
            :cancelBtn="false"
            :resetBtn="false"
            @confirm="cancel"
        >
            <div slot="operateItem">
                <details-table :dataItem="dataItem" />
            </div>
        </my-modal>
    </div>
</template>
<script>
import searchBtn from "@/components/button/search-btn.vue";
import batchDeleteBtn from "@/components/button/batch-delete-btn.vue";
import myTable from "@/components/table/my-table.vue";
import page from "@/components/page/page.vue";
import detailsTable from "./detailsTable.vue";
export default {
    components: {
        searchBtn,
        batchDeleteBtn,
        myTable,
        page,
        detailsTable,
    },
    data() {
        return {
            pageTotal: 10, //数据总数
            pageNum: 1, //初始页
            pageSize: 10, //每页条数
            productName: "",//产品名称
            createTime: "", //生成时间
            endTime: "", //结束时间
            serialNumber: "", //期刊号
            columns: [
                {
                    type: "selection",
                    width: 60,
                    align: "center",
                },
                {
                    title: "序号",
                    width: 70,
                    type: "index",
                    align: "center",
                },
                {
                    title: "产品名称",
                    key: "name",
                    align: "center",
                },
                {
                    title: "服务对象",
                    key: "enterpriseName",
                    align: "center",
                },
                {
                    title: "生成时间",
                    key: "createTime",
                    align: "center",
                    sortable: true,
                },
                {
                    title: "发布状态",
                    key: "publishStatusMsg",
                    align: "center",
                },
                {
                    title: "发布时间",
                    key: "publishTime",
                    align: "center",
                    sortable: true,
                },
                {
                    title: "操作",
                    slot: "action",
                    width: 250,
                    align: "center",
                },
            ],
            data: [
                // {
                //     id: 0,
                //     status: 0,
                //     createTime: "2021-12-03",
                //     beginTime: "2021-12-03",
                //     endTime: "2021-12-03",
                //     publishTime: "2021-12-03",
                //     creator: "",
                //     enterpriseId: 137,
                //     enterpriseName: "空间态势",
                //     updateTime: "",
                //     orbitId: "dsfsdfdsfsdfdsfdsfqer213fdsfsdfsdf",
                //     name: "空间态势",
                // },
                // {
                //     id: 1,
                //     status: 1,
                //     createTime: "2021-12-03",
                //     beginTime: "2021-12-03",
                //     endTime: "2021-12-03",
                //     publishTime: "2021-12-03",
                //     creator: "",
                //     enterpriseId: 137,
                //     enterpriseName: "空间态势",
                //     updateTime: "",
                //     orbitId: "dsfsdfdsfsdfdsfdsfqer213fdsfsdfsdf",
                //     name: "空间态势",
                // }
            ],
            selectRow: [],
            isDelete: false,
            isShowDetails: false,
            dataItem: {},
        };
    },
    created() {
        this.getOrbitCollisionWarning();
    },
    methods: {
        // 获取数据列表
        getOrbitCollisionWarning() {
            let formData = new FormData()
            formData.append("page", this.pageNum)
            formData.append("size", this.pageSize)
            formData.append("name", this.productName)
            formData.append("beginTime", this.createTime)
            formData.append("endTime", this.endTime,)
            this.$api.advanced.OrbitCollisionWarning(formData).then((res) => {
                if (res.success == true) {
                    this.pageTotal = res.data.total;
                    this.data = res.data.msg;
                    this.setResetParameter();
                }
            });
        },
        // 页数
        pageChange(num) {
            this.pageNum = num;
            this.getOrbitCollisionWarning();
        },
        // 条数
        pageSizeChange(size) {
            this.pageSize = size;
            this.getOrbitCollisionWarning();
        },
        // 开始时间
        createTimeChange(time) {
            this.createTime = time;
        },
        // 结束时间
        endTimeChange(time) {
            this.endTime = time;
        },
        // 搜索
        solSearch() {
            this.getOrbitCollisionWarning();
        },
        // 查看
        moversSolLook(row) {
            this.isShowDetails = true;
            this.dataItem = row;
        },
        // 上线
        popUpOnlineEvent(row) {
            let formData = new FormData();
            formData.append("id", row.id);
            formData.append("status", 0);
            this.$api.advanced.getOrbitCollisionPushOrClose(formData).then((res) => {
                if (res.success == true) {
                    this.$Notice.success({
                        title: res.message,
                        top: 50,
                        duration: 5,
                    });
                    this.getOrbitCollisionWarning();
                }
            });
        },
        // 下线
        tapeOutEvent(row) {
            let formData = new FormData();
            formData.append("id", row.id);
            formData.append("status", 1);
            this.$api.advanced.getOrbitCollisionPushOrClose(formData).then((res) => {
                if (res.success == true) {
                    this.$Notice.success({
                        title: res.message,
                        top: 50,
                        duration: 5,
                    });

                    this.getOrbitCollisionWarning();
                }
            });
        },
        // 删除
        moversConfirmDelete(row) {
            let params = [row.id];
            this.$api.advanced.DeleteOrbitCollisionWarning(params).then((res) => {
                if (res.success == true) {
                    this.$Notice.success({
                        title: res.message,
                        top: 50,
                        duration: 5,
                    });

                    this.getOrbitCollisionWarning();
                }
            });
        },
        // 多选
        multiSelect(row) {
            this.selectRow = row;
        },
        // 批量删除
        solDelete() {
            if (this.selectRow.length == 0) {
                this.$Notice.warning({
                    title: "删除数据不能为空",
                    top: 50,
                    duration: 5,
                });
                return;
            }
            this.isDelete = true;
        },
        // 批量删除 确定
        confirmDelete() {
            let params = this.selectRow.map((item) => item.id);
            this.$api.advanced.DeleteOrbitCollisionWarning(params).then((res) => {
                if (res.success == true) {
                    this.$Notice.success({
                        title: res.message,
                        top: 50,
                        duration: 5,
                    });
                    this.getOrbitCollisionWarning();
                    this.cancel()
                }
            });
        },
        // 取消
        cancel() {
            this.isDelete = false;
            this.isShowDetails = false;
        },
        // 重置参数
        setResetParameter() {
            this.createTime = "";
            this.endTime = "";
            this.serialNumber = "";
        },
    },
};
</script>
<style lang="less" scoped>
.pie-tb-content {
    width: 100%;
    font-size: @lable-font-size;
    color: @lable-font-color;
}

.publish-module-message {
    display: flex;
    align-items: center;
    position: relative;
    padding: 7px 0;
    span {
        padding: 0 10px;
    }
}
.publish-module-btn {
    display: flex;
    align-items: center;
    position: absolute;
    top: 5px;
    right: 10px;
    z-index: 1;
}

.btn-right {
    margin-right: 20px;
}
</style>
