var arr = [
    {
        "bookName":"谈美",
        "bookCent":["人生本来就是一","种较广泛的艺术<br>，","每个人的生命史就","是他自己的作品"],
        "name":"朱光潜",
    },
    {
        "bookName":"局外人",
        "bookCent":["永远也不该演戏作假<br>。","人生在世<br>，"],
        "name":"阿尔贝·加缪 ",
    },
    {
        "bookName":"爱与黑暗的故事",
        "bookCent":["而是属于未来<br>。","我们不属于过去，","我们始终提醒自己"],
        "name":"阿摩司<br>•<br>奥兹 ",
    },
    {
        "bookName":"解忧杂货店",
        "bookCent":["样的回答都没用<br>。","不管得到什么","积极认真地生活<br>，","如果自己不想"],
        "name":"东野奎吾",
    },
    {
        "bookName":"伤逝",
        "bookCent":["爱才有所附丽<br>。","人必生活着，","每个人的生命史就","是他自己的作品"],
        "name":"鲁迅",
    },
    {
        "bookName":"1<br>9<br>8<br>4",
        "bookCent":["掉的时代致敬<br>！","做过的事不能抹","向一个真理存在<br>、"],
        "name":"乔治<br>•<br>奥威尔",
    },
    {
        "bookName":"悉达多",
        "bookCent":["于它而心存欣喜<br>。","热爱它<br>，以归属","世界的本来面目","学会接受这个"],
        "name":"赫尔曼<br>•<br>黑塞",
    },
    {
        "bookName":"海底两万里",
        "bookCent":["才知道答案<br>。","你只有探索<br>，"],
        "name":"儒尔<br>•<br>凡尔纳",
    },
    {
        "bookName":"杜尚访谈录",
        "bookCent":["是我的生活<br>。","我最好的作品","每个人的生命史就","是他自己的作品"],
        "name":"皮埃尔<br>•<br>卡巴纳",
    },
    {
        "bookName":"波普启示录",
        "bookCent":["完美的方式有关<br>。","美<br>，<br>其实跟一个人"],
        "name":"安迪<br>•<br>沃霍尔",
    },
    {
        "bookName":"太阳的芬香",
        "bookCent":["和蔚蓝的田野<br>。","为的是看太阳<br>，","我来这个世界"],
        "name":"巴尔蒙特",
    },
    {
        "bookName":"我的阿勒泰",
        "bookCent":["倾向风去的方向<br>。","全世界都在","一场透明的倾斜<br>，","我看到世界都是"],
        "name":"李娟",
    },
    {
        "bookName":"思维的乐趣",
        "bookCent":["自己的思想监狱<br>。","罪恶是建造关押","知识分子最大的"],
        "name":"王小波",
    },
    {
        "bookName":"爱你就像爱生命",
        "bookCent":["人生本来就是一","种较广泛的艺术<br>，","每个人的生命史就","是他自己的作品"],
        "name":"王小波",
    },
    {
        "bookName":"科技想要什么",
        "bookCent":["而不是更多物质<br>。","金钱带来了更多选择<br>，"],
        "name":"凯文<br>•<br>凯利",
    },
    {
        "bookName":"贫穷的本质",
        "bookCent":["自身潜力的能力<br>。","它会使人丧失挖掘","意味着缺钱<br>，","贫穷并不仅仅"],
        "name":"阿比吉特<br>•<br>班纳吉",
    },
    {
        "bookName":"月亮和六便士",
        "bookCent":["混沌中塑造出来<br>。","折磨才能从宇宙的","通过灵魂的痛苦","艺术家只有"],
        "name":"毛姆",
    },
    {
        "bookName":"失乐园",
        "bookCent":["而是承认失败之时<br>。","并不是失败之际<br >，","争斗<br>，<br>最痛苦的","世间所有的胜败"],
        "name":"渡边淳一",
    },
    {
        "bookName":"穆斯林的葬礼",
        "bookCent":["也不怕别人忽视<br>。","求得别人的重视<br >，","人<br>，<br>绝不曲意","真正有血性的"],
        "name":"霍达",
    },
    {
        "bookName":"乌合之众",
        "bookCent":["在洋面上的表象<br>。","一无所知的那些乱象","是海洋深处我们","能感觉到的现象"],
        "name":"古斯塔夫<br>•<br>勒庞",
    }
];
(function(window,undefined){
    /**
     * 全站命名空间
     * @copyright 北京宏图世展网络科技服务有限公司
     * @author deping chen
     * @date 20150917
     * @global
     * @namespace eub
     */
    var eub = window.eub || (window.eub = {}),
        register,
        kindle;

    /**
     * 注册空间
     * @param  {string} namespace 要注册的名称, 以 . 分隔
     * @return {object}           注册后的空间对象
     * @name eub.register
     * @memberOf eub
     * @function
     * @example
     *     1, eub.register("eub.dell") => {};
     *     2, eub.register("eub.canon") => {};
     *     3, eub.register("eub.kindle") => {};
     */
    register = eub.register = function(namespace){
        var namespace = namespace.split('.'), //把字符串转数组
            len = namespace.length, //一看就知道 数组长度
            obj = window;

        for(var i=0; i<len; i++){
            obj = obj[namespace[i]] = obj[namespace[i]] || {};
        }
        return obj;
    }

    /**
     * 工具方法
     * @memberOf eub
     * @namespace eub.kindle
     */
    kindle = register('eub.kindle')

    /**
     * 添加动画定时器
     * @memberOf eub.kindle
     * @namespace eub.kindle.delayAni
     * @param {object} obj 传入那个dom元素
     * @param {string} tag 取到的动画的值
     * @param {string} time 取到动画多久之后添加时间
     * @function
     * @example
     *     1. eub.kindle.delayAni(obj,tag,time);
     */
    kindle.delayAni = function(obj,tag,time){
        setTimeout(function(){
            obj.addClass('animated ' + tag);
        },time)
    }

    /**
     * 添加动画
     * @memberOf eub.kindle
     * @namespace eub.kindle.delayAni
     * @param {object} dom 传入那个dom元素
     * @param {string} tag 动画属性名称 用于取动画名称
     * @param {string} time 动画时间属性名称 用于去时间
     * @param {function} callback 回调函数
     * @function
     * @example
     *     1. eub.kindle.delayAni(obj,tag,time,callback);
     */
    kindle.addAni = function(dom,attrName,attrTime,callback){

        var $dom = dom.find('['+attrName+']'),
            attrNames,
            attrTimes;

        $dom.each(function(i){

            attrNames = $(this).attr(attrName);
            if($(this).hasClass(attrNames)){
                $(this).removeClass('animated ' + attrNames);
            }
        });

        $dom.each(function(i){

            attrNames = $(this).attr(attrName);
            attrTimes = $(this).attr(attrTime) ? $(this).attr(attrTime) : 0 ;

            eub.kindle.delayAni($(this),attrNames,attrTimes);
        });

        if($.isFunction(callback)){
            callback( $dom );
        }
    }

    /**
     * 换一组点击事件
     * @memberOf eub.kindle
     * @namespace eub.kindle.domClick
     * @function
     * @example
     *     1. eub.kindle.domClick();
     */
    kindle.domClick = function(){
        kindle.addAni($('.cent_top '),'tag-name',"tag-time");
        $('.cent_cent img').on('click',function(){
            $('#audiog')[0].play();
           var ran = Math.floor(Math.random()*20),
                htmlH2 = '',
                htmlP = "",
                htmlPname = '',
                time = 500+arr[ran].bookCent.length*300,
                timesg = 1000;

            $('.cent_top').addClass('animated opas');

            htmlH2 = '<h2 tag-name="opa" tag-time="200"><img src="images/kindle_font_top.png"><span>'+arr[ran].bookName+'</span><img src="images/kindle_font_bottom.png"></h2>';
            for(var i=0; i<arr[ran].bookCent.length;i++){
                time -=300;
                htmlP += '<p tag-name="opa" tag-time="'+time+'">'+arr[ran].bookCent[i]+'</p>' ;
            }
            htmlPname ='<p tag-name="opa" tag-time="'+(arr[ran].bookCent.length*300+800)+'"><i></i><i></i><span>'+arr[ran].name+'</span></p>';

            setTimeout(function(){
                //$('#audiog')[0].load()
                $('.cent_top').removeClass('animated opas');
                $('.cent_top').html(htmlPname+htmlP+htmlH2);
                kindle.addAni($('.cent_top '),'tag-name',"tag-time");
            },timesg)
        })
    }


})(window,undefined);

$(function(){
    eub.kindle.domClick();
})