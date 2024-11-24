import React, { useState, useCallback } from 'react'
import { Form, FormGroup, Label, Input, Navbar, Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import Navv from './Navv'
import Footer from './Footer'
import { URL } from '../global'
import axios from 'axios'
import { toast } from 'react-toastify'

const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (event) => {
            resolve(event.target.result)
        }
        reader.onerror = (error) => {
            reject(error)
        }

        reader.readAsDataURL(file)
    })

const Sell = () => {
    const navigate = useNavigate()
    const [encodedImages, setEncodedImages] = useState()
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (typeof window !== 'undefined')
            formData.sellerEmail = localStorage.getItem('email')

        formData.photo = encodedImages
        console.log(formData)
        let response
        try {
            response = await axios.post(`${URL}/product/create`, formData)
            console.log('POST RESPONSE')
            console.log(response)
            setFormData({
                productName: '',
                initialPrice: '',
                increment: '',
                datePosted: Date.now(),
                description: '',
                biddingTime: '',
                photo: '',
                category: '',
                buyNowPrice: '',
            })
            toast.success(response.data.result)
            navigate('/products')
        } catch (e) {
            console.log(e)
            toast.error('Something went wrong')
        }
    }

    const [formData, setFormData] = useState({
        productName: '',
        initialPrice: '',
        increment: '',
        datePosted: Date.now(),
        description: '',
        biddingTime: '',
        category: '',
        buyNowPrice: '',
    })

    const handleFileInputChange = useCallback(async (acceptedFiles) => {
        for (let i = 0; i < acceptedFiles.target.files.length; i++) {
            let file = acceptedFiles.target.files[i]
            console.log(file)
            let base64EncodedImage = await toBase64(file)
            setEncodedImages(base64EncodedImage)
            console.log('Base64: ' + base64EncodedImage)
        }
    }, [])

    const categories = [
        'Electronics',
        'Collectibles & Art',
        'Fashion',
        'Home & Garden',
        'Sports & Outdoor',
        'Vehicles',
        'Jewelry & Watches'
    ]

    return (
        <body
            style={{
                background: 'linear-gradient(30deg, #020024, #090979,#94bbe9)',
                position: 'fixed',
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
            }}
        >
            <div>
                <Navv />

                <Form
                    onSubmit={handleSubmit}
                    style={{
                        margin: '10rem',
                        background: 'White',
                        padding: 10,
                    }}
                >
                    <h4>Sell a product</h4>
                    <FormGroup>
                        <Label for="ProductName">Product Name</Label>
                        <Input
                            id="ProductName"
                            name="productName"
                            placeholder="Enter a cool name for your item here"
                            type="text"
                            value={formData.productName}
                            onChange={(e) => handleChange(e)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="category">Category</Label>
                        <Input
                            id="category"
                            name="category"
                            type="select"
                            value={formData.category}
                            onChange={(e) => handleChange(e)}
                        >
                            <option value="">Select a category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="initialPrice">Minimum Price</Label>
                        <Input
                            id="initialPrice"
                            name="initialPrice"
                            placeholder="There's no way I'm selling for less than this!"
                            type="text"
                            value={formData.initialPrice}
                            onChange={(e) => handleChange(e)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="Increment">Increment</Label>
                        <Input
                            id="Increment"
                            name="increment"
                            placeholder="What's the minimum by which you'd like a new bid to win?"
                            type="number"
                            value={formData.increment}
                            onChange={(e) => handleChange(e)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="Description">Description</Label>
                        <Input
                            id="Description"
                            name="description"
                            placeholder="Enter an interesting description for your item here"
                            type="text"
                            value={formData.description}
                            onChange={(e) => handleChange(e)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="biddingTime">Bidding Time (in days)</Label>
                        <Input
                            id="biddingTime"
                            name="biddingTime"
                            placeholder="Bidding window closes in..."
                            type="number"
                            value={formData.biddingTime}
                            onChange={(e) => handleChange(e)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="buyNowPrice">Buy Now Price (Optional)</Label>
                        <Input
                            id="buyNowPrice"
                            name="buyNowPrice"
                            placeholder="Set a price for instant purchase"
                            type="number"
                            value={formData.buyNowPrice}
                            onChange={(e) => handleChange(e)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Upload Image of the product</Label>
                        <Input
                            type="file"
                            name="file"
                            onChange={(e) => handleFileInputChange(e)}
                            accept="image/*"
                        />
                    </FormGroup>
                    <Button color="primary">Submit</Button>
                </Form>
                <Footer />
            </div>
        </body>
    )
}

export default Sell