import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./spotify.css";
import axios from "axios";

export default function SpotifyPage(props) {

    /*Spotify Login - OAuth*/
    const CLIENT_ID = "c67a0f8f23d84a63aec52a3c42cda937";
    const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
    const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/spotify";
    const SPACE_DELIMITER = "%20";
    const SCOPES = [
        "user-read-currently-playing",
        "user-read-playback-state",
        "playlist-read-private",
      ];
    
    const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

    /*
    http://localhost:3000/spotify#access_token=BQBbFXT7S6TQdZkEfLZeaPALX8yBhmbhr4SLwt2CwbYjRiKM4ynp-904TqNpoOR1VySCkaCPXgsl4sWDml-1FALeSXtqNs_JdG1W0DzlvPBwBUoeI_nh4jHD__i4YKeQnt8RKKOohIsHGtojM8IAqjrTHA1yomtvJ26JWpOoRKGgJRmA68KK2Tg-Pz0hH-tHQ_cR&token_type=Bearer&expires_in=3600
    */
    const getReturnedParamsFromSpotifyAuth = (hash) => {
        const stringAfterHashtag = hash.substring(1);
        const paramsInUrl = stringAfterHashtag.split("&");
        const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
        //   console.log(currentValue);
          const [key, value] = currentValue.split("=");
          accumulater[key] = value;
          return accumulater;
        }, {});
      
        return paramsSplitUp;
    };

    useEffect(() => {
        if (window.location.hash) {
          const { access_token, expires_in, token_type } =
            getReturnedParamsFromSpotifyAuth(window.location.hash);
    
          localStorage.clear();
    
          localStorage.setItem("accessToken", access_token);
          localStorage.setItem("tokenType", token_type);
          localStorage.setItem("expiresIn", expires_in);
        }
    });

    const handleLogin = () => {
        window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
    };

    /*Spotify Get Playlist*/
    const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

    const [token, setToken] = useState("");
    const [data, setData] = useState({});
    const [searchKey, setSearchKey] = useState("");
    const [playlistID, setPlaylistID] = useState("");

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
          setToken(localStorage.getItem("accessToken"));
        }
    }, []);

    const handleGetPlaylists = () => {
        // console.log(searchKey);
        axios
          .get(PLAYLISTS_ENDPOINT, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            const responseData = response.data;
            setData(response.data);
            responseData.items.forEach((item) => {
                if (item.name === searchKey) {
                    // console.log("name: " + item.name);
                    // console.log("key: " + searchKey);
                    // console.log("id: " + item.id);
                    setPlaylistID(item.id);
                }
            });
          })
          .catch((error) => {
            console.log(error);
          });
    };

    return (
        <div>
            <main>
                <h2>Spotify Page</h2>
                <nav>
                    <ul className="menu mb-3 d-flex justify-content-end">
                        <li><Link to='/homepage'>Home</Link></li>
                        <li><Link to='/taskmanager'>Task Manager</Link></li>
                        <li><Link to='/spotify'>Spotify Page</Link></li>
                        <li><Link to='/stats'>Stats Page</Link></li>
                    </ul>
                </nav>

                <h1>Spotify React</h1>
                <button onClick={handleLogin}>login to spotify</button>
                <form onSubmit={handleGetPlaylists}>
                       <input type="text" onChange={e => setSearchKey(e.target.value)}/>
                       <button type={"submit"}>Get Playlist</button>
                </form>


                <br></br>
                <br></br>
                
                
                <iframe
                    title="Spotify Embed: Recommendation Playlist "
                    src={`https://open.spotify.com/embed/playlist/${playlistID}?utm_source=generator&theme=0`}
                    // src={`https://open.spotify.com/embed/playlist/4gUJbOq4PutuUUIGQQqHRi?utm_source=generator&theme=0`}
                    width="100%"
                    height="100%"
                    style={{ minHeight: '360px' }}
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                />
            </main>
        </div>
    )
}