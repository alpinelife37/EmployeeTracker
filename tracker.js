const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
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
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "View All Roles",
        "Add Role",
        "Remove Role",
        "View All Departments",
        "Add Department",
        "Remove Department",
        "Quit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View All Employees":
          viewAllEmp();
          break;

        case "View All Employees By Department":
          viewEmpByDept();
          break;

        case "View All Employees By Manager":
          viewEmpByManager();
          break;

        case "Add Employee":
          addEmp();
          break;

        case "Remove Employee":
          removeEmp();
          break;

        case "Update Employee Role":
          UpdateEmpRole();
          break;

        case "Update Employee Manager":
          UpdateEmpMan();
          break;

        case "View All Roles":
          viewAllRole();
          break;

        case "Add Role":
          addRole();
          break;

        case "Remove Role":
          removeRole();
          break;

        case "View All Departments":
          viewAllDept();
          break;

        case "Add Department":
          addDept();
          break;

        case "Remove Department":
          removeDept();
          break;

        case "Quit":
          quit();
          break;
      }
    });
}

function viewAllEmp() {
  console.log("View All Employees");
}

function viewEmpByDept() {
  console.log("View All Employees By Department");
}

function viewEmpByManager() {
  console.log("View All Employees By Manager");
}

function addEmp() {
  console.log("Add Employee");
}

function removeEmp() {
  console.log("Remove Employee");
}

function UpdateEmpRole() {
  console.log("Update Employee Role");
}

function UpdateEmpMan() {
  console.log("Update Employee Manager");
}

function viewAllRole() {
  console.log("View All Roles");
}

function addRole() {
  console.log("Add Role");
}

function removeRole() {
  console.log("Remove Role");
}

function viewAllDept() {
  console.log("View All Departments");
}

function addDept() {
  console.log("Add Department");
}

function removeDept() {
  console.log("Remove Department");
}

function quit() {
  console.log("quit");
}
