/*
 chrome.runtime.getBackgroundPage(function(bgPage) {
 //bgPage[tab.url] = data;
 });
 */

var search_items_array = [];
/**
 *  Displays Top Sites
 * @param topSitesArray
 */
function displayTopSites(topSitesArray) {
    var mostVisitedDiv = document.getElementById('mostVisited_div');
    var ul = mostVisitedDiv.appendChild(document.createElement('ul'));
    for (var i = 0; i < topSitesArray.length; i++) {
        var li = ul.appendChild(document.createElement('li'));
        var a = li.appendChild(document.createElement('a'));
        a.href = topSitesArray[i].url;
        a.appendChild(document.createTextNode(topSitesArray[i].title));
    }
}

/**
 *  Displays Recently Bookmarked Sites
 * @param recentlyBookmarkedArray
 */
function displayRecentlyBookmarked(recentlyBookmarkedArray) {
    var recentlyBookmarkedDiv = document.getElementById('recentlyBookmarked_div');
    var ul = recentlyBookmarkedDiv.appendChild(document.createElement('ul'));
    for (var i = 0; i < recentlyBookmarkedArray.length; i++) {
        var li = ul.appendChild(document.createElement('li'));
        var a = li.appendChild(document.createElement('a'));
        a.href = recentlyBookmarkedArray[i].url;
        a.appendChild(document.createTextNode(recentlyBookmarkedArray[i].title));
    }
}

/**
 * Retrieves and displays Recently Visited Sites
 */
function getRecentlyVisited() {
    var microsecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
    var oneWeekAgo = (new Date).getTime() - microsecondsPerWeek;
    var recentlyVisitedDiv = document.getElementById('recentlyVisited_div');
    var ul = recentlyVisitedDiv.appendChild(document.createElement('ul'));
    chrome.history.search({
        'text': '',
        'startTime': oneWeekAgo
    }, function (historyItems) {
        for (var i = 0; i < historyItems.length; ++i) {
            var url = historyItems[i].url;
            var title = historyItems[i].title;
            var li = ul.appendChild(document.createElement('li'));
            var a = li.appendChild(document.createElement('a'));
            a.href = url;
            if (!title) {
                a.className = 'color-gray-50 smaller';
                a.appendChild(document.createTextNode('-----NO TITLE-----'));
            } else {
                title = title.substring(0,29) + "...";
                a.appendChild(document.createTextNode(title));
            }
        }
    });
}

/**
 * Handles link click inside of addon
 * @param e Click Event
 * @returns {boolean}
 * @see https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/create
 * 
 */
function onChromeUrlClick(e) {
    e.preventDefault();
    // nothing works to open xul addresses now
    //chrome.tabs.create({url: e.target.href});
    //window.location = e.target.href;
    return false;
}

/**
 * Opens a new tab
 * @param href
 */
function openTab(href) {
    chrome.tabs.create({url: href});
}

/**
 * Replaces current tab
 * @param href
 */
function replaceTab(href) {
    chrome.tabs.getCurrent(function (tab) {
        openTab(href);
        chrome.tabs.remove(tab.id);
    });
}

/**
 * Initializes Click Listeners for Chrome URLs
 */
function initializeNavMenu() {

    var links = document.getElementsByClassName('chromeurls');

    for (i = 0; i < links.length; i++) {
        links[i].addEventListener('click', onChromeUrlClick);
    }
}


/**
 * Initializes the search pane
 */
function initializeSearch() {
    chrome.runtime.getBackgroundPage(function (bgPage) {
        // bypass data version check for now
        search_items_array = bgPage.getSearchItems().items;
        var categoryArr = [];
        var inserthtml = "";
        // fill the category array
        for (let item of search_items_array) {
            if (categoryArr.lastIndexOf(item.category) === -1) {
                categoryArr.push(item.category);
            }
        }
        // create the html to insert
        for (let category of categoryArr) {
            inserthtml += '<label><strong>' + category + '</strong><ul class="forms-inline-list">';
            for (let item of search_items_array) {
                if (item.category === category) {
                    if (item.active) {
                        inserthtml += `<li><input type="checkbox" name="${item.id}" id="${item.id}" checked><label for="${item.id}">${item.label}</label></li>`;
                    } else {
                        inserthtml += `<li><input type="checkbox" name="${item.id}" id="${item.id}"><label for="${item.id}">${item.label}</label></li>`;
                    }
                }
            }
            inserthtml += '</ul></label>';
        }
        document.getElementById('search_settings_container').innerHTML = inserthtml;
    });
}

function showTabsetItems(index){
    $(".tabset .tabset_items").each(function (idx) {
        if(idx === index){
            $(this).toggle("display");
        }
    });
    $(".tabset .tabset_title_delete").each(function (idx) {
        if(idx === index){
            $(this).toggle("display");
        }
    });
}
function hideTabsetItems(index){
    $(".tabset .tabset_items").each(function (idx) {
        if(idx === index){
            $(this).toggle("display");
        }
    });
    $(".tabset .tabset_title_delete").each(function (idx) {
        if(idx === index){
            $(this).toggle("display");
        }
    });
}

