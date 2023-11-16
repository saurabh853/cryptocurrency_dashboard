import React from "react";
import { Provider } from "react-redux";
import Home from './components/Home';
import store from '../src/Redux/store';
import { CryptoCurrencyContext } from './Context/Context';

function App() {
  return (
    
    <Provider store={store}>
      <CryptoCurrencyContext >
        <Home />
      </CryptoCurrencyContext>
    </Provider>


  );
}

export default App;
