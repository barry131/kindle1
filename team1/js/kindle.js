(function(){
    /**
     * 戴尔空间域名
     * @memberOf eub
     * @namespace eub.dell
     */
    var dell = eub.register('eub.dell');
     dell = eub.dell;

    /**
     * 添加动画定时器
     * @memberOf msc.dell
     * @namespace eub.dell.delayAni
     * @param {object} obj 传入那个dom元素
     * @param {string} tag 取到的动画的值
     * @param {string} time 取到动画多久之后添加时间
     * @function
     * @example
     *     1. eub.dell.delayAni(obj,tag,time); 
     */ 
    dell.delayAni = function(obj,tag,time){
        setTimeout(function(){
            obj.addClass('animated ' + tag);
        },time)
    }

    /**
     * 添加动画
     * @memberOf msc.dell
     * @namespace eub.dell.delayAni
     * @param {object} dom 传入那个dom元素
     * @param {string} tag 动画属性名称 用于取动画名称
     * @param {string} time 动画时间属性名称 用于去时间
     * @param {function} callback 回调函数
     * @function
     * @example
     *     1. eub.dell.delayAni(obj,tag,time); 
     */
    dell.addAni = function(dom,attrName,attrTime,callback){

        var $dom = dom.find('['+attrName+']'),
            attrNames,
            attrTimes;

        $dom.each(function(i){

            attrNames = $(this).attr(attrName);
            if($(this).hasClass(attrNames)){
                $(this).removeClass('animated ' + attrNames);
            }
        });

        $dom.each(function(i){

            attrNames = $(this).attr(attrName);
            attrTimes = $(this).attr(attrTime) ? $(this).attr(attrTime) : 0 ;

            eub.dell.delayAni($(this),attrNames,attrTimes);
        });

        if($.isFunction(callback)){
            callback( $dom );
        }
    }

	dell.init = function(){
        //动画添加
         eub.dell.addAni($('.choices'),'tag-name','tag-time');
		
    }
	

})();

$(function(){
	
	
	/*重力感应*/
    window.addEventListener('deviceorientation', this.orientationListener, false); //方向感应器
    window.addEventListener('MozOrientation', this.orientationListener, false); //方向感应器 for firefox
    //window.addEventListener('devicemotion', this.orientationListener, false); //重力加速感应器 for iphone, android
    function Orientation(selector) {

    }

    Orientation.prototype.init = function(){
        window.addEventListener('deviceorientation', this.orientationListener, false);
        window.addEventListener('MozOrientation', this.orientationListener, false);
        //window.addEventListener('devicemotion', this.orientationListener, false);
    }

    Orientation.prototype.orientationListener = function(evt) {
        // For FF3.6+
        if (!evt.gamma && !evt.beta) {
            // angle=radian*180.0/PI 在firefox中x和y是弧度值,
            evt.gamma = (evt.x * (180 / Math.PI)); //转换成角度值,
            evt.beta = (evt.y * (180 / Math.PI)); //转换成角度值
            //evt.alpha = (evt.z * (180 / Math.PI)); //转换成角度值
        }

        var gamma = evt.gamma
        var beta = evt.beta
        var alpha = evt.alpha

        if(evt.accelerationIncludingGravity){

            gamma = event.accelerationIncludingGravity.x*200
            beta = -event.accelerationIncludingGravity.y*200
            //alpha = event.accelerationIncludingGravity.z*20

        }

        if (this._lastGamma != gamma || this._lastBeta != beta) {
            //document.querySelector("#test").innerHTML = "x: "+ beta.toFixed(2) + " y: " + gamma.toFixed(2) + " z: " + (alpha != null?alpha.toFixed(2):0)
			/*var prostyle = document.querySelector("#index-page3").style;
            var prostylet = document.querySelector("#index-title").style;

            prostyle.left = gamma * 0.3 +"px";
            prostyle.top = beta * 2.8 +"px";

            prostylet.left = gamma * 0.3 +"px";
            prostylet.top = beta * 2.8 +"px";

            prostyle._lastGamma = gamma;
            prostyle._lastBeta = beta;*/
        }
    };
	(new Orientation()).init();

})
var a=0;
var d1=document.getElementById('d1');
var d1img=d1.getElementsByTagName('img');
function hea(a){
    for(var h=0;h<d1img.length;h++){
        $(d1img).css({'opacity':'0'});
    }
    $(d1img).eq(a).css({'opacity':'1'});
}
function hear(){
    a++;
    if(a==d1img.length){a=0}
    hea(a);
}
var sthear=setInterval(hear,5000);
clearInterval(sthear);

