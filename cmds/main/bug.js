const Discord = module.require("discord.js");
const {MessageEmbed} = module.require("discord.js")
const fs = require("fs");

let config   = require('../../botconfig.json')
let ErrorMessages = require('../../Utils/ErrorMessage')
module.exports.run = async (client, message, args) => {
  let channel = client.users.cache.get(config.admin[0])
  if(!channel) return ErrorMessages.err(message)
  if(!args[0]) return ErrorMessages.notvalid(message, 1, 'Не указана суть бага!')
  const embed = new Discord.MessageEmbed()
  .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
  .setDescription(`${args.join(' ')}`)
  .setColor('0fffff')
  .setFooter(`Guild ID: ${message.guild.id} | User ID: ${message.author.id}`)

  if(message.attachments.size > 0) embed.setImage(message.attachments.first().url)
  channel.send(embed)
  const embed2 = new MessageEmbed()
  .setAuthor(`Отправка бага!`)
  .setDescription(`Спасибо вам за ваш баг! В скором времени наши разработчики его исправят!`)
  .setColor('22ee77')
  message.channel.send(embed2)
};
module.exports.help = {
  name: "bug",
  aliases: ["баг", "bag", "пубг"],
  desk: "Сообщить разработчикам бота о баге",
  usage: "bug <ваш баг>",
  cooldown: 60 * 1000
};
