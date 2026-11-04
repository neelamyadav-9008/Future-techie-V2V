import axios from "axios";

const API = axios.create({
  baseURL: "https://future-techie-v2v.onrender.com/api",
});

export default API;