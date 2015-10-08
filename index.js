var preferences = require('sdk/simple-prefs');
var NewTabURL = require('resource:///modules/NewTabURL.jsm').NewTabURL;
var self = require("sdk/self");
var urls = require("sdk/url");
var pageMod = require("sdk/page-mod");
var tabs = require("sdk/tabs");
var { search } = require("sdk/places/history");
var { search_h } = require("sdk/places/history");
var { search_bm } = require("sdk/places/bookmarks");

//var oldnewtaburl = NewTabURL.get();
var newtaburl = self.data.url("newtab.html");
var pm  = pageMod.PageMod({
  include: newtaburl,
  contentScriptFile: "./newtabcontentscript.js",
  onAttach: function(worker) {
	worker.port.on('opennewtab', function(url){
		tabs.open(url);
	});
	worker.port.on("contentscriptloaded", function() {
		var data = {};
		var getTopSites = function (){
			var returndata = [];
			search( { query: "" },
			  { count: 20,
				sort: "visitCount",
				descending: true}
			).on("error", function (e) {
				console.log(e)
			}).on("end", function (results) {
				for (var i=0;i<results.length;i++){
					let result = results[i];
					let a = {};
					a.title = result.title;
					a.url = result.url;
					returndata.push(a);
				}
				worker.port.emit("getTopSitesDone", returndata);
			});
		};
		var getRecentlyBookmarked = function (){
			var returndata = [];
			let { search, UNSORTED } = require("sdk/places/bookmarks");
			search(
			  { query: "" },
			  { count: 80,
				sort: "dateAdded",
				descending: true}
			).on('end', function (results) {
			  for (var i=0;i<results.length;i++){
					let result = results[i];
					let a = {};
					a.title = result.title;
					a.url = result.url;
					returndata.push(a);
				}
				worker.port.emit("getRecentlyBookmarkedDone", returndata);
			});
		};
		var getRecentlyVisited = function() {
			var returndata = [];
			search( { query: "" },
			  { count: 100,
				sort: "date",
				descending: true}
			).on("error", function (e) {
				console.log(e)
			}).on("end", function (results) {
				for (var i=0;i<results.length;i++){
					let result = results[i];
					let a = {};
					a.title = result.title;
					a.url = result.url;
					returndata.push(a);
				}
				worker.port.emit("getRecentlyVisitedDone", returndata);
			});
		};
		data.topSites = getTopSites();
		data.recentlyBookmarked = getRecentlyBookmarked();
		data.recentlyVisited = getRecentlyVisited();
		worker.port.emit("startup", data);
    });
  }
});


// settings stuff
function tabOptionsChanged(){
	switch ( preferences.prefs['newtaboptions'] ){
		case 0:
			preferences.prefs['newtaburl'] = '';
			break;
		case 1:
			preferences.prefs['newtaburl'] = 'chrome://browser/content/places/places.xul';
			break;
		case 2:
			preferences.prefs['newtaburl'] = 'chrome://browser/content/history/history-panel.xul';
			break;
		case 3:
			preferences.prefs['newtaburl'] = 'about:home';
			break;
		case 4:
			preferences.prefs['newtaburl'] = 'about:newtab';
			break;
		case 5:
			preferences.prefs['newtaburl'] = 'about:blank';
			break;
		case 6:
			// leave it be
			break;
		default:
			preferences.prefs['newtaburl'] = '';
			break;
	}
}
function tabURLChanged(){
	NewTabURL.override(preferences.prefs['newtaburl'] || newtaburl);
}
function main (){
	tabOptionsChanged();
	tabURLChanged();
    preferences.on('newtaboptions', tabOptionsChanged);
    preferences.on('newtaburl', tabURLChanged);
}
exports.main = main;
exports.onUnload = function (reason) {
	if(reason === 'disable' || reason === 'uninstall'){
		NewTabURL.override('about:newtab');
	}
};