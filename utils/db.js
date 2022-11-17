const pool = require("../db/connection")

exports.checkArticleExists = (article_id) => {
    if(isNaN(article_id)){
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

    exports.checkUserExists = (username) => {
        return pool.query(
            'SELECT * FROM articles WHERE author =$1',[username]).then((data)=>{
                if(data.rows.length === 0){
                    return Promise.reject({
                        status: 404,
                        msg: "Username does not exist"
                    })
                }
        });
        }