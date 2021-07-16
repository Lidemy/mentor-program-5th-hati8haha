import $ from 'jquery'
import bootstrap from './bootstrap-min.css'// eslint-disable-line
import normalize from './normalize.css'// eslint-disable-line

import { getComments, addComments } from './api'
import { appendCommentToDOM } from './utils'
import { getformTemplate, cssTemplate, getCommentTemplate } from './templates'

export function init(options) {
  let siteKey = ''
  let apiUrl = ''
  let containerElement = null
  let commentDOM = null
  let lastID = null

  siteKey = options.siteKey
  apiUrl = options.apiUrl
  const commentBlock = document.createElement('div')
  commentBlock.innerHTML = getCommentTemplate(siteKey)
  options.targetNode.append(commentBlock)

  containerElement = $(`.siteKey-${siteKey} ${options.containerSelector}`)
  commentDOM = $(`.siteKey-${siteKey}-comments`)
  containerElement.append(getformTemplate(siteKey))
  const styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  styleElement.appendChild(document.createTextNode(cssTemplate()))
  document.head.appendChild(styleElement)

  getComments(apiUrl, siteKey, lastID, (data) => {
    if (!data.ok) {
      alert(data.message)
      return
    }

    const comments = data.discussions
    for (const comment of comments) {
      appendCommentToDOM(commentDOM, comment, false)
      lastID = comment.id
    }
    if (lastID === 1) {
      $(`.siteKey-${siteKey} .load-more`).attr('class', 'hidden')
    }
  })

  $(`.siteKey-${siteKey} .add-comment-form`).submit((e) => {
    e.preventDefault()
    const newCommentData = {
      site_key: siteKey,
      nickname: $(`.siteKey-${siteKey} input[name=nickname]`).val(),
      content: $(`.siteKey-${siteKey} textarea[name=content]`).val()
    }
    addComments(apiUrl, siteKey, newCommentData, (data) => {
      if (!data.ok) {
        alert(data.message)
        return
      }
      appendCommentToDOM(commentDOM, newCommentData, true)
      $(`.siteKey-${siteKey} input[name=nickname]`).val('')
      $(`.siteKey-${siteKey} textarea[name=content]`).val('')
    })
  })

  $(`.siteKey-${siteKey} .load-more`).click(() => {
    getComments(apiUrl, siteKey, lastID, (data) => {
      if (!data.ok) {
        alert(data.message)
        return
      }

      const comments = data.discussions
      for (const comment of comments) {
        appendCommentToDOM(commentDOM, comment, false)
        lastID = comment.id
      }
      if (lastID === 1) {
        $(`.siteKey-${siteKey} .load-more`).attr('class', 'hidden')
      }
    })
  })
}
