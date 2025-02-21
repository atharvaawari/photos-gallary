import axios from "axios";

 class AuthServices {

  // constructor() {
  //   this.api = axios.create({
  //     baseURL: 'http://your-api-url.com/api', // Replace with your API base URL
  //     withCredentials: true, // Required for cookies, if using sessions
  //   });
  // }

  async register(userData) {
   try {
    const response = await axios.post('/api/users/register', userData);
    return response.data;
   } catch (error) {
    console.error("error in register auth service");
    throw error.response ? error.response.data : error;
   }
      
  }

  async login(userData) {
    try {
      const response = await axios.post('/api/users/login', userData);
      return response.data;  
    } catch (error) {
      console.error("error in login auth service");
    throw error.response ? error.response.data : error;
    }
  }

  async getCurrentUser() {
    try {
    const response = await axios.get('/api/users/current-user')
    return response.data;
    } catch (error) {
      console.log("error while get current user",error)
      throw error.response ? error.response.data : error;
    }  
  }

  async logout() {
    await axios.post('/api/users/logout')
      .then((response) => response.data)
      .catch((error) => console.log("error while logout", error))
  }
}


const authSevices = new AuthServices();

export default authSevices;