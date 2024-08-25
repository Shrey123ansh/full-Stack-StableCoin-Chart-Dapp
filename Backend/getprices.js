const { ethers } = require("ethers");
const oracleABI = require("./oracleabi.json");
const reserveABI = require("./reservesabi.json");
const n2usdABI = require("./n2usdabi.json");

const oracleEth = "0x694AA1769357215DE4FAC081bf1f309aDC325306";
const reservecontract = "0x613A19749D641Bf215E21A76B14b2ba786A245d8";
const n2usdcontract = "0xAB5C3779ccE336247D24Ee96287cf900F7d75205";

const ethrpc = "https://ethereum-sepolia-rpc.publicnode.com";

const ethprovider = new ethers.providers.JsonRpcProvider(ethrpc);
const key = "86e204ae70094a737c1d4c02a88e8e2cc18b36f25bf2e2b620791d4b96736ab4";

const walleteth = new ethers.Wallet(key, ethprovider);

const ethoracle = new ethers.Contract(oracleEth, oracleABI, walleteth);
const reserves = new ethers.Contract(reservecontract, reserveABI, walleteth);
const n2usd = new ethers.Contract(n2usdcontract, n2usdABI, walleteth);

async function getEthPrice() {
  let ethprice = await ethoracle.latestRoundData().catch((error) => {
    console.log(error);
  });

  let lastesteth = Number(ethprice.answer.toString()) / 1e8;
  // console.log(lastesteth);
  return lastesteth;
}

async function getN2usdPrice() {
  let lastesteth = await getEthPrice().catch((error) => {
    console.log(error);
  });
  let usdtcolraw = await reserves._rsvVault(0).catch((error) => {
    console.log(error);
  });
  let ethcolraw = await reserves._rsvVault(1).catch((error) => {
    console.log(error);
  });
  let n2usdSupRaw = await n2usd.totalSupply().catch((error) => {
    console.log(error);
  });
  let usdtcollateral = Number(usdtcolraw.amount.toString()) / 1e18;
  let ethcollateral = Number(ethcolraw.amount.toString()) / 1e18;
  let n2usdsupply = Number(n2usdSupRaw.toString()) / 1e18;
  let n2usdprice =
    (usdtcollateral * 1 + ethcollateral * lastesteth) / n2usdsupply;
  console.log(n2usdprice);

  return n2usdprice;
}
module.exports = { getEthPrice, getN2usdPrice };
