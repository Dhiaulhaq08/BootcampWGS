const Pool = require("pg").Pool
const express = require("express")
const app = express();
const pool = require("./com/databasePG")
const port = 3000;


// ------show data------------
// function contact() { 
//     return new Promise((resolve, reject) => { 
//         let list = `SELECT * FROM data_contact`;
//         pool.query(list,function(errorSql,hasil) { 
//             if (errorSql) { 
//                 reject (errorSql)
//             } else { resolve (hasil)}
//         })
//     })
// }
async function contact() {
    try {
        const result = await pool.query('SELECT * FROM data_contact');
        return result.rows; // Mengembalikan array hasil query
    } catch (error) {
        throw error; // Menangani error
    }
}

// -------detail kontak-----
function detailContact (idcontct) { 
    return new Promise( (resolve,reject) => { 
        let detail = 'SELECT * FROM data_contact WHERE id = $1';
        pool.query(detail,[idcontct],function(errorSql,hasil) { 
            if (errorSql) { 
                reject (errorSql)
            } else { resolve (hasil)}
            
               })}
        )}

// ------------ add contact ----------------


    // return new Promise ( (resolve, reject) => { 
    //     let addCont = 
    //     `INSERT INTO data_contact (name,mobile,email)
    //     VALUES (?,?,?)`

    //     let dataContact = {
    //         name : req.body.name,
    //         mobile : req.body.mobile,
    //         email : req.body.email
    //      }

    //     pool.query (addCont, dataContact, function(errorSql, hasil) { 
    //         if (errorSql) { 
    //             reject  (errorSql) 
    //         } else { 
    //             resolve (hasil)
    //         }
    //     })
    // })
    async function addContact ( name, mobile,email ) { 
    try { 
       
        const newCont =
            "INSERT INTO data_contact (name,mobile,email) VALUES (?,?,?)"
             
        let data = { 
            name : req.body.name,
            mobile : req.body.mobile,
            email : req.body.email
        }
    pool.query ( newCont,data, function(errorSql, hasil) { 
        if (errorSql) { 
            reject (errorSql)
        } else { 
            resolve ( hasil)
        }
    })
 
    }catch (err) { 
        console.error(err.message)
    }
};






// function addContact (name,mobile,email) {
// const name = "goku"
// const mobile = "081123123123"
// const email = "goku@gmail.com"
// };

module.exports = {
    addContact,
    detailContact,
    contact,
}