const {selectCommentsByID} = require("../models/comments");

exports.getCommentsByID = (req,res,next)=>{
    selectCommentsByID(req.params.article_id).then(comment =>{
        res.status(200).send({comments: comment})
    }).catch((err)=>{
        next(err);
    })
}