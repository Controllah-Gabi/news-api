const {selectArticle,selectArticleByID,selectCommentsByID} = require("../models/articles")

exports.getArticles = (req,res,next)=>{
    selectArticle().then((article)=>{
        res.status(200).send({articles: article})
    })
}

exports.getArticleByID = (req,res,next) =>{
    selectArticleByID(req.params.article_id).then((data)=>{
        res.status(200).send({article: data})
    })
    .catch((err)=>{
        next(err);
    })
}

exports.getCommentsByID = (req,res,next)=>{
    selectCommentsByID(req.params.article_id).then(comment =>{
    })
}