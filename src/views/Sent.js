import React, { useContext } from 'react'
import { DataContext } from '../contexts/DataProvider'
import { SendageList } from '../components/SendageList'
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore'
import { useAuth } from '../contexts/AuthProvider'

export const Sent = () => {
  const { currentUser } = useAuth()
  const { messages, setPosts, addPost } = useContext(DataContext)
  const db = getFirestore()

  return (
    <React.Fragment>
      <main className='container'>
        <div className="row">
          <div className="offset-4 col-6">
            <h2>Your Outgoing Messages</h2>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-12">
            <ul className="list-group">
              <SendageList messages={messages} />
            </ul>
          </div>
        </div>
      </main>
    </React.Fragment>
  )
}