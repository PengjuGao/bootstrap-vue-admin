<template>
  <div>
    <b-form>
      <b-breadcrumb>
        <b-breadcrumb-item><i class="icon icon-user"/>首页</b-breadcrumb-item>
        <b-breadcrumb-item>字典</b-breadcrumb-item>
      </b-breadcrumb>
      <hr class="mt-0"/>
      <b-row>
        <b-col cols="4">
          <b-form-group label="分类" label-cols="2">
            <b-select v-model="search.category" :options="initData.categoryList" text-field="label" value-field="value"
                      @change="categoryChange">
              <b-select-option :value="null">请选择</b-select-option>
            </b-select>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group label="key名称" label-cols="2">
            <b-select v-model="search.keyCode" :options="initData.keyList" text-field="label" value-field="value"
                      @change="keyChange">
              <b-select-option :value="null">请选择</b-select-option>
            </b-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="value值" label-cols="2">
            <b-input placeholder="值" v-model="search.keyValue" @keyup="textKeyUp"></b-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="4">
          <b-form-group label="描述" label-cols="2">
            <b-input placeholder="描述信息" v-model="search.remark" size="sm"></b-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group>
            <b-button class="mr-2" size="sm" variant="info" @click="query">查询</b-button>
            <b-button class="mr-2" size="sm" variant="primary" @click="search=$options.data().search">重置</b-button>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
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
    <b-table striped bordered :fields="initData.fields" :items="tablePage.items" small
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
        <b-button class="mr-2" size="sm" variant="info" @click="addData=$options.data().addData;$bvModal.show('add')">新增</b-button>
        <b-button class="mr-2" size="sm" variant="danger">批量删除</b-button>
        <b-button class="mr-2" size="sm" variant="info">导出</b-button>
        <b-button class="mr-2" size="sm" variant="primary" @click="$bvModal.show('importFile')">导入</b-button>
      </template>
    </b-table>
    <!--    <b-pagination align="right" first-text="首页" prev-text="上一页" next-text="下一页" last-text="末页"
                       v-model="search.pageNo" :total-rows="tablePage.totalNum" per-page="2"
                      @page-click="doPageQuery"
        ></b-pagination>-->
    <b-row>
      <b-col>
         <label>总条数:{{tablePage.totalNum}}</label>
      </b-col>
      <b-col>
    <b-pagination-nav align="right" first-text="首页" prev-text="上一页" next-text="下一页" last-text="末页"
                      :number-of-pages="tablePage.totalPages===0?1:tablePage.totalPages" v-model="search.pageNo"
                      @change="changePage" :link-gen="linkGen"
                      v-show="tablePage.totalPages>0"
    >
    </b-pagination-nav>
      </b-col>
    </b-row>
    <b-modal id="add" title="新增" ok-title="确定" cancel-title="取消" centered @ok="handleAddOk" scrollable>
      <b-form validated ref="addForm" @submit.stop.prevent="add">
        <b-alert dismissible dismiss-label="x" :show="dataStatus.addFormSummitErrorStatus">数据提交失败，请联系管理员</b-alert>
        <b-form-group label="分类名称" label-cols="3" invalid-feedback="不能为空" >
          <b-input v-model="addData.categoryName" required></b-input>
        </b-form-group>
        <b-form-group label="分类code" label-cols="3" invalid-feedback="不能为空" >
          <b-input v-model="addData.category" required></b-input>
        </b-form-group>
        <b-form-group label="key名称" label-cols="3" invalid-feedback="不能为空" >
          <b-input v-model="addData.keyName" required></b-input>
        </b-form-group>
        <b-form-group label="key code" label-cols="3" invalid-feedback="不能为空" >
          <b-input v-model="addData.keyCode" required></b-input>
        </b-form-group>
        <b-form-group label="key 值" label-cols="3" invalid-feedback="不能为空" >
          <b-input v-model="addData.keyValue" required></b-input>
        </b-form-group>
        <b-form-group label="描述" label-cols="3" invalid-feedback="不能为空" >
          <b-textarea v-model="addData.remark" required></b-textarea>
        </b-form-group>
      </b-form>
    </b-modal>

  </div>
</template>

<script>

