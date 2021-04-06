const Discord = module.require("discord.js");
const fs = require("fs");
const { inspect } = require("util");
const { MessageEmbed } = require("discord.js");
let config = require('../../botconfig.json')
module.exports.run = async (client, message, args) => {
  
  if (
    !config.admin.includes(message.author.id)
  )
    return message.channel.send(':x: | Вы не мой повелитель!');
  if (!args) return;
  let code = args.join(" ");
  try {
    let result = inspect(eval(code, { depth: 0 }));
    const embed = new MessageEmbed()
    .setAuthor(`Выполнение кода`)
    .addField('Код:', '```js\n' + code + '\n```')
    .addField('Возвращение:', '```js\n' + result.slice(0, 1000) + '\n```')
    .setColor('#22ff22')
    message.channel.send(embed)
  }
  catch(err) {
    const embed = new MessageEmbed()
    .setAuthor(`Ошибка`)
    .setDescription('```js\n' + inspect(err).slice(0, 1000) + '\n```')
    .setColor('#FF0000')
    .setTimestamp()
    message.channel.send(embed)
  }
};
module.exports.help = {
  name: "eval",
  aliases: [],
  desk: "исполнить JS код.\nДоступно только для овнера бота",
  usage: "eval [код]",
  cooldown: 5000
};
