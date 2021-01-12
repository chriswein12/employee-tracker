const inquirer = require('inquirer');
const con = require('./db/connection')
const cTable = require('console.table');

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
            console.log(response);

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
        })
        .catch(err => {
            console.log(err);
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
        })
        .catch(err => {
            console.log(err);
        });

};

addDepartment = () => {

    inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Please enter the new department name.'
    })
        .then(response => {
            let deptName = response;
            console.log(deptName)

            const sql = `INSERT INTO department SET ?`

            con.promise().query(sql, deptName)
                .then(console.log(`Department ${deptName} has been added.`))
                .catch(err => {
                    console.log(err);
                });

            openingPrompt();
        });
};

addRole = () => {

    con.promise().query("SELECT * FROM department;")
        .then(([response]) => {
            let departments = response;

            const deptChoices = departments.map(department => {
                return {
                    name: department.name,
                    value: department.id
                }
            });

            inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: "Please enter the new role's name."
                },
                {
                    type: 'number',
                    name: 'salary',
                    message: "Please enter the new role's salary."
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: "Please choose the department this role belongs to.",
                    choices: deptChoices
                }
            ])
                .then(response => {
                    let newRole = response;
                    console.log(newRole)

                    const sql = `INSERT INTO role SET ?`

                    con.promise().query(sql, newRole)
                        .then(console.log(`New role has been added.`))
                        .catch(err => {
                            console.log(err);
                        });

                    openingPrompt();
                });
        })
        .catch(err => {
            console.log(err);
        });
};

addEmployee = () => {

    con.promise().query(`SELECT id, title FROM role;`)
        .then(([roles]) => {

            const rolesList = roles;
            const rolesChoices = rolesList.map(role => {
                return {
                    name: role.title,
                    value: role.id
                }
            })

            con.promise().query(`SELECT employee.manager_id, CONCAT (manager.first_name, ' ', manager.last_name) AS manager 
        FROM employee
        RIGHT JOIN employee manager ON manager.id = employee.manager_id;`)
                .then(([employees]) => {
                    const managerList = employees.filter(employee => employee.manager_id);
                    managerList.push({ manager_id: null, manager: 'none' })

                    const managerChoices = managerList.map(manager => {
                        return {
                            name: manager.manager,
                            value: manager.manager_id
                        }
                    });

                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'first_name',
                            message: "Please enter the new employee's first name."
                        },
                        {
                            type: 'input',
                            name: 'last_name',
                            message: "Please enter the new employee's last name."
                        },
                        {
                            type: 'list',
                            name: 'role_id',
                            message: "Please choose the department this role belongs to.",
                            choices: rolesChoices
                        },
                        {
                            type: 'list',
                            name: 'manager_id',
                            message: "Please choose the department this role belongs to.",
                            choices: managerChoices
                        }
                    ])
                        .then(response => {
                            let newEmployee = response;
                            console.log(newEmployee)

                            const sql = `INSERT INTO employee SET ?`

                            con.promise().query(sql, newEmployee)
                                .then(console.log(`New employee has been added.`))
                                .catch(err => {
                                    console.log(err);
                                });

                            openingPrompt();
                        });

                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });


};

updateRole = () => {

    con.promise().query(`SELECT id, CONCAT (first_name, ' ', last_name) AS name FROM employee`)
        .then(([response]) => {

            let employeeList = response;

            employeeChoices = employeeList.map(employee => {
                return {
                    name: employee.name,
                    value: employee.id
                }
            });

            inquirer.prompt({
                type: 'list',
                name: 'id',
                message: "Please choose an employee to update to a new role.",
                choices: employeeChoices
            })
                .then(response => {

                    let id = response.id;

                    con.promise().query('SELECT id, title FROM role;')
                        .then(([roles]) => {
                            rolesList = roles;

                            rolesChoices = rolesList.map(role => {
                                return {
                                    name: role.title,
                                    value: role.id
                                }
                            })

                            inquirer.prompt({
                                type: 'list',
                                name: 'role_id',
                                message: 'Please choose an updated role for selected employee.',
                                choices: rolesChoices
                            })
                                .then(response => {
                                    let newRole = response.role_id;

                                    con.promise().query('UPDATE employee SET ? WHERE ?',
                                        [
                                            {
                                                role_id: newRole
                                            },
                                            {
                                                id
                                            }
                                        ])
                                        .then(console.log("Employee's role has been updated."))
                                        .catch(err => {
                                            console.log(err);
                                        });

                                    openingPrompt();
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
};

quit = () => {
    console.log("Quiting application");
    process.exit();
};


init();