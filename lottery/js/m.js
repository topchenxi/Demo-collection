var host = 'http://m.3uol.com';
var accountHost = 'http://account.3uol.com';
var bindurl = host + '/activity/bind/bind.html';

var localType = 0;
if(getQueryString('type') != undefined && getQueryString('type') != '' && getQueryString('type') != null){
    localType = getQueryString('type');
}else{
    localType = 3;
    // window.location.href = '#';
    
}

$(document).ready(function() {
    addKeyFrame();
	// 微信SDK
	// wxEventInit();
    lazyimg();
    // nScroll();
    setPageHeight();
    setGroup();
});
// 微信登录url
function getWxloginUrl(rurl){
    var wxLoginURL = accountHost + '/weixin/connect/?&platform='+config.platform+'&fromtype='+config.id+'&returnurl='+encodeURIComponent(rurl);
    return wxLoginURL;
}
// 执行callback
function runCallback(){
    if(getQueryString('callback') != undefined && getQueryString('callback') != ''){
        var callbackEvent = getQueryString('callback');
        if(callbackEvent.indexOf('_') != -1){
            var arr = callbackEvent.split('_');
            eval(arr[0]+'('+arr[1]+')');
        }else{
            eval(arr[0]);
        }
    }
}
// 加载微信js-SDK
function wxEventInit(callback){
	var baseLink = String(window.location);

	var wxTitle = config.shareText;
	var wxImgurl = config.wxShareImg;
	var wxDescription = config.shareDes;

    if(getQueryString('type') == 3){
        wxTitle = '育儿微课夏日抽奖狂欢，胎心仪防辐射服孕妇睡枕拿回家';
        wxDescription = '手指点一点，参与育儿微课夏日抽奖活动，丰富礼品等你拿...';
    }else if(getQueryString('type') == 4){
        wxTitle = '育儿微课夏日抽奖狂欢，奶瓶新生儿礼盒纸尿裤拿回家';
        wxDescription = '手指点一点，参与育儿微课夏日抽奖活动，丰富礼品等你拿...';
    }else if(getQueryString('type') == 5){
        wxTitle = '育儿微课夏日抽奖狂欢，乐高玩具伞车学步车拿回家';
        wxDescription = '手指点一点，参与育儿微课夏日抽奖活动，丰富礼品等你拿...';
    }else if(getQueryString('type') == 6){
        wxTitle = '育儿微课夏日抽奖狂欢，书柜电动车宝宝内衣拿回家';
        wxDescription = '手指点一点，参与育儿微课夏日抽奖活动，丰富礼品等你拿...';
    }
	
	$.ajax({
		url: '/Share/Weixin/AppVerify.aspx',
        type: 'POST',
        dataType: 'json',
        data: {
            t: 'wxshare',
            url:baseLink
        },
        success:function(data){
            wx.config({
                debug: false,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo']
            });
            wx.ready(function () {
                wx.onMenuShareTimeline({
                    title: wxTitle,
                    link: baseLink,
                    imgUrl: wxImgurl,
                    success: function () {
                        // 增加一次抽奖
                        oneMoreTimes();
                        closeShareLayer();
                    },
                    cancel: function () {}
                });
                wx.onMenuShareAppMessage({
                    title: wxTitle,
                    desc: wxDescription,
                    link: baseLink,
                    imgUrl: wxImgurl,
                    type: '',
                    dataUrl: '',
                    success: function () {
                        // 增加一次抽奖
                        oneMoreTimes();
                        closeShareLayer();
                    },
                    cancel: function () {}
                });
                wx.onMenuShareQQ({
                    title: wxTitle,
                    desc: wxDescription,
                    link: baseLink,
                    imgUrl: wxImgurl,
                    success: function () {
                        // 增加一次抽奖
                        oneMoreTimes();
                        closeShareLayer();
                    },
                    cancel: function () {}
                });
            });
            wx.error(function(res){
                // alert("微信接口加载失败，请重新尝试！");
            });
        }
	})
}
// 获取GET参数
function getQueryString(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); return null; 
}
/*
bootstrap Alert 调用方法
bsAlert('success','测试提示框！',0,function(){
    //回调方法          
})
*/
function bsAlert(type,text,hideClose,callback,autoClose){
    // type:success,warning,danger,info
    var alertHtml = new Array();        
    alertHtml.push('<div class="alert alert-'+type+'">');
    if(type == 'success'){
        alertHtml.push('<img src="http://resource.3uol.com/lib/v201405/css/images/glb_yes.gif" alt="" />');
    }else if(type == 'danger'){
        alertHtml.push('<img src="http://resource.3uol.com/lib/v201405/css/images/glb_no.gif" alt="" />');
    }else if(type == 'info'){
        alertHtml.push('<img src="http://resource.3uol.com/lib/v201405/css/images/glb_en.gif" alt="" />');
    }
    if(hideClose == 1){
        alertHtml.push('<button type="button" class="close" data-dismiss="alert" aria-hidden="true" onclick="closeBsAlert(this)">&nbsp;&times;</button>');
    }
    alertHtml.push(text);
    alertHtml.push('</div>');

    if($('body').find('.alert').length !==0){
        $('.alert').remove();
    }
    $('body').append(alertHtml.join(''));

    $('.alert').css({
        'visibility':'hidden',
        'float':'left'
    })

    var aWid = $('.alert').outerWidth();
    var mrleft = -(aWid/2);
    $('.alert').css({
        'position':'fixed',
        'top':'50%',
        'left':'50%',
        'margin-left':mrleft,
        'visibility':'visible'
    })

    if(autoClose == null || autoClose == undefined){
        $('.alert').delay(2000).fadeOut(300,function(){
            $('.alert').remove();
            if($.type(callback) == 'string'){
                eval(callback);
            }else if($.type(callback) == 'function'){
                callback();
            }
        });
    }
}
// close bootstrap Alert
function closeBsAlert(obj){
    var p = $(obj).parents('.alert');
    p.remove();
}

