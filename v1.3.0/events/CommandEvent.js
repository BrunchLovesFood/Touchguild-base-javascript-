
//don't touch unless you know what you're doing.

const config = require(`../config/config.json`)

module.exports = {
    name: "messageCreate",
    async execute(message, client) {
        if (message.webhookID) return //ignores webhooks
        const user = await message.member
        if (user.type === `app`) return //check if message was sent by a bot/app

        let prefix = config.prefix //prefix found in the config file
        if (!prefix) {
            await message.createMessage(`The developer broke some form of code and now there is no prefix.`)
        } else {
            const rawMessage = message.content;
            const args = rawMessage.split(" ");

            if (!rawMessage.startsWith(prefix)) return;
            if (rawMessage.startsWith(`![](`)) return;

            const commandName = args[0].replace(prefix, "");

            if (!client.commands.get(commandName)) {

                const embed = {
                    "title": `There was an issue!`,
                    "description": `Error 101 - Command not found!`,
                    "fields": [
                        { "name": `Fix`, "value": `> Ensure you type the command in correctly, if this doesn't fix the error.`}
                    ]
                    
                }
                await message.createMessage({ embeds: [embed] }) //send error message if command doesn't exist
                return;
            }
            client.commands.get(commandName).execute(message, args, client);
        }
    }
}
