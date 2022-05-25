import axios from "axios";

export const httpClient = axios.create({
  baseURL: "http://localhost:9000/api/v1",
  headers: {
    "Content-type": "application/json",
  },
});

export const commentClient = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
});