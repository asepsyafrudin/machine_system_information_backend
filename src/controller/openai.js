import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const postOpenai = async (req, res) => {
  try {
    const prompt = req.body.prompt;
    // const response = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: prompt,
    //   temperature: 0.7,
    //   max_tokens: 3000,
    //   top_p: 1,
    //   frequency_penalty: 0,
    //   presence_penalty: 0,
    // });

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    

    res.status(200).json({
      msg: "succees to get answere from openapi",
      bot: response.data.choices[0].message.content,
    });
  } catch (error) {
    res.status(400).json({
      msg: "gagal",
      errMsg: error,
    });
  }
};
