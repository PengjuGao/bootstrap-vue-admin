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
          <b-select  v-model="search.category" :options="initData.categoryList"  text-field="label" value-field="value" @change="categoryChange">
            <b-select-option :value="null">请选择</b-select-option>
          </b-select>
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group label="key名称"   label-cols="2">
          <b-select v-model="search.keyCode" :options="initData.keyList" text-field="label" value-field="value" @change="keyChange">
            <b-select-option :value="null">请选择</b-select-option>
          </b-select>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="value值" label-cols="2" >
          <b-input placeholder="值" v-model="search.keyValue" @keyup="textKeyUp"></b-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="4">
        <b-form-group label="描述" label-cols="2" >
          <b-input placeholder="描述信息" v-model="search.remark" size="sm"></b-input>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group>
          <b-button class="mr-2" size="sm"  variant="info" @click="query">查询</b-button>
          <b-button class="mr-2" size="sm"  variant="primary" type="reset">重置</b-button>
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
    <b-table  striped bordered :fields="initData.fields" :items="tablePage.items"  small
              responsive caption-top :per-page="search.pageSize"
              id="table"
    >
      <template v-slot:head(batchSelect)>
        <b-checkbox v-model="batchSelectStatus"></b-checkbox>
      </template>
      <template v-slot:cell(action)>
        <b-button class="mr-2" size="sm" pill variant="primary">详情</b-button>
        <b-button class="mr-2" size="sm" pill variant="info" @click="$bvModal.show('update')">更新</b-button>
        <b-button class="mr-2" size="sm" pill variant="danger">删除</b-button>

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
<!--    <b-pagination align="right" first-text="首页" prev-text="上一页" next-text="下一页" last-text="末页"
                   v-model="search.pageNo" :total-rows="tablePage.totalNum" per-page="2"
                  @page-click="doPageQuery"
    ></b-pagination>-->
    <b-pagination-nav align="right" first-text="首页" prev-text="上一页" next-text="下一页" last-text="末页"
      :number-of-pages="tablePage.totalPages===0?1:tablePage.totalPages"  v-model="search.pageNo" @change="changePage" :link-gen="linkGen"
      v-show="tablePage.totalPages>0"
    >

    </b-pagination-nav>
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

import commomInitData from "@/admin/initdata/initData";
export default {
  name: "TbDict.vue",
  data(){
    return {

      batchSelectStatus:false,
      selectedArr:[],
      //查询条件的数据
      search:{
        category:null,
        keyCode:null,
        keyValue:"",
        remark:"",
        pageNo:1,
        pageSize:2
      },
      //初始化的数据
      initData:{
        fields:fields,
        categoryList:[],
        keyList:[],
      },
      //表格及分页数据
      tablePage:{
        items:[],
        totalNum:0,
        totalPages:1
      },

    }
  },
  methods:{

    query:function(){
      this.search.pageNo=1;
      console.log("--"+this.search.pageNo+"---query--list---"+JSON.stringify(this.search))
      this.list();
    },
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
      this.$http.post("/api/tbDict/pageList",this.search).then(resp=>{
          //console.log("------resp.data.data==>"+JSON.stringify(resp.data.data))
          console.log("------current.page----is---"+this.search.pageNo)
          this.tablePage.items=resp.data.data.list;
          this.tablePage.totalNum=resp.data.data.total;
          this.tablePage.totalPages=resp.data.data.pages;
      })
    },
    //导出
    dataExport:function (){

    },
    //导入
    dataImport:function (){

    },
    init:function(){
      commomInitData.tempData({pageCode:"tb_dict",initCode:"category"}).then(resp=>{
        console.log("resp====>"+JSON.stringify(resp))
        this.initData.categoryList=resp
      });
      commomInitData.tempData({pageCode:"tb_dict",initCode:"key",category:this.search.category}).then(resp=>{
        console.log("resp====>"+JSON.stringify(resp))
        this.initData.keyList=resp
      })
      this.list();
    },
    categoryChange:function(){
      commomInitData.tempData({pageCode:"tb_dict",initCode:"key",category:this.search.category}).then(resp=>{
        console.log("resp====>"+JSON.stringify(resp))
        this.initData.keyList=resp
        this.search.keyValue=null
      })
    },
    keyChange:function(){
      console.log("do----nothing----")
    },
    textKeyUp:function(){
      console.log("-----"+this.search.keyValue)
    },
    linkGen:function(){
      return "#"
    },
    changePage:function(pageNum){
      //console.log("current page===>"+this.search.pageNo+"=====>target page==>"+pageNum)
      this.search.pageNo=pageNum;
      this.list();
    },

  },
  mounted() {
    this.init();
  },

}
</script>

