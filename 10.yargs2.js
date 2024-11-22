const yargs = require ('yargs');
const func = require("./src/func.js");

yargs.command ({
    command : "delete",
    describe: "delete contact",
    builder: {
      name: {
      describe: "kontak dihapus",
      demandOption: true,
      type: "string",
      } },
  handler(argv) {
    func.deleteContact(argv);
    }
    
  });
yargs.parse();
func.rl.close();


