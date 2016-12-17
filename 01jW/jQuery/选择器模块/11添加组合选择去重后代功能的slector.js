// 提供接口
var select =(function(){
    ////////////////////////////正则表达式////////////////////////////
    // * 紧跟前面的一个字符或一组字符出现 0 次到多次
    // \s 空白字符, 包括空格, tab, 回车换行等
    // ->匹配"    [native"
    var rnative = /\{\s*\[native/;
    // ^: 必须以 xxx 开头
    // $: 必须以 xxx 结尾
    // g: 修饰符用于执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）
    // -> 匹配两端有空格的字符串
    var rtrim = /^\s+|\s+$/g;
    // ?: 分组但不捕获
    // () 是在分组
    var rbaseselector = /^(?:\#([\w\-]+)|\.([\w\-]+)|(\*)|(\w+))$/;
    ///////////////////////////基本函数//////////////////////////////
    // support: 定义验证对象
    var support = {};
    // 验证querySelectorAll是否可用
    // 凡是在当前浏览器里面可以用的方法都会包含字符串" { [native code] }"
    // 经测试不同对象里面的相同名字的方法是不会影响的
    support.qsa = rnative.test( document.querySelectorAll + '');
    support.getElementsByClassName = rnative.test(document.getElementsByClassName+"");
    support.trim = rnative.test(String.prototype.trim + "");
    support.indexOf = rnative.test(Array.prototype.indexOf + "");
    ///////////////////////////项目基础方法//////////////////////////////
    // 没有兼容问题的getElementsByClassName 方法
    function getByClassName (className, node ) {
        // ? 业务逻辑
        node = node || document;
        // allElem是临时数组,res是返回数组,i是工具变量
        var allElem, res = [],i;
        // 定义检测
        if (support.getElementsByClassName(className)){
            // 通过
            return node.getElementsByClassName();
        } else {
            // getElementsByTagName没有兼容问题
            allElem = node.getElementsByTagName("*");
            for(i=0 ;i<allElem.length; i++){
               if( allElem[i].className === className){
                   // 数组调用push可以push一个元素,也可以push一个数组
                   res.push(allElem[i]);
               }
            }
            return res;
        }
    }
    // 没有兼容问题的trim方法
    // trim 去除字符串两端的空格
    var  myTrim = function() {
        // 定义检测
        if ( support.trim) {
            return str.trim();
        } else {
            // 假设: rtrim代表空格
            // 测试: 错误
            //　rtrim前面定义的正则
            return str.replace(rtrim,'');
        }
    }
    // 自定义indexOf方法
    var myIndexOf = function(array, search, startIndex ){
        // 测试: var startIndex ...与startIndex 的效果是一样的
        var startIndex = startIndex || 0;
        var i;
        // 定义检测
        if ( support.indexOf){
            return array.indexOf(search,startIndex);
        }else {
            for (i = startIndex; i < array.length; i++) {
                // 循环获取相同的元素
                if (array[i] === search) {
                    return i;
                }
            }
            return -1;
        }
    }
    // 去重的方法
    var unique = function(array){
        var resArray = [], i=0;
        // 假设下面这种写法是被允许的
        // 测试: 通过
        for (; i< array.length; i++){
            // 通过自定义indexOf方法来检测是否有相同的元素,resArray是数组,array是被测试的元素
            if (myIndexOf(resArray, array[i]) == -1) {
                resArray.push(array[i]);
            }
        }
        return resArray;
    }
    // 基本的选择器
    function basicSlecter (selector,node){
        // 如果没有传入dom元素,就默认为document元素
        node = node || document;
        var m,res;
        // rbaseselector是用于检测基本选择器的正则表达式
        // 假设?:债这里没有作用 测试:通过 总结: 也许用的场景不对
        if ( m = rbaseselector.exec(selector)){
            if(m[1]){ // id,getElementById没有兼容问题
                res = document.getElementById(m[1]);
                if (res) {
                    // 假设: 这样返回一个数组 测试: 变成一个数组 总结: 数组追快捷的声明
                    return [res];
                }else  {
                    return [];
                }
            }else if( m[2]){ // class
                return getByClassName(m[2],node );
            }else if (m[3]){ // getElementsByTagName没有兼容问题,搜索全部元素
                return node.getElementsByTagName( m[3]);
            }else if (m[4]){ // 标签选择器
                return node.getElementsByTagName( m[4]);
            }
        }
        return [];
    }
    // 后代选择器
    function slect2 (selector,results){
        results = results || [];
        // 最关键的一步,拆封成数组
        var selectors = selector.split(' ');
        // arr是临时数组,node是结果数组,将他们初始化
        var arr = [],node = [document];
        // 外层循环每次都提供一个标签供检索,"div p span"->div,以此类推
        for ( var j=0; j<selectors.length; j++) {
            for (var i =0;i<node.length; i++) {
                // 内层标签搜索node范围内的外层提供的检索标签
                arr.push.apply(arr,basicSlecter(selectors[j],node[i]));
            }
            // node阶段保存检索结果
            node = arr;
            // 重置临时数组
            arr = [];
        }
        // 返回最终结果
        results.push.apply(results, node);
        return results;
    }
    ///////////////////////////整合///////////////////////////
    function select (selector, results ) {
        // 为了链式
        results = results || [];
        var m, temp, selectors, i, subselector;
        // 条件检测
        if ( typeof selector != 'string') return results;
        // 通过检测.检测querySelectorAll能不能使用
        if ( support.qsa) {
            results.push.apply(results,document.querySelectorAll(selector));
        } else  {
            // 自己实现querySelectorAll
            for ( i=0; i <selectors.length; i++) {
                // 用兼容ie678的方法来去掉两端的空格
                subselector = myTrim(selector[i]);
                // 通过处理后的字符串实现 基本选择器 对元素的检索
                if (rbaseselector.test(subselector)) {
                    // 匹配通过,basicSelect进行分组提取
                    results.push.apply(results,basicSlecter(subselector));
                }else {
                    // 后代选择器
                    select2(subselector,results);
                }

            }
        }
        // 返回去重后的结果数组
        return unique(results);
    }
    // 提供接口
    return select;
})();