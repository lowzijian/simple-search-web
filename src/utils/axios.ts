import axios, { AxiosInstance } from "axios";

const client: AxiosInstance = axios.create({
  baseURL: "https://fetest.mashx.click/api/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
