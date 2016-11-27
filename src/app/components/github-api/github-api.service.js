export class GithubApiService {
  constructor($http) {
    'ngInject';

    this.$http = $http;
    this.apiHost = 'https://api.github.com';

    // TODO: add OAuth and generate token for api calls
    this.clientId = 'f6c41075ef7c3fcd88de';
    this.clientSecret = 'f9a95c162d88623e4c1ab71047bf8256550d45bc';
  }

  /**
   * get array of predictions from github
   */
  getUsersByQuery(query) {
    return this.$http
      .get(`${this.apiHost}/search/users`, {
        params: {
          q: query,
          client_id: this.clientId,
          client_secret: this.clientSecret
        }
      })
      .then(res => {
        return res.data.items;
      });
  }

  /**
   * Get full information about user id.
   * If there are not user with id, it is received 404 error. 
   */
  getUserById(userId) {
    return this.$http
      .get(`${this.apiHost}/users/${userId}`, {
        params: {
          client_id: this.clientId,
          client_secret: this.clientSecret
        }
      })
      .then(res => {
        return res.data;
      })
      .catch(() => {
        // TODO: handle error, if there are not user with id.
        return {};
      });
  }
}
