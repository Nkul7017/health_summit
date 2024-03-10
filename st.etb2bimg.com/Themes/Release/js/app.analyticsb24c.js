etb2blog = console.log;
//var notLegalPortal = window.ET_PORTAL != "legal";
if(typeof $_GET['debug'] == 'undefined'){
    etb2blog = function(){};    
}

// no refernce anywhere
b2b_analytics_helpers = {};
b2b_analytics_helpers.decode_cookie = function(str) {
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
};

b2b_analytics_helpers.get_cookie = function(str) {
   var coo = document.cookie.match('(^|;)\\s*'+str+'\\s*=\\s*([^;]+)');
  return typeof coo != "undefined" && coo ? unescape(coo.pop()) : '';
};

b2b_analytics_helpers.serialize = function( obj ) {
    var str = '?' + Object.keys(obj).reduce(function(a, k){
        a.push(k + '=' + encodeURIComponent(obj[k]));
        return a;
    }, []).join('&');
    return str;
}

// no refernce anywhere
b2b_analytics_core = function(analytics_engine){
  var _this = Object.assign({}, this);
  (function(){
      b2b_analytics_engines[analytics_engine].init.apply(null, arguments);
  })();
  _this.send_pageview = function(){
      etb2blog('analytics_engine '+analytics_engine,'send_pageview',arguments[0]);
      try{b2b_analytics_engines[analytics_engine].send_pageview.apply(null, arguments);}catch(e){}
      return _this;
    };
    _this.send_virtualpageview = function(){
      etb2blog('analytics_engine '+analytics_engine,'send_virtualpageview',arguments[0]);
      try{b2b_analytics_engines[analytics_engine].send_virtualpageview.apply(null, arguments);}catch(e){}
      return _this;
    };
  _this.send_event = function(){
      etb2blog('analytics_engine '+analytics_engine,'send_event',arguments[0]);
      try{b2b_analytics_engines[analytics_engine].send_event.apply(null, arguments);}catch(e){}
      return _this;
    };
  _this.set_user = function(){
      etb2blog('analytics_engine '+analytics_engine,'set_user',arguments[0]);
      try{b2b_analytics_engines[analytics_engine].set_user.apply(null, arguments);}catch(e){}
      return _this;
    };
  return _this;
};


//no reference anywhere
b2b_analytics = function(){
  this.setDefaultEngines = function(engines){
    b2b_analytics.engines = [];
    engines.split(',').forEach(function(engine,index){
      b2b_analytics.engines[engine] = b2b_analytics_core(engine);
    })
    return this;
  };
  this.setPageViewEngines = function(engines){
    b2b_analytics.pageview_engines = [];
    engines.split(',').forEach(function(engine,index){
      b2b_analytics.pageview_engines[engine] = b2b_analytics_core(engine);
    })
    return this;
  };
  this.setEngine = function(engines){
    b2b_analytics.defaultengines = Object.assign({}, b2b_analytics.engines);
    b2b_analytics.engines = {};
    engines.split(',').forEach(function(engine,index){
      b2b_analytics.engines[engine] = (typeof b2b_analytics.defaultengines[engine]!='undefined')?b2b_analytics.defaultengines[engine]:b2b_analytics_core(engine);
    })
    return this;
  };
  this.resetEngines = function(){
    b2b_analytics.engines = b2b_analytics.defaultengines;
    return this;
  };
  this.send_pageview = function(){
    var arg = arguments;
    arg[0] = (typeof arg[0] !='undefined')?(arg[0].replace(window.location.origin,'')):window.location.pathname;
    etb2blog(b2b_analytics.pageview_engines,arg);
    Object.values(b2b_analytics.pageview_engines).forEach(function(engine){
      engine.send_pageview.apply(null,arg);
    });
    return this;
  };
  this.send_virtualpageview = function(){
    var arg = arguments;
    arg[0] = (typeof arg[0] !='undefined')?(arg[0].replace(window.location.origin,'')):window.location.pathname;
    etb2blog(b2b_analytics.pageview_engines,arg);
    Object.values(b2b_analytics.pageview_engines).forEach(function(engine){
      engine.send_virtualpageview.apply(null,arg);
    });
    return this;
  };
  this.send_event = function(){
    var arg = arguments;
    Object.values(b2b_analytics.engines).forEach(function(engine){
      if((typeof arg[1]!="undefined") && Array.isArray(arg[1])){
        arg[1] = {"category":((typeof arg[1][0]!="undefined")?arg[1][0]:"_0"),"action":((typeof arg[1][1]!="undefined")?arg[1][1]:"_1"),"label":((typeof arg[1][2]!="undefined")?arg[1][2]:"_2")};
      }
      engine.send_event.apply(null,arg);
    });
    return this;
  };
  this.set_user = function(){
    var arg = arguments;
    Object.values(b2b_analytics.engines).forEach(function(engine){
      engine.set_user.apply(null,arg);
    });
    return this;
  };
  return this;
}