// move事件
var stopmove=function(e){
    e.preventDefault();
}
// 音频
var audio;
window.onload = function(){
    initAudio();
}
var initAudio = function(){
    if(config.audioSrc != undefined && config.audioSrc != null && config.audioSrc != ''){
        var htmlArr = new Array();
        htmlArr.push('<div class="musicBox">');
        htmlArr.push('<div class="bg"><img src="images/soundbg.png" alt="" /></div>')
        htmlArr.push('<a href="javascript:void(0)" onclick="playOrPaused(this)" class="music musicrota"><i class="iconfont">&#xe638;</i></a>');
        htmlArr.push('<audio src="'+config.audioSrc+'" id="audio" loop="loop"></audio>');
        htmlArr.push('</div>');
        $('body').append(htmlArr.join(''));
        audio = $('#audio')[0];
        audio.play();
    }
}
function playOrPaused(obj){
    var musicObj = $(obj).parents('.musicBox').find('.music');
    if(audio.paused){
        audio.play();
        if(!musicObj.hasClass('musicrota')){
            musicObj.addClass('musicrota');
        }
        return;
    }
    audio.pause();
    if(musicObj.hasClass('musicrota')){
        musicObj.removeClass('musicrota');
    }
}
// 动画
function addKeyFrame(){
    $('[data-key]').each(function(){
        var key = $(this).attr('data-key');
        $(this).on('webkitAnimationEnd',function(){
            $(this).addClass(key);
        })
    })
}
// 背景
function lazyimg(){
    var w = $(window).width();
    var h = $(window).height();
    var windowScale = w/h;
    var imgScale = 640/960;
    $('[data-lazyimg]').each(function(){
        var _this = $(this);
        if(_this.find('img').length < 1){
            var src = _this.attr('data-lazyimg');
            var img = new Image();
            img.src = src;
            var imgW,ml;
            if(img.complete){
                if(imgScale < windowScale){
                    var imgH = w*960/640;
                    var imgTop = (imgH - h)/2;
                    _this.html('<img src="'+src+'" style="width:100%;top:-'+imgTop+'px;"/>');
                }else if(imgScale > windowScale){
                    var imgW = 640*h/960;
                    var imgLeft = (imgW - w)/2;
                    _this.html('<img src="'+src+'" style="height:100%;left:-'+imgLeft+'px;"/>');
                }else{
                    _this.html('<img src="'+src+'" style="width:100%;height:100%;"/>');
                }
            }else{
                img.onload = function(){
                    if(imgScale < windowScale){
                        var imgH = w*960/640;
                        var imgTop = (imgH - h)/2;
                        _this.html('<img src="'+src+'" style="width:100%;top:-'+imgTop+'px;"/>');
                    }else if(imgScale > windowScale){
                        var imgW = 640*h/960;
                        var imgLeft = (imgW - w)/2;
                        _this.html('<img src="'+src+'" style="height:100%;left:-'+imgLeft+'px;"/>');
                    }else{
                        _this.html('<img src="'+src+'" style="width:100%;height:100%;"/>');
                    }
                }
            }
        }
    })
}
// 跳转抽奖
function gotoLottery(){
    window.location.href='lottery.html?type='+localType;
}
// 抽奖
var lotteryLock = true;
function onLottery(){
    var data = {
        data:{
            lottery:3,
            gift:'iphone',
            count:3,
            lotteryStatus:2
        }
    }
    var d = data.data;
    var index = d.lottery;
    var name = d.gift;
    var count = d.count;
    var lotteryStatus = d.lotteryStatus;
    // alert(count);
    if(count >= 0){
        var index = parseInt(index);
        var lotteryRotate = 360/8*index + 360/8/2;
        $('.loBtn').rotate({ 
            duration:3000, //转动时间 
            angle: 0, //默认角度
            animateTo:360*6+lotteryRotate, //转动角度 
            callback: function(){ 
                alert($.easing.easeOutSine);
                // showShareLayer(name,count,lotteryStatus);
            } 
        })
        if(count > 0){
            oneMoreTimesFlag = true;
        }
    }else{
        showShareLayer(name,count,lotteryStatus);
    }
}
// 重置抽奖
function resetLottery(){
    lotteryLock = true;
    $('.loBtn').removeAttr('style');
}
// 显示弹出层
function showShareLayer(name,count,lotteryStatus){
    var type = 0;
    var html = new Array();
    // lotteryStatus 1实物 2积分 3未中
    /*----------------------------------*/
    if(lotteryStatus == 2){
        html.push('<div class="popLayer g2">');
        html.push('<div class="popBox">');
        html.push('<a href="#" class="closeBtn"><i class="iconfont">&#xe610;</i></a>');
        html.push('<img src="images/g2.png" alt="">');
        html.push('<div class="text">恭喜亲中了'+name+'积分，可以在三优亲子网积分商城里免费兑换礼品。分享本活动还能再抽一次哦</div>');
        html.push('<a href="javascript:void(0)" class="link" onclick="onShare()"><img src="images/shareBtn.png" alt=""></a>');
        html.push('</div>');
        html.push('<div class="bg"></div>');
        html.push('</div>');
    }else if(lotteryStatus == 3){
        // 第一次
        if(count > 0){
            html.push('<div class="popLayer g3">');
            html.push('<div class="popBox">');
            html.push('<a href="#" class="closeBtn"><i class="iconfont">&#xe610;</i></a>');
            html.push('<img src="images/g3.png" alt="">');
            html.push('<div class="text">不好意思亲，你没抽中哦!分享本活动还能再抽一次</div>');
            html.push('<a href="javascript:void(0)" class="link" onclick="onShare()"><img src="images/shareBtn.png" alt=""></a>');
            html.push('</div>');
            html.push('<div class="bg"></div>');
            html.push('</div>');
        }else if(count == 0){
            html.push('<div class="popLayer g4">');
            html.push('<div class="popBox">');
            html.push('<a href="#" class="closeBtn"><i class="iconfont">&#xe610;</i></a>');
            html.push('<img src="images/g4.png" alt="">');
            html.push('<div class="text">亲爱的，今天的抽奖机会用完咯，不如去看看育儿微课吧！</div>');
            // html.push('<a href="#" class="link"><img src="images/gotoVideo.png" alt=""></a>');
            html.push('</div>');
            html.push('<div class="bg"></div>');
            html.push('</div>');
        }
    }else if(lotteryStatus == 1){
        html.push('<div class="popLayer g1">');
        html.push('<div class="popBox">');
        html.push('<a href="#" class="closeBtn"><i class="iconfont">&#xe610;</i></a>');
        html.push('<img src="images/g1.png" alt="">');
        html.push('<div class="text">恭喜亲，你抽中'+name+'快填写收件资料吧，奖品将于7天后快递</div>');
        html.push('<a href="#" class="link"><img src="images/submitFormBtn.png" alt=""></a>');
        html.push('</div>');
        html.push('<div class="bg"></div>');
        html.push('</div>');
    }
    $('body').append(html.join(''));
    $('.popLayer').css({
        'top':$(window).scrollTop()
    })
    document.body.addEventListener('touchmove',stopmove,false);
}
// 关闭弹出层
function closeShareLayer(){
    if($('.popLayer').length){
        $('.popLayer').remove();
        document.body.removeEventListener('touchmove',stopmove,false);
        resetLottery();
    }
}

