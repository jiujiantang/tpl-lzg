/**
 * Created by Administrator on 2016/10/21.
 */
/**
 * client
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
 * eventUtil
 * @type {{}}
 */
var eventUtil =  {
    /**
     * getEvent
     * 获取事件对象
     * @param event
     * @returns {*|Event}
     */
    getEvent : function(event){
      return  event || window.event;
    },
    /**
     * getEvent_target
     * 获取事件的源头
     * @param event
     * @returns {EventTarget|Object}
     */
    getEvent_target : function(event){
        var  event = event || window.event;
        return  event.target || event.srcElement;
    },
    /**
     * getPageXY
     * 获取
     * @param event
     * @returns {{pageX: (*|Number), pageY: (*|Number)}}
     */
    getPageXY : function(event){
        return {
            pageX : event.pageX || event.clientX + document.documentElement.scrollLeft,
            pageY : event.pageY || event.clientY + document.documentElement.scrollTop
        };
    },
    /**
     * stopPropagation
     * @param event
     */
    stopPropagation : function (event) {
        if(event.stopPropagation){
            event.stopPropagation
        }else {
            event.cancelBubble = true;
        }
    }
};