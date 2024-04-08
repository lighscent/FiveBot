const config = require('./config.json')

module.exports = {
    getFooter() {
        if (config.guild.messages.auto_destroy === "yes") {
            return `Auto-destroy in ${config.guild.messages.destroy_time} seconds | ${config.bot.name} by Azukiov`
        } else {
            return `${config.bot.name} by Azukiov`
        }
    }
}