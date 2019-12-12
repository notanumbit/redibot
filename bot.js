const Discord = require('discord.js');
const client = new Discord.Client();
var waitUntil = require('wait-until');

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

	function obtainEmbedUrls() {
		urls = [];
		msg.embeds.forEach(function(value, key, map) {
			if (!urls.includes(value.url) && (value.url !== null) && (value.url !== '')) {
				urls.push(value.url);
			}
		});
		return urls;
	}

	function redirectEmbedsWithWait() {
		waitUntil()
    		.interval(500)
    		.times(6)
		    .condition(function() {
		        return (msg.embeds.length > 0);
		    })
		    .done(function(result) {
		    	urls = obtainEmbedUrls();
		    	urls.forEach(function(value, key, map) {
		    		toChannel.send(value)
		    			.catch(console.error);
		    	});
		    });
	}

	if (!msg.author.bot && (msg.channel.id !== toChannelID) && (fromChannelIDs.includes(msg.channel.id))) {
		/*console.log("Redirect Message Found!");
		console.log("Message ID = " + msg.channel.id);
		console.log("fromChannelIDs = " + fromChannelIDs);*/
		/*console.log("Booleans:");
		console.log("Author? => " + !msg.author.bot);
		console.log("toChannelId = msg.id? => " + (msg.channel.id !== toChannelID));
		console.log("fromChannelIDs.includes(msg.channel.id)? => " + fromChannelIDs.includes(msg.channel.id));
		*/
		msg.attachments.forEach(redirectAttachments);
		redirectEmbedsWithWait();
	}
});


client.login(process.env.BOT_TOKEN);
