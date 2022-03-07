# export PKEY=0x....
# export SLACK_WEBHOOK=https://....
# export REWARDER_ADDRESS=....

npx hardhat run scripts/sendRewards.js --network mainnetSender &&  npx hardhat run scripts/updateDistribution.js --network mainnetSender &&  curl -X POST --data-urlencode "payload={\"channel\": \"#staking-bot-notifications\", \"username\": \"staking-bot\", \"text\": \"BOT: Staking reward success.\", \"icon_emoji\": \":ghost:\"}" $SLACK_WEBHOOK || curl -X POST --data-urlencode "payload={\"channel\": \"#staking-bot-notifications\", \"username\": \"staking-bot\", \"text\": \"BOT: Staking Reward Failed - Please debug.\", \"icon_emoji\": \":ghost:\"}" $SLACK_WEBHOOK
