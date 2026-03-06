const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Contact = sequelize.define("Contact", {
id: {
type: DataTypes.INTEGER,
autoIncrement: true,
primaryKey: true
},

phoneNumber: {
type: DataTypes.STRING
},

email: {
type: DataTypes.STRING
},

linkedId: {
type: DataTypes.INTEGER,
allowNull: true
},

linkPrecedence: {
type: DataTypes.ENUM("primary", "secondary"),
defaultValue: "primary"
},

createdAt: {
type: DataTypes.DATE,
defaultValue: DataTypes.NOW
},

updatedAt: {
type: DataTypes.DATE,
defaultValue: DataTypes.NOW
},

deletedAt: {
type: DataTypes.DATE,
allowNull: true
}

},{
tableName: "Contact",
timestamps: false
});

module.exports = Contact;