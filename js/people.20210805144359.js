(function(d){var h=[];d.loadImages=function(a,e){"string"==typeof a&&(a=[a]);for(var f=a.length,g=0,b=0;b<f;b++){var c=document.createElement("img");c.onload=function(){g++;g==f&&d.isFunction(e)&&e()};c.src=a[b];h.push(c)}}})(window.jQuery);
$.fn.hasAttr = function(name) { var attr = $(this).attr(name); return typeof attr !== typeof undefined && attr !== false; };


$(document).ready(function() {
r=function(){dpi=window.devicePixelRatio;$('.js-8').attr('src', (dpi>1) ? ((dpi>2) ? 'images/img_0019-2880.jpg' : 'images/img_0019-1920.jpg') : 'images/img_0019-960.jpg');
$('.js-9').attr('src', (dpi>1) ? ((dpi>2) ? 'images/hysell_website-660.jpg' : 'images/hysell_website-440.jpg') : 'images/hysell_website-220.jpg');
$('.js-10').attr('src', (dpi>1) ? 'images/rbl_cat_pic-440.jpg' : 'images/rbl_cat_pic-220.jpg');
$('.js-11').attr('src', (dpi>1) ? ((dpi>2) ? 'images/demetri-660.jpeg' : 'images/demetri-440.jpeg') : 'images/demetri-220.jpeg');
$('.js-12').attr('src', (dpi>1) ? 'images/oasheka-small-440.jpg' : 'images/oasheka-small-220.jpg');
$('.js-13').attr('src', (dpi>1) ? 'images/512x512_headshot-492.jpg' : 'images/512x512_headshot-246.jpg');};
if(!window.HTMLPictureElement){r();}
(function(){$('a[href^="#"]:not(.allowConsent,.noConsent,.denyConsent,.removeConsent)').each(function(){$(this).click(function(){var t=this.hash.length>1?$('[name="'+this.hash.slice(1)+'"]').offset().top:0;return $("html, body").animate({scrollTop:t},400),!1})})})();
initMenu($('#menu-1')[0]);

});