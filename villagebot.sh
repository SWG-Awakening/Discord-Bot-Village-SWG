#!/bin/bash
cd /home/infinity/workspace/villagebot
pm2 start villagebot.js --time --exp-backoff-restart-delay=100 -o ./console.log -e ./error.log
