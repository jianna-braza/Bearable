import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./spotify.css";
import axios from "axios";
import musicNote from "./assets/musicNote.png";

export default function SpotifyPage(props) {

    // spotify api code from these two videos:
    // https://www.youtube.com/watch?v=G_WFk4wg9fk
    // https://www.youtube.com/watch?v=dGFUQf5pcpk

    /*Spotify Login - OAuth*/
    const CLIENT_ID = "c67a0f8f23d84a63aec52a3c42cda937";
    const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
    const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/homepage";
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

    const [showIframe, setShowIframe] = useState(false);

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
                    setShowIframe(true);
                }
            });
          })
          .catch((error) => {
            console.log(error);
          });
    };


    // draggable element code from W3Schools: https://www.w3schools.com/howto/howto_js_draggable.asp
    useEffect(() => {
      const spotifyElement = document.getElementById("spotify");
      dragElement(spotifyElement);
    }, []);

    function dragElement(elmnt) {
      let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;


      elmnt.onmousedown = dragMouseDown;

      function dragMouseDown(e) {
          if (e.target.tagName === 'INPUT') {
              return; // Don't start dragging if the click is on an input element
          }

          e = e || window.event;
          e.preventDefault();
          // get the current mouse position
          pos3 = e.clientX;
          pos4 = e.clientY;
          // calculate the distance between the mouse position and the element's current position
          pos1 = pos3 - elmnt.offsetLeft;
          pos2 = pos4 - elmnt.offsetTop;
          document.onmouseup = closeDragElement;
          document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
          e = e || window.event;
          e.preventDefault();
          // calculate the new position of the element based on the mouse position
          pos3 = e.clientX;
          pos4 = e.clientY;
          elmnt.style.top = (pos4 - pos2) + "px";
          elmnt.style.left = (pos3 - pos1) + "px";
      }

      function closeDragElement() {
          document.onmouseup = null;
          document.onmousemove = null;
      }
    }

    




    // State to manage visibility
    const [showAdditionalElements, setShowAdditionalElements] = useState(false);

    // Function to handle click on Spotify player button
    const handleToggleAdditionalElements = () => {
        setShowAdditionalElements(!showAdditionalElements);
    };


    return (
        <div className="spotify" id="spotify">
          <div className="spotify-nav" id="spotifyheader">
            {/* Additional elements */}
            {showAdditionalElements && (
              <>
                <button className="spotify-button" onClick={handleLogin}>Spotify Login</button>
                <form onSubmit={handleGetPlaylists}>
                  <input className="spotify-search-bar" type="text" value={searchKey} onChange={e => setSearchKey(e.target.value)} placeholder="Search playlists"/>
                  <button className="spotify-button spotify-playlist-button" type={"submit"}>Get Playlist</button>
                </form>
              </>
            )}
            
            {/* Spotify player button */}
            <button className="spotify-button spotify-toggle" onClick={handleToggleAdditionalElements}>
              <span><img src={musicNote} alt="music note icon" /></span>
              <span>Spotify Player</span>
            </button>
          </div>

          {/* Spotify playlist iframe */}
          {showIframe && showAdditionalElements && (
            <div>
              <iframe className="spotify-playlist"
                  title="Spotify Embed: Recommendation Playlist "
                  src={`https://open.spotify.com/embed/playlist/${playlistID}?utm_source=generator&theme=0`}
                  width="100%"
                  height="100%"
                  style={{ minHeight: '360px' }}
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
              />
            </div>
          )}
        </div>
    );
}