const validator = require('validator')
const readline = require('node:readline');
const fs = require ('fs');


 
    const rl= readline.createInterface({
    input: process.stdin,
    output: process.stdout,
        });



const question = (question) => { 
    return new Promise((resolve,reject) => { 
      rl.question(question,(input)=> {
      resolve(input);
      })
    })
  };

  function addContact(data) {
  if (fs.existsSync("data/contacts.json")) { //cek kondisi apakah file tersebut ada di directori
    const readContact = fs.readFileSync("data/contacts.json","utf-8");
    newContact = JSON.parse(readContact);
    } else { // kondisi jika file di direktori tidak ada
      fs.writeFileSync('data/contacts.json'); //membuat file di direktori
    }
    newContact.push(data);
    fs.writeFileSync('data/contacts.json',JSON.stringify(newContact,null, 2), "utf-8");

}

// function closeReadline() {
//     rl.close();
//     console.log('Interface readline ditutup.');
// }

    

    module.exports = {rl,question,addContact};
  
