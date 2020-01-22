const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

var connection = mysql.createConnection({
  host: "localHost",
  port: 3306,
  user: "root",
  password: "sanders",
  database: "employee_tracker"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("you are connected");
  promptQuestions();
});

function promptQuestions() {
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
      switch (answer.action) {
        case "View All Employees":
          viewAllEmp();
          break;

        case "Add Employee":
          addEmp();
          break;

        case "Update Employee Role":
          UpdateEmpRole();
          break;

        case "View All Roles":
          viewAllRole();
          break;

        case "Add Role":
          addRole();
          break;

        case "View All Departments":
          viewAllDept();
          break;

        case "Add Department":
          addDept();
          break;

        case "Quit":
          quit();
          break;
      }
    });
}

function viewAllEmp() {
  console.log("View all employees ");
  promptQuestions();
}

function viewAllDept() {
  console.log("View All Departments");
  promptQuestions();
}

function viewAllRole() {
  console.log("View All Roles");
  promptQuestions();
}

function addEmp() {
  inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "What is the employees first name?"
    },
    {
      type: "input",
      name: "flastName",
      message: "What is the employees last name?"
    },
    {
      type: "list",
      name: "role",
      message: "What is the employees first name?"
    }
  ]);

  console.log("Add Employee");

  promptQuestions();
}

function addDept() {
  console.log("Add Department");
  promptQuestions();
}

function addRole() {
  console.log("Add Role");
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
