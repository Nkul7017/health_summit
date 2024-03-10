/*! youtube plugin for Cycle2;  version: 20130708 */
(function($) {
"use strict";
/*
var template = '<div class=cycle-youtube><object width="640" height="360">' +
    '<param name="movie" value="{{url}}"></param>' +
    '<param name="allowFullScreen" value="{{allowFullScreen}}"></param>' +
    '<param name="allowscriptaccess" value="always"></param>' +
    '<param name="wmode" value="opaque"></param>' +
    '<embed src="{{url}}" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="{{allowFullScreen}}" wmode="opaque"></embed>' +
'</object></div>';
*/
//var template = '<div class="cycle-youtube" data-cycle-title="{{slideTitle}}" data-cycle-desc="{{slideDesc}}"><div id="{{overlayId}}" style="display:none; pointer-events: none; position:absolute; top:0; width:100%; height:100%">{{overlayContent}}</div><iframe id="{{playerId}}" src="{{url}}" width="100%" height="100%" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>';
var template = '<div class="cycle-youtube" data-cycle-title="{{slideTitle}}" data-cycle-desc="{{slideDesc}}"><div id="{{overlayId}}" style="display:none; pointer-events: none; position:absolute; top:0; width:100%; height:100%; overflow:hidden;">{{overlayContent}}</div><iframe id="{{playerId}}" {{url}} width="100%" height="100%" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>';

var csContainer;
var players = {};
$.extend($.fn.cycle.defaults, {
    youtubeAllowFullScreen: true,
    youtubeAutostart: false,
    youtubeAutostop:  true
});    

$(document).on( 'cycle-bootstrap', function( e, opts ) {
    if ( ! opts.youtube )
        return;

	// don't hide inactive slides; hiding video causes reload when it's shown again
    opts.hideNonActive = false; 
	csContainer = opts.container;
    opts.container.find( opts.slides ).each(function(i) {
        // convert anchors to template markup
        if ( $(this).attr('href') === undefined )
            return;
        var markup, slide = $(this), url = slide.attr( 'href' ), videoId='', slideTitle='', slideDesc='', playerId=slide.attr('player_id'), overlayId=playerId+'_overlay', overlayContent='';
		url = convertHtml5URL(url);
        var fs = opts.youtubeAllowFullScreen ? 'true' : 'false';
        url += ( /\?/.test( url ) ? '&' : '?') + 'enablejsapi=1';
        if ( opts.youtubeAutostart && opts.startingSlide === i )
            url += '&autoplay=1';
		slideTitle = $(this).attr('data-cycle-title');
		slideDesc = $(this).attr('data-cycle-desc');
		if(slide.parent().children('.video_overlay').length)overlayContent = slide.parent().children('.video_overlay').eq(0).html();
		//markup = opts.API.tmpl( template, { url: url, allowFullScreen: fs, slideTitle:slideTitle, slideDesc:slideDesc, playerId:playerId, overlayId:overlayId, overlayContent:overlayContent });
		markup = opts.API.tmpl( template, { url: (((i==0)?'src="':'data-src="')+url+'"'), allowFullScreen: fs, slideTitle:slideTitle, slideDesc:slideDesc, playerId:playerId, overlayId:overlayId, overlayContent:overlayContent });
        slide.replaceWith( markup );
		players[playerId] = '';
    });
    opts.slides = opts.slides.replace(/(\b>?a\b)/,'div.cycle-youtube');
	
	//============================== video on demand start =================
	$(e.target).on( 'cycle-before', function(e, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag ) {
		var isNextIframe = Boolean($(incomingSlideEl).find("iframe").length);
		if(isNextIframe)
		{
			if(!$($(incomingSlideEl).children("iframe")[0]).attr('src'))
			{
				$($(incomingSlideEl).children("iframe")[0]).attr("src", $($(incomingSlideEl).children("iframe")[0]).attr("data-src"));
			}
		}
	});
	//============================== video on demand end ============
	
    if ( opts.youtubeAutostart ) {
        opts.container.on( 'cycle-initialized cycle-after', function( e, opts ) {
            var index = e.type == 'cycle-initialized' ? opts.currSlide : opts.nextSlide;
            $( opts.slides[ index ] ).find('object,embed').each( play );
        });
    }

    if ( opts.youtubeAutostop ) {
        opts.container.on( 'cycle-before', function( e, opts ) {
            $( opts.slides[ opts.currSlide ] ).find('object,embed').each( pause );
			$( opts.slides[ opts.currSlide ] ).find('iframe').each( pause );
			
        });
    }
	$.getScript("https://www.youtube.com/iframe_api", function(){	
	   //console.log("YT Script loaded and executed.");
	});
});

function play() {
    /*jshint validthis:true */
    try {
        this.playVideo();
    }
    catch( ignore ) {}
}
function pause() {
    /*jshint validthis:true */
    try {
		if(players[$(this).attr('id')].getPlayerState() != 5)players[$(this).attr('id')].pauseVideo();		
        //this.pauseVideo();
    }
    catch( ignore ) {}
}
function convertHtml5URL(url) {
    // this regex needs to stay up-to-date
    var pattern = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
    var videoID = url.match(pattern);
    // if video ID successfully extracted, change the URL format
    if(videoID[1])
       url = 'https://www.youtube.com/embed/'+videoID[1]+'?hd=1&amp;wmode=opaque&amp;controls=1&amp;showinfo=0&amp;rel=0';
    return url;
}
function onPlayerReady(evt)
{
	//console.log('onPlayerReady');
	//$("#"+evt.target.f.id+"_overlay").show();
	//$("#"+evt.target.c.id+"_overlay").show();
	//$("#"+evt.target.a.id+"_overlay").show();
	var curIframeId = getYtIframeId(evt);
	if(curIframeId)$("#"+curIframeId+"_overlay").show();
}
function onPlayerStateChange(evt)
{
	if(evt.data == -1)return;
	//var showId = evt.target.f.id.split('_')[0];
	//var showId = evt.target.c.id.split('_')[0];
	//var showId = evt.target.a.id.split('_')[0];
	var curIframeId = getYtIframeId(evt);
	if(!curIframeId)return;
	var showId = curIframeId.split('_')[0];
	csContainer = $('#'+showId+'_cycle-slideshow');
	
	if(evt.data == 2)
	{
		$(csContainer).cycle('resume');
	}else
	{
		$(csContainer).cycle('pause');
		//$("#"+evt.target.f.id+"_overlay").hide();
		//$("#"+evt.target.c.id+"_overlay").hide();
		//$("#"+evt.target.a.id+"_overlay").hide();
		$("#"+curIframeId+"_overlay").hide();
	}
}
window.onYouTubeIframeAPIReady = function(id) {
	//console.log('onYouTubeIframeAPIReady');
	$.each(players, function(key, val){
	   if(val == '')players[key] = new YT.Player(key, {events: {'onReady': onPlayerReady,'onStateChange': onPlayerStateChange}});
   });
}
function getYtIframeId(evt)
{
	var id;
	for(var prop in evt.target)
	{
		if((typeof evt.target[prop]) ==  'object')if(evt.target[prop] != null)if(evt.target[prop].tagName == 'IFRAME')
		{
			var id_temp = evt.target[prop].id;
			if(id_temp.split("_")[1]=="ytv")
			{
				id = id_temp;
				break;
			}
		}
	}
	return id;
}
})(jQuery);
