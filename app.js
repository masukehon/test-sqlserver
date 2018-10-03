const express = require("express");
const json = require("body-parser");
var sql = require("mssql");

const app = express(); 
app.use(json());
app.set('view engine', 'ejs');

var config = {
    user: 'kha',
    password: '123456',
    server: 'CAOVINHKHA\\SQLEXPRESS',
    database: 'testSqlForNodejs',
    options: {
        encrypt: true, // Use this if you're on Windows Azure
    }
    
}; 



app.get('/', (req, res, next) => {
    sql.connect(config)
        .then(() =>{ let request = new sql.Request();
            return request.query('select * from Singer');
        })
        .then(result => res.render('index',{ singers: result.recordset }))
        .catch(error => console.log(error))
        .then(() => sql.close());
});

app.get('/add', (req, res, next) => res.render('add'));

app.post('/add', (req, res, next) => {
    const { name, age } = req.body;
    
    sql.connect(config)
        .then(() =>{ let request = new sql.Request();
            return request.query(`insert into Singer (name, age) values ('${name}', ${age})`);
        })
        .then(result => res.redirect('/'))
        .catch(error => console.log(error))
        .then(() => sql.close());
});


app.listen(3000, () => {
    console.log('Server started!!');
});