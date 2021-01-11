const inquirer = require ('inquirer');
const con = require('./db/connection')
const cTable = require('console.table');
const { response } = require('express');
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
            "Update an employee's role.",
            "Quit"
        ]
    })
    .then(response => {
        switch (response.openingChoices) {
            case "View all departments.":
                viewDepartments();
                break;
            case "View all roles.":
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
            case "Quit":
                quit();
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
    const sql = `SELECT role.*, department.name
    AS department_name
    FROM role
    LEFT JOIN department
    ON role.department_id = department.id;`
    
    con.promise().query(sql)
    .then(([response]) => {
        console.table(response);

        openingPrompt();
    });
};

viewEmployees = () => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT (manager.first_name, ' ', manager.last_name) AS manager 
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON manager.id = employee.manager_id;`

    con.promise().query(sql)
    .then(([response]) => {
        console.table(response);

        openingPrompt();
    });

};

addDepartment = () => {

};

addRole = () => {

};

addEmployee = () => {

};

updateRole = () => {

};

quit = () => {

};


init();