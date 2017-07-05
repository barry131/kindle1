// (function($,eub){
//     "use strict";
//     // *
//     //  * @copyright ±±¾©ºêÍ¼ÊÀÕ¹ÍøÂç¿Æ¼¼·þÎñÓÐÏÞ¹«Ë¾
//     //  * @author chendeping
//     //  * @date 20150728
//     //  * @global
//     //  * @namespace eub.kindle
     
//     var dell = eub.register('eub.kindle');

// })(jQuery,eub)
/*手机正则*/
// $(function(){
//     $(".icon_lottery").click(function() {
//     var name = $("#name").val();
//     if (name == "") {
//     return false;
//     }
// var phone = $("#phone").val();
// if (phone == "") {
//     return false;
//     }else{
//     if (!phone.match(/^1[3|4|5|7|8][0-9]\d{8}$/)) {
//     alret()
//     return false;
//     }else{
//     $('.errors').hide().html()
//     }
// }
// });
// });
/*滚动*/
(function($){

    $.fn.myScroll = function(options){
    //默认配置
    var defaults = {
        speed:50,  //滚动速度,值越大速度越慢
        rowHeight:45 //每行的高度
    };
    
    var opts = $.extend({}, defaults, options),intId = [];
    
    function marquee(obj, step){
    
        obj.find("ul").animate({
            marginTop: '-=1'
        },0,function(){
                var s = Math.abs(parseInt($(this).css("margin-top")));
                if(s >= step){
                    $(this).find("li").slice(0, 1).appendTo($(this));
                    $(this).css("margin-top", 0);
                }
            });
        }
        
        this.each(function(i){
            var sh = opts["rowHeight"],speed = opts["speed"],_this = $(this);
            intId[i] = setInterval(function(){
                if(_this.find("ul").height()<=_this.height()){
                    clearInterval(intId[i]);
                }else{
                    marquee(_this, sh);
                }
            }, speed);

            _this.hover(function(){
                clearInterval(intId[i]);
            },function(){
                intId[i] = setInterval(function(){
                    if(_this.find("ul").height()<=_this.height()){
                        clearInterval(intId[i]);
                    }else{
                        marquee(_this, sh);
                    }
                }, speed);
            });
        
        });

    }

})(jQuery);

$(function(){

    $("div#demo").myScroll({
        speed:50,
        rowHeight:45
    });
    
})

/*大转盘*/
var rotation_handle = 0;
var speed = 35; //ms
var speed_max = 700; //ms
var current_angle_index = 0;
var current_angle_count = 8;
var is_running = 1;
var pi = 3.1415926;
var x = 0;
var stop_count = 20;//从快到满的次数
var check_stop;
var pdetail_id;
var is_re=true;
function start_lottery() {
    if (is_running) {
        return ;
    }
    is_running = 1;
    if (rotation_handle) {
        window.clearInterval(rotation_handle);
        rotation_handle = null;
    }
    rotation_handle = window.setInterval(function(){
        setAngle();
    } , speed);
};

String.prototype.replaceAll  = function(s1,s2){
    return this.replace(new RegExp(s1,"gm"),s2);
}

