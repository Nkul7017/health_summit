executeOnComplete(function(){
	$.fn.extend({
		autoCompleteMasterAlias:function(_obj)
		{
			//console.log(_obj);
			
			var obj = JSON.parse(JSON.stringify(_obj));
			var dataPool_org = obj['data'];
			var dataPool_masterIdRef = {};
			//var inputMinLength = Math.max(Number(obj['minLength']), 1);
			var sugSelectFn = (_obj['selectFn'])?_obj['selectFn']:function(){};
			var noSugFn = (_obj['noSuggestionFn'])?_obj['noSuggestionFn']:function(){};
			var inputChangeFn = (_obj['inputChangeFn'])?_obj['inputChangeFn']:function(){};
			var listReadyFn = (_obj['listReadyFn'])?_obj['listReadyFn']:function(){};
			//console.log(sugSelectFn);			
			var minChangeWaitTime = 0;
			var changeWaitTime = isNaN(obj['waitTime'])?200:Math.max(minChangeWaitTime, parseInt(Number(obj['waitTime'])));
			//console.log('changeWaitTime: '+changeWaitTime);
			var sugViewMaxCnt = isNaN(obj['suggestionViewMaxCount'])?5:parseInt(Number(obj['suggestionViewMaxCount']));
			var inputCharsMinCnt = isNaN(obj['minInputChars'])?2:parseInt(Number(obj['minInputChars']));
			var inputCharsMaxCnt = isNaN(obj['maxInputChars'])?100:parseInt(Number(obj['maxInputChars']));
			//if(this.selector.split(",")[0].charAt(0)!="#")return;
			var slctr = $(this[0]);
			
			var getSelector = (_obj['selectorName'])?_obj['selectorName']:'autocomplete';
			if (slctr == 'undefined' || slctr.selector == '') {
				var autoSelector = '.';
				var slctrId = getSelector;
			} else {
				var autoSelector = (this.selector.split(",")[0].charAt(0) == '.' || this.selector.split(",")[0].charAt(0) == '#') ? this.selector.split(",")[0].charAt(0) : '.';
				if(autoSelector == '#') {
					var slctrId = this[0].id;
				} else {
					var slctrId = this[0].className;
				}
			}			
			//console.log(slctrId);
			
			
			
			var isInputsValid = true;
			var enabled = true;
			var representer = {enable:function(){enabled=true;}, disable:function(){enabled=false;}, resetData:_resetData};
			if(!slctr.is("input"))isInputsValid = false;
			if(slctr.attr("type") != 'text')isInputsValid = false;
			/*
			$.each(this, function(key, val){
				if(!$(val).is("input"))isInputsValid = false;
				if($(val).attr("type") != 'text')isInputsValid = false;
				console.log('input:');
				console.log(val);
				if(!isInputsValid)console.log('input invalid: '+val);
			});
			*/
			//console.log('isInputsValid: ' + isInputsValid);
			//if(!isInputsValid)return;
			var inputActive = true;
			var slctrSufx = "-masuglst";
			var dataPool_lc = [];
			$.each(dataPool_org, function(key, val){
				var poolItem = {};
				for(var prop in val)
				{
					var propVal = $.trim((val[prop]+""));
					dataPool_org[key][prop] = propVal;
					if(prop == "id")dataPool_masterIdRef["master_"+propVal] = dataPool_org[key]["master"];
					poolItem[prop] = propVal.toLowerCase();
					if(prop == 'alias')
					{
						if(poolItem[prop].length)
						{
							dataPool_org[key][prop+'_arr'] = propVal.split(",");
							poolItem[prop+'_arr'] = poolItem[prop].split(",");
							$.each(poolItem[prop+'_arr'], function(key_a, val_a)
							{
								dataPool_org[key][prop+'_arr'][key_a] = $.trim(dataPool_org[key][prop+'_arr'][key_a]);
								poolItem[prop+'_arr'][key_a] = $.trim(val_a);
							});
						}
					}
				}
				dataPool_lc.push(poolItem);
			});
			//console.log(dataPool_lc);
			var searchInProg = false;
			var searchRequested = false;
			var searchRequestProgTimout;
			var searchRequestTimout;
			//var searchDataTimout;
			var srchdPool = {};
			var rsltLstBx = '<div class="etb2b-auto-scroll" style="z-index:999;position:relative; clear:both; width:'+slctr.outerWidth()+'px;"><div class="'+slctrId+slctrSufx+'progress" id="'+slctrId+slctrSufx+'progress" style="display:none; position:absolute; right:0; bottom:0;"><span class="sr-only"></span><i style="margin:4px 0;" class="fa fa-spinner fa-pulse fa-2x fa-fw"></i></div><!--<select>--><ul class="'+slctrId+slctrSufx+' autoSugSelect" id="'+slctrId+slctrSufx+'" size="'+sugViewMaxCnt+'" tabindex="-1" style="position:absolute; width:100%; display:none;"></ul><!--</select>--></div>';
			if(slctr.next('.etb2b-auto-scroll').length)slctr.next('.etb2b-auto-scroll').remove();
			$(rsltLstBx).insertAfter(slctr);
			var masuglst_slctr = $(autoSelector+slctrId+slctrSufx);
			masuglst_slctr.change(function(evt){
				//console.log(evt);
				var slctdVal = $(this).val();
				//inputActive = false;
				slctr.val(dataPool_masterIdRef["master_"+slctdVal]);
				masuglst_slctr.empty().hide();
				prevInput = "";
				//sugSelectFn({id:slctdVal});
				var result = $.grep(dataPool_org, function(e){ return e.id == slctdVal; });
				sugSelectFn(result[0]);
			}).click(function(evt){
				//if($(evt.target).siblings().length == 0)$(this).change();
				$(this).change();
			});
			slctr.click(function(){
				//console.log("slctr clicked");
				inputActive = true;
			});
			slctr.select(function(){
				//console.log("slctr selected");
				inputActive = true;
			});
			var prevInput = "";
			var prevRslt;
			slctr.attr("autocomplete", "off");
			slctr.bind('input', function(evt){
				//console.log($(this).val());
				checkSearch($(this).val());
			});
			/*
			slctr.keydown(function(evt){
				if(!masuglst_slctr.is(":visible"))return;
				var optionsMaxNdx = masuglst_slctr.children('option').length - 1;
				var keyCode = evt.keyCode;
				if(keyCode == 27)
				{
					masuglst_slctr.empty().hide();
				}else if(keyCode == 13)
				{
					evt.preventDefault();
					if(masuglst_slctr[0].selectedIndex != -1)masuglst_slctr.change();
				}else if(keyCode == 38)
				{
					masuglst_slctr[0].selectedIndex = (masuglst_slctr[0].selectedIndex ==  0)?optionsMaxNdx:masuglst_slctr[0].selectedIndex-1;
				}else if(keyCode == 40)
				{
					masuglst_slctr[0].selectedIndex = (masuglst_slctr[0].selectedIndex ==  optionsMaxNdx)?0:masuglst_slctr[0].selectedIndex+1;
				}
			});
			*/
			slctr.keyup(function(evt){
				if(!masuglst_slctr.is(":visible"))return;
				if(evt.keyCode == 13)
				{
					evt.preventDefault();
					if(masuglst_slctr[0].selectedIndex != -1)masuglst_slctr.change();
				}
			});
			
			$(document).on("click", function(evt){
				evt.stopPropagation();
				if($(evt.target).parent()[0] == this)masuglst_slctr.empty().hide();
				if(($(evt.target).attr("id") == masuglst_slctr.attr("id")) || ($(evt.target).attr("id") == slctr.attr("id")))
				{
					//masuglst_slctr.empty().hide();
				}else
				{
					masuglst_slctr.empty().hide();
				}
			});
			$(document).on("focus", "*", function(evt){
				evt.stopPropagation();
				if(($(evt.target).attr("id") == masuglst_slctr.attr("id")) || ($(evt.target).attr("id") == slctr.attr("id")))
				{
					//masuglst_slctr.empty().hide();
				}else
				{
					masuglst_slctr.empty().hide();
				}
			});
			
			/*
			slctr.on("focusout", function(evt){
				//masuglst_slctr.empty().hide();
				if($(evt.relatedTarget).attr("id") != masuglst_slctr.attr("id"))masuglst_slctr.empty().hide();
			});
			masuglst_slctr.on("focusout", function(evt){
				if(!$(evt.relatedTarget).hasClass(getSelector))masuglst_slctr.empty().hide();
			});
			*/
			var sgstrObj = {
				filterInput:function(inptStr)
				{
					return searchDataPool($.trim(inptStr.toLowerCase()));
				}
			};
			
			if(slctr.val())checkSearch(slctr.val());
			
			function checkSearch(str)
			{
				//console.log($(this).val());
				if(slctr.data("suggest") == false)return;
				//if(!enabled)return;
				inputChangeFn();
				if(!inputActive)return;
				if($.trim(str).length>inputCharsMaxCnt)return;
				if($.trim(str).length < inputCharsMinCnt)
				{
					if(searchRequestProgTimout)clearTimeout(searchRequestProgTimout);
					if(searchRequestTimout)clearTimeout(searchRequestTimout);
					masuglst_slctr.empty().hide();
					return;
				}
				if($.trim(str).toLowerCase() == prevInput)
				{
					showSearchResult(prevRslt);
					slctr.prop('disabled', false);
					$(autoSelector+slctrId+slctrSufx+"progress").hide();
					slctr.focus();
					return;
				}
				
				searchRequested = false;
				//if(searchDataTimout)clearTimeout(searchDataTimout);
				if(searchRequestProgTimout)clearTimeout(searchRequestProgTimout);
				if(searchRequestTimout)clearTimeout(searchRequestTimout);
				searchRequestProgTimout = setTimeout(function(){
					//slctr.prop('disabled', true);
					//$(autoSelector+slctrId+slctrSufx+"progress").show();
				}, changeWaitTime-minChangeWaitTime-10);
				searchRequestTimout = setTimeout(function(){
					//console.log("searchRequested...");
					searchRequested = true;
					var srchStr = $.trim((str).toLowerCase());
					srchStr = srchStr.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
					prevInput = srchStr;
					var srchRslt = (srchStr.length>0)?searchDataPool(srchStr):false;
					prevRslt = 	srchRslt;					
					if(!srchRslt)noSugFn({searchKey:srchStr});
					showSearchResult(srchRslt);
					slctr.prop('disabled', false);
					$(autoSelector+slctrId+slctrSufx+"progress").hide();
					slctr.focus();
				}, changeWaitTime);
			}
			function searchDataPool(srchStr)
			{
				/*
				searchInProg = true;
				console.log('searchInProg:...' + searchInProg);
				searchDataTimout = setTimeout(function(){
					searchInProg = false;
					console.log('searchInProg:' + searchInProg + '...');
				}, 5000);
				return;
				*/
				searchInProg = true;
				//console.log('searchInProg:...' + ' ===== ' +srchStr + ' ===== ' +searchInProg);
				var srchRslt = {searchKey:srchStr, master:[],alias:[]};
				$.each(dataPool_lc, function(key,val){
					if(!searchRequested)return false;
					var mtchItm = {};
					if(val["master"].search(srchStr) != -1)
					{
						mtchItm["master_"+dataPool_org[key]['id']] = dataPool_org[key]["master"];
						//srchRslt['master'].push({name:dataPool_org[key]["master"], id:dataPool_org[key]['id']});
						//srchRslt['master'].push(mtchItm);
						srchRslt['master'].push(dataPool_org[key]['id'] + "_||_" + dataPool_org[key]["master"]);
					}
					if(typeof(val["alias_arr"]) != 'undefined')
					{
						$.each(val["alias_arr"], function(key_a, val_a){
							if(!searchRequested)return false;
							mtchItm = {};
							if(val_a.search(srchStr) != -1)
							{
								mtchItm["alias_"+dataPool_org[key]['id']] = dataPool_org[key]["alias_arr"][key_a];
								//srchRslt['alias'].push({name:dataPool_org[key]["alias_arr"][key_a], id:dataPool_org[key]['id']});
								//srchRslt['alias'].push(mtchItm);
								srchRslt['alias'].push(dataPool_org[key]['id'] + "_||_" + dataPool_org[key]["alias_arr"][key_a]);
							}
						});
					}
				});
				searchInProg = false;
				//console.log('searchInProg:...' + searchInProg);
				return (searchRequested)?(((srchRslt["master"].length != 0) || (srchRslt["alias"].length != 0))?srchRslt:false):false;
			}
			//return sgstrObj;
			function showSearchResult(srchRslt)
			{
				//console.log("showSearchResult...");
				//console.log(srchRslt);
				if(!srchRslt)
				{
					masuglst_slctr.empty().hide();
					return;
				}
				var hasResult = true;
				if((srchRslt["master"].length == 0) && (srchRslt["alias"].length == 0))hasResult = false;
				if(!hasResult)return;				
				//console.log(srchRslt);
				var rsltToShow = [];
				var mtchNameLower = '';
				var srchKey = srchRslt["searchKey"];
				var mtchId = '';
				var mtchArr = [];
				
				if(srchRslt["master"].length > 0)
				{
					mtchId = '';
					$.each(srchRslt["master"], function(key, val){
						//for(var prop in val)
						//{
							//mtchId = prop.split("_")[1];
							//mtchNameLower = val[prop].toLowerCase();
							mtchArr = val.split("_||_");
							mtchId = mtchArr[0];
							mtchNameLower = mtchArr[1].toLowerCase();
							if((mtchNameLower == srchKey) || (mtchNameLower.indexOf(srchKey) == 0))
							{
								//console.log('mtchId: '+ mtchId);
								removeItemFromSearchResult(srchRslt, "alias", mtchId);
								//rsltToShow.push({id:mtchId, cat:"master", name:val[prop], matchType:((mtchNameLower == srchKey)?1:0)});
								rsltToShow.push({id:mtchId, cat:"master", name:mtchArr[1], matchType:((mtchNameLower == srchKey)?1:0)});
							}else
							{
								removeItemFromSearchResult(srchRslt, "alias", mtchId);
								//rsltToShow.push({id:mtchId, cat:"master", name:val[prop], matchType:-1});
								rsltToShow.push({id:mtchId, cat:"master", name:mtchArr[1], matchType:-1});
							}
							
							var numAls = srchRslt["alias"].length;
							var n;
							for(n=numAls; n>0; n--){
								if(srchRslt["alias"][n-1] == val)srchRslt["alias"].splice(n-1,1);
							}
						//}
					});
				}
				if(srchRslt["alias"].length > 0)
				{
					mtchId = '';
					$.each(srchRslt["alias"], function(key, val){
						//for(var prop in val)
						//{
							//mtchId = prop.split("_")[1];
							//mtchNameLower = val[prop].toLowerCase();
							mtchArr = val.split("_||_");
							mtchId = mtchArr[0];
							mtchNameLower = mtchArr[1].toLowerCase();
							if((mtchNameLower == srchKey) || (mtchNameLower.indexOf(srchKey) == 0))
							{
								//console.log('mtchId: '+ mtchId);
								//rsltToShow.push({id:mtchId, cat:"alias", name:val[prop]+' ('+ dataPool_masterIdRef["master_"+mtchId] +')', matchType:((mtchNameLower == srchKey)?1:0)});
								if(rsltToShow.length)
								{
									if(rsltToShow[rsltToShow.length-1] != undefined) {
										if(rsltToShow[rsltToShow.length-1]["id"] != mtchId)rsltToShow.push({id:mtchId, cat:"alias", name:mtchArr[1]+' ('+ dataPool_masterIdRef["master_"+mtchId] +')', matchType:((mtchNameLower == srchKey)?1:0)});
									}
								}else
								{
									rsltToShow.push({id:mtchId, cat:"alias", name:mtchArr[1]+' ('+ dataPool_masterIdRef["master_"+mtchId] +')', matchType:((mtchNameLower == srchKey)?1:0)});
								}
								
							}else
							{
								//rsltToShow.push({id:mtchId, cat:"alias", name:val[prop]+' ('+ dataPool_masterIdRef["master_"+mtchId] +')', matchType:-1});
								//if(rsltToShow[rsltToShow.length-1]["id"] != mtchId)rsltToShow.push({id:mtchId, cat:"alias", name:mtchArr[1]+' ('+ dataPool_masterIdRef["master_"+mtchId] +')', matchType:-1});
								if(rsltToShow.length)
								{
									if(rsltToShow[rsltToShow.length-1] != undefined) {
										if(rsltToShow[rsltToShow.length-1]["id"] != mtchId)rsltToShow.push({id:mtchId, cat:"alias", name:mtchArr[1]+' ('+ dataPool_masterIdRef["master_"+mtchId] +')', matchType:-1});
									}
								}else
								{
									rsltToShow.push({id:mtchId, cat:"alias", name:mtchArr[1]+' ('+ dataPool_masterIdRef["master_"+mtchId] +')', matchType:-1});
								}
							}
						//}
					});
				}
				
				//console.log(rsltToShow);
				
				var mtchSeqArr = [1,0,-1];
				var rsltToShowInSeq = [];
				for(var i=1; i>-2; i--)
				{
					$.each(rsltToShow, function(key, val){
						if(val["matchType"] == i)rsltToShowInSeq.push(val);					
					});
				}
				
				var optStr = '';
				$.each(rsltToShowInSeq, function(key, val){
					//optStr += '<option value="'+val["id"]+'" mtch="'+srchKey+'">'+val["name"]+'</option>';
					var boldTxt = val["name"];
					var frstInstNdx = boldTxt.toLowerCase().indexOf(srchKey.toLowerCase());
					boldTxt = boldTxt.slice(0,frstInstNdx+srchKey.length)+'</strong>'+boldTxt.slice(frstInstNdx+srchKey.length);
					boldTxt = boldTxt.slice(0,frstInstNdx)+'<strong>'+boldTxt.slice(frstInstNdx);
					optStr += '<li value="'+val["id"]+'" >'+boldTxt+'</li>';
				});
				
				masuglst_slctr.attr("size", Math.min(sugViewMaxCnt, Math.max(2, rsltToShowInSeq.length)));
				masuglst_slctr.attr("optionscount", Math.min(sugViewMaxCnt, rsltToShowInSeq.length));
				//masuglst_slctr.show().append(optStr);
				masuglst_slctr.show();
				if(rsltToShowInSeq.length<sugViewMaxCnt)
				{
					masuglst_slctr.css({"overflow-y": "hidden", "background-image":"none"});
				}else
				{
					masuglst_slctr.css({"overflow": "auto", "background-image":"none", "max-height":"250px"});
				}
				document.getElementById(slctrId+slctrSufx).innerHTML = optStr;
				masuglst_slctr[0].selectedIndex = 0;
				
				$($("#"+slctrId+slctrSufx+" li")[0]).addClass('slctd');
				$("#"+slctrId+slctrSufx+" li").on("click", function(evt){
					evt.stopPropagation();
					var slctdVal = $(this).attr('value');
					slctr.val(dataPool_masterIdRef["master_"+slctdVal]);
					masuglst_slctr.empty().hide();
					var result = $.grep(dataPool_org, function(e){ return e.id == slctdVal; });
					sugSelectFn(slctrId,result[0]);
				});
				slctr.keydown(function(evt){
					if(!masuglst_slctr.is(":visible"))return;
					var optionsMaxNdx = masuglst_slctr.children('li').length - 1;
					var keyCode = evt.keyCode;
					var slctdNdx = 0;
					if(keyCode == 27)
					{
						masuglst_slctr.empty().hide();
					}else if(keyCode == 13)
					{
						evt.preventDefault();
						$("#"+slctrId+slctrSufx+" li.slctd").trigger("click");
					}else if(keyCode == 38)
					{
						slctdNdx = $("#"+slctrId+slctrSufx+" li.slctd").index();
						$("#"+slctrId+slctrSufx+" li").removeClass('slctd');
						$($("#"+slctrId+slctrSufx+" li")[(slctdNdx == 0)?optionsMaxNdx:slctdNdx-1]).addClass('slctd');
					}else if(keyCode == 40)
					{
						slctdNdx = $("#"+slctrId+slctrSufx+" li.slctd").index();
						$("#"+slctrId+slctrSufx+" li").removeClass('slctd');
						$($("#"+slctrId+slctrSufx+" li")[(slctdNdx ==  optionsMaxNdx)?0:slctdNdx+1]).addClass('slctd');
					}
					$("#"+slctrId+slctrSufx).scrollTop(0);
					if($("#"+slctrId+slctrSufx+" li.slctd").length){
						var scrlDev = Math.max(0,$("#"+slctrId+slctrSufx+" li.slctd:first").position().top+$("#"+slctrId+slctrSufx+" li.slctd:first").outerHeight()-$("#"+slctrId+slctrSufx).outerHeight());
						var hghtMdlo = $("#"+slctrId+slctrSufx).outerHeight()%$("#"+slctrId+slctrSufx+" li.slctd:first").outerHeight();
						if(scrlDev>0)scrlDev+=hghtMdlo;
						$("#"+slctrId+slctrSufx).scrollTop(scrlDev);
					}
				});

				listReadyFn();
			}
			
			function removeItemFromSearchResult(srchRslt, cat, id)
			{
				var numRslt = srchRslt[cat].length;
				for(i=numRslt-1; i>-1; i--)
				{
					if(srchRslt[cat][i].hasOwnProperty(cat+"_"+id))
					{
						srchRslt[cat].splice(i,1);
					}
				}
				
			}
			function _resetData(_obj)
			{
				if(!_obj)return;
				if(searchRequestProgTimout)clearTimeout(searchRequestProgTimout);
				if(searchRequestTimout)clearTimeout(searchRequestTimout);
				
				dataPool_org = JSON.parse(JSON.stringify(_obj));
				dataPool_masterIdRef = {};
				dataPool_lc = [];
				$.each(dataPool_org, function(key, val){
					var poolItem = {};
					for(var prop in val)
					{
						var propVal = $.trim((val[prop]+""));
						dataPool_org[key][prop] = propVal;
						if(prop == "id")dataPool_masterIdRef["master_"+propVal] = dataPool_org[key]["master"];
						poolItem[prop] = propVal.toLowerCase();
						if(prop == 'alias')
						{
							if(poolItem[prop].length)
							{
								dataPool_org[key][prop+'_arr'] = propVal.split(",");
								poolItem[prop+'_arr'] = poolItem[prop].split(",");
								$.each(poolItem[prop+'_arr'], function(key_a, val_a)
								{
									dataPool_org[key][prop+'_arr'][key_a] = $.trim(dataPool_org[key][prop+'_arr'][key_a]);
									poolItem[prop+'_arr'][key_a] = $.trim(val_a);
								});
							}
						}
					}
					dataPool_lc.push(poolItem);
				});
				representer.enable();
				if(slctr.val())checkSearch(slctr.val());
			}
			return representer;
		}
	});
});
