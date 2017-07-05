// JavaScript Document
var imageroot = $("#imageroot").val();
var cssroot = $("#cssroot").val();
var arr =[
		"images/logo-pic.png",
		"images/logo.png",
		"images/bg_night.jpg",
		"images/bg.jpg",
		"images/light.png",
		"images/cri.png",
		"images/page2-quan.png",
		"images/page3-text.png",
		"images/qdbg2.jpg",
		"images/qdbg1.jpg",
		"images/clock_1.png",
		"images/cri.png",
		"images/page3-btn.png",
		"images/page3-ico.png",
		"images/ewm.jpg",
		"images/botarrow.png",
		"images/close_pic.png",
		"images/fx.jpg"
		]
/*$("img").each(function() {
		arr.push($(this).attr("src"));
});
console.log(arr)*/
var marr = new Array(); // 标记arr中的是否加载完毕
//var maxtime = 20000;  // 设置加载失败时间20秒
var timing = 0; // 记录当前的时间
var mtest = document.getElementById("veryhuobox");  //  进度条容器
var mtestdiv = document.getElementById("veryhuoLoading");  // 进度条线
var mtestspan = document.getElementById("veryhuoLoading"); // 进度条数字
for(var i =0,j=arr.length;i<j;i++){  // 初始化数组，并将每一项的值都设为false
		marr[i] = false;
}
function include_js(file,index) {  // 检测是否加载完成,并添加到loadimg中
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
 
var stop = setInterval(function(){
	var index = 0;  // 统计当前的总共加载完毕的个数
	for(var i=0,j=marr.length;i<j;i++){
		if(marr[i] === true){
				index++;
		}
	}
							
	mtestspan.innerHTML= parseInt((index/marr.length)*90)+"%";
	//mtestdiv.style.width = mtestspan.innerHTML;

	if(index === marr.length && document.readyState == "complete"){  // 加载完成
		mtestspan.innerHTML= "100%";
		clearInterval(stop);
		$('.loadingwarp').fadeOut(1000);
		$('.wrapcon').css({'opacity':'1'});
    	setTimeout(clockfun,1500);
    	eub.dell.init();
	}
	
	/*timing+=60;
	if(timing>maxtime){  //  加载失败
			clearInterval(stop);
			mtest.innerHTML= "页面加载失败！";
	}*/

},60);
