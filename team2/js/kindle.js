(function($,eub){
    "use strict";
    /**
    * @copyright 北京宏图世展网络科技服务有限公司
    * @author chendeping
    * @date 20150728
    * @global
    * @namespace eub.kindle
    */
    var kindle = eub.register('eub.kindle');


     /**
     * 获取两点之间的距离
     * @memberOf eub
     * @namespace eub.kindle.getDistance
     * @param  {number} x1 
     * @param  {number} y1 
     * @param  {number} x2 
     * @param  {number} y2 
     * @example
     *      1, eub.kindle.getDistance(x1, y1, x2, y2);
     */
     kindle.getDistance = function(x1, y1, x2, y2){

        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2), 2);
     }

     /**
     * 裁图
     * @memberOf eub
     * @namespace eub.kindle.imgChangePosition
     * @param  {string} dom  
     * @example
     *      1, eub.kindle.imgChangePosition(dom);
     */
     kindle.imgChangePosition = function(Dom){


        //alert(123)
        $('.cutting-img-editor').width($(window).innerWidth()*0.6666);
        $('.cutting-img-editor').height((804/500)*$('.cutting-img-editor').width());

        var oldX, oldY, startX, startY, startWidth, startHeight,moveT,moveL;
        var moveD;
        var isMove = false;
        var isZoom = false;
        var lastClickTime = 0;
        var boxH = $(".cutting-img-editor").height(),
            boxW = $(".cutting-img-editor").width();
        var startScaling = $("#imgEdit").width()/$("#imgEdit").height();
        var startWidth = $('#imgEdit').width();
        var startHeight = $('#imgEdit').height();
        function img_mousedown(e){
            $('.cutting-cent-footer').show();
            $("#imgEdit").css({
                "min-width": boxW,
                "min-height": boxH
            });
            console.log(boxW);
            if (e.touches.length == 1){

            }else if (e.touches.length >= 2){
                isMove = false;
                isZoom = true;
                var x1 = e.touches[0].pageX,
                    y1 = e.touches[0].pageY,
                    x2 = e.touches[1].pageX,
                    y2 = e.touches[1].pageY;

                startX = $('#imgEdit').position().left;
                startY = $('#imgEdit').position().top;
                startWidth = $('#imgEdit').width();
                startHeight = $('#imgEdit').height();
                moveD = eub.kindle.getDistance(x1, y1, x2, y2);
                return;

            }
            isMove = true;
            oldX = e.touches[0].pageX;
            oldY = e.touches[0].pageY;
            startX = $('#imgEdit').position().left;
            startY = $('#imgEdit').position().top; 
            e.preventDefault();
            e.stopPropagation();
            return false;

        }

        function img_mouseup(e){
            $('.cutting-cent-footer').hide();
            var thisW =  $("#imgEdit").width(),
                thisH = $("#imgEdit").height();
            if( moveT > 0 && moveL > 0 ){

                $("#imgEdit").css({
                    "left": 0,
                    "top": 0
                }); 
                
            } if( moveT<-(thisH-boxH) && moveL<-(thisW-boxW) ){

                $("#imgEdit").css({
                    "left": -(thisW-boxW),
                    "top": -(thisH-boxH)
                }); 
                
            }else if( moveT > 0 && moveL < 0 && moveL<-(thisW-boxW) ){

                $("#imgEdit").css({
                    "top": 0,
                    "left": -(thisW-boxW)
                }); 
                
            } else if( moveL > 0 && moveT < 0 && moveT<-(thisH-boxH) ){

                $("#imgEdit").css({
                    "left": 0,
                    "top": -(thisH-boxH)
                }); 
                
            } else if( moveT > 0 ){

                $("#imgEdit").css({
                    "top": 0
                }); 
                
            } else if( moveL > 0 ){

                $("#imgEdit").css({
                    "left": 0
                }); 
                
            } else if( moveT<-(thisH-boxH) ){

                $("#imgEdit").css({
                    "top": -(thisH-boxH),
                    "left": moveL
                }); 
                
            } else if( moveL<-(thisW-boxW) ){
                $("#imgEdit").css({
                    "left": -(thisW-boxW),
                    "top": moveT
                }); 
                
            }
            isZoom = false;
            isMove = false;

        }

        function img_mousemove(e){
            if (isZoom){
                if (e.touches.length >= 2){
                    var x1, y1, x2, y2, d1;

                    x1 = e.touches[0].pageX;
                    y1 = e.touches[0].pageY;
                    x2 = e.touches[1].pageX;
                    y2 = e.touches[1].pageY;

                    d1 = eub.kindle.getDistance(x1, y1, x2, y2);
                    if(Math.abs(moveD-d1) < 2) {
                        return; 
                    }
                    var rate = d1 / moveD;
                    var w = startWidth * rate;
                    var h = startHeight * rate;

                    if(w>=boxW && h>=boxH){
                        var new_width,new_height,new_top,new_left;
                        if(w/h == startScaling){
                            new_width = w;
                            new_height = h;
                        } else {
                            new_width = w;
                            new_height = w/startScaling;
                        }
                        $('#imgEdit').width(new_width);
                        $('#imgEdit').height(new_height);
                    }
                    
                }

                return;
            }

            if (!isMove) return;

            var x = e.changedTouches[0].pageX - oldX,
                y = e.changedTouches[0].pageY - oldY;

            $('#imgEdit').css('top', y + startY + 'px');
            $('#imgEdit').css('left', x + startX + 'px');

            moveT = y + startY;
            moveL = x + startX;
        }

        if($("#imgEdit")[0]){

            var _scale = $('#imgEdit').width()/$('#imgEdit').height();
            var _b_scale = $('.cutting-cent-footer').width() / $('.cutting-cent-footer').height();
            if(_scale >= _b_scale){

                $('#imgEdit').css({
                    width: "initial",
                    height: "100%"
                })
            }else{

                $('#imgEdit').css({
                    width: "100%",
                    height: "initial"
                })
            }
        }

        var imgChangePosition = function(Dom){
                var thisD = $("."+Dom);

                thisD.onmousemove = function (e){

                    var e = e || event;
                    e.cancelBubble = true;
                    e.returnValue = false;
                }

                // 防止触发浏览器的整体拖动
                thisD[0].addEventListener('touchmove', function (e){
                    e.preventDefault();
                }, false); 

                thisD[0].addEventListener('touchstart', img_mousedown, false);
                thisD[0].addEventListener('touchend', img_mouseup, false);
                thisD[0].addEventListener('touchmove', img_mousemove, false);

                $(".photo_btn").bind("click",function(){
                    var imgEdit = $("#imgEdit"),
                        grayscale = imgEdit.css("-webkit-filter"),
                        grayscaleNum = 0,
                        data = null;

                        data = {
                            'act':  'img_position',
                            "imgW": imgEdit.width(),
                            "imgH": imgEdit.height(),
                            "x": -parseFloat(imgEdit.css("left")),
                            "y": -parseFloat(imgEdit.css("top")),
                            "boxW": imgEdit.parent(".cutting-img-editor").width()
                        }
                       
                        var url = 'action.php'
                        eub.tools.ajax('post',url,data,function(data){//ajax成功返回data.error 为0才能成跳转页面
                            window.location.href = data.msg;
                        })
                    
                })
                
            }(Dom)
     }

    kindle.init = function(){
        //裁剪图片
        if ($('.cutting-img-editor')[0]) {
            $('#imgEdit').bind('load',function  () {
                kindle.imgChangePosition('cutting-img-editor');
            })            
        }
    }

})(jQuery,eub);

