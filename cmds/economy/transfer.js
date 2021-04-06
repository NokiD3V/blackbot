const Discord = module.require("discord.js");
const fs = require("fs");

const { MessageEmbed } = require("discord.js");
const ErrorMessages = require('../../Utils/ErrorMessage')
const botconfig = require('../../botconfig.json')

let random = require('random')

module.exports.run = async (client, message, args) => {
    var proc = 12 
    if(!args[1]) return ErrorMessages.notvalid(message, 2, "Не введены все аргументы")
    let member_args = message.guild.members.cache.get(args[0]) || message.mentions.members.first()
    if(!member_args) return ErrorMessages.notvalid(message, 1, "Не указан человек")
    if(member_args.user.id == message.author.id) return ErrorMessages.notvalid(message, 1, "Нельзя переводить деньги самому себе")
    if(isNaN(args[1])) return ErrorMessages.notvalid(message, 2, "Неверное кол-во монет")

    let moneys = Number(args[1])
    if(moneys < 1 || moneys > 1000000) return ErrorMessages.notvalid(message, 2, 'Введите число от 1 до 1.000.000!')
    let member = await client.db.getMemberDB(message.author.id, message.guild.id)
    let mention_member =await client.db.getMemberDB(member_args.user.id, message.guild.id) 
    let currency = botconfig.currency
    if(moneys > member.money) return ErrorMessages.notvalid(message, 2, 'У вас не хватает денег!')
    member.money -= Math.floor(moneys)
    mention_member.money += Math.floor(moneys - (moneys/ 100 * proc))
    await client.db.setMemberDB(member_args.user.id, message.guild.id, mention_member)
    await client.db.setMemberDB(message.author.id, message.guild.id, member)

    const embed = new MessageEmbed()
    .setAuthor('Перевод денежных средств', message.author.displayAvatarURL({dynamic: true}))
    .setDescription(`${message.author} перевёл **${Math.floor(moneys - (moneys/ 100 * proc))}${currency}** пользователю ${member_args}!\nВнимание! В этой команде стоит коммисия **${proc}%**! Будьте аккуратнее!`)
    .setColor('#ffbe19')
    if(args[2]) embed.addField(`Комментарий от ${message.author.tag}:`, `${args.slice(2).join(' ')}`)
    message.channel.send(embed)
};
module.exports.help = {
  name: "transfer",
  aliases: ["give", "передать", "дать"],
  desk: "Перевести деньги на сервере",
  usage: "transfer <@user> [кол-во]",
  cooldown: 1000 * 5
};
