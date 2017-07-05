
var _self;
var hdsj={

	iswie:function(idx){
		var $article = $('.index_body');
		var $article = $('.index_body').eq(idx).find("[tag-name]");
		var leng = $article.length;
		//去掉动画
	/*	for(var i=0; i<leng;i++){
			var _tag = $article.eq(i).attr('tag-name');
			$article.eq(i).removeClass("animated "+ _tag);
		}*/
		//添加动画

			for(var i = 0; i < leng; i++){
				var _tag = $article.eq(i).attr('tag-name');
				var _delay = $article.eq(i).attr("tag-delay");

				if(_delay){
					if(Number(_delay) == 300){
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
				/*_self.scrolls.isvideo = false;*/
				$(this).removeClass("play");
				$(this).removeClass("windmill");
			} else {
				Media.play();
				/*_self.scrolls.isvideo = true;*/
				$(this).addClass("play");
				$(this).addClass("windmill");
			}
	});
	},
	init:function(){
		_self = this;
		_self.iswie(0);
		($('.audioBtn')[0]) && _self.audioSwitch();
	}
}
$(function(){
	hdsj.init();
	
});

