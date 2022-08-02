import axios from 'axios'
import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'

export default function SingleMovie() {
    //initializa movies
    const [movie, setMovie] = useState({})
    async function getSingleMovie(movieId) {
        let { data } = await axios.get('https://api.themoviedb.org/3/movie/'+movieId+'?api_key=dee9eaa79a36e0a59e5eb7fa6c466f53&language=en-US')
        setMovie(data);
    }
    let routParams=useParams()
    useEffect(() => {
        getSingleMovie(routParams.movieId);
    }, [])
    return (
        <>
            <div className="container my-5">
                <div className="row">
                    <div className="col-lg-4 col-md-5 col-sm-6">
                        <img
                            className="img-fluid w-100" alt={"movie" + movie.poster_path}
                            src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
                        ></img>
                    </div>
                    <div className="col-lg-8 col-md-7 col-sm-6 d-flex align-items-center">
                        <div>
                            <h3>{movie.title}</h3>
                            <p className='py-3'>{movie.overview}</p>
                            <span>Language : </span>
                            <label className='p-1 bg-info'>{movie.original_language}</label>
                            <span className='ms-3'>Period : </span>
                            <label className='p-1 bg-info'>{movie.runtime} min</label>
                            <span className='ms-3'>Release date : </span>
                            <label className='p-1 bg-info'>{movie.release_date}</label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
