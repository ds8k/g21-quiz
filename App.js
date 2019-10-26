import React from 'react'
import { BreadProvider } from 'material-bread'
import { Provider } from 'react-redux'

import Router from './src/navigation'
import store from './src/redux'

const App = () => {
  return (
    <Provider store={store}>
      <BreadProvider>
        <Router />
      </BreadProvider>
    </Provider>
  );
};

export default App;
