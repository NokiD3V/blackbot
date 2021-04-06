const Discord = module.require('discord.js');
const fs = require('fs');
const random = require('random')
module.exports.run = async (client,message,args) => {
let ping 
if(message.mentions.users.size <1) ping = 'еду в одиночку'
else ping = message.mentions.members.first()
let member = await client.db.getMemberDB(message.author.id, message.guild.id)
let currency = require('../../botconfig.json').currency
if(member.money < 20) return message.channel.send(':x: | Для использования данной реакции надо минимум 20' + currency + '!')
member.money -= 20;
await client.db.setMemberDB(message.author.id, message.guild.id, member)
let images = [
'https://media1.tenor.com/images/81bca89989445baae354fde48fc98265/tenor.gif?itemid=10895491', 
'https://media1.tenor.com/images/5aaf1a7f1b7fc56c5f8ee50425efeefd/tenor.gif?itemid=17362621',
'https://media1.tenor.com/images/6464f57456b3c4bdcf5dbc72ce9fe9c1/tenor.gif?itemid=4627210',
'https://media1.tenor.com/images/7d9f8d43e83c34c826f72c8d0ffb1bf9/tenor.gif?itemid=17795093',
'https://media1.tenor.com/images/12e7bd3a24db3bf13f19d05de4b135fc/tenor.gif?itemid=6237996'
]

let embed = new Discord.MessageEmbed() 
.setAuthor('') 
.setTitle('Реакция: кушать')
.setColor('#2F3136')
.setDescription(`${message.member} кушает ${ping}`)
.setFooter('Вы потратили 20' + currency + ' для этой реакции!')
.setImage(images[random.int(min=0, max = images.length - 1)])
message.channel.send(embed); 

};
module.exports.help = {
    "name": "eat",
    "aliases": ["кушать", "есть", "жрать"],
    desk: "Реакция 'кушать'",
    usage: "eat [@user]",
    cooldown: 10 * 1000
}