import axios from "axios";
import { server } from "../constants/serverURL";

export const login = async (form) => {
  let data = null;
  let error = null;

  try {
    const response = await axios.post(`${server}user/signin`, form);
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

export const register = async (form) => {
  let data = null;
  let error = null;

  try {
    const response = await axios.post(`${server}user/signup`, form);
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
