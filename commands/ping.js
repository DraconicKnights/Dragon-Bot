const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {

		r = Math.floor(Math.random() * 256);
		g = Math.floor(Math.random() * 256);
		b = Math.floor(Math.random() * 256);
	
		colour = [r,g,b];

		const bot = Date.now() - interaction.createdTimestamp;

		const embed = new EmbedBuilder()
            .setTitle(`Dragon Bot Core`)
            .setColor(colour)
            .setDescription('Dragon Bot Info')
			.addFields(
				{ name: 'API Latency:', value: `${interaction.client.ws.ping}ms`},
				{ name: 'Dragon Bot Latency:', value: `${bot}ms`}
			)

			await interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
			
	},
};