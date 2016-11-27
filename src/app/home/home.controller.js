export class HomeController {
  constructor($q, $timeout, githubApi, $window) {
    'ngInject';
    this.$q = $q;
    this.$timeout = $timeout;
    this.githubApi = githubApi;
    this.$window = $window;

    this.filterSelected = true;
    this.cancelSearch = angular.noop;
    this.asyncProfiles = [];
    this.textareaField = '';
    this.selectedTab = 0;

    this.searchResults = [];
  }

  /**
   * Get and filter users.
   */
  querySearch(query) {
    return this.githubApi.getUsersByQuery(query).then(users => {
      return users.filter(this.filterUsers.bind(this));
    });
  }

  /**
   * Query with debounce.
   */
  delayedQuerySearch(query) {
    this.cachedQuery = query;
    if (!this.pendingSearch || !this.debounceSearch()) {
      this.cancelSearch();

      return this.pendingSearch = this.$q((resolve, reject) => {
        this.cancelSearch = reject;

        this.querySearch(query).then((res) => {
          resolve(res);
          this.refreshDebounce();
        });
      });
    }

    return this.pendingSearch;
  }

  refreshDebounce() {
    this.lastSearch = 0;
    this.pendingSearch = null;
    this.cancelSearch = angular.noop;
  }

  /**
   * Debounce if querying faster than 300ms.
   */
  debounceSearch() {
    let now = new Date().getMilliseconds();
    this.lastSearch = this.lastSearch || now;

    return ((now - this.lastSearch) < 300);
  }

  /**
   * Filter, for display uniq users.
   */
  filterUsers(user) {
    for (let i = 0; i < this.asyncProfiles.length; ++i) {
      if (this.asyncProfiles[i].id === user.id) {
        return false;
      }
    }
    return true;
  }

  /**
   * Get list of github users and sort them by followers.
   */
  getUsers() {
    let userIds = [];
    // First of all, we need to make similar format for our cases
    if (this.selectedTab === 0) {
      userIds = this.getIdsFromChips(this.asyncProfiles);
    }

    if (this.selectedTab === 1) {
      userIds = this.getIdsFromText(this.textareaField);
    }

    let promises = [];
    for(var i in userIds) {
        promises.push(this.githubApi.getUserById(userIds[i]));
    }

    this.$q.all(promises).then(users => {
        this.searchResults = users.filter(el => el.login);
    });
  }

  /**
   * Open profile link in a new tab.
   */
  goToPerson(person) {
    this.$window.open(person.html_url, '_blank');
  }

  getIdsFromChips(arr) {
    return arr.map(el => el.login);
  }

  getIdsFromText(text) {
    if(!text.length) return [];
    return text.split('\n') || []; 
  }
}
