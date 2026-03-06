const Contact = require("../models/contactModel");
const { Op } = require("sequelize");

const identifyController = async (req, res) => {

const { email, phoneNumber } = req.body;

try {

// dynamic conditions
const conditions = [];

if (email) conditions.push({ email });

if (phoneNumber) conditions.push({ phoneNumber });

let contacts = [];

if (conditions.length > 0) {
contacts = await Contact.findAll({
where: {
[Op.or]: conditions
}
});
}

if (contacts.length === 0) {

const newContact = await Contact.create({
email,
phoneNumber,
linkPrecedence: "primary"
});

return res.json({
contact: {
primaryContactId: newContact.id,
emails: email ? [email] : [],
phoneNumbers: phoneNumber ? [phoneNumber] : [],
secondaryContactIds: []
}
});
}

let primary = contacts.find(c => c.linkPrecedence === "primary") || contacts[0];

let emails = new Set();
let phones = new Set();
let secondaryIds = [];

contacts.forEach(c => {

if (c.email) emails.add(c.email);
if (c.phoneNumber) phones.add(c.phoneNumber);

if (c.linkPrecedence === "secondary") {
secondaryIds.push(c.id);
}

});

if (
(email && !emails.has(email)) ||
(phoneNumber && !phones.has(phoneNumber))
) {

const secondary = await Contact.create({
email,
phoneNumber,
linkedId: primary.id,
linkPrecedence: "secondary"
});

secondaryIds.push(secondary.id);

if (email) emails.add(email);
if (phoneNumber) phones.add(phoneNumber);

}

return res.json({
contact: {
primaryContactId: primary.id,
emails: [...emails],
phoneNumbers: [...phones],
secondaryContactIds: secondaryIds
}
});

} catch (error) {

res.status(500).json({
error: error.message
});

}

};

module.exports = identifyController;