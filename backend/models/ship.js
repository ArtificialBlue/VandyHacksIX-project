const mysql = require('mysql1');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : 'abc123',
    database: 'testmydb'
    });
connection.connect();
function query(sql, date = ''){
    connection.query(sql,date,function(err,res,fields){
        if(err){
            console.log(err);
        }else{
            const result = res;
            console.log(res);
        }
    });
    return result;
}