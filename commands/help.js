const config = require('../config.json');
const { mensajeError } = require('../util');

module.exports = {
    name: "help",
    aliases: ['ayuda',],
    requiereArgumentos: false,
    descripcion: 'Visualiza todos los comandos disponibles',
    run: async (bot, message, args) => {
        try {
            let commandList = [];
            bot.commands.forEach(element => {
                if (element.requiereArgumentos) {
                    commandList.push({ name: `${config.prefijo}${element.name} N`, value: `${element.descripcion}.`});
                } else {
                    commandList.push({ name: `${config.prefijo}${element.name}`, value: `${element.descripcion}.`});
                }
            });

            message.author.send(
                {embed: {
                    color: 3447003,
                    author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL
                    },
                    title: "Comandos:",
                    description: "A continuación se visualizarán los comandos disponibles.",
                    fields: commandList,
                    timestamp: new Date(),
                    footer: {
                    icon_url: bot.user.avatarURL,
                    text: "© 2020"
                    }
                }
            });

        } catch (error) {
            mensajeError(error, message);
        }
    }
}