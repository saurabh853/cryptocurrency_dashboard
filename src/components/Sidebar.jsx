import React, { useContext } from "react";
import { CryptoContext } from "../Context/Context";
import { BiReset } from "react-icons/bi";

function Sidebar() {
  // Destructuring values from the context
  const { cryptoData, currency, resetFunction } = useContext(CryptoContext);

  return (
    <div className="bg-white scroll-smooth backdrop-blur-md border rounded-lg shadow-lg scrollspy" data-bs-spy="scroll" data-bs-target="#scrollspy1" data-bs-offset="200">
      <div>
        {/* Section title */}
        <p className="text-black text-bold text-[15px] text-center mt-4 font-bold">Cryptocurrency by market cap</p>
      </div>
      <div className="flex relative justify-end mt-3">
        {/* Reset button */}
        <button className="w-[1.6rem] flex absolute hover:scale-110 transition all transition-ease" onClick={resetFunction}>
          <BiReset />
        </button>
      </div>
      <div>
        {cryptoData ? (
          <div className="w-full table-auto">
            <div>
              {/* Display each cryptocurrency data */}
              {cryptoData.map((crypto) => (
                <div key={crypto.id} className="text-center text-lg border-b hover-bg-gray-600 last:border-b-0">
                  {/* Cryptocurrency image */}
                  <img src={crypto.image} alt={crypto.name} className="flex absolute w-[1.5rem] h-[1.6rem] ml-2 mt-2" />
                  {/* Cryptocurrency name */}
                  <span className="flex flex-row pl-9 mt-3 text-[20px]">{crypto.name}</span>
                  <div className="flex flex-row justify-end mr-2">
                    {/* Display 24h market cap change percentage */}
                    <div className={`text-[12px] font-semibold ${crypto.market_cap_change_percentage_24h > 0 ? "text-green-500 " : "text-red-500 "}`}>
                      <i className={`mr-1 text-sm ${crypto.market_cap_change_percentage_24h > 0 ? "fa-solid fa-caret-up" : "fa-solid fa-caret-down"}`}></i>
                      <span>{parseFloat(crypto.market_cap_change_percentage_24h).toFixed(2)}%</span>
                    </div>
                  </div>
                  <div className="-ml-9">
                    {/* Display market cap */}
                    <span className="text-[15px] -mt-4 ml-3 flex pl-8 mx-4 mb-4 truncate">
                      Mkt.Cap{" "}
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: currency,
                      }).format(crypto.market_cap)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Sidebar;
