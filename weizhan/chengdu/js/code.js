
var _self;

var hdsj={

	scrolls :{
		startX:0,
		startY:0, 
		scrX:0,
		scrY:0,
		ids:0,
		leng:null, 
		isvideo:true,
	},
	aetH:function(obj,obj1){
		$('.'+obj).width($(window).width());   

		$('.'+obj1).each(function(i,v){
			$('.'+obj1).eq(i).css('width',$(window).width());
		})
	},
	touchSatrtFunc:function(evt){
		//evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
		var touch = evt.touches[0]; //获取第一个触点  
		var x = Number(touch.pageX); //页面触点X坐标  
		var y = Number(touch.pageY); //页面触点Y坐标  
		//记录触点初始位置  
		_self.scrolls.startX =x;  
		_self.scrolls.startY =y;   
		var Media = document.getElementsByTagName("audio")[0];
		_self.scrolls.isvideo ?	Media.play(): Media.pause();
	},
	touchMoveFunc:function(evt){
		evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
		//evt.stopPropagation();//阻止事件冒泡
		var touch = evt.touches[0]; //获取第一个触点  
		var x = Number(touch.pageX); //页面触点X坐标  
		var y = Number(touch.pageY); //页面触点Y坐标

		_self.scrolls.scrX=x - _self.scrolls.startX;
		_self.scrolls.scrY=y - _self.scrolls.startY;
		//判断滑动方向  
		if(_self.scrolls.scrX > 30 && _self.scrolls.ids == 0){
			_self.scrolls.scrX=0;
		}else if(_self.scrolls.scrX < 30 && _self.scrolls.leng-1==_self.scrolls.ids){
			_self.scrolls.scrX=0;
		}			
		$(this)[0].style.webkitTransition='none';
		$(this)[0].style.webkitTransform = 'translate3d( '+ (_self.scrolls.scrX + _self.scrolls.ids*(-$(this).width()/_self.scrolls.leng)) +'px,0,0)'; 
	},
	touchEndFunc:function(){
		//evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等  
		//evt.stopPropagation();//阻止事件冒泡
		if(_self.scrolls.scrX<-30){
			if(_self.scrolls.leng-1==_self.scrolls.ids){
				_self.scrolls.ids=_self.scrolls.leng-1;
			}else{
				_self.scrolls.ids++;
			}
		}else if(_self.scrolls.scrX>30){
			if(_self.scrolls.ids==0){
				_self.scrolls.ids=0
			}else{
				_self.scrolls.ids--;
			}
		};	
		$(this)[0].style.webkitTransform = 'translate3d( '+ (_self.scrolls.ids*(-$(this).width()/_self.scrolls.leng)) +'px,0,0)';
		$(this)[0].style.webkitTransition = '-webkit-transform 0.4s ease-out';
		// _self.tarnform();
		if(_self.scrolls.scrX<-30 || _self.scrolls.scrX>30){
			_self.iswie('slide article',_self.scrolls.ids);
			//_self.iswie('main_font',_self.scrolls.ids);
		}
		_self.scrolls.scrX=0;


		if (_self.scrolls.ids==0) { 
			$('.right').show();
			$('.left').hide();
		};
		if (_self.scrolls.ids==1) { 
			$('.left').show();
			$('.right').hide();
		};
	}, 

	iswie:function(obj,idx){
		var $articles = $('.'+obj);
		var $article = $('.'+obj).eq(idx).find("[tag-name]");
		var leng = $article.length;
		//去掉动画
		for(var i=0; i<leng;i++){
			var _tag = $article.eq(i).attr('tag-name');
			var _delays = $article.eq(i).attr("tag-delay");
			$article.eq(i).removeClass("animated "+ _tag);

			if(Number(_delays) == 301){ 
				$('.mwem_left').removeClass('asdf');
				$('.ewm').removeClass('asdf');
			}
		}
		//添加动画
			for(var i = 0; i < leng; i++){
				var _tag = $article.eq(i).attr('tag-name');
				var _delay = $article.eq(i).attr("tag-delay");

				if(_delay){
					if(Number(_delay) == 301){
						delayAni($article.eq(i), Number(_delay), _tag);
						setTimeout(function(){
							$('.mwem_left').addClass('asdf');
							$('.ewm').addClass('asdf');
						}, 900);
					}else{
						delayAni($article.eq(i), Number(_delay), _tag);
					}
				}else{
					$article.eq(i).addClass("animated "+ _tag);
				}
			}
		//控制什么时候添加动画
		function delayAni(obj, time, tag){
			setTimeout(function(){
				obj.addClass("animated "+ tag);
			}, time)
		}
	 },
	 audioSwitch: function(){
		var Media = document.getElementsByTagName("audio")[0];
		Media.play();
		$("body")[0].addEventListener("touchstart", function(){
			if(_self.audioNum==0){
				Media.play();
				_self.audioNum++;
			}
		}, false);
		$(".audioBtn")[0].addEventListener("touchend", function () {
			if($(this).hasClass("play")){
				Media.pause();
				_self.scrolls.isvideo = false;
				$(this).removeClass("play");
				$(this).removeClass("windmill");
			} else {
				Media.play();
				_self.scrolls.isvideo = true;
				$(this).addClass("play");
				$(this).addClass("windmill");
			}
	});
	},
	init:function(){
		_self = this;
		//设置article 高度
		_self.scrolls.leng = $('article').length;
		//_self.aetH('slide_show','slide article');  
		$('.slide_show').width($(window).width());
		$('.slide').width($(window).width()*2);
		$('article').width($(window).width());
		$('article').eq(1).css({
			'position': 'absolute',
			'left':$(window).width(),
			'top':0,
		});

		//首页初始动画
		_self.iswie('slide article',0);
		_self.iswie('main_font',0);
		//滑动事件
		$('.slide')[0].addEventListener('touchstart', _self.touchSatrtFunc, false);  
		$('.slide')[0].addEventListener('touchmove', _self.touchMoveFunc, false);  
		$('.slide')[0].addEventListener('touchend', _self.touchEndFunc, false);
		
		($('.audioBtn')[0]) && _self.audioSwitch();
	}
}
$(function(){
	hdsj.init();
	$('.left').hide();
});

