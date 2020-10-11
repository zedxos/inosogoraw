const express = require('express');
const app = express();
const port = 3000;
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(req, res) {
	res.render('index', { client: client });
});

app.get('/statslol', function(req, res) {
	res.render('statslol', { client: client });
});

app.get('/commands', function(req, res) {
	res.render('commands', { client: client });
});

var listeners = app.listen(port, function() {
	console.log(`your app is listening at http://localhost:${port}`);
});

//const Enmap = require("enmap")
const fs = require('fs');
const discord = require('discord.js');
const prefix = 'in!';
const client = new discord.Client({
	partials: ['MESSAGE', 'CHANNEL'],
	fetchAllMembers: true,
	disableEveryone: true
});
const loltest = false;
const welcomesys = false;
client.maxEmojis = new Map();
//client.profile = new Enmap({name:"profile", fetchAll: true})
//client.settings = new Enmap({name:"settings", fetchAll: true})
client.queue = new Map();
client.vote = new Map();
client.search = new Map();
client.optINOUT = new Map();
const NekoClient = require('nekos.life');
const neko = new NekoClient();
const db = require('quick.db');
const { CanvasSenpai } = require('canvas-senpai');
const canva = new CanvasSenpai();
const yaml = require('js-yaml');
const cooldown = new Set();
const fetch = require('node-fetch');
const hi = 'hi';
const myID = '704697854207459419';
const cdtime = 5;
const activs = [
	'in!help',
	'With Users | in!help',
	'Have a nice day/night! ',
	'Stop thinking about past :D',
	'If you read this Add me to your server For free cookies type in!invite :D',
	'in! is prefix :) ',
	'Stay safe!',
	'It is impossible for most people to lick their own elbow. ... | in!help',
	'A crocodile cannot stick its tongue out. | in!help',
	"A shrimp's heart is in its head. | in!help",
	'Inosogo - Just a random name from google.',

	'Did you know this bot was coded using ipad? | in!help',
	'The moon has moonquakes. | in!help',
	'Goosebumps are meant to ward off predators. | in!help',
	"There's no such thing as pear cider. | in!help",
	'Pineapple works as a natural meat tenderizer. | in!help',
	'Humans are the only animals that blush. | in!help',
	'The feeling of getting lost inside a mall is known as the Gruen transfer. | in!help',
	'The hottest spot on the planet is in Libya. | in!help',
	'You lose up to 30 percent of your taste buds during flight. | in!help',
	'Your nostrils work one at a time. | in!help',
	"A chef's toque contains 100 folds. | in!help",
	"Rabbits can't puke. | ;help",
	'The human body literally glows. | in!help',
	'Copper door knobs are self-disinfecting. | in!help',
	'Cotton candy was invented by a dentist. | in!help',
	"Fingernails don't grow after you die. | in!help",
	'Pigeons can tell the difference between a painting by Monet and Picasso. | in!help',
	'The purpose of our lives is to be happy.” — Dalai Lama | in!help',
	'“Life is what happens when you’re busy making other plans.” — John Lennon | in!help',
	'“Get busy living or get busy dying.” — Stephen King | in!help',
	'“You only live once, but if you do it right, once is enough.” — Mae West | in!help',
	'“Many of life’s failures are people who did not realize how close they were to success when they gave up.”– Thomas A. Edison | in!help',
	'“If you want to live a happy life, tie it to a goal, not to people or things.”– Albert Einstein | in!help',
	'Longest anime has over 7500 episodes | in!help',
	'Major Anime are banned in China | in!help',
	'Anime dominates the world of animation | in!help',
	'Anime production is insanely costly! | in!help',
	'Anime Screams can be a good ringtone | in!help',
	'In Japan, there are more than 40 new animes appear on television per week. | in!help',
	'Most famous music video based on “Ghost in the Shell“. | in!help',
	'All manga is drawing by hand. | in!help'
];
var lockedList = ['userID1', 'userID2'];

client.commands = new discord.Collection();

const commandFiles = fs
	.readdirSync('./commands')
	.filter(file => file.endsWith('js'));

client.aliases = new discord.Collection();
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	command.aliases.forEach(alias => client.aliases.set(alias, command.name));
	client.commands.set(command.name, command);
}

client.on('ready', () => {
	setInterval(function() {
		client.user.setActivity(
			activs[Math.round(Math.random() * (activs.length - 1))],
	{ type: 'PLAYING' }
		);
	}, 10000);
	console.log(
		`${
			client.users.cache.get(myID).tag
		} nice lol now the bot is ready`
	);
	console.log(`prefix, ${prefix}`);
	console.log('Guild loaded.');
	console.log(
		'/x/;=+++++i-///=+x+x+//xx/;=+++++i-///=+x+x+//xx/;=+++++i-///=+x+x+//xx/;=+++++i-///=+x+x+//xx/;=+++++i-///=+x+x+//xx/;=+++++i-///=+x+x+//xx/;=+++++i-///=+x+x+//xx/;=+++++i-///=+x+x+//x Done loading.'
	);
	console.log('Im online' + ` ${client.user.tag}`);
});

