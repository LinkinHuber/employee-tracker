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