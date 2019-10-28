import React from 'react';
import { Provider } from 'react-redux';

import './App.css';
import TakeHomeCard from '../../features/location/TakeHomeCard';
import store from '../../store';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <TakeHomeCard />
      </div>
    </Provider>
  );
}

export default App;
