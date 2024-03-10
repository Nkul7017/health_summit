encodeHTML = function(string) {
  const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      "/": '&#x2F;',
  };
  const reg = /[&<>"'/]/ig;
  return string.replace(reg, (match)=>(map[match]));
}

var loc = location;

var EtB2b = EtB2b || {};
EtB2b.ga_clients = EtB2b.ga_clients || [];
EtB2b.ga = (function(){
  var clients = [];
  var load = function() {
  	// if(typeof window['ga'] =='undefined'){
    //     (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
	//     createTrackers();
	// 	EtB2b.ga.sendGA('pageview',{'location':document.location.pathname});
	// }
  }


  var createTrackers = function(){
    // EtB2b['ga_clients'].forEach(function(element){
    //   addClients(element[0],element[1]);
    // })
    // clients.forEach(function(element) {
    //   ga('create', element[0], 'auto', element[1]);
    // })
  }

  var addClients = function(propertyid,name){
    clients.push([propertyid,name]);  
  }

  var sendGA = function(_hitType, paramObj)
  {

  	// if(typeof b2b_analtics !='undefined'){
  	// 	switch (_hitType) {
	//         case 'pageview':
	//             b2b_analtics.send_pageview(paramObj['location']?paramObj['location']:'');
	//             break;
	//         case 'event':
	//             b2b_analtics.send_event((paramObj['category']) ? paramObj['category'] : paramObj[0],[(paramObj['category']) ? paramObj['category'] : paramObj[0],(paramObj['action']) ? paramObj['action'] : paramObj[1],(paramObj['label']) ? paramObj['label'] : paramObj[2]]);
	//             break;
    //     }
  	// 	return false;
  	// }
    // if(typeof window['ga'] != 'function')
    // return ;
    // console.log(['sendGA',_hitType, paramObj]);
    
    // switch (_hitType) {
    //     case 'pageview':
    //         if (typeof paramObj == 'undefined') {
    //             paramObj = {};
    //             paramObj['location'] = document.location.pathname;
    //         }
    //         if (paramObj['location'])
    //             paramObj['location'] = paramObj['location'].replace(document.location.origin, '');
    //         var location = (paramObj['location']) ? paramObj['location'] : paramObj[0];
    //         clients.forEach(function(element) {
    //             ga(element[1] + '.send', { hitType: _hitType, location: location });
    //         });
    //         console.log(_hitType, paramObj);
    //         break;
    //     case 'event':
    //         clients.forEach(function(element) {
    //             ga(element[1] + '.send', { hitType: _hitType, eventCategory: (paramObj['category']) ? paramObj['category'] : paramObj[0], eventAction: (paramObj['action']) ? paramObj['action'] : paramObj[1], eventLabel: (paramObj['label']) ? paramObj['label'] : paramObj[2] }, { nonInteraction: true });
    //         });
    //         console.log(_hitType, paramObj);
    //         break;
    //     case 'object':
    //         clients.forEach(function(element) {
    //             ga(element[1] + 'send', paramObj);
    //         });
    //         console.log(_hitType, paramObj);
    //         break;
    // }
  }
    var setGA = function(key, val) {
        // if (typeof val == 'undefined')
        //     return;
        // clients.forEach(function(element) {
        //     ga(element[1] + '.set',key,val);
        // });

    }
  return{
    load        : load,
    sendGA      : sendGA,
    setGA       : setGA
  }
})();

// if(typeof window.loading_analytics == 'undefined' || !window.loading_analytics){
// 	EtB2b.ga.load();
// }
var _loggedin_user = [];
var _gbl_logincb_fn = '';
var _gbl_notlogincb_fn = '';
var _is_loggedin = 0;
var _gbl_red_url = '';
var profileComplete = false;
var myInt;
var aliasTags = "";
var isExecuteTagService = '1';
var gsMonthNames = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
var gsDayNames = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
if(typeof B2B_SSO_LOGIN == 'undefined')B2B_SSO_LOGIN=0;
Date.prototype.format = function(f){
    if (!this.valueOf())
        return '&nbsp;';

    var d = this;

    return f.replace(/(yyyy|mmmm|mmm|mm|dddd|ddd|dd|hh|nn|ss|a\/p)/g,
        function($1)
        {
            switch ($1.toLowerCase())
            {
            case 'yyyy': return d.getFullYear();
            case 'mmmm': return gsMonthNames[d.getMonth()];
            case 'mmm':  return gsMonthNames[d.getMonth()].substr(0, 3);
            case 'mm':   return ((d.getMonth() + 1) < 10) ? ('0'+(d.getMonth() + 1)) : (d.getMonth() + 1);
            case 'dddd': return gsDayNames[d.getDay()];
            case 'ddd':  return gsDayNames[d.getDay()].substr(0, 3);
            case 'dd':   return (d.getDate() < 10) ? ('0'+d.getDate()) : (d.getDate());
            case 'hh':   return ((h = d.getHours() % 12) ? h : 12);
            case 'nn':   return d.getMinutes();
            case 'ss':   return d.getSeconds();
            case 'a/p':  return d.getHours() < 12 ? 'AM' : 'PM';
            }
        }
    );
}

var postMessageCallbacks = {};
executeOnReady(function(){
	postMessageCallbacks['multiple_logins_alert'] = multiple_logins_alert;	
	postMessageCallbacks['handle_login_error'] = handle_login_error;	
	postMessageCallbacks['handle_fb_loggedin'] = handle_fb_loggedin;	
	postMessageCallbacks['handle_login_result'] = handle_login_result;	
	postMessageCallbacks['handle_googlelogin_accesstokenurl'] = handle_googlelogin_accesstokenurl;
});

window.customAddEventListener = window.attachEvent || window.addEventListener;
window.customAddEventListener('message', function (ev) {
	if(typeof ev.data.callback !='undefined' && typeof postMessageCallbacks[ev.data.callback] == 'function')
	postMessageCallbacks[ev.data.callback].apply(null, Array.prototype.slice.call(ev.data.params instanceof Array?ev.data.params:[]));
}, false);


