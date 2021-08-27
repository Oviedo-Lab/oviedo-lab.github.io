(function(d){var h=[];d.loadImages=function(a,e){"string"==typeof a&&(a=[a]);for(var f=a.length,g=0,b=0;b<f;b++){var c=document.createElement("img");c.onload=function(){g++;g==f&&d.isFunction(e)&&e()};c.src=a[b];h.push(c)}}})(window.jQuery);
$.fn.hasAttr = function(name) { var attr = $(this).attr(name); return typeof attr !== typeof undefined && attr !== false; };


$(document).ready(function() {
r=function(){dpi=window.devicePixelRatio;$('.js-18').attr('src', (dpi>1) ? ((dpi>2) ? 'images/screen-shot-2017-05-17-at-10.04.15-pm-1338.jpg' : 'images/screen-shot-2017-05-17-at-10.04.15-pm-892.jpg') : 'images/screen-shot-2017-05-17-at-10.04.15-pm-446.jpg');
$('.js-19').attr('src', (dpi>1) ? ((dpi>2) ? 'images/contact-600.jpg' : 'images/contact-400.jpg') : 'images/contact-200.jpg');};
if(!window.HTMLPictureElement){r();}
(function(){$('a[href^="#"]:not(.allowConsent,.noConsent,.denyConsent,.removeConsent)').each(function(){$(this).click(function(){var t=this.hash.length>1?$('[name="'+this.hash.slice(1)+'"]').offset().top:0;return $("html, body").animate({scrollTop:t},400),!1})})})();
initMenu($('#menu-1')[0]);

});