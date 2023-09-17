import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { openai } from "../index.js";

dotenv.config();
const router = express.Router();

router.post("/text", async (req, res) => {
  try {
    const { text, activeChatId } = req.body;
    console.log("text:", text)
    console.log("active chatId:", activeChatId)

    // const response = await openai.createChatCompletion({
    //   model: "gpt-3.5-turbo",
    //   messages: [
    //     { role: "system", content: "You are a helpful assistant." }, // this represents the bot and what role they will assume
    //     { role: "user", content: text }, // the message that the user sends
    //   ],
    // });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." }, // this represents the bot and what role they will assume
        { role: "user", content: text }, // the message that the user sends
      ],
    })

    console.log("Response Data: ",response)
    console.log("GPT message: ",response.choices[0].message)

    await axios.post(
      `https://api.chatengine.io/chats/${activeChatId}/messages/`,
      { text: response.choices[0].message.content },
      {
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": process.env.BOT_USER_NAME,
          "User-Secret": process.env.BOT_USER_SECRET,
        },
      }
    );

    res.status(200).json({ text: response.choices[0].message.content });
    // res.status(200).json({ text });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;