function htmlspecialchars(str) {
	if (typeof(str) == "string") {
		str = str.replace(/&/g, "&amp;"); /* must do &amp; first */
		str = str.replace(/"/g, "&quot;");
		str = str.replace(/'/g, "&#039;");
		str = str.replace(/</g, "&lt;");
		str = str.replace(/>/g, "&gt;");
	}
	return str;
}

function rhtmlspecialchars(str) {
	if (typeof(str) == "string") {
		str = str.replace(/&gt;/ig, ">");
		str = str.replace(/&lt;/ig, "<");
		str = str.replace(/&#039;/g, "'");
		str = str.replace(/&quot;/ig, '"');
		str = str.replace(/&amp;/ig, '&'); /* must do &amp; last */
	}
	return str;
}
 
function getQueryParams(qs) {
    qs = qs.split("+").join(" ");
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }

    return params;
}

function ck_en(str){
	if(str){
		var new_str='+';
		for(var i=0;i<str.length;i++){
			new_str+=String.fromCharCode(str.charCodeAt(i) +7);
		}	
		return new_str;
	}else{
		return null;
	}
}

function ck_de(str){
	if(str){
		if(str[0]=='+'){
		var new_str='';
		for(var i=1;i<str.length;i++){
			new_str+=String.fromCharCode(str.charCodeAt(i) -7);
		}	
			return new_str;
		}else{
			return str;
		}
	}else{
		return null;
	}
}

var $_GET = getQueryParams(document.location.search);
var globalLoc = $(loc).attr('pathname');
//alert(JSON.stringify($_GET));
//alert($_GET['test']);

var hoverTimeoutId = null;
var hoverTimeoutIdSearch = null;

// MOVED TO HEADER
/* var _oauth_data={};
var prevent_default_layers=false;
var _override_history_url=''; */

var _relvideo={};
var is_vslide_on=false;
var is_sslide_on=false;
var last_search_val='';
var search_requests=[];
var _profile_email='';
var _refresh_page = null;
var preventOverRideHistoryState=0;

var loginUrl_facebook = 'https://www.facebook.com/dialog/oauth?client_id='+FACEBOOK_APPID+'&redirect_uri='+base_url+'%2Fshare_settings.php%3Ftype%3Dfb%26connect_type%3Dfb&scope=email%2C+user_education_history%2C+user_hometown%2C+user_location%2C+user_work_history%2C+publish_actions'; 
	
var loginUrl_linkedin = base_url+'/share_settings.php?connect_type=in&lType=initiate&reconnect=true'; 

var gbl_lyr_xtra_cls = '';
var gbl_lyr_close = '';
var reg_red_thanks = 'N';
var two_col_rt = '';
var yoloFlag;

// setting cookie email
var pEmail_arr = ck_de(getCookie(ET_PORTAL+'_pop_user_sub'));
var pEmail = '';
if($_GET['email']){
	pEmail = $.trim($_GET['email']);
}else if(pEmail_arr){
	pEmail_arr = pEmail_arr.split('|');
	pEmail = pEmail_arr[0];
}

//setting User Id for GA
if(typeof ga == "function" && pEmail) { 
	ga('set', 'userId', ck_en(pEmail));
}

var set_cookie_email = pEmail;
//var set_cookie_email = $_GET['email'];
if(set_cookie_email){
	set_cookie_email = set_cookie_email;
} else {
	set_cookie_email = 'newuser';
}

var sub_source = $.trim($_GET['utm_medium']);
if (sub_source) {
	setCookie(ET_PORTAL + '_subscription_source', sub_source, ET_SUB_SOURCE_COOKIE);
}

// two_col_rt and launching related was set at this point now in header

var set_pop_cookie = 'N';
var fromMail_redirect_flag = 'N';
var forward_blk = '';
	
var show_subscription_layer_timeout;

//var ET_DEFAULT_IMG_URL = '';

var callbackFunctionStack = [];
callbackFunctionStack.captcha = [];
callbackFunctionStack.csrf = [];

executeArrayBasedFunction = function(){
	if((typeof arguments != 'undefined') && (typeof arguments[0] != 'undefined') && arguments[0].length){
		$func = arguments[0][0];
		$func.apply(null, Array.prototype.slice.call(arguments[0],1));
	}
}

//loadScript(JS_PATH+'/../js/app.security.js?mod=' + file_version,function(){},false);

function getCookie(c_name){
	if(isGDPRNation())
	return b2bGdpr.getStorage(c_name);
	var c_value = document.cookie;
	var c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1){
		c_start = c_value.indexOf(c_name + "=");
	}
	if (c_start == -1){
		c_value = null;
	} else {
		c_start = c_value.indexOf("=", c_start) + 1;
		var c_end = c_value.indexOf(";", c_start);
		if (c_end == -1){
			c_end = c_value.length;
		}
		c_value = unescape(c_value.substring(c_start,c_end));
	}
	return c_value;
}

function setCookie(c_name, value, exdays){
	if(isGDPRNation())
	{
		if(exdays < 0 || exdays == 0)
		return b2bGdpr.deleteStorage(key);
		else
		return b2bGdpr.setStorage(c_name, value, exdays);
	}
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value = escape(value) + ((exdays==null) ? "" : "; path=/; domain="+COOKIE_SET_DOMAIN+"; expires="+exdate.toUTCString());				  
	document.cookie=c_name + "=" + c_value;
}
function setLocalStorage(key,data,exdays){
	var $data = {};
	$data['expires'] = Math.floor(Date.now() / 1000) + exdays*24*60*60;
	$data['data'] = data;
	localStorage.setItem(key,JSON.stringify($data)); 
}
function getLocalStorage(key){
	var $data = localStorage.getItem(key);
	if($data !=null)
	{
		$data = JSON.parse($data);
		var lsexpires = $data['expires'];
		if(Math.floor(Date.now() / 1000) >= lsexpires)
		{
			deleteLocalStorage(key);
			return null;
		}
		if('data' in $data)
			return $data['data'];
		else
		{
			deleteLocalStorage(key);
			return null;
		}
	}
	else 
	return null;
}
function deleteLocalStorage(key){
	localStorage.removeItem(key);
}
function isValidEmailAddress(emailAddress) {
	var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
	return pattern.test(emailAddress);
} 
function validate_mobile(mob_number){
    var error='';
    var regex = /^([\d\+\-\(\)]){8,15}$/;
    mob_number=mob_number.replace(/ /g,'');
    if(mob_number == ""){
      //error=EtB2b.errorLog[61];
      return false;
    }
    else if(!regex.test(mob_number)){
      //error=EtB2b.errorLog[64];
      return false;
    }    
    return true;
}
function save_techgig_updates_subsription(blockPosition, lid) {
	if(show_subscription_layer_timeout)clearTimeout(show_subscription_layer_timeout);
	var email = $.trim($('#subscribe_email_'+blockPosition).val());
	var full_name = $('#full_name_'+blockPosition).val();
	var company = $('#subscribe_company_'+blockPosition).val();
	var designation = $('#subscribe_desig_'+blockPosition).val();
	var mobile = $('#subscribe_mobile_'+blockPosition).val();
	var user_consent = $('#consentPopup_'+blockPosition).is(":checked");
    
    if(!full_name){
		full_name = '';
	}
	if(!company){
		company = '';
	}
	if(!designation){
		designation = '';
	}
	if(!mobile){
		mobile = '';
	}

    var emailField = $('#subscribe_email_'+blockPosition);
	var emailFieldResponse = $('#subcribe_response_'+blockPosition);
	var full_nameField = $('#full_name_'+blockPosition);
	var subscriber_cmp = $('#subscribe_company_'+blockPosition);
	var subscriber_desig = $('#subscribe_desig_'+blockPosition);
	var subscriber_mobile = $('#subscribe_mobile_'+blockPosition);
	var consent_response = $('#subcribe_consentPopup_'+blockPosition);
    
    var subscription_source = '';
	
	var c_value = getCookie(ET_PORTAL + '_subscription_source');
	if(c_value){
		subscription_source = c_value;
	}

	if (sub_source) {
		subscription_source = sub_source;
	}
	
	var subscription_source_form = $.trim($('#subscription_source').val());
	if(subscription_source_form){
		subscription_source = subscription_source_form;
	} 
	
	email.replace(/ /g,'');
	if(email == 'Your email' || email.length == 0) {
		emailFieldResponse.html('Please provide your email id.');
		emailField.val('');
		emailField.focus();
		return false;
	}

	// Validate Email Max Length
	if(email.length > 100) { 
		emailFieldResponse.html('Email length can not be more than 100 chars.');
		//emailField.val('');
		emailField.focus();
		return false;
	}

	if(email.replace(/ /g,'') == "") {
		emailFieldResponse.html('Please provide an Email id.');
		emailField.val('');
		emailField.focus();
		return false;
	}
	
	if(is_valid_email(email)){
		// email is valid
	} else {
		emailFieldResponse.html('Please provide a valid Email id.');
		//emailField.val('');
		emailField.focus();
		return false;
	}
	if(!user_consent){
      consent_response.html('Please read and agree to the Terms & Conditions and Privacy Policy');
      return false;
    }
    if(user_consent){
      consent_response.html('');
      $('#consentPopup_'+blockPosition).prop('checked', false);
    }

    // Pip Check
    var newsletterId    = 0;
    var pipCategoryId   = 0;
    var pipCategory     = '';
    
    if(is_pip)
    {
        newsletterId    = pip.newsletterId;
        pipCategoryId   = pip.categoryId;
        pipCategory     = pip.category;
        SITE_NAME_TITLE = SITE_NAME_TITLE + ' : ' + pipCategory;
    }

	var url = base_url + '/general_ajax_task.php?action=save_etretail_subsription_block';
	$('#save_techgig_updates_subsription_btn, #subscriber_btn_top').attr('disabled', true);
	$.ajax({url:url, type: "POST", data: {'email_id':email,'full_name':full_name, 'subscription_source':subscription_source, 'company':company, 'designation':designation,'mobile':mobile, 'newsletter_id':newsletterId, 'pipCategoryId':pipCategoryId, 'pipCategory':pipCategory}, xhrFields: { withCredentials: true }, success: function(data) { 

		data = $.trim(data);
		data = data.split('#|#');
		emailField.val('');
		full_nameField.val('');
		subscriber_cmp.val('');
		subscriber_desig.val('');
		subscriber_mobile.val('');

		if(data[0] != 'NVEMAIL' && data[0] != 'BLOCKED') {
			if(isNaN(data[0]) && data[0] != 'E') {
				emailField.show();
				emailFieldResponse.html('Error during subsription. Please try again!');
			} else if(isNaN(data[0]) && data[0] == 'E') {
				_profile_email=email;
				
				if(lid){
					_remove_custom_poplayer2(lid, true);
				}
				if(typeof demosite!='undefined' && demosite == 1)
				{
					var newlid = _custom_poplayer2('Thank you for subscribing '+SITE_NAME_TITLE+' daily newsletter. We are launching soon. Stay tuned!', '', '', '', 3, '', true);
					$('#_l2_txt_cnt_'+newlid).html('');
					return;
				}
				
				var tmpData = data[3].split('**|**');
				tmpData[0] = $.trim(tmpData[0]);
				tmpData[1] = $.trim(tmpData[1]);
				tmpData[2] = $.trim(tmpData[2]);
				tmpData[3] = $.trim(tmpData[3]);
				tmpData[4] = $.trim(tmpData[4]);
				tmpData[5] = $.trim(tmpData[5]);
				
				if((data[1] == 'Y') || (tmpData[0] != '' && tmpData[1] != '' && tmpData[2] != '' && tmpData[3] != '' && tmpData[5] != '')) { // Profile Completed Block
					if(data[2] == 'Y') {						
						var newlid = _custom_poplayer2('Your subscription to our newsletter is already activated.', '', '', '', 3, '', true);
						$('#_l2_txt_cnt_'+newlid).html('<span class="subtitle">If you are not getting our newsletters, please reach us on <a target="_blank" href="mailto:' + CONTACTUS_EMAILS[ET_PORTAL] + '" >' + CONTACTUS_EMAILS[ET_PORTAL] + '</a>. Do not forget to check your SPAM folder.</span>');
					
						/* if (ET_PORTAL == 'retail') { 
							// invite code
						}  */						

					} else if(data[2] == 'N') {
						/* if (ET_PORTAL == 'retail') { 
							// invite/share links
						} 
						*/

						var newlid = _custom_poplayer2('Your email id is already in our subscription-list.', '', '', '', 3, '', true);
						$('#_l2_txt_cnt_'+newlid).html('<span class="subtitle">However, you have not confirmed your subscription. We have resent you the activation mail - please check and activate your subscription.</span>');
					}
				} else if(data[1] == 'N') { // Profile Not Completed Block
					
					if(lid){
						_remove_custom_poplayer2(lid, true);
					}
					
					_profile_email=email;
					
					if(data[2] == 'Y') {
						profileComplete = true;
						// Since profile is still incomplete, show the pop up
						var newlid = _custom_poplayer2('Your subscription to our newsletter is already activated.', '', '', '', 3, '', true);
						var subs_ttl = '<span class="subtitle">If you are not getting our newsletters, please reach us on <a target="_blank" href="mailto:' + CONTACTUS_EMAILS[ET_PORTAL] + '"> '+ CONTACTUS_EMAILS[ET_PORTAL] + '</a>. <br>Do not forget to check your SPAM folder. In the meanwhile, we would like to know you a little more:</span>';

						//$('#form_block').show();

					} else if(data[2] == 'N') {
						profileComplete = true;
						// Since profile is still incomplete, show the pop up
						var newlid = _custom_poplayer2('Your email id is already in our subscription-list.', '', '', '', 3, '', true);
						var subs_ttl = '<span class="subtitle">However, you have not confirmed your subscription. We have resent you the activation mail - please check and activate your subscription. We would like to know you a little more:</span>';
						
						//$('#form_block').show();
					}
					
                var subscription_form_html = '<div id="detail-submit-form"><form action="" method="post" onsubmit="javascript:return false;"><div class="section"><label for="layer_full_name">Full Name <span>*</span></label><input type="hidden" name="pipCategory" value="'+pipCategory+'"><input id="layer_full_name" name="layer_full_name" type="text" class="txt_box" value="" onblur="removeError(event);"/><span class="error-txt" id="layer_full_name_err" style="display: none;"></span></div><div class="section"><label for="current_company">Company <span>*</span></label><input value=""  id="current_company" name="current_company" type="text" class="txt_box popup-autocomplete" onblur="removeError(event);"/><span class="error-txt" id="current_company_err" style="display: none;"></span><input type="hidden" name="master_company_id" class="autocomplete-master-id"></div><div class="section"><label for="user_designation">Designation <span>*</span></label><input value=""  id="user_designation" name="user_designation" type="text" class="txt_box" onblur="removeError(event);"/><span class="error-txt" id="user_designation_err" style="display: none;"></span></div><!--<div class="section"><label for="user_work_exp">Location <span>*</span></label><input value="" id="user_work_exp" name="user_work_exp" type="text" class="txt_box" value="" onblur="removeError(event);"/><span class="error-txt" id="user_work_exp_err" style="display: none;"></span></div><br class="clear">--><div class="section"><label for="mobile_no">Mobile Number <span>*</span></label><input value="" id="mobile_no" name="mobile_no" type="text" class="txt_box" value="" onblur="removeError(event);"/><span class="error-txt" id="mobile_no_err" style="display: none;"></span></div><div style="max-width:85px;margin:0 auto 15px;"><input id="updateUserSubscriptionDetails_btn" onclick="javascript:updateUserSubscriptionDetails(\''+newlid+'\');" type="submit" value="Submit" class="submit-button2" /><a onclick="javascript: _remove_custom_poplayer2('+newlid+');" href="javascript:void(0);" class="skip" style="display:inline-block; line-height:32px; margin-left:10px; font-size:12px;">Skip this</a></div><i class="privacy-icon"></i><p>Your detail will be safe with us. You will only receive the emails that you permitted upon subscription.You can unsubscribe at anytime.</p></form></div>';
					
					$('#_l2_txt_cnt_'+newlid).html(subs_ttl+subscription_form_html);
					
					set_popup_position(newlid);
					
					//$('#user_work_exp').val(tmpData[3]);
					$('#current_company').val(tmpData[2]);
					$('#user_designation').val(tmpData[1]);
					$('#layer_full_name').val(tmpData[0]);
					$('.autocomplete-master-id').val(tmpData[4]);
					$('#mobile_no').val(tmpData[5]);
					
					if(!tmpData[0]){
						$('#layer_full_name').focus();
					} else if(!tmpData[2]){
						$('#current_company').focus();
					} else if(!tmpData[1]){
						$('#user_designation').focus();
					} /*else if(!tmpData[3]){
						$('#user_work_exp').focus();
					}*/ else if(!tmpData[5]){
						$('#mobile_no').focus();
					} 
					
					popupAutoSuggestCompany('common');
				}

			} else {
				if(lid){
					_remove_custom_poplayer2(lid, true);
				}
				
				// jais for thanks page
				//redirect_to_thankspage(email);
				/* if(reg_red_thanks == 'Y'){
					window.location = base_url+'/subscribe/thanks?email='+email;
					return false;
				} */
				
				emailFieldResponse.show();
				
				_profile_email=email;

				if(data[1] != 'Y') {

					/* if (ET_PORTAL == 'retail') { 
						// share/invite
					}  */
					if(typeof demosite != 'undefined' && demosite == 1)
					{
					var newlid = _custom_poplayer2('Thank you for subscribing to the '+SITE_NAME_TITLE+' daily newsletter. We are launching soon. Stay tuned!', '', '', '', 3, '', true);
					$('#_l2_txt_cnt_'+newlid).html('');
					}
					else
					{
					var newlid = _custom_poplayer2('We have sent an activation mail to your mailbox for email confirmation.', '', '', '', 3, '', true);
					$('#_l2_txt_cnt_'+newlid).html('<span class="subtitle">Please click on the link in the mailer to activate your subscription.</span>');
					}
					var source='direct';
					if( typeof $_GET['utm_source'] === 'undefined' || $_GET['utm_source'] === null ){
						source='direct_'+ec_detail_file; 
					}else{
						source=$_GET['utm_source']+'_'+ec_detail_file; 
					}
					ga('send', 'event', 'Newsletter_Signup', 'Position_'+blockPosition,source );
					
					
				}

			}
			
			if(lid){
				if(forward_blk){
					window.location = $.trim($_GET['source']);
				}
			}
			
		} else if(data[0] == 'NVEMAIL' && data[0] != 'BLOCKED') {
			emailFieldResponse.show();
			emailFieldResponse.html('Please provide valid Email id.');
		} else if(data[0] != 'NVEMAIL' && data[0] == 'BLOCKED') {
			if(lid){
				_remove_custom_poplayer2(lid, true);

				if(forward_blk){
					window.location = $.trim($_GET['source']);
				}
			}
			
			_profile_email=email;

			/* if (ET_PORTAL == 'retail') { 
				invite/share code
			} */
			
			var newlid = _custom_poplayer2('We have sent an activation mail to your mailbox for email confirmation.', '', '', '', 3, '', true);
			$('#_l2_txt_cnt_'+newlid).html('<span class="subtitle">You have unsubscribed from our newsletter earlier.<br /> Please click on the link in the mailer to re-activate your  subscription.</span>');

		}
		$('#save_techgig_updates_subsription_btn, #subscriber_btn_top').attr('disabled', false);
	}
	});
	return false;
}

function updateUserSubscriptionDetails(lid) {
	deleteLocalStorage('userData');	
	//var user_work_exp = $.trim($('#user_work_exp').val());
	var user_work_exp = getUserLocation();
	var current_company = $.trim($('#current_company').val());
	var master_company_id = $.trim($('.autocomplete-master-id').val());
	var user_designation = $.trim($('#user_designation').val());
	var layer_full_name = $.trim($('#layer_full_name').val());
	var mobile_no = $.trim($('#mobile_no').val());	
	
	current_company.replace(/ /g,'');
	user_designation.replace(/ /g,'');
	layer_full_name.replace(/ /g,'');
	user_work_exp.replace(/ /g,'');
	master_company_id.replace(/ /g,'');
	mobile_no.replace(/ /g,'');

	var tmpEmail = _profile_email;
	var url = base_url+"/general_ajax_task.php?action=update_user_etretail_subsription_data";
	
	if(layer_full_name)$('#layer_full_name_err').html('').hide();
	if(current_company)$('#current_company_err').html('').hide();
	if(user_designation)$('#user_designation_err').html('').hide();
	if(user_work_exp)$('#user_work_exp_err').html('').hide();
	if(mobile_no)$('#mobile_no_err').html('').hide();
	
	if(!layer_full_name){
		$('#layer_full_name').parent().addClass('error');
		$('#layer_full_name_err').html('Please provide your Full Name.').show();
	}
	if(!current_company){
		$('#current_company').parent().addClass('error');
		$('#current_company_err').html('Please provide your Company name.').show();
	}
	if(!user_designation){
		$('#user_designation').parent().addClass('error');
		$('#user_designation_err').html('Please provide your Designation.').show();
	}
	/*if(!user_work_exp){
		$('#user_work_exp').parent().addClass('error');
		$('#user_work_exp_err').html('Please provide your Location.').show();
	}*/
	if(!mobile_no){
		$('#mobile_no').parent().addClass('error');
		$('#mobile_no_err').html('Please provide your mobile number.').show();
	}
	if(mobile_no){
		if(!validate_mobile(mobile_no)){
			$('#mobile_no').parent().addClass('error');
			$('#mobile_no_err').html('Please provide valid number.').show();
		}
	}
	
	if(!layer_full_name){
		//alert('Please provide your Name');		
		$('#layer_full_name').focus();
		return false;
	} else if(!current_company){
		//alert('Please provide your Company');
		$('#current_company').focus();
		return false;
	} else if(!user_designation){
		//alert('Please provide your Designation');
		$('#user_designation').focus();
		return false;
	} /*else if(!user_work_exp){
		//alert('Please provide your Location');
		$('#user_work_exp').focus();
		return false;
	}*/ else if(!mobile_no){
		//alert('Please provide your Mobile Number');
		$('#mobile_no').focus();
		return false;
	} else if(mobile_no){
		//alert('Please provide your Mobile Number');
		if(!validate_mobile(mobile_no)){
			$('#mobile_no').focus();
			return false;
		}
	}
	
	$('#updateUserSubscriptionDetails_btn').attr('disabled', true);
	
	$.ajax({url:url, type:"POST", xhrFields: { withCredentials: true }, data: {'email':tmpEmail, 'user_work_exp':user_work_exp, 'current_company':current_company, 'master_company_id':master_company_id, 'user_designation':user_designation, 'layer_full_name':layer_full_name, 'mobile_no':mobile_no}, success: function(data) {
		data = $.trim(data);
		data = data.split('#|#');
		
		// jng on 13-02-2014 If came from Mailer redirection file and after popup display all fields are filled then redirect to Source File
		if(fromMail_redirect_flag == 'Y') {
			$('#_l2_ttl_'+lid).html('Thank you. <br />Redirecting...');
			$('#_l2_txt_cnt_'+lid).hide();
			window.location = $.trim($_GET['source']);
			return false;
		}

		if(data[0].length > 0) {
			//set_popup_position(lid);
			if(data[0] > 0) {

				/* if (ET_PORTAL == 'retail') {
					// share/invite
				}  */
				
				$('#_l2_ttl_'+lid).html('Thanks for your details.');
				$('#_l2_txt_cnt_'+lid).html('<span class="subtitle">We hope you will like the newsletters. If you have any feedback, please reach us on <a href="mailto:' + CONTACTUS_EMAILS[ET_PORTAL] + '">' + CONTACTUS_EMAILS[ET_PORTAL] + '</a></span>');
				profileComplete = false; 
	            $('.l2_outer_bx').removeClass("none_closable");
			} else if(data[0] == 'E') {
				
				$('#_l2_ttl_'+lid).html('Thanks for your details.');
				$('#_l2_txt_cnt_'+lid).html('<span class="subtitle">We hope you will like the newsletters. If you have any feedback, please reach us on <a href="mailto:' + CONTACTUS_EMAILS[ET_PORTAL] + '">' + CONTACTUS_EMAILS[ET_PORTAL] + '</a></span>');
				
				/* if (ET_PORTAL == 'retail') { 
					// share/invite
				}  */
				profileComplete = false; 
            	$('.l2_outer_bx').removeClass("none_closable");
			} else { 

				/* if (ET_PORTAL == 'retail') { 
					// share/invite
				} else { */

					_remove_custom_poplayer2(lid);
					profileComplete = false; 
            		$('.l2_outer_bx').removeClass("none_closable");

				//} 
			}
			check_login_status();
		}
		$('#updateUserSubscriptionDetails_btn').attr('disabled', false);
	}
	});
}


// $(window).resize(function()
// {
	// if($(window).width()<767){
		// var navHeight = $(window).height();         
		// $("ul.level1").css("max-height",navHeight); 
	// }
// });

$(window).load(function(e) {	
	try{
		initUnveilImg();
	} catch(e){}
});

function callSetSlider(idStr)
{
	$(idStr).niceScroll();
}

// sharing functions
function facebook_share(link_url, image_url, title, description) {
	//var url = 'http://www.facebook.com/sharer.php?s=100&p[title]='+title+'&p[summary]='+description+'&p[url]='+link_url+'&p[images][0]='+image_url;
	//var url='https://www.facebook.com/dialog/feed?app_id='+FACEBOOK_APPID+'&display=popup&name='+title+'&description='+description+'&link='+link_url+'&redirect_uri='+link_url+'&picture='+image_url;
	var url='http://www.facebook.com/sharer.php?app_id='+FACEBOOK_APPID+'&u='+link_url+'&title='+title+'&display=popup&ref=plugin&src=share_button';
	window.open(url, 'sharer' + getRandomInt(1000,9999), 'toolbar=0,status=0,width=548,height=325');
	return false;
}

function twitter_share(title, link_url) {
	var url = 'https://twitter.com/intent/tweet?text='+title+'&tw_p=tweetbutton&url='+link_url
	window.open(url, 'sharer' + getRandomInt(1000,9999), 'toolbar=0,status=0,width=548,height=325');
	return false;
}

function linkedin_share(title, link_url, summary, source) {
	var url = 'http://www.linkedin.com/shareArticle?mini=true&url='+link_url+'&title='+title+'&summary='+summary+'&source='+source;
	window.open(url, 'sharer' + getRandomInt(1000,9999), 'toolbar=0,status=0,width=548,height=325');
	return false;
}

function googleplus_share(title, link_url, summary) {
	var url = 'http://plus.google.com/share?url='+link_url;
	window.open(url, 'sharer' + getRandomInt(1000,9999), 'toolbar=0,status=0,width=548,height=325');
	return false;
}

function whatsapp_share(title, link_url, summary) {
	var url = ((deviceType != 'mobile')?'https://wa.me/':'whatsapp://send')+'?text='+encodeURIComponent(link_url);
	window.open(url, 'sharer' + getRandomInt(1000,9999), 'toolbar=0,status=0,width=548,height=325');
	return false;
}

function facebook_share_new(sh_title, sh_description, sh_url, sh_pic) {
	url='https://www.facebook.com/dialog/feed?app_id='+FACEBOOK_APPID+'&display=popup&name='+sh_title+'&description='+sh_description+'&link='+sh_url+'&redirect_uri='+sh_url+'&picture='+sh_pic;
	window.open(url, 'sharer' + getRandomInt(1000,9999), 'toolbar=0,status=0,width=548,height=325');
	return false;
}

function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function openWindow(url,name,specs){
	window.open(url, ((name=='sharer')?'sharer'+getRandomInt(1000,9999):name), specs);
}

function search_content(id){ 
	var content = $.trim($('#'+id).val()); 
	$('#'+id).val(content);
	if(!content) return false;
	content = content.replace(/\s+/g, '+').toLowerCase();
	var encodedStr = encodeURIComponent(content).replace(/'/g, "%27");
	encodedStr = encodedStr.replace(/%2B/g,'+');
	window.location = base_url+"/search/"+encodedStr;
}

function send_tip() { 

	var tip_type = $.trim($('input[name=tiptype]:checked', '#tipform').val()); 
	var tip_user = $.trim($('#tip_user').val());
	var tip_email = $.trim($('#tip_email').val());
	var tip_desc = $.trim($('#tip_desc').val());
	var tip_title = '';
	var error = false;
    var pipCategoryId = $.trim($('#pipCategoryId').val());
    
	$('#tip_user, #tip_email, #tip_desc').removeClass('error');
	if(!tip_user) {
		$('#tip_user').addClass('error');
		error = true;
	}

	if(!tip_email) {
		$('#tip_email').addClass('error');
		error = true;
	}

	if(!tip_desc) {
		$('#tip_desc').addClass('error');
		error = true;
	}

	if(error == false){ 
		var url = base_url+"/general_ajax_task.php?action=save_tip";
		$.post(url,{'tip_type':tip_type, 'tip_user':tip_user, 'tip_email':tip_email, 'tip_title':tip_title, 'tip_desc':tip_desc, 'pipCategoryId':pipCategoryId},function(data) {

			data = data.split('#|#');

			if(data[0].length > 0) { 
				if($.trim(data[0]) == 'success'){ 
					$('.tip .inner').slideUp();
					$('#tip_user').val('');
					$('#tip_email').val('');
					$('#tip_desc').val('');
					$('#pitch_box').fadeOut();
					$('#pitch_success').fadeIn();
				} else if($.trim(data[1]) == 'email'){
					$('#tip_email').addClass('error');
				}
			}
		});
	}  

	return false;
}
var login_popup_screens = {};
var login_popup_display_type = 1;
login_popup_screens['screen1'] = {};
login_popup_screens['screen1']['html'] = ['<div class="terms">By continuing, I agree to the <a href="'+base_url+'/terms_conditions.php" target="_blank">Terms of Service</a> and <a href="'+base_url+'/privacy_policy.php" target="_blank">Privacy Policy</a>.</div><div class="connect_btns"><a onclick="login_with_linkedin()" class="connect_btn"><i class="fa fa-linkedin-square"></i>Continue with Linkedin</a><span class="or">or</span><a onclick="login_with_facebook()" class="connect_btn"><i class="fa fa-facebook-square"></i>Continue with Facebook</a><br /><a onclick="login_with_google()" class="connect_btn"><i class="fa fa-google"></i>Continue with Google</a></div><div class="ftr"><h4>Why do I need to sign in?</h4><p>This will help us serve you better and provide you a personalized experience.</p></div>'];
login_popup_screens['screen1']['links'] = ['<a class="login_link" onclick="javascript:switch_screen(\'screen2\')" href="#">I Have '+SITE_NAME_TITLE+' Account</a><span>&bull;</span><a onclick="javascript:switch_screen(\'screen3\')" class="login_link" href="#" >Sign Up With Email</a>'];

login_popup_screens['screen2'] = {};
login_popup_screens['screen2']['html'] = ['<div id="login-form"><h3>LOGIN</h3> <p id="log_main_err" class="error error_info"></p>  <div class="section"><input type="email" id="log_email" placeholder="Email" class="txt_box" value="">   <i class="fa fa-envelope"></i><p id="log_email_err" class="error"></p></div>  <div class="section">   <input type="password" id="log_pswd" placeholder="Password" class="txt_box">   <i class="fa fa-lock"></i> <p id="log_pswd_err" class="error"></p>  </div>  <div class="section">   <label for="remember_me" class="remember"><input type="checkbox" id="remember_me" checked=""> Remember me</label></div><div class="section">   <a id="forgot_pswd_link" class="forgot">Forgot password?</a>   <input type="submit" id="log_submit" class="submit-button2 disabled" onclick="login_user(1);" value="Login">   </div> <p class="tos">By logging in you indicate that you have read and agree to the <a href="'+base_url+'/terms_conditions.php" target="_blank">Terms of Service</a> and <a href="'+base_url+'/privacy_policy.php" target="_blank">Privacy Policy</a>.</p></div><div id="forgot_psswrd" style="display:none;">    <h3>Please enter your E-mail Id</h3>    <p id="main_err_frgt_pwd" class="success_msg"></p>    <div class="section">        <input id="frgt_pswd_email" type="email" placeholder="Email" class="txt_box" value="" />        <i class="fa fa-envelope"></i>        <p class="error" id="frgt_email_err"></p>    </div>    <div class="section">        <a id="login_back_link" class="backto-login">Back to login</a>        <input type="submit"  class="submit-button2" value="Send" onclick="forgot_password();" />    </div></div>'];
login_popup_screens['screen2']['links'] = ['<a class="login_link" onclick="javascript:switch_screen(\'screen1\')" href="#">Login With Social Accounts</a><span>&bull;</span><a class="login_link" onclick="javascript:switch_screen(\'screen3\')" href="#" >Sign Up With Email</a>'];

login_popup_screens['screen3'] = {};
login_popup_screens['screen3']['html'] = ['<div id="signup-form" style=""><h3>SIGNUP</h3><p id="main_err" class="error error_info"></p><div class="section clearfix">  <label for="registration_name">Full Name</label>  <input type="text" name="registration_name" id="registration_name" placeholder="Name" class="txt_box"><p id="reg_name_err" class="error"></p></div><div class="section clearfix">  <label for="registration_email">Email</label>  <input type="email" name="registration_email" id="registration_email" placeholder="Email" class="txt_box"> <p id="reg_email_err" class="error"></p>  </div>   <div class="section clearfix">  <label for="registration_password">Password</label>  <input type="password" name="registration_password" id="registration_password" placeholder="Password" class="txt_box"> <p id="reg_pwd_err" class="error"></p>  </div>   <div class="section">  <p class="tos">By clicking "Sign Up" you indicate that you have read and agree to the <a href="'+base_url+'/terms_conditions.php" target="_blank">Terms &amp; Conditions.</a></p></div><div class="section clearfix">  <input type="submit" onclick="javascript:user_registeration(1);" class="submit-button2" value="SIGNUP"></div></div><div class="ftr"><h4>Why do I need to sign in?</h4><p>This will help us serve you better and provide you a personalized experience.</p></div>'];
login_popup_screens['screen3']['links'] = ['<a class="login_link" onclick="javascript:switch_screen(\'screen1\')" href="#" >Login With Social Accounts</a><span>&bull;</span><a  class="login_link" onclick="javascript:switch_screen(\'screen2\')" href="#" >I Have '+SITE_NAME_TITLE+' Account</a>'];
//console.log(screens);

function switch_screen($calledscreen){
	$(".popup5").find(".popup-screens").html(login_popup_screens[$calledscreen]['html'][0]);
	$(".popup5").find(".links_outside").html(login_popup_screens[$calledscreen]['links'][0]);
}
function _custom_poplayer2(tit, wide, custom_function, add_class, head, close, remove_large, href, ftr_msg) {	
	if (B2B_SSO_LOGIN == 1){
		return false;
	}
	$('.l2_outer_bx.transparent').remove();
	close = (typeof demosite != 'undefined' && demosite==1)?'N':close;
	//console.log('_custom_poplayer2');
	if(show_subscription_layer_timeout)clearTimeout(show_subscription_layer_timeout);	
	// custom_function is the function that can be passed as a param to this function to be excecuted after calling this layer. make sure that it is defined.
	if(!remove_large){
		remove_large = false;
	}
	if(!tit){
		tit='';
	}
	if(!head){
		head=2;
	}
	if(!href){
		href='';
	}
	var l2_id='';
	l2_id = parseInt($('.l2_outer_bx').length) + 1;
	var obj_id = "_l2_id_"+l2_id;

	var layer_op = "0.85";
	if(l2_id > 1){ 
		layer_op = "0";
	}

	var xtra_cls = ' ';
	if(add_class){
		xtra_cls += add_class;
	}

	/* if(two_col_rt && !remove_large){
		xtra_cls += ' large';
	} */

	//type = '';
	if(head == 1){ 
		// var close_txt = '<a onclick="javascript: _remove_custom_poplayer2('+l2_id+');" class="close"><i class="fa fa-times"></i></a>';
		var close_txt = '<a onclick="javascript: _remove_custom_poplayer2('+l2_id+');" class="close" style="z-index:9999">x</a>';
		if(close == 'N' || gbl_lyr_close == 'N'){
			close_txt = '';
		} 
		
		//if(!ftr_msg) ftr_msg = 'This will help us serve you better and provide you a personalized experience.';
		
		var ttl_str = '';
		if(tit) ttl_str = '<h2 id="_l2_ttl_'+l2_id+'">'+tit+'</h2>';
		
		var append_str = '<div id="'+obj_id+'" class="popup5 l2_outer_bx '+xtra_cls+'" style="display:none;">'+ttl_str+'<div class="_l2_txt_cnt content clearfix" id="_l2_txt_cnt_'+l2_id+'"><span class="_l2_pre_load" id="_l2_pre_load_'+l2_id+'"><span class="loader">&nbsp;</span>Loading...</span></div>';
		if(ftr_msg!='N' && login_popup_display_type==2){
		ftr_msg = 'This will help us serve you better and provide you a personalized experience.';
		append_str=append_str + '<div id="_l2_btm_'+l2_id+'" class="ftr"><h4>Why do I need to sign in?</h4><p>'+ftr_msg+'</p></div>';
		}
		append_str=append_str + close_txt+'</div>';
		//var append_str = '<div id="'+obj_id+'" class="popup5 V2 '+xtra_cls+'" style="display:none;">'+ttl_str+'<div class="popup-screens">'+ login_popup_screens['screen1']['html'][0] +'</div><div class="links_outside">'+ login_popup_screens['screen1']['links'][0] +'</div>'+close_txt+'</div>';
	}
	else if(head == 2){
		// if need close btn 
		var close_txt = '<a href="javascript:void(0);" style="z-index:9999" class="close" onclick="javascript: _remove_custom_poplayer2('+l2_id+');">Close X</a>';
		if(close == 'N' || gbl_lyr_close == 'N'){
			close_txt = '';
		} 

		var append_str = '<div id="'+obj_id+'" class="l2_outer_bx popup1 pop'+head+' '+xtra_cls+'" style="display:none;"><div class="_l2_txt_cnt content clearfix" id="_l2_txt_cnt_'+l2_id+'"><span class="_l2_pre_load" id="_l2_pre_load_'+l2_id+'"><span class="loader">&nbsp;</span>Loading...</span></div><div id="_l2_btm_'+l2_id+'"></div>'+close_txt+'</div>';
	} else if(head == 3){
		// if need close btn 
		var close_txt = '<a href="javascript:void(0);" style="z-index:9999" class="close" onclick="javascript: _remove_custom_poplayer2('+l2_id+');"></a>'; //<span>Close</span>
		if(close == 'N' || gbl_lyr_close == 'N'){
			close_txt = '';
		} 
		
		var append_str = '<div id="'+obj_id+'" class="l2_outer_bx popup1 pop'+head+' '+xtra_cls+'" style="display:none;">'+close_txt+'<h2 id="_l2_ttl_'+l2_id+'" class="thnkTx '+((tit)?'':'hide')+'">'+tit+'</h2><div class="_l2_txt_cnt content clearfix" id="_l2_txt_cnt_'+l2_id+'"><span class="_l2_pre_load" id="_l2_pre_load_'+l2_id+'"><span class="loader">&nbsp;</span>Loading...</span></div><div id="_l2_btm_'+l2_id+'"></div></div>';
	} else{style="z-index:9999" 
		// if need close btn 
		var close_txt = '<a href="javascript:void(0);" style="z-index:9999" class="close" onclick="javascript: _remove_custom_poplayer2('+l2_id+');">X</a>';
		if(close == 'N' || gbl_lyr_close == 'N'){
			close_txt = '';
		} 

		var append_str = '<div id="'+obj_id+'" class="l2_outer_bx popup1 '+xtra_cls+'" style="display:none;"><div class="fb-blue-head">'+close_txt+'<h2 id="_l2_ttl_'+l2_id+'">'+tit+'</h2></div><div class="_l2_txt_cnt content clearfix" id="_l2_txt_cnt_'+l2_id+'"><span class="_l2_pre_load" id="_l2_pre_load_'+l2_id+'"><span class="loader">&nbsp;</span>Loading...</span></div><div id="_l2_btm_'+l2_id+'"></div></div>';
	}

	$("body").append(append_str);

	$("#"+obj_id).show().css({width:wide+'px'});
	if(add_class != 'transparent fadeInUp')
	{
	var lay = $("body").append("<div id='l2_overlay_bx_"+l2_id+"' class='overlay "+xtra_cls+"' style='z-index:9997;'></div>");
	$("#l2_overlay_bx_"+l2_id).css({opacity:layer_op});
	}
	else //minimized subscribe text for mobile
	{	
		$("#"+obj_id).prepend('<span class="slideup-btn" onclick="$(\'#'+obj_id+'\').addClass(\'slideup\')">Subscribe To Newsletter</span>');
	}
	try{ 
		if(href && custom_function) custom_function(href, l2_id);
		else if(custom_function) custom_function(l2_id);
	}catch(e){}
	
	if(head == 1){ 
		login_popup_display_type = 1;
	}
	if(add_class != 'transparent fadeInUp')
	{
		set_popup_position(l2_id);
		//if($('#l2_wrapper_'+l2_id).length == 0)
		//$("#"+obj_id).wrap( "<div class='l2_wrapper' id='l2_wrapper_"+l2_id+"'></div>" );
	

		$( window ).resize(function() {
			
			try{
				set_popup_position(l2_id);
				//if($('#l2_wrapper_'+l2_id).length == 0)
				//$("#"+obj_id).wrap( "<div class='l2_wrapper' id='l2_wrapper_"+l2_id+"'></div>" );
	
			} catch(e){}

			    

		});
	}
	if(profileComplete){
		//$('.l2_outer_bx').addClass("none_closable");
	}
	else{
      $('.l2_outer_bx').removeClass("none_closable");
    }
	return l2_id;
} 

function set_popup_position(lid){ 
	var obj_id = "_l2_id_"+lid;
	if($('#l2_wrapper_'+lid).length == 0)
	$("#"+obj_id).wrap( "<div class='l2_wrapper1' id='l2_wrapper_"+lid+"' style='position:fixed;left:0px;right:0px;top:0px;bottom:0px;z-index:9998'></div>" );
	
	if($.trim($('#_l2_ttl_'+lid).text()) == ''){
		$('#_l2_ttl_'+lid).css({'margin':'0'});
	} else{
		$('#_l2_ttl_'+lid).css({'margin':'0 auto 15px'});
	}
	divH = document.documentElement.clientHeight || document.body.clientHeight;
	divW = document.documentElement.clientWidth || document.body.clientWidth;
	
	layerH = $('#'+obj_id).outerHeight();
	layerW = $('#'+obj_id).outerWidth();
	
	var topPos = (divH-layerH)/2;
	var leftPos = (divW-layerW)/2;
	if(topPos < 0)
		topPos = 10;
	$("#"+obj_id).css({top:topPos+"px",left:leftPos+"px",position:'relative'});
	if(divH < layerH){
		$("#"+obj_id).parent().css('overflow-y','auto');
	}
	return;
}

function set_popup_position_backup(lid){ 
	var obj_id = "_l2_id_"+lid;
	if($.trim($('#_l2_ttl_'+lid).text()) == ''){
		$('#_l2_ttl_'+lid).css({'margin':'0'});
	} else{
		$('#_l2_ttl_'+lid).css({'margin':'0 auto 15px'});
	}
	divH = document.documentElement.clientHeight || document.body.clientHeight;
	divW = document.documentElement.clientWidth || document.body.clientWidth;
	
	layerH = $('#'+obj_id).outerHeight();
	layerW = $('#'+obj_id).outerWidth();
	
	var topPos = (divH-layerH)/2;
	var leftPos = (divW-layerW)/2;
	if(divH < layerH+40){
		topPos = $(window).scrollTop() + 20;
		if(deviceType == 'desktop')
		$("#"+obj_id).css({top:topPos+"px",left:leftPos+"px"});
		else
		$("#"+obj_id).css({top:topPos+"px",left:leftPos+"px",position:"absolute"});
	}
	else
	$("#"+obj_id).css({top:topPos+"px",left:leftPos+"px"});
}


function _remove_custom_poplayer2(obj, skip_close_btn){
	if(obj){
		var is_close = parseInt($('#_l2_id_'+obj+' a.close').length);
		if(is_close || skip_close_btn === true){
			var hideAll="#_l2_id_"+obj+",#l2_overlay_bx_"+obj+",#l2_wrapper_"+obj;
			if($("#_l2_id_"+obj).hasClass('fadeInUp'))
			{
				$("#_l2_id_"+obj).removeClass('fadeInUp').addClass('fadeInDown');
				/*setTimeout(function(){
					$(hideAll).remove();
				},1000);*/
				$(hideAll).remove();
			}
			else
			$(hideAll).remove();
			if(pAction == 'profile_completion'){
				var $skipprofilecompletion = getLocalStorage('skipprofilecompletion');
				if($skipprofilecompletion){
					if($skipprofilecompletion.value==null || $skipprofilecompletion.value==false){
						setLocalStorage('skipprofilecompletion',{'value':true,'count':1},1);
					}else if($skipprofilecompletion.value==true){
						if($skipprofilecompletion.count >= 3){
							setLocalStorage('skipprofilecompletion',{'value':true,'count':4},7);
						}else{
							setLocalStorage('skipprofilecompletion',{'value':true,'count':parseInt($skipprofilecompletion.count)+1},1);
						}
					}
				} else{
					setLocalStorage('skipprofilecompletion',{'value':true,'count':1},1);
				}
			}
			if(set_pop_cookie == 'Y'){ 
				setCookie(ET_PORTAL + '_pop_user_sub_close', set_cookie_email, ET_SUB_SOURCE_COOKIE);
			}
			// jng on 13-02-2014
			var is_source = $.trim($_GET['source']);
			if(fromMail_redirect_flag == 'Y' && is_source){
				window.location = is_source;
			}
		}
	}
}

function goToNews(src, obj){
	if(obj){
		var is_close = parseInt($('#_l2_id_'+obj+' a.close').length);
		if(is_close || skip_close_btn === true){
			var hideAll="#_l2_id_"+obj+",#l2_overlay_bx_"+obj;
			$(hideAll).remove();
			if(set_pop_cookie == 'Y'){ 
				setCookie(ET_PORTAL + '_pop_user_sub_close', set_cookie_email, ET_SUB_SOURCE_COOKIE);
			}
			
			var win = window.open(src, '_blank');
		}
	}
}

function show_subscription_layer2(lid){
	if (B2B_SSO_LOGIN == 1){
		return false;
	}
	var profile_email = _profile_email;

	$('#_l2_txt_cnt_'+lid).html('<div class="subscribe-form"><form action="#" onsubmit="javascript:return save_techgig_updates_subsription(\'pop\', '+lid+'); return false;" method="post"><p class="clearfix"><input name="subscribe_email_pop" id="subscribe_email_pop" type="text" class="textbox" placeholder="Your email" value="'+profile_email+'"><input id="save_techgig_updates_subsription_btn" type="submit" class="submit" value="Subscribe"></p></form><p id="subcribe_response_pop" class="error"></p></div>');
	$('#subscribe_email_pop').focus();

}

function show_subscription_layer(lid){ 
	if (B2B_SSO_LOGIN == 1){
		return false;
	}
	if(!prevent_default_layers){
	    set_pop_cookie = 'Y';
		var profile_email = _profile_email;
		var is_show_pop = $.trim($_GET['show_pop']);
		var is_source = $.trim($_GET['source']);
		if (is_show_pop == 'Y' && is_source) {
			forward_blk = '<p class="more-lnk"><a target="_blank" href="' + is_source + '">Go to news &raquo;</a></p>';
		}
		var bottom_txt = '';
		/*
		if(ET_PORTAL == 'retail'){
			
			//two_col_rt = '<div class="right-column testimonial"><div class="slides"><div class="slide"><img alt="utsav seth" src="'+base_url+'/Themes/Release/images/responsive/utsav-seth.png"><blockquote><p>"The ETRetail newsletter is a very good bulletin. It has got big commercial angle attached, and also focuses on macro-economic issues,"</p></blockquote><span class="name">Utsav Seth</span><span class="designation">CEO &amp; Managing Director, Pavers England Limited</span></div></div></div>';
			
			//$("#_l2_id_"+lid).addClass('large');
			
		} 
		
		
		else if(ET_PORTAL == 'auto'){
			
			//bottom_txt = '<div class="spnsrs"><h5><span>Supported by:</span></h5><img alt="acma" src="http://auto.economictimes.indiatimes.com/Themes/Release/images/responsive/acma.jpg" /><img alt="atma" src="http://auto.economictimes.indiatimes.com/Themes/Release/images/responsive/atma.jpg" /><img alt="fada" src="http://auto.economictimes.indiatimes.com/Themes/Release/images/responsive/fada.jpg" /><img alt="siam" src="http://auto.economictimes.indiatimes.com/Themes/Release/images/responsive/siam.jpg" /></div>';
			//$("#_l2_id_"+lid).addClass('large');
		} else if(ET_PORTAL == 'health'){
			
			//bottom_txt = '<div class="spnsrs"><h5><span>Supported by:</span></h5><img alt="acma" src="'+THEME_PATH+'/images/responsive/aimed.jpg" /><img alt="atma" src="'+THEME_PATH+'/images/responsive/dma.jpg" /><img alt="fada" src="'+THEME_PATH+'/images/responsive/ida.jpg" /><img alt="atma" src="'+THEME_PATH+'/images/responsive/nathealthindia-1.jpg" /></div>';
			//$("#_l2_id_"+lid).addClass('large');
		}
		*/
		var logoDiv = $(".logos").html();
		if(logoDiv != undefined && logoDiv!='')
		{
			var prtlSpnsrTxt = "Supported by:";
			if(ET_PORTAL == 'brandequity')prtlSpnsrTxt = "Associate Partner:";
			bottom_txt = '<div class="spnsrs"><h5><span>'+prtlSpnsrTxt+'</span></h5>'+logoDiv+'</div>';
		}else
		{
			bottom_txt = '';
		}
	    
	    // Pip Check
	    if(is_pip)
	    {
	        SUBSCRIPTION_TAGLINES[ET_PORTAL] = pip.subscriptionTagline;
	    }

		var extra_skip_option='';
	    
	    // Get newsletter subcribing content as per single/multiple subscribe condition
	    var newsletterHtmlContent = '';
	    if (typeof allowMultipleNewsletterSubscription != 'undefined' && allowMultipleNewsletterSubscription == 1) {
	        fieldPostfix = 'pop';
	        newsletterHtmlContent = getMultiSubscribeNewsletterContent(profile_email, extra_skip_option, fieldPostfix, lid);
	    } else {
	        newsletterHtmlContent = '<form action="#" onsubmit="javascript:return save_techgig_updates_subsription(\'pop\', '+lid+'); return false;" method="post"><div style="max-width:380px;margin:0 auto;"><input name="subscribe_email_pop" id="subscribe_email_pop" type="text" class="txt_box fl" placeholder="Your email" value="'+profile_email+'" />&nbsp;&nbsp;<input id="save_techgig_updates_subsription_btn" type="submit" class="submit-button2" value="Subscribe" />'+extra_skip_option+'<p id="subcribe_response_pop" class="error"></p></div></form><div class="consent-popup"> <input type="checkbox" id="consentPopup_pop" name="consent Popup"> <label for="consentPopup_pop" style="text-align:left;"> I have read <a target="_blank" href="/privacy_policy.php">Privacy Policy</a> and <a target="_blank" href="/terms_conditions.php">Terms &amp; Conditions</a> and agree to receive newsletters and other communications on this email ID.</label></div><div id="subcribe_consentPopup_pop" class="subcribe_consentPopup et-rtl-error" style="display:block;"></div>';
	    }

	    if(!(typeof is_subscription_page != 'undefined' && is_subscription_page == 'Y'))
		extra_skip_option='<a onclick="javascript: _remove_custom_poplayer2('+lid+');" href="javascript:void(0);" class="skip" style="display:inline-block; line-height:32px; margin-left:10px; font-size:12px;">Skip this</a>';
		//$('#_l2_txt_cnt_'+lid).html('<div class="subscribe-form subscribeBx">'+((typeof demosite != 'undefined' && demosite == 1)?'<span class="cmngTx">Coming Soon!</span><img class="popLogo" src="'+($(".logo a").eq(0).css('background-image').replace(/"|\(|\)|url/g,''))+'" alt="">':'')+'<h2>Stay updated with the latest news in the '+SITE_CUSTOM_TITLES[ET_PORTAL]+' sector with our daily newsletter</h2><span class="subtitle">' + SUBSCRIPTION_TAGLINES[ET_PORTAL] + '</span>'+newsletterHtmlContent+'<br class="clear" />'+forward_blk+'</div>'+two_col_rt+bottom_txt);
		$('#_l2_txt_cnt_'+lid).html('<div class="subscribe-form subscribeBx">'+((typeof demosite != 'undefined' && demosite == 1)?'<span class="cmngTx">Coming Soon!</span><img class="popLogo" src="'+($(".logo img").eq(0).attr('src').replace(/"|\(|\)|url/g,''))+'" alt="">':'')+'<h2>Stay updated with the latest news in the '+SITE_CUSTOM_TITLES[ET_PORTAL]+' sector with our daily newsletter</h2><span class="subtitle">' + SUBSCRIPTION_TAGLINES[ET_PORTAL] + '</span>'+newsletterHtmlContent+'<br class="clear" />'+forward_blk+'</div>'+two_col_rt+bottom_txt);
		// $('#_l2_txt_cnt_'+lid +" img").css({'background-color':'#ffffff','margin':'0px','border':'none','padding':'2px','width':'auto'}).wrap('<div style="border:1px solid #c3c3c3;padding:3px;display:inline-block;margin-right:10px">','</div>');
		$('#subscribe_email_pop').focus();
		if(typeof auto_subscribe_submit != 'undefined' && auto_subscribe_submit == 1)
		$("#save_techgig_updates_subsription_btn").trigger('click');
		//$(window).scrollTop(0);
		if(bottom_txt != '')if(ET_PORTAL == 'brandequity')$("#_l2_txt_cnt_1 .spnsrs a").removeAttr("href");
	}
}

/*
 * @description Get content for multi subscribe to newsletter
 * 
 * @param {string} profile_email
 * @param {string} extra_skip_option
 * @param {string} fieldPostfix
 * @param {integer} lid
 *
 * @returns {string}
 */
function getMultiSubscribeNewsletterContent(profile_email, extra_skip_option, fieldPostfix, lid) 
{
    if (typeof profile_email == 'undefined' || profile_email === null) {
        profile_email = '';
    }
    
    if (typeof extra_skip_option == 'undefined' || extra_skip_option === null) {
        extra_skip_option = '';
    }
    
    if (typeof fieldPostFix == 'undefined' || fieldPostFix === null) {
        fieldPostFix = '';
    }
    
    if (typeof lid == 'undefined' || lid === null) {
        lid = 1;
    }
    
    var subscriptionNewsletterHtml = "";
    
    subscriptionNewsletterHtml += '<form id="subsfrm" style="" method="post" action="" onsubmit="return subscribeToMultipleNewsletters(\''+fieldPostfix+'\', '+lid+');">';
    subscriptionNewsletterHtml += '<div style="max-width:380px;margin:0 auto;">';
    subscriptionNewsletterHtml += '<input name="subscriber_email_'+fieldPostfix+'" id="subscriber_email_'+fieldPostfix+'" class="txt_box fl" placeholder="Your email" value="'+profile_email+'" />&nbsp;&nbsp;';
    subscriptionNewsletterHtml += '<input type="submit" id="saveSubscribeToMultipleNewsletters" class="submit-button2" value="Subscribe">'+extra_skip_option;
    subscriptionNewsletterHtml += '<p style="color:#FF0000;" id="subscription_error_message_'+fieldPostfix+'" class="error"></p>';

    var showNewsletterCheckbox = '';
    if(typeof newsletterList != 'undefined' && Object.keys(newsletterList).length == 1 ) {
        showNewsletterCheckbox = 'style="display:none;"';
    }

    subscriptionNewsletterHtml += '<ul class="nwsltr_lst clearfix" '+showNewsletterCheckbox+'>';
    if(typeof newsletterList != 'undefined' && Object.keys(newsletterList).length != 0) {
        $.each(newsletterList, function(key, value){
            // Make default newsletter checkedd
            var isChecked = "";
            if((value.newsletterName == 'Daily ET Newsletter') || 
                (is_pip == 1 && pip.newsletterId == value.id)) {
                    isChecked = "checked";
                }

            subscriptionNewsletterHtml += '<li>';
            subscriptionNewsletterHtml += '<label>';
            subscriptionNewsletterHtml += '<input type="checkbox" class="multiSubscribeNewsletter" name="newsletterId_'+fieldPostfix+'" value="'+value.id+'" '+isChecked+'>';
            subscriptionNewsletterHtml += '<h4>'+value.newsletterDisplayName+'</h4>';
            subscriptionNewsletterHtml += '</label>';
            subscriptionNewsletterHtml += '</li>';
        });
    }
    subscriptionNewsletterHtml += '</ul>';

    subscriptionNewsletterHtml += '</div>';
    subscriptionNewsletterHtml += '</form>';
    subscriptionNewsletterHtml += '<div class="consent-popup"> <input type="checkbox" id="consentPopup_pop" name="consent Popup"> <label for="consentPopup_pop" style="text-align:left;"> I have read <a target="_blank" href="/privacy_policy.php">Privacy Policy</a> and <a target="_blank" href="/terms_conditions.php">Terms &amp; Conditions</a> and agree to receive newsletters and other communications on this email ID.</label></div><div id="subcribe_consentPopup_pop" class="subcribe_consentPopup et-rtl-error" style="display:block;"></div>';
    
    return subscriptionNewsletterHtml;
}

function launch_page_blocker(lid){ 
	$('#_l2_txt_cnt_'+lid).html('<div class="subscribe-form single-column"><img class="logo" src="'+base_url+'/Themes/Release/images/responsive/logo-' + ET_PORTAL + '-1.png" alt="Logo" />'+two_col_rt+'</div>');
}

function resubscribe(lid) { 
	var resubscribe_email = $('#resubscribe_email').val();
	if(resubscribe_email.replace(/ /g,'') == "") {
		$('#resubsribe_err').html('Please provide your Email Id').show();
		$('#resubscribe_email').val('');
		$('#resubscribe_email').focus();
		return false;
	} else if(!is_valid_email(resubscribe_email)){
		$('#resubsribe_err').html('Invalid Email Id').show();
		$('#resubscribe_email').focus();
		return false;
	}
	$('#resubscribe').attr('disabled', true);
	var url = base_url+"/general_ajax_task.php?action=remove_user_email_from_block_list";
	$.post(url,{'block_email':resubscribe_email},function(data) {
		data = data.split('#|#');
		if(data[0].length > 0) {
			if(lid){
				$('#_l2_ttl_'+lid).html('You have successfully reactivated your subscription.');
				$('#_l2_txt_cnt_'+lid).hide();
				setTimeout(function() {
					_remove_custom_poplayer2(lid);
					//window.location =  base_url;
				}, 3000);
			}
		}
		$('#resubscribe').attr('disabled', false);
	});
}

function unsubscribe(lid) { 
	var unsubscribe_email = $('#unsubscribe_email').val();
	if(unsubscribe_email.replace(/ /g,'') == ""){
		$('#unsubscribe_err').html('Please provide your Email Id').show();
		$('#unsubscribe_email').val('');
		$('#unsubscribe_email').focus();
		return false;
	} else if(!is_valid_email(unsubscribe_email)){
		$('#unsubscribe_err').html('Invalid Email Id').show();
		$('#unsubscribe_email').focus();
		return false;
	}
	$('#unsubscribe_btn').attr('disabled', true);
	var activity_name = $.trim($_GET['activity_name']);
	var url = base_url+"/general_ajax_task.php?action=unsubsribe_user_email";
	$.post(url,{'block_email':unsubscribe_email,'activity_name':activity_name},function(data) {
		data = data.split('#|#');
		if(data[0].length > 0) {
			if(lid){
				$('#_l2_ttl_'+lid).html('You have successfully unsubscribed.');
				$('#_l2_txt_cnt_'+lid).hide();
				setTimeout(function() {
					_remove_custom_poplayer2(lid);
					//window.location =  base_url;
				}, 3000);
			}
		}
		$('#unsubscribe_btn').attr('disabled', false);
	});
}

//for event tracking

function eventTracker(){
	if(typeof window['ga'] == 'undefined')
	return;
	var secname='NA';
	var gapage = '';
	if(ec_detail_file=='index.php')
	gapage = 'Page_index';
	else if(ec_detail_file=='etb2b_newsdetails.php')
	gapage = 'Page_news_detail';
	else if(ec_detail_file=='etb2b_blogdetails.php')
	gapage = 'Page_blog_detail';
	$( "body" ).on( "click", "a", function() {
		if($(this).attr('data-modname'))
		{
			secnamearray=$(this).attr('data-modname').split(',');
			if(secnamearray){
				$.each(secnamearray,function(i,secname){
					ga('send', 'event', gapage, 'Click',secname );
				});
			}
		}
		if($(this).attr('data-ga'))
		{
			secnamearray=$(this).attr('data-ga').split(',');
			if(secnamearray){
				ga('send', 'event', secnamearray[0], secnamearray[1]+'_click',secnamearray[2] );
			}
		}
	});
}

function autocompleteSelect(result) {
	$('.autocomplete-master-id').val(result.id);
}
function resetAutocompleteSelectedData(){
	$('.autocomplete-master-id').val('0');		
}

function popupAutoSuggestCompany(type){
	$(document).on('keyup','.popup-autocomplete', function(){
 		var companySearchStr = $(this).val();
 		try {
     		if(isExecuteTagService == '1') {
				isExecuteTagService = '0';
				if(aliasTags == undefined || aliasTags.length < 1) {
					var preFetchLoaderHtml = '<div class="pre-fetch-loader" style="position: absolute; right: 0px; bottom: 0px;"><span class="sr-only"></span><i style="margin:4px 0;font-size:22px;" class="fa fa-spinner fa-pulse fa-fw""></i></div>';
	     			$(this).siblings().append(preFetchLoaderHtml);
					aliasTags = $.ajax({async:false,url:base_url+'/webservices/tags',type:'get', dataType:'JSON' }).responseJSON;
				}
				$(".popup-autocomplete").autoCompleteMasterAlias({
					data:aliasTags, 
					selectFn:autocompleteSelect,
					inputChangeFn: resetAutocompleteSelectedData,
					waitTime:1000,
					selectorName:'popup-autocomplete', 
					suggestionViewMaxCount:10, 
					minInputChars:2, 
					maxInputChars:200 
				});
				$('.pre-fetch-loader').remove();
			}
		} catch (e) {
	        console.log(e.description);
	    }
 	});
}

function getUserLocation(){
	var userLoc = '';
	if(getLocalStorage('userlocationinfo'))userLoc = getLocalStorage('userlocationinfo')['city']||'';
	if(userLoc.length==0){		
		$.ajax({url:'https://st.etb2bimg.com/locinfo', success:function(data){
			setLocalStorage('userlocationinfo',data,1);
		}});
	}
	return userLoc;
}

$.each($(".jsinvoker"), function(key, val){
	var fStr = $(val).data("jsinvoker_init");
	var jsStrFunc = new Function(fStr);
	jsStrFunc();
});

// doc on ready

$(document).keyup(function(e) { 
	if (e.keyCode == 27) { 
		var _exists_len = parseInt($('.l2_outer_bx').length);
		if(_exists_len > 0 && !profileComplete){
			_remove_custom_poplayer2(_exists_len);
		}
	} 
});

if(typeof $.fn.unveil == 'undefined'){
	loadScript(THEME_PATH+'/javascript/etb2b_jquery_unveil.js?mod=4',function(){
	    $(window).trigger('scroll');
	});
}
//if(typeof History.replaceState == 'undefined')
//loadScript(THEME_PATH+'/javascript/etb2b_jquery.history.js?mod=1',function(){});

$(document).ready(function() { 
	/*if(typeof b2bOnReadyFunctions != 'undefined') //array of functions which needs to be called on document ready
	{
		$.each(b2bOnReadyFunctions,function(i,v){
			if(typeof v == 'function')
			v();
		})
	}*/
	//EtB2b.ga.load();

	

	$(".user-area").show();
	// Navigation toggle tech
	if ( $(window).width() < 999 ){
		// Navigation toggle tech
		$("#nav .toggle_nav").click(function(){
			$("#nav ul").slideToggle();
			$(".pge-ovrly").toggleClass("show");
		});

		$(".pge-ovrly").click(function(){
			$("ul.level1").slideToggle();
			$(this).removeClass("show");
		});

	}
	
	// for event tracking
	eventTracker();
	

	/************************************************************/
	/************************************************************/
	render_iframe_from_div();
	
  $checkLoginCustomFunction = function(){

	check_login_status(); 
	// @jais: very crucial lines below!
	//var pEmail = $.trim($_GET['email']); //commented by prashanta
	_profile_email=pEmail;
	if(prevent_default_layers == true || ec_detail_file.search('unsubscribe.php') > -1 || ec_detail_file.search('invite.php') > -1 || ec_detail_file.search('thank-subscriber.php') > -1 || ec_detail_file.search('etb2b_webcasts.php') > -1){ 
		// do nothing
	} else if($_GET['email']=='' && login_required && !_is_loggedin){ 
		if($('body').find('._lgn_pop').length <= 0){ 
		if(typeof forum_page_log_pop == "undefined"){
			_custom_poplayer2('','',show_login_layer, '', 1);
		}else{
			show_login_layer_custom('<div class="hdr_l1">Thank you for stopping by!</div><div class="hdr_l2">Select one of the login options below to continue your journey on ET Auto Ask!</div>',forum_footer,'');
		}
		
		}
	} else if(typeof is_subscription_page != 'undefined' && is_subscription_page == 'Y'){
		preventOverRideHistoryState=1;
		_custom_poplayer2('','',show_subscription_layer, '', 3, 'N');
	} else if(is_valid_email(pEmail)){
		var is_source = $.trim($_GET['source']);
		if(is_source){
			fromMail_redirect_flag = 'Y';	
		}
		if(ec_detail_file != 'etb2b_update_profile.php')check_subscription_status_from_email(pEmail, setup_profile_complete_box);
	} else { 
		if(ET_PORTAL != 'tech'){
			check_sub_popup_show();
		}
	}
  };
  if(false && typeof executeWithCsrfToken == 'function'){
	executeWithCsrfToken($checkLoginCustomFunction);
  }
  else if(true){
  	$checkLoginCustomFunction();
  }
  else{
  	$(document).on('_gbl_csrf_generated',$checkLoginCustomFunction);
  }
	
	if(_override_history_url && preventOverRideHistoryState!=1){ 
		overRideHistoryState(_override_history_url);
	}
	
	if(ec_detail_file == 'index.php'){
		refresh_recent_news_time();
		setInterval(refresh_recent_news_time , 60000);
		//_refresh_page = setInterval(function(){ window.location = window.location }, 60*5*1000);
		_get_recent_news(); 
	}
	
	if(typeof page_reload!='undefined' && page_reload==1 && typeof page_reload_time!='undefined')
	_refresh_page = setInterval(function(){ window.location = window.location }, page_reload_time);
	
	/************************************************************/
	/************************************************************/

	// nav load on delay
	$("#main-navigation ul li.parent, #navbar ul li.parent,#nav ul li").hover(function() {
		currentitem = $(this);
		hoverTimeoutId = window.setTimeout(function() {
			hoverTimeoutId = null;
			currentitem.siblings().addClass('inactive');
			$(currentitem).addClass("hover").removeClass('inactive');
			$(window).trigger('scroll');
		}, 100);
		
	}, function(){ 
		if(hoverTimeoutId){
			window.clearTimeout(hoverTimeoutId);
			hoverTimeoutId = null;
		}else{
			if(typeof currentitem == 'undefined')return;
			$(".hover").removeClass("hover");
			currentitem.removeClass('inactive').siblings().removeClass('inactive');
			$(window).trigger('scroll');
		}
		
	});

	/* // To prevent hide #nav_search_bx when click on #main
	$('#nav_search_bx').click(function (e) {
		e.stopPropagation();
	});

	// Click outsite of #nav_search_bx
	$('html, body').click(function () {
		$('#nav_search_list').hide();
	}); */

	$("#nav_search_bx").hover(function() {
		currentitemSearch = $(this);
		hoverTimeoutIdSearch = window.setTimeout(function() {
			hoverTimeoutIdSearch = null;
			$(currentitemSearch).addClass("hover");
			$('#nav_search').focus();
		}, 100);
		
	}, function(){ 
		if(hoverTimeoutIdSearch){
			window.clearTimeout(hoverTimeoutIdSearch);
			hoverTimeoutIdSearch = null;
		}else{
			//$(".hover").removeClass("hover");
		}
		/* if(!$.trim($('#nav_search').val())){
			$(currentitemSearch).removeClass("hover");
		} */
	});
	
	$("#nav_search_bx, #nav_search_bx a").click(function(){
		$("#nav_search").focus();
	});
	
	$("#nav_search_bx a").click(function(){
		$("#nav_search_bx").toggleClass('hover');
	});
	
	// small nav
	$(".toggle-nav-btn").click(function(){
		$(currentnavselector+' ul.level1').slideToggle();
		$(".pge-ovrly").toggleClass("show");
	});


        // if($(window).width()<767){
        // var navHeight = $(window).height();         
        // $("ul.level1").css("max-height", navHeight ) 
        // } 

	$(currentnavselector+" .parent").mouseenter(function(){
		var xPos = $(this).position()['left'];
		if(xPos<=480)
		{
			//
		}else if(xPos>480 && xPos<=520)
		{
			if(!$(this).hasClass('center'))$(this).addClass('center');
		}else
		{
			if(!$(this).hasClass('right'))$(this).addClass('right');
		}
	});
	
	$(currentnavselector+" .parent").click(function(){
		if($(window).width()<980){
			$(this).children(".dropdown_nav").slideToggle();
		}
	});
	
	$(currentnavselector+" .parent a").click(function(event)
	{	
		if($(window).width()<980 && $(this).parent().hasClass('parent'))
		{
			$temp = $(this).parent();
			if($temp.find(".dropdown_nav").length > 0)
			{
				$temp.children(".dropdown_nav").slideToggle();
				return false;
			}
			else
			{
				$temp.children(".dropdown_nav").slideToggle();
			}
		}
	});
	
	if($(window).width()>=980)
	{
		//$navheaderlevel2 = $(currentnavselector+' .level2');
		$navheaderlevel2 = $('#header #navbarL2');
		//$navheaderlevel2.find('>ul').css('overflow-y','hidden');
		if($navheaderlevel2.length){
			$listwidth = $navheaderlevel2[0]['offsetWidth'];
			$layer2width = $navheaderlevel2.find('.more').outerWidth(true ) + $navheaderlevel2.find('.invite-frnds_btn').outerWidth(true ) + $navheaderlevel2.find('.search').outerWidth(true )+50;
			$navheaderlevel2.find('li').each(function(){
				if(!($(this).hasClass('more')))
				{
					// $layer2width1 = $(this).width()+(parseInt($(this).css('padding-right').replace('px','')) + parseInt($(this).css('padding-left').replace('px','')));
					$layer2width1 = $(this).outerWidth(true );
					$layer2width = $layer2width + $layer2width1;
					if($layer2width >= ($listwidth-1))
					{	
						$('#navbarL2 ul .more ul').append($(this)[0].outerHTML);
						$(this).remove();
						$('#navbarL2 ul .more').removeClass('hide');
					}
				}
			});
			$navheaderlevel2.find('.search').removeClass('hide');
			$navheaderlevel2.find('.invite-frnds_btn').removeClass('hide');
			$navheaderlevel2.css('overflow','visible');
		}
	}
	
       // Navigation height for divices 

	//handling login required links
	$('._lgn_req_lnk').on('click',function(e){ 
		if(!_is_loggedin){ 
			e.preventDefault();
			_gbl_red_url = $(this).data('link');
			if(!_gbl_red_url){ 
				_gbl_red_url = $(this).attr('href');
			}
			//console.log(_gbl_red_url);
			_gbl_logincb_fn = redirect_to_return_url;
			_custom_poplayer2('Please login to continue..','',show_login_layer, '_lgn_pop', 1);
		}
		//_gbl_logincb_fn();
	});

	$(".rndr_ajx").each(function(){  
		try{
			$temp = $(this);
			$datag = {};
			$datap = {};
			$mod = $temp.data("mod-name");
			$pos = $temp.data("mod-pos");
			$obj = $temp.data("mod-obj");
			$boxid = $temp.attr("id");
			
			$datag['mod'] = $mod;
			$datag['pos'] = $pos;
			$datag['boxid'] = $boxid;
			
			$prmskstr =  $temp.data("mod-p");
			$prmsk = $prmskstr.split(";");
			$.each($prmsk,function($i,$v){
				$datapk = $v;
				$datapv = $temp.data($v);
				$datap[$datapk]=$datapv;
			});
			
			// Pip Check
			$isPip = $('#isPortalPip').val();
			if ($isPip == true) {
				$datag['isPip'] = $isPip;
				$datag['pipCategoryId'] = $('#pipCategoryId').val();
				$datag['pipCategoryMsid'] = $('#pipCategoryMsid').val();
				$datag['pipCategoryUrl'] = $('#pipCategoryUrl').val();
			}
			
			$datastr = '';
			$.each($datag,function($i,$v){
				$datastr += '&'+$i+'='+$v;
			});
			if($mod && $pos && $boxid){ 
				$.get(base_url+"/ajax_files/etb2b_ajax_modules.php?"+$datastr,{obj:$datap},function(data){ 
					try{ 
						$returnFData = (JSON.parse(data));
						$("#" + $returnFData[0]).html($returnFData[1]);
						if(!$.trim($returnFData[1])){
							$("#" + $returnFData[0]).addClass('hide');
						} else {
							$("#" + $returnFData[0]).removeClass('hide');
						}
						
					} catch(e){ console.log(e); }
				});
			}
		}
		catch(e){}
	});
	/*
	$(".featured_section").each(function(){
		$temp = $(this);
		$type = $temp.data("ftd-type");
		$boxid = $temp.attr("id");
		if($type == 'featured_header_20' && ($('#'+$boxid).width() < 1000  || (ec_detail_file != 'index.php'))) //hiding Ticker for small screen
		{
			return;
		}
		$.get( base_url+"/ajax_files/etb2b_ajax_featured_section.php", { type: $type , boxid:$boxid , page : ec_detail_file} ,function(data){
			$returnFData = (JSON.parse(data));
			try{ 
				$("#" + $returnFData[0]).html($returnFData[1]);
				if(!$.trim($returnFData[1])){
					$("#" + $returnFData[0]).addClass('hide');
					$("#" + $returnFData[0]).parent(".widget").addClass('hide');
					$("#" + $returnFData[0]).parent(".wdgt").addClass('hide');
				} else {
					$("#" + $returnFData[0]).removeClass('hide');
					$("#" + $returnFData[0]).parent(".widget").removeClass('hide');
					$("#" + $returnFData[0]).parent(".wdgt").removeClass('hide');
				}
			} catch(e){ console.log(e); }
		});
	});
	*/
	
	render_featured_sections();

	$(document).mouseup(function (e){
		var container = $("#nav_search_bx");

		if (!container.is(e.target) // if the target of the click isn't the container...
			&& container.has(e.target).length === 0) // ... nor a descendant of the container
		{
			container.removeClass('hover');
		}
	});
	
	// video list play
	/* $(document).on('click', 'ul#main_vlist_bx li a', function(e) { 
		 e.preventDefault(); 
		// Call the scroll function
		$('html,body').animate({scrollTop: $("#video_bx").offset().top-20},'slow');
		var data = $(this).data('video');
		if(data){
			render_mainvideo_block(data);
		}
	}); */
	
	// job search expand
	$('.advance-search-btn').click(function(){
		$('.form4').toggleClass('expand');	
		return false;
	});
	
	if($(".message-area").length){
		setTimeout(function() {
			$(".message-area").slideUp().empty();
		}, 10000);
	}

	$(".message-area .close-btn").click(function(){
		$(".message-area").slideUp().empty();
		return false;
	});
	
	$(".nav-btn").click(function(){
		$(this).toggleClass('active');
		$("#main-navigation ul.show-small").slideToggle();
	});
	
	$(document).on('click','.tip h3 a', function(e){    
	    $('.inner').slideToggle("slow");    
	    if($(this).children('.fa').hasClass('fa-chevron-down')){    
	      $(this).children('.fa').removeClass("fa-chevron-down").addClass("fa-chevron-up");   
	    }   
	    else{   
	      $(this).children('.fa').removeClass("fa-chevron-up").addClass("fa-chevron-down");   
	    } 
	});
	
	$('article div.text a').each(function() {
	   var a = new RegExp('/' + window.location.host + '/');
	   if(!a.test(this.href)) {
		   $(this).click(function(event) {
			   event.preventDefault();
			   event.stopPropagation();
			   window.open(this.href, '_blank');
		   });
	   }
	});
	/*
	$('#tabstrips1 li a').click(function(){
		var show = $(this).attr('title');
		$('.toggle_ul').hide();
		$("#tabstrips1 li").removeClass('active');
		$(this).parent().addClass('active');
		$('#'+show).show();
		$(window).trigger('scroll');	
		return false;
	});
	
	$('#tabstrips2 li a').click(function(){
		var show = $(this).attr('title');
		$('.toggle_cat').hide();
		$("#tabstrips2 li").removeClass('active');
		$(this).parent().addClass('active');
		$('#'+show).show();
		$(window).trigger('scroll');	
		return false;
	});
	*/
	setClickEventTo('mostread', '.tabstrips li a');
	
	$('#tabstrips3 li a').click(function(){
		var show = $(this).attr('title');
		$('.toggle_subcat').hide();
		$("#tabstrips3 li").removeClass('active');
		$(this).parent().addClass('active');
		$('#'+show).show();
		$(window).trigger('scroll');	
		return false;
	});
	
	$('#tabstrips4 li a').click(function(){
	   var show = $(this).attr('title');
	   $('.toggle_rss').hide();
	   $("#tabstrips4 li").removeClass('active');
	   $(this).parent().addClass('active');
	   $('#'+show).show();
	   $(window).trigger('scroll');        
	   return false;
	});
	
	/*--- For sticky div ---*/
	
	$(function(){ // document ready
		if($(window).width() > 767 ){  
		  var wheight = $(window).height();
		   var dheight = $('.sticky-content').height();        
		   
		   if(dheight > wheight){
				//$('.sticky-content').css({height:480, overflow: 'auto'})
				$('.sticky-content').css({height:480});
		   }
		   
		  //if($(".sticky-content").length)setSlider($(".sticky-content"));
		  if($(".sticky-content").length)$(".sticky-content").niceScroll();
		  
		  if (!!$('.sticky').offset()) { // make sure ".sticky" element exists
		 
			var stickyTop;
			if($('.sticky').length){
				stickyTop = $('.sticky').offset().top; // returns number
			}
			$(window).scroll(function(){ // scroll event
			  var windowTop = $(window).scrollTop(); // returns number
			  var currentWidth = $('.sidebar').width();
			  	/*
			  	var siteDim = $('#sitemap').offset().top;
				var tp = $(document).height() - ($(window).height() + $('#sitemap').height() + $('#footer').height() + 80) ;
				var wp = $(document).height() - ($(window).height() + $('#sitemap').height() + $('#footer').height() + $('.top-section').height() + 220);
				// var tp =($(window).height() + $('#sitemap').height());
				*/
			  var sitemapId = '';
			  if($('#sitemap').length)
			  {
				  sitemapId = '#sitemap';
			  }else if($('#sitemap2').length)
			  {
				  sitemapId = '#sitemap2';
			  }
			  if(sitemapId != '')
			  {
			    var siteDim = $(sitemapId).offset().top;
				var tp = $(document).height() - ($(window).height() + $(sitemapId).height() + $('#footer').height() + 80) ;
				var wp = $(document).height() - ($(window).height() + $(sitemapId).height() + $('#footer').height() + $('.top-section').height() + 220);
				// var tp =($(window).height() + $('#sitemap').height());
			  }
			  var contentLhs = $('#content .main-content').height();
		      var contentRhs = $('#content .sidebar').height();
	 
	          var checkDim = contentLhs > contentRhs && $(window).width() > 1024 && $(window).height() > 600
			 
			  if(windowTop > tp && checkDim){
				 // $('.sticky').css('position','static');
				   $('.sticky').css({ 'position': 'absolute', 'top':wp, 'width':currentWidth });
				  }
			  else if (stickyTop < windowTop && checkDim){
				$('.sticky').css({ 'position': 'fixed', 'top': 65, 'z-index':10, 'width':currentWidth });
			  }
			   
			  else {
			  //  $('.sticky').css('position','static');
			  $('.sticky').attr('style','');
			  }
		 
			});
		 
		  }
		 }
	});

	/*------ Show ads on mobile ------*/
	/* removed as server decides which slot to render where
	if(deviceType == 'mobile'){ 
		if(ec_detail_file == 'index.php')
		{
			$(".sidebar .ad").each(function(i,v){
				$(this).addClass('sidebarads')
				if(i==0)
				$(".top-stories .story-box").eq(0).after($(this));
				else if(i==1)
				$(this).prependTo(".top-stories .clm2");
				else if(i==2)
				$(this).appendTo(".top-stories .clm2");
				//else
				//$(this).addClass('hide');
				
			});
			$(".clm3 .ad").each(function(i,v){
				if($(this).is(':visible'))
				{

				$(this).addClass('sidebarads')
				$(".tab_lhs .clm1 .first").after($(this));
				}
				
			});
		}
		else if(ec_detail_file == 'etb2b_newsdetails.php' || ec_detail_file == 'etb2b_blogdetails.php')
		{
			//var curId = $("#etb2b-news-detail-page").data("news-id");
			var curId;
			if(ec_detail_file == 'etb2b_newsdetails.php')
			{
				curId = $("#etb2b-news-detail-page").data("news-id");
			}else if(ec_detail_file == 'etb2b_blogdetails.php')
			{
				curId = $($(".blog-detail")[0]).attr("id").split("news_hd_")[1];
			}	
			var tgtAdParent = ($("#news_dtl_"+curId+" article .text p").length)?$($("#news_dtl_"+curId+" article .text p")[1]):$($("#news_dtl_"+curId+" article .text br")[3]);
			$($(".sidebar .widget.ad.AS_ATF_300_250")[0]).insertAfter(tgtAdParent).addClass("topAd");
			$(".sidebar .widget.ad").addClass("bottomAds");
			$("#disqus_thread_"+curId).after($(".widget.ad.bottomAds"));
		}
	}
	*/
	
	/*----- Sticky div ----*/
	
	$(".author-widget .description a.more").click(function(){
		$(".author-widget .description p span").slideToggle();
		$(this).toggleClass('open');
		return false
	});

	/*---- Adding clear class to fourth li -----*/
	
	$(function(){
		var ul = $(".news-list ul");//You can use more specific UL
		ul.find(":nth-child(4n+4)").addClass("clL");
	});
	
	// used for jobs listing-tiles
	/* if($('.isotop-holder').length){
		$('.isotop-holder').isotope();
	} */
	
	/*------ Font resize -----*/
	$(function(){
		if($('#hd-blk').length){
			currentnavselector = '#hd-blk';
		}
		else if($('#navbar').length){
			currentnavselector = '#navbar';
		}
		if($(currentnavselector).length){
			var stickyTop = $(currentnavselector).offset().top; 
			var navhight = $(currentnavselector).height(); 
			$(window).scroll(function(){
				var windowTop = $(window).scrollTop();

				if(windowTop > stickyTop){
					$(currentnavselector).addClass('sticky_nav');  
					$('.top-band').css("margin-bottom", navhight);    
				}else {
					$(currentnavselector).removeClass('sticky_nav'); 
					$('.top-band').css("margin-bottom", 0);                                 
				}
			});  
		}
			
	});
	

  // Increase Font Size
  $(".increaseFont").click(function(){	  
    var currentFontSize = $('div.text').css('font-size');
	var currentFontSizeNum = parseFloat(currentFontSize, 10);
	if(currentFontSizeNum>=21){
		return false;
	}else{
		var newFontSize = currentFontSizeNum*1.1;
		$('div.text').css('font-size', newFontSize);
		return false;
	}
  });
  // Decrease Font Size
  $(".decreaseFont").click(function(){
    var currentFontSize = $('div.text').css('font-size');
    var currentFontSizeNum = parseFloat(currentFontSize, 10);
	if(currentFontSizeNum<=13){
		return false;
	}else{
		var newFontSize = currentFontSizeNum*0.9;
		$('div.text').css('font-size', newFontSize);
		return false;
	}
  });
  
	$('body').on('click', '.show_subscribe_pop_btn', function(){
		_custom_poplayer2('','',show_subscription_layer, '', '3');
		localStorage.setItem('yoloFlag',1);
	});
	
	$.each($('.sidebar .widget'), function () { 
		if(!$.trim($(this).html())){
			//$(this).addClass('hide');
		}
	});
	
	$('body').on('click', '#radio_type_tip', function(){
		showhide_blk('#radio_type_tip_cont','#radio_type_guest_cont');
	});
	
	$('body').on('click', '#radio_type_guest', function(){
		showhide_blk('#radio_type_guest_cont','#radio_type_tip_cont');
	});
	
	if($('.cycle-slideshow').length){
		$('.cycle-slideshow').cycle({paused:true});
		setTimeout(function(){$('.cycle-slideshow').cycle('resume');}, 8000);
		//loadScript(JS_PATH+'/etb2b_jquery_bxslider_min.js?mod=1580801832',function(){
			//loadScript(JS_PATH+'/etb2b_jquery.cycle3.js?mod=1580801832',function(){
				//$('.cycle-slideshow').cycle({paused:false});
				//$('.cycle-slideshow').cycle({paused:true});
				//setTimeout(function(){$('.cycle-slideshow').cycle('resume');}, 13000);
			//});
		//});
	}	
	
	// log user email to consol
	var LOG_COOKIE_MAIL = ck_de(getCookie(ET_PORTAL + '_pop_user_sub'));
	var LOG_COOKIE_MAIL_CLOSE = getCookie(ET_PORTAL + '_pop_user_sub_close');
	//console.log('LOG_COOKIE_MAIL: '+LOG_COOKIE_MAIL+'\nlogin_uid: '+login_uid+'\nCOOKIE_LAYER_CLOSE: '+LOG_COOKIE_MAIL_CLOSE+'\nglobalLoc: '+globalLoc);
	
	//ET_DEFAULT_IMG_URL = THEME_PATH+'/images/responsive/news-'+ET_PORTAL+'-default.jpg';
	ET_DEFAULT_FACE_IMG_URL = THEME_PATH+'/images/responsive/default_face.png';
	initUnveilImg();
	
	showHideWhatsapp();
	
	if(ec_detail_file == 'index.php'){
		if(($_GET['error']==1) && ($_GET['return'])){ 		
			if(_is_loggedin){
				redirect_to_return_url();
			} else { 
				_custom_poplayer2('Please login to continue..','',show_login_layer, '_lgn_pop', 1);	
				_gbl_logincb_fn = redirect_to_return_url;
			} 
		}
	}
		
	//login	
	$('body').on('click', '#_tb_login_btn', function(){
		login_popup_display_type = 2;

		if(typeof B2B_SSO_LOGIN!="undefined" && B2B_SSO_LOGIN==1){
			EtB2b.system.login({main_oauth_title: 'Welcome to Economic Times B2B'});
		}else{
			custom_poplayer2('','',show_login_layer, '_lgn_pop', 1);
		}
		localStorage.setItem('yoloFlag',1);
	});
	
	var _chk_login_int = setInterval(function(){
		ping_check_login_status();
	}, 60000); 
	
	refreshTimeElapsed();
	
	// Autocomplete tags
	$(document).on('keyup','.autocomplete', function(){
 		var companySearchStr = $(this).val();
 		try {
     		if(isExecuteTagService == '1') {
     			isExecuteTagService = '0';
     			
     			var preFetchLoaderHtml = '<div class="pre-fetch-loader" style="position: absolute; right: 0px; bottom: 0px;"><span class="sr-only"></span><i style="margin:4px 0;font-size:22px;" class="fa fa-spinner fa-pulse fa-fw""></i></div>';
     			$(this).siblings().append(preFetchLoaderHtml);
				aliasTags = $.ajax({async:false,url:base_url+'/webservices/tags',type:'get', dataType:'JSON' }).responseJSON;
				$(".autocomplete").autoCompleteMasterAlias({
					data:aliasTags, 
					selectFn:autocompleteSelect,    		
					inputChangeFn: resetAutocompleteSelectedData,
					waitTime:1000, 
					suggestionViewMaxCount:10, 
					minInputChars:2, 
					maxInputChars:200 
				});
				$('.pre-fetch-loader').remove();
			}
		} catch (e) {
	        console.log(e.description);
	    }
 	});
     
	/*============================================= for ETB2BRHSBlogAuthors ==========================================================*/
	//enableAuthorDetailLinkHover();
	/*=================================================================================================================================*/
	
	if(deviceType != 'desktop') {
		$(".usr_name").click(function(e){ 
			e.stopPropagation();   
			$(".hvr_bx").slideToggle();    
			$(this).toggleClass("rotate");
		});
		$("#_tb_login_btn").click(function(){
			closeNav();
		});
		$("#sidenav").click(function(e){
			if(e.target !== this)
			return;
			closeNav();
		})
	}
	
	var jsinvoked = [];
	$.each($(".jsinvoker"), function(key, val){
		var fStr = $(val).data("jsinvoker");		
		if(jsinvoked.indexOf(fStr) == -1)
		{
			var jsStrFunc = new Function(fStr);
			jsStrFunc();
			jsinvoked.push(fStr);
		}
	});
	if($( "#accordion").length>0){
		
		
		if($('#etb2b-news-detail-page').length>0){
			var news_id=$('#etb2b-news-detail-page').attr('data-news-id');
			if(news_id){
				company_list_widget(news_id);
				
			}
		}
	}

	if($(".custom-twitter-widget").length > 0)
	{
		loadScript(THEME_PATH+'/javascript/custom-twitter-widget.js?mod=9',function(){});
	}

	/*if(typeof b2bOnCompleteFunctions != 'undefined') //array of functions which needs to be called on document ready
	{
		b2bOnCompleteFunctions.forEach(function(v){
	      if(typeof v == 'function')
	      v();
	    })
	}*/
	getUserLocation();
	if(!($("body").hasClass('js-v2') || $("body").hasClass('old-theme')))
	executeOnCompleteFunction(); 
});

function layerPop(id){
	var divW=$("body").width();

	$("#"+id).show();
	var divH   = document.documentElement.clientHeight || document.body.clientHeight;
	var layerH = document.getElementById(id).offsetHeight;
	var layerW = document.getElementById(id).offsetWidth;

	$("#"+id).css({top:(divH-layerH)/2+"px", left:(divW-layerW)/2+"px"});
}

//hide_webcast_layers

function check_unsubscription(){
	$('.email-submit-form').removeClass('mand').find('em').remove();
	$('.email-submit-form .success').hide();
	
	var _mail_id = $.trim($('#email').val());
	var err = false;
	if(_mail_id){
		if(is_valid_email(_mail_id)){
			return true;
		} else{
			err = true;
		}
	} else {
		err = true;
	}
	if(err == true){
		$('#email').parent('li').addClass('mand');
		$('<em>Invalid Email!</em>').insertAfter($('#email'));
	}
	return false;
	
}

function is_valid_email(email){
	var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,10}\b$/i

	if(!pattern.test(email)){
		return false;
	} else{
		return true;
	}
}

//update_news_views

function hide_layer_id(id){
	var is_source = $.trim($_GET['source']);
	if(fromMail_redirect_flag == 'Y' && is_source){
		window.location = is_source;
	}
	
	$('#'+id).hide();
}

//change_news_widget
//change_news_widget_user
//show_social_reader_setup
//set_news_share_page_cnt
//attach_on_off_share
//_fb_oauth_listener
//get_current_fb_oauth_status
//save_item_share_status
//save_item_share_status_reverse
//save_item_share_status_reverse
//save_fb_social_share_status
//save_social_share_status
//set_redirect_cookie

function redirect_to_thankspage(email){
	if(reg_red_thanks == 'Y'){
		window.location = base_url+'/subscribe/thanks?email='+email;
		return false;
	}
}

//check_oauth_user

function removeError(e){
	var id=$(e.target).attr('id');
	var value=$('#'+id).val();
	if(value){
	$('#'+id+'_err').html('').hide();
	$('#'+id+'_err').parent('div').removeClass('error');
	//validateEnrollmentData();
	}
}

//validateEnrollmentData
//track_user_activity_history

function setup_social_share_pop(ele_id){ 	
	if(ele_id){	
		//console.log(_oauth_data);
		var _req_type = _oauth_data.type;
		
		var fb_oauth_stat = false;
		if(_oauth_data.fb_oauth){
			fb_oauth_stat = _oauth_data.fb_oauth.is_valid;
		} 
		
		var in_oauth_stat = false;
		if(_oauth_data.in_oauth){
			in_oauth_stat = _oauth_data.in_oauth.is_valid;
		} 
		
		var fb_share_status = 0;
		var in_share_status = 0;
		if(_oauth_data.share){
			fb_share_status = _oauth_data.share.fb_share_status;
			in_share_status = _oauth_data.share.in_share_status;
		} 
		
		if(fb_oauth_stat != true){
			var fb_in = '<a onclick="javascript:set_redirect_cookie(\''+loginUrl_facebook+'\'); return false;" class="fb-enable social-reader-btn" href="'+loginUrl_facebook+'">Connect</a>';
		} else {
			if(fb_share_status != 1){
				var fb_in = '<span class="scl-reader-icon fb"><span class="status"><span class="txt">OFF</span><span class="button">ON</span></span></span>';
			} else{
				var fb_in = '<span class="scl-reader-icon fb"><span class="status on"><span class="txt">ON</span><span class="button">OFF</span></span></span>';
			}
		}
		
		var fb_blk = '<div class="social-button clearfix"><span class="title">Share on Facebook</span>'+fb_in+'</div>';
		
		if(in_oauth_stat != true){
			var in_in = '<a onclick="javascript:set_redirect_cookie(\''+loginUrl_linkedin+'\'); return false;" class="linkedin-enable social-reader-btn" href="'+loginUrl_linkedin+'">Connect</a>';
		} else{
			if(in_share_status != 1){
				var in_in = '<span class="scl-reader-icon linkedin"><span class="status"><span class="txt">OFF</span><span class="button">ON</span></span></span>';
			} else{
				var in_in = '<span class="scl-reader-icon linkedin"><span class="status on"><span class="txt">ON</span><span class="button">OFF</span></span></span>';
			}
		}
		
		var in_blk = '<div class="social-button clearfix"><span class="title">Share on LinkedIn</span>'+in_in+'</div>';
		
		/* var tw_in = '<a onclick="javascript:set_redirect_cookie(\''+loginUrl_facebook+'\'); return false;" class="twitter-enable social-reader-btn" href="'+loginUrl_linkedin+'">Connect</a>';
		var tw_blk = '<div class="social-button clearfix"><span class="title">Twitter</span>'+tw_in+'</div>'; */
		
		$('#_l2_txt_cnt_'+ele_id).html('<p>Help your contacts discover good content. Share what you read on ' + SITE_NAMES[ET_PORTAL] + ' automatically with your contacts on Facebook.  You can change the settings whenever you want.</p>'+fb_blk+in_blk+'<br />');
		
	} else{
		var ele_id = _custom_poplayer2('Go Social with '+SITE_NAMES[ET_PORTAL], '', '', '', 1);
		setup_social_share_pop(ele_id);
	}
}

//show_relvideo
//render_relvideo_block

function hide_show_ids(hideblk,showblk){
	$('.icon_player').removeClass('rotate_blk');
	if(hideblk && showblk){
		$(hideblk).hide();
		$(showblk).show();
	}
}

//show_video_page
//set_video_pagination_ui
//render_mainvideo_block
//show_slideshow_page
//set_slideshow_pagination_ui

function show_loading_overlay(boxid){
	if(boxid){
		$(boxid).prepend('<div class="overlay-bg"><span class="loader"></span></div>');
	}
}

function hide_loading_overlay(boxid){
	if(boxid){
		$(boxid).find('.overlay-bg').remove();
	}
}

var pAction = null;
function check_subscription_status_from_email(email, callback){
	email = $.trim(email);
	pAction = $.trim($_GET['action']); //alert(pAction);
	if(pAction=='verify_registration'){
		var pswd_id = $.trim($_GET['id']);
		var source = $.trim($_GET['source']);
		$.ajax({
			type: "POST",
			dataType: "json",
			url: base_url+"/ajax_files/etb2b_registration.php",
			data: {'email':email,'id':pswd_id ,'source':source,'action':pAction},
			success: function(data){
				if(callback) callback(data, pAction);
			}
		});
	}
	else if(email && callback){
		$.ajax({
			type: "POST",
			dataType: "json",
			url: base_url+"/general_ajax_task.php?action=check_subscription_status_from_email",
			data: {'email':ck_en(email),'pAction':pAction},
			success: function(data){
				if(callback) callback(data, pAction);				
			}
		});
	} else{
		return {};
	}
}

function _custom_poplayer_link(tit, wide, custom_function, add_class, head, close, remove_large,href) {
	if (B2B_SSO_LOGIN == 1){
		return false;
	}
	if(!remove_large){
		remove_large = false;
	}
	if(!tit){
		tit='';
	}
	if(!head){
		head=2;
	}
	if(!href){
		href='';
	}
	
	var l2_id='';
	l2_id = parseInt($('.l2_outer_bx').length) + 1;
	var obj_id = "_l2_id_"+l2_id;

	var layer_op = "0.4";
	if(l2_id > 1){ 
		layer_op = "0";
	}

	var xtra_cls = ' ';
	if(add_class){
		xtra_cls += add_class;
	}

	if(two_col_rt && !remove_large){
		xtra_cls += 'large';
	}

	//type = '';
	if(head == 2){
		// if need close btn 
		var close_txt = '<a href="javascript:void(0);" style="z-index:9999" class="close" onclick="javascript: _remove_custom_poplayer_link('+l2_id+');">Close X</a>';
		if(close == 'N' || gbl_lyr_close == 'N'){
			close_txt = '';
		} 

		var append_str = '<div id="'+obj_id+'" class="l2_outer_bx popup1 pop'+head+' '+xtra_cls+'" style="display:none;"><div class="_l2_txt_cnt content clearfix" id="_l2_txt_cnt_'+l2_id+'"><span class="_l2_pre_load" id="_l2_pre_load_'+l2_id+'"><span class="loader">&nbsp;</span>Loading...</span></div><div id="_l2_btm_'+l2_id+'"></div>'+close_txt+'</div>';
	} else{
		// if need close btn 
		var close_txt = '<a href="javascript:void(0);" style="z-index:9999" class="close" onclick="javascript: _remove_custom_poplayer_link('+l2_id+');">X</a>';
		if(close == 'N' || gbl_lyr_close == 'N'){
			close_txt = '';
		} 

		var append_str = '<div id="'+obj_id+'" class="'+xtra_cls+'" style="display:none;"><div>'+close_txt+'</div><div class="_l2_txt_cnt content clearfix" id="_l2_txt_cnt_'+l2_id+'"></div><div id="_l2_btm_'+l2_id+'"></div></div>';
	}
	
	$("body").append(append_str);

	$("#"+obj_id).show().css({width:wide+'px'});

	var lay = $("body").append("<div id='l2_overlay_bx_"+l2_id+"' class='overlay "+xtra_cls+"'  style='z-index:9997;'></div>");
	$("#l2_overlay_bx_"+l2_id).css({opacity:layer_op});

	try{ 
		if(href && custom_function) custom_function(href,l2_id);
		else if(custom_function) custom_function(l2_id);

	}catch(e){}

	var divH = document.documentElement.clientHeight || document.body.clientHeight;
	var divW = document.documentElement.clientWidth || document.body.clientWidth;
	var layerH = document.getElementById(obj_id).offsetHeight;
	var layerW = document.getElementById(obj_id).offsetWidth;

	$("#"+obj_id).css({top:(divH-layerH)/2+"px",left:(divW-layerW)/2+"px"});

	$( window ).resize(function() {
		divH = document.documentElement.clientHeight || document.body.clientHeight;
		divW = document.documentElement.clientWidth || document.body.clientWidth;
		layerH = document.getElementById(obj_id).offsetHeight;
		layerW = document.getElementById(obj_id).offsetWidth;

		$("#"+obj_id).css({top:(divH-layerH)/2+"px",left:(divW-layerW)/2+"px"});
	});	

	return l2_id;
}

function _remove_custom_poplayer_link(){
	var l2_id='';
	obj = parseInt($('.l2_outer_bx').length) + 1;
	if(obj){
		var is_close = parseInt($('#_l2_id_'+obj).length);
		if(is_close || skip_close_btn === true){
			var hideAll="#_l2_id_"+obj+",#l2_overlay_bx_"+obj;
			$(hideAll).remove();
		}
	}
}

function getUrlContentForPopup(href,lid){
	$.get(href, function(data) {
		$('#_l2_txt_cnt_'+lid).html(data);
	});
}

function setup_profile_complete_box(data, pAction){
	//console.log('setup_profile_complete_box: ' + pAction);
	var pSource = $.trim($_GET['source']);
	var valid_pSource = false;
	if(pSource){
		valid_pSource = is_valid_url(pSource);
	}

    var pipCategory = $('#pipCategory').val();
    if (pipCategory != undefined && pipCategory.length != 0) {
        SITE_NAME_TITLE = SITE_NAME_TITLE + ' : ' + pipCategory;
    }

	if(data.email && pAction){
		var preCont = '';
		var headCont = '';
		if(prevent_profile_comp_layer == true){
			data.field_completed = 'Y';
		}
		if(pAction == 'resubscribe'){
			if(data.unsubscribed == 'Y'){
				headCont = 'Please confirm the reactivation of your subscription to our Newsletter';
			} else{
				headCont = 'You have successfully reactivated your subscription!';
			}
		} else if(pAction == 'unsubscribe'){
			if(data.unsubscribed == 'Y'){
				headCont = 'You have already unsubscribed!';
			} else{
				headCont = 'Do you really want to miss out on our Newsletters?';
			}
		} else if(pAction == 'verify_email' && data.field_completed != 'Y'){
			headCont = 'Thank you for verifying your email. We would like to know you a little more:';
			profileComplete = true;
		} else if(pAction == 'profile_completion' && data.field_completed != 'Y'){
				var tmp_ls_chk = getLocalStorage('skipprofilecompletion');
				if(tmp_ls_chk){
					if(tmp_ls_chk.value == true){
						if(valid_pSource){
							window.location = pSource;
						}	
						return false;
					}
				}

				if(valid_pSource){
					profileComplete = true;
					headCont = 'Before we take you to original news, we would like to know you a little more:';
				} else{
					profileComplete = true;
					headCont = 'We would like to know you a little more:';
				}	
		} else if(pAction == 'verify_email' && data.field_completed == 'Y'){
			headCont = 'Thank you for verifying your email.';
			preCont = '<span class="subtitle">You should now start getting our daily newsletters. We hope you will like our newsletters. If you have any feedback, please reach us on <a href="mailto:'+CONTACTUS_EMAILS[ET_PORTAL]+'">'+CONTACTUS_EMAILS[ET_PORTAL]+'</a></span>';
		} else if(valid_pSource){
			window.location = pSource;
			return false;
		}	
		else{
			//console.log('profile complete, no redirection url');
			check_sub_popup_show();
			return false;
		}
		if(pAction )
		var newlid = _custom_poplayer2(headCont, '', '', '', 3, '', true);
		if(preCont){
			$('#_l2_txt_cnt_'+newlid).html(preCont);
		} else{
			$('#_l2_txt_cnt_'+newlid).html('');
		}
		
		if(pAction == 'resubscribe'){
			if(data.unsubscribed == 'Y'){
				$('#_l2_txt_cnt_'+newlid).html('<!--<span class="subtitle">To enable, please enter your email Id and click confirm.</span>--><div class="subscribe-form" style="max-width:305px;margin:0 auto;"><form action="" onsubmit="javascript:return resubscribe('+newlid+');" method="post"><input name="resubscribe_email" id="resubscribe_email" type="text" class="txt_box fl" placeholder="Email Id" value="'+data.email+'" readonly/>&nbsp;&nbsp;<input id="resubscribe_btn" type="button" onclick="javascript:return resubscribe('+newlid+');" class="submit-button2" value="Confirm" /></form><br class="clear" /><span id="resubsribe_err" class="error-txt"></span></div>');
			} else{
				$('#_l2_txt_cnt_'+newlid).html('').hide();
				setTimeout(function() {
					_remove_custom_poplayer2(newlid);
				}, 3000);
			}
		} else if(pAction == 'unsubscribe'){
			if(data.unsubscribed == 'Y'){
				$('#_l2_txt_cnt_'+newlid).html('').hide();
				setTimeout(function() {
					_remove_custom_poplayer2(newlid);
				}, 3000);
			} else {
				$('#_l2_txt_cnt_'+newlid).html('<!--<span class="subtitle">To unsubscribe, please enter your email Id and click submit.</span>--><div class="subscribe-form" style="max-width:380px;margin:0 auto;"><form action="" onsubmit="javascript:return false;" method="post"><input name="unsubscribe_email" id="unsubscribe_email" type="text" class="txt_box fl" placeholder="Email Id" value="'+data.email+'" readonly/>&nbsp;&nbsp;<input id="unsubscribe_btn" type="button" onclick="javascript:return unsubscribe('+newlid+');" class="submit-button2" value="Submit" />&nbsp;&nbsp;<input type="button" onclick="javascript:_remove_custom_poplayer2('+newlid+');" class="submit-button2 cancel" value="Cancel" /></form><br class="clear" /><span id="unsubscribe_err" class="error-txt"></span></div>');
			}
		} else if(data.field_completed != 'Y'){ 	
			var sub_source_html = '';
			var sub_source_text=''
			if(pSource){
				//sub_source_html = '<div id="red_to_news" style="display:none;"> OR <a target="_blank" href="'+pSource+'">Go to news &raquo;</a></div>';
				sub_source_html = '<div id="red_to_news" style="display:none;"> OR <a href="#" onclick="goToNews(\''+pSource+'\', '+ newlid +')">Go to news &raquo;</a></div>';
				sub_source_text=' and go to news &raquo;';
				
			}
			var nl_skip_text = '';
			if(pAction != 'verify_email')
			{
	           nl_skip_text = '<a onclick="_remove_custom_poplayer2('+newlid+');" href="javascript:void(0);" class="skip large">Skip this '+((typeof window.social_login !='undefined' && window.social_login)?'':'&amp;go to news &raquo;')+'</a>';
	        }
			var subscription_form_html = '<div id="detail-submit-form"><form action="" method="post" onsubmit="javascript:return false;"><div class="section"><label for="layer_full_name">Full Name <span>*</span></label><input type="hidden" name="pipCategory" value="'+pipCategory+'"><input id="layer_full_name" name="layer_full_name" type="text" class="txt_box" value="" onblur="removeError(event);"/><span class="error-txt" id="layer_full_name_err" style="display: none;"></span></div><div class="section"><label for="current_company">Company <span>*</span></label><input type="text" id="current_company" class="txt_box popup-autocomplete" name="current_company" value="" onblur="removeError(event);"/><span class="error-txt" id="current_company_err" style="display: none;"></span> <input type="hidden" name="master_company_id" id="master_company_id" class="autocomplete-master-id"></div><div class="section"><label for="user_designation">Designation <span>*</span></label><input value=""  id="user_designation" name="user_designation" type="text" class="txt_box" onblur="removeError(event);"/><span class="error-txt" id="user_designation_err" style="display: none;"></span></div><!--<div class="section"><label for="user_work_exp">Location <span>*</span></label><input value="" id="user_work_exp" name="user_work_exp" type="text" class="txt_box" value="" onblur="removeError(event);"/><span class="error-txt" id="user_work_exp_err" style="display: none;"></span></div>--><div class="section"><label for="mobile_no">Mobile Number <span>*</span></label><input value="" id="mobile_no" name="mobile_no" type="text" class="txt_box" value="" onblur="removeError(event);"/><span class="error-txt" id="mobile_no_err" style="display: none;"></span></div><br class="clear"><div style="/*max-width:85px;*/margin:0 auto 15px; display:table;"><div style="float:left;"><input id="updateUserSubscriptionDetails_btn" onclick="javascript:updateUserSubscriptionDetails(\''+newlid+'\');" type="submit" value="Submit" class="submit-button2" /></div>'+nl_skip_text+'</div><i class="privacy-icon"></i><p>Your detail will be safe with us. You will only receive the emails that you permitted upon subscription.You can unsubscribe at anytime.</p></form></div>';
			
			/*
			if(pSource){
				sub_source_html = '<div id="red_to_news" style="display:none;"><a target="_blank" href="'+pSource+'">Go to news &raquo;</a></div>';
			}
			*/ 
			//$('#_l2_txt_cnt_'+newlid).append(subscription_form_html+sub_source_html);
			$('#_l2_txt_cnt_'+newlid).append(subscription_form_html);
			if(sub_source_html){
				$('#red_to_news').show();
			}
			
			set_popup_position(newlid);
			
			//$('#user_work_exp').val($.trim((typeof data.location !='undefined') ? data.location : data.work_exp_yr));
			$('#user_work_exp').val($.trim((typeof data.location !='undefined') ? data.location : ((typeof data.work_exp_yr !='undefined')?data.work_exp_yr:getUserLocation()) ));
			$('#current_company').val($.trim((typeof data.company !='undefined') ? data.company : data.current_company));
			$('#user_designation').val($.trim(data.designation));
			$('#mobile_no').val($.trim((typeof data.phone !='undefined') ? data.phone : ''));
			$('#master_company_id').val($.trim(data.master_company_id));
			
			var full_name = $.trim($.trim(data.first_name)+' '+$.trim(data.last_name));
			$('#layer_full_name').val(full_name);
			
			if(!$('#layer_full_name').val()){
				$('#layer_full_name').focus();
			} else if(!$.trim($('#current_company').val())){
				$('#current_company').focus();
			} else if(!$.trim($('#user_designation').val())){
				$('#user_designation').focus();
			} else if(!$.trim($('#mobile_no').val())){
				$('#mobile_no').focus();
			} else if(!$.trim($('#user_work_exp').val())){
				$('#user_work_exp').focus();
			} 
			
			popupAutoSuggestCompany('common');
		}
	}
	else if(pAction=='verify_registration'){
		headCont = 'Thanks for verifying your registration for '+SITE_NAMES[ET_PORTAL];
		if(preCont){
			$('#_l2_txt_cnt_'+newlid).html(preCont);
		}
		
		if(data.status==1){
			if(data.source=='free_trial_registration'){
				window.location = base_url+'/autolytics?ft=1';
			}
			else {
				//_custom_poplayer2('','',show_login_layer, '', 1);
				var newlid = _custom_poplayer2(headCont, '', '', '', 3, '', true);
				jQuery(document).ready(function() {
					setTimeout(function() {
						login_popup_display_type = 2;
						fromMail_redirect_flag = 'N';
						_remove_custom_poplayer2(newlid);
						_custom_poplayer2('','',show_login_layer, '', 1);
					}, 2000);
				});
				if(data.email_id){ 
					$('#log_email').val(data.email_id);
				} else {
					$('#log_email').val('');
				}
			}
		}
		else if(data.status==2){
			var newlid = _custom_poplayer2(headCont, '', '', '', 3, '', true);
			jQuery(document).ready(function() {
			setTimeout(function() {
				_remove_custom_poplayer2(newlid);
				check_login_status();
				if(data.source=='free_trial_registration'){
					window.location = base_url+'/autolytics?ft=1';
				}
				else if(valid_pSource){ //redirecting to source page
					window.location = pSource;
					return false;
				}
				
			}, 2000);
			});			
			
		}
		else if(data.status==3){
			headCont = 'Free trial for this email has expired, please upgrade to premium account to access ETAutolytics';
		 var newlid = _custom_poplayer2('','','', 'alC', 1, 'N');
			$('#_l2_txt_cnt_'+newlid).html('<h3>'+headCont+'</h3><a href="'+base_url+'/autolytics/packages" class="upgrade-btn">Upgrade Now</a><a onclick="javascript: _remove_custom_poplayer2('+newlid+');" class="close"><i class="fa fa-times"></i></a>');
		}
		else{
			headCont = 'Invalid details';
			 var newlid = _custom_poplayer2('','','', 'alC', 1, 'N');
				$('#_l2_txt_cnt_'+newlid).html('<h3>'+headCont+'</h3><a onclick="_remove_custom_poplayer2('+newlid+');_custom_poplayer2(\'\',\'\',show_login_layer, \'_lgn_pop\', 1);" class="back-to-register">Please click here to register</a><a onclick="javascript: _remove_custom_poplayer2('+newlid+');" class="close"><i class="fa fa-times"></i></a>');

		}
	}		
	else {
		if(valid_pSource){
			window.location = pSource;
			return false;
		} else{
			check_sub_popup_show();
		}
	}
}

function is_valid_url(url){ 
	if(/^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url)) {
		return true;
	} else {
		return false;
	}
}

function check_sub_popup_show(){
	if(isGDPRNation()) //prevent login check
	return false;
	/*var xCookie = getCookie(ET_PORTAL+'_pop_user_sub');
	var xCookieClose = getCookie(ET_PORTAL+'_pop_user_sub_close');*/
	show_subscription_layer_timeout = setTimeout(function() { 
		/*if(!xCookie && !xCookieClose && !login_required && !_is_loggedin){ 
			_custom_poplayer2('','',show_subscription_layer, '', 3);
		}*/
		exec_check_sub_popup_show();
	}, 5000);  
}

function exec_check_sub_popup_show(){
	var xCookie = ck_de(getCookie(ET_PORTAL+'_pop_user_sub'));
	var xCookieClose = getCookie(ET_PORTAL+'_pop_user_sub_close');
	if(!xCookie && !xCookieClose && !login_required && !_is_loggedin){ 
		setTimeout(function(){
			//_custom_poplayer2('','',show_subscription_layer, 'transparent fadeInUp', 3);
		},10000);
	}
}

function overRideHistoryState(url,title){ 
	var fullurl = window.location.href;
	try{
		if(!url) url = window.location;
		if(!title) title = $(document).find("title").text();
		var State = History.getState();
		/* 
		History.log('initial:', State.data, State.title, State.url);
		History.Adapter.bind(window,'statechange',function(){ 
			var nState = History.getState();
			History.log('statechange:', nState.data, nState.title, nState.url);
		}); */
		History.replaceState({}, title, fullurl);
	} catch(e){  }
}

//auto_search_content
//auto_search_pop
//cb_search

function showhide_blk(show_blk, hide_blk){
	if($(show_blk).length){
		$(show_blk).show();
	}
	if($(hide_blk).length){
		$(hide_blk).hide();
	}
}
/*
* creates social share links for anchor tag href and onclick
*/
function getSocialShareUrl($socialKey, $info)
{
	var $url = encodeURIComponent($info['url']);
	var $title = $info['title'];
	var $title_euc = rfc3986EncodeURIComponent($title);
	var $image_url = $info['imgUrl'];
	var $description = $info['desc'];
	var $href = '';
	var $clickUrl = '';
	var $linkObj = {};
	switch($socialKey)
	{
		case 'tw':
			$href = 'http://twitter.com/share?text='+$title+'&url='+$url+'&title='+$title;
			$clickUrl = 'http://twitter.com/home/?status='+$title_euc+' '+$url;
			break;
		case 'fb':
			$href = 'http://www.facebook.com/sharer.php?u='+$url+'&title='+$title;
			$clickUrl = 'http://www.facebook.com/sharer.php?s=100&p[title]='+$title_euc+'&p[summary]='+$description+'&p[url]='+$url+'&p[images][0]='+$image_url;
			break;
		case 'lnkd':
			$href = 'http://www.linkedin.com/shareArticle?mini=true&url='+$url+'&title='+$title+'&source='+base_url;
			$clickUrl = 'http://www.linkedin.com/shareArticle?mini=true&url='+$url+'&title='+$title_euc+'&summary='+$description+'&source='+base_url;
			break;
		case 'gp':
			$href = 'https://plus.google.com/share?url='+$url+'&title='+$title_euc;
			$clickUrl = $href;
			break;
		case 'whatsapp':
			$href = ((deviceType != 'mobile')?'https://wa.me/':'whatsapp://send')+'?text='+$url;
			$clickUrl = $href;
			break;
	}
	$linkObj['href'] = $href;
	$linkObj['onclick'] = 'window.open(\''+$clickUrl+'\', '+'\'sharer\''+', '+'\'toolbar=0,status=0,width=548,height=325\''+'); return false;';
	return $linkObj;
}
/*
* encodeURIComponent fix for quotes
*/
function rfc3986EncodeURIComponent (str) {  
	return encodeURIComponent(str).replace(/[!'()*]/g, escape);  
}

function initUnveilImg()
{
	//console.log('initUnveilImg');
	/*
	$("img.unveil").error(function(e){$(e.target).attr('src', ET_DEFAULT_IMG_URL);});
	$("img.unveil.face").error(function(e){$(e.target).attr('src', ET_DEFAULT_FACE_IMG_URL);});
	*/
	$("img.unveil").on("error", function() {
		$(this).unbind("error").attr("src", $(this).data('init-src'));
	});
	//$("img.unveil").error(function(e){$(e.target).attr('src',$(e.target).data('init_src'));});
	if($.isFunction($.fn.unveil))$("img.unveil").unveil();
	//console.log($.isFunction($.fn.unveil));
	$(window).trigger('scroll');
}
function setClickEventTo(section, selector)
{
	if(section == 'mostread')
	{
		if(selector == '.tabstrips li a')
		{
			$.each($(selector), function(key, val)
			{
				var evts = $._data(val, 'events');
				if(evts && evts.click)
				{
					//
				}else
				{
					$(val).click(function(){
					   var show = $(this).attr('contentClass');
					   $(this).parent().parent().children('li').removeClass('active');
					   $(this).parent().addClass('active');
					   $($(this).parents().eq(3).children('.tabcontent').children('ul')).hide();
					   $($(this).parents().eq(3).children('.tabcontent').children('ul.'+show)[0]).show();
					   $(window).trigger('scroll');
					   return false;
					});
				}
			});
		}
	}
}
function updatePageMeta(obj)
{
	var title = obj['title'];
	var seometatitle = obj['seometatitle'];
	if(seometatitle || title)
	{
		title = (seometatitle) ? seometatitle : title;
		title += ' | '+ SITE_TITLE ;
		document.title = title;
		$('title').html ( title );
		$('title').val ( title );
		$("meta[property='og\\:title']").attr("content", title);
		$("meta[name='twitter\\:title']").attr("content", title);
		$("meta[itemprop='name']").attr("content", title);
	}
	
	var description = obj['page_description'];
	if(description)
	{
		$("meta[name='description']").attr("content", description);
		$("meta[property='og\\:description']").attr("content", description);
		$("meta[name='twitter\\:description']").attr("content", description);
	}
	var url = obj['canonicalUrl'];
	if(url)
	{
		$("link[rel='canonical']").attr("href", url);
		$("meta[property='og\\:url']").attr("content", url);
		$("meta[name='twitter\\:url']").attr("content", url);
	}
	var image = obj['seo_image'];
	if(image)
	{
		$("link[rel='image_src']").attr("href", image);
		$("meta[property='og\\:image']").attr("content", image);
		$("meta[name='twitter\\:image']").attr("content", image);
	}
	var keywords = obj['keywords'];
	if(keywords)
	{
		$("meta[name='keywords']").attr("content", keywords);
	}
}

//_get_recent_news HP
//_set_recent_news

function updateComScore(cUrl, ajurl)
{
	//cUrl - canonical url
	try{
		if(!cUrl || !ajurl)return;
		COMSCORE.beacon({ c1:"2", c2: "6036484", c4:cUrl});
		$.ajax({url:ajurl, type: "GET", dataType:'json', success: function(data){
			//console.log(data);
		}});
	} catch(e){}
}
function updateGoogleAnalytics(cUrl)
{
	//cUrl - canonicalUrl;
	cUrl = cUrl.replace(base_url, "");
	try 
	{ 
		ga('send', 'pageview', cUrl); 
	} catch(err) {  }
}
function updatePageAnalytics($url)
{
	// if($url)
	// {
	// //console.log($url);
	// updateGoogleAnalytics($url);
	// updateComScore($url,base_url+'/ajax_files/etb2b_get_more_on_scroll.php?action=get_comscore_news&url='+$url);
	// }
}
function sendGoogleAnalytics(_hitType, paramObj)
{
	if(window['ga'] != 'function')
	return ;
	switch(_hitType)
	{
		case 'pageview':
			ga('send', {hitType:_hitType, location:paramObj['location']});
			break;
		case 'event':
			ga('send', {hitType:_hitType, eventCategory:paramObj['eventCategory'], eventAction:paramObj['eventAction'], eventLabel:paramObj['eventLabel']});
			break;
	}
}
function get_alphanumeric(str,toLower){

	toLower = (typeof toLower !== 'undefined') ? toLower : 'Y';
	var rep_str=str.replace(/[^a-zA-Z0-9]+/g,'-');
	if(toLower=='Y'){
		rep_str=rep_str.toLowerCase();
	}
	return rep_str;

}

function etb2bAutoComplete(auto_search_id,func_name,type,entity_type){
if(type=='single_request'){
	var sent_data;
	$.get( base_url+"/ajax_files/etb2b_auto_complete.php?id="+entity_type, function( data ) {
		
		sent_data=JSON.parse(data);

		$( "#"+auto_search_id ).autocomplete({
				source: sent_data,
				select: function  (event, ui) {
					window[func_name](event, ui);
					$(this).val(''); 
					return false;
				}
		});
		$("#"+auto_search_id).keypress(function(event) {
			//alert(event.keyCode);
			if (event.keyCode=='13') 
			{
				var keyEvent = $.Event("keydown");
				keyEvent.keyCode = $.ui.keyCode.DOWN;
				$("#search_autocomplete").trigger(keyEvent);
				keyEvent.keyCode = $.ui.keyCode.ENTER;
				$("#search_autocomplete").trigger(keyEvent);
				
			}
			});
		$("#"+auto_search_id).click(function(event) {
		
			var keyEvent = $.Event("keydown");
			keyEvent.keyCode = $.ui.keyCode.DOWN;
			$("#search_autocomplete").trigger(keyEvent);
			keyEvent.keyCode = $.ui.keyCode.ENTER;
			$("#search_autocomplete").trigger(keyEvent);
		
		
		});	
	});

}else if(type=='multiple_request'){
	$( "#"+auto_search_id ).autocomplete({
			source: base_url+"/ajax_files/etb2b_auto_complete.php?id="+entity_type,
			select: function  (event, ui) {
				window[func_name](event, ui);
			}
	});
	
	$("#"+auto_search_id).keypress(function(event) {
		//alert(event.keyCode);
		if (event.keyCode=='13') 
		{
			var keyEvent = $.Event("keydown");
			keyEvent.keyCode = $.ui.keyCode.DOWN;
			$("#search_autocomplete").trigger(keyEvent);
			keyEvent.keyCode = $.ui.keyCode.ENTER;
			$("#search_autocomplete").trigger(keyEvent);
			
		}
		});
	$("#"+auto_search_id).click(function(event) {
	
		var keyEvent = $.Event("keydown");
		keyEvent.keyCode = $.ui.keyCode.DOWN;
		$("#search_autocomplete").trigger(keyEvent);
		keyEvent.keyCode = $.ui.keyCode.ENTER;
		$("#search_autocomplete").trigger(keyEvent);
	
	
	});	
}	
}

//floatimgmargin
//refresh_recent_news_time HP

function getTimeUnitMax(timeInSec, format)
{
	var yr = Math.floor(timeInSec / (86400*365));
	var dy = Math.floor(timeInSec / 86400);
	var hr = Math.floor(timeInSec / 3600);
	var mn = Math.floor(timeInSec % 3600 / 60);
	var sec = Math.round(timeInSec % 3600 % 60);
	if (sec == 60)
	{
		mn = mn + 1;
		sec = 0;
	}
	if(yr>0)return yr+((format=='short')?'y':((yr==1)?' year':' years'));
	if(dy>0)return dy+((format=='short')?'d':((dy==1)?' day':' days'));
	if(hr>0)return hr+((format=='short')?'h':((hr==1)?' hr':' hrs'));
	if(mn>0)return mn+((format=='short')?'m':((mn==1)?' min':' mins'));
	if(sec>0)return sec+((format=='short')?'s':((sec==1)?' sec':' secs'));
}

function refreshTimeElapsed()
{
	var curTmStmp = parseInt($.now()/1000);
	$(".time-elapsed").each(function(){
		var tmPub = Number($(this).attr('data-time-published'));
		if(Boolean(tmPub))
		{
			var tmElps = curTmStmp - tmPub;
			$(this).html(getTimeUnitMax(tmElps) + ' ago');
		}
	});
}
function close_empty_featured_sections(){
	$(".featured_section").each(function(){
		$temp = $(this);
		if(!$.trim($temp.html()) && !$temp.hasClass('hide')){
			$temp.parent(".widget").addClass('hide');
			$temp.parent(".wdgt").addClass('hide');
		}
	});
}
function social_bar($id,$news,$display_type){
	if($display_type == 1)
	{
		$master_disqus_link = $news['canonicalUrl'];
		$socialShareBarOld = '<div class="flL default_styl"><div class="fb-share-button" data-href="'+$master_disqus_link+'" data-type="button_count"></div>&nbsp;<div class="g-plus" data-action="share" data-annotation="bubble" data-href="'+$master_disqus_link+'"></div>&nbsp;<script type="IN/Share" data-summary="'+$news['title']+'" data-url="'+$master_disqus_link+'" data-counter="right"></script>&nbsp;<a href="https://twitter.com/share" class="twitter-share-button" data-lang="en" data-url="'+$master_disqus_link+'" data-counturl="'+$master_disqus_link+'"  style="height:20px;display:inline-block" ></a></div>';
		return $socialShareBarOld;
	}
	else if($display_type == 2)
	{
		$text_0_UE = $('<div/>').html($news['title']).text();
		$text_1_UE = $('<div/>').html($news['page_description']).text();
		$link_0_UE = encodeURI($news['canonicalUrl']);
		$imgPath_0_UE = encodeURI($news['seo_image']);
		
		$master_disqus_link = {};
		$master_disqus_link['twitter'] = 'http://twitter.com/share?text='+$text_0_UE+'&url='+$link_0_UE+'&title='+$text_0_UE;
		$master_disqus_link['facebook'] = 'http://www.facebook.com/sharer.php?u='+$link_0_UE;
		$master_disqus_link['linkedin'] = 'http://www.linkedin.com/shareArticle?mini=true&url='+$link_0_UE+'&title='+$text_0_UE+'&source='+base_url ;
		$master_disqus_link['gplus'] = 'https://plus.google.com/share?url='+$link_0_UE;
		//$master_disqus_link['whatsapp'] = 'whatsapp://send?text='+$text_0_UE+'%20'+$link_0_UE;
		$master_disqus_link['whatsapp'] = ((deviceType != 'mobile')?'https://wa.me/':'whatsapp://send')+'?text='+$link_0_UE;
		$master_disqus_link['email'] = $news['canonicalUrl'];
		/*
		var $waBtnType = (ec_detail_file.search('etb2b_newsdetails.php') > -1)?'square':'';
		
		$socialShareBarnew ='<div class="flL custom_styl"><div class="socialShareBar socialShareBar1" data-unique_key="socialShareBar1" >'+
						'<div class="socialShareElement facebook" data-social_key="facebook" id="fb_sh_but">'+
						'<a target="_blank" href="'+$master_disqus_link['facebook']+'" onclick="window.open(this.href, \'sharer\', \'toolbar=0,status=0,width=548,height=325\'); return false;" class="btn"><span class="logo"></span><span class="label">Share</span></a><div class="count"><span class="triangle-left"></span><span class="num">&nbsp;</span></div></div>&nbsp;'+
						'<div class="socialShareElement twitter" data-social_key="twitter" id="tw_sh_but">'+
						'<a target="_blank" href="'+$master_disqus_link['twitter']+'" onclick="window.open(this.href, '+'\'sharer\''+', '+'\'toolbar=0,status=0,width=548,height=325\''+'); return false;" class="btn"><span class="logo"></span><span class="label">Tweet</span></a><div class="count"><span class="triangle-left"></span><span class="num">&nbsp;</span></div></div>'+
						'<div class="socialShareElement linkedin" data-social_key="linkedin" id="ln_sh_but">'+
						'<a target="_blank" href="'+$master_disqus_link['linkedin']+'" onclick="window.open(this.href, '+'\'sharer\''+', '+'\'toolbar=0,status=0,width=548,height=325\''+'); return false;" class="btn"><span class="logo"></span><span class="label">Share</span></a><div class="count"><span class="triangle-left"></span><span class="num">&nbsp;</span></div></div>'+
						'<div class="socialShareElement gplus" data-social_key="gplus" id="gp_sh_but">'+
						'<a target="_blank" href="'+$master_disqus_link['gplus']+'" onclick="window.open(this.href, '+'\'sharer\''+', '+'\'toolbar=0,status=0,width=548,height=325\''+'); return false;" class="btn"><span class="logo"></span><span class="label">Share</span></a><div class="count"><span class="triangle-left"></span><span class="num">&nbsp;</span></div></div>'+
						'<div class="socialShareElement whatsapp" data-social_key="whatsapp" id="wa_sh_but">'+
						'<a target="_top" href="'+$master_disqus_link['whatsapp']+'" data-text="'+$text_0_UE+'" data-href="'+$link_0_UE+'" class="wa_btn '+$waBtnType+'"><span></span></a><div class="count"><span class="triangle-left"></span><span class="num">&nbsp;</span></div></div>'+
						'</div></div>';
						*/
		var $btnType = (ec_detail_file.search('etb2b_newsdetails.php') > -1)?'square':'circle';
		$socialShareBarnew ='<div class="flL custom_styl"><div class="socialShareBar socialShareBar1" data-unique_key="socialShareBar1" >'+
						'<div class="socialShareElement facebook" data-social_key="facebook" id="fb_sh_but">'+
						'<a target="_blank" href="'+$master_disqus_link['facebook']+'" onclick="window.open(this.href, \'sharer\', \'toolbar=0,status=0,width=548,height=325\'); return false;" class="btn"><i class="fa fa-facebook"></i><span class="label">Share</span></a><div class="count"><span class="triangle-left"></span><span class="num">&nbsp;</span></div></div>&nbsp;'+
						'<div class="socialShareElement twitter" data-social_key="twitter" id="tw_sh_but">'+
						'<a target="_blank" href="'+$master_disqus_link['twitter']+'" onclick="window.open(this.href, '+'\'sharer\''+', '+'\'toolbar=0,status=0,width=548,height=325\''+'); return false;" class="btn"><i class="fa fa-twitter"></i><span class="label">Tweet</span></a><div class="count"><span class="triangle-left"></span><span class="num">&nbsp;</span></div></div>'+
						'<div class="socialShareElement linkedin" data-social_key="linkedin" id="ln_sh_but">'+
						'<a target="_blank" href="'+$master_disqus_link['linkedin']+'" onclick="window.open(this.href, '+'\'sharer\''+', '+'\'toolbar=0,status=0,width=548,height=325\''+'); return false;" class="btn"><i class="fa fa-linkedin"></i><span class="label">Share</span></a><div class="count"><span class="triangle-left"></span><span class="num">&nbsp;</span></div></div>'+
						'<div class="socialShareElement gplus" data-social_key="gplus" id="gp_sh_but">'+
						'<a target="_blank" href="'+$master_disqus_link['gplus']+'" onclick="window.open(this.href, '+'\'sharer\''+', '+'\'toolbar=0,status=0,width=548,height=325\''+'); return false;" class="btn"><i class="fa fa-google-plus"></i><span class="label">Share</span></a><div class="count"><span class="triangle-left"></span><span class="num">&nbsp;</span></div></div>'+
						'<div class="socialShareElement whatsapp" data-social_key="whatsapp" id="wa_sh_but">'+
						'<a target="_top" href="'+$master_disqus_link['whatsapp']+'" data-text="'+$text_0_UE+'" data-href="'+$link_0_UE+'"><i class="fa fa-whatsapp"></i></a><div class="count"><span class="triangle-left"></span><span class="num">&nbsp;</span></div></div>'+
						'<div class="socialShareElement email addthis_toolbox"  style="display:none"y data-social_key="email" id="em_sh_but">'+
						'<a target="_blank" addthis:url="'+$master_disqus_link['email']+'" addthis:title="'+$text_0_UE+'" href="http://www.addthis.com/bookmark.php" title="Email" class="addthis_button_email"><i class="fa fa-envelope-o"></i></a><div class="count"><span class="triangle-left"></span><span class="num">&nbsp;</span></div></div>'+
						'</div></div>';
		
		return $socialShareBarnew;
		
	}
	
}

function add_social_bar_dynamic(id,data,display_type,type){
	if(type == 'both')
	{
		social_bar_html = social_bar(id,data,2);
		social_bar_html += social_bar(id,data,1);
		
	}
	else
	social_bar_html = social_bar(id,data,display_type);
	$(id).html(social_bar_html);
	try{
		FB.XFBML.parse();
		twttr.widgets.load();
		gapi.plus.go();
		IN.parse();
		addthis.toolbox('.addthis_toolbox');
		/*
		var i;
		for(i=0; i<20; i++)
		{
			$("#___plus_"+i).css({width:'80px'});
			$("#___plus_"+i+" iframe").css({width:'80px'});
		}
		$(".main-content .g-plus").hide();
		*/
	}
	catch(e){
		//
	}
}

function handle_googlelogin_accesstokenurl(url){
	acToken =   gup(url, 'access_token');
    tokenType = gup(url, 'token_type');
    expiresIn = gup(url, 'expires_in');
    validateToken(acToken);
}

function login_with_google(){
	b2b_social_login('google');
    return;
	//var OAUTHURL    =   'https://accounts.google.com/o/oauth2/auth?';
	var OAUTHURL 	=   'https://accounts.google.com/o/oauth2/v2/auth?';
    var VALIDURL    =   'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=';
    var SCOPE       =   'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
    var CLIENTID    =   GOOGLE_APPID;
    var REDIRECT    =   base_url+'/ajax_files/etb2b_registration.php'
    var TYPE        =   'token';
    //var google_login_url        =   OAUTHURL + 'scope=' + SCOPE + '&client_id=' + CLIENTID + '&redirect_uri=' + REDIRECT + '&response_type=' + TYPE;
    var google_login_url = OAUTHURL + 'scope=' + SCOPE + '&include_granted_scopes=true&redirect_uri='+ REDIRECT +'&response_type='+TYPE+'&client_id='+ CLIENTID + '&state=dgdgdgdgd';
    var win         =   window.open(google_login_url, "windowname1", 'width=800, height=600'); 
    /*
    var pollTimer   =   window.setInterval(function() { 
        try {
            //console.log(win.document.URL);
            if (win.document.URL.indexOf(REDIRECT) != -1) {
                window.clearInterval(pollTimer);
                var url =   win.document.URL;
                acToken =   gup(url, 'access_token');
                tokenType = gup(url, 'token_type');
                expiresIn = gup(url, 'expires_in');
                win.close();
                validateToken(acToken);
            }
        } catch(e) {
        }
    }, 100);
    */
	
}

function validateToken(token) {
	var VALIDURL    =   'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=';
    $.ajax({
        url: VALIDURL + token,
        data: null,
        success: function(responseText){  
            getUserInfo(token);
        },  
        dataType: "jsonp"  
    });
}

function getUserInfo(token) {
    $.ajax({
        url: 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + token,
        data: null,
        success: function(resp) {
            user    =   resp;
            var id=user.id
            var first_name=user.given_name;
            var last_name=user.family_name;
            var email=user.email;
            var link=user.link;
            var pic= user.picture;
            var gender= user.gender;
            var url=base_url+'/ajax_files/etb2b_registration.php';
            $.ajax({url:url, type:"POST", xhrFields: { withCredentials: true }, data: {'reg_type':'google','id':id, 'first_name':first_name,'last_name':last_name,'email':email,'link':link,'pic':pic ,'gender':gender }, success: function(data) {
				if(data=='google'){
					handle_login_result('google');
				}else{
					handle_login_result('old');
				}
    		}
    		});
            
        },
        dataType: "jsonp"
    });
}

function gup(url, name) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\#&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    if( results == null )
        return "";
    else
        return results[1];
}

function login_with_facebook(){
	
	b2b_social_login('facebook');
    return;
	var facebook_reg_url = 'https://www.facebook.com/v2.7/dialog/oauth?client_id='+FACEBOOK_APPID+'&display=popup&redirect_uri='+base_url+'/ajax_files/etb2b_registration.php%3Ftype%3Dfb%26connect_type%3Dfb&scope=email'; 
	 var win         =   window.open(facebook_reg_url, "windowname1", 'width=800, height=600'); 	
}
function handle_login_result(user_type){
	setLocalStorage("userReg",false,1);
	var source='direct';
	if( typeof $_GET['utm_source'] === 'undefined' || $_GET['utm_source'] === null ){
		source='direct_'+ec_detail_file; 
	}else{
		source=$_GET['utm_source']+'_'+ec_detail_file; 
	}
	if(user_type=='linkedin'){
		ga('send', 'event', 'Signup', 'Linkedin_Signup',source );
	}else if(user_type=='google'){
		ga('send', 'event', 'Signup', 'Google_Signup',source );
	}else if(user_type=='facebook'){
		ga('send', 'event', 'Signup', 'Facebook_Signup',source );
	}
   _remove_custom_poplayer2(1);
	//executeWithCsrfToken(check_login_status,1);
	check_login_status();
}

var handle_login_error = function(error,type){
    var link='';
    if(type == 'email'){
      $('#log_main_err').html(error);
    }
    else{
      if(false && (type=='linkedin' || type=='facebook' || type=='google'))
      link='onclick="login_with_'+type+'()"';
      else
      link = "onclick=\"_remove_custom_poplayer2(1);login_popup_display_type=2;_custom_poplayer2('','',show_login_layer, '_lgn_pop', 1); \"";
      _remove_custom_poplayer2(1);
      var newlid = _custom_poplayer2('','','', 'alC', 1, 'Y');
      $('#_l2_txt_cnt_'+newlid).html('<h3>'+error+'</h3>'+((link)?('<a '+link+' class="back-to-register">Please click here to retry.</a>'):''));
    }
}

function login_with_linkedin(){
	b2b_social_login('linkedin');
    return;
	var linkedin_login_url=base_url+'/linkedin_login.php';
	 var win         =   window.open(linkedin_login_url, "windowname1", 'width=800, height=600'); 	
}

function login_with_twitter(){
	var twitter_login_url=base_url+'/etb2b_twitter_login.php';
	 var win         =   window.open(twitter_login_url, "windowname1", 'width=500, height=500'); 	
}

function show_login_layer(lid){ 
	var rem_email='';
	rem_email=getCookie('ppuserinfo');
	if(rem_email){
		rem_email=rem_email.split(':');
		rem_email=rem_email[1];
	}
	if(!rem_email) rem_email = '';
	if(login_popup_display_type == 2)
	$('#_l2_txt_cnt_'+lid).html('<div class="clm1"><div id="social-loign">   <a onclick="login_with_facebook()" class="btn fb"><i class="fa fa-facebook"></i> Sign in / Sign up with Facebook</a>  <a onclick="login_with_linkedin()" class="btn lin"><i class="fa fa-linkedin"></i> Sign in / Sign up with Linkedin</a>   <a class="btn ggl" onclick="login_with_google();"><span class="fa"><img class="g-icon" src="/Themes/Release/images/g-icon.png" alt="G"></span><span class="g-icon-text"> Sign in with Google </span></a>  <p><a class="signup">Sign Up With Email</a>. By signing up you indicate that you have read and agree to the <a target="_blank" href="'+base_url+'/terms_conditions.php">Terms &amp; Conditions</a>.</p>  </div><div id="signup-form" style="display:none"><h3>SIGNUP</h3><p id="main_err" class="error error_info"></p><div class="section clearfix">  <label for="registration_name">Name</label>  <input type="text" name="registration_name" id="registration_name" placeholder="Name" class="txt_box" /><p id="reg_name_err" class="error"></p></div><div class="section clearfix">  <label for="registration_email">Email</label>  <input type="email" name="registration_email" id="registration_email" placeholder="Email" class="txt_box" /> <p id="reg_email_err" class="error"></p>  </div>   <div class="section clearfix">  <label for="registration_password">Password</label>  <input type="password" name="registration_password" id="registration_password" placeholder="Password" class="txt_box" /> <p id="reg_pwd_err" class="error"></p>  </div>   <div class="section">  <p>By clicking "Sign Up" you indicate that you have read and agree to the <a target="_blank" href="'+base_url+'/terms_conditions.php">Terms &amp; Conditions.</a></p></div><div class="section clearfix">  <input type="submit" onclick="javascript:user_registeration('+lid+');" class="submit-button2" value="SIGNUP" ><a class="cancel">Cancel</a></div></div></div> <div id="login-form" class="clm2"><h3>LOGIN</h3> <p id="log_main_err" class="error error_info"></p>  <div class="section"><input type="email" id="log_email" placeholder="Email" class="txt_box" value="'+rem_email+'"/>   <i class="fa fa-envelope"></i><p id="log_email_err" class="error"></p></div>  <div class="section">   <input type="password" id="log_pswd" placeholder="Password" class="txt_box" />   <i class="fa fa-lock"></i> <p id="log_pswd_err" class="error"></p>  </div>  <div class="section">   <label for="remember_me" class="remember"><input type="checkbox" id="remember_me" checked /> Remember me</label></div><div class="section">   <a id="forgot_pswd_link" class="forgot">Forgot password?</a>   <input type="submit" id="log_submit" class="submit-button2 disabled" onclick="login_user('+lid+');" value="Login" >   </div> </div>       <div id="forgot_psswrd" class="clm2" style="display:none;"><h3>Please enter your E-mail Id</h3> <p id="main_err_frgt_pwd" class="success_msg"></p><div class="section"><input id="frgt_pswd_email" type="email" placeholder="Email" class="txt_box" value="">   <i class="fa fa-envelope"></i><p class="error" id="frgt_email_err"></p></div><div class="section"><a id="login_back_link" class="backto-login">Back to login</a> <input type="submit"  class="submit-button2" value="Send" onclick="forgot_password();">   </div> </div>').parent().removeClass("v2");	
	else
	$('#_l2_txt_cnt_'+lid).html('<div class="popup-screens">'+ login_popup_screens['screen1']['html'][0] +'</div><div class="links_outside">'+ login_popup_screens['screen1']['links'][0] +'</div>').parent().addClass("V2");	
	loadloginfunctions(lid);
}

function show_login_layer_custom(header,footer,close){ 
	var newlid=_custom_poplayer2('','',show_login_layer_custom_int, '', 1, close, null,header+'|--|'+footer , '');
}

function show_login_layer_custom_int(href,lid){	
	var rem_email='';
	var head_html=href.split('|--|');
	rem_email=getCookie('ppuserinfo');
	if(rem_email){
		rem_email=rem_email.split(':');
		rem_email=rem_email[1];
	}
	if(!rem_email) rem_email = '';
	
	$('#_l2_txt_cnt_'+lid).html('<div class="popup-screens">'+head_html[0]+'<div class="connect_btns"><a onclick="login_with_linkedin()" class="connect_btn"><i class="fa fa-linkedin-square"></i>Continue with Linkedin</a><span class="or">or</span><a onclick="login_with_facebook()" class="connect_btn"><i class="fa fa-facebook-square"></i>Continue with Facebook</a><br><a onclick="login_with_google()" class="connect_btn"><i class="fa fa-google"></i>Continue with Google</a></div><div class="terms"><small>By continuing, I agree to the <a href="'+base_url+'/terms_conditions.php" target="_blank">Terms of Service</a> and <a href="'+base_url+'/privacy_policy.php" target="_blank">Privacy Policy</a>.</small></div> </div>'+head_html[1]+'<div class="links_outside"><a class="login_link" onclick="javascript:switch_screen(\'screen2\')" href="#">I Have ETAuto Account</a><span>•</span><a onclick="javascript:switch_screen(\'screen3\')" class="login_link" href="#">Sign Up With Email</a></div>').parent().addClass("_lgn_pop V2");		
	loadloginfunctions(lid);
}

function loadloginfunctions(lid){
	$("body").on("click",".signup",function(){
		$("#social-loign").hide();
		$("#signup-form").show();	
	})
	
	 $("body").on("click",".popup5 .cancel",function(){
		$("#social-loign").show();
		$("#signup-form").hide();	
	})
	
	$("body").on("change","#log_email",function(){
		if($("#log_email").val().length > 0){	
			$("#log_submit").removeClass("disabled")
		}
	})
	
	$("body").on("click","#forgot_pswd_link",function(){
		$("#login-form").hide();
		$("#forgot_psswrd").show();	
	})
	$("body").on("click","#login_back_link",function(){
		$("#forgot_psswrd").hide();	
		$("#login-form").show();
		
	})
	
	$("body").on("keypress","#log_pswd",function(event) {
		if (event.which == 13) {
			event.preventDefault();
			login_user(lid);
		}
	});
	
	$("body").on("keypress","#registration_password",function(event) {
		if (event.which == 13) {
			event.preventDefault();
			user_registeration(lid);
		}
	});
	
	$("body").on("keypress","#frgt_pswd_email",function(event) {
		if (event.which == 13) {
			event.preventDefault();
			forgot_password();
		}
	});
		
	if($(".popup5 #log_email").val().length > 0){	
		$("#log_submit").removeClass("disabled")
	}
}

function forgot_password(){
	$('#main_err_frgt_pwd').html('');
	$('#frgt_email_err').html('');
	var email=$('#frgt_pswd_email').val();
	error_val=validate_email(email);
	if(error_val){
		$('#frgt_email_err').html(error_val);
		error=true;
		return false;
	}
	
	var url = base_url + '/ajax_files/etb2b_registration.php';
	$.ajax({url:url, type:"POST", xhrFields: { withCredentials: true }, data: {'action':'forgot_password','email':email}, success: function(data) {
		$('#main_err_frgt_pwd').html(data);
	
	}
	});
}

function user_registeration(lid){
	$(".clm1 .error,.popup-screens .error").removeClass("error");
	$(".clm1 [id$=_err],.popup-screens [id$=_err]").html('');
	//$('#main_err').html('');
	//$('#reg_name_err').html('');
	//$('#reg_email_err').html('');
	//$('#reg_pwd_err').html('');
	var reg_name=$('#registration_name').val();
	var reg_email=$('#registration_email').val();
	var reg_pwd=$('#registration_password').val();
	var error=false;
	var error_val='';
	error_val=validate_name(reg_name);
	if(error_val){
		$('#reg_name_err').html(error_val);
		$('#reg_name_err').addClass('error');
		$('#registration_name').addClass('error');
		error=true;
		return false;
	}
	
	error_val=validate_email(reg_email);
	if(error_val){
		$('#reg_email_err').html(error_val);
		$('#reg_email_err').addClass('error');
		$('#registration_email').addClass('error');
		error=true;
		return false;
	}
	error_val=validate_password(reg_pwd);
	if(error_val){
		$('#reg_pwd_err').html(error_val);
		$('#reg_pwd_err').addClass('error');
		$('#registration_password').addClass('error');
		error=true;
		return false;
	}
	if(error){
		return false;
	}
	else{
		var reg_pwd_encrypt = sha256_digest(reg_pwd);
		var url = base_url + '/ajax_files/etb2b_registration.php';
		var curloc = window.location.href;
		$.ajax({url:url, type:"POST", xhrFields: { withCredentials: true }, data: {'name':reg_name,'email':reg_email, 'password':reg_pwd_encrypt, 'pwd':reg_pwd, 'source':curloc}, success: function(data) {
			setLocalStorage("userReg",false,1);
			res=JSON.parse(data);
			if(res['main_msg']){
				$('#main_err').html(res['main_msg']);
			}
			else{
				_remove_custom_poplayer2(lid);
				var source='direct';
				if( typeof $_GET['utm_source'] === 'undefined' || $_GET['utm_source'] === null ){
					source='direct_'+ec_detail_file; 
				}else{
					source=$_GET['utm_source']+'_'+ec_detail_file; 
				}
				ga('send', 'event', 'Signup', 'Email_Signup',source );
				check_login_status();
			}
		}
		});	
	}
}

function validate_name(name){
	var error='';
	name=name.replace(/ /g,'');
	if(name == ""){
		error='Please enter your name';
	}
	else if(!name.match(/^([a-zA-Z]+)$/i)){
		error='Name must not contain any special symbol/number';
	}
	return error;
}

function validate_email(email)
{
	var error='';
	email=email.replace(/ /g,'');
	if(email == ""){
		error='Please enter your email';
	}
	else if(!is_valid_email(email)){
		error='Please provide valid Email Id';
	}
	return error;	
}


function validate_password(password){
	var error='';
	password=password.replace(/ /g,'');
	if(password == ""){
		error='Please enter your password';
	}
	else if(password.length<5){
		error='Password length must be longer than 5 characters';
	}
	else if(password.length>16){
		error=' password length must be less than 16 characters';
	}
	return error;	
	
}

function login_user(lid){
	setLocalStorage("userReg",false,1);
	$(".popup-screens .error").removeClass("error");
	$(".popup-screens [id$=_err]").html('');
	var log_email=$('#log_email').val();
	var log_pswd=$('#log_pswd').val();
	var rem_me=$('#remember_me').is(":checked");
	error_val=validate_email(log_email);
	if(error_val){
		$('#log_email_err').html(error_val);
		$('#log_email_err').addClass('error');
		$('#log_email').addClass('error');
		error=true;
		return false;
	}
	if(log_pswd==''){
		$('#log_pswd_err').html('Please enter your password');
		$('#log_pswd').addClass('error');
		$('#log_pswd_err').addClass('error');
		$('#log_pswd').addClass('error');
		return false;
	}
	window.social_login = 1;

	var reg_pwd_encrypt = sha256_digest(log_pswd);
	var url = base_url + '/ajax_files/etb2b_social_registration.php';
	$.ajax({url:url, type:"POST", xhrFields: { withCredentials: true }, data: {'type':'email','connect_type':'email','email':log_email, 'password':reg_pwd_encrypt,'remember_me':rem_me ,'pwd':log_pswd}, success: function(data) {
		$("body").append('<div class="hide">'+data+'</div>');
		//location.reload(true);
		//var test_login_id=$('#test_login_id').val();
		//alert(test_login_id)
		
	}
	});
	
}

b2b_social_login = function(type){
    setLocalStorage('skipprofilecompletion',{},1);
    window.social_login = 1;
    window.opener = null;
    var win         =   window.open(base_url+'/ajax_files/etb2b_social_registration.php?connect_type='+type, "windowname1" + getRandomInt(1000,9999), 'width=800, height=600'); 
}

function check_login_status(){
	//if(login_required === 1){
		$('#tb_lgn_bx').show();
	//}
	
	if(isGDPRNation()) //prevent login check
	return false;
	
	var getUserDetailInfo = getLocalStorage("userData");
    var getUserReg = getLocalStorage("userReg");
    var expireTime = 5/(24*60);
    function check_user_login_status(data){
    	if(data){
    		_loggedin_user_user_script_executed=1;
			res=JSON.parse(data);
			_loggedin_user = res; //setting logged in flag
			if(!$.isEmptyObject(res)){
				if(res['type']=='loggedin'){
					default_cb_on_login();
					window['b2buser'] = res;
					pEmail = _profile_email = res['email'];				
					
					var usr_pic='',ext_text='';
					if(res['pic']){
						usr_pic='<img class="unveil" src="'+ ET_DEFAULT_FACE_IMG_URL +'" data-src="'+res['pic']+'" width="18" height="18">';
					}else{
                        usr_pic='<i class="user-icon"></i>';
                    }
					
					if(hdr_menu_type == "jobs"){
						ext_text='<li><a href="'+base_url+'/jobs-application"><i class="fa fa-user"></i>My Applications</a></li>';
						ext_text+='<li><a href="'+base_url+'/jobs-added"><i class="fa fa-user"></i>My Posted Jobs</a></li>';
					}else if(hdr_menu_type == 'forum'  && res['url']!='null' && res['url']!=null && res['url']!=''){
						ext_text='<li><a href="'+base_url+'/profile/'+res['url']+'"><i class="fa fa-user"></i>My Activity</a></li>';
					}else if(hdr_menu_type=='myprofile' && ET_PORTAL=='auto'){
						ext_text='<li><a href="'+base_url+'/profile/'+res['url']+'"><i class="fa fa-user"></i>Ask Activity</a></li>';
						ext_text+='<li><a href="'+base_url+'/jobs-application"><i class="fa fa-user"></i>My Job Apps</a></li>';
						ext_text+='<li><a href="'+base_url+'/jobs-added"><i class="fa fa-user"></i>My Posted Jobs</a></li>';	
					}else if(ET_PORTAL=='auto' && res['url']!='null' && res['url']!=null && res['url']!=''){
						ext_text='<li><a href="'+base_url+'/profile/'+res['url']+'"><i class="fa fa-user"></i>My Activity</a></li>';
					}else if(ET_PORTAL=='masterclass' && res['url']!='null' && res['url']!=null && res['url']!=''){
						ext_text='<li><a href="'+base_url+'/mycourses"><i class="fa fa-user"></i>My courses</a></li>';
					}
					$('#logged_username').html(usr_pic+'<a href="javascript:void(0);">Hi, '+$.trim(res['first_name']+' '+res['last_name'])+'</a><div class="hvr_bx"><ul>'+ext_text+'<li><a href="'+base_url+'/myprofile"><i class="fa fa-pencil"></i>Edit Profile</a></li><li><a href="'+base_url+'/logout.php"><i class="fa fa-power-off"></i>Logout</a></li></ul></div>').show();
					initUnveilImg();
					setLocalStorage("userData",data,expireTime);
				}
				else if(res['type']=='registered_user' && login_required){
					default_cb_on_nonlogin(true);
					if(res['email']){ 
						if(res['email'] == null) res['email'] = '';
						$('body').find('#log_email').val(res['email']);
					} else {
						$('body').find('#log_email').val('');
					}
				}
				else if(res['type']=='subscriber' && login_required){ 
					default_cb_on_nonlogin(true); 		
					$('body').find('#registration_email').val(res['email']);
					$('body').find('#registration_name').val(res['name']);
					$('body').find('#main_err').html('Please register with us');
					$('body').find("#social-loign").hide();
					$('body').find("#signup-form").show();
				}
				else if(res['type']=='sso' && login_required){ 
					default_cb_on_nonlogin(true);
					$('body').find('#registration_email').val(res['email']);
					$('body').find('#registration_name').val(res['name']);
					$('body').find('#main_err').html('Please register with us');
					$('body').find("#social-loign").hide();
					$('body').find("#signup-form").show();
				} else {
					default_cb_on_nonlogin(false);
				}
			} else {
				default_cb_on_nonlogin(login_required?true:false);
			}
		}
		deleteLocalStorage("userReg");
    }
	var url = base_url + '/ajax_files/etb2b_registration.php';
	var data = {'action':'chk_login_status','login':login_required,'chk_sub_status':chk_sub_status};
	if(typeof window['force_fetch_user_details'] !='undefined'){
		data['force_fetch_user_details'] = window['force_fetch_user_details'];
	}
	if(getUserDetailInfo != null && getUserDetailInfo != "" && getUserReg != false){
      check_user_login_status(getUserDetailInfo);
    }else if(getUserDetailInfo == "" && getUserReg != false){
      check_user_login_status(getUserDetailInfo);
      default_cb_on_nonlogin(login_required?true:false);
    }else{
		$.ajax({
			url:url, 
			type:"POST", 
			xhrFields: { withCredentials: true }, 
			data: data, 
			success: function(data) { 
				setLocalStorage("userData",data,expireTime);
				if(data){
					check_user_login_status(data);				
				}
				else {
					default_cb_on_nonlogin(login_required?true:false);
				}
			}
		});
	}	
}

function validateforgotpswdform(){
	var error_val='';
	var error=false;
	var email=urlParamaters('email');
	var frgt_pswd_id=urlParamaters('forgot_password_id');
	if(email=='' || frgt_pswd_id==''){
		$('#mail_msg').html('Please use emailed link to reset your password');
		error=true;
		return false;
	}
	
	$('#new_pswd_err').html('');
	$('#re_new_pswd_err').html('');
	
	var new_pswd=$('#new_pswd').val().replace(/ /g,'');
	var re_new_pswd=$('#re_new_pswd').val().replace(/ /g,'');
	error_val=validate_password(new_pswd);
	if(error_val){
		$('#new_pswd_err').html(error_val);
		error=true;
		return false;
	}
	error_val=validate_password(re_new_pswd);
	if(error_val){
		$('#re_new_pswd_err').html(error_val);
		error=true;
		return false;
	}
	if(new_pswd!=re_new_pswd){
		$('#re_new_pswd_err').html('Please enter same password');
		error=true;
		return false;
	}
	if(!error){
		var url = base_url + '/ajax_files/etb2b_registration.php';
		var reg_pwd_encrypt = sha256_digest(new_pswd);
		$.ajax({url:url, type:"POST", xhrFields: { withCredentials: true }, data: {'action':'reset_password','email': email, 'password':reg_pwd_encrypt,'forgot_pswd_id': frgt_pswd_id }, success: function(data) {
			$('#mail_msg').html(data);
			login_popup_display_type = 2;
			_gbl_logincb_fn = redirect_to_hp;
			$('#reset-password-sign-in').css('display','block');
			$('#reset-password-form').css('display','none');
			setTimeout(function(){
				if(typeof $_GET['source'] != 'undefined' && validate_url($_GET['source']))
				window.location.assign($_GET['source']);
				else{
					_remove_custom_poplayer2(1, true);
					_custom_poplayer2('','',show_login_layer, '_lgn_pop', 1);		
				}
			},1000)
			
		}
		});
	}
}

function validate_url(str) {
   var a  = document.createElement('a');
   a.href = str;
   return (a.host && true);
}

function urlParamaters(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(location.href);
	return results[1] || 0;
}
 
function hideloggedinonlyComponents(){
	 $('.onlogindisplay').hide();
 }
 
 function displayloggedinonlyComponents(){
	 $('.onlogindisplay').show();
	 $('.onloginhide').hide();
	 if($('.answer_bx.notloggedin').length>0){
		 if(_loggedin_user['last_name']!=''){
			 name=_loggedin_user['first_name']+" "+_loggedin_user['last_name']
		 }
		 else{
			 name=_loggedin_user['first_name'];
		 }
		 $('.onlogindisplay.user_name').html(name);
		 if(_loggedin_user['pic']!=''){
			 $('.answer_bx').children('.my_pic').find('img').attr('src',_loggedin_user['pic']);
			 $('.answer_bx').children('.my_pic').find('img').unwrap();
		 }
		 else{
			 $('.answer_bx').children('.my_pic').find('img').attr('src',ET_DEFAULT_FACE_IMG_URL);
			 $('.answer_bx').children('.my_pic').find('img').unwrap();
		 }
	 }
	 
	 if($('#badge_block').length>0 && $('#badge_block').hasClass('hide')){
		 if(_loggedin_user['role']!='user'){
			 update_forum_badge_details();
		 }
	 }
 }

 function reloadPage(){
	 location.reload(true);
 }


function isUserAgentMobile()
{
	var isMobile = false;
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
	return isMobile;
}
function showHideWhatsapp()
{
	return;
	if(deviceType != 'desktop')
	{
		$(".socialShareBar .socialShareElement.whatsapp, .story-box .social a.whatsapp, .portfolio .section .social a.whatsapp, .social.sidepanel a.whatsapp, slideshow_sharepanel.slideshow_sharepanel-Bottom .social-share.circle a.whatsapp, .slideshow_sharepanel .social-share.circle a.whatsapp, .socialShareBar2 ul li a.whatsapp, .pictr_stry .social-share a.whatsapp").css({display:'inline-block'});
		$(".socialShareBar2 ul li a.print-btn").css({display:'none'});
	}else
	{
		$(".socialShareBar .socialShareElement.whatsapp, .story-box .social a.whatsapp, .portfolio .section .social a.whatsapp, .social.sidepanel a.whatsapp, slideshow_sharepanel.slideshow_sharepanel-Bottom .social-share.circle a.whatsapp, .slideshow_sharepanel .social-share.circle a.whatsapp, .socialShareBar2 ul li a.whatsapp, .pictr_stry .social-share a.whatsapp").css({display:'none'});
		$(".socialShareBar2 ul li a.print-btn").css({display:'inline-block'});
	}
}

function ping_check_login_status(){ 
	if(login_required){ //&& !_is_loggedin    
		check_login_status();
	}
}

function default_cb_on_login(){ 
	_is_loggedin=1; //console.log('_is_loggedin=1');
	document.dispatchEvent(new CustomEvent("userFetchApiComplete"));
	if($('body').find('._lgn_pop').length >= 1) _remove_custom_poplayer2(1, true);
	
	$('#top-login-btn').hide();
	//setting callback fn.
	if(_gbl_logincb_fn){
		_gbl_logincb_fn();
	}
	else
    {
      if(typeof window.social_login != 'undefined' && window.social_login == 1)
      setup_profile_complete_box(_loggedin_user,'profile_completion');
    }
    $(document).trigger($.Event('_gbl_logincb_fn_event'));
}

function default_cb_on_nonlogin(showbx){ 
	_is_loggedin = 0; //console.log('_is_loggedin=0');
	document.dispatchEvent(new CustomEvent("userFetchApiComplete"));
	if(showbx == true){
		if($('body').find('._lgn_pop').length <= 0){
			if(typeof forum_page_log_pop == "undefined"){
			_custom_poplayer2('','',show_login_layer, '', 1);
			}else{
			show_login_layer_custom('<div class="hdr_l1">Thank you for stopping by!</div><div class="hdr_l2">Select one of the login options below to continue your journey on ET Auto Ask!</div>',forum_footer,'');
			}
		
		}
	}
	else if(!(_gbl_notlogincb_fn))
	{
		if(typeof Promise !== "undefined" && navigator.userAgent.toLowerCase().match('crios')||navigator.userAgent.toLowerCase().match('chrome')
        )
		{
			(function() {
				var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
				po.src = THEME_PATH+'/javascript/onetap_signin_js.js?mod=50';
				var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
			})();
		}
	}
	 
	$('#logged_username').hide(); 
	$('#top-login-btn').show();
	//setting callback fn.
	if(_gbl_notlogincb_fn){
		_gbl_notlogincb_fn();
	}
	$(document).trigger($.Event('_gbl_notlogincb_fn_event'));
}

function nFormatter(num) {
    if (num >= 1000000000) {
       return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    }
    if (num >= 1000000) {
       return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
       return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
}

/*function connect_fb(){
			FB.login(function(response)
			{
				if (response.status == 'connected')
				{
					check_fb_publish_permissions();					
				}
			}, { scope : 'email,user_education_history,user_hometown,user_location,user_work_history,publish_actions'});
		

}

function check_fb_publish_permissions(){	
    FB.api(
        "/me/permissions/publish_actions",
        function (response) {
            if (response.data[0]['permission']=='publish_actions' && response.data[0]['status']=='granted') {
            	 $(".fb_auto_shr").attr("disabled",false);
            	 $(".fb_auto_shr").attr('checked', true);
            	 var url = base_url + '/ajax_files/etb2b_registration.php';
         		$.ajax({url:url, type:"POST", xhrFields: { withCredentials: true }, data: 		{'action':'update_fb_token'}, success: function(data) {
         		}
         		});
            } else {
            	//$(el).attr('checked', false);
            }
        }
    );
}*/

function connect_fb(shr_type){
	var facebook_reg_url = 'https://www.facebook.com/v2.7/dialog/oauth?client_id='+FACEBOOK_APPID+'&display=popup&redirect_uri='+base_url+'/ajax_files/etb2b_registration.php%3Ftype%3Dfb_connect_only%26connect_type%3D'+shr_type+'&scope=email%2C+user_education_history%2C+user_hometown%2C+user_location%2C+user_work_history%2C+publish_actions'; 
	 var win         =   window.open(facebook_reg_url, "windowname1", 'width=600, height=400'); 
}

function connect_twitter(el){
	login_with_twitter();
}

function handle_twitter_loggedin(status){
	if(typeof status!='undefined' && status=='1'){
		$(".tw_auto_shr").attr("disabled",false);
		$(".tw_auto_shr").attr('checked', true);
		var url=base_url + '/ajax_files/etb2b_registration.php'; 
		$.ajax({url:url, type:"POST", xhrFields: { withCredentials: true }, data: {action:'chg_forum_shr_setting','type':'answer','status':'1','mode':'tw'}, success: function(data) {
			res=JSON.parse(data);			
		}
		});
	}
}

function handle_fb_loggedin(status,shr_for){
	if( typeof shr_for!='undefined' && shr_for=='upvote'){
		if(typeof status!='undefined' && status=='1'){
			$(".fb_auto_upvote_shr").attr("checked",true);
			$(".fb_auto_upvote_shr").attr("onclick",'');
			$(".fb_auto_upvote_shr").attr("toggle_shr('upvote')",'');
			
		}
		else{
			$(".fb_auto_upvote_shr").attr("checked",false);
		}
	}
	else if( typeof shr_for!='undefined' && shr_for=='follow'){
		if(typeof status!='undefined' && status=='1'){
			$(".fb_auto_upvote_shr").attr("checked",true);
			$(".fb_auto_upvote_shr").attr("onclick",'');
			$(".fb_auto_upvote_shr").attr("toggle_shr('upvote')",'');
			
		}
		else{
			$(".fb_auto_upvote_shr").attr("checked",false);
		}
	}
	else if( typeof shr_for!='undefined' && shr_for=='answer'){
		if(typeof status!='undefined' && status=='1'){
			$(".fb_auto_upvote_shr").attr("checked",true);
			$(".fb_auto_upvote_shr").attr("onclick",'');
			$(".fb_auto_upvote_shr").attr("toggle_shr('upvote')",'');
			var url=base_url + '/ajax_files/etb2b_registration.php'; 
			$.ajax({url:url, type:"POST", xhrFields: { withCredentials: true }, data: {action:'chg_forum_shr_setting','type':'answer','status':1,'mode':'fb'}, success: function(data) {
				res=JSON.parse(data);			
			}
			});			
		}
		else{
			$(".fb_auto_upvote_shr").attr("checked",false);
		}
	}
	else if(typeof status!='undefined' && status=='1'){
		$(".fb_auto_shr").attr("disabled",false);
   	 $(".fb_auto_shr").attr('checked', true);
	}
}

function redirect_to_hp(){
	window.location = base_url;
}

function redirect_to_return_url(url){ 
	if(url){
		url = url;
	} else if(_gbl_red_url){
		url = _gbl_red_url;
	} else if($_GET['return']){
		$_GET['return'] = $_GET['return'].replace(/^\//,"");
		url = base_url+'/'+$_GET['return'];
	} else{
		url = base_url;
	}
	if(url){ 
		window.location = url;
		return false;
	}
}

/*
if($(window).width() < 980){
var didScroll;
var lastScrollTop = 0;
var delta = 5;
if(ET_PORTAL == 'tech' || ET_PORTAL == 'brandequity' || ET_PORTAL == 'realty' || ET_PORTAL == 'ciso')
{
	var navselector  = "#hd-blk";
}else
{
	var navselector = "#navbar";
}

var navbarHeight = $(navselector).outerHeight();
$(window).scroll(function(event){
		didScroll = true;
		
});

setInterval(function() {
		if (didScroll) {
			hasScrolled();
			didScroll = false;
		}
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
	   
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $(navselector).removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $(navselector).removeClass('nav-up').addClass('nav-down');
        }
    }
    
    lastScrollTop = st;
}

}
*/


/*============================================= for ETB2BRHSBlogAuthors ==========================================================*/
//onAuthorDetailLinkHover
//enableAuthorDetailLinkHover
//getBlogPopupSection
//getBlogPopupFirstItem
//getBlogPopupList
//getSocialShareWidget
function onAuthorDetailLinkHover(elem)
{
	var popupParent = $(elem).parent();
	var hasPopup = Boolean(popupParent.find('div.pop-over').length);
	var author_id=$(elem).attr( "a_id" );
	//alert(author_id);
	if(!hasPopup)
	{
		$.get( base_url + "/ajax_files/etb2b_blogs_author_details.php?author_id="+author_id, function( data ) {
			//$('#auth_detail').html(data);
			//console.log($.parseJSON(data));
			if(!Boolean(popupParent.find('div.pop-over').length))
			{
				var jsonData = $.parseJSON(data);
				jsonData['author_details']['id'] = author_id;
				popupParent.append(getBlogPopupSection(jsonData ,'data-modname="Other_authors"'));
				//setSlider($("#scrollPane-blogPopupList_"+author_id));
				$("#scrollPane-blogPopupList_"+author_id).niceScroll();
				//initUnveilImg();
				//$(window).trigger('scroll');
				$($(popupParent).children('div.pop-over')[0]).find('img.unveil').unveil();
			}
		});
	}else
	{
		//setSlider($("#scrollPane-blogPopupList_"+author_id));
		$("#scrollPane-blogPopupList_"+author_id).niceScroll();
		//initUnveilImg();
		//$(window).trigger('scroll');
		$($(popupParent).children('div.pop-over')[0]).find('img.unveil').unveil();
	}
}
function enableAuthorDetailLinkHover()
{
	if($('.author_detail_link').length)
	{
		$('.author_detail_link').mouseover(function(evt){
			var popupParent = $(evt.target).parent().parent();
			var hasPopup = Boolean(popupParent.find('div.pop-over').length);
			var author_id=$(this).attr( "a_id" );
			//alert(author_id);
			if(!hasPopup)$.get( base_url + "/web/ajax_files/etb2b_blogs_author_details.php?author_id="+author_id, function( data ) {		
				//$('#auth_detail').html(data);
				//console.log($.parseJSON(data));
				if(!Boolean(popupParent.find('div.pop-over').length))
				{
					var jsonData = $.parseJSON(data);
					jsonData['author_details']['id'] = author_id;
					popupParent.append(getBlogPopupSection(jsonData));
					//setSlider($("#scrollPane-blogPopupList_"+author_id));
					$("#scrollPane-blogPopupList_"+author_id).niceScroll();
					initUnveilImg();
					//$(window).trigger('scroll');
				}
			});
			//setSlider($("#scrollPane-blogPopupList_"+author_id));
			$("#scrollPane-blogPopupList_"+author_id).niceScroll();
			initUnveilImg();
			//$(window).trigger('scroll');
		});
	}
}
function getBlogPopupSection($obj,eventType)
{
	//console.log('getBlogPopupSection');
	var $author_details = $obj['author_details'];
	var $blog_list = $obj['blog_list'];
	if($blog_list.length == 0)$blog_list.push({title:'', detail:'', 'link':''});
	var $view_0 = '<div class="pop-over'+ (($blog_list.length == 1)?" one-clm":"") +'"><div class="inner clearfix">';
	var $view_1 = getBlogPopupFirstItem({title:$blog_list[0]['title'], desc:$blog_list[0]['detail'], imgPath_0:$author_details['profile_pic'], imgAlt_0:$author_details['name'],imgPath_1:$author_details['profile_pic_small'], text_1:$author_details['name'], text_2:$author_details['designation'], text_3:$author_details['company'], link_0:$author_details['author_link'], link_1:$blog_list[0]['link']},eventType)+'<div class="more"><h4><a href="'+$author_details['author_link']+'" '+eventType+'>More from '+$author_details['name']+'</a></h4><div id="scrollPane-blogPopupList_'+ $author_details['id'] +'" class="scroll-cntent_blogList">'+getBlogPopupList($blog_list,eventType)+'</div></div>';
	var $view_2 = '</div></div>';
	return $view_0+$view_1+$view_2;
}
function getBlogPopupFirstItem($obj,eventType)
{
	//console.log('getBlogPopupFirstItem');
	var $title = $obj['title'];
	var $desc = $obj['desc'];
	if($obj['imgPath_1']){
	var $tempImg=$obj['imgPath_1'];
	}else{
	var $tempImg=ET_DEFAULT_FACE_IMG_URL;
	}
	var $imgPath_0 = $obj['imgPath_0'];
	var $imgAlt_0 = $obj['imgAlt_0'];
	var $text_1 = $obj['text_1'];
	var $text_2 = $obj['text_2'];
	var $text_3 = $obj['text_3'];
	var $link_0 = $obj['link_0'];
	var $link_1 = $obj['link_1'];
	return '<div class="detail clearfix"><a href="'+$link_0+'" '+eventType+'><img class="unveil face" src="'+$tempImg+'" data-src="'+$imgPath_0+'" alt="'+$imgAlt_0+'"></a><div class="desc"><h3><a href="'+$link_1+'" '+eventType+'>'+$title+'</a></h3><p>'+$desc+'</p><span class="meta"><strong><a href="'+$link_0+'" '+eventType+'>'+$text_1+'</a></strong>'+$text_2+' - '+$text_3+'</span>'+getSocialShareWidget({text_0:$title, text_1:$text_1, link_0:$link_1, imgPath_0:$imgPath_0})+'</div></div>';
}
function getBlogPopupList($obj,eventType)
{
	//console.log('getBlogPopupList');
	var $listData = $obj;
	var $list_0 = '<ul class="lst6">';
	var $list_1 = '';
	var $list_2 = '</ul>';
	$listData.shift();
	var numItems = $listData.length;
	var i;
	for(i=0; i<numItems; i++)
	{
		$listItemData = $listData[i];
		$list_1 += '<li><a href="'+$listItemData['link']+'" '+eventType+'>'+$listItemData['title']+'</a><span>'+$listItemData['posted_date']+'</span></li>';
	}
	return $list_0+$list_1+$list_2;
}
function getSocialShareWidget($obj)
{
	//console.log('getSocialShareWidget');
	var text_0 = $obj['text_0'];
	var text_1 = $obj['text_1'];
	var link_0 = $obj['link_0'];
	var imgPath_0 = $obj['imgPath_0'];
	var socialElem = '<div class="follow-wdgt"><a onclick="javascript:twitter_share(\''+rfc3986EncodeURIComponent(text_0+' #'+SITE_NAME_TITLE)+'\', \''+link_0+'\'); return false;" href="javascript:void(0);" class="twitter"><span class="sprite-bg"></span></a><span class="dvr">/</span><a onclick="javascript:facebook_share(\''+link_0+'\', \''+imgPath_0+'\', \''+rfc3986EncodeURIComponent(text_0)+'\', \''+rfc3986EncodeURIComponent(text_1)+'\'); return false;"  href="javascript:void(0);" class="fb"><span class="sprite-bg"></span></a><span class="dvr">/</span><a onclick="javascript:linkedin_share(\''+rfc3986EncodeURIComponent(text_0)+'\', \''+link_0+'\', \''+rfc3986EncodeURIComponent(text_1)+'\',\''+rfc3986EncodeURIComponent(SITE_NAMES[ET_PORTAL])+'\'); return false;" href="javascript:void(0);" class="lin"><span class="sprite-bg"></span></a></div>';
	return socialElem;
}

(function($) {
    $.fn.changeElementType = function(newType) {
        var attrs = {};

        $.each(this[0].attributes, function(idx, attr) {
            attrs[attr.nodeName] = attr.nodeValue;
        });

        this.replaceWith(function() {
            return $("<" + newType + "/>", attrs).append($(this).contents());
        });
    }
})(jQuery);
function render_iframe_from_div(){
	$(".diviframe:not(.iframerendered)").each(function(){
		$(this).changeElementType('iframe');
		$(this).addClass('.iframerendered');
	}); 
}

/* returns the browser info derived from user agent */
function getBrowserInfo(){

	var nVer = navigator.appVersion;
	var nAgt = navigator.userAgent;
	var browserName  = navigator.appName;
	var fullVersion  = ''+parseFloat(navigator.appVersion); 
	var majorVersion = parseInt(navigator.appVersion,10);
	var nameOffset,verOffset,ix;

	// In Opera, the true version is after "Opera" or after "Version"
	//if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
	if((verOffset=nAgt.indexOf("Opera"))!=-1 || (verOffset=nAgt.indexOf("OPR"))!=-1){
		browserName = "Opera";
		fullVersion = nAgt.substring(verOffset+6);
		if ((verOffset=nAgt.indexOf("Version"))!=-1) 
			fullVersion = nAgt.substring(verOffset+8);
	}
	// In MSIE, the true version is after "MSIE" in userAgent
	else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
		browserName = "Microsoft Internet Explorer";
		fullVersion = nAgt.substring(verOffset+5);
	}
	// In Chrome, the true version is after "Chrome" 
	else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
		browserName = "Chrome";
		fullVersion = nAgt.substring(verOffset+7);
	}
	// In Safari, the true version is after "Safari" or after "Version" 
	else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
		browserName = "Safari";
		fullVersion = nAgt.substring(verOffset+7);
		if ((verOffset=nAgt.indexOf("Version"))!=-1) 
			fullVersion = nAgt.substring(verOffset+8);
	}
	// In Firefox, the true version is after "Firefox" 
	else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
		browserName = "Firefox";
		fullVersion = nAgt.substring(verOffset+8);
	}
	// In most other browsers, "name/version" is at the end of userAgent 
	else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < 
			  (verOffset=nAgt.lastIndexOf('/')) ) 
	{
		browserName = nAgt.substring(nameOffset,verOffset);
		fullVersion = nAgt.substring(verOffset+1);
		if (browserName.toLowerCase()==browserName.toUpperCase()) {
			browserName = navigator.appName;
		}
	}
	// trim the fullVersion string at semicolon/space if present
	if ((ix=fullVersion.indexOf(";"))!=-1)
	   fullVersion=fullVersion.substring(0,ix);
	if ((ix=fullVersion.indexOf(" "))!=-1)
	   fullVersion=fullVersion.substring(0,ix);

	majorVersion = parseInt(''+fullVersion,10);
	if (isNaN(majorVersion)) {
		fullVersion  = ''+parseFloat(navigator.appVersion); 
		majorVersion = parseInt(navigator.appVersion,10);
	}

	return {name: browserName, version: majorVersion};	 
}

function multiple_logins_alert(email){
	_remove_custom_poplayer2(1);
	var newlid = _custom_poplayer2('','','', ' V2 blockingmodal multiple_login_alert',1, 'N','','','N');
	html='<div class="hdr_l1">'+email+' is already signed in. </div><p>Your subscription terms do not permit you to share your username or password with anyone. If you require multiple user access to ETAutolytics, please contact us to buy additional subscriptions for each user.</p><p class="tips"><strong>Tip:</strong> If you continue to receive this message and you\'re sure no one else is signed in with your username, please remember to click Sign out at the top of the page before</p><ul><li>Signing in to ETAutolytics from another computer</li><li>Signing in to ETAutolytics from another browser</li><li>Clearing browser cookies</li></ul><p>This will ensure that your session is properly closed.</p><p><a onclick="javascript: _remove_custom_poplayer2(1);" class="close-window" >Close window</a> If you are still unable to signin . Please <a href="#" onclick="javascript:mail_to_signout(\''+email+'\','+newlid+')" class="c-red">click here</a></p><a onclick="javascript: _remove_custom_poplayer2(1);" class="close">X</a>';
	
	$('#_l2_txt_cnt_'+newlid).html(html);
	//set_popup_position(newlid);
}

function mail_to_signout(email,lid){
	var url=base_url + '/autolytics/req/';
	$.ajax({url:url, type:"POST", xhrFields: { withCredentials: true }, data: {action:'force_signout_mail','email':email}, success: function(data) {
		if(data){
			//$('#_l2_txt_cnt_'+lid).hide();
			//alert(lid);
			$('#_l2_txt_cnt_'+lid).html('<h3>Thank you, we will contact you shortly.</h3><a onclick="javascript: _remove_custom_poplayer2('+lid+');" class="close"><i class="fa fa-times"></i></a>');
		}
		
	}
	});
}
function repostionSponseredContentInLatestNews(){
	if($('.tabbed-latest-stories').length > 0)
	$selectortext = 'tabbed-latest-stories';
	else if($('.latest-stories').length > 0)
	$selectortext = 'latest-stories';
	else
	$selectortext = 'latest';
	$("."+$selectortext+" li").eq($("."+$selectortext+" li").length - 2).before($("#sponsered_content_in_latestnews"));
}

function company_list_widget(news_id){
	var url=base_url + '/general/req/';
	$.ajax({url:url, type:"POST", xhrFields: { withCredentials: true }, data: {action:'get_news_company_list','news_id':news_id}, success: function(data) {
		if(data){
			company_list='';
			var res=JSON.parse(data);
			if(res){
				$.each(res, function(index, cmp){
					
					company_list+='<h3>'+cmp['details']['company_name']+'</h3><div class="card-info"><ul>';
					if(cmp['details']['founded_on']!=''){
						company_list+='<li><strong>Founded</strong>'+cmp['details']['founded_on']+'</li>';
					}
					if(cmp['total_revenue']!=''){
						company_list+='<li><strong>Revenue(FY-'+cmp['fy_year']+')</strong>'+cmp['total_revenue']+'</li>';
					}
					if(cmp['net_profit']!=''){
						company_list+='<li><strong>Net Profit(FY-'+cmp['fy_year']+')</strong>'+cmp['net_profit']+'</li>';
					}
					if(cmp['details']['description']!=''){
						company_list+='<li><strong>Description</strong><a href="'+base_url+'/company/'+cmp['details']['company_url']+'">'+cmp['details']['description']+'...</a></li>';
					}
					company_list+='<li class="more"><a href="'+base_url+'/company/'+cmp['details']['company_url']+'">View more <i class="fa fa-angle-right"></i></a></li>';
					company_list+='</ul></div>'; 
				});

				if(company_list){
					$('#accordion').html(company_list);
					$('.autoltcs_wdgt').show();
					if(typeof $.accordion != 'function')
					return;
					$( "#accordion" ).accordion({
						heightStyle: "content",
						collapsible: true
					});
				}
			}
		}
		
	}
	});
}
var getfeaturedSectionId = getLocalStorage("featuredSectionId");
var expireTime = 5/(24*60);
var storeSectionInfo = [];
function render_featured_sections(){
	var $featured_section = {};
    $featured_section['total'] = 0;
    $featured_section['complete'] = 0;
    $(".featured_section:not(.alreadytriggered)").each(function($index){
      $featured_section['total'] = $featured_section['total'] + 1;
      $(this).addClass('alreadytriggered');
      $temp = $(this);
      $type = $temp.data("ftd-type");
      $boxid = $temp.attr("id");
      var $params = $temp.data("ftd-params");
      if(!($params))
      $paramsarray = [];
      else
      {
        $paramsarray = JSON.stringify(getQueryParams($params));
      }
      if(typeof $type == 'undefined' || ($type == 'featured_header_20' && ($('#'+$boxid).width() < 1000  || (ec_detail_file != 'index.php')))) //hiding Ticker for small screen
      {
        $featured_section['complete'] = $featured_section['complete'] + 1;
        return;
      }
      $ftype = $temp.data('type');
      if($ftype == undefined)
      $ftype = 'rest';
      $featured_section_temp = {};
      $featured_section_temp['type'] = $type;
      $featured_section_temp['boxid'] = $boxid;
      if($type == 'featured_header_3' || $type == 'featured_header_10_15_all' || $type == 'featured_header_10_1' || $type == 'featured_header_10_2' || $type == 'featured_header_10_3' || $type == 'featured_header_10_4' || $type == 'featured_header_18' || $type == 'featured_header_20' || $type == 'featured_header_22' || $type == 'featured_header_22' || $type == 'featured_skinning')
      $featured_section_temp['page'] = ec_detail_file;
      if($ftype == 'sponsered_content')
      $featured_section_temp['page'] = ec_detail_file;
      if($type == 'featured_section_ad' || $type == 'featured_header_10_15_all' || $type == 'featured_header_10_1' || $type == 'featured_header_10_2' || $type == 'featured_header_10_3' || $type == 'featured_header_10_4'  || $type == 'featured_leaderboard')
      $featured_section_temp['from_url']=window.location.href;
      if($type == 'featured_header_analytics')
      $featured_section_temp['url']=window.location.href.split('?')[0];
      $featured_section_temp['params'] = $paramsarray;
      if(!$featured_section[$ftype])
      $featured_section[$ftype] = {};
      $featured_section[$ftype]['f'+$index] = $featured_section_temp;
    });
    
    $.each($featured_section ,function($ftype,$featured_section_data){
		if($ftype == 'total' || $ftype == 'complete' )
		{return;}
    
    	// Pip Check
    	$isPip = $('#isPortalPip').val();
    	if ($isPip == true) {
	        $.each($featured_section_data, function(i, v) {
	            v['isPip']              = $isPip;
	            v['pipCategoryId']      = $('#pipCategoryId').val();
	            v['pipCategoryMsid']    = $('#pipCategoryMsid').val();
	            v['pipCategoryUrl']     = $('#pipCategoryUrl').val();
	        });
    	}
	    var checkFeaturedDataStatus = function(getFeaturedInfo){
	    	$.each(getFeaturedInfo,function($i,$returnFData){
	            $featured_section['complete'] = $featured_section['complete'] + 1;
	            try{ 
	              //if($returnFData[1] && $returnFData[1]!='null')
	              //$returnFData[1] = replaceAll($returnFData[1],' src=',' class="unveil" data-src=');
	              $("#" + $returnFData[0]).html($returnFData[1]); 
	              if(!$.trim($returnFData[1])){
	                $("#" + $returnFData[0]).addClass('hide');
	                $("#" + $returnFData[0]).parent(".widget").addClass('hide');
	                $("#" + $returnFData[0]).parent(".wdgt").addClass('hide');
	              } else {
	                $("#" + $returnFData[0]).removeClass('hide');
	                $("#" + $returnFData[0]).parent(".widget").removeClass('hide');
	                $("#" + $returnFData[0]).parent(".wdgt").removeClass('hide');
	              }
	              if($("#" + $returnFData[0]).html())
	              {
	                try{
	                  contentAdded($("#" + $returnFData[0]));
	                }
	                catch(e)
	                {
	                }
	                $data = $("#" + $returnFData[0]);
	                $data.find('[data-ga]').each(function(){
	                  $this = $(this);
	                  if($data.find('[data-ga=\''+$this.attr('data-ga')+'\']').length > 0)
	                  {
	                    $data.find('[data-ga=\''+$this.attr('data-ga')+'\']').each(function(){
	                      $this2 = $(this);
	                      $this2.attr('data-disable-ga-impression',1);
	                    })
	                  }
	                });
	                $data.find('[data-ga]').eq(0).removeAttr('data-disable-ga-impression');
	                $data.find('[data-ga]').each(function(){
	                  $this = $(this);
	                  if($this.attr('data-disable-ga-impression'))
	                  return true;
	                  secnamearray=$this.attr('data-ga').split(',');
	                  if(secnamearray){
	                    EtB2b.ga.sendGA('event',{'category':secnamearray[0],'action':secnamearray[1]+'_impression','label':secnamearray[2]});
	                  }
	                });
	              }
	              if($returnFData[1].length>0 && $("#" + $returnFData[0]).data('type') == 'ads' && ($('body.page-newsdetail').length > 0))
	              {
	                $(".article-lhs").addClass('col-md-2').removeClass('col-md-3');
	                $(".article-rhs").addClass('col-md-4').removeClass('col-md-3');
	              }
	              if($returnFData[0] == 'sponsered_content_in_latestnews'){
	                repostionSponseredContentInLatestNews();
	              }
	              else if($returnFData[0] == 'featured_skinning'){
	                formatSkinningLink();
	              }
	              else if($returnFData[0] == 'featured_header_top_right'){
	                if($returnFData[1].length > 0)
	                $(".logoBx").addClass('text-align-left');
	                else
	                $(".logoBx").removeClass('text-align-left');
	              }
	              //contentAdded($("#" + $returnFData[0]));
	            } catch(e){ 
	            	if(e.length){
	            		console.log(e);
	            	}
	        	 }
	          });

	          if($featured_section['complete'] >= $featured_section['total'])
	          {
	            $(".prime-tab").on('mouseover',function(){
	              $(window).trigger('scroll');
	            })
	            $("#cssmenu #news").on('mouseover',function(){
	              $(window).trigger('scroll');
	            })
	            initUnveilImg();
	          }
	    }
    	storeSectionInfo.push(btoa(encodeURIComponent(JSON.stringify($featured_section_data))));
		var $fdata = getLocalStorage(btoa(encodeURIComponent(JSON.stringify($featured_section_data))));
		//if(getfeaturedSectionId && getfeaturedSectionId.includes(btoa(encodeURIComponent(JSON.stringify($featured_section_data))))){
		if($fdata){
			checkFeaturedDataStatus($fdata);
		}else{
		    $.ajax({
		        type:           'get',
		        cache:          true,
		        url:            base_url+'/ajax_files/etb2b_ajax_featured_section_grouped.php?fetchall=1',
		        data:           $featured_section_data,
		        success:    function(data){
		        	$returnFDataGrouped = (JSON.parse(data));
		        	setLocalStorage(btoa(encodeURIComponent(JSON.stringify($featured_section_data))),$returnFDataGrouped,expireTime);
		            checkFeaturedDataStatus($returnFDataGrouped);
		        }
	      	});	    
		}
		setLocalStorage("featuredSectionId",storeSectionInfo,expireTime);
	});
}
function formatSkinningLink(){
	if($(".skinningdiv:not(.alreadytriggered)").length >0 && deviceType == 'desktop')
	{
		$skinnigwidth = ($("body.bgImg #container").length > 0)?(($("body").width() - $("body.bgImg #container").eq(0).width())/2):0;
		$(".skinningdiv:not(.alreadytriggered)").each(function(){
			$(this).addClass('alreadytriggered');
			if($(this).hasClass("left"))
			$(this).css({'width':$skinnigwidth+'px','height':'1000px','display':'block','position':'fixed','left':'0px','z-index':999});
			else($(this).hasClass("right"))
			$(this).css({'width':$skinnigwidth+'px','height':'1000px','display':'block','position':'fixed','right':'0px','z-index':999});
		});
	}
}

function addDynamicCss(css){
    head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet){
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);   
}

/*
 * @description Subscribe to multiple newsletter
 * 
 * @param {string} fieldPostFix
 * @param {integer} lid
 *
 * @returns {bool}
 */
function subscribeToMultipleNewsletters(fieldPostFix, lid) 
{
    if (typeof fieldPostFix == 'undefined' || fieldPostFix === null) {
        fieldPostFix = '';
    }
    
    if (typeof lid == 'undefined' || lid === null) {
        lid = 1;
    }    
    
    if(show_subscription_layer_timeout)clearTimeout(show_subscription_layer_timeout);
    
    var additionalDetails   = [];
    var email               = $.trim($('#subscriber_email'+fieldPostFix).val());
    var fullName            = $('#subscriber_name'+fieldPostFix).val();
    var company             = $('#subscriber_company'+fieldPostFix).val();
    var designation         = $('#subscriber_designation'+fieldPostFix).val();
    var mobile              = $('#subscriber_mobile'+fieldPostFix).val();

    var emailField          = $('#subscriber_email'+fieldPostFix);
    var fullNameField       = $('#subscriber_name'+fieldPostFix);
    var companyField        = $('#subscriber_company'+fieldPostFix);
    var designationField    = $('#subscriber_designation'+fieldPostFix);
    var mobileField         = $('#subscriber_mobile'+fieldPostFix);
    var user_consent        = $('#consentPopup_'+fieldPostFix).is(":checked");
    
    var errorMessageField   = $('#subscription_error_message'+fieldPostFix);
    var consent_response    = $('#subcribe_consentPopup_'+fieldPostFix);

    var subscriptionSource = '';
	var c_value = getCookie(ET_PORTAL + '_subscription_source');
    
    if(c_value){
        subscriptionSource = c_value;
    }

    if (sub_source) {
        subscriptionSource = sub_source;
    }
    
    var subscription_source_form = $.trim($('#subscription_source'+fieldPostFix).val());
	if(subscription_source_form){
		subscriptionSource = subscription_source_form;
	}
    
	email.replace(/ /g,'');
	if(email == 'Your email' || email.length == 0) {
		errorMessageField.html('Please provide your email id.');
		emailField.val('');
		emailField.focus();
		return false;
	}
	
    // Validate Email Max Length
	if(email.length > 100) { 
		errorMessageField.html('Email length can not be more than 100 chars.');
		emailField.focus();
		return false;
	}

	if(email.replace(/ /g,'') == "") {
		errorMessageField.html('Please provide an Email id.');
		emailField.val('');
		emailField.focus();
		return false;
	}
	
	if(is_valid_email(email)){
		// email is valid
	} else {
		errorMessageField.html('Please provide a valid Email id.');
		emailField.focus();
		return false;
	}
   
    var newletterIds = [];
    $.each($("input[name='newsletterId"+fieldPostFix+"']:checked"), function(){            
        newletterIds.push($(this).val());
    });


    if(!fullName){
        fullName = '';
    }
    if(!company){
        company = '';
    }
    if(!designation){
        designation = '';
    }
    if(!mobile){
        mobile = '';
    }

    // Pip Check
    var newsletterId    = 0;
    var pipCategoryId   = 0;
    var pipCategory     = '';
    
    if(is_pip)
    {
        newsletterId    = pip.newsletterId;
        pipCategoryId   = pip.categoryId;
        pipCategory     = pip.category;
    }

    if (newletterIds.length == 0) {
        errorMessageField.html('Please select atleast one newsletter.');
        return false;
    }
    if(!user_consent){
      consent_response.html('Please read and agree to the Terms & Conditions and Privacy Policy');
      return false;
    }
    if(user_consent){
      consent_response.html('');
      $('#consentPopup_'+fieldPostFix).prop('checked', false);
    }

    // Disable subscribe button
    $('#saveSubscribeToMultipleNewsletters').attr('disabled', true);
    errorMessageField.html('');
    
    var url = base_url + '/general_ajax_task.php?action=save_etretail_subsription_block';
	$.ajax({url:url, type: "POST", data: {'email_id':email,'full_name':fullName, 'subscription_source':subscriptionSource, 'company':company, 'designation':designation,'mobile':mobile, 'newsletter_id':newsletterId, 'pipCategoryId':pipCategoryId, 'pipCategory':pipCategory, 'newletterIds':newletterIds }, xhrFields: { withCredentials: true }, success: function(data) { 

        customPopUpMessage      = '';
        subscriptionMessage     = '';
        textSeprator            = '<br>';
        profileCompletedCounter = 0;
        emailVerifiedCounter    = 0; 
        emailNotVerifiedCounter = 0;
        data                    = $.trim(data);
        responseData            = $.parseJSON(data);
        
        _remove_custom_poplayer2(lid, true);
        
        // Show popup box based on response
		if(responseData.status == 'EMAIL_INVALID') { // Email is invalid
			errorMessageField.html('Please provide valid Email id.');
		} else if(responseData.status == 'EMAIL_BLOCKED') { // Email is blocked
			
			var newlid = _custom_poplayer2('<span style="color:#000;">We have sent an activation mail to your mailbox for email confirmation.<span>', '', '', '', 3, '', true);
			$('#_l2_txt_cnt_'+newlid).html('<span class="subtitle">You have unsubscribed from our newsletter earlier.<br /> Please click on the link in the mailer to re-activate your subscription.</span>');

		} else { // Email is valid
            
            // For Demo Site
            if(typeof demosite!='undefined' && demosite == 1) {
                var newlid = _custom_poplayer2('Thank you for subscribing. We are launching soon. Stay tuned!', '', '', '', 3, '', true);
                $('#_l2_txt_cnt_'+newlid).html('');
                return;
            }
            
            _profile_email = responseData.email;
            
            customPopUpMessage  = '<span style="color:#000;">Thank you for subscribing.</span> '+textSeprator;
            var newlid = _custom_poplayer2(customPopUpMessage, '', '', '', 3, '', true);
            
            // Iterate multiple newsletter and prepare message
            $.each(responseData.newsletterDetails, function( newsletterKey, newsletterValue ) {
                
                // If user is existing
                if(isNaN(newsletterValue.responseId) && newsletterValue.responseId == 'E') {

                        // Email check
                        if(newsletterValue.isEmailVerified == 'Y') { // email verified
                            
                            if (emailVerifiedCounter == 0) {
                                subscriptionMessage += '<span class="subtitle"> In case you do not receive our newsletters, please reach us on <a target="_blank" href="mailto:' + CONTACTUS_EMAILS[ET_PORTAL] + '" >' + CONTACTUS_EMAILS[ET_PORTAL] + '</a>. Do not forget to check your SPAM folder.</span>'+textSeprator;
                                emailVerifiedCounter++;
                            }
                            
                        } else if (newsletterValue.isEmailVerified == 'N') { // email not verified
                        
                            if (emailNotVerifiedCounter == 0) {
                                subscriptionMessage += '<span class="subtitle">We have sent you an email with verification link. Please click on it to verify your email.</span>'+textSeprator;
                                emailNotVerifiedCounter++;
                            }

                        } // end if email check

                    if (newsletterValue.isProfileCompleted == 'N' && profileCompletedCounter == 0) { //  profile not completed

                        subscriptionMessage += '<span class="subtitle">We would like to know you a little more to serve you better:</span><div id="detail-submit-form"><form action="" method="post" onsubmit="javascript:return false;"><div class="section"><label for="layer_full_name">Full Name <span>*</span></label><input id="layer_full_name" name="layer_full_name" type="text" class="txt_box" value="" onblur="removeError(event);"/><span class="error-txt" id="layer_full_name_err" style="display: none;"></span></div><div class="section"><label for="current_company">Company <span>*</span></label><input value=""  id="current_company" name="current_company" type="text" class="txt_box popup-autocomplete" onblur="removeError(event);"/><span class="error-txt" id="current_company_err" style="display: none;"></span><input type="hidden" name="master_company_id" class="autocomplete-master-id"></div><div class="section"><label for="user_designation">Designation <span>*</span></label><input value=""  id="user_designation" name="user_designation" type="text" class="txt_box" onblur="removeError(event);"/><span class="error-txt" id="user_designation_err" style="display: none;"></span></div><div class="section"><label for="mobile_no">Mobile Number <span>*</span></label><input value=""  id="mobile_no" name="mobile_no" type="text" class="txt_box" onblur="removeError(event);"/><span class="error-txt" id="mobile_no_err" style="display: none;"></span></div><!--<div class="section"><label for="user_work_exp">Location <span>*</span></label><input value="" id="user_work_exp" name="user_work_exp" type="text" class="txt_box" value="" onblur="removeError(event);"/><span class="error-txt" id="user_work_exp_err" style="display: none;"></span></div><br class="clear">--><div class="section"><label for="mobile_no">Mobile Number <span>*</span></label><input value="" id="mobile_no" name="mobile_no" type="text" class="txt_box" value="" onblur="removeError(event);"/><span class="error-txt" id="mobile_no_err" style="display: none;"></span></div><div style="max-width:85px;margin:0 auto 15px;"><input id="updateUserSubscriptionDetails_btn" onclick="javascript:updateUserSubscriptionDetails(\''+newlid+'\');" type="submit" value="Submit" class="submit-button2" /><a onclick="javascript: _remove_custom_poplayer2('+newlid+');" href="javascript:void(0);" class="skip" style="display:inline-block; line-height:32px; margin-left:10px; font-size:12px;">Skip this</a></div><i class="privacy-icon"></i><p>Your detail will be safe with us. You will only receive the emails that you permitted upon subscription.You can unsubscribe at anytime.</p></form></div>';
                        profileCompletedCounter++;
                    }

                } else { // If user is freshly inserted or updated

                    // Email check
                    if(newsletterValue.isEmailVerified == 'Y') { // email verified

                        if (emailVerifiedCounter == 0) {
                            subscriptionMessage += '<span class="subtitle">In case you do not receive our newsletters, please reach us on <a target="_blank" href="mailto:' + CONTACTUS_EMAILS[ET_PORTAL] + '" >' + CONTACTUS_EMAILS[ET_PORTAL] + '</a>. Do not forget to check your SPAM folder.</span>';
                            emailVerifiedCounter++;
                        }

                    } else if (newsletterValue.isEmailVerified == 'N') { // email not verified

                        if (emailNotVerifiedCounter == 0) {
                            subscriptionMessage += '<span class="subtitle">We have sent you an email with verification link. Please click on it to verify your email.</span>'+textSeprator;
                            emailNotVerifiedCounter++;
                        }

                    } // end if email check
                }
     
            }); // end foreach
           
            $('#_l2_txt_cnt_'+newlid).html(subscriptionMessage);
            set_popup_position(newlid);

            var source = 'direct';
            if ( typeof $_GET['utm_source'] === 'undefined' || $_GET['utm_source'] === null ){
                source = 'direct_'+ec_detail_file; 
            } else {
                source = $_GET['utm_source']+'_'+ec_detail_file; 
            }

            ga('send', 'event', 'Newsletter_Signup', 'Position_top',source );
        }

		$('#save_techgig_updates_subsription_btn, #subscriber_btn_top').attr('disabled', false);
        emailField.val('');
        $('#saveSubscribeToMultipleNewsletters').attr('disabled', false);
        errorMessageField.html('<span style="color:#4F8A10;">Thank you for subscribing.</span>');
        $(errorMessageField).delay(3200).fadeOut(300);

        if(lid){
            if(forward_blk){
                window.location = $.trim($_GET['source']);
            }
        }
    }
	});
    
    return false;
}
//etb2b_jquery.SimpleCropper_min.js
executeOnReady(function(){
	$(document).on('click', '._lgn_pop .close, .popup5 .close, .popup1 .close', function(){         
      localStorage.setItem('yoloFlag',0);
      $(this).parent().parent().remove();
    });
    var container = document.querySelector('html');
  MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  var observer = new MutationObserver(function(mutations, observer){ 
      if($('.popup1').css('display') == 'block'){
          $('#my_web_push_app_box_confirm').hide(); 
      }  
      if($('.popup5').css('display') == 'block'){
          $('#my_web_push_app_box_confirm, .pop3').hide();         
      }
      if($('.pop3').css('display') == 'block'){
        $('#my_web_push_app_box_confirm').hide(); 
      }  
      if($('._lgn_pop, .popup5, .popup1').length == 0){
        $('.pop3').show(); 
      }
  });

  observer.observe(container, {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
  });  
  	localStorage.setItem('yoloFlag',0);
	if($('.social_social_bx').length){
		loadScript('https://platform.linkedin.com/in.js');
		loadScript('https://platform.twitter.com/widgets.js');
	}
});

window.onload = function() {
    setTimeout(function(){
      //render_featured_sections();
      (function() { 
        var gads = document.createElement('script'); 
        gads.async = true; 
        gads.defer = true; 
        gads.type = 'text/javascript'; 
        var useSSL = 'https:' == document.location.protocol; 
        gads.src = (useSSL ? 'https:' : 'http:') +  '//www.googletagservices.com/tag/js/gpt.js'; 
        var node = document.getElementsByTagName('script')[0]; 
        node.parentNode.insertBefore(gads, node); 
      })();  
    },100);
};


EtB2b.infiniteScroll = (function(){  
  var loadNextPage = function(){
    if((typeof window['loadingNextPage']=='undefined' || window['loadingNextPage'] == 0) &&  !($("link[rel=next]").length < 1 || $("link[rel=next]").attr('href').length < 1))
    {
      window['loadingNextPage'] = 1;      
      $.ajax({
         url: $("link[rel=next]").attr('href'),
         type: "GET",
         beforeSend: function(xhr){xhr.setRequestHeader('X-Requested-With', 'false');},
         success: function(data) { window['loadingNextPage'] = 0;
            data = data.replace('<!DOCTYPE html>','');
            data = data.replace("\n",'');
            data = $.parseHTML('<xxx>'+data+'</xxx>');
            $listingselector = "#content .news-listing-infinite";
            $newdata = $(data).find($listingselector).html();
            if($newdata && $newdata.length > 0)
            {
              $($listingselector).append($newdata);
              //$('window').trigger('scroll');
              $("link[rel=next]").attr('href',$(data).find("link[rel=next]").attr('href'));
              $("link[rel=prev]").attr('href',$("link[rel=prev]").attr('href'));
              contentAdded($($listingselector));
            }
            else
            {
              $(".load-more-btn").remove();
            }
          }
      });
    }
  };
  var loadPage = function($url,$appendSelector,$appendToSelector,$callback){
      if($url.startsWith('/'))
      $url = root_url+$url;
      if(!EtB2b.utils.isUrl($url))
      {
        return;
      }
      if(!$url.startsWith(root_url))
      {
        window.location.assign($url);
        return;
      }
      loadScript(JS_PATH+'/../v2/js/nprogress.js',function(){
        loadCss(THEME_PATH+'/v2/css/nprogress.css');
        NProgress.start();
      });
      if(typeof $appendToSelector == 'undefined')
      {
        $appendToSelector = '#content';
      }
      if(typeof $appendSelector == 'undefined')
      {
        $appendSelector = '#content';
      }
      $.ajax({
         url: $url,
         type: "GET",
         beforeSend: function(xhr){xhr.setRequestHeader('X-Requested-With', 'false');},
         success: function(data) {
            data = data.replace('<!DOCTYPE html>','');
            data = data.replace("\n",'');
            data = data.replace(/(<\/?)body( .+?)?>/gi,'$1bodyv2$2>',data);
            data = $.parseHTML('<xxx>'+data+'</xxx>',document,true);
            $listingselector = "#content";
            window.data = data = $(data);
            $newdata = data.find($appendSelector).html();
            if($newdata && $newdata.length > 0)
            {
              data.find('link[rel="stylesheet"][type="text/css"]').each(function(){
                $this = $(this);
                if($(document).find('link[rel="stylesheet"][type="text/css"][href="'+$this.attr('href')+'"]').length == 0)
                loadCss($this.attr('href'));
              })
              data.find('script[src]:not(:eq(0))').each(function(){
                loadScript($(this).attr('src'));
              });
              data.find('script.externalScript').each(function(){
                eval($(this).html());
              });
              $($appendToSelector).html($newdata);
              if($appendSelector == '#content')
              {
                EtB2b.comJs.scrollTo('body'); 
                try{
                  $('body').attr('class',$('body').attr('class').replace('page-','lastpg-'));
                  $.each(data.find('bodyv2').attr('class').split(' '),function(i,v){
                    $('body').addClass(v);
                  })
                }
                catch(err){
                  console.log(err);
                }
                $("link[rel=b2b_canonical]").attr('href',data.find("link[rel=b2b_canonical]").attr('href'));
                if(data.find("link[rel=next]").length > 0)
                {
                  if($("link[rel=next]").length == 0)
                  $("head").append('<link rel=next />');
                  $("link[rel=next]").attr('href',data.find("link[rel=next]").attr('href'));
                }
                else
                $("link[rel=next]").remove(); 
                changebrowserurl($("link[rel=b2b_canonical]").attr('href'),data.find('title').text(),1);
              }            
              contentAdded($($appendToSelector));
              if(typeof $callback == 'function')
              $callback(data);
              if(typeof NProgress != 'undefined')
              NProgress.done();
            }
            else{
              window.hoverFlag = 1;
              $('#nprogress').hide();
              $('.model-box, .model-bg').remove();
            }
          }
      });
  };
  var addScrollFunction  = function($obj){
	  if(typeof $obj == 'undefined')
	  return;
	  loadScript(JS_PATH+'/../v2/js/isInViewport.js',function($obj){
	    $(window).on('scroll',$obj,function() {
	      try{
	        if($obj.find("#content .load-more-btn").length == 1)
	        {
	          $('.load-more-btn:in-viewport').each(function(){
	            EtB2b.infiniteScroll.loadNextPage();
	          });
	        }

	      }
	      catch(e){}
	    });
	    if($obj.get(0).tagName != 'BODY')
	    {
	      $obj.on('scroll',function(){
	        $(window).trigger('scroll');  
	      });
	    }
	    $(window).trigger('scroll');
	  },true,$obj);
	};
	var contentAdded  = function($obj){
	    if(typeof initUnveilImg == 'function')
        initUnveilImg();
	};
  return{
    loadNextPage     : loadNextPage,
    loadPage     : loadPage,
    addScrollFunction	:addScrollFunction
  }
})();
executeOnReady(function(){
	EtB2b.infiniteScroll.addScrollFunction($("body"));
		$('#brandsolution').on('mouseover',function(){
	    setTimeout(function(){
	      $(window).trigger("scroll");
	    },200);
  	});
	var txtLen = $('.author-box2 .author_info em').text().length;
	if(deviceType != 'mobile'){
		if(txtLen < 170){
			$('.author-box2 .author_info em').addClass('full-detail');
		}
	}
	$('.author-box2 .author_info em').click(function (e) {
        if (e.offsetX > e.target.offsetLeft) {
            $(this).addClass('full-detail');
        }
         else{
           //console.log("true");
       }
	});
	
 	$("#search_form").on('submit',function(e){
        if($("#search_form [name=q]").val().trim().length == 0)
        {
          e.preventDefault();return;
        }
        $("#search_form").attr('action',$("#search_form").attr('action')+'/'+($("#search_form [name=q]").val().trim()));
        $("#search_form [name=q]").remove();
    });
    $('.fa-search').on('click', function(){
      $("#search_form").submit();
    });
    var mlen = $('.nav-level1 > li').length; 
    if(mlen <= 5){
      $('.nav-level1 > li .brand-solutions').addClass('show-rhs');
    }
	unvielImg();
});


executeOnReady(function(){
  $(".flexi-audio audio").on("play",function(e){
    if($("link[rel=b2b_canonical]").attr('href') != $(this).data("href"))
    EtB2b.ga.sendGA("pageview",{"location":$(this).data("href").replace(document.location.protocol+"//"+document.location.hostname,"")});
    EtB2b.ga.sendGA("event",{"category":"podcast","action":"play","label":$(this).data("href").replace(document.location.protocol+"//"+document.location.hostname,"")})
  });
  window._ibeat_track= {
    sCookie: (!b2bGdpr.isgdprnation || b2bGdpr.userPreference['config.ibeat'] == 1)?true:false
  }
  loadScript('https://agi-static.indiatimes.com/cms-common/ibeat.min.js');
  
});

renderToolTips = function() {
    if ($('.tooltip-v2').length) {
        $('.tooltip-v2').addClass('mintip');
        loadScript(resourceURLMap.js["tooltip"], function() {
            $.minTips();
        });
        loadCss(THEME_PATH + '/jquery-tooltip-custom.css?mod=' + file_version);
    }
}
inPagePromoCallback = function($obj){
    if(typeof $obj == 'string')
        $obj = $($obj);
    renderToolTips();
    inPageCheckAuthorCarouselControl($obj);    
    $obj.find('.authorsection .slides').on('scroll',function(){
        initUnveilImg();
        $('#mintip').remove();//to close tooltip
    })
}

// To execute GTM
loadScript(JS_PATH+'/../js/app.analytics.gtm.js?mod=' + file_version);