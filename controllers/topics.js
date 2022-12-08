const {selectTopic, selectArticlesByTopic} = require("../models/topics")

exports.getTopics = (req,res,next)=>{
    selectTopic().then((topic)=>{
        res.status(200).send({topic: topic})
    })
}

exports.getArticlesByTopic =(req,res,next)=>{
    const param = req.params.topic;
    selectArticlesByTopic(param).then((articles)=>{
        res.status(200).send({articles:articles})
    })
}