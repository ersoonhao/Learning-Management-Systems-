const { Post, Comment, Thread } = require('../models')

//==== Post: /getThread
exports.getThread = (req, res) => {
  let body = req.body
  if (!body) {
    res.status(400).send({
      message: 'Request body is empty!'
    })
    return
  }
  //Access control
  //TODO: Get permissions

  let threadId = body.threadId
  if (threadId == null) {
    res.status(400).send({
      message: 'Invalid data format'
    })
    return
  }

  //Get post data
  Post.findAll({
    where: {
      threadId: threadId
    },
    include: [{ model: Comment }]
  }).then(data => {
    res.send({ post: data })
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
        message:
          err.message ||
          'Some errors occured while retrieving available threads'
      })
    })
}

//==== POST: /createPost
exports.createThread = (req, res) => {
  let body = req.body
  if (!body) {
    res.status(400).send({
      message: 'Request body is empty!'
    })
    return
  }
  //Access control
  //TODO: Get permissions
  const thread = Thread.createThread(body.thread, body.accountId)

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
      const post = Post.createPost(body.post, body.accountId, threadId)
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
            "accountId": 1
        }
    */
}

//==== POST: /createAnswer
exports.createAnswer = (req, res) => {
  let body = req.body
  if (!body) {
    res.status(400).send({
      message: 'Request body is empty!'
    })
    return
  }
  //Access control
  //TODO: Get permissions

  //Init post
  const post = Post.createPost(body.post, body.accountId, body.threadId)
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

//==== POST: /updatePost
exports.updatePost = (req, res) => {
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
  /* SAMPLE JSON BODY REQUEST
          {
              "postId": 1
          }
      */
}

//=== POST: /addComment
exports.addComment = (req, res) => {
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
    body.accountId
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

  /* SAMPLE JSON BODY REQUEST
        {
            "comment": {
                "commentId": 1,
                "body": "This is a comment",
            }, 
            "postId": 1,
            "accountId":1
        }
    */
}
//==== POST: /updateComment
exports.updateComment = (req, res) => {
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

  /* SAMPLE JSON BODY REQUEST
        {
            "comment": {
                "commentId": 1,
                "body": "This is an updated comment",
            }, 
            "postId": 1,
            "accountId":1
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
