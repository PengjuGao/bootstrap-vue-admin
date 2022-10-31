<template>
  <b-form>
    <b-breadcrumb>
      <b-breadcrumb-item><i class="icon icon-user"/>首页</b-breadcrumb-item>
      <b-breadcrumb-item>字典</b-breadcrumb-item>
    </b-breadcrumb>
    <hr class="mt-0"/>
    <b-row>
      <b-col cols="4">
        <b-form-group label="分类"   label-cols="2">
          <b-select value="1">
             <b-select-option value="1">xx</b-select-option>
             <b-select-option value="2">xx1</b-select-option>
          </b-select>
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group label="key名称"   label-cols="2">
          <b-select value="1">
            <b-select-option value="1">xx</b-select-option>
            <b-select-option value="2">xx1</b-select-option>
          </b-select>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="value值" label-cols="2" >
          <b-input placeholder="值"></b-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="4">
        <b-form-group label="描述" label-cols="2" >
          <b-input placeholder="描述信息" size="sm"></b-input>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group>
          <b-button class="mr-2" size="sm"  variant="info">查询</b-button>
          <b-button class="mr-2" size="sm"  variant="info">重置</b-button>
        </b-form-group>
      </b-col>
    </b-row>
    <b-table  striped bordered :fields="fields" :items="items" small responsive caption-top>
      <template v-slot:cell(action)>
        <b-button class="mr-2" size="sm" pill variant="danger">删</b-button>
        <b-button class="mr-2" size="sm" pill variant="info">改</b-button>
        <b-button class="mr-2" size="sm" pill variant="primary">查</b-button>
      </template>
      <template v-slot:cell(batchSelect)>
        <b-checkbox></b-checkbox>
      </template>
      <template v-slot:table-caption>
        <b-button class="mr-2" size="sm"  variant="info">新增</b-button>
        <b-button class="mr-2" size="sm"  variant="info">批量删除</b-button>
        <b-button class="mr-2" size="sm"  variant="info">导出</b-button>
        <b-button class="mr-2" size="sm"  variant="info">导入</b-button>
      </template>
    </b-table>
    <b-pagination align="right"></b-pagination>
    <ItemAdd></ItemAdd>
    <ItemUpdate></ItemUpdate>
  </b-form>
</template>

<script>

const fields = [
  {key: "batchSelect", label: "多选"},
  {key: "username", label: "用户名", sortable: true},
  {key: "age", label: "年龄", sortable: true},
  {key: "email", label: "电子邮箱", sortable: false},
  {key: "register_date", label: "注册时间", sortable: true},
  {key: "action", label: "操作"}
];
const items = [
  {username: "张三", age: 15, email: 'zhangsan@admin.com', register_date: "2019-01-01"},
  {username: "李四", age: 25, email: 'lisi@admin.com', register_date: "2019-01-02"},
  {username: "小明", age: 18, email: 'xiaoming@admin.com', register_date: "2019-01-03"},
  {username: "小强", age: 28, email: 'xiaoqiang@admin.com', register_date: "2019-01-08"},
  {username: "小梅", age: 20, email: 'xiaomei@admin.com', register_date: "2019-01-09"}
];
import ItemAdd from "@/admin/templates/ItemAdd";
import ItemUpdate from "@/admin/templates/ItemUpdate";
export default {
  name: "TbDict.vue",
  data(){
    return {
      fields:fields,
      items:items
    }
  },
  methods:{
    //增
    add:function(){

    },
    //删
    del:function (){

    },
    //改
    update:function (){

    },
    //查
    list:function (){

    },
    //导出
    dataExport:function (){

    },
    //导入
    dataImport:function (){

    }
  },
  mounted() {

  },
  components:{
    ItemAdd,
    ItemUpdate
  }
}
</script>

