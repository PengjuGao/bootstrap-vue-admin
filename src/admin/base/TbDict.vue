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
          <b-select value="1" :options="options1">
          </b-select>
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group label="key名称"   label-cols="2">
          <b-select value="1" :options="options2" text-field="text11" value-field="value11">
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
          <b-button class="mr-2" size="sm"  variant="primary">重置</b-button>
        </b-form-group>
      </b-col>
    </b-row>
    <b-modal id="importFile">
    <b-row>
      <b-col>
    <b-file browse-text="选择文件" drop-placeholder="dropplaceholder" placeholder="请选择文件"></b-file>
      </b-col>
      <b-col>
        <b-button>提交</b-button>
      </b-col>
    </b-row>
    </b-modal>
    <b-table  striped bordered :fields="fields" :items="items"  small responsive caption-top>
      <template v-slot:head(batchSelect)>
        <b-checkbox v-model="batchSelectStatus"></b-checkbox>
      </template>
      <template v-slot:cell(action)>
        <b-button class="mr-2" size="sm" pill variant="danger">删</b-button>
        <b-button class="mr-2" size="sm" pill variant="info" @click="$bvModal.show('update')">改</b-button>
        <b-button class="mr-2" size="sm" pill variant="primary">查</b-button>
      </template>
      <template v-slot:cell(batchSelect)="row">
        <b-checkbox v-model="selectedArr[row.index]"></b-checkbox>
      </template>
      <template v-slot:table-caption>
        <b-button class="mr-2" size="sm"  variant="info" @click="$bvModal.show('add')">新增</b-button>
        <b-button class="mr-2" size="sm"  variant="danger">批量删除</b-button>
        <b-button class="mr-2" size="sm"  variant="info">导出</b-button>
        <b-button class="mr-2" size="sm"  variant="primary" @click="$bvModal.show('importFile')">导入</b-button>
      </template>
    </b-table>
    <b-pagination align="right"></b-pagination>
    <b-modal id="add" title="新增" ok-title="确定" cancel-title="取消" centered @ok="add()">
      <b-form-group label="分类" label-cols="3">
        <b-input></b-input>
      </b-form-group>
      <b-form-group label="key" label-cols="3">
        <b-input></b-input>
      </b-form-group>
      <b-form-group label="value" label-cols="3">
        <b-input></b-input>
      </b-form-group>
      <b-form-group label="描述" label-cols="3">
        <b-textarea></b-textarea>
      </b-form-group>
    </b-modal>
  </b-form>
</template>

<script>

const fields = [
  {key: "batchSelect", label: "多选"},
  {key: "id", label: "编号", sortable: true},
  {key: "category", label: "分类", sortable: true},
  {key: "categoryName", label: "分类名称", sortable: false},
  {key: "key", label: "key码值", sortable: true},
  {key: "keyName", label: "key名称", sortable: true},
  {key: "value", label: "value值", sortable: true},
  {key: "remark", label: "描述信息", sortable: true},
  {key: "action", label: "操作"}
];
const items = [
  {id: 1, category: "robot", categoryName: '机器人', key: "clean",keyName:"打扫",value:"小米打扫机器人",remark:"生产日期：近期，无线充电"},
  {id: 2, category: "robot", categoryName: '机器人', key: "clean",keyName:"打扫",value:"小米打扫机器人",remark:"生产日期：近期，无线充电"},
  {id: 3, category: "book", categoryName: '书籍', key: "life",keyName:"生活",value:"日常百科全书",remark:"烹饪，医疗，健康"},
  {id: 4, category: "book", categoryName: '书籍', key: "math",keyName:"数学",value:"高等数学第三册",remark:"初三年纪高等数学"},
  {id: 5, category: "robot", categoryName: '机器人', key: "clean",keyName:"打扫",value:"小米打扫机器人",remark:"生产日期：近期，无线充电"},

];

const options1  = [
    {text:"hello",value:1},
    {text:"hello22",value:2},
    {text:"hello33",value:3},
]

const options2  = [
  {text11:"hello",value11:1},
  {text11:"hello22",value11:2},
  {text11:"hello33",value11:3},
]

export default {
  name: "TbDict.vue",
  data(){
    return {
      fields:fields,
      items:items,
      options1:options1,
      options2:options2,
      batchSelectStatus:false,
      selectedArr:[]
    }
  },
  methods:{
    //增
    add:function(){
      this.$bvModal.msgBoxOk("are you ok?")
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

    },
    initData:function(){
      this.$http.post("/common/init/data",{compoment:"dict",category:"select"}).then(resp=>{
        this.fields = resp.data.data();
      })
    }
  },
  mounted() {
    this.initData();
  },

}
</script>

