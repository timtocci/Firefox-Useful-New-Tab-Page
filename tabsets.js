/**
 * Created by Timothy Tocci <timothytocci.com> on 2/16/2017.
 */
 // google chrome internal skip names
let internal_titles = [
    "Accessibility Internals",
    "Application Cache",
    "Apps",
    "Blob Storage Internals",
    "Bluetooth Internals",
    "Bookmarks",
    "chrome://cache",
    "Settings",
    "Chrome URLs",
    "Components",
    "chrome://conflicts",
    "Crashes",
    "Credits",
    "Device Log",
    "Devices",
    "chrome://dino/",
    "About discards",
    "About DNS",
    "Downloads",
    "Extensions",
    "chrome://flags",
    "chrome://flash",
    "GCM Internals",
    "chrome://gpu",
    "Settings",
    "About Histograms",
    "History",
    "IndexedDB",
    "Inspect with Chrome Developer Tools",
    "Invalidations",
    "Local State Debug Page",
    "Media Engagement",
    "Media Internals",
    "chrome://nacl",
    "chrome://net-internals/#events",
    "chrome://network-error/",
    "Network errors",
    "New Tab",
    "NTP Tiles Internals",
    "Omnibox Debug Page",
    "Password Manager Internals",
    "Policies",
    "Predictors",
    "chrome://print",
    "chrome://profiler",
    "Quota Internals",
    "Safe Browsing",
    "chrome://serviceworker-internals",
    "Settings",
    "Signin Internals",
    "Site Engagement",
    "Suggestions",
    "Supervised User Internals",
    "Sync Internals",
    "About System",
    "taskscheduler-internals",
    "Google Chrome Terms of Service",
    "TopSites Thumbnails",
    "chrome://tracing",
    "Translate Internals",
    "USB Internals",
    "User Actions Debug Page",
    "About Version",
    "chrome://view-http-cache",
    "WebRTC Internals",
    "WebRTC logs",
    "Create Tab Set"
];

$( document ).ready(function() {
    let d = new Date();
    $("#tabsetName")[0].value = getCurrentDateString();
    $("#tabsetName")[0].select();
    let objQueryInfo = {
        windowType: "normal"
    };
    chrome.tabs.query(objQueryInfo, function(tabArray){
        $("ul.openurllist").html(function(){
            let rethtml = "";
            $.each(tabArray, function(index,obj){
                let boolUnchecked = false;
                for(let title of internal_titles){
                    if(obj.title === title){
                        boolUnchecked = true;
                    }
                }
                if(boolUnchecked){
                    rethtml += `<li>
                    <input type="checkbox" class="openurl" name="${obj.title}" id="${obj.title}">
                    <label for="${obj.title}">${obj.title}</label>
                </li>`
                }else{
                    rethtml += `<li>
                    <input type="checkbox" class="openurl" name="${obj.title}" id="${obj.title}" checked>
                    <label for="${obj.title}">${obj.title}</label>
                </li>`
                }
            });
            return rethtml;
        });

        $("#btnSaveTabset").on("click",(evt)=>{
            evt.preventDefault();
            let tabset_data = {
                name: $("#tabsetName")[0].value,
                items: []
            };
            $(".openurl").each((ind,cb)=>{
                if(cb.checked){
                    $.each(tabArray,(idx,tab)=>{
                        if(tab.title === cb.name){
                            let item = {
                                title: tab.title,
                                url: tab.url
                            };
                            tabset_data.items.push(item);
                        }
                    });
                }
            });
            //console.log(tabset_data);
            chrome.runtime.sendMessage({type: "create_tabset", payload: tabset_data}, function(response) {
                // never runs
            });
            //close();
            chrome.tabs.getCurrent(function (tab) {
                chrome.tabs.remove(tab.id);
            });
        });
    });

});
function getCurrentDateString(){
    let d = new Date();
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    let hour = d.getHours();
    let minutes = d.getMinutes();
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    if(hour < 10){
        hour = "0" + hour;
    }
    if(minutes < 10){
        minutes = "0" + minutes;
    }
    return year + "-" + month + "-" + day + "-" + hour + ":" + minutes;
}