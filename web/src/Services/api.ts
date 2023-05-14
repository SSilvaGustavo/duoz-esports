import axios from "axios";

export const api = axios.create({
  baseURL: "https://react-esports.vercel.app",
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': "true",
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  },
})
