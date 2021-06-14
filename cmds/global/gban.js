const Discord = require("discord.js")
const fs = require("fs");
module.exports = {
  name: 'gban',
  aliases: ['ban'],
  Categorie: 'global',
  utilisation: '{prefix}gban',

  execute(client, message, args) {

  let user = args[0]
  const toban = client.users.cache.get(`${user}`);


  const rank = JSON.parse(fs.readFileSync("./ranks.json", "utf8"));
  if (rank[message.author.id].rank == "developer"){
    // return message.reply(embed1_ger);
    if (!user) return message.reply("Bitte gebe eine User Id an!");
    if (!user) return;
    const embed = new Discord.MessageEmbed();
    embed.setColor("GREEN");
    embed.setTitle(" Global Chat bann ");
    embed.setDescription(`<@${user}> wurde aus dem Global Chat gebannt`);
    embed.setTimestamp();
    rank[user] = {
      rank: "banned"
    };
    fs.writeFile("./ranks.json", JSON.stringify(rank), err => {
      if (err) console.log(err);

      message.channel.send(embed);
    });
    
  /*} else{
      message.channel.send(embed3_ger);
    }*/
  } else {
    return message.reply("Du hast keine Berechtigung dafür!");
  }
}
}