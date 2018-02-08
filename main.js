const Discord = require('discord.js');
const bot = new Discord.Client();
const weather = require('weather-js');
const hastebin = require('hastebin-gen');
const ads = require('./ads.js'); 
const swears = require('./swears.js'); 
var token = "no token, just stop looking at token ffs lol";
var guilds = {};

bot.on("ready", function() {
	  bot.user.setGame("http://aloid.tk | (help", "https://www.twitch.tv/123silly");
    console.log(`Started bot as: ${bot.user.tag}!`);
});

//===========================================

bot.on("guildMemberAdd", function(member) {

let joinleave = member.guild.channels.find("name","join-leave");
let memberRole = member.guild.roles.find("name", "Member");

if(!joinleave) return;
if(!memberRole) return;

joinleave.send(`:tada: Welcome **` + member.toString() + `** to ${member.guild.name}! Our membercount is: **${member.guild.members.size}**!`);
member.addRole(memberRole.id);
});

bot.on("guildMemberRemove", function(member) {

let joinleaves = member.guild.channels.find("name","join-leave");

if(!joinleaves) return;

joinleaves.send(`Oh no... **` + member.toString() + `** left. Our membercount is now **${member.guild.members.size}** :frowning:`);
});
//============================


bot.on("message", function(message) {
  try{
      if (!guilds[message.guild.id]) {
          guilds[message.guild.id] = {
              prefix: "(",
              advert: 0,
			  antiswear: 0,
          };
      }
  } catch (e) {
    console.log(e);
  }

  const advert = guilds[message.guild.id].advert;

	if (advert === 1) { //detects if antiswear is on or not
  var string = message.content;
  var lower = string.toLowerCase();
  for (i = 0; i < 554; i++)
  {
      if (lower.indexOf(ads.list[i]) >= 0)
      {
          if(message.guild.member(message.author).hasPermission(`ADMINISTRATOR`)) {
			  //admins can advertise.
         } else {
          message.delete();
          message.reply(":x: You are not allowed to advertise.")
          //userData.swears++;
          break;
}
      }
  }
}


function clean(text) {
  if (typeof(text) === `string`)
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, `@` + String.fromCharCode(8203));
  else
      return text;
}

const as = guilds[message.guild.id].as;

if (as === 1) { //detects if antiswear is on or not
  var string = message.content;
  var lower = string.toLowerCase();
  for (i = 0; i < 554; i++)
  {
      if (lower.indexOf(swears.list[i]) >= 0)
      {
          if(message.guild.member(message.author).hasPermission(`ADMINISTRATOR`)) {
         } else {
          message.delete();
          message.reply(":x: You are not allowed to swear.")
          //userData.swears++;
          break;
}
      }
  }
}

var animepics = [
  'https://cdn.discordapp.com/attachments/409118997305622529/409792198671073280/Capture.PNG',
  'https://cdn.discordapp.com/attachments/409118997305622529/409793133006815252/9e2dece20151845674870f36e0e5350402e660c3_hq.png',
  'https://cdn.discordapp.com/attachments/409118997305622529/409793166292549652/79e80478f9996d39a081fc118e4ebcc0.png',
  'https://cdn.discordapp.com/attachments/409118997305622529/409793206398484491/images.png',
  'https://cdn.discordapp.com/attachments/409118997305622529/409793252691279872/images.png',
  'https://cdn.discordapp.com/attachments/409118997305622529/409793273318735873/images.png',
  'https://cdn.discordapp.com/attachments/409118997305622529/409793299226820609/812811c91bb75f942a8a1b20e7cc73fb.png',
  'https://cdn.discordapp.com/attachments/409118997305622529/409793317627363329/images.png',
  'https://cdn.discordapp.com/attachments/409118997305622529/409793359402500106/3760262.png',
  'https://cdn.discordapp.com/attachments/409118997305622529/409793434451443712/aa26f348c73960481be1b1efff191522678d912a_hq.png',
  'https://cdn.discordapp.com/attachments/409118997305622529/409793556866400257/images.png',
  'https://cdn.discordapp.com/attachments/409118997305622529/409793571085090816/images.png',
  'https://cdn.discordapp.com/attachments/409118997305622529/409793595730690048/images.png',
  'https://cdn.discordapp.com/attachments/409118997305622529/409793649040293898/images.png',
  'https://cdn.discordapp.com/attachments/409118997305622529/409793664236388352/images.png',
  'https://cdn.discordapp.com/attachments/409118997305622529/409793747694518272/images.png',
  'https://cdn.discordapp.com/attachments/409118997305622529/409793937625055232/images.png',
  'https://cdn.discordapp.com/attachments/409118997305622529/409794051760717844/zjWm8ky5.png',
  'https://cdn.discordapp.com/attachments/409118997305622529/409794057011986432/images.png',
  'https://cdn.discordapp.com/attachments/409118997305622529/409794136208572426/images.png',
];

var h = [
  'https://simg3.gelbooru.com/images/95/68/9568145f22350f7acfc8efb54d6f694e.jpeg','https://files.yande.re/image/ce8e14c0b8919994e8c57152e3c7b8f6/yande.re%20432859%20censored%20fate_grand_order%20feet%20mash_kyrielight%20naked%20nipples%20pussy%20pussy_juice%20remana.jpg',
  'https://simg3.gelbooru.com/images/ef/e8/efe83f21c2d222b68559bd2816aef4e8.png',
  'https://danbooru.donmai.us/data/__megumin_kono_subarashii_sekai_ni_shukufuku_wo_drawn_by_apoidea__b31ab36f6e4b62102e81a4f92cbeb9b0.jpg',
  'https://konachan.com/image/54eaeb126270dffe405042bffa46a3e9/Konachan.com%20-%20259982%20ass%20ass_grab%20bed%20brown_hair%20green_eyes%20gyouza_teishoku%20naked_shirt%20original%20sex%20short_hair.png',
  'https://files.yande.re/image/1a4d3fafcb34a269d7d203370168c507/yande.re%20432823%20anus%20ass%20ass_grab%20monster%2Bmusume%20monster_girl%20nipples%20pantsu%20pointy_ears%20pussy%20sayori%20thong%20topless.jpg',
  'https://simg3.gelbooru.com/images/4c/7b/4c7b8a289d8b0a74073bc2debe27ed38.gif',
  'https://danbooru.donmai.us/data/__hakurei_reimu_and_sananana_cookie_touhou_and_touhou_drawn_by_oozon_ozon__83d50be518f74ca31d5a38bca8c56d0a.png',
  'https://konachan.com/image/0b7c462faad96aadad4f9b09f2b5c91f/Konachan.com%20-%20259325%20anus%20ass%20ass_grab%20creampie%20cum%20game_cg%20green_eyes%20green_hair%20hunie_pop%20long_hair%20ninamo%20theiatena_venus%20uncensored.jpg',
  'https://files.yande.re/image/a2d9643fb870bd5c3684f48681b6b0e0/yande.re%20433012%20boku_wa_tomodachi_ga_sukunai%20breasts%20cait%20kashiwazaki_sena%20kimono%20nipples%20no_bra%20nopan%20open_shirt%20pussy%20uncensored.png'];

var parseTime = function(milliseconds) {
  var seconds = Math.floor(milliseconds/1000); milliseconds %= 1000;
  var minutes = Math.floor(seconds/60); seconds %= 60;
  var hours = Math.floor(minutes/60); minutes %= 60;
  var days = Math.floor(hours/24); hours %= 24;
  var written = false;
  return (days?(written=true,days+` days`):``)+(written?`, `:``)
      +(hours?(written=true,hours+` hours`):``)+(written?`, `:``)
      +(minutes?(written=true,minutes+` minutes`):``)+(written?`, `:``)
      +(seconds?(written=true,seconds+` seconds`):``)+(written?`, `:``)
      +(milliseconds?milliseconds+` milliseconds`:``);
};


  const prefix = guilds[message.guild.id].prefix;

  const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20b046, 0xf2e807, 0xf207d1, 0xee8419, 0x8a2be2];

  if (message.author.bot) return;

  if (message.author.equals(bot.user)) return;

  if (!message.content.startsWith(prefix)) return;
  
  if(message.channel.type === 'DM') return;

  var args = message.content.substring(prefix.length).split(" ");
  switch (args[0].toLowerCase()) {
    case "eval":
    if(message.author.id == "395954014715510784") {
      try {
        const code = args.join(` `);
        let evaled = eval(code);
  
        if (typeof evaled !== `string`)
          evaled = require(`util`).inspect(evaled);

        const embed = new Discord.RichEmbed()
        .setTitle(`Evaluating...`)
        .setColor(hexcols[~~(Math.random() * hexcols.length)])
        .setDescription(`Input:\n${code}\n \nOutput:\n${clean(evaled)}`);
        message.channel.send({embed});
      } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
          }
    } else {
      message.reply("Really? Eval? Heh, nice try tho.");
    }
    break;
    case "animebomb":
    message.channel.sendMessage(animepics[Math.floor(Math.random() * animepics.length )] + "\n" + animepics[Math.floor(Math.random() * animepics.length )] + "\n" + animepics[Math.floor(Math.random() * animepics.length )]);
    break;
    case "hentaibomb":
    if(!message.channel.nsfw){
      message.reply("THIS IS A NSFW COMMAND, PLEASE USE THIS COMMAND IN A NSFW CHANNEL! :x:")
      }else{
        message.channel.sendMessage(h[Math.floor(Math.random() * h.length )] + "\n" + h[Math.floor(Math.random() * h.length )] + "\n" + h[Math.floor(Math.random() * h.length )]);
      }
    break;
    case "marry":
    let mar = message.mentions.users.first();
    if (!mar) {
      message.reply("Please mention a user to marry.");
    } else {
    var mare = new Discord.RichEmbed()
    .setTitle(`New people has been married! :heart_eyes: :heart_eyes: `)
    .setDescription(`:heart: <@${message.author.id}> is now married with <@${mar.id}>! :wink:`)
    .setImage(`https://i.ytimg.com/vi/6ytPCSS8_7s/maxresdefault.jpg`)
    .setColor(0x721487)
    message.channel.sendEmbed(mare);
    }
    break;