client.on('message', async message => {
	// if (message.channel.type == "dm") return;
	//client.settings.ensure(message.guild.id, {
	//roles: [],
	//channel: 0,
	//levelsystem: true,
	// xpgain: [ { first: 0, second: 30 }],
	// noxproles: [],
	//noxpchannels: [],
	//doublexproles: [],
	//})

	// if (message.author.bot) return;

	//client.profile.ensure(`${message.guild.id}-${message.author.id}`, {
	//id: message.author.id,
	//guild: message.guild.id,
	// level: 0,
	// levelpoints: 0,
	//lastMessage: "none",
	// })
	if (message.author.bot) return;
	const argslel = message.content.slice(prefix.length).split(/ +/);
	const commandlol = argslel.shift().toLowerCase();
	if (commandlol === 'bugreport') {
		const person = message.author.username;
		const userID = message.author.id;

		if (userID == lockedList) {
			message.channel.startTyping();
			message.channel.send(
				'***You have abused this feature before and as such have been put on a blacklist***'
			);
			message.channel.stopTyping(true);
		} else {
			let bug = argslel.slice(0).join(' ');

			if (!bug) {
				message.channel.startTyping();
				message.channel.send(
					'You are attempting to send a bug report without listing a bug!'
				);
				message.channel.stopTyping(true);
			} else {
				client.users.fetch(myID).then(user => {
					user.send(
						`${person} of ${message.guild.name} (Guild ID: ${
							message.guild.id
						}, User ID: ${userID}) reported the bug: ${bug}`
					);
				});
				message.channel.startTyping();
				message.channel.send(
					'**Your bug was reported. If you abuse this feature you will be put on a blacklist and will be prevented from using this command.**'
				);
				message.channel.stopTyping(true);
			}
		}
	}

	if (message.author.bot || !message.guild) return;
	if (message.channel.id === db.get(`inosogochannel_${message.guild.id}`)) {
		message.channel.startTyping();
		const response = await fetch(
			`https://some-random-api.ml/chatbot?message=${encodeURIComponent(
				message.content
			)}`
		);
		const json = await response.json();
		message.channel.send(json.response);
		message.channel.stopTyping(true);
	}

	//let points = Math.floor(Math.random(client.settings.get(message.guild.id, "xpgain")[0].first) * client.settings.get(message.guild.id, "xpgain")[0].second)
	//let randomcooldown = Math.floor(Math.random() * 8000) + 5000;
	//if (cooldown.has(`${message.author.id}-${message.guild.id}`)) {
	//points = 0;
	//} else if(client.profile.get(`${message.guild.id}-${message.author.id}`, "lastMessage") === message.content) {
	//points = 0;
	//}

	// client.profile.set(`${message.guild.id}-${message.author.id}`, message.content, "lastMessage")

	// client.settings.get(message.guild.id, "doublexproles").forEach(r => {
	//	if (message.guild.member(message.author).roles.has(r)) {
	//	points = points * 2
	//	}
	//})
  
	// let array3 = client.settings.get(message.guild.id, "noxpchannels")
	// if (array3.length) {
	//  array3.forEach(c => {

	//  if (c == message.channel.id) {
	// points = 0;
	//  }
	// })
	//}

	// let array2 = client.settings.get(message.guild.id, "noxproles")
	// if (array2.length) {
	//array2.forEach(r => {
	//let member = message.guild.member(message.author)

	// let roletofind = message.guild.roles.find(n => n.name === r)
	//if(member.roles.has(r)) {
	// points = 0;
	//  }

	// })
	//  }

	//  if(client.settings.get(message.guild.id, "levelsystem") === false) {
	//	points = 0;

	//  }
	//   client.profile.math(`${message.guild.id}-${message.author.id}`, '+', points, "levelpoints")
	// cooldown.add(`${message.author.id}-${message.guild.id}`);

	//dont delete the slash.client.profile.inc(`${message.guild.id}-${message.author.id}`, "levelpoints")

	//setTimeout(() => {
	// cooldown.delete(`${message.author.id}-${message.guild.id}`)
	//}, randomcooldown);

	// const curLevel = Math.floor(0.1 * Math.sqrt(client.profile.get(`${message.guild.id}-${message.author.id}`, "levelpoints")) + 1);

	// const { MessageEmbed } = require('discord.js')
	//  if (client.profile.get(`${message.guild.id}-${message.author.id}`, "level") < curLevel) {

	//let messagee = client.settings.get(message.guild.id, "messagee")
	//let channel = client.settings.get(message.guild.id, "channel")

	//if (!channel) channel = message.channel.id
	//if (messagee == "Not set") messagee = `{user} has leveled up to level **{level}**! `
	//if (client.profile.get(`${message.guild.id}-${message.author.id}`, "level") === 0) {
	//client.profile.set(`${message.guild.id}-${message.author.id}`, 1, "level");
	// } else if(client.profile.get(`${message.guild.id}-${message.author.id}`, "level") > 0) {
	//client.channels.get(channel).send(messagee.replace('{user}', message.author).replace('{level}', curLevel))
	// }

	// client.profile.set(`${message.guild.id}-${message.author.id}`, curLevel, "level");

	//  let array = client.settings.get(message.guild.id, "roles")

	// let data = array.findIndex(obj => obj.level === curLevel)
	//if (data < 0) return;

	//message.guild.member(message.author).roles.add(array[data].role)
	// message.channel.send('You leveled up to level **' + curLevel + '** and was rewarded with the role ' + message.guild.roles.get(array[data].role).toString() + ' 👍').then(m => {
	// setTimeout(() => {
	// m.delete()
	// }, 5000);
	// })
	// }

	const damnprofanity = ['uwu'];

	const damnblocked = damnprofanity.filter(word =>
		message.content.toLowerCase().includes(word)
	);

	if (damnblocked.length > 0) {
		message.channel.send('<:UwUpink:762543552726171699>');
	}

	if (message.author.bot) return;

	if (!message.content.toLowerCase().startsWith(prefix)) return;
	//What i will type now must be in a message event under "if(!message.content.startSwith(prefix)) return"

	if (cooldown.has(message.author.id)) {
		return message.channel.send(
			'Senpai~ Please wait 5 seconds between each commands >w<'
		);
	}
	cooldown.add(message.author.id);

	setTimeout(() => {
		cooldown.delete(message.author.id);
	}, cdtime * 1000); //This should be in millisends (ms)

	if (!message.member)
		message.member = await message.guild.fetchMember(message);
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	const cmd =
		client.commands.get(command) ||
		client.commands.get(client.aliases.get(command));

	if (cmd === null) return;

	if (cmd) cmd.run(client, message, args);
	if (!cmd) return;
});

