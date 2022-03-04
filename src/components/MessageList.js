import React, { useContext } from 'react'
import { Message } from './Message'
import { DataContext } from '../contexts/DataProvider'


export const MessageList = ( props ) =>
{

    const { messages } = useContext( DataContext )

    return (
        <React.Fragment>
            { messages.map(m => <Message message={ m } key={m.id} /> ) }
        </React.Fragment>
    )
}
