const web3 = require('web3');
const HDWalletProvider = require("truffle-hdwallet-provider");

const config = require('./deployment-config');
const proofs = require('./eth-contracts/test/proofs');
const abi = require('./eth-contracts/build/contracts/SolnSquareVerifier').abi;

const MNEMONIC = "hamster news health canoe crawl decrease split diamond parade soldier rain photo";
const INFURA_KEY = "20867c3de1844cb0997aee4de9f8fad3";
const NFT_CONTRACT_ADDRESS = config.solnSquaqreVerifierAddress;
const NETWORK = 'rinkeby';

if (!MNEMONIC || !INFURA_KEY || !config.ownerAddress || !NETWORK) {
    console.error("Please set a mnemonic, infura key, owner, network, and contract address.")
    return
}


async function main() {
    const provider = new HDWalletProvider(MNEMONIC, `https://${NETWORK}.infura.io/v3/${INFURA_KEY}`)
    const web3Instance = new web3(
        provider
    )

    if (NFT_CONTRACT_ADDRESS) {

        const nftContract = new web3Instance.eth.Contract(abi, NFT_CONTRACT_ADDRESS, {
            from: config.ownerAddress,
            gasLimit: "1000000"
        });


        for (var i = 0; i < 8; i++) {
            let proof = proofs[i].proof;
            let input = proofs[i].input;

            try {
                console.log('Minting token ...');

                const result = await nftContract.methods.mintNFT(
                        config.account3,
                        i + 1,
                        proof.A,
                        proof.B,
                        proof.C,
                        input
                    )
                    .send({
                        from: config.ownerAddress,
                        gas: 5510328
                    });

                console.log('New token has been minted: ' + result.transactionHash);
            } catch (err) {
                console.log('Error minting token: ' + err);
            }
        }
    }
}

main();