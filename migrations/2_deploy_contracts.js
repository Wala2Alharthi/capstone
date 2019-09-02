// migrating the appropriate contracts
var Wala2TechERC721Token = artifacts.require("Wala2TechERC721Token");
var SquareVerifier = artifacts.require("Verifier");
var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");

module.exports = async (deployer, network) => {
  if (network === 'development') {
    await deployer.deploy(Wala2TechERC721Token);
  }
  
  await deployer.deploy(SquareVerifier);
  await deployer.deploy(SolnSquareVerifier, SquareVerifier.address);
};