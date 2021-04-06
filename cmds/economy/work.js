const Discord = module.require("discord.js");
const fs = require("fs");

const { MessageEmbed } = require("discord.js");
let random = require('random')
module.exports.run = async (client, message, args) => {
  let randombal = random.int(require('../../botconfig.json').work.min, require('../../botconfig.json').work.max)
  let member = await client.db.getMemberDB(message.author.id, message.guild.id)
  if(!member.money) member.money = 0
  await client.db.setMemberDB(message.author.id, message.guild.id, {money: member.money + randombal})
  member = await client.db.getMemberDB(message.author.id, message.guild.id)
  const embed = new MessageEmbed()
  .setAuthor(`Работа`, 'https://www.pngarts.com/files/3/Green-Dollar-PNG-Image-With-Transparent-Background.png')
  .setColor('#22ee77')
  .setDescription(`${message.author} пошёл на завод и **заработал ${randombal}${require('../../botconfig.json').currency}**!\nБаланс на данный момент: ${member.money}${require('../../botconfig.json').currency}`)
  .addField('Примечание!', 'Работать можно раз в день!')
  message.channel.send(embed)
};
module.exports.help = {
  name: "work",
  aliases: ["работать", "работа", "working"],
  desk: "Работать на работе",
  usage: "work",
  cooldown: 1000 * 60 * 60 * 24
};
