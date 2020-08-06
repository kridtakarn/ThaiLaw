const Discord = require(`discord.js`);
const {prefix, bot_author, thumbnail_bot} = require(`./config.json`);
const axios = require(`axios`);

module.exports = {
	name: `lawcall`,
	description: `เรียกบทบัญญัติแห่งกฎหมายใดๆ 1 มาตรา`,
	execute: async(message, args) => {
		if (!args[0] || args[0] === 'help') {
			const embed = new Discord.MessageEmbed()
				.setColor(`#FFD700`)
				.setTitle(`คำสั่ง lawcall`)
				.setAuthor(`${bot_author}`, thumbnail_bot, `https://discord.js.org`)
				.setDescription(`เรียกบทบัญญัติแห่งกฎหมายใดๆครั้งละ 1 มาตรา`)
				.addFields(
					{ 
						name: `รูปแบบคำสั่ง`, 
						value: `${prefix}lawcall [ประเภทประมวลกฎหมาย] <หมายเลขมาตรา> <หมายเลขมาตราแทรกบทบัญญัติ หมายเลขหลัง / เช่น 193/1>`
					},
					{ 
						name: `ตัวอย่าง`, 
						value: `${prefix}lawcall ป.อ 112
						${prefix}lawcall ป.พ.พ 193 30
						${prefix}lawcall ป.ที่ดิน 8 ทวิ (แทรกบทบัญญัติเช่นนี้ยังไม่รองรับ กรุณายังไม่จำต้องใช้งาน) 
						${prefix}lawcall อาญา 112 
						${prefix}lawcall แพ่ง 204
						${prefix}lawcall แพ่ง 420`
					}
				)
				.addFields(
					{ 
						name: `ประเภทกฎหมายที่รองรับ`, 
						value: `
						- ประมวลกฎหมายแพ่งและพาณิชย์ (ป.พ.พ หรือ แพ่ง)
						- ประมวลกฎหมายอาญา (ป.อ หรือ อาญา )
						- ประมวลกฎหมายวิธีพิจารณาความแพ่ง (ป.วิ.พ หรือ วิ.แพ่ง)
						- ประมวลกฎหมายวิธีพิจารณาความอาญา (ป.วิ.อ หรือ วิ.อาญา)
					`}
				)
				.setTimestamp()
				.setFooter(`ถูกเรียกใช้โดย ${message.author.username}` , `${message.author.displayAvatarURL({ dynamic: true })}`);
			message.channel.send(embed);
		} else if (args[0] === `ป.พ.พ` || args[0] === `แพ่ง` ) {
			let section_num = parseInt(args[1]);
			let sub_section_num = parseInt(args[2]);
			if (!args[1]) {
				message.reply(`กรุณาระบุหมายเลขมาตราของประมวลกฎหมายแพ่งและพาณิชย์ ตามหลังชื่อประเภทประมวลกฎหมาย เพื่อเรียกบทบัญญัติ เช่น \`${prefix}lawcall ป.พ.พ 193 33\``);
			} else if (!args[2]) {
				let getLaw = async () => {
					let response = await axios.get(
						`https://www.lawphin.com/api/law/detail/civil_and_commercial_code-${section_num}`);
					let law_response = response.data;
					return law_response;
				};
				let law = await getLaw();
				function hide_buff() {
					if (law._source.buff === "") {
						return "";
					} else {
						return `[บรรพ ${law._source.buff}](https://www.lawphin.com/result/law?conjunction=and&law_origin_type=ประมวลกฎหมาย&law_category=ประมวลกฎหมายแพ่งและพาณิชย์&legalrulesubsection=ไม่มีเลือก&law_buff=${law._source.buff}-100-100&from_year=2535&to_year=2563&law_sub_category=all&state=all&post_per_page=10&sort_by=year&page=1)`;
					}
				}
				function hide_buff_suff_first() {
					if (law._source.buff_suff_first === "") {
						return "";
					} else {
						return ` > [ลักษณะ ${law._source.buff_suff_first}](https://www.lawphin.com/result/law?conjunction=and&law_origin_type=ประมวลกฎหมาย&law_category=ประมวลกฎหมายแพ่งและพาณิชย์&legalrulesubsection=ไม่มีเลือก&law_buff=${law._source.buff}-${law._source.buff_suff_first}-100&from_year=2535&to_year=2563&law_sub_category=all&state=all&post_per_page=10&sort_by=year&page=1)`;
					}
				}
				function hide_buff_suff_second() {
					if (law._source.buff_suff_second === "") {
						return "";
					} else {
						return ` > [หมวด ${law._source.buff_suff_second}](https://www.lawphin.com/result/law?conjunction=and&law_origin_type=ประมวลกฎหมาย&law_category=ประมวลกฎหมายแพ่งและพาณิชย์&legalrulesubsection=ไม่มีเลือก&law_buff=${law._source.buff}-${law._source.buff_suff_first}-${law._source.buff_suff_second}&from_year=2535&to_year=2563&law_sub_category=all&state=all&post_per_page=10&sort_by=year&page=1)`;
					}
				}
				const embed = new Discord.MessageEmbed()
					.setColor(`#FFD700`)
					.setTitle(`ประมวลกฎหมายแพ่งและพาณิชย์ มาตรา ${section_num}`)
					.setURL(`https://www.lawphin.com/detail/law/civil_and_commercial_code-${section_num}`)
					.setAuthor(`${bot_author}`, thumbnail_bot, `https://discord.js.org`)
					.setDescription(
							`บัญญัติว่า \"**${law._source.search.slice(0,1950).split(`มาตรา ${section_num}`)} **\"...[ดูเพิ่มเติม](https://www.lawphin.com/detail/law/civil_and_commercial_code-${section_num})
						`)
					.addFields(
						{
							name: "แม่บทของกฎหมาย",
							value: `กฎหมายนี้อยู่ภายใต้ ${hide_buff()} ${hide_buff_suff_first()} ${hide_buff_suff_second()}
							`
						}
					)
					.setTimestamp()
					.setFooter(`ถูกเรียกใช้โดย ${message.author.username}` , `${message.author.displayAvatarURL({ dynamic: true })}`);
				message.channel.send(embed);
			} else if (!args[3]) {
				section_num = parseInt(section_num);
				sub_section_num = parseInt(sub_section_num);
				let getLaw = async () => {
					let response = await axios.get(
						`https://www.lawphin.com/api/law/detail/civil_and_commercial_code-${section_num}-${sub_section_num}`);
					let law_response = response.data;
					return law_response;
				};
				let law = await getLaw();
				function hide_buff() {
					if (law._source.buff === "") {
						return "";
					} else {
						return `> [ภาค ${law._source.buff}](https://www.lawphin.com/result/law?conjunction=and&law_origin_type=ประมวลกฎหมาย&law_category=ประมวลกฎหมายแพ่งและพาณิชย์&legalrulesubsection=ไม่มีเลือก&law_buff=${law._source.buff}-100-100&from_year=2535&to_year=2563&law_sub_category=all&state=all&post_per_page=10&sort_by=year&page=1)`;
					}
				}
				function hide_buff_suff_first() {
					if (law._source.buff_suff_first === "") {
						return "";
					} else {
						return ` > [ลักษณะ ${law._source.buff_suff_first}](https://www.lawphin.com/result/law?conjunction=and&law_origin_type=ประมวลกฎหมาย&law_category=ประมวลกฎหมายแพ่งและพาณิชย์&legalrulesubsection=ไม่มีเลือก&law_buff=${law._source.buff}-${law._source.buff_suff_first}-100&from_year=2535&to_year=2563&law_sub_category=all&state=all&post_per_page=10&sort_by=year&page=1)`;
					}
				}
				function hide_buff_suff_second() {
					if (law._source.buff_suff_second === "") {
						return "";
					} else {
						return ` > [หมวด ${law._source.buff_suff_second}](https://www.lawphin.com/result/law?conjunction=and&law_origin_type=ประมวลกฎหมาย&law_category=ประมวลกฎหมายแพ่งและพาณิชย์&legalrulesubsection=ไม่มีเลือก&law_buff=${law._source.buff}-${law._source.buff_suff_first}-${law._source.buff_suff_second}&from_year=2535&to_year=2563&law_sub_category=all&state=all&post_per_page=10&sort_by=year&page=1)`;
					}
				}
				const embed = new Discord.MessageEmbed()
					.setColor(`#FFD700`)
					.setTitle(`ประมวลกฎหมายแพ่งและพาณิชย์ มาตรา ${section_num}/${sub_section_num}`)
					.setURL(`https://www.lawphin.com/detail/law/civil_and_commercial_code-${section_num}-${sub_section_num}`)
					.setAuthor(`${bot_author}`, thumbnail_bot, `https://discord.js.org`)
					.setDescription(
						`บัญญัติว่า \"**${law._source.search.slice(0,1950).split(`มาตรา ${section_num}/${sub_section_num}`)} **\"...[ดูเพิ่มเติม](https://www.lawphin.com/detail/law/civil_and_commercial_code-${section_num}-${sub_section_num})`)
					.addFields(
						{
							name: "แม่บทของกฎหมาย",
							value: `กฎหมายนี้อยู่ภายใต้ ${hide_buff()} ${hide_buff_suff_first()} ${hide_buff_suff_second()}
								`
						}
					)
					.setTimestamp()
					.setFooter(`ถูกเรียกใช้โดย ${message.author.username}` , `${message.author.displayAvatarURL({ dynamic: true })}`);
				message.channel.send(embed);
			} else {
				message.reply('กรุณาระบุประเภทของกฎหมายหรือระบุเลขมาตราให้ถูกต้อง');
			}
		} else if (args[0] === `ป.อ` || args[0] === `อาญา`) {
			let section_num = parseInt(args[1]);
			let sub_section_num = parseInt(args[2]);
			if (!args[1]) {
				message.reply(`กรุณาระบุหมายเลขมาตราของประมวลกฎหมายอาญา ตามหลังชื่อประเภทประมวลกฎหมาย เพื่อเรียกบทบัญญัติ เช่น \`${prefix}lawcall ป.พ.พ 193 33\``);
			} else if (!args[2]) {
				let getLaw = async () => {
					let response = await axios.get(
						`https://www.lawphin.com/api/law/detail/penal_code-${section_num}`);
					let law_response = response.data;
					return law_response;
				};
				let law = await getLaw();
				function hide_buff() {
					if (law._source.buff === "") {
						return "";
					} else {
						return `[ภาค ${law._source.buff}](https://www.lawphin.com/result/law?conjunction=and&law_origin_type=ประมวลกฎหมาย&law_category=ประมวลกฎหมายอาญา&legalrulesubsection=ไม่มีเลือก&law_buff=${law._source.buff}-100-100&from_year=2535&to_year=2563&law_sub_category=all&state=all&post_per_page=10&sort_by=year&page=1)`;
					}
				}
				function hide_buff_suff_first() {
					if (law._source.buff_suff_first === "") {
						return "";
					} else {
						return ` > [ลักษณะ ${law._source.buff_suff_first}](https://www.lawphin.com/result/law?conjunction=and&law_origin_type=ประมวลกฎหมาย&law_category=ประมวลกฎหมายอาญา&legalrulesubsection=ไม่มีเลือก&law_buff=${law._source.buff}-${law._source.buff_suff_first}-100&from_year=2535&to_year=2563&law_sub_category=all&state=all&post_per_page=10&sort_by=year&page=1)`;
					}
				}
				function hide_buff_suff_second() {
					if (law._source.buff_suff_second === "") {
						return "";
					} else {
						return ` > [หมวด ${law._source.buff_suff_second}](https://www.lawphin.com/result/law?conjunction=and&law_origin_type=ประมวลกฎหมาย&law_category=ประมวลกฎหมายอาญา&legalrulesubsection=ไม่มีเลือก&law_buff=${law._source.buff}-${law._source.buff_suff_first}-${law._source.buff_suff_second}&from_year=2535&to_year=2563&law_sub_category=all&state=all&post_per_page=10&sort_by=year&page=1)`;
					}
				}
				const embed = new Discord.MessageEmbed()
					.setColor(`#FFD700`)
					.setTitle(`ประมวลกฎหมายอาญา มาตรา ${section_num}`)
					.setURL(`https://www.lawphin.com/detail/law/penal_code-${section_num}`)
					.setAuthor(`${bot_author}`, thumbnail_bot, `https://discord.js.org`)
					.setDescription(
							`บัญญัติว่า \"**${law._source.search.slice(0,1950).split(`มาตรา ${section_num}`)} **\"...[ดูเพิ่มเติม](https://www.lawphin.com/detail/law/penal_code-${section_num})
						`)
					.addFields(
						{
							name: "แม่บทของกฎหมาย",
							value: `กฎหมายนี้อยู่ภายใต้ ${hide_buff()} ${hide_buff_suff_first()} ${hide_buff_suff_second()}
								`
						}
					)
					.setTimestamp()
					.setFooter(`ถูกเรียกใช้โดย ${message.author.username}` , `${message.author.displayAvatarURL({ dynamic: true })}`);
				message.channel.send(embed);
			} else if (!args[3]) {
				section_num = parseInt(section_num);
				sub_section_num = parseInt(sub_section_num);
				let getLaw = async () => {
					let response = await axios.get(
						`https://www.lawphin.com/api/law/detail/penal_code-${section_num}-${sub_section_num}`);
					let law_response = response.data;
					return law_response;
				};
				let law = await getLaw();
				function hide_buff() {
					if (law._source.buff === "") {
						return "";
					} else {
						return `[ภาค ${law._source.buff}](https://www.lawphin.com/result/law?conjunction=and&law_origin_type=ประมวลกฎหมาย&law_category=ประมวลกฎหมายอาญา&legalrulesubsection=ไม่มีเลือก&law_buff=${law._source.buff}-100-100&from_year=2535&to_year=2563&law_sub_category=all&state=all&post_per_page=10&sort_by=year&page=1)`;
					}
				}
				function hide_buff_suff_first() {
					if (law._source.buff_suff_first === "") {
						return "";
					} else {
						return ` > [ลักษณะ ${law._source.buff_suff_first}](https://www.lawphin.com/result/law?conjunction=and&law_origin_type=ประมวลกฎหมาย&law_category=ประมวลกฎหมายอาญา&legalrulesubsection=ไม่มีเลือก&law_buff=${law._source.buff}-${law._source.buff_suff_first}-100&from_year=2535&to_year=2563&law_sub_category=all&state=all&post_per_page=10&sort_by=year&page=1)`;
					}
				}
				function hide_buff_suff_second() {
					if (law._source.buff_suff_second === "") {
						return "";
					} else {
						return ` > [หมวด ${law._source.buff_suff_second}](https://www.lawphin.com/result/law?conjunction=and&law_origin_type=ประมวลกฎหมาย&law_category=ประมวลกฎหมายอาญา&legalrulesubsection=ไม่มีเลือก&law_buff=${law._source.buff}-${law._source.buff_suff_first}-${law._source.buff_suff_second}&from_year=2535&to_year=2563&law_sub_category=all&state=all&post_per_page=10&sort_by=year&page=1)`;
					}
				}
				const embed = new Discord.MessageEmbed()
					.setColor(`#FFD700`)
					.setTitle(`ประมวลกฎหมายอาญา มาตรา ${section_num}/${sub_section_num}`)
					.setURL(`https://www.lawphin.com/detail/law/penal_code-${section_num}-${sub_section_num}`)
					.setAuthor(`${bot_author}`, thumbnail_bot, `https://discord.js.org`)
					.setDescription(
						`บัญญัติว่า \"**${law._source.search.slice(0,1950).split(`มาตรา ${section_num}/${sub_section_num}`)} **\"...[ดูเพิ่มเติม](https://www.lawphin.com/detail/law/penal_code-${section_num}-${sub_section_num})`)
					.addFields(
						{
							name: "แม่บทของกฎหมาย",
							value: `กฎหมายนี้อยู่ภายใต้ ${hide_buff()} ${hide_buff_suff_first()} ${hide_buff_suff_second()}
									`
						}
					)
					.setTimestamp()
					.setFooter(`ถูกเรียกใช้โดย ${message.author.username}` , `${message.author.displayAvatarURL({ dynamic: true })}`);
				message.channel.send(embed);
			} else {
				message.reply('กรุณาระบุประเภทของกฎหมายหรือระบุเลขมาตราให้ถูกต้อง');
			}
		} else if (args[0] === `ป.วิ.พ` || args[0] === `วิ.แพ่ง`) {
			let section_num = parseInt(args[1]);
			let sub_section_num = parseInt(args[2]);
			if (!args[1]) {
				message.reply(`กรุณาระบุหมายเลขมาตราของประมวลกฎหมายวิธีพิจารณาความแพ่ง ตามหลังชื่อประเภทประมวลกฎหมาย เพื่อเรียกบทบัญญัติ เช่น \`${prefix}lawcall ป.พ.พ 193 33\``);
			} else if (!args[2]) {
				let getLaw = async () => {
					let response = await axios.get(
						`https://www.lawphin.com/api/law/detail/civil_procedure_code-${section_num}`);
					let law_response = response.data;
					return law_response;
				};
				let law = await getLaw();
				function hide_buff() {
					if (law._source.buff === "") {
						return "";
					} else {
						return `[ภาค ${law._source.buff}](https://www.lawphin.com/result/law?conjunction=and&law_origin_type=ประมวลกฎหมาย&law_category=ประมวลกฎหมายวิธีพิจารณาความแพ่ง&legalrulesubsection=ไม่มีเลือก&law_buff=${law._source.buff}-100-100&from_year=2535&to_year=2563&law_sub_category=all&state=all&post_per_page=10&sort_by=year&page=1)`;
					}
				}
				function hide_buff_suff_first() {
					if (law._source.buff_suff_first === "") {
						return "";
					} else {
						return ` > [ลักษณะ ${law._source.buff_suff_first}](https://www.lawphin.com/result/law?conjunction=and&law_origin_type=ประมวลกฎหมาย&law_category=ประมวลกฎหมายวิธีพิจารณาความแพ่ง&legalrulesubsection=ไม่มีเลือก&law_buff=${law._source.buff}-${law._source.buff_suff_first}-100&from_year=2535&to_year=2563&law_sub_category=all&state=all&post_per_page=10&sort_by=year&page=1)`;
					}
				}
				function hide_buff_suff_second() {
					if (law._source.buff_suff_second === "") {
						return "";
					} else {
						return ` > [หมวด ${law._source.buff_suff_second}](https://www.lawphin.com/result/law?conjunction=and&law_origin_type=ประมวลกฎหมาย&law_category=ประมวลกฎหมายวิธีพิจารณาความแพ่ง&legalrulesubsection=ไม่มีเลือก&law_buff=${law._source.buff}-${law._source.buff_suff_first}-${law._source.buff_suff_second}&from_year=2535&to_year=2563&law_sub_category=all&state=all&post_per_page=10&sort_by=year&page=1)`;
					}
				}
				const embed = new Discord.MessageEmbed()
					.setColor(`#FFD700`)
					.setTitle(`ประมวลกฎหมายวิธีพิจารณาความแพ่ง มาตรา ${section_num}`)
					.setURL(`https://www.lawphin.com/detail/law/civil_procedure_code-${section_num}`)
					.setAuthor(`${bot_author}`, thumbnail_bot, `https://discord.js.org`)
					.setDescription(
							`บัญญัติว่า \"**${law._source.search.slice(0,1950).split(`มาตรา ${section_num}`)} **\"...[ดูเพิ่มเติม](https://www.lawphin.com/detail/law/civil_procedure_code-${section_num})
						`)
					.addFields(
						{
							name: "แม่บทของกฎหมาย",
							value: `กฎหมายนี้อยู่ภายใต้ ${hide_buff()} ${hide_buff_suff_first()} ${hide_buff_suff_second()}
									`
						}
					)
					.setTimestamp()
					.setFooter(`ถูกเรียกใช้โดย ${message.author.username}` , `${message.author.displayAvatarURL({ dynamic: true })}`);
				message.channel.send(embed);
			} else if (!args[3]) {
				section_num = parseInt(section_num);
				sub_section_num = parseInt(sub_section_num);
				let getLaw = async () => {
					let response = await axios.get(
						`https://www.lawphin.com/api/law/detail/civil_procedure_code-${section_num}-${sub_section_num}`);
					let law_response = response.data;
					return law_response;
				};
				let law = await getLaw();
				function hide_buff() {
					if (law._source.buff === "") {
						return "";
					} else {
						return `[ภาค ${law._source.buff}](https://www.lawphin.com/result/law?conjunction=and&law_origin_type=ประมวลกฎหมาย&law_category=ประมวลกฎหมายวิธีพิจารณาความแพ่ง&legalrulesubsection=ไม่มีเลือก&law_buff=${law._source.buff}-100-100&from_year=2535&to_year=2563&law_sub_category=all&state=all&post_per_page=10&sort_by=year&page=1)`;
					}
				}
				function hide_buff_suff_first() {
					if (law._source.buff_suff_first === "") {
						return "";
					} else {
						return ` > [ภาค ${law._source.buff_suff_first}](https://www.lawphin.com/result/law?conjunction=and&law_origin_type=ประมวลกฎหมาย&law_category=ประมวลกฎหมายวิธีพิจารณาความแพ่ง&legalrulesubsection=ไม่มีเลือก&law_buff=${law._source.buff}-${law._source.buff_suff_first}-100&from_year=2535&to_year=2563&law_sub_category=all&state=all&post_per_page=10&sort_by=year&page=1)`;
					}
				}
				function hide_buff_suff_second() {
					if (law._source.buff_suff_second === "") {
						return "";
					} else {
						return ` > [ภาค ${law._source.buff_suff_second}](https://www.lawphin.com/result/law?conjunction=and&law_origin_type=ประมวลกฎหมาย&law_category=ประมวลกฎหมายวิธีพิจารณาความแพ่ง&legalrulesubsection=ไม่มีเลือก&law_buff=${law._source.buff}-${law._source.buff_suff_first}-${law._source.buff_suff_second}&from_year=2535&to_year=2563&law_sub_category=all&state=all&post_per_page=10&sort_by=year&page=1)`;
					}
				}
				const embed = new Discord.MessageEmbed()
					.setColor(`#FFD700`)
					.setTitle(`ประมวลกฎหมายวิธีพิจารณาความแพ่ง มาตรา ${section_num}/${sub_section_num}`)
					.setURL(`https://www.lawphin.com/detail/law/civil_procedure_code-${section_num}-${sub_section_num}`)
					.setAuthor(`${bot_author}`, thumbnail_bot, `https://discord.js.org`)
					.setDescription(
						`บัญญัติว่า \"**${law._source.search.slice(0,1950).split(`มาตรา ${section_num}/${sub_section_num}`)} **\"...[ดูเพิ่มเติม](https://www.lawphin.com/detail/law/civil_procedure_code-${section_num}-${sub_section_num})`)
					.addFields(
						{
							name: "แม่บทของกฎหมาย",
							value: `กฎหมายนี้อยู่ภายใต้ ${hide_buff()} ${hide_buff_suff_first()} ${hide_buff_suff_second()}
										`
						}
					)
					.setTimestamp()
					.setFooter(`ถูกเรียกใช้โดย ${message.author.username}` , `${message.author.displayAvatarURL({ dynamic: true })}`);
				message.channel.send(embed);
			} else {
				message.reply('กรุณาระบุประเภทของกฎหมายหรือระบุเลขมาตราให้ถูกต้อง');
			}
		} else if (args[0] === `ป.วิ.อ` || args[0] === `วิ.อาญา`) {
			let section_num = parseInt(args[1]);
			let sub_section_num = parseInt(args[2]);
			if (!args[1]) {
				message.reply(`กรุณาระบุหมายเลขมาตราของประมวลกฎหมายวิธีพิจารณาความอาญา ตามหลังชื่อประเภทประมวลกฎหมาย เพื่อเรียกบทบัญญัติ เช่น \`${prefix}lawcall ป.วิ.อ 119\``);
			} else if (!args[2]) {
				let getLaw = async () => {
					let response = await axios.get(
						`https://www.lawphin.com/api/law/detail/criminal_procedure_code-${section_num}`);
					let law_response = response.data;
					return law_response;
				};
				let law = await getLaw();
				function hide_buff() {
					if (law._source.buff === "") {
						return "";
					} else {
						return `[ภาค ${law._source.buff}](https://www.lawphin.com/result/law?conjunction=and&law_origin_type=ประมวลกฎหมาย&law_category=ประมวลกฎหมายวิธีพิจารณาความอาญา&legalrulesubsection=ไม่มีเลือก&law_buff=${law._source.buff}-100-100&from_year=2535&to_year=2563&law_sub_category=all&state=all&post_per_page=10&sort_by=year&page=1)}`;
					}
				}
				function hide_buff_suff_first() {
					if (law._source.buff_suff_first === "") {
						return "";
					} else {
						return ` > [ลักษณะ ${law._source.buff_suff_first}](https://www.lawphin.com/result/law?conjunction=and&law_origin_type=ประมวลกฎหมาย&law_category=ประมวลกฎหมายวิธีพิจารณาความอาญา&legalrulesubsection=ไม่มีเลือก&law_buff=${law._source.buff}-${law._source.buff_suff_first}-100&from_year=2535&to_year=2563&law_sub_category=all&state=all&post_per_page=10&sort_by=year&page=1)`;
					}
				}
				function hide_buff_suff_second() {
					if (law._source.buff_suff_second === "") {
						return "";
					} else {
						return ` > [หมวด ${law._source.buff_suff_second}](https://www.lawphin.com/result/law?conjunction=and&law_origin_type=ประมวลกฎหมาย&law_category=ประมวลกฎหมายวิธีพิจารณาความอาญา&legalrulesubsection=ไม่มีเลือก&law_buff=${law._source.buff}-${law._source.buff_suff_first}-${law._source.buff_suff_second}&from_year=2535&to_year=2563&law_sub_category=all&state=all&post_per_page=10&sort_by=year&page=1)`;
					}
				}
				const embed = new Discord.MessageEmbed()
					.setColor(`#FFD700`)
					.setTitle(`ประมวลกฎหมายวิธีพิจารณาความอาญา มาตรา ${section_num}`)
					.setURL(`https://www.lawphin.com/detail/law/criminal_procedure_code-${section_num}`)
					.setAuthor(`${bot_author}`, thumbnail_bot, `https://discord.js.org`)
					.setDescription(
							`บัญญัติว่า \"**${law._source.search.slice(0,1950).split(`มาตรา ${section_num}`)} **\"...[ดูเพิ่มเติม](https://www.lawphin.com/detail/law/criminal_procedure_code-${section_num})
						`)
					.addFields(
						{
							name: "แม่บทของกฎหมาย",
							value: `กฎหมายนี้อยู่ภายใต้ ${hide_buff()} ${hide_buff_suff_first()} ${hide_buff_suff_second()}
										`
						}
					)
					.setTimestamp()
					.setFooter(`ถูกเรียกใช้โดย ${message.author.username}` , `${message.author.displayAvatarURL({ dynamic: true })}`);
				message.channel.send(embed);
			} else if (!args[3]) {
				section_num = parseInt(section_num);
				sub_section_num = parseInt(sub_section_num);
				let getLaw = async () => {
					let response = await axios.get(
						`https://www.lawphin.com/api/law/detail/criminal_procedure_code-${section_num}-${sub_section_num}`);
					let law_response = response.data;
					return law_response;
				};
				let law = await getLaw();
				function hide_buff() {
					if (law._source.buff === "") {
						return "";
					} else {
						return `[ภาค ${law._source.buff}](https://www.lawphin.com/result/law?conjunction=and&law_origin_type=ประมวลกฎหมาย&law_category=ประมวลกฎหมายวิธีพิจารณาความอาญา&legalrulesubsection=ไม่มีเลือก&law_buff=${law._source.buff}-100-100&from_year=2535&to_year=2563&law_sub_category=all&state=all&post_per_page=10&sort_by=year&page=1)`;
					}
				}
				function hide_buff_suff_first() {
					if (law._source.buff_suff_first === "") {
						return "";
					} else {
						return ` > [ภาค ${law._source.buff_suff_first}](https://www.lawphin.com/result/law?conjunction=and&law_origin_type=ประมวลกฎหมาย&law_category=ประมวลกฎหมายวิธีพิจารณาความอาญา&legalrulesubsection=ไม่มีเลือก&law_buff=${law._source.buff}-${law._source.buff_suff_first}-100&from_year=2535&to_year=2563&law_sub_category=all&state=all&post_per_page=10&sort_by=year&page=1)`;
					}
				}
				function hide_buff_suff_second() {
					if (law._source.buff_suff_second === "") {
						return "";
					} else {
						return ` > [ภาค ${law._source.buff_suff_second}](https://www.lawphin.com/result/law?conjunction=and&law_origin_type=ประมวลกฎหมาย&law_category=ประมวลกฎหมายวิธีพิจารณาความอาญา&legalrulesubsection=ไม่มีเลือก&law_buff=${law._source.buff}-${law._source.buff_suff_first}-${law._source.buff_suff_second}&from_year=2535&to_year=2563&law_sub_category=all&state=all&post_per_page=10&sort_by=year&page=1)`;
					}
				}
				const embed = new Discord.MessageEmbed()
					.setColor(`#FFD700`)
					.setTitle(`ประมวลกฎหมายวิธีพิจารณาความอาญา มาตรา ${section_num}/${sub_section_num}`)
					.setURL(`https://www.lawphin.com/detail/law/criminal_procedure_code-${section_num}-${sub_section_num}`)
					.setAuthor(`${bot_author}`, thumbnail_bot, `https://discord.js.org`)
					.setDescription(
						`บัญญัติว่า \"**${law._source.search.slice(0,1950).split(`มาตรา ${section_num}/${sub_section_num}`)} **\"...[ดูเพิ่มเติม](https://www.lawphin.com/detail/law/criminal_procedure_code-${section_num}-${sub_section_num})`)
					.addFields(
						{
							name: "แม่บทของกฎหมาย",
							value: `กฎหมายนี้อยู่ภายใต้ ${hide_buff()} ${hide_buff_suff_first()} ${hide_buff_suff_second()}
										`
						}
					)
					.setTimestamp()
					.setFooter(`ถูกเรียกใช้โดย ${message.author.username}` , `${message.author.displayAvatarURL({ dynamic: true })}`);
				message.channel.send(embed);
			} else {
				message.reply("กรุณาระบุประเภทของกฎหมายหรือระบุเลขมาตราให้ถูกต้อง");
			}
		} else {
			message.reply("กรุณาระบุประเภทของกฎหมายหรือระบุเลขมาตราให้ถูกต้อง");
		}
	}
}