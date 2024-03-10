function getAllFuncArr()
{
	return [
		function getChip($elemId, $elemData, $dispType)
		{
			if(!$dispType)$dispType = 1;
			$elem = '';
			switch($dispType)
			{
				case 1:// used in maketechhuman section heading - bookmark icon content:'\f097'
					$elem += '<div class="row"><div class="col-lg-12"><div class="page_hdng2"><h2><span>'+$elemData['text_0']+'</span>'+$elemData['text_1']+'</h2></div></div></div>';
					break;
				case 2:// used in maketechhuman section heading
					$elem += '<div class="row"><div class="col-lg-12"><div class="page_hdng"><h2><span>'+$elemData['text_0']+'</span>'+$elemData['text_1']+'</h2></div></div></div>';
					break;
				case 3:// used in wired section heading
					$elem += '<div class="row"><div class="ambroise-hdr pad clearfix">'+$elemData['text_1']+'</div></div>';
					break;
				case 4:// used in maketechhuman section heading
					$elem += '<div class="row"><div class="page_hdng3"><h2>'+$elemData['text_1']+'</h2></div></div>';
					break;
			}
			return $elem;
		},
		function getBtn($elemId, $elemData, $dispType)
		{
			if(!$dispType)$dispType = 1;
			$elem = '';
			//$detailType = ($elemData['linkContentType'] == 'video')?'image-iframe':'';
			//$detailType = ($elemData['linkContentType'] == 'html')?(($elemData['link_0_target'] == '_popup')?'popup-form_custom':''):(($elemData['linkContentType'] == 'video')?'image-iframe':'');
			$detailType = ($elemData['linkContentType'] == 'html')?(($elemData['link_0_target'] == '_popup')?'popup-form':(($elemData['link_0_target'] == '_popup_custom')?'popup-form_custom':'')):(($elemData['linkContentType'] == 'video')?'image-iframe':'');
			switch($dispType)
			{
				case 1:
					$elem += '<a href="'+$elemData['link_0']+'" class="btn btn-border btn-small '+$detailType+'" onclick="'+$elemData['clickFunc_0']+'" target="'+$elemData['link_0_target']+'">'+$elemData['text_0']+'</a>';
					break;
				case 2:
					$elem += '<div id="'+$elemId+'" class="row"><div class="col-lg-12 alC pt-small pb-small mb-small"><a href="'+$elemData['link_0']+'" class="btn default large '+$detailType+'" onclick="'+$elemData['clickFunc_0']+'" target="'+$elemData['link_0_target']+'">'+$elemData['text_0']+'</a></div></div>';
					break;
				case 3:
					$elem += '<a class="clearfix flex-box align-m load-more opacity-5  pad " href="'+$elemData['link_0']+'"> <i  class="fa fa-arrow-circle-right ui-more marg-r-sm inline-center"></i><div class="col meta black inline-center">'+$elemData['text_0']+'</div></a>';
					break;
				case 4:
					$elem += '<a href="'+$elemData['link_0']+'">'+$elemData['text_0']+'&nbsp;&nbsp;<i class="sprite-bg next"></i></a>';
					break;
				case 5:
					$elem += '<a href="'+$elemData['link_0']+'" class="button5 sm">'+$elemData['text_0']+'</a>';
					break;
			}
			return $elem;
		},
		function getCard($elemId, $elemData, $dispType)
		{
			if(!$dispType)$dispType = 1;
			$elem = '';
			//$detailType = ($elemData['linkContentType'] == 'video')?'image-iframe':(($elemData['linkContentType'] == 'photo')?'image-link':'');
			//$detailType = ($elemData['linkContentType'] == 'html')?(($elemData['link_0_target'] == '_popup')?'popup-form_custom':''):(($elemData['linkContentType'] == 'video')?'image-iframe':(($elemData['linkContentType'] == 'photo')?'image-link':''));
			$detailType = ($elemData['linkContentType'] == 'html')?(($elemData['link_0_target'] == '_popup')?'popup-form':(($elemData['link_0_target'] == '_popup_custom')?'popup-form_custom':'')):(($elemData['linkContentType'] == 'video')?'image-iframe':(($elemData['linkContentType'] == 'photo')?'image-link':''));
			if($elemData['link_0_target'] == '_blank')$detailType='';
			$playIcon = '';

			switch($dispType)
			{
				case 1:// used in gehealthierindia home page news section 1st item
					$playIcon = ($elemData['linkContentType'] == 'video')?'<a href="'+$elemData['link_0']+'" class="imgframe '+$detailType+'"><div class="media-icon-play-fa" ><i class="fa fa-play-circle-o" aria-hidden="true"></i></div></a>':'';
					$elem = '<article class="row btstrp-edn2-crd-'+$dispType+'"><div class="col-lg-6 col-md-6 image" ><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'">'+$playIcon+'</div><div class="col-lg-6 col-md-6 col-lg-offset-6 col-md-offset-6 desc padding-medium"><h2>'+$elemData['text_1']+'</h2><p>'+$elemData['text_2']+'</p>'+$elemData['htmlStr_0']+'</div></article>';
					break;
				case 2:// used in gehealthierindia home page news section even item
					$playIcon = ($elemData['linkContentType'] == 'video')?'<a href="'+$elemData['link_0']+'" class="imgframe '+$detailType+'"><div class="media-icon-play-fa" ><i class="fa fa-play-circle-o" aria-hidden="true"></i></div></a>':'';
					$elem = '<article class="row btstrp-edn2-crd-'+$dispType+'"><div class="col-lg-6 col-md-6 image" ><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'">'+$playIcon+'</div><div class="col-lg-6 col-md-6 col-lg-offset-6 col-md-offset-6 desc padding-medium"><h2>'+$elemData['text_1']+'</h2><p>'+$elemData['text_2']+'</p>'+$elemData['htmlStr_0']+'</div></article>';
					break;
				case 3:// used in gehealthierindia home page news section odd item
					$playIcon = ($elemData['linkContentType'] == 'video')?'<a href="'+$elemData['link_0']+'" class="imgframe '+$detailType+'"><div class="media-icon-play-fa" ><i class="fa fa-play-circle-o" aria-hidden="true"></i></div></a>':'';
					$elem = '<article class="row btstrp-edn2-crd-'+$dispType+'"><div class="col-lg-6 col-md-6 image right" ><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'">'+$playIcon+'</div><div class="col-lg-6 col-md-6 desc padding-medium"><h2>'+$elemData['text_1']+'</h2><p>'+$elemData['text_2']+'</p>'+$elemData['htmlStr_0']+'</div></article>';
					break;
				case 4:// used in maketechhuman news section
					if($elemData['linkContentType'] == 'video')
					{					
						$elem = '<article class="gridPadItem col-lg-4 col-md-4 col-sm-6 btstrp-edn2-crd-'+$dispType+'"><section><figure><a href="'+$elemData['link_0']+'" class="imgframe '+$detailType+'"><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'" onload="onMasonryGridImgLoaded()"><div class="media-icon-play-fa" ><i class="fa fa-play-circle-o" aria-hidden="true"></i></div></a><figcaption><h3><a href="'+$elemData['link_0']+'" class="'+$detailType+'">'+$elemData['text_1']+'</a></h3><p>'+$elemData['text_2']+'</p></figcaption></figure></section></article>';
					}else
					{
						$elem = '<article class="gridPadItem col-lg-4 col-md-4 col-sm-6 btstrp-edn2-crd-'+$dispType+'"><section><figure><a href="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'" class="imgframe '+$detailType+'"><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'" onload="onMasonryGridImgLoaded()"></a><figcaption><h3><a href="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'" class="'+$detailType+'">'+$elemData['text_1']+'</a></h3><p>'+$elemData['text_2']+'</p></figcaption></figure></section></article>';
					}
					break;
				case 5:// used in gehealthierindia home page interview section
					$playIcon = ($elemData['linkContentType'] == 'video')?'<div class="media-icon-play-fa" ><i class="fa fa-play-circle-o" aria-hidden="true"></i></div>':'';
					$elem = '<article class="col-lg-3 col-md-3 col-sm-6 no-padding gridPadItem btstrp-edn2-crd-'+$dispType+'"><a href="'+$elemData['link_0']+'" class="'+$detailType+'"><figure><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'" onload="onMasonryGridImgLoaded()" />'+$playIcon+'<figcaption><h2 class="text-light" ><small>'+$elemData['text_0']+'</small>'+$elemData['text_1']+'<small class="text-light"><strong>'+$elemData['text_2']+'</strong></small></h2><p class="desc">'+$elemData['text_3']+'</p></figcaption></figure></a></article>';
					break;
				case 6:// used in maketechhuman home page single full width interview
					$elem = '<article class="prlx_1 text-light alC mb-small btstrp-edn2-crd-'+$dispType+'" style="background-image: url('+$elemData['imgPath_0']+'); background-size:cover; "><!--<img class="unveil bg" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'" />--><div class="mask"><div class="container"><div class="row pt-large pb-large"><div class="col-lg-12"><h2 class="large">'+$elemData['text_0']+'<br><br><small class="no-shadow">'+$elemData['text_1']+'<p>'+$elemData['text_2']+'</p></small></h2>'+$elemData['htmlStr_0']+'<br><br>'+$elemData['htmlStr_1']+'</div></div></div></div></article>';
					break;
				case 7:// used in maketechhuman events section
					if($elemData['linkContentType'] == 'video')
					{					
						$elem = '<article class="col-lg-6 col-md-6 col-sm-6 gridPadItem btstrp-edn2-crd-'+$dispType+'"><section><figure><a href="'+$elemData['link_0']+'" class="imgframe '+$detailType+'"><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'" onload="onMasonryGridImgLoaded()"><figcaption>'+$elemData['text_1']+'</figcaption><span class="media-icon-play-fa image-iframe"><i class="fa fa-play-circle-o" aria-hidden="true"></i></span></a><div class="desc">'+$elemData['htmlStr_0']+'<h3><a href="'+$elemData['link_0']+'" class="'+$detailType+'">'+(($elemData['text_2'])?$elemData['text_2']:'&nbsp;')+'</a></h3></div></figure></section></article>';
					}else
					{
						$elem = '<article class="col-lg-6 col-md-6 col-sm-6 gridPadItem btstrp-edn2-crd-'+$dispType+'"><section><figure><a href="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'" class="imgframe '+$detailType+'"><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'" onload="onMasonryGridImgLoaded()"><figcaption>'+$elemData['text_1']+'</figcaption></a><div class="desc">'+$elemData['htmlStr_0']+'<h3><a href="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'">'+$elemData['text_2']+'</a></h3></div></figure></section></article>';
					}
					break;
				case 8:// used in maketechhuman interview listing section
					if($elemData['linkContentType'] == 'video')
					{					
						$elem = '<article class="col-lg-4 col-md-4 gridPadItem btstrp-edn2-crd-'+$dispType+'"><a href="'+$elemData['link_0']+'" class="imgframe '+$detailType+'"><figure><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'" onload="onMasonryGridImgLoaded()"><figcaption><span>'+$elemData['text_1']+'</span></figcaption><span class="media-icon-play-fa image-iframe"><i class="fa fa-play-circle-o" aria-hidden="true"></i></span></figure></a><div class="desc"><a href="'+$elemData['link_0']+'" class="'+$detailType+'"><h2>'+(($elemData['text_2'])?$elemData['text_2']:'&nbsp;')+'</h2><p>'+$elemData['text_3']+'</p></a>'+$elemData['htmlStr_0']+'</div></article>';
					}else
					{
						$elem = '<article class="col-lg-4 col-md-4 gridPadItem btstrp-edn2-crd-'+$dispType+'"><a href="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'" class="imgframe '+$detailType+'"><figure><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'" onload="onMasonryGridImgLoaded()"><figcaption><span>'+$elemData['text_1']+'</span></figcaption></figure></a><div class="desc"><a href="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'"><h2>'+$elemData['text_2']+'</h2><p>'+$elemData['text_3']+'</p></a>'+$elemData['htmlStr_0']+'</div></article>';
					}
					break;
				case 9:
					$playIcon = ($elemData['linkContentType'] == 'video')?'<div class="media-icon-play-fa" ><i class="fa fa-play-circle-o" aria-hidden="true"></i></div>':'';
					$elem = '<div class="col-lg-3 col-md-3 col-sm-6 no-padding gridPadItem btstrp-edn2-crd-'+$dispType+'"><figure><a href="'+$elemData['link_0']+'" class="'+$detailType+'" caption="'+$elemData['text_1']+'" data-gallery="'+$elemData['listData']['src']+'" data-caption="'+$elemData['listData']['caption']+'"><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'" onload="onMasonryGridImgLoaded()"/>'+$playIcon+'</a><figcaption><div class="desc"><span>'+$elemData['text_1']+'</span></div><h5></h5><p class="icon-links"><a href="'+$elemData['link_0']+'" class="'+$detailType+'" caption="'+$elemData['text_1']+'" data-gallery="'+$elemData['listData']['src']+'" data-caption="'+$elemData['listData']['caption']+'"><i class="fa fa-search"></i></a><a href="'+$elemData['link_1']+'" ><i class="fa fa-eye"></i></a></p></figcaption></figure></div>';
					break;
				case 13:// Photo Video Gallery dispType-2
					if($elemData['linkContentType'] == 'video')
					{					
						$elem = '<div class="col-lg-6 col-md-6 col-sm-6 gridPadItem btstrp-edn2-crd-'+$dispType+'"><section><figure><a href="'+$elemData['link_0']+'" class="imgframe '+$detailType+'"><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'" onload="onMasonryGridImgLoaded()"><figcaption>'+$elemData['text_1']+'</figcaption><span class="media-icon-play-fa image-iframe"><i class="fa fa-play-circle-o" aria-hidden="true"></i></span></a><div class="desc">'+$elemData['htmlStr_0']+'<h3><a href="'+$elemData['link_0']+'" class="'+$detailType+'">'+(($elemData['text_2'])?$elemData['text_2']:'&nbsp;')+'</a></h3></div></figure></section></div>';
					}else
					{
						$elem = '<div class="col-lg-6 col-md-6 col-sm-6 gridPadItem btstrp-edn2-crd-'+$dispType+'"><section><figure><a href="'+$elemData['link_0']+'" class="imgframe '+$detailType+'" caption="'+$elemData['text_1']+'"><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'" onload="onMasonryGridImgLoaded()"><figcaption>'+$elemData['text_1']+'</figcaption></a><div class="desc">'+$elemData['htmlStr_0']+'<h3><a href="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'">'+$elemData['text_2']+'</a></h3></div></figure></section></div>';
					}
					break;
				case 14:// used in worldheartday quotes listing section
					if($elemData['linkContentType'] == 'video')
					{					
						$elem = '<div class="gridPadItem col-sm-6 col-md-3 col-xs-12 btstrp-edn2-crd-'+$dispType+'"><div class="section"><figure class="fullwidth"><a href="'+$elemData['link_0']+'" class="'+$detailType+'"><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'" onload="onMasonryGridImgLoaded()"><i class="fa circle fa-quote-left"></i><span class="media-icon-play-fa"><i class="fa fa-play-circle-o" aria-hidden="true"></i></span></a></figure><div class="inner"><h4><a href="'+$elemData['link_0']+'" class="'+$detailType+'">'+$elemData['text_0']+'</a></h4><div class="author"><strong>'+$elemData['text_2']+'</strong>'+$elemData['text_3']+'</div></div><div class="ftr clearfix"><img class="flR ge_log" src="'+$elemData['imgPath_1']+'" alt="'+$elemData['imgAlt_1']+'" onload="onMasonryGridImgLoaded()"><img src="'+$elemData['imgPath_2']+'" alt="'+$elemData['imgAlt_2']+'" onload="onMasonryGridImgLoaded()" class="telecom_log"></div>'+$elemData['htmlStr_0']+'</div></div>';
					}else
					{
						$elem = '<div class="gridPadItem col-sm-6 col-md-3 col-xs-12 btstrp-edn2-crd-'+$dispType+'"><div class="section"><figure><a href="'+$elemData['link_0']+'" class="'+$detailType+'"><img class="circle unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'" onload="onMasonryGridImgLoaded()"><i class="fa circle fa-quote-left"></i></a></figure><div class="inner"><h4><a href="'+$elemData['link_0']+'" class="'+$detailType+'">'+$elemData['text_0']+'</a></h4><div class="author"><strong>'+$elemData['text_2']+'</strong>'+$elemData['text_3']+'</div></div><div class="ftr clearfix"><img class="flR ge_log" src="'+$elemData['imgPath_1']+'" alt="'+$elemData['imgAlt_1']+'" onload="onMasonryGridImgLoaded()"><img src="'+$elemData['imgPath_2']+'" alt="'+$elemData['imgAlt_2']+'" onload="onMasonryGridImgLoaded()" class="telecom_log"></div>'+$elemData['htmlStr_0']+'</div></div>';
					}
					break;
				case 15:// used in maketechhuman top slider Big Slides section - cycle2pager dispType-3
					//print_array($elemData);
					if($elemData['vdoPath_0'])
					{
						$vdoUrl = 'https://www.youtube.com/v/'+$elemData['vdoPath_0']+'?version=3&hl=en_US&rel=0';
						$elem = '<div class="cycle-slide style_2 btstrp-edn2-crd-'+$dispType+'"><a href="'+$vdoUrl+'" player_id="'+$elemData['id_0']+'" data-cycle-title="'+$elemData['text_0']+'" data-cycle-desc="'+$elemData['text_1']+'">'+$elemData['text_0']+'</a><div class="video_overlay"><div class="video_overlay_1"><div class="caption">'+(($elemData['text_1'])?'<p class="ttl no-bg">'+$elemData['text_1']+'</p>':'')+(($elemData['text_0'])?'<p class="subTtl no-bg">'+$elemData['text_0']+'</p>':'')+'</div></div></div></div>';
					}else
					{
						$elem = '<div class="cycle-slide style_2 btstrp-edn2-crd-'+$dispType+'"><div class="slide btstrp-edn2-crd-'+$dispType+'" data-cycle-title="'+$elemData['text_0']+'" data-cycle-desc="'+$elemData['text_1']+'" onclick="javascript:'+$bigSlidesParams['clickScript']+'" '+$bigSlidesParams['cursorStyle']+' clickLnk="'+$elemData['link_0']+'"><img id="'+$elemData['id_0']+'" alt=" " data-src="'+$elemData['imgPath_0']+'" ><div class="img_overlay"><div class="img_overlay_1"><div class="caption">'+(($elemData['text_1'])?'<p class="ttl no-bg">'+$elemData['text_1']+'</p>':'')+(($elemData['text_0'])?'<p class="subTtl no-bg">'+$elemData['text_0']+'</p>':'')+'<div class="btn default large ">'+$elemData['text_2']+'</div></div></div></div></div></div>';
					}
					break;
				case 16:// no text, img on video slide - Big Slides section - cycle2pager dispType-4
					if($elemData['vdoPath_0'])
					{
						$vdoUrl = 'https://www.youtube.com/v/'+$elemData['vdoPath_0']+'?version=3&hl=en_US&rel=0';
						$elem = '<div class="cycle-slide btstrp-edn2-crd-'+$dispType+'"><a href="'+$vdoUrl+'" player_id="'+$elemData['id_0']+'" data-cycle-title="'+$elemData['text_0']+'" data-cycle-desc="'+$elemData['text_1']+'">'+$elemData['text_0']+'</a><div class="video_overlay"><div class="video_overlay_1"></div><div class="media-icon-play-fa"><i class="fa fa-play-circle-o" aria-hidden="true"></i></div><div class="full-height bg-black text-center"><div class="full-width full-height" style="background:url('+$elemData['imgPath_0']+') no-repeat center center; background-size:cover;"></div><!--<img src="'+$elemData['imgPath_0']+'" class="full-width_" style_="margin-top:-25%;"/>--></div></div></div>';
					}else
					{
						$elem = '<div class="cycle-slide btstrp-edn2-crd-'+$dispType+'"><div class="slide btstrp-edn2-crd-'+$dispType+'" data-cycle-title="'+$elemData['text_0']+'" data-cycle-desc="'+$elemData['text_1']+'" onclick="javascript:'+$bigSlidesParams['clickScript']+'" '+$bigSlidesParams['cursorStyle']+' clickLnk="'+$elemData['link_0']+'"><img id="'+$elemData['id_0']+'" alt=" " data-src="'+$elemData['imgPath_0']+'" ><div class="img_overlay"><div class="img_overlay_1"></div></div></div></div>';
					}
					break;
				case 17:// img on video slide with text - Big Slides section - cycle2pager dispType-5
					//print_array($elemData);
					if($elemData['vdoPath_0'])
					{
						$vdoUrl = 'https://www.youtube.com/v/'+$elemData['vdoPath_0']+'?version=3&hl=en_US&rel=0';
						$elem = '<div class="cycle-slide style_2 btstrp-edn2-crd-'+$dispType+'"><a href="'+$vdoUrl+'" player_id="'+$elemData['id_0']+'" data-cycle-title="'+$elemData['text_0']+'" data-cycle-desc="'+$elemData['text_1']+'">'+$elemData['text_0']+'</a><div class="video_overlay"><div class="video_overlay_1"><div class="caption">'+(($elemData['text_1'])?'<p class="ttl no-bg text-center">'+$elemData['text_1']+'</p>':'')+(($elemData['text_0'])?'<p class="subTtl no-bg">'+$elemData['text_0']+'</p>':'')+'</div></div><div class="media-icon-play-fa"><i class="fa fa-play-circle-o" aria-hidden="true"></i></div><div class="full-height bg-black text-center"><div class="full-height bg-black text-center"><div class="full-width full-height" style="background:url('+$elemData['imgPath_0']+') no-repeat center center; background-size:cover;"></div><!--<img src="'+$elemData['imgPath_0']+'" class="full-width_" style_="margin-top:-25%;"/>--></div></div></div>';
					}else
					{
						$elem = '<div class="cycle-slide style_2 btstrp-edn2-crd-'+$dispType+'"><div class="slide btstrp-edn2-crd-'+$dispType+'" data-cycle-title="'+$elemData['text_0']+'" data-cycle-desc="'+$elemData['text_1']+'" onclick="javascript:'+$bigSlidesParams['clickScript']+'" '+$bigSlidesParams['cursorStyle']+' clickLnk="'+$elemData['link_0']+'"><img id="'+$elemData['id_0']+'" alt=" " data-src="'+$elemData['imgPath_0']+'" ><div class="img_overlay"><div class="img_overlay_1"><div class="caption">'+(($elemData['text_1'])?'<p class="ttl no-bg">'+$elemData['text_1']+'</p>':'')+(($elemData['text_0'])?'<p class="subTtl no-bg">'+$elemData['text_0']+'</p>':'')+'</div></div></div></div></div>';
					}
					break;
				case 18:// used in wired latest news section
					if($elemData['linkContentType'] == 'video')
					{
						$elem = '<div class="article btstrp-edn2-crd-'+$dispType+'" > <a href="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'" class="clearfix p-small '+$detailType+'"><div class="thumb"><figure><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'"> <div class="media-icon-play-fa" ><i class="fa fa-play-circle-o" aria-hidden="true"></i></div></figure></div><div class="desc"><div class="byline mb-micro">'+$elemData['text_1']+'</div><h5 class="title exchange-sm">'+$elemData['text_2']+'</h5><div class="byline mt-micro">'+$elemData['text_3']+'</div></div></a> </div><hr>';
					}else
					{
						$elem = '<div class="article btstrp-edn2-crd-'+$dispType+'" > <a href="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'" class="clearfix p-small '+$detailType+'"><div class="thumb"> <img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'"> </div><div class="desc"><div class="byline mb-micro">'+$elemData['text_1']+'</div><h5 class="title exchange-sm">'+$elemData['text_2']+'</h5><div class="byline mt-micro">'+$elemData['text_3']+'</div></div></a> </div><hr>';
					}
					break;
				case 19:// used in wired latest news section
					if($elemData['linkContentType'] == 'video')
					{
						$elem = '<div class="article btstrp-edn2-crd-'+$dispType+'" ><div class="card shadow"> <a href="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'" class="clearfix p-small '+$detailType+'"><div class="thumb"><figure><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'"> <div class="media-icon-play-fa" ><i class="fa fa-play-circle-o" aria-hidden="true"></i></div></figure></div><div class="desc"><div class="byline mb-x-small">'+$elemData['text_1']+'</div><h2 class="title">'+$elemData['text_2']+'</h2><p class="exchange-sm mt-micro">'+$elemData['text_3']+'</p></div></a> </div></div>';
					}else
					{
						$elem = '<div class="article btstrp-edn2-crd-'+$dispType+'" ><div class="card shadow"> <a href="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'" class="clearfix p-small '+$detailType+'"><div class="thumb"> <img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'"> </div><div class="desc"><div class="byline mb-x-small">'+$elemData['text_1']+'</div><h2 class="title">'+$elemData['text_2']+'</h2><p class="exchange-sm mt-micro">'+$elemData['text_3']+'</p></div></a> </div></div>';
					}
					break;
				case 22:// used in Brocade case studies section dispType-1, news dispType-12
					if($elemData['linkContentType'] == 'video')
					{
						$elem = '<div class="article btstrp-edn2-crd-'+$dispType+'" ><div class="card shadow"> <a href="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'" class="clearfix p-small '+$detailType+'" formid="'+$elemData['form_id']+'" refId="'+$elemData['text_0']+'"><div class="thumb"><figure><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'"> <div class="media-icon-play-fa"><i class="fa fa-play-circle-o" aria-hidden="true"></i></div></figure></div><div class="desc"><h2 class="title">'+$elemData['text_1']+'</h2><p class="exchange-sm mt-micro">'+$elemData['text_2']+'</p></div></a> </div></div>';
					}else
					{
						$elem = '<div class="article btstrp-edn2-crd-'+$dispType+'" ><div class="card shadow"> <a href="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'" class="clearfix p-small '+$detailType+'" formid="'+$elemData['form_id']+'" refId="'+$elemData['text_0']+'"><div class="thumb"><figure><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'"> <div class="sprite-bg file-icon btm-right '+$elemData['text_3']+'" style="position: absolute;"></div></figure></div><div class="desc"><h2 class="title">'+$elemData['text_1']+'</h2><p class="exchange-sm mt-micro">'+$elemData['text_2']+'</p></div></a> </div></div>';
					}
					break;
				case 23:// Photo Video Gallery dispType-3
					if($elemData['linkContentType'] == 'video')
					{
						$elem = '<div class="article btstrp-edn2-crd-'+$dispType+'" ><div class="card shadow"> <a href="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'" class="clearfix p-small '+$detailType+'"><div class="thumb"><figure><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'"> <div class="media-icon-play-fa" ><i class="fa fa-play-circle-o" aria-hidden="true"></i></div></figure></div><div class="desc"><h2 class="title">'+$elemData['text_1']+'</h2><p class="exchange-sm mt-micro">'+$elemData['text_2']+'</p></div></a> </div></div>';
					}else
					{
						$elem = '<div class="article btstrp-edn2-crd-'+$dispType+'" ><div class="card shadow"> <a href="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'" class="clearfix p-small '+$detailType+'"><div class="thumb"> <img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'"> </div><div class="desc"><h2 class="title">'+$elemData['text_1']+'</h2><p class="exchange-sm mt-micro">'+$elemData['text_2']+'</p></div></a> </div></div>';
					}
					break;
				case 24:// used in etenergy launch event speakers listing section
					if($elemData['linkContentType'] == 'video')
					{					
						$elem = '<article class="col-md-2 col-sm-3 col-xs-6 gridPadItem btstrp-edn2-crd-'+$dispType+'"><a href'+(($elemData['link_0']=='')?'_':'')+'="'+$elemData['link_0']+'" class="imgframe '+$detailType+' clearfix" data-popupid="'+$elemData['tooltipId']+'" data-hoverpopup="'+JSON.stringify({"text_1":$elemData['text_0'], "text_2":$elemData['text_2'], "text_3":$elemData['text_4']})+'"><figure><img class="unveil" src="'+$elemData['imgPath_default']+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'" onload="onMasonryGridImgLoaded()" /><span class="media-icon-play-fa image-iframe"><i class="fa fa-play-circle-o" aria-hidden="true"></i></span></figure><h5>'+$elemData['text_0']+'</h5><span>'+$elemData['text_2']+'</span>'+($elemData['imgPath_1']?('<figure class="bottom"><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_1']+'" alt="'+$elemData['imgAlt_1']+'" onload="onMasonryGridImgLoaded()"></figure>'):'')+'</a>'+$elemData['htmlStr_0']+'</article>';
					}else
					{
						$elem = '<article class="col-md-2 col-sm-3 col-xs-6 gridPadItem btstrp-edn2-crd-'+$dispType+'"><a href'+(($elemData['link_0']=='')?'_':'')+'="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'" class="imgframe '+$detailType+' clearfix" data-popupid="'+$elemData['tooltipId']+'" data-hoverpopup="'+JSON.stringify({"text_1":$elemData['text_0'], "text_2":$elemData['text_2'], "text_3":$elemData['text_4']})+'"><img class="unveil" src="'+$elemData['imgPath_default']+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'" onload="onMasonryGridImgLoaded()"><h5>'+$elemData['text_0']+'</h5><span>'+$elemData['text_2']+'</span>'+($elemData['imgPath_1']?('<figure class="bottom"><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_1']+'" alt="'+$elemData['imgAlt_1']+'" onload="onMasonryGridImgLoaded()"></figure>'):'')+'</a>'+$elemData['htmlStr_0']+'</article>';
					}
					break;
				case 25:// used in blogs section
					if($elemData['linkContentType'] == 'video')
					{					
						$elem = '<article class="col-md-2 col-sm-3 col-xs-6 gridPadItem btstrp-edn2-crd-'+$dispType+'"><a href'+(($elemData['link_0']=='')?'_':'')+'="'+$elemData['link_0']+'" class="imgframe '+$detailType+' clearfix" data-popupid="'+$elemData['tooltipId']+'" data-hoverpopup="'+JSON.stringify({"text_1":$elemData['text_0'], "text_2":$elemData['text_4'], "text_3":$elemData['text_4']})+'"><figure><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'" onload="onMasonryGridImgLoaded()" /><span class="media-icon-play-fa image-iframe"><i class="fa fa-play-circle-o" aria-hidden="true"></i></span></figure><h5>'+$elemData['text_0']+'</h5><span></a>'+$elemData['htmlStr_0']+'</article>';
					}else
					{
						$elem = '<article class="col-md-2 col-sm-3 col-xs-6 gridPadItem btstrp-edn2-crd-'+$dispType+'"><a href'+(($elemData['link_0']=='')?'_':'')+'="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'" class="imgframe '+$detailType+' clearfix" data-popupid="'+$elemData['tooltipId']+'" data-hoverpopup="'+JSON.stringify({"text_1":$elemData['text_0'], "text_2":$elemData['text_4'], "text_3":$elemData['text_4']})+'"><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'" onload="onMasonryGridImgLoaded()"><h5>'+$elemData['text_0']+'</h5><span>'+$elemData['text_4']+'</span></a>'+$elemData['htmlStr_0']+'</article>';
					}
					break;
				case 26:// webcast dispType-1
					if($elemData['linkContentType'] == 'video')
					{
						$elem = '<div class="article btstrp-edn2-crd-'+$dispType+'" ><div class="card shadow"> <a href="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'" class="clearfix p-small '+$detailType+'"><div class="thumb"><figure><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'"> <div class="media-icon-play-fa" ><i class="fa fa-play-circle-o" aria-hidden="true"></i></div></figure></div><div class="upcoming">'+$elemData['text_0']+'</div><div class="desc"><h2 class="title">'+$elemData['text_1']+'</h2><p class="exchange-sm mt-micro mb-micro">'+$elemData['text_2']+'</p></div></a> <div class="p-small-side-bottom"><div>'+$elemData['htmlStr_0']+'</div><div class="date">'+$elemData['text_4']+'</div>'+$elemData['htmlStr_1']+' </div></div></div>';
					}else
					{
						$elem = '<div class="article btstrp-edn2-crd-'+$dispType+'" ><div class="card shadow"> <a href="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'" class="clearfix p-small '+$detailType+'"><div class="thumb"> <img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'"> </div><div class="upcoming">'+$elemData['text_0']+'</div><div class="desc"><h2 class="title">'+$elemData['text_1']+'</h2><p class="exchange-sm mt-micro mb-micro">'+$elemData['text_2']+'</p></div></a> <div class="p-small-side-bottom"><div>'+$elemData['htmlStr_0']+'</div><div class="date">'+$elemData['text_4']+'</div>'+$elemData['htmlStr_1']+' </div></div></div>';
					}
					break;
				case 27:// used in etenergy launch event speakers listing section
					if($elemData['linkContentType'] == 'video')
					{					
						$elem = '<article class="col-md-2 col-sm-3 col-xs-6 gridPadItem btstrp-edn2-crd-'+$dispType+'"><a href'+(($elemData['link_0']=='')?'_':'')+'="'+$elemData['link_0']+'" class="imgframe '+$detailType+' clearfix" data-popupid="'+$elemData['tooltipId']+'" data-hoverpopup="'+JSON.stringify({"text_1":$elemData['text_0'], "text_2":$elemData['text_2'], "text_3":$elemData['text_4']})+'"><figure><img class="unveil" src="'+$elemData['imgPath_default']+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'" onload="onMasonryGridImgLoaded()" /><span class="media-icon-play-fa image-iframe"><i class="fa fa-play-circle-o" aria-hidden="true"></i></span></figure><div class="caption"><h5>'+$elemData['text_0']+'</h5><span>'+$elemData['text_2']+'</span>'+($elemData['imgPath_1']?('<figure class="bottom"><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_1']+'" alt="'+$elemData['imgAlt_1']+'" onload="onMasonryGridImgLoaded()"></figure>'):'')+'</div></a>'+$elemData['htmlStr_0']+'</article>';
					}else
					{
						$elem = '<article class="col-md-2 col-sm-3 col-xs-6 gridPadItem btstrp-edn2-crd-'+$dispType+'"><a href'+(($elemData['link_0']=='')?'_':'')+'="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'" class="imgframe '+$detailType+' clearfix" data-popupid="'+$elemData['tooltipId']+'" data-hoverpopup="'+JSON.stringify({"text_1":$elemData['text_0'], "text_2":$elemData['text_2'], "text_3":$elemData['text_4']})+'"><img class="unveil" src="'+$elemData['imgPath_default']+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'" onload="onMasonryGridImgLoaded()"><div class="caption"><h5>'+$elemData['text_0']+'</h5><span>'+$elemData['text_2']+'</span>'+($elemData['imgPath_1']?('<figure class="bottom"><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_1']+'" alt="'+$elemData['imgAlt_1']+'" onload="onMasonryGridImgLoaded()"></figure>'):'')+'</div></a>'+$elemData['htmlStr_0']+'</article>';
					}
					break;
				case 28:// used in tata docomo
					if($elemData['linkContentType'] == 'video')
					{
						$elem = '<div class="article btstrp-edn2-crd-'+$dispType+'" ><div class="card shadow"> <a href="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'" class="clearfix p-small '+$detailType+'" refId="'+$elemData['text_0']+'"><div class="thumb"><figure><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'"> <div class="media-icon-play-fa"><i class="fa fa-play-circle-o" aria-hidden="true"></i></div></figure></div><div class="desc"><h2 class="title">'+$elemData['text_1']+'</h2><p class="exchange-sm mt-micro">'+$elemData['text_2']+'</p></div></a><div class="clearfix p-small pt-x-small at-bottom">'+$elemData['htmlStr_0']+'</div></div></div>';		
					}else if($elemData['linkContentType'] == 'ad')
					{
						$elem = '<div class="article btstrp-edn2-crd-'+$dispType+'" ><div class="card ad"><div class="p-small">'+$elemData['htmlStr_0']+'</div></div></div>';
					}else
					{
						$elem = '<div class="article btstrp-edn2-crd-'+$dispType+'" ><div class="card shadow"> <a href="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'" class="clearfix p-small '+$detailType+'" refId="'+$elemData['text_0']+'"><div class="thumb"><figure><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'"> <div class="btm-right embed-icon" style="position: absolute;"><i class="'+ETB2BCompanyUIRenderer.customIconCodes[$elemData['embeddedContentTypes'][0]]+'" aria-hidden="true"></i></div></figure></div><div class="desc"><h2 class="title">'+$elemData['text_1']+'</h2><p class="exchange-sm mt-micro">'+$elemData['text_2']+'</p></div></a><div class="clearfix btnBar ">'+(($elemData['embeddedContentTypes'][0] == 'video')?'<span><a href="'+$elemData['link_0']+'" class=" btn main-color">PLAY</a><a href="'+$elemData['link_0']+'" class="btn bg-grey-a">READ</a></span>':'<span><a href="'+$elemData['link_0']+'" class="btn bg-grey-a">READ</a></span>')+'</div><div class="clearfix p-small pt-x-small at-bottom">'+$elemData['htmlStr_0']+'</div></div></div>';
					}
					break;
				case 29:// used in tata docomo
					if($elemData['linkContentType'] == 'video')
					{
						$elem = '<div class="article btstrp-edn2-crd-'+$dispType+'" ><div class="card shadow p-small "> <a href="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'" class="clearfix '+$detailType+'" formid="'+$elemData['form_id']+'" refId="'+$elemData['text_0']+'"><div class="thumb"><figure><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'"> <div class="media-icon-play-fa"><i class="fa fa-play-circle-o" aria-hidden="true"></i></div></figure></div><div class="desc"><h2 class="title">'+$elemData['text_1']+'</h2><p class="exchange-sm mb-micro">'+$elemData['text_2']+'</p></div></a><div class="clearfix mb-small at-bottom">'+$elemData['htmlStr_0']+'</div></div></div>';		
					}else if($elemData['linkContentType'] == 'ad')
					{
						$elem = '<div class="article btstrp-edn2-crd-'+$dispType+'" ><div class="card shadow p-small ad">'+$elemData['htmlStr_0']+'</div></div>';
					}else
					{
						$elem = '<div class="article btstrp-edn2-crd-'+$dispType+'" ><div class="card shadow p-small "> <a href="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'" class="clearfix '+$detailType+'" formid="'+$elemData['form_id']+'" refId="'+$elemData['text_0']+'"><div class="thumb"><figure><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'">'+((!$elemData['embeddedContentTypes'])?'':'<div class="center embed-icon"><i class="'+ETB2BCompanyUIRenderer.customIconCodes[$elemData['embeddedContentTypes'][0]]+'" aria-hidden="true"></i></div>')+'</figure></div><div class="desc"><h2 class="title">'+$elemData['text_1']+'</h2><p class="exchange-sm mb-micro">'+$elemData['text_2']+'</p></div></a><!--<div class="clearfix btnBar ">'+((!$elemData['embeddedContentTypes'])?'':(($elemData['embeddedContentTypes'][0] == 'video')?'<span><a href="'+$elemData['link_0']+'" class=" btn main-color">PLAY</a><a href="'+$elemData['link_0']+'" class="btn bg-grey-a">READ</a></span>':'<span><a href="'+$elemData['link_0']+'" class="btn bg-grey-a">READ</a></span>'))+'</div>-->'+$elemData['htmlStr_0']+$elemData['htmlStr_1']+'</div></div>';
					}
					break;
				case 30:// used in tata docomo
					if($elemData['linkContentType'] == 'video')
					{
						$elem = '<div class="article btstrp-edn2-crd-'+$dispType+'" ><div class="card shadow"> <a href="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'" class="clearfix p-small '+$detailType+'" refId="'+$elemData['text_0']+'"><div class="thumb"><figure><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'"> <div class="media-icon-play-fa"><i class="fa fa-play-circle-o" aria-hidden="true"></i></div></figure></div><div class="desc"><h2 class="title">'+$elemData['text_1']+'</h2><p class="exchange-sm mt-micro">'+$elemData['text_2']+'</p></div></a><div class="clearfix p-small pt-x-small at-bottom">'+$elemData['htmlStr_0']+'</div></div></div>';
					}else if($elemData['linkContentType'] == 'ad')
					{
						$elem = '<div class="article btstrp-edn2-crd-'+$dispType+'" ><div class="card ad"><div class="p-small">'+$elemData['htmlStr_0']+'</div></div></div>';
					}else
					{
						$elem = '<div class="article btstrp-edn2-crd-'+$dispType+'" ><div class="card shadow"> <a href="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'" class="clearfix p-small '+$detailType+'" refId="'+$elemData['text_0']+'"><div class="thumb"><figure><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'"> <div class="btm-right embed-icon" style="position: absolute;"><i class="'+ETB2BCompanyUIRenderer.customIconCodes[$elemData['embeddedContentTypes'][0]]+'" aria-hidden="true"></i></div></figure></div><div class="desc"><h2 class="title">'+$elemData['text_1']+'</h2><p class="exchange-sm mt-micro">'+$elemData['text_2']+'</p></div></a><div class="clearfix btnBar ">'+(($elemData['embeddedContentTypes'][0] == 'video')?'<span><a href="'+$elemData['link_0']+'" class=" btn main-color">PLAY</a><a href="'+$elemData['link_0']+'" class="btn bg-grey-a">READ</a></span>':'<span><a href="'+$elemData['link_0']+'" class="btn bg-grey-a">READ</a></span>')+'</div><div class="clearfix p-small pt-x-small at-bottom">'+$elemData['htmlStr_0']+'</div></div></div>';
					}
					break;
				case 32:// used in tata docomo
					if($elemData['linkContentType'] == 'video')
					{
						$elem = '<div class="clm btstrp-edn2-crd-'+$dispType+'" ><figure><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'"><div class="overlay-black-t82"></div><figcaption>'+$elemData['text_1']+'</figcaption><div class="media-icon-play-fa"><i class="fa fa-play-circle-o" aria-hidden="true"></i></div><div class="desc"><div class="inner"><a href="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'" class="clearfix '+$detailType+'" formid="'+$elemData['form_id']+'" refId="'+$elemData['text_0']+'"><h3>'+$elemData['text_1']+'</h3><p>'+$elemData['text_2']+'</p></a><div class="clearfix p-small pt-x-small at-bottom">'+$elemData['htmlStr_0']+'</div></div></div></figure></div>';
					}else if($elemData['linkContentType'] == 'ad')
					{
						$elem = '<div class="clm btstrp-edn2-crd-'+$dispType+'" ><figure class="ad">'+$elemData['htmlStr_0']+'</figure></div>';
					}else
					{
						$elem = '<div class="clm btstrp-edn2-crd-'+$dispType+'" ><figure><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'"><div class="overlay-black-t82"></div><figcaption>'+$elemData['text_1']+'</figcaption>'+((!$elemData['embeddedContentTypes'])?'':('<div class="center embed-icon" style="position: absolute;"><i class="'+ETB2BCompanyUIRenderer.customIconCodes[$elemData['embeddedContentTypes'][0]]+'" aria-hidden="true"></i></div>'))+'<div class="desc"><div class="inner"><a href="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'" class="clearfix '+$detailType+'" formid="'+$elemData['form_id']+'" refId="'+$elemData['text_0']+'"><h3>'+$elemData['text_1']+'</h3><p>'+$elemData['text_2']+'</p></a><div class="clearfix btnBar ">'+((!$elemData['embeddedContentTypes'])?'':(($elemData['embeddedContentTypes'][0] == 'video')?'<span><a href="'+$elemData['link_0']+'" class=" btn main-color">PLAY</a><a href="'+$elemData['link_0']+'" class="btn bg-grey-a">READ</a></span>':'<span><a href="'+$elemData['link_0']+'" class="btn bg-grey-a">READ</a></span>'))+'</div><div class="clearfix">'+$elemData['htmlStr_0']+'</div></div></div></figure></div>';
					}
					break;
				case 33:// Photo Video Gallery dispType-4
					$playIcon = ($elemData['linkContentType'] == 'video')?'<div class="media-icon-play-fa" ><i class="fa fa-play-circle-o" aria-hidden="true"></i></div>':'';		
					$elem = '<div class="jgitem btstrp-edn2-crd-'+$dispType+'"><img class="unveil_" data-src="'+ET_DEFAULT_IMG_URL+'" src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'" onload_="onJustifiedGaleryImgLoaded()" height="300"/><div class="interaction-view"><div class="photo-list-photo-interaction"><a href="'+$elemData['link_0']+'" class="jg-overlay '+$detailType+'" caption="'+$elemData['text_1']+'" socialsharebar="'+htmlspecialchars($elemData['htmlStr_0'])+'" data-gallery="'+$elemData['listData']['src']+'" data-caption="'+$elemData['listData']['caption']+'" data-socialsharebar="'+$elemData['listData']['socialsharebar']+'">'+$playIcon+'</a><div class="interaction-bar"><div class="text"><a class="title" href="javascript:void(0);"  onclick="$(this).parent().parent().prev().trigger(\'click\');">'+ $elemData['text_1'] +'</a><a class="attribution" href="javascript:void(0);" onclick="$(this).parent().parent().prev().trigger(\'click\');">'+ $elemData['text_2'] +'</a></div><div class="tool">'+$elemData['htmlStr_0']+'</div></div></div></div></div>';
					break;
				case 36:// used in wired latest news section
					if($elemData['linkContentType'] == 'video')
					{
						$elem = '<div class="article btstrp-edn2-crd-'+$dispType+'" > <a href="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'" class="clearfix '+$detailType+'" formid="'+$elemData['form_id']+'" refId="'+$elemData['text_0']+'"><div class="thumb"><figure><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'"> <div class="media-icon-play-fa" ><i class="fa fa-play-circle-o" aria-hidden="true"></i></div></figure></div><div class="desc"><h5 class="title exchange-sm">'+$elemData['text_1']+'</h5><div class="byline mb-micro">'+$elemData['text_2']+'</div></div></a> </div><hr>';
					}else
					{
						$elem = '<div class="article clearfix  btstrp-edn2-crd-'+$dispType+'" > <a href="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'" class="'+$detailType+'" formid="'+$elemData['form_id']+'" refId="'+$elemData['text_0']+'"><div class="thumb"><a href="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'" class="'+$detailType+'" formid="'+$elemData['form_id']+'" refId="'+$elemData['text_0']+'"><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'"></a></div><div class="desc"><h5 class="title exchange-sm"><a href="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'" class="'+$detailType+'" formid="'+$elemData['form_id']+'" refId="'+$elemData['text_0']+'">'+$elemData['text_1']+'</a></h5><div class="byline mb-micro"><a href="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'" class="'+$detailType+'" formid="'+$elemData['form_id']+'" refId="'+$elemData['text_0']+'">'+$elemData['text_2']+'</a></div>'+((!$elemData['htmlStr_0'])?'':$elemData['htmlStr_0'])+'</div></div><hr>';
					}
					break;
				case 38:// used in lenovo case study dispType-4
					$playIcon = ($elemData['linkContentType'] == 'video')?'<a href="'+$elemData['link_0']+'" class="imgframe '+$detailType+'"><div class="media-icon-play-fa" ><i class="fa fa-play-circle-o" aria-hidden="true"></i></div></a>':'';
					$elem = '<article class="row btstrp-edn2-crd-'+$dispType+'"><div class="col-lg-6 col-md-6 image" ><a href="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'" class="'+$detailType+'" formid="'+$elemData['form_id']+'" refId="'+$elemData['text_5']+'"><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'">'+$playIcon+'</a></div><div class="col-lg-6 col-md-6 col-lg-offset-6 col-md-offset-6 desc padding-medium main-color"><a href="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'" class="'+$detailType+'" formid="'+$elemData['form_id']+'" refId="'+$elemData['text_5']+'"><h2><span>'+$elemData['text_0']+'</span>'+$elemData['text_1']+'</h2><p>'+$elemData['text_2']+'</p></a>'+$elemData['htmlStr_0']+'</div></article>';
					break;
				case 39:// used in lenovo case study dispType-4
					$playIcon = ($elemData['linkContentType'] == 'video')?'<a href="'+$elemData['link_0']+'" class="imgframe '+$detailType+'"><div class="media-icon-play-fa" ><i class="fa fa-play-circle-o" aria-hidden="true"></i></div></a>':'';
					$elem = '<article class="row btstrp-edn2-crd-'+$dispType+'"><div class="col-lg-6 col-md-6 image right" ><a href="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'" class="'+$detailType+'" formid="'+$elemData['form_id']+'" refId="'+$elemData['text_5']+'"><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'">'+$playIcon+'</a></div><div class="col-lg-6 col-md-6 desc padding-medium main-color"><a href="'+$elemData['link_0']+'" target="'+$elemData['link_0_target']+'" class="'+$detailType+'" formid="'+$elemData['form_id']+'" refId="'+$elemData['text_5']+'"><h2><span>'+$elemData['text_0']+'</span>'+$elemData['text_1']+'</h2><p>'+$elemData['text_2']+'</p></a>'+$elemData['htmlStr_0']+'</div></article>';
					break;
				case 40:// used in tata docomo
					if($elemData['linkContentType'] == 'video')
					{
						$elem = '<div class="article  btstrp-edn2-crd-'+$dispType+'" ><div class="card shadow"> <a '+(($elemData['link_0'])?''+(($elemData['link_0'])?('href="'+$elemData['link_0']+'"'):'')+'':'')+' target="'+$elemData['link_0_target']+'" class="clearfix '+$detailType+($elemData['link_0']?'':' nolink')+'" refId="'+$elemData['text_0']+'"><figure><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'"> <div class="media-icon-play-fa"><i class="fa fa-play-circle-o" aria-hidden="true"></i></div></figure></a> <a '+(($elemData['link_0'])?''+(($elemData['link_0'])?('href="'+$elemData['link_0']+'"'):'')+'':'')+' target="'+$elemData['link_0_target']+'" class="clearfix p-small '+$detailType+$detailType+($elemData['link_0']?'':' nolink')+'" refId="'+$elemData['text_0']+'"><div class="desc"><h2 class="title">'+$elemData['text_1']+'</h2><p class="exchange-sm mt-micro">'+$elemData['text_2']+'</p></div></a>'+($elemData['link_0']?('<div class="clearfix p-small pt-x-small at-bottom">'+$elemData['htmlStr_0']+'</div>'):'')+'</div></div>';		
					}else if($elemData['linkContentType'] == 'ad')
					{
						$elem = '<div class="article  btstrp-edn2-crd-'+$dispType+'" ><div class="card ad">'+$elemData['htmlStr_0']+'</div></div>';
					}else
					{
						$elem = '<div class="article  btstrp-edn2-crd-'+$dispType+'" ><div class="card shadow"> <a '+(($elemData['link_0'])?''+(($elemData['link_0'])?('href="'+$elemData['link_0']+'"'):'')+'':'')+' target="'+$elemData['link_0_target']+'" class="clearfix '+$detailType+($elemData['link_0']?'':' nolink')+'" refId="'+$elemData['text_0']+'"><figure><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'"> <div class="center embed-icon" style="position: absolute;"><i class="'+ETB2BCompanyUIRenderer.customIconCodes[$elemData['embeddedContentTypes'][0]]+'" aria-hidden="true"></i></div></figure></a><a '+(($elemData['link_0'])?''+(($elemData['link_0'])?('href="'+$elemData['link_0']+'"'):'')+'':'')+' target="'+$elemData['link_0_target']+'" class="clearfix p-small '+$detailType+($elemData['link_0']?'':' nolink')+'" refId="'+$elemData['text_0']+'"><div class="desc"><h2 class="title">'+$elemData['text_1']+'</h2><p class="exchange-sm mt-micro">'+$elemData['text_2']+'</p></div></a>'+(($elemData['link_0'])?('<div class="clearfix btnBar ">'+(($elemData['embeddedContentTypes'][0] == 'video')?'<span><a '+(($elemData['link_0'])?('href="'+$elemData['link_0']+'"'):'')+' class=" btn main-color">PLAY</a><a href="'+$elemData['link_0']+'#dtltxtblk" class="btn bg-grey-a">READ</a></span>':'<span><a href="'+$elemData['link_0']+'#dtltxtblk" class="btn bg-grey-a">READ</a></span>')+'</div><div class="clearfix p-small pt-x-small at-bottom">'+$elemData['htmlStr_0']+'</div>'):'')+'</div></div>';
					}
					break;
				case 43:// used in tata docomo
					if($elemData['linkContentType'] == 'video')
					{
						$elem = '<div class="article  btstrp-edn2-crd-'+$dispType+'" ><div class="card shadow"> <a '+(($elemData['link_0'])?'href="'+$elemData['link_0']+'"':'')+' target="'+$elemData['link_0_target']+'" class="clearfix '+$detailType+($elemData['link_0']?'':' nolink')+'" refId="'+$elemData['text_0']+'"><figure><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'"> <div class="media-icon-play-fa"><i class="fa fa-play-circle-o" aria-hidden="true"></i></div></figure></a> <a '+(($elemData['link_0'])?'href="'+$elemData['link_0']+'"':'')+' target="'+$elemData['link_0_target']+'" class="clearfix p-small '+$detailType+$detailType+($elemData['link_0']?'':' nolink')+'" refId="'+$elemData['text_0']+'">'+(($elemData['imgPath_0_tiny'])?('<img class="unveil tiny" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0_tiny']+'" >'):'')+'<div class="desc"><h2 class="title">'+$elemData['text_1']+'</h2><p class="exchange-sm mt-micro">'+$elemData['text_2']+'</p></div></a>'+'</div></div>';
								  /*($elemData['link_0']?('<div class="clearfix p-small pt-x-small at-bottom">'+$elemData['htmlStr_0']+'</div>'):'')+'</div></div>';*/
		
					}else if($elemData['linkContentType'] == 'ad')
					{
						$elem = '<div class="article  btstrp-edn2-crd-'+$dispType+'" ><div class="card ad">'+$elemData['htmlStr_0']+'</div></div>';
					}else
					{
						$elem = '<div class="article  btstrp-edn2-crd-'+$dispType+'" ><div class="card shadow"> <a '+(($elemData['link_0'])?'href="'+$elemData['link_0']+'"':'')+' target="'+$elemData['link_0_target']+'" class="clearfix '+$detailType+($elemData['link_0']?'':' nolink')+'" refId="'+$elemData['text_0']+'"><figure><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'"> <div class="center embed-icon" style="position: absolute;"><i class="'+ETB2BCompanyUIRenderer.customIconCodes[$elemData['embeddedContentTypes'][0]]+'" aria-hidden="true"></i></div></figure></a><a '+(($elemData['link_0'])?'href="'+$elemData['link_0']+'"':'')+' target="'+$elemData['link_0_target']+'" class="clearfix p-small '+$detailType+($elemData['link_0']?'':' nolink')+'" refId="'+$elemData['text_0']+'">'+(($elemData['imgPath_0_tiny'])?('<img class="unveil tiny" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0_tiny']+'" >'):'')+'<div class="desc"><h2 class="title">'+$elemData['text_1']+'</h2><p class="exchange-sm mt-micro">'+$elemData['text_2']+'</p></div></a>'+'</div></div>';
								  /*(($elemData['link_0'])?('<div class="clearfix btnBar ">'.(($elemData['embeddedContentTypes'][0] == 'video')?'<span><a href="'.$elemData['link_0'].'" class=" btn main-color">PLAY</a><a href="'.$elemData['link_0'].'#dtltxtblk" class="btn bg-grey-a">READ</a></span>':'<span><a href="'.$elemData['link_0'].'#dtltxtblk" class="btn bg-grey-a">READ</a></span>').'</div><div class="clearfix p-small pt-x-small at-bottom">'.$elemData['htmlStr_0'].'</div>'):'').'</div></div>';*/
					}
					break;
				case 44:
					 var $refid=typeof $elemData['text_0']=="string"?$elemData['text_5']:$elemData['text_0'];
					$elem = '<div class="col-md-4 gridPadItem"><div class="article btstrp-edn2-crd-'+$dispType+'"><figure><a '+(($elemData['link_0'])?''+(($elemData['link_0'])?('href="'+$elemData['link_0']+'"'):'')+'':'')+' target="'+$elemData['link_0_target']+'" class="clearfix '+$detailType+($elemData['link_0']?'':' nolink')+'" formid="'+$elemData['form_id']+'" refId="'+$refid+'"><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'" /></a></figure><div class="desc"><h3><a '+(($elemData['link_0'])?''+(($elemData['link_0'])?('href="'+$elemData['link_0']+'"'):'')+'':'')+' target="'+$elemData['link_0_target']+'" class="clearfix '+$detailType+($elemData['link_0']?'':' nolink')+'" formid="'+$elemData['form_id']+'" refId="'+$refid+'">'+$elemData['text_1']+'</a></h3><p>'+($elemData['text_2']?$elemData['text_2']:$elemData['text_1'])+'</p><a '+(($elemData['link_0'])?''+(($elemData['link_0'])?('href="'+$elemData['link_0']+'"'):'')+'':'')+' target="'+$elemData['link_0_target']+'" class="more '+$detailType+($elemData['link_0']?'':' nolink')+'" formid="'+$elemData['form_id']+'" refId="'+$refid+'">KNOW MORE <i class="fa fa-angle-right"></i></a></div></div></div>';
					break;
				case 49:// used in gehealthierindia home page interview section
					$playIcon = ($elemData['linkContentType'] == 'video')?'<div class="media-icon-play-fa"><i class="fa fa-play-circle-o" aria-hidden="true"></i></div>':'';
					$elem = '<div class="article btstrp-edn2-crd-'+$dispType+'"><a '+(($elemData['link_0'])?('href="'+$elemData['link_0']+'"'):'')+' class="'+$detailType+'"><h2>'+$elemData['text_1']+'</h2></a>'+($elemData['imgPath_0']?'<figure><a '+(($elemData['link_0'])?('href="'+$elemData['link_0']+'"'):'')+' class="'+$detailType+'"><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0_wide']+'" alt="'+$elemData['imgAlt_0']+'"  onload="onMasonryGridImgLoaded()"  />'+$playIcon+'</a></figure>':'')+'<p>'+$elemData['text_2']+'</p><p class="footer"><img class="unveil" src="'+ET_DEFAULT_IMG_URL+'" data-src="'+$elemData['imgPath_0']+'" alt="'+$elemData['imgAlt_0']+'"  /><span>'+$elemData['text_0']+'</span><span>'+$elemData['text_3']+'</span></p></div>';
					break;
			}
			return $elem;
		}
	];
}