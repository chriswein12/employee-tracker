const inquirer = require ('inquirer');
const con = require('./db/connection')
const cTable = require('console.table');
// const db = require('./db');

const init = () => {
    console.log('Welcome to the Employee Tracker application.')

    openingPrompt();
};

const openingPrompt = () => {
    inquirer.prompt({
        type: "list",
        name: "openingChoices",
        message: "What would you like to do?",
        choices: [
            "View all departments.",
            "View all roles.",
            "View all employees.",
            "Add a department.",
            "Add a role.",
            "Add an employee.",
            "Update an employee's role."
        ]
    })
    .then(response => {
        switch (response.openingChoices) {
            case "View all departments.":
                viewDepartments();
                break;
            case "View all roles":
                viewRoles();
                break;
            case "View all employees.":
                viewEmployees();
                break;
            case "Add a department.":
                addDepartment();
                break;
            case "Add a role.":
                addRole();
                break;
            case "Add an employee.":
                addEmployee();
                break;
            case "Update an employee's role.":
                updateRole();
                break;
        }
    })
};

viewDepartments = () => {
    con.promise().query("SELECT * FROM department;")
    .then(([response]) => {
        console.table(response);

        openingPrompt();
    })
    .catch(err => {
        console.log(err);
      });
};

viewRoles = () => {

};

viewEmployees = () => {

};

addDepartment = () => {

};

addRole = () => {

};

addEmployee = () => {

};

updateRole = () => {

};


init();