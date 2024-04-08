const djs = require('discord.js');
const config = require('./config.json');

// event ready
client.on('ready', () => {
    console.log(`Bot is logged in as ${client.user.tag}!`);

        const statut = [
            () => `${GetNumPlayerIndices()} Joueurs`,
            () => `${config.server_name}`,
            () => `${config.bot.prefix}help`
        ]
        let i = 0
        setInterval(() => {
            client.user.setActivity(statut[i](), { type: 'WATCHING' })
            i = ++i % statut.length
        }, 1e4)


        // online message
        const embed = new djs.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${config.server.name} est en ligne`)
            .setDescription('Connectez-vous dès maintenant avec l\'adresse suivante :\n```connect ' + config.server.ip + '```')
            .setTimestamp()

        const button = new djs.MessageButton()
            .setStyle('LINK')
            .setLabel('Se connecter')
            .setURL(`${config.server.cfxre_url}`)

        const row = new djs.MessageActionRow()
            .addComponents(button)

        if (config.guild.status.active === "yes") {
            if (config.guild.status.channel_id !== "") {
                if (config.guild.status.everyone === "yes") {
                    client.guilds.cache.get(config.guild.id).channels.cache.get(config.guild.status.id).send({ content: '@everyone', embeds: [embed], components: [row] })
                } else {
                    if (config.guild.status.role_id !== "") {
                        client.guilds.cache.get(config.guild.id).channels.cache.get(config.guild.status.id).send({ content: `<@&${config.guild.status.role_id}>`, embeds: [embed], components: [row] })
                    }
                }
            } else {
                console.log('Aucun salon de statut défini')
            }
        } else {
            console.log('Le message de statut est désactivé')
        }
});

// event message
client.on('messageCreate', async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.bot.prefix)) return;

    const args = message.content.slice(config.bot.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args);
        // delete user message
        message.delete();
    } catch (err) {
        console.error(err);
    }
});