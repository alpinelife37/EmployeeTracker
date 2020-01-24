DROP DATABASE IF EXISTS employee_tracker;

CREATE database employee_tracker;

USE employee_tracker;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR (30),
    salary DECIMAL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE TABLE Employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR (30),
    last_name VARCHAR (30),
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role (ID),
    FOREIGN KEY (manager_id) REFERENCES employee (id)
);

INSERT INTO
    department (name)
VALUES
    ("Operations"),
    ("Production"),
    ("HR"),
    ("Sales");

INSERT INTO
    role (title, salary, department_id)
VALUES
    ("Operations Director", 190000, 1),
    ("Operations Manager", 120000, 1),
    ("Operations Intern", 85000, 1),
    ("Production Director", 150000, 2),
    ("Production Manager", 110000, 2),
    ("Production Intern", 65000, 2),
    ("HR Director", 220000, 3),
    ("HR Manager", 175000, 3),
    ("HR Intern", 90000, 3),
    ("Sales Director", 175000, 4),
    ("Sales Manager", 145000, 4),
    ("Sales Intern", 65000, 4);

INSERT INTO
    employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Saad", "Maan", 1, NULL),
    ("Sam", "Sung", 1, 1),
    ("Hitler", "Mussolini", 1, 2),
    ("Paul ", "Twocock", 2, 3),
    ("Dick", "Long", 2, NULL),
    ("Mike", "Litoris", 2, 4),
    ("Moo", "Lester", 3, 5),
    ("F", "You", 3, 6),
    ("Kash", "Register", 3, NULL),
    ("Donald", "Duck", 4, 7),
    ("Crystal", "Methven", 4, 8),
    ("MacDonald", "Berger", 4, 9),
    ("Jack", "Daniels", 4, NULL);