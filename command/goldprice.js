const {prefix, bot_author,thumbnail_bot} = require(`./config.json`);
const request = require(`request`);
const Discord = require(`discord.js`);
const cheerio = require(`cheerio`);
module.exports = {
	name: `goldprice`,
	description: `ช่วยเหลือ`,

	execute: async (message, args) => {
		request(`https://xn--42cah7d0cxcvbbb9x.com`, (error, response, html) => {
    		const $ = cheerio.load(html);
    		const date = $('#rightCol > div.divgta.goldshopf > table > tbody > tr:nth-child(5) > td.span.bg-span.txtd.al-r').text();
    		const update_time = $('#rightCol > div.divgta.goldshopf > table > tbody > tr:nth-child(5) > td.em.bg-span.txtd.al-r').text();
    		const gold_buy = $('#rightCol > div.divgta.goldshopf > table > tbody > tr:nth-child(3) > td:nth-child(3)').text();
    		const gold_sell = $('#rightCol > div.divgta.goldshopf > table > tbody > tr:nth-child(3) > td:nth-child(2)').text();
    		const goldBar_buy = $('#rightCol > div.divgta.goldshopf > table > tbody > tr:nth-child(2) > td:nth-child(3)').text();
    		const goldBar_sell = $('#rightCol > div.divgta.goldshopf > table > tbody > tr:nth-child(2) > td:nth-child(2)').text();

			const embed = new Discord.MessageEmbed()
				.setAuthor(bot_author, thumbnail_bot, 'https://discord.js.org')
				.setColor(`#FFD700`)
				.setDescription(`__**ทองคำแท่ง**__
					\`\`\`js
					ราคาขายออก ${goldBar_buy} บาท
					ราคารับซื้อ ${goldBar_sell} บาท\`\`\`
        
					__**ทองรูปพรรณ**__
					\`\`\`js
					ราคาขายออก ${gold_buy} บาท
					ราคารับซื้อ ${gold_sell} บาท\`\`\``)
				.setTimestamp()
				.setFooter(`ถูกเรียกใช้โดย ${message.author.username} อัปเดตล่าสุดวันที่ ${date} ${update_time} ตามประกาศสมาคมค้าทองคำแห่งประเทศไทย` , `${message.author.displayAvatarURL({ dynamic: true })}`);
				message.channel.send(embed)
 	 		})
		}
	}