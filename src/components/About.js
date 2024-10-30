import React from 'react'
import Navv from './Navv'
import logo from '../assets/Logo.png'
import '../css/card.css'
import '../css/about.css'
/**
 * This component displays information about our project.
 */

const About = () => {
    return (
        <div className='about'>
        <Navv></Navv>
        <div>
            <h1 style={{color:"White", textAlign:"center"}}>Welcome to Auction Sphere!</h1>
        </div>
        <img src={logo} className="img-css"></img>
        </div>

    )
}

export default About
