const request = new XMLHttpRequest()
const lotteryBlock = document.querySelector('.lottery')
const lotteryBoxInfo = document.querySelector('.lottery__page')
const lotteryButton = document.querySelector('.lottery__button')
const prizeDiv = document.createElement('div')
prizeDiv.className = 'get-prize'
request.onload = () => {
  if (request.status >= 200 && request.status < 400) {
    const prizeObject = JSON.parse(request.responseText)
    if (prizeDiv.className !== 'get-prize') {
      prizeDiv.className = 'get-prize'
    }
    if (lotteryBlock.className !== 'lottery') {
      lotteryBlock.className = 'lottery'
    }
    if (document.querySelector('.lottery__box').className !== 'lottery__box') {
      document.querySelector('.lottery__box').className = 'lottery__box'
    }
    switch (prizeObject.prize) {
      case 'FIRST':
        lotteryBlock.classList.add('prize1')
        document.querySelector('.lottery__box').classList.add('prize__page')
        prizeDiv.innerHTML = '恭喜你中頭獎了！日本東京來回雙人遊！'
        lotteryButton.parentNode.insertBefore(prizeDiv, lotteryButton)
        lotteryBoxInfo.classList.add('onprize')
        break
      case 'SECOND':
        lotteryBlock.classList.add('prize2')
        document.querySelector('.lottery__box').classList.add('prize__page')
        prizeDiv.innerHTML = '二獎！90 吋電視一台！'
        lotteryButton.parentNode.insertBefore(prizeDiv, lotteryButton)
        lotteryBoxInfo.classList.add('onprize')
        break
      case 'THIRD':
        lotteryBlock.classList.add('prize3')
        document.querySelector('.lottery__box').classList.add('prize__page')
        prizeDiv.innerHTML = '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！'
        lotteryButton.parentNode.insertBefore(prizeDiv, lotteryButton)
        lotteryBoxInfo.classList.add('onprize')
        break
      case 'NONE':
        lotteryBlock.classList.add('prize4')
        document.querySelector('.lottery__box').classList.add('prize__page')
        prizeDiv.classList.add('no-prize')
        prizeDiv.innerHTML = '銘謝惠顧'
        lotteryButton.parentNode.insertBefore(prizeDiv, lotteryButton)
        lotteryBoxInfo.classList.add('onprize')
        break
      default :
        alert('系統不穩定，請再試一次')
        break
    }
  } else {
    console.log('err')
    alert('系統不穩定，請再試一次')
  }
}

request.onerror = () => {
  console.log('error')
}

const onclick = (e) => {
  if (lotteryBlock.className !== 'lottery') {
    lotteryBlock.className = 'lottery'
    lotteryBoxInfo.className = 'lottery__page'
    document.querySelector('.lottery__box').className = 'lottery__box'
    lotteryButton.parentNode.removeChild(prizeDiv)
  } else {
    request.open('GET', 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery', true)
    request.send()
  }
}

lotteryButton.addEventListener('click', onclick)
