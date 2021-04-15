const Discord = module.require("discord.js");
const fs = require("fs");
const config = require('../../botconfig.json')
const { MessageEmbed } = require("discord.js");
let random = require('random')
const ErrorMessages = require('../../Utils/ErrorMessage')
module.exports.run = async (client, message, args) => {
  let userdb = await client.db.getMemberDB(message.author.id, message.guild.id)
  let guilddb = await client.db.getGuildDB(message.guild.id)
  prefix = config.prefix
  let shop_arr = guilddb.shop
  if(!args[0]){
    const embed = new MessageEmbed()
    .setAuthor(`Магазин ${message.guild.name}`)
    .setColor('22ee77')
    .setFooter(`Чтобы купить роль введи: ${prefix}shop buy [ID]`)
    if(shop_arr.length > 0) {
      for (let i = 0; i < shop_arr.length; i++) {
        const role = shop_arr[i];
        embed.addField(`${role.cost} [${i}]`, `<@&${role.roleid}>`)
      }
    }
    else embed.setDescription(`Ролей в магазине нет! 🛠`)
    message.channel.send(embed)
  }
  else if(args[0] == 'buy'){
    let role = shop_arr[args[1]]
    if(!role) return ErrorMessages.notvalid(message, 2, 'Не указан ID предмета')
    if(role.cost > userdb.money) return ErrorMessages.notvalid(message, 1, 'Не хватает денег')
    if(message.member.roles.cache.has(role.roleid)) return ErrorMessages.notvalid(message, 1, 'У вас уже есть эта роль')
    userdb.money -= role.cost
    message.member.roles.add(role.roleid)
    await client.db.setMemberDB(message.author.id, message.guild.id, userdb)
    const embed = new MessageEmbed()
    .setAuthor('Приобретение роли')
    .setColor('22ee77')
    .setDescription(`${message.author} приобрёл роль **${role.name}**!`)
    message.channel.send(embed)
  }
  else {
    const embed = new MessageEmbed()
    .setAuthor(`Магазин ${message.guild.name}`)
    .setColor('22ee77')
    .setFooter(`Чтобы купить роль введи: ${prefix}shop buy [ID]`)
    if(shop_arr.length > 0) {
      for (let i = 0; i < shop_arr.length; i++) {
        const role = shop_arr[i];
        embed.addField(`${role.cost} [${i}]`, `<@&${role.roleid}>`)
      }
    }
    else embed.setDescription(`Ролей в магазине нет! 🛠`)
    message.channel.send(embed)
  }
};
module.exports.help = {
  name: "shop",
  aliases: ["магазин", "market", "маркет"],
  desk: "Магазин сервера",
  usage: "shop",
  cooldown: 1000 * 5
};
