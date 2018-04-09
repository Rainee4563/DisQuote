const Discord = require("discord.js")
const config = require ("./config.json")
const PREFIX = ";"  


var bot = new Discord.Client();

bot.on("ready", function () {
    console.log("Ready");
});

// start twitch
var tmi = require("tmi.js");
var options = {
    options: {
        debug: true
    },
    connection: {
        recconect: true
    },
    identity: {
        username: "DisQuote",
        password: (config.oauth)
    },
    channels: ["#brettdoesgaming"]
};

var client = new tmi.client(options);

bot.on("message", function (message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ")

    switch (args[0].toLowerCase()) {
        case "nep":
            message.channel.send("Nepu!");
            break;
        case "brett":
            message.channel.send("I'm Bread")
            break;
        case "info":
            message.channel.send("I'm DisQuote! Created by @MrMarioBrosFTW#5487")
            break;
        case "embed":
            var embed = new Discord.RichEmbed()
                .addField("Test Title", "Test Description", true)
                .addField("Test Title2", "Test Description2", true)
                .addField("Test Title3", "Test Description3")
                .setColor(0x00FFFF)
                .setFooter("Testing stuff is fun, Life is fun")
                .setThumbnail(message.author.avatarURL)
            message.channel.sendEmbed(embed);
            break;
        case "noticeme":
            message.channel.send(message.author.toString() + " You have been Noticed!!!")
            break;

        default:
            message.channel.send("Hey Idiot... Wrong Command")
    }
});


bot.login(config.distoken);

//connect client to the server...
client.connect().then(function (data) {
    client.action(channel, "Hello World!").then(function (data) {
        //data returns [channel]
    }).catch(function (err) {
        //
    });
}).catch(function (er) {

});

client.on("chat", function (channel, userstate, message, self) {
    if (self) return;
    //commands go here
    if (message.startsWith(";ping")) {
        var channel = bot.channels.find('name', 'bdg-chat');
        channel.send('Pont');
        console.log(bot.channels.first());
    };
    if (message.startsWith("!!nep")) {
        client.say("brettdoesgaming", "Nepu!");
    };
    if (message.startsWith("!!brett")) {
        client.say("brettdoesgaming", "I'm Bread");
    };
    if (message.startsWith("!!info")) {
        client.say("brettdoesgaming", "Hey I'm DisQuote a bot created by MrMarioBrosFTW for the purposes of tracking quotes and clips in this channel");
    };
    if (message.startsWith("!!clip")) {
        client.say("brettdoesgaming", "Hey don't worry about manually adding it in theres another bot working along side me to auto send them into discord so just post it...");
    };
    if (message.startsWith("!!quote")) {
        var quote = bot.channels.find('name', 'livestream_quotes');
        var username = userstate['username'];
        quote.send('**' + "Quoted By " + username + '**: ' + message);
    };
   
    //relays twitch chat to discord server
    var channel = bot.channels.find('name', 'bdg-chat');
    var username = userstate['username'];
    channel.send('**' + username + '**: ' + message);
});
