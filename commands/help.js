const djs = require('discord.js');
const config = require('../config.json');
const fs = require('fs');
const func = require('../functions.js');

module.exports = {
    name: 'help',
    description: 'Liste des commandes',

    run: async (client, message, args) => {
        const embed = new djs.MessageEmbed()
            .setColor(config.guild.messages.color)
            .setTitle('Liste des commandes')
            .setDescription(`Voici la liste des commandes disponibles pour ${config.bot.name}`)
            .addFields(
                { name: `${config.bot.prefix}help`, value: 'Affiche la liste des commandes' },
                { name: `${config.bot.prefix}config`, value: 'Affiche l\'aide pour la configuration du bot' },
                { name: `${config.bot.prefix}uptime`, value: 'Affiche l\'uptime du serveur' }
            )
            .setTimestamp()
            .setFooter({ text: `${config.bot.name} by Azukiov`, icon_url: client.user.displayAvatarURL()});

        message.channel.send({ embeds: [embed] })
    }
}