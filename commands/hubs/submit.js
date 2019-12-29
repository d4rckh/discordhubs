const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			guarded: true,
            description: 'Submit your discord server!',
            usage: "<ID:string>",
            usageDelim: " "
		});
	}

	async run(message, [serverid]) {
        const guild = this.client.guilds.get(serverid)
        if (!guild) return message.channel.send('You sent an invalid ID or I am not in it. Did you invited me in it?')
        if (guild.ownerID != message.author.id) return message.channel.send('You are not the owner of the server. Ask the server owner to try the command.')


        guild.channels.filter((c) => c.type == 'text').first().createInvite({
            maxAge: 0,
            maxUses: 0
        }).then(invite => {
            message.guild.settings.update('invite', invite.code)
            message.channel.send('Thanks for submiting your discord server, you will get a message in your dms if you server is accepted or denied!')
            this.client.channels.get('660816194928115734').send(message.author.tag + ' wants his server reviewed: ID:`' + serverid + '`; INVITE:`' + invite.code + '`')
        }).catch(() => {
            message.channe.send('I could not create an invite for the server so the moderators can review :(')
        })

    }

};
