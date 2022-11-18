const pool = require("../db/connection")

exports.selectArticle = () =>{
    return pool.query('SELECT * FROM articles;').then((data)=>{
        return data.rows;
    })
}

exports.selectArticleByID = (id)=>{
    return pool.query('SELECT * FROM articles WHERE article_id =$1',[id]).then((data=>{
        if (data.rows.length === 0) {
            return Promise.reject({
              status: 404,
              msg: "Invalid ID",
            });
          }
        return data.rows;
    }))
}

exports.updateArticlesByArticleId = (id,increment) =>{
    return pool.query("UPDATE articles SET votes = votes + $1 WHERE article_id=$2 RETURNING *;",[increment,id])
    .then(data=>{
        if (data.rows.length === 0) {
            return Promise.reject({
              status: 404,
              msg: "Invalid ID",
            });
          }
        return data.rows[0]
    })
}

