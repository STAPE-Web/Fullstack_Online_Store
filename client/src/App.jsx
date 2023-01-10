import { Provider } from 'react-redux';
import { store } from 'store';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import AppRouter from 'components/AppRouter';
import Header from 'components/Header/Header';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
