const db = require('../models')

const { Category } = db

const categoryController = {
  getAll: (req, res) => {
    Category.findAll({
      where: {
        isDeleted: false
      }
    }).then((categories) => {
      res.render('category', {
        username: req.session.username,
        errorMessage: req.flash('errorMessage'),
        categories
      })
    })
  },

  add: (req, res, next) => {
    const { username } = req.session
    if (username && username.length > 0) {
      const { category } = req.body
      if (!category) {
        req.flash('errorMessage', '啊...有東西沒填喔')
        return next()
      }

      Category.create({
        name: category,
        isDeleted: false
      }).then(() => next()
      ).catch((err) => {
        req.flash('errorMessage', err.toString())
        return next()
      })
    } else {
      return next()
    }
  },

  categoryList: (req, res) => {
    Category.findAll({
      where: {
        isDeleted: false
      }
    }).then((categories) => {
      res.render('/category', {
        categories
      })
    })
  },

  delete: (req, res, next) => {
    const { username } = req.session
    if (username && username.length > 0) {
      const { id } = req.params
      Category.findOne({
        where: {
          id
        }
      }).then((category) => {
        category.update({
          isDeleted: true
        }).then(() => {
          Category.findAll({
            where: {
              isDeleted: false
            }
          }).then((categories) => {
            res.render('category', {
              username: req.session.username,
              errorMessage: req.flash('errorMessage'),
              categories
            })
          })
        })
      }).catch((err) => {
        req.flash('errorMessage', err.toString())
        return next()
      })
    } else {
      return next()
    }
  }
}

module.exports = categoryController
