import React, { useState } from 'react'
import { Form, FormGroup, Label, Input, Navbar, Button } from 'reactstrap'
import axios from 'axios'
import { URL } from '../global'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

/**
 * This component lets you bid on a product you like.
 */

const AddBid = ({ productId, sellerEmail }) => {
    const [amount, setAmount] = useState(0)
    const handleChange = (event) => {
        setAmount(event.target.value)
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(amount)
        let response
        try {
            if (typeof window !== 'undefined') {
                if (localStorage.getItem('email') === sellerEmail) {
                    toast.error('Cannot bid on your own product!')
                } else {
                    response = await axios.post(`${URL}/bid/create`, {
                        bidAmount: amount,
                        prodId: productId,
                        email: localStorage.getItem('email'),
                    })
                    window.location.reload(false)
                    console.log(response)
                    toast.success(response.data.message)
                }
            }
        } catch (e) {
            console.log(e)
            toast.error('Error placing bid')
        }
    }
    return (
        <div style={{ marginTop: '1rem' }}>
            Add a bid for product {productId}
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="amount">Amount:</Label>
                    <Input
                        className="mx-auto"
                        style={{ width: '50%' }}
                        id="amount"
                        name="amount"
                        placeholder="Enter your bid amount here"
                        type="amount"
                        value={amount}
                        onChange={(e) => handleChange(e)}
                    />
                </FormGroup>
                <Button color="primary">Submit</Button>
            </Form>
        </div>
    )
}
AddBid.propTypes = {
    productId: PropTypes.number.isRequired,
}

export default AddBid
