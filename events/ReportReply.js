const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, Guild, PermissionOverwrites, PermissionFlagsBits } = require("discord.js");
const MySql = require('../Database/database');

module.exports = {
    name: "interactionCreate",

    async execute(interaction) {
        const reportId = Math.floor(Math.random() * 100) + 10;;
        const permission = interaction.member.permissions;

        if (!interaction.isButton()) return;

        if (!["member", "bug", "staffmember"].includes(interaction.customId)) return;

        if (!permission.has("ADMINISTRATOR")) {
            return interaction.reply({content: "You don't have permision to perform this command", ephemeral: true});
        }

        try {
            await interaction.guild.channels.create({
                name: `${interaction.member.user.username}-report${reportId}`,
                type: ChannelType.GuildText,
                parent: "1041520896004870194",
                PermissionOverwrites: [
                    {
                        id: "403155047527088129",
                        deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory],
                        
                    },
                    {
                        id: interaction.member.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory],

                    },
                ]
            }).then(async (channel) => {

                await MySql.query(
                    `INSERT INTO GuildReport VALUES('${interaction.guild.id}', '${interaction.channel.id}', '${interaction.member.id}', '${reportId}', '0', '0', '${interaction.customId}')`
                )

                r = Math.floor(Math.random() * 256);
                g = Math.floor(Math.random() * 256);
                b = Math.floor(Math.random() * 256);
            
                colour = [r,g,b];

                const embed = new EmbedBuilder()
                .setTitle(`Guild: ${interaction.guild.name} Report: ${reportId}`)
                .setImage(interaction.member.user.displayAvatarURL())
                .setColor(colour)
                .setDescription('The report has been succsesfull.')

                const row = new ActionRowBuilder()
                .addComponents(
                    [new ButtonBuilder()
                    .setLabel("Close Report")
                    .setStyle(ButtonStyle.Danger)
                    .setCustomId(`close`),
            
                    new ButtonBuilder()
                    .setLabel("Lock Report")
                    .setStyle(ButtonStyle.Danger)
                    .setCustomId(`lock`),
        
                    new ButtonBuilder()
                    .setLabel("Unlock Report")
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId(`unlock`)])

                    channel.send({embeds: ([embed]), components: [row]});

                    channel.send({content: "Report has been created"});

                    

            })
        } catch (error) {
            console.log(error);
        }
    }
}