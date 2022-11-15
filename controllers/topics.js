const {selectTopic} = require("../models/topics")

exports.getTopics = (req,res,next)=>{
    selectTopic().then((topic)=>{
        res.status(200).send({topic: topic})
    })
}