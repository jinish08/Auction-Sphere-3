import axios from "axios";
import { URL } from "../global";
import { toast } from "react-toastify";
import React, { useEffect, useState} from 'react';
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
          <div>
            <p>First name: {data.first_name}</p>
            <p>Last name: {data.last_name}</p>
            <p>Email id: {data.email}</p>
            <p>Contact number: {data.contact_no}</p>
            <p>Number of products displayed: {data.products}</p>
            <p>You have bid on:{data.bids} products</p>
          </div>
        ) : (
          <p>Loading data...</p>
        )}
      </div></>
    )
}

export default Profile