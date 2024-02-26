import React from 'react';
import { Link } from 'react-router-dom';
import "./stats.css";

export default function StatsPage(props) {
  return (
    <div>
      <main>
        <h2>Stats Page</h2>
        <Link to='/homepage'>home page</Link>
        <Link to='/taskpage'>task page</Link>



        <div class="progressBars">
            <svg>
                <circle class="bg" cx="57" cy="57" r="52" />
                <circle class="meter-1" cx="57" cy="57" r="52" />
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="black">Personal</text>
            </svg>
            <svg>
                <circle class="bg" cx="57" cy="57" r="52" />
                <circle class="meter-2" cx="57" cy="57" r="52" />
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="black">School</text>
            </svg>
            <svg>
                <circle class="bg" cx="57" cy="57" r="52" />
                <circle class="meter-3" cx="57" cy="57" r="52" />
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="black">Work</text>
            </svg>
        </div>

      </main>
    </div>
  )
}