import Vue from "vue";

// app
import App from "./App.vue";

// router
import router from "./routers/router.js";

// bootstrap-vue
import BootstrapVue from "bootstrap-vue";

Vue.use(BootstrapVue);
//axios
import axios from 'axios'
axios.interceptors.request.use(
    config=>{
      const token = window.localStorage.getItem("customerInfo");
      if(token){
        config.headers.token = `${token}`;
      }
      return config;
    },err =>{
      return Promise.reject(err);
    }
)
axios.interceptors.response.use(
    response => {
       if(response.data.errorCode === "-2222"){
            router.replace(adminLoginRouter)
        } else if (response.data.errorCode !== "200") {
            this.$bvModal.msgBoxOk("发生错误:"+JSON.stringify(response.data),{title:"业务错误"})
        }
        return response;
    },
    error => {
        if (error.response) {
            this.$bvModal.msgBoxConfirm("系统错误，请联系管理员",{
                title:"错误提示"
            })
        }
        // 返回接口返回的错误信息
        return Promise.reject(error.response.data)
    }
)

Vue.prototype.$http=axios

// bootstrap-vue css
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {adminLoginRouter} from "@/routers/admin/login";

// vue config
Vue.config.productionTip = false; // 设置为 false 以阻止 vue 在启动时生成生产提示。(默认值：true)
// Vue.config.devtools = false; // 配置是否允许 vue-devtools 检查代码。(默认值：true)
// Vue.config.silent = true;// 取消 Vue 所有的日志与警告。(默认值：false)

// render
var context = new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

export  default  context
