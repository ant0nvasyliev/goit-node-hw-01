const Contacts = require("./contacts");
const { program } = require("commander");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await Contacts.listContacts();
      return console.table(contacts);
    case "get":
      const contact = await Contacts.getContactById(id);
      return console.log(contact);
    case "remove":
      const removedContact = await Contacts.removeContact(id);
      return console.log(removedContact);
    case "add":
      const createdContact = await Contacts.addContact(name, email, phone);
      return console.log(createdContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <action>", "Action to invoke")
  .option("-i, --id <id>", "Contact id")
  .option("-n, --name <name>", "Contact name")
  .option("-e, --email <email>", "Contact email")
  .option("-p, --phone <phone>", "Contact phone");

program.parse(process.argv);

const options = program.opts();

invokeAction(options);
