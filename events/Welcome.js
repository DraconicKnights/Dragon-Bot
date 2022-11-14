const { Events, EmbedBuilder } = require('discord.js');
const MySql = require('../Database/database');

module.exports = {
	name: Events.ClientReady,
    once: false,
	execute(client) {
		
		client.on('guildMemberAdd', member => {
            MySql.query(
                `SELECT * from GuildWelcome where guilId = "${member.guild.id}"`, (err, data) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    if (!data[0]) {
                        return;
                    }

                    const message = data[0].message;


                    r = Math.floor(Math.random() * 256);
                    g = Math.floor(Math.random() * 256);
                    b = Math.floor(Math.random() * 256);
                
                    colour = [r,g,b];


                    const embed = new EmbedBuilder()
                    .setTitle(member.guild.name)
                    .setImage(member.user.displayAvatarURL())
                    .setColor(colour)
                    .setDescription(message)
                    .addFields(
                    )

                    const channelid = data[0].channelId;

                    const channel = message.guild.channels.cache.get(channelid);

                    channel.send({embeds: [embed]});
                })
        })

        client.on('guildMemberAdd', member => {
            MySql.query(
                `SELECT * from GuildLogsChannel where guilId = "${member.guild.id}"`, (err, data) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    if (!data[0]) {
                        return;
                    }

                    r = Math.floor(Math.random() * 256);
                    g = Math.floor(Math.random() * 256);
                    b = Math.floor(Math.random() * 256);
                
                    colour = [r,g,b];


                    const embed = new EmbedBuilder()
                    .setTitle(`Member Joined`)
                    .setImage(member.guild.iconURL())
                    .setColor(colour)
                    .setDescription(message.content)
                    .addFields(
                        { name: 'Member:', value: `${member.name}`},
                        { name: 'ID:', value: `${member.id}`}
                    )

                    const channelid = data[0].channelId;

                    const channel = message.guild.channels.cache.get(channelid);

                    channel.send({embeds: [embed]});
                })
        })

        client.on('guildMemberRemove', member => {
            MySql.query(
                `SELECT * from GuildLogsChannel where guilId = "${member.guild.id}"`, (err, data) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    if (!data[0]) {
                        return;
                    }


                    r = Math.floor(Math.random() * 256);
                    g = Math.floor(Math.random() * 256);
                    b = Math.floor(Math.random() * 256);
                
                    colour = [r,g,b];


                    const embed = new EmbedBuilder()
                    .setTitle(`Member Leave`)
                    .setImage(member.guild.iconURL())
                    .setColor(colour)
                    .setDescription(message.content)
                    .addFields(
                        { name: 'Member:', value: `${member.name}`},
                        { name: 'ID:', value: `${member.id}`}
                    )

                    const channelid = data[0].channelId;

                    const channel = message.guild.channels.cache.get(channelid);

                    channel.send({embeds: [embed]});
                })
        })
	},
};