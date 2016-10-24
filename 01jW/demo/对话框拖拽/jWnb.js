/**
 * Created by Administrator on 2016/10/21.
 */
/**
 * 获取网页可视区域宽高的兼容性写法
 * 即能够兼容所有的浏览器 还可以兼容怪异模式
 * function client() {
    //获取可视区域宽度
    var clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
    var clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
    //声明对象
    var o ={};
    //设置属性
    o.clientWidth = clientWidth;
    o.clientHeight = clientHeight;
    //返回对象
    return o;
}
 */
function client() {
    return {
        clientWidth : window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        clientHeight : window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
    };
}
/**
 * 获取事件对象的兼容写法
 */
function getEvent(event){
    var  event = event || window.event;
    return event;
}
/**
 * 获取pageX和pageY的兼容性写法(页面上的位置)
 */
function getPageXY(event){
    var  event = event || window.event;
    return {
        pageX : event.pageX || event.clientX + document.documentElement.scrollLeft,
        pageY : event.pageY || event.clientY + document.documentElement.scrollTop
    };
}