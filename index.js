// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token, botChannelId, adminId } = require('./config.json');

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
// const removeRole = (message, time) => {
// 	return message.guild.members.cache.map((e) => {
// 		let hasTime = false;
// 		e.roles.remove(
// 			message.guild.roles.cache.find((role) => {
// 				role.name == time;
// 				hasTime = true;
// 			})
// 		);
// 		// if (hasTime) {
// 		// 	e.roles.remove(
// 		// 		message.guild.roles.cache.find((role) => role.name == `5-Runs`)
// 		// 	);
// 		// 	e.roles.remove(
// 		// 		message.guild.roles.cache.find((role) => role.name == `10-Runs`)
// 		// 	);
// 		// 	e.roles.remove(
// 		// 		message.guild.roles.cache.find((role) => role.name == `15-Runs`)
// 		// 	);
// 		// 	e.roles.remove(
// 		// 		message.guild.roles.cache.find((role) => role.name == `20-Runs`)
// 		// 	);
// 		// 	e.roles.remove(
// 		// 		message.guild.roles.cache.find(
// 		// 			(role) => role.name == `variable`
// 		// 		)
// 		// 	);
// 		// }
// 	});
// };
const getMembers = (message, roleName) => {
	return message.guild.members.cache
		.filter((member) => member.roles.cache.find((role) => role == roleName))
		.map((member) => member.user.tag);
};
client.on('message', async (message) => {
	if (
		message.member.roles.cache.has(adminId) &&
		message.content.startsWith('check')
	) {
		if (hour >= 9 && hour < 12) {
			message.guild.members.cache.map((e) => {
				e.roles.cache.find((role) =>
					role.name == '9-12' ? e.send('test alert') : null
				);
			});
			const role = message.guild.roles.cache.find(
				(r) => r.name.toLowerCase() === '9-12'
			);
			const role2 = message.guild.roles.cache.find(
				(r) => r.name.toLowerCase() === '5-runs'
			);
			const role3 = message.guild.roles.cache.find(
				(r) => r.name.toLowerCase() === '10-runs'
			);
			let members = await message.guild.members.fetch();
			members
				.filter((member) => member.roles.cache.has(role.id))
				.forEach((member) => {
					member.roles.remove(role.id);
					member.roles.remove(role2.id);
					member.roles.remove(role3.id);
				});
			// message.guild.members.cache.forEach((member) => {
			// 	const role = message.guild.roles.cache.find(
			// 		(r) => r.name.toLowerCase() === '0-3'
			// 	);
			// 	if (member.roles.cache.has(role)) {
			// 		member.roles.remove(role.id);
			// 	}
			// });
			// message.guild.members.cache.map(async (e) => {
			// 	await e.roles.remove(
			// 		message.guild.roles.cache.find((role) => {
			// 			role.name.toLowerCase == 'gamer';
			// 		})
			// 	);
			// });
		}
		// else if (hour >= 12 && hour < 15) {
		// 	message.guild.members.cache.map((e) => {
		// 		e.roles.cache.find((role) =>
		// 			role.name == '12-15' ? e.send('test alert') : null
		// 		);
		// 	});
		// 	message.guild.members.cache.map((e) => {
		// 		e.roles.remove(
		// 			message.guild.roles.cache.find(
		// 				(role) => role.name == `9-12`
		// 			)
		// 		);
		// 	});
		// } else if (hour >= 15 && hour < 18) {
		// 	message.guild.members.cache.map((e) => {
		// 		e.roles.cache.find((role) =>
		// 			role.name == '15-18' ? e.send('test alert') : null
		// 		);
		// 	});
		// 	message.guild.members.cache.map((e) => {
		// 		e.roles.remove(
		// 			message.guild.roles.cache.find(
		// 				(role) => role.name == '12-15'
		// 			)
		// 		);
		// 	});
		// } else if (hour >= 18 && hour < 21) {
		// 	message.guild.members.cache.map((e) => {
		// 		e.roles.cache.find((role) =>
		// 			role.name == '18-21' ? e.send('test alert') : null
		// 		);
		// 	});
		// 	message.guild.members.cache.map((e) => {
		// 		const membersOfTest = e.roles.remove(
		// 			message.guild.roles.cache.find(
		// 				(role) => role.name == '15-18'
		// 			)
		// 		);
		// 	});
		// } else if (hour >= 21 && hour < 0) {
		// 	message.guild.members.cache.map((e) => {
		// 		e.roles.cache.find((role) =>
		// 			role.name == '21-0' ? e.send('test alert') : null
		// 		);
		// 	});
		// 	message.guild.members.cache.map((e) => {
		// 		e.roles.remove(
		// 			message.guild.roles.cache.find(
		// 				(role) => role.name == '18-21'
		// 			)
		// 		);
		// 	});
		// } else if (hour >= 3 && hour < 6) {
		// 	message.guild.members.cache.map((e) => {
		// 		e.roles.remove(
		// 			message.guild.roles.cache.find((role) => role.name == '0-3')
		// 		);
		// 	});
		// }
	}

	// if (
	// 	message.member.roles.cache.has(adminId) &&
	// 	message.content.startsWith('list')
	// ) {
	// 	const role9_12 = message.guild.roles.cache.find(
	// 		(role) => role.name == '9-12'
	// 	);
	// 	const role12_15 = message.guild.roles.cache.find(
	// 		(role) => role.name == '12-15'
	// 	);
	// 	const role15_18 = message.guild.roles.cache.find(
	// 		(role) => role.name == '15-18'
	// 	);
	// 	const role18_21 = message.guild.roles.cache.find(
	// 		(role) => role.name == '18-21'
	// 	);
	// 	const role21_0 = message.guild.roles.cache.find(
	// 		(role) => role.name == '21-0'
	// 	);
	// 	const role0_3 = message.guild.roles.cache.find(
	// 		(role) => role.name == '0-3'
	// 	);

	// 	const roleMembers9_12 = getMembers(message, role9_12);
	// 	const roleMembers12_15 = getMembers(message, role12_15);
	// 	const roleMembers15_18 = getMembers(message, role15_18);
	// 	const roleMembers18_21 = getMembers(message, role18_21);
	// 	const roleMembers21_0 = getMembers(message, role21_0);
	// 	const roleMembers0_3 = getMembers(message, role0_3);

	// 	message.guild.channels.cache
	// 		.get(botChannelId)
	// 		.send(`Users with ${role9_12}: ${roleMembers9_12}`);
	// 	message.guild.channels.cache
	// 		.get(botChannelId)
	// 		.send(`Users with ${role12_15}: ${roleMembers12_15}`);
	// 	message.guild.channels.cache
	// 		.get(botChannelId)
	// 		.send(`Users with ${role15_18}: ${roleMembers15_18}`);
	// 	message.guild.channels.cache
	// 		.get(botChannelId)
	// 		.send(`Users with ${role18_21}: ${roleMembers18_21}`);
	// 	message.guild.channels.cache
	// 		.get(botChannelId)
	// 		.send(`Users with ${role21_0}: ${roleMembers21_0}`);
	// 	message.guild.channels.cache
	// 		.get(botChannelId)
	// 		.send(`Users with ${role0_3}: ${roleMembers0_3}`);
	// }
});

// Define Channel

// Login to Discord with your client's token
client.login(token);
