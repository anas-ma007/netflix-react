import { useEffect, useState } from 'react';
import React from 'react'
import './RowPost.css'
import axios from '../../axios'
import { imageUrl,API_KEY } from '../../constants/constants'
import Youtube from 'react-youtube'

function RowPost(props) {
    const [movies, setMovies] = useState([])
    const [urlId, setUrlId]= useState("")
    useEffect(() => {
        axios.get(props.url).then(response => {
            console.log(response.data, "row console");
            setMovies(response.data.results)
        }).catch(err => {
            alert('network Error')
        })
    }, [])
    const handleMovie= (id)=>{
        console.log(id, "movie id");
        axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
            console.log(response.data,"youtube videos array");
            if(response.data.results.length!==0){
                setUrlId(response.data.results[0])

            } else {
                console.log('Videos not available');
            }
        
        })


    }
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };
    return (
        <div className='row'>
            <h2>{props.title}</h2>
            <div className='posters'>
                {movies.map((obj) =>
                    <img onClick={()=>handleMovie(obj.id)} className={props.isSmall ? 'smallPoster' : 'poster'} alt="poster" src={`${imageUrl + obj.backdrop_path}`} />
                )}
            </div>

           { urlId && <Youtube opts={opts} videoId={urlId.key} />}



        </div>
    )
}

export default RowPost