import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { HomeController } from './home/home.controller';
import { GithubApiService } from '../app/components/github-api/github-api.service';

angular.module('githubFollowers', ['ui.router', 'ngMaterial'])
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('githubApi', GithubApiService)
  .controller('HomeController', HomeController)
