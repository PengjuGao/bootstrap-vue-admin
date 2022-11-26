const odiv = document.getElementsByClassName("mydiv")
console.log(odiv[0].innerHTML)
odiv[0].innerHTML = "html"


function A1(){
    a1()
    console.log("A1")
}

function a1(){
    console.log("a1")
}


function A2(){
    console.log("A2")
}

function test(){
    console.log("123123123")
}

//导出方法


//export default {A1,A2,test}

export {
    A1,A2,test
}

