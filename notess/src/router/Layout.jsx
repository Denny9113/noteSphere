import React from 'react'
import { Outlet } from 'react-router'
import Header from "../1.components/Header/Header";
import LeftSideBar from '../1.components/sidebaar/LeftSideBar';

function Layout() {

  return (
    <>
      <LeftSideBar/>
      {/* <Header /> */}
      <Outlet />
    </>
  )
}

export default Layout