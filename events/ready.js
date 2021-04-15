const Discord = require('discord.js'),
    fs = require('fs')
    prefix = require('../botconfig.json').prefix
    ErrorMessage = require('../Utils/ErrorMessage.js')
    let checked = false,
    Canvas = require('canvas')
exports.run = async (client) => {

    let stats = ["!help", "Utopia", "!ping мой пинг", "❤"]
    setInterval(() => {
        client.user.setActivity(stats[require('random').int(0, stats.length - 1)], {type: 0})
        if(checked == false){
            if(new Date().toString().substr(0, 3) == 'Mon'){
                checked = true
                let users = client.db.getAllMembers()
                users.map(n => {
                    n.voice_stats.week = 0;
                    client.db.setMemberDB(n.id, n.guildID, n)
                })
                setTimeout(() => checked = false, 24 * 60 * 60  * 1000)
            }
        }
    }, 20000)
    let server = client.guilds.cache.get(require('../botconfig.json').server_id)
    setInterval(async () => {
        for (const channel of server.channels.cache) {
            if(channel[1].type == 'voice'){
                if(channel[1].members.size > 1){
                    for (const mem of channel[1].members) {

                        let voicemember = await client.db.getMemberDB(mem[1].user.id, server.id)
                        if(typeof voicemember.voice_stats.lastconnect != 'string') voicemember.voice_stats.lastconnect = String(new Date());
                        if(voicemember.voice_stats.lastconnect.split(' ')[2] != String(new Date()).split(' ')[2]){
                          voicemember.voice_stats.day = 0
                          voicemember.voice_stats.lastconnect = String(new Date())
                        }
                        else{
                          voicemember.voice_stats.day += 1000
                        }
                        voicemember.voice_stats.week += 1000
                        voicemember.voice_stats.all += 1000     
                        client.db.setMemberDB(mem[1].user.id, mem[1].guild.id, voicemember)
                    }
                }
            }
        }
    }, 1000)
    
    const applyText = (canvas, text) => {
        const ctx = canvas.getContext('2d');
    
        // Declare a base size of the font
        let fontSize = 70;
    
        do {
            // Assign the font to the context and decrement it so it can be measured again
            ctx.font = `${fontSize -= 10}px sans-serif`;
            // Compare pixel width of the text to the canvas minus the approximate avatar size
        } while (ctx.measureText(text).width > canvas.width - 300);
    
        // Return the result to use in the actual canvas
        return ctx.font;
    };
    setInterval(async () => {
        const canvas = Canvas.createCanvas(960, 540);
        const ctx = canvas.getContext('2d');
    
        const background = await Canvas.loadImage('./Utils/banner.png');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
        ctx.strokeStyle = '#74037b';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        let all = 0
        server.channels.cache.filter(n => {return n.type == 'voice'}).map(i => {all += i.members.size})
        // Add an exclamation point here and below
        ctx.font = applyText(canvas, server.members.cache.size);
        ctx.fillStyle = '#C01C48';
        ctx.fillText(server.members.cache.size, 128, 327);

        ctx.font = applyText(canvas, all);
        ctx.fillStyle = '#C01C48';
        ctx.fillText(all, 128, 439);

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'xren.png');
        const channel = server.channels.cache.get('826101936054992930')
        channel.send(attachment)
    }, 50000 * 1000)
}