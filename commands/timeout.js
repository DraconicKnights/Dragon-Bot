const { SlashCommandBuilder, EmbedBuilder, Guild } = require('discord.js');
const MySql = require('../Database/database');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timeout')
		.setDescription('timesout a user')
        .addUserOption(option => option.setName("person").setDescription("Member that will be kicked").setRequired(true))
        .addIntegerOption(option => option.setName("muteduration").setDescription("How long will the member be in timeout").setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Reason for the kick').setRequired(true)),
	async execute(interaction) {

        const permission = interaction.member.permissions;
        const member = interaction.options.getMember('person');
        const user = interaction.user.id;
        const muteduration = interaction.options.getInteger('muteduration');
        const reason = interaction.options.getString("reason")

        MySql.query(
            `SELECT * from GuildLogsChannel WHERE guildId  = "${interaction.guild.id}"`, (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }

                if (!data[0] && !data[0].channelId) {
                    return;
                }

                r = Math.floor(Math.random() * 256);
                g = Math.floor(Math.random() * 256);
                b = Math.floor(Math.random() * 256);
            
                colour = [r,g,b];
        
                if (interaction.user.id === '553621831177863168') {
                    botauth = true;
                }
            
                if (!member) return interaction.reply({content: "No member specified", ephemeral: true});
            
                if (!reason) return interaction.reply({content: 'No reason specified', ephemeral: true});
            
                if (member.id === '947281545310400582')  return interaction.reply({content: "You can't do that to the bot", ephemeral: true});
        
                const embed = new EmbedBuilder()
                .setTitle(`Dragon Bot Moderation`)
                .setColor(colour)
                .setImage(member.user.displayAvatarURL())
                .setDescription('Moderation Info')
                .addFields(
                    { name: 'Staff:', value: `${interaction.user.username}`},
                    { name: 'Member:', value: `${member.displayName}`},
                    { name: 'Reason:', value: `${reason}`}
                )

                const channelid = data[0].channelId;

                const channel = interaction.guild.channels.cache.get(channelid);

                channel.send({embeds: [embed]});

                if (botauth || permission.has("KICK_MEMBERS"))
                {
        
                    try {
                        member.timeout(muteduration * 60 * 1000,);
                        interaction.reply({content: `Member ${member.displayName} has been successfully timed out`, ephemeral: true});
                    } catch (error) {
                        console.log(error);
                    }
        
            };
            })
},
}