/** @type import('hardhat/config').HardhatUserConfig */

const { POLYGON_RPC_URL, PRIVATE_KEY } = process.env;
module.exports = {
  solidity: {
    version: "0.8.9",
    defaultNetwork: "polygon",
    networks: {
      hardhat: {},
      polygon: {
        url: POLYGON_RPC_URL,
        chainId: 80001,
        gasPrice: 1000000000,
        accounts: [`0x${PRIVATE_KEY}`],
      },
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
