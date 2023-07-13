document.addEventListener("DOMContentLoaded", function() {
    var closeButton = document.getElementById("close");
  
    closeButton.addEventListener("click", function() {
      chrome.extension.getViews({ type: "popup" })[0].close();
    });
  });