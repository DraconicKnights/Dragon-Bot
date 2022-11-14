const { Client, Events, Collection, GatewayIntentBits, InteractionType } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv/config');
const MySql = require('./Database/database');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
})

MySql.connect(function(error) {
    if (error) {
        console.log(error)
    } else {
        console.log('Connected to Database')
    }
});

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath, client);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.buttons = new Collection();

const buttonPath = path.join(__dirname, 'buttons');
const buttonFiles = fs.readdirSync(buttonPath).filter(file => file.endsWith('.js'));

for (const file of buttonFiles) {
	const filePath = path.join(buttonPath, file);
	const button = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in button && 'execute' in button) {
		client.buttons.set(button.data.name, button);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// client.once(Events.ClientReady, c => {
// 	console.log(`Ready! Logged in as ${c.user.tag}`);
// });

// client.on('roleCreate', role => {
//     console.log('Role Created')
//     console.log(role.name);
// })

// client.on('roleUpdate', role => {
//     console.log('Role Updated')
//     console.log(role.hexColor);
//     console.log(role.name);
// })

// client.on('roleDelete', role => {
//     console.log('Role Deleted')
//     console.log(role.name);
// })

// client.on('channelCreate', channel => {
//     console.log('Channel Created')
//     console.log(channel.name);
// })

// client.on('channelDelete', channel => {
//     console.log('Channel Deleted')
//     console.log(channel.name);
// })

// client.on(Events.InteractionCreate, async interaction => {
// 	// if (!interaction.isChatInputCommand()) return;

//     const { guild } = interaction

    // if (interaction.type === InteractionType.ApplicationCommand) {

//         const command = interaction.client.commands.get(interaction.commandName);

//         if (!command) {
//             console.error(`No command matching ${interaction.commandName} was found.`);
//             return;
//         }

//         console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction Command: ${command.name} Server: ${guild.name}.`);

//         try {
//             await command.execute(interaction, client);
//         } catch (error) {
//             console.error(error);
//             await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
//         }
//     } else if (interaction.isButton()) {

//         const button = interaction.client.buttons.get(interaction.customId);

//         // // console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction Button: ${command.name} Server: ${guild.name}.`);

//         try {
//             await button.execute(interaction, client);
//         } catch (error) {
//             console.error(error);
//             await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
//         }
        

        // if (interaction.user.id === '553621831177863168' || perm.has("ADMINISTRATOR")) {

        //     try {

        //         switch (command) {
        //             case "ban":
        //                 member.ban();
        //                    interaction.reply({content: `${member.user.username} Has been bannd`, ephemeral: true})
        //             break;
        //             case "kick":
        //                 member.kick();
        //                     interaction.reply({content: `${member.user.username} Has been kicked`, ephemeral: true})
        //             break;
        //             case "timeout":
        //                 member.disableCommunicationUntil(Date.now() + (5 * 60 * 1000),).then( () => {
        //                     interaction.reply({content: `Member ${member.displayName} has been successfully timed out`, ephemeral: true});
        //                     }).catch(error => {
                            
        //                         console.log(error);
                            
        //                         interaction.reply({content: "An unknow error occured please check the logs", ephemeral: true});
        //                     })
        //             break;
        //             case "ping":
    
        //                 interaction.channel.send({content: `<@${member.user.id}>`})
                    
        //                 interaction.reply({content: `Message has been succsessfully sent`, ephemeral: true})
        //             break;
        //         }
    
        //     } catch (error) {
        //         console.log(error);
        //     }
        // } else {
        //     return interaction.reply({content: "You don't have permision to use this command", ephemeral: true});
        // }
    // }

// });

client.login(process.env.TOKEN)