import React from 'react'
import Navv from './Navv'
import logo from '../assets/Logo.png'
import '../css/about.css'
import myGif from '../assets/auction.gif';
/**
 * This component displays information about our project.
 */

const About = () => {
    return (
        <>
            <Navv style={{position:'fixed', top:0, right:0, left:0, padding:0, mariginLeft:0}}></Navv>
            <div style={{ textAlign: 'center', background: "linear-gradient(90deg, #0062ff, #da61ff)", color: 'white', position:'fixed', bottom:0, top:60, left:0, right:0}}>


                <h1 style={{padding: 10}}>Welcome to Auction-Sphere!</h1>

                <p>
                One-stop shop for your favourite items at desired prices!<br></br>
                Bid for exciting items and grab your favourite!
                </p>
                <div className="about-us">Hello
                <p>
                    Auction Sphere is an auctioning system where people can bid
                    on exciting items and also put items up for sale. Every item
                    has a bidding window, and the item goes to the highest
                    bidder by the end of that window.
                </p>
                <p>
                On the homepage, people can view all the latest items being
                    put up for sale and their respective highest bids. On the
                    product details page, apart from product details, people can
                    view the latest bids as well as the highest bid, and can
                    also place a bid. It's upto the seller to decide the minimum
                    price of the product, as well as bid increments.
                </p>
                </div>
                <div style={{ mariginTop: '5rem' }}>
                </div>
                <div className="seller"> <h4 style={{textAlign:"center"}}>Seller</h4>
                    <ul style={{textAlign:'left'}}>
                        <li>Register your profile</li>
                        <li>Register your products</li>
                        <li>Add Maximum Bidding Days</li>
                        <li>Add your most desired price and minimum bid</li>
                        <li>Personalized Seller dashboard</li>
                    </ul>
                </div>
                <div className="buyer"> <h4 style={{textAlign:"center"}}>Buyer</h4>
                    <ul style={{textAlign:'left'}}>
                        <li>Register your profile</li>
                        <li>Bid for your favourite item</li>
                        <li>Update Bid to secure your product!</li>
                        <li>Personlaize Buyer Dashboard</li>
                        <li>benefir from good deals</li>
                    </ul>
                </div>
                <div>
            <h2>Check out this GIF!</h2>
            <img src={myGif} alt="A cool GIF" />
        </div>
                <img src={logo} style={{ height: 175, width: 300, position: 'absolute', right:5, bottom:5}} />
            </div>
        </>
    )
}

export default About