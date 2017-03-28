/* vibrate phone */
		function vibration(time) {
		   time = time || 80;
		   navigator.vibrate(time);
		}
		
		var inAppBrowserRef; 
		
		function onDeviceReady() {

			window.open = cordova.InAppBrowser.open;
			
			var options = "location=no,hidden=yes,zoom=no,clearsessioncache=no,clearcache=no"; // start in hidden mode
			inAppBrowserRef = cordova.InAppBrowser.open('https://www.yaaw.de/?utm_source=phonegapapp', '_blank', options);
			
			inAppBrowserRef.addEventListener('loadstart', loadStartCallBack);
			inAppBrowserRef.addEventListener('loadstop', loadStopCallBack);
			inAppBrowserRef.addEventListener('loaderror', loadErrorCallBack);
			inAppBrowserRef.addEventListener('exit', loadExitCallBack);

		}
		
        document.addEventListener("deviceready", onDeviceReady, false);
		
		function loadStartCallBack(){
			
			inAppBrowserRef.hide(); // hide browser for showing spinner
			$('.loader').show();
		}
		
		function loadStopCallBack(){
			inAppBrowserRef.show(); // show browser after loading page
			$('.loader').hide(); // hide loading spinner after loading page
		}
		
		function loadErrorCallBack(params){

			var scriptErrorMesssage =
			   "alert('Sorry we cannot open that page. Message from the server is : "
			   + params.message + "');"
			   
			inAppBrowserRef.executeScript({ code: scriptErrorMesssage }, executeScriptCallBack);
			
			inAppBrowserRef.close();
			
			inAppBrowserRef = undefined;

		}
		
		function executeScriptCallBack(params) { // error while executing the script
		
			if (params[0] == null) {
			
			}
		}
		
		function loadExitCallBack(){ 
			vibration(140);	// haptic feedback
			navigator.app.exitApp(); // close app
		}
		
		// event for pressing the back button
		document.addEventListener("backbutton", onBackKeyDown, false);
		function onBackKeyDown(event) {
			// your code for handling back button comes here
			vibration(100);
		}
		
		
		
		function deviceReady() {
			
			// Receive intent from another app
			window.plugins.webintent.getUri(function(url) {
				if(url !== "" && url !== "null") {
					// url is the url the intent was launched with
					alert(url);
				}
			});
			
			window.plugins.webintent.getExtra(window.plugins.webintent.EXTRA_TEXT, function (url) {
				if(url !== "" && url !== "null") {
					// url is the url the intent was launched with
					alert(url);
				}
			}, function() { //Fail
				  alert ("error");          
			});
		}
		
		document.addEventListener("deviceready",deviceReady,false);
		