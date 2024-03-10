var listLivePortals = ['brandequity', 'auto', 'travel', 'bfsi', 'hr', 'legal', 'hospitality', 'energy', 'government','health', 'cio','retail', 'infra', 'realty', 'telecom','cfo','ciso'];
const exclusivePortalArr = ['cfo', 'government', 'energy', 'ciso', 'infra'];

// Global variables
EtB2b.globals = {
    _loggedin_user: [],
    _gbl_logincb_fn: (typeof _gbl_logincb_fn != 'undefined') ? _gbl_logincb_fn : '',
    _gbl_notlogincb_fn: (typeof _gbl_notlogincb_fn != 'undefined') ? _gbl_notlogincb_fn : '',
    _is_loggedin: -1,
    _gbl_red_url: '',
    aliasTags: "",
    isExecuteTagService: '1',
    _loggedin_user_user_script_executed: 0,
    ET_DEFAULT_FACE_IMG_URL: ET_DEFAULT_FACE_IMG_URL,
    prevent_default_layers: (typeof prevent_default_layers != 'undefined') ? prevent_default_layers : false,
    login_required: (typeof login_required != 'undefined') ? login_required : 0,
    closelog: 0,
    headerNavStorageExpiry: 2, //minutes
    disabledClass: 'hide',
    ajaxLoaderSkeletons: {
        header_inpage_promo: '<section id="top_promos" class="top-promos"><div class="top-promos-skeleton-container container"><div class="skeleton smalls"><div class="skeleton__left"><div class="line w40"></div><div class="line h18"></div></div><div class="skeleton__right"><div class="square"></div></div></div><div class="skeleton smalls"><div class="skeleton__left"><div class="line w40"></div><div class="line h18"></div></div><div class="skeleton__right"><div class="square"></div></div></div><div class="skeleton smalls"><div class="skeleton__left"><div class="line w40"></div><div class="line h18"></div></div><div class="skeleton__right"><div class="square"></div></div></div><div class="skeleton smalls"><div class="skeleton__left"><div class="line w40"></div><div class="line h18"></div></div><div class="skeleton__right"><div class="square"></div></div></div></section>',
        load_more_news_loader: '<section class="load-more-loader"><div class="skeleton smalls"><div class="skeleton__left"><div class="line w40"></div><div class="line h18"></div></div><div class="skeleton__right"><div class="square"></div></div></div></section>',
        whats_happening_promo: '<section id="" class="whats-happening-promo mid-current-promo bg-grey"><div class="skeleton mediums"><div class="skeleton__left"><div class="line h18"></div><div class="line h18"></div><div class="line"></div><div class="line w40 lbtn"></div></div><div class="skeleton__right"><div class="square"></div></div></div></section>',
        default: '<div class="preloader" style="margin-left:45%"><img height="100" width="100" src="https://img.etb2bimg.com/files/retail_files/file_1600672676_loader_bg.gif"></div>',
        whats_happening_content: '<div class="navigation-hover navigation-hover__exclusives"><div class="skeleton mediums"><div class="skeleton__left"><div class="line h18"></div><div class="line"></div><div class="line w40 lbtn"></div></div><div class="skeleton__right"><div class="square"></div></div></div></div>',
        whats_happening_content_right1: '<div class="navigation-hover__news--right"><div class="navigation-hover__news--right--inner"><div class="portal-exclusives-panel__container"><div class="portal-exclusives-panel__slide"><div class="skeleton smalls up-down"><div class="skeleton__right"><div class="square"></div></div><div class="skeleton__left"><div class="line h18"></div><div class="line w40"></div></div></div></div><div class="portal-exclusives-panel__slide"><div class="skeleton smalls up-down"><div class="skeleton__right"><div class="square"></div></div><div class="skeleton__left"><div class="line h18"></div><div class="line w40"></div></div></div></div><div class="portal-exclusives-panel__slide"><div class="skeleton smalls up-down"><div class="skeleton__right"><div class="square"></div></div><div class="skeleton__left"><div class="line h18"></div><div class="line w40"></div></div></div></div></div></div></div>',
        whats_happening_content_right: '<div class="navigation-hover__news--right--inner"><div class="portal-exclusives-panel__container"><ul class="portal-events-panel__list"><li class="portal-events-panel__item"><div class="skeleton smalls"><div class="skeleton__left"><div class="line w40"></div><div class="line h18"></div></div><div class="skeleton__right"><div class="square"></div></div></div></li><li class="portal-events-panel__item"><div class="skeleton smalls"><div class="skeleton__left"><div class="line w40"></div><div class="line h18"></div></div><div class="skeleton__right"><div class="square"></div></div></div></li><li class="portal-events-panel__item"><div class="skeleton smalls"><div class="skeleton__left"><div class="line w40"></div><div class="line h18"></div></div><div class="skeleton__right"><div class="square"></div></div></div></li><li class="portal-events-panel__item"><div class="skeleton smalls"><div class="skeleton__left"><div class="line w40"></div><div class="line h18"></div></div><div class="skeleton__right"><div class="square"></div></div></div></li></ul></div></div>',
        loader_nav_exclusive: '<div class="navigation-hover navigation-hover__exclusives"><div class="navigation-hover__exclusives--inner"><div class="portal-exclusives-panel__slide"><div class="skeleton smalls up-down"><div class="skeleton__right"><div class="square"></div></div><div class="skeleton__left"><div class="line h18"></div><div class="line w40"></div></div></div></div><div class="portal-exclusives-panel__slide"><div class="skeleton smalls up-down"><div class="skeleton__right"><div class="square"></div></div><div class="skeleton__left"><div class="line h18"></div><div class="line w40"></div></div></div></div><div class="portal-exclusives-panel__slide"><div class="skeleton smalls up-down"><div class="skeleton__right"><div class="square"></div></div><div class="skeleton__left"><div class="line h18"></div><div class="line w40"></div></div></div></div><div class="portal-exclusives-panel__slide"><div class="skeleton smalls up-down"><div class="skeleton__right"><div class="square"></div></div><div class="skeleton__left"><div class="line h18"></div><div class="line w40"></div></div></div></div></div></div>',
        loader_nav_leader_speaks: '<div class="navigation-hover navigation-hover__leaders-speak"><div class="leaders-speak-panel__container navigation-hover__leaders-speak--inner"><div class="leaders-speak-panel__slide"><div class="skeleton mediums"><div class="skeleton__left"><div class="line h18"></div><div class="line h18"></div><div class="line"></div><div class="line w40 lbtn"></div></div><div class="skeleton__right"><div class="square"></div></div></div></div><div class="leaders-speak-panel__slide"><div class="skeleton mediums"><div class="skeleton__left"><div class="line h18"></div><div class="line h18"></div><div class="line"></div><div class="line w40 lbtn"></div></div><div class="skeleton__right"><div class="square"></div></div></div></div><div class="leaders-speak-panel__slide"><div class="skeleton mediums"><div class="skeleton__left"><div class="line h18"></div><div class="line h18"></div><div class="line"></div><div class="line w40 lbtn"></div></div><div class="skeleton__right"><div class="square"></div></div></div></div></div></div>',
        loader_nav_event_award: '<div class="nv-ev navigation-hover navigation-hover__events-awards nav_hover_container hover-tab-holder"><div class="nv-ev__inner"><div class="nv-ev__left"></div><div class="nv-ev__right tab_content"><div class="nv-ev__content"><div class="nv-ev__events nav_tab_data"><div class="nv-ev__list"><div class="nv-ev__item"><div class="skeleton smalls up-down"><div class="skeleton__right"><div class="square"></div></div><div class="skeleton__left"><div class="line h18"></div><div class="line w40"></div></div></div></div><div class="nv-ev__item"><div class="skeleton smalls up-down"><div class="skeleton__right"><div class="square"></div></div><div class="skeleton__left"><div class="line h18"></div><div class="line w40"></div></div></div></div><div class="nv-ev__item"><div class="skeleton smalls up-down"><div class="skeleton__right"><div class="square"></div></div><div class="skeleton__left"><div class="line h18"></div><div class="line w40"></div></div></div></div><div class="nv-ev__item"><div class="skeleton smalls up-down"><div class="skeleton__right"><div class="square"></div></div><div class="skeleton__left"><div class="line h18"></div><div class="line w40"></div></div></div></div></div></div></div></div></div></div>',
        loader_nav_brandsolution: '<div class="nv-ev navigation-hover navigation-hover__events-awards nav_hover_container hover-tab-holder"><div class="nv-ev__inner"><div class="nv-ev__left"></div><div class="nv-ev__right tab_content"><div class="nv-ev__content"><div class="nv-ev__events nav_tab_data"><div class="nv-ev__list"><div class="nv-ev__item"><div class="skeleton smalls up-down"><div class="skeleton__right"><div class="square"></div></div><div class="skeleton__left"><div class="line h18"></div><div class="line w40"></div></div></div></div><div class="nv-ev__item"><div class="skeleton smalls up-down"><div class="skeleton__right"><div class="square"></div></div><div class="skeleton__left"><div class="line h18"></div><div class="line w40"></div></div></div></div><div class="nv-ev__item"><div class="skeleton smalls up-down"><div class="skeleton__right"><div class="square"></div></div><div class="skeleton__left"><div class="line h18"></div><div class="line w40"></div></div></div></div><div class="nv-ev__item"><div class="skeleton smalls up-down"><div class="skeleton__right"><div class="square"></div></div><div class="skeleton__left"><div class="line h18"></div><div class="line w40"></div></div></div></div></div></div></div></div></div></div>',
        loader_nav_tab_elms: '<div class="nv-ev__events nav_tab_data"><div class="nv-ev__list"><div class="nv-ev__item"><div class="skeleton smalls up-down"><div class="skeleton__right"><div class="square"></div></div><div class="skeleton__left"><div class="line h18"></div><div class="line w40"></div></div></div></div><div class="nv-ev__item"><div class="skeleton smalls up-down"><div class="skeleton__right"><div class="square"></div></div><div class="skeleton__left"><div class="line h18"></div><div class="line w40"></div></div></div></div><div class="nv-ev__item"><div class="skeleton smalls up-down"><div class="skeleton__right"><div class="square"></div></div><div class="skeleton__left"><div class="line h18"></div><div class="line w40"></div></div></div></div><div class="nv-ev__item"><div class="skeleton smalls up-down"><div class="skeleton__right"><div class="square"></div></div><div class="skeleton__left"><div class="line h18"></div><div class="line w40"></div></div></div></div></div></div>',
        whats_happening_skeleton: '<section class="mid-current-promo bg-grey"><div class="container mid-current-promo__inner"><div class="mid-current-promo__container"><div class="mid-current-promo__slide"><div class="skeleton mediums"><div class="skeleton__left"><div class="line h18"></div><div class="line h18"></div><div class="line"></div><div class="line w40 lbtn"></div></div><div class="skeleton__right"><div class="square"></div></div></div></div><div class="mid-current-promo__slide"><div class="skeleton mediums"><div class="skeleton__left"><div class="line h18"></div><div class="line h18"></div><div class="line"></div><div class="line w40 lbtn"></div></div><div class="skeleton__right"><div class="square"></div></div></div></div></div></div></section>',
    },
    ajaxRenderedClassName: 'ajax_rendered',
    ajaxRenderedClass: '.ajax_rendered',
    ajaxProcessingClassName: 'ajax_processing',
    ajaxProcessingClass: '.ajax_processing',
    ajaxReadyClassName: 'rndr_ajx',
    ajaxLoadClassName: 'rndr_ajx_load',
    errorMsgClass: '.error_msg',
    loadAjaxModuleRoute: '/ajax/call',
    ajaxCallCnt: 0,
    ajaxHoverClassName: 'rndr_ajx_hover',
    ajaxOnClickClassName: 'rndr_ajx_tab_click',
    skeletonClass: '.skeleton',
    ajaxStateObj: {},
    ajaxStateReady: 'ready',
    ajaxStatePending: 'pending',
    ajaxStateProcessed: 'processed',
    ajaxStateFailed: 'failed',
    rightPopupSectionId: 'popup_list',    
    newThemeParam: (!listLivePortals.includes(ET_PORTAL)) ? 'nt' : '',
    newThemeParamValue: (!listLivePortals.includes(ET_PORTAL)) ? '1' : '',
    defaultAnchorHref: 'javascript:void(0);',
}

// Passive event listeners
jQuery.event.special.touchstart = {
    setup: function( _, ns, handle ) {
        this.addEventListener("touchstart", handle, { passive: !ns.includes("noPreventDefault") });
    }
};
jQuery.event.special.touchmove = {
    setup: function( _, ns, handle ) {
        this.addEventListener("touchmove", handle, { passive: !ns.includes("noPreventDefault") });
    }
};
var userTpye = '';
var leadCaptureDetail = [
    {
        heading: 'Get in Touch',
        // subhead: 'We will get back to you within 48 working hours.',
        footerText: 'By clicking “Submit”, I agree to <a href="/privacy_policy.php" target="_blank">Privacy Policy</a> and <a href="/terms_conditions.php" target="_blank">Terms and Condition</a>.',
        extraFields: {
            field1: `<div class="input-section-main1"><div class="create-section input_sec "><input required="" data-id="" placeholder="" name="" type="text" maxlength="200" id="b2boauth_user_message" class="input_txt_box " value=""><label for="b2boauth_user_message">Message</label><p id="b2boauth_user_message_err" class="error"></p></div><div class="char-length"><span>0</span>/200</div></div>`
        }
    },
    {
        heading: 'Please fill the details to Share your opinion via article ',
        subhead: 'Do read our <a href="/guest-post-guidelines" target="_blank"> Guest-Post Guidelines</a>',
        footerText: 'By clicking “Submit”, I agree to <a href="/privacy_policy.php" target="_blank">Privacy Policy</a> and <a href="/terms_conditions.php" target="_blank">Terms and Condition</a>.',
        extraFields: {
            field2: `<div class="input-section-main1">${EtB2b.commJs.createInputField({ fid: 'b2boauth_designation_name', flabel: 'Designation', addAttributes: [{ name: 'data-param-id', value: 'b2boauth_select_designation' }, { name: 'autocomplete', value: "off" }, { name: 'minlength', value: "2" }, { name: 'maxlength', value: "255" }] })}</div>`,
            field1: `<div class="input-section-main1"><div class="create-section input_sec"><input required="" data-id="" placeholder="" name="" type="text" id="b2boauth_user_message" maxlength="200" class="input_txt_box" value=""><label for="b2boauth_user_message">On what topic would you like to share your Opinion?</label><p id="b2boauth_user_message_err" class="error"></p></div><div class="char-length"><span>0</span>/200</div></div>`
        }
    },
    {
        heading: 'Please fill the details for Speaker Opportunity in our Events',
        subhead: '',
        footerText: 'By clicking “Submit”, I agree to <a href="/privacy_policy.php" target="_blank">Privacy Policy</a> and <a href="/terms_conditions.php" target="_blank">Terms and Condition</a>.',
        extraFields: {
            field2: `<div class="input-section-main1">${EtB2b.commJs.createInputField({ fid: 'b2boauth_designation_name', flabel: 'Designation', addAttributes: [{ name: 'data-param-id', value: 'b2boauth_select_designation' }, { name: 'autocomplete', value: "off" }, { name: 'minlength', value: "2" }, { name: 'maxlength', value: "255" }] })}</div>`,
            field1: `<div class="input-section-main1"><div class="create-section input_select_box"><label for="b2boauth_upcoming_event">Select Preferred Upcoming Event</label><select data-id="" placeholder="Select Value" id="b2boauth_upcoming_event" name="" class="select_sec "><option name="Select">Please select</option></select><p id="b2boauth_upcoming_event_err" class="error"></p></div></div>`,
            field3: `<div class="input-section-main1"><div class="create-section input_sec "><input required="" data-id="" placeholder="" name="" type="text" id="b2boauth_user_message" maxlength="120" class="input_txt_box" value=""> <label for="b2boauth_user_message">Topic you would like to talk about</label><p id="b2boauth_user_message_err" class="error"></p></div><div class="char-length"><span>0</span>/120</div></div>`
        }
    },
    {
        heading: 'Get in Touch',
        // subhead: 'We will get back to you within 48 working hours.',
        footerText: 'By clicking “Submit”, I agree to <a href="/privacy_policy.php" target="_blank">Privacy Policy</a> and <a href="/terms_conditions.php" target="_blank">Terms and Condition</a>.',
        extraFields: {
            field1: `<div class="input-section-main1"><div class="create-section input_sec "><input required="" data-id="" placeholder="" name="" type="text" maxlength="200" id="b2boauth_user_message" class="input_txt_box " value=""><label for="b2boauth_user_message">Message</label><p id="b2boauth_user_message_err" class="error"></p></div><div class="char-length"><span>0</span>/200</div></div>`
        }
    },
];

var leadCaptureSuccess = [
    {
        heading: 'Great, we will get in touch with you soon',
        // subhead: 'We will get back to you within 48 working hours.',
    },
    {
        heading: 'Great, we will let you know if you are shortisted',
        // subhead: 'Wanna get updates, insights, analysis, and opinions of industry leaders?',
        // formbtn: '<button class="btn">Yes, Please subscribe me to Newsletter</button>',
        // conditiontxt:'By continuing you agree to our Privacy Policy & Terms & Conditions',
        // skiptxt:'Skip for now'
    },
    {
        heading: 'Great, we will get in touch with you in case of a suitable opportunity',
        // subhead: 'Wanna get notified for upcoming events?',
        // formbtn: '<button class="btn">Yes, Please notify me</button>',
        // skiptxt:'Skip for now'
    },
    {
        heading: 'Great, we will get in touch with you soon',
    }
]

var pEmail = '';
var set_cookie_email = pEmail;
var slikeApi = (slike_api_key) ? slike_api_key[(deviceType == 'desktop') ? 'web' : 'mweb'] : 'tnr120web5afx9k9l99';
var utmQueries = {};
var utmFlag = true;
var videoid = (window.videoid) ? window.videoid : '';
var slikePlay = false;
var posterUrl = window.posterUrl;
var bookmarkId = '';
var youVideoEvent = '';
var slikePlayerEvent = '';
var notify_data = '';
var news_msid = news_msid || '';
var whatsHapVersion = '';
var upDownObj = [];
var upDownVoteParam = false;
let txtCommentLen = 120;
let toastCount = 0;
var delayNav = 200, setTimeoutConst;
const embedPageShow = ['page-videoListingDetail', 'page-podcastListingDetail'];
var autoPlayVal = 0;

var commentApiUrl = function () {
	var url = 'https://jcms-api.economictimes.indiatimes.com';

	if (typeof environment !== 'undefined' && environmentMap[environment] == 1) {
		url = 'https://jcms-api.economictimes.indiatimes.com';

	} else if (typeof environment !== 'undefined' && typeof environmentMap[environment] !== 'undefined') {
		url = 'https://jcms-api-' + environmentMap[environment] + '.economictimes.indiatimes.com';
	}
    //url = 'https://jcms-api-pawan.economictimes.indiatimes.com';
	return url;
}();
var whatsHappFlag = false;
var content_prime_txt = window.news_video_txt || '';

var bgColorConfig = [
    {
        bgcolor : '#cb802d',
        letters : ['a', 'b', 'c', 'd', 'e'],
    },
    {
        bgcolor : '#135F55',
        letters : ['f', 'g', 'h', 'i', 'j'],
    },
    {
        bgcolor : '#009CB1',
        letters : ['k', 'l', 'm', 'n', 'o'],
    },
    {
        bgcolor : '#8C6CE7',
        letters : ['p', 'q', 'r', 's', 't'],
    },
    {
        bgcolor : '#337ab7',
        letters : ['u', 'v', 'w', 'x', 'y', 'z'],
    }
    
];

var unsubscribeApi = base_url;	

const mediaSizes = {
    'end-small': 1000,
    'mid-small': 680,
};

const commentsPortal = [
    {'portal':'auto','msid':'58341811'}, 
    {'portal':'retail', 'msid':'67257330'}, 
    {'portal':'brandequity', 'msid':'64209609'}, 
    {'portal':'brandequity', 'msid':'62903371'}, 
    {'portal':'telecom', 'msid':'49667640'},
    {'portal':'realty', 'msid':'58588188'},
];

