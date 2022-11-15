const {selectTopic} = require("../models/topics")

exports.getTopics = (req,res,next)=>{
    selectTopic().then((topic)=>{
        console.log(topic)
        res.status(200).send({topic: topic})
    })
}