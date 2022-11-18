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
        res.status(200).send({comment:{
            body: comment.body,
            article_id: comment.article_id,
            username: comment.author,
            comment_id: comment.comment_id,
            created_at: comment.created_at}
        }
    )
})
.catch((err)=>{
next(err);
})
}