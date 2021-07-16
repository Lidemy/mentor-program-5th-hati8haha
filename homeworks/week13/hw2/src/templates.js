export function getformTemplate(siteKey) {
  return `
  <div>
    <form class="add-comment-form">
        <div class="nickname-input">
          <label for="nicknameID" class="form-label">暱稱</label>
          <input type="text" class="form-control" name="nickname">
        </div>
      <div class="discussion">
        <label for="comment__textarea" class="form-label">留言內容</label>
        <textarea class="form-control" rows="3" name="content"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
`
}

export function cssTemplate() {
  return `
  .card {
    margin: 5px 0;
  }
  form > button {
    margin: 5px 0;
  }
  .hidden {
    display: none;
  }
`
}

export function getCommentTemplate(siteKey) {
  return `
  <div class="siteKey-${siteKey} container">
    <div class="siteKey-${siteKey} comments-area"></div>
    <div class="siteKey-${siteKey}-comments">
    </div>
    <button type="button" class="siteKey-${siteKey} load-more btn btn-outline-primary">載入更多</button>
  </div>
`
}
