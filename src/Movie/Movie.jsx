import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./movie.css";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
export const Movie = (props)=>{
    const navigateStyles={
      fontSize:"6vh",
    }

    const navigate=useNavigate()
    const imgurl="https://image.tmdb.org/t/p/w500/"
    const [movies,setmovies]=useState([])
    useEffect(()=>{
        axios.get(props.url)
        .then((res)=>setmovies(res.data.results))  
    },[props.url])

    const[currentPage,setCurrentPage]=useState(1)
    console.log(props.url)
    const newPage=()=>{
      setCurrentPage(currentPage+1)
      const page="&page="+currentPage
      const nextPage="&page="+(currentPage+1)
      const newUrl=props.url.replace(page,nextPage)
      if (props.name==="movies"){
        props.setUrl(newUrl)
        props.setGenre("new")
      }else{
        props.setTvurl(newUrl)
      }
    }
    const prevPage=()=>{
      setCurrentPage(currentPage-1)
      const page="&page="+currentPage
      const nextPage="&page="+Math.abs(currentPage-1)
      console.log(nextPage)
      const newUrl=props.url.replace(page,nextPage)
      if (props.name==="movies"){
        props.setUrl(newUrl)
      }else{
        props.setTvurl(newUrl)
      }
    
    }
    return (
        <div className="container moviebox" >
          <div className="row " >
            
           {movies.map(movie=><div className="col " style={{marginTop:"20px"}} key={movie.id}>
            <div className="card" style={{width: "12rem"}} onClick={()=>navigate("/singlemovie",{state:{id:movie.id,type:props.name}})}>
            <img  src={imgurl+movie.poster_path} alt="Card " />
            
            <div className="overlay" style={{color:"#00A3FF"}}>
              {movie.overview === "" ? "No info available ........." : movie.overview.substring(0,145)+"..."}
              </div>
            <div className="card-body" style={{height:"70px",textAlign:"center"}}>
              <p className="card-text">
                {props.name==="movies" ? movie.title.substring(0,30) : movie.name.substring(0,30)}
                </p>
            </div>
          </div>
          </div>
          )}

          </div>
          <div className="navigatebutton">
          {currentPage<500 ?<NavigateNextIcon onClick={newPage} style={navigateStyles}/>:null }
          {currentPage}
          {currentPage>1 ?<NavigateBeforeIcon onClick={prevPage} style={navigateStyles}/>:null }
          </div>

        </div>
    )
}