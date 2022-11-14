const { Events, ActivityType } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		const options = [
		{
			type: ActivityType.Watching,
			text: "The Dragon",
			status: "online"
		},
		{
			type: ActivityType.Listening,
			text: "To the Universe",
			status: "idle"
		},
		{
			type: ActivityType.Listening,
			text: "To the stars",
			status: "idle"
		},

		];

		client.user.setActivity("To the Universe", { type: ActivityType.Listening});
		
	},
};