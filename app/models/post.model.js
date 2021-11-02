// CONTRIBUTOR: Asher Leong
const vld = require('./validator')

module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define('post', {
    postId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    postType: {
      type: Sequelize.INTEGER // 1 for question, 2 for answer
    },

    acceptedAnswerId: {
      type: Sequelize.INTEGER,
      defaultValue: null
    },

    threadId: {
      type: Sequelize.INTEGER
    },

    closedDate: {
      type: Sequelize.DATE,
      defaultValue: null
    },

    body: {
      type: Sequelize.STRING()
    },

    accountId: {
      type: Sequelize.INTEGER //id of poster
    },

    upVotes: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },

    downVotes: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  })

  Post.POST_TYPES_QUESTION = 1
  Post.POST_TYPES_ANSWER = 2

  //Public
  Post.createPost = function (post, accountId, threadId) {
    if (post == null) {
      return null
    }
    delete post.accountId
    delete post.threadId

    post.accountId = accountId
    post.threadId = threadId

    if (isValidPost(post, true)) {
      return post
    }
    return null
  }

  Post.updatePost = function (post) {
    if (post == null) {
      return null
    }

    if (isValidPost(post, false)) {
      return post
    }
    return null
  }

  //Private
  function isValidPost (post, isNew) {
    if (
      (isNew && post.postId != null) ||
      (isNew && post.accountId == null) ||
      (isNew && post.postType == null) ||
      (isNew && post.threadId == null)
    ) {
      console.log('Post Error: 1')
      return false
    }

    if (
      isNew &&
      (post.postType == null ||
        ![Post.POST_TYPES_QUESTION, Post.POST_TYPES_ANSWER].includes(
          post.postType
        ))
    ) {
      console.log('Post Error: 2')
      return false
    }

    if (
      !(
        vld.validType(post.postId, 'number') &&
        vld.validType(post.postType, 'number') &&
        vld.validType(post.title, 'string') &&
        vld.validType(post.acceptedAnswerId, 'number') &&
        vld.validType(post.threadId, 'number') &&
        vld.validType(post.closedDate, 'datetime') &&
        vld.validType(post.title, 'string') &&
        vld.validType(post.body, 'string') &&
        vld.validType(post.accountId, 'number') &&
        vld.validType(post.upVotes, 'number') &&
        vld.validType(post.upVotes, 'number')
      )
    ) {
      console.log('Post Error: 3')
      return false
    }
    return true
  }
  return Post
}
