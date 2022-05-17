const config = {
  AnchorEarnBSC: {
    0: "0x0000000000000000000000000000000000000000",
    56: "",
    97: "0x80de92df50F270e49bb4E269502D00cAB753A55a",
  },
  StakingVault: {
    0: "0x0000000000000000000000000000000000000000",
    56: "",
    97: "0xd6861aB260a8c2f060d3E541Df7696dDBC9AB682",
  },
  BlockExplorerURL: {
    56: "https://bscscan.com",
    97: "https://testnet.bscscan.com",
  },
  RpcURL: {
    56: "https://bsc-dataseed1.defibit.io/",
    97: "https://speedy-nodes-nyc.moralis.io/03eb35954a0b7ed092444a8e/bsc/testnet",
  },
  chainHexID: {
    56: "0x38",
    97: "0x61",
  },
  MAX_STAKE_AMOUNT_PER_USER_DIV_DECIMALS: 10000,
  INFURA_ID: "9f08884ad87343d89b817b96e19e5808",
  chainID: 56,
};

export const Units = {
  0: "noether",
  1: "wei",
  3: "kwei",
  6: "mwei",
  9: "gwei",
  12: "micro",
  15: "finney",
  18: "ether",
  21: "kether",
  24: "mether",
  27: "gether",
  30: "tether",
};

export default config;