EtB2b.comJs = (function () {

    var htmlspecialchars = function (str) {
        if (typeof (str) == "string") {
            str = str.replace(/&/g, "&amp;"); /* must do &amp; first */
            str = str.replace(/"/g, "&quot;");
            str = str.replace(/'/g, "&#039;");
            str = str.replace(/</g, "&lt;");
            str = str.replace(/>/g, "&gt;");
        }
        return str;
    }
    var rhtmlspecialchars = function (str) {
        if (typeof (str) == "string") {
            str = str.replace(/&gt;/ig, ">");
            str = str.replace(/&lt;/ig, "<");
            str = str.replace(/&#039;/g, "'");
            str = str.replace(/&quot;/ig, '"');
            str = str.replace(/&amp;/ig, '&'); /* must do &amp; last */
        }
        return str;
    }
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

    var ck_en = function (str) {
        if (str) {
            var new_str = '+';
            for (var i = 0; i < str.length; i++) {
                new_str += String.fromCharCode(str.charCodeAt(i) + 7);
            }
            return new_str;
        } else {
            return null;
        }
    }

    var ck_de = function (str) {
        if (str) {
            if (str[0] == '+') {
                var new_str = '';
                for (var i = 1; i < str.length; i++) {
                    new_str += String.fromCharCode(str.charCodeAt(i) - 7);
                }
                return new_str;
            } else {
                return str;
            }
        } else {
            return null;
        }
    }
    var getBrowserInfo = function () {
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var browserName = navigator.appName;
        var fullVersion = '' + parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;

        // In Opera, the true version is after "Opera" or after "Version"
        //if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
        if ((verOffset = nAgt.indexOf("Opera")) != -1 || (verOffset = nAgt.indexOf("OPR")) != -1) {
            browserName = "Opera";
            fullVersion = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf("Version")) != -1)
                fullVersion = nAgt.substring(verOffset + 8);
        }
        // In MSIE, the true version is after "MSIE" in userAgent
        else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
            browserName = "Microsoft Internet Explorer";
            fullVersion = nAgt.substring(verOffset + 5);
        }
        // In Chrome, the true version is after "Chrome" 
        else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
            browserName = "Chrome";
            fullVersion = nAgt.substring(verOffset + 7);
        }
        // In Safari, the true version is after "Safari" or after "Version" 
        else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
            browserName = "Safari";
            fullVersion = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf("Version")) != -1)
                fullVersion = nAgt.substring(verOffset + 8);
        }
        // In Firefox, the true version is after "Firefox" 
        else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
            browserName = "Firefox";
            fullVersion = nAgt.substring(verOffset + 8);
        }
        // In most other browsers, "name/version" is at the end of userAgent 
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
            (verOffset = nAgt.lastIndexOf('/'))) {
            browserName = nAgt.substring(nameOffset, verOffset);
            fullVersion = nAgt.substring(verOffset + 1);
            if (browserName.toLowerCase() == browserName.toUpperCase()) {
                browserName = navigator.appName;
            }
        }
        // trim the fullVersion string at semicolon/space if present
        if ((ix = fullVersion.indexOf(";")) != -1)
            fullVersion = fullVersion.substring(0, ix);
        if ((ix = fullVersion.indexOf(" ")) != -1)
            fullVersion = fullVersion.substring(0, ix);

        majorVersion = parseInt('' + fullVersion, 10);
        if (isNaN(majorVersion)) {
            fullVersion = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }

        return { name: browserName, version: majorVersion };
    }
    var toTitleCase = function (str) {
        return str.replace(/(?:^|\s)\w/g, function (match) {
            return match.toUpperCase();
        });
    }
    var scrollTo = function ($selector, $offset) {
        if (!$offset) {
            $offset = 0
        }
        if (typeof $selector === 'string')
            $selector = $($selector);
        $offset = parseInt($('body').css('padding-top')) + 10 - ($offset);
        if ($selector.length) {
            $('html, body').animate({
                scrollTop: $selector.offset().top - $offset
            }, 1000);
        }
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
    var changebrowserurl = function (url, title, sendga) {
        if (EtB2b.utils.isOperatable(url) && url != document.location.href) {
            var oldurl = document.location.href;
            if (!title) {
                title = document.title;
            }
            if (window.history.replaceState) {
                window.previous_page_url = document.location.href;
                if (canonicalReplaceHistory == 1) {
                    // url = url + '?nt=1';
                    try {
                        window.history.replaceState('page', title, url);
                    } catch (e) { }
                }

                document.title = title;
                if (sendga == 1) {
                    b2b_analtics.send_virtualpageview(url);
                }
            }
        }
    }

    var elementInViewport2 = function (el) {
        var top = el.offsetTop;
        var left = el.offsetLeft;
        var width = el.offsetWidth;
        var height = el.offsetHeight;

        while (el.offsetParent) {
            el = el.offsetParent;
            top += el.offsetTop;
            left += el.offsetLeft;
        }

        return (
            top < (window.pageYOffset + window.innerHeight) &&
            left < (window.pageXOffset + window.innerWidth) &&
            (top + height) > window.pageYOffset &&
            (left + width) > window.pageXOffset
        );
    }

    var getInTouch = function (lid) {
        var getInTouchData = '';
        let type = parseInt(userTpye.split('').pop());
        getInTouchData = leadCaptureDetail[type - 1];

        EtB2b.globalVar.oauthObjConfig.mandatory_official_email = true;
        var touchElm = `<div class="">
            <h2>${getInTouchData.heading ? getInTouchData.heading : ''}</h2>
            <p class="desc">${getInTouchData.subhead ? getInTouchData.subhead : ''}</p>
            <div class="container-get-touch">
            ${EtB2b.commJs.createInputField({
            fid: 'b2boauth_email',
            flabel: 'Official Email'
        })}
            <div class="input-section-main">
                ${EtB2b.commJs.createInputField({
            fid: 'b2boauth_first_name', flabel: 'First Name',
            addAttributes: [{ name: 'maxlength', value: "45" }]
        })}
                                                        
            ${EtB2b.commJs.createInputField({
            fid: 'b2boauth_last_name', flabel: 'Last Name',
            addAttributes: [{ name: 'maxlength', value: "45" }]
        })}
            </div>
            <div class="input-section-main1">
                ${EtB2b.commJs.createInputField({
            fid: 'b2boauth_mobile_num',
            flabel: 'Mobile No',
            parentClass: 'show-on-data',
            dropDown: 'true'
        })}
            </div>
            ${getInTouchData ? (getInTouchData.extraFields.field2 ? getInTouchData.extraFields.field2 : '') : ''}
            <div class="input-section-main1">
				${EtB2b.commJs.createInputField({
            fid: 'b2boauth_company_name', flabel: 'Company',
            addAttributes: [
                { name: 'data-param-id', value: 'b2boauth_select_company' },
                { name: 'autocomplete', value: 'off' },
                { name: 'minlength', value: "2" },
                { name: 'maxlength', value: "255" }]
        })}
            </div>
            ${getInTouchData ? (getInTouchData.extraFields.field1 ? getInTouchData.extraFields.field1 : '') : ''}
            ${getInTouchData ? (getInTouchData.extraFields.field3 ? getInTouchData.extraFields.field3 : '') : ''}
            <div class="footer-msg-txt ${userTpye}">
                <p>${getInTouchData.footerText ? getInTouchData.footerText : ''}</p>
            </div>
            <p class="error" id="form_error"></p>
            
            </div>
            <div class="create-section create-control-btn"> 
                <input type="button" class="btn submit-button2" 
                    onclick="EtB2b.comJs.getProfileSubmitted(${type});" 
                    name="submit_profile" 
                    value="Submit" />
            </div>
        </div>`;
        $('#model_content_' + lid).html(touchElm);
        var portal = portalName || 'ETBrandEquity.com';
        var storage_key = portal + ':' + environment + ':' + 'upcomingEventsWebinarsInfo';
        var ddData = getLocalStorage(storage_key);
        var dropdownData = '';
        $(ddData).each(function (i, v) {
            dropdownData += '<option id="' + v.entity_id + '" value="' + v.entity_type + '">' + v.title + '</option>'
        });

        $('#b2boauth_upcoming_event').append(dropdownData);
        // disableScrollEvent();
        $('html').addClass("sidebarPopup");
    }

    var getcontrol = function (type) {
        EtB2b.model.close_pop(1);
        userTpye = type;
        EtB2b.model.open_pop(getInTouch, 'touch-container', 1);
        setTimeout(function () {
            inputOnchange();
            charLengthCount();
        }, 100);
        $('#b2boauth_designation_name, #b2boauth_company_name, #b2boauth_location').on('input mousedown', function (e) {
            EtB2b.commJs.autoSuggestFieldEvent(this, e);
        });
        var data = EtB2b.commJs.getLocalStorage('oauthUserData');


        if (EtB2b.utils.isOperatable(data)) {
            data = data.data;
            data.city = $.trim(((typeof data.city != 'undefined') && (data.city != '')) ? data.city : '');
            data.company = $.trim((typeof data.company != 'boolean') ? data.company : '');
            data.designation = $.trim((typeof data.designation != 'boolean') ? data.designation : '');
            data.email = $.trim(data.email);
            data.official_email = $.trim(data.email);
            data.first_name = $.trim(data.first_name);
            data.last_name = $.trim(data.last_name);
            data.mobile = $.trim((typeof data.mobile != 'boolean') ? data.mobile : '')

            EtB2b.commJs.autoSuggestCountryCode({
                isd_code: data.isd_code,
                country_code: data.country_code
            });
            var isdCode = data.isd_code;
            setTimeout(function () {
                if (data.country_code && isdCode) {
                    $('.b2boauth-custom-select .select-selected').attr('data-country-code', data.country_code);
                    $('.b2boauth-custom-select .select-selected').attr('data-isd-code', isdCode);
                    $('.b2boauth-custom-select .select-selected').html('+' + isdCode + '<i class="fa fa-angle-down"></i>');
                }
            }, 1000);

            $('#b2boauth_email').val(data.official_email);
            $('#b2boauth_first_name').val(data.first_name);
            $('#b2boauth_last_name').val(data.last_name);
            $('#b2boauth_mobile_num').val(data.mobile);
            $('#b2boauth_company_name').val(data.company);
            $('#b2boauth_designation_name').val(data.designation);

            $('.container-get-touch .input_txt_box').each(function (i, val) {
                $(this).val() ? $(this).addClass('valid') : $(this).removeClass('valid');
            });
        } else {
            EtB2b.commJs.autoSuggestCountryCode();
        }

    }

    var getProfileSubmitted = function (type) {
        var data = {};
        data.email = EtB2b.utils.encodeHTML($('#b2boauth_email').val());
        data.first_name = EtB2b.utils.encodeHTML($('#b2boauth_first_name').val());
        data.last_name = EtB2b.utils.encodeHTML($('#b2boauth_last_name').val());
        data.company = EtB2b.utils.encodeHTML($('#b2boauth_company_name').val());
        data.designation = EtB2b.utils.encodeHTML($('#b2boauth_designation_name').val());
        data.mobile = EtB2b.utils.encodeHTML($('#b2boauth_mobile_num').val());
        data.country_code = EtB2b.utils.encodeHTML($('.b2boauth-custom-select .select-selected').attr('data-country-code')) || 'In';
        data.isd_code = EtB2b.utils.encodeHTML($('.b2boauth-custom-select .select-selected').attr('data-isd-code')) || 0;
        data.message = EtB2b.utils.encodeHTML($('#b2boauth_user_message').val());
        data.type = type;

        if (type == 3) {
            let elmd = document.getElementById("b2boauth_upcoming_event");
            data.entity_id = elmd.options[elmd.selectedIndex].id;
            data.entity_type = elmd.options[elmd.selectedIndex].value;
        }

        $('#form_error').html('');

        $(".container-get-touch input").each(function (e) {
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

            var cap_request = {
                url: '/capture_leads',
                type: 'post',
                data: data
            }

            $.ajax({
                url: cap_request.url + '?' + EtB2b.globals.newThemeParam,
                type: cap_request.type || 'POST',
                data: cap_request.data,
                crossDomain: true,
                success: function (response) {

                    //console.log(response);
                    $('#form_error').html('');
                    if (response.status) {
                        //console.log('form submitted successfully');
                        //show form success screen based on type here
                        let getInTouchSuccess = '';
                        let type = parseInt(userTpye.split('').pop());
                        getInTouchSuccess = leadCaptureSuccess[type - 1];

                        var cnfmMsg = `
                                        <div class="${userTpye}"><img width="50" height="50" class="success-img-tick" src="/Themes/Release/theme4/images/icons/success-gif.gif" alt="" /><h2>${getInTouchSuccess.heading ? getInTouchSuccess.heading : ''}</h2>
                                        <div class="small-divider hide"></div>
                                        <p class="desc">${getInTouchSuccess.subhead ? getInTouchSuccess.subhead : ''}</p>
                                        ${getInTouchSuccess.formbtn ? getInTouchSuccess.formbtn : ''}
                                        <p class="txt-condition">${getInTouchSuccess.conditiontxt ? getInTouchSuccess.conditiontxt : ''}</p>
                                        <p class="txt-skip">${getInTouchSuccess.skiptxt ? getInTouchSuccess.skiptxt : ''}</p></div>
                                    `;
                        EtB2b.commJs.showSuccessMessage(cnfmMsg, "", 'success-touch-container');

                    } else {
                        if (response.errors) {

                            var errors = response.errors;
                            Object.keys(errors)
                                .filter(function (key) {
                                    return Object.prototype.hasOwnProperty.call(errors, key);
                                })
                                .forEach(function (key) {
                                    $('#form_error').html(errors[key]); return false;
                                });
                        } else {
                            $('#form_error').html(response.message);
                        }
                    }
                },
                error: function (data, XMLHttpRequest, textStatus, errorThrown) {
                    //console.log(data);
                }
            });
        }
    }

    var localStorageSpace = function () {
        var allStrings = '';
        for (var key in window.localStorage) {
            allStrings += key;
            if (window.localStorage.hasOwnProperty(key)) {
                allStrings += window.localStorage[key];
            }
        }
        return allStrings ? 3 + ((allStrings.length * 16) / (8 * 1024)) : 'Empty (0 KB)';
    };

    var checkStorageExceed = function () {
        if (localStorageSpace() > 4900) {
            window.localStorage.clear();
        }
    };

    var hitAjaxApi = function (requestSet, ajaxSuccess, ajaxError) {
		if (EtB2b.utils.isOperatable(requestSet)) {
			requestSet = requestSet || {};
			requestSet.data = requestSet.data || {};
            requestSet.data.portal = ET_PORTAL;
			$.ajax({
				url: requestSet.url,
				type: requestSet.type || 'POST',
				data: requestSet.data,
                xhrFields: { withCredentials: true },
				crossDomain: true,
                //headers: { 'portal': ET_PORTAL},
				success: function (data) {
					ajaxSuccess(data);
				},
				error: function (data, XMLHttpRequest, textStatus, errorThrown) {
					ajaxError(data);
				}
			});
		}
	}

    return {
        getQueryParams: getQueryParams,
        getBrowserInfo: getBrowserInfo,
        ck_de: ck_de,
        ck_en: ck_en,
        toTitleCase: toTitleCase,
        scrollTo: scrollTo,
        addDynamicCss: addDynamicCss,
        changebrowserurl: changebrowserurl,
        elementInViewport2: elementInViewport2,
        getcontrol: getcontrol,
        getProfileSubmitted: getProfileSubmitted,
        checkStorageExceed: checkStorageExceed,
        hitAjaxApi        : hitAjaxApi,
    }
})();

var unsubcribeSuccess = [{}];

