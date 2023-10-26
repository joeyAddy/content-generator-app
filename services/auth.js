import axios from "axios";
import { server } from "../constants/serverURL";

const signInEndpoint = server + "signin";

export const login = async (form) => {
  let data = null;
  let error = null;

  try {
    const response = await axios.post(signInEndpoint, form);
    data = response.data.data;
  } catch (err) {
    error = err;
  }
  return { data, error };
};

export const register = async (form) => {
  let data = null;
  let error = null;

  try {
    const response = await axios.post(signInEndpoint, form);
    data = response.data.data;
  } catch (err) {
    error = err;
  }
  return { data, error };
};
