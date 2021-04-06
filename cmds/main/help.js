const Discord = module.require("discord.js");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const fs = require("fs");
let config   = require('../../botconfig.json')
module.exports.run = async (client, message, args) => {
  let member = await client.db.getMemberDB(message.author.id, message.guild.id)
  const px = config.prefix
  if(args[0]) args[0] = args[0].replace(px, '')
  if(!args[0]){
    const embed = new MessageEmbed()
    .setAuthor('Помощь | ' + message.guild.name)
    .setColor('22ee77')
    .setFooter(`Используй ${px}help [название команды] для более точного описания`)
    for (const module of client.modules) {
      console.log(module)
      if(module[0] != 'modules') embed.addField(module[0].toUpperCase(), `\`${module[1].map(n => {return px + n.split('.js').join('')}).join(' ')}\``)
    }
    message.channel.send(embed)
  }
  else if(client.help.has(args[0])){
    var cmd = client.help.get(args[0]).split('|')
    var alias_cmd = client.help.get(args[0] + '-ali')
    if(alias_cmd.length > 3) alias_cmd.length = 3 
    var end_alias = ''
    for (let i = 0; i < alias_cmd.length; i++) {
      const f = alias_cmd[i];
      if(i == 0) end_alias += '| '
      end_alias += `${px}${f}`
      end_alias += ' | '
    }
    if(alias_cmd.length < 1) end_alias = '[ Отсутствуют ]'
    const embed = new MessageEmbed()
    .setAuthor(`Информация`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`**${px}${args[0]}**:\nИспользование: \`\`\`${px}${cmd[1]}\`\`\`\n\nОписание команды: \`\`\`${cmd[0]}\`\`\`\n Алиасы: \`\`\`${end_alias}\`\`\``)
    return message.channel.send(embed)
  }
  else if(args[0]) {
    const embed = new MessageEmbed()
    .setAuthor(`Команда не найдена!`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`Мы очень тщательно обыскали список команд, но...\nМы ничего не нашли ;(`)
    .setColor('#ff2222')
    return message.channel.send(embed)
  }
};
module.exports.help = {
  name: "help",
  aliases: ["хелп", "помощь", "памагити"],
  desk: "помощь о командах",
  usage: "help [команда/модуль]",
  cooldown: 5000
};
