import React from 'react';
import { Link } from 'react-router-dom';

export default function TaskManager(props) {
  let testTasks = [ //list of objects with the date and an array of task objects
    { day: "Mon, 19", tasks: [{ name: 'Reading Response 7', tag: 'School' }, { name: 'Pay Good to Go Bill', tag: 'Personal' }] },
    { day: "Tues, 20", tasks: [{ name: 'Summary 7', tag: 'School' }, { name: 'Strategy Document', tag: 'School' }] },
    { day: "Wed, 21", tasks: [{ name: 'Studio 6', tag: 'School' }, { name: 'Submit Timesheet', tag: 'Work' }, { name: 'Dance Practice', tag: 'Dance' }] }
  ]


  const cards = testTasks.map(date => {
    let dayTasks = date['tasks'].map(task => {
      if (task.tag === 'School') {
        return (
          <div className="card" key={task.name}>
            <div className="card-header">
              {task.name}
            </div>
            <div className="card-body">
              <a href="#" className="btn btn-success">{task.tag}</a>
            </div>
          </div>
        )
      } else if (task.tag === 'Personal') {
        return (
          <div className="card" key={task.name}>
            <div className="card-header">
              {task.name}
            </div>
            <div className="card-body">
              <a href="#" className="btn btn-warning">{task.tag}</a>
            </div>
          </div>
        )
      } else if (task.tag === 'Work') {
        return (
          <div className="card" key={task.name}>
            <div className="card-header">
              {task.name}
            </div>
            <div className="card-body">
              <a href="#" className="btn btn-info">{task.tag}</a>
            </div>
          </div>
        )
      } else {
        return (
          <div className="card" key={task.name}>
            <div className="card-header">
              {task.name}
            </div>
            <div className="card-body">
              <a href="#" className="btn btn-primary">{task.tag}</a>
            </div>
          </div>
        )
      }
    })

    return (
      <div className='column' key={date.day}>
        <button type="button" className="btn btn-dark">{date.day}</button>


        <button type="button" className="btn btn-primary" data-toggle="modal" data-backdrop="false" data-target="#exampleModal">
          Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>hi</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>



        {dayTasks}
      </div>
    )
  })




  return (
    <div>
      <header>
        <h1>Psycare Task Manager</h1>
        <nav>
          <ul className="menu">
            <li><Link to='/homepage'>Home</Link></li>
            <li><Link to='/taskmanager'>Task Manager</Link></li>
            <li><Link to='/spotify'>Spotify Page</Link></li>
            <li><Link to='/stats'>Stats Page</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <div className='d-flex row'>
          <section className='col-3'>
            <div className='row'>
              <button type="button" className="myButton">Board View</button>
              <button type="button" className="myButton"><Link to='/calendar'>Calendar view</Link></button>
            </div>
          </section>
          <section className='col-7'>

            <div className="d-flex justify-content-around">
              <h2>February 2024 &lt; &gt;</h2>
            </div>
            <div className="d-flex justify-content-around">
              {cards}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}