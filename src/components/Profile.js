import axios from "axios";
import { URL } from "../global";
import { toast } from "react-toastify";
import React, { useEffect, useState} from 'react';
import { Card, CardGroup, Row } from 'reactstrap';
import ProductCard from './ProductCard';
import Navv from "./Navv";

const Profile = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
    const fetchData = async () => {
        try{
        const response = await axios.post(`${URL}/profile`)
        console.log(response.data)
        setData(response.data)
    }
    catch (e)
    {
        toast.error(e)
    }
    };
    fetchData();
}, []);
    return(
      <><Navv /><div>
        {data ? (
          <>
          <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '5px', padding: '15px'}}>
            <h3>Your information(Dont't worry, the password is not shown):</h3>
            <p style={{fontSize: '16px', lineHeight: 1.5, fontWeight: 'bold'}}>First name: {data.first_name}</p>
            <p style={{fontSize: '16px', lineHeight: 1.5, fontWeight: 'bold'}}>Last name: {data.last_name}</p>
            <p style={{fontSize: '16px', lineHeight: 1.5, fontWeight: 'bold'}}>Email id: {data.email}</p>
            <p style={{fontSize: '16px', lineHeight: 1.5, fontWeight: 'bold'}}>Contact number: {data.contact_no}</p>
            <p style={{fontSize: '16px', lineHeight: 1.5, fontWeight: 'bold'}}>Number of products put for sale: {data.no_products} product(s)</p>
            <p style={{fontSize: '16px', lineHeight: 1.5, fontWeight: 'bold'}}>You have bid on: {data.no_bids} product(s)</p>
          </div>
          <p style={{fontSize: '16px', lineHeight: 1.5, fontWeight: 'bold'}}>Products put for sale:</p>
          <Row>
              {data && data.products ? (
                data.products.map((product, index) => (
                  <ProductCard
                    key={index}
                    product={product}
                    maxBid={data.maximum_bids[index]}
                    name={data.names[index]} />
                ))
              ) : (
                <div>No products found</div>
              )}
            </Row>
            <p style={{fontSize: '16px', lineHeight: 1.5, fontWeight: 'bold'}}>Products you have bid on:</p>
            <Row>
                {data && data.bid_products ? (
                  data.bid_products.map((product, index) => (
                    <ProductCard
                      key={index}
                      product={product}
                      maxBid={data.bid_bids[index]}
                      name={data.bid_names[index]} />
                  ))
                ) : (
                  <div>No products found</div>
                )}
              </Row></>
        ) : (
          <p>Loading data...</p>
        )}
      </div></>
    )
}

export default Profile