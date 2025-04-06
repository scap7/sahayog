import React from 'react'
import Header from './header.jsx'
import Footer from './footer.jsx'
import SideBar from './sideBar.jsx'

export default function Layout({children}){
  return(
    <>
      <Header/>
      <div className="row">
        <div className="col-md-2">
          <SideBar/>
        </div>
        <div className="col-md-10 text-center">
          {children}
        </div>
      </div>
      <Footer/>
    </>
  )
}