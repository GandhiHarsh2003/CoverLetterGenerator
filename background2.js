//Working on popping up the webpage on particular websites. Don't delete. 
// chrome.runtime.onInstalled.addListener(function() {
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//     chrome.declarativeContent.onPageChanged.addRules([{
//       conditions: [
//         new chrome.declarativeContent.PageStateMatcher({
//           pageUrl: { urlContains: 'careers' }
//         })
//       ],
//       actions: [new chrome.declarativeContent.ShowPageAction()]
//     }]);
//   });
// });


// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//   if (changeInfo.url && changeInfo.url.includes("careers")) {
//     chrome.action.enable(tabId);
//   } else {
//     chrome.action.disable(tabId);
//   }
// });


  
//  // To get the url of the page
//   function getActiveTabUrl() {
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//       if (tabs && tabs.length > 0) {
//         let activeTab = tabs[0];
//         let url = activeTab.url;
//         console.log(url);

//       }
//     });
//   }
  
//   chrome.tabs.onActivated.addListener(function(activeInfo) {
//     getActiveTabUrl();
//   });
  
//   getActiveTabUrl();

//   //To get the text on the page
//   chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//     if (changeInfo.status === 'complete') {
//       chrome.scripting.executeScript(
//         {
//           target: { tabId: tabId },
//           function: getPageText,
//         },
//         function (result) {
//           if (result && result.length > 0) {
//             let pageText = result[0].result;
//             console.log(pageText);
  
//           }
//         }
//       );
//     }
//   });
  
//   function getPageText() {
//     return document.body.innerText;
//   }
  

// chrome.runtime.onInstalled.addListener(() => {
//   console.log("Extension installed.");
// });

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if (changeInfo.url) {
//     const url = new URL(changeInfo.url);
//     if (url.href.includes("careers")) {
//       console.log("Yayy");
//       console.log("Career URL detected:", url.href);
//       chrome.tabs.executeScript(tabId, { code: `alert('${chrome.runtime.getURL('popup.html')}')` });
//     }
//   }
// });