// cookies and local storage
function getCookie(c_name) {
    if (isGDPRNation())
        return b2bGdpr.getStorage(c_name);
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

function setCookie(c_name, value, exdays) {
    if (isGDPRNation()) {
        if (exdays < 0 || exdays == 0) {
            return b2bGdpr.deleteStorage(key);
        } else {
            return b2bGdpr.setStorage(c_name, value, exdays);
        }
    }
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; path=/; domain=" + COOKIE_SET_DOMAIN + "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

function setLocalStorage(key, data, exdays) {
    var $data = {};
    $data['expires'] = Math.floor(Date.now() / 1000) + exdays * 24 * 60 * 60;
    $data['data'] = data;
    localStorage.setItem(key, JSON.stringify($data));
}

function getLocalStorage(key) {
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
    } else
        return null;
}

function deleteLocalStorage(key) {
    localStorage.removeItem(key);
}

function deleteCookie(name) {
    setCookie(name, '', 0);
}

const inputOnchange = () => {
    $('.container-get-touch .input_txt_box').on('change', function (e) {
        $(this).val() ? $(this).addClass('valid') : $(this).removeClass('valid');
    });
}

EtB2b.socialShare = (function () {
    var sharepage = function ($type, $metaObj, $dialog) {
        var orgurl;
        var tags = [];
        var twtags = [];
        var fbtags = [];
        if ($metaObj && $metaObj['tags']) {
            tags = $metaObj['tags'];
        } else
            tags = (typeof meta != 'undefined' && typeof meta['keywords'] != 'undefined') ? meta['keywords'].split(',') : [];
        var taggs = [];
        for (i = 0; i < 5; i++) {
            v = tags[i];
            if (v) {
                taggs.push(v.replace('#', '').replace(' ', ''));
            }
        }
        for (i = 0; i < taggs.length; i++) {
            v = taggs[i];
            twtags.push(v.replace('#', ''))
        }
        for (i = 0; i < taggs.length; i++) {
            v = taggs[i];
            fbtags.push('#' + v);
        }
        if (!($metaObj)) {
            $url = orgurl;
            $title = meta['title'];
            $description = meta['description'];
            $image = (meta['image'][0]) ? meta['image'][0] : '';
        } else {
            $url = $metaObj['url'];
            $title = $metaObj['title'];
            $description = $metaObj['description'];
            $image = ($metaObj['image']) ? $metaObj['image'] : '';
        }
        $image = $image.replace('/thumb', '');
        $orgurl = $url;
        $title = encodeURIComponent($title);
        $description = encodeURIComponent($description);
        socialdata = {};
        //socialdata['tw_handle'] = window.location.host;
        var shareEvents = [{ 'type': 'fb', 'value': 'Facebook', 'actionType': 'share' }, { 'type': 'tw', 'value': 'Twitter', 'actionType': 'tweet' }, { 'type': 'lnkin', 'value': 'LinkedIN', 'actionType': 'share' }, { 'type': 'telegram', 'value': 'Telegram', 'actionType': 'share' }, { 'type': 'Whatsapp', 'value': 'Whatsapp', 'actionType': 'share' }, { 'type': 'email', 'value': 'Email', 'actionType': 'share' }];
        for (var i = 0; i < shareEvents.length; i++) {
            if ($type == shareEvents[i].type) {
                var dataset = {
                    socialnetwork: shareEvents[i].value,
                    actiontype: shareEvents[i].actionType,
                    event: 'socialaction'
                };
                dataLayer.push(dataset);
                if ($type == 'email') {
                    return false;
                }
            }
        }
        socialdata['tw_handle'] = twitter_handle ? twitter_handle.replace('@', '') : window.location.host;
        socialdata['fb_appid'] = FACEBOOK_APPID;
        $via = socialdata['tw_handle'];

        if ($type == 'fb') {
            $utmurl = encodeURIComponent($url);
            $shareurl = 'http://www.facebook.com/sharer.php?u=' + $utmurl;
        } else if ($type == 'tw') {
            $utmurl = encodeURIComponent($url);
            $shareurl = 'http://twitter.com/share?url=' + $utmurl + '&text=' + $title + '&hashtags=' + twtags.join(',') + '&via=' + $via;
        } else if ($type == 'gg') {
            $utmurl = encodeURIComponent($url);
            $shareurl = 'https://plusone.google.com/_/+1/confirm?hl=en&url=' + $utmurl;
        } else if ($type == 'lnkin') {
            $utmurl = encodeURIComponent($url);
            $shareurl = 'https://www.linkedin.com/shareArticle?mini=true&url=' + $utmurl + '&title=' + $title + '&summary=' + $description + '&source=ETB2b';
        } else if ($type == 'telegram') {
            $utmurl = encodeURIComponent($url);
            $shareurl = 'https://telegram.me/share/url?url=' + $title + ' - ' + $utmurl + '&summary=' + $description + '&source=ETB2b';
        } else if ($type == 'Whatsapp') {
            if (deviceType != 'mobile') {
                $utmurl = encodeURIComponent($url);
                $shareurl = 'https://api.whatsapp.com/send?text=' + $title + ' - ' + $utmurl + '&summary=' + $description + '&source=ETB2b';
            } else {
                $utmurl = encodeURIComponent($url);
                $shareurl = 'whatsapp://send?text=' + $title + ' - ' + $utmurl + '&summary=' + $description + '&source=ETB2b';
            }
        } else {
            $shareurl = 'mailto:?subject=' + $title + '&body=' + encodeURIComponent($url);
        }

        if ($type == 'navigator') {
            if (typeof navigator.share != 'undefined') {
                navigator.share({
                    text: decodeURIComponent($title),
                    url: decodeURIComponent($url)
                });
            } else if (typeof $metaObj['obj'] != 'undefined' && typeof $metaObj['obj'].attr('data-navigator-fallback-function') != 'undefined') {
                eval($metaObj['obj'].attr('data-navigator-fallback-function'));
            } else {
                popitup('sharewindow', $shareurl, '');
            }
        } else {
            if ($type == 'Whatsapp' && deviceType == 'mobile') {
                window.location.href = $shareurl;
            } else {
                popitup('sharewindow', $shareurl, '');
            }
        }
        var socialGAObj = { hitType: "social", socialNetwork: (($type == 'fb') ? 'Facebook' : (($type == 'tw') ? 'Twitter' : (($type == 'lnkin') ? 'LinkedIn' : 'WAPNative'))), socialAction: ($type == 'tw') ? 'Tweet' : 'Share', socialTarget: $url };
        //ga("send", socialGAObj);
    }
    window.windowname = 1;

    var sharewindow = 'sharewindow';
    var popitup = function (name, url, trgt) {
        name = sharewindow + windowname;
        newwindow = window.open(url, name, 'height=600,width=600,toolbar=no,titlebar=no,status=no,resizable=no,menubar=no,location=no,top=100,left=300,screenX=300,screenY=100');
        if (trgt != '') {
            newwindowTarget = trgt;
            windowWatcher();
        }
        if (window.focus) {
            if (newwindow != null) {
                newwindow.focus();
            }
        }

        windowname = windowname + 1;
        return false;
    }
    window.facebook_share = function (link_url, image_url, title, description) { EtB2b.socialShare.sharepage('fb', { 'url': link_url, 'title': decodeURI(title), 'description': decodeURI(description), 'image': image_url }) };
    window.twitter_share = function (title, link_url) { EtB2b.socialShare.sharepage('tw', { 'url': link_url, 'title': decodeURI(title) }) };
    window.linkedin_share = function (title, link_url, description, source) { EtB2b.socialShare.sharepage('lnkin', { 'url': link_url, 'title': decodeURI(title), 'description': decodeURI(description) }) };
    window.whatsapp_share = function (title, link_url, description, source) { EtB2b.socialShare.sharepage('Whatsapp', { 'url': link_url, 'title': decodeURI(title), 'description': decodeURI(description) }) };
    window.telegram_share = function (title, link_url, description, source) { EtB2b.socialShare.sharepage('telegram', { 'url': link_url, 'title': decodeURI(title), 'description': decodeURI(description) }) };
    return {
        sharepage: sharepage
    }
})();

EtB2b.primePopup = (function () {

    var primeLoginBehind = function (parentElmnt) {
        parentElmnt = parentElmnt || '';
        var popupData = `<section class="prime_paywall">
            <div class="paywall_container">
                <ul><li class="exclusive-item">Exclusive</li></ul>
                <h3 class="paywall_msg">It's a free ${content_prime_txt}, simply login/signup to unlock</h3>
                <p class="paywall_desc">Get in-depth Industry Insights and Analysis through our “Exclusive” content, presented to you by our esteemed panel of writers, for free</p>
                <div class="login-options hide" data-option="1">                	
                <div class="lg_obtn oauth_ggl"><div class="ggl_user_btn"><span class="lg_sprite lg_icon"></span><span class="g-icon-text">Continue with Google</span></div></div><div class="lg_obtn oauth_lin"><span class="lg_sprite1 lg_icon"><i class="fa fa-linkedin"></i></span><span class="lin-icon-text">Continue with Linkedin</span></div><div class="other-option-setion"><div class="lg_obtn oauth_fb"><div class="fb_user_btn"><span class="lg_sprite1 lg_icon"><i class="fa fa-facebook-f"></i></span><span class="fb-icon-text">Continue with Facebook</span></div><div id="fb-root"></div><div class="fb-profile-data"><div style="width:100%" data-onlogin="continueWithFBLogin_CB" class="fb-login-button" data-max-rows="1" data-width="100%" data-size="large" data-button-type="continue_with" data-layout="default" data-auto-logout-link="false" data-callback="alert" data-use-continue-as="true"></div></div></div><div class="lg_obtn oauth_lgn_email"><span class="lg_sprite1 lg_icon"><img src="/Themes/Release/images/responsive/email-icon.png" alt=""></span><span class="lin-icon-text">Continue With Email ID</span></div></div><div class="other-options"><button type="button" class="btn more-signin-option">More Sign in options</button></div></div><p class="paywall_desc desc_bottom padd-bottom0">By continuing, you agree to the 
				<a target="_blank" class="link" href="${base_url + '/terms_conditions.php'}">T&amp;C</a>, 
				<a target="_blank" class="link" href="${base_url + '/privacy_policy.php'}">Privacy Policy</a> and 
				<a target="_blank" class="link" href="${base_url + '/terms_conditions.php#prohibited_cnt'}">Prohibited Content Policy</a>. 
				This same account can be used across all ET B2B portals.</p></div><div class="sec-separate clearfix"></div></section>`;
        return popupData;
    }
    var primeSubscription = function () {
        var popupData = `<section class="prime_paywall"> <div class="paywall_container"> <h3 class="paywall_msg"> To Read the Full Story, <br/> Become an <span>'+SITE_NAME_TITLE+'</span> Member </h3> <p class="paywall_desc">Access the exclusive '+SITE_NAME_TITLE+' stories, Editorial and Expert opinion</p><div class="row"> <div class="col-md-4 plan_box"> <div class=""> <h3>Monthly Plan</h3> <p class="plan_summ">12-month access to 200+ stories, archive of 800+ stories from our India edition. Plus our premium newsletters, Beyond The First Order and The Nutgraf worth Rs. 99/month or $2/month each for free.</p><p class="plan_price">&#x20B9; 399</p><div class="subscribe_btn"><button class="btn" type="button">Subscribe</button></div><p></p></div></div><div class="col-md-4 plan_box"> <div class=""> <h3>Yearly Plan</h3> <p class="plan_summ">12-month access to 200+ stories, archive of 800+ stories from our India edition. Plus our premium newsletters, Beyond The First Order and The Nutgraf worth Rs. 99/month or $2/month each for free.</p><p class="plan_price">&#x20B9; 2499</p><div class="subscribe_btn"><button class="btn" type="button">Subscribe</button></div><p class="cancelTxt">You can cancel anytime.</p></div></div><div class="col-md-4 plan_box"> <div class=""> <h3>2-Year Plan</h3> <p class="plan_summ">12-month access to 200+ stories, archive of 800+ stories from our India edition. Plus our premium newsletters, Beyond The First Order and The Nutgraf worth Rs. 99/month or $2/month each for free.</p><p class="plan_price">&#x20B9; 3599</p><div class="subscribe_btn"><button class="btn" type="button">Subscribe</button></div><p class="cancelTxt">You can cancel anytime.</p></div></div></div><div class="enterprize_plan"> <p><strong>Enterprise Plan:</strong> Knowledge is Power. Get your leadership team and your entire company be updated with top exclusive in-depth articles, webinars, trainings and masterclasses with '+SITE_NAME_TITLE+'. <a href="">Enroll Now</a>.</p><p>Attractive Plans available for colleges as well. <a href="">Explore more</a></p></div><h3 class="head_benefits">What do you with <span>'+SITE_NAME_TITLE+'</span> Membership</h3> <div class="prime_benefits clearfix"> <ul class="benefits"> <li> <figure> <img src="/Themes/Release/images/benefits_img.png" alt=""/> </figure> <h4>Exclusive Stories</h4> <p>Sharp Insight-rich, Indepth stories across</p></li><li> <figure> <img src="/Themes/Release/images/benefits_img.png" alt=""/> </figure> <h4>First with the News</h4> <p>Access the exclusive '+SITE_NAME_TITLE+' stories, Editorial and Expert opinion</p></li><li> <figure> <img src="/Themes/Release/images/benefits_img.png" alt=""/> </figure> <h4>Minimal Ads</h4> <p>Clean experience with Minimal Ads</p></li><li> <figure> <img src="/Themes/Release/images/benefits_img.png" alt=""/> </figure> <h4>Priority pass</h4> <p>Exclusive invites to Virtual Events with Industry Leaders</p></li><li> <figure> <img src="/Themes/Release/images/benefits_img.png" alt=""/> </figure> <h4>On Demand '+SITE_NAME_TITLE+'</h4> <p>Exclusive invites to Virtual Events with Industry Leaders</p></li></ul> </div></div></section>`;
        $('.post-text').append(popupData);
    }

    return {
        primeSubscription: primeSubscription,
        primeLoginBehind: primeLoginBehind,
    }
})();

EtB2b.articleFeatures = (function () {
    var preventCopy = function (isWapView, utm) {
        const d = document;
        const b = d.body;
        // const de = d.documentElement;
        // eslint-disable-next-line no-eval
        const C = eval('/*@cc_on!@*/false');
        const _ga_utm = `utm_source=contentofinterest&utm_medium=text&utm_campaign=${utm && utm.length > 0 ? utm : 'cppst'
            }`;
        let AE;
        // eslint-disable-next-line no-unused-vars
        let RE;
        // eslint-disable-next-line no-shadow
        const sp = (a, b) => {
            Object.assign(b, a);
            // for (const c in a) if (a.hasOwnProperty(c)) b[c] = a[c];
        };
        const bo = (a, be, c) => {
            const ae = d.createElement(a);
            sp(be, ae);
            sp(c, ae.style);
            return ae;
        };
        const tc = () => {
            let so;
            let st = '';
            const reg1 = /\w+/gi;
            let linkFlg = true;
            if (window._gaq) {
                window._gaq.push(['_trackEvent', 'cppst', 'select', 'cntntcp']);
            }
            if (d.selection && d.selection.createRange) {
                so = d.selection.createRange();
                st = so.htmlText;
                if (st.match(reg1) && st.match(reg1).length > 4) {
                    linkFlg = true;
                    st = st.replace(/(<a([^>]+)>)/gi, '');
                    st = st.replace(/(<([^>]+)a>)/gi, '');
                    st = st.length > 60 ? `${st.substring(0, 60)}&nbsp;..` : st;
                    st = st.replace(/\n/gi, '<br />');
                    st += '<br />';
                }
            } else {
                so = window.getSelection();
                st = so.toString();
                if (st.match(reg1) && st.match(reg1).length > 4) {
                    if (so.rangeCount) {
                        const container = bo(
                            'div',
                            { id: 'copiedTextClone' },
                            { display: 'none' },
                        );
                        linkFlg = true;
                        const len = so.rangeCount;
                        // eslint-disable-next-line no-plusplus
                        for (let i = 0; i < len; ++i) {
                            container.appendChild(so.getRangeAt(i).cloneContents());
                        }
                        st = container.innerHTML;
                        st = st.replace(/(<a([^>]+)>)/gi, '');
                        st = st.replace(/(<([^>]+)a>)/gi, '');
                        st = st.length > 80 ? `${st.substring(0, 80)}&nbsp;..` : st;
                    }
                }
            }
            let lnkurl = window.location.href;
            if (linkFlg) {
                const lnk = `<br /><br /><div style='font-size:12px;font-family:arial'>Read more at:<br /><a href='${lnkurl}'>${lnkurl}</a></div>`;
                st = `${st} ${lnk}`;
            }
            $('.twitter-share-btn').hide();
            $('.twitter-share-btn').addClass('hide');
            const e = bo(
                'div',
                {},
                { position: 'fixed', top: 0, left: '-99999px', background: '#fff' },
            );
            b.appendChild(e);
            e.innerHTML = st;
            if (so.selectAllChildren) {
                so.selectAllChildren(e);
            } else {
                const m = b.createTextRange();
                m.moveToElementText(e);
                m.select();
            }
            window.setTimeout(() => {
                b.removeChild(e);
            }, 0);
        };
        const ca = a => {
            // eslint-disable-next-line no-use-before-define
            SE();
            // eslint-disable-next-line no-unused-expressions
            d.readyState === 'complete'
                ? a()
                : AE(window, 'load', () => {
                    setTimeout(() => {
                        if (typeof d.readyState === 'undefined' && !C)
                            d.readyState = 'complete';
                        a();
                    }, 10);
                });
        };
        let SE = () => {
            if (window.addEventListener) {
                AE = (a, be, c) => {
                    a.addEventListener(be, c, false);
                };
                RE = (a, be, c) => {
                    a.removeEventListener(be, c, false);
                };
            } else {
                AE = (a, be, c) => {
                    a.attachEvent(`on${be}`, c);
                };
                RE = (a, be, c) => {
                    a.detachEvent(`on${be}`, c);
                };
            }
        };
        const init = () => {
            if (window.addEventListener) {
                b.addEventListener('copy', tc);
            } else {
                b.attachEvent('oncopy', tc);
            }
        };
        return ca(init);
    }
    return {
        preventCopy: preventCopy,
    }
})();

const toastMsg = (tmsg) => {
    $('.info_consentmsg').remove();
    let cnsetMsg = `<div class="info_success info_consentmsg">
                        <div class="info_success__inner">
                        <span>${tmsg}</span>
                        <a class="info_close"><span class="sprite-icon-img close-info"></span></a>    
                        </div>                
                        </div>`;
    $('body').append(cnsetMsg);
    setTimeout(function () {
        $('.info_consentmsg').remove();
    }, 4000);
    $('body').on('click', '.info_close', function () {
        $('.info_consentmsg').remove();
    });
}

const resetToHome = () => {
    $('.site-header__outer').addClass('hide');
    $('.navigation-hover__item').addClass('hide');
    $('.layer-overlay').addClass('hide');

};

const whatsHappeingDataLayer = (evtParam, evtCrr) => {
    let whatsImp = whatsHapVersion == 1 && $('.page-newsDetail').length ? '_compact' : '';
    let eventName = evtCrr.parents('.mid-current-promo__inner').attr('data-event');
    let eventSelect = '';
    if(evtParam == 'Clicks'){
        eventSelect = evtCrr.parents('.mid-current-promo__slide');
    } else {
        eventSelect = evtCrr;
    }
    let dataset = {
        event : evtParam+" - "+ eventName + whatsImp,
        widget_card_CTA : eventSelect.find('.btn-invert').text(),
        widget_card_no  : eventSelect.find('.mid-current-promo__box').attr('data-index'),
        widget_card_activity_title : eventSelect.find('h4').text(),
        widget_card_activity_type : eventSelect.find('h3').text(),
    };        
    dataLayer.push(dataset);
}

const handleHeaderSticky = () => {
    if ($(window).width() > mediaSizes["end-small"]) {
        addEventListener("scroll", (event) => {
            if ($('.top-promos').length) {
                if ($(window).scrollTop() > $('.top-promos').offset().top) {
                    $('.site-header-nosticky').removeClass('hide');
                    $('.site-header-sticky').addClass('sticky');
                    $('.main-content').addClass('skinnin-sticky');
                    $('#closeDiv').addClass('closeDiv');
                    $('#Skin_LP_left, #Skin_LP_right').addClass('anchor-fixed');
                    //setOverLayOnHover();
                    subNavHoverFeature();
                } else {
                    resetToHome();
                    $('.site-header-sticky').removeClass('sticky');
                    $('.site-header-nosticky').addClass('hide');
                    $('.main-content').removeClass('skinnin-sticky');
                    $('#closeDiv').removeClass('closeDiv');
                    $('#Skin_LP_left, #Skin_LP_right').removeClass('anchor-fixed');                    
                    subNavHoverFeature();
                }
            } else {
                if ($(window).scrollTop() > $('.site-header').height()) {
                    $('.site-header').addClass('sticky');
                    $('.main-content').addClass('skinnin-sticky');
                    $('#closeDiv').addClass('closeDiv');
                    $('#Skin_LP_left, #Skin_LP_right').addClass('anchor-fixed');
                } else {
                    resetToHome();
                    $('.site-header').removeClass('sticky');
                    $('.main-content').removeClass('skinnin-sticky');
                    $('#closeDiv').removeClass('closeDiv');
                    $('#Skin_LP_left, #Skin_LP_right').removeClass('anchor-fixed');
                }
            }
        });
    }
    $(window).on('scroll', function () {
        if ($('.news-landing-section__inner__category__container').length) {
            if ($(window).scrollTop() > $('.news-landing-section__inner__category__container').offset().top) {
                $('#cat_news_header_sticky').addClass('sticky-category-elm');
            } else {
                $('#cat_news_header_sticky').removeClass('sticky-category-elm');
            }
        }
        try {
            $('.currentlyInViewport .prime_paywall:not(.item-inviewport):in-viewport').each(function (i, v) {
                $(this).addClass('item-inviewport');
                var eventImp = abTestVersion ? 'cbs2_v' + abTestVersion : 'cbs2';
                EtB2b.login.gtmHelper({
                    event: 'login_widget_imp',
                    portal_name: ET_PORTAL,
                    login_source_type: 'Exclusive',
                    product_case: 'product_news - Exclusive',
                });
            });
        } catch (e) { }
        if (window.pageYOffset) {
            $('.show-after-subscription').addClass('btn-with-text-app');
            $('.news-listing li, .wrapper_style2 footer').removeClass('hide');
        } else {
            $('.show-after-subscription').removeClass('btn-with-text-app');
        }
        try{
            $('.mid-current-promo__container .mid-current-promo__slide:not(.item-inviewport):in-viewport').each(function (i, v) {
                $(this).addClass('item-inviewport');
                let crthis = $(this);
                whatsHappeingDataLayer('Impression', crthis);
            });
        } catch (e){}        
    });
};

const handleNavElementsLayout = (attrID) => {
    if ($(window).width() > mediaSizes["end-small"]) {
        let $navheader = $(attrID);
        if ($navheader.length) {
            $totalListwidth = $navheader[0]['offsetWidth'];
            $layerWidth = $navheader.find('.more').outerWidth(true) + 100;
            $(attrID + ' > ul > li').each(function () {
                if (!($(this).hasClass('more'))) {
                    $layerWidth1 = $(this).outerWidth(true);
                    $layerWidth = $layerWidth + $layerWidth1;
                    if ($layerWidth > $totalListwidth) {
                        $(attrID + ' ul .more ul').append($(this)[0].outerHTML);
                        $(this).remove();
                        $(attrID + ' ul .more').removeClass('hide');
                    }
                }
            });
        }
        $('#cat_news_header_sticky .more ul').css('left', $('#cat_news_header_sticky .more').offset().left);
    }

};

const scrollUpDown = () => {
    var lastScrollTop = 0;
    if ($(window).width() < mediaSizes["end-small"]) {
        $(window).scroll(function (event) {
            var st = $(this).scrollTop();
            if (st > lastScrollTop) {
                // scroll down side
                $('.mobile-header').addClass('bottom-nav');
                //$('.site-header').removeClass('sticky');
                $('.site-header-sticky').removeClass('sticky');
                $('.site-header-nosticky').addClass('hide');
                $('.footer').css('padding-bottom', '0');
                $('body').addClass('win-scroll-down');
                $('body').removeClass('win-scroll-up');
                $('#youtubeIframeVideo, #playerContainer1, .podcast-player').addClass('pip-top');
                $('#iframeVideo .video-close-btn').addClass('close-top');
            }
            else if (st == lastScrollTop) {
                //do nothing 
                //In IE this is an important condition because there seems to be some instances where the last scrollTop is equal to the new one
            }
            else {
                //scroll up side
                $('.mobile-header').removeClass('bottom-nav');
                $('.footer').css('padding-bottom', '70px');
                if ($('.top-promos').length) {
                    if ($(window).scrollTop() > $('.top-promos').offset().top) {
                        //$('.site-header').addClass('sticky');
                        $('.site-header-sticky').addClass('sticky');
                        $('.site-header-nosticky').removeClass('hide');
                    } else {
                        //$('.site-header').removeClass('sticky');
                        $('.site-header-sticky').removeClass('sticky');
                        $('.site-header-nosticky').addClass('hide');
                    }
                } else {
                    if ($(window).scrollTop() > $('.site-header').height()) {
                        $('.site-header-sticky').addClass('sticky');
                        $('.site-header-nosticky').removeClass('hide');
                    } else {
                        $('.site-header-sticky').removeClass('sticky');
                        $('.site-header-nosticky').addClass('hide');
                    }
                }
                $('body').addClass('win-scroll-up');
                $('body').removeClass('win-scroll-down');
                $('#youtubeIframeVideo, #playerContainer1, .podcast-player').removeClass('pip-top');
                $('#iframeVideo .video-close-btn').removeClass('close-top');
            }
            lastScrollTop = st;
        });
    }
}

const handleSearchEvents = () => {
    $("#search_form").on('submit', function (e) {
        if ($(e.currentTarget).children("[name=q]").length) {
            if ($(e.currentTarget).children("[name=q]").val().trim().length == 0) {
                e.preventDefault();
                return;
            }
            var url_param= $(e.currentTarget).children("[name=q]").val().trim().replace(/\s+/g, "+");
            $(e.currentTarget).attr('action', encodeURI($(e.currentTarget).attr('action') + '/' + url_param));
        }
        var searctTextData = $(e.currentTarget).children("[name=q]").val();
        var seachtext = searctTextData.replace('+', " ");
        $(e.currentTarget).children("[name=q]").remove();
        $('#search_form').prepend('<input type="text" class="top-panel__search--input">');
        $('.top-panel__search--input').val(seachtext);
    });

    $("#search_form_mob").on('submit', function (e) {
        if ($(e.currentTarget).children("[name=q]").length) {
            if ($(e.currentTarget).children("[name=q]").val().trim().length == 0) {
                e.preventDefault();
                return;
            }
        }
        var searctTextData = $(e.currentTarget).children("[name=q]").val();
        var seachtext = searctTextData.replace('+', " ");
        var url_param= $(e.currentTarget).children("[name=q]").val().trim().replace(/\s+/g, "+");
        $(e.currentTarget).attr('action', encodeURI($(e.currentTarget).attr('action') + '/' + url_param));
        $(e.currentTarget).children("[name=q]").remove();
        $('#search_form_mob').prepend('<input type="text" class="mobile-header__search--input">');
        $('.mobile-header__search--input').val(seachtext);
    });

    $("#search_form_search").on('submit', function (e) {
        if ($(e.currentTarget).children("[name=q]").length) {
            if ($(e.currentTarget).children("[name=q]").val().trim().length == 0) {
                e.preventDefault();
                return;
            }
            var url_param= $(e.currentTarget).children("[name=q]").val().trim().replace(/\s+/g, "+");
            $(e.currentTarget).attr('action', encodeURI($(e.currentTarget).attr('action') + '/' + url_param));
        }
        var searctTextData = $(e.currentTarget).children("[name=q]").val();
        var seachtext = searctTextData.replace('+', " ");
        $(e.currentTarget).children("[name=q]").remove();
        $('#search_form_search').prepend('<input type="text" class="search-panel__search--input">');
        $('.search-panel__search--input').val(seachtext);
    });

    $('.top-panel__search--submit').on('click', function () {
        $("#search_form").submit();
    });

    $('.mobile-header__search--btn').on('click', function () {
        $("#search_form_mob").submit();
    });

    $('.search-panel__search--submit').on('click', function () {
        $("#search_form_search").submit();
    });
}

const handleUserEvents = () => {

    $('.site-header__inner *:not(.site-header a, .site-header button, .site-header__outer a, site-header__outer button, site-header__outer li)').on('click', function (e) {
        resetToHome();
    });

    $(document).on('click', '.mobile-header__user--desc a', function () {
        $('.mobile-header__nav--more, .mobile-header__user--head, .mobile-header__callout').removeClass('active');
        $('.mobile-header__callout--close, .mobile-header__nav--more').removeClass('js-btn-mob-close');
        $('.mobile-header__user--head').siblings('.mobile-header__user--desc').addClass('hide');
        const body = document.body;
        body.style.height = 'auto';
        body.style.overflowY = 'auto';
    });

    $(document).on('click', '.search-panel__search--close', function (e) {
        $('.search-panel__search--input').val('');
        $('.search-panel__search--input').focus();
    });

    $(document).on('click', '.layer-overlay', function () {
        resetToHome();
        $('.top-panel__search--close').trigger('click');
        $('.site-header').removeClass('menu-active');
        $('html').removeClass("leftsidebarPopup");
        $('.top-secondary-nav').css('top', '0');
        $('.top-secondary-nav .navigation__more--dropdown').css('padding-bottom', '16px');
        enableScroll();
        enableScrollEvent();
    });

    (function () {
        var pEmail_arr = EtB2b.comJs.ck_de(getCookie(ET_PORTAL + '_pop_user_sub'));
        if (pEmail_arr) {
            pEmail_arr = pEmail_arr.split('|');
            EtB2b.globals.pEmail = pEmail = pEmail_arr[0];
            //setting User Id for GA
            if (typeof ga == "function" && pEmail) {
                ga('default.set', 'userId', EtB2b.comJs.ck_en(pEmail));
            }
            set_cookie_email = pEmail;
        }
        if (set_cookie_email) {
            set_cookie_email = set_cookie_email;
        } else {
            set_cookie_email = 'newuser';
        }
    })();


    $(document).keydown(function (e) {
        // ESCAPE key pressed
        if (e.keyCode == 27) {
            $(".model-box, .model-bg").remove();
            $('#sidebar, .psidebar').removeClass('visible');
            $('.right-sidebar-popup').removeClass('active');
            $('html').removeClass("sidebarPopup");
            $('html').removeClass("leftsidebarPopup");
            $(".site-header").removeClass('menu-active');
            $('.layer-overlay').addClass('hide');
            $('.mobile-header__callout, .mobile-header__user--head').removeClass('active');
            $('.mobile-header__callout--close, .mobile-header__nav--more').removeClass('js-btn-mob-close');
            $('.mobile-header__nav--more').removeClass('active');
            $('.mobile-header__user--head').siblings('.mobile-header__user--desc').addClass('hide');
            $('.site-header').removeClass('menu-active');
            $('.layer-overlay').addClass('hide');
            $('.top-footer').removeClass('footer-priority');
            $('.top-secondary-nav .navigation__more--dropdown').css('padding-bottom', '16px');
            $('.top-secondary-nav').css('top', '0');
            $('.gallery').addClass('hide');
            $('.gallery .close-icon').addClass('hide');
            $('.site-header').css('z-index','3');
            enableScroll();
            enableScrollEvent();
        }
    });

    $(document).on('click', '.mobile-header__callout', function (e) {
        if (!$(e.target).closest('.mobile-header__callout--section').length) {
            $(".mobile-header__callout--more, .mobile-header__nav--more").removeClass('active');
            $(".mobile-header__nav--more").removeClass('js-btn-mob-close');
            $('html').removeClass("sidebarPopup");
        }
    });
}

const subscriptionConsent = () => {
    let email = $.trim($('#subscribe_email_top').val());
    let checkEmailVal = EtB2b.commJs.validateEmail(email);
    if (!checkEmailVal.length) {
        $('.top-newsletter-subs__bottom-line').removeClass('hide');
    } else {
        $('.top-newsletter-subs__bottom-line').addClass('hide');
    }
}

const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn(...args);
        }, delay);
    }
}
const showConsentMsg = debounce(subscriptionConsent, 1000);

const handleDomChanges = () => {
    handleHeaderSticky();
};

const handleCarousels = (target) => {
    let targetContext = target || '';
    let targetSelector = targetContext != '' ? $(targetContext) : $('body');
    if ($(window).width() > mediaSizes["end-small"]) {
        if (!$('.inpage-promo-home-abtest').length && targetSelector.find('.whats-happening-container .mid-current-promo__container').length && targetSelector.find('.mid-current-promo__container .mid-current-promo__slide').length > 2) {
            targetSelector.find('.whats-happening-container .mid-current-promo__container').not('.slick-initialized').slick({
                slidesToScroll: 2,
                infinite: true,
                centerMode: false,
                centerPadding: '30px',
                arrows: true,
                slidesToShow: 2,
                variableWidth: true,
                swipe: true,
                touchMove: true,
            });
        }

        if (targetSelector.find('.special-init-panel .mid-current-promo__container').length && targetSelector.find('.mid-current-promo__container .mid-current-promo__slide').length > 2) {
            targetSelector.find('.special-init-panel .mid-current-promo__container').not('.slick-initialized').slick({
                slidesToScroll: 2,
                infinite: true,
                centerMode: false,
                centerPadding: '30px',
                arrows: true,
                slidesToShow: 2,
                variableWidth: true,
                swipe: true,
                touchMove: true,
            });
        }
                
        if (targetSelector.find('.portal-slide-4__container').length && targetSelector.find('.portal-slide-4__container .portal-slide-4__slide').length > 3) {
            targetSelector.find('.portal-slide-4__container').not('.slick-initialized').slick({
                slidesToScroll: 3,
                infinite: true,
                arrows: true,
                slidesToShow: 3,
                variableWidth: true,
                swipe: true,
                touchMove: true,
            });
        }

        if ($('.award-winners__container').length) {
            $('.award-winners__container').not('.slick-initialized').slick({
                slidesToScroll: 1,
                infinite: false,
                centerMode: false,
                centerPadding: '30px',
                arrows: true,
                slidesToShow: 1,
                variableWidth: true,
                swipe: true,
                touchMove: true,
            })
        }

        if (targetSelector.find('.narratives-panel__container').length && targetSelector.find('.narratives-panel__container .narratives-panel__slide').length > 4) {
            targetSelector.find('.narratives-panel__container').not('.slick-initialized').slick({
                slidesToScroll: 2,
                infinite: true,
                centerMode: false,
                centerPadding: '30px',
                arrows: true,
                slidesToShow: 4,
                variableWidth: true,
                swipe: true,
                touchMove: true,
            });
        }

        if ($('[data-group-name="leaders-speak-panel"]').length) {
            $('[data-group-name="leaders-speak-panel"]').not('.slick-initialized').slick({
                slidesToScroll: 2,
                infinite: true,
                centerMode: false,
                centerPadding: '30px',
                arrows: true,
                slidesToShow: 2,
                variableWidth: true,
                swipe: true,
                touchMove: true,
    
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToScroll: 1,
                            infinite: true,
                            centerMode: true,
                            centerPadding: '30px',
                            arrows: false,
                            slidesToShow: 1,
                            variableWidth: false,
                        }
                    }
                ]
            });
        }   

    } else {

    }

    

    if ($('.other-clients-section__inner__container').length) {
        $('.other-clients-section__inner__container').not('.slick-initialized').slick({
            slidesToScroll: 1,
            infinite: true,
            arrows: false,
            slidesToShow: 6,
            autoplay: true,
            autoplaySpeed: 2000,

            responsive: [
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToScroll: 1,
                        infinite: true,
                        arrows: false,
                        slidesToShow: 3,
                        autoplay: true,
                        centerPadding: '20px',
                        autoplaySpeed: 2000,
                    }
                }
            ]
        });
    }
};

const camelToUnderscore = function (key) {
    return key.replace(/([A-Z])/g, "_$1").toLowerCase();
}