const fields = [
  {key: "batchSelect", label: "多选"},
  {key: "id", label: "编号", sortable: true},
  {key: "category", label: "分类", sortable: true},
  {key: "categoryName", label: "分类名称", sortable: false},
  {key: "keyCode", label: "key码值", sortable: true},
  {key: "keyName", label: "key名称", sortable: true},
  {key: "keyValue", label: "value值", sortable: true},
  {key: "remark", label: "描述信息", sortable: true},
  {key: "action", label: "操作"}
];

import commomInitData from "@/admin/initdata/initData";

export default {
  name: "TbDict.vue",
  data() {
    return {

      batchSelectStatus: false,
      selectedArr: [],
      //查询条件的数据
      search: {
        category: null,
        keyCode: null,
        keyValue: "",
        remark: "",
        pageNo: 1,
        pageSize: 5
      },
      //初始化的数据
      initData: {
        fields: fields,
        categoryList: [],
        keyList: [],
      },
      //表格及分页数据
      tablePage: {
        items: [],
        totalNum: 0,
        totalPages: 1
      },
      //新增数据
      addData: {
        categoryName: null,
        category: null,
        keyCode: null,
        keyName: null,
        keyValue: null,
        remark: null,
      },
      //更新数据:
      updateData:{
        id:null,
        categoryName: null,
        category: null,
        keyCode: null,
        keyName: null,
        keyValue: null,
        remark: null,
      },
      dataStatus: {
        addFormSummitErrorStatus: false
      }

    }
  },
  methods: {

    query: function () {
      this.search.pageNo = 1;
      console.log("--" + this.search.pageNo + "---query--list---" + JSON.stringify(this.search))
      this.list();
    },
    handleAddOk: function (bvmodalEvent) {
      //阻止弹框的关闭操作
      bvmodalEvent.preventDefault();
      //触发提交
      this.add()
    },
    //增
    add: function () {
      if (!this.checkAddForm()) {
        return;
      }
      console.log("-----------代码提交完成")
      /*this.$nextTick(()=>{
        this.$bvModal.hide("add");
      })*/

      this.$http.post("/api/tbDict/add", this.addData).then(resp => {
        const result = resp.data.data;
        if (result.errorCode !== '200') {
          this.dataStatus.addFormSummitErrorStatus = true
        } else {
          this.$nextTick(() => {
            this.$bvModal.hide("add");
          })
        }
      })

      let xx = new Promise(resolve => {
        return resolve("123");
      });
      xx.then(resp => {
        console.log(JSON.stringify(resp))
        this.$nextTick(() => {
          this.$bvModal.hide("add");
        })
      })
    },
    //新增表单校验
    checkAddForm: function () {
      return this.$refs.addForm.checkValidity();
    },
    //删
    del: function () {

    },
    //改
    update: function () {

    },
    //查
    list: function () {
      this.$http.post("/api/tbDict/pageList", this.search).then(resp => {
        //console.log("------resp.data.data==>"+JSON.stringify(resp.data.data))
        console.log("------current.page----is---" + this.search.pageNo)
        this.tablePage.items = resp.data.data.list;
        this.tablePage.totalNum = resp.data.data.total;
        this.tablePage.totalPages = resp.data.data.pages;
      })
    },
    //导出
    dataExport: function () {

    },
    //导入
    dataImport: function () {

    },
    init: function () {
      commomInitData.tempData({pageCode: "tb_dict", initCode: "category"}).then(resp => {
        console.log("resp====>" + JSON.stringify(resp))
        this.initData.categoryList = resp
      });
      commomInitData.tempData({pageCode: "tb_dict", initCode: "key", category: this.search.category}).then(resp => {
        console.log("resp====>" + JSON.stringify(resp))
        this.initData.keyList = resp
      })
      this.list();
    },
    categoryChange: function () {
      commomInitData.tempData({pageCode: "tb_dict", initCode: "key", category: this.search.category}).then(resp => {
        console.log("resp====>" + JSON.stringify(resp))
        this.initData.keyList = resp
        this.search.keyValue = null
        this.search.keyCode =null
      })
    },
    keyChange: function () {
      console.log("do----nothing----")
    },
    textKeyUp: function () {
      console.log("-----" + this.search.keyValue)
    },
    linkGen: function () {
      return "#"
    },
    changePage: function (pageNum) {
      //console.log("current page===>"+this.search.pageNo+"=====>target page==>"+pageNum)
      this.search.pageNo = pageNum;
      this.list();
    },

  },
  mounted() {
    this.init();
  },

}
</script>

