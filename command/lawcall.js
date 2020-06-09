const Discord = require(`discord.js`);
const {prefix, bot_author} = require(`./config.json`);
const axios = require(`axios`);

module.exports = {
	name: `lawcall`,
	description: `เรียกบทบัญญัติแห่งกฎหมายใดๆ 1 มาตรา`,
	execute: async(message, args) => {
		if (!args[0]) {
			const embed = new Discord.MessageEmbed()
				.setColor(`#0099ff`)
				.setTitle(`คำสั่ง lawcall`)
				.setAuthor(`${bot_author}`, `https://i.imgur.com/wSTFkRM.png`, `https://discord.js.org`)
				.setDescription(`เรียกบทบัญญัติแห่งกฎหมายใดๆครั้งละ 1 มาตรา`)
				.addFields(
					{ name: `รูปแบบคำสั่ง`, value: `${prefix}lawcall [ประเภทประมวลกฎหมาย] <หมายเลขมาตรา>`},
					{ name: `ตัวอย่าง`, value: `${prefix}lawcall ป.อ 112`}
				)
				.addFields(
					{ name: `ประเภทกฎหมายที่รองรับ`, value: `- ประมวลกฎหมายแพ่งและพาณิชย์ (ป.พ.พ)\n- ประมวลกฎหมายอาญา (ป.อ)\n- ประมวลกฎหมายวิธีพิจารณาความแพ่ง (ป.วิ.พ)\n- ประมวลกฎหมายวิธีพิจารณาความอาญา (ป.วิ.อ)`}
				)
				.setTimestamp()
				.setFooter(`ถูกเรียกใช้โดย ${message.author.username}` , `${message.author.displayAvatarURL({ dynamic: true })}`);
			
			message.channel.send(embed);
		} else if (args[0] === `ป.พ.พ`) {

			let section_num = parseInt(args[1]);
			
			if (!section_num) 
				return message.reply(`กรุณาระบุหมายเลขมาตราของประมวลกฎหมายแพ่งและพาณิชย์ ตามหลังชื่อประเภทประมวลกฎหมาย เพื่อเรียกบทบัญญัติ เช่น \`${prefix}lawcall ป.พ.พ 224\``);
			let getLaw = async () => {
				let response = await axios.get(
					`https://www.lawphin.com/api/law/detail/civil_and_commercial_code-${section_num}?conjunction=and&id=civil_and_commercial_code-${section_num}&law_buff=all&law_origin_type=%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%A1%E0%B8%A7%E0%B8%A5%E0%B8%81%E0%B8%8E%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%A2&law_sub_category=all&legalrulesection=1&legalrulesubsection=%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B9%80%E0%B8%A5%E0%B8%B7%E0%B8%AD%E0%B8%81&page=1&post_per_page=10&searchInPage=false&sort_by=year
					`);
				let law_response = response.data;
				return law_response;
			};
			let law = await getLaw();
			
			const embed = new Discord.MessageEmbed()
				.setColor(`#0099ff`)
				.setTitle(`ประมวลกฎหมายแพ่งและพาณิชย์ มาตรา ${section_num}`)
				.setAuthor(`${bot_author}`, `https://i.imgur.com/wSTFkRM.png`, `https://discord.js.org`)
				.setDescription(`บัญญัติว่า \"**${law._source.search.split(`มาตรา ${section_num}`)} **\"`)
				.setTimestamp()
				.setFooter(`ถูกเรียกใช้โดย ${message.author.username}` , `${message.author.displayAvatarURL({ dynamic: true })}`);

			message.channel.send(embed);
		} else if (args[0] === `ป.อ`) {
			let section_num = parseInt(args[1]);
			
			if (!section_num) 
				return message.reply(`กรุณาระบุหมายเลขมาตราของประมวลกฎหมายอาญา ตามหลังชื่อประเภทประมวลกฎหมาย เพื่อเรียกบทบัญญัติ เช่น \`${prefix}lawcall ป.อ 112\``);
			let getLaw = async () => {
				let response = await axios.get(
					`https://www.lawphin.com/api/law/detail/penal_code-${section_num}?conjunction=and&id=penal_code-${section_num}&law_buff=all&law_origin_type=%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%A1%E0%B8%A7%E0%B8%A5%E0%B8%81%E0%B8%8E%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%A2&law_sub_category=all&legalrulesection=1&legalrulesubsection=%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B9%80%E0%B8%A5%E0%B8%B7%E0%B8%AD%E0%B8%81&page=1&post_per_page=10&searchInPage=false&sort_by=year
					`);
				let law_response = response.data;
				return law_response;
			};
			let law = await getLaw();
			
			const embed = new Discord.MessageEmbed()
				.setColor(`#0099ff`)
				.setTitle(`ประมวลกฎหมายอาญา มาตรา ${section_num}`)
				.setAuthor(`${bot_author}`, `https://i.imgur.com/wSTFkRM.png`, `https://discord.js.org`)
				.setDescription(`บัญญัติว่า \"**${law._source.search.split(`มาตรา ${section_num}\,`)} **\"`)
				.setTimestamp()
				.setFooter(`ถูกเรียกใช้โดย ${message.author.username}` , `${message.author.displayAvatarURL({ dynamic: true })}`);

			message.channel.send(embed);
		} else if (args[0] === `ป.วิ.พ`) {
			let section_num = parseInt(args[1]);
			
			if (!section_num) 
				return message.reply(`กรุณาระบุหมายเลขมาตราของประมวลกฎหมายวิธีพิจารณาความแพ่ง ตามหลังชื่อประเภทประมวลกฎหมาย เพื่อเรียกบทบัญญัติ เช่น \`${prefix}lawcall ป.วิ.พ 179\``);
			let getLaw = async () => {
				let response = await axios.get(
					`https://www.lawphin.com/api/law/detail/civil_procedure_code-${section_num}?conjunction=and&id=civil_procedure_code-${section_num}&law_buff=all&law_origin_type=%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%A1%E0%B8%A7%E0%B8%A5%E0%B8%81%E0%B8%8E%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%A2&law_sub_category=all&legalrulesection=1&legalrulesubsection=%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B9%80%E0%B8%A5%E0%B8%B7%E0%B8%AD%E0%B8%81&page=1&post_per_page=10&searchInPage=false&sort_by=year
					`);
				let law_response = response.data;
				return law_response;
			};
			let law = await getLaw();
			
			const embed = new Discord.MessageEmbed()
				.setColor(`#0099ff`)
				.setTitle(`ประมวลกฎหมายวิธีพิจารณาความแพ่ง มาตรา ${section_num}`)
				.setAuthor(`${bot_author}`, `https://i.imgur.com/wSTFkRM.png`, `https://discord.js.org`)
				.setDescription(`บัญญัติว่า \"**${law._source.search.split(`มาตรา ${section_num}`)} **\"`)
				.setTimestamp()
				.setFooter(`ถูกเรียกใช้โดย ${message.author.username}` , `${message.author.displayAvatarURL({ dynamic: true })}`);

			message.channel.send(embed);
		} else if (args[0] === `ป.วิ.อ`) {
			let section_num = parseInt(args[1]);
			
			if (!section_num) 
				return message.reply(`กรุณาระบุหมายเลขมาตราของประมวลกฎหมายวิธีพิจารณาความอาญา ตามหลังชื่อประเภทประมวลกฎหมาย เพื่อเรียกบทบัญญัติ เช่น \`${prefix}lawcall ป.วิ.อ 224\``);
			let getLaw = async () => {
				let response = await axios.get(
					`https://www.lawphin.com/api/law/detail/criminal_procedure_code-${section_num}?conjunction=and&id=criminal_procedure_code-${section_num}&law_buff=all&law_origin_type=%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%A1%E0%B8%A7%E0%B8%A5%E0%B8%81%E0%B8%8E%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%A2&law_sub_category=all&legalrulesection=1&legalrulesubsection=%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B9%80%E0%B8%A5%E0%B8%B7%E0%B8%AD%E0%B8%81&page=1&post_per_page=10&searchInPage=false&sort_by=year
					`);
				let law_response = response.data;
				return law_response;
			};
			let law = await getLaw();
			
			const embed = new Discord.MessageEmbed()
				.setColor(`#0099ff`)
				.setTitle(`ประมวลกฎหมายวิธีพิจารณาความแพ่ง มาตรา ${section_num}`)
				.setAuthor(`${bot_author}`, `https://i.imgur.com/wSTFkRM.png`, `https://discord.js.org`)
				.setDescription(`บัญญัติว่า \"**${law._source.search.split(`มาตรา ${section_num}`)} **\"`)
				.setTimestamp()
				.setFooter(`ถูกเรียกใช้โดย ${message.author.username}` , `${message.author.displayAvatarURL({ dynamic: true })}`);

			message.channel.send(embed);
		} else {
			message.reply("กรุณาระบุประเภทของกฎหมายให้ถูกต้อง");
		}
}
}