const sleep = function (delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

const loadAjaxModule = function (event) {
    let portal = portalName || 'ETBrandEquity.com';
    let contextObj = $(event);
    let ajax_url = EtB2b.globals.loadAjaxModuleRoute;
    let module = contextObj.attr("data-mod-name");
    let data_target = contextObj.attr("data-target") || ''; //be careful,must be an id
    data_target = data_target == '' ? (contextObj.attr("id") || '') : data_target;
    let data_action = contextObj.attr("data-action") || ''; //module action to render specific tpl
    let chk_local_storage = contextObj.attr("data-chk-storage") || ''; //flag to set/get data to local storage
    var storage_key = contextObj.attr("data-storage-key") || ''; //local storage cache key name
    storage_key = storage_key != '' ? portal + ':' + environment + ':' + storage_key : '';
    let loader_elem = contextObj.attr("data-loader") || ''; //default loader to be added until ajax completes
    let data_tab = contextObj.attr("data-tab") || '';
    let is_hide_flag = contextObj.attr("data-hide-flag") || '';
    let inner_tab_load = contextObj.attr("data-inner-tab-load") || '';
    let cache_expiry_min = contextObj.attr("data-cache-expiry") || EtB2b.globals.headerNavStorageExpiry;
    let is_carousel_comp = contextObj.attr("data-is_carousel_comp") || '';
    let call_back = contextObj.attr("data-cb") || '';
    let call_back_type = contextObj.attr("data-cb-type") || '';
    let data_params = contextObj.attr("data-params") || '';
    let context_id = contextObj.attr("id") || '';
    let page_label = contextObj.attr("data-page_label") || '';

    //bind type to be handled
    let bind_type = contextObj.attr("data-bindtype") || '';
    setAjaxState(data_target, EtB2b.globals.ajaxStateReady);
    let cb_options = {};
    //console.table(data_params, data_target);

    if (call_back != '') {
        cb_options.cb = call_back;
        cb_options.cb_type = call_back_type;
        cb_options.data_params = data_params;
    }
    let currentState = EtB2b.globals.ajaxStateObj[data_target];

    if (module != '' && data_target != '' && currentState == EtB2b.globals.ajaxStateReady) {
        setAjaxState(data_target, EtB2b.globals.ajaxStatePending);
        let data_target_selector = "#" + data_target;
        let upcacheFlagVal = findGetParameter('upcache');
        let upcacheFlag = upcacheFlagVal == 2 ? true : false;
        let data_param_obj = {
            target: data_target,
            action: data_action,
            tab: data_tab
        };
        if (upcacheFlag) {
            data_param_obj['upcacheFlag'] = upcacheFlag;
        }
        let data_obj =
        {
            module: module,
            ajax_params: data_params,
            params: data_param_obj,
            page_label: page_label
        }
        if (upcacheFlag) {
            data_obj['upcache'] = upcacheFlagVal;
        }
        let data = data_obj;
        ajax_url = ajax_url + "?" + EtB2b.globals.newThemeParam;

        if (upcacheFlag) {
            ajax_url = ajax_url + "&upcache=" + upcacheFlagVal;
        }
        //check for local storage, if flag set in data attr
        var hitAjax = true;
        setClassBySelector(contextObj, EtB2b.globals.ajaxProcessingClassName); //adding processing class before ajax hit
        if (typeof chk_local_storage != 'undefined' && chk_local_storage != '' && typeof storage_key != 'undefined' && storage_key != '' && upcacheFlag === false) {
            let cached_data = EtB2b.commJs.getLocalStorage(storage_key);
            hitAjax = cached_data == null ? true : false;
            if (cached_data != null) {
                setAjaxState(data_target, EtB2b.globals.ajaxStateProcessed);
                putHtml(context_id, data_target_selector, cached_data, bind_type, cb_options)
                setClassBySelector(contextObj, EtB2b.globals.ajaxRenderedClassName); //setting up rendered class
                handleAjaxContentDom(data_target_selector, inner_tab_load, is_carousel_comp);
            }
        }
        if (upcacheFlag === true && typeof storage_key != 'undefined' && storage_key != '') {
            EtB2b.commJs.deleteLocalStorage(storage_key);
        }
        //call Ajax in case local storage is empty OR no storage-chk flag is enabled 
        if (hitAjax) {
            //Empty container and load fresh content in case of API hit
            if (data_target != undefined && data_target != '' && loader_elem != '' && bind_type == '') {
                if (loader_elem == 'whats_happening_skeleton') { $(data_target_selector).removeClass('hide'); }
                let loader_elem_html = EtB2b.globals.ajaxLoaderSkeletons[loader_elem];
                $(data_target_selector).html(loader_elem_html);
            }
            callAjax(ajax_url, data, { method: 'GET' })
                .then(function (response) {
                    if (response && typeof response != 'undefined' && typeof data_target != 'undefined' && data_target.length > 0) {
                        if (is_hide_flag == '') {
                            showElement(data_target_selector);
                        }
                        setAjaxState(data_target, EtB2b.globals.ajaxStateProcessed);
                        putHtml(context_id, data_target_selector, response, bind_type, cb_options);
                        setClassBySelector(contextObj, EtB2b.globals.ajaxRenderedClassName);
                        removeClassBySelector(contextObj, EtB2b.globals.ajaxProcessingClassName);
                        //setting data to local storage with expiry
                        if(storage_key){
                            EtB2b.commJs.setLocalStorageWithMinExpiry(storage_key, response, cache_expiry_min);
                        }
                        //handling updated DOM bindings
                        handleAjaxContentDom(data_target_selector, inner_tab_load, is_carousel_comp);
                        if($(data_target_selector).attr('data-mod-name') == 'RevExclusives' || $(data_target_selector).attr('data-mod-name') == 'RevCategoryWiseExclusives'){
                            window.exclusiveCallBack ? exclusiveCallBack() : false;
                        }
                        if($(data_target_selector).attr('data-mod-name') == 'RevWhatsHappening'){
                            window.whatsHappeingCallBack ? whatsHappeingCallBack() : false;
                        }   
                        if($(data_target_selector).attr('data-mod-name') == 'RevInPagePromo'){
                            window.whatsHappeingCallBack ? inPagePromoCallBack() : false;
                        }                        
                        if($(data_target_selector).attr('data-mod-name') == 'RevSalesAds'){
                            window.salesAdsCallBack ? salesAdsCallBack() : false;
                        }    
                        if(data_target_selector == '#nav_data_news'){
                            window.navigationCallBack ? navigationCallBack() : false;
                        }
                        if(data_target_selector == '#nav_data_brand_desktop'){
                            window.brandSolutionCallBack ? brandSolutionCallBack('#nav_data_brand_desktop') : false;
                        }
                        
                        if(data_target_selector == "#modbx_10"){
                            window.winnersCallBack ? winnersCallBack() : false;
                        }
                        if($(data_target_selector).attr('data-mod-name') == 'RevAwards'){
                            window.awardsCallBack ? awardsCallBack() : false;
                        }
                        if(data_target_selector == "#modbx_7"){
                            window.specialInitiativeCallBack ? specialInitiativeCallBack() : false;
                        }
                        window.carouselCallBack ? carouselCallBack() : false;
                    }
                }).catch(function (err) {
                    setAjaxState(data_target, EtB2b.globals.ajaxStateFailed);
                    removeClassBySelector(contextObj, EtB2b.globals.ajaxRenderedClassName);
                    removeClassBySelector(contextObj, EtB2b.globals.ajaxProcessingClassName);
                    //console.log(err.stack);
                });
        }
    };
}

const setAjaxState = function (target, state) {
    let stateObj = {};
    stateObj[target] = state;
    Object.keys(stateObj).forEach(function (key) {
        if (stateObj.hasOwnProperty(key)) {
            EtB2b.globals.ajaxStateObj[key] = stateObj[key];
        }
    });
}

const getAllDataAttributes = function (eventContextObj) {
    let dataSet = eventContextObj.dataset;
    paramsObj = {};
    for (var attr in dataSet) {
        let key = camelToUnderscore(attr);
        paramsObj[key] = dataSet[attr];
    }
    return paramsObj;
}
const handleAjaxContentDom = function (data_target_selector, inner_tab_load, is_carousel_comp) {
    inner_tab_load !== '' ? renderAjaxModules(data_target_selector) : false;
    is_carousel_comp !== '' ? handleCarousels(data_target_selector) : false;
    unvielImg(data_target_selector, 'img');
}

const findGetParameter = function (parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

const putHtml = function (context_id, selector, data, bind_type, cb_options) {
    //to be handled bind type
    if (data && typeof data != 'undefined') {

        if (typeof data.html != 'undefined' && data.html != '') {
            let content = $.trim(data.html);
            switch (bind_type) {
                case 'append':
                    $(selector).append(content);
                    break;
                default:
                    $(selector).html(content);
            }
        } else {
            $('#' + context_id).hide();
        }
        if (!isEmptyObj(cb_options)) {
            handleAjaxCallBack(context_id, selector, cb_options, data.data);
        }
        unvielImg();
    }

}

const handleAjaxCallBack = function (context_id, selector, cb_options, data) {
    let cb = cb_options.cb;
    let cb_type = cb_options.cb_type;
    // let data_params = cb_options.data_params;
    let data_params = data;
    eval(cb)(context_id, selector, cb_type, data_params); //executing call back
}

const isEmptyObj = function (obj) {
    return $.isEmptyObject(obj);
}
const setClassBySelector = function (selector, className) {
    selector.addClass(className);
}
const removeClassBySelector = function (selector, className) {
    selector.removeClass(className);
}
const hideElement = function (selector) {
    selector.addClass(EtB2b.globals.disabledClass);
}
const showElement = function (selector) {
    $(selector).removeClass(EtB2b.globals.disabledClass);
}

const loadVideoPlayer = () => {
    $('body .flexi-video span').each(function (i, v) {
        if ($(this).data('type') == 'youtube') {
            var iframe = '<iframe src="' + $(this).data('url') + '" frameborder="0"></iframe>'
            $(this).parents('.flexi-video').append(iframe);
            $(this).remove();
        }
    });
}

var YTPlayer;
function onYouTubeIframeAPIReady() {
    try {
        YTPlayer = new YT.Player('youtubeIframeVideo', {
            videoId: window.videoid,
            playerVars: {
                'playsinline': 1,
                'autoplay' : autoPlayVal,
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
        //console.log(YTPlayer);
    } catch (e) {

    }
}
function onPlayerReady(event) {
    //console.log("player ready.");
    if(EtB2b.globalVar.is_loggedin){
        event.target.playVideo();
    }
}

var flagplay = true;

function onPlayerStateChange(event) {
    var currtime = 0;
    if (event.data == YT.PlayerState.PLAYING) {
        var pageviewdata;
        if (flagplay) {
            if (event.target) {
                currtime = parseInt(event.target.playerInfo.currentTime);
            }
            //console.log(currtime);
            //flagplay = false;
        }
        youVideoEvent = 'play';
        window.playVideoCallBack ? playVideoCallBack() : false;
    }
    if (event.data == YT.PlayerState.PAUSED) {
        if (event.target) {
            currtime = parseInt(event.target.playerInfo.currentTime);
            console.log(currtime);
        }
        youVideoEvent = 'pause';
        window.pauseVideoCallBack ? pauseVideoCallBack() : false;
    }
    if (event.data == YT.PlayerState.ENDED) {
        window.endedVideoCallBack ? endedVideoCallBack() : false;
    }
}

const renderAjaxModules = (target, ajaxClass) => {
    let targetName = typeof target != 'undefined' && target != '' ? target : '';
    let __classAjaxLoad = typeof ajaxClass != 'undefined' && ajaxClass != '' ? ajaxClass : EtB2b.globals.ajaxReadyClassName;
    let __objContext = targetName == '' ? $(document).find("." + __classAjaxLoad).not(EtB2b.globals.ajaxRenderedClass).not(EtB2b.globals.ajaxProcessingClassName) :
        $(document).find(targetName).find("." + __classAjaxLoad).not(EtB2b.globals.ajaxRenderedClass).not(EtB2b.globals.ajaxProcessingClassName);
    let obj_len = __objContext.length;
    //console.log(obj_len);
    if (obj_len > 0) {
        var sorted = $(__objContext).sort(function (a, b) {
            let a_priority = $(a).attr('data-priority') || 100;
            let b_priority = $(b).attr('data-priority') || 100;
            return a_priority - b_priority;
        });
        sorted.each(function (i, v) {
            let data_target = $(this).attr("data-target") || '';
            let loader_elem = $(this).attr("data-loader") || '';
            let bind_type = $(this).attr("data-bindtype") || '';
            data_target = data_target == '' ? ($(this).attr("id") || '') : data_target;
            let currentState = EtB2b.globals.ajaxStateObj[data_target];
            
            if (typeof currentState == 'undefined' || currentState == EtB2b.globals.ajaxStateReady) {
                
                if(whatsHappFlag){
                    loadAjaxModule(this);                     
                } else {
                    loadAjaxModule(sorted[0]); 
                    return false;
                }
            }
            else if ([EtB2b.globals.ajaxStatePending, EtB2b.globals.ajaxStateReady].indexOfcurrentState !== -1) {
                if (data_target != undefined && data_target != '' && loader_elem != '' && bind_type == '') {
                    let data_target_selector = "#" + data_target;
                    let loader_elem_html = EtB2b.globals.ajaxLoaderSkeletons[loader_elem];
                    $(data_target_selector).html(loader_elem_html);
                }

            }
        })
    }
}

const _fetch = function (baseURL) {
    return function (url, data, options) {
        return new Promise(function (resolve, reject) {
            if (options && options.handleFormError && options.target) {
                $(options.target).find(EtB2b.globals.errorMsgClass).hide();
            }
            var request = {
                type: (options && options.method ? options.method : "POST"),
                url: options && options.absolute ? url : (baseURL + url),
                dataType: ((options && options.dataType) ? options.dataType : 'json'),
                data: data,
                async: true,
                cache: true,
                success: function (response) {
                    if (response === null) {
                        return resolve(response);
                    }

                    if (response.error) {
                        if (options && response.validations && options.handleFormError && options.target) handleFormError(response.validations, options.target);
                        return reject(response);
                    }
                    return resolve(response);
                },
                error: function (err) {
                    if (err && err.validations && options && options.handleFormError && options.target) handleFormError(response.validations, options.target);
                    reject(err);
                }
            };
            if (data instanceof FormData) {
                request.processData = false;
                request.contentType = false;
            }
            $.ajax(request);
        });
    }
}

const callAjax = _fetch(base_url);

const handleFormError = function (validations, target) {
    Object.keys(validations)
        .filter(function (key) {
            return Object.prototype.hasOwnProperty.call(validations, key);
        })
        .forEach(function (key) {
            var name = key
            var errorMessage = validations[key];
            var elem = $(target).find('span[data="' + key + '"]');
            if (!elem.length) {
                var input = $(target).find('input[name="' + key + '"]');
                var selectBoxSelector = $(target).find('[name="' + key + '"]');
                var isSelect = $(target).find('[name="' + key + '"]').hasClass('select_box');
                var isRadioInput = $(target).find('input[name="' + key + '"]').is(':radio');
                //console.log(isRadioInput);
                if (input.length && !isRadioInput) {
                    scrollTo(input[0]);
                    input[0].focus();
                    $('<span class="error_msg" data="' + key + '">' + errorMessage + '</span>').insertAfter(input);
                } else if (isSelect) {
                    scrollTo(selectBoxSelector[0]);
                    selectBoxSelector.parents('li').find('.error_msg').html(errorMessage).show();
                } else if (input.length && isRadioInput) {
                    scrollTo(input[0]);
                    $(input.parents('li')).append('<span class="error_msg" style="margin-left:25%;"  data="' + key + '">Invalid Radio Value for ' + key.replaceAll() + '</span>');
                } else {
                    var textArea = $(target).find('textarea[name="' + key + '"]');
                    if (textArea.length) {
                        scrollTo(textArea[0]);
                        textArea[0].focus();
                        $('<span class="error_msg" data="' + key + '">' + errorMessage + '</span>').insertAfter(textArea);
                    }
                }
            } else {
                elem.text(errorMessage).show();
            }
        });
}

const socialShareEvent = () => {
    $('.social-share').on('click', '.customshare', function (e) {
        e.preventDefault();
        $temp = {};
        $temp['title'] = $(this).data('title');
        $temp['description'] = $(this).data('description');
        $temp['url'] = $(this).data('shareurl');
        $temp['obj'] = $(this);
        $isdialog = ($(this).data('dialog')) ? $(this).data('dialog') : 0;
        EtB2b.socialShare.sharepage($(this).attr('data-type'), $temp, $isdialog);

    });
}

//get query param from url
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; }
    }));
} catch (e) { }

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScrollEvent() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScrollEvent() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

const disableScroll = () => {
    // Get the current page scroll position
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,

        // if any scroll is attempted, set this to the previous value
        window.onscroll = function () {
            window.scrollTo(scrollLeft, scrollTop);
        };
}

const enableScroll = () => {
    window.onscroll = function () { };
}

function contentDetailAdded($obj) {
    if (!$obj) {
        $obj = $('body');
    }
    $obj.find('.customshare').on('click', function (e) {
        e.preventDefault();
        $temp = {};
        $temp['title'] = $(this).data('title');
        $temp['description'] = $(this).data('description');
        $temp['url'] = $(this).data('shareurl');
        $temp['obj'] = $(this);
        $isdialog = ($(this).data('dialog')) ? $(this).data('dialog') : 0;
        EtB2b.socialShare.sharepage($(this).attr('data-type'), $temp, $isdialog);
        $('.social-share-scroll').hide();
        $('.social-share-scrolled .sshare-icon').removeClass('active');
    });
}

const bindNTParamToCTA = () => {
    $(document).find('a').each(function () {
        var url = $(this).attr('href');
        if (url != undefined && url != EtB2b.globals.defaultAnchorHref) {
            newThemeUrl = bindQueryParamToUrl(url, EtB2b.globals.newThemeParam, EtB2b.globals.newThemeParamValue);
            $(this).attr('href', newThemeUrl);
        }
    });
}
const bindQueryParamToUrl = function (uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
        return uri + separator + key + "=" + value;
    }
}

const ampSinginOption = () => {
    var ampSingin = {
        'amp_news_google_click'   :'.ggl_user_btn',
        'amp_news_linkedin_click' :'.oauth_lin',
        'amp_news_other_click'    :'.more-signin-option',
    };

    for (let key in ampSingin) {
        if(params.frmsrc == key){
            if (!EtB2b.globalVar.is_loggedin) {
                setTimeout(function(){
                    //$('.currentlyInViewport .paywall_container '+ampSingin[key]).trigger("click");
                    EtB2b.system.login();
                },3000);
            } 
        }
    }
}

const checkIsLogined = () => {
    if (!EtB2b.globalVar.is_loggedin) {
        EtB2b.system.login();
        $('.write-comment').blur();
        return false;
    }
}
EtB2b.unsubscribe = (function () {

    const updateEmail = () => {
        let email = unsubscribeEventObj.email?unsubscribeEventObj.email:oauthUserData.email;
        $('.unsubcribe-panel__main-cnt .user-info').removeClass('hide');
        $('.unsubcribe-panel__main-cnt .user-email').html(email);
        EtB2b.unsubscribe.preferencesList();
    }

    const createUnsubscribePage = (pdata) => {
        let cntnData = '';
        var is_user_already_unsubscribed = 0;
        $(pdata['subscriptionsList']).each(function(index, itemList){
            if(pdata['is_user_exits']==0 && unsubscribeEventObj.eventType != '' && unsubscribeEventObj.eventType != itemList.type+'_'+itemList.id+'_'+itemList.is_weekly){
                // return false;
            } else {
            unsubcribeSuccess[0][itemList.type+'_'+itemList.id+'_'+itemList.is_weekly] = itemList.display_name;
            let status = itemList.is_subscribed ? 'checked' : '';
            if(itemList.is_subscribed==0 && unsubscribeEventObj.eventType == itemList.type+'_'+itemList.id+'_'+itemList.is_weekly){
                is_user_already_unsubscribed = 1;
            }
            cntnData += `<li type=${itemList.type} nl-id=${itemList.id} is-weekly=${itemList.is_weekly}>
                <div class="mailer-name">
                    <h2>${itemList.display_name}</h2>
                    <span>${itemList.description}</span>
                </div>
                <div class="mailer-control">
                    <label for="${itemList.type}_1"></label>
                    <input id="${itemList.type}_1" ${status} unique-id="${itemList.type}_${itemList.id}_${itemList.is_weekly}" type="checkbox" onclick="EtB2b.unsubscribe.unsubscriberUser(this, true)" name="${itemList.type}-mail" />
                </div>
            </li>`;
            }
        });
        EtB2b.unsubscribe.unsubscriberFromMailer(unsubscribeEventObj,is_user_already_unsubscribed);
        $('.unsubcribe-panel__cntent ul').html(cntnData);
    }

    const preferencesList = () => {
        
        let paramObject = {
			url: unsubscribeApi + '/api/v1/manage-subscriptions/list',
            type: 'GET', 
            data: {'email':unsubscribeEventObj.email?unsubscribeEventObj.email:oauthUserData.email}
		}

        const ajaxSuccessCall = (data) => {
            console.log('unsubscribe api response');
            //console.log(data);
            createUnsubscribePage(data);
        }
        const ajaxErrorCall = (data) => {
            console.log(data);
        }

        EtB2b.comJs.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
    }

    const unsubscriberFromMailer = (mailerConfig, status) => {
        let mailerType = mailerConfig.eventType;  
        let abuseReport = mailerConfig.report_abuse;
        let leadstr = 'This will unsubscribe you from';   
        let alrStr = 'We have already unsubscribed you from';
        var status = status | false;  
        let alreadSubs = status ? 'alreadSubs' : '';
        let btnVal = status ? '' : `<button class="btn" onclick="EtB2b.unsubscribe.unsubscriberUser(this, false, '${mailerType}')">Unsubscribe</button>`;
        let btnValReport = status ? '' :`<div class="create-section input_sec ">
        <input id="report_abuse_data" class="input_txt_box" placeholder="" />
        <label for="report_abuse_data">Reason for Reporting Abuse <span>*</span></label>
        <p id="report_abuse_data_err" class="error"></p>
        </div><button class="btn" onclick="EtB2b.unsubscribe.unsubscriberUser(this, false, '${mailerType}')">Report & Unsubscribe</button>`;     
        let cnfmMsg = '';
        for (var key in unsubcribeSuccess[0]) {
            if(abuseReport && key == mailerType){
                cnfmMsg = `
                    <div class="unsub-success ${alreadSubs}" type=${mailerConfig.type} nl-id=${mailerConfig.nl_id} is-weekly=${mailerConfig.is_weekly} batch_mailer_id=${mailerConfig.batch_mailer_id}>
                        <h2>Report Abuse</h2>
                        ${status ? alrStr : leadstr} \"${unsubcribeSuccess[0][key]}\" for <span>${mailerConfig.email ? mailerConfig.email : oauthUserData.email}</span>
                        ${btnValReport}
                        <a class="close-managepop">Manage Preferences</a>
                    </div>
                `;
                EtB2b.commJs.showSuccessMessage(cnfmMsg, "", 'unsubscriber-touch-container','N');
            } else if(key == mailerType){
                cnfmMsg = `
                    <div class="unsub-success ${alreadSubs}" type=${mailerConfig.type} nl-id=${mailerConfig.nl_id} is-weekly=${mailerConfig.is_weekly} batch_mailer_id=${mailerConfig.batch_mailer_id}>
                        <h2>${status ? alrStr : leadstr} \"${unsubcribeSuccess[0][key]}\"</h2>
                        <span>${mailerConfig.email ? mailerConfig.email : oauthUserData.email}</span>
                        ${btnVal}
                        <a class="close-managepop">Manage Preferences</a>
                    </div>
                `;
                EtB2b.commJs.showSuccessMessage(cnfmMsg, "", 'unsubscriber-touch-container','N');
            }
        }
        $('#report_abuse_data').on('change', function (e) {
            $(this).val() ? $(this).addClass('valid') : $(this).removeClass('valid');
        });
    }

    const mailerSuccessMsg = (getType,nltype) => {
        let successMsg = `
            <div class="success-contain-top">
                <figure>
                    <img src="/Themes/Release/theme4/images/icons/scheck-icon.png" width="32" height="32" />
                </figure>
                <h2>You have been unsubscribed from \"${unsubcribeSuccess[0][getType]}\"</h2>
            </div>
            <div class="about-container">
                <h3>About This `;
        if(nltype=='newsletter'){
            successMsg += `Newsletter`;
        } else {
            successMsg += `Mailer`;
        }
        successMsg += `</h3>
                <ul>
                    <li>
                        <figure class="read-more"></figure>
                        <h4>Read by more than 100,000+ Decision Makers, CXOs, & Industry Professionals.</h4>
                    </li> 
                    <li>
                        <figure class="get-excls"></figure>
                        <h4>Get Exclusive Invites to India’s most Reputed Events and Awards.</h4>
                    </li>`;
        if(nltype=='newsletter'){
        successMsg += `      
                    <li> <h4><a href="/etnewsletter.php"> Learn More </a> </h4></li>                         
                </ul>
            </div>
        `;
        }
        $('.unsubs-msg-on-top').html(successMsg);
    }

    const subscribeUserMailNotify = (nlid, nltype) => {
        let paramObject = {
            url: unsubscribeApi + '/api/v1/manage-subscriptions/sendManagePreferencesNotification',
            type: 'POST', 
            data: {
                'email': unsubscribeEventObj.email?unsubscribeEventObj.email:oauthUserData.email, 
                'product_id': nlid, 
                'type':  nltype,
            },
        }
        const ajaxSuccessCall = (data) => {
            // set 5 min cache
            setLocalStorage('changeSubscription',true, expireTime);
        }
        const ajaxErrorCall = (data) => {
            console.log(data);
        }
        EtB2b.comJs.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall); 
    }

    const unsubscriberUser = (type, paramClick, evnt) => {
        //send this value in case of report abuse
        let reportAbuseVal = '';
        let reportAbuselength = 0;
        if($('#report_abuse_data').length){
            reportAbuseVal = $('#report_abuse_data').val();
            reportAbuselength = $('#report_abuse_data').length;
        }
        if(paramClick){
            let nlid = $(type).parents('li').attr('nl-id');
            let nltype = $(type).parents('li').attr('type');
            let nlStatus = $(type)[0].checked ? 'on' : 'off';
            let nlWeekly = $(type).parents('li').attr('is-weekly');
            let paramObject = {
                url: unsubscribeApi + '/api/v1/manage-subscriptions/change',
                type: 'POST', 
                data: {
                    'email': unsubscribeEventObj.email?unsubscribeEventObj.email:oauthUserData.email, 
                    'nl_id': nlid, 
                    'status': nlStatus,
                    'type':  nltype,
                    'is_weekly' : nlWeekly,
                    'reportAbuseVal' : reportAbuseVal,
                    'reportAbuselength' : reportAbuselength,
                },
            }
    
            const ajaxSuccessCall = (data) => {
                var changeSubscription = getLocalStorage('changeSubscription');
                console.log('unsubscribe api response');
                //console.log(data);
                let newslname = $(type).parents('li').find('.mailer-name h2').text();
                let ccUrl = base_url +'/manage-preferences';
                EtB2b.comJs.changebrowserurl(ccUrl, document.title, '');
                if ($(type)[0].checked != true){                        
                    toastMsg('You have been unsubscribed from '+'"'+newslname+'"'); 
                } else {                    
                    if(!changeSubscription){
                        subscribeUserMailNotify(nlid, nltype);
                    }
                    toastMsg('You have been subscribed to '+'"'+newslname+'"'); 
                }
            }
            const ajaxErrorCall = (data) => {
                console.log(data);
            }
            EtB2b.comJs.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);                
        } else {
            let paramObject = {
                url: unsubscribeApi + '/api/v1/manage-subscriptions/change',
                type: 'POST', 
                data: {
                    'email': $(type).siblings('span').html(), 
                    'nl_id': $(type).parents('.unsub-success').attr('nl-id'), 
                    'status': 'off',
                    'type':  $(type).parents('.unsub-success').attr('type'),
                    'is_weekly' : $(type).parents('.unsub-success').attr('is-weekly'),
                    'batch_mailer_id' : $(type).parents('.unsub-success').attr('batch_mailer_id'),
                    'reportAbuseVal' : reportAbuseVal,
                    'reportAbuselength' : reportAbuselength,
                },
            }
            
            const ajaxSuccessCall = (data) => {
                mailerSuccessMsg(evnt,$(type).parents('.unsub-success').attr('type'));
                let ccUrl = base_url +'/manage-preferences';
                EtB2b.comJs.changebrowserurl(ccUrl, document.title, '');
                var group = "input:checkbox[unique-id='"+evnt+"']";
                $(group).prop("checked", false);
                EtB2b.model.close_pop(1);
            }
            const ajaxErrorCall = (data) => {
                var response = JSON.parse(data.responseText);
                if (response.code != 200) {
                    if (typeof response.errors != "undefined" && Object.keys(response.errors).length && $('#report_abuse_data_err').length) {
                        $('#report_abuse_data_err').html(response.errors);
                    }
                }            
            }
            EtB2b.comJs.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall); 
        }
    }
    return {
        updateEmail             : updateEmail,
        unsubscriberUser        : unsubscriberUser,
        unsubscriberFromMailer  : unsubscriberFromMailer,
        preferencesList         : preferencesList,
    }
})();
const headerStrip = () => {
    let headerStripData = `<div class="top-red-strip">
        <div class="top-red-strip__inner">
            <a href="/plus">
                <div class="mob-star-logo mobile-view">
                    <img loading="eager" width="21" height="20" src="/Themes/Release/theme4/images/shining-star.svg" alt="Star" />
                </div>
                <div class="container top-red-strip__inner--content">
                    <div class="strip-logo">
                        <img loading="eager" width="120" height="16" src="/Themes/Release/theme4/images/logos/logo-telecom-plus.svg" alt="Telecom Plus" />
                    </div>
                    <div class="strip-cntn">
                        <p class="desktop-view">Subscribe to Premium Telecom Knowledge Sharing Community</p>
                        <p class="mobile-view">A Premium Telecom Knowledge Sharing Community</p>
                    </div>
                    <div class="strip-more desktop-view">
                        <p>Learn More</p>
                    </div>
                </div>
            </a>
            <div class="top-red-strip__inner--close">
                <img loading="eager" width="14" height="14" src="/Themes/Release/theme4/images/close-strip.svg" alt="Close" />
            </div>
        </div>
    </div>`;
    $('body header').prepend(headerStripData);
    $('body header .site-header-sticky').prepend(headerStripData);
    $('.--container').addClass('strip-view');
}

