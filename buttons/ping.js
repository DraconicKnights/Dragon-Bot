
module.exports = {
	data: {
        name: `ping`
    },
	async execute(interaction) {

        const guild = interaction.guild;
        
        const permission = interaction.member.permissions
           
        interaction.channel.send({content: `<@${member.id}>`})
                    
        interaction.reply({content: `Message has been succsessfully sent`, ephemeral: true})
	},
};