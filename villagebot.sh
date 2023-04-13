#!/bin/bash
cd /home/infinity/workspace/villagebot
pm2 start bot.js --time --exp-backoff-restart-delay=100 -o ./console.log -e ./error.log
