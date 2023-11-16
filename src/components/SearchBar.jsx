import React, { useContext, useRef } from 'react';
import { CryptoContext } from '../Context/Context';
import SearchInput from './SearchInput';
import debounce from 'lodash.debounce';

export default function SearchBar() {
    // Destructure values from the CryptoContext
    const { getSearchResult, setCurrency, currentCurrency } = useContext(CryptoContext);

    // Use a more descriptive variable name for the ref
    const currencyInputRef = useRef();

    // Handler for changing the currency
    const handleCurrencyChange = (event) => {
        event.preventDefault();
        const selectedCurrency = currencyInputRef.current.value;
        setCurrency(selectedCurrency);
        currencyInputRef.current.value = "";
    };

    // Debounced function for search input
    const debouncedSearch = debounce(function (searchValue) {
        getSearchResult(searchValue);
    }, 2000);

    return (
        <div className="flex">
            {/* Currency selection dropdown */}
            <span className="flex rounded-lg">
                <select
                    className='border outline-none font-body text-[20px] text-bold cursor-pointer backdrop-blur-md bg-opacity-10 rounded-lg w-[90px] text-center sm:w-[90px] z-1 pr-3 pl-2 shadow-lg'
                    value={currentCurrency}
                    onChange={handleCurrencyChange}
                    ref={currencyInputRef}
                >
                    <option value={"usd"} className="text-black-600">USD</option>
                    <option value={"inr"} className="text-black-600">INR</option>
                    <option value={"eur"} className="text-black-600">EUR</option>
                    <option value={"jpy"} className="text-black-600">JPY</option>
                    <option value={"gbp"} className="text-black-600">GBP</option>
                    <option value={"aud"} className="text-black-600">AUD</option>
                    <option value={"cad"} className="text-black-600">CAD</option>
                </select>
            </span>
            {/* Search input component */}
            <div className="relative w-full">
                <SearchInput handleSearch={debouncedSearch} />
            </div>
        </div>
    );
}
