const inquirer = require ('inquirer');
const cTable = require('console.table');
const db = require('./db')

init = () => {
    console.log('Welcome to the Employee Tracker application.')

    openingPrompt();
}

openingPrompt = () => {
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
}


init();