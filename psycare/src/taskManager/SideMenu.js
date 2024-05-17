import React from 'react';
import { Link } from 'react-router-dom';

export default function SideMenu(props) {
  return (
    <section className='col-2 pt-5 view-section'>
      <div className='row'>
        <button type="button" className="view-button mb-2"><Link to="/taskmanager" >Board View</Link></button>
        <button type="button" className="view-button"><Link to='/calendar'>Calendar view</Link></button>
      </div>
    </section>
  )
}