import React from 'react'
import Navv from './Navv'
import logo from '../assets/Logo.png'
import '../css/about.css'
import myGif from '../assets/auction.gif';
import ProductView from './ProductView';
/**
 * This component displays information about our project.
 */

const About = () => {
    return (
        <>
            <Navv/>
            <div
                style={{
                    textAlign: 'center',
                    background:
                        'linear-gradient(30deg, #020024, #090979,#94bbe9)',
                    color: 'white',
                    position: 'fixed',
                    bottom: 0,
                    top: 60,
                    left: 0,
                    right: 0,
                }}
            >
                <h1 style={{ padding: 10 }}>Welcome to Auction-Sphere!</h1>

                <p>
                    One-stop shop for your favourite items at desired prices!
                    <br></br>
                    Bid for exciting items and grab your favourite!
                </p>
                <div className="about-us" style={{textAlign:"left"}}> <h3>About Us</h3>
                <p>
                    Auction Sphere is an auctioning system where people can bid
                    on exciting items and also put items up for sale. Every item
                    has a bidding window, and the item goes to the highest
                    bidder by the end of that window. It is agreat place to look for exciting items at your desired price!
                </p>
                <h3>How does it Work?</h3>
                <p>
                    <ol>
                        <li>Register your Profile on our webiste</li>
                        <li>Add a product and its details, for others to bid on!</li>
                        <li>Place bids on products to grab your favourites!</li>
                        <li>track the progress of items in your Personalized dashboard</li>
                    </ol>
                To learn about the exiting products on our webiste, please check out our<a href="/products" style={{color:'black'}}><b>Products!</b></a>
                </p>
                </div>
                <div style={{position: 'absolute', right:5, top:300}}>
            <img src={myGif} alt="A cool GIF" style={{ height: 200, width: 350 }}/>
        </div>
                <img src={logo} style={{ height: 175, width: 300, position: 'absolute', right:5, bottom:5}} />
            </div>
            <div style={{position:'absolute', top: 800}}>
                <ProductView></ProductView>
                </div>
        </>
    )
}

export default About
