const { MessageEmbed } = require("discord.js");

module.exports.permissions = (message, name) => {
    if(!name) return console.error(`[ERROR]: No Permissions name!`)
    if(!message) return console.error(`[ERROR]: No messsage!`)
    const embed = new MessageEmbed()
    .setAuthor(`Error`, message.guild.iconURL())
    .setDescription(`У вас не хватет прав **${name}**!`)
    .setColor('#ff2222')
    .setFooter(`Вызвал: ${message.member.displayName}`, message.author.displayAvatarURL({ dynamic: true }))
    message.channel.send(embed).then(msg => {
        msg.delete({ timeout:10000 })
    }).catch(err => {
        this.err(message)
    })
}

module.exports.notvalid = (message, id, ps) => {
    if(!id) return console.error(`[ERROR]: No Permissions name!`)
    if(!message) return console.error(`[ERROR]: No messsage!`)
    const embed = new MessageEmbed()
    .setAuthor(`Error`, message.guild.iconURL())
    .setDescription(`Не правильный синтаксис! Вы неправильно указали **${id} аргумент**!`)
    .setColor('#ff2222')
    .setFooter(`Вызвал: ${message.member.displayName}`, message.author.displayAvatarURL({ dynamic: true }))
    if(ps) embed.addField('Примечание!', ps)
    message.channel.send(embed).then(msg => {
        msg.delete({ timeout:10000 })
    }).catch(err => {
        this.err(message)
    })
}


module.exports.math = (message) => {
    if(!message) return console.error(`[ERROR]: No messsage!`)
    const embed = new MessageEmbed()
    .setAuthor(`Error`, message.guild.iconURL())
    .setDescription(`Неверное математическре выражение! Попробуйте снова!`)
    .setColor('#ff2222')
    .setFooter(`Вызвал: ${message.member.displayName}`, message.author.displayAvatarURL({ dynamic: true }))
    message.channel.send(embed).then(msg => {
        msg.delete({ timeout:10000 })
    }).catch(err => {
        this.err(message)
    })
}

module.exports.cooldown = (message, cooldown) => {
    if(!message) return console.error(`[ERROR]: No messsage!`)
    if((cooldown-Date.now())/1000 >= 60 && (cooldown-Date.now())/1000 < 3600){
        cooldown = Math.round((cooldown - Date.now()) / 1000 / 60) + ' минут'
    }
    else if((cooldown-Date.now())/1000 < 60){
        cooldown = Math.round((cooldown - Date.now()) / 1000)  + ' секунд'
    }
    else if((cooldown-Date.now())/1000/60 > 60){
        cooldown = Math.round((cooldown - Date.now())/1000/60/60) + ' часов'
    }
    else{
        cooldown = '1 секунд'
    }
    const embed = new MessageEmbed()
    .setAuthor(`Error`, message.guild.iconURL())
    .setDescription(`Полегче!\nВы сможете использовать эту команду через **${cooldown}**!`)
    .setColor('#ff2222')
    .setFooter(`Вызвал: ${message.member.displayName}`, message.author.displayAvatarURL({ dynamic: true }))
    message.channel.send(embed).then(msg => {
        msg.delete({ timeout:10000 })
    }).catch(err => {
        this.err(message)
    })
}

module.exports.botperms = (message) => {
    if(!message) return console.error(`[ERROR]: No messsage!`)
    const embed = new MessageEmbed()
    .setAuthor(`Error`, message.guild.iconURL())
    .setDescription(`У бота не хватает прав! Попробуйте поднять роль бота или выдать права администратора`)
    .setColor('#ff2222')
    .setFooter(`Вызвал: ${message.member.displayName}`, message.author.displayAvatarURL({ dynamic: true }))
    message.channel.send(embed).then(msg => {
        msg.delete({ timeout:10000 })
    }).catch(err => {
        this.err(message)
    })
}

module.exports.err = (message) => {

    if(!message) return console.error(`[ERROR]: No messsage!`)
    const embed = new MessageEmbed()
    .setAuthor(`Error`)
    .setDescription(`Неизвестная ошибка! Обратитесь к разработчику бота!`)
    .setColor('#ff2222')
    message.channel.send(embed).then(msg => {
        msg.delete({ timeout:10000 })
    }).catch(err => {
        return console.log(`[ERROR]: Not founden channel!`)
    })
}

