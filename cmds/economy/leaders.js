const Discord = module.require("discord.js");
const fs = require("fs");

const { MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args) => {
  let member = await client.db.getMemberDB(message.author.id, message.guild.id)
  let all_members = await client.db.getAllMembers(message.guild.id)
  const embed = new MessageEmbed()
  .setAuthor('Лидеры | ' + message.guild.name)
  .setColor('YELLOW')
  .setFooter('Utopia | Bot')
  let text = all_members.filter(n => { return message.guild.members.cache.get(n.id) }).filter(n => {return n.money > 0}).map((v, n) => {  return `<@${v.id}> - ${v.money} ${require('../../botconfig.json').currency}`})
  .sort((a, b) => b.split(" - ")[1].split(' ')[0] - a.split(" - ")[1].split(' ')[0]).slice(0, 10).map((n, p) => { return `${p+1}. ${n}`}) 
  embed.setDescription(text.join('\n'))
  message.channel.send(embed) //
};
module.exports.help = {
  name: "leaders",
  aliases: ["lb", "лидеры", "top", "топ"],
  desk: "Доска лидеров",
  usage: "leaders",
  cooldown: 5000
};
