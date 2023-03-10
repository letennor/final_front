<template>
  <div class="app-container mainDiv">
    <my-card title="个体死亡情况记录">
      <div class="filter-container">
        <span style="margin-right: 10px">记录员<strong>:</strong></span>
        <el-select
          class="filter-item"
          placeholder="请选择记录员"
          style="
            background-color: white;
            width: 200px;
            margin-right: 20px;
            margin-top: 10px;
          "
          v-model="listQuery.params.recordPerson"
        >
          <el-option
            v-for="item in personList"
            :key="item.userBasicInfoId"
            :label="item.name"
            :value="item.userBasicInfoId"
          >
          </el-option>
        </el-select>

        <span style="margin-right: 10px">记录日期<strong>:</strong></span>
        <el-date-picker
          placement="bottom-start"
          style="width: 400px; margin-bottom: 10px"
          v-model="listQuery.params.recordDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <br />
        <el-button class="filter-item" v-waves @click="reset">重置</el-button>
        <el-button
          class="filter-item"
          type="primary"
          v-waves
          icon="el-icon-search"
          @click="search"
          >查询</el-button
        >

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

    <!-- 添加个体死亡量记录 -->
    <IndividualDeathRecordDialog
      ref="IndividualDeathRecordDialog"
      @refresh="refresh"
    />
  </div>
</template>

<script>
import IndividualDeathRecordDialog from "@/components/cultivation/addIndividualDeathRecordDialog.vue";
import dragDialog from "@/directive/el-dragDialog";
import tableList from "@/components/table/tableList.vue";
import MyCard from "@/components/MyCard";
import waves from "@/directive/waves";
import { parseTime, genderTransform } from "@/utils";
import { getAllPerson } from "@/api/system";
import {
  getAllIndividualDeathRecord,
  deleteIndividualDeathRecord,
  getIndividualDeathRecordByCondition,
} from "@/api/cultivation";
export default {
  name: "IndividualDeathRecord",
  components: {
    tableList,
    MyCard,
    IndividualDeathRecordDialog,
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
          text: "死亡记录",
          value: "deathRecordId",
        },
        {
          text: "死亡原因",
          value: "deathReason",
        },
        {
          text: "记录员",
          value: "recordPersonName",
        },
        {
          text: "记录时间",
          value: "recordTime",
          filter: parseTime,
          filterParams: ["{y}年{m}月{d}日"],
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
      listQuery: {
        pageSize: 15,
        currPage: 1,
        params: {},
      },
      personList: {},
    };
  },
  mounted() {
    this.getList();
    this.getPersonList();
  },
  methods: {
    update(val) {
      this.$refs.IndividualDeathRecordDialog.dialogForm = val.row;
      this.$refs.IndividualDeathRecordDialog.type = 0;
      this.$refs.IndividualDeathRecordDialog.dialogFormVisibility = true;
    },

    delete(val) {
      deleteIndividualDeathRecord(val.row).then((res) => {
        console.log("res:", res);
        this.getList();
      });
    },

    // 新增
    add() {
      this.$refs.IndividualDeathRecordDialog.type = 1;
      this.$refs.IndividualDeathRecordDialog.dialogForm = {};
      this.$refs.IndividualDeathRecordDialog.dialogFormVisibility = true;
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
      getAllIndividualDeathRecord().then((res) => {
        this.list = res.data.data;
        console.log("list:", this.list);
      });
    },

    refresh() {
      this.getList();
    },

    getPersonList() {
      getAllPerson().then((res) => {
        this.personList = res.data.data;
        console.log("personList:", this.personList);
      });
    },

    reset() {
      (this.listQuery.params = {}), this.getList();
    },

    search() {
      if ("recordDate" in this.listQuery.params) {
        this.listQuery.params.startDate = this.listQuery.params.recordDate[0];
        this.listQuery.params.endDate = this.listQuery.params.recordDate[1];
      }

      console.log("this.listquery:", this.listQuery.params);
      getIndividualDeathRecordByCondition(this.listQuery.params).then((res) => {
        this.list = res.data.data;
      });
    },
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
