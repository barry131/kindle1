// JavaScript Document

$(function(){
	var _headerHeight = $("#user .head").outerHeight(true) + $(".introduce1").outerHeight(true);
	var _daohangHeight = $(".daohang").outerHeight(true);

	var _n1 = $("#bg1").outerHeight(true);
	var _n2 = $("#bg2").outerHeight(true);
	var _n3 = $("#denglu").outerHeight(true) + $(".pic3").outerHeight(true) + $(".email").outerHeight(true) + $(".pic4").outerHeight(true);
	var _n4 = $("#xian1").outerHeight(true) + $(".save1").outerHeight(true) + $(".pic5").outerHeight(true);
	var _n5 = $("#xian2").outerHeight(true) + $(".save2").outerHeight(true) + $(".pic6").outerHeight(true);
	window.onscroll = function(e){
		//设置固定导航样式		
		if(document.body.scrollTop > _headerHeight){
			$(".daohang").css({
				"position": "fixed",
				"top": 0,
				"left": 0	
			})
			
			$(".daohang").next().css({
				"marginTop": _daohangHeight
			})
		}else{
			$(".daohang").css({
				"position": "initial",
				"top": 0,
				"left": 0	
			})
			
			$(".daohang").next().css({
				"marginTop": "initial"
			})
		}
		console.log("total-" + (_headerHeight + _n1))
		console.log(document.body.scrollTop)
		//切换导航提示
		if(document.body.scrollTop > _headerHeight && document.body.scrollTop < (_headerHeight + _n1)){
			$(".daohang").find(".aimg").show();
			$(".daohang").find(".blue").hide();
			$(".daohang").children("a").eq(0).find(".aimg").hide();
			$(".daohang").children("a").eq(0).find(".blue").show();
		}else if(document.body.scrollTop > (_headerHeight + _n1) && document.body.scrollTop < (_headerHeight + _n1 + _n2) ){
			$(".daohang").find(".aimg").show();
			$(".daohang").find(".blue").hide();
			$(".daohang").children("a").eq(1).find(".aimg").hide();
			$(".daohang").children("a").eq(1).find(".blue").show();
		}else if(document.body.scrollTop > (_headerHeight + _n1 + _n2) && document.body.scrollTop < (_headerHeight + _n1 + _n2 + _n3) ){
			$(".daohang").find(".aimg").show();
			$(".daohang").find(".blue").hide();
			$(".daohang").children("a").eq(2).find(".aimg").hide();
			$(".daohang").children("a").eq(2).find(".blue").show();
		}else if(document.body.scrollTop > (_headerHeight + _n1 + _n2 + _n3) && document.body.scrollTop < (_headerHeight + _n1 + _n2 + _n3 + _n4) ){
			$(".daohang").find(".aimg").show();
			$(".daohang").find(".blue").hide();
			$(".daohang").children("a").eq(3).find(".aimg").hide();
			$(".daohang").children("a").eq(3).find(".blue").show();
		}else if(document.body.scrollTop > (_headerHeight + _n1 + _n2 + _n3 + _n4) && document.body.scrollTop < (_headerHeight + _n1 + _n2 + _n3 + _n4 + _n5) ){
			$(".daohang").find(".aimg").show();
			$(".daohang").find(".blue").hide();
			$(".daohang").children("a").eq(4).find(".aimg").hide();
			$(".daohang").children("a").eq(4).find(".blue").show();
		}
	}
})


//弹出层
$(".pass").click(function(){
	  $(".share_main").show();
});
$(".share_main").click(function(){
	  $(this).hide();
});
