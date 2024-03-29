import { useState } from "react";
import axios from "axios";
import { server } from "../constants/serverURL";
import { OPENAI_KEY } from "@env";

const endpoint =
  "https://api.openai.com/v1/engines/text-davinci-003/completions";

export const generateText = async (prompt) => {
  console.log("====================================");
  console.log(OPENAI_KEY);
  console.log("====================================");
  let data = null;
  let error = null;
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
          Authorization: `Bearer ${OPENAI_KEY}`,
        },
      }
    );
    const generatedText = response.data.choices[0].text;
    console.log(generatedText, "reply");
    data = response.data.choices[0].text;
  } catch (err) {
    error = err;
    console.log(error);
  }
  return { data, error };
};

export const copyleakLogin = async (form) => {
  let data = null;
  let error = null;

  try {
    const response = await axios.get(`${server}copyleaks/login`, form);
    data = response.data.data;
    console.log("====================================");
    console.log(data);
    console.log("====================================");
  } catch (err) {
    console.log("====================================");
    console.log(err);
    console.log("====================================");
    error = err;
  }
  return { data, error };
};

export const copyleakSubmitFile = async (payload) => {
  let data = null;
  let error = null;

  try {
    const response = await axios.post(`${server}copyleaks/submit`, payload);
    data = response.data.data;
    console.log("====================================");
    console.log(data);
    console.log("====================================");
  } catch (err) {
    console.log("====================================");
    console.log(err);
    console.log("====================================");
    error = err;
  }
  return { data, error };
};

export const copyleakStartScan = async (payload) => {
  let data = null;
  let error = null;

  try {
    const response = await axios.post(`${server}copyleaks/scan`, payload);
    data = response.data.data;
    console.log("====================================");
    console.log(data);
    console.log("====================================");
  } catch (err) {
    console.log("====================================");
    console.log(err);
    console.log("====================================");
    error = err;
  }
  return { data, error };
};

export const getScanResultById = async (id) => {
  let data = null;
  let error = null;

  try {
    const response = await axios.get(`${server}copyleaks/scan?id=${id}`);
    data = response.data.data;
    console.log("====================================");
    console.log(data);
    console.log("====================================");
  } catch (err) {
    console.log("====================================");
    console.log(err);
    console.log("====================================");
    error = err;
  }
  return { data, error };
};
