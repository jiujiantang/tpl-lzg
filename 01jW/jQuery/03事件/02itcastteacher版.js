

(function(window,undefined){
    var arr = [],
        push = arr.push,
        slice = arr.slice;
    //try里面的代码如果能够正常执行，代表浏览器支持伪数组的push.apply
    //try里面的代码如果发生异常，代表浏览器不支持伪数组的push.apply
    //这样就会进入到catch中，自己定义实现push的apply方法
    try{
        var div = document.createElement("div");
        div.innerHTML = "<p>123</p>";
        var arr = [];
        push.apply(arr,div.getElementsByTagName("p") );
    }catch(e){
        push = {
            apply:function(array1,array2){
                for(var i = 0;i<array2.length;i++)
                {
                    array1[ array1.length ] = array2[i];
                }
            }
        }
    }


    //入口函数itcast，用户调用该函数来使用功能
    function itcast(html)
    {	//返回一个init构造函数创建的实例对象
        return new itcast.fn.init(html);
    }
    //itcast函数的原型
    itcast.fn = itcast.prototype = {
        //用来保存选择器字符串
        selector:"",
        //用来判断对象是不是itcast对象
        type:"itcast",
        constructor:itcast,
        length:0,
        //构造函数
        // itcast(fn);
        // itcast(fn2);
        init:function(html){
            //判断是否为空
            if(html == null ||  html ==='')
            {
                return;
            }
            //判断html是不是一个函数  itcast(function(){ alert(123);})
            if(typeof  html === 'function')
            {
                //将onload中的内容赋值给oldFn
                var oldFn = window.onload ;
                //判断oldFn是一个函数的情况下，代表onload之前已经绑定了函数，
                //那么现在就要做事件追加
                if( typeof oldFn === 'function')
                {
                    //给onload绑定一个匿名函数做事件处理
                    window.onload = function(){
                        //在匿名函数中先调用oldFn函数（onload之前绑定的函数）
                        oldFn();
                        //然后再调用html函数（执行后面追加的函数）
                        html();
                    }
                }
                //否则onload之前没有绑定函数，就把html设置为load事件的处理函数
                else
                {
                    window.onload = html;
                }
            }
            //判断html是不是一个字符串
            if( itcast.isString(html) )
            {	//判断是不是一个标签字符串 "<div></div>"
                if(/^</.test(html))
                {
                    //将parseHTML转换出来的dom数组添加到this对象(new出来的新对象)中
                    push.apply(this,parseHTML(html ) );
                }
                //否则就是选择器字符串，  "#dv"  'div'
                else
                {
                    //将选择器字符串对应的元素找出来添加到this对象中
                    //itcast.select = select;
                    // console.log(itcast);
                    push.apply(this,itcast.select( html ) );
                    this.selector = html;
                }
            }
            //判断html是不是一个itcast对象
            if(html.type == 'itcast')
            {
                push.apply(this,html);
                this.selector = html.selector;
            }
            //判断html是不是一个dom对象，如果是，就包装成一个itcast对象并返回
            if( html.nodeType )
            {
                //html此时就是传入的dom对象，将其放在this对象的第0个元素上
                push.apply(this,[ html ]);

                // this[0] = html;
                // this.length = 1;
            }
            //为创建出来的itcast对象添加events属性
            this.events = {};
        }
    }

    itcast.extend = itcast.fn.extend = function(obj){
        for( var k in obj )
        {
            this[ k ] = obj[ k ];
        }
    }

    //将itcast函数的原型与init函数的原型设置成同一个对象
    //此时，itcast的原型有什么方法，init的原型也会有什么方法，
    //创建出来的对象也能拥有这些方法
    itcast.fn.init.prototype = itcast.fn;
    //对外公开itcast，I的接口 （window对象的成员）
    window.itcast = window.I = itcast;
    //为什么我要把select引擎赋值给itcast函数的select成员呢？
    //itcast.select = select;

    //工具方法,那么我们可能经常要使用这些方法来进行判断。。。。。的操作
    //这些经常要使用到的方法我们一般就会添加到itcast函数上
    itcast.extend({
        isString : function(str){ return (typeof str === "string");},
        isFunction:function(fn){ return (typeof str === "function");},
        isDOM:function(dom){return !!(dom.nodeType);}

    })

    //将html标签字符串转换为DOM数组
    //比如说参数html  ：  "<div></div><p></p>";
    //转换之后的结果：  [div元素,p元素]
    function parseHTML(html)
    {
        //创建一个div节点
        var div = document.createElement("div");
        //设置div节点的html内容  <div> <div></div><p></p> </div>
        div.innerHTML = html;

        var res = [];
        //循环遍历div的子节点
        for(var i = 0;i<div.childNodes.length;i++)
        {
            //把子节点加入到数组中
            res.push(div.childNodes[i]);
        }
        //返回拥有所有子节点的dom数组
        return res;
    }

    //实例对象操作dom的方法
    itcast.fn.extend({
        //itcast实例对象是一个伪数组，里面存放了DOM元素  ： var obj = itcast("div");
        //obj转换成dom数组
        toArray:function(){
            // var res = [];
            // for(var i=0;i<this.length;i++)
            // {
            // 	res.push(this[i]);
            // }
            // return res;
            //this是调用toArray方法的实例对象（itcast对象）
            return slice.call(this,0);//this.slice(0);
            //return slice.apply(this,[0]);
        },
        //根据下标获取对应的dom元素
        //obj.get(0).style.border = "";
        get:function(index){
            if(index === undefined)
            {
                return this.toArray();
            }
            return this[index];
        },
        //根据下标获取对应的itcast对象
        //obj.eq(0).appendTo(document.body);
        eq:function(index){
            //使用dom变量保存获取到的dom元素
            var dom;
            if(index >= 0)
            {
                dom = this.get(index);
            }
            else
            {
                dom = this.get(this.length + index);
            }
            //将dom对象转换为itcast对象
            return itcast(dom);
            //this就是调用eq的实例对象，通过实例对象找到构造函数itcast
            return this.constructor(dom);
        },
        //使用func函数来遍历this（调用each方法的实例对象）
        each:function(func){
            //this是itcast对象
            return itcast.each(this,func);
        },
        //使用func函数来遍历this（调用each方法的实例对象）
        map:function(func){
            return itcast.map(this,func);
        }
    })
    //给itcast函数添加静态方法each，map
    itcast.extend({
        //使用func函数来遍历arr数组中的内容
        each:function(arr, func){
            var i;
            // 在 ES5 中还引入了 Array.isArray 的方法专门来判断数组
            if ( arr instanceof Array || arr.length >= 0) {
                for ( i = 0; i < arr.length; i++ ) {
                    //上下文调用，那么在func函数中的this是谁？
                    //this就是itcast中的第i个dom对象
                    func.call( arr[ i ], i, arr[ i ] );
                }
            } else {
                for ( i in arr ) {
                    func.call( arr[ i ], i, arr[ i ] );
                }
            }
            return arr;
        },
        //使用func函数来遍历arr数组中的内容，会映射一个新的数组出来
        map:function(arr, func){
            var i, res = [], tmp;
            if ( arr instanceof Array || arr.length >= 0 ) {
                for ( i = 0; i < arr.length; i++ ) {
                    tmp = func( arr[ i ], i );
                    if ( tmp != null ) {
                        res.push( tmp );
                    }
                }
            } else {
                for ( i in arr ){
                    tmp = func( arr[ i ], i );
                    if ( tmp != null ) {
                        res.push( tmp );
                    }
                }
            }
            return res;
        }
    })


    //dom操作的方法
    itcast.fn.extend({
        //谁可以使用appendTo方法？init方法创建出来的实例对象可以使用这个方法
        //实例对象是一个伪数组，他里面有很多的元素
        //appendTo方法就可以将这些元素，添加到参数dom上去
        //dom有可能的形式：节点形式（document.body）选择器字符串（"div"） itcast对象
        //itcast("<div></div>").appendTo("div")

        appendTo:function(dom){
            //不管传进来的是选择器字符串还是itcast对象还是dom对象，全部转换成itcast对象
            var iObj = itcast(dom);
            //创建一个newObj对象存储所有对象（克隆对象，本体对象）
            var newObj = itcast();
            //如果dom是itcast对象，将this对象中的元素添加到dom对象中的所有元素中去
            //循环this对象中的所有元素
            for(var i = 0;i<this.length;i++)
            {	//循环dom对象中的所有元素
                for(var j = 0;j<iObj.length;j++)
                {
                    //只有最后一次才会加入本体，其他时候加入复制体
                    var temp = (j==iObj.length-1 ? this[i] : this[i].cloneNode(true) );
                    iObj[j].appendChild( temp );
                    push.call(newObj ,temp);
                }
            }
            return newObj;
        },
        //itcast("div").append('<p></p>');
        append:function(dom){
            //将dom转换itcast对象，将该对象加入 this中去
            itcast(dom).appendTo(this);
            //支持链式编程，返回this
            return this;
        },
        //itcast("<p></p>").prependTo('div')
        //将p元素添加到页面中的所有div中，并且p元素会是div中的第一个元素
        prependTo:function(dom){
            //不管传进来的是选择器字符串还是itcast对象还是dom对象，全部转换成itcast对象
            var iObj = itcast(dom);
            //创建一个newObj对象存储所有对象（克隆对象，本体对象）
            var newObj = itcast();
            for(var i = 0;i<this.length;i++)
            {
                for(var j = 0;j<iObj.length;j++)
                {
                    //只有最后一次才会加入本体，其他时候加入复制体
                    var temp = (j==iObj.length-1 ? this[i] : this[i].cloneNode(true) );
                    //获取iObj[j]（父节点）中的第一个节点
                    //iObj是一个itcast对象，
                    var firstChild = iObj[j].firstChild;
                    //往父节点中添加一个temp元素，他要添加在firstChild元素之前
                    iObj[j].insertBefore( temp , firstChild );
                    push.call(newObj ,temp);
                }
            }
            return newObj;
        },
        prepend:function(dom){
            itcast(dom).prependTo(this);
            //支持链式编程，返回this
            return this;
        }
    })

    //事件操作模块
    itcast.fn.extend({
        //给原型对象混入click方法，如何调用click方法
        //itcast("div").click(function(){  ...  })
        // click:function(func)
        // {
        // 	//下面的this就是调用click方法的itcast对象
        // 	// this.each(function(){
        // 	// 	//this就是循环的那一个dom对象，
        // 	// 	//然后给每一个对象添加了onclick的事件处理函数为func
        // 	// 	//this.onclick = func;

        // 	// 	this.addEventListener("click",func);


        // 	// });

        // 	//下面的this就是调用click方法的itcast对象
        // 	return this;
        // }

        // click:function(func){
        // 	//判断当前itcast对象中的events属性中的click是否存在
        // 	if( ! this.events['click'] )
        // 	{
        // 		this.events['click'] = [];

        // 		//给当前的itcast对象中的所有元素添加onclick事件处理函数
        // 		var iObj = this;
        // 		//只在第一次的时候执行事件绑定onclick
        // 		iObj.each(function(){
        // 			//这里的this是循环遍历的那一个dom元素
        // 			this.onclick = function(){
        // 				//把当前itcast对象里面的events属性的click数组中的函数都执行一次
        // 				for(var i=0;i<iObj.events['click'].length;i++)
        // 				{
        // 					//调用click数组中的第i个函数
        // 					iObj.events['click'][i]();
        // 				}
        // 			}
        // 		})
        // 	}
        // 	//将事件处理函数加到  itcast对象的events属性的click数组中
        // 	this.events['click'].push(func);

        // 	return this;
        // }

        on:function(type, func){
            //判断当前itcast对象中的events属性中的 type数组 是否存在
            if( ! this.events[ type ] ){
                this.events[ type ] = [];
                //给当前的itcast对象中的所有元素添加 type 事件处理函数
                var iObj = this;
                //只在第一次的时候执行事件绑定 type
                iObj.each(function(){
                    //这里的this是循环遍历的那一个dom元素
                    // fn
                    var fn = function( e ){
                        //把当前itcast对象里面的events属性的 type 数组中的函数都执行一次
                        for(var i=0;i<iObj.events[ type ].length;i++)
                        {
                            //调用 type 数组中的第i个函数
                            //iObj.events[ type ][i]();
                            //dom对象调用第i个函数
                            iObj.events[ type ][i].call( this , e );
                        }
                    }
                    //如果浏览器支持addEventListener方法，就用它绑定事件处理
                    if( this.addEventListener )
                    {
                        this.addEventListener( type , fn  );
                    }
                    else
                    {
                        this.attachEvent( "on"+type , fn );
                    }
                })
            }
            //将事件处理函数加到  itcast对象的events属性的 type 数组中
            this.events[ type ].push(func);
            return this;
        },
        off:function(type , fn){
            //获取对应的事件数组
            var arr = this.events[type];
            //如果事件数组存在，才做事件移除
            if(arr)
            {	//循环事件数组中的所有函数
                for(var i=0;i<arr.length;i++)
                {	//如果循环的那一个函数和fn一致，就删除他
                    if(arr[i] == fn)
                    {
                        arr.splice(i,1);
                    }
                }
            }
        }
    })


//选择器引擎，通过select可以获得选择器字符串选择的元素
    var select = (function(){
        var rnative = /\{\s*\[native/;
        var rBaseSeletor = /^(?:\#([\w\-]+)|\.([\w\-]+)|(\*)|(\w+))$/;
        var rtrim = /^\s+|\s+$/g
        var support = {};
        //方法定义检测
        support.qsa = rnative.test(document.querySelectorAll + '');
        support.getElementsByClassName = rnative.test(document.getElementsByClassName +'');
        support.trim = rnative.test("".trim + '');
        support.indexOf = rnative.test(Array.prototype.indexOf +'');
        //support.qsa = false;




        //兼容的getElementsByClassName方法
        function getByClassName(className,node)
        {
            node = node || document;
            var allElem,res = [],i;

            if(support.getElementsByClassName)
            {
                var result = document.getElementsByClassName(className);
                push.apply(res,result);
                return res;
            }
            else
            {
                allElem = document.getElementsByTagName("*");
                for(i = 0 ;i<allElem.length;i++)
                {
                    if( (" "+allElem[i].className+" ").indexOf(" "+className+" ") >= 0 )
                    {
                        push(allElem[i]);
                    }
                }
                return res;
            }
        }



        //函数myTrim，去除掉str前后的空格，并返回str
        //str :  "  hello   "  =>  myTrim(str)   =>  "hello"
        function myTrim(str)
        {
            //如果系统支持trim方法，就使用trim方法去除掉字符串前后的空格
            if(support.trim)
            {
                return str.trim();
            }
            //如果系统不支持trim方法，那就使用正则将字符串前后的空格替换为''
            else
            {
                return str.replace(rtrim,'');
            }
        }
        //实现兼容的indexOf方法，因为ie6,7,8不支持数组的indexOf方法
        //返回对应元素的下标
        //array : [1,2,3,4]  ,search: 3
        //myIndexOf(array,search)   =>  在array数组中查找search元素，并返回search所在的下标
        //返回的下标就是2.  如果没有找到元素就会返回-1
        function myIndexOf(array,search,startIndex){
            startIndex = startIndex || 0;
            //如果系统支持indexOf方法
            if(support.indexOf)
            {
                return array.indexOf(search,startIndex);
            }
            else
            {	//自己实现indexOf方法
                for(var i=startIndex;i<array.length;i++)
                {
                    //如果循环的第i个元素和要查找的search元素一致
                    if(array[i] === search)
                    {	//返回该元素的下标
                        return i;
                    }
                }
                //如果循环完毕没有找到一致的元素，就返回-1表示没有找到一致的元素
                return -1;
            }
        }
        //元素去重函数：去除掉参数array数组中的重复元素
        //array : [1,2,3,3,4,5,1]  =>  unique(array)  =>  array:[1,2,3,4,5];
        function unique(array)
        {	//定义一个空数组
            var resArray = [];
            //循环array中的所有元素
            for(var i=0;i<array.length;i++)
            {	//判断resArray数组中是否包含了array[i]元素，如果没有包含
                if( myIndexOf(resArray,array[i] ) == -1)
                {	//就把这个元素添加到resArray数组中来。
                    resArray.push(array[i]);
                }
            }
            //返回去重后的数组
            return resArray;
        }


        //选择器函数select，通过该函数可以选择页面中的某些元素
        //参数解释：selector 传递选择器字符串  。  results  传入一个数组，将查询到的元素加入该数组
        //如何调用select函数：
        /*
         select("#dv");  select(".cc");  select("*");  select("div");
         select("#dv,  .cc ,  div");
         */

        //在node节点中查找选择器字符串为selector的内容
        //document 找 selector是#dv的元素
        function basicSelect(selector,node)
        {
            var results = [];

            var m = rBaseSeletor.exec( selector );
            if(m)
            {
                if(m[1])
                {
                    var temp = document.getElementById(m[1]);
                    if(temp)
                    {
                        results.push( temp );
                    }
                }
                else if(m[2])
                {
                    push.apply(results,getByClassName( m[2],node ) );
                }
                else if(m[3] || m[4])
                {
                    push.apply(results,node.getElementsByTagName(selector ) );
                }
            }

            //返回包含了元素的数组
            return unique(results);
        }
        //获得后代选择器选择的元素
        function select2(selector,results)
        {
            results = results ||[];
            //进来的selector是'div      div'=>把多个空格换成一个空格
            selectors.replace(/\s+/g," ");
            //假定selectors => ['div','div']
            var selectors = selector.split(' ');

            //arr存的是所有的div
            var arr = [],node= [document];
            //循环空格分隔出来的选择器字符串
            for(var j=0;j<selectors.length;j++)
            {
                for(var i = 0;i<node.length;i++)
                {
                    //basicSelect(selectors[0], node[i] )：在document中寻找所有的div元素
                    //把这些元素添加到arr数组中
                    push.apply(arr , basicSelect(selectors[j], node[i] ) );
                }
                node = arr; //arr里有所有的div，  node里也有所有的div
                arr = []; //arr里面什么都没有了，
            }
            push.apply(results,node);

            return results;
        }
        //select函数是选择器引擎，入口函数,用户调用select函数来获得对应的元素
        //select('div');  select("#dv");  select(".cc"); select("*");
        //select("div,#dv,.cc"); 组合选择器
        //select('div div,div p,div p .c');
        function select(selector,results)
        {
            results = results || [];
            if( typeof selector != 'string') {
                return results;
            }
            //如果系统支持qsa，就使用qsa获得元素
            if(support.qsa)
            {
                push.apply(results,document.querySelectorAll( selector ));
                return results;
            }
            else//否则自己实现
            {
                //按照逗号分隔选择器字符串 select('div div,div p,div p .c','span');
                //=>['div div','div p','div p .c','span']
                var selectors = selector.split(",");
                //循环所有的选择器字符串
                for(var i=0;i<selectors.length;i++)
                {	//对循环的那一个字符串去除前后空格
                    var subSelector = myTrim(selectors[i]);
                    //用正则表达式匹配选择器字符串，
                    //如果匹配成功代表肯定是id选择器，类选择器，*，标签名其中一种
                    if(rBaseSeletor.test(subSelector) )
                    {
                        push.apply(results,basicSelect(subSelector,document ) );
                    }
                    //如果匹配不成功，表示不是基本选择器的四种形式，应该就是后代选择器
                    else
                    {	//使用select2函数获得后代选择器的元素
                        results = select2(subSelector,results);
                    }
                }
            }
            //返回去重复了的元素数组
            return unique(results);
        }

        //返回select函数作为沙箱的结果
        return select;


    })();

    itcast.select = select;
})(window);


//什么是实例方法，什么是静态方法？
//实例对象可以调用的方法，  静态方法就通过函数名来调用的方法
//var obj = itcast("div");
//obj.appendTo(dom);  appendTo是一个实例方法
//itcast.isString = function(str){ return typeof str;}
//itcast.isString("hehe");

// var obj = itcast("div");

// var obj2  = itcast(obj);/