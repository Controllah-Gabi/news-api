const {selectCommentsByID, insertComments} = require("../models/comments");

exports.getCommentsByID = (req,res,next)=>{
    selectCommentsByID(req.params.article_id).then(comment =>{
        res.status(200).send({comments: comment})
    }).catch((err)=>{
        next(err);
    })
}

exports.postComment = (req,res,next)=>{
    insertComments(req.body, req.params.article_id).then(comment=>{
        res.status(200).send({comment:comment})
    })
    .catch((err)=>{
        next(err);
    })
}