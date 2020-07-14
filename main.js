const Discord = require("discord.js");
const bot = new Discord.Client(); 

const bumpMinutes = process.env.BUMP_TIME || 120;

let bumps = [];

bot.on('ready', () => {
	console.log(`Logged in as ${bot.user.tag}`);

	let presences = [
		'Developed by wolflu#5506',
		'https://github.com/luwol03/dbump'
	];

	let setPresence = async (i) => {
		bot.user.setPresence({
			status: 'online',
			activity: {
				name: presences[i],
				type: 'PLAYING'
			}
		});
	}


	bot.setInterval(() => setPresence(1), 20000);
	bot.setInterval(() => setPresence(0), 40000);
	setPresence(0)
});

bot.on('message', (msg) => {
	if(msg.author.bot) return;
	if(msg.content.slice(0,3) !== '!d ') return;
	let cmd = msg.content.slice(3);

	switch(cmd) {
		case 'bump':
			if(msg.guild === null) {
				return msg.channel.send(`:x: Error: Command \`${cmd}\` only available on a server.`)
			}
			if(Date.now() - bumps[msg.guild.id] <= bumpMinutes * 1000 * 60) {
				let minutes = new Date(bumps[msg.guild.id]);
				minutes.setMinutes(minutes.getMinutes() + bumpMinutes);
				return msg.channel.send(`Du kannst nur alle ${bumpMinutes} Minuten bumpen. Bitte Versuchen sie es in ${Math.round(((minutes - new Date())/1000)/60)} Minuten erneut.`);
			}
			let embed = new Discord.MessageEmbed()
				.setTitle("Unleashed Design: Der beste Webdesign Discordserver")
				.setURL("https://unleashed-design.de")
				.setTimestamp()
				.setDescription(`${msg.author.toString()}\nBump erfolgreich👍`);
			bumps[msg.guild.id] = new Date();
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
