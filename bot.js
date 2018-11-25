const Discord = require('discord.js');
const auth = require('./auth.json');
const bot = new Discord.Client();

bot.on('ready', function (evt) {
    console.log('Connected');
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
    message = '';
    message += `${time.days ? `${time.days === 1 ? `${time.days} day` : `${time.days} days`}, ` : ''}`;
    message += `${time.hours ? `${time.hours === 1 ? `${time.hours} hour` : `${time.hours} hours`}, ` : ''}`;
    message += `${time.minutes ? `${time.minutes === 1 ? `${time.minutes} minute` : `${time.minutes} minutes`}` : ''}`;
    if (!time.seconds) {
        message += "."
    } else {
        message += ", "
    }
    if (time.days || time.hours || time.minutes) {
        message += " and ";
    }
    message += `${time.seconds ? `${time.seconds === 1 ? `${time.seconds} second` : `${time.seconds} seconds`}` : ''}`;
    return message;
}

function phaseFour(daysLeft) {
    // Function to handle the reverse counter for phase 4
    let calc = daysLeft * 86400;
    const hoursTotal = Math.floor(calc / 3600);
    const hours = hoursTotal % 2;
    calc -= hoursTotal * 3600;
    const minutes = Math.floor(calc / 60);
    calc -= minutes * 60;
    message = "";
    if (hours === 1) {
        message += "The village should currently be under attack. "
    }
    message += `Next attack will start in ${hours ? `${hours} hour,` : ''} ${minutes ? `${minutes === 1 ? `${minutes} minute,` : `${minutes} minutes,`}` : '' } ${Math.floor(calc) ? `${Math.floor(calc) === 1 ? `${Math.floor(calc)} second` : `${Math.floor(calc)} seconds`}` : ``}.`
    return message;
}

bot.on('message', function (msg) {
    // Check for !village or #village from in game
    if (msg.content.startsWith('!village') || (msg.content.split(':**  ').length > 1 && msg.content.split(':**  ')[1].startsWith('#village'))) {
        // today's time
        const today = new Date().getTime() / 1000;
        // Known start of phase 1 in the past
        const start = new Date('2018.10.24 18:00').getTime() / 1000;
        // difference in seconds
        const secondsPassed = (today - start);
        // seconds converted to days
        const daysPassed = secondsPassed / 86400;
        // out of scope message assignment
        let message = "";
        // out of scope time assignment
        let timeLeft;
        // Out of scope assignment for phase (only used in phase 4)
        let phase;
        // number of days since the latest phase 1 start
        let daysSincePhaseOne = daysPassed % 12;
        // Pick message for current phase
        if (daysSincePhaseOne % 12 < 3) {
            timeLeft = getTimeLeft(3 - (daysSincePhaseOne % 12));
            message = "Village is in Phase One. This phase will end in " + timeLeft;
        } else if (daysSincePhaseOne % 9 < 3) {
            timeLeft = getTimeLeft(3 - (daysSincePhaseOne % 9));
            message = "Village is in Phase Four. This phase will end in " + timeLeft;
            phase = 4;
        } else if (daysSincePhaseOne % 6 < 3) {
            timeLeft = getTimeLeft(3 - (daysSincePhaseOne % 6));
            message = "Village is in Phase Three. This phase will end in " + timeLeft;
        } else {
            timeLeft = getTimeLeft(3 - (daysSincePhaseOne % 3));
            message = "Village is in Phase Two. This phase will end in " + timeLeft;
        }
        // Send message back to the channel that requested it
        msg.channel.send(message);
        // Additional text for phase 4
        // Left out of if - else block to maintain proper order of events
        if (phase === 4) {
            msg.channel.send(phaseFour(3 - (daysSincePhaseOne % 9)))
        }
    }
});

bot.login(auth.token);