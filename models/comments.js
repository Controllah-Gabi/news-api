const pool = require("../db/connection")

exports.selectCommentsByID = (id) =>{
    return pool.query('SELECT * FROM comments WHERE article_id =$1 ORDER BY created_at',[id]).then((data)=>{
        if(data.rows.length === 0){
            return Promise.reject({
                status: 404,
                msg: "Invalid ID"
            })
        }
        return data.rows;
    })
}