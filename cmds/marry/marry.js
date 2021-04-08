const Discord = module.require("discord.js");
const { MessageEmbed, Message } = require("discord.js");
const fs = require("fs");
const ErrorMessages = require('../../Utils/ErrorMessage')
const config = require('../../botconfig.json')
module.exports.run = async (client, message, args) => {
  const info = new MessageEmbed()
  .setAuthor("Свадьба | Информация")
  .setDescription(`${config.prefix}marry info - информация о браке\n${config.prefix}marry invite @user - предложить пользователю пожениться\n${config.prefix}marry leave - выйти из брака (Стоимость: ${config.marry_leave_cost}${config.currency})`)
  .setColor('#da6ded')


  if(!args[0]){
    message.channel.send(info)
  }
  else if(args[0] == 'invite'){
    let user = message.guild.members.cache.get(args[2]) || message.mentions.members.first() || null
    if(!user) return ErrorMessages.notvalid(message, 2, 'Не указан User')
    if(user.user.bot) return ErrorMessages.notvalid(message, 1, 'Нельзя жениться на ботах!')
    if(user.user.id == message.author.id) return ErrorMessages.notvalid(message, 1, 'Нельзя жениться на себе!')
    let member1 = await client.db.getMemberDB(message.author.id, message.guild.id)
    let member2 = await client.db.getMemberDB(user.user.id, message.guild.id)
    if(member1.marry != null) return ErrorMessages.notvalid(message, 1, 'Вы уже женаты на ком-то!');
    if(member2.marry != null) return ErrorMessages.notvalid(message, 1, 'Пользователь уже женат на ком-то!');
    const embed = new MessageEmbed()
    .setAuthor('Предложение... 🎈')
    .setDescription(`**${message.author.tag}** предложил вам сыграть свадьбу. Вы согласны?`)
    .setColor('#736ded')
    user.user.send(embed).then(msg => {
      
      let already = false
      let emojis = ['✅', '❌']
      for (let i = 0; i < emojis.length; i++) {
        msg.react(emojis[i])  
      }
      const filter = (reaction, usr) => {
        return emojis.includes(reaction.emoji.name) && usr.id === user.user.id;
      };
      
      const collector = msg.createReactionCollector(filter, { time: 60 * 1000, max: 1 });
      
      collector.on('collect', (reaction, member) => {
        already = true
        console.log(`Collected ${reaction.emoji.name} from ${member.tag}`);
        if(reaction.emoji.name == emojis[0]){
          member1.marry = user.user.id;
          member2.marry = message.author.id;
          client.db.setMemberDB(message.author.id, message.guild.id, member1)
          client.db.setMemberDB(user.user.id, message.guild.id, member2)
          const embed = new MessageEmbed()
          .setAuthor('Свадьба!')
          .setDescription(`**${message.author.tag}** женился на **${user.user.tag}**!`)
          .setColor('#f896ff')
          message.channel.send(embed)
        }
        else {
          const embed = new MessageEmbed()
          .setAuthor('Сожалеем..')
          .setDescription(`**${user.user.tag}** отказал вам..`)
          .setColor('#0b0d40')
          message.channel.send(embed)
        }
        msg.delete()
      });
      
      collector.on('end', collected => {
        if(already == false){
          const embed = new MessageEmbed()
          .setAuthor('Сожалеем..')
          .setDescription(`**${user.user.tag}** отказал вам..`)
          .setColor('#0b0d40')
          message.channel.send(embed)
          msg.delete()
        }
      });
    })
  }
  else if(args[0] == 'info'){
    let userdb = await client.db.getMemberDB(message.author.id, message.guild.id)
    let partner = userdb.marry
    if(partner == null) partner = 'Никто'
    else partner = `<@${partner}>`
    const embed = new MessageEmbed()
    .setAuthor('Информация о браке')
    .setDescription('Ваш партнёр: ' + partner)
    .setColor('#d468c3')
    message.channel.send(embed)
  }
  else if(args[0] == 'leave'){
    let userdb = await client.db.getMemberDB(message.author.id, message.guild.id)
    if(userdb.marry == null) return ErrorMessages.notvalid(message, 1, 'Вы не состоите в браке!')
    if(userdb.money < config.marry_leave_cost) return ErrorMessages.notvalid(message, 1, 'У вас не хватает денег!')
    userdb.money -= config.marry_leave_cost
    const old_id = userdb.marry
    let userdb2 = await client.db.getMemberDB(userdb.marry, message.guild.id)
    userdb.marry = null
    userdb2.marry = null
    client.db.setMemberDB(message.author.id, message.guild.id, userdb)
    client.db.setMemberDB(old_id, message.guild.id, userdb2)
    const embed = new MessageEmbed()
    .setAuthor('Развод...')
    .setDescription(`К сожалению, ${message.author} и <@${old_id}> развелись...`)
    .setColor('#194759')
    message.channel.send(embed)
  }
  // Here code of check words
  else{
    message.channel.send(info)
  }
};
module.exports.help = {
  name: "marry",
  aliases: ["свадьба", "женитьба"],
  desk: "Помощь по свадьбам ",
  usage: "marry",
  cooldown: 0
};
