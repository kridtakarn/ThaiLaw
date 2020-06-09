const Discord = require(`discord.js`);
const {prefix, bot_author} = require(`./config.json`);

module.exports = {
	name: `help`,
	description: `ช่วยเหลือ`,

	execute: async(message, args) => {
		const embed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('การใช้งานบอท ThaiLaw')
			.setURL('https://discord.js.org/')
			.setAuthor(bot_author, 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
		.	setDescription('คำสั่งนี้จะแสดงคำสั่งทั้งหมดของบอท ThaiLaw โดยคำสั่งทั้งหมดมีดังต่อไปนี้')
		.	addFields(
 				{ value: `\`${prefix}help\` สำหรับวิธีการใช้งานบอท ThaiLaw`},
				{ value: `\`${prefix}lawcall\` สำหรับเรียกบทบัญญัติของแต่ละกฎหมาย ครั้งละ 1 มาตรา`}
			)
		.	setFooter(`ถูกเรียกใช้โดย ${message.author.username}` , `${message.author.displayAvatarURL({ dynamic: true })}`);

		channel.send(embed);
	}
}