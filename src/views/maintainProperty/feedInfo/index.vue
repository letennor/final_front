<template>
  <div class="app-container mainDiv">
    <my-card title="表单测试">
      <div class="filter-container">
        <el-button
          class="filter-item addButton"
          type="primary"
          v-waves
          icon="el-icon-circle-plus-outline"
          @click="add"
          >添加
        </el-button>
      </div>
      <table-list
        :data="list"
        :columns="columns"
        class="dataTable"
      ></table-list>
    </my-card>
  </div>
</template>

<script>
import dragDialog from "@/directive/el-dragDialog";
import tableList from "@/components/table/tableList.vue";
import MyCard from "@/components/MyCard";
import waves from "@/directive/waves";
import { parseTime } from "@/utils";
export default {
  name: "FeedInfo",
  components: {
    tableList,
    MyCard,
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
          text: "证照名称",
          value: "name",
        },
        {
          text: "证照编号",
          value: "code",
        },
        {
          text: "获取日期",
          value: "obtainedDate",
          filter: parseTime,
          filterParams: ["{y}/{m}/{d}"],
        },
        {
          text: "有效期",
          value: "validityPeriod",
          filter: parseTime,
          filterParams: ["{y}/{m}/{d}"],
        },
        {
          text: "发证单位",
          value: "issueUnit",
        },
        {
          text: "证照状态",
          // value: 'status',
          render: (...val) => this.dealLicenseStatus(...val),
        },
        {
          text: "备注",
          value: "remark",
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
    this.list = [
      {
        code: "（沪）JZ安许证字[2021]021333",
        id: 20,
        invalidDay: 15,
        issueUnit: "上海市住房和城乡建设管理委员会",
        name: "安全生产许可证",
        obtainedDate: 1650470400000,
        recordCreateDate: 1666084058274,
        recordUpdateDate: 1668566903697,
        remark: "xxx",
        status: "即将失效",
        validityPeriod: 1669651200000,
      },
      {
        code: "91310115MA1K46CCXP",
        description:
          "类型：有限责任公司（国有控股）\n法定代表人：沈国红\n成立日期：2018年08月27日\n营业期限：2018年08月27日至不约定期限\n住所：中国（上海）自由贸易试验区张衡路200号2幢3层\n\n经营范围：许可项目：建设工程设计；各类工程建设活动；建筑智能化工程施工，工程造价咨询业务。\n一般项目：信息科技、智能科技、建筑工程技术领域内的技术开发、技术服务、技术转让、技术咨询，企业管理咨询，商务信息咨询，计算机软硬件及辅助设备、电子产品、通信设备、机电产品、仪器仪表的设计、研发、销售，数据处理服务，自主基础软件服务，应用软件开发，计算机系统服务，会务服务，系统集成，自有设备租赁，货物进出口，技术进出口，五金产品、金属制品、机械设备、建筑材料、金属结构的销售。",
        id: 21,
        invalidDay: 30,
        issueUnit: "中国（上海）自由贸易试验区市场监督管理局",
        name: "营业执照副本2",
        obtainedDate: 1636992000000,
        recordCreateDate: 1666852976044,
        recordUpdateDate: 1666927236442,
        remark: "1、测试换行\n2、测试换行\n3、测试换行\n4、测试换行",
        status: "有效",
        validityPeriod: 4102329600000,
      },
      {
        code: "91310115MA1K46CCXP",
        description:
          "类型：有限责任公司（国有控股）\n法定代表人：沈国红\n成立日期：2018年08月27日\n营业期限：2018年08月27日至不约定期限\n住所：中国（上海）自由贸易试验区张衡路200号2幢3层\n\n经营范围：许可项目：建设工程设计；各类工程建设活动；建筑智能化工程施工，工程造价咨询业务。\n一般项目：信息科技、智能科技、建筑工程技术领域内的技术开发、技术服务、技术转让、技术咨询，企业管理咨询，商务信息咨询，计算机软硬件及辅助设备、电子产品、通信设备、机电产品、仪器仪表的设计、研发、销售，数据处理服务，自主基础软件服务，应用软件开发，计算机系统服务，会务服务，系统集成，自有设备租赁，货物进出口，技术进出口，五金产品、金属制品、机械设备、建筑材料、金属结构的销售。",
        id: 22,
        invalidDay: 30,
        issueUnit: "中国（上海）自由贸易试验区市场监督管理局",
        name: "营业执照副本2",
        obtainedDate: 1636992000000,
        recordCreateDate: 1666852976044,
        recordUpdateDate: 1666927236442,
        remark: "1、测试换行\n2、测试换行\n3、测试换行\n4、测试换行",
        status: "失效",
        validityPeriod: 4102329600000,
      },
    ];
  },
  methods: {
    collection() {
      console.log("点击收藏");
    },

    getDetail() {
      console.log("点击详情");
    },

    delete() {
      console.log("点击删除");
    },

    update() {
      console.log("点击编辑");
    },

    openFileManagement() {
      console.log("点击打开证件扫描件");
    },

    // 新增
    add() {
      this.dialogStatus = "create";
      this.Form = {
        invalidDay: 30,
        validityPeriod: 4102329600000,
      };
      this.dialogFormVisible = true;
    },

    // 处理证书状态根据不同状态样式改变
    dealLicenseStatus(h, row) {
      const divStyle = "text-align:center";
      let type = "";
      if (row.row.status === "有效") {
        type = "success";
      } else if (row.row.status === "即将失效") {
        type = "warning";
      } else {
        type = "danger";
      }
      return (
        <div style={divStyle}>
          <el-tag type={type} effect={"plain"}>
            {row.row.status}
          </el-tag>
        </div>
      );
    },

    // 表格操作按鈕
    operButton(val) {
      const temp = [
        { class: "iconshuxing", value: "收藏", click: this.collection },
        {
          class: "icondoc",
          value: "征照扫描件",
          click: this.openFileManagement,
        },
        { class: "iconyanjing", value: "详情", click: this.getDetail },
      ];
      if (val.status !== "失效") {
        temp.push({
          class: "iconliuchengpeizhi",
          value: "编辑",
          click: this.update,
        });
      } else {
        temp.push({
          class: "iconshanchu",
          value: "删除",
          click: this.delete,
        });
      }
      return temp;
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