$(function(){

    eub.kindle.init();

    var audio = document.getElementById("audio");
    $(".music").on('touchstart',function(){
        if(audio.paused){
            $('#audio').trigger('play');
            $(".music").attr({'src':'images/music.gif'});
        }else{
            $('#audio').trigger('pause');
            $(".music").attr({'src':'images/music.png'});
        }
    });

    document.addEventListener("WeixinJSBridgeReady", function () { //微信自动播放
        WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
            document.getElementById('audio').play();
        });
    },false);

    /*时钟序列帧*/
    /*var imgArray =[]
    for(var i=1;i<80;i++){
        imgArray.push('images/video_index/video_index'+ i + '.jpg');
    }

    var spritePic = new Plants('#sprite',{
        resource : imgArray,
        totalFrame : 6,
        aniType:'easeOut'
    });
    spritePic.play(50);*/

    /*时钟序列帧2*/
    /*var imgArray2 =[]
    for(var i=1;i<58;i++){
        imgArray2.push('images/video_list/video_list'+ i + '.jpg');
    }

    var spritePic2 = new Plants('#sprite2',{
        resource : imgArray2,
        totalFrame : 6,
        aniType:'easeOut'
    });
    spritePic2.play(100);*/


    /*初始化侧边栏*/
    setTimeout(function(){
        $('.sidenav ul li').css({'height':($(window).height()-$(window).width()/2)/5});
        $('.cutting-img-editor').css({'height':$('.upload_tit').height()});
        //console.log($('.upload_tit').height())
    },1000)
    


    /*loading页面轮播图*/
    var bannersub=document.getElementById('bannersub');
    var bannersuba=bannersub.getElementsByTagName('a');
    var bannerul=document.getElementById('bannerul');
    var bannerulli=bannerul.getElementsByTagName('li');
    var r=0;
    var n;
    function banner(r){
        for(var b=0;b<bannerulli.length;b++){
            $(bannersuba).removeClass('on');
        }

        $(bannersuba).eq(r).addClass('on');
        $(bannerulli).eq(r).animate({'left':'0%'},1000);
        $(bannerulli).eq(r).find('.bannerper').animate({'left':'0%','opacity':'1'},1000);
        $(bannerulli).eq(r).find('.bannertext').animate({'left':'0%','opacity':'1'},1000);


        $(bannersuba).eq(n).removeClass('on');
        $(bannerulli).eq(n).animate({'left':'100%'},1000);
        $(bannerulli).eq(n).find('.bannerper').animate({'left':'-200%','opacity':'0'},1000);
        $(bannerulli).eq(n).find('.bannertext').animate({'left':'-100%','opacity':'0'},1000);

        setTimeout(function(){
            
            $(bannerulli).eq(n).css({'left':'-100%'});
            $(bannerulli).eq(n).find('.bannerper').css({'left':'200%','opacity':'0'});
            $(bannerulli).eq(n).find('.bannertext').css({'left':'100%','opacity':'0'});
                      
        },1500)
        
    }
    function bannerr(){
        r++;
        if (r==bannerulli.length) {
            r=0;
        }
        n=r-1;
        if (r==0) {
            n=bannerulli.length-1;
        }
        banner(r);
    }
    function bannerl(){
        r--;
        if (r==-1) {r=bannerulli.length-1}
        n=r+1;
        if (r==bannerulli.length-1) {
            n=0;
        }
        banner(r);
    }
    var stban=setInterval(bannerr,4000);
    var clearban=setTimeout(function(){
        stban=setInterval(bannerr,4000);
    },4000)
    clearTimeout(clearban);

    /*页面上滑事件*/
    var btnElem=document.getElementById("wrap");//获取ID
    var posStart = 0;//初始化起点坐标
    var posEnd = 0; //初始化终点坐标
    function initEvent() {
        btnElem.addEventListener("touchstart", function(event) {
            event.preventDefault();//阻止浏览器默认行为
            posStart = 0;
            posStart = event.touches[0].pageY;//获取起点坐标
            posStartX = event.touches[0].pageX;//获取起点坐标
            
            clearTimeout(clearban);
            clearInterval(stban);
            clearban=setTimeout(function(){
                stban=setInterval(bannerr,4000);
            },4000)
        });
        btnElem.addEventListener("touchend", function(event) {
            event.preventDefault();
            posEnd = 0;
            posEnd = event.changedTouches[0].pageY;//获取终点坐标
            posEndX = event.changedTouches[0].pageX;//获取终点坐标
            var nY = posStart - posEnd;
            var nX = posEndX - posStartX;
            if(nX > 100 && Math.abs(nY) < Math.abs(nX)){
                bannerl();
            };
            if(nX < -100 && Math.abs(nY) < Math.abs(nX)){
                bannerr();
            }
            if(nY > 100 && Math.abs(nX) < Math.abs(nY)){
                $('.wrap').animate({'top':'-100%'},500);
                $('.wrap2').animate({'top':'0'},500);
                eub.kindle.indexain();
                eub.kindle.init();
                clearInterval(stban);
                urlindex=1;
                changePart();
            };
            //stban=setInterval(bannerr,3000);
        });
    };
    initEvent();
        
    /*重力感应*/
    window.addEventListener('deviceorientation', this.orientationListener, false); //方向感应器
    //window.addEventListener('MozOrientation', this.orientationListener, false); //方向感应器 for firefox
    //window.addEventListener('devicemotion', this.orientationListener, false); //重力加速感应器 for iphone, android
    function Orientation(selector) {

    }

    Orientation.prototype.init = function(){
        window.addEventListener('deviceorientation', this.orientationListener, false);
        //window.addEventListener('MozOrientation', this.orientationListener, false);
        //window.addEventListener('devicemotion', this.orientationListener, false);
    }

    Orientation.prototype.orientationListener = function(evt) {
        // For FF3.6+
        /*if (!evt.gamma && !evt.beta) {
            // angle=radian*180.0/PI 在firefox中x和y是弧度值,
            evt.gamma = (evt.x * (360 / Math.PI)); //转换成角度值,
            evt.beta = (evt.y * (360 / Math.PI)); //转换成角度值
            //evt.alpha = (evt.z * (180 / Math.PI)); //转换成角度值
        }*/

        var gamma = evt.gamma
        var beta = evt.beta
        var alpha = evt.alpha

        if(evt.accelerationIncludingGravity){

            gamma = event.accelerationIncludingGravity.x*10
            beta = -event.accelerationIncludingGravity.y*10
            //alpha = event.accelerationIncludingGravity.z*20

        }

        if (this._lastGamma != gamma || this._lastBeta != beta) {
            var style = document.querySelector("#titword").style;
            // var prostyle = document.querySelector("#propng").style;
            
            if(gamma < -80 || beta < -80){
                gamma=-80;
                beta=-80;
            }else if(gamma > 80 || beta > 80){
                gamma=80;
                beta=80;
            }else{
                gamma=gamma;
            }

            style.left = gamma * 0.5 +"px";
            style.top = beta * 0.3 +"px";

            /*prostyle.left = gamma * 0.5 +"px";
            prostyle.top = beta * 0.3 +"px";*/

            this._lastGamma = gamma;
            this._lastBeta = beta;

            //document.querySelector("#test").innerHTML = "x: "+ gamma + " y: " + beta /*+ " z: " + (alpha != null?alpha.toFixed(2):0)*/
            
        }
    };
    (new Orientation()).init();
    
    

    /*侧边栏*/
    var i;
    function sidebar(i){
        switch(i){
            case 1:
                $('.menu_btn').removeClass('bounceIn');
                $('.menu_btn').addClass('bounceOut');
                setTimeout(function(){
                    $('.wrap2').animate({'left':'-50%'},500);
                    $('.black').fadeIn();
                },500)
                break;
            default:
                $('.menu_btn').removeClass('bounceOut');
                $('.menu_btn').addClass('bounceIn');
                $('.wrap2').animate({'left':'0%'},500);
                $('.black').fadeOut();
        }
    }
    $('.menu_btn').on('touchstart',function(){
        sidebar(1);
    })
    $('.black').on('touchstart',function(){
        sidebar(2);
    })
    var wrap2=document.getElementById("wrap2");//获取ID
    var posStart2 = 0;//初始化起点坐标
    var posEnd2 = 0; //初始化终点坐标
    function initEvent2() {
        wrap2.addEventListener("touchstart", function(event) {
            event.preventDefault();//阻止浏览器默认行为
            posStart2 = 0;
            posStart2 = event.touches[0].pageY;//获取起点坐标
            posStartX2 = event.touches[0].pageX;//获取起点坐标
        });
        wrap2.addEventListener("touchend", function(event) {
            event.preventDefault();
            posEnd2 = 0;
            posEnd2 = event.changedTouches[0].pageY;//获取终点坐标
            posEndX2 = event.changedTouches[0].pageX;//获取终点坐标
            var nY2 = posStart2 - posEnd2;
            var nX2 = posEndX2 - posStartX2;
            if(nX2 < -50 && Math.abs(nY2) < Math.abs(nX2)){
                sidebar(1);
            };
            if(nX2 > 50 && Math.abs(nY2) < Math.abs(nX2)){
                sidebar(2);
            };
        });
    };
    initEvent2();

    /*关闭侧边栏并打开某个页面*/
    function closesidebar(l,r){
        sidebar(0);
        $(l).addClass('cur');
        $(r).fadeIn();
        setTimeout(function(){
            $(l).removeClass('cur');
        },500)
    }

    /*侧边栏事件*/
    $('.sidebarsub1').on('click',function(){ //活动详情
        closesidebar(this,'.hdxqbox');
        // $('.wrap2_upload').fadeOut();
        // $('.wrap2_photo').fadeOut();
        // $('.xgtk').fadeOut();
        // $('.pro1').animate({'opacity':'0','zIndex':'-1'},1000);
        // $('.pro2').animate({'opacity':'0','zIndex':'-1'},1000);
        // $('.cut_rus').fadeOut();
        // $('.fenxiang').fadeOut();
        // $('.ewm').fadeOut();
        // $('.piclist').css({'zIndex':'-1','opacity':'0'})
        // $('.result-pop-play').fadeOut();
        // $('.index_logo').fadeIn();
        urlindex=2;
        changePart();
    })
    $('.closesub1').on('touchstart',function(){
        $('.hdxqbox').fadeOut();
    })


    function backindex(){
        $('.wrap2_upload').fadeOut();
        $('.hdxq').fadeOut();
        $('.piclist').animate({'zIndex':'-1','opacity':'0'});
        $('.pro1').animate({'opacity':'0','zIndex':'-1'},1000);
        $('.pro2').animate({'opacity':'0','zIndex':'-1'},1000);
        $('.result-pop-play').fadeOut();
        $('.xgtk').fadeOut();
        $('.wrap2_photo').fadeOut();
        var myVideo = document.getElementsByTagName('video')[0];
        $('.result-pop-play').fadeOut();
        myVideo.pause();
        $('#audio').trigger('play');
    }
    //back事件
    var urlindexN;
    var trueflaseN;
    var urlindex=0;
    var trueflase=0;
    var hashvar;
    var hashname='hashname';
    var v=0;
    function lourl(urlindex){
        if(urlindex==1){ //回到KOL轮播
            $('.wrap').animate({'top':'0%'},500);
            $('.wrap2').animate({'top':'100%'},500);
        }
        if(urlindex==2){ //侧边栏点开后都是回首页
            backindex();
            urlindexN=1;
            trueflaseN=2;
        }
        if(urlindex==3){  
            $('.wrap2_photo').fadeOut();
            $('.wrap2_upload').fadeIn();
            urlindexN=2;
            trueflaseN=2;
        }
        if(urlindex==4){  
            $('.ewm').fadeOut();
            $('.cut_rus').fadeOut();
            $('.wrap2_photo').fadeIn();
            urlindexN=3;
            trueflaseN=2;
        }
        if(urlindex==5){
            $('.pro2').animate({'opacity':'0','zIndex':'-1'},1000);
            $('.cut_rus').fadeIn();
            urlindexN=4;
            trueflaseN=2;
        }
    }
    // 使用 location.hash 属性来修改锚部分
    function changePart() {
        v++;
        hashvar=hashname+v;
        trueflase=1;
        location.hash = hashvar;
        setTimeout(function(){trueflase=2},500)
    }

    window.addEventListener("hashchange", function(){
        if(trueflase == 2){
            lourl(urlindex)
            urlindex=urlindexN;
            trueflase=trueflaseN;
        }
    });


    $('.sidebarsub2').on('touchstart',function(){ //制作海报
        closesidebar(this,'.wrap2_upload');
        $('.hdxqbox').fadeOut();
        $('.wrap2_photo').fadeOut();
        $('.xgtk').fadeOut();
        $('.pro1').animate({'opacity':'0','zIndex':'-1'},1000);
        $('.pro2').animate({'opacity':'0','zIndex':'-1'},1000);
        $('.cut_rus').fadeOut();
        $('.fenxiang').fadeOut();
        $('.ewm').fadeOut();
        $('.piclist').css({'zIndex':'-1','opacity':'0'})
        $('.result-pop-play').fadeOut();
        $('.index_logo').fadeIn();
        urlindex=2;
        changePart();
    })
    $('.xgtksub').on('touchstart',function(){ //相关条款
        $('.xgtk').fadeIn();
        $('.hdxqbox').fadeOut();
        $('.wrap2_photo').fadeOut();
        $('.wrap2_upload').fadeOut();
        $('.pro1').animate({'opacity':'0','zIndex':'-1'},1000);
        $('.pro2').animate({'opacity':'0','zIndex':'-1'},1000);
        $('.cut_rus').fadeOut();
        $('.fenxiang').fadeOut();
        $('.ewm').fadeOut();
        $('.piclist').css({'zIndex':'-1','opacity':'0'})
        $('.result-pop-play').fadeOut();
    })
    $('.closesub2').on('touchstart',function(){
        $('.xgtk').fadeOut();
        $('.wrap2_upload').fadeIn();
    })
    $('.btn_upload2').on('touchstart',function(){ //重新上传
        $('.wrap2_photo').fadeOut();
        $('.wrap2_upload').fadeIn();
    })
    $('.sidebarsub4').on('touchstart',function(){ //产品页
        //closesidebar(this,'.pro1');
        sidebar(0);
        $(this).addClass('cur');
        $('.pro1').css({'zIndex':'98'})
        $('.pro1').animate({'opacity':'1'},1000)
        setTimeout(function(){
            $('.sidebarsub4').removeClass('cur');
        },500)
        $('.pro2').animate({'opacity':'0','zIndex':'-1'},1000);
        $('.wrap2_upload').fadeOut();
        $('.wrap2_photo').fadeOut();
        $('.xgtk').fadeOut();
        $('.hdxqbox').fadeOut();
        $('.cut_rus').fadeOut();
        $('.fenxiang').fadeOut();
        $('.ewm').fadeOut();
        $('.piclist').css({'zIndex':'-1','opacity':'0'})
        $('.result-pop-play').fadeOut();
        $('.index_logo').fadeIn();
        urlindex=2;
        changePart();
    })
    $('.photo_btn').on('touchstart',function(){ //生成图片
        $('.cut_rus').fadeIn();
        $('.ewm').fadeIn();
        urlindex=4;
        changePart();
    })
    $('.closesub3').on('touchstart',function(){ //关闭二维码
        $('.ewm').fadeOut();
    })
    $('.photo_btn3').on('touchstart',function(){ //打开产品
        $('.pro2').css({'zIndex':'98'})
        $('.pro2').animate({'opacity':'1'},1000)
        urlindex=5;
        changePart();
    })
    $('.photo_btn1').on('touchstart',function(){ //从裁剪结果页打开作品列表
        $('.cut_rus').fadeOut();
        $('.piclist').css({'zIndex':'97','opacity':'1'});
        $('.index_logo').fadeOut();
        loadMeinv();
        urlindex=2;
        changePart();
    })
    $('.photo_btn2').on('touchstart',function(){ //打开分享
        $('.fenxiang').fadeIn();
    })
    $('.photo_btn4').on('touchstart',function(){ //关闭分享
        $('.fenxiang').fadeOut();
    })
    $('.sidebarsub3').on('touchstart',function(){ //打开作品
        closesidebar(this,'.piclist');
        $('.wrap2_upload').fadeOut();
        $('.wrap2_photo').fadeOut();
        $('.xgtk').fadeOut();
        $('.pro1').animate({'opacity':'0','zIndex':'-1'},1000);
        $('.pro2').animate({'opacity':'0','zIndex':'-1'},1000);
        $('.cut_rus').fadeOut();
        $('.fenxiang').fadeOut();
        $('.ewm').fadeOut();
        $('.hdxqbox').fadeOut();
        $('.result-pop-play').fadeOut();
        $('.index_logo').fadeOut();
        setTimeout(function(){
            $('.piclist').css({'zIndex':'97','opacity':'1'})
            loadMeinv();
        },500)
        urlindex=2;
        changePart();
    })
    $('.rus_upload2').on('touchstart',function(){ //结果页重新上传图片
        $('.cut_rus').fadeOut();
        $('.wrap2_photo').fadeOut();
        $('.wrap2_upload').fadeIn();
    })

    /*提交信息*/
    function mesupload(){
        $('.mesbox').slideUp();
        $('.ewmbig').fadeIn();        
    }
    $('.ewm_sub').click(function(){
        mesupload();
    })
    /*审核成功*/
    function messcu(){
        mesupload();
        $('.ewmtit2').show();
        $('.ewmtit1').hide();
        $('.ewm_text2').show();
        $('.ewm_text1').hide();
    }
    /*审核失败*/
    function messfail(){
        mesupload();
        $('.ewmtit3').show();
        $('.ewmtit1').hide();
        $('.ewm_text3').show();
        $('.ewm_text1').hide();
    }
    $('.fail_upload').click(function(){
        $('.wrap2_upload').fadeIn();
        $('.hdxqbox').fadeOut();
        $('.wrap2_photo').fadeOut();
        $('.xgtk').fadeOut();
        $('.pro1').animate({'opacity':'0','zIndex':'-1'},1000);
        $('.pro2').animate({'opacity':'0','zIndex':'-1'},1000);
        $('.cut_rus').fadeOut();
        $('.fenxiang').fadeOut();
        $('.ewm').fadeOut();
        $('.piclist').css({'zIndex':'-1','opacity':'0'})
        $('.result-pop-play').fadeOut();
        mesupload();
        $('.ewmtit3').hide();
        $('.ewmtit1').show();
        $('.ewm_text3').hide();
        $('.ewm_text1').show();
    })
    /*审核中*/
    function mesload(){
        mesupload();
        $('.ewmtit4').show();
        $('.ewmtit1').hide();
        $('.ewm_text4').show();
        $('.ewm_text1').hide();
    }
    /*好友分享页*/
    function friend(){
        $('.wrap').animate({'top':'-100%'},500);
        $('.wrap2').animate({'top':'0'},500);
        eub.kindle.indexain();
        $('.fr_show').fadeIn();
    }
    $('.fr_btn').on('touchstart',function(){
        $('.wrap').animate({'top':'0%'},500);
        $('.wrap2').animate({'top':'100%'},500);
        $('.fr_show').fadeOut();
    })
    
    /*上传图片*/
    $('.index_btn1').on('touchstart',function(){
        $('.wrap2_upload').fadeIn();
        urlindex=2;
        changePart();
    })
    $('.upload').on('touchstart',function(){
        eub.kindle.init();
        $('.cutting-img-editor').css({'height':$('.upload_tit').height()});
        $('.cutting-img-editor img').css({'height':$('.upload_tit').height()});
        $('.cutting-img-editor img').css({'width':$('.upload_tit').width()});
        //alert($(window).innerWidth()*0.6666)
        $('.wrap2_upload').fadeOut();
        $('.wrap2_photo').fadeIn();
        urlindex=3;
        changePart();
    })

    /*裁剪图片换标题*/
    $('.btn_white').on('touchstart',function(){
        $('.tit_white').show();
        $('.tit_black').hide();
        $(this).attr('src','images/btn_white2.png');
        $('.btn_black').attr('src','images/btn_black.png');
    })
    $('.btn_black').on('touchstart',function(){
        $('.tit_white').hide();
        $('.tit_black').show();
        $(this).attr('src','images/btn_black2.png');
        $('.btn_white').attr('src','images/btn_white.png');
    })

    /*视频*/
    $(".play").on('touchstart',function(){
        $('#audio').trigger('pause');
        $('.result-pop-play').fadeIn();
        $('.index_logo').fadeIn();
    });
    $(".sidebarsub5").on('touchstart',function(){
        $('#audio').trigger('pause');
        closesidebar(this,'.result-pop-play');
        // $('.wrap2_upload').fadeOut();
        // $('.wrap2_photo').fadeOut();
        // $('.xgtk').fadeOut();
        // $('.pro1').animate({'opacity':'0','zIndex':'-1'},1000);
        // $('.pro2').animate({'opacity':'0','zIndex':'-1'},1000);
        // $('.cut_rus').fadeOut();
        // $('.fenxiang').fadeOut();
        // $('.ewm').fadeOut();
        // $('.piclist').css({'zIndex':'-1','opacity':'0'})
        // $('.hdxqbox').fadeOut();
        urlindex=2;
        changePart();
    });
    $('.result-pop-video').on('touchstart',function(){
        var myVideo = document.getElementsByTagName('video')[0];
        myVideo.play();
    })
    $('.closesub4').on('touchstart',function(){
        var myVideo = document.getElementsByTagName('video')[0];
        $('.result-pop-play').fadeOut();
        myVideo.pause();
        $('#audio').trigger('play');
    });

    //产品切换
    $dragBln = false;
    
    $(".main_image1").touchSlider({
        flexible : true,
        speed : 200,
        btn_prev : $("#btn_prev"),
        btn_next : $("#btn_next"),
        paging : $(".flicking_con1 a"),
        counter : function (e){
            $(".flicking_con a").removeClass("on").eq(e.current-1).addClass("on");
        }
    });
    
    $(".main_image1").bind("mousedown", function() {
        $dragBln = false;
    });
    

    $(".main_image1").bind("dragstart", function() {
        $dragBln = true;
    });
    
    $(".main_image1 a").click(function(){
        if($dragBln) {
            return false;
        }
    });
    
    timer = setInterval(function(){
        $("#btn_next").click();
    }, 5000);
    
    $(".main_image1").bind("touchstart",function(){
        clearInterval(timer);
    }).bind("touchend", function(){
        timer = setInterval(function(){
            $("#btn_next").click();
        }, 5000);
    });


    //产品切换
    $dragBln = false;
    
    $(".main_image2").touchSlider({
        flexible : true,
        speed : 200,
        btn_prev : $("#btn_prev2"),
        btn_next : $("#btn_next2"),
        paging : $(".flicking_con2 a"),
        counter : function (e){
            $(".flicking_con2 a").removeClass("on").eq(e.current-1).addClass("on");
        }
    });
    
    $(".main_image2").bind("mousedown", function() {
        $dragBln = false;
    });
    
    $(".main_image2").bind("dragstart", function() {
        $dragBln = true;
    });
    
    $(".main_image2 a").click(function(){
        if($dragBln) {
            return false;
        }
    });
    
    timer2 = setInterval(function(){
        $("#btn_next2").click();
    }, 5000);
    
    $(".main_visual2").hover(function(){
        clearInterval(timer2);
    },function(){
        timer2 = setInterval(function(){
            $("#btn_next2").click();
        },5000);
    });
    
    $(".main_image2").bind("touchstart",function(){
        clearInterval(timer2);
    }).bind("touchend", function(){
        timer2 = setInterval(function(){
            $("#btn_next2").click();
        }, 5000);
    });


    /*瀑布流加载*/
    function loadMeinv(){
        var data = 0;
        for(var i=0;i<9;i++){//每次加载时模拟随机加载图片
            data = parseInt(Math.random()*9);
            var html = "";
            html = '<li><img src = images/'+data+'.jpg><p><img src = images/'+data+'.jpg><span><span>微信名字'+data+'</span></span></p></li>'
            $minUl = getMinUl();
            $minUl.append(html);
            $('#alimgscro li').css({'width':$('.alimgscro').width()})
            $('#alimgscro li p img').css({'width':'12%','height':$('#alimgscro li p img').eq(0).innerWidth()})
            $('#container ul li').height($('#container ul li').find('img').width());
            lilen=alimgscro.getElementsByTagName('li').length
        }
    }
    $('#container').on("scroll",function(){
        $minUl = getMinUl();
        if($minUl.height() <= $('#container').scrollTop()+$('#container').height()){
        //当最短的ul的高度比窗口滚出去的高度+浏览器高度大时加载新图片
            loadMeinv();
        }
    })
    //$('#container ul li').height($(this).width());
    function getMinUl(){//每次获取最短的ul,将图片放到其后
        var $arrUl = $("#container .col");
        var $minUl =$arrUl.eq(0);
        $arrUl.each(function(index,elem){
            if($(elem).height()<$minUl.height()){
                $minUl = $(elem);
            }
        });
        return $minUl;
    }

    /*图片切换*/
    var liw;
    var o = o || 0;
    var alimgscro=document.getElementById('alimgscro');
    var lilen;
    function scro(o){
        liw = $('.alimgscro').width();
        $('#alimgscro').animate({'left':-liw*o},500)
    }
    function scror(){
        o++;
        if(o==lilen){o=lilen-1}
        scro(o)
    }
    function scrol(){
        o--;
        if(o==-1){o=0}
        scro(o)
    }
    $('#subright').on('touchstart',function(){
        scror();
    })
    $('#subleft').on('touchstart',function(){
        scrol();
    })    
    var wrap3=document.getElementById("alimgbox");//获取ID
    var posStart3 = 0;//初始化起点坐标
    var posEnd3 = 0; //初始化终点坐标
    function initEvent3() {
        wrap3.addEventListener("touchstart", function(event) {
            event.preventDefault();//阻止浏览器默认行为
            posStart3 = 0;
            posStart3 = event.touches[0].pageY;//获取起点坐标
            posStartX3 = event.touches[0].pageX;//获取起点坐标
        });
        wrap3.addEventListener("touchend", function(event) {
            event.preventDefault();
            posEnd3 = 0;
            posEnd3 = event.changedTouches[0].pageY;//获取终点坐标
            posEndX3 = event.changedTouches[0].pageX;//获取终点坐标
            var nY3 = posStart3 - posEnd3;
            var nX3 = posEndX3 - posStartX3;
            if(nX3 < -50 && Math.abs(nY3) < Math.abs(nX3)){
                scror();
            };
            if(nX3 > 50 && Math.abs(nY3) < Math.abs(nX3)){
                scrol();
            };
        });
    };
    initEvent3();

    /*图片放大*/
    var index_li;
    $('#listli').on('click','li',function(){
        $('.alertbox').css({'zIndex':'100','opacity':'1'});
        index_li=$(this).index();
        o=index_li;
        scro(o)
    })
    $('.closesub5').on('touchstart',function(){
        $('.alertbox').css({'zIndex':'-1','opacity':'0'});
    })



})