const findPipAddTarget = () => {
    $(document).find('a').each(function () {
        var url = $(this).attr('href');
        if (url != undefined && url != EtB2b.globals.defaultAnchorHref) {
            if(url.includes('portal-in-portal')){
                $(this).attr('target', '_blank');
            }
        }
    });
}

$(document).ready(function () {
    renderAjaxModules();
    rssTabbPanel();
    sidebarSpeakerPopup();
    sidebarSpeakerPopupListing();
    handleDomChanges();
    if(theme_version == 'v4'){
        sliuckCarouselWithThumbnail();
    }
    scrollUpDown();
    loadVideoPlayer();
    onYouTubeIframeAPIReady();
    handleSearchEvents();
    EtB2b.comJs.checkStorageExceed();
    let redStripValue = getLocalStorage('closeStrip');
    // if(ET_PORTAL == 'telecom' && !redStripValue){        
    //     headerStrip();
    // }
    

    $('.site-header__login button, .mobile-header__user button').on('click', function () {
        EtB2b.commJs.deleteLocalStorage('logSource');
        bookmarkId = '';
        notify_data = '';
        EtB2b.system.login();
        $('html').addClass("sidebarPopup");        
    });
    if (params.frmsrc != null) {
        if (params.frmsrc == 'amp_news') {
            if (!EtB2b.globalVar.is_loggedin) {
                EtB2b.system.login();
            }
        }
        if (params.frmsrc == 'amp_news_bookmark') {
            bookmarkAction(params.bookmarid);
        }  
        if (params.frmsrc == 'amp_news_comment') {
            setTimeout(function(){
                $('body .btn-comment').trigger('click');
            }, 1000);
        }       

        ampSinginOption();

    }

    if ($(window).width() < mediaSizes["end-small"]) {
        // $('body').on('click', '.leaders-corner__unit', function () {
        //     $('.leaders-corner__unit').removeClass('active');
        //     $('.leaders-corner__unit').css('z-index', 'unset');
        //     $('.leaders-corner__unit .leaders-corner__unit--desc').hide();
        //     $(this).addClass('active');
        //     $(this).find('.leaders-corner__unit--desc').show();
        //     $('.mobile-header').css('z-index', '1');
        // });

        // $('body').on('click', '.leaders-corner__unit .close', function (e) {
        //     $(this).parents('.leaders-corner__unit').removeClass('active');
        //     $(this).parents('.leaders-corner__unit--desc').hide();
        //     $('.mobile-header').css('z-index', '99');
        //     $('.leaders-corner__unit').css('z-index', '2');
        //     e.preventDefault();
        //     e.stopPropagation();
        // });
    }
    $('body').on('click', '.mobile-header__nav--more', function (e) {
        e.preventDefault();
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('.mobile-header__callout, .mobile-header__user--head').removeClass('active');
            $('.mobile-header__callout--close, .mobile-header__nav--more').removeClass('js-btn-mob-close');
            $('.mobile-header__user--head').siblings('.mobile-header__user--desc').addClass('hide');
            $('.mobile-header__nav--more').removeClass('active');
            $('html').removeClass("sidebarPopup");            

        } else {
            $(this).addClass('active');
            $('.mobile-header__callout').addClass('active');
            $('.mobile-header__callout--close, .mobile-header__nav--more').addClass('js-btn-mob-close');
            $('html').addClass("sidebarPopup");
        }
        $('.mobile-header__callout--close .close-icon').addClass('sprite-icon-img');
        e.stopPropagation();
    });

    $('.js-btn-mob-close').on('click', function () {
        $('.mobile-header__nav--more').click();
        $('.mobile-header__callout--close, .mobile-header__nav--more').removeClass('js-btn-mob-close');
    });

    $('.latest-most-read__navigation button').on('click', function () {
        if (!$(this).hasClass('active')) {
            $('.latest-most-read__navigation button').removeClass('active');
            $(this).addClass('active');
            let refnc = $(this).attr('ref');
            $('#latestReadBlock, #mostReadBlock').addClass('hide');
            $('#' + refnc).removeClass('hide');
            $('#' + refnc + ' .latest-most-read__container').css('overflow-x', 'unset');
        }
    });

    let scrollHidden = [document.getElementById('top_promos'),
    document.getElementById('latestnews_section'),
    document.getElementById('mostRead_section'),
    document.getElementById('bottom_footer_tranding'),
    document.querySelectorAll('.portal-slide-4__container')[0],
    document.querySelectorAll('.mid-current-promo__container')[0],
    document.querySelectorAll('.mid-current-promo__container')[1],
    document.querySelectorAll('.promomotion-section__container')[0],
    ];
    $(scrollHidden).each(function (i, val) {
        if (val != null) {
            val.addEventListener('touchstart', function () {
                $(this).css('overflow-x', 'auto');
            }, {passive: true});
        }
    });
    $('.site-header__hamburger').on('click', function () {
        if (!$('.site-header').hasClass('menu-active')) {
            $('.site-header').addClass('menu-active');
            $('.top-panel__search--close').trigger('click');
            $('.layer-overlay').removeClass('hide');
            //disableScrollEvent();
            $('html').addClass("leftsidebarPopup");
            let siteHeaderH = $('.site-header-sticky').height();
            $('.top-secondary-nav').css('top', siteHeaderH);
            $('.top-secondary-nav .navigation__more--dropdown').css('padding-bottom', siteHeaderH);
        } else {
            $('.site-header').removeClass('menu-active');
            $('.layer-overlay').addClass('hide');
            $('html').removeClass("leftsidebarPopup");
            $('.top-secondary-nav').css('top', '0');
            $('.top-secondary-nav .navigation__more--dropdown').css('padding-bottom', '16px');
            enableScrollEvent();
        }

    });

    $(document).find('.rndr_ajx_hover').parents('li').hover(        
        function () {
            let $that = $(this).find('.rndr_ajx_hover');
            let target_selector = $that.parent('li.parent').attr('id');
            setTimeoutConst = setTimeout(function(){                
                renderAjaxModules('#' + target_selector, EtB2b.globals.ajaxHoverClassName);
                $that.find('.navigation-hover__outer').show();
                if($('.site-header.sticky').length){
                    $('.layer-overlay').removeClass('hide').css('top', '0');
                } else if($(window).scrollTop() > 80){
                    $('.layer-overlay').removeClass('hide').css('top', theme_version == 'v4' ? '70px' : '90px');
                } else {
                    $('.layer-overlay').removeClass('hide').css('top', theme_version == 'v4' ? '125px' : '190px');
                }
                $('.layer-overlay-nav').removeClass('hide');
                if ($('.menu-active').length) {
                    $('.site-header').removeClass('menu-active');
                    //enableScroll();
                }
                let lhtp = $that.find('.navigation-hover__news--left').outerHeight(true);
                let lht = $that.find('.navigation-hover__news--nav ul').outerHeight(true);
                if(!(lht > lhtp)){
                    disableScrollEvent();
                } 
                navSubStatus();
                if($that.find('.navigation-hover__brandsolutions--right').length){
                    brandStatus($that);
                } 
            }, delayNav);            
        },
        function () {
            let $that = $(this).find('.rndr_ajx_hover');
            let target_selector = $that.parent('li.parent').attr('id');
            $('#' + target_selector).find(EtB2b.globals.skeletonClass).parent().hide();
            $('.top-panel__navigation .navigation-hover__outer').hide();
            clearTimeout(setTimeoutConst);
        }
    );

    if($('#li_main_menu_news').length){
        renderAjaxModules('#li_main_menu_news', EtB2b.globals.ajaxHoverClassName);
    }


    $(document).on("click", ".nav_tab", function (e) {
        e.preventDefault();
        let elemTarget = $(this);
        let dataTarget = elemTarget.attr('data-target');
        let parentContainer = elemTarget.parents('.navigation-hover');
        let allTabsDataSelector = parentContainer.find('.nav_tab_data');
        let allTabsSelector = parentContainer.find('.nav_tab');
        hideElement(allTabsDataSelector);
        showElement($("#" + dataTarget));
        allTabsSelector.removeClass('active');
        elemTarget.addClass('active');
        //fetching data
        let elemId = elemTarget.attr('id');
        let targetContainer = "#span-" + elemId;
        renderAjaxModules(targetContainer, EtB2b.globals.ajaxOnClickClassName);
    });

    $('body').on('click', '.model-container .close', function () {
        EtB2b.model.close_pop(1);
        $('html').removeClass("sidebarPopup");
        enableScrollEvent();
        if($('.mobile-header__callout--more, .comment-section-popup').hasClass('active')){
            setTimeout(function(){
                $('html').addClass("sidebarPopup");
            },200);
        }
    });

    var txtLen = $('.top-story-panel__content .author_info').text().length;
    if (txtLen < 170) {
        $('.top-story-panel__content .author_info').addClass('full_detail');
    }
    $('.top-story-panel__content .author_info').click(function (e) {
        if (e.offsetX + 150 > e.target.offsetLeft) {
            $(this).addClass('full_detail');
        }
        else {
            console.log("true");
        }
    });

    $('body').on('click', '.top-panel__search--trigger', function (e) {
        if (!$(this).hasClass('active')) {
            resetToHome();
            $(this).addClass('active');
            $('.top-panel__navigation, .top-secondary-nav, .site-header__login').addClass('vh');

            $('.top-panel__search').addClass('triggered');
            $('.top-panel__search--box, .layer-overlay').removeClass('hide');
            $('.top-panel__search--input').focus();
        }
    });

    $('body').on('click', '.top-panel__search--close', function (e) {
        $('.top-panel__search--trigger').removeClass('active');
        $('.top-panel__navigation, .top-secondary-nav, .site-header__login').removeClass('vh');

        $('.top-panel__search').removeClass('triggered');
        $('.top-panel__search--box, .layer-overlay').addClass('hide');
    });

    $('body').on('click', '.mobile-header__user--head', function (e) {
        e.preventDefault();
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).siblings('.mobile-header__user--desc').addClass('hide');
        } else {
            $(this).addClass('active');
            $(this).siblings('.mobile-header__user--desc').removeClass('hide');
        }
    });

    $('body').on('click', '.txt-skip', function () {
        EtB2b.model.close_pop(1);
    });

    $(document).on("click", ".notify_inventory", function (event) {
        let id = $(this).attr('data-entity-id');
        let type = $(this).attr('data-entity-type');
        notifyAction(id, type);
    });

    $('body').on('click', '.btn-comment', function(){
        $(this).parents('.article-section').find('.comment-section-popup').addClass('active');
        $(this).parents('.article-section').find('.psidebar').addClass('visible');
        $('html').addClass("sidebarPopup");
        $('.mobile-header').addClass('hide');
        $('.main-content #Skin_LP_right, #closeDiv').css('z-index', '9');
        if(EtB2b.globalVar.is_loggedin){
            $('.comment-section-popup').removeClass('non-loggedin-user');
        }
        if(deviceType != 'mobile' || !$(this).hasClass('show-comment-num')){
            $(this).parents('.article-section').find('.comment-section-popup .post-comment-section textarea').focus();
        }        
        
        $('.write-comment').val('').removeClass('added-style').attr('style','');
        $('.replies-container').hide();
        $('.btn-post-comment').addClass('hide');
        $('.btn-post-comment').removeClass('disabled');
        $('.post-comment-section .error').remove();
        $('.comment-post-container').removeClass('hide');
        $('.comment-report-container').addClass('hide');
        unvielImg('.comment-section-popup.active', 'img');
        userInitials();
        if($(this).hasClass('comment-replies')){
            $('textarea').blur();
            let ccmtId = $(this).parents('.users-comment-section').attr('comment-id');
            $('#cmt_'+ccmtId).find('.users-comment-section__controls').siblings('.replies-container').slideToggle('slow');
            $('#cmt_'+ccmtId).find('.replies-container .post-comment-section textarea').focus();
            document.getElementById('txtarea_'+ccmtId).autofocus;
        }
    });

    $('body').on('click', '.comment-section-popup', function(e){
        if ($(e.target).closest('.psidebar, .btn-comment-close').length != 1 || $(e.target).closest('.btn-comment-close').length != 0) {
            if(!$(e.target).closest('.psidebar, .btn-comment-close').hasClass('btn-close-flag-layer')){
                $('html').removeClass("sidebarPopup");
                $('.mobile-header').removeClass('hide');
                $('.psidebar').removeClass('visible');
                $('.comment-section-popup').removeClass('active');
                $('.main-content #Skin_LP_right, #closeDiv').css('z-index', '99'); 
                $('.site-header').css('z-index','3');           
            } else {
                EtB2b.comments.closeFlagLayer();
                $(e.target).closest('.psidebar, .btn-comment-close').removeClass('btn-close-flag-layer');
            }
        } 
    });

    $('body').on('click', '.write-comment, .checkUser_status', function(){
        login_source_info = 'Comment';
        checkIsLogined();        
    });   

    EtB2b.comments.handleCommentflag();
    $('body').on('click', '.flag-comment .show-flag-btn', function(){
        if (EtB2b.globalVar.is_loggedin) {
            let cmtId = $(this).parents('.users-comment-section').attr('comment-id');
            $('.comment-section-popup.active .comment-report-container').attr('comment-id',cmtId);
            $(this).parents('.comment-section-popup').find('.btn-comment-close').addClass('btn-close-flag-layer');
            if($('.comment-section-popup').hasClass('active')){
                $('.comment-section-popup.active .comment-post-container').addClass('hide');
                $('.comment-section-popup.active .comment-report-container').removeClass('hide');
                
            } else{
                $(this).parents('.comments-section__with-comments').find('.btn-comment').trigger('click');
                $('.comment-section-popup.active .comment-post-container').addClass('hide');
                $('.comment-section-popup.active .comment-report-container').removeClass('hide');
            }
        } else {
            login_source_info = "Comment";
            EtB2b.system.login();
        }
    });

    $('body').on('click', '.resport-options li', function(){
        if($(this).find('input').attr('id') != 'cm_others'){
            $(this).parents('.resport-options').siblings('.reason-flag-container').addClass('hide');
        } else {
            $(this).parents('.resport-options').siblings('.reason-flag-container').removeClass('hide');
        }
        if($('.comment-section-popup.active .resport-options').find('.error').length){
            $('.comment-section-popup.active .resport-options').find('.error').remove();
        }
    });

    $('.replies-container').slideUp();
    $('body').on('click', '.reply-commnt-cta', function(){
        $('.comment-section-popup textarea').blur();
        //$('.users-comment-section__controls').siblings('.replies-container').slideUp('slow');
        $(this).parents('.users-comment-section__controls').siblings('.replies-container').slideToggle('slow');
        let txtId = $(this).parents('.users-comment-section__controls').siblings('.replies-container').find('textarea').attr('id');
        if(deviceType != 'mobile'){
            setTimeout(function(){
                $(this).parents('.users-comment-section__controls').find('textarea').focus();
                document.getElementById(txtId).autofocus;
                //$(this).parents('.users-comment-section__controls').find('textarea').click();
            },100);
        }
    });

    whatsHapVersion = EtB2b.commJs.getCookie('_gaexp');      
    if(whatsHapVersion) {
        whatsHapVersion = whatsHapVersion.substr(whatsHapVersion.lastIndexOf(".") + 1);
        //console.log(whatsHapVersion);
        if(parseInt(whatsHapVersion) && $('.page-newsDetail').length){
            $('.page-newsDetail').addClass('inpage-promo-abtest');
            $('.mid-current-promo.bg-grey .mid-current-promo__slide').css('height','145px');
        } else if(parseInt(whatsHapVersion) && $('.page-homepage').length){ 
            $('.page-homepage').addClass('inpage-promo-home-abtest');
        }
    } else{}

    $('body').on('click', '.mid-current-promo__slide a', function(){
        whatsHappeingDataLayer('Clicks', $(this));
    }); 
    
    $('.top-red-strip').on('click', '.top-red-strip__inner--close', function(){
        $('.top-red-strip').remove();
        $('.--container').removeClass('strip-view');
        setLocalStorage('closeStrip', true, 365);
    });    
});

const timeConversion = (timestamp) => {
    let diffInMilliseconds = Math.abs(new Date().getTime() - new Date(parseFloat(timestamp)).getTime());
    let seconds = parseInt((diffInMilliseconds / 1000).toFixed(0));
    let minutes = parseInt((diffInMilliseconds / (1000 * 60)).toFixed(0));
    let hours = parseInt((diffInMilliseconds / (1000 * 60 * 60)).toFixed(0));
    let days = parseInt((diffInMilliseconds / (1000 * 60 * 60 * 24)).toFixed(0));
    if (seconds < 60) {
        return seconds + " secs ago";
    } else if (minutes < 60) {
        if(minutes != 1){
            return minutes + " mins ago";
        } else {
            return minutes + " min ago";
        } 
    } else if (hours < 24) {
        if(hours != 1){
            return hours + " hours ago";
        } else {
            return hours + " hour ago";
        }  
    } else {
        if(days != 1){
            return days + " days ago";
        } else {
            return days + " day ago";
        }        
    }
}

const enableCommentOnMsid = (msids) => {    
    $('#news_dtl_'+msids).find('.comment-section').removeClass('hide');
    $('#news_dtl_'+msids).find('.desktop-view1 .btn-comment').removeClass('hide');
    $('#news_dtl_'+msids).find('.comments-section-container').removeClass('hide');
}

