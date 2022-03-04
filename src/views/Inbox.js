import React, { useContext } from 'react'
import { DataContext } from '../contexts/DataProvider'
import { MessageList } from '../components/MessageList'
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore'
import { useAuth } from '../contexts/AuthProvider'

export const Inbox = () => {
  const { currentUser } = useAuth()
  const { messages, setPosts, addPost } = useContext( DataContext )
  const db = getFirestore()

  return (
    <React.Fragment>
      <div className="row">
        <div className="offset-4 col-4">
          <h2>Your Incoming Messages</h2>
        </div>
      </div>

      <hr />

      <div className="row">
        <div className="col-12">
          <ul className="list-group">
            <MessageList messages={ messages } />
          </ul>
        </div>
      </div>
    </React.Fragment>
  )
}
