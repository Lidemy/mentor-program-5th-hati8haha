const request = require('request')
const process = require('process')

const args = process.argv

function main(name) {
  request(
    `https://restcountries.eu/rest/v2/name/${name}`,
    (err, response, body) => {
      let obj = {}
      try {
        obj = JSON.parse(body)
      } catch (err) {
        console.log(err)
      }
      if (obj.status === 404) {
        console.log('找不到國家資訊')
        return
      }
      for (let i = 0; i < obj.length; i++) {
        console.log(
          '============',
          '\n', `國家：${obj[i].name}`,
          '\n', `首都：${obj[i].capital}`,
          '\n', `貨幣：${obj[i].currencies[0].code}`,
          '\n', `國碼：${obj[i].callingCodes}`)
      }
    }
  )
}

main(args[2])
