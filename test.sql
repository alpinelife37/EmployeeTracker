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
 VALUES ("Operations"),
            ("Production"),
            ("HR"),
            ("Sales");

 INSERT INTO role (title, salary, department_id)
 VALUES ("Operations Director", 190000, 1),
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

 INSERT INTO employee (first_name, last_name, role_id, manager_id)
 VALUES ("Saad", "Maan", 1, NULL),
                ("Sam", "Sung", 2, 1),
                ("Hitler", "Mussolini", 3, 2),
                ("Paul ", "Twocock", 4, 3),
                ("Dick", "Long", 5, NULL),
                ("Mike", "Litoris", 6, 4),
                ("Moo", "Lester", 7, 5),
                ("F", "You", 8, 6),
                ("Kash", "Register", 9, NULL),
                ("Donald", "Duck", 10, 7),
                ("Crystal", "Methven", 11, 8),
                ("MacDonald", "Berger", 12, 9),
                ("Jack", "Daniels", 13, NULL);



 
 