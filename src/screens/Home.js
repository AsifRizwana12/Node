import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Carousal from '../components/Carousal';

export default function Home() {
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);
    const [search, setSearch] = useState('')

    const loadData = async () => {
        try {
            let response = await fetch("http://localhost:5000/api/foodData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                const data = await response.json();
                setFoodItem(data[0]);
                setFoodCat(data[1]);
            } else {
                console.error("Error fetching data:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    console.log(foodItem);

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <div>
                <Navbar />
                <div><div id="carouselExampleFade" className="carousel slide carousel-fade" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" id='carousel'>
                        <div className="carousel-caption " style={{ zIndex: "10" }}>
                            <div className="d-flex justify-content-center">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                                <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
                            </div>      </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div></div>
                <div className='container'>
                    {foodCat.length !== 0 ? (
                        foodCat.map((data) => (
                            <div key={data._id} className='fs-5 m-1'>
                                <div className='fs-1 fw-bold'>{data.CategoryName}</div>
                                <hr />
                                <div className='row g-2 '>
                                    {foodItem.length !== 0 ? (
                                        foodItem
                                            .filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                                            .map((filterItem) => (
                                                <div key={filterItem._id} className='col-12 col-md-6 col-lg-3' style={{ margin: '25px' }}>
                                               
                                                    <Card foodItem={filterItem}
                                                        options={filterItem.options[0]}
                                                         />
                                                </div>
                                            ))
                                    ) : (
                                        <div>No Such Data</div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>No Data Available</div>
                    )}
                </div>
                <Footer />
            </div>
        </>
    );
}
