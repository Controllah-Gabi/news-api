const pool = require("../db/connection")

exports.selectArticle = () =>{
    return pool.query('SELECT * FROM articles;').then((data)=>{
        return data.rows;
    })
}

exports.selectArticleByID = (id)=>{
    pool.query('SELECT * FROM articles WHERE article_id =$1',[id]).then((data=>{
        return data.rows;
    }))
}