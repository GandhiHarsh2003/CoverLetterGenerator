// require('dotenv').config();
// const express = require('express');
// const { Configuration, OpenAIApi } = require('openai');

// const app = express();
// app.use(express.json());

// const configuration = new Configuration({
//     apiKey: process.env.API_KEY,
// });

// const openai = new OpenAIApi(configuration);

// app.post('/api/chat', async (req, res) => {
//     const prompt = req.body.prompt;
//     try {
//         const response = await openai.createChatCompletion({
//             model: "gpt-3.5-turbo",
//             messages: [{ role: "user", content: prompt }],
//         });

//         res.json(response.data);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'An error occurred while processing your request.' });
//     }
// });

document.addEventListener("DOMContentLoaded", function() {
    var closeButton = document.getElementById("close");
  
    closeButton.addEventListener("click", function() {
      chrome.extension.getViews({ type: "popup" })[0].close();
    });
  });
