function getActiveTabUrl() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs && tabs.length > 0) {
        let activeTab = tabs[0];
        let url = activeTab.url;
        console.log(url);
      }
    });
}
  
chrome.tabs.onActivated.addListener(function(activeInfo) {
    getActiveTabUrl();
});
  
  getActiveTabUrl();