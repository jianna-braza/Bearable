import { Link } from 'react-router-dom';


export default function HomePage(props) {

  return (
    <div>
      <header>
        <h1>Psycare Home Page</h1>
        <div className='d-flex column'>
          <button type="button" className="btn btn-outline-primary"><Link to='/achievements'>Achievements page</Link></button>
          <button type="button" className="btn btn-outline-primary"><Link to='/taskpage'>Task page</Link></button>
          <button type="button" className="btn btn-outline-primary"><Link to='/spotify'>Spotify Page</Link></button>
          <button type="button" className="btn btn-outline-primary"><Link to='/stats'>Stats Page</Link></button>
          <button type="button" className="btn btn-outline-primary"><Link to='/taskmanager'>Task Manager</Link></button>
        </div>
      </header>
      <main>

        <div className="d-flex row">
          <section className='col-4'>
            <h2>current task:</h2>
            <h3>Pay Good to Go bill</h3>
            <button type="button" className="btn btn-outline-success">Mark as done</button>
          </section>
          <section className='col-7'>
            <div className='d-flex column'>
              <button type="button" className="btn btn-outline-dark">Pomodoro timer</button>
              <button type="button" className="btn btn-outline-dark">Short break</button>
              <button type="button" className="btn btn-outline-dark">Long break</button>
            </div>
            <h1>2:45</h1>
            <div className='d-flex column'>
              <button type="button" className="btn btn-outline-dark">Pause</button>
              <button type="button" className="btn btn-outline-dark">Restart</button>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}