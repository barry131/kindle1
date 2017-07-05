(function($,eub){
    "use strict";
    /**
     * @copyright ±±¾©ºêÍ¼ÊÀÕ¹ÍøÂç¿Æ¼¼·þÎñÓÐÏÞ¹«Ë¾
     * @author chendeping
     * @date 20150728
     * @global
     * @namespace eub.dell
     */
    var kindle = eub.register('eub.kindle');

    /**
     * 书单页面滚动加载书
     * @memberOf eub.kindle
     * @namespace eub.kindle.divScroll
     * @function
     * @example
     *     1. eub.kindle.divScroll();
     */
    kindle.divScroll = function(){
        $('.search-ss-mains').scroll(function(){
            var self = $(this),
                scrTop = self.scrollTop(),
                heights = self.find('ul').innerHeight() - self.innerHeight() + $('.load').height();
                if(scrTop > heights){
                    var data = {};
                    eub.tools.ajax('post',/*"data.json"*/'url',data,function(data){
                        self.find('ul').append(data.html);
                    })
                }
        })
    }



    /**
     * 初始页面说需要的方法
     * @memberOf eub.kindle
     * @namespace eub.kindle.init
     * @function
     * @example
     *     1. eub.kindle.init();
     */
    kindle.init = function(){
        kindle.divScroll();
    }
})(jQuery,eub)


/*点击显示*/
var kindle={
    NavTab:function(){
        $('.len').click(function(){
            $('.bookdetail-tj-titles').toggle();
            $('.bookdetail-tt').toggle();
            $('.bookdetail-tj').toggle();
        })
    },
    SaTab:function(){
        $('.short').click(function(){
            $('.bookdetail-tj-titles').toggle();
            $('.bookdetail-tt').toggle();
            $('.bookdetail-tj').toggle();
        })
    },
    SbTab:function(){
        $('.open').click(function(){
            $('.sec-title-right').toggle();
            $('.sec-title-right2').toggle();
            $('.time').toggle();
        })
    },
    ScTab:function(){
        $('.shut').click(function(){
            $('.sec-title-right').toggle();
            $('.sec-title-right2').toggle();
            $('.time').toggle();
        })
    },
    SdTab:function(){
        $('.start').click(function(){
            $('.sec_ri').toggle();
            $('.sec_ri2').toggle();
            $('.time2').toggle();
        })
    },
    SeTab:function(){
        $('.cut').click(function(){
            $('.sec_ri').toggle();
            $('.sec_ri2').toggle();
            $('.time2').toggle();
        })
    },
    SfTab:function(){
        $('.more').click(function(){
            $('.fewer').toggle();
            $('.even_more').toggle();
            $('.list1').toggle();           
            $('.more').toggle();
            // $('.list2').toggle();
        })
    },
    // SgTab:function(){
    //     $('.fewer').click(function(){
    //         $('.more').toggle();
    //         $('.even_more').toggle();
    //         $('.list2').toggle();
    //         $('.list1').toggle();
    //         $('.fewer').toggle();
    //     })
    // },
    ShTab:function(){
        $('.ser').click(function(){
            $('.top').toggle();
            $('.search-titles').toggle();
        })
    },
    SiTab:function(){
        $('.search-btns').click(function(){
            $('.top').toggle();
            $('.search-titles').toggle();
        })
    },
    SjTab:function(){
        $('.like').click(function(){          
                $.ajax({
                    url:'',//后台处理路径
                    type:'post',//post提交方式
                    data:''/*{id:id}*/,//点赞的文章id
                    success:function(data){//数据返回成功
                    $('.pop-main').toggle();
                    alert(data)
                    if(data.error==1){//成功
                        alert(1);
                        }
                    }
                })
        })
    },
    SkTab:function(){
        $('.two-dim').click(function(){
            $('.pop-code').toggle();
        })
    },
    SlTab:function(){
        $('.cos').click(function(){
            $('.pop-code').toggle();
        })
    },
    SmTab:function(){
        $('.sers').click(function(){
            $('.tops').toggle();
            $('.search-titlea').toggle();
        })
    },
    SnTab:function(){
        $('.search-btna').click(function(){
            $('.tops').toggle();
            $('.tit').toggle();
            $('.search-titlea').toggle();
        })
    },
    SoTab:function(){
        $('.pop-main').click(function(){
            $('.pop-main').toggle();
        })
    },
//首页模块2左右滑动
	// fenleiTab:function(){
	// 	var tabsSwiper = new Swiper('.swiper-container',{
 //            speed:500,
 //            onSlideChangeStart: function(){
 //                $(".tabs .active").removeClass('active');
 //                $(".tabs a").eq(tabsSwiper.activeIndex).addClass('active');
 //            }
 //        });
        
 //        $(".tabs a").on('touchstart mousedown',function(e){
 //            e.preventDefault()
 //            $(".tabs .active").removeClass('active');
 //            $(this).addClass('active');
 //            tabsSwiper.swipeTo($(this).index());
 //        });
        
 //        $(".tabs a").click(function(e){
 //            e.preventDefault();
 //        });
	// }
//end
}
window.onload=function(){
    kindle.NavTab();
    kindle.SaTab();
    kindle.SbTab();
    kindle.ScTab();
    kindle.SdTab();
    kindle.SeTab();
    kindle.SfTab();
    kindle.ShTab();
    kindle.SiTab();
    kindle.SjTab();
    kindle.SkTab();
    kindle.SlTab();
    kindle.SmTab();
    kindle.SnTab();
    kindle.SoTab();
    eub.kindle.init();
	// kindle.fenleiTab();
    // kindle.SgTab();
}
/*end*/
// /*首页左右轮播*/
// var eobj,leftval;
// var slide_len=$(".carousel li").length
// $(".carousel").css({"width":$(window).width()*slide_len+"px","height":$(".carousel li img").height()});
// $(".carousel li").css({"width":$(window).width()+"px","height":$(".carousel li img").height()});
// for(var i = 0; i < slide_len; i++){
//     if(i ==0 ){
//         $(".circle_div").html("<li class='circle_cur'></li>");
//     }else{
//         $(".circle_div").html($(".circle_div").html()+"<li></li>");
//     }
// }
// function circle_fun(){
//     leftval = parseInt($(".carousel").css("left"));
//     eobj=Math.abs(leftval/$(window).width());
//     for(var i = 0; i < slide_len; i++){
//         if(i == eobj){
//             $(".circle_div li:eq("+i+")").addClass("circle_cur");
//         }else{
//             $(".circle_div li:eq("+i+")").removeClass("circle_cur");
//         }
//     }   
// }
// setInterval(function(){
//     leftval = $(".carousel").css("left");
//     leftval = parseInt(leftval)-$(window).width();
//     if(Math.abs(leftval) == $(".carousel").width()){
//         leftval = 0;
//     }
//     $(".carousel").css("left",leftval + "px");
//     circle_fun();
// },5000);
/*搜索框内x的显示隐藏*/
$(function(){
    var search = $(".search-texts");
    search.keyup(function(e){
        getdata(1);
        if(e.keyCode==38){
            $('.aa').show().html();
            alert("up");
            move(true);
        }
        else if(e.keyCode==40){
            $('.aa').hide().html();
            alert("40");
            move(false);
        }
    })
})
 

