import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import "@/styles/reserves.css";
import "@/styles/stakebutton.css";
import "sf-font";
import { useEffect } from "react";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <div>
      <header className="navstyle">
        <div className="container">
          <div className="d-flex justify-content-left">
            <a
              href="#"
              className="d-flex align-items-left mb-2 mb-lg-0 text-white text-decoration-none"
            >
              <img
                width="60"
                height="60"
                src="n2usd-logo.png"
                style={{ opacity: "0.9" }}
              />
            </a>
            <ul
              className="nav col-10 col-lg me-lg mb-2 justify-content-left mb-md-0 px-3"
              style={{
                fontSize: "16px",
                fontWeight: "500",
                fontFamily: "SF Pro Display",
              }}
            >
              <li>
                <h3
                  href="/"
                  className="text-2xl font-extrabold dark:text-white text-center "
                  style={{
                    textShadow: "0px 1px 1px",
                    opacity: "0.8",
                    marginTop: "12px",
                  }}
                >
                  ShreyStables Reserves
                </h3>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <Toaster position="top-center" />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
