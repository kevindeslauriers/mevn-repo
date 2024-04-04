// store/user.js
import AuthService from '@/services/AuthService'; // Assuming AuthService is imported and available

export default {
    state: {
      user: null // Initial user state
    },
    mutations: {
      setUser(state, user) {
        state.user = user;
        state.isLoggedIn = true;

      },
      clearUser(state) {
        state.user = null;
      }
    },
    actions: {
      async loginUser({ commit }, credentials) {
        try {
          // Call AuthService to authenticate the user
          const resp = await AuthService.login(credentials);
          const token = resp.token;
          // Decode the token to extract user information
          const user = AuthService.decodeToken(token);
          
          // Upon successful authentication, commit the setUser mutation
          commit('setUser', user);
          
          // Optionally, you can also store the token in local storage or a cookie
          localStorage.setItem('token', token);
      
          console.log('User logged in:', user.email);
        } catch (error) {
          // Handle authentication errors
          console.error('Failed to log in:', error);
          throw error;
        }
      },
      logoutUser({ commit }) {
        // Commit the clearUser mutation to clear the user state
        commit('clearUser');
      }
    },
    getters: {
      isLoggedIn(state) {
        // Check if a user is logged in based on the user state
        console.log(state.user !== null)
        return state.user !== null;
      },
      currentUser(state) {
        // Return the current user
        return state.user;
      }
    }
  };
  