import React from 'react';
import { Provider } from "react-redux";
import Routes from './routes'
import './App.css'
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const App: React.FC = () => {
  return (
    <React.Fragment >
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Routes />
          </PersistGate>
        </Provider>
    </React.Fragment >
  )
}


export default App;