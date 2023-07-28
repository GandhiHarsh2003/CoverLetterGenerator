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

// Incase we ever need to get the job description differently
// To get the text on the page
//   chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//     if (changeInfo.status === 'complete') {
//       chrome.scripting.executeScript(
//         {
//           target: { tabId: tabId },
//           function: getJobText,
//         },
//         function(result) {
//           if (result && result.length > 0) {
//             var pageText = result[0].result;
//             console.log("Job description:"+ pageText);
//           }
//         }
//       );
//     }
//   });


//   // returns job description
//   function getJobText() {
//     let descriptionElement = document.querySelector("[class*=job-description]");
//     if (descriptionElement) {
//       return descriptionElement.innerText;
//     } else {
//       return "Nothing's retrieved";
//     }
//   }

//  //returns the skills listed on job site
//   function getSkillsText(){
//     let skillsElement = document.querySelector("[class*=skills]");
//     if (skillsElement){
//       return skillsElement.innerText;
//     } else {
//       return "No skills retrieved";
//     }
//   }

//   //returns company info listed
//   function getAboutCompanyText(){
//     let aboutElement = document.querySelector("[class*=about]");
//     if (aboutElement){
//       return aboutElement.innerText;
//     } else {
//       return "No about the company retreived";
//     }
//   }


//   function getPageText() {
//      return document.body.innerText;
//    }