function stop_lottery() {
    //console.log(is_running != 1)
    var phone = $("#phone").val();
	if(phone == "" || !phone.match(/^1[3|4|5|7|8][0-9]\d{8}$/)){
		show_modal(".pop-phone");
		return false;
	}
    is_running = 2;
    $.ajax({
        url: "",
        //data: 'code=T5656',
        //dataType: 'json',
        cache:false,
        success:function(data){
            var data = data.replaceAll("\"", "").replaceAll("{", "").replaceAll("}", "").replaceAll("error", "").replaceAll("msg", "").replaceAll(":", "").split(",");
            //console.log(data)

//            var data = "'" + data + "'";
//            console.log(data)
//            data = JSON.parse(data)
//            console.log(typeof data)
//            console.log(data.msg)
            //alert(data);
            if(data[0]==1){
                if(data[1] ==1){
                    showNotEnough('modal-not-enough');
                }else{
                    alert('抱歉，连接超时！');
                }
                is_re = false;
                return false;
            }else{
                //alert(parseInt($.trim(data)));
                var stopPosition = parseInt(7);
                //console.log(stopPosition);
                //console.log(current_angle_count);
                //console.log(stopPosition >= current_angle_count);
                if (stopPosition >= current_angle_count) {
                    //没办法，只能一直转了
                    return false;
                }
                //使用抛物线方式结束旋转
                x = 0;
                window.setTimeout(function(){
                    window.clearInterval(rotation_handle);
                    rotation_handle = null;
                    doStop(stopPosition);
                }, 500);
                //window.setTimeout("doStop("+stopPosition+")", speed);
                var $back_string_array = $.trim(data[1]).split(",");
				check_stop = 1;
                //alert(check_stop);
            }
            start_lottery();
        },
        // error : function(textStatus, errorThrown) {
        //     alert("系统ajax交互错误: ");
        //     console.log(textStatus);
        // }
    });
    // $.get("user_table_result.php?code=t5656&tmp" + Date(), function(e){
    //  alert(parseInt($.trim(e)));
    //  var stopPosition = parseInt($.trim(e));
    //  //alert(stopPosition);
    //  if (stopPosition >= current_angle_count) {
    //      //没办法，只能一直转了
    //      return false;
    //  }
    //  //使用抛物线方式结束旋转
    //  x = 0;
    //  window.setTimeout(function(){
    //      window.clearInterval(rotation_handle);
    //      rotation_handle = null;
    //      doStop(stopPosition);
    //  }, 500);
    //  //window.setTimeout("doStop("+stopPosition+")", speed);
    //  var $back_string_array = $.trim(e).split(",");
    //  check_stop = $back_string_array[0];
    //  pdetail_id = $back_string_array[1];
    //  //alert(check_stop);
    // });
}
function doStop(stopPosition) {
    var newSpeed = speed + speed_max * (1 - Math.cos(x * 0.5 * pi / stop_count));
    
	if (x<stop_count) {
        x = x + 1 ;
    }
	console.log(stopPosition,current_angle_index,x,stop_count)
    if (stopPosition == current_angle_index && x>=stop_count ) {
		
        //这里是该停了
        is_running = false;
		
        if (check_stop == 0 ){
            //showNotEnough();
            //$('.pop-phone').show().html();
        }
        else if (check_stop == 1) {
			console.log(check_stop)
            show_modal(".pop-white");
        }else if(check_stop == 2){
            show_modal(".pop-white"); 
        }else if(check_stop == 3){
            $("#point_title").html("500");
            //alert("您中奖了，得到30个积分");
        }else if(check_stop == 4){
            $("#point_title").html("3000");
            //alert("您中奖了，得到50个积分");
        }else if(check_stop == 5){
            $("#point_title").html("300");
            //alert("您中奖了，得到100个积分");
        }else if(check_stop == 6){
            $("#point_title").html("1000");
            //alert(pdetail_id);
            $("#pdetail_id").val(pdetail_id);
            //alert("您中奖了，得到30元等值礼品");
        }else if(check_stop == 7){
            
            //alert("您中奖了，得到50元等值礼品");
        }else if(check_stop == 8){
            $("#point_title").html("2000");
            //alert(pdetail_id);
            $("#pdetail_id").val(pdetail_id);
            //alert("您中奖了，得到80元等值礼品");
        }
    }
    else {
        setAngle();
        window.setTimeout("doStop("+stopPosition+")", newSpeed);
    }
}

function setAngle() {
    if(is_re){
        var next_angle_index = (current_angle_index + 1) % current_angle_count ;
        var next_angle = next_angle_index * 360.0 / current_angle_count;
        $("#lottery-rotation").css({
            "-moz-transform" : "rotate(" + next_angle + "deg)" ,
            "-webkit-transform" : "rotate(" + next_angle + "deg)" ,
            "-o-transform" : "rotate(" + next_angle + "deg)"
        });
        current_angle_index = next_angle_index;
    }
}

function showNotEnough(obj) {
    show_modal("#"+obj);
    //不够积分
}
// function showUnReward() {
//     show_modal("#modal-un-reward");
// }

// function showReward() {
//     show_modal("#modal-reward");
// }

// function showReward2() {
//     show_modal("#modal-reward-input");
// }

// function showReward3() {
//     show_modal("#modal-reward-info");
// }

function show_modal(target_id) {
    $("<div class='modal-shadow'></div>").appendTo("body").click(close_modal);
    var sender = $(target_id);
    var top = (parseInt($(window).height()) - parseInt(sender.height()))/2;
    if (top < 0) {
        top = 0;
    }
    sender.css({ 'display' : 'block' , 'top' : top });
}
function close_modal() {
    $(".modal-mail-pane").css("display" , "none");
    $(".modal-shadow").remove();
}

$(function(){
    $(".lottery-button").bind("touchstart", function(){
        start_lottery();
    });

    $(".lottery-button").bind("touchend", function(){
        stop_lottery();
    });
})

/*点击显示说明*/
var kindle={
    SaTab:function(){
        $('.tab').click(function(){
            $('.pop-rule').toggle();
            $("body").css({overflow:"hidden"})
        });
    },
    SbTab:function(){
        $('.cls').click(function(){
            $('.pop-rule').toggle();
            $("body").css({overflow:"scroll"})
        });
    },
	ScTab:function(){
        $('.close1').click(function(){
            $('.pop-phone').toggle();
        });
    },
    SdTab:function(){
        $('.close2').click(function(){
            $('.pop-book').toggle();
        });
    },
    SeTab:function(){
        $('.close3').click(function(){
            $('.pop-black').toggle();
        });
    },
    SfTab:function(){
        $('.close4').click(function(){
            $('.pop-white').toggle();
        });
    },
}
window .onload=function(){
    kindle.SaTab();
    kindle.SbTab();
	kindle.ScTab();
    kindle.SdTab();
    kindle.SeTab();
    kindle.SfTab();
}

/*点击input框*/

// $(document).ready(function(){
//   $("input").click(function(){
//     $("body").css("margin-top","-2%");
//   });
//   $("input").blur(function(){
//     $("body").css("margin-top","0");
//   });
// });