function crifun(){    
    $('.clipborder img').addClass('clipborderani');
}

function clockfun(){
    $("#clock").addClass('aniclipimg'); 
    setTimeout(rotfun,4600);
    setTimeout(crifun,3000)
}


var r=0;
function rot(){
    r++;
    $('.tx').css({'WebkitTransform':'rotate3d(0,0,1,' + 6*r + 'deg),' });
    if(r > 4 && r < 30){
        $('.warpbg img').eq(0).fadeIn(1000);
        $('.warpbg img').eq(1).fadeOut(1000);
        $('.box').css({'opacity':'0.7'});
    }
    if(r > 29){
        $('.warpbg img').eq(1).fadeIn(1000);
        $('.warpbg img').eq(0).fadeOut(1000);
    }
    if(r==60){r=1}
    //console.log(r)
}
var rotset=setInterval(rot,1000);
clearInterval(rotset);
function rotfun(){
    $("#d1 img").addClass('txbig');
    rotset=setInterval(rot,1000);
    setTimeout(indextext,5000);
}   

function indextext(){
    $('.index-text').fadeIn();
    $('.a11').fadeIn(1000);
    $('.a2').delay(1000).fadeIn(1000);
    $('.a3').delay(2000).fadeIn(1000);
    $('.a4').delay(3000).fadeIn(1000);
    $('.a5').delay(4000).fadeIn(1000);
    $('.a6').delay(5000).fadeIn(1000);
    setTimeout(titfun,7000);
}

function titfun(){
    $('.index-text').fadeOut(1000);
    $('.index-page3').show();
    $('.index-title').fadeIn(1500);
    $("#d1 img").addClass('txsmall');
    $('.index-page3').css({'opacity':'1'});
    $('.light').fadeIn();
    $('.index-page3 img').delay(1500).animate({'opacity':'1'},1500);
    $('.titlep').delay(2500).fadeIn(1500);
    $('.index-page3 span').delay(3500).fadeIn(1500);
    $('.page3-btn').delay(4500).fadeIn(1500);
    sthear=setInterval(hear,5000);
}


$('.clock1').click(function(){  //签到按钮
    $('.clock1').animate({'opacity':'0'},1000);
    $('.half').fadeIn();
})

$('.starbtn').click(function(){  //开始计时
    $('.halftext').fadeOut();
    $('.time').fadeIn();
    $('.sec').show();
    $('.cri_blue').addClass('secani');
    stminu=setInterval(minu,1000);
})


/*时钟序列帧*/
var imgArray =[]
for(var i=0;i<31;i++){
    imgArray.push('images/home'+(i+1)+'.png');
}

var spritePic = new Plants('#sprite',{
    resource : imgArray,
    totalFrame : 6,
    aniType:'easeOut'
});
var u=0;
var c=0;
var timesec;
function minu(){
    u++;
    timesec=$('#timesec').html();
    if(u>=60){
        u=0;
        c++;
        $('#timesec').html(timesec-1);
        spritePic.jumpTo(c);
        if(timesec-1==-1){
            clearInterval(stminu);
            $('.cri_blue').removeClass('secani');
            $('#timesec').html('完成');
        }
    }
}
var stminu=setInterval(minu,1000);
clearInterval(stminu);


var jo=0;
/*加入按钮*/
$('.page3-btn img').click(function(){
    //clearInterval(rotset);
    var botH=$('.page4-main').height();
    var btnH=$('.page3-btn').height();
    $('.warpbg').animate({'top':-botH},900);
    $('.top').delay(200).animate({'top':-botH/2},700);
    $(".page4-main").delay(400).animate({'bottom':"0"},500);
    $(".page3-btn").delay(400).animate({'bottom':botH-(btnH/2)},500);
    $('.page3-btn img').eq(0).delay(400).animate({'opacity':'0'},500);
    $('.page3-btn img').eq(1).delay(400).animate({'opacity':'0'},500);
    $('.page3-btn img').eq(2).delay(400).fadeIn(500);
    $('.page4topbtn').fadeIn(500);
    $('.warpbg').fadeOut(1000);
    $('.qdwarpbg').fadeIn(1000);
    $('.top').fadeOut(1000);
    $('.page2').animate({'top':'0'},500);
    $('.page2').fadeIn(1000);
    //stchange=setInterval(chanbgs,5000);
    //clearInterval(rotset);
    //clearInterval(sthear);
    sthear = null;
    rotset = null;
    hear = null;
    $('.top').remove();
})

