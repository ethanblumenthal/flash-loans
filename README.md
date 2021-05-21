# Aave Flashloan

A barebones solidity template for Aave's flashloans

## Flashing

1. In `Flashloan.sol`, code your logic into the `executeOperation()` function
2. When ready, call `flashloan()` on your contract
3. Important: your contract **must** have enough funds of whatever asset you are borrowing to payback the flashloan fee.
4. If not deploying on mainnet, then change the `addressProvider` in `./aave/FlashLoanReceiverBase.sol` to the relevant address

## Set up for 'simple' flash lending

If you do not need to work across protocols, such as simple flash loan testing, then the following instructions apply.

1. Clone this repo and in the cloned repo directory, install the necessary dependencies :
   ```
   npm install
   ```
2. In `truffle-config.js`, add the details of the [network you wish to use](https://www.trufflesuite.com/docs/truffle/reference/configuration), e.g. Ropsten.

- Important: make sure you are using an ethereum account that has enough ETH and token assets to pay back the loan. This is your `deployment account`
- Rename `env` file to `.env` and include your infura key and `deployment account`'s private key (don't commit this file to Git!)

3. In `Flashloan.sol`, line 31, change the asset address to the [relevant asset address](https://docs.aave.com/developers/developing-on-aave/deployed-contract-instances) for the network you chose.
4. In `./aave/FlashLoanReceiverBase.sol`, change the `addressProvider` to the [relevant LendingPoolAddressesProvider](https://docs.aave.com/developers/developing-on-aave/deployed-contract-instances) for the network you chose.
5. In a terminal window in your repo directory, replace `NAME_OF_YOUR_NETWORK` with the network name from step 2 and run:
   ```
   truffle console --network NAME_OF_YOUR_NETWORK
   ```
6. You are now connected to the network you chose. In the same terminal window:
   ```
   migrate --reset
   ```
7. Your contract is now deployed on the network you chose. Call your contract's flashloan function within the _truffle console_ with:

   ```
   let f = await Flashloan.deployed()
   await f.flashloan()
   ```

   Be patient as your transaction gets processed and mined.

8. If your implementation is correct, then the transaction will succeed. If it fails/reverts, a reason will be given.
   - if you didn't make any changes to this template and just deployed it, then the call to `f.flashloan()` will fail as the **contract** is not funded with any DAI, so cannot make the flashloan repayment (which includes the amount borrowed + a fee). Solve this by getting DAI (or the relevant asset) and transferring it to your **contract**.

## Set up for cross protocol flash lending

If you are working across protocols, such as using the flash loaned amount on another #DeFi protocol, sometimes it is easier to fork mainnet and use each protocol's production contracts and production ERC20 tokens.

1. Clone this repo and in the cloned repo directory, install the necessary dependencies :
   ```
   npm install
   ```
2. (Install and) Run [Ganache](https://www.trufflesuite.com/ganache), preferably the [CLI version](https://github.com/trufflesuite/ganache-cli)
3. In `truffle-config.js`, ensure the details for the development network match up with your running Ganache instance
4. To minimise set up steps with Aave's lending pools, use Ganache's fork feature. This will 'fork' mainnet into your Ganache instance.
   Open terminal, replace `YOUR_INFURA_KEY` in the following and run:
   ```
   ganache-cli --fork https://mainnet.infura.io/v3/YOUR_INFURA_KEY -i 1
   ```
5. In a new terminal window in your repo directory, run:
   ```
   truffle console
   ```
6. Migrate your Flashloan contract to your instance of Ganache with:
   ```
   migrate --reset
   ```
7. Your contract is now deployed on your local Ganache, which is mirroring mainnet. Call your contract's flashloan function within the _truffle console_ with:

   ```
   let f = await Flashloan.deployed()
   await f.flashloan()
   ```

   Be patient as your ganache instance works its magic.

8. If your implementation is correct, then the transaction will succeed. If it fails/reverts, a reason will be given.
   - if you didn't make any changes to this template and just deployed it, then the call to `f.flashloan()` will fail as the **contract** is not funded with any DAI, so cannot make the flashloan repayment (which includes the amount borrowed + a fee). Solve this by getting DAI (or the relevant asset) and transferring it to your **contract**.
