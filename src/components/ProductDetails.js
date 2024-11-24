import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Card, CardImg, CardTitle, CardText, Row, Col } from 'reactstrap'
import axios from 'axios'
import { Line, Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

import AddBid from './AddBid'
import Navv from './Navv'
import { URL } from '../global'
import { toast } from 'react-toastify'
import CountdownTimer from './Countdown'

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
)

function calcDate(inputDate) {
    return new Date(inputDate)
}

const ProductDetails = () => {
    let { id } = useParams()
    const [showAddBid, setShowAddBid] = useState(false)
    const [showButton, setShowButton] = useState(false)
    const [bids, setBids] = useState([])
    const [product, setProduct] = useState(null)
    const [bidHistory, setBidHistory] = useState({
        labels: [],
        datasets: [{
            label: 'Bid Amount History',
            data: [],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    })
    const [userEngagement, setUserEngagement] = useState({
        labels: ['Unique Bidders', 'Total Bids', 'Viewers'],
        datasets: [{
            label: 'User Engagement',
            data: [0, 0, 0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(75, 192, 192, 0.5)',
            ],
        }]
    })

    console.log(product)

    const handleBuyNow = async () => {
        try {
            if (typeof window !== 'undefined') {
                if (localStorage.getItem('email') === product[3]) {
                    toast.error('Cannot buy your own product!')
                    return
                }

                const response = await axios.post(`${URL}/product/buy-now`, {
                    prodId: id,
                    email: localStorage.getItem('email')
                })

                toast.success('Purchase successful!')
                setTimeout(() => {
                    window.location.href = '/products'
                }, 2000)
            }
        } catch (error) {
            console.log(error)
            toast.error('Error completing purchase')
        }
    }

    const getProductDetails = async () => {
        try {
            let data = await axios.post(`${URL}/product/getDetails`, {
                productID: id,
            })
            console.log(data)
            setBids(data.data.bids)
            setProduct(data.data.product[0])

            // Process bid history for chart
            const bidAmounts = data.data.bids.map(bid => bid[2])
            const bidders = data.data.bids.map(bid => `${bid[0]} ${bid[1]}`)

            setBidHistory({
                labels: bidders,
                datasets: [{
                    label: 'Bid Amount History',
                    data: bidAmounts,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            })

            // Update user engagement
            setUserEngagement({
                labels: ['Unique Bidders', 'Total Bids', 'Viewers'],
                datasets: [{
                    label: 'User Engagement',
                    data: [
                        new Set(bidders).size,
                        data?.data?.analytics?.total_bids ? data?.data?.analytics?.total_bids : bidAmounts.length,
                        data?.data?.analytics?.viewers ? data?.data?.analytics?.viewers : bidAmounts.length * 2
                    ],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                    ],
                }]
            })
        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Bidding Analytics'
            }
        }
    }

    useEffect(() => {
        getProductDetails()
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('auth') === 'true') {
                setShowButton(true)
            }
        }
    }, [])

    return (
        <>
            <div style={{
                background: 'linear-gradient(30deg, #020024, #090979,#94bbe9)',
                minHeight: '100vh',
                paddingBottom: '2rem'
            }}>
                <Navv />
                <div className="container py-5">
                    {product && (
                        <Card className="shadow-lg">
                            <div className="p-4">
                                {/* Header Section */}
                                <Row className="mb-4">
                                    <Col xs="12">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <CardTitle tag="h2" className="mb-0">
                                                {product[1]}
                                            </CardTitle>
                                            <div className="text-right">
                                                <CountdownTimer targetDate={calcDate(product[8])} />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>

                                {/* Main Content Section */}
                                <Row>
                                    {/* Left Column - Product Details */}
                                    <Col md="6" className="mb-4">
                                        <div className="product-image-container mb-4" style={{
                                            background: '#f8f9fa',
                                            padding: '1rem',
                                            borderRadius: '8px',
                                            textAlign: 'center'
                                        }}>
                                            <CardImg
                                                src={product[2]}
                                                alt={product[1]}
                                                style={{
                                                    maxWidth: '100%',
                                                    height: 'auto',
                                                    maxHeight: '400px',
                                                    objectFit: 'contain'
                                                }}
                                            />
                                        </div>
                                        <div className="product-details p-3" style={{
                                            background: '#f8f9fa',
                                            borderRadius: '8px'
                                        }}>
                                            <table className="table table-borderless">
                                                <tbody>
                                                    <tr>
                                                        <td><strong>Seller:</strong></td>
                                                        <td>{product[3]}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Minimum Price:</strong></td>
                                                        <td>${product[4]}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Minimum Increment:</strong></td>
                                                        <td>${product[7]}</td>
                                                    </tr>
                                                    {product[5] && <tr>
                                                        <td><strong>Buy Now Price:</strong></td>
                                                        <td>${product[5]}</td>
                                                    </tr>}
                                                    <tr>
                                                        <td><strong>Posted On:</strong></td>
                                                        <td>{new Date(product[6]).toLocaleDateString()}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="mt-3">
                                                <h5>Description:</h5>
                                                <p className="text-muted">{product[9]}</p>
                                            </div>
                                        </div>
                                    </Col>

                                    {/* Right Column - Charts */}
                                    <Col md="5">
                                        <div className="chart-container p-3 mb-4" style={{
                                            background: '#f8f9fa',
                                            borderRadius: '8px',
                                            height: '300px'
                                        }}>
                                            <h4 className="mb-3">Bidding History</h4>
                                            <Line options={chartOptions} data={bidHistory} />
                                        </div>
                                        <div className="chart-container p-3" style={{
                                            background: '#f8f9fa',
                                            borderRadius: '8px',
                                            height: '300px'
                                        }}>
                                            <h4 className="mb-3">User Engagement</h4>
                                            <Bar options={chartOptions} data={userEngagement} />
                                        </div>
                                    </Col>
                                </Row>

                                {/* Bottom Section - Current Bids */}
                                <Row className="mt-4">
                                    <Col xs="12">
                                        <div className="bids-section p-4" style={{
                                            background: '#f8f9fa',
                                            borderRadius: '8px'
                                        }}>
                                            <h4 className="mb-4">Current Bids</h4>
                                            {bids.length > 0 ? (
                                                <Row>
                                                    {bids.map((bid, index) => (
                                                        <Col md="4" key={index}>
                                                            <div className="bid-item mb-3 p-3" style={{
                                                                background: 'white',
                                                                borderRadius: '4px',
                                                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                                            }}>
                                                                <div className="text-center">
                                                                    <h5>{bid[0]} {bid[1]}</h5>
                                                                    <h4 className="text-primary">${bid[2]}</h4>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    ))}
                                                </Row>
                                            ) : (
                                                <div className="text-center text-muted">
                                                    <p>No bids placed yet</p>
                                                </div>
                                            )}

                                            {showButton && (
                                                <div className="text-center mt-4">
                                                    <Button
                                                        color="primary"
                                                        size="lg"
                                                        onClick={() => setShowAddBid(!showAddBid)}
                                                    >
                                                        {showAddBid ? 'Cancel' : 'Place a Bid'}
                                                    </Button>
                                                    {showAddBid && (
                                                        <div className="mt-4">
                                                            <AddBid productId={id} sellerEmail={product[3]} />
                                                        </div>
                                                    )}
                                                    {showAddBid && product[5] && (
                                                        <Button
                                                            color="success"
                                                            className="px-5 mb-3 mt-3"
                                                            onClick={handleBuyNow}
                                                        >
                                                            Buy Now for ${product[5]}
                                                        </Button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
        </>
    )
}

export default ProductDetails