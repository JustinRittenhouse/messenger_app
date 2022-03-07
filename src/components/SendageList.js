import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Message } from './Message'
import { DataContext } from '../contexts/DataProvider'
import { AuthContext } from '../contexts/AuthProvider'

export const SendageList = (props) => {

    const { messages } = useContext(DataContext)
    const { currentUser } = useContext(AuthContext)

    const [filterMessages, setFilterMessages] = useState([])

    const getFilteredPosts = useCallback(
        async () => {
            let newMessages = messages.filter((m) => m.senderId === currentUser.id)
            console.log(newMessages)
            setFilterMessages(newMessages)
        },
        [messages],
    )

    var searchFilter = []
    let searchWord

    const handleSubmit = async ( e ) => {
      e.preventDefault()
  
      searchWord = e.target.searchWord.value
      
      for (let message of messages) {
        if (message.body.includes(searchWord) && message.senderId === currentUser.id) {
          searchFilter.push(message)
        }
  
      }
  
      setFilterMessages(searchFilter)
  
    }


    useEffect(() => {
        getFilteredPosts()
    }, [getFilteredPosts])


    return (
        <React.Fragment>
            <div className="row">
                <div className="col-12">
                    <form id="wordSearch" onSubmit={(e) => handleSubmit(e)}>
                        <div className="form-outline">
                            <input type="text" id="searchWord" className="form-control" placeholder="Search messages..." />
                        </div>
                        <button>Search</button>
                    </form>
                </div>
            </div>
            <hr />
            {filterMessages.map(m => <Message message={m} key={m.id} />)}
        </React.Fragment>
    )
}
