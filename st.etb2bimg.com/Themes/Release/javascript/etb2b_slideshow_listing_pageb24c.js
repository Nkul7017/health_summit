var $display_single_fullwidth = $("#etb2b-slideshow-listing-page").data("display_single_fullwidth");

$(document).ready(function(){
	var dataElem = $("#etb2b-slideshow-listing-page");
	ctrlData = {pageData:{nextPage:dataElem.data("nextpage"), slide_path:dataElem.data("cms_slide_path"),slide_parent_path:dataElem.data("slide_parent_path"),section_id:dataElem.data("section_id")}};
	var sldtls = dataElem.data("slide_details");
	if(!(sldtls instanceof Array))
	{
		var sldsdtl = dataElem.data("slideshow_details_");
		var ssdata = {_page_URL:dataElem.data("_page_url"), slide_details:sldtls, slidesDetail:sldsdtl, photo_id:dataElem.data("photo_id"), curSlideImgId:'#showHolder_popup_imgDiv_0', selectorBarId:'#slideSelectorBar', selectorBarLimit:10, imgDir:CMS_IMG_URL+'/photo/', nextSlideshowUrl:dataElem.data("nextslideshowurl")};
		ctrlData['slideshowData'] = ssdata;
	}
	var sslst_pageCtrl = new SlideshowListingPage_PageCtrl(ctrlData);
});

