const pool = require("../db/connection")

exports.selectTopic = () =>{
    return pool.query('SELECT * FROM topics;').then((data)=>{
        return data.rows;
    })
}

exports.selectArticlesByTopic = (topic) =>{
    return pool.query('SELECT * FROM articles WHERE topic=$1;',[topic]).then((data)=>{
        return data.rows;
    })
  }