const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, Guild, PermissionOverwrites } = require("discord.js");
const MySql = require('../Database/database');

module.exports = {
    name: "interactionCreate",

    async execute(interaction) {
        const permission = interaction.member.permissions;
        customId = interaction;

        if (!interaction.isButton()) return;

        if (!["close", "lock", "unlock"].includes(customId)) return;

        if (!permission.has("ADMINISTRATOR")) {
            return interaction.reply({content: "You don't have permision to perform this command", ephemeral: true});
        }

        MySql.query(
            `SELECT * FROM GuildReport WHERE ChannelID = '${interaction.channel.id}'`, async (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }

                if (!data[0]) {
                    return;
                }

                const member = interaction.guild.members.cache.get(data[0].MemberID);

                switch (customId) {
                    case "close":

                        
                       await MySql.query(
                            `UPDATE GuildReport SET ChannelID = '${interaction.channel.id}' AND Closed = '1' WHERE ChannelID = "${interaction.channel.id}"`,(err, row) => {
                                if (err) {
                                    console.log(err);
                                }
                            }
                        )

                        interaction.reply({content: "Report closing...", ephemeral: true});
                        channel.delete();

                        break;

                    case "lock":

                        if (!permission.has("ADMINISTRATOR")) {
                            return interaction.reply({content: "You don't have permision to perform this command", ephemeral: true});
                        }    

                        if (data[0].Locked == "1") {
                            interaction.reply({content: "Report is locked", ephemeral: true});
                        }
                        
                        await MySql.query(
                            `UPDATE GuildReport SET ChannelID = '${interaction.channel.id}' AND Locked = '1' WHERE ChannelID = "${interaction.channel.id}"`,(err, row) => {
                                if (err) {
                                    console.log(err);
                                }
                            }
                        )

                            interaction.channel.PermissionOverwrites.edit(member, {SendMessages: false});
                            interaction.reply({content: "Report is locked", ephemeral: true});

                        break;

                    case "unlock":

                        if (!permission.has("ADMINISTRATOR")) {
                            return interaction.reply({content: "You don't have permision to perform this command", ephemeral: true});
                        }    

                        if (data[0].Locked == "0") {
                            interaction.reply({content: "Report is not locked", ephemeral: true});
                        }
                        
                        await MySql.query(
                            `UPDATE GuildReport SET ChannelID = '${interaction.channel.id}' AND Locked = '0' WHERE guildId = "${interaction.channel.id}"`,(err, row) => {
                                if (err) {
                                    console.log(err);
                                }
                            }
                        )

                            interaction.channel.PermissionOverwrites.edit(member, {SendMessages: true});
                            interaction.reply({content: "Report is unlocked", ephemeral: true});

                        break;
                }
            })

    }
}