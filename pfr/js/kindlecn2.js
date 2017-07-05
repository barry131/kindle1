$(document).ready(function() {
    $('.line_word ul li').each(function(i){
		if(i != 0){
			$(this).click(function(){
				$('#lineId').src = "images/line_" + i + ".png";
				var len = $('.line_word ul li').length;
				for(var pa = 1; pa <= len; pa++){
					if(i == pa){
						$('#pa' + i).css("display","block");
					}else{
						$('#pa' + pa).css("display","none");
					}
				}
				$('#lineId').attr("src","images/line_" + i + ".png");
			});
		}
	})
});
$(document).ready(function() {
    $('.linewb_word ul li').each(function(i){
		$(this).click(function(){
			var newnum=i+1;
			var len = $('.linewb_word ul li').length;
			$('#imgId').attr("src","images/di_" + newnum + ".png");
		});
	})
});

 function queryUrl(name, url) {
        url = url ? (url.indexOf("?") > -1 ? url.substr(url.indexOf("?") + 1) : url) : location.search.substr(1);
        var results;
        if (name) {
            results = url.match(new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"));
            results = results === null ? "" : decodeURIComponent(results[2]);
        } else {
            results = {};
            if (url) {
                var params = url.split('&'),
                    qrs2,
                    i = 0,
                    len = params.length;
                for (i = 0; i < len; i++) {
                    qrs2 = params[i].split('=');
                    results[qrs2[0]] = (qrs2[1] === undefined ? '' : decodeURIComponent(qrs2[1]));
                }
            }
        }
        return results;
    }
var isUrl =  queryUrl('m');
//第一页轮播
$(function(){
	var index =0;
	//3秒轮播一次
	var timer = setInterval(function(){
		index = (index == 2) ? 0 : index + 1;          
		//某个div显示，其他的隐藏
		$(".banner_p").hide().eq(index).show();    
	}, 2500);

	$('.nav').on('mouseover',function(){
		clearInterval(timer)
	})
	$('.nav').on('mouseout',function(){
		timer = setInterval(function(){
			index = (index == 2) ? 0 : index + 1;          
			//某个div显示，其他的隐藏
			$(".banner_p").hide().eq(index).show();    
		}, 2500);
	})
	})
$(function(){
	var index =0;
	//3秒轮播一次
	var timer = setInterval(function(){
		index = (index == 2) ? 0 : index + 1;          
		//某个div显示，其他的隐藏
		$(".below_right").hide().eq(index).show();    
	}, 2500);

	$('.nav').on('mouseover',function(){
		clearInterval(timer)
	})
	$('.nav').on('mouseout',function(){
		timer = setInterval(function(){
			index = (index == 2) ? 0 : index + 1;          
			//某个div显示，其他的隐藏
			$(".below_right").hide().eq(index).show();    
		}, 2500);
	})
	})
//第三页轮播
$(function(){
	var index =0;
	//3秒轮播一次
	var timer = setInterval(function(){
		index = (index == 3) ? 0 : index + 1;          
		//某个div显示，其他的隐藏
		$(".pag").hide().eq(index).show();    
	}, 2500);

	})
//轮播end

//导航切换		
var kindle={
	NavTab:function(){
		$('.bot_left_ico').click(function(){
			$('.bot_right_nav').toggle(400);
			$('.bot_ico').toggle(400);
			$('.right_word').toggle(400);
		})
	},
//昼夜切换
	Showks:function(){
	  $(".day").click(function(){
		$(".daytime").toggle(800);
		$(".nighttime").toggle(800);
	  });
	},
	Showk2:function(){
	  $(".night").click(function(){
		$(".nighttime").toggle(800);
		$(".daytime").toggle(800);
	  });
	},
//第一页数字点击切换页面
	Showk2s:function(){
	  $("#p11").click(function(){
		$(".banner_pic").toggle();
		$(".banner_pic2").toggle();
	  });
	},
	Showk3:function(){
	  $("#p12").click(function(){
		$(".banner_pic").toggle();
		$(".banner_pic3").toggle();
	  });
	},
	Showk3s:function(){
	  $("#p21").click(function(){
		$(".banner_pic2").toggle();
		$(".banner_pic3").toggle();
	  });
	},
	Showk4:function(){
	  $("#p22").click(function(){
		$(".banner_pic2").toggle();
		$(".banner_pic").toggle();
	  });
	},
	Showk4s:function(){
	  $("#p31").click(function(){
		$(".banner_pic3").toggle();
		$(".banner_pic").toggle();
	  });
	},
	Showk5:function(){
	  $("#p32").click(function(){
		$(".banner_pic3").toggle();
		$(".banner_pic2").toggle();
	  });
	},
	Showk5s:function(){
	  $(".pl1").click(function(){
		$(".video1").toggle(400);
	  });
	},
	Showk6:function(){
	  $(".pl2").click(function(){
		$(".video1").toggle(400);
	  });
	},
	Showk6s:function(){
	  $(".pl3").click(function(){
		$(".video1").toggle(400);
	  });
	},
	Showk7:function(){
	  $(".cls1").click(function(){
		$(".video1").toggle(400);
	  });
	},
}
$(function(){
    var mParam =  queryUrl('m');
    var tagParam =  queryUrl('tag');
	var bookUrl = 'http://www.amazon.cn/b/ref=kd_we_pfr_pc_book_'+mParam+'?ie=UTF8&node=116169071';
	var hlmUrl = 'http://www.amazon.cn/dp/B00C4PGF80/ref=kd_we_pfr_pc_hlm_'+mParam;
	var shjUrl ='http://www.amazon.cn/dp/B00AA7KEOU/ref=kd_we_pfr_pc_shj_'+mParam;
	var dssdUrl = 'http://www.amazon.cn/dp/B00WM1P75S/ref=kd_we_pfr_pc_dssd_'+mParam;
	var dsjsdUrl = 'http://www.amazon.cn/dp/B00AWMGWLW/ref=kd_we_pfr_pc_dsjsd_'+mParam;
	var kbUrl = 'http://www.amazon.cn/dp/B00PTBGE96';
	var kpw3Url = 'http://www.amazon.cn/dp/B00QJDOLIO';
	var kvUrl = 'http://www.amazon.cn/dp/B00MEY0VWW';
    if(tagParam){
        kbUrl += "/?tag="+tagParam;
        kpw3Url += "/?tag="+tagParam;
        kvUrl += "/?tag="+tagParam;
    }else{
        kbUrl += "/?ref=kd_we_pfr_pc_kb";
        kpw3Url += "/?ref=kd_we_pfr_pc_kpw3";
        kvUrl += "/?ref=kd_we_pfr_pc_kv";
    }
	$('.kpw3').attr('href',kpw3Url);
	$('.book').attr('href',bookUrl);
	$('.hlm').attr('href',hlmUrl);
	$('.shj').attr('href',shjUrl);
	$('.dssd').attr('href',dssdUrl);
	$('.dsjsd').attr('href',dsjsdUrl);
	$('.kb').attr('href',kbUrl);
	$('.kv').attr('href',kvUrl);
	$('.nav_dh').find('a').each(function name(i) {
		var k = (i+1) * 1; 
		$(this).attr('href','index.html?m='+mParam+'&tag='+tagParam+'#pages'+k)
	})
})
window.onload=function(){
	kindle.NavTab();
	kindle.Showks();
	kindle.Showk2();
	kindle.Showk2s();
	kindle.Showk3();
	kindle.Showk3s();
	kindle.Showk4();
	kindle.Showk4s();
	kindle.Showk5();
	kindle.Showk5s();
	kindle.Showk6();
	kindle.Showk6s();
	kindle.Showk7();
}
		
		
		
		
		
		
		
		
		
