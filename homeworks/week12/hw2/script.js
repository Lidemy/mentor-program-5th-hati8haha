function escape(toOutput) {
  return toOutput.replace(/\&/g, '&amp;') // eslint-disable-line
    .replace(/\</g, '&lt;') // eslint-disable-line
    .replace(/\>/g, '&gt;') // eslint-disable-line
    .replace(/\"/g, '&quot;') // eslint-disable-line
    .replace(/\'/g, '&#x27') // eslint-disable-line
    .replace(/\//g, '&#x2F')
}

function appendTodosToDOM(container, todos, isPrepend) {
  const html = `
    <label class="list-group-item d-flex align-items-center justify-content-between todos-item todos-active">
      <div>
        <input class="form-check-input me-1" type="checkbox" value="">
        <span class="todos__text">${escape(todos)}</span>
      </div>
      <div class="btn-group" role="group" aria-label="Basic mixed styles example">
        <button type="button" class="edit__btn btn border-0 p-1 flex-grow-0"><i class="bi bi-pen text-primary"></i></button>
        <button type="button" class="remove__btn btn border-0 p-1 flex-grow-0"><i class="bi bi-trash text-danger"></i></button>
      </div>
    </label>
    `
  if (isPrepend) {
    container.prepend(html)
  } else {
    container.append(html)
  }
}

function updateCounter() {
  $('.uncomplete-count').text(`${$('.todos-active').length} items left`)
}

$(document).ready(() => {
  updateCounter()
  const todosContainer = $('.todos-container')
  let todosValue = ''
  $('.todos-value').keypress((e) => {
    if (e.which === 13) {
      e.preventDefault()
      if ($('.todos-value').val() !== '') {
        todosValue = $('.todos-value').val()
        appendTodosToDOM(todosContainer, todosValue, true)
        $('.todos-value').val('')
        updateCounter()
      }
    }
  })

  $('.todos-container').delegate("input[type='checkbox']", 'click', function() {
    $(this).parent().toggleClass('text-decoration-line-through text-black-50')
    $(this).parent().parent().toggleClass('bg-warning todos-completed todos-active')
    updateCounter()
  })

  $('.todos-container').delegate('.remove__btn', 'click', function() {
    $(this).parent().parent().remove()
    updateCounter()
  })

  $('.todos-container').delegate('.edit__btn', 'click', function() {
    let todosElement = $(this).parent().parent().children(':first-child').children(':nth-child(2)')
    const todosElementValue = todosElement.text()
    const editTodosBlock = `<input class='border-secondary rounded bg-light' type='text' name='' value='${escape(todosElementValue)}'>`
    todosElement.replaceWith(editTodosBlock)
    todosElement = $(this).parent().parent().children(':first-child').children(':nth-child(2)')

    todosElement.keypress((e) => {
      if (e.which === 13) {
        e.preventDefault()
        if (todosElement.val() !== '') {
          const newTodos = todosElement.val()
          const newTodosHTML = `<span class="todos__text">${escape(newTodos)}</span>`
          todosElement.replaceWith(newTodosHTML)
        }
      }
    })
  })

  $('.todos-filter').on('click', 'label', (e) => {
    if ($(e.target).is('[for="all-todos-btn"]')) {
      $('.todos-item').each(function() {
        $(this).removeClass('d-none')
      })
    } else if ($(e.target).is('[for="active-todos-btn"]')) {
      $('.todos-item.todos-active').each(function() {
        $(this).removeClass('d-none')
      })
      $('.todos-item.todos-completed').each(function() {
        $(this).addClass('d-none')
      })
    } else if ($(e.target).is('[for="completed-todos-btn"]')) {
      $('.todos-item.todos-completed').each(function() {
        $(this).removeClass('d-none')
      })
      $('.todos-item.todos-active').each(function() {
        $(this).addClass('d-none')
      })
    }
  })

  $('.edit-all-btn').on('click', 'button', (e) => {
    if ($(e.target).is('.all-completed-btn')) {
      $('.todos-item.todos-active').each(function() {
        $(this).toggleClass('text-decoration-line-through text-black-50')
        $(this).toggleClass('bg-warning todos-completed todos-active')
        $(this).find('input').attr('checked', true)
        updateCounter()
      })
    } else if ($(e.target).is('.clear-completed-btn')) {
      $('.todos-item.todos-completed').each(function() {
        $(this).remove()
        updateCounter()
      })
    }
  })
})
