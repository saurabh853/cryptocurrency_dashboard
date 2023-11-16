// Importing constants from the specified path
import constants from "../Constant/constants";

// Initial state for the reducer
const initialState = {
    name: "Crypto Currency Dashboard",
    cryptoCoinList: [],
}

// Reducer function that handles state changes based on dispatched actions
const reducer = (state = initialState, action) => {
    switch (action.type) {
        // Handling the action type COIN_API
        case constants.COIN_API:
            // Updating state with new cryptoCoinList and page values from the action payload
            return {
                ...state,
                cryptoCoinList: action.payload,
                page: action.payload  // Note: This line might be incorrect, as it's setting 'page' to the same value as 'cryptoCoinList'
            }

        // Handling the action type COIN_API_ERROR
        case constants.COIN_API_ERROR:
            // Displaying an alert with the error message from the action payload
            alert(action.payload);
            // Returning the current state without any changes
            return state;

        // Default case for unknown action types
        default:
            // Returning the current state without any changes
            return state;
    }
}

// Exporting the reducer function as the default export
export default reducer;
