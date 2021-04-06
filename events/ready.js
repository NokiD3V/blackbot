const Discord = require('discord.js'),
    fs = require('fs')
    prefix = require('../botconfig.json').prefix
    ErrorMessage = require('../Utils/ErrorMessage.js')
exports.run = async (client) => {

    let stats = ["!help", "Utopia", "!ping мой пинг", "❤"]
    setInterval(() => {
        client.user.setActivity(stats[require('random').int(0, stats.length - 1)], {type: 0})
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
}