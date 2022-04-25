# Welcome to NewsPortal!

This repository contains a simple web app that display some of the worlds famous news. Created with Vue, vuex, vue-router, vuetify and love.

# Setup
The setup is quite simple to run clone the code and run `yarn` all the necessary modules will be installed. You just need to add a `.env`  file and copy the variable name from `.env.development` and paste an api that you can obtain from [NewsApi](https://newsapi.org/).

# Structure

The folder structure of the app is quite simple, our app runs from `main.js` and `App.vue` is the first Vue component to render.

- src  - the source folder containing all the code
	- components - independent components that can be reused
	- plugins - plugins to enhance our app
	- router - contains router instance and route list
	- store - store management instance and api logics
	- utils - api list and other helper function 
	- views - the main pages that is connected with routes