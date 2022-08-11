import axios from 'axios';
import React, { useState, useEffect } from 'react'

function Home() {
    const [movies, setMovies] = useState([])
    const [tv, setTv] = useState([])
    const [people,setPeople] = useState([]);
    async function getData(mediaType, setterFunction) {
        let { data } = await axios.get('https://api.themoviedb.org/3/trending/' + mediaType + '/day?api_key=dee9eaa79a36e0a59e5eb7fa6c466f53')
        setterFunction(data.results);
    }
    useEffect(() => {
        getData('movie', setMovies);
        getData('tv', setTv);
        getData('person',setPeople);
    }, [])
    return (
        <>
            <div className="container mb-5">
                {/* Top ten trending movies */}
                <div className="row mt-5">
                    <div className="col-lg-4 col-md-4 col-sm-6 d-flex align-items-center">
                        <div>
                            <h3>Trending <br /> movies <br /> to watch now</h3>
                            <p>Lorem ipsum dolor sit amet consectetur.</p>
                        </div>
                    </div>
                    {
                        movies.slice(0, 10).map((movie, i) => {
                            return (
                                <div key={i} className="col-lg-2 col-md-4 col-sm-6">
                                    <div className='grid-block'>
                                        <h5 className='grid-title'>{movie.title}</h5>
                                        <img className='img-fluid w-100' src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} alt={movie.title}></img>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {/* Top ten trending tv shows */}
                <div className="row mt-5">
                    <div className="col-lg-4 col-md-4 col-sm-6 d-flex align-items-center">
                        <div>
                            <h3>Trending <br /> tv <br /> to watch now</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                    </div>
                    {
                        tv.slice(0, 10).map((show, i) => {
                            return (
                                <div key={i} className="col-lg-2 col-md-4 col-sm-6">
                                    <div className='grid-block'>
                                        <h5 className='grid-title'>{show.name}</h5>
                                        <img className='img-fluid w-100' src={"https://image.tmdb.org/t/p/w500/" + show.poster_path} alt={show.name}></img>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {/* Top ten trending people */}
                 {/* onError={(e)=>{e.target.onerror = null; e.target.src='./../../public/logo512.png'}} */}
                <div className="row mt-5">
                    <div className="col-lg-4 col-md-4 col-sm-6 d-flex align-items-center">
                        <div>
                            <h3>Trending <br /> People</h3>
                            <p>Lorem ipsum dolor sit amet consectetur.</p>
                        </div>
                    </div>
                    {
                        people.slice(0, 10).map((person, i) => {
                            return (
                                <div key={i} className="col-lg-2 col-md-4 col-sm-6">
                                    <div className='grid-block'>
                                        <h5 className='grid-title'>{person.name}</h5>
                                        <img className='img-fluid w-100' src={"https://image.tmdb.org/t/p/w500/" + person.profile_path} alt={person.name}></img>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default Home
