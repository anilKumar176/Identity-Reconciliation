const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
"bitespeed",      // database name
"root",           // mysql username
"Anilkumar76@",   // mysql password
{
host: "localhost",
dialect: "mysql"
}
);

sequelize.authenticate()
.then(() => {
console.log("MySQL Connected");
})
.catch((err) => {
console.log("Database Error:", err);
});

module.exports = sequelize;