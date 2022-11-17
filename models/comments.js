const pool = require("../db/connection");
const { checkArticleExists } = require("../utils/db");

exports.selectCommentsByID = (id) =>{
    return checkArticleExists(id)
    .then(()=>{
        return pool.query('SELECT * FROM comments WHERE article_id =$1 ORDER BY created_at',[id])
    })
    .then((res)=>{
        return res.rows;
    })
};
        
   
