import { jobApikey, resumeApikey, openAiKey } from './apis.js';

let overallResume = "";
document.addEventListener("DOMContentLoaded", function () {
  const h3 = document.getElementById("additionalExperience");
  const textareaContainer = document.getElementById("textareaContainer");

  h3.addEventListener("click", function () {
    textareaContainer.style.display = textareaContainer.style.display === "none" ? "block" : "none";
    h3.classList.toggle("clicked");
  });

  const url = "https://docwire-doctotext.p.rapidapi.com/extract_text";
  const doc = document.getElementById("resumeFile");
  doc.onchange = async () => {
    const selectedFile = doc.files[0];
    // console.log("Selected file name:", selectedFile.name);
    const data = new FormData();
    data.append("file", selectedFile);
    data.append("filename", selectedFile.name);
    data.append("page", "1");
    const options = {
      method: "POST",
      headers: {
        "X-RapidAPI-Key": resumeApikey,
        "X-RapidAPI-Host": "docwire-doctotext.p.rapidapi.com",
      },
      body: data,
    };
    try {
      const response = await fetch(url, options);
      const result = await response.text();
      overallResume = result
      // console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const optionss = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": jobApikey,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  const boxInput = document.getElementById("box");
  const resumeInput = document.getElementById("resumeFile");
  const submitButton = document.getElementById("generateButton");
  const submitButtonResume = document.getElementById("generateButtonResume");
  // helper function for the empty fields 
  const isEmpty = str => !str || !str.trim().length;

  // enhance check for 1st input field 
  function checkInputs() {
    const boxValue = boxInput.value;
    const resumeValue = resumeInput.files[0];
    const isBoxEmpty = isEmpty(boxValue);
    const isResumeEmpty = !resumeValue || resumeValue.size === 0;
   
    // If both inputs are empty, disable the button
    if (isBoxEmpty && isResumeEmpty) {
      boxInput.classList.add('error');
      resumeInput.classList.add('error');
      submitButton.disabled = true;
      submitButtonResume.disabled = true;
    }
    // If one input has content and the other is empty, disable the button
    else if (isBoxEmpty || isResumeEmpty) {
      boxInput.classList.add('error');
      resumeInput.classList.add('error');
      submitButton.disabled = true;
      submitButtonResume.disabled = true;
    }
    // If both inputs have content, check the file content
    else {
      if (isEmpty(overallResume)){
        resumeInput.classList.add('error');
        boxInput.classList.remove('error');
        submitButton.disabled = true;
        submitButtonResume.disabled = true;
      } 
      else {
        resumeInput.classList.remove('error');
        boxInput.classList.remove('error');
        submitButton.disabled = false;
        submitButtonResume.disabled = false;
      }
    }
    return !isBoxEmpty || !isResumeEmpty;
  }

  function disableOtherButton(button) {
    if (button === submitButton) {
      submitButtonResume.disabled = true;
    } else if (button === submitButtonResume) {
      submitButton.disabled = true;
    }
  }

  submitButton.addEventListener("click", function () {
    disableOtherButton(submitButtonResume);
    const loadingText = document.getElementById("loading");
    if(checkInputs()){
      loadingText.style.display = "block";
      const additionalExperience = document.getElementById("large_box").value;

      let boxValue = boxInput.value;
      const query = encodeURIComponent(boxValue);
  
      const urlQuery = `https://jsearch.p.rapidapi.com/search?query=${query}`;
      fetch(urlQuery, optionss)
        .then((response) => response.json())
        .then(async (response) => {
          console.log(response);
          const jobDescription = response.data[0].job_description;
          const qualifications = response.data[0].job_highlights.Qualifications;
          const responsibilities = response.data[0].job_highlights.Responsibilities;
        
  
          const response2 = await generateCoverLetter(jobDescription, qualifications, responsibilities, overallResume, additionalExperience)
          const content = response2.choices[0].message.content;
          loadingText.style.display = "none";
          await generateAndDownloadPDF(content);
        })
        .catch((err) => console.error(err));
      
    } else {
      alert('Please fill in the fields');
      return;
    }
    
  });

  submitButtonResume.addEventListener("click", function () {
    disableOtherButton(submitButton);
    const loadingText = document.getElementById("loading");
    if(checkInputs()){
      loadingText.style.display = "block";
      const additionalExperience = document.getElementById("large_box").value;

      let boxValue = boxInput.value;
      const query = encodeURIComponent(boxValue);
  
      const urlQuery = `https://jsearch.p.rapidapi.com/search?query=${query}`;
      fetch(urlQuery, optionss)
        .then((response) => response.json())
        .then(async (response) => {
          console.log(response);
          const jobDescription = response.data[0].job_description;
          const qualifications = response.data[0].job_highlights.Qualifications;
          const responsibilities = response.data[0].job_highlights.Responsibilities;
        
  
          const response2 = await generateTailoredResume(jobDescription, qualifications, responsibilities, overallResume, additionalExperience)
          const content = response2.choices[0].message.content;
          loadingText.style.display = "none";
          await generateAndDownloadPDF(content);
        })
        .catch((err) => console.error(err));
      
    } else {
      alert('Please fill in the fields');
      return;
    }
  });
});

//Working
async function generateAndDownloadPDF(content) {
  const newWindow = window.open("", "", "width=600,height=600");
  const cssStyle = `
    <style>
      pre {
        font-family: 'Times New Roman', Times, serif;
        white-space: pre-wrap;
      }
    </style>
  `;
  newWindow.document.write(`${cssStyle}<pre>${content}</pre>`);
  newWindow.document.close();
  await new Promise((resolve) => {
    newWindow.onload = () => {
      newWindow.print();
      resolve();
    };
  });
  newWindow.close();
}

//generates but old doc format
async function generateAndDownloadWordDoc(content, fileName) {
  const blob = new Blob([content], { type: "application/msword" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  await new Promise((resolve) => setTimeout(resolve, 100));
  URL.revokeObjectURL(url);
  a.remove();
}


//generates it but bad file
function saveAsDocx(content, filename) {
  const blob = new Blob([content], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}


async function generateCoverLetter(jobDescription, qualifications, responsibilities, overallResume, additionalExperience) {

  const details = "Create a tailored cover letter that highlights the most relevant skills and experiences from this job description and resume. It should not be more than 500 words";
  const prompt = details + "Job description is " + jobDescription + "Qualification needed are " + qualifications + " responsibilities are " + responsibilities + " my resume is " + overallResume + ". Other things to inlude are:  " + additionalExperience;

  const requestBody = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  };
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${openAiKey}`,
    },
    body: JSON.stringify(requestBody),
  });

  return response.json();
}

async function generateTailoredResume(jobDescription, qualifications, responsibilities, overallResume, additionalExperience) {

  const details = "Create a tailored resume that precisely matches the job description and my existing resume.I need you to generate a highly effective resume that highlights my skills, experiences, and qualifications, perfectly aligning with the job requirements mentioned in the provided job description. It should emphasize my suitability for the role and how my background makes me an ideal candidate. The resume should ideally address the key points in the job description.I want the resume to be meticulously tailored to stand out to potential employers. It should not only include the details from my current resume but also be optimized to match the language and terminology used in the job description, reflecting my genuine enthusiasm for the role. Feel free to incorporate the additional experience I provided to enhance the resume further. The resulting resume should demonstrate my potential value to the company and my strong alignment with the job requirements, making it a compelling document that increases my chances of securing an interview. Please generate the best possible resume that makes a powerful impression and resonates with the hiring team. Thank you.";
  const prompt = details + "Job description is " + jobDescription  + " my resume is " + overallResume + ". Other things to inlude are:  " + additionalExperience;

  const requestBody = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  };
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${openAiKey}`,
    },
    body: JSON.stringify(requestBody),
  });

  return response.json();
}

document.addEventListener("DOMContentLoaded", function() {
  let closeButton = document.getElementById("close");

  closeButton.addEventListener("click", function() {
    chrome.extension.getViews({ type: "popup" })[0].close();
  });

});
