chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

    if (changeInfo.url && changeInfo.url.includes("careers")) {
    
      chrome.runtime.sendMessage({type: "openPopup"});
    }
});