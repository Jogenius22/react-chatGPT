require("dotenv").config();

const express = require("express");
const app = express();
const port = 4000;

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

// adding body-parser and cors
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

// app.post("/", async (req, res) => {
//   const { message } = req.body;
//   const response = await openai.createCompletion({
//     model: "text-davinci-003",
//     prompt: message,
//     max_tokens: 3000,
//     temperature: 0.3,
//   });
//   res.json({ botResponse: response.data.choices[0].text });
// });

const chatBot = async (message) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful AI assistant"
      },
      { role: "user", content: message }
    ]
  });
  return response["data"]["choices"][0]["message"]["content"];
  console.log(response)
};

app.post("/", async (req, res) => {
  const { message } = req.body;
  const botResponse = await chatBot(message);
  res.json({ botResponse });
});

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello!'
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
