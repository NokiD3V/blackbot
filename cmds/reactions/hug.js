const Discord = module.require('discord.js');
const fs = require('fs');
const random = require('random')
module.exports.run = async (client,message,args) => {
let ping 
if(message.mentions.users.size <1) ping = 'всех'
else ping = message.mentions.members.first()
let member = await client.db.getMemberDB(message.author.id, message.guild.id)
let currency = require('../../botconfig.json').currency
if(member.money < 20) return message.channel.send(':x: | Для использования данной реакции надо минимум 20' + currency + '!')
member.money -= 20;
await client.db.setMemberDB(message.author.id, message.guild.id, member)
let images = [
'https://pa1.narvii.com/6569/56b815b794d667d5039dcaf6af3a215cad5cc6a2_hq.gif', 
'https://i.gifer.com/NOkF.gif',
'https://99px.ru/sstorage/86/2019/02/image_860602190643332617171.gif',
'https://data.whicdn.com/images/241295638/original.gif',
'https://pa1.narvii.com/6893/7ea389aa27861d3781255e3fe0211b4d5c60004dr1-500-272_hq.gif'
]

let embed = new Discord.MessageEmbed() 
.setAuthor('') 
.setTitle('Реакция: Обнимашки ^-^')
.setColor('#2F3136')
.setDescription(`${message.member} обнял ${ping}`)
.setFooter('Вы потратили 20' + currency + ' для этой реакции!')
.setImage(images[random.int(min=0, max = images.length - 1)])
message.channel.send(embed); 

};
module.exports.help = {
    "name": "hug",
    "aliases": ["обнять"],
    desk: "Реакция 'обнять'",
    usage: "hug [@user]",
    cooldown: 10 * 1000
}