import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Navv from './Navv'
import ProductCard from './ProductCard'
import { URL } from '../global'
import axios from 'axios'
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap'
import { toast } from 'react-toastify'

const Products = () => {
    const [apiData, setApiData] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('All')

    const categories = [
        'All',
        'Electronics',
        'Collectibles & Art',
        'Fashion',
        'Home & Garden',
        'Sports & Outdoor',
        'Vehicles',
        'Jewelry & Watches'
    ]

    const getProducts = async () => {
        try {
            let data = await axios.get(`${URL}/getLatestProducts`)
            console.log(data.data)
            setApiData(data.data)
            setFilteredProducts(data.data.products)
        } catch (error) {
            toast.error('Something went wrong')
            console.log(error)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value)
    }

    useEffect(() => {
        if (selectedCategory === 'All') {
            setFilteredProducts(apiData.products)
        } else {
            const filtered = apiData.products.filter(product => 
                product[8] === selectedCategory // Assuming category is at index 8
            )
            setFilteredProducts(filtered)
        }
    }, [selectedCategory, apiData])

    return (
        <>
            <div
                style={{
                    background: 'linear-gradient(30deg, #020024, #090979,#94bbe9)',
                    backgroundAttachment: 'scroll',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    minHeight: '100vh',
                }}
            >
                <Navv />
                <Row style={{ margin: '5rem' }}>
                    <Col md={12} className="mb-4">
                        <Form>
                            <FormGroup>
                                <Label for="categoryFilter">Filter by Category</Label>
                                <Input
                                    type="select"
                                    name="categoryFilter"
                                    id="categoryFilter"
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                >
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col md={12}>
                        <Row>
                            {filteredProducts && filteredProducts.length > 0 ? (
                                filteredProducts.map((product, index) => (
                                    <Col md={3} key={index} className="mb-4">
                                        <ProductCard    
                                            product={product}
                                            maxBid={apiData.maximumBids[index]}
                                            name={apiData.names[index]}
                                        />
                                    </Col>
                                ))
                            ) : (
                                <Col md={12}>
                                    <div>No products found</div>
                                </Col>
                            )}
                        </Row>
                    </Col>
                </Row>
                <Footer />
            </div>
        </>
    )
}

export default Products