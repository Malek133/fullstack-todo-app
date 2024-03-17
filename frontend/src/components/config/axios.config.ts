import axios from "axios";

 const axiosTnstance = axios.create({
    baseURL: 'http://localhost:1337/api',
    timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
  });

  export default axiosTnstance