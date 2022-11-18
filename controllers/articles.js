const {selectArticle,selectArticleByID, updateArticlesByArticleId} = require("../models/articles")

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

exports.patchArticleByArticleId = (req,res,next)=>{
    const {article_id} = req.params;
    const newVote = req.body.inc_votes;
    updateArticlesByArticleId(article_id, newVote).then((articles)=>{
        res.status(201).send({articles})
    })
    .catch((err)=>{
        next(err);
    })

}