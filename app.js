const mysql = require("mysql");
const inquirer = require("inquirer");
const clear = require("clear");
const chalk = require("chalk");
const figlet = require("figlet");
const cTable = require("console.table");

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
          updateEmpRole();
          break;

        case "Quit":
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

function addEmp() {
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
        message: "What is the employees role id?",
        choices: [1, 2, 3, 4]
      },
      {
        type: "list",
        name: "managerId",
        message: "What is the employees manager ID?",
        choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, "null"]
      }
    ])

    .then(val => {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: val.firstName,
          last_name: val.lastName,
          role_id: val.role,
          manager_id: val.man
        },
        function(err, res) {
          if (err) throw err;
          promptQuestions();
        }
      );
    });
}

function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "dept",
        message: "What is the department you want to add?"
      }
    ])
    .then(val => {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: val.dept
        },
        function(err, res) {
          if (err) throw err;
          promptQuestions();
        }
      );
    });
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
        type: "list",
        name: "dept_id",
        message: "What is the department id for this role?",
        choices: [1, 2, 3, 4]
      }
    ])
    .then(val => {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: val.role,
          salary: val.salary,
          department_id: val.dept_id
        },
        function(err, res) {
          if (err) throw err;
          promptQuestions();
        }
      );
    });
}

const queryAllEmployeesSimple = `SELECT id, concat(first_name, " ", last_name) AS name FROM employee`;
const queryAllRoles = `SELECT id, title, salary FROM role;`;

// const updateEmpRole = function() {
//   connection.query(
//     //`${queryAllEmployeesSimple};${queryAllRoles};`,
//     //`SELECT title FROM role; SELECT concat(employee.first_name, " ", employee.last_name) AS name, role.title
//     //FROM employee JOIN role ON (employee.role_id = role.id);`,
//     'SELECT id, concat(first_name, " ", last_name) AS name FROM employee; SELECT id, title, salary FROM role;',

//     (err, res, fields) => {
//       if (err) throw err;
//       const employees = res[0].map(item => {
//         const newItem = {
//           id: item.id,
//           name: item.name
//         };
//         return newItem;
//       });
//       const roles = res[1].map(item => {
//         const newItem = {
//           id: item.id,
//           name: item.title
//         };
//         return newItem;
//       });
//       inquirer
//         .prompt([
//           {
//             type: "list",
//             name: "hasNewRole",
//             choices: employees,
//             message: "Which employee would you like to update?"
//           },
//           {
//             type: "list",
//             name: "newRole",
//             choices: roles,
//             message: "What is their new role?"
//           }
//         ])
//         .then(answers => {
//           console.log(answers);
//           connection.query(
//             queryUpdateEmployeeRole,
//             [answers.newRole, answers.hasNewRole],
//             (err, res, fields) => {
//               if (err) throw err;
//               promptQuestions();
//             }
//           );
//         });
//     }
//   );
// };

const updateEmpRole = () => {
  connection.query(
    `SELECT concat(employee.first_name, " ", employee.last_name) AS Name, role.title
FROM employee JOIN role ON (employee.role_id = role.id);`,
    function(err, res) {
      console.log(res);
    }
  );
  // const names = [];
  // const roles = [];
  // for (let i = 0; i < res.length; i++) names.push(res[i].first_name);
  // for (let i = 0; i < res.length; i++) roles.push(res[i].title);

  // const listOfRoles = res[0].map(item => {
  //   const roles = {
  //     name: item.title
  //   };
  //   return roles;
  // });

  // const listOfEmployees = res[1].map(item => {
  //   const employees = {
  //     name: item.Name,
  //     title: item.title
  //   };
  //   return employees;
  // });

  //     inquirer
  //       .prompt([
  //         {
  //           type: "list",
  //           name: "employeeChoice",
  //           message: "Who's Role would you like to change?",
  //           choices: names
  //         },
  //         {
  //           type: "list",
  //           name: "newRole",
  //           message: "Choose the employees new Role",
  //           choices: roles
  //         }
  //       ])
  //       .then(answers => {
  //         const employeeFirstName = answers.employeeChoice
  //           .split(" ")
  //           .slice(0, -1)
  //           .join(" ");
  //         const employeeLastName = answers.employeeChoice
  //           .split(" ")
  //           .slice(-1)
  //           .join(" ");

  //         connection.query(
  //           `UPDATE employee
  //       SET role_id = (SELECT id FROM (SELECT * FROM role) AS A WHERE title = "${answers.newRole}")
  //       WHERE id = (SELECT id from (SELECT * FROM employee) AS A
  //       WHERE first_name = "${employeeFirstName}"
  //       AND last_name = "${employeeLastName}");`,
  //           function(err, res) {
  //             if (err) throw err;
  //             console.log("\n");
  //             console.log("Updated role to: " + answers.newRole);
  //             console.log("\n");
  //             promptQuestions();
  //           }
  //         );
  //       });
  //   }
  // );
};

function quit() {
  console.log("quit");
  connection.end();
}
