const Discord = require(`discord.js`);
const {prefix, bot_author,thumbnail_bot} = require(`./config.json`);

module.exports = {
	name: `yearcalc`,
	description: `คำสั่งการแปลงศักราช`,
	execute: async(message, args) => {
        if (!args[0] || args[0] === 'help') {
            const embed = new Discord.MessageEmbed()
                .setColor(`#FFD700`)
                .setTitle(`คำสั่ง yearcalc`)
                .setAuthor(`${bot_author}`, thumbnail_bot, `https://discord.js.org`)
                .setDescription(`คำสั่งการเทียบศักราช`)
                .addFields(
                    { 
                        name: `รูปแบบคำสั่ง`, 
                        value: `${prefix}yearcalc [ศักราชที่ระบุ] [ศักราชที่จะแปลงเป็นผลลัพธํ] <เลขศักราช>`
                    },
                    { 
                        name: `ตัวอย่าง`, 
                        value: `${prefix}yearcalc พ.ศ. ค.ศ. 2563`
                    }
                )
                .addFields(
                    { 
                        name: `ศักราชที่รองรับ`, 
                        value: `
                        - พุทธศักราช (พ.ศ.)
                        - คริสต์ศักราช (ค.ศ.)
                        - มหาศักราช (ม.ศ.)
                        - ฮิจญ์เราะห์ศักราช (ฮ.ศ)
                        - จุลศักราช (จ.ศ)
                        - รัตนโกสินทร์ศก (ร.ศ.)
                    `}
                )
                .setTimestamp()
                .setFooter(`ถูกเรียกใช้โดย ${message.author.username}` , `${message.author.displayAvatarURL({ dynamic: true })}`);
            message.channel.send(embed);
        }
        let input1 = args[0];
        let input2 = args[1];
        if (input1 === 'พ.ศ.') {
            if (input2 === 'พ.ศ.') {
                let num = parseInt(args[2]);
                let result = num;
                message.channel.send(result);
            } else if (input2 === 'ค.ศ.') {
                let num = parseInt(args[2]);
                let result = num-543;
                message.channel.send(result);
            } else if (input2 === 'ม.ศ.') {
                let num = parseInt(args[2]);
                let result = num-621;
                message.channel.send(result);
            } else if (input2 === 'ฮ.ศ.') {
                let num = parseInt(args[2]);
                let result = num-1122;
                message.channel.send(result);
            } else if (input2 === 'จ.ศ.') {
                let num = parseInt(args[2]);
                let result = num-1181;
                message.channel.send(result);
            } else if (input2 === 'ร.ศ.') {
                let num = parseInt(args[2]);
                let result = num-2324;
                message.channel.send(result);
            }
        } else if (input1 === 'ค.ศ.') {
            if (input2 === 'พ.ศ.') {
                let num = parseInt(args[2]);
                let result = num+543;
                message.channel.send(result);
            } else if (input2 === 'ค.ศ.') {
                let num = parseInt(args[2]);
                let result = num;
                message.channel.send(result);
            } else if (input2 === 'ม.ศ.') {
                let num = parseInt(args[2]);
                let result = num+543-621;
                message.channel.send(result);
            } else if (input2 === 'ฮ.ศ.') {
                let num = parseInt(args[2]);
                let result = num+543-1122;
                message.channel.send(result);
            } else if (input2 === 'จ.ศ.') {
                let num = parseInt(args[2]);
                let result = num+543-1181;
                message.channel.send(result);
            } else if (input2 === 'ร.ศ.') {
                let num = parseInt(args[2]);
                let result = num+543-2324;
                message.channel.send(result);
            }
        } else if (input1 === 'ม.ศ.') {
            if (input2 === 'พ.ศ.') {
                let num = parseInt(args[2]);
                let result = num+621;
                message.channel.send(result);
            } else if (input2 === 'ค.ศ.') {
                let num = parseInt(args[2]);
                let result = num+78;
                message.channel.send(result);
            } else if (input2 === 'ม.ศ.') {
                let num = parseInt(args[2]);
                let result = num;
                message.channel.send(result);
            } else if (input2 === 'ฮ.ศ.') {
                let num = parseInt(args[2]);
                let result = num-501;
                message.channel.send(result);
            } else if (input2 === 'จ.ศ.') {
                let num = parseInt(args[2]);
                let result = num-560;
                message.channel.send(result);
            } else if (input2 === 'ร.ศ.') {
                let num = parseInt(args[2]);
                let result = num-1703;
                message.channel.send(result);
            }
        } else if (input1 === 'ฮ.ศ.') {
            if (input2 === 'พ.ศ.') {
                let num = parseInt(args[2]);
                let result = num+1122;
                message.channel.send(result);
            } else if (input2 === 'ค.ศ.') {
                let num = parseInt(args[2]);
                let result = num+1122-543;
                message.channel.send(result);
            } else if (input2 === 'ม.ศ.') {
                let num = parseInt(args[2]);
                let result = num+1122-621;
                message.channel.send(result);
            } else if (input2 === 'ฮ.ศ.') {
                let num = parseInt(args[2]);
                let result = num;
                message.channel.send(result);
            } else if (input2 === 'จ.ศ.') {
                let num = parseInt(args[2]);
                let result = num+1122-1181;
                message.channel.send(result);
            } else if (input2 === 'ร.ศ.') {
                let num = parseInt(args[2]);
                let result = num+1122-2324;
                message.channel.send(result);
            }
        } else if (input1 === 'จ.ศ.') {
            if (input2 === 'พ.ศ.') {
                let num = parseInt(args[2]);
                let result = num+1181;
                message.channel.send(result);
            } else if (input2 === 'ค.ศ.') {
                let num = parseInt(args[2]);
                let result = num+1181-543
                message.channel.send(result);
            } else if (input2 === 'ม.ศ.') {
                let num = parseInt(args[2]);
                let result = num+1181-621;
                message.channel.send(result);
            } else if (input2 === 'ฮ.ศ.') {
                let num = parseInt(args[2]);
                let result = num+1181-1122;
                message.channel.send(result);
            } else if (input2 === 'จ.ศ.') {
                let num = parseInt(args[2]);
                let result = num;
                message.channel.send(result);
            } else if (input2 === 'ร.ศ.') {
                let num = parseInt(args[2]);
                let result;
                message.channel.send(result);
            }
        } else if (input1 === 'ร.ศ.') {
            if (input2 === 'พ.ศ.') {
                let num = parseInt(args[2]);
                let result = num+2325;
                message.channel.send(result);
            } else if (input2 === 'ค.ศ.') {
                let num = parseInt(args[2]);
                let result = num+2325-543;
                message.channel.send(result);
            } else if (input2 === 'ม.ศ.') {
                let num = parseInt(args[2]);
                let result = num+2325-621;
                message.channel.send(result);
            } else if (input2 === 'ฮ.ศ.') {
                let num = parseInt(args[2]);
                let result = num+2325-1122;
                message.channel.send(result);
            } else if (input2 === 'จ.ศ.') {
                let num = parseInt(args[2]);
                let result = num+2325-1181;
                message.channel.send(result);
            } else if (input2 === 'ร.ศ.') {
                let num = parseInt(args[2]);
                let result = num;
                message.channel.send(result);
            }
        } else {
            message.reply("กรุณาระบุข้อมูลนำเข้าให้ถูกต้อง");
        }
    }    
}