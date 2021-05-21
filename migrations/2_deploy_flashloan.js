let FlashLoan = artifacts.require('FlashLoan');

module.exports = async function (deployer) {
  try {
    await deployer.deploy(FlashLoan);
  } catch (e) {
    console.log(`Error in migration: ${e.message}`);
  }
};
