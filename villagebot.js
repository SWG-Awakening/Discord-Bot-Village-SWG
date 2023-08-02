const Discord = require('discord.js');
const { Client, Events, GatewayIntentBits, ActivityType } = require('discord.js');
const config = require('./config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});




const daysPerPhase = config.SWG.DaysPerPhase;
const start = new Date(config.SWG.VillagePhaseOneKnownTime).getTime() / 1000;

// When the client is ready, run this code (only once)
client.on('ready', () => {
    console.log(`Ready! Logged in as ${client.user.tag}`);
	client.user.setPresence({ activities: [{ name: config.Discord.PresenceName, type: ActivityType.Watching }], status: 'online' });
});

function getTime(daysLeft) {
    // Generic function to separate out days, hours, minutes, and seconds into an object.
    let seconds = daysLeft * 86400;
    const days = Math.floor(seconds / (3600 * 24));
    seconds -= days * 3600 * 24;
    const hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    seconds = Math.floor(seconds);
    return {
        days,
        hours,
        minutes,
        seconds
    }
}

function getTimeLeft(daysLeft) {
    // Generic function to print human legible time remaining based on days
    const time = getTime(daysLeft);
    let message = '';
    message += `${time.days ? `${time.days === 1 ? `${time.days} day` : `${time.days} days`}, ` : ''}`;
    message += `${time.hours ? `${time.hours === 1 ? `${time.hours} hour` : `${time.hours} hours`}, ` : ''}`;
    message += `${time.minutes ? `${time.minutes === 1 ? `${time.minutes} minute` : `${time.minutes} minutes`}` : ''}`;
    if (!time.seconds) {
        message += "."
    } else {
        message += ", "
    }
    if ((time.days || time.hours || time.minutes) && time.seconds) {
        message += "and ";
    }
    message += `${time.seconds ? `${time.seconds === 1 ? `${time.seconds} second` : `${time.seconds} seconds`}` : ''}`;
	if (time.seconds) {
		message += ".";
	}
    return message;
}

client.on("messageCreate", function (message) {
    // Check for !village or #village from in game
	let lowerCaseMessageContent = message.content.toLowerCase();
    if (lowerCaseMessageContent.startsWith('!village') || (lowerCaseMessageContent.split(':**  ').length > 1 && lowerCaseMessageContent.split(':**  ')[1].startsWith('#village'))) {
        // today's time
        const today = new Date().getTime() / 1000;
        // difference in seconds
        const secondsPassed = (today - start);
        // seconds converted to days
        const daysPassed = secondsPassed / 86400;
        // out of scope message assignment
        let response = "";
        // out of scope time assignment
        let timeLeft;
        // number of days since the latest phase 1 start
        let daysSincePhaseOne = daysPassed % (daysPerPhase * 4);
        // Pick message for current phase
        if (daysSincePhaseOne % (daysPerPhase * 4) < daysPerPhase) {
            timeLeft = getTimeLeft(daysPerPhase - (daysSincePhaseOne % (daysPerPhase * 4)));
            response = "The Village is in Phase One. This phase will end in " + timeLeft;
        } else if (daysSincePhaseOne % (daysPerPhase * 3) < daysPerPhase) {
            timeLeft = getTimeLeft(daysPerPhase - (daysSincePhaseOne % (daysPerPhase * 3)));
            response = "The Village is in Phase Four. This phase will end in " + timeLeft;
        } else if (daysSincePhaseOne % (daysPerPhase * 2) < daysPerPhase) {
            timeLeft = getTimeLeft(daysPerPhase - (daysSincePhaseOne % (daysPerPhase * 2)));
            response = "The Village is in Phase Three. This phase will end in " + timeLeft;
        } else {
            timeLeft = getTimeLeft(daysPerPhase - (daysSincePhaseOne % daysPerPhase));
            response = "The Village is in Phase Two. This phase will end in " + timeLeft;
        }
        // Send response back to the channel that requested it
        message.channel.send(response);
    }
});

client.login(config.Discord.BotToken);