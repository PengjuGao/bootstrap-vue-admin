import context from "@/main";

const initData = function (param) {
     context.$http.post("/api/common/init/data", param).then(resp => {
        return resp.data.data;
    })
};

const tempData = async function(param){
    return new Promise(((resolve, reject) => {
        context.$http.post("/api/common/init/data", param).then(resp => {
             let obj = resp.data.data;
             if(obj){
                 console.log("------success");
                 resolve(obj)
             }else{
                 console.log("------error")
                 reject("error")
             }
        })
    }))
}

export default {initData,tempData}
