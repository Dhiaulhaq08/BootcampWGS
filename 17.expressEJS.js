const { name } = require('ejs');
const express = require('express')
const app = express()
const path = require('path');
const fs = require ('fs');

app.set("view engine", "ejs");

app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, 'views', 'index.html'));
    const name = "goku";
    res.render("index", {name})
})
app.get('/about', (req, res) => {
    // res.sendFile(path.join(__dirname, 'views', 'about.html'));
    
    res.render("about");
})
app.get('/contact', (req, res) => {
    // res.sendFile(path.join(__dirname, 'views', 'contact.html'));
    const cont = JSON.parse(fs.readFileSync("data/contacts.json", "utf-8"));//mengambil data dari json dan diparsing
    
    res.render("contact", {cont})//mengekspor data ke folder views/contact dan variabel cont
})


app.use((req,res)=> { 
    res.status(404).send("404 : Not found")
})

app.listen(3000, ()=> {
    console.log("server running on port 3000");
})