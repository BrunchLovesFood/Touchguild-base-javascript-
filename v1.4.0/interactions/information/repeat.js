const { ApplicationCommandType, ApplicationCommandOptionType } = require(`touchguild`);

module.exports = {
    name: 'repeat',
    type: ApplicationCommandType.CHAT_INPUT,
    options: [
        {
            name: 'message',
            description: 'Example on using options',
            required: false,
            type: ApplicationCommandOptionType.STRING
        }
    ],
    async execute(interaction){
        const option = interaction.data.options.getStringOption(`message`);
        const message = option.value;
        interaction.createMessage({content: `${message}`});
    }
}