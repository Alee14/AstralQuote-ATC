const Discord = require('discord.js');
const moment = require('moment');
const client = new Discord.Client();
const config = require('./config.json');
const aqVersion = '1.2.0';
const prefix = 'aq:';

const log = message => {

  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);

};

const SuggestQuoteStartMessage = '**Quote Suggestion**\n' +
    'Welcome to the quote suggestion process! Please read this before you continue.\n' +
    'Here\'s how this will work.\n\n' +
    '- I\'ll walk you through the process of creating a suggestion on the suggestions channel.\n' +
    '- Just respond to my prompts by typing a message in this DM and sending it.\n' +
    '- At any time, simply respond with `q` to cancel the suggestion.\n\n' +
    'However, please be aware of the following:\n' +
    '- Your Discord Username will be recorded and sent along with the suggestion.\n' +
    '- Your suggestion will be publicly visible.\n' +
    '- Any misuse of this command, including (but not limited to) spam will lead to appropriate discipline from staff.\n\n' +
    '**Here are some things not to suggest because they will be immediately declined.** This counts as misuse of the suggest command, so hit `q` now if you were going to suggest one of these.\n' +
    '- New text/voice channels.\n' +
    '- New bots.\n\n' +
    'Wait 30 seconds, and then respond with `y` if you understood the above.\n' +
    'Please note this feature doesn\'t work **yet**';

let QuoteOfTheDay;
let QuoteOfTheDayExpiry = 0;
let QuoteOfTheDayStartTime;

function GetQuoteOfTheDay(quoteNum = -1) {
  const now = new Date();

  if (QuoteOfTheDayExpiry < now.getTime()) {
    log('[!] Getting new quote of the day...');
    log('[!] This quote expires in 1 day.');

    QuoteOfTheDayStartTime = now;
    QuoteOfTheDayExpiry = now.getTime();
    QuoteOfTheDayExpiry += 86400000;

    QuoteOfTheDay = new Discord.RichEmbed();

    if (quoteNum == -1) {
      quoteNum = Math.floor(Math.random() * 1000) % 42;
    }


    const quo = require('./quotes.json').quotes[quoteNum];
    const author = quo.author;
    const authorImage = quo.authorImage;
    const quote = quo.quote;
    const year = quo.year;
    const url = quo.url;

    QuoteOfTheDay.setAuthor(author, authorImage);
    QuoteOfTheDay.setColor('#939d45');
    QuoteOfTheDay.setDescription(quote);
    QuoteOfTheDay.setFooter('- ' + year);
    QuoteOfTheDay.setURL(url);
  } else {
    log('[!] No need for new quote of the day');
  }


  return QuoteOfTheDay;
}

client.on('ready', () => {
  log('[>] ARE YA READY KIDS? AYE AYE CAPTAIN!');
  client.user.setPresence({
    game: {
      name: 'v.' + aqVersion + ' | ' + prefix + 'help',
      type: 0,
    },
  });
});

function getBoshyTime(guild) {
  if (guild.emojis.exists('name', 'vtBoshyTime')) {
    return '<:vtBoshyTime:' + guild.emojis.find('name', 'vtBoshyTime').id + '>';
  } else {
    return ':warning:';
  }
}

