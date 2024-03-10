(function( $ ) {
 	$(document).ready(function(){
		/*
		$('.socialShareBar').updateSocialShareBar();
		$(window).scroll(function(e){
			$('.socialShareBar').updateSocialShareBar();
		});
		$(window).resize(function(e) {
            $('.socialShareBar').updateSocialShareBar();
        });
		*/
	});
    $.fn.updateSocialShareBar = function(obj) {
		if (typeof obj === "undefined" || obj === null) { 
			obj = {checkVisible:true};
		 }
		var numBars = this.length;
		var onScreenBarsArr = [];
		var offScreenBarsArr = [];
		var onScreenUrlSharedArr = [];
		var offScreenUrlSharedArr = [];
		$.each(this,function(key, val){	
			var urlShared = $(val).data('url_shared');
			if($(val).isOnScreen(obj['checkVisible']))
			{
				if(onScreenUrlSharedArr.indexOf(urlShared) == -1)
				{
					onScreenUrlSharedArr.push(urlShared);
					onScreenBarsArr.push(val);
				}else
				{
					offScreenUrlSharedArr.push(urlShared);
					offScreenBarsArr.push(val);
				}
			}else
			{				
				if(offScreenUrlSharedArr.indexOf(urlShared) == -1)
				{
					offScreenUrlSharedArr.push(urlShared);
					offScreenBarsArr.push(val);
				}				
			}
		});
		$.each(onScreenBarsArr, function(key, val){
			var pageUrl = $(val).data('url_shared');
			var cacheKeyParamValue = $(val).data('unique_key');
			var barsArrWithSameUrl = [];
			$.each(offScreenBarsArr, function(key_2, val_2){
				if($(val_2).data('url_shared') == pageUrl)
				{
					barsArrWithSameUrl.push(val_2);
				}
			});
			var shareElementClass = $(val).data('social_share_element');
			var counterUpdatedAll = $(val).data('share_counter_updated_all');
			var counterInProgressAll = $(val).data('share_counter_in_progress_all');
			
			if(!counterUpdatedAll && !counterInProgressAll)
			{
				$(val).attr('data-share_counter_in_progress_all',true);
				$.each(barsArrWithSameUrl, function(key_3, val_3){
					$(val_3).attr('data-share_counter_in_progress_all',true);
				});
				$.ajax({
					type:"get",
					dataType: "json",
					url:base_url+'/ajax_files/etb2b_social_api_all.php?action=get_url_shareCount',
					data:{page_url:pageUrl,cacheKeyParam:cacheKeyParamValue},
					success:function(_response){
						//console.log(_response);
						$.each($(val).children(shareElementClass), function(key_1, val_1){
							var socialKey = $(val_1).data('social_key');
							var shareCounter = $(val_1).data('share_counter');
							$(val_1).find(shareCounter).html(_response[socialKey]);								
						});
						$.each(barsArrWithSameUrl, function(key_3, val_3){
							$.each($(val_3).children(shareElementClass), function(key_4, val_4){
								var socialKey = $(val_4).data('social_key');
								var shareCounter = $(val_4).data('share_counter');
								$(val_4).find(shareCounter).html(_response[socialKey]);								
							});
						});
						$(val).attr('data-share_counter_updated_all', true);			
					},
					error:function(){
						$(val).attr('data-share_counter_updated_all', false);
						$(val).attr('data-share_counter_in_progress_all',false);
					}
				});
			}
			
		});
    };
 	$.fn.isOnScreen = function(checkVisible){
		var viewport = {};
		viewport.top = $(window).scrollTop();
		viewport.bottom = viewport.top + $(window).height();
		var bounds = {};
		bounds.top = this.offset().top;
		bounds.bottom = bounds.top + this.outerHeight();
		var isReallyVisible = (checkVisible)?(!(this.is(':hidden') || this.parents(':hidden').length)):true;
		return ((bounds.top <= viewport.bottom) && (bounds.bottom >= viewport.top) && (bounds.bottom <= viewport.bottom) && (bounds.top >= viewport.top) && isReallyVisible);
	};
	/*
	jQuery.extend(
  		jQuery.expr[ ":" ], 
			{ reallyVisible : function (a) { return !(jQuery(a).is(':hidden') || jQuery(a).parents(':hidden').length); }}
	);
	*/
}( jQuery ));