EtB2b.comments = (function () {

    const commentFlagged = (evnt) => {
        var inputVal = '';
        $selectorn = $(evnt).parents('.comment-report-container').find('.resport-options');
        $('.comment-section-popup.active .resport-options li').each(function(){
            if($(this).find('input:checked').val() != undefined){
                inputVal = $(this).find('input:checked').val();
                if($(evnt).siblings('.error').length){
                    $(evnt).siblings('.error').remove();
                }
            }         
        });
        if(inputVal == undefined || inputVal == ''){
            if(!$(evnt).siblings('.error').length){
                $(evnt).siblings('.resport-options').append('<span class="error">Please select an option to report.</span>');
            }
        } else{
            // hit report API
            //console.log(inputVal);
            let paramObject = {
                url: commentApiUrl + '/v1/news/comment/flag',
                type: 'GET', 
                data: {'eid':oauthUserData.eid, 'comment_id': 2507738, 'offensive_text': inputVal}
            }
            const ajaxSuccessCall = (data) => {
                toastMsg('Comment Flagged Successfully');
                $('.comment-section-popup.active .comment-post-container').removeClass('hide');
                $('.comment-section-popup.active .comment-report-container').addClass('hide');
                $('.comment-report-container .reason-flag-container textarea').val('');
                $('.comment-section-popup.active .resport-options li input').prop('checked', false);
            }
            const ajaxErrorCall = (data) => {
                console.log(data);
            }
            EtB2b.comJs.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
        }
    }

    const closeFlagLayer = () => {
        $('.comment-section-popup.active .comment-post-container').removeClass('hide');
        $('.comment-section-popup.active .comment-report-container').addClass('hide');
        $('.comment-report-container .reason-flag-container textarea').val('');
        $('.comment-section-popup.active .resport-options li input').prop('checked', false);
        $('.site-header').css('z-index','1');
        $('html').addClass("sidebarPopup");
    }

    const handleCommentflag = () => {
        $('body').on('click', '.flag-comment .flag-dots', function(){
            if($(this).siblings('.show-flag-btn').hasClass('hide')){
                $(this).siblings('.show-flag-btn').removeClass('hide'); 
            } else{
                $(this).siblings('.show-flag-btn').addClass('hide'); 
            }
                 
        });
    }

    const handleTextArea = envt => {
        
        if($(envt).val().length){
            $(envt).siblings('.btn-post-comment').removeClass('hide');
            $(envt).addClass('added-style');
            if($(envt).val().length > 3000){
                if(!$('.post-comment-section .error').length){
                    $(envt).parents('.post-comment-section').append('<div class="error">You have exceeded the maximum character length of 3000.</div>');
                    $('.btn-post-comment').addClass('disabled');
                    $('.write-comment').addClass('error-state');
                }
            } else{
                if($('.post-comment-section .error').length){
                    $('.post-comment-section .error').remove();
                    $('.btn-post-comment').removeClass('disabled');
                    $('.write-comment').removeClass('error-state');
                }
            }
            if($(envt).val().length > txtCommentLen && $(envt).val().length < 480){
                $(envt).css('height',$(envt).height() + 20);
                txtCommentLen = txtCommentLen + 40;
            } else if($(envt).val().length < 120){
                $(envt).removeAttr('style');
            }else if($(envt).val().length > 480){
                $(envt).css('height','230px');
            }
        } else{
            $(envt).siblings('.btn-post-comment').addClass('hide');
            $(envt).removeClass('added-style').removeAttr('style');
            txtCommentLen = 120;
        }
    }

    const noCommentFound = (cmtMsid) => {
        $('.currentlyInViewport .comments-section__no-comments').removeClass('hide');
        $('.currentlyInViewport .comments-section__with-comments').addClass('hide');   
        let commntList = `
            <button type="button" aria-label="close" class="btn-comment-close">
                <span class="sprite-icon-img close-icon"></span>
            </button>
            <div class="comment-post-container">
                <h2>All Comments <span class="comment-length"></span></h2>
                
                <div class="post-comment-section desktop-view">
                    <textarea id="" onkeyup="EtB2b.comments.handleTextAreaEvents(this)" placeholder="What are your thoughts?" class="write-comment"></textarea>
                    <p class="comment-policy btn-post-comment hide">By commenting, you agree to the <a target="_blank" class="link" href="${base_url + '/terms_conditions.php#prohibited_cnt'}">Prohibited Content Policy</a></p>
                    <a tabindex="0" role="button" class="btn btn-post-comment hide" onclick="EtB2b.comments.addComments(this)">Post</a>
                </div>
                
                <div class="post-comment-section mobile-view">
                    <textarea id="" onkeyup="EtB2b.comments.handleTextAreaEvents(this)" placeholder="What are your thoughts?" class="write-comment"></textarea>
                    <p class="comment-policy btn-post-comment hide">By commenting, you agree to the <a target="_blank" class="link" href="${base_url + '/terms_conditions.php#prohibited_cnt'}">Prohibited Content Policy</a></p>
                    <a tabindex="0" role="button" class="btn btn-post-comment hide" onclick="EtB2b.comments.addComments(this)">Post</a>
                </div>
            </div>            
        `;
        $('#news_dtl_'+cmtMsid +' .psidebar').html(commntList);
    }

    const commentAfterArticle = (cmntParam) => {
        let commentParam = cmntParam.children[0];
        let currNewsId = cmntParam.children[0].msid;
        let sameInfoUser = '';
        let commentLimit = '';
        let userImgData = '';
        $('#news_dtl_'+currNewsId +' .comments-section__no-comments').addClass('hide');
        $('#news_dtl_'+currNewsId +' .comments-section__with-comments').removeClass('hide');
        
        if(oauthUserData.eid && oauthUserData.eid == commentParam.user_details.eid){
            sameInfoUser = true;
            userImgData = `<img class="check-user-initials user-init-cat unveil" alt="${commentParam.user_details.first_name}" data-src="${oauthUserData.profile_photo}" src="/Themes/Release/theme4/images/icons/default-user.png" width="32" height="32" />`;
        } else{
            userImgData = `<img class="check-user-initials user-init-cat" alt="${commentParam.user_details.first_name}" src="${commentParam.user_details.original_image}" width="32" height="32" />`;
        }
        if(commentParam.comment_text.length > 528){
            commentLimit = true;
        }
        let fcommntData = `<h2 class="comment-heading">COMMENTS</h2>
                            <div class="users-comment-section main-cmt-section" id="cmta_${commentParam.comment_id}" comment-id="${commentParam.comment_id}">
                            <div class="users-comment-section__user-details">
                                <div class="flag-comment">
                                    <span class="sprite-icon-img flag-dots"></span>
                                    <div class="show-flag-btn hide" >
                                        <a>Flag</a>
                                    </div>
                                </div>
                                <figure>
                                    ${userImgData}
                                </figure>
                                <div class="user-desc">
                                    <span class="user-desc__name">${commentParam.user_details.first_name} ${commentParam.user_details.last_name}</span>
                                    <span class="user-desc__designation">${timeConversion(commentParam.comment_timestamp)}</span>                                                                        
                                </div>
                            </div>
                            <div class="users-comment-section__comments comments_length_limit">
                                ${commentParam.comment_text}                                
                            </div>
                            ${commentLimit ? '<a tabindex="0" role="button" class="btn-comment btn-invert btn-trans" style="padding:0;">View Full Comment</a>' : ''}
                            <div class="users-comment-section__controls">
                                <a class="up-vote upvote" title="Upvote" tabindex="0" role="button" onclick="${sameInfoUser ? "toastMsg('You can not upvote your own comment')" : "EtB2b.comments.upDownVote('upvote', this);"}">
                                    <span class="sprite-icon-img up-icon"><span class="vote-count">${commentParam.upvote_count}</span></span>
                                </a>
                                <a class="down-vote downvote" title="Downvote" tabindex="0" role="button" onclick="${sameInfoUser ? "toastMsg('You can not downvote your own comment')" : "EtB2b.comments.upDownVote('downvote', this);"}">
                                    <span class="sprite-icon-img down-icon"><span class="vote-count">${commentParam.downvote_count}</span></span>
                                </a>
                                <a class="comment-replies btn-comment ${commentParam.replies.length ? "nreplies" : "" }" tabindex="0" role="button">
                                    <span class="sprite-icon-img comment-icon"><span class="vote-count">${commentParam.replies.length ? '<span>' + commentParam.replies.length + '</span> ' + (commentParam.replies.length > 1 ? ' Replies' : ' Reply') : 'Reply'}</span></span>
                                </a>
                            </div>
                        </div>
                        <div class="comments_btn_controls">
                            <a class="comment-here-cta btn-comment btn checkUser_status" tabindex="0" role="button">Comment Now</a>
                            <a class="comment-here-cta btn-comment btn btn-invert" tabindex="0" role="button">Read Comment <span class="comment-length">(${cmntParam.children.length})</span></a>
                        </div>
        `;
        $('#news_dtl_'+currNewsId +' .comments-section__with-comments').html(fcommntData);
    }

    const showCommentList = (cmnList) => {
        let currNewsid = cmnList.children[0].msid;
        let userCmntDetail = '';
        $(cmnList.children).each(function(index, itemList){
            let commentReplySection = '';
            if(itemList.replies.length){
                $(itemList.replies).each(function(i, replyList){
                    let userImgData = '';
                    if(oauthUserData.eid && oauthUserData.eid == replyList.user_details.eid){
                        userImgData = `<img alt="${replyList.user_details.first_name}" class="check-user-initials user-init-cat unveil" data-src="${oauthUserData.profile_photo}" src="${replyList.user_details.original_image}" width="32" height="32" />`;
                    } else {
                        userImgData = `<img class="check-user-initials user-init-cat" alt="${replyList.user_details.first_name}" src="${replyList.user_details.original_image}" width="32" height="32" />`;
                    }
                    commentReplySection += `<div class="users-comment-section" comment-id="${replyList.reply_id}">
                                    <div class="users-comment-section__user-details" >
                                        <div class="flag-comment">
                                            <span class="sprite-icon-img flag-dots"></span>
                                            <div class="show-flag-btn hide" >
                                                <a tabindex="0" role="button" onclick="EtB2b.comments.">Flag</a>
                                            </div>
                                        </div>
                                        <figure>
                                            ${userImgData}
                                        </figure>
                                        <div class="user-desc">
                                            <span class="user-desc__name">${replyList.user_details.first_name} ${replyList.user_details.last_name}</span>
                                            <span class="user-desc__designation">${timeConversion(replyList.reply_timestamp)}</span>
                                        </div>
                                    </div>
                                    <div class="users-comment-section__comments">
                                        ${replyList.reply_text}
                                    </div>
                                </div>`;
                });
            }
            let sameUserInfo = false;
            let userImgData = '';
            if(oauthUserData.eid && oauthUserData.eid == itemList.user_details.eid){
                sameUserInfo = true;
                userImgData = `<img alt="${itemList.user_details.first_name}" class="check-user-initials user-init-cat unveil" data-src="${oauthUserData.profile_photo}" src="${itemList.user_details.original_image}" width="32" height="32" />`;
            } else {
                userImgData = `<img alt="${itemList.user_details.first_name}" class="check-user-initials user-init-cat unveil" src="${itemList.user_details.original_image}" width="32" height="32" />`;
            }
            //data-src="${sameUserInfo ? oauthUserData.profile_photo : itemList.user_details.original_image}";
            userCmntDetail += `<div class="users-comment-section main-cmt-section" id="cmt_${itemList.comment_id}" comment-id="${itemList.comment_id}">
                                <div class="users-comment-section__user-details">
                                    <div class="flag-comment">
                                        <span class="sprite-icon-img flag-dots"></span>
                                        <div class="show-flag-btn hide" >
                                            <a>Flag</a>
                                        </div>
                                    </div>
                                    <figure>
                                        ${userImgData}
                                    </figure>
                                    <div class="user-desc">
                                        <span class="user-desc__name">${itemList.user_details.first_name} ${itemList.user_details.last_name}</span>
                                        <span class="user-desc__designation">${timeConversion(itemList.comment_timestamp)}</span>
                                    </div>
                                </div>
                                <div class="users-comment-section__comments">
                                    ${itemList.comment_text}
                                </div>
                                <div class="users-comment-section__controls">
                                    <a class="up-vote upvote" title="Upvote" tabindex="0" role="button" onclick="${sameUserInfo ? "toastMsg('You can not like your own comment')" : "EtB2b.comments.upDownVote('upvote', this);"}">
                                        <span class="sprite-icon-img up-icon"><span class="vote-count">${itemList.upvote_count}</span></span>
                                    </a>
                                    <a class="down-vote downvote" title="Downvote" tabindex="0" role="button" onclick="${sameUserInfo ? "toastMsg('You can not dislike your own comment')" : "EtB2b.comments.upDownVote('downvote', this);"}">
                                        <span class="sprite-icon-img down-icon"><span class="vote-count">${itemList.downvote_count}</span></span>
                                    </a>
                                    <a class="comment-replies reply-commnt-cta ${itemList.replies.length ? "nreplies" : "" }" tabindex="0" role="button">
                                        <span class="sprite-icon-img comment-icon"><span class="vote-count">${itemList.replies.length ? '<span>' + itemList.replies.length + '</span>' + (itemList.replies.length > 1 ? ' Replies' : ' Reply') : 'Reply'}</span></span>
                                    </a>
                                </div>
                                <div class="replies-container" style="display: none;">
                                    ${commentReplySection}
                                    <div class="post-comment-section">
                                        <textarea id="txtarea_${itemList.comment_id}" onkeyup="EtB2b.comments.handleTextAreaEvents(this)" placeholder="What are your thoughts?" class="write-comment"></textarea>
                                        <p class="comment-policy btn-post-comment hide">By commenting, you agree to the <a target="_blank" class="link" href="${base_url + '/terms_conditions.php#prohibited_cnt'}">Prohibited Content Policy</a></p>
                                        <a class="btn btn-post-comment hide" tabindex="0" role="button" onclick="EtB2b.comments.replyOnComment(this)">Post</a>
                                    </div>
                                </div></div>`;
        });
        let commntList = `
            <button type="button" aria-label="close" class="btn-comment-close">
                <span class="sprite-icon-img close-icon"></span>
            </button>
            <div class="comment-post-container">
                <h2 dcmt-list=${cmnList.children.length ? cmnList.children.length : ''}>All Comments <span class="comment-length">${cmnList.children.length ? '('+cmnList.children.length+')' : ''}</span></h2>
                
                <div class="post-comment-section desktop-view">
                    <textarea id="" onkeyup="EtB2b.comments.handleTextAreaEvents(this)" placeholder="What are your thoughts?" class="write-comment"></textarea>
                    <p class="comment-policy btn-post-comment hide">By commenting, you agree to the <a target="_blank" class="link" href="${base_url + '/terms_conditions.php#prohibited_cnt'}">Prohibited Content Policy</a></p>
                    <a class="btn btn-post-comment hide" tabindex="0" role="button" onclick="EtB2b.comments.addComments(this)">Post</a>
                </div>
                <div class="psidebar__inner">
                    <div class="sort-comment">
                        <div class="arrow-ver desktop-view"></div>
                        <div class="sort-comment__inner">
                            <label>SORT:</label>
                            <select class="cmt-order">
                                <span>
                                    <option val="upvote">Upvoted</option>
                                    <option val="latest">Newest</option>
                                    <option val="oldest">Oldest</option>
                                </span>
                            </select>
                        </div>
                    </div>
                    ${userCmntDetail}
                </div>
                <div class="post-comment-section mobile-view">
                    <textarea id="" onkeyup="EtB2b.comments.handleTextAreaEvents(this)" placeholder="What are your thoughts?" class="write-comment"></textarea>
                    <p class="comment-policy btn-post-comment hide">By commenting, you agree to the <a target="_blank" class="link" href="${base_url + '/terms_conditions.php#prohibited_cnt'}">Prohibited Content Policy</a></p>
                    <a class="btn btn-post-comment hide" onclick="EtB2b.comments.addComments(this)">Post</a>
                </div>
            </div>
            <div class="comment-report-container hide" comment-id="">
                <h2>Find this Comment Offensive?</h2>
                <span class="txt-synps">Choose your reason below and click on the submit button. This will alert our moderators to take actions</span>
            
                <div class="report-lead-txt">REASONS FOR REPORTING</div>
                <ul class="resport-options">
                    <li>
                        <input type="radio" id="cm_lang" name="language" value="Foul Language">
                        <label for="cm_lang">Foul Language</label>
                    </li>
                    <li>
                        <input type="radio" id="cm_defamatory" name="language" value="Defamatory">
                        <label for="cm_defamatory">Defamatory</label>
                    </li>
                    <li>
                        <input type="radio" id="cm_community" name="language" value="Inciting hatred against a certain community">
                        <label for="cm_community">Inciting hatred against a certain community</label>
                    </li>
                    <li>
                        <input type="radio" id="cm_spam" name="language" value="Out of Context / Spam">
                        <label for="cm_spam">Out of Context / Spam</label>
                    </li>
                    <li>
                        <input type="radio" id="cm_others" name="language" value="Others">
                        <label for="cm_others">Others</label>                                    
                    </li>
                </ul>
                <div class="reason-flag-container hide"><textarea class="reason-flag " placeholder="tell us the reason"></textarea></div>
                <button onclick="EtB2b.comments.commentFlagged(this)" class="btn btn-invert remove-after">Report</button>
            </div>
        `;
        $('#news_dtl_'+currNewsid +' .psidebar').html(commntList);        
        $('#news_dtl_'+currNewsid +' .btn-comment .count').html(cmnList.children.length);
        $('#news_dtl_'+currNewsid +' .btn-comment').addClass('show-comment-num');
        $('#news_dtl_'+currNewsid +' .comment-section').addClass('comment-num-dis');
        createCustomSelectBox('#news_dtl_'+currNewsid);
        unvielImg('.comment-section-popup.active', 'img');
        userInitials();
    }

    const handleTextAreaEvents = debounce(handleTextArea, 10);

    const secondLayerCmntList = (msid, pageData, pageNum, pageLimit, sortAction, selectedVal) => {
        var pageData = pageData;        
        let paramObject = {
			url: commentApiUrl + '/v1/news/comment/list?msid='+msid+'&page='+pageNum,
            type: 'GET', 
            data:{'sortby':sortAction},
		}
        const ajaxSuccessCall = (data) => {
            if(data && EtB2b.utils.isOperatable(data.data.children)){
                var commentData = data.data;                
                pageLimit = pageLimit + 20;
                pageNum = pageNum + 1;
                for(let i=0;i<commentData.children.length;i++){
                    pageData.children.push(commentData.children[i]);
                }
                if(pageData.children.length < pageLimit){
                    commentAfterArticle(pageData);
                    showCommentList(pageData);
                } else {
                    secondLayerCmntList(msid, pageData, pageNum, pageLimit, sortAction, selectedVal);
                }
                $('.select .styledSelect').html(selectedVal);
            } 
        }
        const ajaxErrorCall = (data) => {
            console.log(data);
        }
        EtB2b.comJs.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
    }
    const allCommentsList = (msid) => {
        let paramObject = {
			url: commentApiUrl + '/v1/news/comment/list?msid='+msid+'&page=1',
            type: 'GET', 
		}
        const ajaxSuccessCall = (data) => {
            console.log('comments api response');
            if(data && EtB2b.utils.isOperatable(data.data.children)){
                var commentData = data.data;
                if(commentData.children.length < 20){  
                    commentAfterArticle(commentData);                  
                    showCommentList(commentData);
                } else {
                    secondLayerCmntList(msid, commentData, 2, 20);
                }
            } else {
                noCommentFound(msid);
            }
        }
        const ajaxErrorCall = (data) => {
            //$('.comments-section').hide();
            console.log(data);
        }
        EtB2b.comJs.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
    }

    const addImmediateComment = (addcmtParam, currNewsid) => {
        let completeName = oauthUserData.first_name +' '+ oauthUserData.last_name;
        let commentname = completeName || oauthUserData.email.split('@')[0];
        let cmtData = `
        <div class="users-comment-section main-cmt-section">
            <div class="users-comment-section__user-details">
                <div class="flag-comment hide">
                    <span class="sprite-icon-img flag-dots"></span>
                    <div class="show-flag-btn hide" >
                        <a>Flag</a>
                    </div>
                </div>
                <figure>
                    <img class="check-user-initials user-init-cat unveil" alt="${commentname}" data-src="${oauthUserData.profile_photo}" src="/Themes/Release/theme4/images/icons/default-user.png" width="32" height="32">
                </figure>
                <div class="user-desc">
                    <span class="user-desc__name">${commentname} </span>
                    <span class="user-desc__designation">1 sec ago</span>
                </div>
            </div>
        <div class="users-comment-section__comments">
            ${$(addcmtParam).siblings('.write-comment').val()}
        </div>
        <div class="users-comment-section__controls hide">
            <a class="up-vote" tabindex="0" role="button">
                <span class="sprite-icon-img up-icon"><span class="vote-count">0</span></span>
            </a>
            <a class="down-vote" tabindex="0" role="button">
                <span class="sprite-icon-img down-icon"><span class="vote-count">0</span></span>
            </a>
            <a class="comment-replies reply-commnt-cta" tabindex="0" role="button">
                <span class="sprite-icon-img comment-icon"><span class="vote-count">Reply</span></span>
            </a>
        </div>
        <div class="replies-container" style="display: none;">            
            <div class="post-comment-section">
                <textarea id="" onkeyup="EtB2b.comments.handleTextAreaEvents(this)" placeholder="What are your thoughts?" class="write-comment"></textarea>
                <p class="comment-policy btn-post-comment hide">By commenting, you agree to the <a target="_blank" class="link" href="${base_url + '/terms_conditions.php#prohibited_cnt'}">Prohibited Content Policy</a></p>
                <a class="btn btn-post-comment hide" onclick="EtB2b.comments.replyOnComment(this)">Post</a>
            </div>
        </div></div>
        `;
        let cmtFirstData = `
            <div class="psidebar__inner">
                <div class="sort-comment">
                    <div class="arrow-ver desktop-view"></div>
                    <div class="sort-comment__inner">
                        <label>SORT:</label>
                        <select class="cmt-order">
                            <span>
                                <option val="upvote">Upvoted</option>
                                <option val="latest">Newest</option>
                                <option val="oldest">Oldest</option>
                            </span>
                        </select>
                    </div>
                </div>
            </div>
        `;
        if(!$('.comment-section-popup.active').find('.psidebar__inner').length){
            $($(addcmtParam).parents('.comments-section-container').find('.comment-post-container').append(cmtFirstData));
        }        

        $($(addcmtParam).parents('.comments-section-container').find('.psidebar__inner .sort-comment')).after(cmtData);
        let hasAttr = $('#news_dtl_'+currNewsid +' .comment-post-container h2').attr('dcmt-list');
        if(typeof hasAttr !== 'undefined' && hasAttr !== false){
            let listval = parseFloat($('#news_dtl_'+currNewsid +' .comment-post-container h2').attr('dcmt-list'));
            let actualVal = listval + 1;
            $('#news_dtl_'+currNewsid +' .comment-post-container h2').attr('dcmt-list',actualVal);
            $('#news_dtl_'+currNewsid +' .comment-post-container .comment-length').html('('+actualVal+')');
            $('#news_dtl_'+currNewsid +' .btn-comment .count').html(actualVal);
        } else {
            $('#news_dtl_'+currNewsid +' .comment-post-container h2').attr('dcmt-list','1');
            $('#news_dtl_'+currNewsid +' .comment-post-container .comment-length').html('('+1+')');
            $('#news_dtl_'+currNewsid +' .btn-comment .count').html('1');
            $('#news_dtl_'+currNewsid +' .btn-comment').addClass('show-comment-num');
            $('#news_dtl_'+currNewsid +' .comment-section').addClass('comment-num-dis');
            createCustomSelectBox('#news_dtl_'+currNewsid);
        }
        addImmediateCommentArticle(addcmtParam, cmtData);
        userInitials();
    }

    const addImmediateCommentArticle = (cmtAttr, cmtData) => {
        $(cmtAttr).parents('.comments-section-container').find('.comments-section__no-comments').addClass('hide');
        $(cmtAttr).parents('.comments-section-container').find('.comments-section__with-comments').removeClass('hide');
        $(cmtAttr).parents('.comments-section-container').find('.comments-section__with-comments .users-comment-section').remove();
        $($(cmtAttr).parents('.comments-section-container').find('.comments-section__with-comments h2').after(cmtData));
        $($(cmtAttr).parents('.comments-section-container').find('.comments-section__with-comments .comment-here-cta span').html($('.comment-section-popup.active .comment-post-container .comment-length').html()));
        unvielImg('.users-comment-section__user-details', 'img');
    }   

    const addImmediateReply = (addCmtReply) => {
        let completeName = oauthUserData.first_name +' '+ oauthUserData.last_name;
        let commentname = completeName || oauthUserData.email.split('@')[0];
        let cmtData = `
        <div class="users-comment-section">
            <div class="users-comment-section__user-details">
                <div class="flag-comment hide">
                    <span class="sprite-icon-img flag-dots"></span>
                    <div class="show-flag-btn hide" >
                        <a>Flag</a>
                    </div>
                </div>
                <figure>
                    <img class="check-user-initials user-init-cat unveil" alt="${commentname}" data-src="${oauthUserData.profile_photo}" src="/Themes/Release/theme4/images/icons/default-user.png" width="32" height="32">
                </figure>
                <div class="user-desc">
                    <span class="user-desc__name">${commentname} </span>
                    <span class="user-desc__designation">1 sec ago</span>
                </div>
            </div>
            <div class="users-comment-section__comments">
                ${$(addCmtReply).siblings('.write-comment').val()}
            </div>
        </div>
        `;
        $($(addCmtReply).parents('.replies-container')).prepend(cmtData);
        replyCount(addCmtReply);
        unvielImg('.users-comment-section__user-details', 'img');
        userInitials();
    }

    const replyCount = (addCmtReply) => {
        let repCount = parseFloat($(addCmtReply).parents('.users-comment-section').find('.comment-replies .vote-count span').html() ? $(addCmtReply).parents('.users-comment-section').find('.comment-replies .vote-count span').html() : 0);
        repCount = repCount + 1;
        let repCounts = `<span>${repCount}</span> ${repCount > 1 ? 'Replies' : 'Reply'}`;
        $(addCmtReply).parents('.users-comment-section').find('.comment-replies .vote-count').html(repCounts);
        $(addCmtReply).parents('.users-comment-section').find('.comment-replies').addClass('nreplies');
    }

    const addComments = (addcmtParam) => {
        let msid = $(addcmtParam).parents('.comments-section-container').attr('data-msid');
        let cmtMsg = $(addcmtParam).siblings('.write-comment').val();
        cmtMsg = encodeURIComponent(cmtMsg);
        $(addcmtParam).parents('.post-comment-section').find('.error').remove();
        cmtMsg = cmtMsg.trim();
        if(cmtMsg.length < 3){
            $(addcmtParam).parents('.post-comment-section').append('<div class="error">Please input a valid comment</div>');
            return;
        }
        let paramObject = {
			url: commentApiUrl + '/v1/news/comment/add?msid='+msid+'&comment_txt='+cmtMsg,
            type: 'GET', 
            data: {'entity_type': 'ARTICLE', 'eid':oauthUserData.eid, 'user_email': oauthUserData.email}
		}
        const ajaxSuccessCall = (data) => {
            console.log(data);
            addImmediateComment(addcmtParam, msid);
            $(addcmtParam).siblings('.write-comment').val('').removeAttr("style");
            toastMsg('Comment has been posted successfully.');    
        }
        const ajaxErrorCall = (data) => {
            console.log(data);
            if(data.responseJSON){
                $(addcmtParam).parents('.post-comment-section').append('<div class="error">'+data.responseJSON.data.Error+'</div>');
            }
        }
        EtB2b.comJs.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
    }

    const upDownVoteCount = (action, vparam) => {
        let comment_id = $(vparam).parents('.main-cmt-section').attr('comment-id');
        let vcount = $(vparam).find('.vote-count').text();
        let actualCount = parseFloat(vcount) + 1;
        let userVoteStatus = sessionStorage.getItem('userVoteStatus');
        upDownObj = JSON.parse(userVoteStatus) || [];
        if(upDownObj.length){
            for (let i=0; i<upDownObj.length; i++){
                if(!upDownObj.includes(comment_id)){
                    upDownObj.push(comment_id);
                    sessionStorage.setItem("userVoteStatus", JSON.stringify(upDownObj));
                    $(vparam).find('.vote-count').html(actualCount);
                    voteCountAfterArticle(action, vparam, actualCount);
                    upDownVoteParam = false;
                    return false;
                } else {
                    upDownVoteParam = true;
                    return false;
                }
            }
        } else {  
            upDownObj.push(comment_id);
            sessionStorage.setItem("userVoteStatus", JSON.stringify(upDownObj));
            $(vparam).find('.vote-count').html(actualCount);
            voteCountAfterArticle(action, vparam, actualCount);
        }
    }

    const voteCountAfterArticle = (action, vparam, actualCount, otherClick) => {
        let cmtId = $(vparam).parents('.main-cmt-section').attr('id');
        if($(vparam).parents('.comments-section__with-comments').length){
            $(vparam).parents('.comments-section-container')
                .find('.psidebar .main-cmt-section').each(function(){
                    if($(this).attr('id') == cmtId){
                        $(this).find('.'+action +' .vote-count').html(actualCount);                        
                    }
                });
        } else {
            $(vparam).parents('.comments-section-container')
                .find('.comments-section__with-comments .main-cmt-section').each(function(){
                    if($(this).attr('id') == cmtId){
                        $(this).find('.'+action +' .vote-count').html(actualCount);                        
                    }
                });
        }
    }

    const upDownVote = (action, vparam) => {
        if (!EtB2b.globalVar.is_loggedin) {
            login_source_info = "Comment";
            checkIsLogined();  
            return false;          
        }

        let cmtId = $(vparam).parents('.main-cmt-section').attr('comment-id');
        let msid = $(vparam).parents('.comments-section-container').attr('data-msid');
        let paramObject = {
			url: commentApiUrl + '/v1/news/comment/reaction?msid='+msid,
            type: 'GET', 
            data: {'eid':oauthUserData.eid, 'comment_id': cmtId, 'action':action}
		}        
        upDownVoteCount(action, vparam); 
        if(upDownVoteParam){ 
            toastMsg('You can not vote again on same comment');  
            return false;
        }
        const ajaxSuccessCall = (data) => {
            if(action != 'upvote'){
                console.log('down voted.');
            } else{
                console.log('up voted.');
            }
        }
        const ajaxErrorCall = (data) => {
            console.log(data);
        }
        EtB2b.comJs.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
    }

    const sortCommentByOrder = (msid, sortby, selectVal) => {
        let paramObject = {
			url: commentApiUrl + '/v1/news/comment/list',
            type: 'GET', 
            data: {'msid':msid, 'sortby': sortby, 'page':1}
		}
        const ajaxSuccessCall = (data) => {
            console.log('comments api response');
            if(data && EtB2b.utils.isOperatable(data.data.children)){
                var commentData = data.data;
                if(commentData.children.length < 20){  
                    showCommentList(commentData);
                    $('.select .styledSelect').html(selectVal);
                } else {
                    secondLayerCmntList(msid, commentData, 2, 20, sortby, selectVal);
                    $('.select .styledSelect').html(selectVal);
                }
                
            }            
        }
        const ajaxErrorCall = (data) => {
            console.log(data);
        }
        EtB2b.comJs.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
    }

    const replyOnComment = (addCmtReply) => {
        let msid = $(addCmtReply).parents('.comments-section-container').attr('data-msid');
        let replyMsg = $(addCmtReply).siblings('.write-comment').val();
        let cmntId = $(addCmtReply).parents('.main-cmt-section').attr('comment-id');
        $(addCmtReply).parents('.post-comment-section').find('.error').remove();
        replyMsg = replyMsg.trim();
        if(replyMsg.length < 3){
            $(addCmtReply).parents('.post-comment-section').append('<div class="error">Please input a valid comment</div>');
            return;
        }
        let paramObject = {
			url: commentApiUrl + '/v1/news/comment/reply',
            type: 'GET', 
            data: { 'msid':msid,
                    'reply_txt':replyMsg,
                    'entity_type': 'ARTICLE', 
                    'eid':oauthUserData.eid, 
                    'user_email': oauthUserData.email,
                    'comment_id': cmntId,
                }
		}
        const ajaxSuccessCall = (data) => {
            addImmediateReply(addCmtReply);
            $(addCmtReply).siblings('.write-comment').val('');
        }
        const ajaxErrorCall = (data) => {
            console.log(data);
            if(data.responseJSON){
                $(addCmtReply).parents('.post-comment-section').append('<div class="error">'+data.responseJSON.data.Error+'</div>');
            }
        }
        EtB2b.comJs.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
    }

    return{
        commentFlagged       : commentFlagged,
        handleCommentflag    : handleCommentflag,
        handleTextAreaEvents : handleTextAreaEvents,
        allCommentsList      : allCommentsList,
        addComments          : addComments,
        upDownVote           : upDownVote,
        sortCommentByOrder   : sortCommentByOrder,
        replyOnComment       : replyOnComment,
        closeFlagLayer       : closeFlagLayer,
    }
})();

