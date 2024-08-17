module.exports ={
    name: `ping`, //name of command, to use this command type /ping
    description: `standard ping command`, //description of command
    usage: ``, //[optional] allows you to get the command usage
    async execute(message, args, client) {
        await message.createMessage({content: `pong!`}) // reply with pong
    }

}