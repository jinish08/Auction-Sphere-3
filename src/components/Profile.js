import axios from 'axios'
import { URL } from '../global'
import { toast } from 'react-toastify'
import React, { useEffect, useState } from 'react'
import { Card, CardGroup, Row } from 'reactstrap'
import ProductCard from './ProductCard'
import Navv from './Navv'
import Footer from './Footer'

const Profile = () => {
    const [data, setData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`${URL}/profile`)
                if(response.data?.message === 'Please login first!'){
                    window.location.href = '/login'
                }
                setData(response.data)
            } catch (e) {
                toast.error(e)
            }
        }
        fetchData()
    }, [])
    return (
        <>
            <div
                style={{
                    background:
                        'linear-gradient(30deg, #020024, #090979,#94bbe9)',
                    backgroundAttachment: 'scroll',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                }}
            >
                <Navv />
                <div>
                    {data ? (
                        <>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px',
                                    marginTop: '5rem',
                                    marginBottom: '20px',
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                    padding: '15px',
                                }}
                            >
                                <h3 style={{ color: 'white' }}>
                                    Your information:
                                </h3>
                                <p
                                    style={{
                                        fontSize: '16px',
                                        lineHeight: 1.5,
                                        fontWeight: 'bold',
                                        color: 'white',
                                    }}
                                >
                                    First name: {data.first_name}
                                </p>
                                <p
                                    style={{
                                        fontSize: '16px',
                                        lineHeight: 1.5,
                                        fontWeight: 'bold',
                                        color: 'white',
                                    }}
                                >
                                    Last name: {data.last_name}
                                </p>
                                <p
                                    style={{
                                        fontSize: '16px',
                                        lineHeight: 1.5,
                                        fontWeight: 'bold',
                                        color: 'white',
                                    }}
                                >
                                    Email id: {data.email}
                                </p>
                                <p
                                    style={{
                                        fontSize: '16px',
                                        lineHeight: 1.5,
                                        fontWeight: 'bold',
                                        color: 'white',
                                    }}
                                >
                                    Contact number: {data.contact_no}
                                </p>
                                <p
                                    style={{
                                        fontSize: '16px',
                                        lineHeight: 1.5,
                                        fontWeight: 'bold',
                                        color: 'white',
                                    }}
                                >
                                    Number of products put for sale:{' '}
                                    {data.no_products} product(s)
                                </p>
                                <p
                                    style={{
                                        fontSize: '16px',
                                        lineHeight: 1.5,
                                        fontWeight: 'bold',
                                        color: 'white',
                                    }}
                                >
                                    You have bid on: {data.no_bids} product(s)
                                </p>
                            </div>
                            <p
                                style={{
                                    fontSize: '16px',
                                    lineHeight: 1.5,
                                    fontWeight: 'bold',
                                    color: 'white',
                                }}
                            >
                                Products put for sale:
                            </p>
                            <Row>
                                {data && data.products ? (
                                    data.products.map((product, index) => (
                                        <ProductCard
                                            key={index}
                                            product={product}
                                            maxBid={data.maximum_bids[index]}
                                            name={data.names[index]}
                                        />
                                    ))
                                ) : (
                                    <div>No products found</div>
                                )}
                            </Row>
                            <p
                                style={{
                                    fontSize: '16px',
                                    lineHeight: 1.5,
                                    fontWeight: 'bold',
                                    color: 'white',
                                }}
                            >
                                Products you have bid on:
                            </p>
                            <Row>
                                {data && data.bid_products ? (
                                    data.bid_products.map((product, index) => (
                                        <ProductCard
                                            key={index}
                                            product={product}
                                            maxBid={data.bid_bids[index]}
                                            name={data.bid_names[index]}
                                        />
                                    ))
                                ) : (
                                    <div>No products found</div>
                                )}
                            </Row>
                        </>
                    ) : (
                        <p>Loading data...</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default Profile
