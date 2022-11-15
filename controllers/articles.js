const {selectArticle} = require("../models/articles")

exports.getArticles = (req,res,next)=>{
    selectArticle().then((article)=>{
        res.status(200).send({articles: article})
    })
}