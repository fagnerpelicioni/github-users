// import the requests from api file
import api from '@/api/index';

export default {
  state: {
    users: [],
    user: {
      data: {},
      repos: [],
      starred: [],
    },
  },

  getters: {
    usersGetSearch: state => state.users,
    userGetData: state => state.user.data,
    userGetRepos: state => state.user.repos,
    userGetStarred: state => state.user.starred,
  },

  actions: {
    fetchSearchUsers({ commit }, username) {
      return api.getUsers(username)
        .then((response) => {
          // Call the mutation to fill the state
          commit('USERS_SET_DATA', response.data);
          // Accept the promise and send to View
          return Promise.resolve(response);
        })
        .catch((error) => {
          commit('USER_RESET_DATA');
          // rejects the promise and sends the error to View
          return Promise.reject(error);
        });
    },

    showUser({ commit }, username) {
      return api.getUser(username)
        .then((response) => {
          commit('USER_SET_DATA', response.data);
          return Promise.resolve(response);
        })
        .catch((error) => {
          commit('USER_RESET_DATA');
          return Promise.reject(error);
        });
    },

    showUserRepos({ commit }, username) {
      return api.getUserRepos(username)
        .then((response) => {
          commit('USER_SET_REPOS', response.data);
          return Promise.resolve(response);
        })
        .catch((error) => {
          commit('USER_RESET_DATA');
          return Promise.reject(error);
        });
    },

    showUserStarred({ commit }, username) {
      return api.getUserStarred(username)
        .then((response) => {
          commit('USER_SET_STARRED', response.data);
          return Promise.resolve(response);
        })
        .catch((error) => {
          commit('USER_RESET_DATA');
          return Promise.reject(error);
        });
    },
  },

  mutations: {
    // fill the state
    USER_SET_DATA(state, data) {
      state.user.data = data;
    },

    USER_SET_REPOS(state, data) {
      state.user.repos = data;
    },

    USER_SET_STARRED(state, data) {
      state.user.starred = data;
    },

    USERS_SET_DATA(state, data) {
      state.users = data.items;
    },

    // reset vuex user if the request is not made
    USER_RESET_DATA(state) {
      state.users = [];
      state.user = {};
    },
  },
};
