import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import "./spotify.js";

export default function SpotifyPage(props) {

    useEffect(() => {
        // Create an iframe element
        const iframe = document.createElement('iframe');
    
        // Set attributes for the iframe
        iframe.setAttribute('src', 'https://open.spotify.com/embed/playlist/1HVP7E8RkpieiGSxvATJbU?utm_source=generator');
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('height', '152');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('allow', 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture');
        iframe.setAttribute('loading', 'lazy');
    
        // Apply styles to the iframe
        iframe.style.borderRadius = '12px';
    
        // Append the iframe to the specified element
        document.getElementById('spotifyPlayer').appendChild(iframe);
      }, []);

  return (
    <div>
      <main>
        <h2>Spotify Page</h2>
        <Link to='/homepage'>home page</Link>
        <Link to='/taskpage'>task page</Link>

        <div id="spotifyPlayer"></div>

      </main>
    </div>
  )
}