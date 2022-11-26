import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import "./singlemovie.css";
import ReactPlayer from 'react-player';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
//title for movie and name for tv
export const SingleMovie=(props)=>{
    const imgUrl="https://image.tmdb.org/t/p/w500/"
    const backDropUrl="https://image.tmdb.org/t/p/w1280/"
    const trailerLink="https://www.youtube.com/watch?v="
    const userId=props.user
    const location = useLocation()
    const id = location.state.id
    const type=location.state.type
    const [movie,setMovie]=useState()
    const [dp,setDp]=useState(false)
    const[exist,setExist]=useState(false)
    useEffect(()=>{
      if (type==="movies"){
        axios.get("https://api.themoviedb.org/3/movie/"+id+"?api_key=bdd092358a96e1bb8e200d5276d1eb1f&language=en-US&append_to_response=videos")
        .then((res)=>{setMovie(res.data)})
        .catch((error)=>{console.log(error)});

        axios.get("http://localhost:5000/movies",{params:{userId:userId,id:id}})
        .then((res)=>{if(res.data.message){setExist(true)}})
        }
      if (type==="tv"){
        axios.get("https://api.themoviedb.org/3/tv/"+id+"?api_key=bdd092358a96e1bb8e200d5276d1eb1f&language=en-US&append_to_response=videos")
        .then((res)=>setMovie(res.data))
        .catch((error)=>{console.log(error)});

        axios.get("http://localhost:5000/tv",{params:{userId:userId,id:id}})
        .then((res)=>{if(res.data.message){setExist(true)}})
        }
      },[]
    )

    const submitMovie = ()=>{
      const movieId=movie.id
      if (exist){
        axios.patch("http://localhost:5000/"+type,{      //delete movie form watch list
          userId:userId,movieId:movieId
        })
        .then((res)=>{setExist(false)})

      }else{
        axios.post("http://localhost:5000/"+type,{
          userId:userId,movieId:movieId
        })
        .then((res)=>{setExist(true)})

      }

    }
    {/* <img className="backgroundimg"src={backDropUrl+movie.backdrop_path} alt="" /> */}
   
    return (
        <div className="container">
        
        {movie ? 
        
   
        <div className="row singlemovie">
          <div className="col-lg-6 md-6">
        <img className="posterimg"src={imgUrl+movie.poster_path} alt="" /> 
        </div>
        
        <div className="col-lg-6 md-6 " >
        {type==="movies"?
        <h3>{movie.title}</h3>:<h3>{movie.name}</h3>}
        
        {exist ? <RemoveCircleIcon className="trailer-button" onClick={submitMovie}/> :
        
        <WatchLaterIcon className="trailer-button" onClick={submitMovie}/>
        }
        {movie.overview ? <PlayCircleIcon className="trailer-button"  onClick={()=>setDp(!dp)}/> : null}
        
        <p>{movie.genres.map(genre=>{
          if (movie.genres.indexOf(genre)<movie.genres.length-1){
            return genre.name+","

          }else{
            return genre.name
          } })}</p>
          
        <h6>{movie.tagline}</h6>
        
        <h3>Overview</h3>
        
        <div style={{fontFamily:"Cabin', sans-serif"}}>{movie.overview}</div>
        
        {dp && movie.videos?<div className="trailer"><ReactPlayer 
        url={trailerLink+movie.videos.results[0].key} />
        </div>:null }
        </div>
        </div>
        
      : null }
        </div>
    )

}
