// Import Axios for making HTTP requests
import axios from 'axios'

const API_URL = 'http://localhost:3000'; // Replace this with your backend API URL

const AuthService = {
  async login(credentials) {
    try {
      // const email = credentials.email
      // const password = credentials.password
      // Make a POST request to your backend API to authenticate the user
      const response = await axios.post(`${API_URL}/auth/login`, credentials, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })

      // Check if the login was successful
      if (response.status === 200) {
        console.log(response.data)
        return response.data; // Return the user data
      } else {
        // Handle login error (e.g., incorrect credentials)
        throw new Error('Login failed: Incorrect credentials');
      }
    } catch (error) {
      // Handle other errors (e.g., network error)
      console.error('Login failed:', error);
      throw error;
    }
  },
  // Add other authentication methods (e.g., logout) here
};

export default AuthService;
