const discord = require("discord.js")
const fs = require("fs")

module.exports = {
  name: 'set-global',
  aliases: ['global'],
  permissions: ["MANAGE_CHANNELS"],
  Categorie: 'global',
  utilisation: '{prefix}set-global #kanal',

  execute(client, message, args) {
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.reply("Du hast keine Berechtigung dazu! Benötigte Berechtigung: `Manage server`");
  const glo = JSON.parse(fs.readFileSync("./globals.json", "utf8"));
  const channel = message.mentions.channels.first();
  if (!channel) return message.reply("Bitte erwähne einen Channel!");
  if (!channel) return;
  glo[message.guild.id] = {
    globalchat: channel.id
  };
  fs.writeFile("./globals.json", JSON.stringify(glo), err => {
    if (err) console.log(err);
  });

const global = new discord.MessageEmbed()
global.setColor("GREEN")
global.setTitle(" Erfolgreich ")
global.setDescription(`Der Global Chat wurde erfolgreich auf ${channel} gesetzt\nIch habe auch noch die Kanalbeschreibung geändert, bitte ändere diese __**nicht**__`)
global.setFooter("Ausgeführt von "+ message.author.username, message.author.avatarURL({dynamic: true}))
global.setTimestamp()

const welcome = new discord.MessageEmbed()
welcome.setColor("GREEN")
welcome.setTitle(" Willkommen im Global Chat")
welcome.setDescription(`**${message.guild.name}** ist dem Global Chat beigetreten!`)
welcome.setFooter("Gesetzt von "+ message.author.tag + " auf "+ message.guild.name, message.author.avatarURL({dynamic: true}))

  message.channel.send(global)//`Der Global Chat wurde auf ${channel} gesetzt`
  channel.setTopic("Die Beschreibung kann im Code des Bots geändert werden")
  client.guilds.cache.forEach(g => {
    try {
      client.channels.cache.get(glo[g.id].globalchat).send(welcome);
    } catch (e) {
      return;
    }
  });
}
}