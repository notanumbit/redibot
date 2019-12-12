const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

var toChannelID = "654430456435179540"; // Bara-talk ID

//var toChannelID = "654441920277512202";

var fromChannelIDs = ["351822749557063681", "536650499898998819", "282618520397938689"];

//var fromChannelIDs = ["654441905643454483"]; // Private Server From Channel


client.on('message', msg => {

	const toChannel = client.channels.get(toChannelID);

	function redirectAttachments(value, key, map) {
		toChannel.send({
			files: [value.url]
		})
		.catch(console.error);
	}

	function redirectEmbeds(value, key, map) {
		toChannel.send(value.url)
		.catch(console.error);
	}

	if (!msg.author.bot && (msg.channel.id !== toChannelID) && (msg.channel.id in fromChannelIDs)) {
		msg.attachments.forEach(redirectAttachments);
		msg.embeds.forEach(redirectEmbeds);
	}
});

client.login(process.env.BOT_TOKEN);
