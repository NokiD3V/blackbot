const Discord = module.require("discord.js");
const fs = require("fs");
const random = require("random");
module.exports.run = async (client, message, args) => {
let ping 
if(message.mentions.users.size <1) ping = 'в чатик'
else ping = message.mentions.members.first()
let member = await client.db.getMemberDB(message.author.id, message.guild.id)
let currency = require('../../botconfig.json').currency
if(member.money < 20) return message.channel.send(':x: | Для использования данной реакции надо минимум 20' + currency + '!')
member.money -= 20;
await client.db.setMemberDB(message.author.id, message.guild.id, member)
let images = [
'https://i.gifer.com/OaZ2.gif', 
'https://2.bp.blogspot.com/-l1cRJ7CDDZ0/W8Lglkk1nGI/AAAAAAABVkc/Jbub9zB5qGcPKELgdTLtVBeztvIGLKp7wCKgBGAs/s1600/Omake%2BGif%2BAnime%2B-%2BRelease%2Bthe%2BSpyce%2B-%2BEpisode%2B2%2B-%2BFu%2BPokes%2BMomo.gif',
'https://i.gifer.com/Mwm9.gif',
'https://i.gifer.com/QCGQ.gif',
'https://bang-phinf.pstatic.net/a/31acj2/0_b80Ud018bng1dvnnybasxujs_oitop5.gif'
]

let embed = new Discord.MessageEmbed() 
.setAuthor('') 
.setTitle('Реакция: Тык ^-^')
.setColor('#2F3136')
.setDescription(`${message.member} тыкнул ${ping}`)
.setFooter('Вы потратили 20' + currency + ' для этой реакции!')
.setImage(images[random.int(min=0, max = images.length - 1)])
message.channel.send(embed); 

};
module.exports.help = {
    "name": "poke",
    "aliases": ["тык", "тыкнуть"],
    desk: "Реакция 'тыкать'",
    usage: "poke [@user]",
    cooldown: 10 * 1000
}