client.on('messageDelete', async message => {
	const logchannel = db.get(`logchannel_${message.guild.id}`);
	if (!logchannel) return;

	const embed = new discord.MessageEmbed()
		.setColor('#EAA1D5')
		.setTitle('Message Deleted |' + message.author.tag)
		.addField('Deleted', message)
		.addField('Deleted in', message.channel);

	client.channels.cache.get(logchannel).send(embed);
});

client.on('guildCreate', async guild => {
	let defaultChannel = '';
	guild.channels.cache.forEach(channel => {
		if (channel.type == 'text' && defaultChannel == '') {
			if (channel.permissionsFor(guild.me).has('SEND_MESSAGES')) {
				defaultChannel = channel;
			}
		}
	});

	const fuckingmembers = guild.members.cache.filter(member => !member.user.bot)
		.size;
	const online = guild.members.cache.filter(
		member => member.presence.status === 'online'
	).size;
	const offline = guild.members.cache.filter(
		member => member.presence.status === 'offline'
	).size;
	const dnd = guild.members.cache.filter(
		member => member.presence.status === 'dnd'
	).size;
	const idle = guild.members.cache.filter(
		member => member.presence.status === 'idle'
	).size;
	const fuckingembed = new discord.MessageEmbed()
		.setColor('#EAA1D5')
		.setDescription(
			`<a:heart:761049526810837014>Hewo there! Thanks for inviting me! \n\nTo start off type in~ \n\n__<:pinkminus:760490477945356298>in!help__ for more Kewl Commands! \n\n__<:pinkminus:760490477945356298>in!info__ to see some informations \n\n<:pinkminus:760490477945356298>**Members on this server:** ${fuckingmembers} \n\n<:pinkminus:760490477945356298>**Online:** ${online} \n\n<:pinkminus:760490477945356298>**Offline:** ${offline} \n\n<:pinkminus:760490477945356298>**Idle:** ${idle} \n\n<:pinkminus:760490477945356298>**Do not disturb:** ${dnd} \n\nHave a nice day/night senpai!`
		)
		.setFooter('Encounter some bug? Type in!bugreport :3');
	//defaultChannel will be the channel object that the bot first finds permissions for
	defaultChannel.send(fuckingembed);
});

client.login(process.env.TOKEN);
