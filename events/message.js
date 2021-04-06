const Discord = require('discord.js'),
    fs = require('fs')
    prefix = require('../botconfig.json').prefix
    ErrorMessage = require('../Utils/ErrorMessage.js')
exports.run = async (client, message) => {
    if (message.channel.type == "dm") return;
    if (message.author.bot) return;
    let userdb = await client.db.getMemberDB(message.author.id, message.guild.id)
    prefix = require('../botconfig.json').prefix
    let messageArray = message.content.split(" ");
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    userdb.messages += 1
    client.db.setMemberDB(message.author.id, message.guild.id, userdb)
    if (!message.content.startsWith(prefix)) return;
    let cmd = client.commands.get(command.slice(prefix.length));
    if(!cmd) {
      return;
    };
    let cooldown = client.cooldown.get(`${message.author.id}_${message.guild.id}_${cmd.help.name}`)
    if(cooldown - Date.now() >= 0){
        message.delete()
        return ErrorMessage.cooldown(message, cooldown)
    }
    else{
      client.cooldown.set(`${message.author.id}_${message.guild.id}_${cmd.help.name}`, Date.now() + cmd.help.cooldown)
    }
    if(cmd.help.permissions){
      if(cmd.help.permissions.length > 0){
        for (let i = 0; i < cmd.help.permissions.length; i++) {
          const perm = cmd.help.permissions[i];
          if(!message.member.hasPermission(perm)) return ErrorMessage.permissions(message, perm)
        }
      }
    }
    if (cmd) cmd.run(client, message, args);
    if(message.deletable) message.delete()
}