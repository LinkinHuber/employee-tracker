// all of the required packages for this project.
const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: false }));
app.use(express.json());


// connects to the database
const db = mysql.createConnection(
  {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  console.log("Welcome...")
)


// prompts the user asking them to choose a category they'd like to view and then depending on the category they pick that function is then called. 
function init() {
  inquirer.prompt([
    {
      type: "list",
      message: "Choose a category you'd like to view:",
      name: 'categories',
      choices: [ "Departments", "Roles", "Employees", "Add New Department", "Add New Role", "Add New Employee", "Edit Existing Employee Role" ],
    },
  ])
  .then((data) => {
    switch(data.categories) {
      case "Departments": allDepartments();
      break;
      case "Roles": allRoles();
      break;
      case "Employees": allEmployees();
      break;
      case "Add New Department": newDepartment();
      break;
      case "Add New Role": newRole();
      break;
      case "Add New Employee": newEmployee();
      break;
      case "Edit Existing Employee Role": editEmployeeRole();
      break;
    }
  })
}

init();


// if the user selects departments that table is then loaded for the user to see.
function allDepartments() {
  db.query("SELECT * FROM departments", function (err, results) {
    console.table(results);
    init();
  });
  }
  
  
// if the user selects roles that table is then loaded for the user to see.
function allRoles() {
db.query("SELECT * FROM roles", function (err, results) {
  console.table(results);
  init();
});
}


// if the user selects employees that table is then loaded for the user to see.
function allEmployees() {
db.query("SELECT * FROM employees", function (err, results) {
  console.table(results);
  init();
});
}

  
// if the user wants to create a new department a prompt is then presented asking what you want to name it and then that new department is inserted into the departments table.
function newDepartment() {
  inquirer.prompt([
    {
      type: "input",
      message: "What do you want to name the new department?",
      name: "newDepartment"
    }
  ])
  .then((data) => {
    db.query(`INSERT INTO departments (department_name) VALUES (?)`, [data.newDepartment], function (err, results) 
    {
      if (err) throw err;
      console.table(results);
      init();
    })
  })
}


// if the user wishes to create a new role a series of prompts is then presented asking what you want to name it, what salary you want to give it,and what department id does the new role belong to. The data is then inserted into the roles table.
function newRole() {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the new role?",
      name: "whatRole"
    },
    {
      type: "input",
      message: "What salary do you want to give this role?",
      name: "whatSalary"
    },
    {
      type: "input",
      message: "What department id does this new role belong under?",
      name: "whatDepartment"
    }
  ])
  .then((data) => {
    db.query(`INSERT INTO roles (role_title, department_id, role_salary) VALUES (?, ?, ?)`, [data.whatRole, data.whatDepartment, data.whatSalary], function (err, results)
    {
      if (err) throw err;
      console.table(results);
      init();
    })
  })
}


// if the user wants to add a new employee a series of prompts is then presented asking for their first name, last name, department id, and the role id of the manager they will be working under. This data is then inserted into the employees table.
function newEmployee() {
  inquirer.prompt([
    {
      type: "input",
      message: "What is their first name?",
      name: "whatFirstName"
    },
    {
      type: "input",
      message: "What is their last name?",
      name: "whatLastName"
    },
    {
      type: "input",
      message: "What is the role id of their new role?",
      name: "roleId"
    },
    {
      type: "input",
      message: "What is the role id of their manager?",
      name: "managerRoleId"
    }
  ])
  .then((data) => {
    db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [data.whatFirstName, data.whatLastName, data.roleId, data.managerRoleId], function (err, results) 
    {
      if (err) throw err;
      console.table(results);
      init();
    })
  })
}


// lastly if the user wishes to edit an existing emplyee role a series of prompts is then asked asking what their role id is and what role you want to give then instead. The existing data is then updated in the employees table.
function editEmployeeRole() {
  inquirer.prompt([
    {
      type: "input",
      message: "What is their role id?",
      name: "theirRoleId"
    },
    {
      type: "input",
      message: "What role do you want to give them instead?",
      name: "whatNewRole"
    }
  ])
  .then((data) => {
    db.query(`UPDATE employees SET role_id = ? WHERE id = ?`, [data.theirRoleId, data.whatNewRole], function (err, results) 
    {
      if (err) throw err;
      console.table(results);
      init();
    })
  })
}