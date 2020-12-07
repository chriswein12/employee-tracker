DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;
USE employee_tracker;

CREATE TABLE department (
    id INTEGER UNSIGNED AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) UNIQUE NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INTEGER UNSIGNED AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DEC UNSIGNED NOT NULL,
    department_id INTEGER UNSIGNED NOT NULL,
    INDEX (department_id),
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INTEGER UNSIGNED AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER UNSIGNED NOT NULL,
    INDEX (role_id),
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    manager_id INTEGER UNSIGNED,
    INDEX (manager_id),
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL,
    PRIMARY KEY (id)
);