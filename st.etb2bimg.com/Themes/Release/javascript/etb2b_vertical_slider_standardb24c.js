//Vertical slider script by Simon Battersby
//Reference: http://www.simonbattersby.com/blog/vertical-scrollbar-using-jquery-ui-slider/
//standard slider NO HANDLE IMAGE

//DON'T LINK DIRECTLY TO THIS FILE - IT EATS MY BANDWIDTH. TAKE A COPY AND STORE ON YOUR OWN SERVER
//if(document.URL.indexOf('simonbattersby') < 0) alert('This site is referencing javascript from www.simonbattersby.com. Please create your own copy and store on your own server.');


function setSlider($scrollpane){//$scrollpane is the div to be scrolled
	
	//set options for handle image - amend this to true or false as required
	var handleImage = false;
	
	//change the main div to overflow-hidden as we can use the slider now
	$scrollpane.css('overflow','hidden');
	
	//if it's not there, wrap a div around the contents of the scrollpane to allow the scrolling
	if ($scrollpane.find('.scroll-content').length==0) $scrollpane.children().wrapAll('<\div class="scroll-content"> /');
	
	//compare the height of the scroll content to the scroll pane to see if we need a scrollbar
	var difference = $scrollpane.find('.scroll-content').height()-$scrollpane.height();//eg it's 200px longer 
	$scrollpane.data('difference',difference); 
	
	if(difference<=0 && $scrollpane.find('.slider-wrap').length>0)//scrollbar exists but is no longer required
	{
		$scrollpane.find('.slider-wrap').remove();//remove the scrollbar
		$scrollpane.find('.scroll-content').css({top:0});//and reset the top position
	}
	
	if(difference>0)//if the scrollbar is needed, set it up...
	{
		var proportion = difference / $scrollpane.find('.scroll-content').height();//eg 200px/500px
		
		var handleHeight = Math.round((1-proportion)*$scrollpane.height());//set the proportional height - round it to make sure everything adds up correctly later on
		handleHeight -= handleHeight%2; 
		
		//if the slider has already been set up and this function is called again, we may need to set the position of the slider handle
		var contentposition = $scrollpane.find('.scroll-content').position();	
		var sliderInitial = 100*(1-Math.abs(contentposition.top)/difference);
		
		if($scrollpane.find('.slider-wrap').length==0)//if the slider-wrap doesn't exist, insert it and set the initial value
		{
			$scrollpane.append('<\div class="slider-wrap"><\div class="slider-vertical"><\/div><\/div>');//append the necessary divs so they're only there if needed
			sliderInitial = 100;
		}
		
		$scrollpane.find('.slider-wrap').height($scrollpane.height());//set the height of the slider bar to that of the scroll pane
		
		//set up the slider 
		$scrollpane.find('.slider-vertical').slider({
			orientation: 'vertical',
			min: 0,
			max: 100,
			range:'min',
			value: sliderInitial,
			slide: function(event, ui) {
				var topValue = -((100-ui.value)*difference/100);
				$scrollpane.find('.scroll-content').css({top:topValue});//move the top up (negative value) by the percentage the slider has been moved times the difference in height
				$('ui-slider-range').height(ui.value+'%');//set the height of the range element
			},
			change: function(event, ui) {
				var topValue = -((100-ui.value)*($scrollpane.find('.scroll-content').height()-$scrollpane.height())/100);//recalculate the difference on change
				$scrollpane.find('.scroll-content').css({top:topValue});//move the top up (negative value) by the percentage the slider has been moved times the difference in height
				$('ui-slider-range').height(ui.value+'%');
		  }	  
		});
		
		//set the handle height and bottom margin so the middle of the handle is in line with the slider
		$scrollpane.find(".ui-slider-handle").css({height:handleHeight,'margin-bottom':-0.5*handleHeight});
		var origSliderHeight = $scrollpane.height();//read the original slider height
		var sliderHeight = origSliderHeight - handleHeight ;//the height through which the handle can move needs to be the original height minus the handle height
		var sliderMargin =  (origSliderHeight - sliderHeight)*0.5;//so the slider needs to have both top and bottom margins equal to half the difference
		$scrollpane.find(".ui-slider").css({height:sliderHeight,'margin-top':sliderMargin});//set the slider height and margins
		$scrollpane.find(".ui-slider-range").css({bottom:-sliderMargin});//position the slider-range div at the top of the slider container
		
		//if required create elements to hold the images for the scrollbar handle
		if (handleImage){
			$(".ui-slider-handle").append('<img class="scrollbar-top" src="/images/misc/scrollbar-handle-top.png"/>');
			$(".ui-slider-handle").append('<img class="scrollbar-bottom" src="/images/misc/scrollbar-handle-bottom.png"/>');
			$(".ui-slider-handle").append('<img class="scrollbar-grip" src="/images/misc/scrollbar-handle-grip.png"/>');
		}
	}//end if
		 
	//code for clicks on the scrollbar outside the slider
	$(".ui-slider").click(function(event){//stop any clicks on the slider propagating through to the code below
		event.stopPropagation();
	});
	   
	$(".slider-wrap").click(function(event){//clicks on the wrap outside the slider range
		var offsetTop = $(this).offset().top;//read the offset of the scroll pane
		var clickValue = (event.pageY-offsetTop)*100/$(this).height();//find the click point, subtract the offset, and calculate percentage of the slider clicked
		$(this).find(".slider-vertical").slider("value", 100-clickValue);//set the new value of the slider
	}); 
	
		 
	//additional code for mousewheel
	if($.fn.mousewheel){		
	
		$scrollpane.unmousewheel();//remove any previously attached mousewheel events
		$scrollpane.mousewheel(function(event, delta){
			
			var speed = Math.round(5000/$scrollpane.data('difference'));
			if (speed <1) speed = 1;
			if (speed >100) speed = 100;
	
			var sliderVal = $(this).find(".slider-vertical").slider("value");//read current value of the slider
			
			sliderVal += (delta*speed);//increment the current value
	 
			$(this).find(".slider-vertical").slider("value", sliderVal);//and set the new value of the slider
			
			event.preventDefault();//stop any default behaviour
		});
		
	}
	
}

(function(a){function d(b){var c=b||window.event,d=[].slice.call(arguments,1),e=0,f=!0,g=0,h=0;return b=a.event.fix(c),b.type="mousewheel",c.wheelDelta&&(e=c.wheelDelta/120),c.detail&&(e=-c.detail/3),h=e,c.axis!==undefined&&c.axis===c.HORIZONTAL_AXIS&&(h=0,g=-1*e),c.wheelDeltaY!==undefined&&(h=c.wheelDeltaY/120),c.wheelDeltaX!==undefined&&(g=-1*c.wheelDeltaX/120),d.unshift(b,e,g,h),(a.event.dispatch||a.event.handle).apply(this,d)}var b=["DOMMouseScroll","mousewheel"];if(a.event.fixHooks)for(var c=b.length;c;)a.event.fixHooks[b[--c]]=a.event.mouseHooks;a.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=b.length;a;)this.addEventListener(b[--a],d,!1);else this.onmousewheel=d},teardown:function(){if(this.removeEventListener)for(var a=b.length;a;)this.removeEventListener(b[--a],d,!1);else this.onmousewheel=null}},a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery)