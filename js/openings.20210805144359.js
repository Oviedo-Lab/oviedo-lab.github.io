(function(d){var h=[];d.loadImages=function(a,e){"string"==typeof a&&(a=[a]);for(var f=a.length,g=0,b=0;b<f;b++){var c=document.createElement("img");c.onload=function(){g++;g==f&&d.isFunction(e)&&e()};c.src=a[b];h.push(c)}}})(window.jQuery);
$.fn.hasAttr = function(name) { var attr = $(this).attr(name); return typeof attr !== typeof undefined && attr !== false; };


$(document).ready(function() {
r=function(){dpi=window.devicePixelRatio;$('.js-20').attr('src', (dpi>1) ? ((dpi>2) ? 'images/contact-600.jpg' : 'images/contact-400.jpg') : 'images/contact-200.jpg');
$('.js-22').attr('src', (dpi>1) ? ((dpi>2) ? 'images/job_promo-1233.png' : 'images/job_promo-822.png') : 'images/job_promo-411.png');};
if(!window.HTMLPictureElement){r();}
(function(){$('a[href^="#"]:not(.allowConsent,.noConsent,.denyConsent,.removeConsent)').each(function(){$(this).click(function(){var t=this.hash.length>1?$('[name="'+this.hash.slice(1)+'"]').offset().top:0;return $("html, body").animate({scrollTop:t},400),!1})})})();
initMenu($('#menu-1')[0]);
var wl = new woolite();
wl.init();
wl.addAnimation($('.js-21')[0], "1.00s", "0.00s", 1, 100);
wl.start();

});