/**
 * Created by Administrator on 2016/10/21.
 */
window.onload = function(){
    // 数据
    var config = [
        {
            "width": 400,
            "top": 20,
            "left": 50,
            "opacity": 0.2,
            "zIndex": 2
        },//0
        {
            "width": 600,
            "top": 70,
            "left": 0,
            "opacity": 0.8,
            "zIndex": 3
        },//1
        {
            "width": 800,
            "top": 100,
            "left": 200,
            "opacity": 1,
            "zIndex": 4
        },//2
        {
            width: 600,
            top: 70,
            left: 600,
            opacity: 0.8,
            zIndex: 3
        },//3
        {
            "width": 400,
            "top": 20,
            "left": 750,
            "opacity": 0.2,
            "zIndex": 2
        }//4
    ];
    var wrap = document.getElementById("wrap");
    var arrow = document.getElementById("arrow");
    var slide = document.getElementById("slide");
    var ul = slide.children[0];
    var lis =ul.children;
    var lArrow = document.getElementById("arrLeft");
    var rArrow = document.getElementById("arrRight");
    var flag = true;
    //初始化网页
    for(var i=0;i<lis.length;i++){
        //利用动画函数动态加载结构
        myAnimate(lis[i],config[i],1);
    }
    //绑定轮换
    rArrow.onclick = function(){
        //更新数组
        config.push(config.shift());
        goChange();
    }
    lArrow.onclick = function(){
        //更新数组
        config.unshift(config.pop());
        //如果flag为true则允许执行第二次动画
        if(flag){
            goChange();
            //然后关闭动画
            flag = false;
        }

    }
    //事件
    wrap.onmouseover = function () {
        myAnimate(arrow,{"opacity":1});
    }
    wrap.onmouseout = function (){
        myAnimate(arrow,{"opacity":0});
    }

    function goChange(){
        for(var i=0;i<lis.length;i++){
            //利用动画函数动态加载结构
            //由于运动是相对的，假设样式位置不变，图片在变，图片的运动轨迹如下：
            //012345
            //123450
            //234501则图片在向前走
            //若图片不动就是样式在向后走
            //myAnimate(lis[i],config[i],20);
            //给上一行代码加节流阀
            myAnimate(lis[i],config[i],15,function(){
                flag = true;
            });
        }
    }
}