/*签到背景切换*/
var g=0
function chanbg(g){
    if (g==0) {
        $('.qdwarpbg img').eq(0).fadeIn(1000);
        $('.qdwarpbg img').eq(1).fadeOut(1000);
    }else{
        $('.qdwarpbg img').eq(1).fadeIn(1000);
        $('.qdwarpbg img').eq(0).fadeOut(1000);
    }
}
function chanbgs(){
    g++;
    if(g==2){g=0}
    chanbg(g)
}
var stchange=setInterval(chanbgs,5000);
clearInterval(stchange);

/*loading禁止滑动*/
var loading=document.getElementById("loadingwarp");//获取ID
loading.addEventListener("touchstart", function(event) {
    event.preventDefault();
});

/*页面上滑事件*/
var btnElem=document.getElementById("footer");//获取ID
var posStart = 0;//初始化起点坐标
var posEnd = 0; //初始化终点坐标
function initEvent() {
    btnElem.addEventListener("touchstart", function(event) {
        event.preventDefault();//阻止浏览器默认行为
        posStart = 0;
        posStart = event.touches[0].pageY;//获取起点坐标
        posStartX = event.touches[0].pageX;//获取起点坐标
    });
    btnElem.addEventListener("touchend", function(event) {
        event.preventDefault();
        posEnd = 0;
        posEnd = event.changedTouches[0].pageY;//获取终点坐标
        posEndX = event.changedTouches[0].pageX;//获取终点坐标
        var nY = posStart - posEnd;
        var nX = posEndX - posStartX;
        if(nY > 100 && Math.abs(nX) < Math.abs(nY)){
            openbot();
        };
        if(nY < -100 && Math.abs(nX) < Math.abs(nY)){
            closebot();
        }
    });
};
initEvent();

function openbot(){
    $('.page4-zj').animate({'height':'0','padding':'0','margin':'0 auto 0'},500);
    $('.page4list').animate({'height':'26.2rem'},500);
    var botH=$('.page4-main').height();
    $(".page3-btn").animate({'bottom':botH+100},500);
    $('.page4bg').fadeIn();
    $('#page4tit1').slideUp();
    $('#page4tit2').slideDown();
    setTimeout(function(){
        $('.page4list').css({'overflowY':'scroll'});
        var botH=$('.page4-main').height();
        var btnH=$('.page3-btn').height();
        $(".page3-btn").stop().animate({'bottom':botH-(btnH/2)},200);
    },550);
    jo=1;
}

function closebot(){
    if(jo!=0){
        var zjH=$('.page4-zj ul').height();
        $('.page4-zj').animate({'height':zjH,'paddingBottom':'7rem','margin':'2rem auto 0'},500);
        $('.page4list').animate({'height':'0'},500);
        var botH=$('.page4-main').height();
        $(".page3-btn").animate({'bottom':botH-100},500);
        $('.qdwarpbg').css({'webkitFilter':'none'});
        $('.page4bg').fadeOut();
        $('#page4tit1').slideDown();
        $('#page4tit2').slideUp();
        setTimeout(function(){
            $('.page4list').css({'overflowY':'hidden'});
            var botH=$('.page4-main').height();
            var btnH=$('.page3-btn').height();
            $(".page3-btn").stop().animate({'bottom':botH-(btnH/2)},200);
        },550)
    }
    jo=0;
}
$('.page4bg').click(function(){
    closebot();
})


/*弹出框*/
function popu(p){
    if(p==1){
        $('.popu-main').fadeIn();
        $('.popu-main-zj').show();
    }else if(p==2){
        $('.popu-main').fadeIn();
        $('.popu-main-box').show();
    }else{
        $('.popu-main').fadeOut();
        $('.popu-main-zj').hide();
        $('.popu-main-box').hide();
    }
}
$('.btn_tip').click(function(){
    popu(2);
})
$('.btn_msg').click(function(){
    popu(1);
})
$('.btn_close').click(function(){
    popu(0);
})
$('.btn_no').click(function(){
    popu(0);
})
$('.btn_yes').click(function(){
    popu(0);
})

$('.btn_fx').on('touchstart',function(){
    setTimeout(function(){
        $('.fx').fadeIn();
    },500)    
})
$('.fx').on('touchstart',function(){
    $('.fx').fadeOut();
})