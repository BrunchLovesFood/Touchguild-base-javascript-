const fs = require("fs")
const path = require('path');

module.exports = (client) => {
    client.handleInteractions = async (interactionFolders) => {
        const commandsToRegister = [];
        for (const folder of interactionFolders) {
            const commandFiles = fs.readdirSync(path.resolve(__dirname, `../interactions/${folder}`)).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(path.resolve(__dirname, `../interactions/${folder}/${file}`));
                if (command.name && command.type) {
                    client.interactions.set(command.name, command);
                    commandsToRegister.push({
                        name: command.name,
                        type: command.type,
                        options: command.options || [] 
                    });
                } else {
                    console.error(`Command in ${file} is missing a name or type.`);
                }
            }
        }
        if (commandsToRegister.length > 0) {
            try {
                await client.bulkRegisterGlobalApplicationCommand(commandsToRegister);
                console.log(`Successfully registered ${commandsToRegister.length} commands.`);
            } catch (error) {
                console.error('Error registering commands:', error);
            }
        }
    };
}
    