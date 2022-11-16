<template>
  <div class="app-container mainDiv">
    <my-card title="icon查看">
      <table-list
        :data="list"
        :columns="columns"
        :list-loading="listLoading"
        class="dataTable"
        :total="total"
        :page-size="listQuery.pageSize"
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
  name: "IconList",
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
      columns: [
        {
          text: "icon名称",
          value: "iconName",
        },
        {
          text: "icon图标",
          value: "iconPictrue",
          render: (...val) => this.getIconPictrue(...val)
        },
      ],
      listQuery: {
        pageSize: 15,
        currPage: 1,
        params: {},
      },
      total: 0,
      list: [],
    };
  },
  mounted() {
    this.list = [
      {
          iconName: "iconshuxing",
        },
        {
          iconName: "iconmima1",
        },
        {
          iconName: "iconyanzhengmaicon",
        },
        {
          iconName: "iconsanjiaoright",
        },
        {
          iconName: "iconxiangji-copy-copy",
        },
        {
          iconName: "iconpoumian",
        },
        {
          iconName: "iconbiyan",
        },
        {
          iconName: "iconshidianguanli",
        },
        {
          iconName: "iconxiajiantou",
        },
        {
          iconName: "iconmanyou",
        },
        {
          iconName: "iconshuxing",
        },
        {
          iconName: "iconzidingyipoumian",
        },
        {
          iconName: "iconshuliebiao",
        },
        {
          iconName: "iconceliang",
        },
        {
          iconName: "iconXzhou",
        },
        {
          iconName: "iconZzhou",
        },
        {
          iconName: "iconYzhou",
        },
        {
          iconName: "iconcopy1",
        },
        {
          iconName: "iconquxiaoxiugai",
        },
        {
          iconName: "iconcancel",
        },
        {
          iconName: "iconzhize",
        },
        {
          iconName: "iconliuchengguanli",
        },
        {
          iconName: "iconyibanshixiang",
        },
        {
          iconName: "icontupian",
        },
        {
          iconName: "icontxt",
        },
        {
          iconName: "iconxls",
        },
        {
          iconName: "icondoc",
        },
        {
          iconName: "iconliuchengfaqi",
        },
        {
          iconName: "iconliuchengpeizhi",
        },
        {
          iconName: "iconzidingyibiaodan",
        },
        {
          iconName: "iconzibiaodan",
        },
        {
          iconName: "icontodo-list",
        },
        {
          iconName: "iconwodeliucheng",
        },
        {
          iconName: "iconpdf",
        },
        {
          iconName: "iconundefined",
        },
        {
          iconName: "iconbanli",
        },
        {
          iconName: "iconliuchenggenzong",
        },
        {
          iconName: "iconshanchu",
        },
        {
          iconName: "iconcopy",
        },
        {
          iconName: "iconshuaxin",
        },
        {
          iconName: "iconguanbi",
        },
        {
          iconName: "iconqrcode",
        },
        {
          iconName: "iconyonghu1",
        },
        {
          iconName: "iconxiaoxi",
        },
        {
          iconName: "iconyonghu",
        },
        {
          iconName: "iconxinzeng",
        },
        {
          iconName: "iconmima",
        },
        {
          iconName: "iconzidian",
        },
        {
          iconName: "iconxitong",
        },
        {
          iconName: "iconziduanguanli",
        },
        {
          iconName: "iconyaoqingchengyuan",
        },
        {
          iconName: "iconxiugai",
        },
        {
          iconName: "iconmokuai",
        },
        {
          iconName: "iconyanjing",
        },
        {
          iconName: "iconjiaoseguanli",
        },
        {
          iconName: "iconxiazai",
        },
        {
          iconName: "iconquanxianguanli",
        },
        {
          iconName: "iconccgl-xiangmuguanli-3",
        },
        {
          iconName: "iconshebeixinghao",
        },
        {
          iconName: "iconjiegou",
        },
        {
          iconName: "icongongyingshangguanli",
        },
        {
          iconName: "iconshebeileixingguanli",
        },
        {
          iconName: "iconshebei",
        },
        {
          iconName: "iconxiangmu",
        },
        {
          iconName: "iconrizhi",
        },
        {
          iconName: "icongongyingshang",
        },
        {
          iconName: "iconpermisssion-management",
        },
        {
          iconName: "iconzuzhi",
        },
        {
          iconName: "iconzhuye",
        },
        {
          iconName: "iconshujuguanli",
        },
        {
          iconName: "iconxiazai1",
        },
        {
          iconName: "iconbiyanjing",
        },
        {
          iconName: "iconcedian",
        },
        {
          iconName: "iconyonghujiaoseguanli",
        },
        {
          iconName: "iconxiangqing1",
        },
        {
          iconName: "iconziyuan",
        },
        {
          iconName: "iconshanchu1",
        },
        {
          iconName: "iconmoxingzhongxin",
        },
    ]
  },
  methods: {
    getIconPictrue(h, row){
      return (
        <i style="font-size: 25px" class={row.row.iconName + ' iconfont projectColor pointer'} ></i>
      )
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
