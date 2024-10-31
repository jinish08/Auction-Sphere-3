import axios from "axios";
import { URL } from "../global";
import { toast } from "react-toastify";
import React, { useEffect, useState} from 'react';
import { CardGroup, Row } from 'reactstrap';
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
          <><div>
            <p>First name: {data.first_name}</p>
            <p>Last name: {data.last_name}</p>
            <p>Email id: {data.email}</p>
            <p>Contact number: {data.contact_no}</p>
            <p>Number of products displayed: {data.no_products}</p>
            <p>You have bid on:{data.no_bids} products</p>
          </div>
          <p>Products put for sale:</p>
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
            </Row></>
        ) : (
          <p>Loading data...</p>
        )}
      </div></>
    )
}

export default Profile