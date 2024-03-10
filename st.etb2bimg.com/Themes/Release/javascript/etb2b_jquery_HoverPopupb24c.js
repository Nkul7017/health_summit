(function( $ ) {
	var tplPool = {};
	var dataCallFunc;
	var closeCallFunc;
	$.HoverPopup = {
		addTemplate:function(obj){
			for(i in obj)
			{
				tplPool[i] = obj[i];
			}
		},
		setTemplates:function(obj){
			tplPool = {};
			for(i in obj)
			{
				tplPool[i] = obj[i];
			}
		},
		setDataCallFunc:function(func)
		{
			dataCallFunc = func;
		},
		setClosedCallFunc:function(func)
		{
			closeCallFunc = func;
		},
		setPopupData:function(id, obj)
		{
			if($('#'+id).is(":hover"))$('#'+id).trigger('mouseout');
			//changeCursor($('#'+id), 'pointer');
			$('#'+id).attr('data-hoverpopup', obj);
			if($('#'+id).is(":hover"))$('#'+id).trigger('mouseenter');
		}
	};
	var viewportWidth,viewportHeight;
	var hoverDirClassArr = ['hover_menu_above', 'hover_menu_above right_align', 'right_align', ''];
	$(document).ready(function(){
		getVPDim();
	});
	
	$(window).resize(function(){
		getVPDim();
	});
	
	$.fn.attachHoverPopup = function(popupId)
	{
		if(!popupId)return;
		if($(this).attr("hoverpopup-active")==1)return;
		//if(!$( "#"+popupId ).length)return;
		if(!$( "#"+popupId ).length)createPopUp(popupId, {});
		$(this).attr("hoverpopup-active",1);
		var popUpObj = $( "#"+popupId);
		$(this).hover(function(){
			if($(this).attr('data-hoverpopup'))
			{
				updatePopUp(popupId, $(this).data('hoverpopup'), $(this).attr('id'));
			}else
			{
				if(dataCallFunc)
				{
					dataCallFunc($(this).attr('id'));
					changeCursor(this, 'wait');
				}
				return;
			}
			
			var popupHeight = popUpObj.outerHeight();
			var popupWidth = popUpObj.outerWidth();
			
			var refId = $(this).attr("id");
			var refElem = document.getElementById(refId);
			var isRefSvgElem = refElem instanceof SVGElement;
			var refOuterHeight = (isRefSvgElem)?refElem.getBBox().height:$(this).outerHeight();
			var refOuterWidth = (isRefSvgElem)?refElem.getBBox().width:$(this).outerWidth();
						
			var space_above = $(this).offset().top - $(window).scrollTop();
			var space_below = viewportHeight - space_above - refOuterHeight;
			var space_left = $(this).offset().left - $(window).scrollLeft();
			var space_right = viewportWidth - space_left - refOuterWidth;
			var dirClass = hoverDirClassArr[3];
			var posArr = [[$(this).offset().top - popupHeight, $(this).offset().left], [$(this).offset().top - popupHeight, $(this).offset().left + refOuterWidth - popupWidth], [$(this).offset().top + refOuterHeight, $(this).offset().left + refOuterWidth - popupWidth], [$(this).offset().top + refOuterHeight, $(this).offset().left]];
			if(space_below>=popupHeight)
			{
				if((space_right + refOuterWidth)>=popupWidth)
				{
					dirIndex = 3;
				}else if(space_left>=popupWidth)
				{
					dirIndex = 2;
				}
			}else if(space_above>=popupHeight)
			{
				if((space_right + refOuterWidth)>=popupWidth)
				{
					dirIndex = 0;
				}else if(space_left>=popupWidth)
				{
					dirIndex = 1;
				}
			}else if(space_below>=space_above)
			{
				if((space_right + refOuterWidth)>=popupWidth)
				{
					dirIndex = 3;
				}else if(space_left>=popupWidth)
				{
					dirIndex = 2;
				}
			}else if(space_above>space_below)
			{
				if((space_right + refOuterWidth)>=popupWidth)
				{
					dirIndex = 0;
				}else if(space_left>=popupWidth)
				{
					dirIndex = 1;
				}
			}
			dirClass = hoverDirClassArr[dirIndex];
			popUpObj.css({position:'absolute',margin:0,top:posArr[dirIndex][0],left:posArr[dirIndex][1]});
			$.each(hoverDirClassArr,function(key, val){
				popUpObj.removeClass(val);
			});
			popUpObj.addClass(dirClass);
			popUpObj.show();
		},
		function()
		{
			if((!popUpObj.is(":hover")) || ($('#'+$(popUpObj).attr('id')+':hover').length != 0))
			{
				//changeCursor(popUpObj, 'pointer');
				popUpObj.hide();
				if(closeCallFunc)closeCallFunc($(popUpObj).attr('id'));
				/*
				$.each(hoverDirClassArr,function(key, val){
					popUpObj.removeClass(val);
				});
				*/
			}
		});
		popUpObj.hover(function(){
			$(this).show();
		}, function(){
			$(this).hide();
			if(closeCallFunc)closeCallFunc($(popUpObj).attr('id'));
		});
	}
	
	function getVPDim()
	{
		viewportWidth = $(window).width();
		viewportHeight = $(window).height();
	}
	function createPopUp(id, obj)
	{
		if(!obj)obj={};
		$('body').append('<div id="'+id+'" class="hover_menu show_nub white_bg" style="display:none; position:absolute;">'+getPopUpHTML(id, obj)+'</div>');
	}
	function updatePopUp(id, obj, _refId)
	{
		if($('#'+id).attr("data-refid") == _refId)return;
		$('#'+id).html(getPopUpHTML(id, obj));
		$('#'+id).attr("data-refid", _refId)
	}
	function getPopUpHTML(id, obj)
	{
		var tplStr = tplPool[id];
		for(i in obj)
		{
			//tplStr = tplStr.replace('{{'+i+'}}', obj[i]);
			tplStr = tplStr.replace(new RegExp('{{'+i+'}}', 'g'), obj[i]);
		}
		return tplStr;
	}
	function changeCursor(elem, curType)
	{
		$(elem).css( 'cursor', curType );
		$(elem).children('a:first-child').css({'cursor' : curType});
	}
}( jQuery ));