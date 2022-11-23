<template>
  <div>
    <el-row>
      <el-col :span="3"
        ><el-button
          type="primary"
          class="addButton"
          v-waves
          @click="openAddUser()"
          >添加用户</el-button
        ></el-col
      >
      <el-col :span="3"
        ><el-button
          type="primary"
          class="addButton"
          v-waves
          @click="openFeedRecord()"
          >添加投喂记录</el-button
        ></el-col
      >
      <el-col :span="3"
        ><el-button type="primary" class="addButton" v-waves @click="openFeedInfo()"
          >添加用料</el-button
        ></el-col
      >
      <el-col :span="3"
        ><el-button type="primary" class="addButton" v-waves @click="openEggProduction()"
          >添加产蛋量记录</el-button
        ></el-col
      >
      <el-col :span="3"
        ><el-button type="primary" class="addButton" v-waves @click="openAddMedicine()"
          >添加药物</el-button
        ></el-col
      >

      <el-col :span="3"
        ><el-button type="primary" class="addButton" v-waves
          >添加个人基本信息</el-button
        ></el-col
      >

      
    </el-row>

    <!-- 添加用户 -->
    <AddUserDialog ref="AddUserDialog"/>

    <!-- 添加投喂记录 -->
    <AddFeedRecordDialog ref="AddFeedRecordDialog"/>

    <!-- 添加用料 -->
    <AddFeedInfoDialog ref="AddFeedInfoDialog"/>

    <!-- 添加捡蛋记录 -->
    <AddEggProductionRecordDialog ref="AddEggProductionRecordDialog"/>

    <!-- 添加药物 -->
    <AddMedicineInfoDialog ref="AddMedicineInfoDialog"/>

  </div>
</template>
<script>
import AddUserDialog from "./component/addUserDialog.vue"
import AddFeedRecordDialog from "./component/addFeedRecordDialog.vue"
import AddFeedInfoDialog from "./component/addFeedInfoDialog.vue"
import AddEggProductionRecordDialog from './component/addEggProductionRecordDialog.vue'
import AddMedicineInfoDialog from './component/addMedicineInfoDialog.vue'
export default {
  name: "Test1",
  components:{
    AddUserDialog,
    AddFeedRecordDialog,
    AddFeedInfoDialog,
    AddEggProductionRecordDialog,
    AddMedicineInfoDialog
  },
  data() {
    return {

    };
  },
  mounted() {},
  methods: {
    openAddUser(){
      this.$refs.AddUserDialog.addUserVisiblility = true
    },
    openFeedRecord(){
      this.$refs.AddFeedRecordDialog.addFeedRecordVisiblility = true
    },
    openFeedInfo(){
      this.$refs.AddFeedInfoDialog.addFeedInfoVisibility = true
    },
    openEggProduction(){
      this.$refs.AddEggProductionRecordDialog.addEggProductionVisibility = true
    },
    openAddMedicine(){
      this.$refs.AddMedicineInfoDialog.addMedicineVisibility = true
    }
  },

};
</script>

<style lang="less">
// 添加颜色类
.el-radio__input.is-checked + .el-radio__label {
  color: #2c68ff !important;
}
.el-radio__input.is-checked .el-radio__inner {
  background: #2c68ff !important;
  border-color: #2c68ff !important;
}
</style>