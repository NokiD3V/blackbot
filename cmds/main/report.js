const Discord = module.require("discord.js");
const fs = require("fs");
const ms = require('ms')
const { MessageEmbed } = require("discord.js");
let ErrorMessages = require('../../Utils/ErrorMessage')
let config = require('../../botconfig.json')
module.exports.run = async (client, message, args) => {
    let user =  message.mentions.members.first()
    if(!user) return ErrorMessages.notvalid(message, 1, 'Не указан человек');
    if(!args[1]) args = 'Не указана'
    else args = args.slice(1).join(' ')
    let report_channel = message.guild.channels.cache.get(config.report_channel)
    const embed = new MessageEmbed()
    .setAuthor('Жалоба на ' + user.user.tag)
    .setDescription(`**${message.author.tag}** подал жалобу на **${user.user.tag}**`)
    .setColor('#ff2266')
    message.channel.send(embed).then((msg) => {
      msg.delete({timeout:5000})
    })
    const report = new MessageEmbed()
    .setAuthor(`${user.user.tag}`, user.user.displayAvatarURL({dynamic:true}))
    .addField(`Канал:`, `${message.channel}`)
    .addField(`Кто подал:`, `${message.author} | ID: ${message.author.id}`)
    .addField(`Причина:`, `${args}`)
    .setColor('#22ee55')
    .setTimestamp()
    .setThumbnail(message.guild.iconURL({dynamic:true}))
    report_channel.send(report)
}; 
module.exports.help = {
  name: "report",
  aliases: ["репорт", "rep", "реп", "жалоба"],
  desk: "Подать жалобу на человека",
  usage: "report <@user>",
  cooldown: 1000 * 60 * 2
};
