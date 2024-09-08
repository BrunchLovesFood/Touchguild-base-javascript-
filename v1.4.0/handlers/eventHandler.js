module.exports = (client) => {
    client.registerEvents = async (eventFiles) => {
        for (const file of eventFiles) {
            const event = require(`../events/${file}`);

            client.on(event.name, (...args) => event.execute(...args, client))
        }
    }
}