const Discord = module.require("discord.js");
const fs = require("fs");
const { MessageEmbed } = require("discord.js");
const config = require('../../botconfig.json')
module.exports.run = async (client, message, args) => {
  let user = message.mentions.members.first() || message.member 
  let member = await client.db.getMemberDB(user.user.id, message.guild.id)
  let balance = `${member.money}${config.currency}`

  

  const embed = new MessageEmbed()
  .setAuthor(user.user.tag, user.user.displayAvatarURL({ dynamic: true }))
  .setDescription(`Баланс: ${balance}`)
  .setColor('#11ee88')
  message.channel.send(embed)
};
module.exports.help = {
  name: "$",
  aliases: ["монеты", "я", "balance", "баланс", "money"],
  desk: "Баланс участника",
  usage: "$",
  cooldown: 5000
};
