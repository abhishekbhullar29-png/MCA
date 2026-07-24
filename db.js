const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",

  // Yahan apna actual MySQL password
  password: "Abhu@123",

  database: "grocery_db"
});


db.connect((error) => {

  if (error) {
    console.error(
      "MySQL Connection Failed:",
      error.message
    );

    return;
  }

  console.log(
    "MySQL Database Connected Successfully!"
  );

  // Confirm exactly kis database se connected hain
  db.query(
    "SELECT DATABASE() AS databaseName",
    (error, result) => {

      if (error) {
        console.error(error);
        return;
      }

      console.log(
        "Connected Database:",
        result[0].databaseName
      );

    }
  );

});


module.exports = db;