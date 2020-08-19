const { getUsersWithDiscriminator, namesVoiceChannelConectados } = require("../util");

module.exports = {
    name: 'ausentes',
    aliases: [],
    requiereArgumentos: false,
    descripcion: 'Muestra los usuarios que no estan conectados en el canal general de voz',
    run: async (bot, message, args) => {
        getUsersWithDiscriminator(bot, message).then( (names) => {
            namesVoiceChannelConectados(message).then( (conectedList) => {
                res = [];
                for (let i = 0; i < names.length; i++) {
                    if(!conectedList.includes(names[i]))
                        res.push(names[i]);
                }
                
                message.channel.send(`Falta conectarse: ${res.join(', ')}`);

            });
        });
    },
}