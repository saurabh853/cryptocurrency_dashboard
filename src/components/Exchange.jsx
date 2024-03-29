import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCoinExchangeRateList } from "../Redux/Actions/actions";

// Exchange component for currency exchange functionality
export default function Exchange() {
  // State variables for component
  const [exchangeValue1, setExchangeValue1] = useState(0);
  const [exchangeValue2, setExchangeValue2] = useState(0);
  const [coinUnits, setCoinUnits] = useState("BTC");
  const [sellCoin, setSellCoin] = useState(1);
  const [buyCoin, setBuyCoin] = useState(1);

  // Redux hooks for dispatch and selecting state
  const dispatchData = useDispatch();
  const exchangeData = useSelector((state) => state.exchange);
  const coin = exchangeData.cryptoCoinList.rates;

  // Fetch coin list on component mount
  useEffect(() => {
    if (exchangeData.cryptoCoinList.length === 0) {
      dispatchData(fetchCoinExchangeRateList());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // Handle currency exchange calculation
  const handleExchange = () => {
    const unit = Object.values(coin).find((unit) => parseInt(unit?.value) === parseInt(buyCoin));
    setCoinUnits(unit?.unit);
    let result = (buyCoin / sellCoin) * parseFloat(exchangeValue1); 
    setExchangeValue2(result);
  };
  
  // JSX for the Exchange component
  return (
    <div className="bg-white bg-opacity-10 px-4 py-4 backdrop-blur-md rounded-lg border border-gray-100 mr-3 shadow-lg items-center">
      <div className="text-lg font-semibold ml-5">Exchange Coins</div>
      <div className="flex flex-row mt-8">
        <div className="pr-4 items-center">
          {/* Sell currency dropdown */}
          <div className="flex my-1 content-center items-center py-1 px-2 lg:ml-3">
            <p className="text-orange-400 font-semibold mr-3">Sell</p>
            <select
              className="w-[130px] h-[2rem] bg-gray-100 rounded-lg font-semibold p-1 bg-opacity-60 backdrop-blur-md focus:ring-2 px-5 inline-flex cursor-pointer"
              onChange={(e) => setSellCoin(e.target.value)}
            >
              {coin &&
                Object.values(coin).map((h, index) => (
                  <option value={h.value} key={index} className="text-gray-600">
                    {h.name}
                  </option>
                ))}
            </select>
          </div>
          {/* Buy currency dropdown */}
          <div className="flex my-2 content-center items-center px-2 py-2 lg:ml-3">
            <p className="text-green-600 font-semibold mr-3">Buy</p>
            <select
              className="w-[130px] h-[2rem] bg-gray-100 rounded-lg font-semibold p-1 bg-opacity-60 backdrop-blur-md focus:ring-2 px-5 inline-flex cursor-pointer"
              onChange={(e) => setBuyCoin(e.target.value)}
            >
              {coin &&
                Object.values(coin).map((h, index) => (
                  <option className="text-gray-600" key={index} value={h.value}>
                    {h.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="-mt-6 lg:pl-10 mr-3">
          {/* Value input and result display */}
          <div>
            <label className="text-gray-400">Enter Value</label>
            <div className="mr-[90px] w-full py-2 lg:w-[90px] md:w-full sm-w[90px]">
              <input
                type="number"
                placeholder="1"
                value={exchangeValue1}
                min="0"
                className="appearance-none block w-full bg-gray-100 bg-opacity-20 backdrop-blur-md text-gray-700 leading-tight focus:outline-none focus:border-gray-500 rounded border border-gray-400 px-3 py-1 outline-none"
                onChange={(e) => setExchangeValue1(e.target.value)}
              />
            </div>
            {/* Result display */}
            <p className="mt-4 text-green-500 text-sm text-transform:capitalize">
              {parseFloat(exchangeValue2).toFixed(2) || parseFloat(exchangeValue1).toFixed(1)} {coinUnits}
            </p>
          </div>
        </div>
      </div>
      {/* Exchange button */}
      <div className="text-center">
        <button
          className="bg-blue-600 rounded-lg py-1 px-6 text-white font-semibold hover:bg-red-600 border border-white"
          onClick={handleExchange}
        >
          Exchange
        </button>
      </div>
    </div>
  );
}
