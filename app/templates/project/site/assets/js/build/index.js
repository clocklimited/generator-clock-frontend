(function() {

  var $navBtn = $('.js-toggle-nav')
    , $body = $('body')
  $navBtn.on('click', function() {
    if ($body.hasClass('nav-open')) {
      $body.removeClass('nav-open')
    } else {
      $body.addClass('nav-open')
    }
  })

  $('input, select').focus(function() {
    var field = $(this).parents('.field')
    if (field.hasClass('field--error')) {
      field.removeClass('field--error')
      field.find('.field__feedback')
        .animate({ 'opacity': 0 }, 200, function() {$(this).slideUp(200)})
    }
  })

})()

$(document).on('change', '.btn-file :file', function() {
  var input = $(this)
    , numFiles = input.get(0).files ? input.get(0).files.length : 1
    , label = input.val().replace(/\\/g, '/').replace(/.*\//, '')
  input.trigger('fileselect', [ numFiles, label ])
})

$(document).ready( function() {
  $('.btn-file :file').on('fileselect', function(event, numFiles, label) {
    var input = $(this).parents('.field__answer').find(':text')
    if (input.length) {
      input.val(label)
    }
  })
})
