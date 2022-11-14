const { Events } = require('discord.js');
const MySql = require('../Database/database');

module.exports = {
	name: Events.ClientReady,
	once: false,
	execute(client) {

        client.on('guildCreate', async guild => {
            console.log('Guild Joined')
            console.log(guild.name);
            await MySql.query(
                `INSERT INTO Guilds VALUES('${guild.id}')`)       
            })

        client.on('guildDelete', async guild => {
            console.log('Guild Removed')
            console.log(guild.name);
            await MySql.query(`DELETE from Guilds where guildId = '${guild.id}'`)
        })
	},
};