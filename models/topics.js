const pool = require("../db/connection")




exports.selectTopic = () =>{
    return pool.query('SELECT * FROM topics;').then((data)=>{
        console.log(data.rows)
        return data.rows;
    })
}

