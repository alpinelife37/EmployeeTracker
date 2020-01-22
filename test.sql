DROP DATABASE IF EXISTS employee_tracker;
CREATE database employee_tracker;

USE employee_tracker;


CREATE TABLE Employee
(
    id INT NOT NULL AUTO_INCREMENT,
	 first_name VARCHAR(100),
    last_name VARCHAR(100),
    role_id INT NOT NULL,
    manager_id INT,
	PRIMARY KEY(id)
);
    CREATE TABLE role (
        id INT NOT NULL AUTO_INCREMENT,
	    title VARCHAR(100) NOT NULL,
	    salary DECIMAL(65) NOT NULL,
	    department_id INT NOT NULL,
	    PRIMARY KEY (id)
 );
        CREATE TABLE department (
            id INT NOT NULL AUTO_INCREMENT,
	        department VARCHAR(100) NOT NULL,
		    PRIMARY KEY (ID)
);
