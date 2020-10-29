import React, { useState, useEffect } from 'react'
import axios from './axios';
import requests from './requests';
import './Banner.css';

function Banner() {
    const [movie, setMovie] = useState([]);
    const banner_base_url = 'https://image.tmdb.org/t/p/original/';

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            const bannerMovie = request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
            ];
            setMovie(bannerMovie);
            return request;
        }
        fetchData();
    }, [])
    return (
        <header className="banner" style={{
            backgroundSize: "cover",
            backgroundImage: `url("${banner_base_url}${movie?.backdrop_path}")`,
            backgroundPosition: "center center",
        }}>
            <div className="banner_contents">
                <h1>
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div>
                    <button className="banner_buttons">Play</button>
                    <button className="banner_buttons">My List</button>
                </div>
            </div>

        </header>
    )
}

export default Banner
