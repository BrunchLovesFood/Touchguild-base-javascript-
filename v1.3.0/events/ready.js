module.exports = {
    name: `ready`,
    once: true,
    async execute(client) {
        console.log(`${client.user.username} is online.`) //tells the console the bot is online
    }
}