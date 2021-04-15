const Discord = module.require("discord.js");
const fs = require("fs");
const ms = require('ms')
const { MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args) => {
  let voicemember = await client.db.getMemberDB(message.author.id, message.guild.id)
  if(typeof voicemember.voice_stats.lastconnect != 'string') voicemember.voice_stats.lastconnect = String(new Date());
  if(voicemember.voice_stats.lastconnect.split(' ')[2] != String(new Date()).split(' ')[2]){
    voicemember.voice_stats.day = 0
    voicemember.voice_stats.lastconnect = String(new Date())
  }   
  client.db.setMemberDB(message.author.id, message.guild.id, voicemember)
  let day = `${require('ms')(voicemember.voice_stats.day).replace('ms', '').replace('m', ' мин.').replace('h', ' ч.').replace('s', ' сек.').replace('d', ' дн.')}`
  let week = `${ms(voicemember.voice_stats.week).replace('m', ' мин.').replace('h', ' ч.').replace('s', ' сек.').replace('d', ' дн.')}`
  let all = `${ms(voicemember.voice_stats.all).replace('m', ' мин.').replace('h', ' ч.').replace(' s', ' сек.').replace('d', ' дн.')}`
  let embed = new MessageEmbed()
  .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
  .setColor('#22ef1e')
  .addField('За день', day, true)
  .addField('За неделю', week, true)
  .addField('За всё время', all, true)
  .addField('Всего сообщений', voicemember.messages)
  .setFooter(`Ваша статистика активности на сервере`, "https://media.discordapp.net/attachments/826101936054992930/826415157151399946/image1.jpg")
  message.channel.send(embed)
}; 
module.exports.help = {
  name: "info",
  aliases: ["информация", "статистика", "stats", "стата"],
  desk: "Информация по сообщениям, голосовому онлайну",
  usage: "info [@user]",
  cooldown: 1000 * 3
};
