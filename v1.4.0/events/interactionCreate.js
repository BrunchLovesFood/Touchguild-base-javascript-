// const { CommandInteraction } = require("touchguild")
// const { askGPT, generateToken } = require('../resources/functions');
// const link = require(`../resources/Schemas/linkData`)


// module.exports = {
//     name: `interactionCreate`,
// /**
// * @param {CommandInteraction} interaction
// */
//     async execute(interaction, client) {


//         switch(interaction.data.name) {
//             case `ask`: {
//                 const response = await fetch(`http://localhost:1255/settings/${interaction.guildID}`);
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 } else {
//                     const settings = await response.json();
                    
                
//                 try {
//                     const serverId = interaction.guildID;
//                     const userId = interaction.memberID;
//                     const RESTcontent = await client.rest.channels.getMessage(interaction.channelID, interaction.id)
//                     const prompt = RESTcontent.content
//                     const personality = settings.GPTPersonality;

//                         client.rest.channels.createReaction(interaction.channelID, `ChannelMessage`, interaction.id, `2371918`)
//                         //interaction.createReaction(`2371918`);
//                         let conversationHistory = client.userConversations.get(userId) || '';
//                         conversationHistory += `\nUser: ${prompt}`;
            
            
//                         askGPT(prompt, personality).then(response => {
//                             const botResponse = response.replace(/^Mo:\s*/, '');
//                             interaction.createMessage({content: botResponse});
//                             conversationHistory += `\n${botResponse}`;
//                             client.userConversations.set(userId, conversationHistory);
//                         }).catch(error => console.error(`Error: `, error));
            
            
//                     const statsCount = await fetch(`http://localhost:1155/stats/overall`)
//                     if (!statsCount.ok){
//                         return
//                     }
//                     const data = await statsCount.json()
//                     let currentCount = data.askmo;
//                     let newCount = currentCount + 1
//                     await fetch(`http://localhost:1155/update`, {
//                         method: "POST",
//                         headers: {
//                           "Content-Type": "application/json"
//                         },
//                         body: JSON.stringify({
//                             "askmo": newCount
//                         })
//                     })
//                 } catch (error) {
//                     console.log(error)
//                 }
//             } 
//                 break;
//             }
//             case `personality`: {
//                 const permissionCheck = await (await interaction.member)?.getPermission();
//                 if (permissionCheck.includes(`CanManageChats`) || interaction.member.isOwner ) {
//                 const RESTcontent = await client.rest.channels.getMessage(interaction.channelID, interaction.id)
//                 const message = RESTcontent.content.replace(`/mo personality`, "")
//                 const data = await fetch(`http://localhost:1255/settings/${interaction.guildID}/update`, {
//                     method: "POST",
//                     headers: {
//                       "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify({
//                       "GPTPersonality": `${message}`
//                     })
//                   })
//                   if (data.ok) {
//                     await interaction.createMessage({content: `Mo's personality has changed to: ${message}`, isPrivate: true})
//                   }
//                 }
//                 break;
//             }
//             case `ping`: {
//                 await interaction.createMessage({content: `pong`})
//             }
//             case `link`: {
//                 const permissionCheck = await (await interaction.member)?.getPermission();
//                 if (permissionCheck.includes(`CanManageChannels`) || interaction.member.isOwner ) {
                
//                 const token = interaction.data.options.getStringOption(`token`)
//                 const webby = interaction.data.options.getStringOption(`webhook`)
//                 const channel = interaction.data.options.getChannelOption(`channel`)
//                 //console.log(channel.value)
//                 const data = await link.findOne({LinkToken: token.value})
//                 //console.log(data)

//                 if (data) {
//                     await link.findOneAndUpdate(
//                         { LinkToken: token.value },
//                         {
//                             Guilded: interaction.guildID,
//                             guildedchannel: channel.value,
//                             guildedwebhook: `${webby.value}`,
//                         },
//                         { new: true }
//                     );
//                     await interaction.createMessage({ content: 'Link updated successfully. Make sure to also use the link command in Discord.' });
//                 } else {
//                     await interaction.createMessage({ content: 'Please use /mo token to start up the linking process.' });
//                 }
//             }
//                 break;
//             }
//             case `token`: {
//                 const permissionCheck = (await interaction.member)?.getPermission("CanManageChannels");
//                 if (await permissionCheck || interaction.member.isOwner ) {
//                     await interaction.createMessage({content: `Generating a token for you.`})
//                 try {
//                     const token = generateToken(8)
//                     const tokenEmbed = {
//                     title: `Generated your token.`,
//                     description: `Please keep this token safe, you will need it to link other platforms to your server. You may now use /link to link a channel.\n Token: \`${token}\``
//                     }
//                     await interaction.createFollowup({embeds: [tokenEmbed]})

//                     await new link({
//                         LinkToken: `${token}`,
//                         Discord: ``,
//                         Guilded: ``,
//                         discordchannel: ``,
//                         discordwebhook: ``,
//                         guildedchannel: '',
//                         guildedwebhook: '',
//                     }).save()

//                 } catch (error) {
//                     return
//                 }
//             }
//                 break;
//             }
//             case `unlink`: {
//                 const permissionCheck = (await interaction.member)?.getPermission("CanManageChannels");
//                 if (await permissionCheck || interaction.member.isOwner ) {
//                     const channel = interaction.data.options.getChannelOption(`channel`)
//                     await link.findOneAndDelete({guildedchannel: channel.value})
//                     await interaction.createMessage({content: `I have successfully unlinked this channel`})
//                 }
//                 break;
//             }
//         }

//     }
// }

const { CommandInteraction } = require("touchguild")


module.exports = {
    name: `interactionCreate`,
/**
* @param {CommandInteraction} interaction
*/
    async execute(interaction, client) {

        const user = await interaction.member
        if (user.type === `app`) return 

                    if (!client.interactions.get(interaction.data.name)) {

                        const embed = {
                            "title": `There was an issue!`,
                            "description": `Error 101 - Command not found!`,
                            "fields": [
                                {name: `Fix`, value: `> Ensure you typed the command in correctly, if this doesn't fix the error ensure the command is in the help center. Do ${prefix}help to get the help center.`}
                            ]
                        }
                            await interaction.createMessage({ embeds: [embed] });
                        return;
                    }
                    client.interactions.get(interaction.data.name).execute(interaction, client);
                }
            }