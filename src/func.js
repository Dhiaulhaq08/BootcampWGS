const validator = require('validator');
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
//membuat fungsi delete contak 
function deleteContact(argv) { 
 const data = JSON.parse(fs.readFileSync("data/contacts.json","utf-8")) //membaca data dari folder untuk diambil dan diproses
  const newContact = data.filter((datas)=> datas.name.toLowerCase() !== argv.name.toLowerCase()) //membuat filter dan mengecualikan data yg ditulis di yargs

  fs.writeFileSync('data/contacts.json',JSON.stringify(newContact,null, 2), "utf-8"); //replace data yang di input lalu dimasukan data yang baru
 
}
// function closeReadline() {
//     rl.close();
//     console.log('Interface readline ditutup.');
// }

function tampilkanKontak() { 
  const readContact = JSON.parse(fs.readFileSync("data/contacts.json","utf-8"));
  Object.keys(readContact).forEach(key => {
    console.log(`${key}: ${JSON.stringify(readContact[key], null, 2)}`);
  });
};

// function detailKontak() {
//       // Membaca isi dari package.json
//     const listContact = JSON.parse(fs.readFileSync('data/contacts.json', 'utf8'));
//     // Memastikan kontak ada dalam package.json
//     if (listContact.name) {
//       console.log(`Nama Kontak: ${listContact.name}`);
//     } else {
//       console.log("not found");
//     }
//   }
    
// function detailKontak() {
//   try {
//     // Membaca isi dari package.json
//     const packageData = JSON.parse(fs.readFileSync('package.json', 'utf8'));

//     // Memeriksa apakah data kontak ada
//     if (packageData && Array.isArray(packageData)) {
//       console.log("Daftar Kontak:");
//       packageData.contacts.forEach((kontak, index) => {
//         // Menampilkan detail setiap kontak
//         console.log(`\nKontak ${index + 1}:`);
//         console.log(`Nama: ${kontak.name || 'Tidak tersedia'}`);
//         console.log(`Email: ${kontak.mobile || 'Tidak tersedia'}`);
//         console.log(`Telepon: ${kontak.email|| 'Tidak tersedia'}`);
//       });
//     } else {
//       console.log("Tidak ditemukan informasi kontak dalam package.json.");
//     }
//   } catch (error) {
//     console.error("Terjadi kesalahan dalam membaca package.json:", error.message);
//   }
// }

function detailKontak(argv) {
  try {
    // Membaca isi dari contacts.json
    const data = JSON.parse(fs.readFileSync('data/contacts.json', 'utf8'));

    // Mencari kontak berdasarkan nama yang diberikan
    const namaKontak = argv.name;
    const kontak = data.find(c => c.name.toLowerCase() === namaKontak.toLowerCase());

    // Jika kontak ditemukan, tampilkan detailnya
    if (kontak) {
      console.log(`Detail Kontak:`);
      console.log(`Nama: ${kontak.name}`);
      console.log(`Email: ${kontak.mobile}`);
      console.log(`Telepon: ${kontak.email}`);
    } else {
      console.log(`Kontak dengan nama "${namaKontak}" tidak ditemukan.`);
    }
  } catch (error) {
    console.error("Terjadi kesalahan dalam membaca contacts.json:", error.message);
  }
}

function ubahKontak(argv,data) { 
  const readContact = JSON.parse(fs.readFileSync('data/contacts.json', 'utf8'));
  const newContact = readContact.filter((data)=> data.name.toLowerCase() !== argv.name.toLowerCase())

  if (readContact.length === newContact.length) {
    console.log("not found");
    
  } else { 
    newContact.push(data);
    fs.writeFileSync('data/contacts.json',JSON.stringify(newContact,null, 2), "utf-8");
  }
}

 

// Memanggil fungsi dengan parameter yang diterima dari command line
// if (argv._[0] === 'ubah') {
//   const { name, mobile, email } = argv;
//   ubahKontak(name, mobile, email);
// }

    module.exports = {rl,question,addContact,deleteContact,tampilkanKontak,detailKontak,ubahKontak};
  
