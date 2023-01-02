const { MessageEmbed, Client } = require("discord.js")

module.exports = async (client, interaction) => {

    let prefix = 'ghu!';
   
    let color = client.embedColor;
     
     if(interaction.isCommand()) {

        const SlashCommands = client.slash.get(interaction.commandName);
        
        if(!SlashCommands) return;
        
        if (SlashCommands.ownerOnly && interaction.author.id !== `${client.config.owner}`) {
          await interaction.editReply({
          content: `Woah man, Only my Dev: <@510065483693817867> can use this command!`
         }).catch(() => {});
        }
                
        try {
            await SlashCommands.run(client, interaction, prefix).catch(() => {});
        } catch (error) {
            if(interaction.replied) {
                await interaction.editReply({
                    content: `An unexcepted error occured.`
                }).catch(() => {});
            } else {
                await interaction.followUp({
                    ephemeral: true,
                    content: `An unexcepted error occured.`
                }).catch(() => {});
            }
            console.error(error);
        };
    } else return;
        
}