const Discord = require('discord.js')
const { config } = require('./config')

const client = new Discord.Client()

const state = {}

client.once('ready', () => {
  console.log('Ready!')
})

const play = connection =>
  connection
    .play('./kassino.mp4')

client.on('message', async message => {
  if (message.author.bot) return

  const isCommand = message.content.startsWith('!show')
  if (!isCommand) return

  const voiceChannel = message.member.voice.channel
  const textChannel = message.channel.name
  const guildId = message.guild.id

  const session = state[guildId]

  if (!session) {
    const connection = await voiceChannel.join()

    state[guildId] = {
      voiceChannel,
      textChannel,
      guildId,
      connection
    }

    play(connection)
      .on('finish', () => play(connection))

    return message.channel.send('aaaa')
  }

  session.voiceChannel.leave()
})

client.login(config.BOT_TOKEN)
