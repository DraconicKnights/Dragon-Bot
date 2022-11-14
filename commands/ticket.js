const {SlashCommandBuilder, time} = require("@discordjs/builders");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const MySql = require('../Database/database');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ticket')
		.setDescription('Sends the ticket message'),
	async execute(interaction) {
        const permission = interaction.member.permissions;
        const user = interaction.user.id;

        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
    
        colour = [r,g,b];
    
        if (interaction.user.id === '553621831177863168') {
            botauth = true;
        }

        if (botauth || permission.has("BAN_MEMBERS")) {
            MySql.query(
                `SELECT * FROM GuildTicket WHERE guildId = '${interaction.guild.id}'`, (err, data) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    if (!data[0] && !data[0].channelId) {
                        return;
                    }
                    
                    const embed = new EmbedBuilder()
                    .setTitle(`Ticket System ${interaction.guild.name}`)
                    .setImage(interaction.guild.iconURL())
                    .setColor(colour)
                    .setDescription('Click one of the buttons below the embed to perform an action.')
                
                    const row = new ActionRowBuilder()
                    .addComponents(
                        [new ButtonBuilder()
                        .setLabel("Report Member")
                        .setStyle(ButtonStyle.Danger)
                        .setCustomId(`member`),
                
                        new ButtonBuilder()
                        .setLabel("Report Bug")
                        .setStyle(ButtonStyle.Danger)
                        .setCustomId(`bug`),
            
                        new ButtonBuilder()
                        .setLabel("Report Staff Member")
                        .setStyle(ButtonStyle.Danger)
                        .setCustomId(`staffmember`)]
                    )
                
                                                
                    const channelid = data[0].channelId;

                    const channel = interaction.guild.channels.cache.get(channelid);

                    channel.send({embeds: ([embed]), components: [row]});

                    interaction.reply({content: "A report has been created", ephemeral: true});

                })
        }
    }
}