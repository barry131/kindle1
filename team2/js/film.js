    /**
     * 植物类对象
     * @copyright 北京宏图世展网络科技服务有限公司
     * @author depingchen
     * @date 2016-02-18
     * @global
     * @namespace eub
     */
(function(window,undefined){
    /**
     * 植物类对象
     * @memberOf plants
     */
    var Plants = function(node, config){
        $.extend(true, this, film, config);
        this.init(node, config);
    },
        plantsfn,
        film;


    /**
     * 植物类对象原型练
     * @memberOf plants
     */
    plantsfn = Plants.prototype = {

        constructor : Plants, //防止原型练被指向其他

        version : '0.0.1'//版本号

        
    }
    /**
     * 在植物类上注册空间属性
     * @param  {string} namespace 要注册的名称
     * @return {object}           注册后的空间对象
     * @memberOf Plants
     * @function
     * @example
     *     1, Plants.prototype.register("film") => {};
     */
    plantsfn.register = function(namespace){
        var namespace = namespace.split('.'), //把字符串转数组
            len = namespace.length, //一看就知道 数组长度
            obj = this;

        for(var i=0; i<len; i++){
            obj = obj[namespace[i]] = obj[namespace[i]] || {};
        }

        return obj;
    }


    /**
     * 注册空间动态替换序列帧
     * @param  {string} namespace 要注册的名称
     * @return {object}           注册后的空间对象
     * @memberOf Plants
     * @function
     * @example
     *     1, Plants.prototype.register("film") => {};
     */
    film = plantsfn.register('film');

    /**
     * 单张图片加载
     * @param  {String}   src 图片地址
     * @param  {Function} cb  加载完成后的回调
     * @return {undefined}
     */
    film.imgSingleLoader = function(src, cb){
        var img = new Image();
        img.onload = function(){
            cb({
                width : img.width,
                height : img.height
            });
            img.onload = null;
        }
        img.src = src;
    }

    /**
     * 批量图片加载
     * @param  {Array|String} res            资源地址
     * @param  {Function}     singleComplete 单个资源加载完成的回调
     * @param  {Function}     allComplete    所有资源加载完成后的回调
     * @return {undefined}
     */
    film.resLoader = function(res, singleComplete, allComplete){
        var len = res.length, count = 0;
        $.each(res, function(index, item){
            film.imgSingleLoader(item, function(size){
                singleComplete(++count, len, size);
                if(count == len){
                    allComplete(size);
                }
            });
        });
    }

    /**
     * RequestAnimationFrame兼容写法
     * @return {Object} cancel和request方法
     */
    film.animation = function(){
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        var request, cancel;
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            request = window[vendors[x]+'RequestAnimationFrame'];
            cancel = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if (!request) {
            request = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() {
                    callback(currTime + timeToCall);
                },timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }

        if (!cancel) {
            cancel = function(id) {
                clearTimeout(id);
            };
        }

        return {
            "request" : request,
            "cancel" : cancel
        }
    }();

    /**
     * 动画类型
     * @type {Object}
     */
    film.aniType = {
        'linear' : function(t,b,c,d){ return c*t/d + b; },
        'easeIn': function(t,b,c,d){
            return c*(t/=d)*t + b;
        },
        'easeOut': function(t,b,c,d){
            return -c *(t/=d)*(t-2) + b;
        },
        'easeInOut': function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) - 1) + b;
        }
    }

    /**
     * 空函数
     * @type {Object}
     */
    film.empty = function(){}

    // 插件默认配置
    film.config = {
        resource : [],  //如果传递的为一张图片，那么认为是采用sprite的形式进行
        perload : true, //是否需要预加载资源
        totalFrame : 10,  //帧数
        spriteDirect : 0, //使用sprite图片的时候，可以指明sprite平铺方向  1为横向  2为纵向    如果值为0   那么根据长宽比进行判断
        index : 0, //默认显示第几帧
        playTime : 1000, //滚动执行事件
        aniType : 'linear', //运算轨迹
        onLoading : film.empty, //资源加载时的回调
        onComplete : film.empty,  //资源加载完成后的回调
        onPlaying : film.empty,  //每次完成一张图片切换时的回调
        aniComplete : film.empty //每次自动完成一次动画播放后的回调
    };

    /***
     * 初始化
     * @description 参数处理
     */
    film.init = function(node, config) {
        if (!node) {
            return;
        }
        this.config = $.extend(true, {}, film.config, config); // 参数接收
        var _config = this.config;
        var _self = this;

        //属性处理
        $.extend(_self, {
            /**
             * 需要加载的资源
             * @type {Array}
             */
            resource: [].concat(_config.resource),
            /**
             * 当前停留在的帧序号
             * @type {Number}
             */
            curIndex : 0,
            /**
             * 是否正在加载
             * @type {Boolean}
             */
            isLoading : true,
            /**
             * 帧数
             * @type {Number}
             */
            totalFrame : _config.totalFrame,
            /**
             * 帧动画的尺寸(宽高)
             * @type {Object}
             */
            filmSize : {},
            /**
             * 真正执行帧动画的节点
             * @type {[type]}
             */
            filmNode : node,
            /**
             * 每帧对应的样式/src
             * @type {Array}
             */
            frameStyles : [],
            /**
             * 播放动画ID
             * @type {[type]}
             */
            animationId : null
        });

        var loadComplete = function(size){
            _self.isLoading = false;

            var _totalFrame = _self.totalFrame, _contSize = _self.filmSize, _frameStyles = _self.frameStyles,_windths = $(window).width()/(size.width/_totalFrame);
            //雪碧图形式 资源数量为1
            if(_self.resource.length == 1){
                //横向
                var lateral = function(){
                    _contSize.width = (size.width/_totalFrame)*_windths;
                    _contSize.height = (size.height)*_windths;
                    for (var i = 0; i < _totalFrame; i++) {
                        _frameStyles.push("url(" + _self.resource[0] + ") -" + (_contSize.width*i) + "px 0 no-repeat");
                    };
                }
                //纵向
                var portrait = function(){
                    _contSize.width = size.width;
                    _contSize.height = size.height/_totalFrame;
                    for (var i = 0; i < _totalFrame; i++) {
                        _frameStyles.push("url(" + _self.resource[0] + ") 0 -" + (_contSize.height*i) + "px no-repeat")
                    };
                }
                if(config.spriteDirect == 1){ //横向
                    lateral();
                }else if(config.spriteDirect == 2){ //纵向
                    portrait();
                }else{
                    size.width > size.height ? lateral() : portrait();
                }
            }else{  //如果资源数超过两个，那么配置参数中的totalFrame不起作用，已实际传入的资源数为准
                _totalFrame = _self.totalFrame = _self.resource.length;
                _self.filmSize = size;

                _self.filmNode = document.createElement('img');
                $(node).append(_self.filmNode);
                for (var i = 0; i < _totalFrame; i++) {
                    _frameStyles.push(_self.resource[i]);
                };
            }

            _config.onComplete(size);
            _self.jumpTo(_config.index);
        };


        if(_config.preload){
            //资源预加载
            film.resLoader(_self.resource, _config.onLoading, loadComplete);
        }else{
            //不用预加载
            film.imgSingleLoader(_self.resource[0], loadComplete);
        }
    };

    /**
     * 参数格式化
     * @param  {[type]} opt [description]
     * @return {[type]}     [description]
     */
    film.formatOpt = function(config, opt){
        var tempObj = {}
        if(typeof opt == 'string'){
            opt = {
                'direction' : opt
            };
        }
        tempObj = $.extend(true, {}, config, opt);
        tempObj.direction = tempObj.direction == 'backward' ? 'backward' : 'forward';
        return tempObj
    }

    /**
     * @function jumpTo
     * @description 跳转至的帧数
     * @param  {[type]} index 需要跳转到的帧数
     * @return {Object}       film对象
     */
    film.jumpTo = function(index){
        var _self = this,
            _scale = $(window).width()/_self.filmSize.width;
        if(_self.isLoading) return;

        if(index < 0){  //负数的情况从后面往前数
            index = index - Math.floor(index/_self.totalFrame) * _self.totalFrame;
        }else{
            index = index % _self.totalFrame;
        }

        if(_self.resource.length == 1){
            $(_self.filmNode).css({
                width : _self.filmSize.width,
                height : _self.filmSize.height,
                background : _self.frameStyles[index],
                backgroundSize: 100*_self.totalFrame+'%'
            })
        }else{
            _self.filmNode.src = _self.frameStyles[index];
        }
        _self.curIndex = index;
        _self.config.onPlaying(_self.curIndex);
        return _self;
    }
    /**
     * 跳转到下一帧
     * @return {object} film对象
     */
    film.next = function(){
        var _self = this;
        _self.jumpTo(_self.curIndex + 1);
        return _self;
    };
    /**
     * 跳转到上一帧
     * @return {object} film对象
     */
    film.prev = function(){
        var _self = this;
        _self.jumpTo(_self.curIndex - 1);
        return _self;
    };
    /**
     * 通过告诉停留在第几个位置上来定位滑动位置
     * @param  {Number} index 需要播放到的位置
     * @param  {String} opt   播放的方向   向前：forward  向后：backward
     * @return {object} film对象
     */
    film.playByIndex = function(index, opt){
        var _self = this;
        opt = film.formatOpt(_self.config, opt);
        var playNum = 0;
        index = index % _self.totalFrame;
        if((opt.direction == 'forward' && _self.curIndex >= index) || (opt.direction == 'backward' && _self.curIndex <= index)){
            playNum = _self.totalFrame - _self.curIndex + index;
        }else{
            playNum = index - _self.curIndex;
        }
        _self.playByNum(playNum, opt);
        return _self;
    };
    /**
     * 通过规定播放的帧数来滑动
     * @param  {Number} num 需要播放的帧数
     * @param  {String} opt 播放的方向   向前：forward  向后：backward
     * @return {object} film对象
     */
    film.playByNum = function(num, opt){
        var _self = this;
        _self.aid && _self.pause();
        opt = film.formatOpt(_self.config, opt);
        var startTime = new Date().getTime();
        var endTime = startTime + opt.playTime;
        var aniFunc = typeof opt.aniType == 'function' ? opt.aniType : (film.aniType[opt.aniType] || film.aniType['linear']);
        var hasPlayedNum = 0, nextPlayTime = aniFunc(hasPlayedNum + 1, startTime, opt.playTime, num);
        (function loop(cTime){
            if(cTime >= nextPlayTime){
                hasPlayedNum++;
                nextPlayTime = aniFunc(hasPlayedNum + 1, startTime, opt.playTime, num);
                opt.direction == 'forward' ? _self.next() : _self.prev();
            }
            if(cTime <= endTime){
                _self.aid = _self.animation.request(loop);
            }else{
                _self.aid = null;
                opt.aniComplete(_self.curIndex);
            }
        })(startTime);
        return _self;
    }
    /**
     * 播放帧动画
     * @param  {number} t   每帧之间的时间间隔
     * @param  {[type]} dir 播放方向 支持forward和backward
     * @return {object} film对象
     */
    film.play = function(t, dir){
        var _self = this;
        _self.aid && _self.pause();
        var startTime = new Date().getTime(), lastTime = startTime;
        (function loop(cTime){
            if(cTime > lastTime + t){
                lastTime = cTime;
                dir == 'forward' ? _self.next() : _self.prev();
            }
            _self.aid = _self.animation.request(loop);
        })(startTime);
        return _self;
    }
    /**
     * 暂停播放
     * @return {object} film对象
     */
    film.pause = function(){
        var _self = this;
        _self.animation.cancel(_self.aid);
        _self.aid = null;
        return _self;
    }

    window.Plants = Plants;

})(window,undefined)
