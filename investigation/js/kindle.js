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


})(jQuery,eub)

/*提交*/
$(".button").click(function(){
        if($("[name = 'Time']:checked").val() == undefined){               //判断第一项name是否取到值
            $("html,body").animate({scrollTop:$("#select").offset().top},1000)     //滑动到锚点
            $(".p1").hide();
            $(".p1_2").show();
        }else if($("[name = 'Serve']:checked").val() == undefined){       //判断第二项name是否取到值
            $("html,body").animate({scrollTop:$("#select2").offset().top},1000)    //滑动到锚点
            $(".p2").hide();
            $(".p2_2").show();
        }else if($("[name = 'wei']:checked").val() == undefined){      //判断第三项name是否取到值
            $("html,body").animate({scrollTop:$("#select3").offset().top},1000)    //滑动到锚点
            $(".p3").hide();
            $(".p3_2").show();
        } else{
            $('#form_login').ajaxSubmit({
                type:'post',
                url:'/survey/151111/action.php?act=save',
                dataType:'json',

                beforeSubmit:function(){

                },
                success:function(data){
                    $('.pop-up').toggle();                   
                                      
                }

            });
        }
});
//选择后文字变回原来
$("[name = 'Time']").click(function(){
    $(".p1").show();
    $(".p1_2").hide();
});
$("[name = 'Serve']").click(function(){
    $(".p2").show();
    $(".p2_2").hide();
});
$("[name = 'Times']").click(function(){
    $(".p3").show();
    $(".p3_2").hide();
});








