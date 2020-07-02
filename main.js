const Discord = require("discord.js");
const bot = new Discord.Client(); 

const bumpMinutes = process.env.BUMP_TIME || 120;

bot.on('ready', () => {
	console.log(`Logged in as ${bot.user.tag}`);
});

bot.on('message', (msg) => {
	if(msg.author.bot) return;
	if(msg.content.slice(0,3) !== '!d ') return;
	let cmd = msg.content.slice(3);

	switch(cmd) {
		case 'bump':
			if(Date.now() - bot.lastBump <= bumpMinutes * 1000 * 60) {
				let minutes = new Date(bot.lastBump);
				minutes.setMinutes(minutes.getMinutes() + bumpMinutes);
				return msg.channel.send(`Du kannst nur alle ${bumpMinutes} Minuten bumpen. Bitte Versuchen sie es in ${Math.round(((minutes - new Date())/1000)/60)} Minuten erneut.`);
			}
			let embed = new Discord.MessageEmbed()
				.setTitle("Unleashed Design: Der beste Webdesign Discordserver")
				.setURL("https://unleashed-design.de")
				.setTimestamp()
				.setDescription(`${msg.author.toString()}\nBump erfolgreich👍`);
			bot.lastBump = new Date();
			msg.channel.send(embed);
			break;

		case 'help':
			let helpEmbed = {
				"title": "!d bump Hilfe",
				"description": "Alle befehle:",
				"thumbnail": {
					"url": "https://cdn.discordapp.com/icons/348429944826626049/a_86d34ca55a0e58857e023f9c7fc1f8b3.webp?size=128"
				},
				"footer": {
					"text": "Bot by perclf#3108 and wolflu#5506"
				},
				"color": 16739912,
				"fields": [
					{
						"name": "!d bump",
						"value": "bumpe denn server",
						"inline": true
					},
					{
						"name": "!d help",
						"value": "zeige diese hilfe an",
						"inline": true
					},
					{
						"name": "!d ping",
						"value": "zeigt denn ping des bots an",
						"inline": true
					}
				]
			};
			msg.channel.send({ embed: helpEmbed });
			break;

		case 'ping':
			let ping = Date.now() - msg.createdTimestamp;
			msg.channel.send(`:hourglass_flowing_sand: Pong (${ping} ms)`);
			break;

		default:
			msg.channel.send(`:x: Error: Command \`${cmd}\` not found`);
			break;
	}
});
	
bot.login(process.env.TOKEN);
