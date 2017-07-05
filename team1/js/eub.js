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
     * 刷新页面方便测试
     * @memberOf eub.tools
     * @namespace eub.tools.htmlreload
     * @function
     * @example
     *     1. eub.tools.htmlreload();
     */
    tools.htmlreload = function(){
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
    }
    
})(window,undefined)

$(function(){
    eub.tools.htmlreload();
    //eub.kindle.indexain();
})