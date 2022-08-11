import axios from 'axios';
import React,{useState, useEffect} from 'react'
import ReactPaginate from 'react-paginate';

export default function TvShows() {
    //initialize usestate hook for getting tv shows
    const [tvShows, setTvShows] = useState([]);
    async function getTvShows(){
        let {data}=await axios.get('https://api.themoviedb.org/3/tv/on_the_air?api_key=dee9eaa79a36e0a59e5eb7fa6c466f53&language=en-US&page=1');
        console.log(data.results);
        setTvShows(data.results)
    }
    useEffect(() => {
        getTvShows()    
    }, []);
    //initialize (pagination variables) page counter, no of results per page, offset pages counter
    const [currentPage, setCurrentPage] = useState(0);
    const PER_PAGE=10;
    const offset=currentPage*PER_PAGE;
    const pageCounter=Math.ceil(tvShows.length/PER_PAGE);
    // Invoke when user click to request another page.
  function handlePageClick({selected:selectedPage}){
    setCurrentPage(selectedPage);
  } 
    
  return (
    <>
    <div className="container mt-5">
        <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-6 d-flex align-items-center">
                        <div>
                            <h3>TV <br /> On The Air </h3>
                            <p>Lorem ipsum dolor.</p>
                        </div>
                    </div>
        {tvShows.slice(offset,offset+PER_PAGE).map((tvShow,i)=>{return(
            <div key={i} className="col-lg-2 col-md-4 col-sm-6 grid-block">
                <h5 className='grid-title'>{tvShow.name}</h5>
                <img src={"https://image.tmdb.org/t/p/w500"+tvShow.poster_path} alt={"tv show "+i} className='img-fluid w-100'></img>
            </div>
        )})}
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
    </div>
    </>
  )
}
