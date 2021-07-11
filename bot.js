const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const db = require("quick.db");
let bot = client





client.commands = new Discord.Collection();

fs.readdirSync('./cmds').forEach(dirs => {
    const commands = fs.readdirSync(`./cmds/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./cmds/${dirs}/${file}`);
        console.log(`Command wird geladen: ${file}!`);
        client.commands.set(command.name.toLowerCase(), command);
    };
});

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));

for (const file of events) {
    console.log(`Events werden geladen: ${file}!`);
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};





client.on("message", async message => {

 

  const glo = JSON.parse(fs.readFileSync("./globals.json", "utf8"));
  const msg = message;
  const globis = glo[message.guild.id].globalchat;
  if (message.channel.id !== globis) return;
  if(message.content.toLocaleLowerCase().includes("https://"))return
  if(message.content.toLocaleLowerCase().includes("http://"))return
      if (message.author.bot) return;
      if (message.channel.type === "dm")return message.channel.send("Bitte hör auf mich zu Dmen. Einfach nur unhöflich einen armen Bot zu Dmen Schäm dich!")


      
     const invite = ""//Invite Link aus dem Developer Portal
     const support = ""//Support Server
     const webseite = ""//Webseite falls vorhanden
     const vote = ""//vote falls vorhanden
     const MessageAttachment = new Discord.MessageAttachment()
      const pols = JSON.parse(fs.readFileSync("./ranks.json", "utf8"));
        if (!pols[message.author.id]) {
          pols[message.author.id] = {
            rank: "spieler"
          };
        }
          const nicks = JSON.parse(fs.readFileSync("./nicks.json", "utf8"));
        if (!nicks[message.author.id]) {
          nicks[message.author.id] = {
            nickname: message.author.tag
          };
        }

        const nickname = nicks[message.author.id].nickname;
        const polices = pols[message.author.id].rank;
        if (pols[message.author.id].rank == "banned") {
            const bann = new Discord.MessageEmbed()
            bann.setThumbnail(message.author.avatarURL({dynamic: true}))
            bann.setAuthor(`${message.guild.name}`, message.guild.iconURL());
            bann.setColor("RED")
            bann.setTitle("Bann")
            bann.setDescription(``)//Dein Bann text
           bann.setFooter("Source Code von revoX#8935")
            message.delete()
            message.reply(bann).then(m => m.delete(10000))
        }
        if (pols[message.author.id].rank == "supporter") {
          const globis = glo[message.guild.id].globalchat;
          if (message.channel.id === globis) {
            /*if(message.attachments.size > 0){
              let attachment = new MessageAttachment(message.attachments.first().url);
            }*/
            const embed = new Discord.MessageEmbed();
            embed.setDescription(message.content + `\n \n[Invite](${invite}) | [Support](${support})`
            );
            embed.setThumbnail(message.author.avatarURL({ dynamic: true}));
            embed.setColor("GREEN");
            embed.setTitle(`Supporter | ${message.author.tag}`);
            embed.setFooter(`${message.guild.name} | ${message.author.id}`, message.guild.iconURL());
            embed.setTimestamp()
            //embed.setImage(message.attachments.first().url)
            message.delete();
            client.guilds.cache.forEach(g => {
              try {
                client.channels.cache.get(glo[g.id].globalchat).send(embed);
              } catch (e) {
                return;
              }
            });
        }
      }
      if (pols[message.author.id].rank == "admin") {
        const globis = glo[message.guild.id].globalchat;
        if (message.channel.id === globis) {
          const embed = new Discord.MessageEmbed();
          embed.setDescription(message.content + `\n \n[Invite](${invite}) | [Support](${support}) | [Webseite](${webseite}) | [Voten](${vote})`
          );
          embed.setThumbnail(message.author.avatarURL({ dynamic: true}));
          embed.setColor("RED");
          embed.setTitle(`Admin | ${message.author.tag}`);
          embed.setFooter(`${message.guild.name} | ${message.author.id}`, message.guild.iconURL());
          embed.setTimestamp()
          message.delete();
          client.guilds.cache.forEach(g => {
            try {
              client.channels.cache.get(glo[g.id].globalchat).send(embed);
            } catch (e) {
              return;
            }
          });
      }
    }
      if (pols[message.author.id].rank == "moderator") {
        const globis = glo[message.guild.id].globalchat;
        if (message.channel.id === globis) {
          const embed = new Discord.MessageEmbed();
          embed.setDescription(message.content + `\n \n[Invite](${invite}) | [Support](${support}) | [Webseite](${webseite}) | [Voten](${vote})`
          );
          embed.setThumbnail(message.author.avatarURL({ dynamic: true}));
          embed.setColor("PINK");
          embed.setTitle(`Moderator | ${message.author.tag}`);
          embed.setFooter(`${message.guild.name} | ${message.author.id}`, message.guild.iconURL());
          embed.setTimestamp()
          message.delete();
          client.guilds.cache.forEach(g => {
            try {
              client.channels.cache.get(glo[g.id].globalchat).send(embed);
            } catch (e) {
              return;
            }
          });
      }
    }
        if (pols[message.author.id].rank == "owner") {
          const embed = new Discord.MessageEmbed();
          embed.setDescription(message.content + `\n \n[Invite](${invite}) | [Support](${support}) | [Webseite](${webseite}) | [Voten](${vote})`
          );
      
          embed.setThumbnail(message.author.avatarURL({ dynamic: true }));
          embed.setColor("BLUE");
          embed.setTitle(`Owner | ${message.author.tag}`);
          embed.setFooter(`${message.guild.name} | ${message.author.id}`, message.guild.iconURL());
          embed.setTimestamp()
          message.delete();
          client.guilds.cache.forEach(g => {
            try {
              client.channels.cache.get(glo[g.id].globalchat).send(embed);
            } catch (e) {
              return;
            }
          });
    }
    
    if (pols[message.author.id].rank == "developer") {
      /*if(message.attachments.size > 0){
        const attachment = new Discord.MessageAttachment(message.attachments.first());*/
      
      const embed = new Discord.MessageEmbed();
      embed.setDescription(message.content + `\n \n[Invite](${invite}) | [Support](${support}) | [Webseite](${webseite}) | [Voten](${vote})`
      );
    
      embed.setThumbnail(message.author.avatarURL({ dynamic: true }));
      embed.setColor("YELLOW");
      embed.setTitle(`Developer | ${message.author.tag}`);
      embed.setFooter(`${message.guild.name} | ${message.author.id}`, message.guild.iconURL());
      embed.setTimestamp()
      //embed.setImage(attachment)
      message.delete();
      client.guilds.cache.forEach(g => {
        try {
          client.channels.cache.get(glo[g.id].globalchat).send(embed);
        } catch (e) {
          return;
        }
      });
    }
    
    if (pols[message.author.id].rank == "spieler") {
      const embed = new Discord.MessageEmbed();
       msg.delete()
       embed.setDescription(message.content + `\n \n[Invite](${invite}) | [Support](${support}) | [Webseite](${webseite}) | [Voten](${vote})`
      );
      embed.setThumbnail(message.author.avatarURL({ dynamic: true }))
      embed.setColor("RANDOM");
      embed.setTitle(`User | ${message.author.tag}`);
      embed.setFooter(`${message.guild.name} | ${message.author.id}`, message.guild.iconURL());
      embed.setTimestamp()
      client.guilds.cache.forEach(g => {
        try {
          client.channels.cache.get(glo[g.id].globalchat).send(embed);
        } catch (e) {
          return;
        }
      });
      }
      if (!glo[message.guild.id]) {
        glo[msg.guild.id] = {
          globalchat: "700263604129366086"
        };
      }
      // } else{ return; }
    });



    client.login()//Token vom Developer Portal https://discord.com/developers
