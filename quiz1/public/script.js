$('document').ready(() => {
    $('#signup').on('submit', handleSignup)
    function handleSignup (e) {
      e.preventDefault()
      const options = {
        method: $(this).attr('method'),
        url: $(this).attr('action'),
        data: $(this).serialize()
      }
      $.ajax(options).done(response => {
        alert(JSON.stringify(response))
      })
    }
})

