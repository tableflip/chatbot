const Nes = require('nes/client')
const client = new Nes.Client('ws://localhost:3000')
const yo = require('yo-yo')

client.connect(function (err) {
  if (err) return console.error(err)

  client.request('bot', function (err, body) {
    if (err) return console.error(err)
    addToChat({msg: body, classes: 'tl pl3 bg-light-green'})
  })
})

document.getElementById('form').addEventListener('submit', function (e) {
  e.preventDefault()

  const value = document.forms.form.elements.input.value

  if (!value) return

  const msg = {
    type: 'message',
    id: client.id,
    message: value
  }

  addToChat({msg: msg.message, classes: 'fr pr3 tr bg-light-yellow'})
  document.forms.form.elements.input.value = ''

  client.message(msg, function (err, body) {
    if (err) return console.error(err)

    setTimeout(function () {
      addToChat({msg: body, classes: 'tl pl3 bg-light-green'})
    }, 999)
  })
})

function addToChat (tplData) {
  const node = yo`<div class="db pa2 w-100 cf">
    <blockquote class="ma0 br2 w-80 lh-copy pv2 ${tplData.classes}">${tplData.msg}</blockquote>
  </div>`
  document.getElementById('messages').appendChild(node)
}
