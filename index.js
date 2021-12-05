// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const {
	token,
	botChannelId,
	adminId,
	messageAlert,
	rolesOfServer,
} = require('./config.json');
const moment = require('moment');
const time = new Date();

let date = new Date();
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
const removeRole = async (message, role) => {
	const role5Runs = getRoles(message, rolesOfServer['5-runs']);

	const role10Runs = getRoles(message, rolesOfServer['10-runs']);

	const role15Runs = getRoles(message, rolesOfServer['15-runs']);

	const role20Runs = getRoles(message, rolesOfServer['20-runs']);

	const roleVariable = getRoles(message, rolesOfServer.variable);

	const roleOnTime = getRoles(message, rolesOfServer.onTime);

	const roleTimeFrame = getRoles(message, rolesOfServer.timeFrame);

	const scarletMonasteryRole = getRoles(message, 'Scarlet Monastery');

	const maraudonRole = getRoles(message, 'Maraudon');

	const startholmeRole = getRoles(message, 'Startholme');

	const slavePensRole = getRoles(message, 'Slave Pens');

	const shadowLabRole = getRoles(message, 'Shadow Lab');

	const steamVaultRole = getRoles(message, 'Steam Vault');

	let members = await message.guild.members.fetch();
	return members
		.filter((member) => member.roles.cache.has(role.id))
		.forEach((member) => {
			member.roles.remove(role.id);
			member.roles.remove(role5Runs.id);
			member.roles.remove(role10Runs.id);
			member.roles.remove(role15Runs.id);
			member.roles.remove(role20Runs.id);
			member.roles.remove(roleVariable.id);
			member.roles.remove(roleOnTime.id);
			member.roles.remove(roleTimeFrame.id);
			member.roles.remove(scarletMonasteryRole.id);
			member.roles.remove(maraudonRole.id);
			member.roles.remove(startholmeRole.id);
			member.roles.remove(slavePensRole.id);
			member.roles.remove(shadowLabRole.id);
			member.roles.remove(steamVaultRole.id);
		});
};
const getRoles = (message, roleName) => {
	return message.guild.roles.cache.find((role) => role.name == roleName);
};
const getMembers = (message, roleName) => {
	return message.guild.members.cache
		.filter((member) => member.roles.cache.find((role) => role == roleName))
		.map((member) => member.nickname || member.user.tag);
};
const getServices = (message, roleServices, types) => {
	if (
		types.scarletMonasteryRoleMembers.length == 0 &&
		types.maraudonRoleMembers.length == 0 &&
		types.startholmeRoleMembers == 0 &&
		types.slavePensRoleMembers == 0 &&
		types.shadowLabRoleMembers == 0 &&
		types.steamVaultRoleMembers == 0
	) {
		message.guild.channels.cache
			.get(botChannelId)
			.send(
				`--------------${moment().format(
					'YYYY-MM-DD'
				)}-------------------\n No user selected services \n----------------------------------------------`
			);
	} else {
		if (types.scarletMonasteryRoleMembers.length > 0) {
			message.guild.channels.cache
				.get(botChannelId)
				.send(
					`--------------${moment().format(
						'YYYY-MM-DD'
					)}-------------------\n\t\t\t\t${
						roleServices.scarletMonasteryRole
					} Users\n\n${
						types.scarletMonasteryRoleMembers
					}\n----------------------------------------------`
				);
		}
		if (types.maraudonRoleMembers.length > 0) {
			message.guild.channels.cache
				.get(botChannelId)
				.send(
					`--------------${moment().format(
						'YYYY-MM-DD'
					)}-------------------\n\t\t\t\t${
						roleServices.maraudonRole
					} Users\n\n${
						types.maraudonRoleMembers
					}\n----------------------------------------------`
				);
		}
		if (types.startholmeRoleMembers.length > 0) {
			message.guild.channels.cache
				.get(botChannelId)
				.send(
					`--------------${moment().format(
						'YYYY-MM-DD'
					)}-------------------\n\t\t\t\t${
						roleServices.startholmeRole
					} Users\n\n${
						types.startholmeRoleMembers
					}\n----------------------------------------------`
				);
		}
		if (types.slavePensRoleMembers.length > 0) {
			message.guild.channels.cache
				.get(botChannelId)
				.send(
					`--------------${moment().format(
						'YYYY-MM-DD'
					)}-------------------\n\t\t\t\t${
						roleServices.slavePensRole
					} Users\n\n${
						types.slavePensRoleMembers
					}\n----------------------------------------------`
				);
		}
		if (types.shadowLabRoleMembers.length > 0) {
			message.guild.channels.cache
				.get(botChannelId)
				.send(
					`--------------${moment().format(
						'YYYY-MM-DD'
					)}-------------------\n\t\t\t\t${
						roleServices.shadowLabRole
					} Users\n\n${
						types.shadowLabRoleMembers
					}\n----------------------------------------------`
				);
		}
		if (types.steamVaultRoleMembers.length > 0) {
			message.guild.channels.cache
				.get(botChannelId)
				.send(
					`--------------${moment().format(
						'YYYY-MM-DD'
					)}-------------------\n\t\t\t\t${
						roleServices.steamVaultRole
					} users\n\n${
						types.steamVaultRoleMembers
					}\n----------------------------------------------`
				);
		}
	}
};
client.on('message', async (message) => {
	if (
		message.content.startsWith(
			'dQY@+#sc+@wHVzq6B4%SxzCN!UZx@vH2prS3jh&z!8fmZ^x%$8pY#EWVdh2j+gHX-&^-r^WrTEXm*?9gZsq4PWap6LBe$-_b$kpDxQ_S9a?dfv2NfPR5QuB$eHHAV8xU'
		)
	) {
		if (hour >= 9 && hour < 12) {
			message.guild.members.cache.map((e) => {
				e.roles.cache.find((role) =>
					role.name == '9-12'
						? e.send(`Time ${role.name} : ${messageAlert}`)
						: null
				);
			});
			const role = message.guild.roles.cache.find(
				(r) => r.name.toLowerCase() === '0-3'
			);
			removeRole(message, role);
		} else if (hour >= 12 && hour < 15) {
			message.guild.members.cache.map((e) => {
				e.roles.cache.find((role) =>
					role.name == '12-15'
						? e.send(`Time ${role.name} : ${messageAlert}`)
						: null
				);
			});
			const role = message.guild.roles.cache.find(
				(r) => r.name.toLowerCase() === '9-12'
			);
			removeRole(message, role);
		} else if (hour >= 15 && hour < 18) {
			message.guild.members.cache.map((e) => {
				e.roles.cache.find((role) =>
					role.name == '15-18'
						? e.send(`Time ${role.name} : ${messageAlert}`)
						: null
				);
			});
			const role = message.guild.roles.cache.find(
				(r) => r.name.toLowerCase() === '12-15'
			);
			removeRole(message, role);
		} else if (hour >= 18 && hour < 21) {
			message.guild.members.cache.map((e) => {
				e.roles.cache.find((role) =>
					role.name == '18-21'
						? e.send(`Time ${role.name} : ${messageAlert}`)
						: null
				);
			});
			const role = message.guild.roles.cache.find(
				(r) => r.name.toLowerCase() === '15-18'
			);
			removeRole(message, role);
		} else if (hour >= 21 && hour < 0) {
			message.guild.members.cache.map((e) => {
				e.roles.cache.find((role) =>
					role.name == '21-0'
						? e.send(`Time ${role.name} : ${messageAlert}`)
						: null
				);
			});
			const role = message.guild.roles.cache.find(
				(r) => r.name.toLowerCase() === '18-21'
			);
			removeRole(message, role);
		} else if (hour >= 3 && hour < 6) {
			const role = message.guild.roles.cache.find(
				(r) => r.name.toLowerCase() === '0-3'
			);
			removeRole(message, role);
		}
	}

	if (
		(message.content.startsWith('!time') &&
			message.member.roles.cache.has(adminId)) ||
		message.content.startsWith(
			'dQY@+#sc+@wHVzq6B4%SxzCN!UZx@vH2prS3jh&z!8fmZ^x%$8pY#EWVdh2j+gHX-&^-r^WrTEXm*?9gZsq4PWap6LBe$-_b$kpDxQ_S9a?dfv2NfPR5QuB$eHHAV8xU'
		)
	) {
		// type of reserve roles

		// reserves times roles

		const role9_12 = getRoles(message, '9-12');
		const role12_15 = getRoles(message, '12-15');
		const role15_18 = getRoles(message, '15-18');
		const role18_21 = getRoles(message, '18-21');
		const role21_0 = getRoles(message, '21-0');
		const role0_3 = getRoles(message, '0-3');

		const roleMembers9_12 = getMembers(message, role9_12);
		const roleMembers12_15 = getMembers(message, role12_15);
		const roleMembers15_18 = getMembers(message, role15_18);
		const roleMembers18_21 = getMembers(message, role18_21);
		const roleMembers21_0 = getMembers(message, role21_0);
		const roleMembers0_3 = getMembers(message, role0_3);

		message.guild.channels.cache
			.get(botChannelId)
			.send(
				`--------------${moment().format(
					'YYYY-MM-DD'
				)}-------------------\n\t\t\t\t\t\tUsers Time\n\nUsers with ${role9_12}: ${roleMembers9_12}\nUsers with ${role12_15}: ${roleMembers12_15}\nUsers with ${role15_18}: ${roleMembers15_18}\nUsers with ${role18_21}: ${roleMembers18_21}\nUsers with ${role21_0}: ${roleMembers21_0}\nUsers with ${role0_3}: ${roleMembers0_3}\n----------------------------------------------`
			);
	} else if (
		message.content.startsWith('!service') &&
		message.member.roles.cache.has(adminId)
	) {
		// roles
		const scarletMonasteryRole = getRoles(message, 'Scarlet Monastery');
		const maraudonRole = getRoles(message, 'Maraudon');
		const startholmeRole = getRoles(message, 'Startholme');
		const slavePensRole = getRoles(message, 'Slave Pens');
		const shadowLabRole = getRoles(message, 'Shadow Lab');
		const steamVaultRole = getRoles(message, 'Steam Vault');

		//members
		const scarletMonasteryRoleMembers = getMembers(
			message,
			scarletMonasteryRole
		);
		const maraudonRoleMembers = getMembers(message, maraudonRole);
		const startholmeRoleMembers = getMembers(message, startholmeRole);
		const slavePensRoleMembers = getMembers(message, slavePensRole);
		const shadowLabRoleMembers = getMembers(message, shadowLabRole);
		const steamVaultRoleMembers = getMembers(message, steamVaultRole);
		getServices(
			message,
			{
				scarletMonasteryRole,
				maraudonRole,
				startholmeRole,
				slavePensRole,
				shadowLabRole,
				steamVaultRole,
			},
			{
				scarletMonasteryRoleMembers,
				maraudonRoleMembers,
				startholmeRoleMembers,
				slavePensRoleMembers,
				shadowLabRoleMembers,
				steamVaultRoleMembers,
			}
		);
	}
});

// Define Channel

// Login to Discord with your client's token
client.login(token);
