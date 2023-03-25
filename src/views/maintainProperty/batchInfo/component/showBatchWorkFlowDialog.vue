<template>
  <div>
    <el-dialog title="批次工作流" :visible.sync="workFlowDialogVisibility" width="80%" v-dragDialog>
      <el-steps :active="currentWorkCount" align-center>
        <el-step v-for="item in workFlowList" :key="item.workItemId" :title="item.workName"
          :description="item.workDescription"></el-step>
      </el-steps>

      <div slot="footer" class="dialog-footer">
        <el-button @click="workFlowDialogVisibility = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getBatchWorkFlow } from "@/api/maintainInfo";

export default {
  name: "ShowBatchWorkFlowDialog",
  data() {
    return {
      workFlowDialogVisibility: false,
      workFlowList: [],
      currentWork: {},
      currentWorkCount: 1,
    };
  },
  props: {
    batchId: {
      type: String,
      default: () => "",
    },
    personCurrentWorkId: {
      type: String,
      default: () => "",
    }
  },
  mounted() { },
  methods: {},
  watch: {
    workFlowDialogVisibility(newValue, oldValue) {
      //如果打开了，则调用接口
      if (newValue === true) {
        (this.workFlowList = []),
          (this.currentWork = {}),
          (this.currentWorkCount = 1);
        //调用接口获取数据
        getBatchWorkFlow({ batchId: this.batchId }).then((res) => {
          this.workFlowList = res.data.data.batchWorkFlow;
          this.currentWork = res.data.data.currentWork;
          for (let i = 0; i < this.workFlowList.length; i++) {
            if (
              this.workFlowList[i].workItemId != this.currentWork.workItemId
            ) {
              this.currentWorkCount = this.currentWorkCount + 1;
            } else {
              break;
            }
          }
        });
      }
    },
  },
};
</script>