var oneMoreTimesFlag = false;
// 显示分享引导
function onShare(){
   if($('.popLayer').length){
        $('.popLayer').remove();
    }
    var html = new Array();
    html.push('<div class="popLayer shareLayer">');
    html.push('<img src="images/shareLayer.png" alt="">');
    html.push('<div class="bg"></div>');
    html.push('</div>');
    $('body').append(html.join(''));
    oneMoreTimesFlag = true;
    // 微信SDK
    // wxEventInit();
    $('.shareLayer').on('click',function(){
        closeShareLayer();
    })
}
// move事件
var stopmove=function(e){
    e.preventDefault();
}
// 获奖名单滚动
function nScroll(){
    if($('#noticeBox').length){
        $.ajax({
            url: '/aapi/lotterywinner/',
            type: 'POST',
            dataType: 'json',
            data: {
                id: localType
            },
            success:function(data){
                if(data.status == 0){
                    var len = data.data.length;
                    var html = new Array();
                    for(var i=0;i<len;i++){
                        html.push('<p>'+data.data[i]+'</p>');
                    }
                    $('#noticeContent').html(html.join(''));
                    var w = $('#noticeBox').width();
                    $('#noticeContent').css({
                        'width':w
                    })
                    new Marquee(["noticeBox","noticeContent"],0,1,w,60,20,4000,2000);//文字翻屏滚动实例
                }
            }
        })
    }
}
// 增加一次抽奖
function oneMoreTimes(){
    if(oneMoreTimesFlag){
        $.ajax({
            url: '/aapi/wxshareback/',
            type: 'POST',
            dataType: 'json',
            data: {
                id: 1
            },
            success:function(data){
                // bsAlert('danger','再抽一次流程'+data.status+data.message,0,null);
                oneMoreTimesFlag = false;
                if(data.status == 0 || data.status == 2){
                    // 重置抽奖
                    resetLottery();
                }else if(data.status == -1){
                    var loc = String(window.location);
                    window.location.href = getWxloginUrl(loc);
                }else{
                    bsAlert('info',data.message,0,null);
                }
            }
        })
    }
}
// 设置页面高度
function setPageHeight(){
    var wh = $(window).height();
    $('.container').css({
        'min-height':wh + 'px'
    })
}
// 设置组别
function setGroup(){
    if($('.lotteryBox').length){
        // alert(localType);
        if(localType > 0){
            $('.lotteryBox').find('.pan').html('<img src="images/gift'+localType+'.png">');
        }
    }
}
// 链接跳转
function gotoURL(url){
    if(getQueryString('type') != undefined && getQueryString('type') != null && getQueryString('type') != ''){
        var type = getQueryString('type');
        var u = url+'?type='+type;
        window.location.href = u;
    }else{
        window.location.href = url;
    }
}