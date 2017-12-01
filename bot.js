const Discord = require('discord.js');
const moment = require('moment');
const client = new Discord.Client();
const config = require('./config.json');
const aqVersion = "1.1.0";
const prefix = "aq:";
const log = message => {

    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);

};

const SuggestQuoteStartMessage = "**Quote Suggestion**\n" +
    "Welcome to the quote suggestion process! Please read this before you continue.\n" +
    "Here's how this will work.\n\n" +
    "- I'll walk you through the process of creating a suggestion on the suggestions channel.\n" +
    "- Just respond to my prompts by typing a message in this DM and sending it.\n" +
    "- At any time, simply respond with `q` to cancel the suggestion.\n\n" +
    "However, please be aware of the following:\n" +
    "- Your Discord Username will be recorded and sent along with the suggestion.\n" +
    "- Your suggestion will be publicly visible.\n" +
    "- Any misuse of this command, including (but not limited to) spam will lead to appropriate discipline from staff.\n\n" +
    "**Here are some things not to suggest because they will be immediately declined.** This counts as misuse of the suggest command, so hit `q` now if you were going to suggest one of these.\n" +
    "- New text/voice channels.\n" +
    "- New bots.\n\n" +
    "Wait 30 seconds, and then respond with `y` if you understood the above.\n" +
    "Please note this feature doesn't work **yet**"
var QuoteOfTheDay;
var QuoteOfTheDayExpiry = 0;
var QuoteOfTheDayStartTime;
var DidReboot = false;

