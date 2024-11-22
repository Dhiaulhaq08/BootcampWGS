const yargs = require ('yargs');
const validator = require ('validator')
const func = require("./src/func.js");



yargs.command({
  command: "add",
  describe: "add new contact",
  builder: {
    name: {
      describe: "contact name",
      demandOption: true,
      type: "string",
    },
    mobile: {
      describe: "contact mobile",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "contact email",
      demandOption: false,
      type: "string",
    },
  },
  handler(argv) {
    const data = {
      name: argv.name,
      mobile: argv.mobile,
      email: argv.email,
    };

    console.log(data);
    func.addContact(data);
 
  },
 

});


yargs.parse();
func.rl.close();

yargs.command ({
    command : "delete",
    describe: "delete contact",
  builder: {
    name: {
      describe: "contact name",
      demandOption: true,
      type: "string",
    },
    mobile: {
      describe: "contact mobile",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "contact email",
      demandOption: false,
      type: "string",
    },
  },
  handler(argv) {
    const data = {
      name: argv.name,
      mobile: argv.mobile,
      email: argv.email,
    };
    const readData = JSON.parse(fs.readFileSync('./data/contacts.json', 'utf8'));
    const deleteData = (key) => {
        if (data[key]) {
          // Menghapus data berdasarkan key
          delete data[key];
          
          // Menyimpan kembali perubahan ke package.json
          fs.writeFileSync('data/contacts.json', JSON.stringify(data, null, 2));
          console.log(`${key} berhasil dihapus.`);
        } else {
          console.log(`${key} tidak ditemukan dalam package.json.`);
        }
      };
}

 
    

});


