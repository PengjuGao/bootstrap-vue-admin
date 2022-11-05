import context from '../../main'
const tokenKey = "customerInfo"
export default {
    //判断是否登录
    isLogin(callback) {
        const item = window.localStorage.getItem(tokenKey);
        if(item !== '' && item !== null && item !== undefined){
            callback(true)
        }else{
            callback(false)
        }
    },
    //客户 登录
     customerLogin(phone,cardIdLast4no,callback){
        const params = new URLSearchParams();
        params.append("username",phone)
        params.append("password",cardIdLast4no)
         context.vue.$http.post("/customer/dealLogin",params).then(resp=>{
            const datum = resp.data;
            if(datum.errorCode !== "200"){
                //登录错误, 展示错误信息
                callback(false)
            }else {
                //正常登录，展示信息并存放数据
               this.clearAll();
                window.localStorage.setItem(tokenKey, JSON.stringify(datum.data[0]));
                callback(true)
            }
        })
    },
    // 是否登陆
    loggedIn() {
        return !!localStorage.customerInfo
    },
    customerLogout(){
        context.vue.$http.get("/customer/logout").then(resp=>{
            const dataum = resp.data;
            if(dataum.errorCode === "200"){
                this.clearAll();
            }
        })
    },
    sysuserLogout(){
        this.clearAll();
        context.$http.get("/api/system/logout");
    },

    clearAll() {
        localStorage.clear();
    },

    //系统用户登录
    sysUserLogin(username,password,callback){
        const params = new URLSearchParams();
        params.append("username",username)
        params.append("password",password)
        context.$http.post("api/system/dealLogin",params).then(resp=>{
            const datum = resp.data;
            if(datum.errorCode !== "200"){
                //登录错误, 展示错误信息
                callback(false)
            }else {
                //正常登录，展示信息并存放数据
                this.clearAll();
                window.localStorage.setItem(tokenKey, JSON.stringify(datum.data));
                callback(true)
            }
        })
    }
}
