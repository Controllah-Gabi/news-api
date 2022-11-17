const pool = require("../db/connection")

exports.checkArticleExists = (article_id) => {
    if(typeof article_id !== Number){
        return Promise.reject({
            status: 404,
            msg: "Invalid ID"
        })
    }
    return pool.query(
        'SELECT * FROM articles WHERE article_id =$1',[article_id]).then((data)=>{
            if(data.rows.length === 0){
                return Promise.reject({
                    status: 404,
                    msg: "Invalid ID"
                })
            }
    
    });
    }
