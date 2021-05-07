const request = require('request')
const process = require('process')

const args = process.argv

function main() {
  switch (args[2]) {
    case 'list':
      listBook()
      break
    case 'read':
      readBook(args[3])
      break
    case 'delete':
      deleteBook(args[3])
      break
    case 'create':
      createBook(args[3])
      break
    case 'update':
      updateBook(args[3], args[4])
      break
    default:
      console.log('list, read, delete, create, update')
  }
}

main()

function listBook() {
  request(
    'https://lidemy-book-store.herokuapp.com/books?_limit=20',
    (err, response, body) => {
      if (err) {
        return console.log('抓取失敗', err)
      }
      let obj = {}
      try {
        obj = JSON.parse(body)
      } catch (err) {
        console.log(err)
      }
      for (let i = 0; i < obj.length; i++) {
        console.log(`${obj[i].id} ${obj[i].name}`)
      }
    }
  )
}

function readBook(id) {
  request(
    'https://lidemy-book-store.herokuapp.com/books',
    (err, response, body) => {
      if (err) {
        return console.log('抓取失敗', err)
      }
      const obj = JSON.parse(body)
      for (let i = 0; i < obj.length; i++) {
        if (String(obj[i].id) === id) {
          return console.log(obj[i])
        }
      }
    }
  )
}

function deleteBook(id) {
  request.del(
    `https://lidemy-book-store.herokuapp.com/books/${id}`,
    (err, response, body) => {
      if (err) {
        return console.log('upload failed', err)
      }
      if (body === '{}') {
        console.log('刪除成功！')
      }
    }
  )
}

function createBook(bookName) {
  const data = {
    name: bookName
  }
  request.post(
    'https://lidemy-book-store.herokuapp.com/books',
    { form: data },
    (err, response, body) => {
      if (err) {
        return console.log('upload failed', err)
      }
      console.log('已新增書籍：', '\n', body)
    }
  )
}

function updateBook(id, newBookName) {
  const newName = { name: newBookName }
  request.patch(
    `https://lidemy-book-store.herokuapp.com/books/${id}`,
    { form: newName },
    (err, response, body) => {
      if (err) {
        return console.log('upload failed', err)
      }
      console.log('已修改書籍名稱：', '\n', body)
    }
  )
}