case "ping":
message.reply(`Pong! ${Math.round(bot.ping)}ms`);
break;
case "prefix":
if(message.guild.member(message.author).hasPermission(`ADMINISTRATOR`)) {
if(message.channel.type === 'dm') {
  message.reply(":x: **This command is not allowed in PM's!** :x:");
} else {
	if (args[1]) {
  const newPrefix = args.slice(1).join(" ");
  guilds[message.guild.id].prefix = newPrefix;
  message.reply(`New prefix for **${message.guild.name}** is **${newPrefix}** ! :x: **NOTICE:** Prefix cannot be changed to music part, sorry.`);
	} else {
		message.reply(":x: **Your prefix cant be empty!** :x:");
	}
}
} else {
	message.reply(":x: You are missing **ADMINISTRATOR** permission! :x:");
}
break;
case "help":
var helpembed = new Discord.RichEmbed()
.setTitle(`Aloid's Commands List`)
.setDescription(`**[PRESS ME FOR COMMAND LIST](https://bts.net.pl/aloid/cmds)**\n\nPrefix is: **${prefix}** !\n\n[Invite Me!](http://bts.net.pl/aloid)\n[Support Discord Server](https://discord.gg/fVuRsby)\n[Special thanks to telk](https://discord.gg/3FKGeFw) `)
.setAuthor(`Requested by ${message.author.username}`, message.author.displayAvatarURL)
.setFooter(`By 123silly#0001 | Aloid 1.6v Copyright`)
.setThumbnail(`https://bts.net.pl/cdn/aloid.png`)
.setColor(0x721487)
message.react("406932185371901964");
message.channel.sendEmbed(helpembed);
break;
case "password":
var a = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s","t","u", "v", "w", "x","y","z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S","T","U", "V", "W", "X","Y","Z"];
message.reply(a[Math.floor(Math.random() * a.length )] + a[Math.floor(Math.random() * a.length )] + a[Math.floor(Math.random() * a.length )] + a[Math.floor(Math.random() * a.length )] + a[Math.floor(Math.random() * a.length )] + a[Math.floor(Math.random() * a.length )] + a[Math.floor(Math.random() * a.length )] + a[Math.floor(Math.random() * a.length )] + a[Math.floor(Math.random() * a.length )] + a[Math.floor(Math.random() * a.length )] + a[Math.floor(Math.random() * a.length )] + a[Math.floor(Math.random() * a.length )]);
break;
case "servers":
var servers = new Discord.RichEmbed()
.setTitle("Aloid's Servers")
.setDescription(`**I am in ${bot.guilds.size} servers, with ${bot.users.size} users and guilds:\n**` + bot.guilds.map(g=>g.name).join(", "))
.setAuthor(`Requested by ${message.author.username}`, message.author.displayAvatarURL)
.setColor(0x721487)
message.channel.sendEmbed(servers);
break;
case "suggest":
if (args[1]) {
var time = new Date();
var sugargs = message.content.substring(prefix.length+8).split(" ");
const sugmsg = sugargs.join(" ");
var sembed = new Discord.RichEmbed()
.setTitle(`**Suggestion**`)
.setDescription(`${sugmsg}`)
.setAuthor(`Requested by ${message.author.username}`, message.author.displayAvatarURL)
.setFooter(`Sent at ${time}`)
.setColor(0xe8d830)
message.guild.channels.find("name", "suggestion").sendMessage(sembed).then(function (message) {
  message.react("đź‘Ť")
  message.react("đź‘Ž")
}).catch(function() {
  //Something
 });
message.reply("<:aloid_09:406932185371901964> Suggestion has been sent! :mailbox:");
} else {
  return message.reply(":x: **PLEASE WRITE A SUGGESTION!** :x:");
}
break;
case "config-suggestion":
var server = message.guild;
var name = "suggestion";
server.createChannel(name, "text");
message.reply(`Channel has been created, please disable writing messages for members!`)
break;
case "say":
if(message.author.id == "395954014715510784") {
    var sayargs = message.content.substring(prefix.length+4).split(" ");
                    const saymsg = sayargs.join(" ");
                    message.delete().catch(O_o=>{});
		    message.channel.sendMessage(saymsg);
    } else {

        message.channel.send(":x: **Bot Owner Only**");
    }
