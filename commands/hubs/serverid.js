const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			guarded: true,
            description: 'Get your server id',
            usage: "",
            usageDelim: " "
		});
	}

	async run(message) {
        message.channel.send('Your server id is: `' + message.guild.id + '`')
    }

};
