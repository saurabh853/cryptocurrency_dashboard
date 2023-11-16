// Importing combineReducers function from Redux library
import { combineReducers } from "redux";

// Importing individual reducers
import coinExchangeReducer from "./coinExchangeReducer";
import reducer from "./reducer";

// Combining reducers using combineReducers
const mainReducer = combineReducers({
    // Naming the default reducer as 'default'
    default: reducer,
    
    // Naming the exchange reducer as 'exchange'
    exchange: coinExchangeReducer
});

// Exporting the combined mainReducer
export default mainReducer;
