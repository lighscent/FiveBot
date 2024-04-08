const djs = require('discord.js');
const config = require('./config.json');
const fs = require('fs');


const client = new djs.Client({
    intents: 3276799,
    shards: 'auto',
    partials: ['MESSAGE'],
});

require('./events.js')

try {
    client.login(config.bot.token);
} catch (err) {
    console.error(err);
}