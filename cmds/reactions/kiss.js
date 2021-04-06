const Discord = module.require("discord.js");
const fs = require("fs");
const random = require("random");
module.exports.run = async (client, message, args) => {
  let ping;
  if (message.mentions.users.size < 1) ping = "всех";
  else ping = message.mentions.members.first();
  let member = await client.db.getMemberDB(message.author.id, message.guild.id)
  let currency = require('../../botconfig.json').currency
  if(member.money < 20) return message.channel.send(':x: | Для использования данной реакции надо минимум 20' + currency + '!')
  member.money -= 20;
  await client.db.setMemberDB(message.author.id, message.guild.id, member)
  let images = [
    "https://pa1.narvii.com/6703/56deba239ddba81953c40a8c31dcb6c82cada176_hq.gif",
    "https://avatars.mds.yandex.net/get-pdb/1880804/901d6a25-9b00-4741-b15c-b4aae39ec56a/orig",
    "https://pa1.narvii.com/6899/8e56e5a6a3d6b99e4678092d902fc37c1f3e541br1-500-245_hq.gif",
    "https://media1.tenor.com/images/f5167c56b1cca2814f9eca99c4f4fab8/tenor.gif?itemid=6155657",
    "https://lifeo.ru/wp-content/uploads/anime-gif-kiss-5.gif"
  ];

  let embed = new Discord.MessageEmbed()
    .setAuthor("")
    .setTitle("Реакция: Поцелуй ^-^")
    .setColor("#2F3136")
    .setDescription(`${message.member} поцеловал ${ping}`)
    .setFooter('Вы потратили 20' + currency + ' для этой реакции!')
    .setImage(images[random.int((min = 0), (max = images.length - 1))]);
  message.channel.send(embed);
};
module.exports.help = {
  name: "kiss",
  aliases: ["поцеловать"],
  desk: "Реакция 'целовать'",
  usage: "kiss [@user]",
  cooldown: 10 * 1000
};