break;
case "dbl":
if(message.author.id == "395954014715510784") {
  const snekfetch = require('snekfetch');
  const dblToken = 'no dbl token for you hehe';
snekfetch.post(`https://discordbots.org/api/bots/${bot.user.id}/stats`)
      .set("Authorization", dblToken)
      .send({ server_count: bot.guilds.size })
      .then(() => console.log("Sent guild count to discordbots.org!"));
  } else {

      message.channel.send(":x: **Bot Owner Only**");
  }
break;
case "mc":
if (args[1]) {
 var mcskin = new Discord.RichEmbed()
.setTitle(`Minecraft Information`)
.setDescription(`Welcome back ` + args[1] + `! Here is some information about you:`)
.addField(`Username:`, args[1], true)
.addField(`Skin:`, `https://minecraftskinstealer.com/skin.php?u=`+ args[1] +`&s=700`, true)
.addField(`Use this skin to your account:`, `[Click Me!](https://www.minecraft.net/profile/skin/remote?url=https://minecraft.net/skin/` + args[1] + `.png)`)
.setAuthor(`Requested by ${message.author.username}`, message.author.displayAvatarURL)
.setThumbnail(`https://minotar.net/avatar/`+ args[1] + `/100.png`)
.setColor(0x721487)
message.channel.sendEmbed(mcskin);
} else {
message.reply("Please enter a nickname!");
}
break;
case "antiinvite":
if(message.guild.member(message.author).hasPermission(`ADMINISTRATOR`)) {
if (args[1] === "on") {
  guilds[message.guild.id].advert=1; //sets it to 1
  message.channel.sendMessage(`<:aloid_09:406932185371901964> **ANTI-DISCORD-LINKS MODULE HAS BEEN TURNED ON!!**`)
} else if (args[1] === "off") {
  guilds[message.guild.id].advert=0; //sets it to 0
  message.channel.sendMessage(":x: **TURNED OFF ANTI-DISCORD-LINKS MODULE** :x:")
} else {
  message.channel.sendMessage(":x: **INVALID USAGE!** Usage: ${prefix}antiadvert on/off");
}
} else {
	message.reply(":x: You have missing permissions: **ADMINISTATOR**! :x:");
}
break;
case "antiswear":
if(message.guild.member(message.author).hasPermission(`ADMINISTRATOR`)) {
if (args[1] === "on") {
  guilds[message.guild.id].as=1; //sets it to 1
  message.channel.sendMessage(`<:aloid_09:406932185371901964> **ANTI-SWEAR MODULE HAS BEEN TURNED ON!!**`)
} else if (args[1] === "off") {
  guilds[message.guild.id].as=0; //sets it to 0
  message.channel.sendMessage(":x: **TURNED OFF ANTI-SWEAR MODULE** :x:")
} else {
  message.channel.sendMessage(":x: **INVALID USAGE!** Usage: ${prefix}antiswear on/off");
}
} else {
	message.reply(":x: You have missing permissions: **ADMINISTATOR**! :x:");
}
break;
case "8ball":
if (args[1]) {
var balls = ["Nope", "No", "Nah", "Nuu!", "Never", "I think not", "Maybe no", "Yes", "Yas", "Always", "I think yes", "Maybe yes", "Maybe"];
var qargs = message.content.substring(prefix.length+6).split(" ");
const qumsg = qargs.join(" ");
var balle = new Discord.RichEmbed()
.setTitle(`Aloid's 8ball`)
.setDescription(`Question: ` + qumsg + `\n\nAnswer: ` + balls[Math.floor(Math.random() * balls.length)])
.setAuthor(`Requested by ${message.author.username}`, message.author.displayAvatarURL)
.setThumbnail(`https://emojipedia-us.s3.amazonaws.com/thumbs/120/apple/118/billiards_1f3b1.png`)
.setFooter(`Here is my answer to your question...`)
.setColor(0x721487)
message.channel.sendEmbed(balle);
} else {
	message.reply("Please write a question.");
}
break;
case "avatar":
let useri = message.mentions.users.first();
if (!useri) {
	var ave = new Discord.RichEmbed()
	.setImage(message.author.avatarURL)
	.setAuthor(`Requested by ${message.author.username}`, message.author.displayAvatarURL)
	.setColor(0x721487)
	message.channel.sendEmbed(ave);
} else {
	var spme = new Discord.RichEmbed()
	.setImage(useri.avatarURL)
	.setAuthor(`Requested by ${message.author.username}`, message.author.displayAvatarURL)
	.setColor(0x721487)
	message.channel.sendEmbed(spme);
}
break;
case "meme":
message.reply("Aye matey, u want dank memz? Thatz gud place 4 u, pls check my creators **MEME** page: **http://memz.tk**");
break;
case "serverinfo":
var si = new Discord.RichEmbed()
.setTitle(`:desktop: Information about ${message.guild.name}`)
.setDescription(`:white_small_square: ID: **${message.guild.id}**\n:white_small_square: Owner: **${message.guild.owner}**\n:white_small_square: Location: **${message.guild.region}**\n:white_small_square: Creation: **${message.guild.createdAt}**\n:white_small_square: Users: **${message.guild.members.size}**\n:white_small_square: Channels: **${message.guild.channels.size}**`)
.setThumbnail(message.guild.iconURL)
.setFooter(`${message.guild.name} information`)
.setAuthor(`Requested by ${message.author.username}`, message.author.displayAvatarURL)
.setColor(0x721487)
message.channel.sendEmbed(si);
break;
case "anime":
var aembedo = new Discord.RichEmbed()
.setAuthor(`Requested by ${message.author.username}`, message.author.displayAvatarURL)
.setTitle(`Anime List in Aloid`)
.setDescription(`[Sword art online I | Dub](http://kissanime.ru/Anime/Sword-Art-Online-Dub)\n[Sword art online I | Sub](http://kissanime.ru/Anime/Sword-Art-Online)\n[Sword art online II | Dub](http://kissanime.ru/Anime/Sword-Art-Online-II-Dub)\n[Sword art online II | Sub](http://kissanime.ru/Anime/Sword-Art-Online-II)\n[Tokyo ghoul | Dub](http://kissanime.ru/Anime/Tokyo-Ghoul-Dub)\n[Tokyo ghoul](http://kissanime.ru/Anime/Tokyo-Ghoul)\n[Tokyo ghoul Root A | Dub](http://kissanime.ru/Anime/Tokyo-Ghoul-Root-A-Dub)\n[Tokyo ghoul Root A | Sub](http://kissanime.ru/Anime/Tokyo-Ghoul-A)\n[Another | Dub](http://kissanime.ru/Anime/Another-Dub)\n[Another | Sub](http://kissanime.ru/Anime/Another)\n[Zero no Tsukaima | Dub](http://kissanime.ru/Anime/Zero-no-Tsukaima-Dub)\n[Zero no Tsukaima | Sub](http://kissanime.ru/Anime/Zero-no-Tsukaima)\n[Owari no Seraph](https://myanimelist.net/anime/26243/Owari_no_Seraph)\n[NO game NO life | Dub](http://kissanime.ru/Anime/No-Game-No-Life-Dub)\n[NO game NO life | Sub](http://kissanime.ru/Anime/No-Game-No-Life)\n[Corpse Party: Tortured Souls - Bougyakusareta Tamashii no Jukyou](http://kissanime.ru/Anime/Corpse-Party-Tortured-Souls-Bougyakusareta-Tamashii-no-Jukyou)\n[Nisekoi](http://kissanime.ru/Anime/Nisekoi)`)
.setColor(0x721487)
message.channel.sendEmbed(aembedo);
var aembed = new Discord.RichEmbed()
  .setDescription(`[Charlotte | Dub](http://kissanime.ru/Anime/Charlotte-Dub)\n[Charlotte | Sub](http://kissanime.ru/Anime/Charlotte)\n**[HIGH SCHOOL DXD | All episodes](http://kissanime.ru/Search/Anime/HighSchoolDxD)**\n[Boku no Hero Academia | Dub](http://kissanime.ru/Anime/Boku-no-Hero-Academia-Dub)\n[Boku no Hero Academia | Sub](http://kissanime.ru/Anime/Boku-no-Hero-Academia-My-Hero-Academia)\n[Boku no Hero Academia 2nd Season | Dub](http://kissanime.ru/Anime/Boku-no-Hero-Academia-2nd-Season-Dub)\n[Boku no Hero Academia 2nd Season | Sub](http://kissanime.ru/Anime/Boku-no-Hero-Academia-2nd-Season)\n[Ousama Game | Dub](http://kissanime.ru/Anime/Ousama-Game-Dub)\n[Ousama Game | Sub](http://kissanime.ru/Anime/Ousama-Game-The-Animation)\n[Sakurasou no Pet na Kanojo](http://kissanime.ru/Anime/Sakurasou-no-Pet-na-Kanojo)\n[Mirai Nikki TV | Dub](http://kissanime.ru/Anime/Mirai-Nikki-TV-Dub)\n[Mirai Nikki TV | Sub](http://kissanime.ru/Anime/Mirai-Nikki-TV)\n[Shiki | Dub](http://kissanime.ru/Anime/Shiki-Dub)\n[Shiki | Sub](http://kissanime.ru/Anime/Shiki)\n[Death Note | Dub](http://kissanime.ru/Anime/Death-Note-Dub)\n[DeathNote | Sub](http://kissanime.ru/Anime/Death-Note)\n[Kiseijuu: Sei no Kakuritsu | Dub](http://kissanime.ru/Anime/Kiseijuu-Sei-no-Kakuritsu-Dub)\n[Kiseijuu: Sei no Kakuritsu | Sub](http://kissanime.ru/Anime/Kiseijuu-Sei-no-Kakuritsu)\n[Aho-Girl](http://kissanime.ru/Anime/Aho-Girl)\n[Akatsuki-no-Yona](http://kissanime.ru/Anime/Akatsuki-no-Yona)\n[Ao-Haru-Ride](http://kissanime.ru/Anime/Ao-Haru-Ride)\n[Ballroom-e-Youkoso](http://kissanime.ru/Anime/Ballroom-e-Youkoso)\n[Berserk 2016](http://kissanime.ru/Anime/Berserk-2016)\n[Parasyte | Dub](http://kissanime.ru/Anime/Kiseijuu-Sei-no-Kakuritsu-Dub)\n[Parasyte | Sub](http://kissanime.ru/Anime/Kiseijuu-Sei-no-Kakuritsu)`)
