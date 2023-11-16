// Import necessary dependencies
import thunk from 'redux-thunk';
import mainReducer from './Reducer/mainReducer';
import { applyMiddleware } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

// Middleware configuration for the Redux store
const middleware = [logger, thunk];

// Create the Redux store with the mainReducer and apply middleware
const store = createStore(
  mainReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

// Export the configured Redux store
export default store;
