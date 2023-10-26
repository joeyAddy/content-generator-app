import { useState } from "react";
import axios from "axios";
import { server } from "../constants/serverURL";

const apiKey = "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";
// const endpoint = server + "chatgpt";
const endpoint =
  "https://api.openai.com/v1/engines/text-davinci-003/completions";


  export const generateText = async (prompt) => {
    let data = null
    let error = null
    try {
      const response = await axios.post(
        endpoint,
        {
          prompt: prompt,
          max_tokens: 1024,
          temperature: 0.5,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      const generatedText = response.data.choices[0].text;
      console.log(generatedText, "reply");
      data = response.data.choices[0].text
    } catch (err) {
      error=err;
      console.log(error);
    }
    return{data, error}
  };


// Usage example:
// const { loading, data, error, generateText } = useGenerateText();
// useEffect(() => {
//   generateText("Write a blog post about React Native");
// }, []);
