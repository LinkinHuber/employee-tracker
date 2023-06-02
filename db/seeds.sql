-- inserts the 3 departments into the departments table.
INSERT INTO departments (department_name)
  VALUES 
    ("Floor"),
    ("Kitchen"),
    ("Cleanup");

-- inserts the roles, department ids, and salaries into the roles table.
INSERT INTO roles (role_title, department_id, role_salary)
  VALUES
    ("Waiter", 1, 25000 ),
    ("Floor Overseer", 1, 40000 ),
    ("Cook", 2, 30000 ),
    ("Head Chef", 2, 45000 ),
    ("Busser", 3, 20000 ),
    ("Sanitation Advisor", 3, 35000 );

-- inserts all the managers first names, last names, role ids, and manager ids into the employees table.
INSERT INTO employees (first_name, last_name, role_id, manager_id)
  VALUES
    ("Lennon", "Allen", 2, null ), 
    ("Jayden", "Sloan", 4, null ),
    ("Kamal", "Rhodes", 6, null );

-- inserts all the employees first names, last names, role ids, and manager ids for who they work under into the employees table.
INSERT INTO employees (first_name, last_name, role_id, manager_id)
  VALUES
    ("Travis", "Hodge", 1, 1 ),
    ("Darragh", "Hardin", 1, 1 ), 
    ("Hamish", "Haley", 3, 2 ), 
    ("Amira", "Byrd", 3, 2 ), 
    ("Ella", "Austin", 3, 2 ), 
    ("Rosa", "Clarke", 3, 2 ), 
    ("Alec", "Parker", 5, 3 ),
    ("Kajus", "Solis", 5, 3 );