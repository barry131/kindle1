(function(window,undefined){
    /**
     * 全站命名空间
     * @copyright 北京宏图世展网络科技服务有限公司
     * @author eub前端
     * @date 20150617
     * @global
     * @namespace eub
     */
    var eub = window.eub || (window.eub = {}),
        register,
        tools,
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
     * @namespace eub.tools
     */
    tools = register('eub.tools');
		
	/**
     * kindle
     * @memberOf eub
     * @namespace eub.kindle
     */
    kindle = register('eub.kindle');

    kindle.indexain = function(){
        tools.addAni($('body'),'data-ani','data-time');
    }

    /**
     * 添加动画定时器
     * @memberOf eub.tools
     * @namespace eub.tools.delayAni
     * @param {object} obj 传入那个dom元素
     * @param {string} tag 取到的动画的值
     * @param {string} time 取到动画多久之后添加时间
     * @function
     * @example
     *     1. eub.tools.delayAni(obj,tag,time);
     */
    tools.delayAni = function(obj,tag,time){
        setTimeout(function(){
            obj.addClass('animated ' + tag);
        },time)
    }

    /**
     * 添加动画
     * @memberOf eub.tools
     * @namespace eub.tools.delayAni
     * @param {object} dom 传入那个dom元素
     * @param {string} tag 动画属性名称 用于取动画名称
     * @param {string} time 动画时间属性名称 用于去时间
     * @param {function} callback 回调函数
     * @function
     * @example
     *     1. eub.tools.delayAni(obj,tag,time);
     */
    tools.addAni = function(dom,attrName,attrTime,callback){

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

            eub.tools.delayAni($(this),attrNames,attrTimes);
        });

        if($.isFunction(callback)){
            callback( $dom );
        }
    }

    /**
     * 刷新页面方便测试
     * @memberOf eub.tools
     * @namespace eub.tools.htmlreload
     * @function
     * @example
     *     1. eub.tools.htmlreload();
     */
    /*tools.htmlreload = function(){
    var $dom = $('<div class="htmlreloaddom" style="background:#ece;">刷新</div>');
        $dom.css({
            "position":"fixed",
            "top":"5%",
            "left":"5%",
            "z-index":9999,
            "width":"80px",
            "height":"40px",
            "line-height":"40px",
            "text-align":"center"
        })

        $('body').append($dom);

        $dom.on('click',function(){
            window.location.reload(true);
        })
    }*/
    
})(window,undefined)

$(function(){
    //eub.tools.htmlreload();
    //eub.kindle.indexain();
})