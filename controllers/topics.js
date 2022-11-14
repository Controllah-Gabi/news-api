const {selectTopic} = require("../models/topics")

exports.getTopics = (req,res,next)=>{
    selectTopics().then((data)=>{
        
    })
}