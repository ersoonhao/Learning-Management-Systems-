// CONTRIBUTOR: Asher Leong
const vld = require('./validator')

module.exports = (sequelize, Sequelize) => {
    const Thread = sequelize.define('thread', {
        threadId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        title: {
            type: Sequelize.STRING()
        },

        acceptedAnswerId: {
            type: Sequelize.INTEGER,
            defaultValue: null
        },

        accountId: {
            type: Sequelize.INTEGER //id of poster
        }
    })

    //Public
    Thread.createThread = function(thread, accountId) {
        if (thread == null) {
            return null
        }
        delete thread.threadId
        thread.accountId = accountId

        if (isValidThread(thread, true)) {
            return thread
        }
        return null
    }

    Thread.updateThread = function(thread) {
        if (thread == null) {
            return null
        }

        if (isValidThread(thread, false)) {
            return thread
        }
        return null
    }

    //Private
    function isValidThread(thread, isNew) {
        if (
            (isNew && thread.threadId != null) ||
            (isNew && thread.title == null) ||
            (!isNew && thread.accountId == null)
        ) {
            console.log('Thread Error: 1')
            return false
        }

        if (!(
                vld.validType(thread.threadId, 'number') &&
                vld.validType(thread.title, 'string') &&
                vld.validType(thread.acceptedAnswerId, 'number') &&
                vld.validType(thread.accountId, 'number')
            )) {
            console.log('Thread Error: 2')
            return false
        }
        return true
    }
    return Thread
}