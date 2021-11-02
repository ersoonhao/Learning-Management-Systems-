const { Post, Comment, Thread } = require('../models')
const AccountController = require('./account.controller')

//==== Post: /getThread
exports.getThread = (req, res) => {
    const threadId = req.params.threadId
        //Access control
        //TODO: Get permissions

    if (threadId == null) {
        res.status(400).send({
            message: 'Invalid data format'
        })
        return
    }

    //Get post data
    Thread.findOne({
        where: {
            threadId: threadId
        },
        include: [{ model: Post, include: { model: Comment } }]
    }).then(data => {
        res.send({ thread: data })
    })
}

//==== Get: /getAllThreads
exports.getAllThreads = (req, res) => {
    Thread.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message ||
                    'Some errors occured while retrieving available threads'
            })
        })
}

//==== Get: /getAllThreads
exports.getAllUnansweredThreads = (req, res) => {
    Thread.findAll({
            where: {
                acceptedAnswerId: null
            }
        })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message ||
                    'Some errors occured while retrieving available threads'
            })
        })
}

//==== POST: /createPost
exports.createThread = (req, res) => {
    const permissions = []
    AccountController.validAuthNAccess(req, res, permissions).then(session => {
        //Access control
        if (session) {
            let body = req.body
            if (!body) {
                res.status(400).send({
                    message: 'Request body is empty!'
                })
                return
            }
            //Access control
            //TODO: Get permissions
            const thread = Thread.createThread(body.thread, session.accountId)

            if (thread == null) {
                res.status(400).send({
                    message: 'Invalid data format'
                })
                return
            }

            //Write to DB
            Thread.create(thread)
                .then(data => {
                    //res.send({ thread: data })
                    const threadId = data.threadId

                    //Init post
                    const post = Post.createPost(body.post, session.accountId, threadId)
                    if (post == null) {
                        res.status(400).send({
                            message: 'Invalid data format post'
                        })
                        return
                    }

                    //Write to DB
                    Post.create(post)
                        .then(data => {
                            res.send({ post: data })
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: err.message || 'Some error occured while creating'
                            })
                        })
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || 'Some error occured while creating'
                    })
                })
        }
    })

    /* SAMPLE JSON BODY REQUEST
                {      
                    "thread": {
                        "title": "Test Title"
                    },
                    "post": {
                        "postType": 1,
                        "acceptedAnswerId": null,
                        "closedDate": null,
                        "threadID": 1,
                        "body": "This is my question",
                        "upVotes": 0,
                        "downVotes": 0
                    }, 
                    "session": {
                        "username": "robin",
                        "sessionId": "0q8l8"
                    }
                }
            */
}

//==== POST: /createAnswer
exports.createAnswer = (req, res) => {
    const permissions = []
    AccountController.validAuthNAccess(req, res, permissions).then(session => {
        //Access control
        if (session) {
            let body = req.body
            if (!body) {
                res.status(400).send({
                    message: 'Request body is empty!'
                })
                return
            }
            //Access control
            //TODO: Get permissions
            console.log('ID: ' + session.accountId)

            //Init post
            const post = Post.createPost(body.post, session.accountId, body.threadId)
            if (post == null) {
                res.status(400).send({
                    message: 'Invalid data format'
                })
                return
            }

            //Write to DB
            Post.create(post)
                .then(data => {
                    res.send({ post: data })
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || 'Some error occured while creating'
                    })
                })
        }
    })
}

//==== POST: /checkOwnership
exports.checkOwnership = (req, res) => {
    const permissions = []
    AccountController.validAuthNAccess(req, res, permissions).then(session => {
        //Access control
        if (session) {
            let body = req.body
            if (!body) {
                res.status(400).send({
                    message: 'Request body is empty!'
                })
                return
            }
            //Access control
            //TODO: Get permissions
            console.log('ID: ' + session.accountId)

            //Init post

            if (body.ownerId == session.accountId) {
                res.send({
                    isOwner: true
                })
            } else {
                res.send({
                    isOwner: false
                })
            }
        }
    })
}

