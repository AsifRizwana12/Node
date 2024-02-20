import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {

    const [orderData, setorderData] = useState({})

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
        await fetch("http://localhost:5000/api/myOrderData", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email:localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setorderData(response)
        })



        // await res.map((data)=>{
        //    console.log(data)
        // })


    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <div className='row'>

                {Array.isArray(orderData) && orderData.map(data => (
    <div key={data.id}> {/* Assuming 'id' is the unique key for each data item */}
        {data.order_data.map((item, index) => (
            <div key={index}>
                <img src={item.img} alt={item.name} />
                <h3>{item.name}</h3>
                <p>Quantity: {item.qty}</p>
                <p>Size: {item.size}</p>
                <p>Price: ₹{item.price}/-</p>
            </div>
        ))}
    </div>
))}

                </div>


            </div>

            <Footer />
        </div>
    )
}
