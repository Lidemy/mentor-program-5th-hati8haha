const requestHeader = {
  Accept: 'application/vnd.twitchtv.v5+json',
  'Client-ID': 'blfg5kox20hzlyjf10u7h31q0sf4rk'
}
const gamesApiUrl = 'https://api.twitch.tv/kraken/games/top?limit=5'
const streamsApiUrl = 'https://api.twitch.tv/kraken/streams/?game='
const topGameList = []

getGames()

async function getGames() {
  try {
    const topGameObject = await getApiData(gamesApiUrl, requestHeader)
    for (let i = 0; i < 5; i++) {
      const gameElement = document.createElement('li')
      gameElement.className = 'game-name'
      gameElement.innerHTML = topGameObject.top[i].game.name
      document.querySelector('.navbar__list').appendChild(gameElement)
      topGameList.push(topGameObject.top[i].game.name)
    }
    document.querySelector('body').addEventListener('click', clickGame)
  } catch (err) {
    console.log(err)
  }
}

async function getStreams(gameName) {
  let targetGameUrl = streamsApiUrl
  try {
    targetGameUrl += `${encodeURIComponent(gameName)}&limit=20`
    const streamsObject = await getApiData(targetGameUrl, requestHeader)
    for (let i = 0; i < streamsObject.streams.length; i++) {
      const streamPreview = streamsObject.streams[i].preview.medium
      const streamStatus = streamsObject.streams[i].channel.status
      const streamAvatar = streamsObject.streams[i].channel.logo
      const streamName = streamsObject.streams[i].channel.name
      const streamViewers = streamsObject.streams[i].viewers
      const streamBlock = document.createElement('div')
      streamBlock.className = 'stream-block'
      streamBlock.onclick = () => {
        window.open(streamsObject.streams[i].channel.url, '_newtab')
      }
      streamBlock.innerHTML = `
        <img src="${streamPreview}" alt="無法顯示這張圖片" />
        <div class="stream__info">
          <div class="stream__avatar"><img src="${streamAvatar}" alt=": )" /></div>
          <div class="stream__info-text">
            <div class="stream__info-status">${streamStatus}</div>
            <div class="stream__info-bottom">
              <div class="stream__info-name">${streamName}</div>
              <div class="stream__info-viewers">viewers:${streamViewers}</div>
            </div>
          </div>
        </div>
        `
      document.querySelector('.wrapper').className = 'wrapper on'
      document.querySelector('.stream').appendChild(streamBlock)
    }
    for (let i = 0; i < 5; i++) {
      const emptyStreamBlock = document.createElement('div')
      emptyStreamBlock.className = 'empty-stream-block'
      emptyStreamBlock.innerHTML = ''
      document.querySelector('.stream').appendChild(emptyStreamBlock)
    }
  } catch (err) {
    console.log(err)
  }
}

async function getApiData(apiUrl, apiHeader) {
  try {
    const response = await fetch(apiUrl, {
      headers: new Headers(apiHeader)
    })
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

const clickGame = (e) => {
  if (e.target.className === 'game-name') {
    const targetGame = e.target.innerHTML
    document.querySelector('.wrapper').className = 'wrapper'
    document.querySelector('.stream').innerHTML = '<div class="background">.</div>'
    document.querySelector('.content-head__description').className = 'content-head__description'
    getStreams(targetGame)
    document.querySelector('.content-head__game').innerHTML = targetGame
  }
}
