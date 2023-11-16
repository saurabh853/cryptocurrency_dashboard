import axios from "axios";
import constants from "../Constant/constants";

// Action creator to fetch coin list
export const fetchCoinExchangeRateList = () => {
    // Using Redux Thunk to handle asynchronous actions
    return (dispatchData) => {
        // Make an API request to get coin exchange rates
        axios.get('https://api.coingecko.com/api/v3/exchange_rates')
            .then(response => {
                // Extract data from the API response
                const data = response.data;

                // Dispatch a success action with the retrieved data
                dispatchData({
                    type: constants.COIN_EXCHANGE_SUCCESS,
                    payload: data
                });
            })
            .catch(error => {
                // Handle errors by extracting the error message
                const msg = error.message;

                // Dispatch an error action with the error message
                dispatchData({
                    type: constants.COIN_EXCHANGE_ERROR,
                    payload: msg
                });
            });
    };
};

