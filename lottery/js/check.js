var ua = navigator.userAgent.toLowerCase();
var isWeixin = ua.indexOf('micromessenger') != -1;
var isAndroid = ua.indexOf('android') != -1;
var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);
if(!isWeixin){
	if(!isAndroid && !isIos){
		window.location.href = 'http://www.3uol.com/';
	}else{
		window.location.href = 'http://m.3uol.com/';
	}
}