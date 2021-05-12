const request = require('request')

const options = {
  url: 'https://api.twitch.tv/kraken/games/top',
  headers: {
    Accept: 'application/vnd.twitchtv.v5+json',
    'Client-ID': 't1htgo2lktxwmd4zairobsgdptj9e6'
  }
}

function topGame(err, response, body) {
  let obj
  try {
    obj = JSON.parse(body)
  } catch (err) {
    console.log(err)
  }
  for (let i = 0; i < obj.top.length; i++) {
    console.log(`${obj.top[i].viewers} ${obj.top[i].game.name}`)
  }
}

request(options, topGame)
