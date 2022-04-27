<h1 align="center">Welcome to NewsPortal!</h1>
This repository contains a simple web app that display news from different sources. Created with Vue, vuex, vue-router, vuetify and love.

# Setup
The setup is quite simple, clone the code with `git clone https://github.com/haweecodes/newsPortal.git` . Make sure you have the latest node environment. I use yarn so to install the dependencies simply type `yarn` and the necessary modules will be installed, to run using `npm` use `npm install`. After the dependencies are downloaded create an `.env.development` file and input `VUE_APP_NEWSAPI_API_KEY` and paste an API that you can obtain from [NewsApi](https://newsapi.org/).

# Structure
The folder structure of the app is quite simple, the entry point of our application starts from `main.js` and renders`App.vue` as its entry to the UI. Below all the folders are named with its intentional usage.
- src - the source folder containing all the code

- components - independent components that can be reused

- plugins - plugins to enhance our app

- router - contains router instance and route list

- store - store management instance and api logics

- utils - api list and other helper function

- views - the main pages that is connected with routes

# Run unit test
The tests were written in jest and @vue/test-utils. The tests can be found in the test folder in root. To run the tests simply run this command `yarn test:unit`