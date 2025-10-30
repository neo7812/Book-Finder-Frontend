import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000/api";

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});