// Import necessary modules from React
import { createContext, useLayoutEffect, useState } from "react";

// Create a context for managing crypto-related state
export const CryptoContext = createContext({});

// Define a context provider component for crypto-related data
export const CryptoCurrencyContext = ({ children }) => {
  // State variables for managing various aspects of crypto data
  const [cryptoId, setCryptoId] = useState();
  const [cryptoData, setCryptoData] = useState();
  const [currency, setCurrency] = useState("usd");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [page, setPage] = useState(1);
  const [totalPages] = useState(350);
  const [perPage, setPerPage] = useState(8);
  const [searchData, setSearchData] = useState();
  const [currencySearch, setSearchedCurrency] = useState("");
  const [id, setCurrencyId] = useState("");

  // Function to fetch crypto data based on current state
  const getCryptoData = async () => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${currencySearch}&order=${sortBy}&page=${page}&per_page=${perPage}`
      )
        .then((res) => res.json())
        .then((json) => json);
      setCryptoData(data);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
    }
  };

  // Function to fetch crypto ID data based on current state
  const getCryptoId = async () => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${id}&order=market_cap_desc&page=1&per_page=200`
      )
        .then((res) => res.json())
        .then((json) => json);
      setCryptoId(data);
    } catch (error) {
      console.error("Error fetching crypto ID data:", error);
    }
  };

  // Function to fetch search results based on a query
  const getSearchResult = async (query) => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      )
        .then((res) => res.json())
        .then((json) => json);

      setSearchData(data.coins);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Function to reset certain state variables
  const resetFunction = () => {
    setPage(1);
    setSearchedCurrency("");
    setSortBy("market_cap_desc");
  };

  // Use layout effect to fetch data when dependencies change
  useLayoutEffect(() => {
    getCryptoData();
    getCryptoId();
  }, [currency, sortBy, page, perPage, currencySearch]);

  // Provide the context with relevant values to its children components
  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        currency,
        setCurrency,
        sortBy,
        setSortBy,
        page,
        setPage,
        totalPages,
        setPerPage,
        perPage,
        searchData,
        getSearchResult,
        setSearchedCurrency,
        setSearchData,
        resetFunction,
        cryptoId,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
