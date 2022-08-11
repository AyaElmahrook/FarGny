import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate'
import {Link } from 'react-router-dom'

export default function Movies() {
  //use state hooke to get movies in site
  const [movies, setMovies] = useState([]);
  async function getMovies() {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=dee9eaa79a36e0a59e5eb7fa6c466f53"
    );
    setMovies(data.results);
  }
  useEffect(() => {
    getMovies();
  }, []);

  //initialize (pagination variables) page counter, no of results per page, offset pages counter
  const [currentPage, setCurrentPage] = useState(0);
  const PER_PAGE = 10;
  const offset = currentPage * PER_PAGE;
  const pageCounter = Math.ceil(movies.length / PER_PAGE);
  // Invoke when user click to request another page.
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
//Dynamic run time search
const [filteredMovies, setFilteredMovies] = useState([]);
function findMovie(evt){
  if(evt.target.value !== ""){
    let searchMovies=movies.filter((movie)=>{return movie.title.toLowerCase().includes(evt.target.value.toLowerCase())});
    setFilteredMovies(searchMovies);
  }
  else clearMovies();
}
//remove filtered list
function clearMovies(){
  let searchMovies=[];
  setFilteredMovies(searchMovies);
}
//
function changeSearchValue(e){
  let element=document.querySelector("#txtSearchMovies")
  element.value=e.target.innerText;
  element.dispatchEvent(new Event('input', { bubbles: true}));
}
useEffect(() => {
  //console.log(filteredMovies);
}, [filteredMovies]);
  return (
    <>
      <div className="container my-2">
        <div className="d-flex justify-content-center position-relative">
          <input id="txtSearchMovies" className="form-control w-50 mt-2 mx-2" placeholder="search movies" type="search"
                  onInput={(eventInfo)=>{return findMovie(eventInfo)}} /* onBlur={()=>{return clearMovies()}} *//>
                {(filteredMovies.length !== 0)? <ul className='search-list position-absolute top-100 start-50 list-group text-bg-light'>
                {filteredMovies.map((filteredMovie,i)=> <li key={i} onClick={(evt)=> changeSearchValue(evt)} className='list-group-item px-2'>{filteredMovie.title}</li>)}              
                  </ul>:""}
        </div>
        {/* Top ten trending movies */}
        <div className="row my-3">
          <div className="col-lg-4 col-md-4 col-sm-6 d-flex align-items-center">
            <div>
              <h3>UpComming <br /> Movies <br /></h3>
              <p>Lorem ipsum dolor.</p>
            </div>
          </div>
          {(filteredMovies.length !== 0)?filteredMovies.slice(offset, offset + PER_PAGE).map((movie, i) => {
            return (
              <div key={i} className="col-lg-2 col-md-4 col-sm-6">
                <div className='grid-block'>
                  <h5 className='grid-title'>{movie.title}</h5>
                  <Link to={'/singleMovie/'+movie.id}>
                    <img
                      className="img-fluid w-100" alt={"movie" + movie.poster_path}
                      src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
                    ></img>
                  </Link>
                </div>
              </div>
            );
          }):movies.slice(offset, offset + PER_PAGE).map((movie, i) => {
            return (
              <div key={i} className="col-lg-2 col-md-4 col-sm-6">
                <div className='grid-block'>
                  <h5 className='grid-title'>{movie.title}</h5>
                  <Link to={'/singleMovie/'+movie.id}>
                    <img
                      className="img-fluid w-100" alt={"movie" + movie.poster_path}
                      src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
                    ></img>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ReactPaginate
        previousLabel="Per"
        breakLabel="..."
        nextLabel="Nex"
        pageCount={pageCounter}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previosClassName={"pagination-link"}
        nextClassName={"pagination-link"}
        activeClassName={"pagination-link-active"}
        disabledClassName={"pagination-link-disabled"}
        pageRangeDisplayed={5}
        renderOnZeroPageCount={null}
      />
    </>
  );
}
