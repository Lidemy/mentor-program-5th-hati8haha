export function escape(toOutput) {
  return toOutput.replace(/\&/g, '&amp;') // eslint-disable-line
    .replace(/\</g, '&lt;') // eslint-disable-line
    .replace(/\>/g, '&gt;') // eslint-disable-line
    .replace(/\"/g, '&quot;') // eslint-disable-line
    .replace(/\'/g, '&#x27') // eslint-disable-line
    .replace(/\//g, '&#x2F')
}

export function appendCommentToDOM(container, comment, isPrepend) {
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