function GetQuoteOfTheDay(quoteNum = -1) {
    var now = new Date();

    if (QuoteOfTheDayExpiry < now.getTime()) {
        log("[!] Getting new quote of the day...");
        log("[!] This quote expires in 1 day.");

        QuoteOfTheDayStartTime = now;
        QuoteOfTheDayExpiry = now.getTime();
        QuoteOfTheDayExpiry += 86400000; //Add 8640000 milliseconds (24 hours) to the quote of the day

        QuoteOfTheDay = new Discord.RichEmbed();
        var author;
        var authorImage;
        var quote;
        var year;
        var url;

        if (quoteNum == -1) {
            quoteNum = Math.floor(Math.random() * 1000) % 40;
        }


        switch (quoteNum) {
            case 0:
                author = "Victor Tran";
                authorImage = "https://yt3.ggpht.com/-Iuf1v4-SSSM/AAAAAAAAAAI/AAAAAAAAAAA/89IYeQw--wU/photo.jpg";
                quote = "A letter says a whole video!";
                year = "2017";
                url = "https://cdn.discordapp.com/attachments/278874966542385152/280566273992032258/Screenshot_20170213-160944.png";
                break;
            case 1:
                author = "Victor Tran";
                authorImage = "https://yt3.ggpht.com/-Iuf1v4-SSSM/AAAAAAAAAAI/AAAAAAAAAAA/89IYeQw--wU/photo.jpg";
                quote = "I don't know why I found that \"ten gazillion\" thing so funny...";
                year = "2017";
                url = "https://www.youtube.com/watch?v=zzKGnuvX6IQ&t=37s";
                break;
            case 2:
                author = "AKidFromTheUK";
                authorImage = "https://yt3.ggpht.com/-yPaKdXkNVgw/AAAAAAAAAAI/AAAAAAAAAAA/mXqfMs0uVkU/s48-c-k-no-mo-rj-c0xffffff/photo.jpg";
                quote = "Listening to myself is quite awkward lmao";
                year = "2017";
                url = "https://www.example.com/"; //TODO: Find a URL
                break;
            case 3:
                author = "Prince Hamlet: William Shakespeare";
                authorImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Shakespeare.jpg/468px-Shakespeare.jpg";
                quote = "To be, or not to be, that is the question";
                year = "circa. 1600";
                url = "https://en.wikipedia.org/wiki/To_be,_or_not_to_be";
                break;
            case 4:
                author = "Diana Adams / Mitsubishi Mirage";
                authorImage = "https://yt3.ggpht.com/-tQLg1M-3org/AAAAAAAAAAI/AAAAAAAAAAA/-kkOvupMHXQ/s88-c-k-no-mo-rj-c0xffffff/photo.jpg";
                quote = "Dialing 000...\nNOOO!!!";
                year = "2017";
                url = "https://youtu.be/jDy57c7Y-4A?t=11m52s";
                break;
            case 5:
                author = "Diana Adams / Mitsubishi Mirage";
                authorImage = "https://yt3.ggpht.com/-tQLg1M-3org/AAAAAAAAAAI/AAAAAAAAAAA/-kkOvupMHXQ/s88-c-k-no-mo-rj-c0xffffff/photo.jpg";
                quote = "You'd have a crash by now!\nPardon?";
                year = "2017";
                url = "https://youtu.be/jDy57c7Y-4A?t=15m5s";
                break;
            case 6:
                author = "Ivoponop Pena";
                authorImage = "https://yt3.ggpht.com/-hZJxXIFsfB8/AAAAAAAAAAI/AAAAAAAAAAA/c_mjVjQWvTw/s48-c-k-no-mo-rj-c0xffffff/photo.jpg";
                quote = "i buy tablets for the bubble plastic﻿";
                year = "2016";
                url = "https://www.youtube.com/watch?v=AqFDn0TxwH4";
                break;
            case 7:
                author = "The Mill on the Floss: George Eliot";
                authorImage = "https://upload.wikimedia.org/wikipedia/commons/8/81/George_Eliot_at_30_by_François_D%27Albert_Durade.jpg";
                quote = "Don't judge a book by its cover﻿";
                year = "1860";
                url = "https://en.wikipedia.org/wiki/Don't_judge_a_book_by_its_cover";
                break;
            case 8:
                author = "tostoday";
                authorImage = "https://yt3.ggpht.com/-gNRclMiHzN4/AAAAAAAAAAI/AAAAAAAAAAA/BNEDEUakd4A/s48-c-k-no-mo-rj-c0xffffff/photo.jpg";
                quote = "I don't know why but Visopsys sounds like a medical condition﻿";
                year = "circa. 2015";
                url = "https://www.youtube.com/watch?v=5T-vEZeY2v0";
                break;
            case 9:
                author = "Diana Adams";
                authorImage = "https://yt3.ggpht.com/-tQLg1M-3org/AAAAAAAAAAI/AAAAAAAAAAA/-kkOvupMHXQ/s88-c-k-no-mo-rj-c0xffffff/photo.jpg";
                quote = "4 × 1 000 000!? 4 000 000! It's not that hard...﻿";
                year = "2014";
                url = "https://youtu.be/5T-vEZeY2v0?t=9m28s";
                break;
            case 10:
                author = "Victor Tran";
                authorImage = "https://yt3.ggpht.com/-Iuf1v4-SSSM/AAAAAAAAAAI/AAAAAAAAAAA/89IYeQw--wU/photo.jpg";
                quote = "Yes! I'm not *just* a blue happy face!﻿";
                year = "2016";
                url = "https://youtu.be/2E21oad5pWQ";
                break;
            case 11:
                author = "ItsDeckyah";
                authorImage = "https://yt3.ggpht.com/-t70ZI-25A1k/AAAAAAAAAAI/AAAAAAAAAAA/uGrVakleFIM/s48-c-k-no-mo-rj-c0xffffff/photo.jpg";
                quote = "Always remember, don't let those who are bullying you ruin your life, they are out to do just that. And that's probably all they'll do their whole lives﻿";
                year = "2017";
                url = "https://www.example.com/"; // TODO: Find a URL
                break;
            case 12: //Special Case
                QuoteOfTheDay.setAuthor("William Shakespeare", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Shakespeare.jpg/468px-Shakespeare.jpg");
                QuoteOfTheDay.setColor("#939d45");
                QuoteOfTheDay.setURL("https://i.imgur.com/4KfdylP.jpg");
                QuoteOfTheDay.setImage("https://i.imgur.com/4KfdylP.jpg");
                return QuoteOfTheDay;
            case 13:
                author = "Mighty_Eagle073";
                authorImage = "https://yt3.ggpht.com/-Q5IvX3eEGl8/AAAAAAAAAAI/AAAAAAAAAAA/LspLd8v-PR8/s100-c-k-no-mo-rj-c0xffffff/photo.jpg";
                quote = "Spamming = Damning﻿";
                year = "2017";
                url = "https://www.example.com/"; // TODO: Find a URL
                break;
            case 14:
                author = "Nibble";
                authorImage = "https://yt3.ggpht.com/-SUPNlJ8a7qA/AAAAAAAAAAI/AAAAAAAAAAA/R_I4z7057_w/s100-c-k-no-mo-rj-c0xffffff/photo.jpg";
                quote = "AUTO CORRECF!!!";
                year = "2017";
                url = "https://www.example.com/"; // TODO: Find a URL
                break;
            case 15:
                author = "Victor Tran";
                authorImage = "https://yt3.ggpht.com/-Iuf1v4-SSSM/AAAAAAAAAAI/AAAAAAAAAAA/89IYeQw--wU/photo.jpg";
                quote = "@Derpy ♀ For your own fucking good, learn what political correctness is.";
                year = "2017";
                url = "https://cdn.discordapp.com/attachments/371830028381454337/372263065472729088/2017-10-24_01.58.19.png"
                break;
            case 16:
                author = "Victor Tran";
                authorImage = "https://yt3.ggpht.com/-Iuf1v4-SSSM/AAAAAAAAAAI/AAAAAAAAAAA/89IYeQw--wU/photo.jpg";
                quote = "But couldn't you at least put the mounted disks on the dick or on Dinder?\nDOCK";
                year = "2017";
                url = "https://www.example.com"; // TODO: Find a URL
                break;
            case 17:
                author = "Victor Tran";
                authorImage = "https://yt3.ggpht.com/-Iuf1v4-SSSM/AAAAAAAAAAI/AAAAAAAAAAA/89IYeQw--wU/photo.jpg";
                quote = "Just happened one gay?\nDAY\nOH BOY\nI BLAME SWIPE TYPING";
                year = "2017";
                url = "https://www.example.com"; // TODO: Find a URL
                break;
            case 18:
                author = "Alee14";
                authorImage = "https://cdn.discordapp.com/avatars/242775871059001344/dd7be36e859f206f9b6606855681280e.png?size=2048";
                quote = "IS THERE A GOOOOOGALIE HERE!!!!";
                year = "2014";
                url = "https://youtu.be/Ap6fUlMx90A?t=2m30s";
                break;
            case 19:
                author = "143malliw";
                authorImage = "https://yt3.ggpht.com/-SUPNlJ8a7qA/AAAAAAAAAAI/AAAAAAAAAAA/R_I4z7057_w/s100-c-k-no-mo-rj-c0xffffff/photo.jpg";
                quote = "but i can't write a quote, for I am the quote";
                year = "2017";
                url = "https://www.example.com/"; // TODO: Find a URL
                break;
            case 20:
                author = "How are you";
                authorImage = "https://cdn.discordapp.com/avatars/355851198106173440/85032004f7aeeffa5a863e2aa54b6e9b.png?size=2048";
                quote = "@Uranium Chloride a song i made for you :smiley: it everyday bro with that victor tron flow.. 100 in one year never done before got on the comptuon man osfirsttimer is next";
                year = "2017";
                url = "https://www.example.com/"; //TODO: Find a URL
                break;
            case 21:
                author = "AstralMod";
                authorImage = "https://cdn.discordapp.com/avatars/282048599574052864/56d2d99bf763df5a05f5d157108edbdc.png?size=2048";
                quote = "Welcome to the weekly chat chat!";
                year = "2017";
                url = "https://www.example.com/"; //TODO: Find a URL
                break;
            case 22:
                author = "AstralPhaser";
                authorImage = "https://cdn.discordapp.com/avatars/230480971084988417/32f46a9671c6ceedc54b369ea73be178.png?size=2048";
                quote = "Ok the shrimp is now on the barbie";
                year = "2017";
                url = "https://media.discordapp.net/attachments/277922530973581312/355882401546764289/d300-123-6379-orton-wp.png";
                break;
            case 23:
                author = "Victor Tran";
                authorImage = "https://yt3.ggpht.com/-Iuf1v4-SSSM/AAAAAAAAAAI/AAAAAAAAAAA/89IYeQw--wU/photo.jpg";
                quote = ":joy:  It's Cameron's Birthday!\nJoy!!!11!!111!!!!";
                year = "2017";
                url = "https://www.example.com/"; //TODO: Find a URL
                break;
            case 24:
                author = "RogueAI";
                authorImage = "https://cdn.discordapp.com/avatars/275867508932608000/1702545b94e23ea7dfc1346a83542792.png?size=2048";
                quote = "1) java stinks and is a big stupid,";
                year = "2017";
                url = "https://www.example.com/"; //TODO: Find a URL
                break;
            case 25:
                author = "Steve Jobs";
                authorImage = "http://media.syracuse.com/news/photo/2011/01/9177328-large.jpg";
                quote = "It's really hard to design products by focus groups. A lot of times, people don't know what they want until you show it to them.";
                year = "1998";
                url = "https://www.huffingtonpost.com/gregory-ciotti/why-steve-jobs-didnt-list_b_5628355.html";
                break;
            case 26:
                author = "arencllc";
                authorImage = "https://cdn.discordapp.com/avatars/191290329985581069/faf1a210c222d18fb30fcd9ec1082e7f.png?size=2048";
                quote = "Coding for uwp is as hard as using a UWP program.";
                year = "2017";
                url = "https://www.example.com/"; //TODO: Find a URL
                break;
            case 27:
                author = "FloppyDiskDrive";
                authorImage = "https://cdn.discordapp.com/avatars/228271067821506560/82edc6d24cc88b300260707e44f3442f.png?size=2048";
                quote = "Victor would be a champ at synchronized thinking.";
                year = "2017"
                url = "https://www.example.com/"; //TODO: Find a URL
                break;
            case 28:
                author = "Tembot";
                authorImage = "https://cdn.discordapp.com/avatars/361202413165608962/f334f0c4365164379311cebee300dd2a.png?size=2048";
                quote = "Why are u stocking me";
                year = "2017";
                url = "https://www.example.com/"; //TODO: Find a URL
                break;
            case 29:
                author = "TheMemeKnight";
                authorImage = "https://cdn.discordapp.com/avatars/267766634452615168/df08523e0ca30929ceb0dc28dcda8f78.png?size=2048";
                quote = "@Alee14  Do YoU kNoW hOw It FeElS tO bE iN mY sOcKs";
                year = "2017";
                url = "https://www.example.com/"; //TODO: Find a URL
                break;
            case 30:
                author = "Alee14";
                authorImage = "https://cdn.discordapp.com/avatars/242775871059001344/dd7be36e859f206f9b6606855681280e.png?size=2048";
                quote = "You could do me if you want to not show it to the public.";
                year = "2017";
                url = "https://prnt.sc/hfht4v";
                break;
            case 31:
                author = "Alee14";
                authorImage = "https://cdn.discordapp.com/avatars/242775871059001344/dd7be36e859f206f9b6606855681280e.png?size=2048"
                quote = "I want to live in a bus when i'm older";
                year = "2017";
                url = "https://www.example.com/" //TODO: Find a URL
                break;
            case 32:
                author = "Tembot";
                authorImage = "https://cdn.discordapp.com/avatars/361202413165608962/f334f0c4365164379311cebee300dd2a.png?size=2048";
                quote = "wat de hek";
                year = "2017";
                url = "https://www.example.com/"; //TODO: Find a URL
                break;
            case 33:
                author = "PieLover12";
                authorImage = "https://cdn.discordapp.com/avatars/344630031303311371/d84ae603ee53a5b54f7b78bcb4f733f2.png?size=2048";
                quote = "DIE YOU LOOK LIKE TINY GIRL";
                year = "2017";
                url = "https://www.example.com/"; //TODO: Find a URL
                break;
            case 34:
                author = "Victor Tran";
                authorImage = "https://yt3.ggpht.com/-Iuf1v4-SSSM/AAAAAAAAAAI/AAAAAAAAAAA/89IYeQw--wU/photo.jpg";
                quote = "(there is a :middle_finger: emoji sitting in Gboard now after my brother sent that to Google assistant)";
                year = "2017";
                url = "https://www.example.com/"; //TODO: Find a URL
                break;
            case 35:
                author = "AstralPhaser";
                authorImage = "https://cdn.discordapp.com/avatars/230480971084988417/32f46a9671c6ceedc54b369ea73be178.png?size=2048";
                quote = "anyway, I've gotta go now, I'll be back in 3 years";
                year = "2017";
                url = "https://www.example.com/"; //TODO: Find a URL
                break;
            case 36:
                author = "Victor Tran";
                authorImage = "https://yt3.ggpht.com/-Iuf1v4-SSSM/AAAAAAAAAAI/AAAAAAAAAAA/89IYeQw--wU/photo.jpg";
                quote = "Zero electric cars means they don't sell electric cards here";
                year = "2017";
                url = "https://www.example.com/"; //TODO: Find a URL
                break;
            case 37:
                author = "Victor Tran";
                authorImage = "https://yt3.ggpht.com/-Iuf1v4-SSSM/AAAAAAAAAAI/AAAAAAAAAAA/89IYeQw--wU/photo.jpg";
                quote = "Unless you're living in like Denland or something";
                year = "2017";
                url = "https://www.example.com/"; //TODO: Find a URL
                break;
            case 38:
                author = "Victor Tran";
                authorImage = "https://yt3.ggpht.com/-Iuf1v4-SSSM/AAAAAAAAAAI/AAAAAAAAAAA/89IYeQw--wU/photo.jpg";
                quote = "[goes and cries in a corner]\nWAAA\nWAAAAAAAAAA\nWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
                year = "2017";
                url = "https://cdn.discordapp.com/attachments/373884824034869249/374564169678061568/unknown.png";
                break;
            case 39:
                author = "OSFirstTimer";
                authorImage = "https://yt3.ggpht.com/-tQLg1M-3org/AAAAAAAAAAI/AAAAAAAAAAA/-kkOvupMHXQ/s88-c-k-no-mo-rj-c0xffffff/photo.jpg";
                quote = "The most popular version of Linux ever called Abuncho. Abuncho 12.10.";
                year = "2012";
                url = "https://youtu.be/PgGbZfR6Vec?t=6s";
                break;
        }

        QuoteOfTheDay.setAuthor(author, authorImage);
        QuoteOfTheDay.setColor("#939d45");
        QuoteOfTheDay.setDescription(quote);
        QuoteOfTheDay.setFooter("- " + year);
        QuoteOfTheDay.setURL(url);
    } else {
        log("[!] No need for new quote of the day");
    }


    return QuoteOfTheDay;
}

client.on('ready', () => {
    log('[>] ARE YA READY KIDS? AYE AYE CAPTAIN!');
    client.user.setPresence({
        game: {
            name: "v." + aqVersion + " | aq:help",
            type: 0
        }
    });
});

function getBoshyTime(guild) {
    if (guild.emojis.exists('name', 'vtBoshyTime')) {
        return "<:vtBoshyTime:" + guild.emojis.find('name', 'vtBoshyTime').id + ">";
    } else {
        return ":warning:";
    }
}

client.on('message', message => {
    if (message.content.indexOf(prefix) !== 0) return;
    var msg = message.content;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
    if (command === 'ping') {
        message.channel.send(getBoshyTime(message.guild) + ' PONG! I want to play pong... :\'(');
    } else if (command === 'pong') {
        message.channel.send(getBoshyTime(message.guild) + ' PING!');
    } else if (command === 'isthisthingon') {
        message.channel.send('no 💤');
    } else if (command === 'quoteoftheday') {
        var quoteofday = GetQuoteOfTheDay();
        message.channel.send("Here's the quote of the day (as of " + QuoteOfTheDayStartTime.toUTCString() + ")");
        message.channel.sendEmbed(quoteofday);
    } else if (command === "forcequote") {
        QuoteOfTheDayExpiry = 0;
        var quoteofday = GetQuoteOfTheDay();
        message.channel.send("New quote of the day!");
        message.channel.sendEmbed(quoteofday);
    } else if (command === 'reboot') {
        /*
    message.channel.send("Goodbye! We'll be back in a moment!").then(messageDeleteTimer);
    log('[?] Reboot Requested. Rebooting...');
    client.destroy();
    DidReboot = true;
    client.login('MjgwMjQ1MDAwMDI0MDk2NzY4.C4K8Nw.InlnQvRmbvfJG0nv13FXtoVzXwc');
*/
        message.channel.send("Good try... But we're not letting anyone reboot me yet!");
    } else if (command === 'poweroff') {
        /*
        log(message.guild.roles);
        if (message.guild.roles.get('Moderator').members.keyArray().includes(message.author.username)) {
          message.channel.send("Access Granted");
        } else {
          message.channel.send("Access Denied");
        }*/

        message.channel.send("Well... vicr123 tried to code this... but it kept crashing... Ironic isn't it? :(");
    } else if (command === 'help') {
        // This is the new help
        const embed = new Discord.RichEmbed()
            .setTitle("AstralQuote Commands")
            .setDescription('Every command that you input in this bot you must use the following prefix `aq:`.')
            .setThumbnail('https://cdn.discordapp.com/avatars/373224323529310208/f42227477bc7e5b96ea848abc880a6bf.png?size=2048')
            .setColor("#939d45")
            .addField("- General Commands", "ping\npong\ninvitebot\nreboot\npoweroff", true)
            .addField("- Info Commands", "copyright\ncontribute\ninformation")
            .addField("- Quote Commands", "quoteoftheday\nforcequote", true)
            .setFooter("AstralQuote Copyright 2017.")
        message.channel.send(embed);
    } else if (command === 'oldhelp') {
        message.channel.send("Available commands:\n```\n" +
            "aq:ping, aq:pong     Requests AstralQuote to reply with a message\n" +
            "aq:quoteoftheday   Requests AstralQuote for the quote of the day\n" +
            "aq:forcequote      Requests AstralQuote to reset the quote of the day\n" +
            "aq:reboot          Requests AstralQuote to reboot\n" +
            "aq:poweroff        Tells AstralQuote to leave\n```"
        );
    } else if (command === 'easteregg') {
        message.channel.send("```cpp\n" +
            "There are no easter eggs to be found here. Begone!" +
            "\n```");
    } else if (command === 'easterwgg') {
        message.channel.send("```cpp\n" +
            "Ha, you found an easter egg! Take that, !easteregg!" +
            "\n```");
    } else if (command === 'contribute') {
        message.reply("I can see you want to help AQ? Welp here's the link: https://github.com/ATC-Parody/AstralQuote");
    } else if (command === 'uptime') {
        var timeString; // What we'll eventually put into the message
        var uptime = parseInt(client.uptime); // Get uptime in ms
        uptime = Math.floor(uptime / 1000); // Convert from ms to s
        var uptimeMinutes = Math.floor(uptime / 60); // Get the uptime in minutes
        var minutes = uptime % 60;
        var hours = 0;

        while (uptimeMinutes >= 60) {
            hours++;
            uptimeMinutes = uptimeMinutes - 60;
        }

        if (uptimeMinutes < 10) {
            timeString = hours + ":0" + uptimeMinutes // We need to add an additional 0 to the minutes
        } else {
            timeString = hours + ":" + uptimeMinutes // We don't need to add an extra 0.
        }

        message.reply(":clock1: AstralQuote has been up for " + timeString + " hours.");
        log("[!] Someone just typed in the uptime command! Here's how long i've been up for: " + timeString + " hours.")
    } else if (command === 'invitebot') {
        message.reply(":arrow_left: Continue in DMs.")
        var embed = new Discord.RichEmbed();

        embed.setAuthor("AstralQuote", "https://cdn.discordapp.com/avatars/373224323529310208/f42227477bc7e5b96ea848abc880a6bf.png?size=2048");
        embed.setColor("#939d45");
        embed.setDescription("Ooh! I can see you want to invite me to a server! Here's the link: https://discordapp.com/oauth2/authorize?client_id=373224323529310208&scope=bot&permissions=314368");
        embed.setURL("https://discordapp.com/oauth2/authorize?client_id=373224323529310208&scope=bot&permissions=314368");

        message.author.send(embed)
   /* } else if (command === "suggestaquote") {
        var embed = new Discord.RichEmbed();

        embed.setAuthor("AstralQuote", "https://cdn.discordapp.com/avatars/373224323529310208/f42227477bc7e5b96ea848abc880a6bf.png?size=2048");
        embed.setColor("#939d45");
        embed.setDescription("This feature is coming soon!");

        message.channel.send(embed)
        message.author.sendMessage(SuggestQuoteStartMessage); */
    } else if (command === "information") {
        var embed = new Discord.RichEmbed();

        embed.setAuthor("AstralQuote", "https://cdn.discordapp.com/avatars/373224323529310208/f42227477bc7e5b96ea848abc880a6bf.png?size=2048");
        embed.setColor("#939d45");
        embed.setDescription("AstralQuote Version: " + aqVersion + "\nThis was made by TheRandomMelon and vicr123 and modified by Alee14.");

        message.channel.send(embed)
    } else if (message.content.startsWith("aq:")) {
        deleteOriginalMessage = false;

        log("[X] " + message.content + " [Unrecognised command]");
        var msg;
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
        message.channel.send(getBoshyTime(message.guild) + " GAH! " + msg + " Refer to aq:help for syntax and other stuff.");
    }
});


client.on('guildCreate', guild => {
    log(`[>] I just joined ${guild.name}. This server has ${guild.memberCount} members.`)

});

client.on('guildDelete', guild => {
    log(`[>] I was removed from ${guild.name}.`)

});

client.login(config.token).catch(
    function() {
        log("[X] Login failed.");
    });
