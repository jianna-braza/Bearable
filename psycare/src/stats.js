import React from 'react';
import { Link } from 'react-router-dom';
import "./stats.css";

export default function StatsPage(props) {

  const LineChart = () => {
    const data = [10, 40, 30, 60, 50, 90]; // Example data for the chart
    const viewBoxWidth = 600; // Width of the SVG viewBox
    const viewBoxHeight = 300; // Height of the SVG viewBox
    const maxDataValue = Math.max(...data);
    const tickCount = 5; // Number of tick marks on each axis
  
    // Calculate the tick values for the y-axis
    const yTickValues = Array.from({ length: tickCount }).map((_, index) =>
      Math.round((index / (tickCount - 1)) * maxDataValue)
    );
  
    // Generate the y-axis tick mark line segments
    const yTickMarks = yTickValues.map((value, index) => (
      <g key={index}>
        <line
          x1="0"
          y1={(viewBoxHeight / (tickCount - 1)) * index}
          x2="-5"
          y2={(viewBoxHeight / (tickCount - 1)) * index}
          className="tick"
        />
        <text x="-10" y={(viewBoxHeight / (tickCount - 1)) * index} dominantBaseline="middle" textAnchor="end">
          {value}
        </text>
      </g>
    ));
  
    // Generate the path string for the line
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * viewBoxWidth;
      const y = viewBoxHeight - (value / maxDataValue) * viewBoxHeight;
      return `${x},${y}`;
    });
    const path = `M${points.join(' L')}`;
  
    return (
      <div className="line-chart">
        <svg viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}>
          {/* Draw the line */}
          <path className="line" d={path} />
          {/* Draw the x-axis */}
          <line x1="0" y1={viewBoxHeight} x2={viewBoxWidth} y2={viewBoxHeight} className="axis" />
          {/* Draw the y-axis */}
          <line x1="0" y1="0" x2="0" y2={viewBoxHeight} className="axis" />
          {/* Draw y-axis tick marks and labels */}
          {yTickMarks}
        </svg>
      </div>
    );
  };
  
  // const LineChart = () => {
  //   const data = [30, 70, 40, 120, 90, 200]; // Example data for the chart
  //   const viewBoxWidth = 400; // Width of the SVG viewBox
  //   const viewBoxHeight = 200; // Height of the SVG viewBox
  //   const maxDataValue = Math.max(...data);
  //   const points = data.map((value, index) => {
  //     const x = (index / (data.length - 1)) * viewBoxWidth;
  //     const y = viewBoxHeight - (value / maxDataValue) * viewBoxHeight;
  //     return `${x},${y}`;
  //   });
  //   const path = `M${points.join(' L')}`;
  
  //   return (
  //     <div className="line-chart">
  //       <svg viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}>
  //         {/* Draw the line */}
  //         <path className="line" d={path} />
  //         {/* Draw the x-axis */}
  //         <line x1="0" y1={viewBoxHeight} x2={viewBoxWidth} y2={viewBoxHeight} className="axis" />
  //         {/* Draw the y-axis */}
  //         <line x1="0" y1="0" x2="0" y2={viewBoxHeight} className="axis" />
  //       </svg>
  //     </div>
  //   );
  // };
  
  return (
    <div>
      <main>
        <h2>Stats Page</h2>
        <Link to='/homepage'>home page</Link>
        <Link to='/taskpage'>task page</Link>

        <div className="stats-objects">
          <div className="stats-streak">
            <h3>7 Day Streak!</h3>
            <svg>
                <circle class="bg" cx="57" cy="57" r="52" />
                <circle class="meter-1" cx="57" cy="57" r="52" />
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="black">Streak</text>
            </svg>
          </div>
        
          <div className="stats-daily">
              <h3>5/7 Tasks Complete!</h3>
              <svg>
                  <circle class="bg" cx="57" cy="57" r="52" />
                  <circle class="meter-2" cx="57" cy="57" r="52" />
                  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="black">Daily</text>
              </svg>
          </div>
        
          <div className="stats-graph">
            <h3>Weekly Productivity</h3>
            <LineChart />
          </div>

        </div>

      </main>
    </div>
  )
}