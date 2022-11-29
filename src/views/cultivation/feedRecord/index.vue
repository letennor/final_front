<template>
  <div class="app-container mainDiv">
    <my-card title="投喂情况记录">
      <div class="filter-container">
        <el-button
          class="filter-item addButton"
          type="primary"
          v-waves
          icon="el-icon-circle-plus-outline"
          @click="add()"
          >添加
        </el-button>
      </div>
      <table-list
        :data="list"
        :columns="columns"
        class="dataTable"
      ></table-list>
    </my-card>

    <!-- 添加投喂记录 -->
    <AddFeedRecordDialog ref="AddFeedRecordDialog" @refresh="refresh()"/>
  </div>
</template>

<script>
import AddFeedRecordDialog from "@/components/cultivation/addFeedRecordDialog.vue"
import dragDialog from "@/directive/el-dragDialog";
import tableList from "@/components/table/tableList.vue";
import MyCard from "@/components/MyCard";
import waves from "@/directive/waves";
import { parseTime, genderTransform } from "@/utils";
import { getAllFeedRecord, deleteFeedRecord } from "@/api/cultivation";
export default {
  name: "FeedRecord",
  components: {
    tableList,
    MyCard,
    AddFeedRecordDialog,
  },
  directives: {
    waves,
    dragDialog,
  },
  data() {
    return {
      // 表头名称和字段
      columns: [
        {
          text: "批次",
          value: "batchId",
        },
        {
          text: "用料类型",
          value: "feedId",
        },
        {
          text: "用料量",
          value: "feedAmount",
        },
        {
          text: "饲养员",
          value: "feedPerson",
        },
        {
          text: "记录员",
          value: "recordPerson",
        },
        {
          text: "操作",
          type: "iconButton",
          width: 180,
          fixed: "right",
          list: this.operButton,
        },
      ],
      list: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    update() {
      console.log("点击编辑");
    },

    delete(val) {
        deleteFeedRecord(val.row).then((res)=>{
            console.log('res:', res)
            this.getList()
        })
    },

    // 新增
    add() {
      this.$refs.AddFeedRecordDialog.dialogFormVisibility = true;
    },

    // 表格操作按鈕
    operButton(val) {
      const temp = [
        { class: "iconzidingyipoumian", value: "编辑", click: this.update },
        { class: "iconshanchu", value: "删除", click: this.delete },
      ];
      return temp;
    },

    getList() {
      getAllFeedRecord().then((res) => {
        this.list = res.data.data;
        console.log("list:", this.list);
      });
    },

    refresh(){
      this.getList()
    }
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.CheckDialog {
  .el-row {
    padding: 10px;
  }
}
</style>
