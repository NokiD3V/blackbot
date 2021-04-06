const Discord = require("discord.js");
// const config = require("./../config.json");
const usersDB = require("./Schematics/User.js"),
guildsDB = require("./Schematics/Guild.js"),
logsDB = require("./Schematics/Log.js"),
membersDB = require('./Schematics/Member'),
Global = require('./Schematics/Global')



//Create/find users Database
module.exports.getUserDB = async function(userID){

  let userDB = await usersDB.findOne({ id: userID });
  if(userDB){
    return userDB;
  } else {
    userDB = new usersDB({
      id: userID,
      money: 0
    })
    await userDB.save().catch(err => console.log(err));
    return userDB;
  }
};
module.exports.global = async function(){

  let userDB = await Global.find()
  if(userDB.length > 0){
    return userDB;
  } else {
    userDB = new Global({bitcoin: 5000, miners:[]})
    await userDB.save().catch(err => console.log(err));
    return userDB;
  }
};

module.exports.setUserDB = async (userID, JSON_stats) => {
  let userDB = await usersDB.findOne({ id: userID });
  if(!userDB){
    userDB = new usersDB({
      id: userID
    })
    await userDB.save().catch(err => console.log(err));
  }
  usersDB.updateOne(userDB, JSON_stats, (err) => {
    if(err) throw err;
  })
  userDB = await usersDB.findOne({ id: userID });
  await userDB.save().catch(err => console.log(err));
  return userDB
}

//Create/find Guilds Database
module.exports.getGuildDB = async function (guildID){

  let guildDB = await guildsDB.findOne( { id: guildID } );

  if(guildDB){
    return guildDB;
  } else {
    guildDB = new guildsDB({
      id: guildID
    })
    await guildDB.save().catch(err => console.log(err));
    return guildDB;
  }
};
module.exports.setGuildDB = async (guildID, JSON_stats) => {
  let guildDB = await guildsDB.findOne({ id: guildID });
  if(!guildDB){
    guildDB = new guildsDB({
      id: guildID
    })
    await guildDB.save().catch(err => console.log(err));
  }
  guildsDB.updateOne(guildDB, JSON_stats, (err) => {
    if(err) throw err;
  })
  guildDB = await guildsDB.findOne({ id: guildID });
  await guildDB.save().catch(err => console.log(err));
  return guildDB
}


//Create/find Members Database
module.exports.getMemberDB = async function (userID, guildID){

  let memberDB = await membersDB.findOne( { id: userID, guildID: guildID } );
  if(memberDB){
    return memberDB;
  } else {
    memberDB = new membersDB({
       id: userID,
       guildID: guildID
    })
    await memberDB.save().catch(err => console.log(err));
    return memberDB;
  }
};
module.exports.setMemberDB = async (userID, guildID, JSON_stats) => {
  let memberDB = await membersDB.findOne({ id: userID, guildID: guildID });
  if(!memberDB){
    memberDB = new membersDB({
      id: userID
    })
    await memberDB.save().catch(err => console.log(err));
  }
  membersDB.updateOne({id: userID, guildID: guildID}, JSON_stats, (err) => {
    if(err) throw err;
  })
  memberDB = await membersDB.findOne({ id: userID, guildID: guildID });
  await memberDB.save().catch(err => console.log(err));
  return memberDB
}
module.exports.getAllMembers = async (guildId) => {
  let members = await membersDB.find({})
  console.log(members)
  return members
}
module.exports.getAllRemindsMembers = async (guildId) => {
  let members = await membersDB.find({})
  return members
}

//Create/find Log in Database
module.exports.getLogDB = async function (user, guild, cmd){

let logDB = new logsDB({
      commandName: cmd.name,
      author: { username: user.username, discriminator: user.discriminator, id: user.id },
      guild: { name: guild ? guild.name : "dm", id: guild ? guild.id : "dm" }
    })
    await logDB.save().catch(err => console.log(err));
    return;

};

