const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const MySql = require('../Database/database');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('log')
		.setDescription('Sets the log channel')
        .addSubcommand( addSubcommand =>
            addSubcommand.setName("set")
            .setDescription("Set what channel the message will appear in")
            .addChannelOption(option => option.setName('set').setDescription('Channel that will be used').setRequired(true)),),
	async execute(interaction) {
        const permission = interaction.member.permissions;
        const command = interaction.options.getSubcommand(["set"]);
        const user = interaction.user.id;
        const channel = interaction.options.getChannel("set").id
    
        if (interaction.user.id === '553621831177863168') {
            botauth = true;
        }

        if (botauth || permission.has("BAN_MEMBERS")) {
            switch (command) {
                case "set":
                    MySql.query(
                        `SELECT * FROM GuildLogsChannel WHERE guildId = '${interaction.guild.id}'`, (err, data) => {
                            if (err) {
                                console.log(err);
                                return;
                            }

                            // if (data) return;
                            
                            // if (data.guildId) {
                            //     MySql.query(
                            //         `DELETE FROM GuildLogsChannel WHERE guildId = '${interaction.guild.id}'`,(err, row) => {
                            //           if (err) {
                            //               console.log(err);
                            //           }
                            //         })

                            //     MySql.query(
                            //             `INSERT INTO GuildLogsChannel VALUES('${interaction.guild.id}', '${channel}')`
                            //         )
                            // }

                            if(!data.guildId) {

                                MySql.query(
                                    `DELETE FROM GuildLogsChannel WHERE guildId = '${interaction.guild.id}'`,(err, row) => {
                                      if (err) {
                                          console.log(err);
                                      }
                                    })

                                MySql.query(
                                    `INSERT INTO GuildLogsChannel VALUES('${interaction.guild.id}', '${channel}')`
                                )
                            }



                            interaction.reply({content: `Logs has been set succsesfully `, ephemeral: true});
                        })
                    break;
            }
        } 
    },
};