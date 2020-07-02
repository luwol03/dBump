const Discord = require("discord.js");
const bot = new Discord.Client(); 

bot.on('ready', () => {
	console.log(`Logged in as ${bot.user.tag}`);
});

bot.on('message', (msg) => {
	if(msg.author.bot) return;
	if(!msg.content.startsWith('!')) return;
	let cmd = msg.content.substring(0, 7);
	if(cmd != "!d bump") return;
	if(Date.now() - bot.lastBump <= 7200000) return msg.channel.send("Du kannst nur alle 120 Minuten bumpen.");
	let embed = new Discord.MessageEmbed()
	    .setTitle("Unleashed Design: Der beste Webdesign Discordserver")
	    .setURL("https://unleashed-design.de")
	    .setTimestamp()
	    .setDescription(`${msg.author.toString()}\nBump erfolgreich👍`);
	bot.lastBump = Date.now();
	msg.channel.send(embed);
});
	
bot.login(process.env.TOKEN);
