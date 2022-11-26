import context from "@/main";


/*const initData = async function (param) {
     let result = await context.$http.post("/api/common/init/data", param);
     console.log("----init---"+JSON.stringify(result))
    return result.data.data;
};*/

const initData =  function (param) {
     return Promise.resolve(context.$http.post("/api/common/init/data", param));

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
