const { Events, EmbedBuilder } = require('discord.js');
const MySql = require('../Database/database');

module.exports = {
	name: Events.ClientReady,
    once: false,
	execute(client) {
		
		client.on('messageCreate', message => {
            MySql.query(
                `SELECT * from GuildLogsChannel WHERE guildId  = "${message.guild.id}"`, (err, data) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    if (message.author.bot) return;

                    if (!data[0] && !data[0].channelId) {
                        return;
                    }

                    r = Math.floor(Math.random() * 256);
                    g = Math.floor(Math.random() * 256);
                    b = Math.floor(Math.random() * 256);
                
                    colour = [r,g,b];

                    const embed = new EmbedBuilder()
                    .setTitle(`Message Created`)
                    .setImage(message.guild.iconURL())
                    .setColor(colour)
                    .setDescription(message.content)
                    .addFields(
                        { name: 'Member:', value: `${message.author}`},
                        { name: 'Channel:', value: `${message.channel}`}
                    )
                    
                    const channelid = data[0].channelId;

                    const channel = message.guild.channels.cache.get(channelid);

                    channel.send({embeds: [embed]});

                })
        })

        client.on('messageDelete', message => {
            MySql.query(
                `SELECT * from GuildLogsChannel WHERE guildId  = "${message.guild.id}"`, (err, data) => {
                    if (err)
                        throw err;

                    if (message.author.bot) return;

                    if (data[0] === null) return;

                    r = Math.floor(Math.random() * 256);
                    g = Math.floor(Math.random() * 256);
                    b = Math.floor(Math.random() * 256);
                
                    colour = [r,g,b];

                    const embed = new EmbedBuilder()
                    .setTitle(`Message Deleted`)
                    .setImage(message.guild.iconURL())
                    .setColor(colour)
                    .setDescription(message.content)
                    .addFields(
                        { name: 'Member:', value: `${message.author}`},
                        { name: 'Channel:', value: `${message.channel}`}
                    )
                    
                    const channelid = data[0].channelId;

                    const channel = message.guild.channels.cache.get(channelid);

                    channel.send({embeds: [embed]});

                })
        })
	},
};