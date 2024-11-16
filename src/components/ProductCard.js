import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardText,
    Button,
    Badge,
} from 'reactstrap'
import PropTypes from 'prop-types'
import axios from 'axios'
import { URL } from '../global'
import '../css/card.css'
import { toast } from 'react-toastify'

const ProductCard = ({ product, maxBid, name }) => {
    const [url, setUrl] = useState(`/details/${product[0]}`)
    const [image, setImage] = useState('https://picsum.photos/900/180')

    const fetchImage = async () => {
        try {
            const response = await axios.post(`${URL}/product/getImage`, {
                productID: product[0],
            })
            console.log(response)
            setImage(response.data.result[0])
        } catch (e) {
            toast.error(e)
        }
    }
    useEffect(() => {
        fetchImage()
    }, [])

    return (
        <>
            <Card className="card">
                <CardTitle tag="h3" style={{ textAlign: 'center' }}>
                    {product[1]}
                </CardTitle>
                <Badge color="info" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    {product[8]} {/* Assuming category is at index 8 */}
                </Badge>
                <hr />
                <CardImg
                    className="mx-auto"
                    src={image}
                    style={{ width: '50%', textAlign: 'center' }}
                />
                <CardBody>
                    <CardText>Seller: {product[2]}</CardText>
                    <CardText>Minimum price: ${product[3]}</CardText>
                    <CardText>
                        Current highest bids: ${maxBid === -1 ? 'N/A' : maxBid}
                    </CardText>
                    <CardText>Current highest bidder: {name}</CardText>
                    <Button color="warning" href={url}>
                        Details
                    </Button>
                </CardBody>
            </Card>
        </>
    )
}

ProductCard.propTypes = {
    product: PropTypes.array.isRequired,
    maxBid: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
}

export default ProductCard