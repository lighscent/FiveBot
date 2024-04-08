const djs = require('discord.js');
const config = require('../config.json');
const fs = require('fs');
const func = require('../functions.js');

module.exports = {
    name: 'config',
    description: 'Aide pour la configuration du bot',

    run: async (client, message, args) => {
        const embed = new djs.MessageEmbed()
            .setColor(config.guild.messages.color)
            .setTitle('Configuration du bot')
            .setDescription(`Pour configurer le bot, vous devez modifier le fichier config.json situé dans le dossier du bot.
            \`\`\`json
{
    "guild": {
        "id": "guild_id", // ID du serveur Discord
        "status": {
            "id": "channel_id", // ID du salon de statut
            "active": "yes", // Mettre "yes" pour activer le message de statut ou "no" pour le désactiver
            "everyone": "yes", // Mettre "yes" pour mentionner @everyone ou "no" pour ne pas le mentionner
            "role": "" // Si vous avez mis "no" à "everyone", vous pouvez mettre l'ID d'un rôle à mentionner ou laisser vide pour ne pas mentionner
        },
        "messages": {
            "color": "#ff0000", // Couleur des embeds
            "auto_destroy": "yes", // Mettre "yes" pour activer la suppression automatique des messages du bot ou "no" pour le désactiver
            "destroy_time": "10" // Temps en secondes avant la suppression automatique des messages en secondes
        }
    },
    "server": {
        "name": "ExampleServer", // Nom du serveur FiveM
        "ip": "127.0.0.1:30120", // IP du serveur FiveM (Vous pouvez mettre l'IP du serveur ou un lien cfx.re)
        "cfxre_url": "https://cfx.re/join/example" // Lien cfx.re pour rejoindre le serveur (Uniquement un lien cfx.re)
    },
            
    "bot": {
        "token": "discord_token_bot", // Token du bot Discord
        "name": "FiveBot", // Nom du bot
        "client_id": "1086771036378386452", // ID du bot Discord
        "prefix": "!" // Préfixe des commandes
    }
}\`\`\``)
            .setTimestamp()
            .setFooter({ text: `${config.bot.name} by Azukiov`, icon_url: client.user.displayAvatarURL()});

        message.channel.send({ embeds: [embed] })
    }
}