const questionBlock = document.querySelectorAll('.question')

for (let i = 0; i < questionBlock.length; i++) {
  questionBlock[i].querySelector('.question__header').addEventListener('click', (e) => {
    questionBlock[i].querySelector('.question__answer').classList.toggle('question__answer__on')
  })
}
