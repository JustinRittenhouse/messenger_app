import { signInAnonymously, updateCurrentUser } from 'firebase/auth'
import { serverTimestamp } from 'firebase/firestore'
import React, { useContext } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import { useAuth } from './contexts/AuthProvider'
import { DataContext } from './contexts/DataProvider'
import { Inbox } from './views/Inbox'
import { Sent } from './views/Sent'
import { Trash } from './views/Trash'


export const App = () => {

  const{ signIn, currentUser, logOut } = useAuth()
  const { addPost } = useContext( DataContext )

  const messageSubmit = async ( e ) => {
    e.preventDefault()

    let formData = {
      body: e.target.messageBody.value,
      senderId: currentUser.id,
      timeCreated: serverTimestamp(),
      userId: e.target.messageId.value
    }

    addPost( formData )

    e.target.messageBody.value = ''
    e.target.messageId.value = ''
  }

  return (
    <React.Fragment>
    <header>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">Inbox</Link>
        <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
            aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link className="nav-link" to="/sent">Sent<span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/trash">Trash</Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {
              !currentUser.loggedIn
              ?
            <li className="nav-item">
              <Link onClick={ () => signIn() } to="." className="nav-link">Login</Link>
            </li>
            :
            <li className="nav-item">
              <Link onClick={ () => logOut() } to="." className="nav-link">Logout</Link>
            </li>
            }
          </ul>
        </div>
      </nav>
    </header>
      <Routes>
        <Route exact path='/' element={ <Inbox /> } />
        <Route exact path='/sent' element={ <Sent /> } />
        <Route exact path='/trash' element={ <Trash /> } />
      </Routes>
    <footer>
      <div className='container'>
        <div className='row'>
          <div className='col-10 offset-1'>
            <form id="newMessage" onSubmit={ ( e ) => messageSubmit( e ) }>
              <h6>Who are you sending to?</h6>
              <input type="text" id="messageId" placeholder="Type the user's id here" />
              <h6>What is your message?</h6>
              <input type="text" id="messageBody" placeholder="Type your message here" />
              <button>Send Message</button>
            </form>
          </div>
          </div>

      </div>
    </footer>
  </React.Fragment>
  )
}