function SlideshowListingPage_SlideshowCtrl(obj)
{
	var _page_URL = obj['_page_URL'];
	var slide_details = obj['slide_details'];
	var slidesDetail = obj['slidesDetail'];
	var imgDir = obj['imgDir'];
	var photo_id = obj['photo_id'];
	
	var slideshow;
	var slideshow_popup;
	//var slideshow_slidingBlock;
	var slidesData = [];
	var slideImgDimensionArr = [];
	var imgCount = 0;
	var curSlideIndex = 0;
	var curSlideImgId = obj['curSlideImgId'];
	var curSlideImgDimension = {};
	var selectorBarId = obj['selectorBarId'];
	var selectorBarLimit = obj['selectorBarLimit'];
	var msid = getParameterByName('msid');
	var pageInitiated = false;
	var nextSlideshowUrl = obj['nextSlideshowUrl'];
	var showPopupDetailWidth = $("#showPopupDetail").width();
	var nvgtrElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') > 0) ? "body": "html");
	
	var analyticsUpdatePool = {};
	var multipleanalyticshit = $("#etb2b-slideshow-listing-page").data("multipleanalyticshit");
	
	$(document).keyup(function(e) { 
		switch(e.keyCode)
		{
			case 27:
				//removeOverlay_slidingBlock();
				closePopup();
				break;
			/*
			case 37:
				prevSlideit();
				break;
			case 39:
				nextSlideit();
				break;
				*/
		}
	});
	$(window).resize(function(){
	/*
	if(slideshow)slideshow.resize($(".slideshowbox").width());
	if(slideshow_popup)if($("#ssPopupHolder .popup_content").is(':visible'))slideshow_popup.resize($(".slideshowbox_popup").width());
	*/
	//updateShowWidth();
	
	updateShowDimension();
	centerPopup();
	});
	$(document).ready(function()
	{
		if(!slidesDetail)return;
		if(slidesDetail.length==0)return;
		//$("#popupBgOverlay").show();
		$("#popupBgOverlay").css({display:'block'});
		for(var prop in slidesDetail)
		{
			//console.log(prop);
			var dataObj = slidesDetail[prop];
			//console.log(slidesDetail);
			slidesData.push({msid:dataObj['msid'], imgUrl:imgDir + dataObj['msid']+'.cms', description:{title:dataObj['ssname'], detail:slidesDetail[prop]['caption']},meta:{artdate:dataObj['artdate2']}});
			analyticsUpdatePool[prop]=false;
			if(prop == '_'+photo_id)
			{
				curSlideIndex = imgCount;
			}
			if(msid)if(prop == '_'+msid)curSlideIndex = imgCount;
			imgCount++;
			$("#slideSelectorBar li:last-child").before('<li class="page'+ ((prop == '_'+photo_id)?" active":"")+'" slideNum="'+(imgCount-1)+'" onclick_="changeSlide('+ (imgCount-1) +');" style="display: block;"><a href="javascript: void(0);">'+ imgCount +'</a></li>');
		}
		
		/*
		//updateShowWidth();
		slideshow = new etb2b_slideshow({
			slidesData:slidesData,
			showPref:{slideWidth:$("#show_1").innerWidth(), slideHeight:$("#show_1").innerHeight(), curSlideIndex:curSlideIndex, autoPlay:false, slideChangedCallback:onSlideChanged},
			showHolder:$("#showHolder"),
			playPauseBtn:$("#playPauseBtn"),
			previousBtn:$("#previousBtn"),
			nextBtn:$("#nextBtn"),
			slideTitleHolder:$("#slideTitle"),
			detailHolder:$("#slideDetail")
			});
		//slideshow.setSlidesData({curSlideIndex:1});
		*/
		//showInPageSlideshow();
		
		//============= Reload script part =======
		var curSlideDetail = slidesDetail['_'+slidesData[curSlideIndex]["msid"]];
		var seoLocation = curSlideDetail["seolocation"];
		var seoLocationArr = seoLocation.split("/");
		//seoLocationArr.pop();
		//seoLocation = seoLocationArr.join("/");
		seoLocation = seoLocationArr[0];
		
		reloadSeoLocation = _page_URL + "/" + seoLocation + "/";
		//================================
		//console.log($_GET['autoplay']);
		var autoplayBool = Boolean(parseInt($_GET['autoplay']));
		if(!$display_single_fullwidth)showPopupSlideshow(($_GET['autoplay'])?autoplayBool:false);
		
		$("#showInPopupBtn").click(function()
		{
			showPopupSlideshow(true);
		});
		$(".picStorySlide").click(function(e)
		{
			curSlideIndex = $(e.currentTarget).data("slidendx");
			showPopupSlideshow(false);
		});
		$("#showPopup_closeBtn").click(function()
		{
			closePopup();
		});
		
		
		//--------------------------- sliding block start ----------------------------------------//
		
		/* slideshow_slidingBlock = new etb2b_slideshow({
			slidesData:slidesData,
			showPref:{slideWidth:$("#show_slidingBlock").innerWidth(), slideHeight:$("#show_slidingBlock").innerHeight(), curSlideIndex:curSlideIndex, autoPlay:false, slideChangedCallback:onSlideChanged_slidingBlock},
			showHolder:$("#showHolder_slidingBlock"),
			playPauseBtn:$("#playPauseBtn_slidingBlock"),
			previousBtn:$("#previousBtn_slidingBlock"),
			nextBtn:$("#nextBtn_slidingBlock"),
			slideTitleHolder:$("#slideTitle_slidingBlock"),
			detailHolder:$("#slideDetail_slidingBlock")
			});
			
		$("#slidingBlock_detail").css({left:($('#show_slider_1').offset().left + $('#show_slider_1').width() - $("#slidingBlock_detail").width()) + "px"});
		$('#show_slider_1').mouseenter(function () {
			loopDeLoop("right");
		}).mouseleave(function () {
			loopDeLoop("left");
		})
		$("#slidingBlock_1_closeBtn, #slidingBlock_overlayfrm").click(function (e) {
			removeOverlay_slidingBlock();
		});
		$("#previousBtn_slidingBlock, #nextBtn_slidingBlock, #playPauseBtn_slidingBlock").click(function(e){
			showOverlay_slidingBlock();
			});
		function onSlideChanged_slidingBlock(index)
		{
			console.log("onSlideChanged_slidingBlock callback: "+ index);		
			curSlideIndex = index;
			updateSlideInHistoryStateParams();		
		} */
		//--------------------------- sliding block end ----------------------------------------//
		//setSocialShareUrl();
		setSocialShareUrlForSlide(curSlideIndex);
		//updateSocialShareCount();
		setupMediaViewer();
		//$('#popupBgOverlay').hide();
		$("#popupBgOverlay").css({display:'none'});
		$(selectorBarId+' .pvsbtn').click(function(){prevSlideit();});
		$(selectorBarId+' .nxtbtn').click(function(){nextSlideit();});
		$(selectorBarId+' ul li.page').click(function(e){
			changeSlide($(e.currentTarget).attr('slideNum'));
		});
	});
	function onSlideChanged(index, paramObj)
	{
		//console.log("onSlideChanged");
		updateAnalyticsSlideshow(index);
		//console.log("onSlideChanged callback: " + index);
		//console.log(paramObj['dimension']);
		curSlideIndex = index;
		$("#slideCounter").html(index + 1);
		$("#slideSelectorBar li").removeClass('active');
		$("#slideSelectorBar li:nth-child("+(index+2)+")").addClass('active');
		
		$("#slideSelectorBar .pvsbtn").css({cursor:((curSlideIndex == 0)?'default':'pointer'), opacity:((curSlideIndex == 0)?0.2:1)});
		$("#slideSelectorBar .nxtbtn").css({cursor:((curSlideIndex == (slidesData.length - 1))?'default':'pointer'), opacity:((curSlideIndex == (slidesData.length - 1))?0.2:1)});
		
		if(pageInitiated)
		{
			updateSlideInHistoryState();
			//updateSlideInHistoryStateParams();
		}else
		{
			pageInitiated = true;
		}
		//setSlider($("#scrollPane-slideDetail"));
		$("#showHolder_imgTd_"+curSlideIndex).css({height:$("#showHolder").height()});
		$("#scrollPane-slideDetail").css({height:($("#slideshow_detailBlock").height() - 20 - $("#slideTitle").outerHeight(true))+"px"});
		callSetSlider("#scrollPane-slideDetail");
		setSocialShareUrlForSlide(curSlideIndex);
	}
	function onSlideImageLoaded(index, paramObj)
	{	
		//console.log("onSlideImageLoaded callback: "+ index);
		slideImgDimensionArr[index] = paramObj;
		if(index == curSlideIndex)
		{
			updateShowDimension();
		}
	}
	function onSlideChange(elem)
	{
		//alert(elem.value);
		if(slideshow)slideshow.showSlide({slideIndex:Number(elem.value), autoPlay:false});
	}
	function showInPageSlideshow()
	{
		//document.getElementById('inPage_ss').style.display='block';
		if(!$("#inPage_ss").length)return;
		$("#inPage_ss").css({display:'block'});
		if(!slideshow)
		{
			var ssPref = {
				slidesData:slidesData,
				showPref:{slideWidth:$("#show_1").innerWidth(), slideHeight:$("#show_1").innerHeight(), curSlideIndex:curSlideIndex, autoPlay:false, slideChangedCallback:onSlideChanged, slideImageLoadedCallback:onSlideImageLoaded},
				showHolder:$("#showHolder"),
				playPauseBtn:$("#playPauseBtn"),
				previousBtn:$("#previousBtn"),
				nextBtn:$("#nextBtn"),
				slideTitleHolder:$("#slideTitle"),
				slideMetaHolder:$("#slideMeta"),
				detailHolder:$("#slideDetail"),
				showTitle:slide_details['slidename']/*,
				reloadUrl:reloadSeoLocation*/
				};
			if(ET_PORTAL == 'auto')ssPref['slideStayDuration'] = 8000;
			slideshow = new etb2b_slideshow(ssPref);
		}else
		{
			slideshow.showSlide({slideIndex:curSlideIndex, autoPlay:false, transition:false});
		}
		slideshow.enableNavKey(true);
	}
	function showPopupSlideshow(autoMode)
	{
		$("body").css({overflow:'hidden'});
		//document.getElementById('light').style.display='block';
		$("#light").css({display:'block'});
		//document.getElementById('fade').style.display='block';
		$("#fade").css({display:'block'});
		//console.log($("#show_popup"));return;
		updateShowPopupHeight();
		if(!slideshow_popup)
		{
			var ssPref = {
				slidesData:slidesData,
				showPref:{slideWidth:$("#show_popup").innerWidth(), slideHeight:$("#show_popup").innerHeight(), curSlideIndex:curSlideIndex, autoPlay:autoMode, onCompleteParams:{loop:false, link:nextSlideshowUrl+'?autoplay=1', target:'_self'}, slideChangedCallback:onSlideChanged_popup, slideImageLoadedCallback:onSlideImageLoaded_popup, slideTransitionCompleteCallback:onSlideTransitionCompleted_popup},
				showHolder:$("#showHolder_popup"),
				playPauseBtn:$("#playPauseBtn_popup"),
				previousBtn:$("#previousBtn_popup"),
				nextBtn:$("#nextBtn_popup"),
				showTitleHolder:$("#showTitle_popup"),
				slideTitleHolder:$("#slideTitle_popup"),
				slideMetaHolder:$("#slideMeta_popup"),
				detailHolder:$("#slideDetail_popup"),
				showTitle:slide_details['slidename']/*,
				reloadUrl:reloadSeoLocation*/
				};
			if(ET_PORTAL == 'auto')ssPref['slideStayDuration'] = 8000;
			slideshow_popup = new etb2b_slideshow(ssPref);
			$("#showTitle_popup").html(slide_details['slidename']);
			//========================================================== google ad code
			
			googletag.cmd.push(function() {
				googletag.pubads().addEventListener('slotRenderEnded', function(event) {
				  	if($("#"+event.slot.getSlotElementId()).parent().hasClass("scrollPane-adChange"))
				  	{	
					  	var $adHeight = event.size[1];
						$(".scrollPane-adChange").data("adheight", $adHeight);
					  	$("#scrollPane-slideDetail_popup").css({height:($("#lightCntr .slideshowbox_popupHolder").height() - $("#mediaViewerNav").outerHeight() - $("#slideTitle_popup").outerHeight()- $(".scrollPane-adChange").data("adheight"))});
						$(idStr).niceScroll();
						$(".scrollPane-adChange").show();
				  	}				  
				});
			});
			//==========================================================
			
		}else
		{
			slideshow_popup.showSlide({slideIndex:curSlideIndex, autoPlay:autoMode, transition:false});
			//========================================================== google ad code
			googletag.pubads().refresh([slideshowGPTBanner]);
			//==========================================================
		}
		updateShowDimension();
		centerPopup();
		if(slideshow)slideshow.enableNavKey(false);
		//$('body').css('overflow','hidden');
	}
	function onSlideChanged_popup(index, paramObj)
	{
		//console.log("onSlideChanged_popup: "+ index);
		updateAnalyticsSlideshow(index);
		curSlideIndex = index;
		curSlideImgDimension = paramObj['dimension'];
		$("#counterHolder_popup").text((curSlideIndex+1) + ' of ' + slidesData.length);
		updateSlideInHistoryState();
		//setSlider($("#scrollPane-slideDetail_popup"));
		callSetSlider("#scrollPane-slideDetail_popup");
		/*/
		if(paramObj['navByUser'] == 1)
		{
			location.href = _override_history_url;
			location.reload();
		}
		*/
		$("#showHolder_popup_imgTd_"+curSlideIndex).css({height:$("#showHolder_popup").height()});
		setSocialShareUrlForSlide(curSlideIndex);
	}
	function onSlideImageLoaded_popup(index, paramObj)
	{	
		//console.log("onSlideImageLoaded_popup callback: "+ index);
		slideImgDimensionArr[index] = paramObj;
		if(index == curSlideIndex)
		{
			//if($(window).height()>479)$("#lightCntr .slideshow_sharepanel").show();
			updateShowDimension();
			$("#ssPopupSharePanel").css({visibility:'visible'});
			$("#showPopupDetail").css({visibility:'visible'});
			$("#ppBtnHolder").css({visibility:'visible'});
		}
	}
	function onSlideTransitionCompleted_popup(index)
	{
		//console.log('onSlideTransitionCompleted_popup: ' + index);
		//if(slideImgDimensionArr[index])updateShowDimension();
	}
	function updateShowPopupWidth() {
		//console.log('updateShowPopupWidth');
		if($(window).width() < 1300) {
			$("#lightCntr").removeClass("middle-spread").addClass("end-spread");
			$("#showPopupDetail").removeClass("showPopupDetail-Left").addClass("showPopupDetail-Bottom");
			$("#ssPopupSharePanel").addClass("slideshow_sharepanel-Bottom");
			//$("#showPopupDetail").css({width:'100%'});
			//$("#showPopupDetail").css({bottom:0-$("#showPopupDetail").height()+20});
			$("#showPopupDetail").css({top:'100%'});
			showPopupDetailWidth = $("#showPopupDetail").width();
			//$("#slideTitle_popup").css({marginTop:0});
			$("#scrollPane-slideDetail_popup").css({height:'80px'});
			//$("#lightCntr").css({width:($(window).width() - ((($("#ssPopupSharePanel").is(':visible'))?(($(window).width()<=479)?0:$("#ssPopupSharePanel").width()):(($(window).width()<=479)?10:0/*$("#showPopup_closeBtn").outerWidth(true)*/))+22))+'px', height:($("#light").height() - 16 - $("#mediaViewerNav").outerHeight() - $("#showPopupDetail").outerHeight() + 20)});
			$("#lightCntr").css({width:($(window).width() - (($(window).width()<=640)?10:20)*2)+'px', height:($("#light").height() - 16 - $("#mediaViewerNav").outerHeight() - $("#showPopupDetail").outerHeight() + 20)});
			//$("#showPopupDetail").css({width:'100%'});
			//$("#showPopupDetail .detailHolder").css({marginLeft:0, marginRight:0});
		} else {
			$("#lightCntr").removeClass("end-spread").addClass("middle-spread");
			$("#showPopupDetail").removeClass("showPopupDetail-Bottom").addClass("showPopupDetail-Left");
			$("#ssPopupSharePanel").removeClass("slideshow_sharepanel-Bottom");
			showPopupDetailWidth = $("#showPopupDetail").width();
			//$("#showPopupDetail").css({width:$("#mediaViewerNav").outerWidth(), bottom:'', top:($("#lightCntr .slideshowbox_popupHolder").position().top + Number($("#lightCntr .slideshowbox_popupHolder").css('padding-top').replace("px","")))});
			//$("#slideTitle_popup").css({marginTop:'20px'});
			//$("#lightCntr").css({width:($(window).width() - $("#mediaViewerNav").outerWidth()*2)+'px', height:'100%'});
			//$("#lightCntr").css({width:($(window).width() - $("#mediaViewerNav").outerWidth() - 150)+'px', height:'100%'});
			$("#lightCntr").css({width:($(window).width() - showPopupDetailWidth - $("#ssPopupSharePanel").width())+'px', height:'100%'});
			//$("#showPopupDetail").css({height:($("#lightCntr .slideshowbox_popupHolder").height() - $("#mediaViewerNav").outerHeight())});
			//console.log("sdp: " + $("#lightCntr .slideshowbox_popupHolder").height());
			$("#scrollPane-slideDetail_popup").css({height:($("#lightCntr .slideshowbox_popupHolder").height() - $("#mediaViewerNav").outerHeight() - $("#slideTitle_popup").outerHeight())});
			//$("#showPopupDetail .detailHolder").css({marginLeft:'20px', marginRight:'20px'});
			$('#showPopupDetail').css('top','70px');
		}
		//setSlider($("#scrollPane-slideDetail_popup"));
	}
	function updateShowDimension() {
		//console.log('updateShowDimension: ' + curSlideIndex);
		//console.log($("#showPopupDetail").outerHeight());
		curSlideImgId = "#showHolder_popup_img_" + curSlideIndex;
		updateShowPopupWidth();
		if(slideshow) {
			slideshow.resize($(".slideshowbox").width(), $(".slideshowbox").width()*0.75);
			$("#showHolder_imgTd_"+curSlideIndex).css({height:$("#showHolder").height()});
			$("#scrollPane-slideDetail").css({height:($("#slideshow_detailBlock").height() - 10 - $("#slideTitle").outerHeight(true))+"px"});
			callSetSlider("#scrollPane-slideDetail");
		}
		if(slideshow_popup)if($("#ssPopupHolder .popup_content").is(':visible')) {
			updateShowPopupHeight();
			slideshow_popup.resize($(".slideshowbox_popup").width(), $("#show_popup").height());
			$("#showHolder_popup_imgTd_"+curSlideIndex).css({height:$("#showHolder_popup").height()});
			if($(window).width() < ($(window).height()*1.4)) {
				//$("#showPopupDetail").css({width:$(curSlideImgId).width()});
				$("#showPopupDetailBg").css({height:'80px'});
				//$("#showPopupDetail").css({left:$(curSlideImgId).offset().left - $('#show_popup').offset().left, top:$(curSlideImgId).offset().top + $(curSlideImgId).height() + 10});
				//$("#showPopupDetail").css({/*left:$(curSlideImgId).offset().left - $('#show_popup').offset().left,*/ top:$(curSlideImgId).offset().top + $(curSlideImgId).height() + 10});
				$("#showPopupDetailHolder").css({top:0});
				$('#showTitle_popup').css({width:($("#lightCntr").width() - $('#showPopup_closeBtn').width() - 10) + 'px'});
			} else {
				//console.log($(window).width() - ($(curSlideImgId).offset().left + $(curSlideImgId).width()) - 20);
				//$("#showPopupDetail").css({width:$("#mediaViewerNav").outerWidth() + $(curSlideImgId).offset().left - $('#show_popup').offset().left, bottom:'', top:($("#lightCntr .slideshowbox_popupHolder").position().top + Number($("#lightCntr .slideshowbox_popupHolder").css('padding-top').replace("px","")))});
				// console.log($(curSlideImgId).width());
				//$("#showPopupDetail").css({width:$(window).width() - ($(curSlideImgId).offset().left + $(curSlideImgId).width()), bottom:'', top:($("#lightCntr .slideshowbox_popupHolder").position().top + Number($("#lightCntr .slideshowbox_popupHolder").css('padding-top').replace("px","")))});
				$("#showPopupDetail").css({/*width:showPopupDetailWidth,*/ bottom:'', top:($("#lightCntr .slideshowbox_popupHolder").position().top + Number($("#lightCntr .slideshowbox_popupHolder").css('padding-top').replace("px","")))});
				$("#scrollPane-slideDetail_popup").css({height:((($(window).height()>640)?($("#lightCntr .slideshowbox_popupHolder").height()*3/4):$(curSlideImgId).height()) - $("#mediaViewerNav").outerHeight(true)/2 - $("#slideTitle_popup").outerHeight(true))});
				//$("#scrollPane-slideDetail_popup").css({height:($("#lightCntr .slideshowbox_popupHolder").height()/2 - $("#slideTitle_popup").outerHeight() - 10)});
				//setSlider($("#scrollPane-slideDetail_popup"));
				callSetSlider("#scrollPane-slideDetail_popup");
				//$("#showPopupDetail").css({left:$(curSlideImgId).offset().left + $(curSlideImgId).width() - $('#show_popup').offset().left});
				//$("#showPopupDetail").css({right:-showPopupDetailWidth});
				//$("#showPopupDetailBg").css({width:$("#mediaViewerNav").outerWidth(true), height:($("#lightCntr .slideshowbox_popupHolder").height())});
				//$("#showPopupDetailHolder").css({top:(($(window).height()>479)?($('#showPopupDetailBg').height()/4):($(curSlideImgId).offset().top - $('#show_popup').offset().top))});
				$('#showTitle_popup').css({width:$("#lightCntr").width() + 'px'});
			}
			$('.site-header').css('z-index','1');
			$('html').addClass("sidebarPopup");
			
			$("#scrollPane-slideDetail_popup").css({height:($('#mediaViewerNav').offset().top - $('#scrollPane-slideDetail_popup').offset().top)+'px'});
		} else {
			$('.site-header').css('z-index','2');
			$('html').removeClass("sidebarPopup");
			$("#ssPopupHolder .popup_content").removeClass('opaque').addClass('transparent');
			$("#ssPopupHolder .popup_content").show();
			updateShowPopupHeight();
			slideshow_popup.resize($(".slideshowbox_popup").width(), $("#show_popup").height());
			$("#ssPopupHolder .popup_content").hide();
			$("#ssPopupHolder .popup_content").removeClass('transparent').addClass('opaque');
		}
		callSetSlider("#scrollPane-slideDetail_popup");
		$("#scrollPane-slideDetail_popup").css({height:($("#lightCntr .slideshowbox_popupHolder").height() - $("#mediaViewerNav").outerHeight() - $("#slideTitle_popup").outerHeight()- $(".scrollPane-adChange").data("adheight"))});
	}
	function updateShowPopupHeight() {
		var popupHolder = $(".slideshowbox_popupHolder");
		popupHolder.css({height:popupHolder.parent().height() - (Number(popupHolder.css("padding-bottom").replace("px","")) + Number(popupHolder.css("padding-bottom").replace("px",""))) - 43});
	}
	function updateShowWidth() {
		if(slideshow)slideshow.resize($(".slideshowbox").width());
		if(slideshow_popup)if($("#ssPopupHolder .popup_content").is(':visible')) {
			slideshow_popup.resize($(".slideshowbox_popup").width());
		} else {
			$("#ssPopupHolder .popup_content").removeClass('opaque').addClass('transparent');
			$("#ssPopupHolder .popup_content").show();
			slideshow_popup.resize($(".slideshowbox_popup").width());
			$("#ssPopupHolder .popup_content").hide();
			$("#ssPopupHolder .popup_content").removeClass('transparent').addClass('opaque');
		}
	}
	
	function centerPopup() {
		var popLeft = 0;
		var popTop = 0;
		$("#light").css({left:popLeft, top:popTop});
	}
	function closePopup() {
		if(!slideshow_popup)return;
		slideshow_popup.pause();
		
		$("#light").css({display:'none'});
		//document.getElementById('fade').style.display='none';
		$("#fade").css({display:'none'});
		//$('body').css('overflow','auto');
		$("body").css({overflow:'visible'});
		showInPageSlideshow();
	}
	function changeSlide(index) {
		//alert(elem.value);
		//================page reload======================
		//alert(reloadSeoLocation+slidesData[index]["msid"]);
		//return;
		// location.href = reloadSeoLocation+slidesData[index]["msid"];
		// return;
		//=================================================
		if(slideshow)slideshow.showSlide({slideIndex:index, autoPlay:false});
	}
	function prevSlideit() {
		if(curSlideIndex == 0)return;
		if(slideshow)slideshow.previous();
	}
	function nextSlideit() {
		if(curSlideIndex == (slidesData.length - 1))return;
		if(slideshow)slideshow.next();
	}
	function updateSlideInHistoryState()
	{
		var curSlideDetail = slidesDetail['_'+slidesData[curSlideIndex]["msid"]];
		//_override_history_url = _page_URL + "/" + curSlideDetail["seolocation"] + "/" + curSlideDetail["msid"];
		var seoLocation = curSlideDetail["seolocation"];
		var seoLocationArr = seoLocation.split("/");
		//seoLocationArr.pop();
		//seoLocation = seoLocationArr.join("/");
		seoLocation = seoLocationArr[0];
		_override_history_url = _page_URL + "/" + seoLocation + "/" + curSlideDetail["msid"];
		var pageTitle = slide_details['slidename'] +(($.trim(curSlideDetail['ssname']))?(' - '+$.trim(curSlideDetail['ssname'])):'')+' | '+ SITE_TITLE;
		setTimeout(function(){
			overRideHistoryState(_override_history_url, pageTitle);
		}, 1000);
	}
	
	function updateSlideInHistoryStateParams()
	{
		return;
		var curSlideDetail = slidesDetail['_'+slidesData[curSlideIndex]["msid"]];
		var currentUrl = window.location.href;
		var msid = "";
		if(currentUrl.split("?").length == 1)
		{
			_override_history_url = currentUrl + "?msid=" + curSlideDetail["msid"];
		}else
		{
			msid = getParameterByName('msid');
			if(msid == null)
			{
				_override_history_url = currentUrl + "&msid=" + curSlideDetail["msid"];
			}else
			{
				_override_history_url = getUrlParameterReplaced(currentUrl, 'msid', curSlideDetail["msid"]);
			}
			//console.log("_override_history_url: " + _override_history_url);
		}
		overRideHistoryState(_override_history_url);
	}
	
	//--------------------------- sliding block start ----------------------------------------//
	var varAutoSlide = 0, autoSlideInterval = 0;
	
	function loopDeLoop(direction) {
		/*
		console.log($("#show_slider_1").width());
		console.log($("#slidingBlock_detail").width());
		console.log("loopDeLoop: " + direction);
		*/
		if (direction == "right") {
			$("#slidingBlock_detail").stop().animate({
				left: ($('#show_slider_1').offset().left + $('#show_slider_1').width())+"px"
			}, "1800");
			/*
			if($('#sideBar').css('float') == 'left') {
				$("show_slider_1").stop().animate({
					left: "-350px"
				}, "1800");
			}
			*/
		}
		if (direction == "left") {
			$("#slidingBlock_detail").stop().animate({
				left: ($('#show_slider_1').offset().left + $('#show_slider_1').width() - $("#slidingBlock_detail").width()) + "px"
			}, "1800");
			/*
			if($('#sideBar').css('float') == 'left') {
				$("show_slider_1").stop().animate({
					left: "0px"
				}, "1800");
			}
			*/
		}
	}
	/*
	function stopAutoPlay_slidingBlock() {
		slideshow_slidingBlock.pause();
		slideshow.showSlide({slideIndex:curSlideIndex, autoPlay:false, transition:false});		
	}
	*/
	function autoSlide() {
		
		var currentCount = parseInt($('.counting #cnt').text()) + 1, totalCount=  $('#sliderin li').length;
		//console.log('count ' , currentCount, totalCount);
		currentCount = currentCount > totalCount ? 0 : currentCount;
		if(currentCount <= totalCount) {
			if(varAutoSlide) {
				$('.nextSlideshows').trigger('click');
				autoSlideInterval = setTimeout('autoSlide()', 8000);
			}
		}
		if(currentCount == totalCount){
			$('.autoplayText').text("Play Slideshow");
			clearTimeout(autoSlideInterval);	
			varAutoSlide = 0;
		}
		
	}
	/*
	function removeOverlay_slidingBlock()
	{
		stopAutoPlay_slidingBlock();
		$("#slidingBlock_overlayfrm").hide();
		loopDeLoop("left");
		$('#show_slider_1').bind("mouseenter", function () {
			loopDeLoop("right");
		}).bind("mouseleave", function () {
			loopDeLoop("left");
		});
	}
	*/
	function showOverlay_slidingBlock()
	{
		$("#slidingBlock_overlayfrm").show();
		//console.log($("#slidingBlock_detail").css("left"));
		/*
		if($("#slidingBlock_detail").css("left") == "0px"){
			  loopDeLoop("right");
			}
			*/
	}
	//--------------------------- sliding block end ----------------------------------------//
	function getParameterByName(name)
	{
	  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	  var regexString = "[\\?&]" + name + "=([^&#]*)";
	  var regex = new RegExp(regexString);
	  var found = regex.exec(window.location.search);
	  if(found == null)
		return null;
	  else
		return decodeURIComponent(found[1].replace(/\+/g, " "));
	}
	function getUrlParameterReplaced(url, param, value)
	{
		var re = new RegExp("([?|&])" + param + "=.*?(&|$)","i");
		if (url.match(re))
			return url.replace(re,'$1' + param + "=" + value + '$2');
		else
			return url + '&' + param + "=" + value;
	}
	function setSocialShareUrl()
	{
		//var $url = _override_history_url;// for current slide
		var slide_details_0 = slidesData[0];
		var $url = reloadSeoLocation + slide_details_0["msid"];//for 1st slide
		//var $title = slide_details_0['description']['title'];
		var $title = slide_details['slidename'];
		var $title_UE = $('<div/>').text($title).html()
		var $imgUrl = imgDir + slide_details_0['msid'] + '.cms';
		var $desc = rfc3986EncodeURIComponent(slide_details_0['description']['detail']);
		var socialKeysArr = ['facebook','twitter','gplus','linkedin', 'whatsapp', 'addthis_button_email'];
		var socialKeysArrRef = {facebook:'fb', twitter:'tw', gplus:'gp', linkedin:'lnkd', whatsapp:'whatsapp', addthis_button_email:'Email'};
		$.each(socialKeysArr, function(index, value){
			switch(value)
			{
				case 'whatsapp':
					//$(".social-share a."+value).attr({href:'whatsapp://send?text='+$title_UE+'%20'+encodeURI($url), 'data-href':$url, 'data-text':$title_UE});
					$(".social-share a."+value).attr({href:((deviceType != 'mobile')?'https://wa.me/':'whatsapp://send')+'?text='+encodeURI($url), 'data-href':$url, 'data-text':$title_UE});
					break;
				case 'addthis_button_email':
					$(".social-share a."+value).attr({href:'http://www.addthis.com/bookmark.php', 'addthis:url':$url, 'addthis:title':$title_UE, title:socialKeysArrRef[value]});;
					break;
				default:
					var linkObj = getSocialShareUrl(socialKeysArrRef[value], {url:$url, title:$title, imgUrl:$imgUrl, desc:$desc});
					$(".social-share a."+value).attr({href:linkObj['href'], onclick:linkObj['onclick']});
					break;					
			}
		});
		/*
		var fbLinkObj = getSocialShareUrl('facebook', {url:$url, title:$title, imgUrl:$imgUrl, desc:$desc});
		$(".social-share a.fb").attr({href:fbLinkObj['href'], onclick:fbLinkObj['onclick']});
		var twLinkObj = getSocialShareUrl('twitter', {url:$url, title:$title, imgUrl:$imgUrl, desc:$desc});
		$(".social-share a.twitter").attr({href:twLinkObj['href'], onclick:twLinkObj['onclick']});
		var gpLinkObj = getSocialShareUrl('gplus', {url:$url, title:$title, imgUrl:$imgUrl, desc:$desc});
		$(".social-share a.google").attr({href:gpLinkObj['href'], onclick:gpLinkObj['onclick']});
		var lnkdLinkObj = getSocialShareUrl('linkedin', {url:$url, title:$title, imgUrl:$imgUrl, desc:$desc});
		$(".social-share a.linkedin").attr({href:lnkdLinkObj['href'], onclick:lnkdLinkObj['onclick']});
		*/
	}
	function setSocialShareUrlForSlide(sldNdx)
	{
		//var $url = _override_history_url;// for current slide
		var slide_details_0 = slidesData[sldNdx];
		var $url = reloadSeoLocation + slide_details_0["msid"]+((sldNdx == 0)?'?sl=1':'');//for 1st slide
		//var $title = slide_details_0['description']['title'];
		var $title = slide_details['slidename'];
		var $title_UE = $('<div/>').text($title).html()
		var $imgUrl = imgDir + slide_details_0['msid'] + '.cms';
		var $desc = rfc3986EncodeURIComponent(slide_details_0['description']['detail']);
		var socialKeysArr = ['facebook','twitter','gplus','linkedin', 'whatsapp', 'addthis_button_email'];
		var socialKeysArrRef = {facebook:'fb', twitter:'tw', gplus:'gp', linkedin:'lnkd', whatsapp:'whatsapp', addthis_button_email:'Email'};
		$.each(socialKeysArr, function(index, value){
			switch(value)
			{
				case 'XXXwhatsappXXX_':
					$("#ssPopupSharePanel .social-share a."+value+", " + ".slideshow_sharepanel.beside-show_1 .social-share a."+value).attr({href:'whatsapp://send?text='+$title_UE+'%20'+encodeURI($url), 'data-href':$url, 'data-text':$title_UE});
					break;
				case 'addthis_button_email':
					$("#ssPopupSharePanel .social-share a."+value+", " + ".slideshow_sharepanel.beside-show_1 .social-share a."+value).attr({href:'http://www.addthis.com/bookmark.php', 'addthis:url':$url, 'addthis:title':$title_UE, title:socialKeysArrRef[value]});;
					break;
				default:
					var linkObj = getSocialShareUrl(socialKeysArrRef[value], {url:$url, title:$title, imgUrl:$imgUrl, desc:$desc});
					if(value == 'facebook'){
						linkObj['href'] = 'javascript:void(0);';
						linkObj['onclick'] = "javascript:facebook_share('"+encodeURIComponent($url)+"', '"+$imgUrl+"', '"+rfc3986EncodeURIComponent($title)+"', '"+$desc+"'); return false;"
					}
					$("#ssPopupSharePanel .social-share a."+value+", " + ".slideshow_sharepanel.beside-show_1 .social-share a."+value).attr({href:linkObj['href'], onclick:linkObj['onclick']});
					break;					
			}
		});
	}
	function updateSocialShareCount()
	{
		var url = base_url+"/ajax_files/etb2b_social_api_all.php?action=get_url_shareCount";
		$.post(url,{page_url:reloadSeoLocation + slidesData[0]["msid"]},function(data)
			{
				var parsedData = JSON.parse(data);
				for(i in parsedData)
				{
					$($("#ssPopupSharePanel .social-share.circle a."+ i + " .num")[0]).text(parsedData[i]);
				}
				
			}
		);
	}
	/*
	function getSocialShareUrl($socialKey, $info)
	{
		var $url = encodeURIComponent($info['url']);
		var $title = $info['title'];
		var $image_url = $info['imgUrl'];
		var $description = $info['desc'];
		var $href = '';
		var $clickUrl = '';
		var $linkObj = {};
		switch($socialKey)
		{
			case 'twitter':
				$href = 'http://twitter.com/share?text='+$title+'&url='+$url+'&title='+$title;
				$clickUrl = 'http://twitter.com/home/?status='+$title+' '+$url;
				break;
			case 'facebook':
				$href = 'http://www.facebook.com/sharer.php?u='+$url+'&title='+$title;
				$clickUrl = 'http://www.facebook.com/sharer.php?s=100&p[title]='+$title+'&p[summary]='+$description+'&p[url]='+$url+'&p[images][0]='+$image_url;
				break;
			case 'linkedin':
				$href = 'http://www.linkedin.com/shareArticle?mini=true&url='+$url+'&title='+$title+'&source='+ppUrl;
				$clickUrl = 'http://www.linkedin.com/shareArticle?mini=true&url='+$url+'&title='+$title+'&summary='+$description+'&source='+ppUrl;
				break;
			case 'gplus':
				$href = 'https://plus.google.com/share?url='+$url+'&title='+$title;
				$clickUrl = $href;
				break;
		}
		$linkObj['href'] = $href;
		$linkObj['onclick'] = 'window.open(\''+$clickUrl+'\', '+'\'sharer\''+', '+'\'toolbar=0,status=0,width=548,height=325\''+'); return false;';
		return $linkObj;
	}*/
	function setupMediaViewer()
	{
		$("#previousBtn_popup").hover(
			function(e){
				$(".media-viewer-previous").addClass('hover');
				},
			function(e){
				$(".media-viewer-previous").removeClass('hover');
				}
		);
		$("#nextBtn_popup").hover(
			function(e){
				$(".media-viewer-next").addClass('hover');
				},
			function(e){
				$(".media-viewer-next").removeClass('hover');
				}
		);
		$(".media-viewer-previous").click(function(){slideshow_popup.previous();});
		$(".media-viewer-next").click(function(){
			if((curSlideIndex + 1) < slidesData.length)
			{
				slideshow_popup.next();
			}else
			{
				window.location.href = nextSlideshowUrl;
			}
		});
	}
	function callSetSlider(idStr1)
	{
		//console.log('callSetSlider: ');
		//setSlider($(idStr));
		idStr = $(idStr1);
		$(idStr).niceScroll();
		
		if(idStr1 != "#scrollPane-slideDetail_popup")
		return;
		if(typeof slideshowGPTBanner != 'undefined')
		{
			googletag.cmd.push(function() {
				googletag.pubads().addEventListener('slotRenderEnded', function(event) {
				  //console.log(event);
				  //console.log('Slot has been slotRenderEnded:');
				});
				googletag.pubads().refresh([slideshowGPTBanner]);
			});
			setTimeout(function(){
				var $adHeight = 0;
				$(".scrollPane-adChange .ad:visible").each(function(){
					$adHeight = $adHeight + $(this).outerHeight(true);
				});
				$(".scrollPane-adChange").css('height',$adHeight+'px');
				$("#scrollPane-slideDetail_popup").css({height:($("#lightCntr .slideshowbox_popupHolder").height() - $("#mediaViewerNav").outerHeight() - $("#slideTitle_popup").outerHeight()- $adHeight)});
				$(idStr).niceScroll();
				$(".scrollPane-adChange").show();
			}, 2000);
		}
	}
	function updateAnalyticsSlideshow(index)
	{
		//console.log("updateAnalyticsSlideshow", slidesData[index]);
		var msid_analy = slidesData[index]["msid"];
		if(!multipleanalyticshit)
		{
			if(analyticsUpdatePool["_"+msid_analy])return;
			analyticsUpdatePool["_"+msid_analy]=true;
		}
		
		var $url = reloadSeoLocation + slidesData[index]["msid"];
		setTimeout(function(){
			updatePageAnalytics($url);
		},1000);
	}
	//=========================================================== slideshow listing page  scroll start ====================================================================	
	var slideOnTop = curSlideIndex;
	var mHdrHght = $("#m_header").height()||0;
	$(window).load(function(){
		if($display_single_fullwidth)
		{
			$(window).scroll(function () {
				checkSlideAtTop();
			});
		}
	});
	function checkSlideAtTop()
	{
		var slideOnTopTemp;
		$.each($("#picStory").children(), function(key,val){			
			if(($(window).scrollTop() - $(val).offset().top - $(val).outerHeight() + mHdrHght) < 0)
			{
				slideOnTopTemp = key;
				return false;
			}
		});
		if(!slideOnTopTemp)return;
		if(slideOnTop!=slideOnTopTemp)
		{
			slideOnTop = slideOnTopTemp;
			
			var curSlideDetail = slidesDetail['_'+slidesData[slideOnTop]["msid"]];
			var seoLocation = curSlideDetail["seolocation"];
			var seoLocationArr = seoLocation.split("/");
			seoLocation = seoLocationArr[0];
			_override_history_url = _page_URL + "/" + seoLocation + "/" + curSlideDetail["msid"];
			var pageTitle = slide_details['slidename'] +(($.trim(curSlideDetail['ssname']))?(' - '+$.trim(curSlideDetail['ssname'])):'')+' | '+ SITE_TITLE;
			overRideHistoryState(_override_history_url, pageTitle);
			
			updateAnalyticsSlideshow(slideOnTop);
		}
	}
	//=========================================================== slideshow listing page  scroll end ====================================================================
}
function SlideshowListingPage_PageCtrl(obj)
{
	var nextPage = obj['pageData']['nextPage'];
	var parentPagePath = obj['pageData']['slide_parent_path'];
	$( document ).ready(function() {		
		$("#content .main-content_full_width").css('margin','0 -'+ $("#content .wrapper").css('padding-left'));
		if(obj['slideshowData'])
		{
			var sslst_ssCtrl = new SlideshowListingPage_SlideshowCtrl(obj['slideshowData']);
		}
		//var scrollPageLoader = new ScrollPageLoader({serviceUrl:base_url+'/general_ajax_task.php?action=get_cms_slideshow_pagination', loaderElement:$("#loader_div"), postParams:{"page":nextPage,"slide_path":obj['pageData']['slide_path'],"slide_parent_path":obj['pageData']['slide_parent_path']}, onSuccess:populateSlideshowListLazyLoad});
        
        // Pip Check
        var pipCategoryUrl = $.trim($('#pipCategoryUrl').val());
        var scrollPageLoader = new ScrollPageLoader({serviceUrl:base_url+'/ajax_files/etb2b_get_more_on_scroll.php?action=get_cms_slideshow_pagination', paginationMethod:'get', loaderElement:$("#loader_div"), postParams:{"page":nextPage,"slide_path":obj['pageData']['slide_path'],"slide_parent_path":obj['pageData']['slide_parent_path'], "pipCategoryUrl":pipCategoryUrl}, onSuccess:populateSlideshowListLazyLoad});		
	});
	function populateSlideshowListLazyLoad(listObjResponse)
	{
		//console.log(listObjResponse);
		$.each(listObjResponse,function(index,item){
			
            // Pip Check
            if ($.trim($('#pipCategoryUrl').val()).length > 0) {
                item.thumbid = item.slideshowMsid;
            }
            
            image_src = THEME_PATH+'/images/responsive/video-'+ET_PORTAL+'-default.jpg';
			if(item && item.thumbid){
				image_src = CMS_IMG_URL+'/thumb/'+item.thumbid+'.cms?width=225&height=143';
				if(item.secnameseo && item.imgsize && item.mediadate){
				var date = new Date(item.mediadate);
				image_src = CMS_IMG_URL+'/thumb/'+item.secnameseo+'-size-'+item.imgsize+'/'+item.thumbid+ '.cms?width=225&height=143';
			}
			}
			var slideshow_url = base_url+"/"+parentPagePath+"/"+item.secmsnameseo+'/'+item.thumbid; //+'/'+item.msnameseo
			//image_src_deflt = '<?=PP::$images_url?>responsive/news-<?=PP::$ET_PORTAL?>-default.jpg';
			li_str = '<li><a href="'+slideshow_url+'"><div class="image"><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+image_src+'" alt="" /><!--<span class="slide-icon">&nbsp;</span>--></div><span class="caption">'+item.secname+'</span></a></li>';
			$("#main_slideshowlist_bx").append(li_str);
			$("img.unveil").unveil();
		});
		var $url=base_url + '/'+parentPagePath+'/' + nextPage;
		nextPage=nextPage+1;
		updatePageAnalytics($url);
		
	}
}
