DROP DATABASE IF EXISTS employee_tracker;
CREATE database employee_tracker;

USE employee_tracker;


CREATE TABLE Employee
(
    id INT NOT NULL
    AUTO_INCREMENT,
	 first_name VARCHAR
    (100),
    last_name VARCHAR
    (100),
    role_id INT NOT NULL,
    manager_id INT,
	PRIMARY KEY
    (id),
    FOREIGN KEY
    ( manager_id) REFERENCES employee
    (id)
);

    CREATE TABLE department
    (
        id INT NOT NULL
        AUTO_INCREMENT,
		name VARCHAR
        (100) NOT NULL,
		PRIMARY KEY
        (ID)
);
        CREATE TABLE role
        (
            id INT NOT NULL
            AUTO_INCREMENT,
	    title VARCHAR
            (100) NOT NULL,
	    salary DECIMAL
            (65) NOT NULL,
	    department_id INT NOT NULL,
	    PRIMARY KEY
            (id),
        FOREIGN KEY
            (department_id) REFERENCES department
            (id)
 );

INSERT INTO department (name)
 VALUES ("Engineer");

 INSERT INTO role (title, salary, department_id)
 VALUES ("Manager", 90000, 1);

 INSERT INTO employee (first_name, last_name, role_id, manager_id)
 VALUES ("Jim", "Son", 1, 1);

 
 