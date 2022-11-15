const {selectArticle,selectArticleByID} = require("../models/articles")

exports.getArticles = (req,res,next)=>{
    selectArticle().then((article)=>{
        res.status(200).send({articles: article})
    })
}

exports.getArticleByID = (req,res,next) =>{
    selectArticleByID(req.params).then(data=>{
        res.status(200).send({article: data})
    })
}