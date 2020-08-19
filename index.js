const config = require('./config.json');
const Discord = require('discord.js');
const { getCommandFiles, mensajeError, validarMensaje } = require('./util');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const commandFiles = getCommandFiles();
const prefix = config.prefijo;

for (const file of commandFiles) {
    const command = require(file);
    bot.commands.set(command.name, command);
}

bot.on('message', message => {

    //Validaciones para escuchar el mensaje
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    if (message.member == null) {
        message.reply('Lo siento, solo respondo mensajes desde un servidor.');
        return;
    }

    if (message.author.id != message.guild.ownerID){
        message.reply('Lo siento, solo el creador del servidor puede ejecutar comandos 👮‍♂️🚔');
        return;
    }


    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) {
        message.reply('Ese comando no lo conosco, utiliza \`!help\` para saber que comandos tengo! 😘');
        return;
    }

    try {
        command.run(bot, message, args);
    }
    catch (error) {
        mensajeError(error, message);
    }
    
});

bot.on("ready", () => {
    console.log("BOT ONLINE!");
});

bot.login(config.token);