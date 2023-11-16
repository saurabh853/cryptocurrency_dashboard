// Importing constants from the specified path
import constants from "../Constant/constants";

// Initial state for the exchange reducer
const initialState = {
  name: "Cryptocurrency Exchange",
  cryptoCoinList: [],
};

// Exchange reducer function
const coinExchangeReducer = (state = initialState, action) => {
  // Switch statement to handle different action types
  switch (action.type) {
    // Case for successful exchange
    case constants.COIN_EXCHANGE_SUCCESS:
      // Returning a new state with updated cryptoCoinList based on the action payload
      return {
        ...state,
        cryptoCoinList: action.payload,
      };

    // Case for exchange error
    case constants.COIN_EXCHANGE_ERROR:
      // Displaying an alert with the error message from the action payload
      alert(action.payload);
      // Returning the current state (unchanged) in case of an error
      return state;

    // Default case for handling unknown action types
    default:
      // Returning the current state if the action type is not recognized
      return state;
  }
};

// Exporting the coinExchangeReducer function as the default export
export default coinExchangeReducer;
