const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			guarded: true,
            description: 'Approve a discord server',
            usage: "<ID:string>",
            usageDelim: " "
		});
	}

	async run(message, [serverid]) {

        if (message.author.id != '648552095531663361') return message.channel.send('You cannot approve servers, sadly, if you would like to be a moderator, DM the owner to apply.')

        const guild = this.client.guilds.get(serverid)
        const owner = this.client.users.get(guild.ownerID)
        if (!owner) return message.channel.send('I couldnt find the owner.')
        if (!guild) return message.channel.send('You sent an invalid ID or I am not in it. Did you invited me in it?')
        
        guild.settings.update('hidden', false)
        
        owner.send('Your server (' + guild.name + ') has been approved. :tada:')

    }

};
