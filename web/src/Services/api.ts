import axios from "axios";

export const api = axios.create({
  baseURL: "https://react-esports.vercel.app/",
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  },
})
