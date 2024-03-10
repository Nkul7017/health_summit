EtB2b = EtB2b || {};
var portalName = (typeof SITE_NAMES[ET_PORTAL] !== 'undefined') ? SITE_NAMES[ET_PORTAL] : 'ET';
var ET_PORTAL = (typeof ET_PORTAL !== 'undefined') ? ET_PORTAL : '';
var base_url = (typeof base_url !== 'undefined') ? base_url : '';
var client_id = (typeof OAUTH_CLIENT_ID !== 'undefined') ? OAUTH_CLIENT_ID : '';
var deviceType = ($(window).width() >= 780) ? 'desktop' : 'mobile';
var oauthObjConfig = oauthObjConfig || {};
var oauthUserData = '';
var valError;
var showLoginDuration = 30;
var layerVisiblePortal = { auto: showLoginDuration, bfsi: showLoginDuration, brandequity: showLoginDuration, cfo: showLoginDuration, cio: showLoginDuration, ciso: showLoginDuration, energy: showLoginDuration, government: showLoginDuration, health: showLoginDuration, hospitality: showLoginDuration, hr: showLoginDuration, infra: showLoginDuration, legal: showLoginDuration, realty: showLoginDuration, retail: showLoginDuration, telecom: showLoginDuration, travel: showLoginDuration }
var expireTime = 1; //5 / (24 * 60);
var cbsOnPortal = ['health', 'telecom', 'realty', 'travel', 'hospitality'];
var loginVersion = false;
var abTestVersion = '';
var headerLoginGoogleEvent = '';
var userSubsStatus = false;
const yoloOptinShow = ['page-homepage', 'page-agencyNewsListing', 'page-authorlisting', 'page-newsletter', 'page-tagListing', 'page-sectionListing', 'page-exclusiveNews', 'page-latestNews', 'page-newsDetail','page-leaderSpeakListing', 'page-awards', 'page-eventListing', 'page-webinarListing'];
var login_source_info = '';

// newsletter subscription js related
var nl_id = NL_SUBSCRIPTION;
var showSubscribeBox = true;
var checkUserSubscribed = false;
// Ends

var environmentMap = {
	0: 'dev',
	2: 'stage',
	3: 'qa'
};

var portal_env = function () {
	if (typeof environment !== 'undefined' && typeof environmentMap[environment] != "undefined" && environmentMap[environment]) {
		return '_' + environmentMap[environment];
	}
	return '';
}();

var productApiUrl = 'https://api-dev.economictimes.indiatimes.com';
var apiUrl = function () {
	var url = ETB2B_OAUTH_URL ? ETB2B_OAUTH_URL : 'https://id.economictimes.indiatimes.com';

	// if (typeof environment !== 'undefined' && environmentMap[environment] == 1) {
	// 	url = 'https://id.economictimes.indiatimes.com';

	// } else if (typeof environment !== 'undefined' && typeof environmentMap[environment] !== 'undefined') {
	// 	url = 'https://id-' + environmentMap[environment] + '.economictimes.indiatimes.com';
	// }

	return url;
}();

var b2bPortalUrl = function () {
	var url = 'https://b2b.economictimes.indiatimes.com';

	if (typeof environment !== 'undefined' && typeof environmentMap[environment] !== 'undefined' && environmentMap[environment] != 1) {
		url = 'https://b2b-' + environmentMap[environment] + '.economictimes.indiatimes.com';
	}

	return url;
}();


var isChromeBrowser = function () {
	var ua = navigator.userAgent.toLowerCase();

	return (ua.indexOf('chrome') > -1);
}();

var isWebinarDetailPage = $('#wc_id').length;
localStorage.removeItem('yoloFlag');

var b2bhostname=window.location.hostname;
var cookies_allow_domains ={'default':'.indiatimes.com'};
var cookies_allow_domain =cookies_allow_domains.default;


EtB2b.globalVar = EtB2b.globalVar || {
	oauthObjConfig: {
		skip_onetap: false,
		popup_closable: true,
		registration_variant: 1,
		product: 'main',
		skip_profile_complete: false,
		main_oauth_title: 'Welcome to Economic Times B2B',
		main_sub_title: 'Sign in or create free account',
		login_title: 'Sign in to your account',
		signin_title: 'Log in to your account',
		login_sub_title: '',
		registration_title: 'Create your free account',
		registration_sub_title: 'to unlock all the features of ETB2B',
		prifile_completion_title: '',
		prifile_completion_sub_title: '',
		flash_message: true,
		hide_social_logins: false,
		mandatory_official_email: false,
		official_email_validation: {}
		// official_email_validation: {
		// 	blocked_domains: {
		// 		'formID1' : ['yopmail.com','testmail.co.in'], // formID1 is the id of form
		// 		'formID2' : ['yopmail.com', 'testmail.co.in'],
		// 		'default' : ['yopmail.com', 'testmail.co.in'] // pass default if not specific to any form, applicable to webinar
		// 	},
		// 	allowed_domains: {
		// 		'formID1' : ['yopmail.com','testmail.co.in'],
		// 		'formID2' : ['yopmail.com', 'testmail.co.in'],
		// 		'default' : ['yopmail.com', 'testmail.co.in']
		// 	}
		//  }

	},
	inputFieldConfig: {
		fid: 'inputId',
		fclass: '',
		flabel: '',
		fname: '',
		ftype: 'text',
		fvalue: '',
		fieldLegend: '',
		appendSelector: '',
		prependSelector: '',
		insertAfter: '',
		insertBefore: '',
		maxlength: '',
		isRequired: 1,
		textareaColumns: 6,
		optionsList: '',
		addAttributes: '',
		/*need array format
		[
			{'name': 'name1', 'value': 'value1'},
			{'name': 'name2', 'value': 'value2'}
		];*/
		textButtonClass: '',
		textButtonName: '',
		parentClass: '',
		dropDown: ''
	},
	defaultInputConfig: {
		fid: 'inputId',
		fclass: '',
		flabel: '',
		fname: '',
		ftype: 'text',
		fvalue: '',
		fieldLegend: '',
		appendSelector: '',
		prependSelector: '',
		insertAfter: '',
		insertBefore: '',
		maxlength: '',
		isRequired: 1,
		textareaColumns: 6,
		optionsList: '',
		addAttributes: '',
		/*need array format
		[
			{'name': 'name1', 'value': 'value1'},
			{'name': 'name2', 'value': 'value2'}
		];*/
		textButtonClass: '',
		textButtonName: '',
		parentClass: '',
		dropDown: ''
	},
	designation: [],
	company: [],
	location: [],
	currentFocus: 0,
	countryMappingCodes: {},
	filledEmailField: '',
	errorValueInFlow: '',
	newsletterBoxEventsTracker: false,
	pEmail: '',
	yoloclientid: '304983860261-ji4osqdlk4bjp6369rb8mpt0fghlulkl.apps.googleusercontent.com',
	locationApi: 'https://st.etb2bimg.com/locinfo',
	set_pop_cookie: 'N',
	is_loggedin: 0,
	showPasswordChange: true,
	errorFieldMap: {
		'first_name': '#b2boauth_first_name_err',
		'last_name': '#b2boauth_last_name_err',
		'company': '#b2boauth_company_name_err',
		'designation': '#b2boauth_designation_name_err',
		'mobile': '#b2boauth_mobile_num_err',
		'city': '#b2boauth_location_err',
	},
	// isNewsLetterSubscriptionApplicable: typeof portal_product == "undefined" || (typeof portal_product != "undefined" && portal_product != "product_microsite")
	isNewsLetterSubscriptionApplicable: window.portal_product == "portal_masterclass" ? false : true,
	disableGooglePhotoLogin: false
};

EtB2b.globalVar.officialEmailLabel = EtB2b.globalVar.oauthObjConfig.mandatory_official_email ? "Official Email ID" : "Official Email ID (optional)";

// offline stores for autosuggest api
var pageLocationStore = [];
var pageCompanyStore = [];
var pageDesignationStore = [];

var valError;

EtB2b.messageLog = {
	1: 'Please provide your email ID.',
	2: 'Please provide a valid email ID.',
	3: 'Please provide your full name',
	4: 'Please provide your company name',
	5: 'Please provide your designation.',
	6: 'We would like to know more about you:',
	7: 'Why do you need to sign in?',
	8: 'This will help us serve you better and provide a personalized experience.',
	9: 'Sign up with email',
	10: 'By signing up you indicate that you have read and agree to the',
	11: 'By logging in you indicate that you have read and agree to the',
	12: 'Terms &amp; Conditions',
	13: 'Login with social accounts',
	14: 'By clicking Continue you indicate that you have read and agree to the',
	15: 'Terms &amp; Conditions',
	16: 'Continue with Facebook',
	17: 'Before we take you to original news, we would like to know you a little more:',
	18: 'You should now start getting our daily newsletters and we hope you will like them. If you have any feedbacks, please reach us on',
	19: 'Please confirm the reactivation of your subscription to our Newsletter',
	20: 'You have successfully reactivated your subscription!',
	21: 'You have already unsubscribed!',
	22: 'Do you really want to miss out on our newsletters?',
	23: 'Thanks for verifying your registration for ',
	24: 'Free trial for this email has been expired, please upgrade to premium account to access ETAutolytics',
	25: 'Continue with Linkedin',
	26: 'Please enter your password',
	27: 'Password length must be 5-32',
	28: 'Password length must be 5-32',
	29: 'Please provide your first name',
	30: 'Name must not contain any special symbols/numbers',
	31: 'Please enter your email ID',
	32: 'Entered passwords do not match',
	33: 'Please provide your mobile number.',
	34: 'Please enter valid mobile number',
	35: 'Continue with Google',
	36: 'Please provide a value',
	37: 'Entered passwords do not match',
	38: 'Please enter a new password',
	39: 'Password has been changed successfully.',
	40: 'Please provide the verification code',
	41: 'You have successfully registered with us. Please login with the registered email ID and password.',
	42: 'Entered verification code is not valid',
	43: 'Designation length must be 2-255',
	44: 'Company must not contain any special symbol/number',
	45: 'Please provide your last name',
	46: 'Please provide your city name',
	47: 'City name must not contain any special symbols/numbers',
	48: 'Please enter a new password',
	49: 'Please read and agree to the terms & conditions and Privacy Policy',
	50: 'Password has been generated successfully.',
	51: 'Profile has been updated successfully.',
	52: 'Please select city name from auto suggestions',
	53: 'By continuing, you agree to the <a target="_blank" class="link" href="/terms_conditions.php">T&amp;C</a> and <a target="_blank" class="link" href="/privacy_policy.php">Privacy Policy</a>.',
	54: 'Please select at least one newsletter',
	55: 'You have successfully subscribed to the selected newsletter(s).',
	56: 'Something went wrong!',
	57: 'Company length must be 2-255',
	58: 'Password has been created successfully.',
	59: 'Please select at least one newsletter from the list',
	60: 'This email is not registered with us, Please edit the email to proceed further',
	61: 'Please upload a valid image',
	62: 'Please provide a valid official email ID',
	63: 'This same account can be used across all ET B2B portals.',
	64: 'Please type your message',
	65: 'Please provide valid company name.',
	66: 'Please provide valid designation.',
};

$('.post-text').removeClass('hide');

/* 
	@Config
		email_selector: Jquery selector in string for getting email value e.g. '.email' 
		email_value: string email value can also be passed, instead of selector and it has the priority 
		event: Specific Event name
		nlid : Newsletter id, if newsletter event
		skip_eid: false,
		no_oauth_form_elements_value: false,
		no_oauth_form_elements : {
			city : sel,
			company : sel,
			designation : sel,
			first_name : sel,
			industry : sel,
			last_name : sel,
			mobile : sel,
			official_email : sel,
			profile_photo : sel,
		}

		e.g. sel = '.email'
*/
var gtmUpdateUserProfile = function (config) {
	try {
		let userPropsObj = {
			event: 'user_profile_update',
			city: "",
			company: "",
			country_code: "IN",
			designation: "",
			eid: "",
			email: "",
			first_name: "",
			industry: "",
			last_name: "",
			mobile: "",
			official_email: "",
			password_generated: false,
			profile_photo: "",
			registration_product: "",
			registration_source: "",
			status_email_verified: 0,
			status_profile_completed: 0
		};

		config = config || {};
		config.event = config.event || {};
		config.skip_eid = config.skip_eid || false;
		config.no_oauth_form_elements_value = config.no_oauth_form_elements_value || false;

		let email = '';
		let getVal = function (sel) {
			if (config.no_oauth_form_elements_value) {
				return sel ? $.trim(sel) : '';
			}

			return sel && $(sel).length ? $.trim($(sel).val()) : '';
		};


		let obj = {
			handleGTMEvent: function (customData) {
				userPropsObj.event = 'user_profile_create';
				for (i in userPropsObj) {
					if (userPropsObj[i] == "") {
						delete userPropsObj[i];
					}
				}
				EtB2b.utils.devConsole(userPropsObj.event, userPropsObj);
				dataLayer.push(userPropsObj);
			},

			handleNonOauthFields: function () {
				if (config.no_oauth_form_elements && Object.keys(config.no_oauth_form_elements).length) {
					let keys = Object.keys(config.no_oauth_form_elements);
					for (i in config.no_oauth_form_elements) {
						let currentValue = getVal(config.no_oauth_form_elements[i]);

						if (!currentValue) {
							userPropsObj[i] = getVal(config.no_oauth_form_elements[i]);
						}

					}
				}
			},

			updateUserDataWithoutOauth: function (eid) {
				userPropsObj.event = 'user_profile_update',
					userPropsObj.eid = eid || '',
					userPropsObj.email = email || '',
					userPropsObj.status_email_verified = eid ? 1 : 0

				this.handleNonOauthFields();

			},

			setOauthDataInDataLayerObj: function () {
				for (i in window.oauthUserData) {
					if (userPropsObj.hasOwnProperty(i) && window.oauthUserData[i]) {
						userPropsObj[i] = window.oauthUserData[i];
					}
				}

				this.handleNonOauthFields();
			},

			updateEid: function (email) {
				var getNewsLetterNameAndType = function (id, param) {
					let result = ''

					if (id) {
						if (newsletterResponse && newsletterResponse.data && newsletterResponse.data.subscription_list) {
							let list = newsletterResponse.data.subscription_list;

							for (i in list) {
								if (list[i].id == id) {
									if (param == 'name') {
										result = list[i].name;

									} else if (param == 'display_name') {
										result = list[i].display_name;
									}

									break;
								}
							}
						}
					}

					return result;
				};

				var paramObject = {
					url: apiUrl + '/api/v1/user/checkAccountExist',
					data: {
						email: email
					}
				}

				function ajaxSuccessCall(response) {
					var eid = Object.keys(response.data).length ? response.data.eid : '';

					if (["newsletter_subscribed", "newsletter_unsubscribe"].includes(config.event)) {
						let gtm_data = {
							event: config.event,
							newsletter_name: getNewsLetterNameAndType(config.nlid, 'name'),
							newsletter_type: getNewsLetterNameAndType(config.nlid, 'display_name'),
							eid: eid,
							email: email
						};

						EtB2b.utils.devConsole(config.event, gtm_data);
						dataLayer.push(gtm_data);

					} else {
						obj.updateUserDataWithoutOauth(eid);
						obj.handleGTMEvent();
					}
				}

				function ajaxErrorCall(response) {
					// console.log(response);
					return '';
				}

				EtB2b.commJs.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
				// ajaxSuccessCall({data: {eid:10}})
			},

			handerOauthForm: function () {
				this.setOauthDataInDataLayerObj();
				this.handleGTMEvent();
			},

			handleNonOauthForm: function () {
				if ((config.email_selector && $(config.email_selector).length) || config.email_value) {
					email = config.email_value || $.trim($(config.email_selector).val());

					if (config.skip_eid) {
						obj.updateUserDataWithoutOauth('');
						obj.handleGTMEvent();

					} else {
						this.updateEid(email);
					}
				}
			},

			init: function () {
				if (["newsletter_subscribed", "newsletter_unsubscribe"].includes(config.event)) {
					this.handleNonOauthForm();

				} else {
					setTimeout(function () {
						window.oauthUserData ? obj.handerOauthForm() : obj.handleNonOauthForm();
					}, 1000);
				}
			}
		};

		obj.init();
	} catch (error) {
		EtB2b.utils.devConsole('GTM profile update error', error);
	}

};

function setGtmTriggerPosition(param) {
	let gtmGlobals = {
		trigger_position: param
	};

	sessionStorage.setItem('gtmGlobals', JSON.stringify(gtmGlobals));
}

function clearNewsLetterStates() {
	localStorage.removeItem('newsletterResponse');
	EtB2b.commJs.deleteCookie('b2b_newslettersubs' + portal_env, cookies_allow_domain);
}

function userSessionCallBack(data) {
	checkUserSubscribed = true;
	userEmail = JSON.parse(localStorage.getItem('pEmail'));
	if (userEmail) {
		userEmail = userEmail.data;
		$('.saved_email').html(userEmail).addClass('valid');
		$('#subscribe_email_top, #subscribe_email_bottom, #subscriber_email_bottom, #subscribe_email_pop').val(userEmail).addClass('valid');
		EtB2b.globalVar.is_loggedin ? $('.edit_email').hide() : $('.edit_email').show();
	}
	window.newsletterResponse = EtB2b.commJs.getLocalStorage('newsletterResponse');
	// window.newsletterResponse = EtB2b.commJs.getLocalStorage('bookmarkedIds');


	if (newsletterResponse && !newsletterResponse.userEmail) {
		clearNewsLetterStates();
	}

	if (EtB2b.globalVar.isNewsLetterSubscriptionApplicable) {
		EtB2b.subscription.showSubscriptionContainer();
	}
}

function removeRequiredFields(e) {
	var id, value;
	if (e.type != 'blur') {
		id = $(e).attr('id');
		value = $('#' + id).val();
	} else {
		id = $(e.target).attr('id');
		value = $('#' + id).val();
	}


	if (value) {
		value = EtB2b.utils.encodeHTML(value);
		$('#' + id + '_err').html('').hide();
		$('#' + id + '_err').siblings('input').removeClass('error');
		validateFields(id, value);
	} else {
		validateFields(id, value);
	}
}

function validateFields(id, value) {
	var error_val = true;
	valError = false;
	EtB2b.globalVar.errorValueInFlow = '';
	var valParam = {
		'b2boauth_first_name': EtB2b.commJs.validateName,
		'b2boauth_last_name': EtB2b.commJs.validateName,
		'b2boauth_reg_pwd': EtB2b.commJs.validatePassword,
		'b2boauth_verify_registration_password': EtB2b.commJs.validatePassword,
		'b2boauth_registration_email': EtB2b.commJs.validateEmail,
		'b2boauth_log_email': EtB2b.commJs.validateEmail,
		'b2boauth_check_email': EtB2b.commJs.validateEmail,
		'b2boauth_company_name': EtB2b.commJs.validateFieldName,
		'b2boauth_designation_name': EtB2b.commJs.validateFieldName,
		'b2boauth_registration_password': EtB2b.commJs.validatePassword,
		'b2boauth_log_pswd': EtB2b.commJs.validatePassword,
		'b2boauth_curr_password': EtB2b.commJs.validatePassword,
		'b2boauth_new_password1': EtB2b.commJs.validatePassword,
		'b2boauth_new_password2': EtB2b.commJs.validatePassword,
		'b2boauth_registration_code': EtB2b.commJs.validateOTPCode,
		'b2boauth_frgt_pswd_code': EtB2b.commJs.validateOTPCode,
		'b2boauth_frgt_pswd_password': EtB2b.commJs.validatePassword,
		'b2boauth_frgt_pswd_email': EtB2b.commJs.validateEmail,
		'b2boauth_location': EtB2b.commJs.validateFieldLocationName,
		'b2boauth_mobile_num': EtB2b.commJs.validateMobile,
		'b2boauth_user_message': EtB2b.commJs.validateUserMessage,
	};


	var official_email_value = $('#b2boauth_official_email').val();

	if (official_email_value || EtB2b.globalVar.oauthObjConfig.mandatory_official_email) {
		official_email_value = EtB2b.utils.encodeHTML($('#b2boauth_official_email').val());
		valParam.b2boauth_official_email = EtB2b.commJs.validateOfficialEmail;
	}

	for (var key in valParam) {
		var valFunction = valParam[key];
		if (id == key) {
			error_val = valParam[key](value, key);
			if (error_val) {
				$('#' + key + '_err').html(error_val);
				$('#' + key + '_err').show();
				$('#' + key).addClass('error');
				valError = true;
				EtB2b.globalVar.errorValueInFlow = error_val;

				if ($('.autocomplete-items').length)
					$('.autocomplete-items').remove();

				return false;
			}
		}
	}
}

function showBackendErrorAgainstField(response) {
	var response = response.responseJSON;

	if (response.code != 200) {
		if (typeof response.errors != "undefined" && Object.keys(response.errors).length) {
			var errorKeys = Object.keys(EtB2b.globalVar.errorFieldMap);
			$('.error').html('').hide();
			for (i in response.errors) {
				if (errorKeys.includes(i)) {
					var $sel = $(EtB2b.globalVar.errorFieldMap[i]);

					if ($sel.length) {
						$sel.html(response.errors[i]).show();
					} else {
						$('#b2boauth_profilemain_err').html(response.errors[i]).show();
					}

					break;
				}
			}

			if ($('.autocomplete-items').length)
				$('.autocomplete-items').remove();
		}
	}

	// EtB2b.model.close_pop(1);
}

function getFullLocationString() {
	var loc = "";

	if (typeof userlocationinfo != "undefined" && typeof userlocationinfo.city != "undefined" && typeof userlocationinfo.country_code != "undefined" && typeof userlocationinfo.region_code != "undefined") {
		loc = userlocationinfo.city + ', ' + userlocationinfo.region_code + ', ' + userlocationinfo.country_code;
	}

	return loc;
}

function getCurrentPortalsNewsletterID() {
	return typeof NL_SUBSCRIPTION != "undefined" && NL_SUBSCRIPTION && NL_SUBSCRIPTION[0] && NL_SUBSCRIPTION[0].nl_id ? NL_SUBSCRIPTION[0].nl_id : ''
}

// Google login with image feature 
function continueWithGoogleLogin_CB(response) {
	EtB2b.login.gtmHelper({
		event: 'login_initiated',
		//login_source : headerLoginGoogleEvent ? 'google_'+headerLoginGoogleEvent : abTestVersion ? 'google_v'+abTestVersion : 'google',
		login_source: headerLoginGoogleEvent ? 'google_' + headerLoginGoogleEvent : 'google',
		login_source_type: login_source_info ? login_source_info : 'native login',
		login_page: window.location.pathname
	});

	if (response) {
		var url = apiUrl + '/user/account/social?client_id=' + client_id + '&connect_type=googleyolo&nl_id=' + getCurrentPortalsNewsletterID() + '&idtoken=' + response.credential;
		$.ajax({
			'url': url,
			xhrFields: { withCredentials: true },
			type: 'GET',
			crossDomain: true,
			success: function (data) {
				$("body").append(data);
				$('#wrapper_1, #l2_overlay_bx_1').remove();

				if (oauth_login_response.access_token) {
					EtB2b.login.handle_login_result('google', oauth_login_response.access_token);
				}
			},
			error: function (e) {
				EtB2b.commJs.showSuccessMessage('<h2>' + EtB2b.messageLog[56] + '</h2>', 'y');
				localStorage.removeItem('postMessage.responseCallback');
				localStorage.removeItem('login.social');
			}
		});
	} else {
		EtB2b.commJs.showSuccessMessage('<h2>' + EtB2b.messageLog[56] + '</h2>', 'y');
	}
}

// Facebook login with image feature
function continueWithFBLogin_CB() {
	EtB2b.login.loginWithFacebook('fb-profile-data');
}

const userPropertyOnCompletion = (userInfo) => {
	var userCompleInfo = userInfo.data;
	let userData = {
		'event': 'user_property',
		'usedId': userCompleInfo.eid,
		'user_type': '',
		'name': userCompleInfo.first_name +' '+ userCompleInfo.last_name,
		'email': userCompleInfo.email,
		'email_verified': userCompleInfo.status_email_verified,
		'phone': userCompleInfo.mobile,
		'designation': userCompleInfo.designation,
		'company': userCompleInfo.company,
		'city': userCompleInfo.city,
		'official_email': userCompleInfo.official_email,
	}
	dataLayer.push(userData);
}	

EtB2b.utils = EtB2b.utils || {};

EtB2b.utils.isNull = function (obj) {
	return obj == null || obj == 'null';
};


EtB2b.utils.isUndefined = function (obj) {
	return obj == undefined;
};

EtB2b.utils.isBlank = function (obj) {
	return typeof obj == 'undefined' || obj == '';
};

EtB2b.utils.isOperatable = function (obj) {
	if (typeof obj == 'object' &&
		!this.isNull(obj)) {

		return Object.keys(obj).length == 0 ? false : true;
	} else {
		return !this.isBlank(obj) && !this.isNull(obj) && !this.isUndefined(obj);
	}
};

EtB2b.utils.getVal = function (obj) {
	return !this.isBlank(obj) ? $.trim($(obj).val()) : '';
};

EtB2b.utils.isUrl = function (string) {
	var matcher = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
	return matcher.test(string);
};

EtB2b.utils.serialize = function (obj, prefix) {
	var $this = this;
	var str = [],
		p;
	for (p in obj) {
		if (obj.hasOwnProperty(p)) {
			var k = prefix ? prefix + "[" + p + "]" : p,
				v = obj[p];

			str.push(
				(v !== null && typeof v === "object") ?
					$this.serialize(v, k) :
					encodeURIComponent(k) + "=" + encodeURIComponent(v)
			);
		}
	}
	return str.join("&");
};

EtB2b.utils.is_externally_linked = function (link_element) {
	return (link_element.host !== window.location.host);
};

EtB2b.utils.hitAjaxRequest = function (requestSet) {
	var $this = this;

	if ($this.isOperatable(requestSet)) {
		var config = {
			url: requestSet.url,
			done: requestSet.done,
			fail: $this.showResponseData,
			method: requestSet.method || 'GET',
			dataType: requestSet.dataType || 'json',
			cache: $this.isOperatable(requestSet.cache) ? JSON.parse(requestSet.cache) : true,
			data: requestSet.data || {},
			async: $this.isOperatable(requestSet.async) ? JSON.parse(requestSet.async) : true,
			responseType: requestSet.responseType || '',
			timeout: requestSet.timeout || 30000,
			requestErrorHandler: requestSet.requestErrorHandler || ''
		}
		var obj = {
			handleRequests: function (response) {
				config.done(response);
			},
			requestOnloadHandler: function (xhr) {
				var response;

				var ob = {

					handleWithHttpStatus: function (response, status) {
						if ($this.isOperatable(response)) {
							this.handleWithResponseCode();
						} else {
							console.log(xhr.response.message || xhr.statusText || "something went wrong!")
						}
					},
					resolveResponseType: function () {
						if (config.responseType == 'blob') {
							response = xhr.response;

						} else {
							response = typeof xhr.response == 'string' && (xhr.response).search("{") >= 0 ?
								JSON.parse(xhr.response) : xhr.response;
						}

						return response;
					},
					handleWithResponseCode: function () {
						if (typeof xhr.response != 'undefined' && !$this.isBlank(xhr.response)) {
							(typeof this.resolveResponseType() == 'object' ||
								typeof this.resolveResponseType() == 'string' ||
								typeof this.resolveResponseType() == 'number' ||
								config.responseType == 'blob') ?

								obj.handleRequests(response) :
								false
								;
						}
					},
					validateHandleType: function () {
						var statusList = [400, 401, 403, 404, 405, 500, 503, 429];
						if ($.inArray(xhr.status, statusList) != -1) {
							this.handleWithHttpStatus(JSON.parse(xhr.response), xhr.status);
							return false; // if need to stop the execution further
						} else {
							this.handleWithResponseCode();
						}
					},
					init: function () {
						this.validateHandleType();
					}
				};
				ob.init();
			},
			setRequestHeaderConfig: function (xhr) {
				xhr.withCredentials = true;
				xhr.timeout = config.timeout;

				config.dataParams = (config.processData) ?
					($this.isOperatable(config.data) ?
						$this.serialize(config.data) : '') :
					config.data
					;

				config.contentType ?
					xhr.setRequestHeader("Content-type", config.contentType) : false
					;
				xhr.setRequestHeader('Accept', 'application/json');
				if (typeof window.csrf_token != 'undefined' && window.csrf_token) {
					xhr.setRequestHeader('csrf_token', window.csrf_token);
				}
				if (typeof window.google_captcha_token != 'undefined' && window.google_captcha_token) {
					xhr.setRequestHeader('google_captcha_token', window.google_captcha_token);
				}
			},
			processRequest: function () {
				var xhr = new XMLHttpRequest(), url;
				config.nonCache = !config.cache ? '?' + (new Date().getTime()) : '';

				if (config.method.toLowerCase() == 'get') {

					if (isOperatable(config.cache)) {

						var quesMark = (config.url).indexOf('?') == -1 ? '?' : '';

						url = $this.isOperatable(config.data) ?
							(config.url + quesMark + $this.serialize(config.data)) : config.url
							;

					} else {
						url = $this.isOperatable(config.data) ?
							(config.url + config.nonCache + $this.serialize(config.data)) : config.url
							;
					}
				} else {
					url = config.url + config.nonCache;
				}
				xhr.open(config.method, url, true);
				if ($this.isOperatable(config.responseType))
					xhr.responseType = "blob";

				this.setRequestHeaderConfig(xhr);
				xhr.onload = function () { obj.requestOnloadHandler(xhr) };
				xhr.send(config.dataParams);
			},
			setOtherConfigOptions: function () {
				config.processData = (typeof requestSet.processData == "undefined" ||
					$this.isUndefined(requestSet.processData)) ?
					true : requestSet.processData;

				config.contentType = (typeof requestSet.contentType == "undefined" ||
					$this.isUndefined(requestSet.contentType)) ?
					'application/x-www-form-urlencoded; charset=UTF-8' :
					requestSet.contentType
					;

				this.processRequest();
			},
			init: function () {
				this.setOtherConfigOptions();
			}
		}
		obj.init();
	}
};

EtB2b.utils.encodeURIComponent = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, escape);
};

EtB2b.utils.get_alphanumeric = function (str, toLower) {
	toLower = (typeof toLower !== 'undefined') ? toLower : 'Y';
	var rep_str = str.replace(/[^a-zA-Z0-9]+/g, '-');
	if (toLower == 'Y') {
		rep_str = rep_str.toLowerCase();
	}
	return rep_str;

};

EtB2b.utils.encodeHTML = function (param) {
	if (!param) {
		return param;
	}
	return param.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
};

EtB2b.utils.devConsole = function (label, data) {
	var showConsoleMsgs = localStorage.getItem('console');

	if (showConsoleMsgs && label && data) {
		console.log('%c' + label, 'background: aqua; color: #000; font-size: 15px;');
		console.log(data);
	}
};

EtB2b.utils.removeScriptFromHtml = function (param) {
	if (!param) {
		return param
	}

	return param.replace(/script/gi, 'clearjs');
};

EtB2b.utils.removeClearJs = function () {
	if ($('clearjs').length) {
		$('clearjs').remove();
	}

};

EtB2b.utils.chopString = function (str, len) {
	var len = len || 25;
	if (str.length > len) {
		str = str.substring(0, len - 1) + "...";
	}
	return str;
};


// Temp Fix
EtB2b.utils.encodeHTML = function (param) {
	return param;
};

EtB2b.utills = EtB2b.utils;//To Sync both

