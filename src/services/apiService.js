import axios from "axios";

const api = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api/",
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("USER_ADMIN")
    ? JSON.parse(localStorage.getItem("USER_ADMIN")).accessToken
    : "";

  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${accessToken}`,
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4MiIsIkhldEhhblN0cmluZyI6IjIwLzExLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc2MzU5NjgwMDAwMCIsIm5iZiI6MTczNDI4NTYwMCwiZXhwIjoxNzYzNzQ4MDAwfQ.QbEZveH7dLuVnfzAyNgNtcIQzJu-95ShhXNZhmFB-H8",
  };
  return config;
});

export default api;
