module.exports = async (client, interaction) => {

    const command = client.interactions.get(interaction.commandName);

    try {

        await cmd.exec(interaction, data);

    } catch(error) {

        interaction.reply({
            ephermal: true,
            content: 'Hmm, Somethings wrong here!'
        });

        return client.logger.log(`Unexpected Error Occured: ${error}`, 'error');

    }
}