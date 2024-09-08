const { Client, GatewayLayerIntent } = require(`touchguild`);
const fs = require(`fs`)
const config = require(`./resources/variables/config.json`);
const client = new Client(
    { 
        token: config.token, 
        applicationShortname: `bot`, //change this to your desired shortname
        intents: [
            GatewayLayerIntent.ALL
        ],
    }
);

const handlerFiles = fs.readdirSync("./handlers/").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));

const interactionFolders = fs.readdirSync('./interactions');

(async () => {
    for (const file of handlerFiles) {
        require(`./handlers/${file}`)(client);
    }

    client.interactions = new Map();

    client.registerEvents(eventFiles, "./events");
await client.handleInteractions(interactionFolders);


    await client.connect(config.token);
})();