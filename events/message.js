const discord = require("discord.js")

module.exports = (client, message) => {
    const prefix = ".zgl";

        if (message.content.indexOf(prefix) !== 0) return;
    
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
    
        const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
    
        if (cmd) cmd.execute(client, message, args);
    }