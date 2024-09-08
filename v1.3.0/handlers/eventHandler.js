module.exports = (client) => {
    client.registerEvents = async (eventFiles) => {
        for (const file of eventFiles) {
            const event = require(`../events/${file}`);

            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }
        }
    }
}

//Leave this alone unless you know what you're doing, works flawlessly for this type of application.