//no reference anywhere
b2b_analytics.engines = {};
b2b_analytics.defaultengines = {};//no reference anywhere

// Global Refernce, no need to touch
EtB2b = EtB2b || {};
EtB2b.ga = {
    sendGA : function(_hitType, paramObj) {
    },
    setGA : function(key, val) {
    },
    load : function() {
    }
};
window._ibeat_track = {
  "pc": prime_id,
  "ct": content_type
}
var isIbeatLoaded = false;
if(typeof iBeatPgTrend == 'undefined' && hasUserAllowedInEU('ibeat')){
  isIbeatLoaded = true;
  (function(){loadScript('https://agi-static.indiatimes.com/cms-common/ibeat.min.js');})();
}
//no reference anywhere

b2b_analytics_engines = {
  growthrx : {
    init  : function(){
      // if(typeof grx =='undefined' && (!b2bGdpr.isgdprnation || b2bGdpr.userPreference['config.growthrx'] == "1")){
      //   (function (g, r, o, w, t, h, rx) {
      //       g[t] = g[t] || function () {(g[t].q = g[t].q || []).push(arguments)
      //       }, g[t].l = 1 * new Date();
      //       g[t] = g[t] || {}, h = r.createElement(o), rx = r.getElementsByTagName(o)[0];
      //       h.async = 1;h.src = w;rx.parentNode.insertBefore(h, rx)
      //   })(window, document, 'script', 'https://static.growthrx.in/js/v2/web-sdk-debug.js', 'grx');
      //   grx('init', 'g1de061fe');
      //   grx('set', 'nonInteraction', true);
      //   grx('set', 'subProject', 'et_'+ET_PORTAL);
      //   grx('set', 'rel_url', window.location.pathname);
      //   if(typeof grx_config != 'undefined'){
      //     Object.keys(grx_config).forEach(function(key) {
      //           if(key != 'news'){
      //             grx('set', key, grx_config[key]);
      //           }
      //       });
      //   }
      //   var $data =  localStorage.getItem('userlocationinfo');
      //   if ($data != null) {
      //     $data = JSON.parse($data);
      //     if ($data!=null && ('data' in $data)){
      //       $data = $data['data'];
      //       grx('set', 'visitor_location_full', b2b_analytics_helpers.serialize($data));
      //       /*
      //       Object.keys($data).forEach(function(key) {
      //             grx('set', 'visitor_'+key, $data[key]);
      //       });
      //       */
      //     }
      //   }
      //   grx('set', 'pageTitle', document.title);
      //   grx('set', 'date', new Date().toISOString().slice(0, 10));
      //   grx('set', 'utms', getCurrentUrlWithUtm().replace(document.location.pathname,'').replace('?',''));
      // }
    },
    send_pageview : function(url){
      // var obj = {url: window.location.origin+url};
      // if(typeof grx_config != 'undefined' && typeof grx_config.news != 'undefined' && Object.keys(grx_config.news).length){
      //   Object.keys(grx_config.news).forEach(function(key) {
      //       obj['news_'+key] = grx_config.news[key];
      //   });
      // }
      // var utms  = parseUtms()['params'];
      // if(utms){
      //   Object.keys(utms).forEach(function(key) {
      //       obj[key] = utms[key];
      //   });
      // }
      // grx('track', 'page_view', obj);
    },
    send_virtualpageview : function(url){
      // b2b_analytics_engines.growthrx.send_pageview(url);
      //grx('track', 'page_view', {url: window.location.origin+url});
    },
    send_event : function(key,obj){
      // grx('track', key, obj);
    },
    set_user : function(userId,updateProfile){
        // if(userId){
        //     grx('userId', userId);
        //     var _col_uuid = b2b_analytics_helpers.get_cookie('_col_uuid');
        //     if(_col_uuid)
        //     _loggedin_user['uuid'] = _col_uuid;  
        //   if(typeof updateProfile!='undefined' && updateProfile){
        //     grx('profile','profile',_loggedin_user);    
        //   }
        // }
    },
  },
  ga : {
    init  : function(){
    },
    send_pageview : function(url){
    },
    send_virtualpageview : function(url){
    },
    send_event : function(key,obj){
    },
    set_user : function(userId){
    }
  },
  comscore : {
    init  : function(){
    },
    send_pageview : function(url){
    },
    send_virtualpageview : function(url){
    }
  },
  ibeat : {
    init  : function(){
      // load if Ibeat not loaded from head_js
      if(!isIbeatLoaded && typeof iBeatPgTrend == 'undefined' && (!b2bGdpr.isgdprnation || b2bGdpr.userPreference['config.ibeat'] == 1)){
        (function(){loadScript('https://agi-static.indiatimes.com/cms-common/ibeat.min.js');})();
      }
    }
  }
}

