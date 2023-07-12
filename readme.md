# Village Phase Discord Bot

This is a discord bot that will listen for:
    !village (in discord)
    #village (in-game when using Progor-Chat as well)

## Getting Started

First, create a discord bot. Go to https://discordapp.com/developers, fill out the name of your bot/app, make it public, give it a profile photo if you want, and save it. You don't need OAuth2 or Redirect URIs. This will give you the name and token you need later.

Then, invite the bot to your server. Use this link: https://discordapp.com/oauth2/authorize?client_id=CLIENT_ID&scope=bot but replace the Client_ID with the Client ID from the bot you just created.

Download this repository to a folder.  cd to that folder and run

```sh
npm install
```

to install the necessary dependencies (like the Discord client).

Create a file named config.json with these values populated with your server, account, character, and chat room / channel specifics.  You can copy config.example.json to get you started.
For instance:

```json
{
    "SWG": {
		"DaysPerPhase": 14,
        "VillagePhaseOneKnownTime": "2023-05-21T18:00:00"
    },
    "Discord": {
        "PresenceName": "SERVER_NAME's Village Phases",
        "BotToken": "Bot token from Discord App Page"
    }
}
```

| Field | Explanation |
| ------ | ------ |
| SWG.DaysPerPhase | Days per village phase |
| SWG.VillagePhaseOneKnownTime| A known date & time for the start of phase one, sometime in the past (Eastern Standard Time). |
| Discord.PresenceName | The bot's Discord presence will show "Watching Discord.PresenceName" |
| Discord.BotToken | The application's bot token from the Discord Developer portal |

Finally run the bot with:

```sh
node villagebot.js
```

Better yet, to handle any unexpected errors get forever or PM2

```sh
sudo npm install forever -g
```

or

```sh
sudo npm install pm2 -g
```

and run with

```sh
forever start villagebot.js
```

or

```sh
pm2 start villagebot.js
```

## Author

This bot was made by Tyler Schum and adapted by Cyclone of Awakening