const WebServer = require('./Webserver.js')
const events = require('events')
const {Client} = require('klasa')

Client.defaultGuildSchema.add('hidden', 'Boolean', {
    default: true,
    configurable: false
}).add('invite', 'String', {
    configurable: false
})

class DiscordHubs extends events.EventEmitter {
    constructor({config}) {
        super()
        this.config = config
        this.server = null
        this.discordclient = new Client({
            fetchAllMembers: false,
            prefix: "-",
            commandEditing: true,
            typing: false,
            commandLogging: true,
            noPrefixDM: true,
            production: false
        })
    }

    initializeDiscordClient() {
        this.discordclient.login(this.config.discord.bot.token)
        this.emit('discordbot.init')
    }

    async initializeWebServer() {
        this.server = new WebServer({
            port: this.config.webserver.port
        })
        await this.server.init()
        this.server.app.get('/', (req, res) => {
            res.render('servers', {servers: this.discordclient.guilds})
        })
        this.emit('webserver.init')
    }

    run() {
        this.initializeWebServer()
        this.initializeDiscordClient()
    }
}

module.exports = DiscordHubs