# Github Followers

This project was created as a example of using GitHub api.

## Required environment
- Node (6+) with npm(3+)
- Bower
- Gulp

## Development server
Run `gulp serve` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

## Build

Run `gulp build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `gulp test` to execute the unit tests via . It uses [Karma](https://karma-runner.github.io) (with `gulp test`) for the unit tests, and Protractor for the end-to-end tests (with `gulp protractor`).

## Running end-to-end tests

Run `gulp protractor` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `gulp serve`.
