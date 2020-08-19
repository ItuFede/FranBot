const { getUsers } = require("../util");

module.exports = {
    name: 'equipos',
    aliases: ['mezclar','armarEquipos','shuffle','teams'],
    requiereArgumentos: true,
    descripcion: 'Arma equipos de forma aleatoria (requiere un argumento numerico para la cantidad de equipos)',
    run: async (bot, message, args) => {
        getUsers(bot, message, message.author).then( (names) => {
    
            if (args.length < 0 || args[0] == undefined || args[0] == 0) {
                message.channel.send(`Te faltó especificar cuantos equipos queres armas. 😢`);
            }
            else if (isNaN(args[0])){
                message.channel.send(`El parametro '${args[0]}' no es un número. 😢`);
            }
            else if (args[0] > names.length) {
                message.channel.send(`No se puede armar tantos equipos con tan poca gente. 😢`);
            }
            else{
                let n = names;
                n.sort(function(){
                    return Math.round(Math.random()) - 0.5;
                });
                
                let totalTeams = Math.ceil(names.length/args[0]);  
                let teamList = [];
                for (let i=0, n=1; i<names.length; i+=totalTeams, n++) {
                    let temparray = names.slice(i,i+totalTeams);
                    teamList.push({ name: `Equipo ${n} :`, value: `${temparray.join(', ')}.`});
                }

                message.channel.send(
                    {embed: {
                        color: 15844367,
                        author: {
                        name: bot.user.username,
                        icon_url: bot.user.avatarURL
                        },
                        title: "Equipos:",
                        description: "A continuación se visualizarán los equipos formados.",
                        fields: teamList,
                        timestamp: new Date(),
                        footer: {
                        icon_url: bot.user.avatarURL,
                        text: "© 2020"
                        }
                    }
                });
            }
        });
    },
}