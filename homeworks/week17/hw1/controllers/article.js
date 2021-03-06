const db = require('../models')

const { Article } = db
const { User } = db
const { Category } = db

const articleController = {
  index: (req, res) => {
    res.redirect('/page/1')
  },

  manage: (req, res) => {
    Article.findAll({
      where: {
        isDeleted: false
      },
      include: [
        { model: Category },
        { model: User }
      ],
      order: [
        ['id', 'DESC']
      ]
    }).then((articles) => {
      res.render('manage', {
        username: req.session.username,
        articles
      })
    })
  },

  articlesByCategory: (req, res) => {
    const { id } = req.params
    Article.findAll({
      where: {
        isDeleted: false,
        CategoryId: id
      },
      include: [
        { model: Category },
        { model: User }
      ],
      order: [
        ['id', 'DESC']
      ]
    }).then((articles) => {
      res.render('manage', {
        username: req.session.username,
        articles
      })
    })
  },

  edit: (req, res, next) => {
    const { username } = req.session
    if (username && username.length > 0) {
      Category.findAll({
        where: {
          isDeleted: false
        }
      }).then((categories) => {
        res.render('edit', {
          update: false,
          username,
          errorMessage: req.flash('errorMessage'),
          id: null,
          title: null,
          categories,
          content: null
        })
      })
    } else {
      return next()
    }
  },

  update: (req, res, next) => {
    const { username } = req.session
    if (username && username.length > 0) {
      const { id } = req.params
      Article.findOne({
        where: {
          id
        },
        include: User
      }).then((article) => {
        const { title } = article.title
        const { content } = article.content
        const categoryId = article.CategoryId
        const author = article.User.username
        if (author === username) {
          Category.findAll({
            where: {
              isDeleted: false
            }
          }).then((categories) => {
            res.render('edit', {
              update: true,
              username,
              errorMessage: req.flash('errorMessage'),
              id,
              title,
              categories,
              categoryId,
              content
            })
          })
        }
      }).catch((err) => {
        req.flash('errorMessage', err.toString())
        console.log(err)
        return next()
      })
    } else {
      return next()
    }
  },

  article: (req, res) => {
    const { id } = req.params
    Article.findOne({
      where: {
        id,
        isDeleted: false
      },
      include: [
        { model: Category },
        { model: User }
      ]
    }).then((article) => {
      res.render('article', {
        id,
        username: req.session.username,
        article
      })
    })
  },

  handleEdit: (req, res, next) => {
    const { username } = req.session
    if (username && username.length > 0) {
      const { title, category, textarea } = req.body
      if (!title || !category || !textarea) {
        req.flash('errorMessage', '???...??????????????????')
        return next()
      }

      User.findOne({
        where: {
          username
        }
      }).then((user) => {
        if (user) {
          const { id: UserId } = user
          Article.create({
            title,
            UserId,
            CategoryId: category,
            content: textarea,
            isDeleted: false
          }).then(() => {
            res.redirect('/')
          }).catch((err2) => {
            req.flash('errorMessage', err2.toString())
            return next()
          })
        } else {
          req.flash('errorMessage', '??????')
          return next()
        }
      })
    } else {
      return next()
    }
  },

  handleUpdate: (req, res, next) => {
    const { username } = req.session
    if (username && username.length > 0) {
      const { id } = req.params
      const { title, category, textarea } = req.body
      if (!title || !category || !textarea) {
        req.flash('errorMessage', '???...??????????????????')
        return next()
      }

      Article.findOne({
        where: {
          id
        },
        include: User
      }).then((article) => {
        const author = article.User.username
        if (author === username) {
          return article.update({
            title,
            CategoryId: category,
            content: textarea
          })
        }
      }).catch((err) => {
        req.flash('errorMessage', err.toString())
        return next()
      })
    } else {
      return next()
    }
  },

  delete: (req, res, next) => {
    const { username } = req.session
    if (username && username.length > 0) {
      const { id } = req.params
      Article.findOne({
        where: {
          id
        },
        include: User
      }).then((article) => {
        const author = article.User.username
        if (author === username) {
          article.update({
            isDeleted: true
          }).then(() => next()
          ).catch((err) => {
            req.flash('errorMessage', err.toString())
            return next()
          })
        }
      })
    } else {
      return next()
    }
  },

  page: (req, res, next) => {
    const page = Number(req.params.page)
    const limit = 5
    const offset = (page - 1) * limit

    Article.findAll({
      where: {
        isDeleted: false
      },
      include: [
        { model: Category },
        { model: User }
      ],
      order: [
        ['id', 'DESC']
      ],
      offset,
      limit
    }).then((articles) => {
      if (articles.length === 0) {
        return next()
      }

      Article.count({
        where: {
          isDeleted: false
        }
      }).then((count) => {
        const totalPage = Math.ceil(count / limit)
        res.render('main', {
          username: req.session.username,
          articles,
          page,
          count,
          totalPage
        })
      })
    })
  }

}

module.exports = articleController