client.on('message', message => {
  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);

  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    message.channel.send(getBoshyTime(message.guild) + ' PONG! I want to play pong... :\'(');
  } else if (command === 'pong') {
    message.channel.send(getBoshyTime(message.guild) + ' PING!');
  } else if (command === 'isthisthingon') {
    message.channel.send('no 💤');
  } else if (command === 'quoteoftheday') {
    const quoteofday = GetQuoteOfTheDay();
    message.channel.send('Here\'s the quote of the day (as of ' + QuoteOfTheDayStartTime.toUTCString() + ')');
    message.channel.sendEmbed(quoteofday);
  } else if (command === 'forcequote') {
    message.delete();
    QuoteOfTheDayExpiry = 0;
    const quoteofday = GetQuoteOfTheDay();
    message.channel.send('New quote of the day!');
    message.channel.sendEmbed(quoteofday);
  } else if (command === 'reboot') {
    /*
    message.channel.send("Goodbye! We'll be back in a moment!").then(messageDeleteTimer);
    log('[?] Reboot Requested. Rebooting...');
    client.destroy();
    DidReboot = true;
    client.login(nope);
*/
    message.channel.send('Good try... But we\'re not letting anyone reboot me yet!');
  } else if (command === 'poweroff') {
    /* Heh really Victor :P
        log(message.guild.roles);
        if (message.guild.roles.get('Moderator').members.keyArray().includes(message.author.username)) {
          message.channel.send("Access Granted");
        } else {
          message.channel.send("Access Denied");
        }*/
    if (message.author.id !== config.ownerID)
    {message.reply('Heh you can\'t turn me off :P');}
    else {
      message.reply(getBoshyTime(message.guild) + 'AstralQuote is now powering off!');
      console.log('[i] AstralQuote is now powering off...');
      process.exit(0);
    }

  } else if (command === 'help') {
    // This is the new help
    const embed = new Discord.RichEmbed()
      .setTitle('AstralQuote Commands')
      .setDescription('Every command that you input in this bot you must use the following prefix `' + prefix + '`.')
      .setThumbnail('https://cdn.discordapp.com/avatars/373224323529310208/f42227477bc7e5b96ea848abc880a6bf.png?size=2048')
      .setColor('#939d45')
      .addField('- General Commands', 'ping\npong\ninvitebot\nreboot\npoweroff', true)
      .addField('- Info Commands', 'copyright\ncontribute\ninformation')
      .addField('- Quote Commands', 'quoteoftheday\nforcequote', true)
      .setFooter('AstralQuote Copyright 2017.');
    message.channel.send(embed);
  } else if (command === 'oldhelp') {
    message.channel.send('Available commands:\n```\n' +
            'aq:ping, aq:pong     Requests AstralQuote to reply with a message\n' +
            'aq:quoteoftheday     Requests AstralQuote for the quote of the day\n' +
            'aq:forcequote        Requests AstralQuote to reset the quote of the day\n' +
            'aq:reboot            Requests AstralQuote to reboot\n' +
            'aq:poweroff          Tells AstralQuote to leave\n```'
    );
  } else if (command === 'easteregg') {
    message.channel.send('```cpp\n' +
            'There are no easter eggs to be found here. Begone!' +
            '\n```');
  } else if (command === 'easterwgg') {
    message.channel.send('```cpp\n' +
            'Ha, you found an easter egg! Take that, aq:easteregg!' +
            '\n```');
  } else if (command === 'contribute') {
    message.reply(':arrow_left: Continue in DMs.');
    message.author.send('I can see you want to help AQ? Welp here\'s the link: https://github.com/ATC-Parody/AstralQuote');
  } else if (command === 'uptime') {
    let timeString;
    let uptime = parseInt(client.uptime);
    uptime = Math.floor(uptime / 1000);
    let uptimeMinutes = Math.floor(uptime / 60);
    let hours = 0;

    while (uptimeMinutes >= 60) {
      hours++;
      uptimeMinutes = uptimeMinutes - 60;
    }

    if (uptimeMinutes < 10) {
      timeString = hours + ':0' + uptimeMinutes;
    } else {
      timeString = hours + ':' + uptimeMinutes;
    }

    message.reply(':clock1: AstralQuote has been up for ' + timeString + ' hours.');
    log('[!] Someone just typed in the uptime command! Here\'s how long i\'ve been up for: ' + timeString + ' hours.');
  } else if (command === 'invitebot') {
    message.reply(':arrow_left: Continue in DMs.');
    const embed = new Discord.RichEmbed();

    embed.setAuthor('AstralQuote', 'https://cdn.discordapp.com/avatars/373224323529310208/f42227477bc7e5b96ea848abc880a6bf.png?size=2048');
    embed.setColor('#939d45');
    embed.setDescription('Ooh! I can see you want to invite me to a server! Here\'s the link: https://discordapp.com/oauth2/authorize?client_id=373224323529310208&scope=bot&permissions=314368');
    embed.setURL('https://discordapp.com/oauth2/authorize?client_id=373224323529310208&scope=bot&permissions=314368');

    message.author.send(embed);
    /* } else if (command === "suggestaquote") {
        var embed = new Discord.RichEmbed();

        embed.setAuthor("AstralQuote", "https://cdn.discordapp.com/avatars/373224323529310208/f42227477bc7e5b96ea848abc880a6bf.png?size=2048");
        embed.setColor("#939d45");
        embed.setDescription("This feature is coming soon!");

        message.channel.send(embed)
        message.author.sendMessage(SuggestQuoteStartMessage); */
  } else if (command === 'information') {
    const embed = new Discord.RichEmbed();

    embed.setAuthor('AstralQuote', 'https://cdn.discordapp.com/avatars/373224323529310208/f42227477bc7e5b96ea848abc880a6bf.png?size=2048');
    embed.setColor('#939d45');
    embed.setDescription('AstralQuote Version: ' + aqVersion);
    embed.setFooter('This was made by TheRandomMelon and vicr123 and modified by Alee.');

    message.channel.send(embed);
  } else if (message.content.startsWith(prefix)) {
    log('[X] ' + message.content + ' [Unrecognised command]');
  }
  /*      var msg;
        switch (Math.floor(Math.random() * 1000) % 8) {
            case 0:
                msg = "Trying to break me, are you?";
                break;
            case 1:
                msg = "Sorry, what was that?";
                break;
            case 2:
                msg = "Oops... I missed that.";
                break;
            case 3:
                msg = "Either you typed something wrong... Or I'm not smart enough to understand you.";
                break;
            case 4:
                msg = "What are you trying to do!?";
                break;
            case 5:
                msg = "Is this the end of AstralQuote?";
                break;
            case 6:
                msg = "Not sure what you mean.";
                break;
            case 7:
                msg = "Pretty sure you didn't expect this message to appear...";
                break;
        }
        message.channel.send(getBoshyTime(message.guild) + " GAH! " + msg + " Refer to "+ prefix +"help for syntax and other stuff.");
    } */
});


client.on('guildCreate', guild => {
  log(`[>] I just joined ${guild.name}. This server has ${guild.memberCount} members.`);

});

client.on('guildDelete', guild => {
  log(`[>] I was removed from ${guild.name}.`);

});

client.login(config.token).catch(
  function() {
    log('[X] Login failed.');
  });
