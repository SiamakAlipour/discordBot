// Require the necessary discord.js classes
const { Client, Intents, Guild } = require('discord.js');
const { token } = require('./config.json');
const { TextChannel } = require('discord.js');
let cron = require('cron');

const time = new Date();
let hour = time.getHours();

// Create a new client instance
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_INTEGRATIONS,
		Intents.FLAGS.GUILD_WEBHOOKS,
		Intents.FLAGS.GUILD_VOICE_STATES,
		Intents.FLAGS.GUILD_PRESENCES,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	],
});

client.on('message', async (message) => {
	if (hour >= 15 && hour < 18) {
		message.guild.members.cache.map((e) => {
			e.roles.cache.find((role) =>
				role.name == '15-18' ? e.send('test alert') : null
			);
		});
		message.guild.members.cache.map((e) => {
			e.roles.remove(
				message.guild.roles.cache.find((role) => role.name == `12-15`)
			);
		});
		// message.guild.members.cache.find((member) =>
		// 	member.roles.cache.get('916658100948328500')
		// );
	}
	// } else if (hour >= 12 && hour < 15) {
	// 	message.guild.roles.cache.find((role) => role.name === '9-12').delete();
	// } else if (hour >= 15 && hour < 18) {
	// 	client.guilds;
	// 	// message.guild.roles.cache
	// 	// 	.find((role) => role.name === '12-15')
	// 	// 	.delete();
	// } else if (hour >= 18 && hour < 21) {
	// 	message.guild.roles.cache
	// 		.find((role) => role.name === '15-18')
	// 		.delete();
	// } else if (hour >= 21 && hour < 0) {
	// 	message.guild.roles.cache
	// 		.find((role) => role.name === '18-21')
	// 		.delete();
	// } else if (hour >= 3 && hour < 6) {
	// 	message.guild.roles.cache.find((role) => role.name === '0-3').delete();
	// }

	if (
		message.member.roles.cache.has('782519792803381249') &&
		message.content.startsWith('list')
	) {
		const Kabe = message.guild.roles.cache.find(
			(role) => role.name == 'Soltan'
		);
		const Moz = message.guild.roles.cache.find(
			(role) => role.name == 'Kabeie Mahale'
		);

		const KabeMembers = message.guild.members.cache
			.filter((member) => member.roles.cache.find((role) => role == Kabe))
			.map((member) => member.user.tag);
		const MozMembers = message.guild.members.cache
			.filter((member) => member.roles.cache.find((role) => role == Moz))
			.map((member) => member.user.tag);
		message.channel.send(`Users with ${Kabe.name}: ${KabeMembers}`);
		message.channel.send(`Users with ${Moz.name}: ${MozMembers}`);
	}
});
// client.on('interactionCreate', async (interaction) => {
// 	if (!interaction.isCommand()) return;

// 	const { commandName } = interaction;
// 	let users = new Array();
// 	let guild = client.guilds.cache.get('782518186506453003');
// 	let channel = client.channels.cache.get('806598220260048937');

// 	guild.members.cache
// 		.filter((member) => !member.user.bot)
// 		.forEach((member) => users.push(member.roles));

// 	if (commandName === 'list') {
// 		await interaction.reply(`here is the list`);

// 		// users.map((user) => console.log(`${user.roles}`));
// 		// users.map((user) => channel.send(`${user.role}`));
// 	}
// });  // ss
// Define Channel

// Login to Discord with your client's token
client.login(token);
