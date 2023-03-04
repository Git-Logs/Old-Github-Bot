const { MessageSelectMenu, MessageActionRow } = require('discord.js');

const createDiscordMenu = (array) => {
    
    if (!array) throw new Error('[GitHub Updates] Error: No options were provided for the menu, Make sure you provide all required options');

    if (array.length < 0) throw new Error('[GitHub Updates] Error: Please select atleast one Option for the Menu Array!', "error");

    let select_menu;

    let id = `help-menus`;

    let menus = [];

    const emoji = {
        Git: "📈",
        Info: "ℹ️",
        Owner: "👑",
    }

     array.forEach(cca => {

        let name = cca;

        let sName = `${name.toUpperCase()}`

        let tName = name.toLowerCase();

        let fName = name.toUpperCase();

        return menus.push({
            label: sName,
            description: `${tName} commands!`,
            value: fName
        })
    });

    const some_menu = new MessageSelectMenu()
      .setCustomId(id)
      .setPlaceholder(`Please choose a Command Category!`)
      .addOptions(menus)

     select_menu = new MessageActionRow()
       .addComponents(some_menu);

       return {
           smenu: [select_menu],
           sid: id
       }
}

module.exports = createDiscordMenu;