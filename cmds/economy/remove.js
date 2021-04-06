const Discord = module.require("discord.js");
const fs = require("fs");

const { MessageEmbed } = require("discord.js");
const ErrorMessages = require('../../Utils/ErrorMessage')
let random = require('random')
module.exports.run = async (client, message, args) => {

    if(!args[1]) return ErrorMessages.notvalid(message, 2, "Не введены все аргументы")
    let member_args = message.guild.members.cache.get(args[0]) || message.mentions.members.first()
    if(!member_args) return ErrorMessages.notvalid(message, 1, "Не указан человек")
    if(isNaN(args[1])) return ErrorMessages.notvalid(message, 2, "Неверное кол-во монет")

    let moneys = Number(args[1])
    if(moneys < 1 || moneys > 1000000) return ErrorMessages.notvalid(message, 2, 'Введите число от 1 до 1.000.000!')

    let member = await client.db.getMemberDB(member_args.user.id, message.guild.id)
    if(moneys > member.money) return ErrorMessages.notvalid(message, 2, 'У пользователя не хватает денег!')
    let guild = await client.db.getGuildDB(message.guild.id)
    let currency = require('../../botconfig.json').currency

    member.money -= moneys
    client.db.setMemberDB(member_args.user.id, message.guild.id, member)
    const embed = new MessageEmbed()
    .setColor('#ffbe19')
    .setAuthor('Выдача денег', message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`${message.author} отнял **${moneys}${currency}** у пользователя ${member_args}!`)
    message.channel.send(embed)
};
module.exports.help = {
  name: "remove",
  aliases: ["отнять", "take", "снять"],
  desk: "Отнять деньги на сервере",
  usage: "remove <@user> [кол-во]",
  cooldown: 1000 * 5,
  permissions: ["ADMINISTRATOR"]
};
