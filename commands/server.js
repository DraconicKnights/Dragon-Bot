const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(interaction) {

		r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
    
        colour = [r,g,b];

		const embed = new EmbedBuilder()
		.setColor(colour)
		.setTitle(`${interaction.guild.name} info`)
		.setDescription('Server info')
		.setThumbnail(interaction.guild.iconURL())
		.addFields(
			{ name: 'Server Members', value: `${interaction.guild.memberCount}` },
			{ name: '\u200B', value: '\u200B' },
			{ name: 'Inline field title', value: 'Some value here', inline: true },
			{ name: 'Inline field title', value: 'Some value here', inline: true },
		)
		.setTimestamp();

		interaction.reply({
			embeds: [embed],
			ephemeral: true
		});
	},
};