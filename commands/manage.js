const {SlashCommandBuilder, time} = require("@discordjs/builders");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
        .setName("manage")
        .setDescription("Manage a User")
        .addUserOption(option => option.setName("person").setDescription("Member that will be banned").setRequired(true)),
	async execute(interaction, client, options) {
        const permission = interaction.member.permissions;
        const member = interaction.options.getMember('person');
        var botauth = false;

        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
    
        colour = [r,g,b];
    
        if (interaction.user.id === '553621831177863168') {
            botauth = true;
        }
    
        //if (!permission.has("MANAGE_GUILD")) return interaction.editReply({content: "You don't have permision to use this command", ephemeral: true});
    
        if (!member) return interaction.reply({content: "No member specified", ephemeral: true});
    
        if (member.id === '947281545310400582')  return interaction.reply({content: "You can't do that to the bot", ephemeral: true});
    
        if (botauth || permission.has("ADMINISTRATOR")) {
    
            const embed = new EmbedBuilder()
            .setTitle(`User Management ${member.user.username}`)
            .setImage(member.user.displayAvatarURL())
            .setColor(colour)
            .setDescription('Click one of the buttons below the embed to perform an action.')
        
            const row = new ActionRowBuilder()
            .addComponents(
                [new ButtonBuilder()
                .setLabel("Ban")
                .setStyle(ButtonStyle.Danger)
                .setCustomId(`ban`),
        
                new ButtonBuilder()
                .setLabel("Kick")
                .setStyle(ButtonStyle.Danger)
                .setCustomId(`kick`),
    
                new ButtonBuilder()
                .setLabel("Timeout")
                .setStyle(ButtonStyle.Primary)
                .setCustomId(`timeout`),
            
                new ButtonBuilder()
                .setLabel("Ping")
                .setStyle(ButtonStyle.Primary)
                .setCustomId(`ping`)]
            )
        
            return await interaction.reply({
                embeds: [embed],
                components: [row],
                ephemeral: true
            });
    
        } else {
    
            return interaction.reply({content: "You don't have permision to perform this command", ephemeral: true});
    
        }
    
	},
};