const path = require('path');
const fs = require('fs');
const { resolve } = require('path');

module.exports.getCommandFiles = getCommandFiles = () => {
    let baseFolder = './commands';
    let files = [];
    getFilesRecursively(baseFolder, files);
    return files;
};

const getFilesRecursively = (base, list, currentFiles) => {
    currentFiles = currentFiles || fs.readdirSync(base);
    currentFiles.forEach(
        function (file) {
            let newbase = path.join(base,file);
            if (fs.statSync(newbase).isDirectory()) {
                getFilesRecursively(newbase, list, fs.readdirSync(newbase));
            } else{
                list.push('./' + newbase);
            }
        }
    )
}

module.exports.getUsers = getUsers = (bot, message, mySelf = null) => {
    return new Promise(resolve => {

        let names = [];
    
        bot.guilds.get(message.guild.id).fetchMembers().then(r => {
            r.members.array().forEach(r => {
                if (!r.user.bot) {
                    if (mySelf != null && mySelf.id == r.user.id) return;
                    let username = `${r.user.username}`;
                    names.push(username);
                }
            });
        });

        resolve(names);
    });
};


module.exports.getUsersWithDiscriminator = getUsersWithDiscriminator = (bot, message, mySelf = null) => {
    return new Promise(resolve => {

        let names = [];

        bot.guilds.get(message.guild.id).fetchMembers().then(r => {
            r.members.array().forEach(r => {
                if (!r.user.bot) {
                    if (mySelf != null && mySelf.id == r.user.id) return;
                    let username = `${r.user.username}#${r.user.discriminator}`;
                    names.push(username);
                }
            });
        });
        
        resolve(names);
    });
};

module.exports.namesVoiceChannelConectados = namesVoiceChannelConectados = (message) => {
    return new Promise(resolve => {
        let conectados = (message.member.voiceChannel);
        if (conectados == undefined) {
            message.reply(`Necesitas estar dentro de un canal de voz para saber los ausentes. 😢`);
            return;
        }
        
        voiceGuild = conectados.members.array();
        let namesList = [];
        for (let i = 0; i < voiceGuild.length; i++) {
            let username = `${voiceGuild[i].user.username}#${voiceGuild[i].user.discriminator}`;
            namesList.push(username);
        }
        resolve(namesList);
    });
};
    

module.exports.validarArgs = validarArgs = (args, message) => {
    let res = true;
    if (args.length < 0 || args[0] == undefined) {
        res = false;
        message.channel.send(`Faltó agregar argumentos 😢`);
    }

    return res;
};

module.exports.validarNumero = validarNumero = (args, message) => {
    let res = true;
    if (isNaN(args[0])){
        res = false;
        message.channel.send(`El parametro '${args[0]}' no es un número. 😢`);
    }

    return res;
};

module.exports.mensajeError = mensajeError = (error, message) => {
    console.error(error);
    message.reply('Ocurrió un error al ejecutar ese comando...');
}

module.exports.createNewFields = createNewFields = (commandsNames) => {
    for (let i = 0; i < commandsNames.length; i++) {
        console.log(commandsNames[i]);
    }
}