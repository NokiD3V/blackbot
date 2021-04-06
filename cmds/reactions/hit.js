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
'https://media.indiedb.com/cache/images/groups/1/25/24269/thumb_620x2000/t3_56xx0a.gif', 
'https://data.whicdn.com/images/187664188/original.gif',
'https://i.gifer.com/8sWB.gif',
'https://i.gifer.com/Vr5h.gif',
'https://pa1.narvii.com/6635/238b2391f1ae308e0091d107b58f519bcc22ce6b_hq.gif'
]

let embed = new Discord.MessageEmbed() 
.setAuthor('') 
.setTitle('Реакция: Удар')
.setColor('#2F3136')
.setDescription(`${message.member} ударил ${ping}`)
.setFooter('Вы потратили 20' + currency + ' для этой реакции!')
.setImage(images[random.int(min=0, max = images.length - 1)])
message.channel.send(embed); 

};
module.exports.help = {
    "name": "hit",
    "aliases": ["удар", "ударить"],
    desk: "Реакция 'удар'",
    usage: "hit [@user]",
    cooldown: 10 * 1000
}