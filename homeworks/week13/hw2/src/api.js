import $ from 'jquery'

export function getComments(apiUrl, siteKey, fromId, cb) {
  let url = `${apiUrl}/api_comments.php?site_key=${siteKey}`
  if (fromId) {
    url += `&from=${fromId}`
  }
  $.ajax({
    url
  }).done((data) => {
    cb(data)
  })
}

export function addComments(apiUrl, siteKey, data, cb) {
  const url = `${apiUrl}/api_add_comments.php`
  $.ajax({
    type: 'POST',
    url,
    data
  }).done((data) => {
    cb(data)
  })
}
