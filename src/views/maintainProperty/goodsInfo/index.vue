<template>
  <div class="app-container mainDiv">
    <my-card title="货物信息维护">
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

    <AddGoodsInfoDialog ref="AddGoodsInfoDialog" @refresh="refresh()"/>
  </div>
</template>

<script>
import AddGoodsInfoDialog from "@/components/maintainInfo/addGoodsInfoDialog.vue"
import dragDialog from "@/directive/el-dragDialog";
import tableList from "@/components/table/tableList.vue";
import MyCard from "@/components/MyCard";
import waves from "@/directive/waves";
import { parseTime, genderTransform } from "@/utils";
import { getAllGoodsInfo, deleteGoodsInfo } from "@/api/maintainInfo";
export default {
  name: "GoodsInfo",
  components: {
    tableList,
    MyCard,
    AddGoodsInfoDialog,
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
          text: "货物id",
          value: "goodsId",
        },
        {
          text: "货物名称",
          value: "goodsName",
        },
        {
          text: "创建时间",
          value: "gmtCreate",
          filter: parseTime
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
    update(val) {
      this.$refs.AddGoodsInfoDialog.dialogForm = val.row;
      this.$refs.AddGoodsInfoDialog.type = 0;
      this.$refs.AddGoodsInfoDialog.dialogFormVisibility = true;
      console.log("点击编辑");
    },

    delete(val) {
      deleteGoodsInfo(val.row).then((res)=>{
        console.log("res:", res)
        this.getList()
      })
    },

    // 新增
    add() {
      this.$refs.AddGoodsInfoDialog.type = 1;
      this.$refs.AddGoodsInfoDialog.dialogForm = {};
      this.$refs.AddGoodsInfoDialog.dialogFormVisibility = true;
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
      getAllGoodsInfo().then((res) => {
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
