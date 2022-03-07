# XDEFI Distribution Rewards Automator

This Rewarder contract is basically a thin role based access control to allow some third parties to send $XDEFI (rewards) periodically; without allowing them to send to **any** destinations;

This will allow three different actors to manage funds that gets rewarded to stakers.

- Admins: can set authorized senders, can set authorized destinations - they will in general send $XDEFI Funds to this contract
- Senders: are the ones who can send money of this contract to the `authorizedDestinations` list
- Authorized Destinations: are the ones who can receive and be specified as `destination` when sending ERC20 tokens

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```


### Run sendRewards

```
export PKEY=0x.... # change with private key
export REWARDER_ADDRESS=0x... #change with deployed rewarder address
npx hardhat run scripts/sendRewards.js --network mainnetSender
```