.setFooter(`Search anime by typing ${prefix}searchanime`)
.setColor(0x721487)
message.channel.sendEmbed(aembed);
break;
case "searchanime":
if (args[1]) {
	message.reply(`http://kissanime.ru/Search/Anime/` + args[1]);
} else {
	message.reply(`How to use: \n${prefix}searchanime [anime] **NOTICE: DONT USE SPACES, USE - !!**`);
}
break;
case "purge":
async function purge() {
  message.delete(); 
  if(!message.guild.member(message.author).hasPermission(`MANAGE_MESSAGES`)) {
      message.reply(`:x: You have missing permissions: **MANAGE_MESSAGES**! :x:`);
      return;
  }

  if (!args[1]) {
      message.channel.send('Please use a number as your arguments. \n Usage: ' + prefix + 'purge <amount>'); 
      return;
  }
message.delete();
  const fetched = await message.channel.fetchMessages({limit: args[1]});
  console.log(fetched.size + ' messages found, deleting...');
  message.channel.bulkDelete(fetched)
      .catch(error => message.channel.send(`Error: ${error}`));

}
purge();
break;
case "weather":
        weather.find({search: args.join(" "), degreeType: 'F'}, function(err, result) {
            if (err) message.channel.send(err);
            if (result.length === 0) {
                message.channel.send(':x: **Please enter a valid location.** :x:')
                return;
            }
            var current = result[0].current;
            var location = result[0].location;
            const embed = new Discord.RichEmbed()
                .setDescription(`Weather For ${current.observationpoint} | **${current.skytext}**`)
                .setAuthor(`Requested by ${message.author.username}`, message.author.displayAvatarURL)
                .setThumbnail(current.imageUrl)
                .setColor(0x721487)
                .addField('Timezone',`UTC${location.timezone}`, true)
                .addField('Degree Type',location.degreetype, true)
                .addField('Temperature',`${current.temperature} Degrees`, true)
                .addField('Feels Like', `${current.feelslike} Degrees`, true)
                .addField('Winds',current.winddisplay, true)
                .addField('Humidity', `${current.humidity}%`, true)
                message.channel.send({embed});
        });
		break;
        case "nick":
		if(message.guild.member(message.author).hasPermission(`ADMINISTRATOR`)) {
		 var nickargs = message.content.substring(prefix.length+5).split(" ");
                    const nickmsg = nickargs.join(" ");
		message.guild.members.get(bot.user.id).setNickname(nickmsg);
		message.reply(":white_check_mark: Nickname has been changed to **" + nickmsg + "** !");
		} else {
			message.reply(":x: You have missing permissions: **ADMINISTATOR**! :x:");
		}
    break;
    case "info":
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    const owner = "123silly#0001";
    const laungage = "Discord.JS/Node.JS";
    var infoe = new Discord.RichEmbed()
    .setTitle(`Info about Aloid`)
    .setDescription(`Hello i am Aloid,\nA bot which will make your server better(and funnier)\nI am owned by **${owner}** and i was coded in **${laungage}**!\nHere is some information about me:\n\nName: Aloid\nCreator: ${owner}\nMemory used: ${Math.round(used * 100) / 100}MB\nUptime: ${parseTime(bot.uptime)}\nServer Count: ${bot.guilds.size}\nUsers: ${bot.users.size}\nChannels: ${bot.channels.size}`)
    .setFooter(`ALOID COPYRIGHT 2018`)
    .setAuthor(`Requested by ${message.author.username}`, message.author.displayAvatarURL)
    .setThumbnail(`https://bts.net.pl/cdn/aloid.png`)
    .setColor(0x721487)
    message.channel.sendEmbed(infoe);
    break;
		case "raw":
		var rawargs = message.content.substring(prefix.length+4).split(" ");
                    const rawmsg = rawargs.join(" ");
					if (args[1]) {
        hastebin(rawmsg).then(r => {
            message.channel.send("<:aloid_09:406932185371901964> Posted text to Hastebin at this URL: " + r);
        }).catch(console.error);
					} else {
						message.reply("Please write a message!");
					}
		break;
		case "emojis":
		const emojiList = message.guild.emojis.map(e=>e.toString()).join(" ");
		var emojie = new Discord.RichEmbed()
		.setTitle(`Emoji List in ${message.guild.name}!`)
		.setDescription(emojiList)
		.setAuthor(`Requested by ${message.author.username}`, message.author.displayAvatarURL)
		.setColor(0x721487)
		message.channel.sendEmbed(emojie);
    break;
    case "invite":
    var invite = new Discord.RichEmbed()
    .setAuthor(`Requested by ${message.author.username}`, message.author.displayAvatarURL)
      .setTitle(`Invite me to your server using this link!`)
      .setColor(0x721487)
      .setDescription(`[Click me!](https://discordapp.com/oauth2/authorize?client_id=410825339757920257&permissions=8&redirect_uri=https%3A%2F%2Fbts.net.pl%2Faloid%2Fthanks&response_type=code&scope=bot%20identify)`)
    message.channel.sendMessage(invite);
    break;
	case "asciiemoji":
	message.reply("Here is your ascii emoji: \\" + args[1]);
	break;
    // START OF MOD CMDS
  }
});

bot.on("message", function(message) {
  if (message.author.equals(bot.user)) return;

  const prefix = guilds[message.guild.id].prefix;
  
  var autorespond = message.content;
  
  switch (autorespond.toLowerCase()) {
case "<@410825339757920257>":
message.reply(`My prefix is ${prefix}!`);
break;
case "@Aloid":
message.reply(`My prefix is ${prefix}!`);
break;
}
});

bot.on("guildCreate", guild => {
  guild.owner.sendMessage(`Hello <@${guild.owner.id}>,\nI have been invited to ${guild.name}!\n\nTo start with me simply type **(help** in your discord server!\n**PLEASE NOTICE:** Before using any moderation command please do (addmod\n\nInvite me: http://urlr.pl/aloid \nSupport Discord Server: https://discord.gg/v6XQCQB\n\n\nAloid by 123silly#0001 | Made with :heart:`)

})
bot.login(token);
