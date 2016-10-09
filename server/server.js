const Hapi = require('hapi')
const Nes = require('nes')
const Inert = require('inert')
const Rivescript = require('rivescript')
const path = require('path')

const server = new Hapi.Server()
const bot = new Rivescript()

server.connection({
  host: 'localhost',
  port: 3000
})

bot.loadDirectory(path.join(__dirname, '..', 'brain'), onLoad, (err) => { throw err })

function onLoad (batchNum) {
  bot.sortReplies()

  const plugins = [
    {
      register: Nes,
      options: {
        onMessage: (socket, message, botReply) => {
          const msg = bot.reply(socket.id, message.message)
          botReply(msg)
        }
      }
    },
    { register: Inert }
  ]

  server.register(plugins, (err) => {
    if (err) throw err

    server.route({
      method: 'GET',
      path: '/',
      config: {
        handler: (req, reply) => reply.file(path.join(__dirname, '..', 'client', 'index.html'))
      }
    })

    server.route({
      method: 'GET',
      path: '/bot',
      config: {
        id: 'bot',
        handler: (req, reply) => reply('Hi ask me about TABLEFLIP')
      }
    })

    server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: path.join(__dirname, '..', 'public')
        }
      }
    })

    server.start((err) => {
      if (err) throw err
      console.log('bot server running on port', server.info.port)
    })
  })
}
