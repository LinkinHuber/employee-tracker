const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  console.log("Welcome...")
)

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

function allDepartments() {
  db.query("SELECT * FROM departments", function (err, results) {
    console.table(results);
    init();
  });
  }
  
  
  function allRoles() {
  db.query("SELECT * FROM roles", function (err, results) {
    console.table(results);
    init();
  });
  }
  
  
  function allEmployees() {
  db.query("SELECT * FROM employees", function (err, results) {
    console.table(results);
    init();
  });
  }

  

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
      name: "whatDepartmentId"
    }
  ])
  .then((data) => {
    db.query(`INSERT INTO roles (job_title, department_id, role_salary) VALUES (?, ?, ?)`, [data.newRole, data.newDepartment, data.newSalary], function (err, results) 
    {
      if (err) throw err;
      console.table(results);
      init();
    })
  })
}