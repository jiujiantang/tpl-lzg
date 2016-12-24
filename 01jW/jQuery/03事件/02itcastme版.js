// 传window的作用:便于压缩，避免到全局中寻找window
// 某浏览器不支持undefined，不传undefined，即使不支持undefined,方法体内undefined也为空，作判断时为false
(function(window,undefined){
    // push,slice都是数组的方法 这样写数组声明一次可以节省内存
    var arr = [],
        push = arr.push,
        slice = arr.slice;
    // try(error)cath(solution)
    // 创建一个新元素，挂载标签，生成伪数组，检测数组的push方法在该浏览器中是否可用
    // 若不能用，重写push
    try {
        var div = document.createElement("div");
        div.innerHTML = "<p>123</p>";
        var arr = [];
        push.apply(arr,div.getElementsByTagName("p"));
    }catch(e){
        push = {
            apply:function(array1,array2){
                for(var i= 0; i<array2.length;i++){
                    array1[array1.length] = array2[i];
                }
            }
        }
    }

    //////////////////////////////////
    // 入口函数 创建init实例对象 用户创建时可以省略new关键字
    function itcast(html){
        return new itcast.fn.init(html);
    }
    // 入口函数的原型
    // selector:保存选则器字符串的属性
    // type: 用来判断对象是不是itcast对象
    // length: 表明itcast对象有长度是伪数组
    itcast.fn = itcast.prototype = {
        selector   :"",
        type       : "itcast",
        constructor: itcast,
        length     : 0,

        init: function(html){
            // 乱传直接跳出函数
            if (html = null || html ===''){
                return;
            }
            // 1. 传入为函数时
            //// window.onload是一个事件当文档(包括js脚本)加载完成之后就会触发该事件
            //// 预解析:
            //// functon load()
            //function load(html) {
            //    // 第一次的时候onload不是方法
            //    // 第二次onload已经被方法赋值，oldFn为onload第一次被赋值的方法
            //    // 第三次oldFn保存了上一次的onload，里面有第一次传入的匿名函数的声明和第二次匿名的声明
            //    var oldFn = window.onload ;
            //    // 第二次进入循环，这样就解决了 window.onload = html赋值覆盖的问题
            //    // 进入if代码块后，window.onload被覆盖，onload里面声明了第二次传入的匿名方法
            //    // 此时文档还没有加载完，继续往后执行
            //    // window.onload第三次被赋值，声明了oldFn里面保存的两个匿名函数，有加载了第三个匿名函数
            //    // 以此类推
            //    // 文档全部加载完以后，执行onload绑定的方法的执行
            //    if( typeof oldFn === 'function')
            //    {
            //        window.onload = function(){
            //            oldFn();
            //            html();
            //        }
            //    }
            //    else
            //    {
            //        // 第一次将方法绑定到onload事件上
            //        window.onload = html;
            //    }
            //}
            //load(function(){
            //    console.log("xixi");
            //});
            //load(function(){
            //    console.log("haha");
            //});
            //load(function(){
            //    console.log("hehe");
            ////////////////////////////////////////////////////////////////////
            if(typeof  html === 'function'){
                var oldFn = window.onload;

                if(typeof oldFn ==='function'){
                    oldFn();
                    html();
                } else {
                    window.onload = html;
                }
            }

            // 2. 传入为字符串时
            // 字符串有两种形式，一种是标签字符串，一种是选择器字符串
            // isString是自定义工具方法
            if (itcast.isString(html)){
                // 判断是不时一个标签字符串
                if(/^</.test(html)){
                    // 自定义parseTMLH函数转化为dom数组并添加到new出来的新对象当中
                    push.apply(this,parseHTML(html));
                }
                // 选择器字符串 所以要调用选择器模块
                else {
                    // 新实例调用选择器模块
                    push.apply(this,itcast.select(html));
                    // 将选择器字符串的值赋值到新的itcast对象的selector属性中
                    this.selector = html;
                }
            }

            // 3. 传入的为itcast对象
            // 每个新实例都有一个type属性标志它是itcast对象
            if (html.type == "itcast"){
                // 由于itcast对象是伪数组，对新实例做一个数组的追加
                push.apply(this,html);
                // 将旧itcast对象的selector属性赋值给新实例
                this.selector = html.selector;
                // 将旧itcast对象的events属性赋值给新实例
                this.events = html.events;
            }

            // 4. 传入的为dom对象
            // 有nodeType属性的就是dom元素
            // nodeType为1表示一个 元素 节点，例如 <p> 和 <div>，不包含dom数组
            // 里面为1时不为0，判断返回true
            //////////////////////////demo////////////////////////
            //var dom = document.getElementsByTagName("li");
            //console.log([dom]);// 打印了一个数组，数组里面保存伪数组，是一个二维数组
            //console.log(dom);// 直接打印了伪数组
            //console.log(dom.nodeType);// 打印undefined
            //console.log(dom[0].nodeType);// 打印1
            //if(1){
            //    console.log(1);// 打印1
            //}
            // 结论： 由于判断条件，传入的必须是单个dom元素节点
            if (html.nodeType) {
                // 如果目的是为了将传入的dom对象，将其放在this对象的第0个元素上，就不用加【】
                // push.apply(this,[html]); => push.apply(this,html);
                push.apply(this,html);
            }
        }
    };

    //////////////////////////////////
    // 将itcast的原型属性赋值给init的原型属性
    itcast.fn.init.prototype = itcast.fn;

    //////////////////////////////////
    // 对外提供接口
    window.itcast = window.I = itcast;

    //////////////////////////////////
    // 混入继承的基础
    itcast.extend = itcast.fn.extend = function(obj){
        for( var k in obj){
            this[k] = obj[k];
        }
    }

    //////////////////////////////////
    // 标签字符串转换为DOM数组
    function parseHTML(html){
        // 创建一个div节点
        var div = document.createElement("div");
        // 将标签字符串设置为新创建节点的子节点
        div.innerHTML = html;
        // 创建装子节点的篮子
        var res = [];
        // 循环遍历div的子节点
        for(var i=0;i<div.childNodes.length;i++){
            res.push(div.childNodes[i]);
        }
        return res;
    }

    //////////////////////////////////
    //工具函数 常用的会作为静态方法添加
    itcast.extend({
        isString : function(str){return(typeof str === "string"); },
        isFunction : function(fn){return(typeof fn  === "function"); },
        // !! 数字转boolean类型
        isDom : function(dom){return(dom.nodeType === 1); },
        isObject: function(obj){return(typeof obj === "object"); },
        // 获取dom元素的样式的name 兼容ie处理
        getStyle:function(dom,name){
            if(dom.currentStyle){
                return dom.currentStyle[name];
            }else{
                return window.getComputedStyle(dom)[name];
            }
        }
    });

    //////////////////////////////////
    //原型方法扩展

    itcast.fn.extend({
        //var toArray = function(h){
        //
        //    return [].slice.call(h,0);
        //}
        //var lis = document.getElementsByTagName("li");
        //console.log(lis);//HTMLCollection[5]
        //console.log(toArray(lis));//Array[5]
        //结论： 将HTMLCollection[5]转换为Array数组
        toArray:function(){
            return slice.call(this,0);
        },
        //通过下标获取元素
        //伪数组和数组都可以通过下标来获取元素
        //但是获取的元素都是dom元素
        get:function(index){
            if(index === undefined){
                return this.toArray();
            }
            return this[index];
        },
        //通过下标获取元素，将获取的dom元素转化为itcast对象
        eq:function(index){
            var dom;
            if(index >= 0){
                dom = this.get(index);
            }else{
                dom = this.get(this.length + index);
            }
            //返回有两种写法
            return itcast(dom);
            //或则
            //return this.constructor(dom);
        }
    });

    //////////////////////////////////
    //静态方法扩展
    itcast.extend({

    });
})(window);
