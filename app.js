const mysql = require("mysql");
const inquirer = require("inquirer");
const clear = require("clear");
const chalk = require("chalk");
const figlet = require("figlet");
const consoleTable = require("console.table");

var connection = mysql.createConnection({
  host: "localHost",
  port: 3306,
  user: "root",
  password: "1982",
  database: "employee_tracker"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("you are connected");
  promptQuestions();
});

function promptQuestions() {
  console.clear();
  console.log(
    chalk.yellow(figlet.textSync("Employee", { horizontalLayout: "full" }))
  );
  console.log(
    chalk.red(figlet.textSync("Manager", { horizontalLayout: "full" }))
  );

  inquirer
    .prompt({
      type: "rawlist",
      name: "choices",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Update Employee Role",
        "Quit"
      ]
    })
    .then(function(answer) {
      switch (answer.choices) {
        case "View All Employees":
          viewAllEmp();
          break;

        case "View All Departments":
          viewAllDept();
          break;

        case "View All Roles":
          viewAllRole();
          break;

        case "Add Employee":
          addEmp();
          break;

        case "Add Department":
          addDept();
          break;

        case "Add Role":
          addRole();
          break;

        case "Update Employee Role":
          UpdateEmpRole();
          break;

        case "Quit":
          //connection.end()
          quit();
          break;
      }
    });
}

function viewAllEmp() {
  connection.query("SELECT *  FROM employee", function(err, res) {
    if (err) throw err;
    console.clear();
    console.log(
      chalk.yellow(
        figlet.textSync("Employees", { horizontalLayout: "default" })
      )
    );
    console.table(res);
  });
  promptQuestions();
}

function viewAllDept() {
  connection.query("SELECT *  FROM department", function(err, res) {
    if (err) throw err;
    console.clear();
    console.log(
      chalk.green(
        figlet.textSync("Departments", { horizontalLayout: "default" })
      )
    );
    console.table(res);
  });
  promptQuestions();
}

function viewAllRole() {
  connection.query("SELECT *  FROM role", function(err, res) {
    if (err) throw err;
    console.clear();
    console.log(
      chalk.magenta(figlet.textSync("Roles", { horizontalLayout: "default" }))
    );
    console.table(res);
  });
  promptQuestions();
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addEmp() {
  connection.query("SELECT title FROM role", function(err, res) {
    if (err) throw err;
    //console.table(res);
    const roles = [];
    for (let i = 0; i < res.length; i++) {
      roles.push(res[i].title);
    }

    connection.query("SELECT manager_id FROM employee", function(err, result) {
      if (err) throw error;
      console.table(result);
      //const man = [];
      for (let i = 0; i < result.length; i++) {
        man.push(result[i].manager_id);
      }

      console.log("right here");
      inquirer
        .prompt([
          {
            type: "input",
            name: "firstName",
            message: "What is the employees first name?"
          },
          {
            type: "input",
            name: "lastName",
            message: "What is the employees last name?"
          },
          {
            type: "list",
            name: "role",
            message: "What is the employees role?",
            choices: roles
          }
          // {
          //   type: "list",
          //   name: "managerId",
          //   message: "What is the employees manager ID?",
          //   choices: man
          // }
        ])
        .then(function(answers) {
          answers.firstName;
          answers.lastName;
          answers.role;
          //answers.managerId;
          connection.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES("${answers.firstName}", "${answers.lastName}", "${answers.role}", 11 );`
          );
        });
    });
  });
  console.log("You added an employee");
  promptQuestions();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "dept",
        message: "What is the department you want to add?"
      }
    ])
    .then(function(res) {
      res.dept;
      connection.query(`INSERT INTO department (name) VALUES("${res.dept}");`);
    });

  console.log("You added a Department");
  promptQuestions();
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "What is the role you want to add?"
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for this role?"
      },
      {
        type: "input",
        name: "dept_id",
        message: "What is the department id for this role?"
      }
    ])
    .then(function(res) {
      res.role;
      res.salary;
      res.dept_id;
      connection.query(
        `INSERT INTO role (title, salary, department_id) VALUES("${res.dept}","${res.salary}", "${res.detp_id}");`
      );
    });

  console.log("You added a role!");
  promptQuestions();
}

function UpdateEmpRole() {
  console.log("Update Employee Role");
  promptQuestions();
}

function quit() {
  console.log("quit");
  connection.end();
}
