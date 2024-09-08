
module.exports = {
    name: `ready`,
    once: true,
    async execute(client) {
      const requestedData = await client.util.getDataCollectionProfile()
      console.log(requestedData)
        console.log(`${client.user.username} - ${client.user.id} > is online`);

    }
}