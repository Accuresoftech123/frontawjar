import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000';
const getInterceptor = (baseURL) => {
  const API = axios.create({
    baseURL,
  });

  API.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      console.log(token);
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        // window.location.href = '/login'; // optional redirect
      }
      return Promise.reject(error);
    }
  );

  return API;
};

const API = getInterceptor(baseURL);

// ✅ Export both API
export { API, baseURL };
