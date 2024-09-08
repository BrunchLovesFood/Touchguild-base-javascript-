const fs = require("fs")

module.exports = (client) => {
    client.handleCommands = async (commandFolders) => {

        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));

            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);
                await client.commands.set(command.name, command);
            }
        }

    }
}

//Leave this alone unless you know what you're doing, works flawlessly for this type of application.