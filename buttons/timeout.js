module.exports = {
	data: {
        name: `timeout`
    },
	async execute(interaction) {

        const permission = interaction.member.permissions;

        if (interaction.user.id === '553621831177863168') {
            botauth = true;
        }

        if (botauth || permission.has("BAN_MEMBERS"))
        {
            target.disableCommunicationUntil(Date.now() + (5 * 60 * 1000),).then( () => {
                interaction.reply({content: `Member ${target.displayName} has been successfully timed out`, ephemeral: true});
                }).catch(error => {
                
                    console.log(error);
                
                    interaction.reply({content: "An unknow error occured please check the logs", ephemeral: true});
                })
        } else {
            return interaction.reply({content: "You don't have permision to use this command", ephemeral: true});
        }
	},
};