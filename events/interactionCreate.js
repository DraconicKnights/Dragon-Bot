const { Events, InteractionType, Client } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction, client) {
        const { guild } = interaction

        if (interaction.type === InteractionType.ApplicationCommand) {
    
            const command = interaction.client.commands.get(interaction.commandName);
    
            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }
    
            console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction Command: ${command.name} Server: ${guild.name}.`);
    
            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
    //     } else if (interaction.isButton()) {
    
    //         const command = interaction.client.buttons.get(interaction.customId);
    
    //         // // console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction Button: ${command.name} Server: ${guild.name}.`);
    
    //         try {
    //             await command.execute(interaction, client);
    //         } catch (error) {
    //             console.error(error);
    //             await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    //         }
	// }
}
}
}