const setOverLayOnHover = () => {
    
    $('.top-panel__navigation > li').mouseenter(function (e) {

        setTimeoutConst = setTimeout(function(){            
            if ($(e.target).closest('.top-panel__navigation>li:first-child, .direct-nav-link').length != 0) {
                $('.site-header').removeClass('menu-active');
                $('.layer-overlay').addClass('hide').css('top', '0');
                $('html').removeClass("leftsidebarPopup");
                $('.top-secondary-nav .navigation__more--dropdown').css('padding-bottom', '16px');            
                return false;
            }
            
        }, delayNav);
                
    });
    $('.top-panel__navigation > li').mouseleave(function () {
        //disableScrollEvent();
        clearTimeout(setTimeoutConst);

    }).mouseleave(() => {
        $('.layer-overlay').addClass('hide').css('top', '0');
        $('.layer-overlay-nav').addClass('hide');
        enableScrollEvent();
        $('html').removeClass('disable-scroll-show');
        enableScroll();
        clearTimeout(setTimeoutConst);
    });
}

const dropUp = (elm) => {
    let hoverElmTop = elm.target.getBoundingClientRect().y;
    let winHeight = $(window).outerHeight();
    let spaceDown = winHeight - hoverElmTop;
    let hoverChildHeight = $(elm.target).find('.navigation__more--dropdown').height();
    if(hoverChildHeight > spaceDown){
        let moveHoverElm = hoverChildHeight - spaceDown;
        moveHoverElm = -(moveHoverElm + 30); 
        $(elm.target).find('.navigation__more--dropdown').css('top',moveHoverElm);
    } else {
        $(elm.target).find('.navigation__more--dropdown').removeAttr('style');
    }
}

const dropLeftRight = (elm) => {
    let hoverElmTop = elm.currentTarget.childNodes[3].getBoundingClientRect().x;    
    if(hoverElmTop < 0){
        hoverElmTop = hoverElmTop - 30;
        $(elm.target).find('.navigation__more--dropdown').css('right',hoverElmTop);
    } else {
        //$(elm.target).find('.navigation__more--dropdown').removeAttr('style');
    }
}

const subNavHoverFeature = () => {
    if(deviceType != 'mobile'){
        $('.navigation__more--trigger').mouseenter(function (e) {
            $('.top-secondary-nav').addClass('overflow-style');
            if(!$('.site-header.sticky').length){
                if($(window).scrollTop() > 80){
                    $('.layer-overlay').removeClass('hide').css('top', theme_version == 'v4' ? '80px' : '90px');
                } else {
                    $('.layer-overlay').removeClass('hide').css('top', theme_version == 'v4' ? '125px' : '190px');
                }
                
            }
            dropUp(e);
            if($(e.currentTarget).parents('.top-secondary-nav').length){
                if(!$(e.currentTarget).parents('.menu-active').length){
                    dropLeftRight(e);
                }
            }            
        });
        $('.navigation__more--trigger').mouseleave(function () {
        }).mouseleave((e) => {
            $('.top-secondary-nav').removeClass('overflow-style');
            $('.top-secondary-nav').find('.navigation__more--dropdown').removeAttr('style');
            if(!$('.site-header.sticky').length && !($(e.currentTarget).parents('.first_level_nav').length)){
                $('.layer-overlay').addClass('hide').css('top','0');
            }
        });
    }
}


$('.menu-active .top-secondary-nav').mouseenter(function (e) {
    enableScrollEvent();
});
$('.menu-active .top-secondary-nav').mouseleave(function () {
    }).mouseleave(() => {
        disableScrollEvent();
    }
);

const setUniqueHeight = () => {
    let greySlide = [];
    if(deviceType != 'mobile' || !$('.page-longInpage').length){
        $('.mid-current-promo.bg-grey .mid-current-promo__slide').each(function (i, v) {
            greySlide.push($(this).height());
        });
        let maxSlideHeight = Math.max(...greySlide)
        $('.mid-current-promo.bg-grey .mid-current-promo__slide').css('height', maxSlideHeight);
    }
}

const rssTabbPanel = () => {
    $('#tabstrips4 li a').click(function () {
        var title = $(this).attr('title');
        $('#tabstrips4 li').removeClass('active');
        $(this).parents('li').addClass('active');

        $('.toggle_rss').addClass('hide');
        $('#' + title).removeClass('hide');
    })
}

const sidebarSpeakerPopupListing = () => {
    $(document).on('click', '.view-all-speaker', function (event) {
        let target_parent = $(this).attr("data-parent-id");
        let title = $(this).attr("data-title");
        let url = $(this).attr("data-url");
        let cta = $(this).attr("data-cta");
        let cta_class = typeof $(this).attr("data-cta-class") !== 'undefined' ? 'btn-invert' : '';
        let speaker_list = $(target_parent).find(".speaker_list").html();
        let head_prefix = 'Speakers in ';
        $('#sidebar').addClass('visible');
        $('.right-sidebar-popup').addClass('active');
        $(".google-ad.skinning").hide();
        $('html').addClass("sidebarPopup");
        $('.mobile-header').addClass('hide');
        let popup_selector = $(document).find("#popup_list_items");
        popup_selector.html("");
        popup_selector.html(speaker_list);
        popup_selector.find('img').each(function () {
            let def_img = $(this).attr('data-default-src');
            $(this).attr('src', def_img);
        })
        popup_selector.find('img').addClass('unveil');
        $(document).find("#popup_list").find("#popup_cta").text(cta);
        cta_class != '' ? $(document).find("#popup_list").find("#popup_cta").addClass(cta_class) : false;
        $(document).find("#popup_list").find("#popup_cta").attr("href", url);
        $(document).find("#popup_list").find("#popup_title").html(head_prefix + title);
        unvielImg('#popup_list_items', 'img');
        $('.top-footer').addClass('footer-priority');
    });
    $(document).on('click', '.show_leader_activities', function (e) {
        $('#sidebar').addClass('visible');
        $('.right-sidebar-popup').addClass('active');
        $(".google-ad.skinning").hide();
        $('html').addClass("sidebarPopup");
        $('.mobile-header').addClass('hide');
        let popup_selector = $(document).find("#popup_list_items");
        let popup_content_id = $(this).attr('data-popup-content-id');
        let popup_html = $(document).find("#" + popup_content_id).html();
        popup_selector.html(popup_html);
        popup_selector.find('img').each(function () {
            let def_img = $(this).attr('data-default-src');
            $(this).attr('src', def_img);
        })
        unvielImg('#popup_list_items', 'img');
        $('.top-footer').addClass('footer-priority');
    });

    $(document).on('click', '.page-eventListing .right-sidebar-popup.active, .page-webinarListing .right-sidebar-popup.active, .page-leaderSpeakListing .right-sidebar-popup.active', function (e) {
        if ($(e.target).closest('#sidebar').length != 0) {
            if ($(e.target).closest('.close-rightSidebar, .speark-desc-list_inner a').length != 1) {
                return false;
            }
        }
        $('.psidebar, #sidebar').removeClass('visible');
        $(this).removeClass('active');
        $('.right-sidebar-popup').removeClass('active');
        $('html').removeClass("sidebarPopup");
        $(".google-ad.skinning").show();
        $('.mobile-header').removeClass('hide');
        $('.top-footer').removeClass('footer-priority');
    });

    $(document).on('click', '.right-sidebar-popup.active #popup_cta', function (e) {
        let url = $(this).attr('href');
        url != 'javascript:void(0);' && window.open(url, '_blank').focus();
    });
}

const sidebarSpeakerPopup = () => {

    $('body').off('click', '.author-info-popup').on('click', '.author-info-popup', function () {        
        let popid = $(this).attr('data-author_msid');
        let authorid = $(this).attr('data-author-id');
        $('#author_detail_' + popid + '_' + authorid).parents('.psidebar').addClass('visible');
        $('#author_detail_' + popid + '_' + authorid).parents('.right-sidebar-popup').addClass('active');
        let thisElm = document.getElementsByClassName('author_detail_'+authorid)[0];
        if(!$('.author_detail_'+authorid).find('.popupBody-wrapper').length){
            loadAjaxModule(thisElm);
        }
        
        $('html').addClass("sidebarPopup");
        $('.mobile-header').addClass('hide');
        $('.main-content #Skin_LP_right, #closeDiv').css('z-index', '9');

        var txtLen = $('.top-story-panel__content .author_info').text().length;
        if (txtLen < 170) {
            $('.top-story-panel__content .author_info').addClass('full_detail');
        }
        
        $('.top-footer').addClass('footer-priority');
        userInitials();        
    });


    const loadAuthorData = function (event) {
        let elem_id = event && event.id ? event.id : '';
        if (elem_id != '') {
            let element = $("#" + elem_id);
            let target_parent = element.attr('data-parent-id') || '';
            element.addClass('rndr_ajx');
            element.removeClass('ajax_rendered');
            renderAjaxModules(target_parent);
        }

    }

    //analytics api for videos
    if ($('.page-videoListingDetail').length && news_msid) {
        getAnalyticsData(news_msid, 'videos');
    }

    //analytics api for podcasts
    if ($('.page-podcastListingDetail').length && news_msid) {
        getAnalyticsData(news_msid, 'podcasts');
    }

    //analytics api for news detail
    if ($('.page-newsDetail').length && news_msid) {
        getAnalyticsData(news_msid, 'news');
    }

    $(document).on('click', '.right-sidebar-popup-news.active', function (e) {

        if ($(e.target).closest('#sidebar').length) {
            if ($(e.target).closest('.top-story-panel__content .author_info').length == 1) {
                $('.top-story-panel__content .author_info').addClass('full_detail');
            }
            if ($(e.target).closest('.close-rightSidebar, .top-story-panel__content h1 a, .top-story-panel__item a, .btn-view-profile a, .social-share li').length != 1) {
                return false;
            }
        }
        $('.psidebar').removeClass('visible');
        $(this).removeClass('active');
        $('.right-sidebar-popup').removeClass('active');
        $('html').removeClass("sidebarPopup");
        $('.main-content #Skin_LP_right, #closeDiv').css('z-index', '99');
        $('.mobile-header').removeClass('hide');
        $('.top-footer').removeClass('footer-priority');
    });    
}

const checkBookMarkStatus = () => {
    var portal = portalName || 'ETBrandEquity.com';
    var storage_key = portal + ':' + environment + ':' + 'userBookmarksInfo';
    storage_key = 'userBookmarksInfo';
    if (getLocalStorage(storage_key)) {
        let userBMId = getLocalStorage(storage_key);
        $(userBMId).each(function (i, v) {
            $('#news_dtl_' + v).find('.icons-bm').addClass('after-bookmark');
        });
    }
}

const checkNotificationStatus = () => {
    if (getLocalStorage('userNotificationsInfo')) {
        let userNotificationId = getLocalStorage('userNotificationsInfo');
        $(userNotificationId).each(function (i, v) {
            //console.log(v);
            $('#notify_' + v).hide();
        });
    }
}

function getAnalyticsData(news_msid, type) {
    var min_view_count = 500;
    if (getLocalStorage('news_analytics_' + news_msid)) {
        let analytics_response = getLocalStorage('news_analytics_' + news_msid);
        $('#analytics-views-div_' + news_msid + ' .analytics-views-text').html(analytics_response.views + ' Industry Professionals');
        $('#analytics-views-div_' + news_msid + ' .analytics-views-data').removeClass('hide');
        return false;
    }

    var bm_request = {
        url: '/analytics',
        type: 'get'
    }

    $.ajax({
        url: bm_request.url + '/' + type + '/' + news_msid + '?' + EtB2b.globals.newThemeParam,
        type: bm_request.type || 'POST',
        data: bm_request.data,
        crossDomain: true,
        success: function (data) {
            console.log('getAnalytics response success');
            //console.log(data);
            if (data.msid) {

                if (data.analytics_response.views > min_view_count) {
                    setLocalStorage('news_analytics_' + data.msid, data.analytics_response, 3 / (24 * 60));
                    $('#analytics-views-div_' + news_msid + ' .analytics-views-text').html(data.analytics_response.views + ' Industry Professionals');
                    $('#analytics-views-div_' + news_msid + ' .analytics-views-data').removeClass('hide');
                }
            }
        },
        error: function (data, XMLHttpRequest, textStatus, errorThrown) {
        }
    });
}

window.userSessionCallBack = function () {
    if (EtB2b.globalVar.is_loggedin) {
        $('.article-section, .flexi-video').find('.prime_paywall').remove();
        $('.article-section__body__news, .flexi-video').removeClass('prime-article');
        $('.article-section__body .top-newsletter-subs__form #subscribe_email_top').attr('type', 'hidden');
        $('.article-section__body .top-newsletter-subs__form #subscriber_btn_top').removeClass('btn-variation');

        if (bookmarkId) {
            bookmarkInit(bookmarkId);
        } else {
            getUserBookmarks();
        }

        if (notify_data) {
            let notify_arr = notify_data.split("_");
            if (notify_arr && notify_arr.length > 0) {
                notifyInit(notify_arr[0], notify_arr[1])
            }
        }
        else {
            //getUserNotifications();
        }
        if($('.right-sidebar-popup').hasClass('active')){
            $('html').addClass("sidebarPopup");
            $('.right-sidebar-popup').removeClass('non-loggedin-user');
        } 
        if($('.page-unsubscribe').length){
            EtB2b.unsubscribe.updateEmail();
        }
    }
    unvielImg('body', 'img');
}
window.nonLoginSessionCB = function () {	
    if($('.page-unsubscribe').length){	
        if (!EtB2b.globalVar.is_loggedin && unsubscribeEventObj.email=='') {	
            let oauthObjConfig = {popup_closable: false};	
            EtB2b.system.login(oauthObjConfig);	
        } else {	
            EtB2b.unsubscribe.updateEmail();	
        }	
    }
} 

window.moreSigninCallBack = () => {
    $('.video-detail__container .container .flexi-video.prime-article').addClass('prime-more-option');
}

