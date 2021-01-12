# Employee Tracker

## Description of the Application
This is a node.js program designed to build manage a team of employees using command line prompts.

<br/>

## Installation
To install necessary dependencies, run the following commands:

```
npm install dotenv
```
```
npm install inquirer
```
```
npm install --save mysql2
```
```
npm install console.table --save
```

## How it Works
* The user will start the program with the following command:
    ```
    npm start
    ```
* The user will then be given a list of options to choose from.
  - View all departments.
  - View all roles.
  - View all employees.
  - Add a department.
  - Add a role.
  - Add an employee.
  - Update an employee's role.
  - Quit
* Selecting any of the "View" options will produce a table with the requested data
* Selecting any of the "Add" options will give the user additional prompts to add that information to the database.
* Selecting the "Update" option allows the manipulation of the employee's role in the database.
* Quit will end the session and close the program in the command line.

<br/>

## Additional App Features
* Checks in place to make sure that information is entered for each prompt to avoid having blank fields.
  
<br/>

## Link to GitHub Repository
https://github.com/chriswein12/employee-tracker

<br/>

## How the application works
Click on the following image for a walkthrough video on Youtube.

[![Link to Walkthrough Video](http://img.youtube.com/vi/rPZ1-oBL7oQ/0.jpg)](https://youtu.be/rPZ1-oBL7oQ "Employee Tracker with Node.js")

<br/>

## Credits

*Project completed by Chris Wein*