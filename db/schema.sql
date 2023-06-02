-- if employee_db already exists that database gets dropped otherwise make a new database called employee_db.
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

-- this creates the departments table which shows all of the department names and ids for those departments.
CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

-- this creates the roles table which keeps track of all the roles, the id for that role, the department for said roles, and the salary for each.
CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  role_title VARCHAR(30) NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES departments (id),
  role_salary INT NOT NULL
);

-- this creates the employees table which shows the id for each employee, their first name, last name, role, department, salary, and manager.
CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES roles (id),
  FOREIGN KEY (manager_id) REFERENCES employees (id)
);