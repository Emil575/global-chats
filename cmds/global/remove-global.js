const discord = require("discord.js")
const fs = require("fs")

module.exports = {
  name: 'remove-global',
  aliases: ['r-global'],
  Categorie: 'global',
  utilisation: '{prefix}remove-global',

  execute(client, message, args) {
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.reply("Du hast keine Berechtigung dazu! Benötigte Berechtigung: `Manage server`");
  const glo = JSON.parse(fs.readFileSync("./globals.json", "utf8"));
  const channel = message.mentions.channels.first();
  if (!channel) return message.reply("Bitte erwähne einen Channel!");
  if (!channel) return;
  
  delete glo[message.guild.id]
  fs.writeFile("./globals.json", JSON.stringify(glo), err => {
    if (err) console.log(err);
    message.react("❌")
  });

const global = new discord.MessageEmbed()
global.setColor("GREEN")
global.setTitle(" Erfolgreich ")
global.setDescription(`Der Global Chat wurde erfolgreich entfernt`)
global.setFooter("Ausgeführt von "+ message.author.username, message.author.avatarURL({dynamic: true}))
global.setTimestamp()

const goodbey = new discord.MessageEmbed()
goodbey.setColor("GREEN")
goodbey.setTitle(" Good bey ")
goodbey.setDescription(`**${message.guild.name}** hat den Global Chat verlassen!`)
goodbey.setFooter("Entfernt von "+ message.author.tag + " auf "+ message.guild.name, message.author.avatarURL({dynamic: true}))

  message.channel.send(global)
  channel.setTopic("Die Kanalbeschreibung kann nun geändert werden")
  client.guilds.cache.forEach(g => {
    try {
      client.channels.cache.get(glo[g.id].globalchat).send(goodbey);
    } catch (e) {
      return;
    }
  });
}
}