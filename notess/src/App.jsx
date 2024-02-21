import './App.css';
import Header from './1.components/Header/Header';
import Notes from './1.components/Notes/Notes';
import LeftSideBar from './1.components/sidebaar/LeftSideBar';
import { store } from './2.ReduxToolkit/Store';
import { Provider } from 'react-redux';
import Test from './Test';
import { useState } from 'react';


function App() {

  const [first, setfirst] = useState('first value')

  return (
    <Provider store={store}>
      <Notes />
      <LeftSideBar/>
      <Header />
      {/* <Test /> */}
    </Provider >
  );
}

export default App;