EtB2b.commJs = (function () {
	var getQueryParams = function (qs) {
		qs = qs.split("+").join(" ");
		var params = {},
			tokens,
			re = /[?&]?([^=]+)=([^&]*)/g;
		while (tokens = re.exec(qs)) {
			params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
		}
		return params;
	}
	var toTitleCase = function (str) {
		var strg = str.toLowerCase();
		return strg.replace(/(?:^|\s)\w/g, function (match) {
			return match.toUpperCase();
		});
	}
	var addDynamicCss = function (css) {
		head = document.head || document.getElementsByTagName('head')[0],
			style = document.createElement('style');
		style.type = 'text/css';
		if (style.styleSheet) {
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}
		head.appendChild(style);
	}
	var loadDynCss = function (css) {
		var element = document.createElement("link");
		element.setAttribute("rel", "stylesheet");
		element.setAttribute("type", "text/css");
		element.setAttribute("href", css);
		document.getElementsByTagName("head")[0].appendChild(element);
	}
	var getCookie = function (c_name) {
		var c_value = document.cookie;
		var c_start = c_value.indexOf(" " + c_name + "=");
		if (c_start == -1) {
			c_start = c_value.indexOf(c_name + "=");
		}
		if (c_start == -1) {
			c_value = null;
		} else {
			c_start = c_value.indexOf("=", c_start) + 1;
			var c_end = c_value.indexOf(";", c_start);
			if (c_end == -1) {
				c_end = c_value.length;
			}
			c_value = unescape(c_value.substring(c_start, c_end));
		}
		return c_value;
	}
	var setCookie = function (c_name, value, exdays, path, COOKIE_SET_DOMAIN) {
		if (!COOKIE_SET_DOMAIN) {
			COOKIE_SET_DOMAIN = '';
		}
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value = escape(value) + ((exdays == null) ? "" : "; path=/; domain=" + COOKIE_SET_DOMAIN + "; expires=" + exdate.toUTCString());
		document.cookie = c_name + "=" + c_value;
	}
	var setLocalStorage = function (key, data, exdays) {
		var $data = {};
		$data['expires'] = Math.floor(Date.now() / 1000) + exdays * 24 * 60 * 60;
		$data['data'] = data;
		localStorage.setItem(key, JSON.stringify($data));
	}

	var setLocalStorageWithMinExpiry = function (key, data, exmin) {
		exmin = exmin || 5; //default 5 minutes
		let $data = {};
		let cur_date = new Date();
		$data['expires'] = Math.floor(cur_date.setMinutes(cur_date.getMinutes() + exmin) / 1000);
		$data['data'] = data;
		localStorage.setItem(key, JSON.stringify($data));
	}

	var getLocalStorage = function (key) {
		var $data = localStorage.getItem(key);
		if ($data != null) {
			$data = JSON.parse($data);
			var lsexpires = $data['expires'];
			if (Math.floor(Date.now() / 1000) >= lsexpires) {
				deleteLocalStorage(key);
				return null;
			}
			if ('data' in $data)
				return $data['data'];
			else {
				deleteLocalStorage(key);
				return null;
			}
		} else {
			return null;
		}
	}
	var deleteLocalStorage = function (key) {
		localStorage.removeItem(key);
	}
	var deleteCookie = function (name, domain) {
		domain ? setCookie(name, '', 0, '', domain) : setCookie(name, '', 0);
	}
	var getUserLocation = function () {
		var userLoc = '';
		if (getLocalStorage('userlocationinfo')) {
			userLoc = getLocalStorage('userlocationinfo')['city'] || '';
			userLoc = EtB2b.commJs.toTitleCase(userLoc);
		}
		if (userLoc.length == 0) {
			$.ajax({
				url: EtB2b.globalVar.locationApi, success: function (data) {
					setLocalStorage('userlocationinfo', data, 1);
				}
			});
		}
		return userLoc;
	}

	var autoSuggestionModule = function (config) {
		if (config) {
			if (config.selector && $(config.selector).length && $(config.selector).val().length > 1) {
				var fieldVal = $(config.selector).val();
				fieldVal = EtB2b.utils.encodeHTML(fieldVal);

				var fieldId = $(config.selector).attr('id');
				var url = apiUrl + '/api/v1/autosuggest/' + config.type;
				var data = {
					q: $.trim(fieldVal)
				};
				var titleCaseTypeValue = EtB2b.commJs.toTitleCase(config.type);
				var apiStore;
				var apiResponseDataIdkey = '';
				var apiResponseDataNameKey = '';

				if (config.type == 'location') {
					apiStore = pageLocationStore;
					var countryCode = '';
					if (getLocalStorage('userlocationinfo')) {
						countryCode = getLocalStorage('userlocationinfo')['country_code'] || '';
						countryCode = EtB2b.commJs.toTitleCase(countryCode);
					}

					data.lc = countryCode;

					apiResponseDataIdkey = 'city_id';
					apiResponseDataNameKey = 'display_name';

				} else if (config.type == 'designation') {
					apiStore = pageDesignationStore;
					apiResponseDataIdkey = 'designation_id';
					apiResponseDataNameKey = 'display_name';

				} else if (config.type == 'company') {
					apiStore = pageCompanyStore;
					apiResponseDataIdkey = 'company_id';
					apiResponseDataNameKey = 'display_name';
				}


				var paramObject = {
					url: url,
					type: 'POST',
					data: data,
				}

				function ajaxSuccessCall(response, fromStore) {
					var obj = {};
					var response = response;
					var data = response.data;
					// window[[config.type] + 'DataTracker'] = data;
					EtB2b.globalVar[config.type] = [];

					if (fromStore != 'y' && paramObject.data.q && data) {
						let locationName = paramObject.data.q;
						apiStore[locationName] = response;
					}

					if (data.length) {
						for (var i = 0; i < data.length; i++) {
							obj = {};
							obj.id = data[i][apiResponseDataIdkey];
							obj.name = data[i][apiResponseDataNameKey];
							obj.displayKey = obj.name + '_' + obj.id;
							EtB2b.globalVar[config.type].push(obj.displayKey);
						}

						EtB2b.commJs.oauthAutoComplete(document.getElementById(fieldId), EtB2b.globalVar[config.type], config.event, config.type, data);
					} else {
						$('.autocomplete-items').length ? $('.autocomplete-items').remove() : false;
					}
				}

				function ajaxErrorCall(data) {
					console.log(data);
				}

				if (Object.keys(apiStore).length > 0 && Object.keys(apiStore).includes(paramObject.data.q)) {
					ajaxSuccessCall(apiStore[paramObject.data.q], 'y');

				} else {
					EtB2b.commJs.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
				}

			}
		}
	}

	var autoSuggestFieldEvent = function (param, e) {
		if (e.type == 'input') {
			$(param).attr('data-id', 0);
		}

		let fieldId = $(param).attr('data-param-id');
		let type = '';

		if (fieldId == 'b2boauth_select_company') {
			type = 'company';

		} else if (fieldId == 'b2boauth_select_designation') {
			type = 'designation';

		} else if (fieldId == 'b2boauth_select_location') {
			type = "location";
		}

		autoSuggestionModule({
			type: type,
			selector: param,
			event: e
		});
	}

	var autoSuggestSelectEvents = function (param, e) {
		var x = document.getElementById(param.id + "_autocomplete-list");
		if (x) x = x.getElementsByTagName("div");

		if (x != null && x != '' && x) {
			if (e.keyCode == 40) {
				/*If the arrow DOWN key is pressed,*/
				EtB2b.globalVar.currentFocus++;
				addActive(x);

			} else if (e.keyCode == 38) {
				/*If the arrow UP key is pressed*/
				EtB2b.globalVar.currentFocus--;
				addActive(x);
			} else if (e.keyCode == 13) {
				/*If the ENTER key is pressed, prevent the form from being submitted,*/
				e.preventDefault();
				if (EtB2b.globalVar.currentFocus > -1) {
					if (x) x[EtB2b.globalVar.currentFocus].click();
				}
			}
		}

		function addActive(x) {
			if (!x) return false;
			removeActive(x);

			if (EtB2b.globalVar.currentFocus >= x.length) EtB2b.globalVar.currentFocus = 0;
			if (EtB2b.globalVar.currentFocus < 0) EtB2b.globalVar.currentFocus = (x.length - 1);

			if (EtB2b.globalVar.currentFocus >= 0) {
				x[EtB2b.globalVar.currentFocus].classList.add("autocomplete-active");
			}

		}

		function removeActive(x) {
			for (var i = 0; i < x.length; i++) {
				x[i].classList.remove("autocomplete-active");
			}
		}
	}

	function closeAllLists() {
		if ($('.autocomplete-items').length)
			$('.autocomplete-items').remove();
	}

	var oauthAutoComplete = function (inp, arr, e, type, data) {
		var a,
			b, i, val = inp.value;

		closeAllLists(inp);
		if (!val) { return false; }
		EtB2b.globalVar.currentFocus = -1;
		a = document.createElement("DIV");
		a.setAttribute("id", inp.id + "_autocomplete-list");
		a.setAttribute("class", "autocomplete-items");

		inp.parentNode.appendChild(a);

		for (i = 0; i < arr.length; i++) {
			var arrSplit = arr[i].split('_')[0];
			var arrId = arr[i].split('_')[1];
			// if ((arrSplit.match(new RegExp($.trim(val), 'gi')))) {
			if (arrSplit && arrId) {
				b = document.createElement("DIV");

				b.innerHTML = arrSplit;
				arrSplit = arrSplit.replace(/'/g, "&#39;");
				b.innerHTML += "<input type='hidden' data-id='" + arrId + "' value='" + arrSplit + "'>";

				b.addEventListener("click", function (e) {
					inp.value = this.getElementsByTagName("input")[0].value;
					var idd = this.getElementsByTagName("input")[0].getAttribute("data-id");
					inp.setAttribute("data-id", idd);
					inp.setAttribute("title", inp.value);
					$(inp).addClass('valid');

					var pageLocationStoreDataset = {
						"code": 200,
						"status": "SUCCESS",
						"message": "OK",
						"onselected": "y",
						"data": data
					};

					var titleCaseTypeValue = EtB2b.commJs.toTitleCase(type);
					var apiStore = function () {
						if (type == "location") {
							return pageLocationStore;
						} else if (type == "designation") {
							return pageDesignationStore;
						} else if (type == "company") {
							return pageCompanyStore;
						}
					}();

					apiStore[$.trim(inp.value)] = pageLocationStoreDataset;
					closeAllLists();
					$('.btn.submit-button2').removeAttr('disabled');
				});
				a.appendChild(b);
			}
			// }
		}

		$(inp).off("keydown").keydown(function (e) {
			EtB2b.commJs.autoSuggestSelectEvents(inp, e)
		})
	}

	var autoSuggestCountryCode = function (config) {
		var paramObject = {
			url: apiUrl + '/api/v1/autosuggest/isdcodes',
		}

		function createHtmlForCountryCodes(data) {
			var optionData = '';

			for (var i = 0; i < data.length; i++) {
				optionData += '<option id="' + data[i].mobile_code + '" data_country_code="' + data[i].country_code + '">' + data[i].display_name + " +" + data[i].mobile_code + '</option>';
			}

			$('#countryCode').html(optionData);

			// to handle edit profile
			if (config && Object.keys(config) > 0 && typeof config.isd_code != "undefined" && config.isd_code && typeof config.country_code != "undefined" && config.country_code) {
				$('#countryCode option').eq(0).attr('id', config.isd_code).attr('data_country_code', config.country_code);
				$('#countryCode option').eq(0).html(config.isd_code);
			}

			createCountryCodeDropDown(config);
		}

		function ajaxSuccessCall(response) {
			var data = response.data;
			EtB2b.globalVar.countryMappingCodes = response.data;
			createHtmlForCountryCodes(data);
		}

		function ajaxErrorCall(data) {
			console.log(data);
		}

		if (typeof EtB2b.globalVar.countryMappingCodes != "undefined" && Object.keys(EtB2b.globalVar.countryMappingCodes).length > 0) {
			createHtmlForCountryCodes(EtB2b.globalVar.countryMappingCodes);
		} else {
			EtB2b.commJs.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
		}

	}

	var loadScript = function (src, callback, async, params) {
		if (typeof async == 'undefined')
			async = true;
		else
			async = (async) ? true : false;
		var s,
			r,
			t;
		r = false;
		var src_alphanumeric = src.replace(/[^a-zA-Z0-9]+/g, '-');
		src_alphanumeric = src_alphanumeric.toLowerCase();
		var skip = 1;
		if (!(document.getElementById(src_alphanumeric)) && skip == 1) {
			s = document.createElement('script');
			s.type = 'text/javascript';
			s.src = src;
			s.id = src_alphanumeric;
			if (async == true) {
				s.async = true;
				s.defer = true;
			} else
				s.async = false;
			s.onload = s.onreadystatechange = function () {
				if (!r && (!this.readyState || this.readyState == 'complete')) {
					r = true;
					if (typeof callback == 'function')
						callback(params);
					document.getElementById(s.id).setAttribute('data-ready', 1);
				}
			};
			t = document.getElementsByTagName('head')[0];
			t.appendChild(s, t);
		} else if (document.getElementById(src_alphanumeric)) {
			if (document.getElementById(src_alphanumeric).getAttribute('data-ready') == 0 || document.getElementById(src_alphanumeric).getAttribute('data-ready') == null) {
				setTimeout(function () { loadScript(src, callback, async, params); }, 100);
			} else {
				if (typeof callback == 'function') {
					callback(params);
				}
			}
		}
	}

	var isValidEmail = function (email) {
		var pattern = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
		if (!pattern.test(email)) {
			return false;
		} else {
			return true;
		}
	}

	var validateName = function (name, key) {
		var error = '';
		name = name.replace(/ /g, '');

		function handleBlankNameVal(msgkey1, msgkey2) {
			if (name == "") {
				error = EtB2b.messageLog[msgkey1];
			} else if (!name.match(/^([a-zA-Z]+)$/i)) {
				error = EtB2b.messageLog[msgkey2];
			}
		}

		switch (key) {
			case "b2boauth_first_name":
				handleBlankNameVal(29, 30);
				break;

			case "b2boauth_last_name":
				handleBlankNameVal(45, 30);

		}
		return error;
	}

	var validateUserMessage = function(name, key){
		var error = '';
		name = name.replace(/ /g, '');
		if (name == "") {
			error = EtB2b.messageLog[64];
		}
		return error;
	}

	var validateImage = function (obj) {
		return obj && (/(\.jpg|\.jpeg|\.png|\.gif|\.webp|data\:image)$/i).test(obj);
	};

	var validateFieldName = function (name, key) {
		var error = '';
		name = name.replace(/ /g, '');

		function handleBlankNameVal(msgkey1, msgkey2, msgkey3) {
			if (name == "") {
				error = EtB2b.messageLog[msgkey1];
			} else if (name.length < 2) {
				error = EtB2b.messageLog[msgkey2];
			} else if(!isNaN(name)){
				error = EtB2b.messageLog[msgkey3];
			}
		}

		switch (key) {
			case "b2boauth_company_name":
				handleBlankNameVal(4, 57, 65);
				break;

			case "b2boauth_designation_name":
				handleBlankNameVal(5, 43, 66);

		}
		return error;
	}

	var validateFieldLocationName = function (name, key) {
		var error = '';
		name = name.replace(/ /g, '');

		function checkIfLocationInPageStore(param) {
			var dataId = $('#' + key).attr('data-id');

			if (dataId && dataId != 0) {
				var totalValues = Object.keys(pageLocationStore);
				var value = EtB2b.utils.encodeHTML($(param).val());
				var currentValue = $.trim(value);
				var currentValueInMap = totalValues.length > 0 && totalValues.includes(currentValue);
				var currentValueInMapHasSomeData = typeof pageLocationStore[currentValue] != "undefined" && typeof pageLocationStore[currentValue].data != "undefined" && pageLocationStore[currentValue].data.length;
				var currentValueUserSelected = typeof pageLocationStore[currentValue] != "undefined" && typeof pageLocationStore[currentValue].onselected != "undefined" && pageLocationStore[currentValue].onselected == "y";

				if (currentValueInMap && (currentValueUserSelected || currentValueInMapHasSomeData)) {
					return true;
				}
			} else if (dataId == 0) {
				return true;
			}

			return false;
		}

		function handleBlankNameVal(msgkey1, msgkey2) {
			if (name == "") {
				error = EtB2b.messageLog[msgkey1];

			} else if (!checkIfLocationInPageStore('#' + key)) {
				error = EtB2b.messageLog[msgkey2];
			} else if(!isNaN(name)){
				error = EtB2b.messageLog[msgkey2];
			}
		}

		switch (key) {
			case "b2boauth_location":
				handleBlankNameVal(46, 52);
		}
		return error;
	}

	var validateEmail = function (email) {
		var error = '';
		email = email.replace(/^\s+|\s+$/gm,'');
		if (email == "") {
			error = EtB2b.messageLog[31];
		}
		else if (!isValidEmail(email)) {
			error = EtB2b.messageLog[2];
		}
		return error;
	}

	var validateOfficialEmail = function (email) {
		email = email.replace(/ /g, '');
		var error = '';
		var emailDomain = email ? email.split('@')[1] : '';
		var popularDomainsArr = ['gmail', 'yahoo', 'hotmail', 'aol', 'msn', 'live', 'rediffmail', 'outlook', 'verizon', 'googlemail', 'facebook'];

		var configOfficialEmail = EtB2b.globalVar.oauthObjConfig.official_email_validation;

		var obj = {
			handleBlockedDomains: function () {
				var blocked_domains = configOfficialEmail.blocked_domains;
				var blocked_domains_keys = Object.keys(blocked_domains);

				function execulteBlockedDomainLogic(blocked_domains) {
					let domainList = blocked_domains;

					if (domainList.includes(emailDomain)) {
						// error = `Email IDs with domains(${domainList.join(',')}) are not allowed`;
						error = EtB2b.messageLog[62];
					}
				}

				if (blocked_domains_keys.includes('default') && blocked_domains.default.length > 0) {
					execulteBlockedDomainLogic(blocked_domains.default);
				} else {
					for (i in blocked_domains) {
						sel = '#' + i;
						if (typeof registrationFormId != "undefined" && i == registrationFormId) {
							execulteBlockedDomainLogic(blocked_domains[i]);
						}
					}
				}
			},

			handleAllowedDomains: function () {
				var allowed_domains = configOfficialEmail.allowed_domains;
				var allowed_domains_keys = Object.keys(allowed_domains);

				function execulteAllowedDomainLogic(allowed_domains) {
					let domainList = allowed_domains;

					if (!domainList.includes(emailDomain)) {
						// error = `Email ID must be with domains(${domainList.join(',')})`;
						error = EtB2b.messageLog[62];
					}
				}

				if (allowed_domains_keys.includes('default') && allowed_domains.default.length > 0) {
					execulteAllowedDomainLogic(allowed_domains.default);
				} else {
					for (i in allowed_domains) {
						let sel = '#' + i;
						if (typeof registrationFormId != "undefined" && i == registrationFormId) {
							execulteAllowedDomainLogic(allowed_domains[i]);
						}
					}
				}
			},

			processOfficialEmailValidation: function () {
				if (typeof configOfficialEmail.blocked_domains != "undefined" && Object.keys(configOfficialEmail.blocked_domains).length > 0) {
					this.handleBlockedDomains();
				}

				if (!error && typeof configOfficialEmail.allowed_domains != "undefined" && Object.keys(configOfficialEmail.allowed_domains).length > 0) {
					this.handleAllowedDomains();
				}
			},

			validateEmail: function () {
				if (email == "") {
					error = EtB2b.messageLog[31];
				}
				else if (!isValidEmail(email)) {
					error = EtB2b.messageLog[62];
				}
			},

			init: function () {
				this.validateEmail();

				if (Object.keys(configOfficialEmail).length > 0 && !error) {
					this.processOfficialEmailValidation();

				} else {
					if (!EtB2b.utils.isBlank(emailDomain)) {
						var emailDomainName = emailDomain.split('.')[0];
						if (popularDomainsArr.includes(emailDomainName)) {
							error = EtB2b.messageLog[62];
						}
					}
				}
			}
		};

		obj.init();
		return error;
	}

	var validatePassword = function (password, key) {
		var error = '';
		password = password.replace(/ /g, '');
		switch (key) {
			case "b2boauth_log_pswd":
			case "b2boauth_curr_password":
			case "b2boauth_frgt_pswd_password":
			case "b2boauth_verify_registration_password":
			case "b2boauth_registration_password":
				if (password == "") {
					error = EtB2b.messageLog[26];
				} else if (password.length < 6) {
					error = EtB2b.messageLog[27];
				} else if (password.length > 32) {
					error = EtB2b.messageLog[28];
				}
				break;
			case "b2boauth_new_password1":
				if (password == "") {
					error = EtB2b.messageLog[48];
				} else if (password.length < 6) {
					error = EtB2b.messageLog[27];
				} else if (password.length > 32) {
					error = EtB2b.messageLog[28];
				}
				break;
			case "b2boauth_new_password2":
				var newpass = EtB2b.utils.encodeHTML($('#b2boauth_new_password1').val());
				if (password != newpass) {
					error = EtB2b.messageLog[37];
				}
		}
		return error;
	}

	var validateMobile = function (mob_number) {
		var error = '';
		var ccode = $('.select-selected').attr('data-isd-code');
		var regex = /^([\d\+\-\(\)]){5,15}$/;
		mob_number = mob_number.replace(/ /g, '');
		var startsWith = $.trim(mob_number).split('')[0];
		var indianLimit = 10;
		var startNumber = ['0', '1', '2', '3', '4', '5'];
		var valCheckOnStartDigit = startNumber.includes(startsWith) || false;

		if (EtB2b.utils.isBlank(mob_number)) {
			error = EtB2b.messageLog[33];

		} else if (isNaN(mob_number)) {
			error = EtB2b.messageLog[34];

		} else if (ccode != 91 && !regex.test(mob_number)) {
			error = EtB2b.messageLog[34];

		} else if (ccode == 91 && mob_number.length != indianLimit) {
			error = EtB2b.messageLog[34];

		} else if (ccode == 91 && valCheckOnStartDigit) {
			error = EtB2b.messageLog[34];
		}

		return error;
	}

	var validateOTPCode = function (code) {
		var error = '';
		code = code.replace(/ /g, '');
		if (code == "") {
			error = EtB2b.messageLog[40];
		} else if (code.length < 6) {
			error = EtB2b.messageLog[42];
		}
		return error;
	}

	var daysDiff = function (timestamp1, timestamp2) {
		var difference = timestamp1 - timestamp2;
		var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
		return daysDifference;
	}

	var hitAjaxApi = function (requestSet, ajaxSuccess, ajaxError) {
		if (EtB2b.utils.isOperatable(requestSet)) {
			requestSet = requestSet || {};
			requestSet.data = requestSet.data || {};
			requestSet.data.client_id = client_id;
			$.ajax({
				url: requestSet.url,
				type: requestSet.type || 'POST',
				data: requestSet.data,
				xhrFields: { withCredentials: true },
				crossDomain: true,
				success: function (data) {
					ajaxSuccess(data);
				},
				error: function (data, XMLHttpRequest, textStatus, errorThrown) {
					ajaxError(data);
				}
			});
		}
	}

	var googleOneTap = function () {
		times = window.times || {};
		times.mobile = window.times.mobile || {};
		retrievePromise = {};
		times.mobile.googleOneTap = {
			constants: {
				disabledFor: [],//'masterclass'
				blockedfor: [],
				dismissableFor: ['tech'],
				blockedPaths: '^/(latest-news|top-stories|news|tag|search)+.*',
				pagePath: window.location.pathname,
				blockTimer: 0,
				delayTime: 3000,
			},
			init: function () {
				var isChrome = navigator.userAgent.toLowerCase().match('crios') || navigator.userAgent.toLowerCase().match('chrome');
				if (isChrome) {
					if ($.inArray(ET_PORTAL, times.mobile.googleOneTap.constants.disabledFor) == -1) {
						if (!EtB2b.commJs.getCookie('yolodismissed')) {
							// pattern = new RegExp(times.mobile.googleOneTap.constants.blockedPaths);
							// if(times.mobile.googleOneTap.constants.pagePath == '/' || pattern.test(times.mobile.googleOneTap.constants.pagePath)){
							setTimeout(() => {
								times.mobile.googleOneTap.loadjs();
								times.mobile.googleOneTap.addRequiredCss('.yolodelay { display: none!important } .yolooverlay { display: none } body.yoloblocker #my_web_push_app_box_confirm, body.yoloblocker .pop3.transparent { display: none!important } body #yoloblockPage, body #yolooverlay { display: none } body.yoloblocker #yoloblockPage, body.yoloblocker #yolooverlay {} .login-blocker { position: fixed; left: 0; top: 0; z-index: 16000; height: 100%; width: 100%; background-color: #000; font-family: Arial, sans-serif } .login-blocker .container1 { max-width: 1000px; margin: 0 auto; position: relative; box-sizing: border-box } .login-blocker img.arrow-web { position: absolute; left: auto; right: 230px; top: 61px; z-index: 999 } .login-blocker .desc { padding: 17% 4%; color: #fff } .login-blocker .desc h2 { font-size: 36px; color: #fff; font-weight: 700; margin: 0 0 12px; line-height: 45px; font-family: "Merriweather"; } .login-blocker .desc p { font-size: 24px; color: #fff; max-width: 480px; line-height: 28px } .login-blocker .desc .list-terms .figure-tick { margin-right: 8px; text-align: left; padding-top: 0; } .login-blocker .desc .list-terms .figure-tick img { height: 22px; width: 22px; } .login-blocker .desc .list-terms { margin-top: 26px } .login-blocker .desc .list-terms li { display: block; color: #fff; list-style: none; line-height: 18px; font-size: 16px; margin-bottom: 20px; font-weight: 400 }.login-blocker .desc .list-terms li:after {display: none;} .login-blocker .desc .list-terms li i { padding-right: 24px; background: url(/Themes/Release/images/responsive/tick-wht.png) 0 0 no-repeat; height: 16px; width: 16px; } .login-blocker .desc .list-terms li a, .login-blocker .desc p.p-terms a { color: #fff } .login-blocker .desc p.p-terms a { text-decoration: underline } .login-blocker .desc p.p-terms { font-size: 13px; line-height: 22px; max-width: inherit; margin-top: 26px } .arrow-mob { display: none } @media screen and (min-width:1024px) { .login-blocker .desc { padding: 0; position: absolute; width:1000px; right: -66px; top: 169px; } .login-blocker img.arrow-web { position: absolute; left: auto; right: 210px; top: 58px; z-index: 999; } .login-blocker .container1 { max-width: calc(100% - 390px); } } @media screen and (max-width:1024px) { .login-blocker .container1 { padding: 0 20px } .login-blocker img.arrow-web { right: auto; width: 380px; left: 135px } .login-blocker .desc { top: 14px } } @media screen and (max-width:767px) { .login-blocker .desc .list-terms .figure-tick { vertical-align: middle; } .login-blocker .desc h2 { text-align: left; margin-bottom: 12px } .login-blocker img.arrow-web { display: none } .login-blocker .desc { text-align: left; top: 10%; padding: 12% 0 } .login-blocker .desc p { margin: 0 0 24px; text-align: left; max-width: inherit } .arrow-mob { display: block; margin: 0 auto 15px } .login-blocker .desc .list-terms li { list-style: unset; margin-bottom: 18px; display: table } .login-blocker .desc .list-terms li i { display: table-cell; vertical-align: middle } .login-blocker .desc .list-terms li span { display: table-cell } .login-blocker .desc .list-terms li span:not(.figure-tick) { padding-left: 8px; } .login-blocker .desc p.p-terms { line-height: 22px } .login-blocker .desc .list-terms { margin-top: 24px } }');
							}, 0);
							// }
						}
					}
				}
			},
			loadjs: function () {
				(function (d, s, id) {
					var js, fjs = d.getElementsByTagName(s)[0];
					if (d.getElementById(id)) {
						return;
					}
					js = d.createElement(s);
					js.id = id;
					js.src = "https://accounts.google.com/gsi/client";
					fjs.parentNode.insertBefore(js, fjs);
				}(document, 'script', 'onetap-jssdk'));
				times.mobile.googleOneTap.initialize();
			},
			initialize: function () {
				if (EtB2b.commJs.getCookie('yolologgedout')) {
					EtB2b.commJs.setCookie('yoloautologin', 0, -1);
				}
				window.onload = function () {
					google.accounts.id.initialize({
						client_id: EtB2b.globalVar.yoloclientid,
						callback: handleCredentialResponse,
						auto_select: (EtB2b.commJs.getLocalStorage('userlogout')) ? false : true,
						cancel_on_tap_outside: false,
						use_fedcm_for_prompt: true
					});
					google.accounts.id.prompt(function (notification) {
						window.yolonotification = notification;	
						if (notification.isDismissedMoment()) {
							$('#yolooverlay').hide();
						}
						if (notification.getDismissedReason()) {
							console.log(notification);
						}
						if (notification.getMomentType()) {
							console.log(notification.g);
						}									
					});
					function handleCredentialResponse(response) {
						EtB2b.login.gtmHelper({
							event: 'login_initiated',
							login_source_type: 'YOLO',
							login_source: 'googleyolo',
							login_page: window.location.pathname
						});
						EtB2b.model.close_pop(1);
						url = apiUrl + '/user/account/social?client_id=' + client_id + '&connect_type=googleyolo&nl_id=' + getCurrentPortalsNewsletterID() + '&callback=EtB2b.login.handle_login_wrapper&idtoken=' + response.credential;
						$.ajax({
							'url': url,
							xhrFields: { withCredentials: true },
							type: 'GET',
							crossDomain: true,
							success: function (data) {
								$("body").append('<div class="hide">' + data + '</div>');
								setCookie('yolologgedout', 0, -1);
								setCookie('yolodismissed', 0, -1);
								setCookie('yoloautologin', 1, 1);
							}
						});
						$('#yolooverlay').hide();
					}
				}
			},
			addRequiredCss: function (css) {
				head = document.head || document.getElementsByTagName('head')[0],
					style = document.createElement('style');
				style.type = 'text/css';
				if (style.styleSheet) {
					style.styleSheet.cssText = css;
				} else {
					style.appendChild(document.createTextNode(css));
				}
				head.appendChild(style);
			}
		}
		times.mobile.googleOneTap.init();
	}

	var createInputField = function (fobj) {
		var fpwdField = '',
			fbutton = '',
			fdropDown = '',
			txtFields = '',
			fieldconfig;

		var obj = {
			createAttributesOnElement: function () {
				var attrs = fieldconfig.addAttributes;
				var attrListString = ``;

				if (attrs && Object.keys(attrs).length > 0) {
					for (i in attrs) {
						var nameKey = $.trim(attrs[i]['name']);
						var nameValue = $.trim(attrs[i]['value']);

						attrListString += `${nameKey}= "${nameValue}" `;
					}
				}

				return attrListString;
			},

			createOptionsList: function () {
				var options = fieldconfig.optionsList;
				var optionHTML = ``;

				if (fieldconfig.ftype == 'select' && options) {
					options.forEach(elm => {
						optionHTML += `<option name="${elm.option}" 
											id="${elm.option}">
										${elm.option}
									</option>`;
					});

				}

				return optionHTML;
			},

			embedCreatedElement: function () {
				if (fieldconfig.appendSelector && $(fieldconfig.appendSelector).length) {
					$(fieldconfig.appendSelector).append(txtFields);

				} else if (fieldconfig.prependSelector && $(fieldconfig.prependSelector).length) {
					$(fieldconfig.prependSelector).prepend(txtFields);

				} else if (fieldconfig.insertAfter && $(fieldconfig.insertAfter).length) {
					$(txtFields).insertAfter(fieldconfig.insertAfter);

				} else if (fieldconfig.insertBefore && $(fieldconfig.insertBefore).length) {
					$(txtFields).insertBefore(fieldconfig.insertBefore);
				}
			},

			handleElementType: function () {
				if (fieldconfig.ftype == 'select') {
					txtFields = `<div class="create-section input_select_box ${fieldconfig.parentClass}">
									<label for="${fieldconfig.fid}">
										${fieldconfig.flabel}
									</label>  
									<select data-id="" 
											id="${fieldconfig.fid}" 
											name = "${fieldconfig.fname}"
											class="${fieldconfig.ftype}_sec ${fieldconfig.fclass}">
										
											${this.createOptionsList()}
									</select>
									<p id="${fieldconfig.fid}_err" 
										class="error">
									</p>
								</div>`;

				} else if (fieldconfig.ftype == 'textarea') {
					txtFields = `<div class="create-section input_textarea_box ${fieldconfig.parentClass}">
									<label for="${fieldconfig.fid}">
										${fieldconfig.flabel}
									</label>  
									<textarea data-id="" 
											  cols="${fieldconfig.textareaColumns}" 
											  id="${fieldconfig.fid}" 
											  name = "${fieldconfig.fname}"
											  class="${fieldconfig.ftype}_sec ${fieldconfig.fclass}">

										${fieldconfig.fvalue ? fieldconfig.fvalue : ""}
									</textarea>
									
							
									<p id="${fieldconfig.fid}_err" 
										class="error">
									</p>
								</div>`;

				} else if (fieldconfig.ftype == 'hidden') {
					txtFields = `<div class="create-section ${fieldconfig.ftype + "_sec"} ${fieldconfig.parentClass}">
									<input type="${fieldconfig.ftype}" 
										id="${fieldconfig.fid}" 
										name = "${fieldconfig.fname}"
										class="hide ${fieldconfig.fclass}">
								</div>`;

				} else if (fieldconfig.ftype == 'file') {
					txtFields = `<div class="create-section input_file_box ${fieldconfig.parentClass}">
									<label for="${fieldconfig.fid}">
										${fieldconfig.flabel}
									</label>
									<input ${fieldconfig.isRequired ? "required" : ""} 
										data-id="" 
										placeholder=""  
										type="${fieldconfig.ftype}" 
										id="${fieldconfig.fid}" 
										name = "${fieldconfig.fname}"
										class="${fieldconfig.ftype}_sec ${fieldconfig.fclass}"  
										value="${(fieldconfig.fvalue ? fieldconfig.fvalue : "")}" 
										${this.createAttributesOnElement()} > 
										
									<p id="${fieldconfig.fid}_err" 
									class="error">
									</p>
								</div>`;
					// Case not handled properly - Can have multiple layout options
				} else if (fieldconfig.ftype == 'checkbox' || fieldconfig.ftype == 'radio') {
					txtFields = `<div class="create-section radio-checkbox-box ${fieldconfig.ftype + "_sec"} ${fieldconfig.parentClass}">
									
									${fieldconfig.fieldLegend ? '<h4>' + fieldconfig.fieldLegend + '</h4>' : ''}
									<div class="radio-checkbox-cont">
										<input ${fieldconfig.isRequired ? "required" : ""} 
											data-id="" 
											placeholder=""  
											type="${fieldconfig.ftype}" 
											id="${fieldconfig.fid}" 
											name = "${fieldconfig.fname}"
											class="radio_checkbox_type ${fieldconfig.fclass}"  
											value="${(fieldconfig.fvalue ? fieldconfig.fvalue : "")}" 
											${this.createAttributesOnElement()} > 
											
										
										<label for="${fieldconfig.fid}">
											${fieldconfig.flabel}
										</label>
									</div>

									<p id="${fieldconfig.fid}_err" 
									class="error">
									</p>
								</div>`;
				} else {
					if (fieldconfig.ftype == 'password') {
						fpwdField = `<i class="lg_sprite oauth-eye-slash show-pwd" 
										  aria-hidden="true" 
										data-testid="show-password">
									</i>`;
					}

					if (fieldconfig.textButtonName != '') {
						fbutton = `<a class="${fieldconfig.textButtonClass}">
										${fieldconfig.textButtonName}
									</a>`;
					}

					// Special Case used in Oauth
					if (fieldconfig.dropDown != '') {
						fdropDown = `<div class="b2boauth-custom-select" 
										  style="width:200px;">
										<select id="countryCode">
											<option>+0</option>
										</select>
									</div>`;
					}

					txtFields = `<div class="create-section input_sec ${fieldconfig.parentClass}">
									${fdropDown}
									${fpwdField}
									${fbutton} 
									<input ${fieldconfig.isRequired ? "required" : ""} 
										data-id="" 
										placeholder=""
										name = "${fieldconfig.fname}"  
										type="${fieldconfig.ftype}" 
										id="${fieldconfig.fid}" 
										class="input_txt_box ${fieldconfig.fclass}"  
										value="${(fieldconfig.fvalue ? fieldconfig.fvalue : "")}" 
										${this.createAttributesOnElement()} > 
										
									
									<label for="${fieldconfig.fid}">
										${fieldconfig.flabel}
									</label>

									<p id="${fieldconfig.fid}_err" 
									class="error">
									</p>
								</div>`;
				}
			},

			setDefaults: function () {
				EtB2b.globalVar.inputFieldConfig = Object.assign(EtB2b.globalVar.inputFieldConfig, EtB2b.globalVar.defaultInputConfig);
				EtB2b.globalVar.inputFieldConfig = Object.assign(EtB2b.globalVar.inputFieldConfig, fobj);
				fieldconfig = EtB2b.globalVar.inputFieldConfig;
			},

			init: function () {
				this.setDefaults();
				this.handleElementType();
				this.embedCreatedElement();
			}
		}

		obj.init();
		return txtFields;

	}

	var setPrefetchedCountryCodes = function (config) {
		if (!(config && EtB2b.utils.isOperatable(config) && config.isd_code && config.country_code)) {
			if (EtB2b.utils.isOperatable(EtB2b.globalVar.countryMappingCodes) && EtB2b.utils.isOperatable(userlocationinfo)) {
				for (i in EtB2b.globalVar.countryMappingCodes) {
					if (EtB2b.globalVar.countryMappingCodes[i].country_code == userlocationinfo.country_code) {
						$('.b2boauth-custom-select .select-selected')
							.html(`+${EtB2b.globalVar.countryMappingCodes[i].mobile_code}<i class="fa fa-angle-down"></i>`)
							.attr('data-isd-code', EtB2b.globalVar.countryMappingCodes[i].mobile_code)
							.attr('data-country-code', EtB2b.globalVar.countryMappingCodes[i].country_code);
					}
				}
			}
		} else {
			$('.b2boauth-custom-select .select-selected')
				.html(`+${config.isd_code}<i class="fa fa-angle-down"></i>`)
				.attr('data-isd-code', config.isd_code)
				.attr('data-country-code', config.country_code);
		}

	}

	var setPrefetchedAutoSuggestLocation = function (config) {
		function executeLocationFetching() {
			var apiObj = {
				url: apiUrl + '/api/v1/autosuggest/location',
				data: {
					q: getFullLocationString(),
					lc: $.trim(userlocationinfo.country_code),
					type: 'detail'
				}
			};

			var ajaxSuccess = function (response) {
				const { data } = response;

				const fillValueInLocation = function (id, city) {
					const $targetSelector = $('[data-param-id="b2boauth_select_location"]');

					if ($targetSelector.length) {
						$targetSelector.attr('data-id', id).val(city).addClass('valid');
					}

				};

				if (data.length) {
					for (i in data) {
						if (i == 0) {
							fillValueInLocation(data[i].city_id, data[i].display_name);
							pageLocationStore = [];
							pageLocationStore[data[i].display_name] = response;
						}
					}

				} else {
					fillValueInLocation(0, getFullLocationString());
				}
			};

			var ajaxError = function (response) {
				showBackendErrorAgainstField(response);
			}

			if (config && config.data) {
				ajaxSuccess(config);

			} else {
				EtB2b.commJs.hitAjaxApi(apiObj, ajaxSuccess, ajaxError);
			}
		}

		if (EtB2b.utils.isOperatable(userlocationinfo) && userlocationinfo.city && userlocationinfo.country_code) {
			executeLocationFetching();

		} else {
			$.ajax({
				url: EtB2b.globalVar.locationApi, success: function (response) {
					userlocationinfo = response;
					EtB2b.commJs.setLocalStorage('userlocationinfo', response, 1);
					executeLocationFetching();
				}
			});
		}
	}

	var createCountryCodeDropDown = function (config) {
		var x, i, j, l, ll, selElmnt, a, b, c;
		/*look for any elements with the class "custom-select":*/
		x = document.getElementsByClassName("b2boauth-custom-select");
		l = x.length;

		for (i = 0; i < l; i++) {
			selElmnt = x[i].getElementsByTagName("select")[0];
			ll = selElmnt.length;
			/*for each element, create a new DIV that will act as the selected item:*/
			a = document.createElement("DIV");
			a.setAttribute("class", "select-selected");
			var selectedItemStart = selElmnt.options[selElmnt.selectedIndex];
			a.innerHTML = selectedItemStart.innerHTML;
			a.setAttribute('data-isd-code', selectedItemStart.id);
			a.setAttribute('data-country-code', selectedItemStart.getAttribute('data_country_code'));
			a.innerHTML = ['+', a.innerHTML.split('+')[1], '<i class="fa fa-angle-down">'].join('');
			x[i].appendChild(a);
			/*for each element, create a new DIV that will contain the option list:*/
			b = document.createElement("DIV");
			b.setAttribute("class", "select-items select-hide");
			for (j = 0; j < ll; j++) {
				/*for each option in the original select element,
				create a new DIV that will act as an option item:*/
				c = document.createElement("DIV");
				c.innerHTML = selElmnt.options[j].innerHTML;
				c.setAttribute('data-isd-code', selElmnt.options[j].id);
				c.setAttribute('data-country-code', selElmnt.options[j].getAttribute('data_country_code'));
				c.addEventListener("click", function (e) {
					/*when an item is clicked, update the original select box,
					and the selected item:*/
					$('.btn.submit-button2').removeAttr('disabled');
					var y, i, k, s, h, sl, yl;
					s = this.parentNode.parentNode.getElementsByTagName("select")[0];
					sl = s.length;
					h = this.parentNode.previousSibling;
					for (i = 0; i < sl; i++) {
						if (s.options[i].innerHTML == this.innerHTML) {
							s.selectedIndex = i;
							var elemt = (this.innerHTML).split('+')[1];
							h.innerHTML = ['+', elemt, '<i class="fa fa-angle-down">'].join('');
							a.setAttribute('data-isd-code', s.options[i].id);
							a.setAttribute('data-country-code', s.options[i].getAttribute('data_country_code'));

							y = this.parentNode.getElementsByClassName("same-as-selected");
							yl = y.length;
							for (k = 0; k < yl; k++) {
								y[k].removeAttribute("class");
							}
							this.setAttribute("class", "same-as-selected");
							//$('.create-section').removeClass('show-on-data');
							break;
						}
					}
					h.click();

				});
				b.appendChild(c);
			}
			x[i].appendChild(b);
			a.addEventListener("click", function (e) {
				/*when the select box is clicked, close any other select boxes,
				and open/close the current select box:*/
				e.stopPropagation();
				closeAllSelect(this);
				this.nextSibling.classList.toggle("select-hide");
				this.classList.toggle("select-arrow-active");
				$('.model-container .btn').removeAttr('disabled')
			});
		}

		setPrefetchedCountryCodes(config);

		function closeAllSelect(elmnt) {
			/*a function that will close all select boxes in the document,
			except the current select box:*/
			var x, y, i, xl, yl, arrNo = [];
			x = document.getElementsByClassName("select-items");
			y = document.getElementsByClassName("select-selected");
			xl = x.length;
			yl = y.length;
			for (i = 0; i < yl; i++) {
				if (elmnt == y[i]) {
					arrNo.push(i)
				} else {
					y[i].classList.remove("select-arrow-active");
				}
			}
			for (i = 0; i < xl; i++) {
				if (arrNo.indexOf(i)) {
					x[i].classList.add("select-hide");
				}
			}
		}
	}

	var loginVersionOption1 = function () {
		return `<div class="lg_obtn oauth_ggl">
			<div class="ggl_user_btn"> 
				<span class="lg_sprite lg_icon"></span> 
				<span class="g-icon-text">${EtB2b.messageLog[35]}</span>
			</div>
		</div>
		<div class="other-option-setion">
			<div class="lg_obtn oauth_lin"> 
				<span class="lg_sprite1 lg_icon"><i class="fa fa-linkedin"></i></span> 
				<span class="lin-icon-text">${EtB2b.messageLog[25]}</span>
			</div>

			<div class="lg_obtn oauth_fb">
				<div class="fb_user_btn">
					<span class="lg_sprite1 lg_icon"><i class="fa fa-facebook-f"></i></span> 
					<span class="fb-icon-text">${EtB2b.messageLog[16]}</span>								
				</div>
				<div id="fb-root"></div> 

				<div class="fb-profile-data">

					<div style="width:100%;" 
						data-onlogin="continueWithFBLogin_CB" 
						class="fb-login-button" 
						data-max-rows="1" 
						data-width="100%" 
						data-size="large" 
						data-button-type="continue_with" 
						data-layout="default" 
						data-auto-logout-link="false" 
						data-callback="alert" 
						data-use-continue-as="true">
					</div>

				</div>
			</div>
			<div class="lg_obtn oauth_lgn_email"> 
				<span class="lg_sprite1 lg_icon"><img src="/Themes/Release/images/responsive/email-icon.png" alt="" /></span> 
				<span class="lin-icon-text">Continue With Email ID</span>
			</div>
		</div>`;
	}
	var loginVersionOption2 = function () {
		return `<div class="lg_obtn oauth_ggl">
			<div class="ggl_user_btn"> 
				<span class="lg_sprite lg_icon"></span> 
				<span class="g-icon-text">${EtB2b.messageLog[35]}</span>
			</div>
		</div>
		
		<div class="lg_obtn oauth_lin"> 
			<span class="lg_sprite1 lg_icon"><i class="fa fa-linkedin"></i></span> 
			<span class="lin-icon-text">${EtB2b.messageLog[25]}</span>
		</div>
		<div class="other-option-setion">
			<div class="lg_obtn oauth_fb">
				<div class="fb_user_btn">
					<span class="lg_sprite1 lg_icon"><i class="fa fa-facebook-f"></i></span> 
					<span class="fb-icon-text">${EtB2b.messageLog[16]}</span>								
				</div>
				<div id="fb-root"></div> 

				<div class="fb-profile-data">

					<div style="width:100%;" 
						data-onlogin="continueWithFBLogin_CB" 
						class="fb-login-button" 
						data-max-rows="1" 
						data-width="100%" 
						data-size="large" 
						data-button-type="continue_with" 
						data-layout="default" 
						data-auto-logout-link="false" 
						data-callback="alert" 
						data-use-continue-as="true">
					</div>

				</div>
			</div>
			<div class="lg_obtn oauth_lgn_email"> 
				<span class="lg_sprite1 lg_icon"><img src="/Themes/Release/images/responsive/email-icon.png" alt="" /></span> 
				<span class="lin-icon-text">Continue With Email ID</span>
			</div>
		</div>`;
	}

	var loginVersionOption3 = function () {
		return `<div class="lg_obtn oauth_ggl">
			<div class="ggl_user_btn"> 
				<span class="lg_sprite lg_icon"></span> 
				<span class="g-icon-text">${EtB2b.messageLog[35]}</span>
			</div>
		</div>
		
		<div class="lg_obtn oauth_lin"> 
			<span class="lg_sprite1 lg_icon"><i class="fa fa-linkedin"></i></span> 
			<span class="lin-icon-text">${EtB2b.messageLog[25]}</span>
		</div>
		<div class="lg_obtn oauth_fb">
			<div class="fb_user_btn">
				<span class="lg_sprite1 lg_icon"><i class="fa fa-facebook-f"></i></span> 
				<span class="fb-icon-text">${EtB2b.messageLog[16]}</span>								
			</div>
			<div id="fb-root"></div> 

			<div class="fb-profile-data">

				<div style="width:100%;" 
					data-onlogin="continueWithFBLogin_CB" 
					class="fb-login-button" 
					data-max-rows="1" 
					data-width="100%" 
					data-size="large" 
					data-button-type="continue_with" 
					data-layout="default" 
					data-auto-logout-link="false" 
					data-callback="alert" 
					data-use-continue-as="true">
				</div>

			</div>
		</div>
		<div class="hide lg_obtn oauth_lgn_email" style="display:none"> 
			<span class="lg_sprite1 lg_icon"><img src="/Themes/Release/images/responsive/email-icon.png" alt="" /></span> 
			<span class="lin-icon-text">Continue With Email ID</span>
		</div>
		`;
	}

	var socialLoginSection = function () {
		// var loginVersion = EtB2b.commJs.getCookie('_gaexp');
		// if(loginVersion){
		// 	loginVersion = loginVersion.substr(loginVersion.lastIndexOf(".") + 1);
		// }
		var socialFields = '';

		if (!EtB2b.globalVar.oauthObjConfig.hide_social_logins) {
			socialFields = `<div id="social-login">
					${loginVersionOption3()}
					<div class="other-options hide">
            			<button type="button" class="btn more-signin-option">More Sign in options</button>
            		</div>
					<div class="sec-separate"></div>
				</div>
				`;
		} else {
			setTimeout(function () {
				$('.login_with_social_section fieldset').hide();
				$('.login_with_social_section #social-login, .login_with_email_section').hide();
				$('.login_with_social_section').show();
			});
		}
		// <fieldset><legend>Or use your email ID</legend></fieldset>
		return socialFields;
	}

	var showSuccessMessage = function (msg, commonStyle, popupClass = "") {
		EtB2b.model.close_pop(1);
		if (!msg) { msg = 'Success'; }
		var extraMsg = '';
		if (/<\/?[a-z][\s\S]*>/i.test(msg)) {
			extraMsg = msg;
			msg = '';
		}

		if (commonStyle && commonStyle == "y") {
			extraMsg = `<div class="user-notify-pop-box">${extraMsg}</div>`;
		}

		EtB2b.model.open_pop('', 'modal-confirm layer-out ' + popupClass, 1);
		$('#model_content_1').html(extraMsg);
		setTimeout(function () {
			if ($('.modal-confirm.layer-out').length) {
				//EtB2b.model.close_pop(1);
			}
		}, 15000);
	}


	var getGoogleSessionData = function () {
		var gtabWidth = (deviceType != 'desktop') ? 315 : 335;

		var googleBtnUI = `<div class="google-profile-data">
								<div id="g_id_onload" 
									data-callback="continueWithGoogleLogin_CB"
									data-nonce="ggl_state_id${Math.random(1, 100)}"
									data-auto_prompt="false" 
									data-ux_mode: "redirect"
									data-auto_select="false" 
									data-client_id="${EtB2b.globalVar.yoloclientid}">
								</div>
								<div class="g_id_signin" 
									data-type="standard" 
									data-size="large" 
									data-logo_alignment="left" 
									data-theme="filled_blue" 
									data-width="${gtabWidth}" 
									data-text="continue_with"  
									data-shape="circle">
								</div>
							</div>`;
		$('body').append(googleBtnUI);
		EtB2b.commJs.loadScript('https://accounts.google.com/gsi/client', function () { });
	}

	var googleSessionData = function () {
		var ggsessionData = `<div class="ggl_user_btn"><span class="lg_sprite lg_icon"></span> 
		<span class="g-icon-text">${EtB2b.messageLog[35]}</span></div>`;

		if (isChromeBrowser) {
			let googleProfileHTML = $('.google-profile-data').html();
			$('.google-profile-data').remove();

			if (googleProfileHTML) {
				ggsessionData += `<div class="ggl-profile-data">${googleProfileHTML}</div>`;

				$('.oauth_ggl').html(ggsessionData);

				setTimeout(function () {
					let continueWithGoogleNotRendered = $('.S9gUrf-YoZ4jf > div').children().length;
					if (EtB2b.globalVar.disableGooglePhotoLogin || continueWithGoogleNotRendered) {
						$('.oauth_ggl .ggl-profile-data').remove();
					}
				}, 1000)
			}

		}
	}

	var checkSubmitStatus = function () {

	}

	var initializeSocialsWithExistingSessions = function () {
		setTimeout(() => {
			getGoogleSessionData();
		},8000);
	}

	return {
		getQueryParams: getQueryParams,
		toTitleCase: toTitleCase,
		addDynamicCss: addDynamicCss,
		getCookie: getCookie,
		setCookie: setCookie,
		setLocalStorage: setLocalStorage,
		setLocalStorageWithMinExpiry: setLocalStorageWithMinExpiry,
		getLocalStorage: getLocalStorage,
		deleteLocalStorage: deleteLocalStorage,
		deleteCookie: deleteCookie,
		getUserLocation: getUserLocation,
		loadDynCss: loadDynCss,
		loadScript: loadScript,
		validateName: validateName,
		validateImage: validateImage,
		validateEmail: validateEmail,
		validateOfficialEmail: validateOfficialEmail,
		validatePassword: validatePassword,
		validateMobile: validateMobile,
		daysDiff: daysDiff,
		validateOTPCode: validateOTPCode,
		hitAjaxApi: hitAjaxApi,
		googleOneTap: googleOneTap,
		createInputField: createInputField,
		socialLoginSection: socialLoginSection,
		showSuccessMessage: showSuccessMessage,
		// fbsessionData 			: fbsessionData,
		googleSessionData: googleSessionData,
		checkSubmitStatus: checkSubmitStatus,
		autoSuggestionModule: autoSuggestionModule,
		oauthAutoComplete: oauthAutoComplete,
		validateFieldName: validateFieldName,
		autoSuggestFieldEvent: autoSuggestFieldEvent,
		initializeSocialsWithExistingSessions: initializeSocialsWithExistingSessions,
		validateFieldLocationName: validateFieldLocationName,
		autoSuggestCountryCode: autoSuggestCountryCode,
		autoSuggestSelectEvents: autoSuggestSelectEvents,
		setPrefetchedCountryCodes: setPrefetchedCountryCodes,
		setPrefetchedAutoSuggestLocation: setPrefetchedAutoSuggestLocation,
		validateUserMessage: validateUserMessage,
	}
})();

EtB2b.system = {
	login: function (propsObject, classObj) {
		function resetScreen() {
			$('#credential_picker_container, #credential_picker_iframe, #yolooverlay').remove();
			$("#sidenav").removeClass("open");
			$('body').removeClass('oh');
		}
		var classObj = classObj || '';
		resetScreen();
		oauthObjConfig = propsObject;
		var logObjType = ['boolean', 'boolean', 'number', 'string', 'boolean', 'string', 'string'];
		EtB2b.globalVar.oauthObjConfig = Object.assign(EtB2b.globalVar.oauthObjConfig, oauthObjConfig);

		EtB2b.globalVar.officialEmailLabel = EtB2b.globalVar.oauthObjConfig.mandatory_official_email ? "Official Email ID" : "Official Email ID(optional)";

		var index = 0;
		if (!EtB2b.globalVar.oauthObjConfig) {
			for (var key in EtB2b.globalVar.oauthObjConfig) {
				if (typeof EtB2b.globalVar.oauthObjConfig[key] != logObjType[index]) {
					alert("Please pass the valid configurations");
					return false;
				}
				index = index + 1;
			}
		}
		EtB2b.model.close_pop(1);
		EtB2b.model.open_pop(EtB2b.login.showLoginLayer, 'lgn_pop ' + classObj, 1);

		if (deviceType == 'desktop') {
			$('#b2boauth_check_email').focus();
		}
	},
	editProfile: function () {
		EtB2b.model.close_pop(1);
		EtB2b.model.open_pop(EtB2b.login.showEditProfileLayer, '', 1);

		if (deviceType != 'desktop') {
			$('.m_menubar').removeClass('open');
		}
		$('#edit-profile input').not('.valid, .submit-button2, .file-upload, .m-upload-pic *').eq(0).focus();
	},
	changePassword: function () {
		var respwd = "";
		EtB2b.model.open_pop(EtB2b.login.showChangePassword, '', 1);
		if (deviceType != 'desktop') {
			$('.m_menubar').removeClass('open');
		}

		$('#b2boauth_curr_password').focus();

		EtB2b.login.gtmHelper({
			event: 'change_password_widget_imp',
			login_source_type: 'native login'
		});
	},
	createPassword: function () {
		var respwd = "";
		EtB2b.model.open_pop(EtB2b.login.showCreatePassword, '', 1);
		if (deviceType != 'desktop') {
			$('.m_menubar').removeClass('open');
		}
		$('#b2boauth_new_password1').focus();
		EtB2b.login.gtmHelper({
			event: 'create_password_widget_imp',
			login_source_type: 'native login'
		});
	},
	showCompleteProfileLayer: function () {
		if (EtB2b.globalVar.is_loggedin && !oauthUserData.status_profile_completed) {
			EtB2b.model.open_pop(EtB2b.login.updateUserProfileLayer, 'update-profile-layer', 1);
			$('.profile-completion-layer input').not('.valid, .submit-button2, .file-upload, .upload-container *').eq(0).focus();
			EtB2b.login.enableEnterForSubmit('#update_profile [data-param-id="b2boauth_select_location"]', '#update_profile .submit-button2');
			if (EtB2b.globalVar.oauthObjConfig.product == 'awards') {
				$('.update-profile-layer .close').hide();
			}
		}
	},
	logout: function () {
		var logoutObject = {
			url: apiUrl + '/api/v1/user/logout',
		}
		function ajaxSuccess(data) {
			EtB2b.commJs.deleteLocalStorage('oauthUserData');
			EtB2b.commJs.deleteLocalStorage("loginToken");
			EtB2b.commJs.deleteLocalStorage("empid");
			//EtB2b.commJs.deleteLocalStorage("EtB2b.globalVar.pEmail");

			EtB2b.commJs.setCookie('OSTID' + portal_env, '', 0, '', cookies_allow_domain, true, true);
			EtB2b.commJs.setCookie('OSTPID' + portal_env, '', 0, '', cookies_allow_domain, true, true);
			EtB2b.commJs.setCookie('OSTID' + portal_env, '', 0, '', '.economictimes.indiatimes.com', true, true);
			EtB2b.commJs.setCookie('OSTPID' + portal_env, '', 0, '', '.economictimes.indiatimes.com', true, true);
			EtB2b.commJs.deleteLocalStorage('login_type');
			EtB2b.commJs.deleteLocalStorage('cancelprofilecompletion');
			EtB2b.commJs.deleteLocalStorage('cancelConsent');
			EtB2b.commJs.deleteLocalStorage('OSTPID' + portal_env);
			EtB2b.commJs.deleteLocalStorage('OSTID' + portal_env);
			sessionStorage.setItem('userlogout', true);
			EtB2b.commJs.setLocalStorage('userlogout', true, 1);
			sessionStorage.removeItem('loginBehindSession');
			localStorage.removeItem('gtmUserSession');
			localStorage.removeItem('userBookmarksInfo');
			clearNewsLetterStates();

			// Social Login Flow Related
			localStorage.removeItem('postMessage.responseCallback');
			localStorage.removeItem('login.social');
			// Ends 
			// $('#top-login-btn, #mb_top-login-btn').show();
			$('#logged_username, #mb_logged_username').html('').hide();
			EtB2b.globalVar.is_loggedin = 0;

			if (window.google && window.google.accounts && window.google.accounts.id) {
				google.accounts.id.disableAutoSelect();
			}

			if (deviceType != 'desktop') {
				$('.m_menubar').removeClass('open');
			}
			window.location.reload(true);
		}
		function ajaxError(data) {
			try {
				ajaxSuccess(data);

			} catch (e) {
				console.log(e);
			}

			if (window.google && window.google.accounts && window.google.accounts.id) {
				google.accounts.id.disableAutoSelect();
			}

			sessionStorage.setItem('userlogout', true);
		}
		EtB2b.commJs.hitAjaxApi(logoutObject, ajaxSuccess, ajaxError);

		if (portal_product == "portal_masterclass" && $(window).width() < 768) {
			$('.header__profile-section').addClass('hide');
		}
	},
	savedStories: function(){

	}
};

EtB2b.login = (function () {
	var gtmHelper = function (config) {
		let logSource = EtB2b.commJs.getLocalStorage('logSource');
		var isValidGTMCase = EtB2b.utils.isOperatable(config) && typeof dataLayer != "undefined" && dataLayer;
		var productName = portal_product == "product_main" ? "product_news" : portal_product;
		productName = sessionStorage.getItem('loginBehindSession') ? productName + ' - Custom Login Popup - {' + layerVisiblePortal[ET_PORTAL] + '}' : productName;
		var triggerPosition = logSource || "Header";
		var gtmGlobals = sessionStorage.getItem('gtmGlobals');
		var singleEventInSingleSession = ["login_completed", "login_completed_crosswalk"].includes(config.event);
		
		var props = {
			portal_name: ET_PORTAL,
			product_case: (logSource) ? productName +' - '+ logSource : productName
		};

		var obj = {
			getGTMSession: function () {
				let gtmUserSession = localStorage.getItem('gtmUserSession');

				return gtmUserSession ? JSON.parse(gtmUserSession) : {};
			},

			setGTMSession: function (gtmUserSession) {
				localStorage.setItem('gtmUserSession', JSON.stringify(gtmUserSession));
			},

			handleTriggerPosition: function () {
				gtmGlobals = gtmGlobals ? JSON.parse(gtmGlobals) : '';

				if (gtmGlobals && gtmGlobals.trigger_position) {
					triggerPosition = gtmGlobals.trigger_position;
				}
			},

			handleLoginPagePropsOnInitiate: function () {
				let gtmUserSession = this.getGTMSession();
				gtmUserSession.login_page = config.login_page;
				this.setGTMSession(gtmUserSession);
			},

			handleLoginPagePropsOnRestEvents: function () {
				let gtmUserSession = this.getGTMSession();

				if (gtmUserSession.login_page) {
					config.login_page = gtmUserSession.login_page;
				}
			},

			handleLoginPageProperty: function () {
				if (config.login_page) {
					config.login_page = config.login_page == "/" ? '/homepage' : config.login_page;
					config.login_page = config.login_page + ' & ' + triggerPosition;
				}

				config.event == 'login_initiated' ? this.handleLoginPagePropsOnInitiate() : this.handleLoginPagePropsOnRestEvents();
			},

			handleOneTimeLoginEventPerPortal: function () {

				if (singleEventInSingleSession) {
					let gtmUserSession = this.getGTMSession();
					gtmUserSession.is_login_completed_triggred = "y";

					this.setGTMSession(gtmUserSession);
				}
			},

			handleEventPropsOverrides: function () {
				if (config.event == "login_completed_crosswalk") {
					delete config.login_page;
				}
			},

			triggerGTMEvent: function () {
				props = Object.assign(props, config);
				if (false) {
					var abTestVersion = loginVersion ? '_v' + loginVersion : '';
					props.event = props.event + abTestVersion;
				}
				// To update GTM profile
				let updateProfileEvents = ['user_profile_updated', 'login_completed']

				if (updateProfileEvents[1].includes(props.event)) {
					setTimeout(function () {
						props.eid = oauthUserData.eid;
						EtB2b.utils.devConsole(props.event, props);
						dataLayer.push(props);
					}, 3000);

				} else {
					EtB2b.utils.devConsole(props.event, props);
					dataLayer.push(props);
				}


				if (updateProfileEvents.includes(props.event)) {
					gtmUpdateUserProfile();
				}
			},

			processEvents: function () {
				if (isValidGTMCase) {
					this.handleTriggerPosition();
					this.handleLoginPageProperty();
					this.handleEventPropsOverrides();
					this.triggerGTMEvent();
					this.handleOneTimeLoginEventPerPortal();
				}
			},

			init: function () {
				try {
					let is_login_completed_triggred = this.getGTMSession().is_login_completed_triggred;

					is_login_completed_triggred && singleEventInSingleSession ? false : this.processEvents();

				} catch (e) {
					EtB2b.utils.devConsole('GTM event error', e);
				}
			}
		};

		obj.init();
	};

	var fireGtmProfileUpdateEvent = function (response) {
		EtB2b.login.gtmHelper({
			event: 'user_profile_updated',
			new_updated_fields: function () {
				let arr = [];
				let userData = EtB2b.commJs.getLocalStorage('oauthUserData').data;
				let updatedUserData = response.data;

				let keysToMatchAsUpdated = [
					'city',
					'company',
					'designation',
					'first_name',
					'last_name',
					'mobile',
					'official_email',
					'profile_photo',
					'isd_code'
				];

				if (EtB2b.utils.isOperatable(userData) && EtB2b.utils.isOperatable(updatedUserData)) {
					for (i in keysToMatchAsUpdated) {
						let propsName = keysToMatchAsUpdated[i];

						if (updatedUserData[propsName] != userData[propsName]) {
							arr.push(propsName);
						}
					}
				}

				return arr;
			}()
		});
	};

	var loginWithFacebook = function (param) {
		let logSource = EtB2b.commJs.getLocalStorage('logSource');
		EtB2b.login.gtmHelper({
			event: 'login_initiated',
			login_source: 'facebook',
			login_source_type: logSource || login_source_info ? login_source_info : 'native login',
			login_page: window.location.pathname
		});

		if (param == 'fb-profile-data') {
			b2bSocialLogin('facebook');

		} else {
			b2bSocialLogin('facebook', 'native');
		}

	};

	var loginWithLinkedin = function () {
		let logSource = EtB2b.commJs.getLocalStorage('logSource');
		EtB2b.login.gtmHelper({
			event: 'login_initiated',
			login_source: 'LinkedIn',
			login_source_type: logSource || login_source_info ? login_source_info : 'native login',
			login_page: window.location.pathname
		});

		b2bSocialLogin('linkedin');
	};

	var loginWithGoogle = function (param) {
		let logSource = EtB2b.commJs.getLocalStorage('logSource');
		EtB2b.login.gtmHelper({
			event: 'login_initiated',
			login_source: 'google',
			login_source_type: logSource || login_source_info ? login_source_info : 'native login',
			login_page: window.location.pathname
		});

		if (param == 'ggl-profile-data') {
			b2bSocialLogin('google');
		} else {
			b2bSocialLogin('google', 'native');
		}

	};

	var handle_login_wrapper = function (type, obj) {
		var login_type = type.login_type,
			obj = type.access_token;
		handle_login_result(login_type, obj);
	};

	var handle_login_result = function (login_type, obj) {
		$('.showloader').show();
		if (!login_type) {
			login_type = 'facebook';
		}
		EtB2b.commJs.setLocalStorage('login_type', login_type, 1);
		var source = 'direct';
		if (typeof $_GET['utm_source'] === 'undefined' || $_GET['utm_source'] === null) {
			source = 'direct_' + ec_detail_file;
		} else {
			source = $_GET['utm_source'] + '_' + ec_detail_file;
		}

		EtB2b.model.close_pop(1);
		EtB2b.commJs.setLocalStorage('loginToken', obj, 1);
		if (typeof loginCallback != "undefined" && loginCallback) {
			loginCallback(obj);
		}
		userProfileStatus(1);
		EtB2b.globalVar.is_loggedin = 1;

		let logSource = EtB2b.commJs.getLocalStorage('logSource');
		EtB2b.login.gtmHelper({
			event: 'login_completed',
			login_source: login_type,
			login_source_type: logSource || login_type == 'googleyolo' ? 'YOLO' : login_source_info ? login_source_info : 'native login',
			login_page: window.location.pathname
		});
	};

	var handle_login_error = function (type, error) {
		var link = '';
		if (type == 'email') {
			$('#b2boauth_check_email_err').html(error);
		} else {
			if (false && (type == 'linkedin' || type == 'facebook' || type == 'google')) {
				link = 'onclick="EtB2b.login.loginWith' + type + '()"';
			} else {
				link = "onclick=\"EtB2b.model.close_pop(1);EtB2b.model.open_pop(EtB2b.login.showLoginLayer, 'lgn_pop', 1); \"";
			}
			EtB2b.model.close_pop(1);
			var newlid = 1;
			$('#model_content_' + newlid).html('<h3>' + error + '</h3>' + ((link) ? ('<a ' + link + ' class="back-to-register">Please click here to retry.</a>') : ''));
		}

		EtB2b.login.gtmHelper({
			event: 'login_failed',
			login_source: type,
			login_source_type: type == 'googleyolo' ? 'YOLO' : 'native login',
			login_page: window.location.pathname,
			failure_reason: error
		});
	};

	var showLoginLayer = function (lid) {
		var rem_email = '';
		rem_email = EtB2b.commJs.getCookie('remuserinfo' + portal_env);

		if (EtB2b.globalVar.oauthObjConfig.registration_variant == 2) {
			let modelHtml = `
			<div class="model-content row">
				<a class="back-lgn-pop sprite-icon-img"></a>
				<h2 class="brand-icon"><img src="" title="Logo" alt="" /></h2>
			    <div class="col-md-12" id="social-form">
			        <div class="login-model social-login-tabs">
			            <div class="showloader"></div>
						<div class="login_with_social_section">
							<h3 class="oauth-main-title text-center text-left-mob">
								${EtB2b.globalVar.oauthObjConfig.main_sub_title}
								<span class="hide">${EtB2b.globalVar.oauthObjConfig.main_sub_title}</span>
							</h3>
							<div id="login_model_email" class="oauth_submit_status reg-email-first clearfix">
									${EtB2b.commJs.createInputField({ fid: 'b2boauth_check_email', flabel: 'Email Address' })}
			                
									<div class="create-section marg-bottom0">
										<input type="button" 
											id="check_mail_submit" 
											class="btn submit-button2" 
											onclick="EtB2b.login.checkUserAccountStatus()" 
											value="Continue"
										>
									</div>
								</div>
								<fieldset>
									<legend>OR</legend>
								</fieldset>		
							${EtB2b.commJs.socialLoginSection()}
							<div class="create-section marg-bottom0">
							<p class="sub-stm marg-bottom0">By continuing, you agree to the 
								<a target="_blank" class="link" href="${base_url + '/terms_conditions.php'}">T&amp;C</a>, 
								<a target="_blank" class="link" href="${base_url + '/privacy_policy.php'}">Privacy Policy</a> and 
								<a target="_blank" class="link" href="${base_url + '/terms_conditions.php#prohibited_cnt'}">Prohibited Content Policy</a>. 
								This same account can be used across all ET B2B portals.
							</p>
							</div>   
						</div> 
						<div class="login_with_email_section hide">
							<h3 class="oauth-main-title">								
								${EtB2b.globalVar.oauthObjConfig.login_title}								
							</h3>
			            <div id="login_model_email" class="oauth_submit_status clearfix">
			                
			                <div class="create-section marg-bottom0">
									
										<div class="sec-separate clearfix"></div>
										<p class="sub-stm marg-bottom0">By continuing, you agree to the 
											<a target="_blank" class="link" href="${base_url + '/terms_conditions.php'}">T&amp;C</a>, 
											<a target="_blank" class="link" href="${base_url + '/privacy_policy.php'}">Privacy Policy</a> and 
											<a target="_blank" class="link" href="${base_url + '/terms_conditions.php#prohibited_cnt'}">Prohibited Content Policy</a>. 
											This same account can be used across all ET B2B portals.
										</p>							
								</div>
			            </div>
						</div>			            
			        </div>
			    </div>


			    <div class="col-md-12" id="login-form" style="display: none;">
			        <div class="login-model">
			            <div class="showloader"></div>
			            <h3 class="oauth-login-title marg-bottom34">
			                ${EtB2b.globalVar.oauthObjConfig.login_title}
			                <span>${EtB2b.globalVar.oauthObjConfig.login_sub_title}</span>
			            </h3>
			            
			            <div id="login_model" class="oauth_submit_status clearfix">
			                ${EtB2b.commJs.createInputField({ fid: 'b2boauth_log_email', flabel: 'Email ID', addAttributes: [{ name: 'readonly', value: 'true' }], fclass: 'readonly', textButtonName: 'Edit', textButtonClass: 'link edit-oauth-input' })}
			                ${EtB2b.commJs.createInputField({ fid: 'b2boauth_log_pswd', flabel: 'Password', ftype: 'password' })}
			                <div class="section"> <label for="remember_me" class="remember"><input type="checkbox" id="remember_me" checked=""> Remember me</label></div>   
			                <a id="forgot_pswd_link" class="forgot forgot_pswd_link">Forgot your password?</a>
			                <p id="b2boauth_log_main_err" class="error error_info"></p>
			                
			                <div class="create-section marg-bottom0">
			                    <input type="button" 
			                            id="log_submit" 
			                            class="btn submit-button2" 
			                            onclick="EtB2b.login.loginUser()" 
			                            value="Log in" disabled> 
			                    <input type="button" 
			                            id="log_submit_pwd" 
			                            class="btn submit-button2 btn-light" 
			                            onclick="EtB2b.login.loginWithoutPassword()" 
			                            value="Log in without password">
			                </div>
			            </div>
						<div class="sec-separate clearfix"></div>
			            <div class="log_popup_bottom oauth-bottom-login model-bottom">
						<p class="sub-stm marg-bottom0">By continuing, you agree to the 
							<a target="_blank" class="link" href="${base_url + '/terms_conditions.php'}">T&amp;C</a>, 
							<a target="_blank" class="link" href="${base_url + '/privacy_policy.php'}">Privacy Policy</a> and 
							<a target="_blank" class="link" href="${base_url + '/terms_conditions.php#prohibited_cnt'}">Prohibited Content Policy</a>. 
							This same account can be used across all ET B2B portals.
						</p>
								Don't have the Economic Times B2Bs account? <a class="signup link">Create one</a>
							</div>
			        </div>
			    </div>
            
			    <div id="forgot_psswrd" class="col-md-12" style="display: none;">
			        <div id="resetotp_model" class="resetotp-model oauth_submit_status" style="display: none;">
			            <div class="showloader"></div>
			            <div class="optsubmit">
			                <div class="info_bg"> 
			                    We have <span class="optsent">sent</span> 
			                    a verification code at<br /> 
			                    
			                    <span class="login_id_display"></span>. 
			                    
			                    Please enter the code below to verify your email.
			                </div>

			                <div class="create-section input_sec clearfix"> 
			                    <a onclick="EtB2b.login.forgotPassword('resend')" class="resend">Resend</a> 
			                    <input required id="b2boauth_frgt_pswd_code" maxlength="6" placeholder="" class="input_txt_box" /> 
			                    <label for="b2boauth_frgt_pswd_code">Verification Code</label>
			                    <p class="error" id="b2boauth_frgt_pswd_code_err"></p>
			                </div>

			                ${EtB2b.commJs.createInputField({ fid: 'b2boauth_frgt_pswd_password', flabel: 'Create password', ftype: 'password' })}
			                
			                <div class="create-section clearfix text-center">
			                    <input type="button" 
			                            class="btn submit-button2" 
			                            value="Continue" 
			                            onclick="EtB2b.login.verifyForgotPassword()" disabled>
			                    <a id="login_back_link" class="backto-login hide">Back to login</a>
			                </div>
			            </div>
			            <div class="otpsuccess" style="display: none;">
			                <h3>${EtB2b.messageLog[39]}</h3>
			                <div class="create-section clearfix text-center">
			                    <a id="login_back_link" class="backto-login hide">Back to login</a>
			                </div>
			            </div>
			        </div>
			            
			        <div id="reset_model" class="reset-model oauth_submit_status">
			            <div class="showloader"></div>
			            <h3>Reset your password <span> Enter the email ID used while creating your account.</span></h3>
			            <p id="main_err_frgt_pwd" class="success_msg"></p>
			            
			            ${EtB2b.commJs.createInputField({ fid: 'b2boauth_frgt_pswd_email', flabel: 'Email ID' })}
			            
			            <div class="create-section clearfix text-center">
			                <input type="button" class="btn submit-button2" value="Continue" onclick="EtB2b.login.forgotPassword()"/>
			                <a id="login_back_link" class="backto-login hide">Back to login</a>
			            </div>
			        </div>
			    </div>

            
			    <div id="signup-form" class="form-two-clm col-md-12 oauth-reg-variant2" style="display: none;">
			        <div class="login-model">
			            <h3>${EtB2b.globalVar.oauthObjConfig.registration_title}
			                <span>${EtB2b.globalVar.oauthObjConfig.registration_sub_title}</span></h3>

			            <div class="oauth-reg-2ndVariant">
			                <div id="registration_model" class="registration-model oauth_submit_status clearfix">
			                    <div class="showloader"></div>
			                    ${EtB2b.commJs.createInputField({
				fid: 'b2boauth_registration_email',
				flabel: 'Email ID',
				addAttributes: [{
					name: 'readonly', value: 'true'
				}],
				fclass: 'readonly',
				textButtonName: 'Edit',
				textButtonClass: 'link edit-oauth-input'
			})}

								${EtB2b.commJs.createInputField({
				fid: 'b2boauth_official_email',
				flabel: EtB2b.globalVar.officialEmailLabel
			})}
			                    
			                    <div class="input-section-main clearfix">
			                        ${EtB2b.commJs.createInputField({
				fid: 'b2boauth_first_name',
				flabel: 'First Name',
				addAttributes: [
					{ name: 'maxlength', value: "45" }]
			})}
			                        
			                        ${EtB2b.commJs.createInputField({
				fid: 'b2boauth_last_name',
				flabel: 'Last Name',
				addAttributes: [
					{ name: 'maxlength', value: "45" }]
			})}
			                    </div> 
			                    
			                    <div class="input-section-main clearfix">
			                        ${EtB2b.commJs.createInputField({
				fid: 'b2boauth_company_name',
				flabel: 'Company',
				addAttributes: [
					{ name: 'data-param-id', value: 'b2boauth_select_company' },
					{ name: 'autocomplete', value: "off" },
					{ name: 'minlength', value: "2" },
					{ name: 'maxlength', value: "255" }]
			})}
			                        
			                        ${EtB2b.commJs.createInputField({
				fid: 'b2boauth_designation_name',
				flabel: 'Designation',
				addAttributes: [
					{ name: 'data-param-id', value: 'b2boauth_select_designation' },
					{ name: 'autocomplete', value: "off" },
					{ name: 'minlength', value: "2" },
					{ name: 'maxlength', value: "255" }]
			})}
			                    </div>
			                    
			                    ${EtB2b.commJs.createInputField({ fid: 'b2boauth_registration_password', flabel: 'Create Password', ftype: 'password' })}
			                    ${EtB2b.commJs.createInputField({ fid: 'b2boauth_mobile_num', flabel: 'Mobile No', dropDown: 'true' })}
			                    ${EtB2b.commJs.createInputField({
				fid: 'b2boauth_location',
				flabel: 'Location',
				addAttributes: [
					{ name: 'data-param-id', value: 'b2boauth_select_location' },
					{ name: 'autocomplete', value: "off" }
				]
			})}
			                    
			                    <p id="reg_main_err" class="error error_info"></p>
			                    <div class="create-section"> 
			                        <label for="portal_nl_id" class="remember"> 
			                            <input type="checkbox" 
											   id="portal_nl_id"
											   class= "hide" 
											   name="oauthnewsletterId" 
											   value="${getCurrentPortalsNewsletterID()}" 
											   checked> 			                            
			                        </label>
			                    </div>
			                </div>
			                
			                <div class="create-section clearfix">			                    
			                    <input type="button" class="btn submit-button2" value="Create Account" onclick="EtB2b.login.userRegistration(${lid})" disabled />
			                    
			                </div>
			                
			            </div>
			            
			            <div class="registration-otp-model" style="display: none;">
			                <div class="showloader"></div>
			                <div class="info_bg">
			                    We have <span class="optsent">sent</span> you a verification code at <span class="reg_id_display"></span>. 
			                    Please enter the code below to verify your email.
			                </div>
			                
			                ${EtB2b.commJs.createInputField({ fid: 'b2boauth_registration_code', flabel: 'Verification Code', maxlength: '6', textButtonName: 'Resend', textButtonClass: 'disable-link link oauth-reg-resend' })}
			                ${EtB2b.commJs.createInputField({ ftype: 'password', parentClass: 'hide', fid: 'b2boauth_verify_registration_password', flabel: 'Password' })}
			                
			                <div class="create-section clearfix text-center"> 
			                    <input type="button" class="btn submit-button2" value="Continue" onclick="EtB2b.login.verifyUserRegistration()" disabled />
			                    
			                </div>                
			            </div>
						<div class="sec-separate clearfix"></div>
			            <div class="log_popup_bottom oauth-bottom-reg model-bottom">
						<p class="sub-stm marg-bottom0">By continuing, you agree to the 
							<a target="_blank" class="link" href="${base_url + '/terms_conditions.php'}">T&amp;C</a>, 
							<a target="_blank" class="link" href="${base_url + '/privacy_policy.php'}">Privacy Policy</a> and 
							<a target="_blank" class="link" href="${base_url + '/terms_conditions.php#prohibited_cnt'}">Prohibited Content Policy</a>. 
							This same account can be used across all ET B2B portals.
						</p>
						Already have The Economic Times B2Bs account? <a class="cancel">Log in</a>
					</div>
			        </div>
			        
			        
			        <div class="registration-otp-success" style="display: none;">
			            <div class="cnfmtion-popup">
			                <h3>You have successfully registered with us. Please 
			                    <a class="cancel">login</a> 
			                    with the registered email ID and password.
			                </h3>
			            </div>
			        </div>        
			    </div>
			</div>`;

			$('#model_content_' + lid).html(modelHtml);
			if(theme_version != 'v4'){
				if (portal_product == 'product_microsite' || portal_product == 'product_awards') {
					$('.brand-icon img').attr('src', $('.logoWrapper a img').attr('src'));
				} else if (portal_product == 'portal_masterclass') {
					$('.brand-icon img').attr('src', $('a.header__logo img').attr('src'));
				} else {
					$('.brand-icon img').attr('src', $('.logo-footer img.footer-logo').attr('src'));
				}
			} else {
				$('.brand-icon img').attr('src', $('.site-header__logo a img.mobile-view').attr('src'));
				if (portal_product == 'product_microsite' || portal_product == 'product_awards') {
					$('.brand-icon img').attr('src', $('.logoWrapper a img').attr('src'));
				}
			}

			$('#b2boauth_company_name, #b2boauth_designation_name, #b2boauth_location').on('input mousedown', function (e) {
				EtB2b.commJs.autoSuggestFieldEvent(this, e);
			});

		} else {
			let variant1_html = `
				<div class="model-content row">
					<a class="back-lgn-pop sprite-icon-img"></a>
					<h2 class="brand-icon"><img src="" title="Logo" alt="" /></h2>
					<div class="col-md-12" id="social-form">
						<div class="login-model social-login-tabs">
							<div class="showloader"></div>
							<div class="login_with_social_section">
								<h3 class="oauth-main-title text-center text-left-mob">								
									${EtB2b.globalVar.oauthObjConfig.main_sub_title}
									<span class="hide">${EtB2b.globalVar.oauthObjConfig.main_sub_title}</span>
								</h3>
								<div id="login_model_email" class="oauth_submit_status reg-email-first clearfix">
									${EtB2b.commJs.createInputField({ fid: 'b2boauth_check_email', flabel: 'Email Address' })}
			                
									<div class="create-section marg-bottom0">
										<input type="button" 
											id="check_mail_submit" 
											class="btn submit-button2" 
											onclick="EtB2b.login.checkUserAccountStatus()" 
											value="Continue"
										>
									</div>
								</div>
								<fieldset>
									<legend>OR</legend>
								</fieldset>
									${EtB2b.commJs.socialLoginSection()}
									<div class="create-section marg-bottom0">
									<p class="sub-stm marg-bottom0">By continuing, you agree to the 
										<a target="_blank" class="link" href="${base_url + '/terms_conditions.php'}">T&amp;C</a>, 
										<a target="_blank" class="link" href="${base_url + '/privacy_policy.php'}">Privacy Policy</a> and 
										<a target="_blank" class="link" href="${base_url + '/terms_conditions.php#prohibited_cnt'}">Prohibited Content Policy</a>. 
										This same account can be used across all ET B2B portals.
									</p>
									</div>
								</div>
							<div class="login_with_email_section hide">
								<h3 class="oauth-main-title">								
									${EtB2b.globalVar.oauthObjConfig.login_title}								
								</h3>
								<div id="login_model_email" class="oauth_submit_status clearfix">
								
								<div class="create-section marg-bottom0">
									
									<div class="sec-separate clearfix"></div>
									<p class="sub-stm marg-bottom0">By continuing, you agree to the 
										<a target="_blank" class="link" href="${base_url + '/terms_conditions.php'}">T&amp;C</a>, 
										<a target="_blank" class="link" href="${base_url + '/privacy_policy.php'}">Privacy Policy</a> and 
										<a target="_blank" class="link" href="${base_url + '/terms_conditions.php#prohibited_cnt'}">Prohibited Content Policy</a>. 
										This same account can be used across all ET B2B portals.
									</p>								
								</div>
								</div>
							</div>							
						</div>
					</div>
					
					<div class="col-md-12" id="login-form" style="display:none">
						<div class="login-model">
							<div class="showloader"></div>
							<h3 class="oauth-login-title marg-bottom34">
								${EtB2b.globalVar.oauthObjConfig.signin_title}
								<span></span>
							</h3>
							<div id="login_model" class="oauth_submit_status clearfix">
								${EtB2b.commJs.createInputField({ fid: 'b2boauth_log_email', flabel: 'Email ID', addAttributes: [{ name: 'readonly', value: 'true' }], fclass: 'readonly', textButtonName: 'Edit', textButtonClass: 'link edit-oauth-input' })}
								${EtB2b.commJs.createInputField({ fid: 'b2boauth_log_pswd', flabel: 'Password', ftype: 'password' })}
								<div class="section"> <label for="remember_me" class="remember"><input type="checkbox" id="remember_me" checked=""> Remember me</label></div>	
								<a id="forgot_pswd_link" class="forgot forgot_pswd_link">Forgot your password?</a>
								<p id="b2boauth_log_main_err" class="error error_info"></p>
								<div class="create-section marg-bottom0 clearfix">
									<input type="button" 
											id="log_submit" 
											class="btn submit-button2" 
											onclick="EtB2b.login.loginUser()" 
											value="Log in" disabled> 
									<input type="button" 
											id="log_submit_pwd" 
											class="btn submit-button2 btn-light" 
											onclick="EtB2b.login.loginWithoutPassword()" 
											value="Log in without password">
								</div>
							</div>
							<div class="sec-separate clearfix"></div>
							<div class="log_popup_bottom oauth-bottom-login model-bottom">
							<p class="sub-stm marg-bottom0">By continuing, you agree to the 
								<a target="_blank" class="link" href="${base_url + '/terms_conditions.php'}">T&amp;C</a>, 
								<a target="_blank" class="link" href="${base_url + '/privacy_policy.php'}">Privacy Policy</a> and 
								<a target="_blank" class="link" href="${base_url + '/terms_conditions.php#prohibited_cnt'}">Prohibited Content Policy</a>. 
								This same account can be used across all ET B2B portals.
							</p>
								Don't have the Economic Times B2Bs account? <a class="signup link">Create one</a>
							</div>
						</div>
					</div>
					
					<div id="forgot_psswrd" class="col-md-12" style="display:none">
						<div id="resetotp_model" class="resetotp-model oauth_submit_status" style="display:none">
							<div class="showloader"></div>
							<div class="optsubmit">
								<div class="info_bg">
									We have <span class="optsent">sent</span> 
									a verification code at<br>
									<span class="login_id_display"></span>. 
									
									Please enter the code below to verify your email.
								</div>
							<div class="create-section input_sec clearfix">
								<a onclick="EtB2b.login.forgotPassword('resend')" class="resend">Resend</a> 
								<input required id="b2boauth_frgt_pswd_code" maxlength="6" placeholder="" class="input_txt_box">
								<label for="b2boauth_frgt_pswd_code">Verification Code</label>
								<p class="error" id="b2boauth_frgt_pswd_code_err"></p>
							</div>
							${EtB2b.commJs.createInputField({ fid: 'b2boauth_frgt_pswd_password', flabel: 'Create password', ftype: 'password' })}
							<div class="create-section clearfix text-center">
								<input type="button" 
										class="btn submit-button2" 
										value="Continue" 
										onclick="EtB2b.login.verifyForgotPassword()" disabled>
								<a id="login_back_link" class="backto-login hide">Back to login</a>
							</div>
						</div>

					<div class="otpsuccess" style="display:none">
						<h3>${EtB2b.messageLog[39]}</h3>
						<div class="create-section clearfix text-center">
							<a id="login_back_link" class="backto-login hide">Back to login</a>
						</div>
					</div>
				</div>
				
				<div id="reset_model" class="reset-model oauth_submit_status">
					<div class="showloader"></div>
					<h3>Reset your password <span> Enter the email used while creating your account.</span></h3>
					<p id="main_err_frgt_pwd" class="success_msg"></p>
					${EtB2b.commJs.createInputField({ fid: 'b2boauth_frgt_pswd_email', flabel: 'Email ID' })}
					<div class="create-section clearfix text-center">
						<input type="button" class="btn submit-button2" value="Continue" onclick="EtB2b.login.forgotPassword()">
						<a id="login_back_link" class="backto-login hide">Back to login</a>
					</div>
				</div>
			</div>
			<div id="signup-form" class="form-two-clm col-md-12" style="display:none">
				<div class="login-model">
					<h3>${EtB2b.globalVar.oauthObjConfig.registration_title}
						<span>${EtB2b.globalVar.oauthObjConfig.registration_sub_title}</span>
					</h3>
					<div id="registration_model" class="registration-model oauth_submit_status" class="clearfix">
						<div class="showloader"></div>
						${EtB2b.commJs.createInputField({ fid: 'b2boauth_registration_email', flabel: 'Email ID', addAttributes: [{ name: 'readonly', value: 'true' }], fclass: 'readonly', textButtonName: 'Edit', textButtonClass: 'link edit-oauth-input' })}
						${EtB2b.commJs.createInputField({ fid: 'b2boauth_registration_password', flabel: 'Create Password', ftype: 'password' })}
						<p id="reg_main_err" class="error error_info"></p>
						<div class="create-section">
							<label for="portal_nl_id" class="remember">
								<input type="checkbox" 
										name="oauthnewsletterId"
										class="hide" 
										id="portal_nl_id" 
										value="${getCurrentPortalsNewsletterID()}"
										checked> 								
								
							</label>
						</div>
						<div class="create-section marg-bottom0 clearfix">							
							<input type="button" 
									class="btn submit-button2 marg-bottom0" 
									value="Create Account" 
									onclick="EtB2b.login.userRegistration(${lid})"
									disabled>
						</div>
					</div>
					
					<div class="registration-otp-model" style="display:none">
						<div class="showloader"></div>
						<div class="info_bg">We have 
							<span class="optsent">sent</span> 
							you a verification code at <span class="reg_id_display"></span>. 
							
							Please enter the code below to verify your email.
						</div>
						${EtB2b.commJs.createInputField({ fid: 'b2boauth_registration_code', flabel: 'Verification Code', maxlength: '6', textButtonName: 'Resend', textButtonClass: 'disable-link link oauth-reg-resend' })}
						${EtB2b.commJs.createInputField({ ftype: 'password', parentClass: 'hide', fid: 'b2boauth_verify_registration_password', flabel: 'Password' })}
						<div class="create-section clearfix text-center">
							<input type="button" class="btn submit-button2" value="Continue" onclick="EtB2b.login.verifyUserRegistration()" disabled />
						</div>
					</div>
					<div class="sec-separate clearfix"></div>
					<div class="log_popup_bottom oauth-bottom-reg model-bottom">
					<p class="sub-stm marg-bottom0">By continuing, you agree to the 
						<a target="_blank" class="link" href="${base_url + '/terms_conditions.php'}">T&amp;C</a>, 
						<a target="_blank" class="link" href="${base_url + '/privacy_policy.php'}">Privacy Policy</a> and 
						<a target="_blank" class="link" href="${base_url + '/terms_conditions.php#prohibited_cnt'}">Prohibited Content Policy</a>. 
						This same account can be used across all ET B2B portals.
					</p>
						Already have The Economic Times B2Bs account? <a class="cancel">Log in</a>
					</div>
				</div>
				
				<div class="registration-otp-success" style="display:none">
					<div class="cnfmtion-popup">
						<h3>You have successfully registered with us. Please <a class="cancel">login</a> 
							with the registered email ID and password.</h3>
					</div>
				</div>
			</div>
		</div>`;

			$('#model_content_' + lid).html(variant1_html);
			if(theme_version != 'v4'){
				if (portal_product == 'product_microsite' || portal_product == 'product_awards') {
					$('.brand-icon img').attr('src', $('.logoWrapper a img').attr('src'));
				} else if (portal_product == 'portal_masterclass') {
					$('.brand-icon img').attr('src', $('a.header__logo img').attr('src'));
				} else {
					$('.brand-icon img').attr('src', $('.logo-footer img.footer-logo').attr('src'));
				}
			} else {
				$('.brand-icon img').attr('src', $('.site-header__logo a img.mobile-view').attr('src'));
			}
		}


		EtB2b.commJs.googleSessionData();
		$('#b2boauth_log_email').val('');
		$('#b2boauth_log_pswd').val('').focus();

		EtB2b.commJs.loadScript('https://connect.facebook.net/en_US/sdk.js', function () {
			FB.init({
				appId: OAUTH_FACEBOOK_APPID,
				autoLogAppEvents: true,
				xfbml: true,
				version: 'v11.0',
				status: true,
				oauth: true,
			});

			FB.getLoginStatus(function (response) {
				// console.log(response);
				if (response.authResponse == null) {
					$('.fb-profile-data').remove();
				}
			})
		});

		if (!EtB2b.globalVar.oauthObjConfig.popup_closable) {
			$('.lgn_pop .close').addClass('hide');
		}
		$('#b2boauth_check_email').val(rem_email);
		$('#b2boauth_check_email').val() ? $('#b2boauth_check_email').addClass('valid') : $('#b2boauth_check_email').removeClass('valid');
		$('#b2boauth_check_email').val() ? $('#check_mail_submit').attr('disabled', false) : $('#check_mail_submit').attr('disabled', true);
		loadloginfunctions(lid);

		EtB2b.login.enableEnterForSubmit('#login_model_email #b2boauth_check_email', '#login_model_email #check_mail_submit');
		EtB2b.login.enableEnterForSubmit('#login_model #b2boauth_log_pswd', '#login_model #log_submit');
		EtB2b.login.enableEnterForSubmit('#registration_model #b2boauth_registration_password', '#registration_model .submit-button2');
		EtB2b.login.enableEnterForSubmit('.registration-otp-model #b2boauth_registration_code', '.registration-otp-model .submit-button2');
		EtB2b.login.enableEnterForSubmit('.registration-otp-model #b2boauth_verify_registration_password', '.registration-otp-model .submit-button2');
		EtB2b.login.enableEnterForSubmit('#reset_model #b2boauth_frgt_pswd_email', '#reset_model .submit-button2');
		EtB2b.login.enableEnterForSubmit('.optsubmit #b2boauth_frgt_pswd_password', '.optsubmit .submit-button2');
		EtB2b.login.enableEnterForSubmit('.oauth-reg-2ndVariant [data-param-id="b2boauth_select_location"] ', '.oauth-reg-2ndVariant .submit-button2');
		EtB2b.login.gtmHelper({
			event: 'login_widget_imp',
			login_source_type: login_source_info ? login_source_info : 'native login',
		});
	};

	var showEditProfileLayer = function (lid) {
		$('.model-container').addClass('profile_box');
		var editProfileHTML = `<div id="edit-profile" 
									class="form5 clearfix">
									
									<div class="showloader"></div>
									<div class="main-heading clearfix">
										<h3>Edit Profile</h3> 
										<span class="subtitle"></span>
									</div>
									
									<form name="edit_profile_fm" 
										  id="edit_profile_fm" 
										  method="post" 
										  action="" 
										  enctype="multipart/form-data">
										  
										  <p id="main_err" class="error error_info"></p>
										  <div class="profile_complete profile-fields scrollable-forms">
											<div class="row">
												<div class="col-md-5 col-sm-12 m-upload-pic">
													<div class="create-section upload-section clearfix"> 
														<span class="field" id="picture_file">
															<div class="cropme" 
																 style="width: 128px; height: 128px;" 
																 attrX="200" 
																 attrY="200" 
																 data-target=".picture_post"> 
																
																<img id="img_preview" 
																	  class="filled-img" 
																	  src="" 
																	  style="width: 100%; height: 100%;" 
																	  alt="User Image"/> 
																
																<input type="file" 
																	   id="upload" 
																	   accept="image/*" 
																	   class="file-upload" 
																	   value="Upload Photo"/>

																<span class="lg_sprite oauth-remove-icon hide"></span>
																
																<div class="model-box upload-container hide">
																	<div class="model-container">
																		<div class="model-content">
																			<div class="upload-demo-wrap">
																				<div id="upload-demo"></div>
																			</div>
																		</div>
																	
																	<div class="modal-footer text-center">
																		<button type="button" id="cancel-upload" class="btn btn-inverse">Cancel</button> 
																		<button type="button" id="crop-img" class="btn">Crop</button>
																	</div>
																</div>
															</div>
														</div>
													</span> 
													
													<input name="picture" 
														   type="hidden" 
														   value="" />
												</div> 
												<label class="upload-pic" 
													   for="upload">Upload Photo</label>
												
												<p id="uploadImage_err" class="error" style="text-align: center;"></p>
											</div>
											
											<div class="col-md-7 col-sm-12">
												${EtB2b.commJs.createInputField({
			fid: 'b2boauth_email',
			flabel: 'Email ID',
			fclass: 'readonly',
			addAttributes: [
				{ name: 'readonly', value: 'true' }
			]
		})} 
													
												${EtB2b.commJs.createInputField({
			fid: 'b2boauth_official_email',
			flabel: EtB2b.globalVar.officialEmailLabel
		})}
												
												<div class="input-section-main">
													${EtB2b.commJs.createInputField({
			fid: 'b2boauth_first_name',
			flabel: 'First Name',
			addAttributes: [
				{ name: 'maxlength', value: "45" }]
		})}
													
													${EtB2b.commJs.createInputField({
			fid: 'b2boauth_last_name',
			flabel: 'Last Name',
			addAttributes: [
				{ name: 'maxlength', value: "45" }]
		})}
												</div>
												
												<div class="input-section-main">
													${EtB2b.commJs.createInputField({
			fid: 'b2boauth_company_name',
			flabel: 'Company',
			addAttributes: [
				{ name: 'data-param-id', value: 'b2boauth_select_company' },
				{ name: 'autocomplete', value: 'off' },
				{ name: 'minlength', value: "2" },
				{ name: 'maxlength', value: "255" }]
		})}

													${EtB2b.commJs.createInputField({
			fid: 'b2boauth_designation_name',
			flabel: 'Designation',
			addAttributes: [
				{ name: 'data-param-id', value: 'b2boauth_select_designation' },
				{ name: 'autocomplete', value: 'off' },
				{ name: 'minlength', value: "2" },
				{ name: 'maxlength', value: "255" }]
		})}
												</div>
												
												${EtB2b.commJs.createInputField({
			fid: 'b2boauth_mobile_num',
			flabel: 'Mobile No',
			dropDown: 'true',
			parentClass: 'show-on-data'
		})}

												${EtB2b.commJs.createInputField({
			fid: 'b2boauth_location',
			flabel: 'Location',
			addAttributes: [
				{ name: 'data-param-id', value: 'b2boauth_select_location' },
				{ name: 'autocomplete', value: 'off' }]
		})}
												
												<p id="b2boauth_profilemain_err" class="error"></p>
											</div>
											
											<div class="create-section btn-update-profile">
												<input type="button" 
													  class="btn submit-button2" 
													  name="submit_profile" 
													  onclick="EtB2b.login.userEditProfileUpdated(1);" 
													  value="Update Profile Details" disabled />
											</div>
										</div>
									</div>
								</form>
							</div>`;
		$('#model_content_' + lid).html(editProfileHTML);
		EtB2b.login.createEnableDisableFeature({ selector: '#edit-profile' })
		EtB2b.login.enableEnterForSubmit('#edit-profile [data-param-id="b2boauth_select_location"]', '#edit-profile .submit-button2');
		EtB2b.login.updateUserProfileLayer();

		$('#edit-profile input').each(function () {
			$(this).val() ? $(this).addClass('valid') : $(this).removeClass('valid');
		});

		CroppieCrop.init();

	};

	var showChangePassword = function (lid) {
		$('#model_content_' + lid).html('<div id="reset-pwd" class="password-change clearfix"><div class="showloader"></div><h3>Change Password</h3><div class="row"><div class="col-md-12"><form method="post" id="targetform"> ' + EtB2b.commJs.createInputField({ fid: 'b2boauth_curr_password', flabel: 'Current Password', ftype: 'password' }) + ' ' + EtB2b.commJs.createInputField({ fid: 'b2boauth_new_password1', flabel: 'New Password', ftype: 'password' }) + ' ' + EtB2b.commJs.createInputField({ fid: 'b2boauth_new_password2', flabel: 'Confirm New Password', ftype: 'password' }) + '<p class="error" id="main_password_err"></p><div class="create-section"><input type="button" onclick="EtB2b.login.changePasswordUpdated(1);" disabled class="btn submit-button2" name="submit_new_password" value="Continue" /></div></form></div></div></div>');
		EtB2b.login.createEnableDisableFeature({ selector: '#reset-pwd' });
		EtB2b.login.enableEnterForSubmit('#reset-pwd #b2boauth_new_password2', '#reset-pwd .submit-button2')
	};

	var showCreatePassword = function (lid) {
		$('#model_content_' + lid).html('<div id="create-pwd" class="password-create clearfix"><div class="showloader"></div><h3>Create Password</h3><div class="row"><div class="col-md-12"><form method="post" id="targetform"> ' + EtB2b.commJs.createInputField({ fid: 'b2boauth_new_password1', flabel: 'New Password', ftype: 'password' }) + ' ' + EtB2b.commJs.createInputField({ fid: 'b2boauth_new_password2', flabel: 'Confirm Password', ftype: 'password' }) + '<p class="error" id="main_password_err"></p><div class="create-section"> <input type="button" onclick="EtB2b.login.createPasswordUpdated(1);" disabled class="btn submit-button2" name="submit_new_password" value="Continue" /></div></form></div></div></div>');
		EtB2b.login.createEnableDisableFeature({ selector: '#create-pwd' });
		EtB2b.login.enableEnterForSubmit('#create-pwd #b2boauth_new_password2', '#create-pwd .submit-button2');
	};

	var changePasswordUpdated = function (lid) {
		EtB2b.login.gtmHelper({
			event: 'change_password_initiated',
			login_source_type: 'native login',
			login_source: 'email',
			login_page: window.location.pathname
		});

		var paswrd = EtB2b.utils.encodeHTML($('#b2boauth_curr_password').val());
		var new_paswrd = EtB2b.utils.encodeHTML($('#b2boauth_new_password1').val());
		var cnfm_paswrd = EtB2b.utils.encodeHTML($('#b2boauth_new_password2').val());

		empid = EtB2b.commJs.getLocalStorage('empid');

		$("#reset-pwd input").each(function () {
			if ($(this).attr('type') != 'button' && $(this).attr('type') != 'checkbox') {
				removeRequiredFields($(this));
				if (valError) { return false; }
			}
		});
		if (valError) {
			EtB2b.login.gtmHelper({
				event: 'change_password_failed',
				login_source_type: 'native login',
				login_source: 'email',
				login_page: window.location.pathname,
				failure_reason: valError
			});

			return false;
		} else {
			$('.showloader').show();
			var paramObject = {
				url: apiUrl + '/api/v1/user/' + empid + '/password-update',
				type: 'POST',
				data: { 'current_password': paswrd, 'password': new_paswrd, 'password_confirmation': cnfm_paswrd },
			}

			function ajaxSuccessCall(data) {
				$('.showloader').hide();
				EtB2b.model.close_pop(1);
				EtB2b.commJs.showSuccessMessage(`<h2>Thank You</h2><p>${EtB2b.messageLog[39]}</p>`, "y");
				loadloginfunctions();
				EtB2b.login.gtmHelper({
					event: 'change_password_completed',
					login_source_type: 'native login',
					login_source: 'email',
					login_page: window.location.pathname
				});
			}

			function ajaxErrorCall(data) {
				$('.showloader').hide();
				if (data.responseJSON.code != 200) {
					$('#b2boauth_new_password2_err').html(data.responseJSON.message).show();
				} else {
					EtB2b.model.close_pop(1);
				}

				EtB2b.login.gtmHelper({
					event: 'change_password_failed',
					login_source_type: 'native login',
					login_source: 'email',
					login_page: window.location.pathname,
					failure_reason: data.responseJSON.message
				});
			}
			EtB2b.commJs.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
		}
	};

	var checkUserAccountStatus = function () {
		var check_email = EtB2b.utils.encodeHTML($('#b2boauth_check_email').val());
		check_email = check_email.replace(/^\s+|\s+$/gm,'');
		EtB2b.globalVar.filledEmailField = check_email;
		let logSource = EtB2b.commJs.getLocalStorage('logSource');
		EtB2b.login.gtmHelper({
			event: 'login_initiated',
			login_source_type: logSource || login_source_info ? login_source_info : 'native login',
			login_source: 'email',
			login_page: window.location.pathname
		});

		$("#login_model_email input").each(function () {
			if ($(this).attr('type') != 'button' && $(this).attr('type') != 'checkbox') {
				removeRequiredFields($(this));
				if (valError) {
					EtB2b.login.gtmHelper({
						event: 'login_failed',
						login_source_type: 'native login',
						login_source: 'email',
						login_page: window.location.pathname,
						failure_reason: EtB2b.globalVar.errorValueInFlow || 'Something went wrong'
					});

					return false;
				}
			}
		});

		$('.reg_id_display').html(check_email);
		$('#b2boauth_log_email, #b2boauth_registration_email').val(check_email).addClass('valid');

		// EtB2b.commJs.setPrefetchedAutoSuggestLocation();
		EtB2b.commJs.autoSuggestCountryCode();

		if (valError) {
			EtB2b.login.gtmHelper({
				event: 'change_password_failed',
				login_source_type: 'native login',
				login_source: 'email',
				login_page: window.location.pathname,
				failure_reason: valError
			});

			return false;
		} else {
			$('.showloader').show();
			var paramObject = {
				url: apiUrl + '/api/v1/user/checkAccountExist',
				type: 'POST',
				data: { 'email': check_email },
			}

			function ajaxSuccessCall(data) {
				$('.showloader').hide();
				document.querySelectorAll('.back-lgn-pop')[0].classList.add('edit-oauth-input');
				if (data.code == 2001) {
					$('.social-login-tabs').hide();
					$('#signup-form').show();

					if (EtB2b.globalVar.oauthObjConfig.registration_variant == 1) {
						$('#b2boauth_registration_password').focus();
					} else {
						$('#b2boauth_official_email').focus();
					}
				} else if (data.code == 2003) {
					$('.social-login-tabs').hide();
					$('#login-form').show();
					$('#b2boauth_log_pswd').focus();
				} else if (data.code == 2006) {
					$('.registration-otp-model, #signup-form').show();
					$('#b2boauth_verify_registration_password').parents('.create-section').removeClass('hide');
					$('.registration-otp-model .info_bg .optsent').html('sent');
					$('.oauth-reg-2ndVariant, .registration-model').hide();
					$('.registration-otp-model .resend, #login-form, #social-form').hide();

					if (EtB2b.globalVar.oauthObjConfig.registration_variant == 2) {
						$('#social-form').show();
						$('.social-login-tabs').hide();
					}

					$('#b2boauth_registration_code').val('');
					$('#b2boauth_registration_code_err').text('');
					$('#b2boauth_registration_code').focus();
				} else {

				}

				loadloginfunctions();
			}

			function ajaxErrorCall(data) {
				$('.showloader').hide();
				if (data.responseJSON) {
					if (data.responseJSON.code != 200) {
						$('#b2boauth_check_email_err').html(data.responseJSON.message).show();
					} else if (data.responseJSON.code == 2004) {
						$('.registration-otp-model, #signup-form').show();
						$('.registration-otp-model .info_bg .optsent').html('sent');
						$('.oauth-reg-2ndVariant, .registration-model').hide();
						$('.registration-otp-model .resend, #login-form').hide();
						$('#b2boauth_registration_code').val('');
						$('#b2boauth_registration_code_err').text('');
						setTimeout(function () {
							$('.registration-otp-model .resend').fadeIn('slow');
						}, 20000);
					} else {
						EtB2b.model.close_pop(1);
					}
				} else {
					EtB2b.model.close_pop(1);
					//console.log("Error: " + errorThrown);
				}
			}
			EtB2b.commJs.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
		}
	};

	var loginWithoutPassword = function () {
		var log_email = EtB2b.utils.encodeHTML($('#b2boauth_log_email').val());
		$("#login_model_email #b2boauth_log_email").each(function () {
			if ($(this).attr('type') != 'button' && $(this).attr('type') != 'checkbox') {
				removeRequiredFields($(this));
				if (valError) { return false; }
			}
		});

		$('.reg_id_display').html(log_email);

		if (valError) {
			return false;
		} else {
			$('.showloader').show();
			var paramObject = {
				url: apiUrl + '/api/v1/user/generateSecureLoginToken',
				type: 'POST',
				data: {
					'email': log_email,
					'url_referer': window.location.href
				}
			}

			function ajaxSuccessCall(response) {

				if ($('#remember_me').is(":checked")) {
					EtB2b.commJs.setCookie('remuserinfo' + portal_env, log_email, 5);
				} else {
					EtB2b.commJs.deleteCookie('remuserinfo' + portal_env);
				}

				EtB2b.model.close_pop(1);
				$('.showloader').hide();
				const { data } = response;

				if (data.email) {
					let lmsg = `	<div class="thnks-pmsg">
									<h2 class="brand-icon">
									<img src="" title="Logo" alt=""></h2>
									<h2>Check your email</h2> 
					
									<p>If there\'s an Economic Times B2B account associated with 
										<strong>${data.email}</strong> you\'ll get an email with a link to 
										automatically log in. The link will expire in 15 minutes. 
									</p>
					
									<p>Your existing password still works, should you want to log in with it later.</p>
									<p>Still need help?
										<a href="/contact_us.php" target="_blank">Contact us</a>
									</p>
								</div>`;

					EtB2b.commJs.showSuccessMessage(lmsg);
					if(theme_version != 'v4'){
						if (portal_product == 'product_microsite' || portal_product == 'product_awards') {
							$('.brand-icon img').attr('src', $('.logoWrapper a img').attr('src'));
						} else if (portal_product == 'portal_masterclass') {
							$('.brand-icon img').attr('src', $('a.header__logo img').attr('src'));
						} else {
							$('.brand-icon img').attr('src', $('.logo-footer img.footer-logo').attr('src'));
						}
					} else {
						$('.brand-icon img').attr('src', $('.site-header__logo a img.mobile-view').attr('src'));
					}
				}

			}

			function ajaxErrorCall(response) {
				$('.showloader').hide();

				const { responseJSON } = response;

				if (responseJSON && typeof responseJSON.code != "undefined" && responseJSON.code != 200) {
					$('#b2boauth_log_email_err').html(EtB2b.messageLog[60]).show();

				} else {
					EtB2b.model.close_pop(1);
				}
			}

			EtB2b.commJs.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
		}
	};

	var createPasswordUpdated = function (lid) {
		EtB2b.login.gtmHelper({
			event: 'create_password_initiated',
			login_source_type: 'native login',
			login_source: 'email',
			login_page: window.location.pathname
		});

		var new_paswrd = EtB2b.utils.encodeHTML($('#b2boauth_new_password1').val());
		var cnfm_paswrd = EtB2b.utils.encodeHTML($('#b2boauth_new_password2').val());
		empid = EtB2b.commJs.getLocalStorage('empid');
		$("#create-pwd input").each(function () {
			if ($(this).attr('type') != 'button' && $(this).attr('type') != 'checkbox') {
				removeRequiredFields($(this));
				if (valError) { return false; }
			}
		});
		if (valError) {
			return false;
		} else {
			$('.showloader').show();
			var paramObject = {
				url: apiUrl + '/api/v1/user/' + empid + '/password-set',
				type: 'POST',
				data: { 'password': new_paswrd, 'password_confirmation': cnfm_paswrd },
			}

			function ajaxSuccessCall(data) {
				$('.showloader').hide();
				EtB2b.model.close_pop(1);
				EtB2b.commJs.showSuccessMessage(`<h2>Thank you</h2><h3>${EtB2b.messageLog[58]}</h3>`, 'y');
				loadloginfunctions();
				userProfileStatus(1);
				EtB2b.login.gtmHelper({
					event: 'create_password_completed',
					login_source_type: 'native login',
					login_source: 'email',
					login_page: window.location.pathname
				});
			}

			function ajaxErrorCall(data) {
				$('.showloader').hide();
				if (data.responseJSON.code != 200) {
					$('#main_password_err').html(data.responseJSON.message).show();
				} else {
					EtB2b.model.close_pop(1);
				}

				EtB2b.login.gtmHelper({
					event: 'create_password_failed',
					login_source_type: 'native login',
					login_source: 'email',
					login_page: window.location.pathname,
					failure_reason: data.responseJSON.message
				});

			}
			EtB2b.commJs.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
		}

	};

	var userProfileStatus = function (lid, fn_callback, fn_lid) {
		var paramObject = {
			url: apiUrl + '/api/v1/user/get',
		}

		function ajaxSuccessCall(response) {
			EtB2b.commJs.setLocalStorage('empid', response.data.eid, expireTime);
			EtB2b.commJs.setLocalStorage('oauthUserData', response, expireTime);

			window.loginSessionCallBack ? loginSessionCallBack(response.data) : false;

			if (window.location.pathname == '/l/r') {
				window.location.href = '/';
			}
			displayUserInfo(response);
			userPropertyOnCompletion(response);
			if (fn_callback && typeof fn_callback == 'function') {
				fn_lid ? fn_callback(fn_lid) : fn_callback();
			}

			clearNewsLetterStates();
			if (EtB2b.globalVar.isNewsLetterSubscriptionApplicable) {
				EtB2b.subscription.showSubscriptionContainer();
			}
		}

		function ajaxErrorCall(response) {
			console.log(response);
		}

		EtB2b.commJs.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
	};

	var updateUserProfileLayer = function (lid) {
		EtB2b.login.gtmHelper({
			event: 'user_profile_update_widget_imp'
		});

		var data = EtB2b.commJs.getLocalStorage('oauthUserData');

		if (!data) {
			userProfileStatus(1, EtB2b.login.updateUserProfileLayer, lid);
			return false;
		}

		if (EtB2b.utils.isOperatable(data)) {
			data = data.data;
			data.city = $.trim(((typeof data.city != 'undefined') && (data.city != '')) ? data.city : '');
			data.company = $.trim((typeof data.company != 'boolean') ? data.company : '');
			data.designation = $.trim((typeof data.designation != 'boolean') ? data.designation : '');
			data.email = $.trim(data.email);
			data.official_email = $.trim(data.official_email);
			data.first_name = $.trim(data.first_name);
			data.last_name = $.trim(data.last_name);
			data.mobile = $.trim((typeof data.mobile != 'boolean') ? data.mobile : '')
		}

		var updateLayerHTML = `<div id="update-profile" 
									class="form5 clearfix">
									<div class="main-heading clearfix">
										<h3>${EtB2b.messageLog[6]} 
											<span class="">
												This will help us to customise our offerings
											</span>
										</h3>
									</div>
									<form name="update_profile" 
										  id="update_profile" 
										  method="post" 
										  action="" 
										  enctype="multipart/form-data">
											
										  <div class="showloader"></div>
										  <p id="main_err" class="error error_info"></p>

										  <div class="profile-completion-layer scrollable-forms">
											${EtB2b.commJs.createInputField({
			fid: 'b2boauth_official_email',
			flabel: EtB2b.globalVar.officialEmailLabel
		})}

											<div class="input-section-main">
												${EtB2b.commJs.createInputField({
			fid: 'b2boauth_first_name',
			flabel: 'First Name',
			addAttributes: [
				{ name: 'maxlength', value: "45" }]
		})}

												${EtB2b.commJs.createInputField({
			fid: 'b2boauth_last_name',
			flabel: 'Last Name',
			addAttributes: [
				{ name: 'maxlength', value: "45" }]
		})}
											</div>
											<div class="input-section-main">
												${EtB2b.commJs.createInputField({
			fid: 'b2boauth_company_name',
			flabel: 'Company',
			addAttributes: [
				{ name: 'data-param-id', value: 'b2boauth_select_company' },
				{ name: 'autocomplete', value: 'off' },
				{ name: 'minlength', value: "2" },
				{ name: 'maxlength', value: "255" }]
		})}

												${EtB2b.commJs.createInputField({
			fid: 'b2boauth_designation_name',
			flabel: 'Designation',
			addAttributes: [
				{ name: 'data-param-id', value: 'b2boauth_select_designation' },
				{ name: 'autocomplete', value: 'off' },
				{ name: 'minlength', value: "2" },
				{ name: 'maxlength', value: "255" }]
		})}
											</div>

											${EtB2b.commJs.createInputField({
			fid: 'b2boauth_mobile_num',
			flabel: 'Mobile No',
			parentClass: 'show-on-data',
			dropDown: 'true'
		})}
											
												${EtB2b.commJs.createInputField({
			fid: 'b2boauth_location',
			flabel: 'Location',
			addAttributes: [
				{ name: 'data-param-id', value: 'b2boauth_select_location' },
				{ name: 'autocomplete', value: 'off' }]
		})}
											
											<p id="b2boauth_profilemain_err" class="error"></p>
										</div>
										
										<div class="create-section"> 
											<input type="button" 
												   class="btn submit-button2" 
												   onclick="EtB2b.login.userProfileUpdated(1);" 
												   name="submit_profile" 
												   value="Continue" disabled />
										</div>
									</form>
								</div>`;

		$('#model_content_' + lid).html(updateLayerHTML);

		$('#b2boauth_email').val(data.email);
		$('#b2boauth_official_email').val(data.official_email);
		$('#b2boauth_first_name').val(data.first_name);
		$('#b2boauth_last_name').val(data.last_name);
		$('#b2boauth_mobile_num').val(data.mobile);
		$('.picture_post').val(data.profile_photo);
		$('#b2boauth_designation_name').val(data.designation).attr('data-id', data.designation_id).attr('title', data.designation);
		$('#b2boauth_company_name').val(data.company).attr('data-id', data.company_id).attr('title', data.company);
		$('#b2boauth_location').val(data.city).attr('data-id', data.city_id).attr('title', data.city);

		EtB2b.login.createEnableDisableFeature({ selector: '#update-profile' });

		$('#b2boauth_designation_name, #b2boauth_company_name, #b2boauth_location').on('input mousedown', function (e) {
			EtB2b.commJs.autoSuggestFieldEvent(this, e);
		});

		$('#b2boauth_email').val($.trim(data.email));

		if (data.profile_photo) {
			$('.oauth-remove-icon').removeClass('hide');
			$('.upload-pic').text('Change Photo');
			$('.picture_post').val($.trim(data.profile_photo));

			$('#img_preview').attr('src', data.profile_photo).on('error', function () {
				if ($(this).attr('src')) {
					var usr_pic = "";
					if (window.oauthUserData) {
						if (oauthUserData.first_name) {
							var str = oauthUserData.first_name;
							str = str.charAt(0);
							usr_pic = '<div class="edit-profile-name-img"><span>' + str + '<span></div>';
						} else {
							usr_pic = '';
						}
					}

					$('.edit-profile-name-img').remove();
					$(this).parent().prepend(usr_pic);
					$(this).remove();
				}
			});
		}

		EtB2b.commJs.autoSuggestCountryCode({
			isd_code: data.isd_code,
			country_code: data.country_code
		});

		if (typeof data.city != "undefined" && data.city) {
			var city = data.city;
			city = city.split(',');
			var pageLocationKey = $.trim(data.city);
			var pageLocationStoreDataset = {
				"code": 200,
				"status": "SUCCESS",
				"message": "OK",
				"data": [
					{
						"city_id": $.trim(data.city_id),
						"country_code": $.trim(data.country_code),
						"isd_code": $.trim(data.isd_code),
						"country_name": $.trim(city[city.length - 1]),
						"city_name": $.trim(city[0]),
						"display_name": pageLocationKey
					}
				]
			};
			EtB2b.commJs.setPrefetchedAutoSuggestLocation(pageLocationStoreDataset);
			pageLocationStore[pageLocationKey] = pageLocationStoreDataset;

		} else {
			//EtB2b.commJs.setPrefetchedAutoSuggestLocation();
		}


		var isdCode = data.isd_code;

		setTimeout(function () {
			if (data.country_code && isdCode) {
				$('.b2boauth-custom-select .select-selected').attr('data-country-code', data.country_code);
				$('.b2boauth-custom-select .select-selected').attr('data-isd-code', isdCode);
				$('.b2boauth-custom-select .select-selected').html('+' + isdCode + '<i class="fa fa-angle-down"></i>');
			}
		}, 1000);

		$('.profile_complete input:not(.submit-button2), .profile-completion-layer input').each(function () {
			$(this).val() ? $(this).addClass('valid').attr('title', EtB2b.utils.encodeHTML($(this).val())) : $(this).removeClass('valid').removeAttr('title');
		});
	};

	var fetchUserDataFromStorage = function (param) {
		var userData = EtB2b.commJs.getLocalStorage('oauthUserData');

		if (EtB2b.utils.isOperatable(userData) && typeof userData.data != "undefined" && EtB2b.utils.isOperatable(userData.data) && typeof userData.data[param] != "undefined") {
			return userData.data[param];
		}

		return '';
	};

	var createThanksAfterProfileUpdate = function (response) {
		let heading = `Thank You`;
		let subHeading = `Your profile has been updated successfully`;
		let nlBoxHeading = `Join <span>3M+</span> professionals who follow The Economic Times B2B Newsletters to stay up to date with the latest happenings in their respective domains.`;
		let termsAndConditions = `${EtB2b.messageLog[53]}`;

		let obj = {
			generateNlList: function (response) {
				const { subscription_list, subscription_active } = response.data;
				let listUnitItems = ``;

				const CheckPortalNewsLetters = function (param) {
					return ET_PORTAL == param ? "checked" : "";
				};

				const createList = function () {
					if (EtB2b.utils.isOperatable(subscription_list)) {
						for (i in subscription_list) {
							if (!(subscription_active.includes(subscription_list[i].id))) {
								listUnitItems += `<li class="thx-nl-item">
													<input type="checkbox" 
															id="nl_id_${subscription_list[i].id}" 
															name="${subscription_list[i].portal}" 
															nl-id="${subscription_list[i].id}" 
															${CheckPortalNewsLetters(subscription_list[i].portal)}>
													<label for="nl_id_${subscription_list[i].id}">
														${subscription_list[i].display_name}
													</label>
												</li>`;
							}
						}
					}

					return listUnitItems;
				}();

				return `<ul class="scrollable-forms">${createList}</ul>`
			},

			createInnerHtml: function (response) {
				return `<section class="thx-cont scrollable-forms">
							<div class="thx-head">
								<h2>${heading}</h2>
								<h3>${subHeading}</h3>
							</div>
							<div class="thx-nl-box">
								<h4>${nlBoxHeading}</h4>
								
								<form action="#">

									${this.generateNlList(response)}

									<p id="checkNewsLetters_err" class="error-txt hide"></p>
									<div class="thx-nl-bottom">
										<div class="thx-nl-tc">
											<input type="checkbox" name="tcNewsLetters" id="tcNewsLetters">
											<label for="tcNewsLetters">${termsAndConditions}</label>
										</div>
										<button class="btn btn-thnx-nl-submit">Subscribe</button>
									</div>
									<p id="tcNewsLetters_err" class="error-txt hide"></p>
								</form>
							</div>
						</section>`;
			},

			callNewsLetterListApi: function () {
				function ajaxSuccess(response, param) {
					if (EtB2b.utils.isOperatable(response)) {
						var response = param && param == "y" ? response : JSON.parse(response);
						let htmlToEmbed = obj.createInnerHtml(response);

						EtB2b.model.open_pop(function () {
							$('.thanks-nl-screen .model-content').html(htmlToEmbed);
						}, 'thanks-nl-screen', 1);

						if (!$('.thx-nl-box ul li').length) {
							$('.thx-nl-box').remove();
						}

						EtB2b.commJs.setCookie('b2b_newslettersubs' + portal_env, 1, 5, '',cookies_allow_domain);

						obj.bindEventHelpers();
					}
				}

				function ajaxError(response) {
					console.log('Something went wrong with API');
					EtB2b.commJs.deleteCookie('b2b_newslettersubs' + portal_env, cookies_allow_domain);
				}

				window.newsletterResponse = EtB2b.commJs.getLocalStorage('newsletterResponse');
				var newsletterCookieExists = EtB2b.commJs.getCookie('b2b_newslettersubs' + portal_env);

				if (newsletterResponse && newsletterCookieExists) {
					ajaxSuccess(newsletterResponse, "y");
				} else {
					if(ET_PORTAL!="masterclass" && ET_PORTAL!="events"){
						EtB2b.commJs.hitAjaxApi({
							url: base_url + '/api/v1/newsletter/list',
							data: {
								'email': EtB2b.login.fetchUserDataFromStorage('email')
							}
						}, ajaxSuccess, ajaxError)
					}
				}
			},

			callNewsLetterSubmitApi: function () {
				let $sel = $('.thx-nl-item input[type="checkbox"]:checked');

				if ($sel.length) {
					$('#checkNewsLetters_err').addClass('hide').html(`${EtB2b.messageLog[54]}`);

					function ajaxSuccess(response) {
						clearNewsLetterStates();
						EtB2b.model.close_pop(1);
						let succcessHtml = `<div class="thx-head">
												<h2>${heading}</h2>
												<h3>${EtB2b.messageLog[55]}</h3>
											</div>`;

						EtB2b.commJs.showSuccessMessage(succcessHtml);
					}

					function ajaxError(response) {
						console.log(`${EtB2b.messageLog[56]}`);
						EtB2b.commJs.deleteCookie('b2b_newslettersubs' + portal_env, cookies_allow_domain);
						setTimeout(function () {
							EtB2b.model.close_pop(1);
						}, 5000);
					}

					EtB2b.commJs.hitAjaxApi({
						url: base_url + '/api/v1/newsletter/subscribe',
						data: {
							'email': EtB2b.login.fetchUserDataFromStorage('email'),
							'nl_id': function () {
								let nlArray = '';

								if ($sel.length > 1) {
									nlArray = [];
									$sel.each(function () {
										let ndLidAttr = $(this).attr('nl-id');
										$('[data-nl-id =' + ndLidAttr + ']').remove();
										nlArray.push(ndLidAttr);
									});

								} else {
									nlArray = $sel.attr('nl-id');
									$('[data-nl-id =' + nlArray + ']').remove();
								}

								return nlArray;
							}()
						}
					}, ajaxSuccess, ajaxError)


				} else {
					$('#checkNewsLetters_err').removeClass('hide').html(`${EtB2b.messageLog[59]}`);
				}


			},

			bindEventHelpers: function () {
				if (!EtB2b.globalVar.newsletterBoxEventsTracker) {
					$(document).on('click', '.btn-thnx-nl-submit', function (e) {
						e.preventDefault();

						let isTcChecked = $('#tcNewsLetters').is(':checked')

						if (isTcChecked) {
							$('#tcNewsLetters_err').addClass('hide').html('');
							obj.callNewsLetterSubmitApi();

						} else {
							$('#tcNewsLetters_err').html(`${EtB2b.messageLog[49]}`).removeClass('hide');
						}
					});

					$(document).on('click', '#tcNewsLetters', function () {
						$(this).is(':checked') ?
							$('#tcNewsLetters_err').addClass('hide').html('') :
							$('#tcNewsLetters_err').html(`${EtB2b.messageLog[49]}`).removeClass('hide');
					});

					$(document).on('click', '.thx-nl-item input[type="checkbox"]', function () {
						$('.thx-nl-item input[type="checkbox"]').is(':checked') ?
							$('#checkNewsLetters_err').addClass('hide').html('') :
							$('#checkNewsLetters_err').html(`${EtB2b.messageLog[59]}`).removeClass('hide');
					});

					EtB2b.globalVar.newsletterBoxEventsTracker = true;
				}
			},

			createSimpleThanksMessage: function () {
				let htmlToEmbed = `<h2>${heading}</h2>
										<h3>${subHeading}</h3>`;

				EtB2b.commJs.showSuccessMessage(htmlToEmbed, "y");
			},

			init: function () {
				// Newsletters logic is not used as of now as discussed in demo, showing just simple message
				// this.callNewsLetterListApi();
				this.createSimpleThanksMessage();

			}
		};

		obj.init();
	};

	var userProfileUpdated = function (lid) {
		var official_email = EtB2b.utils.encodeHTML($('#b2boauth_official_email').val());
		var first_name = EtB2b.utils.encodeHTML($('#b2boauth_first_name').val());
		var last_name = EtB2b.utils.encodeHTML($('#b2boauth_last_name').val());
		var company_name = EtB2b.utils.encodeHTML($('#b2boauth_company_name').val());
		var company_id = EtB2b.utils.encodeHTML($('#b2boauth_company_name').attr('data-id')) || 0;
		var designation_name = EtB2b.utils.encodeHTML($('#b2boauth_designation_name').val());
		var designation_id = EtB2b.utils.encodeHTML($('#b2boauth_designation_name').attr('data-id')) || 0;
		var location = EtB2b.utils.encodeHTML($('#b2boauth_location').val());
		var locationId = EtB2b.utils.encodeHTML($('#b2boauth_location').attr('data-id'));
		var mobile = EtB2b.utils.encodeHTML($('#b2boauth_mobile_num').val());
		var country_code = EtB2b.utils.encodeHTML($('.b2boauth-custom-select .select-selected').attr('data-country-code')) || 'In';
		var isd_code = EtB2b.utils.encodeHTML($('.b2boauth-custom-select .select-selected').attr('data-isd-code')) || 0;
		empid = EtB2b.commJs.getLocalStorage('empid');

		$("#update_profile input").each(function (e) {
			if ($(this).attr('type') != 'button' && $(this).attr('type') != 'checkbox') {
				removeRequiredFields($(this));
				if (valError) { return false; }
			}
		});

		if (valError) {
			if ($('.autocomplete-items').length)
				$('.autocomplete-items').remove();

			return false;

		} else {
			$('.showloader').show();
			var paramObject = {
				url: apiUrl + '/api/v1/user/' + empid + '/update',
				type: 'POST',
				data: {
					'first_name': first_name,
					'last_name': last_name,
					'company': company_name,
					'company_id': company_id,
					'designation': designation_name,
					'designation_id': designation_id,
					'city': location,
					'city_id': locationId,
					'country_code': country_code,
					'isd_code': isd_code,
					'mobile': mobile,
					'official_email': official_email
				}
			};

			function ajaxSuccessCall(data) {
				EtB2b.login.fireGtmProfileUpdateEvent(data);
				$('.showloader').hide();
				EtB2b.model.close_pop(1);

				if (EtB2b.globalVar.oauthObjConfig.flash_message) {
					EtB2b.login.createThanksAfterProfileUpdate(data);
				}

				loadloginfunctions();
				EtB2b.commJs.setLocalStorage('empid', data.data.eid, expireTime);
				EtB2b.commJs.setLocalStorage('oauthUserData', data, expireTime);

				//data = data.data;
				EtB2b.commJs.setLocalStorage('OSTPID' + portal_env, EtB2b.commJs.getCookie('OSTPID' + portal_env), 1);
				displayUserInfo(data);
				userPropertyOnCompletion(data);
				window.profileUpdateCallBack ? profileUpdateCallBack() : false;
			}
			function ajaxErrorCall(data) {
				$('.showloader').hide();
				showBackendErrorAgainstField(data);

			}
			EtB2b.commJs.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
		}
	};

	var userEditProfileUpdated = function (lid) {
		var email = EtB2b.utils.encodeHTML($('#b2boauth_email').val());
		var official_email = EtB2b.utils.encodeHTML($('#b2boauth_official_email').val());
		var first_name = EtB2b.utils.encodeHTML($('#b2boauth_first_name').val());
		var last_name = EtB2b.utils.encodeHTML($('#b2boauth_last_name').val());
		var company_name = EtB2b.utils.encodeHTML($('#b2boauth_company_name').val());
		var company_id = EtB2b.utils.encodeHTML($('#b2boauth_company_name').attr('data-id')) || 0;
		var designation_name = EtB2b.utils.encodeHTML($('#b2boauth_designation_name').val());
		var designation_id = EtB2b.utils.encodeHTML($('#b2boauth_designation_name').attr('data-id')) || 0;
		var location = EtB2b.utils.encodeHTML($('#b2boauth_location').val());
		var location_id = EtB2b.utils.encodeHTML($('#b2boauth_location').attr('data-id')) || 0;
		var country_code = EtB2b.utils.encodeHTML($('.b2boauth-custom-select .select-selected').attr('data-country-code')) || 'In';
		var isd_code = EtB2b.utils.encodeHTML($('.b2boauth-custom-select .select-selected').attr('data-isd-code')) || 0;
		var mobile = EtB2b.utils.encodeHTML($('#b2boauth_mobile_num').val());
		var pic = EtB2b.utils.encodeHTML($('.picture_post').val() || $('.filled-img').attr('src'));
		empid = EtB2b.commJs.getLocalStorage('empid');
		$(".profile_complete input").each(function () {
			if ($(this).attr('type') != 'button' && $(this).attr('type') != 'checkbox') {
				removeRequiredFields($(this));
				if (valError) { return false; }
			}
		});
		if (valError) {
			if ($('.autocomplete-items').length)
				$('.autocomplete-items').remove();

			return false;
		} else {
			$('.showloader').show();
			var paramObject = {
				url: apiUrl + '/api/v1/user/' + empid + '/update',
				type: 'POST',
				data: {
					'email': $.trim(email),
					'first_name': $.trim(first_name),
					'last_name': $.trim(last_name),
					'company': $.trim(company_name),
					'company_id': $.trim(company_id),
					'designation': $.trim(designation_name),
					'designation_id': $.trim(designation_id),
					'city': $.trim(location),
					'city_id': $.trim(location_id),
					'mobile': $.trim(mobile),
					'country_code': $.trim(country_code),
					'isd_code': $.trim(isd_code),
					'official_email': $.trim(official_email)
				}
			};

			if (pic != oauthUserData.profile_photo) {
				paramObject.data.profile_photo = pic;
			}

			function ajaxSuccessCall(data) {
				EtB2b.login.fireGtmProfileUpdateEvent(data);
				$('.showloader').hide();
				EtB2b.model.close_pop(1);
				EtB2b.login.createThanksAfterProfileUpdate(data);
				loadloginfunctions();
				EtB2b.commJs.setLocalStorage('empid', data.data.eid, expireTime);
				EtB2b.commJs.setLocalStorage('oauthUserData', data, expireTime);
				//data = data.data;
				EtB2b.commJs.setLocalStorage('OSTPID' + portal_env, EtB2b.commJs.getCookie('OSTPID' + portal_env), 1);
				displayUserInfo(data);
				userPropertyOnCompletion(data);
				window.editProfileUpdateCallBack ? editProfileUpdateCallBack() : false;

			}
			function ajaxErrorCall(data) {
				$('.showloader').hide();
				showBackendErrorAgainstField(data);
			}
			EtB2b.commJs.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
		}
	};

	var displayUserInfo = function (data) {
		$('.showloader').hide();
		$('.article-body .prime_paywall').remove();
		$('#credential_picker_container, #credential_picker_iframe, #yolooverlay').remove();
		EtB2b.globalVar.oauthObjConfig = Object.assign(EtB2b.globalVar.oauthObjConfig, oauthObjConfig);
		EtB2b.globalVar.officialEmailLabel = EtB2b.globalVar.oauthObjConfig.mandatory_official_email ? "Official Email ID" : "Official Email ID (optional)";
		EtB2b.commJs.setLocalStorage('oauthUserData', data, expireTime);
		var data = data.data;
		oauthUserData = data;
		login_type = EtB2b.commJs.getLocalStorage('login_type');
		EtB2b.commJs.setLocalStorage('empid', data.eid, expireTime);
		cancelprofilecompletion = EtB2b.commJs.getLocalStorage('cancelprofilecompletion');
		EtB2b.globalVar.showPasswordChange = data.password_generated;
		_profile_email = set_cookie_email = EtB2b.globalVar.pEmail = data.email;
		EtB2b.commJs.setLocalStorage('pEmail', data.email, 5);
		EtB2b.globalVar.oauthObjConfig = Object.assign(EtB2b.globalVar.oauthObjConfig, oauthObjConfig);
		EtB2b.globalVar.is_loggedin = 1;
		$('.post-text, .post-body.article-body-full .fb-comments, .post-body.article-body-full .fb-comments-disabled, .post-body.article-body-full .post-tags').removeClass('hide');
		var usr_pic = '', ext_text = '';

		if (data.profile_photo) {
			if (theme_version != 'v4' && theme_version != 'v5') {
				usr_pic = '<img loading="lazy" alt="User Image" class="unveil" src="' + data.profile_photo + '" data-src="' + data.profile_photo + '" width="18" height="18">';
			} else{
				usr_pic = '<img loading="lazy" alt="User Image" class="unveil" src="/Themes/Release/theme4/images/icons/default-user.png" data-src="' + data.profile_photo + '" width="30" height="30" />';
			}
		} else {
			if (data.first_name) {
				var str = data.first_name;
				str = str.charAt(0);
				usr_pic = '<p class="b2boauth-user-name"><span>' + str + '</span></p>';
				$('.topSignBX').css('min-width', '150px');
			} else {
				usr_pic = '<i class="fa fa-user-circle-o" aria-hidden="true"></i>';
				$('.topSignBX').css('min-width', '100px');
			}
		}
		var enablePreferences = '';
		if(ET_PORTAL !== 'b2b'){
			enablePreferences = `<li class="manage-preferences"><a href="/manage-preferences"><i class="fa fa-envelope"></i>Manage Preferences</a></li>`;
		}
		
		$('#top-login-btn, #mb_top-login-btn').hide();
		$('#logged_username, #mb_logged_username').html(usr_pic + '<a href="javascript:void(0);">Welcome' + (data.first_name ? ', ' : '') + EtB2b.commJs.toTitleCase(data.first_name) + ' ' + data.last_name + '</a><div class="hvr_bx"><ul><li><a onclick="EtB2b.system.editProfile()" href="javascript:void(0);"><i class="fa fa-pencil"></i>Edit Profile</a></li>'+enablePreferences+'<li class="change-password"><a href="javascript:void(0);" onclick="EtB2b.system.changePassword()"><i class="fa fa-key"></i>Change Password</a></li><li class="create-oauth-password"><a href="javascript:void(0);" onclick="EtB2b.system.createPassword()"><i class="fa fa-key"></i>Create Password</a></li><li><a href="javascript:void(0);" onclick="EtB2b.system.logout()"><i class="fa fa-power-off"></i>Logout</a></li></ul></div>').show();

		if (theme_version == 'v4' || theme_version == 'v5') {
			//if (deviceType != 'desktop') {
				$('.mobile-header__user button').addClass('hide');
				$('.mobile-header__user div').html(
					`<div class="mobile-header__user--head">
						<figure class="mobile-header__user--image">
							${usr_pic}
						</figure>
					
						<span class="mobile-header__user--name">${data.first_name}</span>
					</div>

					<nav class="mobile-header__callout--slot mobile-header__user--desc hide">
						<a onclick="EtB2b.system.editProfile()" tabindex="0" role="button" href="javascript:void(0);" class="mobile-header__user--edit">Edit Profile</a>
						<a href="/saved-stories/?utm_source=saved_news&utm_medium=${pageLabelName}" class="mobile-header__user--saved-stories">Saved Stories</a>
						<a href="/manage-preferences" class="mobile-header__user--manage-preferences">Manage Preferences</a>
						<a href="javascript:void(0);" tabindex="0" role="button" onclick="EtB2b.system.changePassword()" class="mobile-header__user--create-pwd change-password">Change Password</a>
						<a href="javascript:void(0);" tabindex="0" role="button" onclick="EtB2b.system.createPassword()" class="mobile-header__user--create-pwd create-oauth-password">Create Password</a>
						<a href="javascript:void(0);" tabindex="0" role="button" onclick="EtB2b.system.logout()" class="mobile-header__user--logout">logout</a>
					</nav>`
				);
			//} else {
				$('.site-header__login button').addClass('hide');
				$('.loggedin-user').html(usr_pic + '<a class="arrow-icon-down" href="javascript:void(0);" tabindex="0" role="button" rel="noreferrer nofollow"></a><div class="header-user-nav"><div class="hvr_bx"><ul><li><a onclick="EtB2b.system.editProfile()" tabindex="0" role="button" href="javascript:void(0);"><i class="fa fa-pencil"></i>Edit Profile</a></li><li class="manage-preferences"><a href="/manage-preferences" ><i class="fa fa-key"></i>Manage Preferences</a></li><li class="saved-stories"><a href="/saved-stories?utm_source=saved_news&utm_medium='+pageLabelName+'" ><i class="fa"></i>Saved Stories</a></li><li class="change-password"><a href="javascript:void(0);" tabindex="0" role="button" onclick="EtB2b.system.changePassword()"><i class="fa fa-key"></i>Change Password</a></li><li class="create-oauth-password"><a href="javascript:void(0);" tabindex="0" role="button" onclick="EtB2b.system.createPassword()"><i class="fa fa-key"></i>Create Password</a></li><li><a href="javascript:void(0);" tabindex="0" role="button" onclick="EtB2b.system.logout()"><i class="fa fa-power-off"></i>Logout</a></li></ul></div></div>').show();
				$('.loggedin-user').removeClass('hide');
			//}
		}

		if (portal_product == "portal_masterclass") {
			if ($(window).width() < 768) {
				$('#logged_username, #mb_logged_username .hvr_bx li:last-of-type').remove();
				$('#mb_logout_bottom').removeClass('hide');
				$('.header__profile-section').addClass('hide');
			}

			if (typeof prefillUserInformation != "undefined") {
				prefillUserInformation('#contact_form_bottom');
			}
		}

		if (!EtB2b.globalVar.showPasswordChange) {
			$('.change-password').hide();
			$('.create-oauth-password').show();
		} else {
			$('.create-oauth-password').hide();
			$('.change-password').show();
		}
		$('.topSignBX.user-area').addClass('oauth-loggedin');
		var cdate = new Date();
		cdate = cdate / 1000;
		var lastUpdatedTime = data.profile_updated_ts,
			scheck1 = !data.status_profile_completed && !cancelprofilecompletion;
		scheck2 = EtB2b.commJs.daysDiff(cdate, lastUpdatedTime) >= 90;
		if (scheck1 || scheck2) {
			if (!EtB2b.globalVar.oauthObjConfig.skip_profile_complete) {
				EtB2b.system.showCompleteProfileLayer();
			}
		}
		if (EtB2b.globalVar.oauthObjConfig.product == 'awards' && cancelprofilecompletion) {
			EtB2b.system.showCompleteProfileLayer();
		}

		window.userSessionCallBack ? userSessionCallBack(data) : false;

		if ($('#oauth-withoutlogin-errorflow').length) {
			$('#oauth-withoutlogin-errorflow #go_back_btn').remove();
		}


		// To handle Default Image error case
		if ($('.oauth-loggedin img').length) {
			$('.oauth-loggedin img').on('error', function () {
				var usr_pic = "";

				if (data.first_name) {
					var str = data.first_name;
					str = str.charAt(0);
					usr_pic = '<p class="b2boauth-user-name"><span>' + str + '</span></p>';
					$('.topSignBX').css('min-width', '150px');
				} else {
					usr_pic = '<i class="fa fa-user-circle-o" aria-hidden="true"></i>';
					$('.topSignBX').css('min-width', '100px');
				}
				$(this).parent().prepend(usr_pic);
				$(this).remove();

			});
		}// End
	};

	var clearFormData = function () {
		$(".lgn_pop input").each(function () {
			if ($(this).attr('type') != 'button' && $(this).attr('type') != 'checkbox') {
				$(this).val('');
				$(this).removeClass('error');
				var idd = $(this).attr('id');
				$('#' + idd + '_err').text('');
			}

			$(this).removeClass('valid');
		});
		$(".lgn_pop .show-pwd").each(function () {
			if ($(this).text() == 'Hide') {
				$(this).text('Show');
				$(this).siblings('#b2boauth_frgt_pswd_password').attr('type', 'password');
				$(this).siblings('#b2boauth_log_pswd').attr('type', 'password');
				$(this).siblings('#b2boauth_registration_password').attr('type', 'password');
			}
		});
	};

	var loadloginfunctions = function (lid) {

		$("body").on("click", ".signup", function () {
			$("#login-form, #forgot_psswrd, .registration-otp-model").hide();
			$("#signup-form,#signup-form .login-model, .oauth-reg-2ndVariant, .registration-model").fadeIn('slow');
			$('.main_info, .ostore-pwd').remove();
			$('.reg_id_display').text('');
			//$('#b2boauth_location').val(EtB2b.commJs.getUserLocation());
			clearFormData();
			$('#b2boauth_registration_email').val(EtB2b.globalVar.filledEmailField).addClass('valid');

			if (EtB2b.globalVar.oauthObjConfig.registration_variant == "1") {
				$('#b2boauth_registration_password').focus();
			} else {
				$('#b2boauth_first_name').focus();
			}
			document.querySelectorAll('.back-lgn-pop')[0].classList.add('edit-oauth-input');
			document.querySelectorAll('.back-lgn-pop')[0].classList.remove('signup');

		});

		$("body").on("click", "#signup-form .cancel", function () {
			$("#login-form, .registration-model, #login-form .login-model, #social-login, .oauth-reg-social").fadeIn('slow');
			$("#signup-form, #forgot_psswrd, .registration-otp-model, .registration-otp-success").hide();
			$('.oauth-reg-email').removeClass('show-email-form');
			$('.main_info').remove();
			clearFormData();
			$('#b2boauth_log_email').val(EtB2b.globalVar.filledEmailField).addClass('valid');
			$('#b2boauth_log_pswd').focus();
			document.querySelectorAll('.back-lgn-pop')[0].classList.add('edit-oauth-input');
			document.querySelectorAll('.back-lgn-pop')[0].classList.remove('signup');
		});

		$("body").on("change", "#b2boauth_log_email", function () {
			if ($("#b2boauth_log_email").val().length > 0) {
				$("#log_submit").removeClass("disabled")
			}
		});		

		$("body").on("click", ".forgot_pswd_link", function () {
			$("#login-form, #signup-form, .resetotp-model").hide();
			$("#forgot_psswrd, .reset-model").fadeIn('slow');
			$('.main_info').remove();
			document.querySelectorAll('.back-lgn-pop')[0].classList.add('backto-login');
			document.querySelectorAll('.back-lgn-pop')[0].classList.remove('edit-oauth-input');
			document.querySelectorAll('.back-lgn-pop')[0].classList.remove('forgot_pswd_link');
			clearFormData();

			EtB2b.login.gtmHelper({
				event: 'forget_passward_initiated',
				login_source_type: 'native login',
			});

			$('#b2boauth_frgt_pswd_email').val(EtB2b.globalVar.filledEmailField).addClass('valid').focus();
		});

		$("body").on("click", ".backto-login", function () {
			$("#forgot_psswrd, #signup-form, .otpsuccess, #social-loign").hide();
			$("#login-form").fadeIn('slow');
			clearFormData();
			$('#b2boauth_log_email').val(EtB2b.globalVar.filledEmailField).addClass('valid');
			$('#b2boauth_frgt_pswd_email').focus();
			document.querySelectorAll('.back-lgn-pop')[0].classList.add('edit-oauth-input');
			document.querySelectorAll('.back-lgn-pop')[0].classList.remove('backto-login');
		});

		$("body").on('click', '.signup-email a', function () {
			$('.oauth-reg-social').hide();
			$('.oauth-reg-email').addClass('show-email-form');
		});

		$("body").on("keypress", "#b2boauth_frgt_pswd_email", function (event) {
			if (event.which == 13) {
				event.preventDefault();
				forgot_password();
			}
		});

		$('body').on('click', '.alert .close', function () {
			$(this).parents('.alert:not(#web_join_url_div)').remove();
		});

		setTimeout(function () {
			$('.alert:not(#web_join_url_div)').fadeOut('slow');
			$('.alert:not(#web_join_url_div)').remove();
		}, 8000);

		$('body').on('click', '.edit-oauth-input', function () {
			$('.error').html('');
			$('#login-form, #forgot_psswrd, #signup-form').hide();
			$('.social-login-tabs, #social-form').show();
			$('#b2boauth_check_email').focus();
			$('#b2boauth_check_email').val(EtB2b.globalVar.filledEmailField).addClass('valid');
			document.querySelectorAll('.back-lgn-pop')[0].classList.remove('edit-oauth-input');
		});

		$('body').off('click', '.ggl_user_btn').on('click', '.ggl_user_btn', function () {
			setExclusiveSource(this);
			EtB2b.login.loginWithGoogle();
		});

		$('body').off('click', '.oauth_fb').on('click', '.oauth_fb', function () {
			setExclusiveSource(this);
			EtB2b.login.loginWithFacebook();
		});

		$('body').off('click', '.oauth_lin').on('click', '.oauth_lin', function () {
			setExclusiveSource(this);
			EtB2b.login.loginWithLinkedin();
		});

		$('body').off('click', '.oauth-reg-resend').on('click', '.oauth-reg-resend', function (e) {
			EtB2b.login.userRegistration('resend');
			e.target.classList.add('disable-link');
		});

		// Check user exist screen
		EtB2b.login.createEnableDisableFeature({ selector: '#login_model_email', noevent: 'y' });

		// registration-model
		if (EtB2b.globalVar.oauthObjConfig.registration_variant == 1) {
			EtB2b.login.createEnableDisableFeature({ selector: '.registration-model', noevent: 'y' });
		} else {
			EtB2b.login.createEnableDisableFeature({ selector: '.oauth-reg-2ndVariant' });
		}

		// login-model
		EtB2b.login.createEnableDisableFeature({ selector: '#login_model', noevent: 'y' });

		// reset_model
		EtB2b.login.createEnableDisableFeature({ selector: '#reset_model' });

		// reset_model
		EtB2b.login.createEnableDisableFeature({ selector: '#resetotp_model' });

		// registration-otp-model
		$('.registration-otp-model .input_txt_box').on('input', function (e) {
			let $sel = $('.registration-otp-model .btn.submit-button2');
			let isUnverifiedUserInputsFilled = $('#b2boauth_registration_code').val() && $('#b2boauth_verify_registration_password').val();
			let isFreshUserInputsFilledVar1 = $('#b2boauth_registration_code').val() && !$('#b2boauth_verify_registration_password').length;

			if (isFreshUserInputsFilledVar1 || isUnverifiedUserInputsFilled) {
				$sel.removeAttr('disabled');

			} else {
				$sel.attr('disabled', true);

			}

			$(this).val() ? $(this).addClass('valid') : $(this).removeClass('valid');
		});

		// more login option click
		$("body").off("click", ".paywall_container .more-signin-option").on("click", ".paywall_container .more-signin-option", function () {
			$(this).parent().prev().show().css('display', 'block!important');
			$(this).hide();
			var eventImp = abTestVersion ? 'cbs2_v' + abTestVersion : 'cbs2';
			EtB2b.login.gtmHelper({
				event: 'More Sign in options',
				portal_name: ET_PORTAL,
				login_source_type: 'Exclusive',
				product_case: 'product_news - Exclusive',
			});
			setExclusiveSource(this);
			window.moreSigninCallBack ? moreSigninCallBack() : false;
		});
		$("body").off("click", ".model-container .more-signin-option").on("click", ".model-container .more-signin-option", function () {
			$(this).parent().prev().show().css('display', 'block!important');
			$(this).hide();
			headerLoginGoogleEvent = 'all_buttons';
			EtB2b.login.gtmHelper({
				event: 'More Sign in options',
				portal_name: ET_PORTAL,
				login_source_type: login_source_info ? login_source_info : 'native login',
				product_case: (portal_product == 'product_main') ? 'product_news' : portal_product,
			});
		});
		$("body").on("click", ".lgn_pop .oauth_lgn_email", function () {
			$('.login_with_email_section').show().removeClass('hide');
			$('.login_with_social_section').hide();
		});
		$("body").off("click", ".inViewPort .prime_paywall .oauth_lgn_email").on("click", ".inViewPort .prime_paywall .oauth_lgn_email", function (e) {
			EtB2b.system.login();
			$('.login_with_email_section').show().removeClass('hide');
			$('.login_with_social_section').hide();
			EtB2b.login.checkEmailForLogin();
			e.preventDefault();
		});
	};

	var setExclusiveSource = function(args){
		if($(args).parents('.prime_paywall').length){				
			EtB2b.commJs.setLocalStorage('logSource', 'Exclusive', 1);
		}
	}

	var enableEnterForSubmit = function (src, target) {
		if ($(src).length && $(target).length) {
			$(src).off('keypress').on('keypress', function (e) {
				if (e.keyCode == 13) {
					if ($(this).val() && target.length) {
						$(target).filter(':not(:disabled)').focus().click();
					}
				}
			});
		}

	};

	var createEnableDisableFeature = function (config) {
		if (config && EtB2b.utils.isOperatable(config) && typeof config.selector != "undefined" && config.selector) {
			let $elements = $(config.selector + ' .input_txt_box');

			if ($elements.length) {
				let excludeBtn = '.btn-light, #cancel-upload, #crop-img';
				let $sel = $(config.selector + ' .btn:not(' + excludeBtn + ')');
				let isOfficialEmailMandatory = EtB2b.globalVar.oauthObjConfig.mandatory_official_email ? '' : ':not(#b2boauth_official_email)';
				let $inputBoxSel = $(config.selector + ' .input_txt_box' + isOfficialEmailMandatory);

				function handleLogics() {
					let isInputsFilled = true;

					if ($sel.length && $inputBoxSel.length) {
						if (typeof config.skip_all_fields != "undefined" && config.skip_all_fields) {
							$sel.removeAttr('disabled');

						} else {
							$inputBoxSel.each(function () {
								if (!$(this).val()) {
									isInputsFilled = false;
									return false;
								}
							});

							isInputsFilled ? $sel.removeAttr('disabled') : $sel.attr('disabled', true);
						}
					}
				}

				$elements.on('input change', function (e) {
					handleLogics();
					$(this).val() ? $(this).addClass('valid') : $(this).removeClass('valid');
				});

				if (config.noevent && config.noevent == 'y') {
					handleLogics();
					$elements.each(function () {
						$(this).val() ? $(this).addClass('valid') : $(this).removeClass('valid');
					})
				}
			}
		}
	};

	var loginUser = function (lid) {
		var otpsent = (lid == 'resend') ? 'resend' : 'sent';
		var log_email = EtB2b.utils.encodeHTML($('#b2boauth_log_email').val());
		var log_pswd = EtB2b.utils.encodeHTML($('#b2boauth_log_pswd').val());
		$('.reg_id_display').html(log_email);
		$('.ostore-pwd').remove();
		if (!$('.ostore-pwd').length && log_pswd) {
			$('body').append('<div class="ostore-pwd">' + log_pswd + '</div>');
		}

		$("#login_model input").each(function () {
			if ($(this).attr('type') != 'button' && $(this).attr('type') != 'checkbox') {
				removeRequiredFields($(this));
				if (valError) {
					EtB2b.login.gtmHelper({
						event: 'login_failed',
						login_source_type: 'native login',
						login_source: 'email',
						login_page: window.location.pathname,
						failure_reason: EtB2b.globalVar.errorValueInFlow || 'Something went wrong'
					});

					return false;
				}
			}
		});

		if (valError) {
			return false;
		} else {
			var paramObject = {
				url: apiUrl + '/api/v1/user/login',
				type: 'POST',
				data: { 'email': log_email, 'password': log_pswd, 'lpn': EtB2b.globalVar.oauthObjConfig.product },
			}
			$('.showloader').show();

			function ajaxSuccessCall(response) {
				$cookieOauthToken = response.data.access_token;

				if ($('#remember_me').is(":checked")) {
					EtB2b.commJs.setCookie('remuserinfo' + portal_env, log_email, 5);
				} else {
					EtB2b.commJs.deleteCookie('remuserinfo' + portal_env);
				}
				$('.showloader').hide();
				EtB2b.model.close_pop(1);
				EtB2b.commJs.setLocalStorage('loginToken', response, 1);
				EtB2b.commJs.deleteLocalStorage('login_type');
				$('.ostore-pwd').remove();
				let logSource = EtB2b.commJs.getLocalStorage('logSource');
				EtB2b.login.gtmHelper({
					event: 'login_completed',
					login_source_type: logSource || login_source_info ? login_source_info : 'native login',
					login_source: 'email',
					login_page: window.location.pathname
				});

				window.loginCallback ? loginCallback(response) : false;
				userProfileStatus(lid);
				EtB2b.globalVar.is_loggedin = 1;

				if ($(this).parents('.lgn_pop').length) {
					localStorage.setItem('yoloFlag', 0);
				}
			}

			function ajaxErrorCall(data) {
				$('.showloader').hide();
				if (data.responseJSON) {
					if (data.responseJSON.code == 2004) {
						$('.registration-otp-model, #signup-form').show();
						$('.registration-otp-model .info_bg .optsent').html(otpsent);
						$('.oauth-reg-2ndVariant, .registration-model').hide();
						$('.registration-otp-model .resend, #login-form').hide();
						$('#b2boauth_registration_code').val('');
						$('#b2boauth_registration_code_err').text('');
						setTimeout(function () {
							$('.registration-otp-model .resend').fadeIn('slow');
						}, 20000);

					} else if (data.responseJSON.code != 200) {
						$('#b2boauth_log_pswd_err').html(data.responseJSON.message).show();
					} else {
						EtB2b.model.close_pop(1);
						console.log("Error: " + errorThrown);
					}
				}

				clearNewsLetterStates();

				if ($(this).parents('.lgn_pop').length) {
					localStorage.setItem('yoloFlag', 0);
				}
			}
			EtB2b.commJs.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
		}
	};

	const loginViaRegistration = (log_email, log_pswd) => {
		var paramObject = {
			url: apiUrl + '/api/v1/user/login',
			type: 'POST',
			data: { 'email': log_email, 'password': log_pswd, 'lpn': EtB2b.globalVar.oauthObjConfig.product },
		}
		$('.showloader').show();

		function ajaxSuccessCall(response) {
			$cookieOauthToken = response.data.access_token;

			if ($('#remember_me').is(":checked")) {
				EtB2b.commJs.setCookie('remuserinfo' + portal_env, log_email, 5);
			} else {
				EtB2b.commJs.deleteCookie('remuserinfo' + portal_env);
			}
			$('.showloader').hide();
			EtB2b.model.close_pop(1);
			EtB2b.commJs.setLocalStorage('loginToken', response, 1);
			EtB2b.commJs.deleteLocalStorage('login_type');
			$('.ostore-pwd').remove();
			let logSource = EtB2b.commJs.getLocalStorage('logSource');
			EtB2b.login.gtmHelper({
				event: 'login_completed',
				login_source_type: logSource || login_source_info ? login_source_info : 'native login',
				login_source: 'email',
				login_page: window.location.pathname
			});

			window.loginCallback ? loginCallback(response) : false;
			userProfileStatus();
			EtB2b.globalVar.is_loggedin = 1;

			if ($(this).parents('.lgn_pop').length) {
				localStorage.setItem('yoloFlag', 0);
			}
		}

		function ajaxErrorCall(data) {
			$('.showloader').hide();
			if (data.responseJSON) {
				if (data.responseJSON.code == 2004) {
					$('.registration-otp-model, #signup-form').show();
					$('.registration-otp-model .info_bg .optsent').html(otpsent);
					$('.oauth-reg-2ndVariant, .registration-model').hide();
					$('.registration-otp-model .resend, #login-form').hide();
					$('#b2boauth_registration_code').val('');
					$('#b2boauth_registration_code_err').text('');
					setTimeout(function () {
						$('.registration-otp-model .resend').fadeIn('slow');
					}, 20000);

				} else if (data.responseJSON.code != 200) {
					$('#b2boauth_log_pswd_err').html(data.responseJSON.message).show();
				} else {
					EtB2b.model.close_pop(1);
					console.log("Error: " + errorThrown);
				}
			}

			clearNewsLetterStates();

			if ($(this).parents('.lgn_pop').length) {
				localStorage.setItem('yoloFlag', 0);
			}
		}
		EtB2b.commJs.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
	}

	var userRegistration = function (lid) {
		var otpsent = (lid == 'resend') ? 'resend' : 'sent';
		var reg_email = $('#b2boauth_registration_email').val() ? $('#b2boauth_registration_email').val() : $('.reg_id_display').text();
		reg_email = EtB2b.utils.encodeHTML(reg_email);
		$('#b2boauth_registration_email').val(reg_email);

		var reg_pwd = $('#b2boauth_registration_password').val() ? $('#b2boauth_registration_password').val() : $('.ostore-pwd').text();
		reg_pwd = EtB2b.utils.encodeHTML(reg_pwd);
		$('#b2boauth_registration_password').val(reg_pwd);
		$('.ostore-pwd').remove();

		if (!$('.ostore-pwd').length && reg_pwd) {
			$('body').append('<div class="ostore-pwd">' + reg_pwd + '</div>');
		}

		if (EtB2b.globalVar.oauthObjConfig.registration_variant != 1) {
			var official_email = EtB2b.utils.encodeHTML($('#b2boauth_official_email').val()) || '';
			var first_name = EtB2b.utils.encodeHTML($('#b2boauth_first_name').val()) || '';
			var last_name = EtB2b.utils.encodeHTML($('#b2boauth_last_name').val()) || '';
			var company_name = EtB2b.utils.encodeHTML($('#b2boauth_company_name').val()) || '';
			var designation_name = EtB2b.utils.encodeHTML($('#b2boauth_designation_name').val()) || '';
			var location = EtB2b.utils.encodeHTML($('#b2boauth_location').val()) || '';
			var location_id = EtB2b.utils.encodeHTML($('#b2boauth_location').attr('data-id')) || '';
			var company_id = EtB2b.utils.encodeHTML($('#b2boauth_company_name').attr('data-id')) || '';
			var designation_id = EtB2b.utils.encodeHTML($('#b2boauth_designation_name').attr('data-id')) || '';
			var country_code = EtB2b.utils.encodeHTML($('.b2boauth-custom-select .select-selected').attr('data-country-code')) || 'In';
			var isd_code = EtB2b.utils.encodeHTML($('.b2boauth-custom-select .select-selected').attr('data-isd-code')) || 0;
			var mobile = EtB2b.utils.encodeHTML((!$('#b2boauth_mobile_num').val()) ? '' : $('#b2boauth_mobile_num').val());
		}

		var newletterIds = [];
		newletterIds.push($("input[name='oauthnewsletterId']:checked").val());

		$('.reg_id_display').html(reg_email);
		$(".registration-model input").each(function () {
			if ($(this).attr('type') != 'button' && $(this).attr('type') != 'checkbox') {
				removeRequiredFields($(this));
				if (valError) { return false; }
			}
		});

		if (valError) {
			if ($('.autocomplete-items').length)
				$('.autocomplete-items').remove();

			return false;

		} else {
			var paramObject = {
				url: apiUrl + '/api/v1/user/register',
				type: 'POST',
				data: {
					'email': reg_email,
					'official_email': official_email,
					'password': reg_pwd,
					'nl_id': newletterIds,
					'rpn': EtB2b.globalVar.oauthObjConfig.product,
					'first_name': first_name,
					'last_name': last_name,
					'company': company_name,
					'company_id': company_id || 0,
					'designation': designation_name,
					'designation_id ': designation_id || 0,
					'city': location,
					'city_id': location_id || 0,
					'mobile': mobile,
					'country_code': country_code,
					'isd_code': isd_code
				},
			}

			if (EtB2b.globalVar.oauthObjConfig.registration_variant == 1) {
				paramObject.data.variant = 1;
				//paramObject.data.location = getFullLocationString();
			}

			$('.showloader').show();
			var val = 60;
			const updateCounter = () => {
				val = val - 1;					
				if (val == 0) {
					$('.registration-otp-model .resend-counter').hide();
					$('.registration-otp-model .oauth-reg-resend').removeClass('disable-link');
				} else {
					refreshCounter();
					$('.registration-otp-model .resend-counter').html(val);
				}
			}
			var refreshCounter = function () {
				setTimeout(function () { updateCounter(); }, 1000);				 
			}

			function ajaxSuccessCall(response) {
				EtB2b.commJs.setLocalStorage('empid', response.data.eid, expireTime);
				$('.showloader').hide();
				$('.registration-otp-model').show();
				$('.registration-otp-model').addClass('oauth-reg-nflow');
				$('#signup-form').removeClass('oauth-reg-variant2');
				$('.registration-otp-model .info_bg .optsent').html(otpsent);
				$('.oauth-reg-2ndVariant, .registration-model').hide();
				$('.registration-otp-model .resend').hide();
				$('#b2boauth_registration_code').val('').focus();
				$('#b2boauth_registration_code_err').text('');
				$('#b2boauth_verify_registration_password').parents('.create-section').remove();
				$('.registration-otp-model .oauth-reg-resend').after(`<div class="resend-counter"></div>`);
				refreshCounter();
				
				document.querySelectorAll('.back-lgn-pop')[0].classList.add('signup');
				document.querySelectorAll('.back-lgn-pop')[0].classList.remove('edit-oauth-input');

				clearNewsLetterStates();
			}

			function ajaxErrorCall(data) {
				$('.showloader').hide();
				if (data.responseJSON) {
					if (data.responseJSON.code != 200) {
						if (data.responseJSON.code == 2003) {
							$('#b2boauth_registration_email_err').html(data.responseJSON.message).show();
						} else {
							$('#b2boauth_registration_password_err').html(data.responseJSON.message).show();
						}
					} else {
						EtB2b.model.close_pop(1);
						console.log("Error: " + errorThrown);
					}
				}
				clearNewsLetterStates();
			}

			EtB2b.commJs.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
		}

		$('#b2boauth_registration_code').focus();
	};

	var verifyUserRegistration = function () {
		var regOtp = EtB2b.utils.encodeHTML($('#b2boauth_registration_code').val());
		var email = EtB2b.utils.encodeHTML($('.reg_id_display').text());
		var reg_pwd = '';
		if ($('#b2boauth_verify_registration_password').val()) {
			reg_pwd = EtB2b.utils.encodeHTML($('#b2boauth_verify_registration_password').val());
		}

		if (reg_pwd) {
			$('.ostore-pwd').remove();
			$('body').append('<div class="ostore-pwd">' + reg_pwd + '</div>');
		}

		var password = EtB2b.utils.encodeHTML($('.ostore-pwd').text());

		$('#b2boauth_registration_password').val('');
		$('#b2boauth_registration_email').val('');

		$(".registration-otp-model input").each(function () {
			if ($(this).attr('type') != 'button' && $(this).attr('type') != 'checkbox') {
				removeRequiredFields($(this));
				if (valError) { return false; }
			}
		});
		if (valError) {
			return false;
		} else {
			$('.showloader').show();
			var paramObject = {
				url: apiUrl + '/api/v1/user/verify',
				type: 'POST',
				data: { 'code': regOtp, 'email': email, 'password': password },
			}

			function ajaxSuccessCall(response) {
				loginViaRegistration(email, password);
				// $('.registration-otp-model, .login-model, #signup-form').hide();
				// $('.registration-otp-model').removeClass('oauth-reg-nflow');
				// $('.showloader').hide();
				// $('#b2boauth_log_email').removeClass('error').val($('.reg_id_display').text());
				// $('#b2boauth_log_pswd').removeClass('error').val('');
				// $('#b2boauth_log_email_err, #b2boauth_log_pswd_err').text('');
				// $('#login-form .login-model').prepend('<div class="info_bg main_info oauth-log-info">' + EtB2b.messageLog[41] + '</div>');
				// $('#login-form, #login-form .login-model').fadeIn('slow');
				// $('body .ostore-pwd').remove();
				// $('#b2boauth_log_pswd').focus();

				// setTimeout(function () {
				// 	$('.info_bg.main_info').hide();
				// }, 15000);

				window.registrationSuccessCB ? registrationSuccessCB() : false;
			}

			function ajaxErrorCall(data) {
				$('.showloader').hide();
				if (data.responseJSON.code != 200) {
					$('#b2boauth_registration_code_err').html(data.responseJSON.message).show();
				} else {
					EtB2b.model.close_pop(1);
				}
			}

			EtB2b.commJs.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
		}

		$('#b2boauth_log_pswd').focus();
	};

	var forgotPassword = function (param) {
		var otpsent = (param == 'resend') ? 'resend' : 'sent';
		var email = EtB2b.utils.encodeHTML($('#b2boauth_frgt_pswd_email').val());
		EtB2b.globalVar.filledEmailField = email;
		$('#b2boauth_reset_pswd_email').val(email);
		$('.info_bg .login_id_display').html(email);
		$('#b2boauth_frgt_pswd_code, #b2boauth_frgt_pswd_password').removeClass('error').val('');
		$('#b2boauth_frgt_pswd_password_err, #b2boauth_frgt_pswd_code_err').text('');
		$(".reset-model input").each(function () {
			if ($(this).attr('type') != 'button' && $(this).attr('type') != 'checkbox') {
				removeRequiredFields($(this));
				if (valError) { return false; }
			}
		});
		if (valError) {
			return false;
		} else {
			$('.showloader').show();
			var paramObject = {
				url: apiUrl + '/api/v1/password/reset',
				type: 'POST',
				data: { 'email': email },
			}
			function ajaxSuccessCall(data) {
				$('.showloader').hide();
				$('.resetotp-model').show();
				$('.reset-model').hide();
				$('.resetotp-model .info_bg .optsent').html(otpsent);
				$('.resetotp-model .resend').hide();
				$('#b2boauth_frgt_pswd_code').focus();
				setTimeout(function () {
					$('.resetotp-model .resend').fadeIn('slow');
				}, 20000);
				document.querySelectorAll('.back-lgn-pop')[0].classList.add('forgot_pswd_link');
				document.querySelectorAll('.back-lgn-pop')[0].classList.remove('backto-login');
			}
			function ajaxErrorCall(data) {
				$('.showloader').hide();
				if (data.responseJSON.code != 200) {
					$('#b2boauth_frgt_pswd_email_err').html(data.responseJSON.message).show();
				} else {
					EtB2b.model.close_pop(1);
				}
			}
			EtB2b.commJs.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
		}
	};

	var verifyForgotPassword = function () {
		var email = EtB2b.utils.encodeHTML($('.info_bg .login_id_display').text());
		var code = EtB2b.utils.encodeHTML($('#b2boauth_frgt_pswd_code').val());
		var password = EtB2b.utils.encodeHTML($('#b2boauth_frgt_pswd_password').val());
		$(".resetotp-model input").each(function () {
			if ($(this).attr('type') != 'button' && $(this).attr('type') != 'checkbox') {
				removeRequiredFields($(this));
				if (valError) { return false; }
			}
		});
		if (valError) {
			EtB2b.login.gtmHelper({
				event: 'forget_passward_failed',
				login_source_type: 'native login',
				failure_reason: EtB2b.globalVar.errorValueInFlow || 'Something went wrong'
			});

			return false;
		} else {
			$('.showloader').show();
			var paramObject = {
				url: apiUrl + '/api/v1/password/reset/verify',
				type: 'POST',
				data: { 'email': email, 'code': code, 'password': password },
			}
			function ajaxSuccessCall(data) {
				$('.optsubmit, #forgot_psswrd').hide();
				$('.showloader').hide();
				$('#login-form, #login-form .login-model').fadeIn('slow');
				$('#b2boauth_log_email').removeClass('error').val($('.login_id_display').text());
				$('#b2boauth_log_pswd').removeClass('error').val('');
				$('#b2boauth_log_email_err, #b2boauth_log_pswd_err').text('');
				$('#login-form .login-model').prepend('<div class="info_bg main_info oauth-log-info">' + EtB2b.messageLog[39] + '</div>');
				setTimeout(function () {
					$('.info_bg.main_info').hide();
				}, 15000);

				EtB2b.login.gtmHelper({
					event: 'forget_passward_completed',
					login_source_type: 'native login'
				});
			}
			function ajaxErrorCall(data) {
				$('.showloader').hide();
				if (data.responseJSON.code != 200) {
					$('#b2boauth_frgt_pswd_password_err').html(data.responseJSON.message).show();
					EtB2b.login.gtmHelper({
						event: 'forget_passward_failed',
						login_source_type: 'native login',
						failure_reason: data.responseJSON.message
					});
				} else {
					EtB2b.model.close_pop(1);
				}
			}
			EtB2b.commJs.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
		}
	};

	var b2bSocialLogin = function (type, flowtype) {

		let redirectionPoint = apiUrl + '/user/account/social?connect_type=' + type + '&nl_id=' + getCurrentPortalsNewsletterID() + '&client_id=' + client_id + '&callback=' + base_url + '/authorize/v1/callbackResponse';

		function regularFlow() {
			window.opener = null;
			let win = window.open(redirectionPoint, "windowname1", 'width=800, height=600');
		}

		if (['google', 'facebook'].includes(type)) {
			let loginParams = {
				type: type,
				referrer: window.location.href,
				queryStrings: $_GET
			};

			if (flowtype == 'native') {
				loginParams.flowtype = 'native';
				localStorage.setItem('login.social', JSON.stringify(loginParams));
				regularFlow();

			} else {
				localStorage.setItem('login.social', JSON.stringify(loginParams));
				window.location.href = redirectionPoint;
			}
		} else {
			regularFlow();
		}

	};

	var consentLogin = function (lid) {
		userProfileStatus(lid);
		EtB2b.model.close_pop(1);
		var paramObject = {
			url: apiUrl + '/api/v1/user/sso/onetap',
		}
		function ajaxSuccessCall(data) {
			EtB2b.commJs.setLocalStorage('oauthUserData', data, expireTime);
		}
		function ajaxErrorCall(data) { }
		EtB2b.commJs.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
	};

	var crosswalkFlow = function (lid) {
		var paramObject = {
			url: apiUrl + '/api/v1/user/get',
		}

		function ajaxSuccessCall(data) {
			EtB2b.commJs.setLocalStorage('oauthUserData', data, expireTime);
			displayUserInfo(data);
			if (typeof oauthUserData != "undefined" && Object.keys(oauthUserData).length > 0) {
				var loginSourceType = 'native login';
				var event = "login_completed"
				var registrationSource = typeof oauthUserData.registration_source != "undfined" ? oauthUserData.registration_source : 'email';

				if (document.referrer.indexOf('authorize/v1/callbackResponse') == -1) {
					loginSourceType = oauthUserData.portal ? `Crosswalk-${oauthUserData.portal}` : 'native login';
					event = 'login_completed_crosswalk';
				}
				let logSource = EtB2b.commJs.getLocalStorage('logSource');
				var obj = {
					event: event,
					login_source_type: logSource || loginSourceType,
					login_source: registrationSource,
					login_page: window.location.pathname
				}

				EtB2b.login.gtmHelper(obj);
				userPropertyOnCompletion(data);
			}			

			window.newsletterResponse = localStorage.getItem('newsletterResponse');
			$('body').append('<div class="hide" id="newsLetterResponseAPI">' + newsletterResponse + '</div>');
			EtB2b.commJs.deleteCookie('b2b_newslettersubs' + portal_env, cookies_allow_domain);
			clearNewsLetterStates();

			if (EtB2b.globalVar.isNewsLetterSubscriptionApplicable) {
				EtB2b.subscription.showSubscriptionContainer();
			}

			window.loginStatusCallBack ? loginStatusCallBack(data) : false;
		}

		function ajaxErrorCall(data) {
			EtB2b.commJs.deleteCookie('b2b_newslettersubs' + portal_env,cookies_allow_domain);
		}

		EtB2b.commJs.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
	};

	var launchLoginPopupFromAmp = function () {
		// If launched from AMP - Just trigger the popup
		if (document.referrer.indexOf('/amp/news') != -1 && !window.oauthUserData) {
			if ($('#top-login-btn').length) {
				$('#top-login-btn').trigger('click');
			}

			if ($('#mb_top-login-btn').length) {
				$('#mb_top-login-btn').trigger('click');
			}

			$('#b2boauth_check_email').addClass('valid');
			$('#check_mail_submit').removeAttr('disabled');
			$('#b2boauth_check_email').siblings('label').addClass('valid')
		}
	};

	var checkLoginStatus = function () {
		var userStatus = EtB2b.commJs.getLocalStorage("loginToken");
		var userData = EtB2b.commJs.getLocalStorage("oauthUserData");
		var userToken = EtB2b.commJs.getCookie("OSTID" + portal_env);
		var consentStatus = EtB2b.commJs.getLocalStorage('cancelConsent');
		var SSOIDToken = EtB2b.commJs.getCookie('OSSOID' + portal_env);
		var OSTPIDCookieVal = EtB2b.commJs.getCookie('OSTPID' + portal_env);
		var OSTPIDStorageVal = EtB2b.commJs.getLocalStorage('OSTPID' + portal_env);
		var portalToken = (!userData) ? '' : ((userData != null) ? userData.data.eid : '');

		if (userToken && userData) {
			if (SSOIDToken != portalToken) {
				console.log('crosswalk flow');
				EtB2b.login.crosswalkFlow(1);

			} else {
				oauthObjConfig.product = function () {
					var product_main = 'main';
					if (typeof portal_product != "undefined") {
						if (portal_product == 'product_microsite') {
							$('body').addClass('product_microsite');
							product_main = 'microsite';
						} else if (portal_product == 'product_awards') {
							$('body').addClass('product_microsite product_awards');
							product_main = 'awards';
						} else if (portal_product == 'product_webinar') {
							$('body').addClass('product_webinar');
							product_main = 'webinar';
						} else if (portal_product == 'product_masterclass') {
							$('body').addClass('product_masterclass');
							product_main = 'masterclass';
						}
					}
					return product_main;
				}();

				oauthObjConfig.popup_closable = (portal_product == 'product_awards') ? false : oauthObjConfig.popup_closable;
				EtB2b.globalVar.oauthObjConfig = Object.assign(EtB2b.globalVar.oauthObjConfig, oauthObjConfig);
				var data = userData.data;
				EtB2b.globalVar.is_loggedin = 1;

				window.loginStatusCallBack ? loginStatusCallBack(data) : false;

				if (OSTPIDCookieVal != OSTPIDStorageVal) {
					EtB2b.commJs.setLocalStorage('OSTPID' + portal_env, EtB2b.commJs.getCookie('OSTPID' + portal_env), 1);
					userProfileStatus(1);
				} else {
					displayUserInfo(userData);
				}
				let logSource = EtB2b.commJs.getLocalStorage('logSource');
				EtB2b.login.gtmHelper({
					event: 'login_completed',
					login_source_type: logSource || login_source_info ? login_source_info : 'native login',
					login_source: data.registration_source,
					login_page: window.location.pathname
				});
			}

		} else if (!userData && userToken) {
			EtB2b.login.crosswalkFlow(1);

		} else if (!userToken || consentStatus) {
			EtB2b.commJs.deleteLocalStorage("loginToken");
			EtB2b.commJs.deleteLocalStorage("oauthUserData");
			EtB2b.commJs.deleteLocalStorage("empid");
			EtB2b.commJs.deleteCookie('OSTID' + portal_env);
			if (typeof nonLoginCallBack != "undefined" && nonLoginCallBack) {
				nonLoginCallBack();
			}
			$('.post-text').removeClass('hide');
			
			window.nonLoginSessionCB ? nonLoginSessionCB() : false;
			showPrimeArticleLayer();
			// console.log('non loggedin');
			EtB2b.globalVar.oauthObjConfig = Object.assign(EtB2b.globalVar.oauthObjConfig, oauthObjConfig);
			for (let i in yoloOptinShow) {
				if($('.' + yoloOptinShow[i]).length){
					EtB2b.commJs.googleOneTap();
				}
			}
			if($('.product_microsite').length || $('.product_webinar').length){		
				EtB2b.commJs.googleOneTap();
			}
		}

		launchLoginPopupFromAmp();
	};

	var showPrimeArticleLayer = function () {
		var getIimgHeight = 0;
		var primeFlag = $('.post-body.article-body-full').attr('data-article');
		var newsAgencyName = $('.post-body .post-meta .news_agency_name a').html();
		var byLine = $('.post-body .post-meta .name-author a').html();
		if (primeFlag == '200' || (ET_PORTAL == 'hospitality') && newsAgencyName == 'ETHospitalityWorld' && byLine) {
			if (loginVersion) {
				$('.post-body.article-body-full .fb-comments-disabled, .post-body.article-body-full .post-tags').addClass('hide');
				//EtB2b.primePopup.primeLoginBehind();
				$('.article-body .Normal').addClass('prime-article');
			}
		} else {
			$('.post-body.article-body-full .prime_paywall').remove();
		}
	}

	const checkEmailForLogin = () => {
		const cnt = $('.login_with_social_section .reg-email-first').html();		
		const content = `		
		<div class="create-section marg-bottom0">									
			<div class="sec-separate clearfix"></div>
			<p class="sub-stm marg-bottom0">By continuing, you agree to the 
				<a target="_blank" class="link" href="${base_url + '/terms_conditions.php'}">T&amp;C</a>, 
				<a target="_blank" class="link" href="${base_url + '/privacy_policy.php'}">Privacy Policy</a> and 
				<a target="_blank" class="link" href="${base_url + '/terms_conditions.php#prohibited_cnt'}">Prohibited Content Policy</a>. 
				This same account can be used across all ET B2B portals.
			</p>							
		</div>
		`;
		$('.login_with_email_section #login_model_email').html(cnt + content);
		$('.login_with_social_section .reg-email-first').html('');
		loadloginfunctions();
	}


	var postMessageCallbacks = {};

	$(document).ready(function () {
		postMessageCallbacks['handle_login_error'] = handle_login_error;
		postMessageCallbacks['handle_login_result'] = handle_login_result;
		postMessageCallbacks['handle_login_wrapper'] = handle_login_wrapper;

		$(document).on('click', '.model-container .close', function () {
			// To handle Webinars/Microsites closing alerts
			if ($(this).parents('.micrositeform').length) {
				let confirmClose = confirm("It looks like you have been editing something. If you leave before saving, your changes will be lost.");

				if (confirmClose) {
					if (portal_product == "product_webinar") {
						// Webinar case
						EtB2b.model.close_pop(1);

						if ($(this).parents('.oauth_webinar_edit_form').length)
							$('.btn.register').click();

					} else if (portal_product == "product_microsite") {
						if ($(this).parents('.micrositeform').find('.ms-edit-screeen').length && typeof editPredefinedContent != "undefined") {
							editPredefinedContent(false);
						} else {
							EtB2b.model.close_pop(1);
						}
					}
				}

				return false; // stop the code by executing further in this case
			}
			// End

			let popupType = 'popup_widget_close_click';

			if ($(this).parents('.lgn_pop').length) {
				popupType = 'login_widget_close_click';
			} else if ($(this).parents('.profile_box').length) {
				popupType = 'profile_update_widget_close_click';
			} else if ($(this).parents('.newsletter_subscribe').length) {
				popupType = 'newsletter_subscribe_widget_close_click';
			}


			EtB2b.login.gtmHelper({
				event: popupType,
				product_case: (sessionStorage.getItem('loginBehindSession') || $('.show-login-layer-article').length) ? (portal_product == 'product_main') ? 'product_news - Custom Login Popup' : portal_product + '- Custom Login Popup' : (portal_product == 'product_main') ? 'product_news' : portal_product,
				login_source_type: 'native login',
				portal_name: ET_PORTAL
			});

			$(this).parents('.model-box').remove();
			$('.model-bg').remove();
			EtB2b.model.close_pop(1);

			if ($(this).parents('.update-profile-layer').length) {
				EtB2b.commJs.setLocalStorage('cancelprofilecompletion', 'true', 1);
			}
			if ($(this).parents('.lgn_pop').length) {
				$('.sticky-rgt-btm').removeClass('hide');
			}

			if ($(this).parents('.lgn_pop').length) {
				localStorage.setItem('yoloFlag', 0);
			}

		});
		$(document).on('click', '.show-pwd', function () {
			if ($(this).hasClass('oauth-eye-slash')) {
				$(this).addClass('oauth-eye').removeClass('oauth-eye-slash');
				$(this).siblings('input').attr('type', 'text');
			} else {
				$(this).addClass('oauth-eye-slash').removeClass('oauth-eye');
				$(this).siblings('input').attr('type', 'password');
			}
		});
		$(document).on('click', '.consent-window .close', function () {
			EtB2b.commJs.setLocalStorage('cancelConsent', true, 1);
		});
		// setInterval(function(){
		// 	if(EtB2b.commJs.getLocalStorage('loginToken')){
		// 		userProfileStatus();
		// 	}
		// },1500000);
	});

	return {
		loginWithFacebook: loginWithFacebook,
		loginWithLinkedin: loginWithLinkedin,
		loginWithGoogle: loginWithGoogle,
		showLoginLayer: showLoginLayer,
		showEditProfileLayer: showEditProfileLayer,
		loadloginfunctions: loadloginfunctions,
		loginUser: loginUser,
		userRegistration: userRegistration,
		forgotPassword: forgotPassword,
		updateUserProfileLayer: updateUserProfileLayer,
		userProfileUpdated: userProfileUpdated,
		userEditProfileUpdated: userEditProfileUpdated,
		crosswalkFlow: crosswalkFlow,
		consentLogin: consentLogin,
		changePasswordUpdated: changePasswordUpdated,
		showChangePassword: showChangePassword,
		verifyForgotPassword: verifyForgotPassword,
		postMessageCallbacks: postMessageCallbacks,
		handle_login_result: handle_login_result,
		handle_login_error: handle_login_error,
		handle_login_wrapper: handle_login_wrapper,
		verifyUserRegistration: verifyUserRegistration,
		checkLoginStatus: checkLoginStatus,
		createPasswordUpdated: createPasswordUpdated,
		showCreatePassword: showCreatePassword,
		checkUserAccountStatus: checkUserAccountStatus,
		loginWithoutPassword: loginWithoutPassword,
		createThanksAfterProfileUpdate: createThanksAfterProfileUpdate,
		fetchUserDataFromStorage: fetchUserDataFromStorage,
		createEnableDisableFeature: createEnableDisableFeature,
		displayUserInfo: displayUserInfo,
		gtmHelper: gtmHelper,
		fireGtmProfileUpdateEvent: fireGtmProfileUpdateEvent,
		enableEnterForSubmit: enableEnterForSubmit,
		checkEmailForLogin: checkEmailForLogin,

	}
})();


EtB2b.model = (function () {
	var model_id = '';
	var open_pop = function (custom_function, add_class, head, close, href) {
		close = (typeof demosite != 'undefined' && demosite == 1) ? 'Y' : close;
		if (!head) {
			head = 2;
		}
		if (!href) {
			href = '';
		}

		if ($('.model-box').hasClass('hide')) {
			model_id = 1;
		} else {
			model_id = parseInt($('.model-box').length) + 1;
		}
		EtB2b.model.model_id = model_id;
		var obj_id = "model_" + model_id;
		var xtra_cls = ' ';
		if (add_class) {
			xtra_cls += add_class;
		}
		if (head == 1) {
			var close_txt = '<a class="close" style="z-index:9999">&#10005;</a>';
			if (close == 'N') {
				close_txt = '';
			}
			var ttl_str = '';
			var append_str = '<div id="' + obj_id + '" class="model-container ' + xtra_cls + '" style="display:none;">' + ttl_str + '<div class="model-wrapper"><div class="model-content clearfix" id="model_content_' + model_id + '"><span class="pre_loader" id="pre_loader_' + model_id + '"><span class="loader">&nbsp;</span>Loading...</span></div>';
			append_str = append_str + '</div>' + close_txt + '</div>';

		} else if (head == 2) {
			var close_txt = '<a href="javascript:void(0);" style="z-index:9999" class="close">&#10005;</a>';
			if (close == 'N') {
				close_txt = '';
			}
			var append_str = '<div id="' + obj_id + '" class="model-container sub-popup' + head + ' ' + xtra_cls + '" style="display:none;"><div class="model-content clearfix" id="model_content_' + model_id + '"><span class="pre_loader" id="pre_loader_' + model_id + '"><span class="loader">&nbsp;</span>Loading...</span></div><div id="_btm_' + model_id + '"></div>' + close_txt + '</div>';
		} else if (head == 3) {
			// if need close btn 
			var close_txt = '<a href="javascript:void(0);" style="z-index:9999" class="close">&#10005;</a>';
			if (close == 'N') {
				close_txt = '';
			}
			var append_str = '<div id="' + obj_id + '" class="model-container sub-popup' + head + ' ' + xtra_cls + '" style="display:none;"><div class="text-center model-wrapper"><h3 id="text_content_' + model_id + '" class="thnkTx"></h3><div class="model-content clearfix" id="model_content_' + model_id + '"><span class="pre_loader" id="pre_loader_' + model_id + '"><span class="loader">&nbsp;</span>Loading...</span></div></div>' + close_txt + '<div id="_l2_btm_' + model_id + '"></div></div>';
		} else {
			style = "z-index:9999"
			// if need close btn 
			var close_txt = '<a href="javascript:void(0);" style="z-index:9999" class="close">&#10005;</a>';
			if (close == 'N') {
				close_txt = '';
			}
			var append_str = '<div id="' + obj_id + '" class="outer_bx popup1 ' + xtra_cls + '" style="display:none;"><div class="fb-blue-head">' + close_txt + '<h3 id="ttl_' + model_id + '"></h3></div><div class="txt_cnt model-content clearfix" id="model_content_' + model_id + '"><span class="pre_loader" id="pre_loader_' + model_id + '"><span class="loader">&nbsp;</span>Loading...</span></div><div id="_l2_btm_' + model_id + '"></div></div>';
		}
		$("body").append(append_str);
		$("#" + obj_id).show();
		if (add_class != 'sticky-rgt-btm') {
			var lay = $("body").append("<div id='l2_overlay_bx_" + model_id + "' class='model-bg ' ></div>");
		} else {
			$("#" + obj_id).prepend('<span class="slideup-btn" onclick="$(\'#' + obj_id + '\').addClass(\'slideup\')">Subscribe To Newsletter</span>');
		}
		try {
			if (href && custom_function) {
				custom_function(href, model_id);
			} else if (custom_function) {
				custom_function(model_id);
			}
		} catch (e) { }
		if (head == 1) {
			login_popup_display_type = 1;
		}
		if (add_class != 'sticky-rgt-btm') {
			if ($('#wrapper_' + EtB2b.model.model_id).length == 0)
				$("#" + obj_id).wrap("<div  class='model-box' id='wrapper_" + EtB2b.model.model_id + "' ></div>");
		}
		$('html').addClass("sidebarPopup");
		return model_id;
	}
	var close_pop = function (obj, skip_close_btn) {
		if (obj) {
			var is_close = parseInt($('#model_' + obj).length);
			if (is_close || skip_close_btn === true) {
				var hideAll = "#model_" + obj + ",#l2_overlay_bx_" + obj + ",#wrapper_" + obj;
				if ($("#_model_id_" + obj).hasClass('fadeInUp')) {
					$("#model_" + obj).removeClass('fadeInUp').addClass('fadeInDown');
					$(hideAll).remove();
				} else {
					$(hideAll).remove();
				}
				if (EtB2b.globalVar.set_pop_cookie == 'Y') {
					EtB2b.commJs.setCookie(ET_PORTAL + '_pop_user_sub_close', set_cookie_email, ET_SUB_SOURCE_COOKIE);
				}
			}
			localStorage.removeItem('yoloFlag');
		}
		$('html').removeClass("sidebarPopup");
	}
	var hide_layer_id = function (id) { }
	return {
		model_id: model_id,
		hide_layer_id: hide_layer_id,
		open_pop: open_pop,
		close_pop: close_pop,
	}
})();


// Dependent Methods
var userlocationinfo = EtB2b.commJs.getLocalStorage('userlocationinfo') || {};
EtB2b.commJs.deleteCookie('OS_CLIENT_ID' + portal_env);
EtB2b.commJs.setCookie('OS_CLIENT_ID' + portal_env, client_id, 365, '/', cookies_allow_domain, true, true);
var login_type = EtB2b.commJs.getLocalStorage('login_type') ? EtB2b.commJs.getLocalStorage('login_type') : '';
var empid = EtB2b.commJs.getLocalStorage('empid') ? EtB2b.commJs.getLocalStorage('empid') : '';
var cancelprofilecompletion = EtB2b.commJs.getLocalStorage('cancelprofilecompletion') ? EtB2b.commJs.getLocalStorage('cancelprofilecompletion') : '';

window.customAddEventListener = window.attachEvent || window.addEventListener;
window.customAddEventListener('message', function (ev) {
	if (typeof ev.data.callback != 'undefined' && typeof EtB2b.login.postMessageCallbacks[ev.data.callback] == 'function')
		EtB2b.login.postMessageCallbacks[ev.data.callback].apply(null, Array.prototype.slice.call(ev.data.params instanceof Array ? ev.data.params : []));
}, false);

// Cropper Feature Handling starts
setTimeout(function(){
	EtB2b.commJs.loadScript(THEME_PATH+'/javascript/croppie.min.js');

	window.CroppieCrop = (function () {
		function output(node) {
			var existing = $('#result .croppie-result');
			if (existing.length > 0) {
				existing[0].parentNode.replaceChild(node, existing[0]);
			}
			else {
				$('#result')[0].appendChild(node);
			}
		}

		function demoUpload() {
			var $uploadCrop;
			
			function readFile(input) {
				$('.upload-container').removeClass('hide');
				if (input.files && input.files[0]) {
					var reader = new FileReader();

					reader.onload = function (e) {
						$('.upload-demo').addClass('ready');
						$uploadCrop.croppie('bind', {
							url: e.target.result
						}).then(function () {
							console.log('jQuery bind complete');
						});

					}

					reader.readAsDataURL(input.files[0]);
				}
				else {
					//swal("Sorry - you're browser doesn't support the FileReader API");
				}
			}

			$uploadCrop = $('#upload-demo').croppie({
				viewport: {
					width: 100,
					height: 100,
					type: 'square',
					enableResize: true,
				},
				enableExif: true
			});
			var resetUpload = function () {
				$('.upload-demo').removeClass('ready');
				$('#upload').val(''); // this will clear the input val.
				$uploadCrop.croppie('bind', {
					url: ''
				}).then(function () {
					console.log('reset complete');
				});
				$('.upload-container').addClass('hide');
			}
			$('.filled-img').show();
			$('#upload').on('change', function () {
				let val = EtB2b.utils.encodeHTML($(this).val());
				if (EtB2b.commJs.validateImage(val)) {
					$('#uploadImage_err').text('');
					readFile(this);
				} else {
					$('#uploadImage_err').text(EtB2b.messageLog[61]);
				}
			});
			$('#crop-img').on('click', function (ev) {
				$uploadCrop.croppie('result', {
					type: 'canvas',
					size: 'viewport'
				}).then(function (resp) {
					//window.res = res;
					if ($('.cropme .picture_post').length > 0) {
						$('.cropme .picture_post').attr('type', 'hidden').val(resp);
						$('.cropme .uploaded-img').attr('src', resp);
					}
					else {
						$('.filled-img').hide();
						$('.cropme .picture_post, .cropme .uploaded-img').remove();
						var picturePost = '<input type="hidden" name="picture_post" class="picture_post" value="' + resp + '">';
						$('.cropme').prepend(picturePost);
						var image = '<img style="width:126px;height:126px" class="uploaded-img" src="' + resp + '">';
						$('.cropme').prepend(image);
					}
					$('.edit-profile-name-img').remove();
				});
				resetUpload();
			});
			$('#cancel-upload').on('click', function () {
				resetUpload();
			});
		}


		function bindNavigation() {
			var $body = $('body');
			$('nav a').on('click', function (ev) {
				if(theme_version != 'v4'){
					var lnk = $(ev.currentTarget),
						href = lnk.attr('href'),
						targetTop = $('a[name=' + href.substring(1) + ']').offset().top;

					$body.animate({ scrollTop: targetTop });
					ev.preventDefault();
				} 
			});
		}

		function init() {
			bindNavigation();
			demoUpload();

		}

		return {
			init: init
		};
	})();
},4000);
// Ends


// Excluded products - microsite, awards
if (EtB2b.globalVar.isNewsLetterSubscriptionApplicable) {
	EtB2b.subscription = (function () {
		var updateSubscription = function (blockPosition, lid) {
			var email = $.trim($('#subscribe_email_' + blockPosition).val());
			var user_consent = $('#consentPopup_' + blockPosition).is(":checked");
			var emailField = $('#subscribe_email_' + blockPosition);
			var consent_response = $('#subcribe_consentPopup_' + blockPosition);
			var errorField = $('#subcribe_response_' + blockPosition);

			email = EtB2b.utils.encodeHTML(email);
			error_val = EtB2b.commJs.validateEmail(email);
			if (error_val) {
				$(errorField).html(error_val);
				(theme_version != 'v4') ? $(emailField).addClass('error') : $(emailField).addClass('val-error');
				return false;
			} else {
				$(errorField).html('');
				(theme_version != 'v4') ? $(emailField).removeClass('error') : $(emailField).removeClass('val-error');
			}
			var newletterId = NL_SUBSCRIPTION[0].nl_id;

			if (theme_version != 'v4') {
				if (!user_consent) {
					$(consent_response).html(EtB2b.messageLog[49]);
					return false;
				}
				if (user_consent) {
					consent_response.html('');
					$('#consentPopup_' + blockPosition).prop('checked', false);
				}
			}

			var paramObject = {
				url: base_url + '/api/v1/newsletter/subscribe',
				type: 'POST',
				data: { 'email': email, 'nl_id': newletterId },
			}
			function ajaxSuccessCall(response) {
				var response = JSON.parse(response);
				if (!EtB2b.globalVar.is_loggedin) {
					EtB2b.commJs.setLocalStorage('pEmail', email, 5);
				}

				$('.model-container').removeClass('sticky-rgt-btm');
				set_pop_cookie = 'Y';
				EtB2b.model.close_pop(1);
				window.newsletterResponse = EtB2b.commJs.getLocalStorage('newsletterResponse');
				clearNewsLetterStates();
				if (response.code == 3001) {
					if (theme_version != 'v4') {
						var portalDisplay = window.is_pip ? 'ET' + window.pip['category'] : SITE_NAMES[ET_PORTAL];
						var cnfmMsg = '<h2>Thanks for Subscribing</h2><p>Your subscription is confirmed for ' + portalDisplay + ' latest updates.</p><p><a href="' + b2bPortalUrl + '/subscriptions" target="_blank">Click here</a> to view all the Newsletters.</p>';
						EtB2b.commJs.showSuccessMessage(cnfmMsg, "y", 'newsletter_subscribe');
					} else{
						window.subscriberNewsLetterCB ? subscriberNewsLetterCB() : false;
					}
					gtmUpdateUserProfile({
						event: 'newsletter_subscribed',
						nlid: newletterId,
						email_selector: '#subscribe_email_' + blockPosition
					});
				} else if (response.code == 3000) {
					var alreadyMsg = '<h2>Your subscription to the ' + SITE_NAME_TITLE + '  Daily Newsletter is already active.</h2><p><a class="link" href="' + base_url + '/manage-preferences" target="_blank">Click here</a> to manage your email preferences.</p>';
					EtB2b.commJs.showSuccessMessage(alreadyMsg, "y", 'newsletter_subscribe newsletter_subscribe_already');					
				}
				$(emailField).val('');
				checkUserSubscribed = true;
				if (EtB2b.globalVar.isNewsLetterSubscriptionApplicable) {
					EtB2b.subscription.showSubscriptionContainer();
				}

				$('.subscribe.mt-none, .top-newsletter-subs .subscription-section, .newsletter-section1').addClass('hide');
				$('.top-newsletter-subs .app-download-section').removeClass('hide');
				userSubsStatus = true;				

			}
			function ajaxErrorCall(data) {
				if(data.responseJSON){
					if (data.responseJSON.code != 200) {
						$('#subcribe_consentPopup_top').html(data.responseJSON.message).show();
					} else {
						EtB2b.model.close_pop(1);
						console.log("Error: " + errorThrown);
					}
				} else{
					$('#subcribe_response_' + blockPosition).html('Please enter a valid email address.').show();
				}
				EtB2b.commJs.deleteCookie('b2b_newslettersubs' + portal_env,cookies_allow_domain);
			}
			EtB2b.commJs.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
		};

		var showSideBottomSubscriptionLayer = function (lid) {
			//if(theme_version == 'v4') return;
			set_pop_cookie = 'Y';
			var bottom_txt = '';
			var logoDiv = $(".logos").html();
			if (logoDiv != undefined && logoDiv != '') {
				var prtlSpnsrTxt = "Supported by:";
				if (ET_PORTAL == 'brandequity') prtlSpnsrTxt = "Associate Partner:";
				bottom_txt = '<div class="spnsrs"><h5><span>' + prtlSpnsrTxt + '</span></h5>' + logoDiv + '</div>';
			} else {
				bottom_txt = '';
			}

			var showMulticheckBox = '';
			var newsletterHtmlContent = '<form action="#"><div class="section"> <div class="create-section input_sec"><input name="subscribe_email_pop" id="subscribe_email_pop" type="text" required class="input_txt_box" placeholder="" value="" /><label for="subscribe_email_pop">Your Email </label><p id="subcribe_response_pop" class="error"></p></div> ' + showMulticheckBox + '<div class="consent-popup"> <input type="checkbox" id="consentPopup_pop" name="consent Popup"> <label for="consentPopup_pop" style="text-align:left;"> I have read <a target="_blank" href="/privacy_policy.php">Privacy Policy</a> and <a target="_blank" href="/terms_conditions.php">Terms &amp; Conditions</a> and agree to receive newsletters and other communications on this email ID.</label></div><div id="subcribe_consentPopup_pop" class="subcribe_consentPopup et-rtl-error"></div> <input type="button" class="btn submit-button2" value="Subscribe" onclick="EtB2b.subscription.updateSubscription(\'pop\');" /></div></form>';
			$('#model_content_' + lid).html('<div class="subscribe-form subscribeBx">' + ((typeof demosite != 'undefined' && demosite == 1) ? '<span class="cmngTx">Coming Soon!</span><img class="popLogo" src="' + ($(".logo img").eq(0).attr('src').replace(/"|\(|\)|url/g, '')) + '" alt="">' : '') + '<h2>' + (is_pip && pip_subscription_box ? pip_subscription_box["title"] : (SUBSCRIPTION_HEADING[ET_PORTAL] ? SUBSCRIPTION_HEADING[ET_PORTAL] : ('Stay updated with the latest news in the ' + SITE_CUSTOM_TITLES[ET_PORTAL] + ' sector with our daily newsletter'))) + '</h2><span class="subtitle">' + (is_pip && pip_subscription_box ? pip_subscription_box["tagline"] : SUBSCRIPTION_TAGLINES[ET_PORTAL]) + '</span>' + newsletterHtmlContent + '</div>' + bottom_txt);
			bindCommonEvent();

			if (typeof EtB2b.login.createEnableDisableFeature != "undefined")
				EtB2b.login.createEnableDisableFeature({ selector: '.subscribeBx' });
		};

		var userEmail = '';
		var showSubscriptionContainer = function () {
			window.newsletterResponse = EtB2b.commJs.getLocalStorage('newsletterResponse');
			var newsletterCookieExists = EtB2b.commJs.getCookie('b2b_newslettersubs' + portal_env);
			var type = 'GET', data = {};

			userEmail = JSON.parse(localStorage.getItem('pEmail'));

			if (userEmail) {
				userEmail = userEmail.data;
				$('.saved_email').html(userEmail).addClass('valid');
				$('#subscribe_email_top, #subscribe_email_bottom, #subscriber_email_bottom, #subscribe_email_pop').val(userEmail).addClass('valid');
			}


			if (newsletterCookieExists && EtB2b.utils.isOperatable(newsletterResponse) && !checkUserSubscribed) {
				$('.subscribe.mt-none, .top-newsletter-subs .subscription-section').removeClass('hide');
				$('.top-newsletter-subs .app-download-section').addClass('hide');
				userSubsStatus = false;
				newsletterListResponse(newsletterResponse.data);
				return false;
			}

			$('.subscribe.mt-none, .top-newsletter-subs .subscription-section').removeClass('hide');
			$('.top-newsletter-subs .app-download-section').addClass('hide');
			userSubsStatus = false;
			$('.subscription-container').append('<div class="showloader"></div>');


			if (userEmail) {
				type = 'POST';
				data = { 'email': userEmail };
			}

			function ajaxSuccess(response, param) {
				var response = param && param == "y" ? response : JSON.parse(response);
				response.userEmail = userEmail ? userEmail : '';
				EtB2b.commJs.setLocalStorage('newsletterResponse', response, 5);
				window.newsletterResponse = response;
				newsletterListResponse(response.data);
				$('.showloader').hide();

				EtB2b.commJs.setCookie('b2b_newslettersubs' + portal_env, 1, 5, '', cookies_allow_domain);
			}

			function ajaxError(response) {
				console.log(respopnse);
				EtB2b.commJs.deleteCookie('b2b_newslettersubs' + portal_env, cookies_allow_domain);
			}

			if (newsletterResponse && newsletterCookieExists) {
				ajaxSuccess(newsletterResponse, "y");

			} else {
				if ($('body').hasClass('page-newsletters'))
					$('.showloader').show();
				if(ET_PORTAL!="masterclass" && ET_PORTAL!="events"){
					EtB2b.commJs.hitAjaxApi({
						type: type,
						url: base_url + '/api/v1/newsletter/list',
						data: data
					}, ajaxSuccess, ajaxError)
				}
			}
		};

		var newsletterListResponse = function (response) {
			var heading = '<div class="text-center"><h2>NEVER MISS A STORY THAT MATTERS</h2><h4>Subscribe to our newsletters and get business news delivered straight into your inbox</h4><span id="userEmail"><span class="saved_email"></span><span class="edit_email" style="display:none;"> Edit</span></span></div>';
			$('.subscription-container').html(heading);
			$('.saved_email').html(userEmail);
			if (userEmail && !EtB2b.globalVar.is_loggedin) {
				$('.edit_email').show();
			}
			var sbc_list = response.subscription_list;
			var active_list = response.subscription_active;
			newsListWrapper(sbc_list, active_list);
			subscriptionStatus(active_list);
		};

		var subscriptionStatus = function (activelist) {
			if (!$('.subscription-container').length) {
				if (activelist.length) {
					for (var i = 0; i < activelist.length; i++) {
						if (activelist[i] == NL_SUBSCRIPTION[0].nl_id) {
							showSubscribeBox = false;
							$('.subscribe.mt-none, .top-newsletter-subs .subscription-section, .newsletter-section1, .subscription-section-panel').addClass('hide');
							$('.top-newsletter-subs .app-download-section').removeClass('hide');
							userSubsStatus = true;				

						}
					}
				} else {
					$('.subscribe.mt-none, .top-newsletter-subs .subscription-section, .subscription-section-panel').removeClass('hide');
					$('.top-newsletter-subs .app-download-section').addClass('hide');
					userSubsStatus = false;
				}
			}
		};

		var newsListWrapper = function (newslist, activelist) {
			var newsletterList = '';
			var portalName = '';
			$(newslist).each(function (key, val) {
				portalName = SITE_NAMES[val.portal];
				$activeSubscription = '';
				var environmentVal = function () {
					if (typeof environment !== 'undefined' && typeof environmentMap[environment] != "undefined" && environmentMap[environment]) {
						return '-' + environmentMap[environment];
					}
					return '';
				}();
				var ecodeVar = btoa('email=' + userEmail + '&activity_name=' + val.activity + '&user_id=' + val.id);
				var unsub_link = 'https://' +b2bhostname + '/unsubscribe.php?zx=' + ecodeVar;
				for (var i = 0; i <= activelist.length; i++) {
					if (val.id == activelist[i]) {
						$activeSubscription = 'active';
					}
				}
				newsletterList += '<li class="subscription-box ' + $activeSubscription + '" data-id="' + val.id + '" id="li_' + val.id + '"><div class="itemlist_container"><div class="logo"><i class="fa fa-calendar"></i></div><p class="title" title="' + val.display_name + '"><span style="display:none">Subscribe to ' + portalName + ' Newsletters</span> ' + val.display_name + '</p><div class="content"><p>Stay updated with the latest news in the <span>' + portalName + '</span> community with our daily newsletter.</p><input type="button" id="" class="btn submit subscrib_btn" value="Subscribe"><div class="subscribed"><a target="_blank" href="' + unsub_link + '" class="unsubs-btn"><i class="fa fa fa-check-circle"></i><br>Unsubscribe</a></div></div></div></li>';
			});
			var newslistData = '<div class="news-list-wrapper"><ul>' + newsletterList + '</ul></div>';
			$('.subscription-container').append(newslistData);
		};

		var updatePortalSubscription = function (event) {
			var email = $('.saved_email').text();
			$Currselector = $(event);
			var newsletter_id = $Currselector.parents('.subscription-box').attr('data-id');

			var paramObject = {
				url: base_url + '/api/v1/newsletter/subscribe',
				type: 'POST',
				data: { 'email': email, 'nl_id': newsletter_id },
			}
			function ajaxSuccessCall(response) {
				gtmUpdateUserProfile({
					event: 'newsletter_subscribed',
					nlid: newsletter_id,
					email_value: email
				});
				$Currselector.parents('.subscription-box').addClass('active');
				$Currselector.parents('.subscription-box').find('.email_box').remove();
				clearNewsLetterStates();
				if (EtB2b.globalVar.isNewsLetterSubscriptionApplicable) {
					showSubscriptionContainer();
				}
			}
			function ajaxErrorCall(data) {
				if (data.responseJSON.code != 200) {
					$('#subcribe_consentPopup_top').html(data.responseJSON.message).show();
				} else {
					EtB2b.model.close_pop(1);
					console.log("Error: " + errorThrown);
				}
				EtB2b.commJs.deleteCookie('b2b_newslettersubs' + portal_env, cookies_allow_domain);
			}
			EtB2b.commJs.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
		};

		var bindCommonEvent = function () {
			$('.sticky-rgt-btm form input').each(function () {
				EtB2b.utils.encodeHTML($(this).val()) ? $(this).addClass('valid') : $(this).removeClass('valid');
			});
		};

		var initSideBottomPopup = function () {
			var xCookieClose = EtB2b.commJs.getCookie(ET_PORTAL + '_pop_user_sub_close');
			if (!xCookieClose) {
				setTimeout(function () {
					if (!EtB2b.globalVar.is_loggedin && !$('.consent-window').length && is_subscription_page != 'Y' && showSubscribeBox && !$('.lgn_pop').length && !isWebinarDetailPage && ((typeof portal_product != "undefined" && portal_product != "product_microsite") || typeof portal_product == "undefined")) {
						if ((cbsOnPortal.includes(ET_PORTAL)) && $('.page-newsdetail').length) {
							if (!sessionStorage.getItem('loginLayerSession')) {
								return false;
							}
						}
						if(theme_version != 'v4'){
							//EtB2b.model.open_pop(EtB2b.subscription.showSideBottomSubscriptionLayer, 'sticky-rgt-btm', 3);
						}

						$('.sticky-rgt-btm').removeClass('sub-popup3');

						if ($('.lgn_pop').length) { $('.sticky-rgt-btm').addClass('hide'); }

					}
				}, 10000);
			}
		}

		if (ec_detail_file == "unsubscribe.php") {
			if ($('.unsubscribe-form input[name="oauth_submit"]').length) {
				$(document).on('click', '.unsubscribe-form input[name="oauth_submit"]', function () {
					EtB2b.commJs.deleteCookie('b2b_newslettersubs' + portal_env, cookies_allow_domain);
				});
			}
		}


		$(document).ready(function () {
			initSideBottomPopup();
			$(document).on('click', '.sticky-rgt-btm .close', function () {
				EtB2b.commJs.setCookie(ET_PORTAL + '_pop_user_sub_close', set_cookie_email, ET_SUB_SOURCE_COOKIE);
				EtB2b.model.close_pop(1);
			});

			$(document).on('click', '.edit_email', function (e) {
				var emailId = JSON.parse(localStorage.getItem('pEmail'));
				emailId = emailId.data;
				$('#userEmail').html('<div class="edit_email_box"><input placeholder="Email id" class="email_input" name="email" value="' + emailId + '"><button class="btn emailchng_btn">Submit</button></div>');
			});
			$(document).on('click', '.emailchng_btn', function (e) {
				var newEmail = $(this).siblings('.email_input')[0].value;
				newEmail = EtB2b.utils.encodeHTML(newEmail);

				var currentStoredEmailId = JSON.parse(localStorage.getItem('pEmail'));
				currentStoredEmailId = currentStoredEmailId.data;
				if (!EtB2b.commJs.validateEmail(newEmail)) {
					if (currentStoredEmailId !== newEmail) {
						EtB2b.commJs.setLocalStorage("pEmail", newEmail, 1);
					}
					$('#userEmail').html('<span class="saved_email">' + newEmail + '</span><span class="edit_email"> Edit</span>');
					clearNewsLetterStates();

					if (EtB2b.globalVar.isNewsLetterSubscriptionApplicable) {
						EtB2b.subscription.showSubscriptionContainer();
					}
				} else {
					alert('Please enter a valid email address.');
				}
			});
			$(document).on('click', '.subscrib_btn', function (e) {
				$(this).attr('disabled', true);
				if (!$('.saved_email').text().length) {
					$('.subscription-box').find('.email_box').remove();
					$('.subscription-box .subscrib_btn').show();
					$(this).parents('.subscription-box').append('<div class="email_box"><div><input placeholder="Email" class="email_input" name="email"><button class="btn submit_btn">Submit</button></div><p class="disclaimer">Enter your Email ID to receive this newsletter.</p></div>');
					$(this).hide();
				} else {
					EtB2b.subscription.updatePortalSubscription($(this));
				}
			});

			$(document).on('click', '.unsubs-btn', function (e) {
				clearNewsLetterStates();
			});

			$(document).on('click', '.fa-check-circle', function (e) {
				var $sel = $(this).siblings('.unsubs-btn');

				$sel.length ? $sel.click() : false;
			});

			$(document).on('click', '.submit_btn', function (e) {
				var newEmail = $(this).siblings('.email_input')[0].value;
				newEmail = EtB2b.utils.encodeHTML(newEmail);

				if (!EtB2b.commJs.validateEmail(newEmail)) {
					EtB2b.commJs.setLocalStorage("pEmail", newEmail, 1);
					$('.saved_email').html(newEmail);
					$('.edit_email').show();
					EtB2b.subscription.updatePortalSubscription($(this));
				} else {
					alert('Please enter a valid email address.');
				}
			});
			$(document).on('click', '.sticky-rgt-btm .close', function () {
				$(this).parents('.sticky-rgt-btm').remove();
			});

		});

		return {
			updateSubscription: updateSubscription,
			showSideBottomSubscriptionLayer: showSideBottomSubscriptionLayer,
			showSubscriptionContainer: showSubscriptionContainer,
			updatePortalSubscription: updatePortalSubscription,
			initSideBottomPopup: initSideBottomPopup
		}
	})();
}
// Ends


// Apply body class as the page loads
if (typeof portal_product != "undefined") {
	if (portal_product == 'product_microsite') {
		$('body').addClass('product_microsite');
	} else if (portal_product == 'product_awards') {
		$('body').addClass('product_microsite product_awards');
	} else if (portal_product == 'product_webinar') {
		$('body').addClass('product_webinar');
	} else if (portal_product == 'product_masterclass') {
		$('body').addClass('product_masterclass');
	}
} else {
	portal_product = "product_main";
	$('body').addClass('product_main');
}


$(document).ready(function () {
	EtB2b.commJs.initializeSocialsWithExistingSessions();
	EtB2b.login.checkLoginStatus();

	$('body').on('click', '.model-box', function (e) {
		var wcl_length = $('.layer-out').find('.close').length;
		if (wcl_length) {
			if (!$(e.target).closest('.layer-out').length) {
				$(".model-box, .model-bg").remove();
				localStorage.setItem('yoloFlag', 0);
				$('html').removeClass("sidebarPopup");
			}
		}
	});
	$(document).keyup(function (e) {
		if (e.keyCode == 27) {
			var exit_pop = parseInt($('.layer-out').length);
			if (exit_pop > 0) {
				EtB2b.model.close_pop(exit_pop);
			}
		}
		EtB2b.commJs.checkSubmitStatus();
	});
	$(document).on('keyup', '.input_sec .input_txt_box', function () {
		$(this).removeClass('error');
		$(this).siblings('.error').html('');
	});
	$('body').on('click', '#go_back_btn', function () {
		EtB2b.system.login();
	});

	$('body').on('click', '.oauth-remove-icon', function () {
		var defaultAction = function () {
			$('.edit-profile-name-img').remove();
			// $('.uploaded-img').attr('src', '');
			// $('.picture_post').attr('value', '');
			$('.filled-img').attr('src', '');
			$('.oauth-remove-icon').addClass('hide');
			$('.cropme .picture_post, .cropme .uploaded-img').remove();
			$('#upload-demo .cr-boundary .cr-image').attr('style','');
			$('.btn-update-profile .btn').removeAttr('disabled');
			$('.upload-pic').text('Upload Photo');
		}

		if (window.oauthUserData && oauthUserData.profile_photo) {
			var confirmImageDelete = confirm("By confirming, your profile picture will be deleted from our portals. Do you still want this to happen?")

			if (confirmImageDelete) {
				defaultAction();

				var paramObject = {
					url: `${apiUrl}/api/v1/user/${oauthUserData.eid}/deleteProfilePicture`,
					type: 'POST'
				};

				function ajaxSuccessCall(response) {
					if (response) {
						EtB2b.login.fireGtmProfileUpdateEvent(response);
						$('.showloader').hide();
						EtB2b.login.loadloginfunctions();
						EtB2b.commJs.setLocalStorage('empid', response.data.eid, expireTime);
						EtB2b.commJs.setLocalStorage('oauthUserData', response, expireTime);
						EtB2b.commJs.setLocalStorage('OSTPID' + portal_env, EtB2b.commJs.getCookie('OSTPID' + portal_env), 1);
						EtB2b.login.displayUserInfo(response);
						userPropertyOnCompletion(response);
						window.editProfileUpdateCallBack ? editProfileUpdateCallBack() : false;
					}
				}

				function ajaxErrorCall(response) {
					$('.showloader').hide();
					if (response) {
						console.log(response);
					}
				}

				EtB2b.commJs.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
			} else {
				return false;
			}

		} else {
			defaultAction();
		}
	});
	$('body').on('click', '#crop-img', function () {
		$('.oauth-remove-icon').removeClass('hide');
		$('.btn-update-profile .btn').removeAttr('disabled');
		$('.upload-pic').text('Change Photo');
	});
	$('body').on('click', function (e) {
		if (!$('.select-items').hasClass('select-hide')) {
			$('.select-items').addClass('select-hide');
		}

		if ($('.autocomplete-items').length) {
			if (e.target.id != $('.autocomplete-items').attr('id') && (e.target.id != $('.autocomplete-items').siblings('input').attr('id'))) {
				$('.autocomplete-items').remove();
			}
		}

	});

	$(document).on('click', '.register', function () {
		setGtmTriggerPosition("Register Now");
	});

	$(document).on('click', '.popup-form_custom', function () {
		setGtmTriggerPosition("Register Now");

		try {
			let oauthUserData = EtB2b.commJs.getLocalStorage('oauthUserData');

			if (EtB2b.utils.isOperatable(oauthUserData) && EtB2b.utils.isOperatable(oauthUserData.data)) {
				oauthUserData = oauthUserData.data;

				if (oauthUserData.status_profile_completed) {
					EtB2b.login.gtmHelper({
						event: 'user_profile_update_widget_imp'
					});
				}
			}
		} catch (e) {
			EtB2b.utils.devConsole('GTM Issue', e);
		}

	});

	$(document).on('click', "#_tb_login_btn", function () {
		setGtmTriggerPosition("Header");
	});

	$('body').on('mousemove', function () {
		if ($('.lgn_pop').length) {
			$('#yolooverlay').remove();
		}
	});

	if (EtB2b.globalVar.isNewsLetterSubscriptionApplicable) {
		EtB2b.subscription.showSubscriptionContainer();
		var getPortalNewsletterId = $('input[name="newsletterId_bottom"]').val();

		if (getPortalNewsletterId) {
			getPortalNewsletterId = EtB2b.utils.encodeHTML(getPortalNewsletterId);
			getPortalNewsletterId ? $('.subscribe.mt-none').attr('data-nl-id', getPortalNewsletterId) : '';
		}

	}

	// Webinar custom handling
	if ($('#regbox-hide-temp').length) {
		$('#regbox-hide-temp').remove();
	}

	primeLoginVersion();
	if(theme_version != 'v4'){
		var primeFlag = $('.post-body.article-body-full').attr('data-article');
		var newsAgencyName = $('.post-body .post-meta .news_agency_name a').html();
		var byLine = $('.post-body .post-meta .name-author a').html();
		if (primeFlag == '200' || (ET_PORTAL == 'hospitality') && newsAgencyName == 'ETHospitalityWorld' && byLine) {
			//if(EtB2b.commJs.getCookie('_gaexp')){
			$('.status_prime_article').addClass('prime_article_200');
			$('.post-wrapper .Normal').addClass('prime-article');
			//}
		}
	}
});

// Prime article related event changes
//EtB2b.commJs.setCookie('_gaexp', 'GAX1.2.rt2tVUscRIqSr0-jgZTE6A.19138.1', 1);

function primeLoginVersion() {
	primeLoginOption('1');
	//loginVersion = EtB2b.commJs.getCookie('_gaexp');
	loginVersion = '';
	if (false && loginVersion) {
		loginVersion = loginVersion.substr(loginVersion.lastIndexOf(".") + 1);
		if (['0', '1', '2'].includes(loginVersion)) {
			abTestVersion = loginVersion;
			primeLoginOption(loginVersion);
		} else {
			primeLoginOption('2');
		}
	} else {
		//primeLoginOption('2');
	}
}

function primeLoginOption(loginVersion) {
	$('.prime_paywall .login-options').each(function (i, v) {
		if ($(this).attr('data-option') == loginVersion) {
			$(this).removeClass('hide');
		}
	});
}


$(window).on('load', function () {
	if ($('.lgn_pop').length) {
		$('#yolooverlay').remove();
	}

	if (EtB2b.globalVar.isNewsLetterSubscriptionApplicable) {
		if (typeof is_subscription_page != 'undefined' && is_subscription_page == 'Y') {
				EtB2b.model.open_pop(EtB2b.subscription.showSideBottomSubscriptionLayer, '', 3, 'N');
				console.log("subscribe page");
		}
	}
});
