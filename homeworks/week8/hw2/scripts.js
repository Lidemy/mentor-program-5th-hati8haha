const gameRequest = new XMLHttpRequest()
const streamsRequest = new XMLHttpRequest()
const topGameList = []
let loadingTimes = 0

gameRequest.onload = () => {
  if (gameRequest.status >= 200 && gameRequest.status < 400) {
    const topGameObject = JSON.parse(gameRequest.responseText)
    for (let i = 0; i < 5; i++) {
      const gameElement = document.createElement('li')
      gameElement.className = 'game-name'
      gameElement.innerHTML = topGameObject.top[i].game.name
      document.querySelector('.navbar__list').appendChild(gameElement)
      topGameList.push(topGameObject.top[i].game.name)
    }
    document.querySelector('body').addEventListener('click', clickGame)
  } else {
    console.log('err')
  }
}

let clickGame = (e) => {
  if (e.target.className === 'game-name') {
    loadingTimes = 1
    const targetGame = e.target.innerHTML
    document.querySelector('.load-streams').className = 'load-streams hide'
    document.querySelector('.wrapper').className = 'wrapper'
    document.querySelector('.stream').innerHTML = '<div class="background">.</div>'
    document.querySelector('.content-head__description').className = 'content-head__description'
    searchStreams(targetGame)
    document.querySelector('.content-head__game').innerHTML = targetGame
  }
  if (e.target.className === 'load-button') {
    loadMoreStreams(document.querySelector('.content-head__game').innerHTML)
  }
}

let searchStreams = (game) => {
  streamsRequest.onload = () => {
    if (streamsRequest.status >= 200 && streamsRequest.status < 400) {
      const streamsObject = JSON.parse(streamsRequest.responseText)
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
      document.querySelector('.load-streams').className = 'load-streams'
    } else {
      console.log('err')
    }
  }

  streamsRequest.onerror = () => {
    console.log('error')
  }

  streamsRequest.open('GET', `https://api.twitch.tv/kraken/streams/?game=${encodeURIComponent(game)}&limit=20`, true)

  streamsRequest.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
  streamsRequest.setRequestHeader('Client-ID', 'blfg5kox20hzlyjf10u7h31q0sf4rk')

  streamsRequest.send()
}

let loadMoreStreams = (loadedGame) => {
  loadingTimes++
  streamsRequest.onload = () => {
    if (streamsRequest.status >= 200 && streamsRequest.status < 400) {
      const streamsObject = JSON.parse(streamsRequest.responseText)
      for (let i = 20 * (loadingTimes - 1); i < streamsObject.streams.length; i++) {
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
      document.querySelector('.load-streams').className = 'load-streams'
    } else {
      console.log('err')
      alert('沒有更多實況了')
    }
  }

  streamsRequest.onerror = () => {
    console.log('error')
  }

  streamsRequest.open('GET', `https://api.twitch.tv/kraken/streams/?game=${encodeURIComponent(loadedGame)}&limit=${20 * loadingTimes}`, true)

  streamsRequest.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
  streamsRequest.setRequestHeader('Client-ID', 'blfg5kox20hzlyjf10u7h31q0sf4rk')

  streamsRequest.send()
}

gameRequest.onerror = () => {
  console.log('error')
}

gameRequest.open('GET', 'https://api.twitch.tv/kraken/games/top?limit=5', true)

gameRequest.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
gameRequest.setRequestHeader('Client-ID', 'blfg5kox20hzlyjf10u7h31q0sf4rk')

gameRequest.send()
