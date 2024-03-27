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
          console.log(credentials)
          // Call AuthService to authenticate the user
          const user = await AuthService.login(credentials);
          // Upon successful authentication, commit the setUser mutation
          commit('setUser', user);
          console.log(user)
        } catch (error) {
          // Handle authentication errors
          console.error('Login failed:', error);
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
        return state.user !== null;
      },
      currentUser(state) {
        // Return the current user
        return state.user;
      }
    }
  };
  