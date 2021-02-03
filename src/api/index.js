import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `Basic ${process.env.VUE_APP_TOKEN}`,
    common: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
});

export default {
  getUsers(username) {
    return api({
      url: '/search/users',
      method: 'get',
      params: {
        // eslint-disable-next-line prefer-template
        q: username + 'in:user',
        per_page: 100,
        sort: 'followers',
      },
    });
  },

  getUser(username) {
    return api({
      url: `/users/${username}`,
      method: 'get',
    });
  },

  getUserRepos(username) {
    return api({
      url: `/users/${username}/repos`,
      method: 'get',
    });
  },

  getUserStarred(username) {
    return api({
      url: `/users/${username}/starred`,
      method: 'get',
    });
  },
};
