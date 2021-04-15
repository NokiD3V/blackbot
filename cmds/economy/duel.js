const Discord = module.require('discord.js');
const cooldown = new Discord.Collection();
const fs = require('fs');
let config = require('../../botconfig.json');
let time = 24 * 60 * 60 * 1000;
let ms = require('ms')
module.exports.run = async (client,message,args) => {
    function random(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
    let stavka = 0
    // message.delete()
    function constructor(title, color, description){
        const embed = new Discord.MessageEmbed()
        .setAuthor(title, message.author.avatarURL())
        .setColor(color)
        .setDescription(description)
        .setThumbnail('https://www.google.com/imgres?imgurl=https%3A%2F%2Fimg.cliparto.com%2Fpic%2Fxl%2F185945%2F3305300-skull-and-two-crossed-revolvers.jpg&imgrefurl=https%3A%2F%2Fxn--80apfevho.xn--p1ai%2F%25D0%25B8%25D0%25B7%25D0%25BE%25D0%25B1%25D1%2580%25D0%25B0%25D0%25B6%25D0%25B5%25D0%25BD%25D0%25B8%25D0%25B5%2F3305300-%25D1%2587%25D0%25B5%25D1%2580%25D0%25B5%25D0%25BF-%25D0%25B8-%25D0%25B4%25D0%25B2%25D0%25B0-%25D1%2581%25D0%25BA%25D1%2580%25D0%25B5%25D1%2589%25D0%25B5%25D0%25BD%25D0%25BD%25D1%258B%25D1%2585-%25D1%2580%25D')
        message.channel.send(embed)
    }
    let member = await client.db.getMemberDB(message.author.id, message.guild.id)
    let muser = message.mentions.users.first() || message.guild.members.cache.get(member.player_duel)
    if(!muser && args[0] != 'shot') return constructor('Ошибка', '#ff0000', `${message.author}, Я не смог найти человека! Попробуйте ещё раз!`)
    let member_ping = await client.db.getMemberDB(muser.id, message.guild.id)
    if(args[0] == 'shot'){
        if(member.on_duel) return message.channel.send(":x: | Вы не на дуэли!");
        if(member.shot == false) return message.channel.send(":x: | Сейчас не ваш ход!")
        // if(member.player_duel != message.author.id) return message.channel.send(':x: | Сейчас не ваш ход!')
        let win = require('random').int(0, 3);
        console.log(win)
        if(win < 1){
            const embed = new Discord.MessageEmbed()
            .setAuthor('Победа!', message.author.avatarURL())
            .setDescription(`${message.author}, поздравляем! Вы победили на дуэли с ${muser} и ${member.cost_duel}${config.currency}!`)
            .setThumbnail(message.author.avatarURL())
            .setColor('#5D03EE')
            message.channel.send(embed)
            member.money += member.cost_duel;
            member_ping.money -= member.cost_duel;
            member.shot = false;
            member.on_duel = false;
            member_ping.shot = false;
            member_ping.on_duel = false;
        }
        else{
            constructor(`Выстрел ${message.author.tag}`, '#ff0000', `${message.author}, к сожелению вы промазали! Сейчас стреляет ${muser}!\n\nВведите ${config.prefix}duel shot чтобы выстрелить!`)
            member.shot = false;
            member_ping.shot = true;
        }
        await client.db.setMemberDB(message.author.id, message.guild.id, member)
        await client.db.setMemberDB(muser.id, message.guild.id, member_ping)
        return;
    }

    if(muser.bot) return constructor('Ошибка', '#ff0000', `${message.author}, Нельзя выззывать на дуэль ботов!`)
    if(muser.id == message.author.id) return
    if(isNaN(args[1])) return constructor(message.author.tag + ' ошибка!', '#ff0000', `${message.author}, Укажите кол-во на которое вы будете играть !\`${config.prefix}duel @user [количество от 10 до 50]\``)
    let money = Math.floor(Number(args[1]))
    if(money < 50) return constructor(message.author.tag + ' ошибка!', '#ff0000', `${message.author}, Нельзя ставить число меньше 50$!\`${config.prefix}duel @user [количество от 10 до 50]\``);
    if(money > 100000) return constructor(message.author.tag + ' ошибка!', '#ff0000', `${message.author}, Нельзя ставить число больше 100.000$!\`${config.prefix}duel @user [количество от 10 до 50]\``)
    let uid = message.author.id
    if(member.money < money) return constructor(message.author.tag + ' ошибка!', '#ff0000', `${message.author}, У вас не хватает денег! :x:`)
    if(member_ping.money < money) return constructor(message.author.tag + ' ошибка!', '#ff0000', `${message.author}, У пользователя не хватает денег! :x:`);
    if(member.on_duel != false) return constructor(message.author.tag + ' ошибка!', '#ff0000', `${message.author}, вы уже участвует на дуэли!`)
    if(member_ping.on_duel != false) return constructor(message.author.tag + ' ошибка!', '#ff0000', `${message.author}, ${muser} уже участвует на дуэли!`)
    console.log("collector started");
    const embed1 = new Discord.MessageEmbed()
    .setAuthor('Дуэль!', message.author.avatarURL())
    .setDescription(`${muser}, ${message.author} предложил вам пойти на дуэль! Нажмите реакцию ✅ чтобы согласиться! Если вы не согласны, проигнорируйте данное сообщение!`)
    .setColor('#f00f0f')
    message.channel.send(embed1).then(async msg => {
        stavka = money
        msg.react('✅')
        const filter = (reaction, user) => {
            return reaction.emoji.name === '✅' && user.id === muser.id;
        };
        const collector = msg.createReactionCollector(filter, {max: 1, time: 60 * 1000});
        member_ping.player_duel = uid;
        member.player_duel = muser.id;
        let f = true
        collector.on('collect', async m => {
            f = false
            let player = random(2)
            console.log(player)
            if(player == 1){
                constructor(`${message.author.tag} стрелят!`, '#ff0000', `Введите ${config.prefix}duel shot чтобы выстрелить!`)
                member.shot = true;
            }
            else{
                const embed2 = new Discord.MessageEmbed()
                .setAuthor(`${muser.tag} стреляет!`, muser.avatarURL())
                .setDescription(`Введите ${config.prefix}duel shot чтобы выстрелить!`)
                .setColor('#ff0000')
                .setThumbnail(muser.avatarURL())
                message.channel.send(embed2)
                member_ping.shot = true;
            }
            member.cost_duel = money
            member_ping.cost_duel = money
            await client.db.setMemberDB(message.author.id, message.guild.id, member)
            await client.db.setMemberDB(muser.id, message.guild.id, member_ping)
        });
        collector.on('end', collected => {
            if(f == false) return;
            const embed = new Discord.MessageEmbed()
            .setAuthor('Отказ!', muser.avatarURL())
            .setDescription(`${muser} Отказался от участия в дуели! :x:`)
            .setColor('#ff0000')
            .setThumbnail(message.author.avatarURL())
            message.channel.send(embed)
        });
    })
    
};
module.exports.help = {
    name: "duel",
    aliases: ["дуэль"],
    desk: "Дуель",
    usage: "duel [@user] [ставка]",
    cooldown: 1000
}