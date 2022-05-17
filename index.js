const Discord = require('discord.js')
const client = new Discord.Client({intents: 32767});

const { Player, QueryType, QueueRepeatMode } = require("discord-player");
const express = require('express');
const app = express()

app.get('/' , (req,res) => {
  res.sendStatus(200)
})
app.listen(8080)
const prefix = 'A'

client.on('ready' , () => {
  console.log(client.user.username)
  client.user.setActivity("𝑲𝒆𝒆𝒑 𝑸𝒖𝒊𝒆𝒕", {
  type: "WATCHING", 
})
  client.user.setStatus("dnd");
})
 player = new Player(client)
client.on('messageCreate' , async (message) => {
    if (message.content.startsWith(prefix + 'play' ||prefix + 'p' )){
        let query = message.content.split(' ').slice(1).join(" ")
        console.log(query)
        const queue = player.createQueue(message.guild, {
            metadata: {
                channel: message.channel
            }
        });
        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            queue.destroy();
        }
        const track = await player.search(query, {
            requestedBy: message.user
        }).then(x => x.tracks[0]);
        if (!track) return await message.reply({ content: `not found!` });

        queue.play(track);
        console.log(track)
        return await message.reply({ content: `Loading  **${track.title}**!` });
    
    }
})


client.on('messageCreate' , async (message) => {
    if (message.content.startsWith(prefix + 'stop' || prefix + 'st')){
       const queue = player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return  message.reply({ content: 'No music is being played!' });
        queue.destroy();
      message.reply('**__DONE__**')
    }
})

client.on('messageCreate' , async (message) => {
  if (message.content.startsWith(prefix + 'np' || prefix + 'nowplaying')){
    const queue = player.getQueue(message.guild.id);
    if (!queue || !queue.playing) return message.send({ content: '❌ | No music is being played!' });
    const progress = queue.createProgressBar();
    const perc = queue.getPlayerTimestamp();

    message.reply({
      embeds: [
          {
              title: 'Now Playing',
              description: `🎵 | **${queue.current.title}**! (\`${perc.progress == 'Infinity' ? 'Live' : perc.progress + '%'}\`)`,
              fields: [
                  {
                      name: '\u200b',
                      value: progress.replace(/ 0:00/g, ' ◉ LIVE')
                  }
              ],
              color: 0xffffff
          }
      ]
  
})
  }})

client.on('messageCreate' , async (message) => {
  if (message.content.startsWith(prefix + "set-name")){
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`You Don't Have Permission.`)


    let username =  message.content.split(" ").join(" ")
    if (!username) return message.react('❌')

    client.user.setUsername(username[1]).then(
      message.reply('Done!')
    )

  }
})

client.on('messageCreate' , async (message) => {
  if (message.content.startsWith(prefix + "set-avatar")){
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`You Don't Have Permission.`)

    let avatar =  message.content.split(" ").join(" ")
    if (!avatar) return message.react('❌')
    await client.user.setAvatar(`${avatar[1]}`).catch((err) => console.log(err))
    message.replace('__DONE__')

  }
})


process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at: " + promise)
  console.log("Reason: " + reason)
})
process.on("uncaughtException", (err, origin) => {
  console.log("Caught exception: " + err)
  console.log("Origin: " + origin)
})
process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log(err);
  console.log("Origin: " + origin)
});
process.on('multipleResolves', (type, promise, reason) => {
  console.log(type, promise);
});


client.login('OTc1OTMxODA1NDk0NTY2OTMy.GumnG8.nv4URhwp1psUT38024b2-W4Uwl2K-cLrPDguoY')