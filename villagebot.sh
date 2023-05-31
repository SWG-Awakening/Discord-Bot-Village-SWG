#!/bin/bash
cd /home/PATH/TO/BOT
pm2 start villagebot.js --name villagebot --time --exp-backoff-restart-delay=100 -o ./console.log -e ./error.log
