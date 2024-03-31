import React from 'react'
import Asset from "../components/Asset";
import NoCooking from "../assets/images/no_cooking.png";
import JoinHeader from "../assets/images/JoinHeader.jpg"
import Header from "../components/Header";



const PageNotFound = () => {
  return (
    <>
    <Header imageUrl={JoinHeader} />
    <Asset src={NoCooking} message={"Sorry, the page you're looking for doesn't exist"} />
    </>
  )
}

export default PageNotFound