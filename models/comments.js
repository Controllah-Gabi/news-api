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
        
exports.insertComments = (comment,id) =>{
    const insertData = [comment.body,comment.author,id]
    return checkArticleExists(id)
    .then(()=>{
        return pool.query("INSERT INTO comments (body,author,article_id) VALUES($1,$2,$3) RETURNING *;",insertData)
    })
    .then(data=>{
            console.log("we here")
            return data.rows[0];
    })
    .catch(err=>{
        return Promise.reject({
            status: 404,
            msg: "Username does not exist"
        })
    })
}
