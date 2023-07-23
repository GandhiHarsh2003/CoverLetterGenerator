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
  
 // To get the text on the page
//  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//   if (changeInfo.status === 'complete') {
//     chrome.scripting.executeScript(
//       {
//         target: { tabId: tabId },
//         function: getJobInformation,
//       },
//       function(result) {
//         if (result && result.length > 0) {
//           var pageText = result[0].result;
//           console.log("Job description: " + pageText);
          
//         }
//       }
//     );
//   }
// });

  


  // function getPageText() {
  //    return document.body.innerText;
  //  }
  
  

