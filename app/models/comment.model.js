// CONTRIBUTOR: Asher Leong
const vld = require('./validator')

module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define('comment', {
    commentId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    postId: {
      type: Sequelize.INTEGER
    },

    body: {
      type: Sequelize.STRING()
    },

    accountId: {
      type: Sequelize.INTEGER //id of poster
    }
  })

  //Public
  Comment.createComment = function (comment, postId, accountId) {
    if (comment == null) {
      return null
    }
    delete comment.commentId
    delete comment.postId
    delete comment.accountId
    
    comment.postId = postId
    comment.accountId = accountId
    console.log(comment.postId, comment.accountId, postId, accountId)

    if (isValidComment(comment, true)) {
      return comment
    }
    return null
  }
  Comment.updateComment = function (comment, postId, accountId) {
    if (comment == null) {
      return null
    }
    delete comment.postId
    delete comment.accountId

    if (isValidComment(comment, false)) {
      return comment
    }
    return null
  }

  //Private
  function isValidComment (comment, isNew) {
    console.log(comment.postId, comment.body)
    if (
      (isNew && comment.postId == null) ||
      (isNew && comment.body == null)
    ) {
      console.log('Comment Error: 1')
      return false
    }
    if (
      !(
        vld.validType(comment.commentId, 'number') &&
        vld.validType(comment.postId, 'number') &&
        vld.validType(comment.body, 'string') &&
        vld.validType(comment.accountId, 'number')
      )
    ) {
      console.log('Comment Error: 2')
      return false
    }
    return true
  }
  return Comment
}
