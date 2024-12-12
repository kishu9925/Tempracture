import React, { useEffect, useState } from "react";


const Tempapp = () => {

    const [city, setCity] = useState(null);
    const [search, setSearch] = useState("Mumbai");

    // useEffect(() => {
    //     const fetchApi = async() => {
    //         const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=8923661d8f6d8c781a598bbcb9e86b8c`
    //         const response = await fetch (url);
    //         const resJson = await response.json();
    //         // console.log(response);
    //         setCity(resJson.main );
    //     };

    //     fetchApi();
    // },[setSearch])

    useEffect(() => {
    const fetchApi = async () => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=8923661d8f6d8c781a598bbcb9e86b8c`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("City not found");
            }
            const resJson = await response.json();
            setCity(resJson.main);
        } catch (error) {
            console.error(error);
            setCity(null); // Reset city data if the city is not found
        }
    };

    fetchApi();
}, [search]); // Correct dependency

    return (
        <>
            <div className="box">
                <div className="inputData">
                    <input 
                    type='search'
                    value={search}
                    className="inputField"
                    onChange={ (event) => {setSearch(event.target.value)}}
                    />
                </div>
            {!city ? (
                <p className="errorMsg"> No Data Found!</p>
            ):(
                <>
                <div className="info">
                    <h2 className="location">
                    <i className="fa-solid fa-street-view"></i> {search}
                    </h2>
                    <h1 className="temp">
                     {city.temp}°cel
                    </h1>
                    <h3 className="tempmin_max"> Min:{city.temp_min}°cel | Max:{city.temp_max}°cel </h3>
                </div>
                <div className="wave -one"> </div>
                <div className="wave -two"> </div>
                <div className="wave -three"> </div>
                </>)

            }
                
            </div>
            
        </>
    )
}

export default Tempapp;