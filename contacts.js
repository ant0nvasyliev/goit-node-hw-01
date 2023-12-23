const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const filePath = path.join(__dirname, ".", "./db/contacts.json");

async function readContacts() {
  const data = await fs.readFile(filePath, { encoding: "utf-8" });
  return JSON.parse(data);
}

function writeContacts(contacts) {
  return fs.writeFile(filePath, JSON.stringify(contacts, undefined, 2));
}

async function listContacts() {
  const contacts = await readContacts();
  return contacts;
}

async function getContactById(id) {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === id);
  if (contact === undefined) {
    return null;
  }
  return contact;
}

async function removeContact(id) {
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === id);

  if (index === -1) {
    return null;
  }
  const newContacts = [
    ...contacts.slice(0, index),
    ...contacts.slice(index + 1),
  ];
  await writeContacts(newContacts);

  return contacts[index];
}

async function addContact(name, email, phone) {
  const contacts = await readContacts();
  const newContact = { name, email, phone, id: crypto.randomUUID() };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
