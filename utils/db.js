const pool = require("../db/connection")

exports.checkArticleExists = (article_id) => {
    return pool.query(
        'SELECT * FROM comments WHERE article_id =$1',[article_id]).then((data)=>{
            if(data.rows.length === 0){
                return Promise.reject({
                    status: 404,
                    msg: "Invalid ID"
                })
            }
    
    });
    }
