const Discord = require('discord.js');


module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'Core',
    utilisation: '{prefix}help <command name>',

    execute(client, message, args) {
        message.delete()
        if (!args[0]) {
           //const main = message.client.commands.filter(x => x.Categorie == 'allgemein').map((x) => '`' + x.name + '`').join(', ');
           //const moderation = message.client.commands.filter(x => x.Categorie == 'moderator').map((x) => '`' + x.name + '`').join(', ');
           //const fun = message.client.commands.filter(x => x.Categorie == 'fun').map((x) => '`' + x.name + '`').join(', ');
           const global = message.client.commands.filter(x => x.Categorie == 'global').map((x) => '`' + x.name + '`').join(', ');
           //const owner = message.client.commands.filter(x => x.Categorie == 'owner').map((x) => '`' + x.name + '`').join(', ');
           let pages = [ 'Global chat']
           let page = 1 
           const embed = new Discord.MessageEmbed()
           embed.setAuthor(message.author.tag)
           embed.setColor('#15cdff')
           embed.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
           embed.setTitle("Hilfeseite vom " + client.user.tag) 
           embed.setDescription("Das ist das Hilfemenü vom \nReagiere entsprechend um Commands anzuzeigen\n1️⃣ - Global Chat\nMenü schließen mit ❌");
           embed.setFooter(`.Hier Footer einfügen  • Home`, message.guild.iconURL({dynamic: true}))
           
           message.channel.send({embed}).then(msg => {
               msg.react('🏠').then( r => {
               msg.react('1️⃣')
               msg.react('❌')
           
               // Filters
               const Filter1 = (reaction, user) => reaction.emoji.name === '1️⃣' && user.id === message.author.id
               const Filter6 = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id
               const Filter7 = (reaction, user) => reaction.emoji.name === '🏠' && user.id === message.author.id
           
               const s1 = msg.createReactionCollector(Filter1, {timer: 10000});
               const s6 = msg.createReactionCollector(Filter6, {timer: 10000});
               const s7 = msg.createReactionCollector(Filter7, {timer: 10000});
               s1.on('collect', (r, u) => {//Seite 1
                r.users.remove(r.users.cache.filter(u => u === message.author).first())
                embed.setTitle("Global Chat")
                embed.setDescription(`${global}`)
                embed.setFooter(`Hier Footer einfügen  • Seite 1/${pages.length}`)
                msg.edit(embed)
               })
               s6.on('collect', (r, u) => {//Löschen
                msg.delete()
               })
               s7.on('collect', (r, u) => {//Home
                r.users.remove(r.users.cache.filter(u => u === message.author).first())
                embed.setTitle("Hilfeseite vom ZickZackGlobal Bot") 
                embed.setDescription("Das ist das Hilfemenü vom \nReagiere entsprechend um Commands anzuzeigen\n1️⃣ - Global Chat\nMenü schließen mit ❌");
                embed.setFooter(`Hier Footer einfügen • Home`)
                msg.edit(embed)
               })
            })
        })
} else {
        const command = message.client.commands.get(args.join(" ").toLowerCase()) || message.client.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));

        const errorFalseCommand = new Discord.MessageEmbed();
        errorFalseCommand.setColor('RED');
        errorFalseCommand.setTitle("Fehler bei der Command Verarbeitung")
        errorFalseCommand.setDescription("Es scheint als existiert dieser Command nicht!\nBitte gebe einen gültigen Command an!")
        errorFalseCommand.setFooter(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
        
        if (!command) return message.channel.send(errorFalseCommand);

        const commandhelp = new Discord.MessageEmbed()
        commandhelp.setAuthor(message.author.tag)
        commandhelp.setFooter(`${message.guild.name}`, message.guild.iconURL);
        commandhelp.setColor('#15cdff')
        commandhelp.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        commandhelp.setTitle(`Hilfe für ${command.name}`)
        commandhelp.addField("Command Name", command.name, true)
        commandhelp.addField("Kategorie", command.Categorie, true)
        commandhelp.addField("Aliases", command.aliases.length < 1 ? lang.helpcommand.commandNoAlias : command.aliases.join(', '), true)
        commandhelp.addField("Nutzung des Commands", command.utilisation.replace('{prefix}', '.zgl'), true)
        message.channel.send(commandhelp)
  }
 }
}