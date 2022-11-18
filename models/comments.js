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
            return data.rows[0];
    })
    .catch(err=>{
        if(err.status !== undefined && err.msg !== undefined){
            return Promise.reject({
                status: err.status,
                msg: err.msg
            }) 
        }
        if (err.code === "23502"){
            return Promise.reject({
                status: 404,
                msg: "Missing field"
            })
        }
        return Promise.reject({
            status: 404,
            msg: "Username does not exist"
        })
    })
}
