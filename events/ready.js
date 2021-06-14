const Discord = require('discord.js');
const fs = require("fs")
module.exports = async (client, message) => {
    console.log(`Aktiviert auf ${client.guilds.cache.size} Servern, mit  ${client.users.cache.size} Usern`);
    

   


/*let statuses = [
{
    name: ` ${client.guilds.cache.size} Servern zu`,
    type: `WATCHING`
  },
  {
    name: `mit  ${client.users.cache.size} Usern`,
    type: `PLAYING`
  },

  {
    name: `Source Code by revoX#8935`,
    type: `WATCHING`
  }

];*/
  client.user.setStatus('online');    
  const statusInterval = setInterval(function() {
  let status = statuses[Math.floor(Math.random() * statuses.length)];
  client.user.setActivity(status);
}, 90000);
}