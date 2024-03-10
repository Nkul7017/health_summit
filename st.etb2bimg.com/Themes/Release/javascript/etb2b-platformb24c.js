/* ***** CTN HEAD  Added By Ajit Rajput **** */
	if(!isGDPRNation() || b2bGdpr.userPreference['config.clmb'] == 1)
	{
	var hasAdCodesClass = $('#etb2b-tpl-outer-ad-codes').hasClass('outerAdCodes');
	if (hasAdCodesClass === true) {
		if(typeof colombia == 'undefined'){
			var colombia = colombia || {};
			colombia.fns = colombia.fns || [];
			(function() {
				  var cads = document.createElement("script");
				  cads.async = true;
				  cads.type = "text/javascript";
				  cads.src = "https://static.clmbtech.com/ad/commons/js/colombia_v2.js";
				  var node = document.getElementsByTagName("script")[0];
				  node.parentNode.insertBefore(cads, node);
			})();
		}
	}
	}
	/* ******* Facebook  ********* */
	var fBRootClass = $('#fb-root').hasClass('FBRoot');
	if (fBRootClass === true) {
		(function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id;
		  js.async = true;
		  js.src = "//connect.facebook.net/en_GB/all.js#xfbml=1&appId="+FACEBOOK_APPID;
		  fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	}
	/* ***** Google Ads push tag **** */
	//var isAdsAvailable = $('span').hasClass('etb2b-module-ETB2BAdsRHSDetails'); //ETB2BAdsRHSDetails Ads
	$("div[id^='div-gpt-ad']").each(function(){
	   	var pushTagIdentifier = $(this).attr('id');
	   	googletag.cmd.push(function() { googletag.display(pushTagIdentifier); });
	});
	
	/**
	 * Blog Detail Script
	 */
	/*
	var hasBlogClass = $('#etb2b-blog-module').hasClass('etb2b-module-ETB2BBlogsDetailModule');
	if (hasBlogClass === true) {
		floatimgmargin();
		
		var blogId 		  = $('#etb2b-blog-module').attr('data-blog-id');
		var blogDate 	  = $('#etb2b-blog-module').attr('data-blog-date');
		var blogUserAgent = $('#etb2b-blog-module').attr('data-user-agent');
		
		track_user_activity_history('blog',blogId, blogDate, blogUserAgent);
		
		//$('.socialShareBar').updateSocialShareBar();
		var deviceType 		= $('#etb2b-blog-module').attr('data-device-type');
		var displayWidth 	= $('#etb2b-blog-module').attr('data-display-width');
		var newsTypeKey 	= $('#etb2b-blog-module').attr('data-news-key');
		var newsId 			= $('#etb2b-blog-module').attr('data-news-id');	
		var relSectionId	= $('#etb2b-blog-module').attr('data-rel-secid');
		var blogCategory    = $('#etb2b-blog-module').attr('data-category');
		var blogData 		= $('#etb2b-blog-module').attr('data-news');
			blogData		= $.parseJSON(blogData);
		var blogImage 		= $('#etb2b-blog-module').attr('data-blog-img');
		var blogProfile 	= $('#etb2b-blog-module').attr('data-profile-img');	
		var byNewsletter 	= $('#etb2b-blog-module').attr('data-from-newsletter');
		var newsLetterDate 	= $('#etb2b-blog-module').attr('data-newsletter-date');		
		
		var bdp_usc = new DetailPage_UnlimitedScrollCtrl({
	        deviceType		: deviceType, 
	        dispFullwidth	: displayWidth,
	        newsTypeKey		: newsTypeKey,
	        news_id			: newsId, 
	        rel_sec_id 		: relSectionId, 
	        cat_name		: blogCategory, 
	        news			: blogData,
	        img_object		: [blogImage, blogProfile],        
	        fromNewsletter	: byNewsletter,
	        newsletterDate  : newsLetterDate,
			ajaxParams 		: {action:'get_more_blogs'},
			pageTrackingKey : 'Blog'
	    });
	}
	*/
	
	/* ******* ETB2BNewsDetailPageHead module specific (pop up script) ********* */
	/*
	var hideNDPHFollowPopup = getLocalStorage('hidendphfollowpopup');
	if(isUserAgentMobile())if((!hideNDPHFollowPopup) || (hideNDPHFollowPopup != 1))$('#etb2b-module-ETB2BNewsDetailPageHead-follow.follow_popup').show();
	var hasPopupClass = $('#etb2b-module-ETB2BNewsDetailPageHead-follow').hasClass('follow_popup');
	if (hasPopupClass === true) {
		$(".follow_popup .close").click(function(){
	    	$(".follow_popup").hide();
			setLocalStorage('hidendphfollowpopup', 1, 1);
		});
	}
 	*/
	
	/* ***** ETB2BNewsDetailPage module specific script ***** */
	/*
	var newsClassName = $('#etb2b-news-detail-page').hasClass('etb2b-module-ETB2BNewsDetailPage');
	if (newsClassName === true) {
		var newsId 	  = $('#etb2b-news-detail-page').attr('data-news-id');
		var newsTitle = $('#etb2b-news-detail-page').attr('data-news-title');
		var disqusUrl = $('#etb2b-news-detail-page').attr('data-disqus-url');
		var disqusFBUrl = $('#etb2b-news-detail-page').attr('data-disqus-fb-url');
		
		var isBreadcrumbAvailable = $('#etb2b-news-detail-page').attr('data-breadcrum-available');
		var ajaxRender 	= $('#etb2b-news-detail-page-page').attr('data-render-ajax');
		
		if (ajaxRender != 'Y' && isBreadcrumbAvailable == 'Yes' && newsId) {
			var breadcrumbCategory 	  = $('#etb2b-news-detail-page').attr('data-breadcrum-category');
			var breadcrumbSubCategory = $('#etb2b-news-detail-page').attr('data-breadcrum-sub-category');
			var articleDate 	= $('#etb2b-news-detail-page').attr('data-article-date');
			var userAgentInfo 	= $('#etb2b-news-detail-page').attr('data-user-agent');
			// Update news view
			update_news_views(newsId, breadcrumbCategory,breadcrumbSubCategory,articleDate,userAgentInfo);
		};
		
		var isPortalUserAvailable	 = $('#etb2b-news-detail-page').attr('data-portal-user-available');
		if (ajaxRender != 'Y' && isPortalUserAvailable == 'Yes') {
			var shareMessage 	 = $('#etb2b-news-detail-page').attr('data-share-message');		
			var shareDescription = $('#etb2b-news-detail-page').attr('data-share-description');
			var sharePicture 	 = $('#etb2b-news-detail-page').attr('data-share-pic');
			var _postFBData = { 
				"type" 		: "read_news",
				"item_id" 	: newsId,
				"extra"		: "",
				"action"	: "Read more",
				"msg"		: shareMessage,
				"title"		: newsTitle,
				"uri"		: disqusFBUrl,
				"desc" 		: shareDescription,
				"pic" 		: sharePicture
			};
			
			//if((ET_PORTAL != 'tech') || (ET_PORTAL != 'brandequity')){ 
			//	get_current_fb_oauth_status(_fb_oauth_listener, _postFBData);
			//}
			
		}
		
		if(ajaxRender != 'Y') {
			// The below line is crucial for rewriting browser history
			//_override_history_url = disqusUrl;
			var slidesPhotoId 	 = $('#etb2b-news-detail-page').attr('data-slide-photo-id');	
			var slideDetail 	 = $('#etb2b-news-detail-page').attr('data-slide-detail');
				slideDetail 	 = $.parseJSON(slideDetail);	
			var slideShowDetail  = $('#etb2b-news-detail-page').attr('data-slideshow-detail');
				slideShowDetail  = $.parseJSON(slideShowDetail);
			var slideImageDir 	 = $('#etb2b-news-detail-page').attr('data-slide-image-dir');	
			var slidePaginateImg = $('#etb2b-news-detail-page').attr('data-slide-paginate-news');
				slidePaginateImg = $.parseJSON(slidePaginateImg);
				
			var hasSlideShow 	 = $('#etb2b-news-detail-page').attr('data-has-slideshow');
			if (hasSlideShow == 'Y') {
				var ndp_ssc = new NewsDetailPage_SlideshowCtrl({
					ppUrl		   : base_url, 
					_page_URL 	   : disqusUrl, 
					photo_id	   : slidesPhotoId,
					slide_details  : slideDetail, 
					slidesDetail   : slideShowDetail, 
					imgDir		   : slideImageDir,
					next_prev_news : slidePaginateImg
				});
			}
			var deviceType   	= $('#etb2b-news-detail-page').attr('data-device-type');
			var displayWidth 	= $('#etb2b-news-detail-page').attr('data-display-full-width');
			var relSectionId 	= $('#etb2b-news-detail-page').attr('data-rel-section-id');
			var categoryName 	= $('#etb2b-news-detail-page').attr('data-category-name');
			var newsData 	 	= $('#etb2b-news-detail-page').attr('data-news');
				newsData 		= $.parseJSON(newsData);
			var newsImages 	 	= $('#etb2b-news-detail-page').attr('data-news-images');
				newsImages 		= $.parseJSON(newsImages);
			var newsletterBy 	= $('#etb2b-news-detail-page').attr('data-newsletter-by');
			var newsletterDate 	= $('#etb2b-news-detail-page').attr('data-newsletter-date');
			
			var ndp_usc = new DetailPage_UnlimitedScrollCtrl({
				deviceType 	  : deviceType, 
				dispFullwidth : displayWidth,
        		newsTypeKey   : "news",
				news_id 	  : newsId, 
				rel_sec_id 	  : relSectionId, 
				cat_name 	  : categoryName, 
				news 		  : newsData,
				img_object 	  : newsImages,
				fromNewsletter: newsletterBy,
				newsletterDate: newsletterDate,
				ajaxParams    : {action:'get_more_news'}
			});
		} else {
			
			//(function() {
			//	ga_content_url = disqusUrl; 
			//	ga_content_ttl = newsTitle+" | "+SITE_TITLE;
				//ga_content_url = ga_content_url.replace(base_url,'');
			//	ga('send', 'pageview', {
		  	//		'page': ga_content_url,
		 	//		'title': ga_content_ttl
			//	});
				//ga('send', 'event', 'nextStory', 'scroll', {'page': ga_content_url});
			//})();
			
		}
	}
	*/
	
	/* *** Start CTN ADCODE *** */
	/* ETB2BTopNews Front Page*/
	var hasEtb2bTopNewsClass = $('#etb2b-module-ETB2BTopNews').hasClass('ETB2BTopNews');
	if(hasEtb2bTopNewsClass === true) {		
		var adslot_id = '';
		var adslot_id_mob = '';
		$("div[id^='div-clmb-ctn-']").each(function(){
		    var identifier  = $(this).attr('data-slot');
		    var requestType = $(this).attr('data-type');    
	    	
		    if (requestType == 'mobile') {
		    	adslot_id_mob = identifier;
		    } else if (requestType == 'desktop') {
		    	adslot_id = identifier;
		    }
		});
		
		if(isUserAgentMobile() && adslot_id_mob){
			$('#div-clmb-ctn-'+adslot_id_mob+'-1').removeClass('hide');
			//tmp_ad_code='<div id="div-clmb-ctn-'+adslot_id_mob+'-1" style="float:left;min-height:2px;width:100%;" data-slot="'+adslot_id_mob+'" data-position="1" data-section="0" data-cb="adwidget" class="colombia" style="display:none;"></div>';
		} else if(adslot_id){
			$('#div-clmb-ctn-'+adslot_id+'-1').removeClass('hide');
			//tmp_ad_code='<div id="div-clmb-ctn-'+adslot_id+'-1" data-slot="'+adslot_id+'" data-position="1" data-section="0" data-cb="adwidget" class="colombia" style="display:none;"></div>';
		}
		//$(tmp_ad_code).insertAfter('div.top-stories div.clm2 ul');
	}
	
	/**/
	// For single ads
	var hasETB2BNewsDetailPageCTNClass = $('#etb2b-module-ETB2BMostReadCategory').hasClass('ETB2BMostReadCategory');
	if (hasETB2BNewsDetailPageCTNClass) {
		var adslot_id = '';
		var adslot_id_mob = '';
		$("li[id^='div-clmb-ctn-']").each(function(){
		    var identifier  = $(this).attr('data-slot');
		    var requestType = $(this).attr('data-type');    
	    	
		    if (requestType == 'mobile') {
		    	adslot_id_mob = identifier;
		    } else if (requestType == 'desktop') {
		    	adslot_id = identifier;
		    }
		});
		if(adslot_id !='' || adslot_id_mob !=''){
		    if(isUserAgentMobile()){
		        if(adslot_id_mob){
		            $('#div-clmb-ctn-'+adslot_id_mob+'-1').removeClass('hide');
		            //tmp_ad_code='<li id="div-clmb-ctn-'+adslot_id_mob+'-1" style="min-height:2px;width:100%;" data-slot="'+adslot_id_mob+'" data-type="mobile" data-position="1" data-section="0" data-cb="adwidget" class="colombia"></li>';
		        }
		    } else if(adslot_id){
		        $('#div-clmb-ctn-'+adslot_id+'-1').removeClass('hide');
		        //tmp_ad_code='<li id="div-clmb-ctn-'+adslot_id+'-1" data-slot="'+adslot_id+'" data-type="desktop" data-position="1" data-section="0" data-cb="adwidget" class="colombia clearfix" style="min-height:2px;width:100%;"></li>';
		    }
		}
	    //$(tmp_ad_code).insertAfter('#ctn_ad1');
	}
	
	var hasETB2BNewsDetailPageCTNClass = $('#etb2b-module-ETB2BNewsDetailPageCTN').hasClass('ETB2BNewsDetailPageCTN');
	if (hasETB2BNewsDetailPageCTNClass) {
		// For multiple ads
		var adslot_id = '';
		var adslot_id_mob = '';
		$("ul[id^='div-clmb-ctn-']").each(function(){
		    var identifier  = $(this).attr('data-slot');
		    var requestType = $(this).attr('data-type');    
	    	
		    if (requestType == 'mobile') {
		    	adslot_id_mob = identifier;
		    } else if (requestType == 'desktop') {
		    	adslot_id = identifier;
		    }
		});
		if(adslot_id !='' || adslot_id_mob !=''){
		    if(isUserAgentMobile()){
		        if(adslot_id_mob){
		            $('#div-clmb-ctn-'+adslot_id_mob+'-1').removeClass('hide');
		            //tmp_ad_code='<li id="div-clmb-ctn-'+adslot_id_mob+'-1" style="min-height:2px;width:100%;" data-slot="'+adslot_id_mob+'" data-type="mobile" data-position="1" data-section="0" data-cb="adwidget" class="colombia"></li>';
		        }
		    } else if(adslot_id){
		        $('#div-clmb-ctn-'+adslot_id+'-1').removeClass('hide');
		        //tmp_ad_code='<li id="div-clmb-ctn-'+adslot_id+'-1" data-slot="'+adslot_id+'" data-type="desktop" data-position="1" data-section="0" data-cb="adwidget" class="colombia clearfix" style="min-height:2px;width:100%;"></li>';
		    }
		}
	    //$(tmp_ad_code).insertAfter('#ctn_ad1');
	}

/* ***** ETB2BNewsDisqusModule module specific script ***** */
/*
var disqusClassName = $('#disqus_thread').hasClass('etb2b-module-ETB2BNewsDisqusModule');

if (disqusClassName === true) {
	// CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE 
    var disqus_shortname  = $('#disqus_thread').attr('data-shortname');
    var disqus_identifier = $('#disqus_thread').attr('data-identifier');    
    var disqus_url 		  = $('#disqus_thread').attr('data-url');
    var etb2b_env 		  = $('#disqus_thread').attr('data-environment');
    var requestType		  = $('#disqus_thread').attr('data-file');
    
    //  DON'T EDIT BELOW THIS LINE 
	(function() {
		var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
		dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
		(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
	})();
	
	if (requestType == 'news') {
		//  Disqus Reset Function 
    	var disqus_reset = function (newIdentifier, newUrl, newTitle, newLanguage) {
			if (typeof DISQUS != "undefined") { 
				var obj_id = $('#'+newIdentifier);
				var scrollDiff = 0;
				//if($('#disqus_thread').parent().offset().top < $(obj_id).parent().offset().top)
				if($('#disqus_thread').offset().top < $(obj_id).parent().offset().top)
				{		
					var mainContentRhsHeightDiff = $('#disqus_thread').parent().outerHeight() - $('#disqus_thread').parent().next('aside').eq(0).outerHeight();
					if(mainContentRhsHeightDiff>0)
					{
						scrollDiff = $(window).scrollTop() - Math.min(($('#disqus_thread').outerHeight() - $(obj_id).outerHeight()), mainContentRhsHeightDiff);
						//scrollDiff = $(window).scrollTop() - Math.min(($('#disqus_thread').outerHeight() - (($('#disqus_thread').is('visible'))?$(obj_id).outerHeight():0)), mainContentRhsHeightDiff);
					}
				}
				$('#disqus_thread').insertAfter($(obj_id).parent()); 
				$('.disqus_thread').show();
				if(!newLanguage) newLanguage = 'en';
			
				DISQUS.reset({
					reload: true,
					config: function () {
						this.page.identifier = newIdentifier;
						this.page.url = newUrl;
						this.page.title = newTitle;
						this.language = newLanguage;
					}
				});
				$(obj_id).hide();
				if($('#disqus_thread').is(":visible"))if(scrollDiff>0)$(window).scrollTop(scrollDiff);
				$('#disqus_thread').show();
				//$("html, body").animate({scrollTop: $(obj_id).offset().top}, 1000);
			} else {
				(function() {
					var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
					dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
					(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
				})();
			}
			//$('#disqus_thread').show();
    	};

    	// Environment specific block
    	if(etb2b_env == 1 && ET_PORTAL!='tech'){
			$('#disqus_thread').css({'display':'block'}); //show disqus thread
			$('#'+disqus_identifier).css({'display':'none'}); //hide comnt btn
		}
    }
}
*/


function fb_comment_reset(newIdentifier, newUrl, newTitle, newLanguage)
{
	$("#"+newIdentifier+"_container").html('<div class="fb-comments" data-href="'+newUrl+'" data-numposts="5" data-width="100%" data-mobile="Auto-detected" data-order-by="social" data-colorscheme="light"></div>');
	FB.XFBML.parse();
}

/* ETB2BTopNews*/
function adwidgetTopNews(data,container){
	var imgStyle='style="max-height:57px"';
	$extraimgstyl = '';
	$extradivstyl = 'border-top: 1px dotted #bbb; margin-top:10px; padding-top:13px;';
	if(ET_PORTAL == 'auto'){
		$extraimgstyl = 'float:right;width:130px;padding-left:20px;';
		imgStyle='style="max-height:97px"';
	}
	if(ET_PORTAL == 'cio'){
		$extraimgstyl = 'float:right;width:120px;padding-left:20px;';
		imgStyle='style="max-height:76px"';
	}
	if(ET_PORTAL == 'cio')$extradivstyl = '';
	if (data != null) {
		var conObj = document.getElementById(container);
		var conText= "";
		var callToAction = "";
		if(data.hasOwnProperty('paidAds')){
			for(var i=0; i<data.paidAds.length; i++) {
				if(data.paidAds[i].itemType==2 && data.paidAds[i].ctatext!="") {
					callToAction = "<input class='callactbutton' type='button' value='"+data.paidAds[i].ctatext+"'onclick=window.open('"+data.paidAds[i].clk[0]+"')>";
				}
				conText+='<div style="'+$extradivstyl+'" class="last colombiaAds story-box clearfix" onmouseover = "javascript:document.getElementById(\'colombialogo'+i+'\').src=\'https://static.clmbtech.com/ad/commons/images/colombia_red_small.png \'" onmouseout = "javascript:document.getElementById(\'colombialogo'+i+'\').src=\''+data.paidAds[i].colombiaLogo+'\'"><div class="image" style="'+$extraimgstyl+'"><a rel="nofollow" target="_blank" href="' + data.paidAds[i].clk[0] + '"><img '+imgStyle+' class="lazy" src="' + data.paidAds[i].mainimage + '" /></a></div><div class="desc"><h4><a rel="nofollow" target="_blank" href="' + data.paidAds[i].clk[0] + '"><span style="color:#888">Ad.</span> ' + data.paidAds[i].title + '</a></h4><p style="margin:5px 0 0;color:#888;font-size:10px;" class="spnsrd">Sponsored by ' + data.paidAds[i].brandtext + '<img class="flr" id="colombialogo'+i+'" src="' + data.paidAds[i].colombiaLogo + '" width="14" height="14"></p></div></div>';
				conText+=callToAction;
				break;
			}
		} else if(data.hasOwnProperty('organicAds')){
			//conText += "<br><br><div>Organic Ads</div>";
			for(var j=0; j<data.organicAds.length; j++) {
				conText+='<div style="'+$extradivstyl+'" class="last colombiaAds story-box clearfix" onmouseover = "javascript:document.getElementById(\'colombialogo'+j+'\').src=\'https://static.clmbtech.com/ad/commons/images/colombia_red_small.png \'" onmouseout = "javascript:document.getElementById(\'colombialogo'+j+'\').src=\''+data.organicAds[j].colombiaLogo+'\'"><div class="image" style="'+$extraimgstyl+'"><a rel="nofollow" target="_blank" href="' + data.organicAds[j].clk[0] + '"><img class="lazy" src="' + data.organicAds[j].mainimage + '" /></a></div><div class="desc"><h4><a rel="nofollow" target="_blank" href="' + data.organicAds[j].clk[0] + '"><span style="color:#888">Ad.</span> ' + data.organicAds[j].title + '</a></h4><p style="margin:5px 0 0;color:#888;font-size:10px;" class="spnsrd">Sponsored by ' + data.organicAds[j].brandtext + '<img class="flr" id="colombialogo'+j+'" src="' + data.organicAds[j].colombiaLogo + '" width="14" height="14"></p></div></div>';
				break;
			}
		}
		if(conText){
			conObj.innerHTML = conText;
			conObj.style.display = '';
		}
	}
}

/* hasETB2BNewsDetailPageCTNClass */
function adwidget(data,container){
    if (data != null) {
        var conObj = document.getElementById(container);
        var conText= "";
        var callToAction = "";
        if(data.hasOwnProperty('paidAds')){
            for(var i=0; i<data.paidAds.length; i++) {
                if(data.paidAds[i].itemType==2 && data.paidAds[i].ctatext!="") {
                    callToAction = "<input class='callactbutton' type='button' value='"+data.paidAds[i].ctatext+"'onclick=window.open('"+data.paidAds[i].clk[0]+"')>";
                }
                conText+='<div class="colombiaAds clearfix" onmouseover = "javascript:document.getElementById(\'colombialogo'+i+'\').src=\'https://static.clmbtech.com/ad/commons/images/colombia_red_small.png \'" onmouseout = "javascript:document.getElementById(\'colombialogo'+i+'\').src=\''+data.paidAds[i].colombiaLogo+'\'"><a rel="nofollow" target="_blank" href="' + data.paidAds[i].clk[0] + '" ><img class="lazy" style="max-height:64px" src="' + data.paidAds[i].mainimage + '" /></a><h4><a rel="nofollow" target="_blank" href="' + data.paidAds[i].clk[0] + '"><span style="color:#888">Ad. </span>' + data.paidAds[i].title + '</a></h4><p style="margin:5px 0 0;color:#888;font-size:10px;" class="spnsrd">Sponsored by ' + data.paidAds[i].brandtext + '<img class="flr" style="width:auto;float:none;margin:0;" id="colombialogo'+i+'" src="' + data.paidAds[i].colombiaLogo + '" width="14" height="14"></p></div>';
                conText+=callToAction;
                break;
            }
        } else if(data.hasOwnProperty('organicAds')){
            //conText += "<br><br><div>Organic Ads</div>";
            for(var j=0; j<data.organicAds.length; j++) {
                conText+='<div class="colombiaAds clearfix" onmouseover = "javascript:document.getElementById(\'colombialogo'+i+'\').src=\'https://static.clmbtech.com/ad/commons/images/colombia_red_small.png \'" onmouseout = "javascript:document.getElementById(\'colombialogo'+i+'\').src=\''+data.organicAds[i].colombiaLogo+'\'"><a rel="nofollow" target="_blank" href="' + data.organicAds[i].clk[0] + '" ><img class="lazy" src="' + data.organicAds[i].mainimage + '" /></a><h4><a rel="nofollow" target="_blank" href="' + data.organicAds[i].clk[0] + '"><span style="color:#888">Ad. </span>' + data.organicAds[i].title + '</a></h4><p style="margin:5px 0 0;color:#888;font-size:10px;" class="spnsrd">Sponsored by ' + data.organicAds[i].brandtext + '<img class="flr" style="width:auto;float:none;margin:0;" id="colombialogo'+i+'" src="' + data.organicAds[i].colombiaLogo + '" width="14" height="14"></p></div>';
                break;
            }
        }
        if(conText){
            conObj.innerHTML = conText;
            conObj.style.display = '';
        }
    }
}

/* hasETB2BNewsDetailPageCTNClass */
function adwidget_rcmw(data,container){ /*console.log('second cb: '+container); console.log(data);*/
	if (data != null) {
		var max_rel_cnt = 4;
		var conObj = document.getElementById(container);
		var conText= "";
		var callToAction = "";
	
		if(data.hasOwnProperty('paidAds')){
			if(data.paidAds.length < 4) { console.log('at least 4 items rquired!'); return false; }
			for(var i=0; i<data.paidAds.length; i++) {
				if(i>=max_rel_cnt){
					break;
				}
	
				callToAction = "";
				if(data.paidAds[i].itemType==2 && data.paidAds[i].ctatext!="") {
					callToAction = "<input class='callactbutton' type='button' value='"+data.paidAds[i].ctatext+"'onclick=window.open('"+data.paidAds[i].clk[0]+"')>";
				}
	
				conText+='<li class="colombiaAds clearfix"><a rel="nofollow" target="_blank" href="' + data.paidAds[i].clk[0] + '"><img class="lazy" style="max-height:100px" src="' + data.paidAds[i].mainimage + '" /><span>' + data.paidAds[i].title + '</span><p style="margin:5px 0 0;color:#888;font-size:10px;" class="spnsrd">' + data.paidAds[i].brandtext + '</p></a></li>'; //onmouseover="javascript:document.getElementById(\'colombialogo'+i+'\').src=\'https://static.clmbtech.com/ad/commons/images/colombia_red_small.png\'"  onmouseout="javascript:document.getElementById(\'colombialogo'+i+'\').src=\''+data.paidAds[i].colombiaLogo+'\'"
	
				conText+=callToAction;
			}
		} else if(data.hasOwnProperty('organicAds')){ console.log('inside organicAds');
			if(data.organicAds.length < 4) { console.log('at least 4 items rquired!'); return false; }
			for(var j=0; j<data.organicAds.length; j++) {
				if(j>=max_rel_cnt){
					break;
				}
				conText+='<li class="colombiaAds clearfix"><a rel="nofollow" target="_blank" href="' + data.organicAds[j].clk[0] + '" ><img class="lazy" src="' + data.organicAds[j].mainimage + '" alt="sponsored" /><span>' + data.organicAds[j].title + '</span><p style="margin:5px 0 0;color:#888;font-size:10px;" class="spnsrd">' + data.organicAds[j].brandtext + '</p></a></li>'; //onmouseover = "javascript:document.getElementById(\'colombialogo'+j+'\').src=\'https://static.clmbtech.com/ad/commons/images/colombia_red_small.png \'" onmouseout = "javascript:document.getElementById(\'colombialogo'+j+'\').src=\''+data.organicAds[j].colombiaLogo+'\'" 
			}
		}
		if(conText){
			conObj.innerHTML = conText;
			conObj.style.display = '';
			$('.related-article h4,.related-article h2,.clmb_sp_stmp').css({'display':'block'}); //show block			
		}
	}
}
