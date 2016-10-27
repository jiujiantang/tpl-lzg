/**
 * Created by Administrator on 2016/10/21.
 */
/**
 * 对象声明的方式
 * 字符串到值的映射
 */
function obj(){
    var student = new Student();
    function Student(){
        this.name = "张三";
        this.age = 12;
    }
    var teacher = {
        name:"李四",
        age:18
    }
    var farher = {
        "name":"王五",
        "age":20
    }
    var mother = {"name":"老六",age:21};
    var brother = {};
    Student.prototype.lg = function() {
        console.log(student);
        console.log(teacher);
        console.log(farher);
        console.log(mother);
        console.log((function () {
            return {"name": "小七", age: 22};
        })());
        console.log(brother);
    };
}
/**
 * 响应式布局以及节流阀的原理
 * var timer=null;
 *  window.onresize = function () {
        clearTimeout(timer);
        //防止频繁的调用responsive函数
        timer = setTimeout(responsive, 500);
    };
 */
function responsive() {
    console.log("非常消耗性能的代码");
    if(client().width>960){
        document.body.style.backgroundColor = "red";
        document.body.innerHTML = "computer";
    }else if (client().width>640) {
        document.body.style.backgroundColor = "green";
        document.body.innerHTML = "tablet";
    }else {
        document.body.style.backgroundColor = "yellow";
        document.body.innerHTML = "mobile";
    }
}
function client() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
    };
}
/**
 * 旋转木马的原理
 * console.log(arr.push(0));//从后面加入 返回新数组的长度
 * console.log(arr.pop());//从后面删除 返回被删除的元素
 * console.log(arr.shift());//从前面删除 返回被删除的元素
 * console.log(arr.unshift(0));//从前面加入 返回新数组的长度
 * 01234
 * 12340
 * 23401
 */
function merryGoRound(arr) {
    arr.push(arr.shift());
     return arr;
}
/**
 * 事件对象
 * 注册的事件类型会被浏览器保存，浏览器会根据注册的事件类型来监听相应的事件
 * 当事件被触发就获取该事件的相应参数返回给指定的元素作为参考
 */
function event(){
   document.onclick= function (event) {
       console.log(event);
   }
}
/**
 * return的用法
 * 关键字内任何类型的变量数据或表达式
 * 都可以进行返回，甚至什么都不返回也可以
 * @param a
 * @param b
 * @returns {*}
 */
function ret(a,b){
    return a>b?a:b;
}
/**
 * clientx/YpageX/YscreenX/Y的区别
 * clientx/Y：在窗体的座标
 pageX/Y：在页面的座标
 screenX/Y：在整个电脑屏幕的座标
 */
function getXY(){
    document.onclick= function(event){
        //获取event
        var event =event;
        //clientx/y
        console.log("clientx/y:"+event.clientX +""+ event.clientY);
        //YpageX/y
        console.log("YpageX/y:"+event.pageX +""+ event.pageY);
        //screenX/y
        console.log("screenX/y:"+event.screenX +""+ event.screenY);
    }
}
/**
 * 鼠标在盒子里面的位置
 * @param box
 * @param event
 * @returns {{box_X: number, box_y: number}}
 */
function getBoxXY(box,event){
    var event = event || window.event;
    //获取鼠标在页面上的位置
    var pageX = event.pageX || event.clientX + document.documentElement.scrollLeft;
    var pageY = event.pageY || event.clientY + document.documentElement.scrollTop;
    //鼠标在box里面的位置=pageX/Y - offsetleft/top
    var box_X = pageX - box.offsetLeft;
    var box_y = pageY - box.offsetTop;

    return {box_X:box_X,box_y:box_y};
}
/**
 * 冒泡的的现象
 * @param btn
 */
function maoPao(btn){
    btn.onclick = function(){
        alert("btn被点击了");
    };
    document.onclick = function(){
        alert("document被点击了");
    };
    window.onclick = function(){
        alert("window被点击了");
    };

}
function maoPaoSecond(btn){
    btn.onmousedown = function(){
        alert("btn被点击了");
    };
    document.onclick = function(){
        alert("document被点击了");
    };
    window.onclick = function(){
        alert("window被点击了");
    };
}
/**
 * 密码强度
 */
function regEx(){
    console.log("/\d/.test('1')"+/\d/.test("1"));//数字
    console.log("/\w/.test('a')"+/\w/.test("a"));//单词字符
    console.log("/\w/.test('1')"+/\w/.test("1"));//单词字符
    console.log("/\w/.test('_')"+/\w/.test("_"));//单词字符
    console.log("/\s/.test(' ')"+/\s/.test(" "));//不可见字符
}
function regTel(arr){
    //010-12345678
    //var regTel = /^0\d\d-\d\d\d\d\d\d\d\d$/;
    //var regTel = /^0\d{2}-\d{8}$/;
    //0313-1234567
    var regTel = /^0\d{2,3}-[1-9]\d{6,7}$/;
    if(regTel.test(arr)){
        return true;
    }else{
        return false;
    }
}
/**
 * $内要传入字符串
 * @param arr
 * @param type
 * @returns {*}
 */
function jQclick(arr,type){
    var argument;
    switch(type){
        case "id":
            argument = "#"+arr;
            break;
        case "class":
            argument = "."+arr;
        default:
            break;
    }
    return argument;
}
/**
 * 自定义的$
 * @param arr
 */
//function $(arr) {
//    alert(arr);
//}
