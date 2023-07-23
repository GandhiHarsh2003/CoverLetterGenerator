import apiKey from './keys.js';
import APIKEY from './apiKey.js';
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

  const optionss = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': APIKEY,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    }
  };
  

  
  const submitButton = document.getElementById('submit');
  submitButton.addEventListener("click", function() {
    let value = document.getElementById('box').value;
    console.log("value: " + value);

    const query = encodeURIComponent(value);
    console.log("Encoded query:", query);
    const urlQuery = `https://jsearch.p.rapidapi.com/search?query=${query}`;
    fetch(urlQuery, optionss)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        const jobDescription = response.data[0].job_description;
        const qualifications = response.data[0].job_highlights.Qualifications;
        const responsibilities = response.data[0].job_highlights.Responsibilities;
        console.log(jobDescription);
        console.log(qualifications);
        console.log(responsibilities);
      })
      .catch(err => console.error(err));
  });


     //generate cover letter on click. 
});
   

  
  
  
