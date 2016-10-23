/**
 * Created by Administrator on 2016/10/20.
 */
//变黑动画
//var imgBg = document.getElementById("imgBg");
var con = document.getElementById("con");
var ul = con.children[0];
var lis = ul.children;
console.log(lis);
//绑定
for(var i=0;i<lis.length;i++){
    var li = lis[i];
    li.index =i;
    li.onmouseover = function(){
        var imgBg = this.getElementsByTagName("img")[0];
        imgBg.style.opacity = 0.4;
        switch (this.index){
            case 0:
                var name0 = document.getElementById("name0");
                myAnimate(name0,{"width":145,"height":55,"left":72,"top":60},null);
            break;
            case 1:
                var name1 = document.getElementById("name1");
                myAnimate(name1,{"width":145,"height":55,"left":61.5,"top":60},null);
                break;
            case 2:
                var name2 = document.getElementById("name2");
                myAnimate(name2,{"width":110,"height":55,"left":62,"top":60},null);
                break;
            default :
                break;
        }

    }
    li.onmouseout = function(){
        var imgBg = this.getElementsByTagName("img")[0];
        imgBg.style.opacity = 1;
        switch (this.index){
            case 0:
                var name0 = document.getElementById("name0");
                myAnimate(name0,{"width":159,"height":63,"left":55,"top":53},null);
                break;
            case 1:
                var name1 = document.getElementById("name1");
                myAnimate(name1,{"width":159,"height":64,"left":55,"top":53},null);
                break;
            case 2:
                var name2 = document.getElementById("name2");
                myAnimate(name2,{"width":123,"height":64,"left":68,"top":53},null);
                break;
            default :
                break;
        }

    }
}
//==============================
//渐变动画
    var text_l =document.getElementById("text_l");
    var text_c=document.getElementById("text_c");
    var text_r=document.getElementById("text_r");
    var c=document.getElementById("c");
    var history =document.getElementById("history");
    var historyA =document.getElementById("historyA");

    historyA.onmouseover = function(){
        myAnimate(text_l,{"left":0,"opacity":0},null);
        myAnimate(text_c,{"top":40},null);
        myAnimate(text_r,{"right":0,"opacity":0},null);
        animate(c,"width",276,2);
    }
        historyA.onmouseout = function(){
        myAnimate(text_l,{"left":75,"opacity":1},null);
        myAnimate(text_c,{"top":28},null);
        myAnimate(text_r,{"right":80,"opacity":1},null);
        animate(c,"width",0,1);
}
//=========================================
//图片替代动画
    var ul = document.getElementById("lab_ul");
    var lis = ul.children;

    //循环拿到p
    for(var i=0;i<lis.length;i++){
        var li = lis[i];
        //添加标志
        li.index = i;
        //var p1 = document.getElementById("p1");
        li.onmouseover = function(){
            //拿到p
            var p = this.getElementsByTagName("p")[0];
            console.log("li的p"+p);
            animateQuic(p,"height",0,1);
        }
        li.onmouseout = function(){
            //拿到p
            var p = this.getElementsByTagName("p")[0];
            console.log("li的p"+p);
            animateQuic(p,"height",209,1);
        }
    }
//==================================================
//向中靠的动画
    var firstLi  =  document.getElementById("lab_ul_firstLi");
    var pic1  =  document.getElementById("pic1");
    var pic2  =  document.getElementById("pic2");


    firstLi.onmouseover = function(){
        animateQuic(pic1,"left",70,1);
        animateQuic(pic2,"top",90,1);
        console.log("执行");
    }
    firstLi.onmouseout = function(){
        animateQuic(pic1,"left",98,1);
        animateQuic(pic2,"top",71,1);
        console.log("执行");
    }