// JavaScript Document
function etb2b_slideshow(obj)
{
	/*
	for(n in obj)
	{
		console.log(n + ': ');
		console.log(obj[n]);
	}
	*/
	var slidesData = [
		{imgUrl:'Hydrangeas.jpg',description:{title:'T1', detail:'Detail of first slide.'}}, 
		{imgUrl:'Chrysanthemum.jpg',description:{title:'Title 2', detail:'Detail of second slide.'}}, 
		{imgUrl:'Desert.jpg',description:{title:'Third Title', detail:'Detail of third slide.'}}, 
		{imgUrl:'Penguins.jpg',description:{title:'T 4', detail:'Detail of fourth slide.'}}, 
		{imgUrl:'media_cover.png',description:{title:'T 5', detail:'Detail of fifth slide.'}}, 
		{imgUrl:'Lighthouse.jpg',description:{title:'6 title', detail:'Detail of sixth slide.'}}
		];
	var curSlideIndex = -1;
	var showMode = 0;
	
	//var sliderHolder;
	var showHolder = obj.showHolder;
	var showHolderId = showHolder.attr('id');
	var playPauseBtn = obj.playPauseBtn;
	var nextBtn = obj.nextBtn;
	var prevBtn = obj.previousBtn;
	var showTitleHolder = obj.showTitleHolder;
	var slideTitleHolder = obj.slideTitleHolder;
	var slideMetaHolder = obj.slideMetaHolder;
	var detailHolder = obj.detailHolder;
	var showTitle = obj.showTitle;
	//var counterHolder = obj.counterHolder;
	var slideTime = (obj.slideStayDuration)?obj.slideStayDuration:3000;
	var transitionDuration = (obj.transitionDuration)?obj.transitionDuration:400;
	var transitionType = 'sliding_hoizontal';
	
	var nav;
	var slideElemArr = [];
	var slideImgDimensionArr = [];
	var loadedSlideImgArr = [];
	var loadTryLimit = 2;
	var loadTryCount = 0;
	
	var timeout;
	var numImg;
	var imgDir = '';
	var imgArr = [];
	var loadComplete = false;
	
	var imgDivInView = 0;
	var imgDivWidth = (obj.showPref.slideWidth)?obj.showPref.slideWidth:200;
	var imgDivHeight = (obj.showPref.slideHeight)?obj.showPref.slideHeight:100;
	
	var onCompleteParams = obj.showPref.onCompleteParams;
	
	var slideChangedFunc = obj.showPref.slideChangedCallback;
	var slideImageLoadedFunc = obj.showPref.slideImageLoadedCallback;
	var slideTransitionCompletedFunc = obj.showPref.slideTransitionCompleteCallback;
	
	var navKeyActive = true;
	
	var navByUser = false;
	var reloadUrl = (obj.reloadUrl)?obj.reloadUrl:'';
	
	playPauseBtn.hide();
	prevBtn.hide();
	nextBtn.hide();
	
	if(obj.slidesData)slidesData = obj.slidesData;
	numImg = slidesData.length;
	if(obj.showPref.curSlideIndex)
	{
		if((obj.showPref.curSlideIndex > -1) && (obj.showPref.curSlideIndex < numImg))
		{
			curSlideIndex = obj.showPref.curSlideIndex - 1;
		}
	}
	//if(obj.showPref.autoPlay != undefined)showMode = Number(obj.showPref.autoPlay);
	
	if(numImg>0)
	{
		for(var i=0; i<numImg; i++)
		{
			imgArr.push(slidesData[i]['imgUrl']);
		}	
	}
	
	var sliderHolder = $("<div>");
	sliderHolder.css({'position':'relative', 'overflow':'hidden', 'width':'100%', 'height':imgDivHeight});
	showHolder.css({width:imgDivWidth});
	showHolder.append(sliderHolder);
	var imagesPan = $("<div>");;
	createImagesPan();
	
	showNext();
	if(obj.showPref.autoPlay)
	{
		//showNext();
		onPlayPause();
	}else
	{
		//showNext();
		animateSlide(1);
	}
	
	nextBtn.click(function(){onNext();});
	prevBtn.click(function(){onPrev();});
	playPauseBtn.click(onPlayPause);
	
	playPauseBtn.show();
	prevBtn.show();
	nextBtn.show();
	
	/*
	this.setSlidesData = function(obj)
	{
		if(obj.slidesArr)slidesData = obj.slidesArr;
		numImg = slidesData.length;
		if(numImg == 0)return;
		if(obj.curSlideIndex)
		{
			if((obj.curSlideIndex > -1) && (obj.curSlideIndex < numImg))
			{
				curSlideIndex = obj.curSlideIndex - 1;
			}
		}
		if(obj.autoPlay)showMode = obj.autoPlay;
		if(numImg>0)
		{
			for(var i=0; i<numImg; i++)
			{
				imgArr.push(slidesData[i]['imgUrl']);
			}	
		}
		showNext();
	}
	*/
	
	function createImagesPan()
	{
		var numHolders = numImg;
		//imagesPan = document.createElement('div');
		//imagesPan.setAttribute('style', 'width:'+sliderHolder.innerWidth()*numHolders+'px;');
		//imagesPan.setAttribute('id', showHolderId + '_imagesPan');
		imagesPan.attr('id', showHolderId + '_imagesPan');
		//imagesPan.setAttribute('style', 'position:relative; top:0px; width:'+ (imgDivWidth*numImg) +'px; left:'+ (imgDivWidth*(curSlideIndex+1)*-1) +'px;');
		imagesPan.attr('style', 'position:relative; top:0px; width:'+ (imgDivWidth*numImg) +'px; left:'+ (imgDivWidth*(curSlideIndex+1)*-1) +'px;');
		var imgHolder;
		//var rndCol = '#000';
		var rndCol = 'transparent';
		var i;
		for(i=0; i<numHolders; i++)
		{
			//imgHolder = document.createElement('div');
			imgHolder = $('<table>');
			//imgHolder.setAttribute('id', showHolderId + '_imgDiv_'+i);
			imgHolder.attr({id:showHolderId + '_imgDiv_'+i});
			//rndCol = '#' + getRandomInteger(1) + getRandomInteger(1) + getRandomInteger(1);
			//imgHolder.setAttribute('style','float:left; width:400px; height:50px; background-color:#'+ getRandomInteger(1) + getRandomInteger(1) + getRandomInteger(1) +';');
			//imgHolder.setAttribute('style','position:absolute; top:0; left:'+ (200*i) +'px; width:200px; height:50px; background-color:'+ rndCol +';');
			//imgHolder.setAttribute('style','float:left; width:'+ imgDivWidth +'px; height:'+ imgDivWidth +'px; overflow:hidden; background-color:'+ rndCol +';');
			//imgHolder.setAttribute('style','/*float:left;*/ text-align:center; vertical-align:middle; display:table-cell; width:'+ imgDivWidth +'px; height:'+ imgDivHeight +'px; overflow:hidden; background-color:'+ rndCol +';');
			//imgHolder.attr({style:'/*float:left;*/ text-align:center; vertical-align:middle; display:table-cell; width:'+ imgDivWidth +'px; height:'+ imgDivHeight +'px; overflow:hidden; background-color:'+ rndCol +';'});
			imgHolder.attr({style:'table-layout:fixed; float:left; text-align:center; vertical-align:middle; width:'+ imgDivWidth +'px; height:'+ imgDivHeight +'px; overflow:hidden; background-color:'+ rndCol +';'});
			//imagesPan.appendChild(imgHolder);
			imagesPan.append(imgHolder);
		}
		sliderHolder.append(imagesPan);
	}
	function getRandomInteger(numDigit)
	{
		return Math.floor((Math.random() * Math.pow(10,numDigit)));
	}
	function onPlayPause()
	{
		//console.log('onPlayPause');
		//if(!loadComplete)return;
		clearTimeout(timeout);
		if(showMode==0)
		{
			//nav.style.visibility = 'hidden';
			//playPauseBtn.css('background-position', "0 -28px");
			playPauseBtn.addClass('playing');
			showMode = 1;
			/*
			showNext();
			animateSlide(1);
			*/
			startTimout();
		}else if(showMode==1)
		{
			//clearTimeout(timeout);
			//playPauseBtn.css('background-position', "0 0");
			playPauseBtn.removeClass('playing');
			showMode = 0;
			//nav.style.visibility = 'visible';
		}
	}
	
	function startTimout()
	{
		navByUser = false;
		timeout = setTimeout(onTimeout, slideTime);
	}
	
	function onTimeout()
	{
		showNext();
		animateSlide(1);
		//startTimout();
	}
	
	function createSlide(slideIndex)
	{
		//console.log('createSlide: ' + slideIndex + ' src ' + slidesData[slideIndex]['imgUrl']);
		if(!slideElemArr[slideIndex])
		{
			//var imgElem = document.createElement('img');
			var imgElem = $('<img>');
			/*
			imgElem.setAttribute('id', showHolderId + '_img_'+slideIndex);
			imgElem.setAttribute('src', imgDir+slidesData[slideIndex]['imgUrl']);
			*/
			imgElem.attr({id:showHolderId + '_img_'+slideIndex, src:imgDir+slidesData[slideIndex]['imgUrl'], alt:((slidesData[slideIndex]['description']['title'])?slidesData[slideIndex]['description']['title']:showTitle)});
			//imgElem.setAttribute('width' , sliderHolder.innerWidth());
			//imgElem.setAttribute('height' , sliderHolder.clientHeight);
			//imgElem.setAttribute('style' , "position:relative; display:table-row; width:inherit;");			
			//imgElem.setAttribute('style' , "max-width:100%; max-height:100%");
			imgElem.attr({style:"max-height:100%;"});
			
			var imgTr = $('<tr>');
			var imgTd = $('<td>');
			imgTd.attr({id:showHolderId+'_imgTd_'+slideIndex, style:'vertical-align:middle;', width:'100%'});
			imgTd.append(imgElem);
			imgTr.append(imgTd);
			//imgDiv.append(imgTr);
			
			//$(imgElem).unbind("load");
			$(imgElem).bind("load", function () {			
			   //console.log(slideIndex + ': ' + this.width + "," + this.height);
			   slideImgDimensionArr[slideIndex]	= {width:this.width, height:this.height};
			   if(slideImageLoadedFunc)slideImageLoadedFunc(slideIndex, {dimension:{width:this.width, height:this.height}});
			   onSlideImageLoaded(slideIndex, true);	
			});
			//imgElem.onload = function(){onSlideImageLoaded(slideIndex, true);};			
			imgElem.onerror = function(){onSlideImageLoaded(slideIndex, false);};
						
			slideElemArr[slideIndex] = imgTr;
		}
	}
	
	function showNextX(count)
	{
		if(curSlideIndex == (numImg-1))
		{
			curSlideIndex = 0
		}else
		{
			curSlideIndex++;
		
		}
		if(!slideElemArr[curSlideIndex])createSlide(curSlideIndex);
		/*
		if(curSlideIndex == 0)
		{
			//if(slideElemArr[numImg-1])sliderHolder.removeChild(slideElemArr[numImg-1]);
			if(slideElemArr[numImg-1])$(slideElemArr[numImg-1]).remove();
		}else
		{
			//if(slideElemArr[curSlideIndex-1])sliderHolder.removeChild(slideElemArr[curSlideIndex-1]);
			if(slideElemArr[curSlideIndex-1])$((slideElemArr[curSlideIndex-1])).remove();
		}
		*/
		updateSlide();
		animateSlide(1);
	}
	function showNext(count)
	{
		if(!count)count = 1;
		//console.log('showNext count: ' + count);
		if(curSlideIndex == (numImg-count))
		{
			if(onCompleteParams)
			{
				if(onCompleteParams['loop'] == false)
				{
					if(onCompleteParams['link'])
					{
						window.open(onCompleteParams['link'], ((onCompleteParams['target'])?onCompleteParams['target']:'_self'));
					}
				}else
				{
					curSlideIndex = 0;
				}
			}else
			{
				curSlideIndex = 0;
			}
		}else
		{
			curSlideIndex += count;
		
		}
		//console.log('curSlideIndex: ' + curSlideIndex);
		if(!slideElemArr[curSlideIndex])createSlide(curSlideIndex);
		updateSlide();
		//animateSlide(1);
	}
	
	function showPrevX()
	{
		if(curSlideIndex == 0)
		{
			curSlideIndex = numImg-1;
		}else
		{
			curSlideIndex--;
		
		}
		if(!slideElemArr[curSlideIndex])createSlide(curSlideIndex);
		/*
		if(curSlideIndex == (numImg-1))
		{
			//if(slideElemArr[0])sliderHolder.removeChild(slideElemArr[0]);
			if(slideElemArr[0])$(slideElemArr[0]).remove();
		}else
		{
			//if(slideElemArr[curSlideIndex+1])sliderHolder.removeChild(slideElemArr[curSlideIndex+1]);
			if(slideElemArr[curSlideIndex+1])$(slideElemArr[curSlideIndex+1]).remove();
		}
		*/
		updateSlide();
		animateSlide(-1);
	}
	
	function showPrev(count)
	{
		if(!count)count = 1;
		//console.log('showPrev count: ' + count);
		if(curSlideIndex == 0)
		{
			curSlideIndex = numImg-count;
		}else
		{
			curSlideIndex-= count;
		
		}
		if(!slideElemArr[curSlideIndex])createSlide(curSlideIndex);
		
		updateSlide();
		//animateSlide(-1);
	}
	
	function updateSlide()
	{
		//console.log('updateSlide: ' + curSlideIndex);
		//sliderHolder.appendChild(slideElemArr[curSlideIndex]);
		//sliderHolder.append(slideElemArr[curSlideIndex]);
		//console.log(slidesData[curSlideIndex]);
		//slideTitleHolder.innerText = slidesData[curSlideIndex]['description']['title'];
		slideTitleHolder.text(slidesData[curSlideIndex]['description']['title']);
		if(slideMetaHolder)
		slideMetaHolder.text(slidesData[curSlideIndex]['meta']['artdate']);
		//detailHolder.innerText = slidesData[curSlideIndex]['description']['detail'];
		detailHolder.html(slidesData[curSlideIndex]['description']['detail']);
		//counterHolder.innerText = (curSlideIndex+1) + ' of ' + numImg;
		//counterHolder.text((curSlideIndex+1) + ' of ' + numImg);
		
		/*
		var imgDivInQue = $('#imgDiv_'+Number(!Boolean(imgDivInView)));
		imgDivInQue.empty();
		imgDivInQue.append(slideElemArr[curSlideIndex]);
		*/
		$('#' + showHolderId + '_imgDiv_'+curSlideIndex).append(slideElemArr[curSlideIndex]);
		if(slideChangedFunc)slideChangedFunc(curSlideIndex, {dimension:slideImgDimensionArr[curSlideIndex], navByUser:navByUser});
	}
	
	function onPrev(count)
	{
		if(!count)count = 1;
		//=========page reload======
		if(reloadUrl != '')
		{
			navByUser = true;
			reloadPageWithSlide(slidesData[(curSlideIndex == 0)?(numImg-count):(curSlideIndex-count)]["msid"]);
			return;
		}
		//==========================
		if(showMode==1)onPlayPause();
		showPrev(count);
		animateSlide(-1);
	}
	
	function onNext(count)
	{
		if(!count)count = 1;
		//=========page reload======
		if(reloadUrl != '')
		{
			navByUser = true;
			reloadPageWithSlide(slidesData[(curSlideIndex == (numImg-count))?0:(curSlideIndex+count)]["msid"]);
			return;
		}
		//==========================
		if(showMode==1)onPlayPause();
		showNext(count);
		animateSlide(1);
	}
	function animateSlide(dir)
	{
		var imgElem = $("#showHolder_popup_img_"+curSlideIndex).detach();
		$(imgElem).appendTo($("#showHolder_popup_imgTd_"+curSlideIndex));
		//console.log('animateSlide');
		//console.log(curSlideIndex);
		//$('#imgDiv_'+Number(!Boolean(imgDivInView))).css({'left':($('#imgDiv_'+imgDivInView).position().left + (imgDivWidth*(dir))) + 'px'});
		//$('#imagesPan').animate({left:($('#imagesPan').position().left + (imgDivWidth*(-dir))) + 'px'}, transitionDuration, function(){animationCompleteHandler(dir);});
		$('#' + showHolderId + '_imagesPan').clearQueue().stop().animate({left:(imgDivWidth*curSlideIndex*-1) + 'px'}, {duration:transitionDuration, step:function(now, fx){}, complete:function(){animationCompleteHandler(dir);if(slideTransitionCompletedFunc)slideTransitionCompletedFunc(curSlideIndex);}});
		//if(slideChangedFunc)slideChangedFunc(curSlideIndex);
	}
	
	function animationCompleteHandler(dir)
	{
		//imgDivInView = Number(!Boolean(imgDivInView));
		//alert(imgDivInView);
		if(showMode == 1)startTimout();
	}
	function setWidth(w)
	{
		imgDivWidth = w;
		showHolder.css({width:w});
		imagesPan.css({width:(w*numImg) +'px', left:(curSlideIndex*w*-1)+'px'});
		var i;
		var imgHolder;
		for(i=0; i<numImg; i++)
		{
			imgHolder = $("#" + showHolderId + '_imgDiv_'+i);
			imgHolder.css({width:w+'px'});
		}
	}
	function setHeight(h)
	{
		imgDivHeight = h;
		showHolder.css({height:h});
		imagesPan.css({height:h +'px'});
		sliderHolder.css({height:h});
		var i;
		var imgHolder;
		for(i=0; i<numImg; i++)
		{
			imgHolder = $("#" + showHolderId + '_imgDiv_'+i);
			imgHolder.css({height:h+'px'});
		}
	}
	function setDimension(w, h)
	{
		if(!h)h = imgDivHeight;
		imgDivWidth = w;
		imgDivHeight = h;
		showHolder.css({width:w, height:h});
		imagesPan.css({width:(w*numImg) +'px', left:(curSlideIndex*w*-1)+'px', height:h +'px'});
		sliderHolder.css({height:h});
		var i;
		var imgHolder;
		for(i=0; i<numImg; i++)
		{
			imgHolder = $("#" + showHolderId + '_imgDiv_'+i);
			imgHolder.css({width:w+'px', height:h+'px'});
		}
	}
	function onSlideImageLoaded(slideIndex, bool)
	{
		//console.log('slide image load '+ ((bool)?"completed":"failed") +': ' + slideIndex);
		loadedSlideImgArr.push(slideIndex);
		var preloadIndex = (slideIndex == (numImg-1))?0:(slideIndex+1);
		if(loadedSlideImgArr.indexOf(preloadIndex) == -1)createSlide(preloadIndex);
	}
	function reloadPageWithSlide(sid)
	{
		if(reloadUrl!='')
		{
			location.href = reloadUrl+sid;
		}
	}
	
	this.showSlide = function(obj)
	{
		//console.log(curSlideIndex + ' - showSlide:' + obj.slideIndex + ' -- ' + obj.autoPlay + ' -- ' + obj.transition);
		clearTimeout(timeout);		
		if(obj.autoPlay)showMode = 1;
		if(showMode == 1)playPauseBtn.addClass('playing');
		var indexDiff = obj.slideIndex - curSlideIndex;
		if(indexDiff == 0)
		{
			if(showMode == 1)
			{
				//playPauseBtn.css('background-position', "0 -28px");
				playPauseBtn.addClass('playing');
				startTimout();
			}
		}else
		{
			if(indexDiff>0)
			{
				//onNext(Math.abs(indexDiff));
				showNext(Math.abs(indexDiff));
			}else if(indexDiff<0)
			{
				//onPrev(Math.abs(indexDiff));
				showPrev(Math.abs(indexDiff));
			}
			if(obj.transition == undefined)
			{
				animateSlide(1);
			}else
			{
				if(!obj.transition)
				{
					$('#' + showHolderId + '_imagesPan').css({left:(imgDivWidth*curSlideIndex*-1) + 'px'});
					//if(slideChangedFunc)slideChangedFunc(curSlideIndex, {dimension:slideImgDimensionArr[curSlideIndex], navByUser:navByUser});
					if(showMode == 1)
					{
						//playPauseBtn.css('background-position', "0 -28px");
						playPauseBtn.addClass('playing');
						startTimout();
					}
				}else
				{
					animateSlide(1);
				}
			}
		}
		//if(autoPlayBool == undefined)alert();
		//if(obj.autoPlay)onPlayPause();
	}
	this.play = function()
	{
		if(showMode == 0)onPlayPause();
	}
	this.pause = function()
	{
		if(showMode == 1)onPlayPause();
	}
	this.show = function()
	{
		sliderHolder.css({display:'block'});
	}
	this.hide = function()
	{
		this.pause();
		sliderHolder.css({display:'none'});
	}
	this.next = function()
	{
		onNext();
	}
	this.previous = function()
	{
		onPrev();
	}
	this.getCurrentSlideIndex = function()
	{
		return curSlideIndex;
	}
	this.getAutoPlayMode = function()
	{
		return showMode;
	}
	this.getSlideStayDuration = function()
	{
		return slideTime;
	}
	this.resize = function(w, h)
	{
		if($('#' + showHolderId + '_imagesPan').is(':animated'))
		{
			$('#' + showHolderId + '_imagesPan').clearQueue().stop();
			//setWidth(w);
			setDimension(w, h);
			animateSlide();
		}else
		{
			//setWidth(w);
			setDimension(w, h);
		}
	}
	this.enableNavKey = function(bool)
	{
		navKeyActive = bool;
	}
	$(document).keyup(function(e) { 
		if(!navKeyActive)return;
		switch(e.keyCode)
		{
			case 37:
				onPrev();
				break;
			case 39:
				onNext();
				break;
		}
	});
}