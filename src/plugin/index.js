import newBtn from "@/components/button/new-btn";
import lookBtn from "@/components/button/look-btn";
import batchDeleteBtn from "@/components/button/batch-delete-btn.vue";
import exportBtn from "@/components/button/export-btn.vue";
import searchBtn from "@/components/button/search-btn.vue";
import cancelBtn from "@/components/button/cancel-btn.vue";
import resetBtn from "@/components/button/reset-btn.vue";
import createReportBtn from "@/components/button/create-report-btn";
import batchJoinBtn from "@/components/button/batch-join-btn";
import shareBtn from "../components/button/share-btn.vue"
import pushBtn from "@/components/button/push-btn.vue";
import pieCard from "@/components/pie-card/pie-card.vue";
import myModal from "@/components/modals/modal.vue";
import dialog from '@/components/dialog';
import uploadFileBtn from "@/components/button/publicUpload/uploadFileBtn.vue";
import uploadPictureBtn from "@/components/button/publicUpload/uploadPictureBtn.vue";
import modals from "@/components/Modal";
import transfer from "@/components/drag-list/transfer.vue"
import transferModals from "@/components/drag-list/transferModals.vue"
export default (Vue) => {
    Vue.component('dialog', dialog)
    Vue.component('newBtn', newBtn)
    Vue.component('lookBtn', lookBtn)
    Vue.component('batchDeleteBtn', batchDeleteBtn)
    Vue.component('exportBtn', exportBtn)
    Vue.component('searchBtn', searchBtn)
    Vue.component('pieCard', pieCard)
    Vue.component('myModal', myModal)
    Vue.component('cancelBtn', cancelBtn)
    Vue.component('resetBtn', resetBtn)
    Vue.component('createReportBtn', createReportBtn)
    Vue.component('pushBtn', pushBtn)
    Vue.component('batchJoinBtn', batchJoinBtn)
    Vue.component("shareBtn", shareBtn)
    Vue.component("uploadFileBtn", uploadFileBtn)
    Vue.component("uploadPictureBtn", uploadPictureBtn)
    Vue.component("modals", modals)
    Vue.component("transfer", transfer)
    Vue.component("transferModals", transferModals)
}