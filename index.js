const Discord = require('discord.js'),
      fs = require('fs'),
      mongoose = require('mongoose'),
      config = require('./botconfig.json'),
      token = config.token;
    
let client = new Discord.Client()

client.commands = new Discord.Collection();
client.help = new Discord.Collection()
client.modules = new Discord.Collection()
client.cooldown = new Discord.Collection()

client.db = require('./database/MongoDB')
client.userdb = require('./database/Schematics/User')

fs.readdir("./cmds/", (err, files) => {
    if (err) console.log(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    client.modules.set(`modules`, files.filter(f => { return f != 'owner'}))
    files.forEach((f, i) => {
      fs.readdir(`./cmds/${f}/`, (err, files) => {
        if (err) return console.log(err)
        jsfiles = files.filter(f => f.split(".").pop() === "js");
        if(f != 'owner') client.modules.set(`${f}`, jsfiles)
        jsfiles.forEach((b, i) => {
          let props = require(`./cmds/${f}/${b}`)
          client.commands.set(props.help.name, props);
          client.help.set(`${props.help.name}`, `${props.help.desk}|${props.help.usage}`)
          client.help.set(`${props.help.name}-ali`, props.help.aliases)
          for(let i = 0; i < props.help.aliases.length; i++){
            var n = props.help.aliases[i]
            client.help.set(`${n}`, `${props.help.desk}|${props.help.usage}`)
            client.help.set(`${n}-ali`, props.help.aliases)
          }
          props.help.aliases.map(alias => client.commands.set(alias, props));
        })
      });
  
    });
  });
  client.events = new Discord.Collection();
  fs.readdir('./events/', (err, files) => { 
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventStart = eventFunction.run.bind(null, client);
        let eventName = file.split(".")[0];
        client.events.set(eventName, eventStart)
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
  });


  mongoose.connect(config.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    //If it connects log the following
    console.log('[DataBase] All systems was started!')
  }).catch((err) => {
    //If it doesn't connect log the following
    console.log(err)
  });
  

client.login(token)