//no reference anywhere
function getCurrentUrlWithUtm(){
  return parseUtms()['url'];
}

var _GET = {};
_GET['params'] = $_GET;

//no reference anywhere
function parseUtms(){
  var getQueries = _GET['params'];
  var parameterArray = {};
  if(typeof _GET['utms'] =='undefined'){
    for (var i in getQueries) {
        if (getQueries[i] != undefined) {
            if (i == 'utm_source' || i == 'utm_medium' || i == 'utm_campaign') {
                parameterArray[i] = getQueries[i];
            }
        }
    }
    _GET['utms'] = parameterArray;
  }
  else{
    parameterArray = _GET['utms']; 
  }

  var parameter = '';
  for (var i in parameterArray) {
      parameter += i + '=' + parameterArray[i] + '&';
  }
  if(parameter){
    parameter = parameter.substring(0, parameter.length - 1);
  }
  
  var paraUrl = (parameter != '')?(document.location.pathname + '?' + parameter):document.location.pathname;
  
  return {'url':paraUrl,'params':parameterArray};  
}

//multiple references of this variable
b2b_analtics = b2b_analytics();

// if(notLegalPortal){
//   b2b_analtics.setDefaultEngines('ga,growthrx');
//   b2b_analtics.setPageViewEngines('ga,growthrx,comscore,ibeat');  
// }else{
  b2b_analtics.setDefaultEngines('ga');
  b2b_analtics.setPageViewEngines('ga,comscore,ibeat');
//}


if(typeof window.skip_analytics_page_view == 'undefined'){
  b2b_analtics.send_pageview(getCurrentUrlWithUtm());
}

executeOnReady(function(){

  if(typeof _GET !='undefined' && typeof _GET['utms']!='undefined' &&  typeof _GET['utms']['utm_source']!='undefined' && typeof _GET['utms']['utm_campaign']!='undefined' && _GET['utms']['utm_source'].toLowerCase()=='mailer'){
      var emailStr = b2b_analytics_helpers.decode_cookie(b2b_analytics_helpers.get_cookie(ET_PORTAL+'_pop_user_sub'));
      var email = '';
      if(emailStr)
      {  
        emailArray = emailStr.split('|');
        email = emailArray[0];
      }
      // b2b_analtics.setEngine('growthrx').send_event('Newsletter',{'email':email,'action':'newsletter-open','category':_GET['utms']['utm_campaign']}).resetEngines();
    }

  $(document).on('_gbl_logincb_fn_event', function(){
    b2b_analtics.set_user(_loggedin_user['email']);
    //b2b_analtics.setEngine('ga,growthrx');
    //b2b_analtics.send_event('login',{'user':1,'email':_loggedin_user['email']});
    //b2b_analtics.resetEngines();
  });  

  $("body").on("click", "[data-ga]", function() {
    secnamearray = $(this).attr('data-ga').split(',');
    if (secnamearray) {
        b2b_analtics.send_event('banner-click',{'category':secnamearray[0],'action':secnamearray[1],'label':secnamearray[2],'nonInteraction':false});
    }
  });

  var secname = 'NA';
  var gapage = '';
  if (ec_detail_file == 'index.php')
      gapage = 'Page_index';
  else if (ec_detail_file == 'etb2b_newsdetails.php')
      gapage = 'Page_news_detail';
  else if (ec_detail_file == 'etb2b_blogdetails.php')
      gapage = 'Page_blog_detail';
  $("body").on("click", "a[data-modname]", function() {
      secnamearray = $(this).attr('data-modname').split(',');
      if(secnamearray) {
          $.each(secnamearray, function(i, secname) {
              b2b_analtics.send_event('Section-click', { 'category': gapage, 'action': 'Click', 'label': secname });
          });
      }
  });
});

