const djs = require('discord.js');
const config = require('../config.json');
const fs = require('fs');
const func = require('../functions.js');

module.exports = {
    name: 'uptime',
    description: 'Uptime du serveur',

    run: async (client, message, args) => {
        // uptime in seconds to days, hours, minutes and seconds
        const uptime = process.uptime();
        const days = Math.floor(uptime / 86400);
        const hours = Math.floor(uptime / 3600) % 24;
        const minutes = Math.floor(uptime / 60) % 60;
        const seconds = Math.floor(uptime) % 60;

        // ne pas afficher les jours s'il n'y en a pas ect...
        let uptimeString = "";
        if (days > 0) uptimeString += `${days} jours, `;
        if (hours > 0) uptimeString += `${hours} heures, `;
        if (minutes > 0) uptimeString += `${minutes} minutes et `;
        uptimeString += `${seconds} secondes`;

        const embed = new djs.MessageEmbed()
            .setColor(config.guild.messages.color)
            .setDescription(`${config.server.name} est en ligne depuis ${uptimeString}`)
            .setTimestamp()
            .setFooter({ text: func.getFooter(), icon_url: client.user.displayAvatarURL() });

        const button = new djs.MessageButton()
            .setStyle('LINK')
            .setLabel('Se connecter au serveur')
            .setURL(`${config.server.cfxre_url}`)

        const row = new djs.MessageActionRow()
            .addComponents(button)

        message.channel.send({ embeds: [embed], components: [row] }).then(msg => {
            if (config.guild.messages.auto_destroy === "yes") {
                setTimeout(() => {
                    msg.delete();
                }, config.guild.messages.destroy_time * 1000);
            }
        })
    }
}