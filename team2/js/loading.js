// JavaScript Document
// var imageroot = $("#imageroot").val();
// var cssroot = $("#cssroot").val();
var arr =["images/loading_pic1.jpg",
		"images/icon_1.png",
		"images/down.png",
		"images/index_logo.png",
		"images/menu_btn.png",
		"images/headpic.jpg",
		"images/index_tit.png",
		"images/index_word1.png",
		"images/index_word2.png",
		"images/index_btn1.png",
		"images/close.png",
		"images/text_1.png",
		"images/text_2.png",
		"images/tit_white.png",
		"images/upload_btn.png",
		"images/text_3.png",
		"images/upload_btn2.png",
		"images/btn_white2.png",
		"images/btn_black.png",
		"images/line.png",
		"images/upload_btn3.png",
		"images/sidenav_1.png",
		"images/sidenav_2.png",
		"images/sidenav_3.png",
		"images/sidenav_4.png",
		"images/sidenav_5.png"]
var arrjs =[]
var arrcss =["css/sty.css",
            "css/animate.css"]
/*$("img").each(function() {
		arr.push($(this).attr("src"));
});
console.log(arr)*/
var marr = new Array(); // 标记arr中的是否加载完毕
var marrjs = new Array(); // 标记arr中的是否加载完毕
var marrcss = new Array(); // 标记arr中的是否加载完毕
var maxtime = 20000;  // 设置加载失败时间20秒
var timing = 0; // 记录当前的时间
var mtest = document.getElementById("veryhuobox");  //  进度条容器
var mtestdiv = document.getElementById("veryhuoLoading");  // 进度条线
var mtestspan = document.getElementById("veryhuoLoading"); // 进度条数字
for(var i =0,j=arr.length;i<j;i++){  // 初始化数组，并将每一项的值都设为false
		marr[i] = false;
}
function include_js(file,index) {  // 检测是否加载完成,图片
		var _doc = document.getElementById('loadimg');
		var js = document.createElement('img');
		js.setAttribute('src', file);
		_doc.appendChild(js);
		js.onload = function () {
				marr[index] = true;
		}
}
for(var i = 0,j=arr.length;i<j;i++){  // 向loadimg中添加每一项
		include_js(arr[i],i);
}

for(var i =0,j=arrjs.length;i<j;i++){  // 初始化数组，并将每一项的值都设为false
		marrjs[i] = false;
}
function include_script(file,index) {  // 检测是否加载完成,JS
		var _doc = document.getElementById('loadimg');
		var script = document.createElement('script');
		script.setAttribute('src', file);
		_doc.appendChild(script);
		script.onload = function () {
				marrjs[index] = true;
		}
}
for(var i = 0,j=arrjs.length;i<j;i++){  // 向loadimg中添加每一项
		include_script(arrjs[i],i);
}

for(var i =0,j=arrcss.length;i<j;i++){  // 初始化数组，并将每一项的值都设为false
		marrcss[i] = false;
}
function include_css(file,index) {  // 检测是否加载完成,CSS
		var _doc = document.getElementById('loadimg');
		var css = document.createElement('link');
		css.setAttribute('href', file);
		css.setAttribute('rel', 'stylesheet');
		_doc.appendChild(css);
		css.onload = function () {
				marrcss[index] = true;
		}

}
for(var i = 0,j=arrcss.length;i<j;i++){  // 向loadimg中添加每一项
		include_css(arrcss[i],i);
}
 
var stop = setInterval(function(){
		var index = 0;  // 统计当前的总共加载完毕的个数
		for(var i=0,j=marr.length;i<j;i++){
				if(marr[i] === true){
						index++;
				}
		}
		var indexjs = 0;
		for(var i=0,j=marrjs.length;i<j;i++){
				if(marrjs[i] === true){
						indexjs++;
				}
		}
		var indexcss = 0;
		for(var i=0,j=marrcss.length;i<j;i++){
				if(marrcss[i] === true){
						indexcss++;
				}
		}
								
		mtestspan.innerHTML= parseInt((index/marr.length)*90)+"%";
		//mtestdiv.style.width = mtestspan.innerHTML;

		if(index === marr.length && indexjs === marrjs.length && indexcss === marrcss.length && document.readyState == "complete"){  // 加载完成
				mtestspan.innerHTML= "100%";
				//mtestdiv.style.width = mtestspan.innerHTML;
				$('.loadingwarp').fadeOut();
				$('.wrapcon').css({'opacity':'1'});
				clearInterval(stop);
				$('#container').css({'height':($(window).height()-$('.zpbanner').height()-$('.zptit').height()-5)});
				$('#alimgscro li').css({'width':$('.alimgscro').width()});
				eub.kindle.init();
				
		}
		
		/*timing+=60;
		if(timing>maxtime){  //  加载失败
				clearInterval(stop);
				mtest.innerHTML= "页面加载失败！";
		}*/
},60);
