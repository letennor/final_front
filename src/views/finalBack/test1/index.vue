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
        ><el-button
          type="primary"
          class="addButton"
          v-waves
          @click="openFeedInfo()"
          >添加用料</el-button
        ></el-col
      >
      <el-col :span="3"
        ><el-button
          type="primary"
          class="addButton"
          v-waves
          @click="openEggProduction()"
          >添加产蛋量记录</el-button
        ></el-col
      >
      <el-col :span="3"
        ><el-button
          type="primary"
          class="addButton"
          v-waves
          @click="openAddMedicine()"
          >添加药物</el-button
        ></el-col
      >

      <el-col :span="3"
        ><el-button
          type="primary"
          class="addButton"
          v-waves
          @click="openAddDosingRecord()"
          >添加投药记录</el-button
        ></el-col
      >

      <el-col :span="3"
        ><el-button
          type="primary"
          class="addButton"
          v-waves
          @click="openAddDeathRecord()"
          >添加死亡记录</el-button
        ></el-col
      >

      <el-col :span="3"
        ><el-button
          type="primary"
          class="addButton"
          v-waves
          @click="openAddIndividualDeathRecord()"
          >添加个体死亡记录</el-button
        ></el-col
      >

      <el-col :span="3"
        ><el-button
          type="primary"
          class="addButton"
          v-waves
          @click="openAddGoodsInfo()"
          >添加货物信息</el-button
        ></el-col
      >

      <el-col :span="3"
        ><el-button
          type="primary"
          class="addButton"
          v-waves
          @click="openAddTransportRecord()"
          >添加运输信息</el-button
        ></el-col
      >

      <el-col :span="3"
        ><el-button
          type="primary"
          class="addButton"
          v-waves
          @click="openAddIncomingRecord()"
          >添加进货信息</el-button
        ></el-col
      >
    </el-row>

    <!-- 添加用户 -->
    <AddUserDialog ref="AddUserDialog" />

    <!-- 添加投喂记录 -->
    <AddFeedRecordDialog ref="AddFeedRecordDialog" />

    <!-- 添加用料 -->
    <AddFeedInfoDialog ref="AddFeedInfoDialog" />

    <!-- 添加捡蛋记录 -->
    <AddEggProductionRecordDialog ref="AddEggProductionRecordDialog" />

    <!-- 添加药物 -->
    <AddMedicineInfoDialog ref="AddMedicineInfoDialog" />

    <!-- 添加投药记录 -->
    <AddDosingRecordDialog ref="AddDosingRecordDialog" />

    <!-- 添加死亡记录 -->
    <AddDeathRecordDialog ref="AddDeathRecordDialog" />

    <!-- 添加个体死亡记录 -->
    <AddIndividualDeathRecordDialog ref="AddIndividualDeathRecordDialog" />

    <!-- 添加货物信息 -->
    <AddGoodsInfoDialog ref="AddGoodsInfoDialog" />

    <!-- 添加运输记录 -->
    <AddTransportRecordDialog ref="AddTransportRecordDialog"/>

    <!-- 添加进货记录 -->
    <AddIncomingRecordDialog ref="AddIncomingRecordDialog"/>

  </div>
</template>
<script>
import AddUserDialog from "./component/system/addUserDialog.vue";
import AddFeedRecordDialog from "./component/cultivation/addFeedRecordDialog.vue"
import AddFeedInfoDialog from "./component/maintainInfo/addFeedInfoDialog.vue";
import AddEggProductionRecordDialog from "./component/cultivation/addEggProductionRecordDialog.vue";
import AddMedicineInfoDialog from "./component/maintainInfo/addMedicineInfoDialog.vue";
import AddDosingRecordDialog from "./component/cultivation/addDosingRecordDialog.vue";
import AddDeathRecordDialog from "./component/cultivation/addDeathRecordDialog.vue";
import AddIndividualDeathRecordDialog from "./component/cultivation/addIndividualDeathRecordDialog.vue";
import AddGoodsInfoDialog from "./component/maintainInfo/addGoodsInfoDialog.vue";
import AddTransportRecordDialog from "./component/transport/addTransportRecordDialog.vue"
import AddIncomingRecordDialog from "./component/transport/addIncomingRecordDialog.vue"
export default {
  name: "Test1",
  components: {
    AddUserDialog,
    AddFeedRecordDialog,
    AddFeedInfoDialog,
    AddEggProductionRecordDialog,
    AddMedicineInfoDialog,
    AddDosingRecordDialog,
    AddDeathRecordDialog,
    AddIndividualDeathRecordDialog,
    AddGoodsInfoDialog,
    AddTransportRecordDialog,
    AddIncomingRecordDialog
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    openAddUser() {
      this.$refs.AddUserDialog.addUserVisiblility = true;
    },
    openFeedRecord() {
      this.$refs.AddFeedRecordDialog.addFeedRecordVisiblility = true;
    },
    openFeedInfo() {
      this.$refs.AddFeedInfoDialog.addFeedInfoVisibility = true;
    },
    openEggProduction() {
      this.$refs.AddEggProductionRecordDialog.addEggProductionVisibility = true;
    },
    openAddMedicine() {
      this.$refs.AddMedicineInfoDialog.addMedicineVisibility = true;
    },
    openAddDosingRecord() {
      this.$refs.AddDosingRecordDialog.addDosingRecordVisibility = true;
    },
    openAddDeathRecord() {
      this.$refs.AddDeathRecordDialog.addDeathRecordVisibility = true;
    },
    openAddIndividualDeathRecord() {
      this.$refs.AddIndividualDeathRecordDialog.addIndividualDeathRecordVisibility = true;
    },
    openAddGoodsInfo() {
      this.$refs.AddGoodsInfoDialog.addGoodsInfoVisibility = true;
    },
    openAddTransportRecord(){
      this.$refs.AddTransportRecordDialog.addTransportRecordVisibility = true
    },
    openAddIncomingRecord(){
      this.$refs.AddIncomingRecordDialog.addIncomingRecordVisibility = true
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