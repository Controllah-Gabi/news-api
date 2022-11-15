const pool = require("../db/connection")




exports.selectTopic = () =>{
    return pool.query('SELECT * FROM topics;').then((data)=>{
        return data.rows;
    })
}

