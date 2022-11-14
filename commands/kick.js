const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const MySql = require('../Database/database');

module.exports = {
	data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kicks the user")
        .addUserOption(option => option.setName("person").setDescription("Member that will be kicked").setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Reason for the kick').setRequired(true)),
	async execute(interaction) {
        const permission = interaction.member.permissions;
        const member = interaction.options.getMember('person');
        const user = interaction.user.id;
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
                    member.kick({reason: reason, days: 7}).then( () => {
                        interaction.reply({content: `Member ${member.displayName} has been sucssefully kicked`, ephemeral: true});
                    }).catch(error => {
                        console.log(error);
                        interaction.reply({content: "An unknow error occured please check the logs", ephemeral: true});
                    })
                } else {
                    return interaction.reply({content: "You don't have permision to use this command", ephemeral: true});
                }

            })
	},
};