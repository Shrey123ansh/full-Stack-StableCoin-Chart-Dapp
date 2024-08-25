import { ethers } from "ethers";
import rsvABI from "./rsvabi.json";
import n2usdABI from "./n2usdabi.json";
import governorabi from "./governorabi.json";
import { toast } from "react-hot-toast";

const rsvcontract = "0x613A19749D641Bf215E21A76B14b2ba786A245d8";
const n2usdcontract = "0xAB5C3779ccE336247D24Ee96287cf900F7d75205";
const n2UsdGovernorcontract = "0xc23D8AaD7F6a3192bAB2a3439f69fA5E925C5008";
const rpc = "https://ethereum-sepolia-rpc.publicnode.com";
const provider = new ethers.providers.JsonRpcProvider(rpc);
const key = "86e204ae70094a737c1d4c02a88e8e2cc18b36f25bf2e2b620791d4b96736ab4";
const wallet = new ethers.Wallet(key, provider);
const reserves = new ethers.Contract(rsvcontract, rsvABI, wallet);

const n2usd = new ethers.Contract(n2usdcontract, n2usdABI, wallet);
const n2UsdGovernor = new ethers.Contract(
  n2UsdGovernorcontract,
  governorabi,
  wallet
);

const convertToWei = async (value) => {
  return ethers.utils.parseEther(value);
};

export async function getReserves() {
  const rsvcount = Number((await reserves.currentReserveId()).toString());
  const n2dusdformat = (await n2usd.totalSupply()).toString();
  const n2dusdsupply = ethers.utils.formatEther(n2dusdformat);
  let i = 0;
  let rsvamounts = [];
  for (i; i < rsvcount; i++) {
    const balance = await reserves._rsvVault(i);
    const getbalance = balance.amount.toString();
    let formatbalance = ethers.utils.formatEther(getbalance);
    rsvamounts.push(formatbalance);
  }
  return { rsvamounts, n2dusdsupply };
}

export const addEth = async () => {
  let amountToWei = (await convertToWei("30")).toString();

  let result = await reserves.depositCollateral(1, amountToWei).then(() => {
    toast.success("Added it!");
  });
};
export const removeEth = async () => {
  let amountToWei = (await convertToWei("30")).toString();

  let result = await reserves.withdrawCollateral(1, amountToWei).then(() => {
    toast.success("Removed it!");
  });
};
export const pegValue = async () => {
  // await n2UsdGovernor.fetchColPrice();
  let result = await n2UsdGovernor.validatePeg().then(() => {
    toast.success("Validated!");
    toast.success("Wait for 2 mins to see changes!");
  });
};
