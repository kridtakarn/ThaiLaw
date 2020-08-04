const Discord = require(`discord.js`);
const {prefix, bot_author,thumbnail_bot} = require(`./config.json`);
const Math = require(`mathjs`)

module.exports = {
	name: `calc`,
	description: `ช่วยเหลือ`,

	execute: async(message, args) => {
		if (!args[0]) return message.channel.send(`กรุณาระบุประโยคสัญลักษณ์ เช่น \`${prefix}calc 1+2\` `);
		let resp;

		try {
			resp = eval(args.join(' '));
		} catch (e) {
			message.reply('กรุณาระบุประโยคสัญลักษณ์ให้ถูกต้อง');
		}

		const embed = new Discord.MessageEmbed()
			.setColor('#FFFFFF')
			.setTitle('เครื่องคิดเลข')
			
			.addField('ข้อมูลนำเข้า', args.join(' '))
			.addField('ผลลัพธ์', `${resp}`)
			.setTimestamp()
			.setFooter(`ถูกเรียกใช้โดย ${message.author.username}` , `${message.author.displayAvatarURL({ dynamic: true })}`);

		message.channel.send(embed);
	}
}