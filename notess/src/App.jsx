import './App.css';
import Header from './1.components/Header/Header';
import Notes from './1.components/Notes/Notes';
import LeftSideBar from './1.components/sidebaar/LeftSideBar';
import { store } from './2.ReduxToolkit/Store';
import { Provider } from 'react-redux';
import Test from './Test';
import { useState } from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './router/Layout';
import CreateNotes from './1.components/CreateNotes/CreateNotes';
import Note from './pages/Note_page';
import Archive from './pages/Archive_page';
import Label_page from './pages/Label_page';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />} >
        <Route path='' element={<Note />} />
        <Route path='archive' element={<Archive />} />
        <Route path='label/:name' element={<Label_page />} />
      </Route>
    )
  )


  return (
    <div className='relative'>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider >
    </div>
  );
}

export default App;