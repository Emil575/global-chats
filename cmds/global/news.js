const discord = require("discord.js")
const fs = require("fs")

module.exports = {
  name: 'news',
  aliases: ['n'],
  Categorie: 'global',
  utilisation: '{prefix}news',

  execute(client, message, args) {
    if(message.author.id !== "508311556409393162")return message.reply("Du bist leider nicht der Bot Owner")
  const glo = JSON.parse(fs.readFileSync("./globals.json", "utf8"));
if(!args.join(" "))return message.reply("Bitte gebe eine Nachricht an")



const announc = new discord.MessageEmbed()
announc.setThumbnail("https://minerescue.org/wp-content/uploads/2020/03/Marketplace-Lending-News.jpg")
announc.setColor("GREEN")
announc.setTitle(":loudspeaker: News :loudspeaker:")
announc.setDescription(args.join(" "))
announc.setFooter("Ankündigung von "+ message.author.tag)
announc.setTimestamp()

message.react("✅")
  client.guilds.cache.forEach(g => {
    try {
      client.channels.cache.get(glo[g.id].globalchat).send(announc);
    } catch (e) {
      return;
    }
  });
}
}