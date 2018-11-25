# Village Discord Bot

This is a discord bot that will listen for:
    !village (In discord)
    #village (From in-game when using Progor-Chat as well)

## Getting Started

First, create a discord bot. Go to https://discordapp.com/developers, fill out the name of your bot/app, make it public, give it a profile photo if you want, and save it. You don't need OAuth2 or Redirect URIs. This will give you the name and token you need later.

Then, invite the bot to your server. Use this link: https://discordapp.com/oauth2/authorize?client_id=CLIENT_ID&scope=bot but replace the Client_ID with the Client ID from the bot you just created.

Create an auth.json file in your root directory that has your secret token

```
{
    "token": "YOUR_BOT_TOKEN_HERE"
}
```

In bot.js edit line 5 and line 7 for your needs:

```
// Number of days per phase
const daysPerPhase = 3;
// Known start of phase 1 in the past
const start = new Date('2018.10.24 18:00').getTime() / 1000;
```

These constant represents the number of days per phase and the start of phase One, sometime in the past.

## Permissions

This bot only needs permission to post messages in chat. That's it.

## Author

This bot was made by Tyler Schum