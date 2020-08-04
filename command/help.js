const Discord = require(`discord.js`);
const {prefix, bot_author, thumbnail_bot} = require(`./config.json`);

module.exports = {
	name: `help`,
	description: `ช่วยเหลือ`,

	execute: async(message, args) => {
		const embed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('การใช้งานบอท ThaiLaw')
			.setURL('https://discord.js.org/')
			.setAuthor(bot_author, thumbnail_bot, 'https://discord.js.org')
			.setDescription('คำสั่งนี้จะแสดงคำสั่งทั้งหมดของบอท ThaiLaw โดยคำสั่งทั้งหมดมีดังต่อไปนี้ (คำสั่งจะมีการเพิ่มเติมตามความเหมาะสม เพราะอยู่ในช่วง Alpha)')
			.addFields(
 				{ name: `วิธีการใช้งาน` ,value: `\`${prefix}help\` สำหรับวิธีการใช้งานบอท ThaiLaw`},
				{ name: `คำสั่งหลักเกี่ยวกับกฎหมาย`,  value: `
				- \`${prefix}lawcall\` สำหรับเรียกบทบัญญัติของแต่ละกฎหมาย ครั้งละ 1 มาตรา [ยังไม่รองรับมาตราที่มีการแทรกบทบัญญัติ ทวิ ตรี ฯลฯ]
				`},
				{ name: `คำสั่งทั่วไป`,  value: `
				- \`${prefix}calc\` คำสั่งคำนวณเลข (เครื่องคิดเลข eval ทั่วไป)
				- \`${prefix}goldprice\`คำสั่งตรวจสอบราคาทองคำแท่ง ทองรูปพรรณ ตามประกาศสมาคมทองคำ
				- \`${prefix}yearcalc\` คำสั่งการแปลงศักราช
				`}
			)
			.setTimestamp()
			.setFooter(`ถูกเรียกใช้โดย ${message.author.username}` , `${message.author.displayAvatarURL({ dynamic: true })}`);

		message.channel.send(embed);
	}
}