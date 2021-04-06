const Discord = module.require("discord.js");
const fs = require("fs");

const { MessageEmbed } = require("discord.js");
const ErrorMessages = require('../../Utils/ErrorMessage')
let random = require('random')
let config = require('../../botconfig.json')
module.exports.run = async (client, message, args) => {
  let member = await client.db.getMemberDB(message.author.id, message.guild.id)
  let money = args[0]
  if(!money) return ErrorMessages.notvalid(message, 1, 'Указана неверная ставка')
  if(money == 'all') money = member.money;
  else if(money == 'half') money = member.money / 2;
  if(Number(money) < 1) return ErrorMessages.notvalid(message, 1, 'Введите число от 1 до 1.000.000!')
  if(Number(money) > 1000000) return ErrorMessages.notvalid(message, 1, 'Введите число от 1 до 1.000.000!')
  money = Number(money)
  if(member.money < money) return ErrorMessages.notvalid(message, 1, 'Не хватает денег')
  let num_min = 60
  let num_medium = 90
  let num_max = 99
  let random = require('random').int(0, 101)
  if(random >= num_max){
    member.money += money * 100
    const embed = new MessageEmbed()
    .setAuthor('Игра в казино')
    .setColor('#22ee88')
    .setDescription(`Вам выпало число \`${random}\`! Оно больше чем ${num_max}, по этому **вам зачислено ${money*100}${config.currency}**\nВаш баланс: **${member.money}${config.currency}**`)
    message.channel.send(embed)
  }
  else if(random >= num_medium){
    member.money += money * 2
    const embed = new MessageEmbed()
    .setAuthor('Игра в казино')
    .setColor('#f7f759')
    .setDescription(`Вам выпало число \`${random}\`! Оно больше чем ${num_medium}, по этому **вам зачислено ${money*2}${config.currency}**\nВаш баланс: **${member.money}${config.currency}**`)
    message.channel.send(embed)
  }
  else if(random >= num_min){
    member.money += money
    const embed = new MessageEmbed()
    .setAuthor('Игра в казино')
    .setColor('#f7f759')
    .setDescription(`Вам выпало число \`${random}\`! Оно больше чем ${num_min}, по этому **вам зачислено ${money}${config.currency}**\nВаш баланс: **${member.money}${config.currency}**`)
    message.channel.send(embed)
  }
  else{
    member.money -= money
    const embed = new MessageEmbed()
    .setAuthor('Игра в казино')
    .setColor('#ff2222')
    .setDescription(`Вам выпало число \`${random}\`! Оно меньше ${num_min}, по этому **с вас сняли ${money}${config.currency}**\nВаш баланс: **${member.money}${config.currency}**`)
    message.channel.send(embed)
  }
  await client.db.setMemberDB(message.author.id, message.guild.id, member)
};
module.exports.help = {
  name: "br",
  aliases: ["betroll"],
  desk: "Улучшенное казино",
  usage: "br",  
  cooldown: 1000 * 0
};
