import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Message } from './Message'
import { DataContext } from '../contexts/DataProvider'
import { AuthContext } from '../contexts/AuthProvider'

export const MessageList = (props) => {

  const { messages } = useContext(DataContext)
  const { currentUser } = useContext(AuthContext)

  const [filterMessages, setFilterMessages] = useState([])

  const getFilteredPosts = useCallback(
    async () => {
      // console.log(searchWord)
      let newMessages = messages.filter((m) => m.userId === currentUser.id)
      
      setFilterMessages(newMessages)
      // alert('working?')
    },
    [messages],
  )

  var searchFilter = []
  let searchWord

  const handleSubmit = async ( e ) => {
    e.preventDefault()

    searchWord = e.target.searchWord.value
    // If I set the input field's ref as inputRef, I could say this instead.
    // const inputRef = useRef() (make sure to import at the top)
    // searchWord = inputRef.target.value
    
    for (let message of messages) {
      if (message.body.includes(searchWord) && message.userId === currentUser.id) {
        searchFilter.push(message)
      }

    }

    setFilterMessages(searchFilter)

  }

  useEffect(() => {
    // console.log(messages)
    getFilteredPosts()
    // let newMessages = messages.filter((m) => console.log(messages))
    // let newMessages = messages.filter((m) => m.senderId !== currentUser.id)
    // console.log(newMessages)
  }, [getFilteredPosts])


  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12">
          <form id="wordSearch" onSubmit={ ( e ) => handleSubmit( e ) }>
            <div className="form-outline">
              <input type="text" id="searchWord" className="form-control" placeholder="Search messages..." />
            </div>
            <button>Search</button>
          </form>
        </div>
      </div>
      <hr/>
      {filterMessages.map(m => <Message message={m} key={m.id} />)}
    </React.Fragment>
  )
}
