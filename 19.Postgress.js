const express = require("express")
const app = express();
const pool = require("./src/com/databasePG")
const port = 3000;
const func = require("./src/func2");
const { name } = require('ejs');
const {body, validationResult} = require('express-validator')
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// ----------read data-------------
// app.get("/contact",async(req,res)=> { 
//     let data = { oneCont : await func.contact()}
//     res.render("contact3", data)})



app.get("/contact", async (req, res) => {
    try {
        // Mengambil data kontak menggunakan async/await
        let data = { oneCont: await func.contact()};
        res.render("contact3", data); // Menyisipkan data ke dalam template EJS
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong");
    }
});
app.listen(port, () => { 
    console.log(`server is running on http://localhost:${port}`)
})

// -------------detail each data-------------
app.get("/contact/:id", async(req,res) => { 
    const id = req.params.id;
    const detail = await pool.query('SELECT * FROM data_contact WHERE id = $1',[id]);
    try { 
        res.render('details2', {detail})
    }catch (error){ 
        console.error(error)
    }
})

// -----------add contact----------------------

app.get("/addcontact", async(req,res)=>{
    res.render("addcontact3")
})

const addvalidation = [body('name')
    .trim() // Menghapus spasi di awal dan akhir input
    .notEmpty().withMessage('Nama harus diisi.') // Memastikan input nama tidak kosong
    .isLength({ min: 1 }).withMessage('Nama tidak bisa diisi hanya dengan spasi.'),
    body('mobile')
    .isMobilePhone('id-ID') // Memeriksa apakah input adalah nomor telepon yang valid di Indonesia
    .withMessage('Format nomor telepon yang anda isi tidak valid.') // Pesan kesalahan jika format tidak sesuai
] // Memastikan input nama valid dan bukan hanya spasi]
app.post('/addcontact/add-data',addvalidation, async (req, res) => {
   
        // Mengambil data dari body request
        const { name, mobile, email } = req.body;
        const error = validationResult(req) 

        if (error.isEmpty()) {
        // Query untuk memasukkan data ke dalam tabel 'data_contact'
        try {
        const newCont = await pool.query(
            "INSERT INTO data_contact (name, mobile, email) VALUES ($1, $2, $3) RETURNING *",
            [name, mobile, email]
        ); res.redirect('/contact'); }
        
        // func.addContact(name,mobile,email)

        // Mengirimkan hasil yang baru dimasukkan ke klien
    catch (error) {
        throw error  
    }
        } else { let errorData = { errorMsg : error.array()}
        errorData.errorMsg[0].fields 
        res.render('addcontact3', errorData)} ;
})
// app.get ('/addcontact', async ( req, res)=> { 
//     // res.render ("addcontact3")
//     let addCont = await pool.query ( 
//         `INSERT INTO data_contact (name,mobile,email)
//         VALUES ($1, $2, $3) RETURNING *`,
//         [name, mobile, email]
//     )
//    res.json(addCont);
// })


// app.post ("/addcontact/add-data", async function (req,res) { 
//     try { 
//         let add = await func.addContact( req )
//         if ( add.ff)
//     }
// })


// app.post(`/addcontact/add-data`, async(req,res)=>{ 
//     const { name, mobile, email } = req.body; 
//     try {
//         // 2. kirim sebagai script SQL
//         await func.addContact( name,mobile,email )
//         res.redirect ('/contact')
//     } catch (error) {

//         //     // 3b. jika gagal, tampilkan pesan error
//             throw error
//         // }
//     }
// })

// -----------------delete contact----------------------------
app.get('/deletecontact/:id', async (req, res) => {
    const id = req.params.id; // Ambil nama dari URL
    // Gunakan fungsi deleteContact dari func.js
    const isDeleted = await pool.query ( "DELETE FROM data_contact WHERE id = $1 RETURNING *", 
        [id] )
    if (isDeleted) {
        res.redirect('/contact'); // Redirect ke halaman kontak setelah penghapusan
    } else {
        res.status(404).send('Kontak tidak ditemukan.');
    }
});

// -----------------------Update contact----------------------------

app.get('/editcontact/:id', async (req, res) => {
    const id = req.params.id; // Ambil parameter `name`
     

    // Baca data kontak dari database
    const update = await pool.query('SELECT * FROM data_contact WHERE id = $1',[id])
    // Cari kontak berdasarkan `name`
    
    res.render("editcontact2", {contact: update.rows[0]})
});

app.post('/editcontact/:id',addvalidation, async (req,res) => { 
    const { id } = req.params; // Nama lama sebagai identifier
    const { name, email, mobile } = req.body;
    const error = validationResult(req)
    if (error.isEmpty()) {
    try {
        const update = await pool.query(
            `UPDATE data_contact SET name = $1, mobile = $2, email = $3 WHERE id = $4 RETURNING *`,
            [name, mobile, email, id]
        ); res.redirect('/editcontact')
    } catch (error) {
        throw error;
    }
            } else { let errorData = { errorMsg : error.array()}
            errorData.errorMsg[0].fields 
            res.render('addcontact3', errorData)} ;
        })


