// CONTRIBUTOR: Asher Leong
const vld = require('./validator')

module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define('category', {
    categoryId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    categoryTitle: {
      type: Sequelize.STRING()
    }
  })

  //Public
  Category.createCategory = function (category) {
    if (category == null) {
      return null
    }
    delete category.categoryId

    if (isValidCategory(category, true)) {
      return category
    }
    return null
  }

  Category.updateCategory = function (category) {
    if (category == null) {
      return null
    }

    if (isValidCategory(category, false)) {
      return category
    }
    return null
  }

  //Private
  function isValidCategory (category, isNew) {
    if (
      (isNew && category.categoryId != null) ||
      (isNew && category.categoryTitle == null)
    ) {
      console.log('Quiz Error: 1')
      return false
    }

    if (
      !(
        vld.validType(category.categoryId, 'number') &&
        vld.validType(category.categoryTitle, 'string')
      )
    ) {
      console.log('Quiz Error: 2')
      return false
    }
    return true
  }

  return Category
}
