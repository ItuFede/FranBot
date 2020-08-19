const { validarArgs, validarNumero } = require("../util");

module.exports = {
    name: 'timer',
    aliases: ['timerout','tiempo'],
    requiereArgumentos: true,
    descripcion: 'Temporizador (requiere un argumento numerico (minutos))',
    run: async (bot, message, args) => {
        if (validarArgs(args,message) || validarNumero(args,message)) {
            if (args[0] > 60) {   
                message.channel.send(`Recordá que argumento es en minutos,'${args[0]}' es demasiado tiempo!. 😴`);
            }
            else {
                message.channel.send(`El timer sonará en ${args[0]}min ! ⏱`);
                setTimeout(() => {
                    message.channel.send(`@everyone Se termino el tiempo! ⏱`);
                }, args[0]*100000);
            }
        }
    },
}