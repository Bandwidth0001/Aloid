const Discord = require('discord.js');
const bot = new Discord.Client();
const weather = require('weather-js');
const hastebin = require('hastebin-gen');
const ads = require('./ads.js'); 
const swears = require('./swears.js'); 

var token = "no";

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

  if (message.author.bot) return;

  if (message.author.equals(bot.user)) return;

  if (!message.content.startsWith(prefix)) return;
  
  if(message.channel.type === 'DM') return;

  var args = message.content.substring(prefix.length).split(" ");
  switch (args[0].toLowerCase()) {
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
.setDescription(`**ADMINISTATION**\n\n${prefix}config-suggestion - Sets a channel for ${prefix}suggest\n${prefix}addmod @user - Adds a user to Aloid mod list.\n${prefix}delmod @user - Removes a user to Aloid mod list.\n\n**MODERATION - PLEASE USE ${prefix}addmod @user BEFORE USING ANY OF COMMANDS.**\n\n${prefix}prefix [prefix] - Sets new prefix for the bot!\n${prefix}purge [AMOUT OF MESSAGES] - Clears amout of messages you wrote.\n${prefix}ban @user - Bans a user\n${prefix}kick @user - Kicks a user.\n${prefix}mute @user - Mutes a user.\n${prefix}unmute @user - Unmute a user.\n${prefix}warn @user - Warns a user.\n${prefix}unwarn @user - Unwarns a user.\n\n**OPTIONS**\n\n${prefix}antiinvite on/off - Blocks discord links.\n${prefix}antiswear on/off - Turn on antiswear or turn it off.\n\n**FUN COMMANDS**\n\n${prefix}meme - DANK MEME\n${prefix}suggest [SUGGESTION] - Suggest something to a server - **PLEASE USE ${prefix}configsuggestion BEFORE DOING THIS COMMAND!**\n${prefix}emojis - Shows custom emojis in the server.\n${prefix}raw [TEXT] - Sends your text to hastebin!\n${prefix}searchanime - Search your favourite anime!\n${prefix}anime - Anime list\n${prefix}help - Shows this help message\n${prefix}ping - Says pong!\n${prefix}serverinfo - Shows information about your server!\n${prefix}8ball [QUESTION] - Ask me a question and i will answer it!\n${prefix}avatar | ${prefix}avatar @USER - Shows your avatar or users avatar!\n${prefix}mc [MINECAFT USERNAME] - Shows your minecraft account!\n${prefix}servers - Shows in which servers i am!\n${prefix}say - Says what you say! \n\n**MUSIC COMMANDS**\n\n(play - Plays music\n(stop - Stops music [DJ ONLY]\n(volume [0 - 150] - Sets volume [DJ ONLY]\n(nowplaying - See whats playing!\n(queue - Shows queue!\n(remove [position/all] - Removes a song or removes all songs.\n(skip - Vote to skip the song.\n(forceskip - Forceskip song! [DJ ONLY]\n(pause - Pause music [DJ ONLY]\n(skipto [POSITION] - skips to a song!\n\nPrefix is: **${prefix}** !\n\n[Invite Me!](http://urlr.pl/aloid)\n[Support Discord Server](https://discord.gg/fVuRsby)\n[Special thanks to telk](https://discord.gg/3FKGeFw) `)
.setAuthor(`Requested by ${message.author.username}`, message.author.displayAvatarURL)
.setFooter(`By 123silly#0001 | Aloid 1.6v Copyright`)
.setThumbnail(`https://cdn.discordapp.com/avatars/403514826241998859/b72c880cbe06de93ff6d27bd638cec93.png?width=999&height=999`)
.setColor(0x721487)
message.react("406932185371901964");
message.channel.sendEmbed(helpembed);
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
var sugargs = message.content.substring(8).split(" ");
const sugmsg = sugargs.join(" ");
var sembed = new Discord.RichEmbed()
.setTitle(`**Suggestion**`)
.setDescription(`${sugmsg}`)
.setAuthor(`Requested by ${message.author.username}`, message.author.displayAvatarURL)
.setFooter(`Sent at ${time}`)
.setColor(0xe8d830)
message.guild.channels.find("name", "suggestion").sendMessage(sembed).then(function (message) {
  message.react("👍")
  message.react("👎")
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
    var sayargs = message.content.substring(4).split(" ");
                    const saymsg = sayargs.join(" ");
                    message.delete().catch(O_o=>{});
		    message.channel.sendMessage(saymsg);
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
var qargs = message.content.substring(6).split(" ");
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
		 var nickargs = message.content.substring(5).split(" ");
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
    .setDescription(`Hello i am Aloid,\nA bot which will make your server better(and funnier)\nI am owned by **${owner}** and i was coded in **${laungage}**!\nHere is some information about me:\n\nName: Aloid\nCreator: ${owner}\nMemory used: ${Math.round(used * 100) / 100}MB\nUptime: ${parseTime(bot.uptime)}\nServer Count: ${bot.users.size}\nUsers: ${bot.users.size}\nChannels: ${bot.channels.size}`)
    .setFooter(`ALOID COPYRIGHT 2018`)
    .setAuthor(`Requested by ${message.author.username}`, message.author.displayAvatarURL)
    .setColor(0x721487)
    message.channel.sendEmbed(infoe);
    break;
		case "raw":
		var rawargs = message.content.substring(5).split(" ");
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
      .setDescription(`[Click me!](https://discordapp.com/oauth2/authorize?client_id=403514826241998859&scope=bot&permissions=8)`)
    message.channel.sendMessage(invite);
    break;
    // START OF MOD CMDS
  }
});

bot.on("message", function(message) {
  if (message.author.equals(bot.user)) return;

  const prefix = guilds[message.guild.id].prefix;
  
  var autorespond = message.content;
  
  switch (autorespond.toLowerCase()) {
case "<@403514826241998859>":
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