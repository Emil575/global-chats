const Discord = require("discord.js")
const fs = require("fs");
module.exports = {
  name: 'set-rank',
  aliases: ['rank'],
  Categorie: 'global',
  utilisation: '{prefix}set-rank',

  execute(client, message, args) {

  let user = args[0]
  const toban = client.users.cache.get(`${user}`);

  const json = JSON.parse(fs.readFileSync("./ranks.json", "utf8"));
  if (!json[user]) {
    json[user] = {
      rank: "user"
    };
  }
  
    // return message.reply(embed1_ger);
    if (!user) return message.reply("Bitte gebe einen User an!");
    if (!user) return 
    if (!args[1]) return message.reply("Bitte gebe einen Rank an!");
  if (!args[1] ||!args[1] === ["user", "admin", "developer", "supporter", "owner", "moderator"] )
    return message.reply("Gebe einen Rank an!");
    const embed2_ger = new Discord.MessageEmbed();
    embed2_ger.setColor("GREEN");
    embed2_ger.setTitle("Fertig:");
    embed2_ger.setDescription(`Der Rank von  <@${user}> wurde auf  **${args[1]}** gesetzt!`);
    embed2_ger.setTimestamp();
    json[user] = {
      rank: args[1]
    };if (json[message.author.id].rank == "developer"){
    fs.writeFile("./ranks.json", JSON.stringify(json), err => {
      if (err) console.log(err);
    });
    message.channel.send(embed2_ger);
  /*} else{
    message.channel.send(embed3_ger);
  }*/
  } else {
    return message.channel.send("Du hast keine Berechtigung dafür!");
  } 
}
}
 