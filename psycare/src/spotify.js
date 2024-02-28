import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import "./spotify.css";

export default function SpotifyPage(props) {

    useEffect(() => {
        // Check if the iframe already exists
        if (!document.getElementById('iframe1')) {
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
            iframe.setAttribute('id', 'iframe1');
        
            // Apply styles to the iframe
            iframe.style.borderRadius = '12px';
        
            // Append the iframe to the specified element
            document.getElementById('spotifyPlayer').appendChild(iframe);
        }
    }, []);

    useEffect(() => {
        // Check if the iframe already exists
        if (!document.getElementById('iframe2')) {
            // Create an iframe element
            const iframe2 = document.createElement('iframe');
        
            // Set attributes for the iframe
            iframe2.setAttribute('src', 'https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM?utm_source=generator');
            iframe2.setAttribute('width', '100%');
            iframe2.setAttribute('height', '152');
            iframe2.setAttribute('frameborder', '0');
            iframe2.setAttribute('allowfullscreen', '');
            iframe2.setAttribute('allow', 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture');
            iframe2.setAttribute('loading', 'lazy');
            iframe2.setAttribute('id', 'iframe2');
        
            // Apply styles to the iframe
            iframe2.style.borderRadius = '12px';
        
            // Append the iframe to the specified element
            document.getElementById('spotifyPlayer').appendChild(iframe2);
        }
    }, []);

    return (
        <div>
            <main>
                <h2>Spotify Page</h2>
                <Link to='/homepage'>home page</Link>
                <Link to='/taskpage'>task page</Link>

                
                <div className="spotify-content">
                  <h3 className="title">Recommended Playlists</h3>
                  <div id="spotifyPlayer"></div>
                </div>
                
                
            </main>
        </div>
    )
}

































// import React, { useEffect} from 'react';
// import { Link } from 'react-router-dom';
// import "./spotify.js";

// export default function SpotifyPage(props) {

//     useEffect(() => {
//         // Create an iframe element
//         const iframe = document.createElement('iframe');
    
//         // Set attributes for the iframe
//         iframe.setAttribute('src', 'https://open.spotify.com/embed/playlist/1HVP7E8RkpieiGSxvATJbU?utm_source=generator');
//         iframe.setAttribute('width', '100%');
//         iframe.setAttribute('height', '152');
//         iframe.setAttribute('frameborder', '0');
//         iframe.setAttribute('allowfullscreen', '');
//         iframe.setAttribute('allow', 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture');
//         iframe.setAttribute('loading', 'lazy');
    
//         // Apply styles to the iframe
//         iframe.style.borderRadius = '12px';
    
//         // Append the iframe to the specified element
//         document.getElementById('spotifyPlayer').appendChild(iframe);
//       }, []);

//     useEffect(() => {
//       // Create an iframe element
//       const iframe2 = document.createElement('iframe');
  
//       // Set attributes for the iframe
//       iframe2.setAttribute('src', 'https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM?utm_source=generator');
//       iframe2.setAttribute('width', '100%');
//       iframe2.setAttribute('height', '152');
//       iframe2.setAttribute('frameborder', '0');
//       iframe2.setAttribute('allowfullscreen', '');
//       iframe2.setAttribute('allow', 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture');
//       iframe2.setAttribute('loading', 'lazy');
  
//       // Apply styles to the iframe
//       iframe2.style.borderRadius = '12px';
  
//       // Append the iframe to the specified element
//       document.getElementById('spotifyPlayer').appendChild(iframe2);
//     }, []);

//   return (
//     <div>
//       <main>
//         <h2>Spotify Page</h2>
//         <Link to='/homepage'>home page</Link>
//         <Link to='/taskpage'>task page</Link>

//         <h3>Recommended Playlists</h3>

//         <div id="spotifyPlayer"></div>

//       </main>
//     </div>
//   )
// }