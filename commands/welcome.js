const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const MySql = require('../Database/database');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('welcome')
		.setDescription('Welcome command')
        .addSubcommand( addSubcommand =>
            addSubcommand.setName("set")
            .setDescription("Set what channel the message will appear in")
            .addChannelOption(option => option.setName('set').setDescription('Channel that will be used').setRequired(true)),)
        .addSubcommand( addSubcommand =>
            addSubcommand.setName("message")
            .setDescription("Message that will be sent")
            .addStringOption(option => option.setName("message").setDescription("Message that will be sent").setRequired(true)),),
	async execute(interaction) {
        const permission = interaction.member.permissions;
        const command = interaction.options.getSubcommand(["set", "message"]);
        const message = interaction.options.getString("message");
        const user = interaction.user.id;
        const channel = interaction.options.getChannel("set").id
    
        if (interaction.user.id === '553621831177863168') {
            botauth = true;
        }

        if (botauth || permission.has("BAN_MEMBERS")) {
            switch (command) {
                case "set":
                    MySql.query(
                        `SELECT * FROM GuildWelcome WHERE guildId = '${interaction.guild.id}'`, (err, data) => {
                            if (err) {
                                console.log(err);
                                return;
                            }

                            // if (data) return;

                            // if (data.guildId) {

                            //     MySql.query(
                            //         `DELETE FROM GuildWelcome WHERE guildId = '${interaction.guild.id}'`,(err, row) => {
                            //           if (err) {
                            //               console.log(err);
                            //           }
                            //         })

                            //     MySql.query(
                            //             `INSERT INTO GuildWelcome VALUES('${interaction.guild.id}', '${channel}', 'Welcome to the server')`
                            //         )
        
                            //     }

                            if (!data.guildId) {

                                MySql.query(
                                    `DELETE FROM GuildWelcome WHERE guildId = '${interaction.guild.id}'`,(err, row) => {
                                      if (err) {
                                          console.log(err);
                                      }
                                    })

                                MySql.query(
                                    `INSERT INTO GuildWelcome VALUES('${interaction.guild.id}', '${channel}', 'Welcome to the server')`
                                )
                            }

                            interaction.reply({content: `Welcome has been set succsesfully `, ephemeral: true});
                        })
                    break;
                case "message":

                    MySql.query(
                        `UPDATE GuildWelcome SET message = '${message}' WHERE guildId = "${interaction.guild.id}"`,(err, row) => {
                            if (err) {
                                console.log(err);
                            }
                            console.log(row)
                        }
                    )
                    interaction.reply({content: `Welcome message has been set succsesfully `, ephemeral: true});
                    break;
            }
        } 
    },
};