const getUserNotifications = function (refresh = 0) {
    var userNotifications = '';
    if (getLocalStorage('userNotificationsInfo') && refresh == 0) {
        userNotifications = getLocalStorage('userNotificationsInfo') || '';
    }
    if (userNotifications.length == 0) {

        var un_request = {
            url: '/notification/list?eid=' + oauthUserData.eid + '&portal=' + ET_PORTAL + '&' + EtB2b.globals.newThemeParam,
            type: 'get'
        }
        $.ajax({
            url: un_request.url,
            type: un_request.type || 'GET',
            data: un_request.data,
            crossDomain: true,
            success: function (data) {
                if (data.status) {
                    setLocalStorage('userNotificationsInfo', data.data, 365);
                    checkNotificationStatus();
                }
            },
            error: function (data, XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    }
    checkNotificationStatus()
    return userNotifications;
}

var getUserBookmarks = function (refresh = 0) {
    var userBm = '';
    var portal = portalName || 'ETBrandEquity.com';
    var storage_key = portal + ':' + environment + ':' + 'userBookmarksInfo';
    storage_key = 'userBookmarksInfo';
    if (getLocalStorage(storage_key) && refresh == 0) {
        userBm = getLocalStorage(storage_key) || '';
    }
    if (userBm.length == 0) {

        var bm_request = {
            url: '/bookmarks/list?eid=' + oauthUserData.eid + '&portal=' + ET_PORTAL + '&' + EtB2b.globals.newThemeParam,
            type: 'get'
        }

        $.ajax({
            url: bm_request.url,
            type: bm_request.type || 'POST',
            data: bm_request.data,
            crossDomain: true,
            success: function (data) {
                console.log('bookmark list response success');
                if (data.status) {
                    //add bookmark ids to local storage
                    setLocalStorage(storage_key, data.data, 20 / (24 * 60));
                    checkBookMarkStatus();
                    if (data.data.length) {
                    }
                }
            },
            error: function (data, XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    }
    return userBm;
}

var bookmarkInit = function (msid) {
    var action = 'add';
    var portal = portalName || 'ETBrandEquity.com';
    var storage_key = portal + ':' + environment + ':' + 'userBookmarksInfo';
    storage_key = 'userBookmarksInfo';
    if (getLocalStorage(storage_key)) {
        userBm = getLocalStorage(storage_key) || '';
        if ($.inArray(msid, userBm) !== -1) {//its already bookmarked
            action = 'delete';
        }
    }
    $('#news_dtl_' + msid).find('.icons-bm').toggleClass('after-bookmark');
    if ($('#news_dtl_' + msid).find('.icons-bm').hasClass('after-bookmark')) {
        toastMsg('Story Saved Successfully');
    }
    if($('#saved_'+msid).length){
        $('#saved_'+msid).remove(); 
        toastMsg('Story Removed from your saved list');
    }
    var bookmarkActionUrl = '/bookmarks/apply';
    var url = bookmarkActionUrl + '?eid=' + oauthUserData.eid + '&msid=' + msid + '&action=' + action + '&portal=' + ET_PORTAL + '&' + EtB2b.globals.newThemeParam;

    $.ajax({
        url: url,
        type: 'get',
        data: '',
        success: function (data) {
            //console.log(data);
            console.log('bookmark action response success');
            setLocalStorage(portal + ':' + environment + ':' + 'saved_stories_update', true);
            getUserBookmarks(1);//update list of bookmarks in local storage
            if (data.status == true) {


            }
        },
        error: function (data, XMLHttpRequest, textStatus, errorThrown) {
            // alert('into ajax error');
            //console.log(data);
        }
    });
}

function bookmarkAction(msid) {
    //add login layer here
    bookmarkId = msid;
    if (!EtB2b.globalVar.is_loggedin) {
        login_source_info = 'Save';
        checkIsLogined();        
    } else {
        bookmarkInit(bookmarkId);
    }
}

var getUpcomingEventsAndWebinars = function (refresh = 0) {
    var userBm = '';
    var portal = portalName || 'ETBrandEquity.com';
    var storage_key = portal + ':' + environment + ':' + 'upcomingEventsWebinarsInfo';

    if (getLocalStorage(storage_key) && refresh == 0) {
        userBm = getLocalStorage(storage_key) || '';
    }
    if (userBm.length == 0) {

        var bm_request = {
            url: '/upcoming-webinar-events',
            type: 'get'
        }

        $.ajax({
            url: bm_request.url + '?' + EtB2b.globals.newThemeParam,
            type: bm_request.type || 'POST',
            data: bm_request.data,
            crossDomain: true,
            success: function (data) {
                console.log('upcoming event webinar response success');
                if (data.status) {
                    //add upcoming events /webinars to local storage
                    setLocalStorage(storage_key, data.data, 5 / (24 * 60));
                    if (data.data.length) {
                    }
                }
            },
            error: function (data, XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    }
    return userBm;
}
getUpcomingEventsAndWebinars();


const sliuckCarouselWithThumbnail = () => {

    $('.slider-thumbnail').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.slider-card-carousel',
        focusOnSelect: true,
        // dots: false,
        centerMode: true,
        arrow: false,
        // focusOnSelect: true,
        infinite: true,
        //loop: false,
        dots: false,
        // focusOnSelect: true,
        variableWidth: true,
        responsive: [{
            breakpoint: 993,
            settings: {
                arrows: false,
                dots: false,
                slidesToShow: 5,
                slidesToScroll: 1,
            }
        }],
    });
    $('.slider-card-carousel').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        variableWidth: true,

        asNavFor: '.slider-thumbnail',
        dots: false,
        centerMode: true,
        focusOnSelect: true,
        responsive: [{
            breakpoint: 993,
            settings: {
                arrows: false,
                dots: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: false,
            }
        }],
    });
}

const createCustomSelectBox = (cselector) => {
    // Iterate over each select element
    $(''+cselector+' .cmt-order').each(function () {

        // Cache the number of options
        var $this = $(this),
            numberOfOptions = $(this).children('option').length;

        // Hides the select element
        $this.addClass('s-hidden');

        // Wrap the select element in a div
        $this.wrap('<div class="select"></div>');

        // Insert a styled div to sit over the top of the hidden select element
        $this.after('<div class="styledSelect"></div>');

        // Cache the styled div
        var $styledSelect = $this.next('div.styledSelect');

        // Show the first select option in the styled div
        $styledSelect.text($this.children('option').eq(0).text());

        // Insert an unordered list after the styled div and also cache the list
        var $list = $('<ul />', {
            'class': 'options'
        }).insertAfter($styledSelect);

        // Insert a list item into the unordered list for each select option
        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).attr('val')
            }).appendTo($list);
        }

        // Cache the list items
        var $listItems = $list.children('li');

        // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
        $styledSelect.click(function (e) {
            e.stopPropagation();
            // $('div.styledSelect.active').each(function () {
            //     $(this).removeClass('active').next('ul.options').hide();
            // });
            $(this).toggleClass('active').next('ul.options').toggle();
        });

        // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
        // Updates the select element to have the value of the equivalent option
        $listItems.click(function (e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $styledSelect.attr('data-rel', $(this).attr('rel'));
            $this.val($(this).attr('rel'));
            $list.hide();
            let msid = $(this).parents('.comments-section-container').attr('data-msid');
            EtB2b.comments.sortCommentByOrder(msid, $(this).attr('rel'), $(this).text());
            /* alert($this.val()); Uncomment this for demonstration! */
        });

        // Hides the unordered list when clicking outside of it
        $(document).click(function () {
            $styledSelect.removeClass('active');
            $list.hide();
        });

    });
}

const clickToCopy = (currElm) => {
    var copyText = $(currElm);

    /* Select the text field */
    copyText.select();
    // copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText($(currElm.currentTarget).attr('data-shareurl'));
    toastMsg('Link Copied Successfully');
    $('.info_consentmsg').trigger('click');
}

const charLengthCount = () => {
    $('body').on('keyup', '#b2boauth_user_message', function () {
        let lenchar = $(this).val().length;
        $('.char-length span').html(lenchar);
    });
}

const calculateSlide = (n, celm) => {
    let maxheight = 0;
    for(let i=1; i<=n; i++){
        maxheight += celm.parent().siblings('.enable-data-slides').find('.slide-data-item:nth-child('+i+')').outerHeight() + 15;
    }
    celm.parent().siblings('.enable-data-slides').find('.enable-data-container').css('max-height', maxheight+100);
}

const slideView = (slideparam, checkslide, currElm) => {
    let check_slide = checkslide || false;
    let slidearr = '';
    if(deviceType != 'mobile'){
        slidearr = {1: [6, '565px','615px'], 2: [8, '760px','815px'], 3:[10, '945px','945px']};
        if(slideparam <= 4){
            $('.whats-happening-container .mid-current-promo__inner').addClass('remove-after');
            $('.whats-happening-container .btn-show').addClass('hide');        
        } 
    } else {
        slidearr = {1: [4, ''], 2: [6, ''], 3:[8, ''], 4:[10, '']};
        if(slideparam <= 2){
            $('.whats-happening-container .mid-current-promo__inner').addClass('remove-after');
            $('.whats-happening-container .btn-show').addClass('hide'); 
        }

        let slideNumSP = $('.special-init-panel .mid-current-promo__slide').length;
        if(slideNumSP <= 2){
            $('.special-init-panel .mid-current-promo__inner').addClass('remove-after');
            $('.special-init-panel .btn-show').addClass('hide'); 
        }

        let slideNumWA = $('.award-winners .award-winners__slide').length;
        if(slideNumWA <= 1){
            $('.award-winners .award-winners__inner').addClass('remove-after');
            $('.award-winners .btn-show').addClass('hide'); 
        }
    }
    if(check_slide){        
        for (var key in slidearr) {
            if(check_slide == key){
                if(slideparam <= slidearr[key][0]){
                    currElm.parent().siblings('.enable-data-slides').addClass('remove-after');
                    currElm.parent().addClass('hide');
                    if(deviceType != 'mobile'){
                        $('.whats-happening-container .mid-current-promo__container').css('max-height',slidearr[key][1]);
                    } else{
                        calculateSlide(slideparam, currElm);
                    }
                }  else {
                    if(deviceType != 'mobile'){
                        $('.whats-happening-container .mid-current-promo__container').css('max-height',slidearr[key][2]);
                    } else{
                        calculateSlide(slidearr[key][0], currElm);
                    }                    
                }
            }
        }
    }
}

const latestNewswithpodcast = () => {
    if(!$('.podcast-section-container .flexi-audio').length){
        $('.podcast-section-container').addClass('hide');
        $('.latest-most-read__container li').removeClass('hide');
    }
}
const topPanelHeight = () => {
    if($('.page-homepage').length && $(window).width() > mediaSizes["end-small"]){
        let leftH = $('.col__left .top-story-panel').outerHeight();
        let rightH  = $('.col__right').outerHeight();
        if(leftH > rightH){
            $('.col__left .top-story-panel, .col__left .top-story-panel__listing--column-1, .col__right').css('height',leftH);
        } else {
            $('.col__left .top-story-panel, .col__left .top-story-panel__listing--column-1, .col__right').css('height',rightH);
        }       
    }  else {
        $('.col__left .top-story-panel, .col__left .top-story-panel__listing--column-1, .col__right').css('height','unset');
    }
}

const userInitials = () => {
    $('.check-user-initials').each(function(){
        if(!$(this).hasClass('initials-checked')){
            $(this).addClass('initials-checked');
            let imageUrl = $(this).attr('data-src');
            let authorName = $(this).attr('alt');
            $(this).addClass('hide');
            checkIfImageExists(imageUrl, (exists) => {
                if (exists) {
                    $(this).removeClass('hide');
                } else {
                    var str = authorName.charAt(0);
                    let bgStyle = '';
                    $(bgColorConfig).each(function(key, val){
                        let letterLength = bgColorConfig[key].letters.length;
                        let letKeys = bgColorConfig[key].letters;                        
                        for(var i=0;i<letterLength;i++){
                            if(str.toLowerCase() == letKeys[i]){
                                bgStyle = bgColorConfig[key].bgcolor;
                            }
                        }
                    });
                    var customName = '<div class="author-name-container user-init-cat" style="background: '+bgStyle+'"><span>' + str + '</span></div>';
                    $(this).after(customName);
                }
            });
        }
    });
}

const catWidgetPanelHeight = () => {
    if($('.page-homepage').length && deviceType != 'mobile'){
        $('.category-widget-panel').each(function(){
            let midWd = $(this).find('.category-widget-panel__mid').outerHeight();
            $(this).find('.category-widget-panel__right').css('max-height', midWd);
        });
    }
}

const browserBackEvent = () => {
    if(window.performance){
        if (window.performance.navigation.type == 2) {
            let winPosition = $(window).scrollTop();
            winPosition = winPosition + 10;
            $(window).scrollTop(winPosition);
        }
    }
}

const selectMenuItem = () => {
    $('body').on('click', '.select-menu-item', function(){
        let selectedItem = $(this).html() + '<span class="caret"></span>';
        $(this).parents('.create-section').find('button').html(selectedItem);
    });
}

const plusFaq = () => {
    $('body').on('click', '.faq-plus-panel__item', function(e){
        e.preventDefault();
        var $target = $(this).find('.answer').slideToggle();
        $('.answer').not($target).slideUp();        
    });
}
const closePlayerContainer = () => {
    const cpc = `
        <div class="close-player-container">
            <div class="bg-blur"></div>
            <ul class="">
                <li class="live">Live</li>
                <li class="title">${playerTitle}</li>
                <li class="btn-play">&#9654</li>
            </div>
        </div>`;
    document.querySelector('.embed-video-container').insertAdjacentHTML('beforeend', cpc);
    $('.video-close-btn, .embed-video-container iframe').addClass('hide');
    isSlike ? slikeEvents.pause() : $('.embed-video-container iframe')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*'); 
    initPlayerAgain();
}
const closeEmbedVideo = () => {
    const mainCont = document.querySelector('.video-close-btn');
    mainCont.addEventListener('click', (e) => {
        if(embedType == 'video'){
            EtB2b.commJs.setLocalStorage("closeRecordedVideo", true, expireTime);
            document.querySelector('.embed-video-container').remove();
        } else {
            EtB2b.commJs.setLocalStorage("closeEmbedVideo", true, expireTime);
            document.querySelector('.embed-video-container').classList.add('closePlayer');
            closePlayerContainer();
        }
    });    
}

const initPlayerAgain = () => {
    $('body').on('click', '.close-player-container', () => {
        isSlike ? slikeEvents.play() : $('.embed-video-container iframe')[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');; 
        $('.close-player-container').remove();
        $('.embed-video-container').removeClass('closePlayer');
        $('.video-close-btn, .embed-video-container iframe').removeClass('hide');
        EtB2b.commJs.deleteLocalStorage('closeEmbedVideo');
    })
}

var playerTitle = '';
let embedUrl = '', embedType = '', validateUrl = false, isSlike = false;
const videoType = ['live_video', 'video'];
const showEmbededVideo = () => {
    $('#inpage_promo_header_list .top-promos__card').each(function(){
        if(videoType.includes($(this).attr('data-subtype'))){
            embedUrl = $(this).attr('href');
            embedType = $(this).attr('data-subtype');
            playerTitle = $(this).attr('title');
        }
    });

    if(embedUrl.indexOf('embed') > -1){
        validateUrl = true;
        isSlike = false;
    }

    if(embedUrl.indexOf('cpl') > -1){
        validateUrl = true;
        isSlike = true;
    }
        
    if(deviceType != 'mobile' && validateUrl){
        let closeRecordedVideo = EtB2b.commJs.getLocalStorage("closeRecordedVideo");
        if(embedType == 'live_video'){
            youtubeEmbedStructure(embedUrl, isSlike);
            closeEmbedVideo();
        } else if(embedType == 'video' && !closeRecordedVideo){
            if($('.page-homepage').length){
                youtubeEmbedStructure(embedUrl, isSlike);
                closeEmbedVideo();
            }
        }
    }    
}

const youtubeEmbedStructure = (url, slikeStatus) => {
    let embedSrc = url || 'https://cpl.sli.ke/npnfhdeg6u/#apikey=etb2b-n9GgmFF518E5Bknb';  
    let close_Video = EtB2b.commJs.getLocalStorage('closeEmbedVideo');
    let iFrameElm = '';
    if(!slikeStatus) {
        iFrameElm = `<iframe 
            src="${embedSrc}?&enablejsapi=1&autoplay=1&mute=1" 
            frameborder="0" 
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>`;         
    }  

    let embedDetails = `
        <div id="iframeVideo" class="embed-video-container"> 
            ${ iFrameElm }
            <div class="video-close-btn vslike-close">
                <span class="sprite-icon-img close-info-wht"></span>
            </div>
        </div>
    `;
    $('body').append(embedDetails);    

    if(slikeStatus){
        loadScript('https://cpl.sli.ke/cca.js', () => {
            slikeEmbedConfiguration(url);
            
            if(close_Video){
                document.querySelector('.embed-video-container').classList.add('closePlayer');
                closePlayerContainer();
            }
        })
    } else if(close_Video && embedType == 'live_video'){
        document.querySelector('.embed-video-container').classList.add('closePlayer');
        closePlayerContainer();
    }
}

var slikeEvents = '';
const slikeEmbedConfiguration = (config) => {
    const urlStr = config.split('/');
    const cleoConfig = {
        contEl: "iframeVideo", // container element 
        eventId: urlStr[3],
        public:true,
        comm: {
          qna: false, // to enable q&a
          comments: false, // to enable chat 
          screenshot: false, //to enable screenshot
        },
        player: {
          controls:true, //to enable play/pause functionality in live player
          headless: false, //for headless player only with mute/unmute functionality
          autoplay: 1, // to be selected from AUTO_PLAY_BEHAVIOUR
          forceFsMobile: false, //to force full screen mweb
          bgpause: false, //to pause whenever tab goes in background
        },
        apikey : 'etb2b-n9GgmFF518E5Bknb',
        recording : true
    };

    const AUTO_PLAY_BEHAVIOUR = {
        NEVER: 0,
        WITHOUT_SOUND: 1,
        ALLOW: 2
    };

    const clientSdk = new CleoClient(cleoConfig, function (err) {
        if (err) {
            console.error("Cleo client", err);
            return;
        }
        console.log("Cleo client loaded");

    });
    slikeEvents = clientSdk;    
}

const navDropDownUTM = () => {
    $('.top-panel__navigation').on('click', '.navigation-hover a', (e) => {
        let getHref = e.currentTarget.getAttribute('href');
        const query = getHref.split('=');
        query[2] = pageLabelName;
        getHref = query.join('=');
        e.currentTarget.setAttribute('href', getHref);
    });

    $('body').off('click', '.mid-current-promo .mid-current-promo__left a').on('click', '.mid-current-promo .mid-current-promo__left a', (e) => {
        let getHref = e.currentTarget.getAttribute('href');
        const query = getHref.split('&');
        let meduimParam;
        query.map((item, index) => {
            if(item.search('utm_medium') > -1){
                meduimParam = item.split('=');
                meduimParam[1] = pageLabelName;
                meduimParam = meduimParam.join('=');
                query[index] = meduimParam;
            }
        });
        getHref = query.join('&');
        e.currentTarget.setAttribute('href', getHref);
    });
}
const mrecBorder = () => {
    const adsCont = document.querySelectorAll('.three-in-a-row');
    adsCont.forEach((curr)=> {
        if(!curr.childNodes.item('').firstElementChild){
            curr.classList.add('hide');
        }
    })
}

document.addEventListener('readystatechange', event => {

    // When HTML/DOM elements are ready:
    if (event.target.readyState === "interactive") {
        unvielImg();
        browserBackEvent();
        selectMenuItem(); 
        navDropDownUTM();  
        setTimeout(function () {
            handleCarousels();            
            setUniqueHeight();
            $('.prominent-leader-speaker').css('visibility', 'visible');
            $('.prominent-leader-speaker').css('height', 'unset');
            unvielImg('.slider-thumbnail', 'img');
            unvielImg('.special-init-panel', 'img');
            unvielImg('.award-winners', 'img');
            unvielImg('.mid-current-promo__slide', 'img');
            unvielImg('.video-widget-panel__item', 'img');
            //binding New Theme param to all CTA
            if(!listLivePortals.includes(ET_PORTAL)){
                //bindNTParamToCTA();
            } 
            latestNewswithpodcast();
            topPanelHeight();
            subNavHoverFeature();
            mrecBorder();     
            plusFaq();            
        }, 1500);
        window.addEventListener('resize', function (event) {
            unvielImg();
            topPanelHeight();
            handleCarousels();
        }, true);
        if (deviceType != 'mobile') {
            setOverLayOnHover();
        }        

        var logoutInfo = sessionStorage.getItem('userlogout');
        if (logoutInfo) {
            toastMsg('Logged Out Successfully');
            sessionStorage.removeItem('userlogout');
        }

        $('body').on('click', '.remove-saved-story .saved-icon', function () {
            $(this).siblings('.show-saved-btn').removeClass('hide');
            $(this).parents('.remove-saved-story').css('z-index','999');
            $('.transparent-overlay').removeClass('hide');
        });

        $(document).click(function (e) {
            if (!$(e.target).closest('.remove-saved-story .saved-icon').length) {
                $('.remove-saved-story .show-saved-btn').addClass('hide');
                $('.remove-saved-story').css('z-index','9');                
            }
            if (!$(e.target).closest('.flag-comment .flag-dots').length) {
                $('.flag-comment .show-flag-btn').addClass('hide');
                $('.flag-comment').css('z-index','9')
            }
        });
        if($('.page-newsDetail').length || $('.page-videoListingDetail').length || $('.page-podcastListingDetail').length){
            EtB2b.comments.allCommentsList(news_msid);
            enableCommentOnMsid(news_msid);
        }
             

        let slide_show = ['460px', '640px', '830px', '955px'];
        var btnclick = {
            whatshapp   : [0, '.whats-happening-container'],
            specialInit : [0, '.special-init-panel'],
            winners     : [0, '.award-winners'],
        };
        let clickBtnElm = '';
        $('body').on('click', '.btn-show button', function(){
            for (var key in btnclick) {
                if($(this).parents(btnclick[key][1]).length){
                    btnclick[key][0] = btnclick[key][0]+1;
                    clickBtnElm = btnclick[key];
                }
            }
            let slideNum = $(this).parent().siblings('.enable-data-slides').find('.slide-data-item').length;
            slideView(slideNum, clickBtnElm[0], $(this));            
        }); 
        $('body').on('click', '.mobile-header__user--saved-stories', function(){
            $('html').removeClass("sidebarPopup");
        }); 

        $('body').on('click', '.close-managepop', function() { 
            EtB2b.model.close_pop(1);
        });  

        $(window).on('scroll', function () {
            if(!whatsHappFlag){
                whatsHappFlag = true;            
                renderAjaxModules();
            }
        });      
        $('body').on('click', '.navigation__more--trigger', function(){            
            if(deviceType != 'desktop'){
                $(this).find('.navigation__more--dropdown').slideToggle();
            }
        });          
    }

    // When window loaded ( external resources are loaded too- `css`,`src`, etc...) 

    if (event.target.readyState === "complete") {
        handleCarousels();
        handleUserEvents();

        $('#cat_news_header_sticky .more').on('mouseover', function () {
            $('#cat_news_header_sticky .more ul').css('left', $('#cat_news_header_sticky .more').offset().left - 120);
        });
        unvielImg('.portal-exclusives-panel__slide', 'img');
        unvielImg('.leaders-speak-panel__slide', 'img');
        unvielImg('.slider-thumbnail', 'img');
        unvielImg('.other-clients-section__inner', 'img');
        unvielImg('.mid-current-promo__slide', 'img');
        setUniqueHeight();  
        latestNewswithpodcast();    
        topPanelHeight(); 
        userInitials();  
        catWidgetPanelHeight();   
        navigationCallBack();     
        navDropDownUTM(); 
    }
});

//window.addEventListener('resize', topPanelHeight);

const displayAwardsWinner = () => {
    setTimeout(function(){
        if($('.portal-awards-panel .portal-events-panel__list').length){
            $('.awards_count').removeClass('hide');
        }
    }, 3000);
}

const navSubStatus = () => {
    if(userSubsStatus){
        $('.navigation-hover__news--right--inner .app-download-section').removeClass('hide');
    } else {
        $('.navigation-hover__news--right--inner .subscription-section').removeClass('hide');
    }
}

const brandStatus = (celm) => {
    let lhpb = $(celm).find('.navigation-hover__brandsolutions--list-container').height();
    let lhb = $(celm).find('.navigation-hover__brandsolutions--list-container ul').outerHeight(true);
    let multiElm = $(celm).find('.multiple-column-brand').length;
    setTimeout(function(){
        if(multiElm) {
            if($('.site-header').hasClass('sticky')){
                disableScroll();
            }
            
            document.querySelector('.navigation-hover__brandsolutions--list-container')
                .addEventListener("wheel", (event) => {
                    window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
                    window.removeEventListener('touchmove', preventDefault, wheelOpt);
                    //disableScroll();
                });
        }
    },300);
}

window.whatsHappeingCallBack = () => {
    let slideNum = $('.whats-happening-container .mid-current-promo__slide').length;
    slideView(slideNum);
}

window.navigationCallBack = () => {
    navSubStatus();
}

window.brandSolutionCallBack = (celm) => {
    brandStatus(celm);
}

window.winnersCallBack = () => {
    displayAwardsWinner();
    slideView();    
}

window.awardsCallBack = () => {
    displayAwardsWinner();
}

window.specialInitiativeCallBack = () => {
    setTimeout(function(){
        slideView();    
    }, 1000);
}
window.inPagePromoCallBack = () => {
    const bodyElm = document.querySelector('body');
    setTimeout(function(){        
        if(!embedPageShow.includes('page-'+pageLabelName)){
            showEmbededVideo();
        }
    }, 1000);
}

window.exclusiveCallBack = () => {
    if(exclusivePortalArr.includes(ET_PORTAL)){
        $('.portal-exclusives-panel-container').hide();
    }
}

window.salesAdsCallBack = () => {
    setTimeout(function(){
        handleCarousels();
    },2000);
}

window.subscriberNewsLetterCB = function () {
    let subscribeMsg = `<div class="newsletter-success-msg">
                        <h2><img width="26" height="26" src="/Themes/Release/theme4/images/icons/icon-green-tick.png" alt="" />
                            <span>Subscribed successfully, way to go...</span>
                        </h2>
                        <ul>
                            <li>We have sent you latest copy</li>
                            <li>To make sure you get notified for every newsletters, Add sender of newsletter to Contact.
                                <img alt="" src="/Themes/Release/theme4/images/icons/after-Newsletter-Subscribed.gif" />
                            </li>
                            <li>If you got the mail under Promotions or Updates tab, or in Spam, You should move the mail to your inbox to make sure you don’t miss any.</li>
                        </ul>
                        <h3 class="share-newsletter">Share Newsletter with Team and Peers
                        <div class="social-share-newsletter">
                            <ul>
                                <li>
                                    <a class="sicon customshare" title="Twitter" data-type="tw" data-shareurl="${base_url}/newsletter" data-title="${SITE_NAME_TITLE} Newsletter" aria-label="Share on Twitter" rel="noreferrer nofollow">
                                        <img width="15" height="15" src="/Themes/Release/theme4/images/icons/twitter-share.svg" alt="Twitter" />
                                        Twitter
                                    </a>
                                </li>
                                <li>
                                    <a class="sicon customshare" data-type="Whatsapp" data-shareurl="${base_url}/newsletter" data-title="${SITE_NAME_TITLE} Newsletter" aria-label="Share on Whatsapp" rel="noreferrer nofollow" title="Whatsapp">
                                        <img width="15" height="15" src="/Themes/Release/theme4/images/icons/whatsapp-share.svg" alt="Whatsapp" />
                                        WhatsApp
                                    </a>
                                </li>
                                <li>
                                    <a class="sicon customshare" data-type="lnkin" data-shareurl="${base_url}/newsletter" data-title="${SITE_NAME_TITLE} Newsletter" aria-label="Share on Linkedin" rel="noreferrer nofollow" title="Linkedin">
                                        <img width="15" height="15" src="/Themes/Release/theme4/images/icons/linkedin-share.svg" alt="Linkedin" />
                                        LinkedIn
                                    </a>
                                </li>
                                <li>
                                    <a class="sicon customshare" data-type="telegram" data-shareurl="${base_url}/newsletter" data-title="${SITE_NAME_TITLE} Newsletter" aria-label="Share on Telegram" rel="noreferrer nofollow" title="Telegram">
                                        <img width="15" height="15" src="/Themes/Release/theme4/images/icons/telegram-share.svg" alt="Telegram" />
                                        Telegram
                                    </a>
                                </li>       
                                <li>
                                    <a class="sicon customshare" data-type="fb" data-shareurl="${base_url}/newsletter" data-title="${SITE_NAME_TITLE} Newsletter" aria-label="Share on Facebook" rel="noreferrer nofollow" title="Facebook">
                                        <img width="15" height="15" src="/Themes/Release/theme4/images/icons/facebook-share.svg" alt="Facebook" />
                                        Facebook                                        
                                    </a>
                                </li>
                                <li>
                                    <a class="sicon copy-link" id="" data-shareurl="${base_url}/newsletter" data-title="${SITE_NAME_TITLE} Newsletter" title="Copy Link">
                                        <img width="15" height="15" src="/Themes/Release/theme4/images/icons/copy-icon.svg" alt="Copy Link" />
                                        Copy Link                                
                                    </a>
                                </li>
                            </ul>
                        </div></h3>
                        </div>`;
    EtB2b.commJs.showSuccessMessage(subscribeMsg, "y", 'newsletter_subscribe');
    contentDetailAdded($('.newsletter_subscribe'));
    $('.social-share-newsletter').on('click', '.copy-link', function (e) {
        clickToCopy(e);
    });
    $('.subscription-section-panel').hide();
}

window.alreadySubscriberCB = function () {
    let alredySubscribeMsg = `<div class="newsletter-success-msg"><h2>Subscribed successfully, way to go...</h2>
                                <ul>
                                    <li>We have sent you latest copy</li>
                                    <li>To make sure you get notified for every newsletters, Add sender of newsletter to Contact.
                                        <img alt="" src="" />
                                    </li>
                                    <li>If you got the mail under Promotions or Updates tab, or in Spam, You should move the mail to your inbox to make sure you don’t miss any.</li>
                                </ul>
                                <h3 class="share-newsletter">Share Newsletter with Team and Peers
                                <div class="social-share-scroll">
                                    <ul>
                                        <li>
                                            <a class="sicon customshare" title="Twitter" data-type="tw" data-shareurl="" data-title="" aria-label="Share on Twitter" rel="noreferrer nofollow">
                                                <img width="20" height="20" src="/Themes/Release/theme4/images/icons/twitter-share.svg" alt="Twitter" />
                                            </a>
                                        </li>
                                        <li>
                                            <a class="sicon customshare" data-type="Whatsapp" data-shareurl="" data-title="" aria-label="Share on Whatsapp" rel="noreferrer nofollow" title="Whatsapp">
                                                <img width="20" height="20" src="/Themes/Release/theme4/images/icons/whatsapp-share.svg" alt="Whatsapp" />
                                            </a>
                                        </li>
                                        <li>
                                            <a class="sicon customshare" data-type="lnkin" data-shareurl="" data-title="" aria-label="Share on Linkedin" rel="noreferrer nofollow" title="Linkedin">
                                                <img width="20" height="20" src="/Themes/Release/theme4/images/icons/linkedin-share.svg" alt="Linkedin" />
                                            </a>
                                        </li>
                                        <li>
                                            <a class="sicon customshare" data-type="telegram" data-shareurl="" data-title="" aria-label="Share on Telegram" rel="noreferrer nofollow" title="Telegram">
                                                <img width="20" height="20" src="/Themes/Release/theme4/images/icons/telegram-share.svg" alt="Telegram" />
                                            </a>
                                        </li>       
                                        <li>
                                            <a class="sicon customshare" data-type="fb" data-shareurl="" data-title="" aria-label="Share on Facebook" rel="noreferrer nofollow" title="Facebook">
                                                <img width="20" height="20" src="/Themes/Release/theme4/images/icons/facebook-share.svg" alt="Facebook" />
                                                
                                            </a>
                                        </li>
                                        <li>
                                            <a class="sicon copy-link" id="" data-shareurl="" data-title="" title="Copy Link">
                                                <img width="20" height="20" src="/Themes/Release/theme4/images/icons/copy-icon.svg" alt="Copy Link" />
                                        
                                            </a>
                                        </li>
                                    </ul>
                                </div></h3>
                                </div>`;
    EtB2b.commJs.showSuccessMessage(alredySubscribeMsg, "y", 'newsletter_subscribe');
}
const callBackReinitiateAjaxState = function (context_id, selector) {
    //reinitiating ajax to ready for next page
    setAjaxState(selector.substring(1).toString(), EtB2b.globals.ajaxStateReady)
}
const fillListingPopup = function (context_id, selector) {
    setAjaxState(selector.substring(1).toString(), EtB2b.globals.ajaxStateReady)
}

const handleLoadMore = function (event) {
    let elem_id = event && event.id ? event.id : '';
    if (elem_id != '') {
        let element = $("#" + elem_id);
        let target_parent = element.attr('data-parent-id') || '';
        element.addClass('rndr_ajx');
        element.removeClass('ajax_rendered');
        renderAjaxModules(target_parent);
    }
}

const handleProductListPagination = function (context_id, selector, list_type, data_params) {
    if (isEmptyObj(data_params))
        return false;
    var params = JSON.parse(JSON.stringify(data_params));
    if (params.has_reached_end)
        $('#' + context_id).hide();
    let params_attr = JSON.stringify(params['data-params']);
    $('#' + context_id).attr('data-params', params_attr);
    //reinitiating ajax to ready for next page
    setAjaxState(selector.substring(1).toString(), EtB2b.globals.ajaxStateReady)
}

const notifyAction = function (entity_id, entity_type) {
    //add login layer here
    notify_data = entity_id + '_' + entity_type;
    checkIsLogined();
    notifyInit(entity_id, entity_type);
}

const notifyInit = function (entity_id, entity_type) {
    var action = 'add';
    var data = {};
    data.eid = EtB2b.utils.encodeHTML(oauthUserData.eid);
    data.action = action;
    data.portal = ET_PORTAL;
    data.entity_id = EtB2b.utils.encodeHTML(entity_id);
    data.entity_type = EtB2b.utils.encodeHTML(entity_type);

    var url = '/save_notify_event?' + EtB2b.globals.newThemeParam;
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        crossDomain: true,
        success: function (data) {
            if (data.status === true) {
                EtB2b.commJs.showSuccessMessage(`<h2>Thank You</h2><p>Your request has been saved.</p>`, "y");
            }
        },
        complete: function () {
            //getUserNotifications(1);//update list of notifications in local storage
        },
        error: function (data, XMLHttpRequest, textStatus, errorThrown) {
            // alert('into ajax error');
            console.log(data);
        }
    });
}
