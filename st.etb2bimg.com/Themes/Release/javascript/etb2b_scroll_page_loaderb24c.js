function ScrollPageLoader(obj)
{
	var bottomMargin = (obj['bottomMargin'])?obj['bottomMargin']:650;
	var serviceUrl = obj['serviceUrl'];
	var fn_successCb = obj['onSuccess'];
	var fn_emptyResponseCb = (obj['onEmptyResponse'])?obj['onEmptyResponse']:function(){};
	var fn_initCb = obj['onInit'];
	var postParams = obj['postParams'];
	var currentPage = postParams['page'];
	var loaderElement = obj['loaderElement'];
	var paginationMethod = (obj['paginationMethod'])?obj['paginationMethod']:'post';
	
	var pageExist = true;
	var not_processing = true;
	
	$(window).unbind('scroll');
	$(window).scroll(function(){
		if($(window).scrollTop() + $(window).height() >= $(document).height() - bottomMargin){
			if(not_processing && (currentPage!=0) && pageExist){
				if(fn_initCb)fn_initCb();
				get_more_content();
			}
		}
	});
	function ajaxCompleteFunc(data){
		//postParams['page'] = ++currentPage;
		if(data.trim() != 'null') {
			var jsonData = jQuery.parseJSON(data);
			if(jsonData.length > 0) {
				fn_successCb(jsonData, postParams);
			} else {
				pageExist = false;
				fn_emptyResponseCb(postParams);
			}
			var getPageNumber = postParams.page;
			postParams['page'] = ++getPageNumber;
		}else{
			postParams['page'] = ++currentPage;
			currentPage = 0;
			pageExist = false;
		}
		loaderElement.html('');
		not_processing = true;
	}
	function get_more_content() {
		try{
			loaderElement.html('<img src="'+THEME_PATH+'/images/responsive/loader-transparent.gif" alt="loading" >');
			not_processing = false;	
			
			if(paginationMethod == 'get')
			{
				var serviceUrl_init = obj['serviceUrl'];
				for(var prop in postParams)
				{
					serviceUrl_init += '&'+prop+'='+encodeURIComponent(postParams[prop]);
				}
				serviceUrl = serviceUrl_init;
				$.get(serviceUrl, ajaxCompleteFunc);
			}else
			{
				$.post(serviceUrl, postParams, ajaxCompleteFunc);
			}
			
		} catch(e) {
			console.log('Invalid request params');
		}
	}
	
	this.updatePostParams = function(obj) {
		if(postParams) {
			for(var prop in obj) {
				postParams[prop] = obj[prop];
			}
		}
	}
	this.enable = function() {
		pageExist = true;
	}
	
	this.disable = function() {		
		pageExist = false;
	}
	
	this.isActive = function() {
		return pageExist;
	}
}