if(MINIFY_FLAG == 0){
  loadScript(JS_PATH+'/../js/app.featured-section.js?mod=' + file_version);
  // To execute GTM
  loadScript(JS_PATH+'/../js/app.analytics.gtm.js?mod=' + file_version);
  executeOnComplete( function(){
    if(typeof window.grx == 'function'){
      if(theme_version == 'v4'){
        for (let i in yoloOptinShow) {
          if($('.' + yoloOptinShow[i]).length){
            grxEnableCustompopupInit();
          }
        }        
      }
    }
  });
} else{
  // To execute GTM
  loadScript(JS_PATH+'/../js/app.analytics.gtm.min.js?mod=' + file_version);
  setTimeout(() => {
    if(typeof window.grx == 'function'){
      if(theme_version == 'v4'){
        for (let i in yoloOptinShow) {
          if($('.' + yoloOptinShow[i]).length){
            grxEnableCustompopupInit();
          }
        }   
      }
    }
  }, 2000);
}

//eng = b2b_analytics('ga').send_pageview(window.location.href);
// grx('init', 'g1de061fe');

// window.config = {"service_worker":"https://static.growthrx.in/js/v2/sw.js"};
// (function (g, r, o, w, t, h, rx) {
//   g[t] = g[t] || function () {(g[t].q = g[t].q || []).push(arguments)
//   }, g[t].l = 1 * new Date();
//   g[t] = g[t] || {}, h = r.createElement(o), rx = r.getElementsByTagName(o)[0];
//   h.async = 1;h.src = w;rx.parentNode.insertBefore(h, rx)
// })(window, document, 'script', 'https://static.growthrx.in/js/v2/web-sdk.js', 'grx');
// grx('init', 'g1de061fe',window.config,'telecom-himanshu.economictimes.indiatimes.com');


function grxEnableCustompopupInit(){
  // debugger;
  grx("enable_log");
  grx('config',"service_worker","/firebase-messaging-sw.js");
  grx('config',"applicationServerKey","BFytPhp19TGIc_ynglMmcYL7of5aHjPptbE2Xg6VgsGobNNc3NvEGoGzVE9Sq3ui8X4mU2LeBqLKlWWb0NNzH7w");
  // grx('enablePush');
  grx('enableCustompopup');
  //H5DwLSltxAxJhcWjfGKsL3oEYU9X6RQNkXBn88CvvJo
  grx('addListener', 'notification_permission_allowed', function(e){
    console.log("Notification access granted", e.detail);
    // console.log("Notification access granted", e.type);
    send_token(e.type);
  });
  grx('addListener', 'notification_permission_blocked', function(e){
    console.log("Notification access denied", e.detail);
  });
  grx('addListener', 'notification_permission_closed', function(){
      console.log("Notification access prompt closed", e.detail);
  });
  grx('addListener', 'notification_received', function(e){
      console.log("Notification Received", e.detail);
  });
  grx('addListener', 'notification_opened', function(e){
      console.log("Notification Opened", e.detail);
  });
  grx('addListener', 'notification_closed', function(e){
      console.log("Notification Closed", e.detail);
  });
}
function send_token(tok){
	var url = base_url+"/ajax_files/etb2b_desktop_notification.php";
	$.post(url, {'action':'insert_token', 'token':tok}, function(data) {
		//console.log(data);
	});  
}
