const DiscordHubs = require('./src')

var discordhubs = new DiscordHubs({
    config: {
        discord: {
            bot: {
                token: ""
            }
        },
        webserver: {
            port: 9099
        }
    }
})

discordhubs.run()