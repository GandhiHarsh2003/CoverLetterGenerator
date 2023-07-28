import { APIKEY, apikey, openAiKey } from './apis.js';
const officegen = require('officegen');
const fs = require('fs');
const docx = officegen('docx');

let overallResume = "";
document.addEventListener("DOMContentLoaded", function () {
  const url = "https://docwire-doctotext.p.rapidapi.com/extract_text";
  const doc = document.getElementById("resumeFile");
  doc.onchange = async () => {
    const selectedFile = doc.files[0];
    console.log("Selected file name:", selectedFile.name);
    const data = new FormData();
    data.append("file", selectedFile);
    data.append("filename", selectedFile.name);
    data.append("page", "1");
    const options = {
      method: "POST",
      headers: {
        "X-RapidAPI-Key": apikey,
        "X-RapidAPI-Host": "docwire-doctotext.p.rapidapi.com",
      },
      body: data,
    };
    try {
      const response = await fetch(url, options);
      const result = await response.text();
      overallResume = result
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const optionss = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": APIKEY,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  const submitButton = document.getElementById("submit");
  submitButton.addEventListener("click", function () {
    const loadingText = document.getElementById("loading");
    loadingText.style.display = "block";
    const additionalExperience = document.getElementById("large_box").value;

    let value = document.getElementById("box").value;
    console.log("value: " + value);

    const query = encodeURIComponent(value);
    console.log("Encoded query:", query);
    const urlQuery = `https://jsearch.p.rapidapi.com/search?query=${query}`;
    fetch(urlQuery, optionss)
      .then((response) => response.json())
      .then(async (response) => {
        console.log(response);
        const jobDescription = response.data[0].job_description;
        const qualifications = response.data[0].job_highlights.Qualifications;
        const responsibilities = response.data[0].job_highlights.Responsibilities;
        console.log(jobDescription);
        console.log(qualifications);
        console.log(responsibilities);

        const response2 = await generateCoverLetter(jobDescription, qualifications, responsibilities, overallResume, additionalExperience)
        const content = response2.choices[0].message.content;
        console.log(content)
        loadingText.style.display = "none";
        await test(content);
      })
      .catch((err) => console.error(err));
  });
});

async function test(content){
  const p = docx.createP();
  p.addText(content);
  const out = fs.createWriteStream("CoverLetter.docx");
  docx.generate(out);
}


//generates but old doc format
async function generateAndDownloadWordDoc(content, fileName) {
  const blob = new Blob([content], { type: "application/msword" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName; // Set the desired filename for the download
  a.click();
  await new Promise((resolve) => setTimeout(resolve, 100));
  URL.revokeObjectURL(url);
  a.remove();
}

async function generateAndDownloadPDF(content) {
  const newWindow = window.open("", "", "width=600,height=600");
  const cssStyle = `
    <style>
      pre {
        font-family: 'Times New Roman', Times, serif; /* Set the font-family to Times New Roman */
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


//generates it but bad file
async function generateDocxFile(content, filename) {
  const sanitizedContent = content.replace(/\n/g, "<w:br/>");
  const docxContent = `
    <?xml version="1.0" encoding="UTF-8"?>
    <w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
      <w:body>
        <w:p>
          <w:r>
            <w:t>${sanitizedContent}</w:t>
          </w:r>
        </w:p>
      </w:body>
    </w:document>`;
  const blob = await (await fetch(URL.createObjectURL(new Blob([docxContent], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  })))).blob();

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}


async function generateCoverLetter(jobDescription, qualifications, responsibilities, overallResume, additionalExperience) {

  const details = "Create a tailored cover letter that highlights the most relevant skills and experiences from this job description and resume. It should not be more than 500 words";
  const prompt = details + "Job description is " + jobDescription + "Qualification needed are " + qualifications + " responsibilities are " + responsibilities + " my resume is " + overallResume + ". Other things to include are:  " + additionalExperience;

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