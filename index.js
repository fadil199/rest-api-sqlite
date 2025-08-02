require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const index = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const method = require("method-override");
const path = require("path");
const {connectDB} = require("./db/db")
const router = require("./routes")

const { http_port } = process.env;

connectDB();

index.use(express.json());
index.use(cors())
index.use(morgan("dev"));
index.use(express.urlencoded({extended: false}));
index.use(bodyparser.urlencoded({extended: false}));
index.use(method("_method"));
index.use(express.static(path.join(__dirname, "client")));

index.use(router);

index.use((req, res, next) => {
    return res.status(400).json({
        status: false,
        message: "404 Oops!"
    })
})

index.use((req, res,next) => {
    return res.status(500).json({
        status: false,
        message: err.message
    })
})

index.listen(http_port, () => console.log("listening on port", http_port));

//access sqlite
// 1. Ensure SQLite3 is Accessible:
// Check your PATH:
// If SQLite3 is installed and its directory is added to your system's PATH environment variable, you can directly type sqlite3 in Git Bash.
// Navigate to its location:
// If not in your PATH, navigate to the directory where sqlite3.exe is located using the cd command in Git Bash. For example, if it's in C:\sqlite, you would use cd /c/sqlite.
// 2. Launching SQLite3:
// From PATH: If sqlite3 is in your PATH, simply type:
// Kode

//     sqlite3
// or to open a specific database file:
// Kode

//     sqlite3 your_database_name.db
// From its directory (using winpty): If you've navigated to the directory where sqlite3.exe resides, you might need to use winpty to ensure proper interaction with the Windows console from Git Bash:
// Kode

//     winpty ./sqlite3.exe
// or with a database:
// Kode

//     winpty ./sqlite3.exe your_database_name.db
// winpty is often necessary because Git Bash, being a MinGW environment, sometimes needs help interacting with native Windows console applications.
// 3. Using SQLite3 Commands:
// Once inside the SQLite3 shell (indicated by the sqlite> prompt), you can execute SQL commands (terminated by a semicolon) and special SQLite dot commands (starting with a dot). Example SQL.
// Kode

//     CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);
//     INSERT INTO users (name) VALUES ('Alice');
//     SELECT * FROM users;
// Example Dot Commands.
// Kode

//     .tables
//     .schema users
//     .help
//     .quit

// To show data from a table in SQLite using the command-line interface, follow these steps: Open the SQLite3 CLI.
// Open your terminal or command prompt and type sqlite3. If you want to open a specific database file, add its path, for example: sqlite3 your_database.db.
// Select the Database (if not specified on startup):
// If you didn't specify a database file when starting sqlite3, you can open one using the .open command:
// Kode

//     .open your_database.db
// Enable Headers and Column Mode (for better readability):
// These commands are optional but highly recommended to make the output more readable:
// Kode

//     .headers on
//     .mode column
// Query the Table.
// Use the SELECT statement to retrieve data from your desired table. For example, to select all columns and all rows from a table named your_table:
// Kode

//     SELECT * FROM your_table;
// Replace your_table with the actual name of the table you want to view. You can also specify specific columns instead of * (e.g., SELECT column1, column2 FROM your_table;).
// Example:
// Kode

// sqlite3 my_database.db
// .headers on
// .mode column
// SELECT * FROM users;
// This sequence of commands will open my_database.db, enable column headers and formatted output, and then display all data from the users table within that database.