//==== POST: /updateThread
exports.updateThread = (req, res) => {
    const permissions = []
    AccountController.validAuthNAccess(req, res, permissions).then(session => {
        //Access control
        if (session) {
            let body = req.body
            if (!body) {
                res.status(400).send({
                    message: 'Request body is empty!'
                })
                return
            }
            //Access control
            //TODO: Get permissions

            //Init quiz
            const thread = Thread.updateThread(body.thread)
            if (thread == null) {
                res.status(400).send({
                    message: 'Invalid thread data format'
                })
                return
            }
            console.log(`Updating: ${thread}`)

            //Update DB
            let id = thread.threadId

            Thread.update(thread, {
                    where: { threadId: id }
                })
                .then(num => {
                    if (num == 1) {
                        res.send({
                            message: 'Successfully updated.'
                        })
                    } else {
                        res.send({
                            message: `Cannot update with id=${id}.`
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).send({
                        message: 'Error updating with id=' + id
                    })
                })
        }
    })

    /* SAMPLE JSON BODY REQUEST
                {
                    "thread": {
                        "threadId": 1,
                        "acceptedAnswerId": 1,                 
                    }, 
                    "session": {
                      "username": "robin",
                      "sessionId": "0q8l8"
                  }
                }
            */
}

//==== POST: /updatePost
exports.updatePost = (req, res) => {
    const permissions = []
    AccountController.validAuthNAccess(req, res, permissions).then(session => {
        //Access control
        if (session) {
            let body = req.body
            if (!body) {
                res.status(400).send({
                    message: 'Request body is empty!'
                })
                return
            }
            //Access control
            //TODO: Get permissions

            //Init quiz
            const post = Post.updatePost(body.post)
            if (post == null) {
                res.status(400).send({
                    message: 'Invalid post data format'
                })
                return
            }
            console.log(`Updating: ${post}`)

            //Update DB
            let id = post.postId

            Post.update(post, {
                    where: { postId: id }
                })
                .then(num => {
                    if (num == 1) {
                        res.send({
                            message: 'Successfully updated.'
                        })
                    } else {
                        res.send({
                            message: `Cannot update with id=${id}.`
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).send({
                        message: 'Error updating with id=' + id
                    })
                })
        }
    })

    /* SAMPLE JSON BODY REQUEST
                {
                    "post": {
                        "postType": 1,
                        "acceptedAnswerId": null,
                        "parentID": 1,
                        "closedDate": null,
                        "title": "Test Title",
                        "body": "This is my question",
                        "upVotes": 10,
                        "downVotes": 1
                        
                    }, 
                }
            */
}

//==== POST: /deletePost
exports.deletePost = (req, res) => {
    const permissions = []
    AccountController.validAuthNAccess(req, res, permissions).then(session => {
        //Access control
        if (session) {
            let body = req.body
            if (!body) {
                res.status(400).send({
                    message: 'Request body is empty!'
                })
                return
            }
            //Access control
            //TODO: Get permissions

            let id = body.postId
            if (id == null) {
                res.status(400).send({
                    message: 'Invalid data format'
                })
                return
            }

            Post.destroy({
                    where: { postId: id }
                })
                .then(num => {
                    if (num == 1) {
                        res.send({
                            message: 'Deleted successfully!'
                        })
                    } else {
                        res.send({
                            message: `id=${id} has already been deleted.`
                        })
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: 'Could not delete with id=' + id
                    })
                })
        }
    })

    /* SAMPLE JSON BODY REQUEST
                {
                    "postId": 1
                }
            */
}

//=== POST: /addComment
exports.addComment = (req, res) => {
        const permissions = []
        AccountController.validAuthNAccess(req, res, permissions).then(session => {
            //Access control
            if (session) {
                let body = req.body
                if (!body) {
                    res.status(400).send({
                        message: 'Request body is empty!'
                    })
                    return
                }
                //Access control
                //TODO: Get permissions

                //Init
                const comment = Comment.createComment(
                    body.comment,
                    body.postId,
                    session.accountId
                )
                if (comment == null) {
                    res.status(400).send({
                        message: 'Invalid data format'
                    })
                    return
                }

                //Write to DB
                Comment.create(comment)
                    .then(data => {
                        res.send({ comment: data })
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || 'Some error occured while creating'
                        })
                    })
            }
        })

        /* SAMPLE JSON BODY REQUEST
                                    {
                                        "comment": {
                                            "commentId": 1,
                                            "body": "This is a comment",
                                        }, 
                                        "postId": 1,
                                        "session": {
                                            "username": "robin",
                                            "sessionId": "0q8l8"
                                        }
                                    }
                                */
    }
    //==== POST: /updateComment
exports.updateComment = (req, res) => {
    const permissions = []
    AccountController.validAuthNAccess(req, res, permissions).then(session => {
        //Access control
        if (session) {
            let body = req.body
            if (!body) {
                res.status(400).send({
                    message: 'Request body is empty!'
                })
                return
            }
            //Access control
            //TODO: Get permissions

            //Init
            const comment = Comment.updateComment(body.comment)
            if (comment == null) {
                res.status(400).send({
                    message: 'Invalid data format'
                })
                return
            }
            console.log(`Updating: ${comment}`)

            //Update DB
            let id = comment.commentId

            Comment.update(comment, {
                    where: { commentId: id }
                })
                .then(num => {
                    if (num == 1) {
                        res.send({
                            message: 'Successfully updated.'
                        })
                    } else {
                        res.send({
                            message: `Cannot update with id=${id}.`
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).send({
                        message: 'Error updating with id=' + id
                    })
                })
        }
    })

    /* SAMPLE JSON BODY REQUEST
                {
                    "comment": {
                        "commentId": 1,
                        "body": "This is an updated comment",
                    }, 
                    "postId": 1,
                    "session": {
                        "username": "robin",
                        "sessionId": "0q8l8"
                    }
                }
            */
}

//==== POST: /deleteComment
exports.deleteComment = (req, res) => {
    let body = req.body
    if (!body) {
        res.status(400).send({
            message: 'Request body is empty!'
        })
        return
    }
    //Access control
    //TODO: Get permissions

    let id = body.commentId
    if (id == null) {
        res.status(400).send({
            message: 'Invalid data format'
        })
        return
    }

    Comment.destroy({
            where: { commentId: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Deleted successfully!'
                })
            } else {
                res.send({
                    message: `id=${id} has already been deleted.`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Could not delete with id=' + id
            })
        })
        /* SAMPLE JSON BODY REQUEST
                                          {
                                              "commentId": 1
                                          }
                                      */
}

/* exports.getQuizPackage = (req, res) => {
    const permissions = []
    AccountController.validAuthNAccess(req, res, permissions).then(session => { //Access control
        if (session) {}
    })
} */