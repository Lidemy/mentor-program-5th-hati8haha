function escape(toOutput) {
  return toOutput.replace(/\&/g, '&amp;') // eslint-disable-line
    .replace(/\</g, '&lt;') // eslint-disable-line
    .replace(/\>/g, '&gt;') // eslint-disable-line
    .replace(/\"/g, '&quot;') // eslint-disable-line
    .replace(/\'/g, '&#x27') // eslint-disable-line
    .replace(/\//g, '&#x2F')
}

function appendCommentToDOM(container, comment, isPrepend) {
  const html = `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${escape(comment.nickname)}</h5>
        <p class="card-text">${escape(comment.content)}</p>
      </div>
    </div>
    `
  if (isPrepend) {
    container.prepend(html)
  } else {
    container.append(html)
  }
}

$(document).ready(() => {
  const commentDOM = $('.comments')
  let lastID = null
  $.ajax({
    url: 'api_comments.php?site_key=a'
  }).done((data) => {
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
      $('.load-more').attr('class', 'hidden')
    }
  })

  $('.add-comment-form').submit((e) => {
    e.preventDefault()
    const newCommentData = {
      site_key: 'a',
      nickname: $('input[name=nickname]').val(),
      content: $('textarea[name=content]').val()
    }
    $.ajax({
      type: 'POST',
      url: 'api_add_comments.php',
      data: newCommentData
    }).done((data) => {
      if (!data.ok) {
        alert(data.message)
        return
      }
      appendCommentToDOM(commentDOM, newCommentData, true)
      $('input[name=nickname]').val('')
      $('textarea[name=content]').val('')
    })
  })

  $('.load-more').click(() => {
    $.ajax({
      url: `api_comments.php?site_key=a&from= + ${lastID}`
    }).done((data) => {
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
        $('.load-more').attr('class', 'hidden')
      }
    })
  })
})
