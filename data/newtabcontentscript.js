self.port.on('getTopSitesDone', function(data){
	showTopSites(data);
});
self.port.on('getRecentlyBookmarkedDone', function(data){
	showRecentlyBookmarked(data);
});
self.port.on('getRecentlyVisitedDone', function(data){
	showRecentlyVisited(data);
});

self.port.on('startup', function(data){
	var aobutton = document.getElementById('history');
	aobutton.addEventListener("click", function(){self.port.emit('opennewtab',  'chrome://browser/content/history/history-panel.xul')});
	aobutton = document.getElementById('bookmarks');
	aobutton.addEventListener("click", function(){self.port.emit('opennewtab',  'chrome://browser/content/places/places.xul')});
	aobutton = document.getElementById('addons');
	aobutton.addEventListener("click", function(){self.port.emit('opennewtab',  'chrome://mozapps/content/extensions/extensions.xul')});
	aobutton = null;
	var searchbutton = document.getElementById('btnSearch');
	searchbutton.addEventListener('click', function(e){
		e.preventDefault();
		var term = document.getElementById('txtSearch').value;
		term = term.trim();		
		if(term.length < 1){
			console.log("NO SEARCH TERM");
			return;
		}
		var settingsIdArray = ['cbGoogle', 'cbBing', 'cbYahoo', 'cbDuckDuckGo', 'cbExalead', 'cbGigablast', 'cbFaroo', 'cbQwant', 'cbYandex', 'cbBaidu', 'cbEbay', 'cbAmazon', 'cbAliExpress', 'cbYouTube', 'cbVimeo', 'cbGoogleVideo', 'cbBingVideo', 'cbYahooVideo', 'cbHulu', 'cbWMHT', 'cbVeoh', 'cbBreak', 'cbMetacafe', 'cbDailymotion', 'cbFacebook', 'cbTwitter', 'cbGooglePlus', 'cbFoodie', 'cbYummly', 'cbGoogleRecipes', 'cbMyRecipes', 'cbFood', 'cbCookingChannel', 'cbEatingWell', 'cbBettyCrocker', 'cbHotbot', 'cbDogpile', 'cbWebcrawler', 'cbExcite', 'cbSmugmug', 'cbFlickr', 'cbPhotobucket', 'cbDeviantArt', 'cbImgur'];
		var url;
		for(var i=0; i<settingsIdArray.length; i++){
			if(document.getElementById(settingsIdArray[i]).checked){
				switch(settingsIdArray[i]){
					case 'cbGoogle':
						url = 'https://www.google.com/search?q=' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbBing':
						url = 'http://www.bing.com/search?q=' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbYahoo':
						url = 'https://search.yahoo.com/search?p=' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbDuckDuckGo':
						url = 'https://duckduckgo.com/?q=' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbExalead':
						url = 'https://www.exalead.com/search/web/results/?q=' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbGigablast':
						url = 'http://www.gigablast.com/search?q=' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbYandex':
						url = 'https://www.yandex.com/yandsearch?text=' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbBaidu':
						url = 'http://www.baidu.com/s?wd=' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbFaroo':
						url = 'http://www.faroo.com/#q=' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbQwant':
						url = 'https://www.qwant.com/?q=' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbEbay':
						url = 'http://www.ebay.com/sch/i.html?&_nkw=' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbAmazon':
						url = 'http://www.amazon.com/s/field-keywords=' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbAliExpress':
						url = 'http://www.aliexpress.com/wholesale?SearchText=' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbBookmarks':
						url = 'chrome://bookmarks/#q=' + term;
						onSearch(url);
						break;
					case 'cbHistory':
						url = 'chrome://history/#q=' + term;
						onSearch(url);
						break;
					case 'cbYouTube':
						url = 'http://www.youtube.com/results?search_query=' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbVimeo':
						url = 'http://vimeo.com/search?q=' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbGoogleVideo':
						url = 'https://www.google.com/search?num=100&newwindow=1&safe=off&hl=en&tbm=vid&q=' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbBingVideo':
						url = 'http://www.bing.com/videos/search?q=' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbYahooVideo':
						url = 'http://video.search.yahoo.com/search/video?p=' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbHulu':
						url = 'http://www.hulu.com/search?q=' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbVeoh':
						url = 'http://www.veoh.com/find/?query=' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbBreak':
						url = 'http://www.break.com/findall/?q=' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbMetacafe':
						url = 'http://www.metacafe.com/videos_about/' + encodeURIComponent(term) + '/';
						onSearch(url);
						break;
					case 'cbDailymotion':
						url = 'http://www.dailymotion.com/us/relevance/universal/search/' + encodeURIComponent(term) + '';
						onSearch(url);
						break;
					case 'cbWMHT':
						url = 'http://video.wmht.org/search/?q=' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbFacebook':
						url = 'https://www.facebook.com/search/str/' + encodeURIComponent(term) + '/keywords_top';
						onSearch(url);
						break;
					case 'cbTwitter':
						url = 'https://twitter.com/search?q=' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbGooglePlus':
						url = 'https://plus.google.com/s/' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbFoodie':
						url = 'http://www.foodie.com/search?q=' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbYummly':
						url = 'http://www.yummly.com/recipes?q=' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbGoogleRecipes':
						url = 'https://www.google.com/search?q=' + encodeURIComponent(term) + '&tbs=rcp%3A1';
						onSearch(url);
						break;
					case 'cbMyRecipes':
						url = 'http://www.myrecipes.com/search/site/' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbFood':
						url = 'http://www.food.com/search/' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbCookingChannel':
						url = 'http://www.cookingchanneltv.com/search-results.html?searchTerm=' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbEatingWell':
						url = 'http://www.eatingwell.com/search/apachesolr_search/' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbBettyCrocker':
						url = 'http://www.bettycrocker.com/search/searchresults?term=' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbHotbot':
						url = 'http://www.hotbot.com/search/web?q=' + encodeURIComponent(term) + '&keyvol=01e32e5055bc4ba0f3e4';
						onSearch(url);
						break;
					case 'cbDogpile':
						url = 'http://www.dogpile.com/search/web?q=' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbWebcrawler':
						url = 'https://www.webcrawler.com/search/web?q=' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbSmugmug':
						url = 'http://www.smugmug.com/search/?q=' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbFlickr':
						url = 'https://www.flickr.com/search/?q=' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbPhotobucket':
						url = 'http://photobucket.com/images/' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbDeviantArt':
						url = 'http://www.deviantart.com/browse/all/?q=' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbImgur':
						url = 'http://imgur.com/search?q=' + encodeURIComponent(term);
						onSearch(url);
						break;
					case 'cbExcite':
						url = 'http://msxml.excite.com/search/web?q=' + encodeURIComponent(term);
						onSearch(url);
						break;
				}
			}
		}
	});
});
function showTopSites(topSitesArray){
	var mostVisitedDiv = document.getElementById('mostVisited_div');
	var ul = mostVisitedDiv.appendChild(document.createElement('ul'));
	for (var i = 0; i < topSitesArray.length; i++) {
		var li = ul.appendChild(document.createElement('li'));
		var a = li.appendChild(document.createElement('a'));
		a.href = topSitesArray[i].url;
		a.appendChild(document.createTextNode(topSitesArray[i].title));
	}
}
function showRecentlyBookmarked(recentlyBookmarkedArray){
	var recentlyBookmarkedDiv = document.getElementById('recentlyBookmarked_div');
	var ul = recentlyBookmarkedDiv.appendChild(document.createElement('ul'));
	for (var i = 0; i < recentlyBookmarkedArray.length; i++) {
		var li = ul.appendChild(document.createElement('li'));
		var a = li.appendChild(document.createElement('a'));
		a.href = recentlyBookmarkedArray[i].url;
		a.appendChild(document.createTextNode(recentlyBookmarkedArray[i].title));
	}
}
function showRecentlyVisited(recentlyVisitedArray){
	var recentlyVisitedDiv = document.getElementById('recentlyVisited_div');
	var ul = recentlyVisitedDiv.appendChild(document.createElement('ul'));
	for (var i = 0; i < recentlyVisitedArray.length; ++i) {
		var url = recentlyVisitedArray[i].url;
		var title = recentlyVisitedArray[i].title;
		var li = ul.appendChild(document.createElement('li'));
		var a = li.appendChild(document.createElement('a'));
		a.href = url;
		if(! title){
			a.className = 'color-gray-50 smaller';
			a.appendChild(document.createTextNode('-----NO TITLE-----'));
		}else{
			a.appendChild(document.createTextNode(title));
		}
	}
}
function onChromeUrlClick(e){
	e.preventDefault();
	self.port.emit('opennewtab', e.srcElement.href);
	return false;
}
function onSearch(href){
	self.port.emit('opennewtab', href);
}
function initializeNavMenu(){
	var links = document.getElementsByClassName('chromeurls');
	for(i=0;i<links.length;i++){
		links[i].addEventListener('click', onChromeUrlClick);
	}
}
window.onload = function() {
	self.port.emit('contentscriptloaded');
};