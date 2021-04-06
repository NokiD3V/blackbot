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
'https://media1.tenor.com/images/9c67c7a7a55292cfbcb52560b154ac4e/tenor.gif?itemid=17468715', 
'https://media1.tenor.com/images/b472c92e49a7813aa714d8741560f2b6/tenor.gif?itemid=17763113',
'https://media1.tenor.com/images/fff8e3bfc80524fe6cf035acf942012b/tenor.gif?itemid=17468689'
]

let embed = new Discord.MessageEmbed() 
.setAuthor('') 
.setTitle('Реакция: убивать')
.setColor('#2F3136')
.setDescription(`${message.member} убивает ${ping}`)
.setFooter('Вы потратили 20' + currency + ' для этой реакции!')
.setImage(images[random.int(min=0, max = images.length - 1)])
message.channel.send(embed); 

};
module.exports.help = {
    "name": "kill",
    "aliases": ["убивать", "убить"],
    desk: "Реакция 'убивать'",
    usage: "kill [@user]",
    cooldown: 10 * 1000
}