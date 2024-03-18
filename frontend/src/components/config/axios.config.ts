import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:1337/api',
    timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
  });

   