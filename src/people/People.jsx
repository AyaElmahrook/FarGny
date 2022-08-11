import axios from 'axios'
import React, { useState, useEffect } from 'react'

export default function People() {
  //Declare use state hooke to get people in site
  const [people, setpeople] = useState([])
  //fetch people using axios from movie database api
  async function getPeople() {
    let { data } = await axios.get('https://api.themoviedb.org/3/trending/person/day?api_key=dee9eaa79a36e0a59e5eb7fa6c466f53')
    setpeople(data.results);
    console.log(data.results);
  }
  useEffect(() => {
    getPeople();
  }, [])

  return (
    <>
      <div className="container my-5">
        <div className="row">
          {people.map((person,i)=>{return(
            <div key={i} className="col-lg-2 col-md-4 col-sm-6 grid-block">
              <h5 className='grid-title'>{person.name}</h5>
              <img src={"https://image.tmdb.org/t/p/w500"+person.profile_path} alt={person.name} className='img-fluid w-100'></img>
            </div>
          )})}
        </div>
      </div>
    </>
  )
}
