const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./command').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./command/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	
	console.log(`เข้าสู่ระบบที่ ${client.user.tag}!`);
	client.user.setActivity(`ใช้ ${prefix}lawcall`, { type: 'LISTENING' })
  .then(presence => console.log(`กิจกรรมของบอทได้รับการตั้งค่าเป็น ${presence.activities[0].name}`))
  .catch(console.error);
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
		client.commands.get('ping').execute(message, args);
	}

	if (command === 'lawcall') {
		client.commands.get('lawcall').execute(message, args);
	}
});

client.login(token);