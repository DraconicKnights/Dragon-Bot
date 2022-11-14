const { SlashCommandBuilder, EmbedBuilder, Guild } = require('discord.js');
const MySql = require('../Database/database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("infraction")
        .setDescription("User's Infractions")
        .addSubcommand( addSubcommand =>
            addSubcommand.setName("add")
            .setDescription("Add infraction")
            .addUserOption(option => option.setName("person").setDescription("Member that will be kicked").setRequired(true))
            .addStringOption(option => option.setName('reason').setDescription('Reason for the kick').setRequired(true)),)
        .addSubcommand( addSubcommand =>
            addSubcommand.setName("list")
            .setDescription("List infraction")
            .addUserOption(option => option.setName("person").setDescription("Member that will be kicked").setRequired(true)),)
        .addSubcommand( addSubcommand =>
            addSubcommand.setName("remove")
            .setDescription("Remove infraction")
            .addUserOption(option => option.setName("person").setDescription("Member that will be kicked").setRequired(true))
            .addNumberOption(option => option.setName("infractionid").setDescription("infractionid").setRequired(true)),),
        async execute(interaction) {
            const permission = interaction.member.permissions;
            const member = interaction.options.getMember('person');
            const user = interaction.user.id;
            const reason = interaction.options.getString("reason");
            const command = interaction.options.getSubcommand(["add", "list", "remove"]);
            const infractiondate = new Date(interaction.createdTimestamp).toLocaleDateString();
            const infractionid = interaction.options.getNumber("infractionid") + 1;

            r = Math.floor(Math.random() * 256);
            g = Math.floor(Math.random() * 256);
            b = Math.floor(Math.random() * 256);
        
            colour = [r,g,b];
    
            if (interaction.user.id === '553621831177863168') {
                botauth = true;
            }
        
            if (!member) return interaction.reply({content: "No member specified", ephemeral: true});
        
            if (member.id === '947281545310400582')  return interaction.reply({content: "You can't do that to the bot", ephemeral: true});

            if (botauth || permission.has("KICK_MEMBERS")) {
                switch (command) {
                    case "add":
                        if (!reason) return interaction.reply({content: 'No reason specified', ephemeral: true});

                        MySql.query(
                            `INSERT INTO Warnings VALUES('${infractionid}', '${interaction.guild.id}', '${member.id}', '${interaction.user.id}', '${reason}')`
                        )
    
                        interaction.reply({content: `Member ${member.displayName} has been sucssefully warned`, ephemeral: true});
                        break;
                    case "list":
                        try {
                            MySql.query(
                                `SELECT * from Warnings where userID = "${member.id}"`, (err, data) => {
                                    if (err)
                                        throw err;

                                        if (data[0]) {
                                            const embed = new EmbedBuilder()
                                            .setTitle(`User Management ${member.user.username}`)
                                            .setImage(member.user.displayAvatarURL())
                                            .setColor(colour)
                                            .setDescription(`${data.map(
                                                (w, i) => `ID: ${i + 1}\n GuildID: ${w.guildId}\n UserID: ${w.userID}\n StaffID: ${w.staffID}\n reason: ${w.reason}\n`
                                            ).join(" ")}`);
    
        
                                            interaction.reply({
                                                embeds: [embed],
                                                ephemeral: true
                                            });
                                        } else if (!data[0]) {
                                            const embed = new EmbedBuilder()
                                            .setTitle(`User Management ${member.user.username}`)
                                            .setImage(member.user.displayAvatarURL())
                                            .setColor(colour)
                                            .setDescription(`${member.user.username} has no infractions`);
        
                                            interaction.reply({
                                                embeds: [embed],
                                                ephemeral: true
                                            });
                                        }
                                }
                            )
                        } catch (error) {
                            console.log(error)
                        }

                        break;
                    case "remove":
                            MySql.query(`DELETE from Warnings where userID = "${member.id}" AND guildId = "${interaction.guild.id}"`)

                        interaction.reply({content: `Member ${member.displayName}'s Warn has been sucssefully removed`, ephemeral: true});
                        break;
                }
            }

           
        }
};