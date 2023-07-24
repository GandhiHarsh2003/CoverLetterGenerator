//Working on popping up the webpage on particular websites. Don't delete. 
// chrome.runtime.onInstalled.addListener(function() {
//     chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//       chrome.declarativeContent.onPageChanged.addRules([{
//         conditions: [
//           new chrome.declarativeContent.PageStateMatcher({
//             pageUrl: {urlContains: 'careers'}
//           })
//         ],
//         actions: [new chrome.declarativeContent.ShowPageAction()]
//       }]);
//     });
//   });
  

  // chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  //   if (changeInfo.url && changeInfo.url.includes("careers")) {
  //     chrome.action.enable(tabId);
  //   } else {
  //     chrome.action.disable(tabId);
  //   }
  // });

  //To get the url of the page

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
  // returns job description
  function getJobText() {
    let descriptionElement = document.querySelector("[class*=job-description]");
    if (descriptionElement) {
      return descriptionElement.innerText;
    } else {
      return "Nothing's retrieved";
    }
  }

 //returns the skills listed on job site
  function getSkillsText(){
    let skillsElement = document.querySelector("[class*=skills]");
    if (skillsElement){
      return skillsElement.innerText;
    } else {
      return "No skills retrieved";
    }
  }

  //returns company info listed
  function getAboutCompanyText(){
    let aboutElement = document.querySelector("[class*=about]");
    if (aboutElement){
      return aboutElement.innerText;
    } else {
      return "No about the company retreived";
    }
  }


  // function getPageText() {
  //    return document.body.innerText;
  //  }
