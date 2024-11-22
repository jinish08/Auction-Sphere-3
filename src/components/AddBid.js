import React, { useState } from 'react'
import { Form, FormGroup, Label, Input, Button, Row, Col, Card } from 'reactstrap'
import axios from 'axios'
import { URL } from '../global'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import "../css/addbid.css"

const AddBid = ({ productId, sellerEmail }) => {
    const [bidData, setBidData] = useState({
        amount: '',
        isAutoBid: false,
        maxAmount: '',
    })

    const handleChange = (event) => {
        setBidData({
            ...bidData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        let response

        try {
            if (typeof window !== 'undefined') {
                if (localStorage.getItem('email') === sellerEmail) {
                    toast.error('Cannot bid on your own product!')
                    return
                }

                if (bidData.isAutoBid && parseFloat(bidData.maxAmount) <= parseFloat(bidData.amount)) {
                    toast.error('Maximum amount must be greater than initial bid amount')
                    return
                }

                const email = localStorage.getItem('email')
                
                if (bidData.isAutoBid) {
                    // Submit auto-bid
                    response = await axios.post(`${URL}/bid/auto`, {
                        prodId: productId,
                        email: email,
                        initialBid: bidData.amount,
                        maxBidAmount: bidData.maxAmount
                    })
                } else {
                    // Submit regular bid
                    response = await axios.post(`${URL}/bid/create`, {
                        bidAmount: bidData.amount,
                        prodId: productId,
                        email: email,
                    })
                }

                // window.location.reload(false)
                toast.success(response.data.message)

                // after a timeout, go to /products
                setTimeout(() => {
                    window.location.href = '/products'
                }, 2000)
            }
        } catch (e) {
            console.log(e)
            toast.error('Error placing bid')
        }
    }

    return (
        <Card className="bid-card">
        <div className="bid-container">
            <h4 className="text-center mb-4">Place a Bid</h4>
            
            <Form onSubmit={handleSubmit}>
                <div className="d-flex align-items-center justify-content-center mb-4">
                    <FormGroup switch className="d-flex align-items-center m-0">
                        <Input
                            type="switch"
                            name="isAutoBid"
                            checked={bidData.isAutoBid}
                            onChange={(e) => setBidData({
                                ...bidData,
                                isAutoBid: e.target.checked
                            })}
                            className="me-2"
                        />
                        <Label check className="mb-0">
                            Enable Auto-bidding
                        </Label>
                    </FormGroup>
                </div>

                <FormGroup className="mb-3">
                    <Label 
                        for="amount"
                        className="text-center w-100"
                    >
                        Initial Bid Amount:
                    </Label>
                    <Input
                        id="amount"
                        name="amount"
                        placeholder="Enter your bid amount"
                        type="number"
                        min="0"
                        step="0.01"
                        value={bidData.amount}
                        onChange={handleChange}
                        required
                        className="bid-input"
                    />
                </FormGroup>

                {bidData.isAutoBid && (
                    <FormGroup className="mb-4">
                        <Label 
                            for="maxAmount"
                            className="text-center w-100"
                        >
                            Maximum Bid Amount:
                        </Label>
                        <Input
                            id="maxAmount"
                            name="maxAmount"
                            placeholder="Enter your maximum bid"
                            type="number"
                            min="0"
                            step="0.01"
                            value={bidData.maxAmount}
                            onChange={handleChange}
                            required
                            className="bid-input"
                        />
                    </FormGroup>
                )}

                <Button 
                    color="primary" 
                    type="submit"
                    className="w-100 bid-button"
                >
                    {bidData.isAutoBid ? 'Set Auto-bid' : 'Place Bid'}
                </Button>
            </Form>
        </div>
    </Card>
    )
}

AddBid.propTypes = {
    productId: PropTypes.string.isRequired,
    sellerEmail: PropTypes.string.isRequired,
}

export default AddBid