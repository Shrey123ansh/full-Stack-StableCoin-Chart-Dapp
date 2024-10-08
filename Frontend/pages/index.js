import Head from "next/head";
import React from "react";
import { useState, useEffect } from "react";
import { getReserves } from "../components/config";
import { N2dusdChart } from "../components/n2dusd-chart";
import { addEth, removeEth, pegValue } from "../components/config";
export default function Reserves() {
  const [reservesInfo, storeReserves] = useState([]);

  useEffect(() => {
    const updateStats = setInterval(() => {
      getCollaterals();
    }, 1000);
    return () => clearInterval(updateStats);
  }, [reservesInfo]);

  useEffect(() => {
    counterNum();
  }, [reservesInfo]);

  async function getCollaterals() {
    const output = await getReserves();
    let colla = output.rsvamounts[0];
    let collb = output.rsvamounts[1];
    let n2dusdsup = output.n2dusdsupply;
    const reservesInfo = [
      {
        coinLogo: "n2usd-logo.png",
        colA: "USDT",
        colAsupply: colla,
        colB: "WETH",
        colBsupply: collb,
        total: n2dusdsup,
      },
    ];
    storeReserves(reservesInfo);
  }

  async function counterNum() {
    const counters = document.querySelectorAll(".value");
    const speed = 400;

    counters.forEach((counter) => {
      const animate = () => {
        const value = +counter.getAttribute("count");
        const data = +counter.innerText;

        const time = value / speed;
        if (data < value) {
          counter.innerText = Math.ceil(data + time);
          setTimeout(animate, 1);
        } else {
          counter.innerText = value.toLocaleString();
        }
      };

      animate();
    });
  }

  return (
    <div className="backstyle reservesbackground">
      <Head>
        <title>N2DeX</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="reserveshero">
        <div className="py-3">
          <h1 className="text-5xl font-extrabold dark:text-white">
            Stablecoins
            <small className="ms-2 font-semibold text-gray-500 dark:text-gray-400">
              are Meant To Be Agnostic.
            </small>
          </h1>
        </div>
        <div className=" align-items-center px-2 mb-3 text-white rounded">
          <div
            className="d-grid col-lg-9 card px-1 my-1 text-center"
            style={{ backgroundColor: "transparent" }}
          >
            <div className="px-0">
              <N2dusdChart />{" "}
            </div>
          </div>
        </div>
        <div className="d-flex col-lg-9">
          <div
            className="d-grid card text-center col-lg-2 mx-1 my-1 reservesstats"
            style={{ color: "white", backgroundColor: "#39ff1410" }}
          >
            <p className="card-header">Add Unstable Collateral-ETH</p>
            <div className="card-body">
              <button
                type="button"
                onClick={() => addEth()}
                className="btn btn-md stakestyle px-5"
              >
                Add
              </button>
            </div>
          </div>
          <div
            className="d-grid card text-center col-lg-2 mx-1 my-1 reservesstats"
            style={{ color: "white", backgroundColor: "#39ff1410" }}
          >
            <p className="card-header">Remove Unstable Collateral-ETH</p>
            <div className="card-body">
              <button
                type="button"
                onClick={() => removeEth()}
                className="btn btn-md stakestyle px-3"
              >
                Remove
              </button>
            </div>
          </div>
          <div
            className="d-grid card text-center col-lg-4 mx-1 my-1 reservesstats"
            style={{ color: "white", backgroundColor: "#39ff1410" }}
          >
            <p className="card-header">
              Please Peg After Adding/Removing Collateral to see changes...(Wait
              for 2 mins to see changes!)
            </p>
            <div className="card-body">
              <button
                type="button"
                onClick={() => pegValue()}
                className="btn btn-md stakestyle px-5"
              >
                Validate Peg
              </button>
            </div>
          </div>
        </div>
        <div className="d-grid col">
          <h5 className="my-4" style={{ fontWeight: "bold", color: "white" }}>
            Live Reserves Stats
          </h5>
        </div>
        {reservesInfo.map((col, i) => (
          <div key={i} className="d-flex col-lg-9">
            <div className="d-grid " style={{ color: "white" }}>
              <img
                className=""
                src={col.coinLogo}
                width="150"
                style={{ opacity: "0.8" }}
              />
              <a
                target="_blank"
                href="https://sepolia.etherscan.io/address/0x402992cd23c9cdcd3218586e493ff9fca0684fc6#tokentxns"
              >
                <h6 style={{ fontFamily: "SF Pro Display" }}>
                  {" "}
                  Vault Contract
                </h6>
              </a>
            </div>
            <div
              className="d-grid card text-center col-lg-2 mx-2 my-1  reservesstats"
              style={{ color: "white", backgroundColor: "#39ff1410" }}
            >
              <p className="card-header">{col.colA}</p>
              <div className="card-body justify-contents-center align-items-center">
                <h5 className="reservesvalues value" count={col.colAsupply}>
                  0
                </h5>
              </div>
            </div>
            <div
              className="d-grid card text-center col-lg-2 mx-1 my-1 reservesstats"
              style={{ color: "white", backgroundColor: "#39ff1410" }}
            >
              <p className="card-header">{col.colB}</p>
              <div className="card-body">
                <h5 className="reservesvalues value" count={col.colBsupply}>
                  0
                </h5>
              </div>
            </div>
            <div
              className="d-grid card text-center col-lg-4 mx-1 my-1 reservesstats"
              style={{ color: "white", backgroundColor: "#39ff1410" }}
            >
              <p className="card-header">Total Supply</p>
              <div className="card-body">
                <h5 className="value reservesvalues" count={col.total}>
                  0
                </h5>
              </div>
            </div>
          </div>
        ))}
        <div className="my-3"></div>
      </main>
    </div>
  );
}
