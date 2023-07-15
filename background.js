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
        var activeTab = tabs[0];
        var url = activeTab.url;
        console.log(url);
      }
    });
  }
  
  chrome.tabs.onActivated.addListener(function(activeInfo) {
    getActiveTabUrl();
  });
  
  getActiveTabUrl();
  
 // To get the text on the page
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabId },
          function: getJobText,
        },
        function(result) {
          if (result && result.length > 0) {
            var pageText = result[0].result;
            console.log("Job description: "+ pageText);
          }
        }
      );
    }
  });
  
  // chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  //   if (changeInfo.status === 'complete') {
  //     chrome.scripting.executeScript(
  //       {
  //         target: { tabId: tabId },
  //         function: function() {
  //           var jobText = getJobText();
  //           var skillsText = getSkillsText();
  //           var aboutText = getAboutCompanyText();
  //           return { jobText, skillsText, aboutText };
  //         },
  //       },
  //       function(result) {
  //         if (result && result.length > 0) {
  //           var { jobText, skillsText, aboutText } = result[0].result;
  //           console.log("Job description: " + jobText);
  //           console.log("Skills: " + skillsText);
  //           console.log("About the company: " + aboutText);
     
  //       }
  //   });
  //   }
  // });
  

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
  
  