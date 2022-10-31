# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Packages to Install
npm install -g json-server \
> This package will allow for a json backend db

### Scripts to Run

In the project directory, you can run:

### 1) `json-server db.json`

Trigger Rest API to run 
Open [http://localhost:3000](http://localhost:3000) to view database in your browser.

### 2) `npm start`

Make sure you are using a seperate terminal for this step
Runs the app in the development mode.\
Select 'Y' to run on different port than JSON Database.\
Open [http://localhost:3001](http://localhost:3001) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.



### Project Description / User Stories


Manage Toppings


As a pizza store owner I should be able to manage toppings available for my pizza chefs.• It should allow me to see a list of available toppings
• It should allow me to add a new topping
• It should allow me to delete an existing topping
• It should allow me to update an existing topping
• It should not allow me to enter duplicate toppings

 
Manage Pizzas

 
As a pizza chef I should be able to create new pizza master pieces• It should allow me to see a list of existing pizzas and their toppings
• It should allow me to create a new pizza and add toppings to it
• It should allow me to delete an existing pizza
• It should allow me to update an existing pizza
• It should allow me to update toppings on an existing pizza
• It should not allow me to enter duplicate pizzas


Additionally

A pizza chef has a limit of 10 pizzas being created at a time
A pizza store owner has a limit of 20 toppings on their menu