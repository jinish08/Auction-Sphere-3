import React from 'react'
import Navv from './Navv'
import logo from '../assets/Logo.png'
import '../css/about.css'
/**
 * This component displays information about our project.
 */

const About = () => {
    return (
        <>
            <Navv />
            <div style={{ textAlign: 'center', background: "linear-gradient(90deg, #0062ff, #da61ff)", color: 'white', position:'absolute', bottom:0, top:60}}>
                <h1>Welcome to Auction-Sphere!</h1>
                <p>
                One-stop shop for your favourite items at desired prices!<br></br>
                Bid for exciting items and grab your favourite!
                </p>
                <p>
                    Auction Sphere is an auctioning system where people can bid
                    on exciting items and also put items up for sale. Every item
                    has a bidding window, and the item goes to the highest
                    bidder by the end of that window.
                </p>
                
                <br />
                <div style={{ mariginTop: '5rem' }}>
                    On the homepage, people can view all the latest items being
                    put up for sale and their respective highest bids. On the
                    product details page, apart from product details, people can
                    view the latest bids as well as the highest bid, and can
                    also place a bid. It's upto the seller to decide the minimum
                    price of the product, as well as bid increments.
                </div>
                <div className="buyer"> Buyer</div>
                <div className="seller"> Seller</div>
                <img src={logo} style={{ height: 175, width: 300, position: 'absolute', right:5, bottom:5}} />
            </div>
        </>
    )
}

export default About