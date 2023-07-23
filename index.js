import apiKey from './keys.js';

document.addEventListener("DOMContentLoaded", function() {
  const closeButton = document.getElementById("close");
  closeButton.addEventListener("click", function() {
    chrome.extension.getViews({ type: "popup" })[0].close();
  });

  const url = 'https://docwire-doctotext.p.rapidapi.com/extract_text';
  const doc = document.getElementById('resumeFile');
  doc.onchange = async () => {
    const selectedFile = doc.files[0];
    console.log("Selected file name:", selectedFile.name);
    const data = new FormData();
    data.append('file', selectedFile);
    data.append('filename', selectedFile.name);
    data.append('page', '1');
    const options = {
      method: 'POST',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'docwire-doctotext.p.rapidapi.com'
      },
      body: data
    };
    try {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
    //generate cover letter on click. 
});
