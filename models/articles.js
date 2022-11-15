const pool = require("../db/connection")

exports.selectArticle = () =>{
    return pool.query('SELECT * FROM articles;').then((data)=>{
        return data.rows;
    })
}