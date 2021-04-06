const Discord = module.require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {
  let gatewayLatency = Math.floor(client.ws.ping);
  message.channel.send("Считаем...").then(m => {
      const trip = Math.floor(m.createdTimestamp - message.createdTimestamp);
      const embed = new Discord.MessageEmbed()
          .setTitle("Pong!")
          .addField("Задержка Discord'а", `${gatewayLatency}ms`, true)
          .addField("Задержка бота", `${trip}ms`, true)
          .setFooter("Приглашайте своих подруг/друзей к нам на сервер", "https://media.discordapp.net/attachments/826101936054992930/826415157151399946/image1.jpg")
          .setColor("#7289DA")
          .setTimestamp();
      m.edit('',embed);
  });
};
module.exports.help = {
  name: "ping",
  aliases: ["пинг", "понг", "pong"],
  desk: "пинг бота",
  usage: "ping",
  cooldown: 5000
};
