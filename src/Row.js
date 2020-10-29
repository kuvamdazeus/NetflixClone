import React, { useState, useEffect } from 'react'
import axios from './axios'
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import VPlayer from "react-player";

const movie_base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
    };

    const handleClick = (movieName) => {
        console.log(trailerUrl);
        console.log(movieName);
        if (trailerUrl) {
             setTrailerUrl('');
        } else {
            setTrailerUrl(
                movieTrailer(movieName || "")
                .then((url) => {
                    // https://www.youtube.com/watch?v=jat-a3aG3tc
                     setTrailerUrl(url);
                })
                .catch((error) => console.log(error))
            );
        }
    }

    useEffect(() => { // Runs when "Row" loads
        async function fetchData() {
            const request = await axios.get(fetchUrl); 
            setMovies(request.data.results);
            // return request;
        }
        fetchData();
    }, [fetchUrl]);

    console.log(movies);

    return (
        <div className="row">
            <h2>{ title }</h2>
            <div className="row_posters">
                {movies.map(movie => (
                    <img 
                    className="row_poster"
                    onClick={() => handleClick(movie?.name || movie?.title || movie?.original_name)}
                    src={movie_base_url + movie.poster_path}
                    alt={movie?.original_name || movie?.title || movie?.name}
                    />
                ))}
            </div>
            <div className="player">
                <center>
                    {trailerUrl && <VPlayer
                                    url={trailerUrl}
                                    config={{
                                        youtube: {
                                        playerVars: { showinfo: 1, autoplay: 1 },
                                        width: "100%",
                                        },
                                    }}
                                    />
                    }
                </center>
            </div>
        </div>
    )
}

export default Row;
