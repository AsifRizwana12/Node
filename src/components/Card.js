import React,{useEffect, useState,useRef} from 'react'
import { useDispatchCart,useCart } from './ContextReducer';

export default function Card(props) {
    let dispatch = useDispatchCart()
    const priceRef = useRef()
    let data=useCart()
    let options = props.options;
    let priceOptions = Object.keys(options)
    const[qty,setQty]=useState(1)
    const[size,setSize]=useState("")


    const handleAddtoCart = async () => {
        // Convert the selected quantity to an integer before setting the state
        const selectedQty = parseInt(qty);
        
    
        let food = [];
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }
    
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: selectedQty });
                return;
            } else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: selectedQty, size: size, img: props.ImgSrc });
            }
        }
        console.log(data);
    }
    
    let finalPrice = qty*parseInt(options[size])
    useEffect(()=>
    {
        setSize(priceRef.current.value)
    },[])
    return (
        <div>
            <div className="card mt-3 text-black" style={{ "width": "20rem", "maxHeight": "400px" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{height:"120px",objectFit:"fix"}}/>
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className='container w-100'>
                        <select className='m-2 h-100  bg-success' onChange={(e)=>setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>

                        <select className='m-2 h-100  bg-success rounded' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                            {priceOptions.map((data)=>
                            {
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>
                        <div className='d-inline h-100 fs-5'>
                        ₹{finalPrice}/-
                        </div>
                        <hr>
                        </hr>
                        <button className='btn btn-success justify-center ms-2' onClick={handleAddtoCart}>Add to Cart</button>
                        
                    </div>

                </div>
            </div>
        </div>
    )
}
