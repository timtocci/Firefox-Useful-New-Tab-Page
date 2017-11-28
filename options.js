window.onload = function () {
    chrome.storage.sync.get('optionsmenudata',(entries)=>{
        ckb = entries.optionsmenudata;
        var list = document.getElementById("items");
        for(i = 0; i < ckb.length; i++){
            console.log(ckb[i]["active"]);
            if(ckb[i]["active"] == 1){
                var li = document.createElement("li");
                var temp = "<input type=\"checkbox\" class=\"butt\" checked=\"true\" value=\"" + ckb[i]["item"] + "\"><span>" + ckb[i]["item"] + "</span></input>";

                li.innerHTML = temp;
                list.appendChild(li);
            }else{
                var li = document.createElement("li");
                var tempp = "<input type=\"checkbox\" class=\"butt\" value=\"" + ckb[i]["item"] + "\"><span>" + ckb[i]["item"] + "</span></input>";
                li.innerHTML = tempp;
                list.appendChild(li);

            }
        }
        as = document.getElementsByClassName("butt");
        for(i=0;i<as.length;i++){
            as[i].addEventListener("click",function(evt){
                if(evt.target.checked == true){

                    chrome.extension.getBackgroundPage().setActive(evt.target.value);
                }else{
                    chrome.extension.getBackgroundPage().setInactive(evt.target.value);
                }
            },false)
        }
    });
// end window.onload
};