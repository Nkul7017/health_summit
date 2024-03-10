var ETB2BCompanyUIRenderer = (function() {
	var rendObj = {
        sampleVar:1,
		theme_name:'',
		theme_version:'',
		theme_name_version:'',
		baseTheme:'custom',
		layoutTheme:'bootstrap',
		designMaterialTheme:'edena1',
		detailTarget:'',
		socialInfo:{},
		customIconCodes:{rss:'fa fa-rss', facebook:'fa fa-facebook', twitter:'fa fa-twitter', gplus:'fa fa-google-plus', linkedin:'fa fa-linkedin', youtube:'fa fa-youtube', pinterest:'fa fa-pinterest-p', share:'fa fa-share-alt', blog:'fa fa-rss-square', lens:'fa fa-search', eye:'fa fa-eye', slideshare:'fa fa-slideshare', instagram:'fa fa-instagram', pdf:'fa fa-file-pdf-o', video:'fa fa-play-circle-o', download:'fa fa-download', whatsapp:'fa fa-whatsapp'},
		setTheme:function(obj){
			ETB2BCompanyUIRenderer.theme_name = obj['theme_name'];
			ETB2BCompanyUIRenderer.theme_version = obj['theme_version'];
			ETB2BCompanyUIRenderer.theme_name_version += obj['theme_name']+'_'+obj['theme_version'];
			
			if(obj['baseTheme'])ETB2BCompanyUIRenderer.baseTheme = obj['baseTheme'];
			if(obj['layoutTheme'])ETB2BCompanyUIRenderer.layoutTheme = obj['layoutTheme'];
			if(obj['designMaterialTheme'])ETB2BCompanyUIRenderer.designMaterialTheme = obj['designMaterialTheme'];
			if(obj['detailTarget'])ETB2BCompanyUIRenderer.detailTarget = obj['detailTarget'];
			/*
			if(ETB2BCompanyUIRenderer.theme_name != 'edena')
			{
				$.ajax({
						type: "GET",
						url: THEME_PATH+'/javascript/etb2b_company_ui_' + ETB2BCompanyUIRenderer.layoutTheme+'_'+ETB2BCompanyUIRenderer.designMaterialTheme+'.js',
						dataType: "script",
						async:false
					}).done(function(e){
						$.each(getAllFuncArr(), function(key, val){
							rendObj[val['name']] = val;
						});
				});
			}
			*/
		},
		sampleFunction: function () {
           return ETB2BCompanyUIRenderer.sampleVar;
        },
		setSocialInfo:function(obj){
			console.log('setSocialInfo:');
			console.log(obj);
			for(var i in obj)
			{
				rendObj['socialInfo'][i] = obj[i];
			}
		},
		getSectionListItem:function(obj){
			//console.log(obj);
			if(!obj['itemType'])obj['itemType']=1;
			$elem = '';			
			switch(obj['itemType'])
			{
				case 5:
					$detailType = (obj['linkContentType'] == 'html')?((ETB2BCompanyUIRenderer.theme_name_version == 'edena_1')?'popup-form':''):((obj['linkContentType'] == 'video')?'image-iframe':'');
					$elem = '<article data-nekoanim="fadeInUp" data-nekodelay="200" class="section-fw"><div class="container-fw"><div class="row"><div class="col-md-6 col-md-6-push image-background image-fw-right cover no-padding news-'+obj['newsCount']+'" style="background-image:url('+obj['imgPath_0']+')"> </div><div class="col-md-6 col-md-6-pull padding-medium"><h3><span>'+obj['text_0']+'</span>'+obj['text_1']+'</h3><p>'+obj['text_2']+'</p><a href="'+obj['link_0']+'" class="btn default small border '+$detailType+'">'+obj['text_3']+'</a></div></div></div></article>';
					break;
				case 6:
					$detailType = (obj['linkContentType'] == 'html')?((ETB2BCompanyUIRenderer.theme_name_version == 'edena_1')?'popup-form':''):((obj['linkContentType'] == 'video')?'image-iframe':'');
					$elem = '<article data-nekoanim="fadeInUp" data-nekodelay="200" class="light-color section-fw"><div class="container-fw"><div class="row"><div class="col-md-6 image-background cover no-padding news-'+obj['newsCount']+'" style="background-image:url('+obj['imgPath_0']+')"> </div><div class="col-md-6 col-md-offset-6 padding-medium"><h3><span>'+obj['text_0']+'</span>'+obj['text_1']+'</h3><p>'+obj['text_2']+'</p><a href="'+obj['link_0']+'" class="btn default small border '+$detailType+'">'+obj['text_3']+'</a></div></div></div></article>';
					break;
				case 17:
					$detailType = (obj['linkContentType'] == 'html')?((ETB2BCompanyUIRenderer.theme_name_version == 'edena_1')?'popup-form':''):((obj['linkContentType'] == 'video')?'image-iframe':'');				
					if(obj['linkContentType'] == 'video')obj['link_0'] = '#'+obj['link_0'];
					
					$elem = '<div class="col-sm-6 col-md-3 no-padding animated-invisible animated fadeIn animated-visible" data-nekoanim="fadeIn" data-nekodelay="100" style="-webkit-animation-delay: 100ms;"><article class="text-center"><a href="'+obj['link_0']+'" class="'+$detailType+'"><figure class="dark-color"><img src="'+obj['imgPath_0']+'" alt="'+obj['text_1']+' '+obj['text_0']+'" class="responsive"><figcaption><h2 class="text-light" style="padding:10px; background-color:rgba(38,87,129,0.5);"><small>'+obj['text_0']+'</small><br>'+obj['text_1']+'<br><small class="text-light"><strong>'+obj['text_2']+'</strong></small></h2><p class="description text-light">'+obj['text_3']+'</p></figcaption></figure></a></article></div>';
					//$elem = '<div class="col-sm-6 col-md-3 no-padding animated-invisible animated fadeIn animated-visible" data-nekoanim="fadeIn" data-nekodelay="100" style="-webkit-animation-delay: 100ms;"><article class="text-center"><a href="'+$link_0+'" class="'+$popupType +'"><figure class="dark-color"><img src="'+$imgPath_0+'" alt="image" class="responsive"><figcaption><h2 class="text-light"><small>'+lastName+'</small><br>'+firstName+'<br><small class="text-main-color"><strong>'+$interviewDataArr[2]+'</strong></small></h2><p class="description text-light">'+$interviewDataArr[4]+'</p></figcaption></figure></a></article></div>';
					break;
				case 26:
					if(obj['linkContentType'] == 'video')
					{					
						$elem = '<article class="brick caption graphics"><figure class="light-color"><a href="'+obj['link_0']+'" class="image-iframe"><img src="'+obj['imgPath_0']+'" alt="'+obj['imgAlt_0']+'" class="full-width"><div class="sprite-bg media-icon-play"></div></a><figcaption><a href="'+obj['link_0']+'" class="image-iframe"><h3>'+obj['text_1']+'</h3></a><p class="hidden-xs">'+obj['text_0']+'</p></figcaption></figure></article>';
					}else
					{
						$elem = '<article class="brick caption graphics"><figure class="light-color"><a href="'+obj['link_0']+'" target="'+obj['link_0_target']+'"><img src="'+obj['imgPath_0']+'" alt="'+obj['imgAlt_0']+'" class="full-width"></a><figcaption><a href="'+obj['link_0']+'" target="'+obj['link_0_target']+'"><h3>'+obj['text_1']+'</h3></a><p class="hidden-xs">'+obj['text_0']+'</p></figcaption></figure></article>';
					}
					break;
				case 30://events watch video item
					$elem = '<div class="col-md-6 mb-small"><div class="msbx_1"><figure><a href="'+obj['link_0']+'" class="image-iframe"><img src="'+obj['imgPath_0']+'" alt="'+obj['imgAlt_0']+'"></a><a href="'+obj['link_0']+'" class="sprite-bg media-icon-play image-iframe"></a><a href="'+obj['link_0']+'" class="image-iframe"><figcaption class="box no-border bg_grey_c4cdd6 color_ff3154">'+obj['text_1']+'</figcaption></a></figure><div class="flR">'+obj['htmlStr_0']+'</div><h3><a href="'+obj['link_0']+'" class="image-iframe">'+((obj['text_2'])?obj['text_2']:'&nbsp;')+'</a></h3></div></div>';
					break;
				case 31://events watch image item
					$elem = '<div class="col-md-6 mb-small"><div class="msbx_1"><figure><a href="'+obj['link_0']+'" target="_blank"><img src="'+obj['imgPath_0']+'" alt="'+obj['imgAlt_0']+'"></a><a href="'+obj['link_0']+'" target="_blank"><figcaption class="box no-border bg_grey_c4cdd6 color_ff3154">'+obj['text_1']+'</figcaption></a></figure><div class="flR">'+obj['htmlStr_0']+'</div><h3><a href="'+obj['link_0']+'" target="_blank">'+obj['text_2']+'</a></h3></div></div>';
					break;
				case 38:
					$elem = '<div class="gridPadItem col-sm-6 col-md-3 col-xs-12"><div class="section"><figure><a href="'+obj['link_0']+'" class="popup-form"><img class="circle" src="'+obj['imgPath_0']+'" alt="'+obj['text_1']+'" onload="onMasonryGridImgLoaded()"> <i class="fa circle fa-quote-left"></i></a></figure><div class="inner"><h4><a href="'+obj['link_0']+'" class="popup-form">'+obj['text_0']+'</a></h4><div class="author"><strong>'+obj['text_1']+'</strong>'+obj['text_2']+'</div></div><div class="ftr clearfix"><img class="flR ge_log" src="'+obj['imgPath_1']+'" alt="'+obj['imgAlt_1']+'" onload="onMasonryGridImgLoaded()"><img src="'+obj['imgPath_2']+'" alt="'+obj['imgAlt_2']+'" onload="onMasonryGridImgLoaded()" class="telecom_log"></div>'+obj['htmlStr_0']+'</div></div>';
					break;
				case 39:
					$elem = '<div class="gridPadItem col-sm-6 col-md-3 col-xs-12"><div class="section"><figure class="fullwidth"><a href="'+obj['link_0']+'" class="image-iframe"><img src="'+obj['imgPath_0']+'" alt="'+obj['text_1']+'" onload="onMasonryGridImgLoaded()"> <i class="fa circle fa-quote-left"></i><span class="sprite-bg media-icon-play"></span></a></figure><div class="inner"><h4><a href="'+obj['link_0']+'" class="image-iframe">'+obj['text_0']+'</a></h4><div class="author"><strong>'+obj['text_1']+'</strong>'+obj['text_2']+'</div></div><div class="ftr clearfix"><img class="flR ge_log" src="'+obj['imgPath_1']+'" alt="'+obj['imgAlt_1']+'" onload="onMasonryGridImgLoaded()"><img src="'+obj['imgPath_2']+'" alt="'+obj['imgAlt_2']+'" onload="onMasonryGridImgLoaded()" class="telecom_log"></div>'+obj['htmlStr_0']+'</div></div>';
					break;
				case 40:
					$elem = '<div class="gridPadItem col-sm-6 col-md-3 col-xs-12"><div class="section"><figure class="fullwidth"><a href="'+obj['link_0']+'" class="image-iframe"><img src="'+obj['imgPath_0']+'" alt="'+obj['text_1']+'" onload="onMasonryGridImgLoaded()"> <i class="fa circle fa-quote-left"></i><span class="sprite-bg media-icon-play"></span></a></figure><div class="inner"><h4><a href="'+obj['link_0']+'" class="image-iframe">'+obj['text_0']+'</a></h4><div class="author"><strong>'+obj['text_1']+'</strong>'+obj['text_2']+'</div></div><div class="ftr clearfix"><img class="flR ge_log" src="'+obj['imgPath_1']+'" alt="'+obj['imgAlt_1']+'" onload="onMasonryGridImgLoaded()"><img src="'+obj['imgPath_2']+'" alt="'+obj['imgAlt_2']+'" onload="onMasonryGridImgLoaded()" class="telecom_log"></div>'+obj['htmlStr_0']+'</div></div>';
					break;
			}
			return $elem;
		},
		getDetailSection:function($sectionId, $secData, $dispType)
		{
			if(!$dispType)$dispType = 1;
			$elem = '';
						
			switch($dispType)
			{
				case 1:
					$elem = '<div id="'+$sectionId+'" class="mfp-hide newsDetailDiv" style="padding:0 22px 22px 22px;"><div class="row" style="background:#fff; padding:44px;">'+(($secData['text_3'])?'<div class="post"><h3>'+$secData['text_0']+'</h3><span class="subtle">'+$secData['text_1']+'</span><span class="date">'+$secData['text_3']+'</span></div>':'')+'<div class="post"><div class="sociable clearfix">'+(($secData['shareLink_0'])?('<div class="flL">'+ETB2BCompanyUIRenderer.getSociableBar($sectionId+'_socialShareBar', {text_0:$secData['text_0'],text_1:$secData['text_1'], hashTags:$secData['shareHashTags'],link_0:$secData['shareLink_0'], imgPath_0:$secData['imgPath_0'], social_keys:$secData['social_keys']}, $secData['shareBar_dispType'])+'</div>'):'')+'<a href="javascript:void(0);" class="newsletter show_subscribe_pop_btn"><i class="fa fa-envelope-o"></i> Newsletter</a><span class="font-controls"><a onclick="javascript:void(0); return false;" class="decreaseFont" href="#">A</a><a onclick="javascript:void(0); return false;" class="increaseFont" href="#">A</a></span><a href="javascript:void(0);" onclick="javascript:window.print();" class="print-btn"><i class="fa fa-print"></i></a><a target="_blank" href="https://www.addthis.com/bookmark.php" class="email-btn addthis_button_email" title="Email" addthis:url="'+$secData['shareLink_0']+'" addthis:title="'+htmlspecialchars($secData['text_0'])+'"><i class="fa fa-envelope"></i></a></div><p>'+$secData['text_2']+'</p><div class="sociable clearfix">'+(($secData['shareLink_0'])?('<div class="flL">'+ETB2BCompanyUIRenderer.getSociableBar($sectionId+'_socialShareBar', {text_0:$secData['text_0'],text_1:$secData['text_1'], hashTags:$secData['shareHashTags'],link_0:$secData['shareLink_0'], imgPath_0:$secData['imgPath_0'], social_keys:$secData['social_keys']}, $secData['shareBar_dispType'])+'</div>'):'')+'<a href="javascript:void(0);" class="newsletter show_subscribe_pop_btn"><i class="fa fa-envelope-o"></i> Newsletter</a><span class="font-controls"><a onclick="javascript:void(0); return false;" class="decreaseFont" href="#">A</a><a onclick="javascript:void(0); return false;" class="increaseFont" href="#">A</a></span><a href="javascript:void(0);" onclick="javascript:window.print();" class="print-btn"><i class="fa fa-print"></i></a><a target="_blank" href="https://www.addthis.com/bookmark.php" class="email-btn addthis_button_email" title="Email" addthis:url="'+$secData['shareLink_0']+'" addthis:title="'+htmlspecialchars($secData['text_0'])+'"><i class="fa fa-envelope"></i></a></div></div></div></div>';
					break;
				case 2:
					$elem = '<div id="'+$sectionId+'" class="mfp-hide newsDetailDiv" style="padding:0 22px 22px 22px;"><div class="row" style="background:#fff; padding:44px;"><div class="quote_popup clearfix"><figure><img src="'+$secData['imgPath_0']+'" alt="'+$secData['text_1']+'" /><i class="fa circle fa-quote-left"></i></figure><div class="desc"><p>'+$secData['text_2']+'</p><div class="author"><strong>'+$secData['text_1']+'</strong>'+$secData['text_4']+'</div>'+(($secData['shareLink_0'])?ETB2BCompanyUIRenderer.getSociableBar($sectionId+'_socialShareBar', {text_0:$secData['text_1'], text_1:$secData['text_0'], hashTags:$secData['shareHashTags'], link_0:$secData['shareLink_0'], imgPath_0:$secData['imgPath_0'], social_keys:$secData['social_keys']}, $secData['shareBar_dispType']):'')+'</div></div></div></div>';
					break;
			}
			return $elem;
		},
		getSociableBar:function($sectionId, $secData, $dispType, $size)
		{
			var $list_0 = '';
			//var $socialKeys = $secData['social_keys'];
			var $socialKeys = {"facebook":"Share", "twitter":"Tweet", "linkedin":"Share", "whatsapp":"WhatsApp"};
			var $hashTag = ($secData['hashTags'])?$secData['hashTags']:'';
			
			//return '<div class="post"><div class="sociable clearfix"><div class="fb-share-button" data-href="'+$secData['link_0']+'" data-type="button_count"></div><div class="g-plus" data-action="share" data-annotation="bubble" data-href="'+$secData['link_0']+'"></div><script type="IN/Share" data-summary="'+$secData['text_0']+'" data-url="'+$secData['link_0']+'" data-counter="right"><'+'/script><a  href="https://twitter.com/share" class="twitter-share-button" data-lang="en" data-url="'+$secData['link_0']+'" data-counturl="'+$secData['link_0']+'">Tweet</a></div></div>';
			switch($dispType)
			{
				case 0:
					//$list_0 += '<div class="post"><div class="sociable clearfix"><div class="fb-share-button" data-href="'+$secData['link_0']+'" data-type="button_count"></div><div class="g-plus" data-action="share" data-annotation="bubble" data-href="'+$secData['link_0']+'"></div><script type="IN/Share" data-summary="'+$secData['text_0']+'" data-url="'+$secData['link_0']+'" data-counter="right"><'+'/script><a  href="https://twitter.com/share" class="twitter-share-button" data-lang="en" data-url="'+$secData['link_0']+'" data-counturl="'+$secData['link_0']+'">Tweet</a></div></div>';
					$list_0 += '<div class="fb-share-button" data-href="'+$secData['link_0']+'" data-type="button_count"></div><!--<div class="g-plus" data-action="share" data-annotation="bubble" data-href="'+$secData['link_0']+'"></div>--><script type="IN/Share" data-summary="'+$secData['text_0']+'" data-url="'+$secData['link_0']+'" data-counter="right"><'+'/script><a  href="https://twitter.com/share" class="twitter-share-button" data-lang="en" data-url="'+$secData['link_0']+'" data-counturl="'+$secData['link_0']+'">Tweet</a>';
					break;
				case 1:
					if($socialKeys.length==0)return '';
					$list_0 += '<div class="socialShareBar '+$sectionId+'" data-url_shared="'+$secData['link_0']+'" data-social_share_element=".socialShareElement">';
					$.each($socialKeys, function($key, $val)
					{
						if($key == 'gplus')return true;
						/*
						var $linkObj = {href:'', onclick:''};
						var $href = '';
						var $clickUrl = '';
						var $text_0_UE = rfc3986EncodeURIComponent($secData['text_0']);
						var $link_0_UE = encodeURIComponent($secData['link_0']);
						*/
						var $url = encodeURIComponent($secData['link_0']);
						var $title = $secData['text_0'];
						var $title_euc = rfc3986EncodeURIComponent($title);
						var $image_url = $secData['imgPath_0'];
						var $description = $secData['text_1'];
						var $href = '';
						var $clickUrl = '';
						var $linkObj = {};
						
						switch($key)
						{
							case 'twitter':
								$href = 'https://twitter.com/share?text='+$title+'&url='+$url+'&title='+$title+'&hashtags='+$hashTag;
								$clickUrl = 'https://twitter.com/home/?status='+$title_euc+' '+$url;
								break;
							case 'facebook':
								$href = 'https://www.facebook.com/sharer.php?u='+$url+'&title='+$title;
								$clickUrl = 'https://www.facebook.com/sharer.php?s=100&p[title]='+$title_euc+'&p[summary]='+$description+'&p[url]='+$url+'&p[images][0]='+$image_url;
								break;
							case 'linkedin':
								$href = 'https://www.linkedin.com/shareArticle?mini=true&url='+$url+'&title='+$title+'&source='+base_url;
								$clickUrl = 'https://www.linkedin.com/shareArticle?mini=true&url='+$url+'&title='+$title_euc+'&summary='+$description+'&source='+base_url;
								break;
							case 'gplus':
								$href = 'https://plus.google.com/share?url='+$url+'&title='+$title_euc;
								$clickUrl = $href;
								break;
							case 'whatsapp':
								$href = ((deviceType != 'mobile')?'https://wa.me/':'whatsapp://send')+'?text='+$url;
								$clickUrl = $href;
								break;
						}
						$linkObj['href'] = $href;
						//$linkObj['onclick'] = 'window.open(\''+$clickUrl+'\', '+'\'sharer\''+', '+'\'toolbar=0,status=0,width=548,height=325\''+'); return false;';
						//$linkObj['onclick'] = 'window.open(this.href, '+'\'sharer\''+', '+'\'toolbar=0,status=0,width=548,height=325\''+'); return false;';
						$linkObj['onclick'] = 'openWindow(this.href, '+'\'sharer\''+', '+'\'toolbar=0,status=0,width=548,height=325\''+'); return false;';
						
						$list_0 += '<div class="socialShareElement '+$key+'" data-social_key="'+$key+'" data-share_counter=".count .num"><a href="'+$linkObj['href']+'" onclick="'+$linkObj['onclick']+'" class="btn"><span class="logo"></span><span class="label">'+$val+'</span></a><div class="count"><span class="triangle-left"></span><span class="num">&nbsp;</span></div></div>';
						
					});
					$list_0 += '</div>';
					break;
				case 2:
					if($socialKeys.length==0)return '';
					$list_0 += '<div class="socialShareBar"><ul class="social-icons circle '+$size+'">';
					$.each($socialKeys, function($key, $val)
					{
						if($key == 'gplus')return true;
						$linkObj = {};
						$href = '';
						$clickUrl = '';
						$text_0_UE = rfc3986EncodeURIComponent($secData['text_0']);
						$text_1_UE = $secData['text_1'];
						$link_0_UE = encodeURIComponent($secData['link_0']);
						$imgPath_0_UE = $secData['imgPath_0'];
						switch($key)
						{
							case 'twitter':
								//$href = 'https://twitter.com/share?text='.$text_0_UE.'&url='.$link_0_UE.'&title='.$text_0_UE.'&hashtags='.$hashTag.'&user_id='.$userId;
								$href = 'https://twitter.com/share?text='+$text_0_UE+'&url='+$link_0_UE+'&title='+$text_0_UE+'&hashtags='+ETB2BCompanyUIRenderer.socialInfo['twitter']['hashtags']+'&user_id='+ETB2BCompanyUIRenderer.socialInfo['twitter']['user_id'];
								$clickUrl = 'https://twitter.com/home/?status='+$text_0_UE+' '+$link_0_UE;
								break;
							case 'facebook':
								$href = 'https://www.facebook.com/sharer.php?u='+$link_0_UE+'&title='+$text_0_UE;
								$clickUrl = 'https://www.facebook.com/sharer.php?s=100&p[title]='+$text_0_UE+'&p[summary]='+$text_1_UE+'&p[url]='+$link_0_UE+'&p[images][0]='+$imgPath_0_UE;
								break;
							case 'linkedin':
								$href = 'https://www.linkedin.com/shareArticle?mini=true&url='+$link_0_UE+'&title='+$text_0_UE+'&source='+base_url;
								$clickUrl = 'https://www.linkedin.com/shareArticle?mini=true&url='+$link_0_UE+'&title='+$text_0_UE+'&summary='+$secData['text_1']+'&source='+base_url;
								break;
							case 'gplus':
								$href = 'https://plus.google.com/share?url='+$link_0_UE+'&title='+$text_0_UE;
								$clickUrl = $href;
								break;
							case 'whatsapp':
								$href = ((deviceType != 'mobile')?'https://wa.me/':'whatsapp://send')+'?text='+$link_0_UE;
								$clickUrl = $href;
								break;
						}
						$linkObj['href'] = $href;
						//$linkObj['onclick'] = 'window.open(\''.$clickUrl.'\', '.'\'sharer\''.', '.'\'toolbar=0,status=0,width=548,height=325\''.'); return false;';
						//$linkObj['onclick'] = 'window.open(this.href, '+'\'sharer\''+', '+'\'toolbar=0,status=0,width=548,height=325\''+'); return false;';
						$linkObj['onclick'] = 'openWindow(this.href, '+'\'sharer\''+', '+'\'toolbar=0,status=0,width=548,height=325\''+'); return false;';
						
						//$list_0 .= '<li><a target="_blank" href="'.$linkObj['href'].'" onclick="'.$linkObj['onclick'].'" class="'.$key.'" title="'.$key.'"><i class="icon-glyph-'.self::$customIconCodes[$key].'"></i></a></li> ';
						$list_0 += '<li><a target="_blank" href="'+$linkObj['href']+'" onclick="'+$linkObj['onclick']+'" class="'+$key+'" title="'+$key+'"><i class="'+ETB2BCompanyUIRenderer.customIconCodes[$key]+'"></i></a></li> ';
					});
					$list_0 += '</ul></div>';
					break;
				case 3:
					if($socialKeys.length==0)return '';
					$list_0 += '<div class="social">';
					$.each($socialKeys, function($key, $val)
					{
						if($key == 'gplus')return true;
						$linkObj = {};
						$href = '';
						$clickUrl = '';
						$text_0_UE = rfc3986EncodeURIComponent($secData['text_0']);
						$text_1_UE = $secData['text_1'];
						$link_0_UE = encodeURIComponent($secData['link_0']);
						$imgPath_0_UE = $secData['imgPath_0'];
						switch($key)
						{
							case 'twitter':
								//$href = 'https://twitter.com/share?text='.$text_0_UE.'&url='.$link_0_UE.'&title='.$text_0_UE.'&hashtags='.$hashTag.'&user_id='.$userId;
								$href = 'https://twitter.com/share?text='+$text_0_UE+'&url='+$link_0_UE+'&title='+$text_0_UE+'&hashtags='+ETB2BCompanyUIRenderer.socialInfo['twitter']['hashtags']+'&user_id='+ETB2BCompanyUIRenderer.socialInfo['twitter']['user_id'];
								$clickUrl = 'https://twitter.com/home/?status='+$text_0_UE+' '+$link_0_UE;
								break;
							case 'facebook':
								$href = 'https://www.facebook.com/sharer.php?u='+$link_0_UE+'&title='+$text_0_UE;
								$clickUrl = 'https://www.facebook.com/sharer.php?s=100&p[title]='+$text_0_UE+'&p[summary]='+$text_1_UE+'&p[url]='+$link_0_UE+'&p[images][0]='+$imgPath_0_UE;
								break;
							case 'linkedin':
								$href = 'https://www.linkedin.com/shareArticle?mini=true&url='+$link_0_UE+'&title='+$text_0_UE+'&source='+base_url;
								$clickUrl = 'https://www.linkedin.com/shareArticle?mini=true&url='+$link_0_UE+'&title='+$text_0_UE+'&summary='+$secData['text_1']+'&source='+base_url;
								break;
							case 'gplus':
								$href = 'https://plus.google.com/share?url='+$link_0_UE+'&title='+$text_0_UE;
								$clickUrl = $href;
								break;
							case 'whatsapp':
								$href = ((deviceType != 'mobile')?'https://wa.me/':'whatsapp://send')+'?text='+$link_0_UE;
								$clickUrl = $href;
								break;
						}
						$linkObj['href'] = $href;
						//$linkObj['onclick'] = 'window.open(\''.$clickUrl.'\', '.'\'sharer\''.', '.'\'toolbar=0,status=0,width=548,height=325\''.'); return false;';
						//$linkObj['onclick'] = 'window.open(this.href, '+'\'sharer\''+', '+'\'toolbar=0,status=0,width=548,height=325\''+'); return false;';
						$linkObj['onclick'] = 'openWindow(this.href, '+'\'sharer\''+', '+'\'toolbar=0,status=0,width=548,height=325\''+'); return false;';
						
						//$list_0 .= '<li><a target="_blank" href="'.$linkObj['href'].'" onclick="'.$linkObj['onclick'].'" class="'.$key.'" title="'.$key.'"><i class="icon-glyph-'.self::$customIconCodes[$key].'"></i></a></li> ';
						$list_0 += '<a target="_blank" href="'+$linkObj['href']+'" onclick="'+$linkObj['onclick']+'" class="'+$key+'" title="'+$key+'"><span class="sprite-bg"></span></a> ';
					});
					$list_0 += '</div>';
					break;
				case 4:
					if($socialKeys.length==0)return '';
					//$list_0 .= '<div class="socialShareBar '.$sectionId.'" data-url_shared="'.$secData['link_0'].'" data-social_share_element=".socialShareElement">';
					$list_0 += '<ul class="social-card socialShareBar '+$sectionId+'" data-url_shared="'+$secData['link_0']+'" data-social_share_element=".sscShrElem">';
					$.each($socialKeys, function($key, $val)
					{
						if($key == 'gplus')return true;
						$linkObj = {};
							$href = '';
							$clickUrl = '';
							$text_0_UE = rfc3986EncodeURIComponent($secData['text_0']);
							$text_1_UE = $secData['text_1'];
							$link_0_UE = encodeURIComponent($secData['link_0']);
							$imgPath_0_UE = $secData['imgPath_0'];
							switch($key)
							{
								case 'twitter':
									//$href = 'https://twitter.com/share?text='.$text_0_UE.'&url='.$link_0_UE.'&title='.$text_0_UE.'&hashtags='.$hashTag.'&user_id='.$userId;
									$href = 'https://twitter.com/share?text='+$text_0_UE+'&url='+$link_0_UE+'&title='+$text_0_UE+'&hashtags='+ETB2BCompanyUIRenderer.socialInfo['twitter']['hashtags']+'&user_id='+ETB2BCompanyUIRenderer.socialInfo['twitter']['user_id'];
									$clickUrl = 'https://twitter.com/home/?status='+$text_0_UE+' '+$link_0_UE;
									break;
								case 'facebook':
									$href = 'https://www.facebook.com/sharer.php?u='+$link_0_UE+'&title='+$text_0_UE;
									$clickUrl = 'https://www.facebook.com/sharer.php?s=100&p[title]='+$text_0_UE+'&p[summary]='+$text_1_UE+'&p[url]='+$link_0_UE+'&p[images][0]='+$imgPath_0_UE;
									break;
								case 'linkedin':
									$href = 'https://www.linkedin.com/shareArticle?mini=true&url='+$link_0_UE+'&title='+$text_0_UE+'&source='+base_url;
									$clickUrl = 'https://www.linkedin.com/shareArticle?mini=true&url='+$link_0_UE+'&title='+$text_0_UE+'&summary='+$secData['text_1']+'&source='+base_url;
									break;
								case 'gplus':
									$href = 'https://plus.google.com/share?url='+$link_0_UE+'&title='+$text_0_UE;
									$clickUrl = $href;
									break;
								case 'whatsapp':
									$href = ((deviceType != 'mobile')?'https://wa.me/':'whatsapp://send')+'?text='+$link_0_UE;
									$clickUrl = $href;
									break;
							}
							$linkObj['href'] = $href;
							//$linkObj['onclick'] = 'window.open(\''.$clickUrl.'\', '.'\'sharer\''.', '.'\'toolbar=0,status=0,width=548,height=325\''.'); return false;';
							//$linkObj['onclick'] = 'window.open(this.href, '+'\'sharer\''+', '+'\'toolbar=0,status=0,width=548,height=325\''+'); return false;';
							$linkObj['onclick'] = 'openWindow(this.href, '+'\'sharer\''+', '+'\'toolbar=0,status=0,width=548,height=325\''+'); return false;';
						/*
						$list_0 .= '<div class="socialShareElement '.$key.'" data-social_key="'.$key.'" data-share_counter=".count .num">
										<a href="'.$linkObj['href'].'" onclick="'.$linkObj['onclick'].'" class="btn"><span class="logo"></span><span class="label">'.$val.'</span></a>
										<div class="count"><span class="triangle-left"></span><span class="num">&nbsp;</span></div>
									</div>';
									*/
						$list_0 += '<li class="sscShrElem '+$key+'" data-social_key="'+$key+'" data-share_counter=".count"><a href="'+$linkObj['href']+'" onclick="'+$linkObj['onclick']+'" class="clearfix"><i class="'+ETB2BCompanyUIRenderer.customIconCodes[$key]+'"></i>'+$val+' <span class="count">&nbsp;</span></a></li>';
					});
					$list_0 += '</ul>';
					//$list_0 .= '</div>';
					break;
				case 5:
					if($socialKeys.length==0)return '';
					$list_0 += '<div class="socialShareBar '+$sectionId+'" data-url_shared="'+$secData['link_0']+'" data-social_share_element=".socialShareElement">';
					$.each($socialKeys, function($key, $val)
					{
						if($key == 'gplus')return true;
						var $url = encodeURIComponent($secData['link_0']);
						var $title = $secData['text_0'];
						var $title_euc = rfc3986EncodeURIComponent($title);
						var $image_url = $secData['imgPath_0'];
						var $description = $secData['text_1'];
						var $href = '';
						var $clickUrl = '';
						var $linkObj = {};
						switch($key)
						{
							case 'twitter':
								$href = 'https://twitter.com/share?text='+$title+'&url='+$url+'&title='+$title+'&hashtags='+$hashTag;
								$clickUrl = 'https://twitter.com/home/?status='+$title_euc+' '+$url;
								break;
							case 'facebook':
								$href = 'https://www.facebook.com/sharer.php?u='+$url+'&title='+$title;
								$clickUrl = 'https://www.facebook.com/sharer.php?s=100&p[title]='+$title_euc+'&p[summary]='+$description+'&p[url]='+$url+'&p[images][0]='+$image_url;
								break;
							case 'linkedin':
								$href = 'https://www.linkedin.com/shareArticle?mini=true&url='+$url+'&title='+$title+'&source='+base_url;
								$clickUrl = 'https://www.linkedin.com/shareArticle?mini=true&url='+$url+'&title='+$title_euc+'&summary='+$description+'&source='+base_url;
								break;
							case 'gplus':
								$href = 'https://plus.google.com/share?url='+$url+'&title='+$title_euc;
								$clickUrl = $href;
								break;
							case 'whatsapp':
								$href = ((deviceType != 'mobile')?'https://wa.me/':'whatsapp://send')+'?text='+$url;
								$clickUrl = $href;
								break;
						}
						$linkObj['href'] = $href;
						//$linkObj['onclick'] = 'window.open(\''+$clickUrl+'\', '+'\'sharer\''+', '+'\'toolbar=0,status=0,width=548,height=325\''+'); return false;';
						//$linkObj['onclick'] = 'window.open(this.href, '+'\'sharer\''+', '+'\'toolbar=0,status=0,width=548,height=325\''+'); return false;';
						$linkObj['onclick'] = 'openWindow(this.href, '+'\'sharer\''+', '+'\'toolbar=0,status=0,width=548,height=325\''+'); return false;';
						
						$list_0 += '<div class="socialShareElement '+$key+'" data-social_key="'+$key+'" data-share_counter=".count .num"><a href="'+$linkObj['href']+'" onclick="'+$linkObj['onclick']+'" class="btn"><span class="sprite-bg logo-brocade"></span></a></div>';
					});
					$list_0 += '</div>';
					break;
			}
			return $list_0;
		}
    };
	return rendObj;
})();