function createTabsetItems(itemsData){
    let htmlInsert = ``;
    let tabset_urls = [];
    for(let tabset of itemsData){
        if(tabset.url){
            console.warn(`Link: '${tabset.title}', probably misplaced in __private_newtabpage/tabsets`);
            chrome.bookmarks.move(tabset.id,{parentId:"2"});
            console.warn(`Moved:'${tabset.title}', to 'Other bookmarks' folder`);

        }else{
            let tabset_url = {
                id:tabset.id,
                urls:[]
            };
            htmlInsert += `<div class="tabset">
				<div class="tabset_title" data-id="${tabset.id}">
					<span class="tabset_title_expand">
						<span class="tabset_expand_text">+</span>
					</span>
					<span class="tabset_title_text_wrapper">
						<span class="tabset_title_text" data-id="${tabset.id}">${tabset.title}</span>
						<span class="tabset_title_delete" data-id="${tabset.id}">X</span>
					</span>
			</div>
				<div class="tabset_items">`;

            for(let child of tabset.children){
                if(!child.url){
                    console.warn(`Folder: '${child.title}', probably misplaced in __private_newtabpage/tabsets`);
                    chrome.bookmarks.move(child.id,{parentId:"2"});
                    console.warn(`Moved:'${child.title}', to 'Other bookmarks' folder`);

                }
                tabset_url.urls.push(child.url);
                htmlInsert += `<div class="tabset_item" data-url="${child.url}">
						<div class="tabset_item_wrapper">
							<div class="tabset_item_title" data-url="${child.url}">${child.title}</div>
							<div class="tabset_item_url" data-url="${child.url}">${child.url}</div>
						</div>
						<div class="tabset_item_delete" data-id="${child.id}">X</div>
					</div>`
            }
            htmlInsert += `</div>
			</div>`
            tabset_urls.push(tabset_url);
        }

    }
    $("#tabset_display").html(htmlInsert);

    // Listeners
    $(".tabset_title_expand").each(function(idx){
        $(this).bind("click", function(){
            $(this).children().each(function(){
                if($(this).text() === "+"){
                    $(this).text("-");
                    showTabsetItems(idx)
                }else{
                    $(this).text("+");
                    hideTabsetItems(idx)
                }
            }) ;
        });
    });

    $(".tabset_title_delete").on("click", (evt)=>{
        evt.stopPropagation();
        chrome.runtime.sendMessage({type:"delete_tabset",payload: $(evt.target).attr("data-id")}, function(response) {
        });
        window.location.reload();
    });

    $(".tabset_item_delete").on("click", (evt)=>{
        chrome.runtime.sendMessage({type: "delete_tabset_item",payload: $(evt.target).attr("data-id")}, function(response) {
        });
        window.location.reload();
    });
    $(".tabset").on("click", (evt)=>{
        for(let data of tabset_urls){
            if(data.id === $(evt.target).attr("data-id")){
                for(let url of data.urls){
                    openTab(url);
                }
                close();
            }
        }
    });
    $(".tabset_item").on("click", (evt)=>{
        replaceTab($(evt.target).attr("data-url"));
    });

}
window.onload = function () {
    chrome.runtime.sendMessage({type: "ready"}, function(response) {
        createTabsetItems(response.payload)
    });

    var createtabsetbutton = document.getElementById('btnCreateTabSet');
    createtabsetbutton.addEventListener('click', function (e) {
        e.preventDefault();
        replaceTab('tabsets.html');
    });

    // initialize search pane
    initializeSearch();

    // handle search button
    var searchbutton = document.getElementById('btnSearch');
    searchbutton.addEventListener('click', function (e) {
        e.preventDefault();
        var term = document.getElementById('txtSearch').value;
        if (term === "" || term === 'No Empty Queries Allowed') {
            document.getElementById('txtSearch').value = 'No Empty Queries Allowed';
        } else {
            var container = document.getElementById('search_settings_container');
            var cbItems = container.getElementsByTagName('input');
            for (let item of cbItems) {
                if (item.type === 'checkbox' && item.checked) {
                    for (let sitem of search_items_array) {
                        if (item.id === sitem.id) {
                            let url = sitem.url[0] + encodeURIComponent(term);
                            if (sitem.url.length > 1) {
                                url += sitem.url[1]
                            }
                            openTab(url);
                        }
                    }
                }
            }
        }
    });

    // display links
    chrome.topSites.get(displayTopSites);
    chrome.bookmarks.getRecent(80, displayRecentlyBookmarked);
    getRecentlyVisited();
    initializeNavMenu();
};