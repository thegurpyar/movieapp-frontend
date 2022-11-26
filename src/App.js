import React, {  useState} from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { Movie } from "./Movie/Movie";
import {NavigationBar} from "./Navbar/Navbar";
import { TvComponent } from "./TvComponent/Tv";
import {SingleMovie} from "./SingleMovie/SingleMovie";
function App() {
  const[url,setUrl]=useState("https://api.themoviedb.org/3/discover/movie?api_key=bdd092358a96e1bb8e200d5276d1eb1f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=")
  const [tvUrl,setTvurl]=useState("https://api.themoviedb.org/3/tv/popular?api_key=bdd092358a96e1bb8e200d5276d1eb1f")
  const[user,getUser]=useState({})

  return (
    <div className="App">

      <BrowserRouter>
      <Routes>

      <Route exact path ="/" element ={user.username && user.email ?
      

        <><NavigationBar user={user.username} getUser={getUser} url={url} setUrl={setUrl} tvurl={tvUrl} setTvurl={setTvurl} />
        <Movie url={url} setUrl={setUrl} name={"movies"} /></>        :
        <Login user={user} getUser={getUser}/>} />


        <Route exact path ="/tv" element ={user && user.email  ?
          <><NavigationBar user={user.name} url={url} setUrl={setUrl} tvurl={tvUrl} setTvurl={setTvurl}/>
          <TvComponent tvurl={tvUrl} setTvurl={setTvurl}/></>        :
          <Login user={user} getUser={getUser}/>} />
        
      <Route path="/register" element={<Register />} />
      <Route exact path="/singlemovie" element={<SingleMovie user={user._id} />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
