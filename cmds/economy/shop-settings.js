const Discord = module.require("discord.js");
const fs = require("fs");
const { MessageEmbed } = require("discord.js");
const ErrorMessages = require('../../Utils/ErrorMessage')
let random = require('random')
const config = require('../../botconfig.json')
module.exports.run = async (client, message, args) => {
  let userdb = await client.db.getMemberDB(message.author.id, message.guild.id)
  let guilddb = await client.db.getGuildDB(message.guild.id)
  prefix = config.prefix
  let shop_arr = guilddb.shop
  if(!message.member.hasPermission("ADMINISTRATOR")) return;
  if(!args[0]){
    const embed = new MessageEmbed()
    .setAuthor(`Настройка магазина ${message.guild.name}`)
    .setColor('22ee77')
    .addField('Команды настройки магазина', `${prefix}shop-settings add <@role> <Цена>\n${prefix}shop-settings remove [ID]\n${prefix}shop-settings edit [ID] <Цена>`)
    message.channel.send(embed)
  }
  else if(args[0] == 'add'){
    if(shop_arr.length >= 15) return ErrorMessages.notvalid(message, 1, 'Вы достигли лимита ролей на сервере!')
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
    console.log(role.id)
    if(!role) return ErrorMessages.notvalid(message, 2, 'Не указана роль')
    let kandidate = shop_arr.filter(n => {return n.roleid == role.id})
    console.log(kandidate)
    if(kandidate.length > 0) return ErrorMessages.notvalid(message, 2, 'Эта роль уже есть в магазине!')
    let cost = Number(args[2])
    if(!cost) return ErrorMessages.notvalid(message, 3, 'Не указана цена')
    if(cost < 1 || cost > 1000000) return ErrorMessages.notvalid(message, 3, 'Укажите цену от 1 до 1.000.000!')
    guilddb.shop.push({name: role.name, cost: Math.floor(cost), roleid: role.id})
    await client.db.setGuildDB(message.guild.id, guilddb)
    const embed = new MessageEmbed()
    .setAuthor(`Успешно! ✔`)
    .setDescription(`${message.author} добавил роль ${role} в магазин. Её ID: ${guilddb.shop.length - 1}`)
    .setColor('22ee77')
    message.channel.send(embed)
  }
  else if(args[0] == 'remove'){
    if(!shop_arr[args[1]]) return ErrorMessages.notvalid(message, 2, 'Не указан ID предмета')
    let role = guilddb.shop[args[1]].roleid
    guilddb.shop = guilddb.shop.filter(n => { return n.roleid != guilddb.shop[args[1]].roleid })
    await client.db.setGuildDB(message.guild.id, guilddb)
    const embed = new MessageEmbed()
    .setAuthor(`Успешно! ✔`)
    .setDescription(`${message.author} удалил роль <@&${role}> из магазина`)
    .setColor('ff2222')
    message.channel.send(embed)
  }
  else if(args[0] == 'edit'){
    let role = guilddb.shop[args[1]]
    if(!role) return ErrorMessages.notvalid(message, 2, 'Не указан ID предмета')
    let cost = Number(args[2])
    if(!cost) return ErrorMessages.notvalid(message, 3, 'Не указана цена')
    if(cost < 1 || cost > 1000000) return ErrorMessages.notvalid(message, 3, 'Укажите цену от 1 до 1.000.000!')
    guilddb.shop[args[1]] = {name: role.name, cost: Math.floor(cost), roleid: role.roleid}
    await client.db.setGuildDB(message.guild.id, guilddb)
    const embed = new MessageEmbed()
    .setAuthor(`Успешно! ✔`)
    .setDescription(`${message.author} изменил роль **${role.name}** в магазине. Её новая цена: ${cost}`)
    .setColor('22ee77')
    message.channel.send(embed)
  }
  else{
    const embed = new MessageEmbed()
    .setAuthor(`Настройка магазина ${message.guild.name}`)
    .setColor('22ee77')
    .addField('Команды настройки магазина', `${prefix}shop-settings add <@role> <Цена>\n${prefix}shop-settings remove [ID]\n${prefix}shop-settings redact [ID] <Цена>`)
    message.channel.send(embed)
  }
};
module.exports.help = {
  name: "shop-settings",
  aliases: ["sshop", "настройки-магазин", "магазин-настройки"],
  desk: "Магазин сервера",
  usage: "shop",
  cooldown: 1000 * 5
};
