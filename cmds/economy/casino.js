const Discord = module.require("discord.js");
const fs = require("fs");

const { MessageEmbed } = require("discord.js");
const ErrorMessages = require('../../Utils/ErrorMessage')
let random = require('random')
module.exports.run = async (client, message, args) => {
  let member = await client.db.getMemberDB(message.author.id, message.guild.id)
  let money = Number(args[0])
  if(!money) return ErrorMessages.notvalid(message, 1, 'Указана неверная ставка')
  if(money < 1 || money > 1000000) return ErrorMessages.notvalid(message, 1, 'Введите число от 1 до 1.000.000!')
  if(member.money < money) return ErrorMessages.notvalid(message, 1, 'Не хватает денег')
  let guild = require('../../botconfig.json').currency
  let currency = guild
  let chance = require('../../botconfig.json').chance_casino
  const embed = new MessageEmbed()
  let random_win = random.int(0, 100)
  if(random_win < chance){
      member.money += money
      const embed = new MessageEmbed()
      .setAuthor('Победа!')
      .setDescription(`${message.author} победил и получает **${money}${currency}**!\nВаш баланс составляет: **${member.money}${currency}**`)
      .setColor('22ee77')
      msg.edit(embed)
  }
  else{
      member.money -= money
      const embed = new MessageEmbed()
      .setAuthor('Поражение!')
      .setDescription(`${message.author} проиграл, у вас отняли **${money}${currency}**!\nВаш баланс составляет: **${member.money}${currency}**`)
      .setColor('ff2222')
      msg.edit(embed)
  }
  await client.db.setMemberDB(message.author.id, message.guild.id, member)
};
module.exports.help = {
  name: "casino",
  aliases: ["казино", "kazino"],
  desk: "Обычное казино",
  usage: "casino",
  cooldown: 1000 * 4
};
